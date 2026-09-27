import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { TO, FROM, escapeHtml, clientIp, createRateLimiter } from "@/lib/email";

/**
 * Insights subscribe handler.
 *
 * WHY IT DID NOT WORK, HER SLIDE 20: "Fix this, it doesn't work when we
 * subscribe." It was not doing nothing quietly. It was failing loudly, and the
 * cause was one line.
 *
 * THIS ROUTE HELD ITS OWN COPY OF FROM, and that copy read
 * "Pivot Prime <hello@pivotprime.ae>". The verified sending domain with Resend
 * is send.pivotprime.ae, which is what src/lib/email.ts exports and what the
 * enquiry and diagnostic routes both use. Resend refuses a from address on an
 * unverified domain, so the first send errored, the route answered 502, and the
 * reader was told "That did not go through". Measured against production before
 * the fix: POST /api/insights returned HTTP 502 with exactly that message, and
 * no mail was sent to anyone.
 *
 * SO IT USES THE SHARED MODULE NOW, and not only for FROM. TO, escapeHtml,
 * clientIp and the rate limiter all came from private copies in this file; a
 * second copy of a sender address is exactly how one of three routes ends up on
 * a domain nobody verified. PENDING-COPY 1f4.
 *
 * WHY AN EMAIL PER SIGNUP RATHER THAN A RESEND AUDIENCE. The SDK does expose
 * audiences.create and contacts.create, so a find-or-create audience followed
 * by a contact insert is possible in principle with no dashboard visit. It is
 * not taken, because it turns on a permission this key may not have: a Resend
 * key can be sending-access-only, and such a key cannot touch audiences. The
 * key cannot be read here to check, and the failure mode of guessing wrong is
 * the form breaking again for the same reader who already reported it broken.
 * Mail is the thing this key is known to be able to do, in two other routes,
 * today. Recorded in PENDING-COPY 1f4 as the option to take when she wants a
 * real list, since the audience route also needs somewhere for the audience id
 * to live.
 *
 * THERE IS STILL NO MAILING LIST BEHIND THIS. A subscription is delivered as
 * mail: the address reaches the inbox that already receives enquiries, and the
 * subscriber gets a confirmation. That is a working subscribe button, not a
 * stored list.
 *
 * WORKS WITHOUT JAVASCRIPT, like the enquiry route: it accepts form-encoded as
 * well as JSON and answers each in the form the caller can use.
 */

const SubscribeSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
  // Bots fill hidden fields; people do not.
  company: z.string().max(0).optional(),
});

/**
 * Its own bucket, so a reader subscribing does not spend the attempts of
 * somebody filling in the enquiry form from the same address, and vice versa.
 * createRateLimiter is a factory for exactly this reason.
 */
const rateLimited = createRateLimiter();

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

  const done = () =>
    wantsJson
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL("/insights?subscribed=1", request.url), 303);

  if (rateLimited(clientIp(request.headers))) {
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
    return done();
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
    /**
     * A REPEAT ADDRESS IS NOT AN ERROR AND NEVER REACHES THE READER AS ONE.
     * There is no store to check against, so there is nothing to collide with:
     * subscribing twice sends the notice twice and the same confirmation twice,
     * and the reader sees the same panel both times. That is the behaviour her
     * brief asks for, and it is a property of having no list rather than
     * something handled here. The notice says the address may be a repeat so
     * the inbox is not surprised by it.
     */
    const notice = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Insights subscription: ${email}`,
      html: `<p><strong>New Insights subscriber</strong></p>
<p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p>There is no mailing list behind this form yet, so this address is only in this email, and the same address may arrive more than once. Add it wherever the list ends up living.</p>`,
    });

    if (notice.error) {
      console.error("insights: delivery to the inbox failed", notice.error);
      return fail(502, "That did not go through. Please email hello@pivotprime.ae.");
    }

    /**
     * The confirmation. Two sentences, her brief: British English, no em dash,
     * no exclamation mark, and the register of the other two auto-replies.
     *
     * A failure here is logged and not surfaced, as in the diagnostic route:
     * the subscription reached the inbox, so the reader is subscribed, and
     * telling them otherwise would be wrong.
     */
    const receipt = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "You are on the Insights list",
      text: [
        "Thank you for subscribing to Pivot Prime Insights.",
        "",
        "New articles from the team will come to you, with no round-ups and no filler.",
        "",
        "Pivot Prime",
        TO,
      ].join("\n"),
      html: `<p>Thank you for subscribing to Pivot Prime Insights.</p>
<p>New articles from the team will come to you, with no round-ups and no filler.</p>
<p>Pivot Prime<br><a href="mailto:${TO}">${TO}</a></p>`,
    });

    if (receipt.error) {
      console.error("insights: confirmation failed, the subscription itself was delivered", receipt.error);
    }
  } catch (err) {
    console.error("insights: unexpected failure", err);
    return fail(502, "That did not go through. Please email hello@pivotprime.ae.");
  }

  return done();
}
