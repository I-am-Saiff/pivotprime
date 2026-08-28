import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { INDUSTRIES } from "@/content/industries";
import { Resend } from "resend";

/**
 * Contact form handler. Spec 2.3.
 *
 * "Route every form submission on the site, from every page, to
 * hello@pivotprime.ae. Set the reply-to as the submitter address so replies work
 * directly from the inbox, and add an autoresponder confirming receipt."
 *
 * Stage one stores nothing. There is no database, by scope.
 *
 * WORKS WITHOUT JAVASCRIPT. The form posts to this route natively, so it accepts
 * `application/x-www-form-urlencoded` as well as JSON and answers each in the
 * form the caller can use: a redirect for a native post, JSON for a fetch. A
 * submit button that does nothing without JavaScript is the one failure this
 * route exists to avoid.
 */

const TO = "hello@pivotprime.ae";
const FROM = "Pivot Prime <hello@pivotprime.ae>";

const EnquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  email: z.email("Enter a valid email address").max(200),
  // Optional on purpose. Name and email are enough to reply to, and a required
  // free-text box costs enquiries on the one page whose whole job is enquiries.
  // The spec sets the routing for this form (2.3) and says nothing about its
  // fields, so this is a product decision rather than a deviation.
  /**
   * Required, from 28 August. The one field on this form that is not about
   * reaching the person back: it routes the enquiry before anyone reads it.
   *
   * `industryOther` is only required when "Other" is chosen, which is a rule
   * about the pair rather than about either field, so it is a refinement on the
   * object rather than a validator on the string. That also makes the
   * no-JavaScript path correct for free: the select posts natively, and a blank
   * "Other" box is rejected with the same message the browser would have shown.
   */
  industry: z.enum(INDUSTRIES, { message: "Choose the industry you are in" }),
  industryOther: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
  // Bots fill hidden fields; people do not. Cheaper and more private than a
  // third-party captcha, and it never asks a real visitor to prove anything.
  company: z.string().max(0).optional(),
}).refine((v) => v.industry !== "Other" || v.industryOther.length > 0, {
  path: ["industryOther"],
  message: "Tell us which industry you are in",
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
          new URL(`/contact?error=${encodeURIComponent(error)}`, request.url),
          303,
        );

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return fail(429, "Too many messages from this address. Try again shortly.");
  }

  let raw: Record<string, unknown>;
  try {
    if (wantsJson) {
      raw = await request.json();
    } else {
      raw = Object.fromEntries(await request.formData());
    }
  } catch {
    return fail(400, "That submission could not be read.");
  }

  // The honeypot is checked before validation and answered as a success. A
  // rejection teaches a bot which field to leave alone next time, and the raw
  // schema message ("expected string to have <=0 characters") would leak the
  // mechanism to anyone reading the response.
  if (typeof raw.company === "string" && raw.company.length > 0) {
    console.warn("enquiry: honeypot triggered, nothing sent");
    return wantsJson
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
  }

  const parsed = EnquirySchema.safeParse(raw);
  if (!parsed.success) {
    return fail(400, parsed.error.issues[0]?.message ?? "Check the form and try again.");
  }
  const { name, email, message, industry, industryOther } = parsed.data;
  // What goes in the emails: the free-text answer where they gave one, so
  // nobody in the inbox has to open the form to find out what "Other" meant.
  const industryLine = industry === "Other" ? `Other: ${industryOther}` : industry;

  // A missing key must never look like a delivered message.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("enquiry: RESEND_API_KEY is not set, nothing was sent");
    return fail(500, "The form is not available right now. Please email hello@pivotprime.ae.");
  }

  const resend = new Resend(apiKey);

  try {
    const enquiry = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // Spec 2.3: replies work directly from the inbox.
      subject: `Website enquiry from ${name} — ${industryLine}`,
      html: `<p><strong>Name</strong><br>${escapeHtml(name)}</p>
<p><strong>Email</strong><br><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p><strong>Industry</strong><br>${escapeHtml(industryLine)}</p>
${
        message
          ? `<p><strong>Message</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`
          : "<p><em>No message was left. Reply to this email to reach them.</em></p>"
      }`,
    });

    if (enquiry.error) {
      console.error("enquiry: delivery to the inbox failed", enquiry.error);
      return fail(502, "The message could not be sent. Please email hello@pivotprime.ae.");
    }

    // Autoresponder. Spec 2.3. A failure here is logged but not surfaced: the
    // enquiry itself arrived, and telling the sender otherwise would be wrong.
    const receipt = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "We have your enquiry",
      html: `<p>Thank you for getting in touch with Pivot Prime.</p>
<p>We have your enquiry and someone will reply within one working day. If it is urgent, WhatsApp is the fastest way to reach us.</p>
<p>You told us your industry is <strong>${escapeHtml(industryLine)}</strong>.</p>
${
        message
          ? `<p>For reference, this is what you sent:</p>
<blockquote style="border-left:3px solid #009f50;margin:0;padding-left:16px;color:#5e6f68">
${escapeHtml(message).replace(/\n/g, "<br>")}
</blockquote>`
          : ""
      }<p>Pivot Prime<br><a href="mailto:${TO}">${TO}</a></p>`,
    });

    if (receipt.error) {
      console.error("enquiry: autoresponder failed, the enquiry itself was delivered", receipt.error);
    }
  } catch (err) {
    console.error("enquiry: unexpected failure", err);
    return fail(502, "The message could not be sent. Please email hello@pivotprime.ae.");
  }

  return wantsJson
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
