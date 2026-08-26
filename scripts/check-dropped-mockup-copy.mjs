#!/usr/bin/env node
/**
 * The mockup check, run backwards.
 *
 * WHY THIS EXISTS
 *
 * `check-unsanctioned-copy.mjs` asks: does the site render copy that traces to
 * nothing the client wrote? Adding her mockups as a source fixed eleven lines
 * that were being credited to us.
 *
 * It cannot ask the other question. A heading we have already deleted renders
 * nowhere, so it is not in the set that check inspects, and no amount of
 * provenance sources will surface it. That is not hypothetical:
 *
 *   PENDING-COPY 1f recorded three headings as "copy we had written to fill
 *   gaps" and retired them — "An app you want built, or a process that is
 *   eating your team", "Automate everything", "Fix the constraint first".
 *   All three are in req/pivotprime-service-pages.html and have been since
 *   13 August. They were hers. We deleted the client's copy believing it was
 *   ours, and told her so in the file we were about to send her.
 *
 * So this walks her mockups and reports headings and buttons in them that the
 * site no longer renders anywhere.
 *
 * IT REPORTS, IT DOES NOT FAIL. A mockup is a design, not a contract: it
 * carries alternatives, superseded drafts and sections the spec later replaced,
 * and every real absence here is a judgement about which of her instructions is
 * later. Failing the build on it would make the list a nuisance to be silenced
 * rather than a list to be read. Anything deliberate goes in KNOWN_ABSENT below
 * with the reason, which is what keeps the report short enough to be read.
 *
 *   node scripts/check-dropped-mockup-copy.mjs [baseUrl]
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";

const BASE = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const norm = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;|&#8217;|’|‘/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

/**
 * Copy in a mockup that is deliberately not on the site.
 *
 * Every entry names why, in the same shape as the audit's gated list: a reason
 * that is a decision, not a shrug. "We preferred ours" is not a reason; "the
 * spec supersedes it" or "she removed it on slide N" is.
 */
const KNOWN_ABSENT = [
  {
    file: "pivotprime-about.html",
    why: "the 13 August About mockup, superseded in full by pp-about-v2_2.html and by slides 21 and 22, which the page is now built from",
  },
  {
    file: "pivotprime-how-we-work.html",
    why: "the How We Work page is off the site on her slide 17 comment. Hidden, not deleted: every sentence is in PENDING-COPY 1x",
  },
  {
    file: "report-template.html",
    why: "the diagnostic report template. The diagnostic is out of stage one, so none of it is built yet",
  },
  {
    file: "pivotprime-persona-pages.html",
    why: "slide 18 strips the audience pages to the heading, the sub-line and the box, and her headlines here contradict sections 5.1 to 5.4. PENDING-COPY 2.3",
  },
  {
    file: "pivotprime-persona-tiles.html",
    why: "same as pivotprime-persona-pages.html: slide 18 and PENDING-COPY 2.3",
  },
  {
    // NOT dropped copy. Her services mockup and spec 3.4 disagree on two of the
    // five card buttons and agree on the other three, and the spec's are green
    // final-copy blocks, which section 1 says are verbatim.
    //   spec 3.4 block 27: "See what tech we can build"  vs mockup "See what we build"
    //   spec 3.4 block 33: "What market entry includes"  vs mockup "How market entry works"
    match: "See what we build",
    why: "spec 3.4 block 27 gives this button as \"See what tech we can build\", a green block, and that is what the site carries",
  },
  {
    match: "How market entry works",
    why: "spec 3.4 block 33 gives this button as \"What market entry includes\", a green block, and that is what the site carries",
  },
  {
    match: "Real problems. Real results.",
    why: "pp-case-studies.html is later and words it \"Real problems, real execution, real results\", which is what the site carries",
  },
  {
    match: "Performance Overview",
    why: "spec 3.3 gives this band its own heading, and a green copy block outranks a label on a mockup",
  },
  {
    match: "Your monthly cost",
    why: "she removed this row herself between the 13 August and 22 August service mockups, and section 1 allows one price on the site",
  },
  {
    match: "Mid-Market Execution Owner",
    why: "renamed to P&L owner on slide 9 of the 22 August deck. PENDING-COPY 1v",
  },
  {
    match: "Clients are anonymised",
    why: "her two files disagree on this and the contradiction is logged for her rather than resolved here. PENDING-COPY 1ac",
  },
];

function mockupCopy() {
  const dir = join(process.cwd(), "req");
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".html"));
  if (!files.length) {
    throw new Error("dropped-copy: no mockups in req/. They are tracked, so an empty directory is a broken checkout.");
  }
  const out = [];
  for (const file of files) {
    const html = readFileSync(join(dir, file), "utf8")
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ");
    // Headings and buttons only, the same scope as the forward check: prose is
    // recombined and split across elements and a substring test over it reports
    // noise rather than findings.
    for (const m of html.matchAll(/<(h[1-6]|button|a)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
      const text = m[2]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const words = text.split(" ").length;
      if (!text || words < 2 || words > 14) continue;
      out.push({ file, text, key: norm(text) });
    }
  }
  return out;
}

const candidates = mockupCopy();

// Everything the site renders anywhere, as one normalised body of text per
// route. Compared against the FULL document, chrome included, because copy that
// moved into the header or the footer has not been dropped.
const routes = (await (await fetch(`${BASE}/sitemap.xml`)).text())
  .match(/<loc>([^<]+)<\/loc>/g)
  .map((l) => new URL(l.replace(/<\/?loc>/g, "")).pathname);

const browser = await chromium.launch({ channel: "chrome" });
const rendered = [];
for (const route of routes) {
  const page = await browser.newPage({ javaScriptEnabled: false });
  const res = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null);
  if (!res || !res.ok()) {
    await page.close();
    throw new Error(`dropped-copy: ${route} would not load, so this run does not cover the whole site`);
  }
  rendered.push(norm(await page.evaluate(() => document.body.innerText)));
  await page.close();
}
await browser.close();

const seen = new Set();
const dropped = [];
for (const c of candidates) {
  if (seen.has(c.key)) continue;
  seen.add(c.key);
  if (rendered.some((r) => r.includes(c.key))) continue;
  const known = KNOWN_ABSENT.find(
    (k) => (k.file && k.file === c.file) || (k.match && norm(c.text).includes(norm(k.match))),
  );
  dropped.push({ ...c, known });
}

const unexplained = dropped.filter((d) => !d.known);
console.log(
  `dropped-copy: checked ${seen.size} headings and buttons from ${new Set(candidates.map((c) => c.file)).size} client mockups across ${routes.length} routes`,
);
const byFile = new Map();
for (const d of dropped.filter((x) => x.known && x.known.file)) {
  byFile.set(d.known.file, (byFile.get(d.known.file) ?? 0) + 1);
}
for (const [file, n] of byFile) {
  console.log(`  ~ ${file}: ${n} not on the site  (${KNOWN_ABSENT.find((k) => k.file === file).why})`);
}
for (const d of dropped.filter((x) => x.known && !x.known.file)) {
  console.log(`  ~ "${d.text}"  (${d.known.why})`);
}
if (!unexplained.length) {
  console.log("dropped-copy: nothing of hers is missing without a reason");
  process.exit(0);
}
console.log(`\n${unexplained.length} in her mockups and on no page of the site:\n`);
for (const d of unexplained) {
  console.log(`  ${d.file}`);
  console.log(`    "${d.text}"`);
}
console.log(
  `\nEach one is either hers and should be back, or superseded by a later instruction.\n` +
    `If it is superseded, add it to KNOWN_ABSENT with the instruction that supersedes it.\n` +
    `This reports and does not fail: a mockup is a design, not a contract.`,
);
