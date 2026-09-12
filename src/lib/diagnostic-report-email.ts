import { DOMAIN_CONTENT, DOMAIN_NAME, DOMAIN_ORDER } from "@/content/diagnostic-quiz";
import { DIAGNOSTIC_RESULTS } from "@/content/diagnostic-copy";
import { escapeHtml } from "@/lib/email";
import type { DiagnosticResult } from "@/lib/diagnostic-score";

/**
 * The submitter's copy of their own diagnostic, as an email.
 *
 * WHY IT CARRIES THE WHOLE REPORT. The receipt used to say someone would follow
 * up with a first read, and the capture form above it promises a written report
 * by email. Nothing sent one. The reader was told twice that something was
 * coming and nothing was. This is that report, so the promise and the send are
 * the same act.
 *
 * ONE SOURCE, NOT TWO. Every string below comes from the same modules the
 * results screen renders: DOMAIN_CONTENT for the commentary, checks and offer,
 * DOMAIN_NAME for the six names, DIAGNOSTIC_RESULTS for the section labels. A
 * second copy of her commentary living in a route is exactly the drift that put
 * two versions of the service card grid in this tree.
 *
 * A PURE FUNCTION, deliberately. The route sends what this returns, and
 * scripts can render it to read without anything being posted. Nothing here
 * touches Resend, the network or the clock.
 *
 * DELIVERABILITY. Plain text and HTML say the same things in the same order.
 * No images, so no tracking pixel and nothing to block; no attachments; no
 * external stylesheet, because email clients do not load them. Inline styles
 * only, flat structure, no tables for layout and no nested divs: a long HTML
 * email is more likely to be filtered, so the markup stays as plain as the
 * content allows.
 *
 * THE HEX LITERALS ARE UNAVOIDABLE. Email clients do not support CSS custom
 * properties, so a token cannot be referenced and the value has to be written
 * out. They are the palette's own values and are registered in
 * scripts/palette-allow.json with that reason, as the enquiry route's are.
 */

const FOREST = "#013325";
const MID = "#009f50";
const MUTED = "#5e6f68";
const RULE = "#dfe6e2";

/** The site's own address, absolute because a relative link is dead in an inbox. */
const SITE = "https://pivotprime.ae";
const BOOK_URL = `${SITE}/contact`;

export type ReportEmail = { subject: string; text: string; html: string };

export function buildReportEmail(name: string, result: DiagnosticResult): ReportEmail {
  const { domainScores, overall, constraint, band } = result;
  const content = DOMAIN_CONTENT[constraint];
  const constraintName = DOMAIN_NAME[constraint];

  /* ------------------------------------------------------------ plain text */
  const textLines: string[] = [
    `Thank you for completing the diagnostic, ${name}.`,
    "",
    `Your score was ${overall} of 100, which puts you in the ${band.label} band. The area holding the business back most is ${constraintName}.`,
    "",
    "Your full report is below.",
    "",
    "----------------------------------------",
    "",
    "YOUR OPERATIONAL READINESS SCORE",
    `${overall} of 100`,
    `${band.label}. ${band.desc}`,
    "",
    "DOMAIN BREAKDOWN",
    ...DOMAIN_ORDER.map(
      (d) =>
        `  ${DOMAIN_NAME[d]}: ${domainScores[d]}${d === constraint ? "  (constraint)" : ""}`,
    ),
    "",
    "----------------------------------------",
    "",
    `PRIMARY CONSTRAINT: ${constraintName}`,
    "",
    DIAGNOSTIC_RESULTS.meansLabel,
    content.commentary,
    "",
    DIAGNOSTIC_RESULTS.checksLabel,
    ...content.checks.map((c, i) => `  ${i + 1}. ${c}`),
    "",
    DIAGNOSTIC_RESULTS.offerTag,
    DIAGNOSTIC_RESULTS.offerTitle,
    content.offer,
    "",
    "----------------------------------------",
    "",
    `${DIAGNOSTIC_RESULTS.bookLabel}: ${BOOK_URL}`,
    "",
    "Pivot Prime",
    SITE,
  ];

  /* ------------------------------------------------------------------ html */
  const p = (body: string, extra = "") =>
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${FOREST};${extra}">${body}</p>`;
  const label = (body: string) =>
    `<p style="margin:0 0 8px;font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${MID}">${body}</p>`;
  const rule = `<hr style="border:0;border-top:1px solid ${RULE};margin:28px 0">`;

  const breakdown = DOMAIN_ORDER.map((d) => {
    const isConstraint = d === constraint;
    return `<p style="margin:0 0 6px;font-size:15px;line-height:1.5;color:${FOREST}">
<strong>${escapeHtml(DOMAIN_NAME[d])}</strong>: ${domainScores[d]}${
      isConstraint
        ? ` <span style="color:${MID};font-weight:bold">(constraint)</span>`
        : ""
    }</p>`;
  }).join("\n");

  const checks = content.checks
    .map(
      (c, i) =>
        `<p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:${FOREST}"><strong>${i + 1}.</strong> ${escapeHtml(c)}</p>`,
    )
    .join("\n");

  const html = `<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:8px">
${p(`Thank you for completing the diagnostic, ${escapeHtml(name)}.`)}
${p(`Your score was <strong>${overall} of 100</strong>, which puts you in the <strong>${escapeHtml(band.label)}</strong> band. The area holding the business back most is <strong>${escapeHtml(constraintName)}</strong>.`)}
${p("Your full report is below.")}
${rule}
${label(escapeHtml(DIAGNOSTIC_RESULTS.eyebrow))}
<p style="margin:0 0 6px;font-size:40px;line-height:1;font-weight:bold;color:${FOREST}">${overall}<span style="font-size:15px;font-weight:normal;color:${MUTED}"> of 100</span></p>
${p(`<strong>${escapeHtml(band.label)}</strong>. ${escapeHtml(band.desc)}`, `color:${MUTED}`)}
${rule}
${label(escapeHtml(DIAGNOSTIC_RESULTS.breakdownLabel))}
${breakdown}
${rule}
${label(escapeHtml(DIAGNOSTIC_RESULTS.constraintLabel))}
<p style="margin:0 0 16px;font-size:22px;line-height:1.25;font-weight:bold;color:${FOREST}">${escapeHtml(constraintName)}</p>
${label(escapeHtml(DIAGNOSTIC_RESULTS.meansLabel))}
${p(escapeHtml(content.commentary))}
${rule}
${label(escapeHtml(DIAGNOSTIC_RESULTS.checksLabel))}
${checks}
${rule}
${label(escapeHtml(DIAGNOSTIC_RESULTS.offerTag))}
<p style="margin:0 0 10px;font-size:17px;font-weight:bold;color:${FOREST}">${escapeHtml(DIAGNOSTIC_RESULTS.offerTitle)}</p>
${p(escapeHtml(content.offer))}
${rule}
<p style="margin:0 0 22px"><a href="${BOOK_URL}" style="background:${MID};color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;padding:13px 26px;border-radius:100px;display:inline-block">${escapeHtml(DIAGNOSTIC_RESULTS.bookLabel)}</a></p>
${p(`Pivot Prime<br><a href="${SITE}" style="color:${MID}">pivotprime.ae</a>`, `color:${MUTED};font-size:14px`)}
</div>`;

  return {
    subject: `Your diagnostic report: ${overall} of 100, ${constraintName}`,
    text: textLines.join("\n"),
    html,
  };
}
