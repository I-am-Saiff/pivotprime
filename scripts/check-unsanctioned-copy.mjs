#!/usr/bin/env node
/**
 * The audit, run backwards.
 *
 * WHY THIS EXISTS
 *
 * `audit-spec-copy.mjs` asks one question, 198 times: is this spec block on the
 * site? It reached 0 of 198 missing and stayed there while two calls to action
 * that the spec never authorised sat on screen, one of them the exact wording
 * spec 2.2 line 226 instructs removing. It could not have caught either. Copy
 * the document never asked for is invisible to a check that only walks the
 * document.
 *
 * So this one walks the other way: every heading and every call to action the
 * site actually renders must trace to a block in docs/spec.md, to one of the
 * client's own mockups in req/, or to an entry in scripts/sanctioned-copy.json
 * that says who decided it and where the client can read about it. Anything
 * else fails.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 *
 * It does not check body copy. Prose is recombined, split across elements and
 * interleaved with markup, and a substring test over it produces noise rather
 * than findings. Headings and CTAs are short, whole, and are exactly where
 * invented copy has actually appeared.
 *
 *   node scripts/check-unsanctioned-copy.mjs [baseUrl]
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { loadSpecBlocks, loadSpecGridCells } from "./spec-blocks.mjs";

const BASE = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const SANCTIONED = JSON.parse(readFileSync(join(process.cwd(), "scripts", "sanctioned-copy.json"), "utf8"));

/** Compare on letters and digits only: casing, punctuation and entities differ
 *  between the document and the DOM and none of those differences are the
 *  defect this is looking for. */
const norm = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");


// Every word of the spec, normalised, as one haystack. A heading is sanctioned
// if the document contains it anywhere: which section it came from is the copy
// audit's job, not this one's.
const specHaystack = norm(Object.values(loadSpecBlocks()).flat().join(" "));

// The green copy blocks are not the whole document. The instruction tables in
// sections 2.5 and 5 are dashed grid tables, which the block loader does not
// read, and the "Change to" column of those tables is the client's own wording.
// Five sub-lines on the persona pages were recorded here as copy we invented
// because of that gap, and they were about to be sent to her as ours.
//
// Matched cell by cell rather than as one joined haystack. Joined, two adjacent
// and unrelated cells sanctioned "We understand human behaviour" between them.
const specGridCells = loadSpecGridCells().map(norm);

/**
 * The client's own mockups, as text, one visible run at a time.
 *
 * WHY THIS IS THE FOURTH SOURCE
 *
 * Copy on this site comes from four places, not three. The copy document, the
 * live pivotprime.ae, the decisions listed in sanctioned-copy.json — and the
 * HTML mockups in req/, which she wrote and sent and which carry finished
 * wording, not just layout.
 *
 * That fourth one was missing, so anything taken from a mockup fell through to
 * "we invented this". Eleven of the twenty-nine lines in the authored list were
 * hers: the whole Fractional Leadership set and both Build and Place headings
 * out of pivotprime-service-pages.html, "Design the execution roadmap" out of
 * both persona mockups, and "Professional Services · UAE" out of pp-about-v2_2.
 * The client file was about to ask her to approve eleven lines she wrote.
 *
 * Runs are kept separate rather than joined into one string, for the reason the
 * grid-cell loader gives: a joined haystack sanctions phrases that exist only
 * across the boundary between two unrelated elements.
 */
function loadClientMockups() {
  const dir = join(process.cwd(), "req");
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".html"));
  if (!files.length) {
    throw new Error("reverse-audit: no mockups found in req/. They are tracked, so an empty directory is a broken checkout, not a site with no mockups.");
  }
  const runs = [];
  for (const file of files) {
    const html = readFileSync(join(dir, file), "utf8")
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      // Inline tags are transparent to innerText, which is what the site side of
      // this comparison collects. Both the mockup and the page write half a
      // heading inside a <span> to colour it: "Heavy at the start. <span>Light by
      // the end.</span>". Splitting on every tag cuts that in two and the whole
      // heading matches nothing. Block tags still split, so unrelated elements
      // are never joined.
      .replace(/<\/?(span|b|strong|i|em|u|a|small|sup|sub|mark|code)\b[^>]*>/gi, "")
      .replace(/<br\s*\/?>/gi, " ");
    for (const run of html.split(/<[^>]+>/)) {
      const key = norm(run);
      if (key) runs.push({ file, key });
    }
  }
  return runs;
}

const mockupRuns = loadClientMockups();

/** Traceable to something the client wrote: the document, or one of her mockups. */
const inClientSource = (key) =>
  specHaystack.includes(key) ||
  specGridCells.some((c) => c.includes(key)) ||
  mockupRuns.some((r) => r.key.includes(key));

const sanctioned = new Map(SANCTIONED.entries.map((e) => [norm(e.text), e]));

/**
 * The sitemap is a starting point, not the route list.
 *
 * Driving off it alone silently skipped /privacy, which is deliberately excluded
 * from the sitemap because it carries noindex. A page nobody indexes still has
 * headings and buttons a visitor reads, so it still has to trace. Every internal
 * link found while auditing is followed, so a route can only escape this by
 * being linked from nowhere, which check-links already fails on.
 */
async function seedRoutes() {
  const res = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(15000) }).catch(() => null);
  if (!res?.ok) return ["/"];
  const xml = await res.text();
  const seeds = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || "/");
  return seeds.length ? seeds : ["/"];
}

/**
 * STRUCTURE, NOT STRING POSITION.
 *
 * This used to do `html.split(/<\/header>/i).pop()` to skip the site header.
 * Two things were wrong with that. `<header>` is a valid sectioning element and
 * the homepage contains three of them, so it kept only what followed the LAST
 * one and silently discarded 31 links and 31 buttons, 71% of the page's calls to
 * action, including every pattern chip. And the site header is a <nav>, not a
 * <header>, so the slice never excluded the thing it was written to exclude. It
 * reported "clean" on a page carrying "Discuss Your Fix", which is in neither
 * the spec nor the allowlist.
 *
 * So the document is parsed rather than cut. Chrome loads each route with
 * JavaScript DISABLED, which is the same served HTML the other checks read, and
 * the site header and footer are excluded by removing those nodes: they carry
 * data-site-header and data-site-footer for exactly this. No offset arithmetic
 * anywhere.
 */
const collect = (page, dropChrome) =>
  page.evaluate((drop) => {
    const doc = document.cloneNode(true);
    if (drop) {
      doc.querySelectorAll("[data-site-header], [data-site-footer]").forEach((n) => n.remove());
    }
    const out = [];
    const text = (el) => (el.textContent ?? "").replace(/\s+/g, " ").trim();
    doc.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => out.push({ kind: el.tagName.toLowerCase(), text: text(el) }));
    doc.querySelectorAll("a").forEach((el) => out.push({ kind: "link", text: text(el) }));
    doc.querySelectorAll("button").forEach((el) => out.push({ kind: "button", text: text(el) }));
    return out;
  }, dropChrome);

const { chromium } = await import("playwright-core");
let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch (err) {
  console.error(`reverse-audit: could not launch the system Chrome: ${err.message.split("\n")[0]}`);
  process.exit(0);
}
// JavaScript off, so this reads what the server sent, exactly like the others.
const context = await browser.newContext({ javaScriptEnabled: false });

const findings = [];
const unreachable = [];
const seen = new Set();
const liveNorm = new Set();
let inspected = 0;
const queue = await seedRoutes();
const visited = new Set(queue);
const allRoutes = [];

while (queue.length) {
  const route = queue.shift();
  const page = await context.newPage();
  // A route that will not load is NOT a route with nothing to report.
  // Swallowing it produced a confident summary over 3 of 16 routes when this was
  // pointed at a deployment that was still warming up: same silent failure as the
  // </header> slice, one layer out. Retried once, then recorded as a hard failure.
  let res = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null);
  if (!res || !res.ok()) {
    await page.waitForTimeout(2000);
    res = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null);
  }
  if (!res || !res.ok()) {
    unreachable.push({ route, status: res ? res.status() : "no response" });
    await page.close();
    continue;
  }
  allRoutes.push(route);

  for (const { text } of await collect(page, false)) liveNorm.add(norm(text));

  for (const href of await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
  )) {
    if (!href || !href.startsWith("/") || href.startsWith("/api")) continue;
    const target = href.split("#")[0].split("?")[0] || "/";
    if (!visited.has(target)) { visited.add(target); queue.push(target); }
  }

  for (const { kind, text } of await collect(page, true)) {
    if (!text || text.split(" ").length < 2) continue;
    if (text.split(" ").length > 14) continue;
    const key = norm(text);
    if (!key) continue;
    inspected += 1;
    if (inClientSource(key)) continue;
    if (sanctioned.has(key)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    findings.push({ route, kind, text });
  }
  await page.close();
}
await browser.close();

// An allowlist entry that no longer matches anything is a decision that has been
// quietly reverted or reworded, which is the same defect pointing the other way.
// Compared against the FULL document, chrome included, so moving a label into the
// header does not read as a deletion.
// status "removed" means the client asked for the line to go. The entry stays,
// so the deletion is recorded rather than the line simply vanishing from the
// audit, and it is not reported as a line that went missing on its own.
const stale = SANCTIONED.entries.filter(
  (e) => !liveNorm.has(norm(e.text)) && e.mustAppear !== false && e.status !== "removed",
);
const removedByClient = SANCTIONED.entries.filter((e) => e.status === "removed").length;

console.log(`reverse-audit: inspected ${inspected} headings and calls to action across ${allRoutes.length} routes`);

for (const u of unreachable) {
  console.error(`\n  ${u.route} could not be loaded (${u.status})`);
  console.error("    audited 0 items on it, so this run does not cover the whole site");
}

if (!findings.length && !stale.length && !unreachable.length) {
  const awaiting = SANCTIONED.entries.filter((e) => e.status === "awaiting-client").length;
  console.log(
    `reverse-audit: clean (${SANCTIONED.entries.length - awaiting} traced, ` +
      `${awaiting} awaiting the client in PENDING-COPY 1f, ` +
      `${removedByClient} removed on her instruction in PENDING-COPY 1ar)`,
  );
  process.exit(0);
}

for (const f of findings) {
  console.error(`\n  ${f.route}  <${f.kind}>  "${f.text}"`);
  console.error("    not in docs/spec.md and not in scripts/sanctioned-copy.json");
}
for (const s of stale) {
  console.error(`\n  sanctioned but no longer rendered: "${s.text}"`);
  console.error(`    ${s.why}`);
}
console.error(
  `\nreverse-audit: ${findings.length} unsanctioned, ${stale.length} stale, ` +
    `${unreachable.length} unreachable.` +
    `\nEvery entry needs a spec block behind it, or an entry in scripts/sanctioned-copy.json` +
    `\nnaming who decided it and where the client can read about it.`,
);
process.exit(1);
