import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/**
 * Insights subscribe handler.
 *
 * THIS ROUTE DID NOT EXIST. It was described as existing when this work was
 * asked for, and it did not: src/app/api held only the enquiry handler, and the
 * old /insights page carried a comment saying the signup "does not exist yet
 * and needs building". So it is built here rather than the form being pointed at
 * something that would 404 on the first subscriber.
 *
 * THERE IS NO MAILING LIST TO ADD ANYONE TO. Stage one has no database and no
 * email platform beyond Resend, so a subscription is delivered as mail: the
 * address goes to the inbox that already receives enquiries, and the subscriber
 * gets a confirmation. That is a working subscribe button, not a stored list.
 * Moving these to a real list is a decision for the client, recorded in
 * docs/PENDING-COPY.md.
 *
 * WORKS WITHOUT JAVASCRIPT, like the enquiry route: it accepts form-encoded as
 * well as JSON and answers each in the form the caller can use.
 */

const TO = "hello@pivotprime.ae";
const FROM = "Pivot Prime <hello@pivotprime.ae>";

const SubscribeSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
  // Bots fill hidden fields; people do not.
  company: z.string().max(0).optional(),
});

/** Fixed-window limit, per IP. In-memory: one instance, no store, by scope. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json");

  const fail = (status: number, error: string) =>
    wantsJson
      ? NextResponse.json({ ok: false, error }, { status })
      : NextResponse.redirect(
          new URL(`/insights?error=${encodeURIComponent(error)}`, request.url),
          303,
        );

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return fail(429, "Too many attempts from this address. Try again shortly.");
  }

  let raw: Record<string, unknown>;
  try {
    raw = wantsJson
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return fail(400, "That submission could not be read.");
  }

  // Answered as a success, so a bot learns nothing about which field caught it.
  if (typeof raw.company === "string" && raw.company.length > 0) {
    console.warn("insights: honeypot triggered, nothing sent");
    return wantsJson
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL("/insights?subscribed=1", request.url), 303);
  }

  const parsed = SubscribeSchema.safeParse(raw);
  if (!parsed.success) {
    return fail(400, parsed.error.issues[0]?.message ?? "Check the address and try again.");
  }
  const { email } = parsed.data;

  // A missing key must never look like a completed subscription.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("insights: RESEND_API_KEY is not set, nothing was sent");
    return fail(500, "Subscribing is not available right now. Please email hello@pivotprime.ae.");
  }

  const resend = new Resend(apiKey);

  try {
    const notice = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Insights subscription: ${email}`,
      html: `<p><strong>New Insights subscriber</strong></p>
<p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p>There is no mailing list behind this form yet, so this address is only in this email. Add it wherever the list ends up living.</p>`,
    });

    if (notice.error) {
      console.error("insights: delivery to the inbox failed", notice.error);
      return fail(502, "That did not go through. Please email hello@pivotprime.ae.");
    }

    // Confirmation. A failure here is logged, not surfaced: the subscription
    // reached the inbox, and telling the reader otherwise would be wrong.
    const receipt = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "You are on the Insights list",
      html: `<p>Thank you for subscribing to Pivot Prime Insights.</p>
<p>New articles from the team will come to you. No round-ups, no filler. One piece, when it is ready.</p>
<p>If you did not ask for this, reply to this email and we will take you off.</p>
<p>Pivot Prime<br><a href="mailto:${TO}">${TO}</a></p>`,
    });

    if (receipt.error) {
      console.error("insights: confirmation failed, the subscription itself was delivered", receipt.error);
    }
  } catch (err) {
    console.error("insights: unexpected failure", err);
    return fail(502, "That did not go through. Please email hello@pivotprime.ae.");
  }

  return wantsJson
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/insights?subscribed=1", request.url), 303);
}
