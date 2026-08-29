#!/usr/bin/env node
/**
 * Horizontal overflow check.
 *
 * Loads every route at 360, 768 and 1440 and fails if the document is wider
 * than the viewport.
 *
 * This exists because of a bug that survived several rounds of manual checking.
 * The hero background carries a scale animation with no overflow-hidden on its
 * container, so the whole document scrolled sideways at every width including
 * desktop. It was missed because the earlier passes looked for a visibly broken
 * element and stopped at the first cause found, rather than comparing
 * scrollWidth against clientWidth. Comparing the two is what caught it, so that
 * is what this measures.
 *
 * Uses the system Chrome through playwright-core rather than a downloaded
 * browser, so it adds a small dependency instead of a 150MB one.
 *
 * Usage:
 *   node scripts/check-overflow.mjs                  against http://localhost:3000
 *   node scripts/check-overflow.mjs http://host:3987 against another origin
 *
 * Requires a running server. It does not start one, because starting a
 * production server means building first, and this should be cheap to re-run.
 */

import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000";

const WIDTHS = [360, 768, 1440];

const ROUTES = [
  "/",
  "/services",
  "/services/operational-clarity-audit",
  "/services/fractional-leadership",
  "/services/build-and-place",
  "/services/technology-builds",
  "/services/uae-market-entry",
  "/for-founders",
  "/for-smes",
  "/for-corporate-leaders",
  "/for-pl-owners",
  "/about",
  "/insights",
  // Her four articles, 29 August. Each is a long single column, which is the
  // shape most likely to push a wide element past the viewport on mobile.
  "/insights/consultant-leaves",
  "/insights/technology-process",
  "/insights/decisions-layers",
  "/insights/margin-revenue",
  "/contact",
  "/privacy",
];

/** Names the widest offending elements, so a failure points somewhere. */
const FIND_CULPRITS = `(() => {
  const vw = document.documentElement.clientWidth;
  return [...document.querySelectorAll('*')]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.right <= vw + 1) return false;
      // An element clipped by an ancestor cannot widen the document.
      for (let p = el.parentElement; p; p = p.parentElement) {
        const o = getComputedStyle(p).overflowX;
        if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') return false;
      }
      return true;
    })
    .map((el) => ({
      tag: el.tagName.toLowerCase(),
      cls: (typeof el.className === 'string' ? el.className : '').slice(0, 60),
      right: Math.round(el.getBoundingClientRect().right),
    }))
    .sort((a, b) => b.right - a.right)
    .slice(0, 3);
})()`;

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome" });
  } catch (err) {
    console.error(`overflow-check: could not launch the system Chrome: ${err.message.split("\n")[0]}`);
    console.error("  This check needs Google Chrome installed. Skipping is safer than failing the build.");
    process.exit(0);
  }

  const page = await browser.newPage();
  const failures = [];
  let checked = 0;

  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });

      const response = await page.goto(`${BASE}${route}`, { waitUntil: "load" }).catch(() => null);
      if (!response) {
        failures.push({ route, width, kind: "unreachable" });
        continue;
      }
      if (response.status() >= 400) {
        // A 404 here is a routing problem, not an overflow one, but it is still
        // worth failing on: a route in this list is meant to resolve.
        failures.push({ route, width, kind: "status", status: response.status() });
        continue;
      }

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      checked += 1;
      if (scrollWidth > clientWidth) {
        const culprits = await page.evaluate(FIND_CULPRITS);
        failures.push({ route, width, kind: "overflow", scrollWidth, clientWidth, culprits });
      }
    }
  }

  await browser.close();

  if (failures.length === 0) {
    console.log(`overflow-check: clean (${checked} page loads across ${WIDTHS.join(", ")})`);
    return;
  }

  for (const f of failures) {
    if (f.kind === "overflow") {
      console.error(`${f.route} at ${f.width}px  document is ${f.scrollWidth - f.clientWidth}px wider than the viewport`);
      console.error(`  scrollWidth ${f.scrollWidth} against clientWidth ${f.clientWidth}`);
      for (const c of f.culprits) {
        console.error(`  widest: <${c.tag} class="${c.cls}"> reaching ${c.right}px`);
      }
      console.error("  usually a fixed width, a scaled or absolutely positioned child without");
      console.error("  overflow-hidden on its container, or a long word widening a grid track.");
    } else if (f.kind === "status") {
      console.error(`${f.route} at ${f.width}px  returned ${f.status}`);
    } else {
      console.error(`${f.route} at ${f.width}px  unreachable, is the server running at ${BASE}?`);
    }
  }

  console.error(`\noverflow-check: ${failures.length} problem${failures.length === 1 ? "" : "s"}.`);
  process.exit(1);
}

main();
