import { describe, expect, it } from "vitest";
import { buildReportEmail } from "./diagnostic-report-email";
import { scoreDiagnostic } from "./diagnostic-score";
import { DOMAIN_CONTENT, DOMAIN_NAME, DOMAIN_ORDER } from "@/content/diagnostic-quiz";
import { escapeHtml } from "./email";

/**
 * Her copy contains apostrophes, so the HTML part carries "people&#39;s heads"
 * where the text part carries "people's heads". Asserting the raw string
 * against the HTML fails for the right reason: the escaping is correct and
 * necessary. Each part is checked in its own encoding.
 */
const inPart = (part: string, needle: string, isHtml: boolean) =>
  part.includes(isHtml ? escapeHtml(needle) : needle);

/**
 * The receipt has to carry the whole report, and the two parts have to agree.
 * A plain-text part that quietly falls behind the HTML is the failure mode
 * here: most clients show the HTML, so nobody notices until somebody reads it
 * in a text-only client and finds half a report.
 */

// Question order is fd pd cm dv pa tl, twice.
const PROCESS_WEAK = [4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4];
const TECH_WEAK = [4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 1];

const build = (answers: number[]) =>
  buildReportEmail("Test Person", scoreDiagnostic(answers));

describe("the report email carries everything the results screen shows", () => {
  for (const [label, answers, expected] of [
    ["process weak", PROCESS_WEAK, "pd"],
    ["tech weak", TECH_WEAK, "tl"],
  ] as const) {
    describe(label, () => {
      const result = scoreDiagnostic([...answers]);
      const mail = build([...answers]);

      it("names the right constraint in both parts and the subject", () => {
        expect(result.constraint).toBe(expected);
        const name = DOMAIN_NAME[expected];
        expect(mail.subject).toContain(name);
        expect(mail.text).toContain(name);
        expect(mail.html).toContain(name);
      });

      it("carries the score and the band with its description", () => {
        for (const [part, isHtml] of [
          [mail.text, false],
          [mail.html, true],
        ] as const) {
          expect(part).toContain(String(result.overall));
          expect(part).toContain(result.band.label);
          expect(inPart(part, result.band.desc, isHtml), "band description").toBe(true);
        }
      });

      it("carries all six domain scores", () => {
        for (const part of [mail.text, mail.html]) {
          DOMAIN_ORDER.forEach((d) => {
            expect(part).toContain(DOMAIN_NAME[d]);
            expect(part).toContain(String(result.domainScores[d]));
          });
        }
      });

      it("carries the constraint's own commentary, checks and offer", () => {
        const content = DOMAIN_CONTENT[expected];
        for (const [part, isHtml] of [
          [mail.text, false],
          [mail.html, true],
        ] as const) {
          expect(inPart(part, content.commentary, isHtml), "commentary").toBe(true);
          content.checks.forEach((c, i) =>
            expect(inPart(part, c, isHtml), `check ${i + 1}`).toBe(true),
          );
          expect(inPart(part, content.offer, isHtml), "offer").toBe(true);
        }
      });

      it("does not carry another domain's commentary", () => {
        const other = expected === "pd" ? "tl" : "pd";
        expect(inPart(mail.text, DOMAIN_CONTENT[other].commentary, false)).toBe(false);
        expect(inPart(mail.html, DOMAIN_CONTENT[other].commentary, true)).toBe(false);
      });

      it("points the booking call to action at /contact", () => {
        expect(mail.text).toContain("https://pivotprime.ae/contact");
        expect(mail.html).toContain('href="https://pivotprime.ae/contact"');
      });

      it("promises no separate email", () => {
        for (const part of [mail.text, mail.html]) {
          expect(part.toLowerCase()).not.toContain("goes to your inbox");
          expect(part.toLowerCase()).not.toContain("will follow up");
          expect(part.toLowerCase()).not.toContain("send you");
        }
      });

      it("keeps to the house style: no em dash, no exclamation mark", () => {
        for (const part of [mail.text, mail.html]) {
          expect(part).not.toContain("—");
          expect(part).not.toContain("!");
        }
      });

      it("stays deliverable: no image, no attachment, nothing external", () => {
        expect(mail.html).not.toContain("<img");
        expect(mail.html).not.toContain("background-image");
        expect(mail.html).not.toMatch(/src\s*=/);
        // The only absolute URLs are our own, and both are links, not assets.
        const urls = mail.html.match(/https?:\/\/[^"'\s)]+/g) ?? [];
        urls.forEach((u) => expect(u.startsWith("https://pivotprime.ae")).toBe(true));
      });

      it("keeps the markup flat, with no layout tables or nested wrappers", () => {
        expect(mail.html).not.toContain("<table");
        // One wrapper div and nothing nested inside another div.
        expect(mail.html.match(/<div/g) ?? []).toHaveLength(1);
      });
    });
  }

  it("changes the commentary when the constraint changes", () => {
    expect(build(PROCESS_WEAK).text).not.toBe(build(TECH_WEAK).text);
    expect(build(PROCESS_WEAK).html).not.toBe(build(TECH_WEAK).html);
  });

  it("says the same things in the same order in both parts", () => {
    const mail = build(PROCESS_WEAK);
    // Strip the HTML to its text and compare the sequence of section labels.
    const stripped = mail.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const markers = [
      "Thank you for completing the diagnostic",
      "Your full report is below",
      "Domain breakdown",
      "Primary constraint",
      "What this means for your business",
      "Three things to check this week",
      "What Pivot Prime would do about it",
      "Book a call with Iram",
    ];
    let lastText = -1;
    let lastHtml = -1;
    markers.forEach((m) => {
      const inText = mail.text.toLowerCase().indexOf(m.toLowerCase());
      const inHtml = stripped.toLowerCase().indexOf(m.toLowerCase());
      expect(inText, `"${m}" missing from the plain text part`).toBeGreaterThan(-1);
      expect(inHtml, `"${m}" missing from the HTML part`).toBeGreaterThan(-1);
      expect(inText, `"${m}" is out of order in the plain text part`).toBeGreaterThan(lastText);
      expect(inHtml, `"${m}" is out of order in the HTML part`).toBeGreaterThan(lastHtml);
      lastText = inText;
      lastHtml = inHtml;
    });
  });
});
