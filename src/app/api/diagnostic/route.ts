import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { INDUSTRIES } from "@/content/industries";
import {
  TO,
  FROM,
  stampGST,
  escapeHtml,
  clientIp,
  createRateLimiter,
} from "@/lib/email";
import { DOMAIN_NAME, DOMAIN_ORDER } from "@/content/diagnostic-quiz";

/**
 * Diagnostic result handler.
 *
 * HER FILE HAS NO ENDPOINT. submitCapture() in pp-diagnostic_5 writes the five
 * fields to a local variable and renders the results. Every entry would have
 * been lost the moment the tab closed, which is the one thing a lead capture
 * cannot do. This is that endpoint.
 *
 * THE NOTIFICATION CARRIES THE DIAGNOSIS, NOT JUST THE CONTACT DETAILS. Iram
 * needs the overall score, the band, all six domain scores and the named
 * constraint, because the constraint is what the follow-up conversation is
 * about. Contact details alone would mean opening a call with no idea what the
 * person just told us.
 *
 * SAME PROTECTIONS AS /api/enquiry, from the same module rather than a second
 * copy: honeypot, per-IP rate limit, server-side validation, and a missing key
 * that fails loudly instead of looking like a delivered message.
 */

const resendClient = (apiKey: string) => new Resend(apiKey);

/** Its own bucket, so an enquiry does not spend the diagnostic's attempts. */
const rateLimited = createRateLimiter();

/**
 * The five fields her capture screen collects, plus the result the browser
 * computed.
 *
 * THE SCORE IS RECOMPUTED HERE, NOT TRUSTED. The client sends its answers and
 * the server scores them with the same module the page used, so a posted
 * `overall` cannot be anything other than what those answers produce. Accepting
 * a submitted score would let anyone put any number in Iram's inbox.
 */
const DiagnosticSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  biz: z.string().trim().min(1, "Enter your business name").max(160),
  email: z.email("Enter a valid email address").max(200),
  industry: z.enum(INDUSTRIES, { message: "Choose the industry you are in" }),
  role: z.string().trim().min(1, "Choose your role").max(120),
  // Twelve answers, each 0 to 4. Anything else is not a completed diagnostic.
  answers: z
    .array(z.number().int().min(0).max(4))
    .length(12, "The diagnostic was not completed"),
  // Bots fill hidden fields; people do not. Same trick as the enquiry form.
  company: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  const fail = (status: number, error: string) =>
    NextResponse.json({ ok: false, error }, { status });

  if (rateLimited(clientIp(request.headers))) {
    return fail(429, "Too many submissions from this address. Try again shortly.");
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "That submission could not be read.");
  }

  // Answered as a success, and before validation, for the same reason as the
  // enquiry route: a rejection teaches a bot which field to leave alone, and
  // the schema's own message would name the mechanism in the response.
  if (
    typeof raw === "object" &&
    raw !== null &&
    typeof (raw as { company?: unknown }).company === "string" &&
    (raw as { company: string }).company.length > 0
  ) {
    console.warn("diagnostic: honeypot triggered, nothing sent");
    return NextResponse.json({ ok: true });
  }

  const parsed = DiagnosticSchema.safeParse(raw);
  if (!parsed.success) {
    return fail(400, parsed.error.issues[0]?.message ?? "Check the form and try again.");
  }
  const { name, biz, email, industry, role, answers } = parsed.data;

  // Scored server-side from the answers, never from a posted total.
  const { scoreDiagnostic } = await import("@/lib/diagnostic-score");
  const { domainScores, overall, constraint, band } = scoreDiagnostic(answers);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("diagnostic: RESEND_API_KEY is not set, nothing was sent");
    return fail(500, "The form is not available right now. Please email hello@pivotprime.ae.");
  }

  const resend = resendClient(apiKey);
  const sentAt = stampGST();
  const breakdown = DOMAIN_ORDER.map((d) => `${DOMAIN_NAME[d]}: ${domainScores[d]}`);

  try {
    const notification = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // So she can reply straight from the inbox.
      subject: `Diagnostic: ${name}, ${biz}. Score ${overall}, constraint ${DOMAIN_NAME[constraint]}`,
      text: [
        `Name: ${name}`,
        `Business: ${biz}`,
        `Email: ${email}`,
        `Industry: ${industry}`,
        `Role: ${role}`,
        "",
        `Overall score: ${overall} of 100`,
        `Band: ${band.label}. ${band.desc}`,
        `Primary constraint: ${DOMAIN_NAME[constraint]}`,
        "",
        "Domain breakdown:",
        ...breakdown.map((line) => `  ${line}`),
        "",
        `Received: ${sentAt}`,
      ].join("\n"),
      html: `<p><strong>Name</strong><br>${escapeHtml(name)}</p>
<p><strong>Business</strong><br>${escapeHtml(biz)}</p>
<p><strong>Email</strong><br><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p><strong>Industry</strong><br>${escapeHtml(industry)}</p>
<p><strong>Role</strong><br>${escapeHtml(role)}</p>
<hr>
<p><strong>Overall score</strong><br>${overall} of 100</p>
<p><strong>Band</strong><br>${escapeHtml(band.label)}. ${escapeHtml(band.desc)}</p>
<p><strong>Primary constraint</strong><br>${escapeHtml(DOMAIN_NAME[constraint])}</p>
<p><strong>Domain breakdown</strong><br>${breakdown.map(escapeHtml).join("<br>")}</p>
<p style="color:#5e6f68;font-size:13px"><strong>Received</strong><br>${escapeHtml(sentAt)}</p>`,
    });

    if (notification.error) {
      console.error("diagnostic: delivery to the inbox failed", notification.error);
      return fail(502, "Your results could not be sent. Please email hello@pivotprime.ae.");
    }

    // The receipt. A failure here is logged and not surfaced: her results
    // arrived, and telling the sender otherwise would be wrong. Same shape as
    // the enquiry autoresponder: short, plain, no pitch, no tracking, and the
    // only link is the site.
    const receipt = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "We have your diagnostic results",
      text: [
        `Thank you for completing the diagnostic, ${name}.`,
        "",
        `We have your results. Your score was ${overall} of 100, and the area holding the business back most is ${DOMAIN_NAME[constraint]}.`,
        "",
        "Someone will follow up with a first read on what that means for you and a time to talk it through.",
        "",
        "Pivot Prime",
        "https://pivotprime.ae",
      ].join("\n"),
      html: `<p>Thank you for completing the diagnostic, ${escapeHtml(name)}.</p>
<p>We have your results. Your score was <strong>${overall} of 100</strong>, and the area holding the business back most is <strong>${escapeHtml(DOMAIN_NAME[constraint])}</strong>.</p>
<p>Someone will follow up with a first read on what that means for you and a time to talk it through.</p>
<p>Pivot Prime<br><a href="https://pivotprime.ae">pivotprime.ae</a></p>`,
    });

    if (receipt.error) {
      console.error(
        "diagnostic: receipt failed, the results themselves were delivered",
        receipt.error,
      );
    }
  } catch (err) {
    console.error("diagnostic: unexpected failure", err);
    return fail(502, "Your results could not be sent. Please email hello@pivotprime.ae.");
  }

  return NextResponse.json({ ok: true });
}
