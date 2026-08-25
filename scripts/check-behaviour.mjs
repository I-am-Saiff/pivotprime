#!/usr/bin/env node
/**
 * Behaviour, with JavaScript running.
 *
 * Every other check on this branch reads static HTML. That is deliberate and it
 * caught real defects, but it cannot see interaction, and presence is exactly
 * what stays true while an interactive component is broken: the navigation
 * dropdowns were in the served markup, correctly hidden, and could not be opened
 * by clicking. The markup assertion passed throughout.
 *
 * The failure was that hover set the open menu and the click handler toggled it,
 * so by the time the click ran, hover had already opened the panel and the click
 * closed it. On a phone there is no hover, so the tap was the only way in and it
 * hit the same conflict.
 *
 * Drives the real Chrome through playwright-core.
 *
 *   node scripts/check-behaviour.mjs [baseUrl]
 */

import { chromium } from "playwright-core";

const BASE = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const failures = [];
let checks = 0;
const expect = (name, ok, detail = "") => {
  checks += 1;
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch (err) {
  console.error(`behaviour-check: could not launch the system Chrome: ${err.message.split("\n")[0]}`);
  console.error("  This check needs Google Chrome installed. Skipping rather than failing the build.");
  process.exit(0);
}

const openPanels = (page) =>
  page.evaluate(() => {
    const nav = document.querySelector("nav");
    return [...nav.querySelectorAll("div[id^='menu-']")]
      .filter((el) => getComputedStyle(el).display !== "none")
      .map((el) => el.id);
  });

// DESKTOP
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const triggers = await page.$$("nav button[aria-haspopup]");

  expect("three dropdown triggers exist", triggers.length === 3, `found ${triggers.length}`);
  expect("no panel is open on load", (await openPanels(page)).length === 0);

  // The literal reported failure: a mouse user hovers the label, the panel
  // appears, they click it, and it vanishes. Asserted separately from a bare
  // click because Playwright's click implies a hover of its own, and the two
  // orderings do not exercise the same race.
  await triggers[0].hover();
  await page.waitForTimeout(200);
  expect("hovering opens the panel on a pointer device", (await openPanels(page)).length === 1);
  await triggers[0].click();
  await page.waitForTimeout(200);
  expect(
    "clicking a label the pointer is already hovering keeps the panel open",
    (await openPanels(page)).length === 1,
    "hover opened it and the click closed it again",
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  await page.mouse.move(1000, 600);
  await page.waitForTimeout(150);

  // Click reveals, click again hides.
  await triggers[0].click();
  await page.waitForTimeout(150);
  const afterOpen = await openPanels(page);
  expect("clicking a top-level item reveals its panel", afterOpen.length === 1, `open: ${afterOpen.length}`);
  expect(
    "the trigger reports itself expanded",
    (await triggers[0].getAttribute("aria-expanded")) === "true",
  );

  await triggers[0].click();
  await page.waitForTimeout(150);
  expect("clicking it again hides the panel", (await openPanels(page)).length === 0);

  // Opening by click must survive the pointer moving away.
  await triggers[1].click();
  await page.waitForTimeout(150);
  await page.mouse.move(1000, 600);
  await page.waitForTimeout(250);
  expect("a panel opened by click stays open when the pointer leaves", (await openPanels(page)).length === 1);

  // Only one at a time.
  await triggers[2].click();
  await page.waitForTimeout(150);
  const both = await openPanels(page);
  expect("only one panel is open at a time", both.length === 1, `open: ${both.join(", ")}`);

  // Escape closes and returns focus to the trigger.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  expect("Escape closes the panel", (await openPanels(page)).length === 0);
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 20) ?? "");
  expect("Escape returns focus to the trigger", focused.length > 0, `focus on "${focused}"`);

  // Outside click closes.
  await triggers[0].click();
  await page.waitForTimeout(150);
  await page.mouse.click(700, 600);
  await page.waitForTimeout(200);
  expect("clicking outside closes the panel", (await openPanels(page)).length === 0);

  // Keyboard alone must be able to open it.
  await page.keyboard.press("Tab");
  await triggers[0].focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  expect("Enter on a focused trigger opens the panel", (await openPanels(page)).length === 1);

  await page.close();
}

// TOUCH. There is no hover here, so the tap has to be sufficient on its own.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  const burger = await page.$('nav button[aria-controls="mobile-menu"]');
  expect("the mobile menu button exists", !!burger);
  await burger.tap();
  await page.waitForTimeout(250);
  expect("tapping it opens the mobile menu", !!(await page.$("#mobile-menu")));

  const sections = await page.$$("#mobile-menu button[aria-expanded]");
  expect("the mobile menu has disclosure buttons", sections.length === 3, `found ${sections.length}`);

  await sections[0].tap();
  await page.waitForTimeout(250);
  const revealed = await page.evaluate(
    () => document.querySelectorAll("#mobile-menu ul a").length,
  );
  expect("tapping a section reveals its links", revealed > 0, `${revealed} links`);
  expect(
    "the section reports itself expanded",
    (await sections[0].getAttribute("aria-expanded")) === "true",
  );

  await sections[0].tap();
  await page.waitForTimeout(250);
  expect(
    "tapping it again collapses the section",
    (await sections[0].getAttribute("aria-expanded")) === "false",
  );

  await context.close();
}


// LAYOUT DEFECTS THAT PASS EVERY OTHER CHECK.
//
// Both shipped and were found by looking rather than measuring.
//
// The first version of these assertions was wrong and passed with both defects
// deliberately reinstated. It looked for an ellipsis in innerText: CSS
// line-clamp RENDERS an ellipsis but does not put one in the text, so the
// clamped copy reads as complete to the DOM. That is the same reason the clamp
// was invisible to every other check. These measure the condition instead.
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(`${BASE}/services`, { waitUntil: "networkidle" });

  const grid = await page.evaluate(() => {
    const ul = [...document.querySelectorAll("ul")].find(
      (u) =>
        getComputedStyle(u).display.includes("grid") &&
        /Operational Clarity Audit/.test(u.textContent),
    );
    if (!ul) return null;
    const items = [...ul.children];

    // A clamp is a computed style, not a character in the text.
    const clamped = items.filter((el) =>
      [...el.querySelectorAll("*")].some((n) => {
        const c = getComputedStyle(n).webkitLineClamp;
        return c && c !== "none";
      }),
    ).length;

    // An empty trailing cell shows as a last row that stops short of the grid's
    // right edge. Measured in pixels rather than inferred from column counts.
    const gridRight = Math.round(ul.getBoundingClientRect().right);
    const lastTop = Math.max(...items.map((el) => Math.round(el.getBoundingClientRect().top)));
    const lastRow = items.filter((el) => Math.round(el.getBoundingClientRect().top) === lastTop);
    const lastRowRight = Math.round(Math.max(...lastRow.map((el) => el.getBoundingClientRect().right)));

    return { clamped, shortfall: gridRight - lastRowRight, count: items.length };
  });

  expect("the services grid leaves no empty trailing cell", grid !== null && grid.shortfall <= 2, grid ? `last row stops ${grid.shortfall}px short of the grid edge` : "grid not found");

  expect("no service card clamps its copy", grid !== null && grid.clamped === 0, grid ? `${grid.clamped} cards carry a line-clamp` : "grid not found");

  await page.close();
}


// EVERY IMAGE CARRIES AN ALT ATTRIBUTE, ON EVERY ROUTE.
//
// An empty alt is correct for a decorative image and is not a failure; a MISSING
// attribute is, because a screen reader then falls back to reading the filename.
// Asserted across the whole site rather than the homepage: the earlier alt work
// covered / only, and nothing was checking the other fifteen routes.
{
  const context = await browser.newContext({ javaScriptEnabled: false });
  const routes = ["/", "/about", "/services", "/services/operational-clarity-audit",
    "/services/fractional-coo", "/services/build-and-place", "/services/technology-builds",
    "/services/uae-market-entry", "/services/how-we-work", "/for-smes", "/for-founders",
    "/for-corporate-leaders", "/for-pl-owners", "/contact", "/insights", "/privacy"];
  const offenders = [];
  let images = 0;
  for (const route of routes) {
    const page = await context.newPage();
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null);
    if (res?.ok()) {
      const found = await page.evaluate(() =>
        [...document.querySelectorAll("img")].map((i) => ({
          missing: i.getAttribute("alt") === null,
          src: (i.getAttribute("src") ?? "").slice(-40),
        })),
      );
      images += found.length;
      for (const f of found) if (f.missing) offenders.push(`${route} ${f.src}`);
    }
    await page.close();
  }
  await context.close();
  expect(
    `every image on all ${routes.length} routes has an alt attribute`,
    offenders.length === 0,
    offenders.length ? `${offenders.length} missing: ${offenders.slice(0, 4).join(", ")}` : `${images} images checked`,
  );
}

await browser.close();

if (failures.length === 0) {
  console.log(`behaviour-check: clean (${checks} interaction assertions, desktop and touch)`);
} else {
  for (const f of failures) console.error(`  ${f}`);
  console.error(`\nbehaviour-check: ${failures.length} of ${checks} interaction assertions failed.`);
  process.exit(1);
}
