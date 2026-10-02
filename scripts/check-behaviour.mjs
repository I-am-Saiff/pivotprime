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
    "/services/fractional-leadership", "/services/build-and-place", "/services/technology-builds",
    "/services/uae-market-entry", "/for-smes", "/for-founders",
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

// EVERY LOGO IS VISIBLE WHEN MOTION IS REDUCED. The rows scroll; a device that
// asks for less movement used to get them frozen at their start, so the logos
// her v3 slide 1 asked for, which sit at the end of each row, never appeared.
// Each named logo in the announced copy must lie inside its row's visible box.
{
  for (const [label, width, mobile] of [["desktop", 1440, false], ["touch", 375, true]]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: mobile, hasTouch: mobile, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    const hidden = await page.evaluate(() => {
      const out = [];
      // The announced copy only: the second copy exists for the loop and is
      // aria-hidden, and it carries its own heading.
      for (const h of document.querySelectorAll("[aria-hidden='false'] h3")) {
        const row = h.closest(".overflow-hidden");
        if (!row || !row.querySelector("img, svg[role='img']")) continue;
        const r = row.getBoundingClientRect();
        const copy = h.closest("[aria-hidden='false']");
        for (const el of copy.querySelectorAll("img[alt]:not([alt='']), svg[aria-label]")) {
          // The tile, not the image: a lazy image far below the fold can
          // measure 0 wide before it loads while its tile is fully in view.
          const b = (el.closest(".flex-shrink-0") || el).getBoundingClientRect();
          if (b.left < r.left - 1 || b.right > r.right + 1 || b.width === 0) out.push(el.getAttribute("alt") || el.getAttribute("aria-label"));
        }
      }
      return out;
    });
    expect(`${label}: with reduced motion every logo in both rows is visible`, hidden.length === 0, `out of view: ${hidden.join(", ")}`);
    await context.close();
  }
}

// ONE GAP BETWEEN EVERY HOMEPAGE SECTION, THE PHOTOGRAPH INCLUDED. Her v3
// slide 11: "Use the same spacing between every section". Measured from the
// lowest painted thing in one section to the highest in the next, 192 on a
// computer and 112 on a phone, within 2px. Movement is reduced so the logo
// rows wrap and stand still, and then measured once more on a phone with
// movement on, which is how phones come set: there the results become a swipe
// row with dots under it, and the dots' empty tap area made that one gap 130
// (pass 9 re-audit, 2 October). The page is scrolled through first so every
// section has revealed before anything is measured.
{
  for (const [label, width, mobile, want, motion] of [["desktop", 1440, false, 192, "reduce"], ["touch", 375, true, 112, "reduce"], ["touch, movement on", 375, true, 112, "no-preference"]]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: mobile, hasTouch: mobile, reducedMotion: motion });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    if (motion !== "reduce") {
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < total; y += 600) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(120); }
      await page.waitForTimeout(1200);
      // The swipe row must be there, or this run measures nothing new.
      const dots = await page.$$eval("button[aria-label^='Show ']", (b) => b.length);
      expect(`${label}: the results swipe row and its dots are on the page`, dots >= 5, `${dots} dot buttons`);
    }
    const gaps = await page.evaluate(() => {
      const secs = [...document.querySelectorAll("section")].filter((x) => x.offsetHeight > 0 && !x.closest("footer"));
      // What actually shows: each box is clipped by any ancestor that hides
      // overflow (the photograph's slow drift scales its image past the
      // section, which clips it), and text is measured by its lines, not by
      // invisible padding around it (the publication links carry 14px).
      const clip = (el, r, stop) => {
        let t = r.top, b = r.bottom;
        for (let a = el.parentElement; a && a !== stop.parentElement; a = a.parentElement) {
          const cs = getComputedStyle(a);
          if (cs.overflowY !== "visible" || cs.overflowX !== "visible") { const ar = a.getBoundingClientRect(); t = Math.max(t, ar.top); b = Math.min(b, ar.bottom); }
        }
        return [t, b];
      };
      const ext = (x) => {
        let top = Infinity, bot = -Infinity;
        x.querySelectorAll("*").forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || el.closest("[hidden]")) return;
          const painted = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px" || cs.backgroundImage !== "none" || /^(IMG|SVG|svg|VIDEO)$/.test(el.tagName);
          let r = null;
          if (painted) r = el.getBoundingClientRect();
          else if (el.children.length === 0 && el.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(el); const rs = [...rg.getClientRects()]; if (rs.length) r = { top: Math.min(...rs.map((q) => q.top)), bottom: Math.max(...rs.map((q) => q.bottom)), width: 9, height: 9 }; }
          if (!r || r.width < 2 || r.height < 2) return;
          const [t, b] = clip(el, r, x);
          if (b - t < 1) return;
          top = Math.min(top, t + scrollY); bot = Math.max(bot, b + scrollY);
        });
        return [top, bot];
      };
      const e = secs.map(ext); const g = [];
      for (let i = 1; i < e.length; i++) g.push(Math.round(e[i][0] - e[i - 1][1]));
      return g;
    });
    const off = gaps.filter((g) => Math.abs(g - want) > 2);
    expect(`${label}: every gap between homepage sections is ${want}`, gaps.length >= 8 && off.length === 0, `gaps ${gaps.join(", ")}`);
    await context.close();
  }
}

// HER PICTURES, MEASURED, 2 October: the services cards (v3 slide 2), the
// diagnostic opening (slide 7) and the Insights cards (slide 10). Each value
// was measured from her picture; these assert the shape of each, at 1440.
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE}/#services`, { waitUntil: "load" });
  const svc = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("#services ul > li > div")];
    return cards.map((c) => {
      const label = c.firstElementChild, cs = getComputedStyle(c), ls = getComputedStyle(label);
      const inner = c.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2;
      const link = c.querySelector("a"); const price = [...c.querySelectorAll("p")].find((p) => /AED/.test(p.textContent));
      return { fullWidth: Math.abs(label.getBoundingClientRect().width - inner) < 3, dark: ls.color === "rgb(1, 51, 37)", linkRule: getComputedStyle(link).borderTopWidth !== "0px", priceWeight: price ? getComputedStyle(price).fontWeight : null };
    });
  });
  expect("services: every label is a full-width bar in dark lettering", svc.length === 3 && svc.every((c) => c.fullWidth && c.dark), JSON.stringify(svc));
  expect("services: a rule above the link on We Diagnose and We Build, none on We Lead", svc.length === 3 && svc[0].linkRule && !svc[1].linkRule && svc[2].linkRule, JSON.stringify(svc.map((c) => c.linkRule)));
  expect("services: the price line is plain, not bold", svc[0]?.priceWeight === "500", `weight ${svc[0]?.priceWeight}`);
  if (process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTIC === "true") {
    const arrow = await page.evaluate(() => [...document.querySelectorAll("a[href='/diagnostic']")].some((a) => /TAKE THE DIAGNOSTIC\s*→/i.test(a.textContent.replace(/\s+/g, " "))));
    expect("services: the diagnostic panel button carries the arrow", arrow);
    await page.goto(`${BASE}/diagnostic`, { waitUntil: "load" });
    const d = await page.evaluate(() => {
      const h1 = document.querySelector("h1"); const para = h1.nextElementSibling; const btn = [...document.querySelectorAll("button")].find((b) => /start the diagnostic/i.test(b.textContent));
      return { para: getComputedStyle(para).fontSize, btnH: Math.round(btn.getBoundingClientRect().height), btnSize: getComputedStyle(btn).fontSize };
    });
    expect("diagnostic: the opening is at her picture's size", d.para === "24px" && d.btnH >= 82 && d.btnSize === "19px", JSON.stringify(d));
  }
  await page.goto(`${BASE}/insights`, { waitUntil: "load" });
  const ins = await page.evaluate(() => {
    // The post grid only; the featured card above it has its own design.
    const cards = [...document.querySelectorAll("[data-post-group] .grid.lg\\:grid-cols-3 > a[data-post-tag]")];
    const grid = cards[0]?.closest(".grid");
    return { n: cards.length, gridW: Math.round(grid?.getBoundingClientRect().width || 0), white: cards.every((c) => getComputedStyle(c).backgroundColor === "rgb(255, 255, 255)"),
      metaBelow: cards.every((c) => { const spans = c.querySelector(".flex-col.gap-px"); return spans && spans.children.length === 2 && spans.children[1].getBoundingClientRect().top > spans.children[0].getBoundingClientRect().top; }),
      initialsWhite: cards.every((c) => getComputedStyle(c.querySelector(".rounded-full")).color === "rgb(255, 255, 255)") };
  });
  expect("insights: the cards follow her picture (white, 1180 grid, date under the name, white initials)", ins.n >= 6 && ins.gridW === 1180 && ins.white && ins.metaBelow && ins.initialsWhite, JSON.stringify(ins));
  await page.close();
}

// HER PICTURES, THE SECOND ROUND, 2 October (pass 9b). The weights are asserted
// on the face the browser actually drew, not on the CSS: font-extrabold drew
// in Poppins Bold for the whole life of this site, because 800 was never
// loaded, and a computed font-weight of 800 said otherwise. Chrome names the
// face it used for each element through the DevTools protocol.
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const cdp = await page.context().newCDPSession(page);
  const drawn = async (selector) => {
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
    const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector });
    const faces = [];
    for (const nodeId of nodeIds) faces.push((await cdp.send("CSS.getPlatformFontsForNode", { nodeId })).fonts.map((f) => f.postScriptName || f.familyName).join("+"));
    return faces;
  };
  const all = (faces, re) => faces.length > 0 && faces.every((f) => re.test(f));

  await page.goto(`${BASE}/#services`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const card = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("#services ul > li > div")];
    const lead = cards[1].querySelector("h3, h2"); const t = lead.firstChild; const r = document.createRange();
    let firstLine = ""; let top0 = null;
    for (let i = 0; i < t.textContent.length; i++) { r.setStart(t, i); r.setEnd(t, i + 1); const top = Math.round(r.getBoundingClientRect().top); if (top0 === null) top0 = top; if (top > top0 + 3) break; firstLine += t.textContent[i]; }
    return { radius: cards.map((c) => getComputedStyle(c).borderRadius), padTop: getComputedStyle(cards[0]).paddingTop, bodyLH: getComputedStyle(cards[0].querySelectorAll("p")[1] || cards[0].querySelector("p")).lineHeight, firstLine: firstLine.trim(),
      arrowW: Math.max(...cards.map((c) => c.querySelector("a span[aria-hidden]").getBoundingClientRect().width)) };
  });
  expect("services: her corners, padding, line spacing and title breaks (We Lead breaks after \"Chief of\")",
    card.radius.every((r) => r === "20px") && card.padTop === "32px" && card.bodyLH === "24.5px" && card.firstLine === "Fractional COO, CFO and Chief of", JSON.stringify(card));
  const arrows = await drawn("#services ul > li > div a span[aria-hidden]");
  expect("services: the card arrows are drawn at the link's size from the system font, not Arial", card.arrowW < 15 && arrows.length === 3 && !arrows.some((f) => /Arial/.test(f)), `${card.arrowW}px, ${arrows.join(", ")}`);
  expect("services: the labels are drawn in Poppins ExtraBold", all(await drawn("#services ul > li > div > span"), /^Poppins-ExtraBold$/), (await drawn("#services ul > li > div > span")).join(", "));
  if (process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTIC === "true") {
    const panel = await page.evaluate(() => { const p = document.querySelector("[data-services-grid] > div.bg-forest"); const cs = getComputedStyle(p); const body = p.querySelector("p"); return { pad: `${cs.paddingTop} ${cs.paddingLeft}`, bodyW: Math.round(body.getBoundingClientRect().width), bodyFS: getComputedStyle(body).fontSize }; });
    const heavy = [...await drawn("[data-services-grid] > div.bg-forest :is(h2, h3)"), ...await drawn("[data-services-grid] > div.bg-forest a > span")];
    expect("services: the diagnostic panel is spaced as her picture, its heading and button in ExtraBold", panel.pad === "48px 52px" && panel.bodyW <= 580 && panel.bodyFS === "14.08px" && heavy.length === 2 && heavy.every((f) => /Poppins-ExtraBold/.test(f)), `${JSON.stringify(panel)} ${heavy.join(", ")}`);
  }

  const founder = await page.evaluate(() => { const e = [...document.querySelectorAll("p")].find((x) => /^Meet the CEO/i.test(x.textContent.trim())); return e && { mb: getComputedStyle(e).marginBottom, ls: getComputedStyle(e).letterSpacing }; });
  expect("homepage: the founder eyebrow has her spacing (22px under it, letters at 0.16em)", founder?.mb === "22px" && founder?.ls === "1.92px", JSON.stringify(founder));

  await page.goto(`${BASE}/about`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const team = await page.evaluate(() => [...document.querySelectorAll("#team ul > li.flex, #team article")].map((c) => ({
    name: getComputedStyle(c.querySelector("h3")).fontSize, shadow: getComputedStyle(c).boxShadow,
    tag: getComputedStyle(c.querySelector("ul.flex li")).fontSize, btn: getComputedStyle(c.querySelector("a[href*='linkedin.com/in']")).fontSize,
    bio: getComputedStyle(c.querySelector("h3 + div")).fontSize })));
  const flat = (v) => v === "none" || v.split(/,(?![^(]*\))/).every((l) => l.includes("rgba(0, 0, 0, 0)") || !/[1-9]/.test(l.replace(/rgba?\([^)]*\)/, "")));
  const four = team.slice(1);
  expect("about: the team cards carry her file's sizes and no shadow",
    team.length === 5 && team.every((c) => flat(c.shadow) && c.tag === "12.48px" && c.btn === "12.8px") && four.every((c) => c.name === "25.6px" && c.bio === "15.68px"), JSON.stringify(team));
  expect("about: every name on the team cards is drawn in Poppins ExtraBold", all(await drawn("#team h3"), /^Poppins-ExtraBold$/), (await drawn("#team h3")).join(", "));

  if (process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTIC === "true") {
    await page.goto(`${BASE}/diagnostic`, { waitUntil: "load" });
    await page.waitForTimeout(400);
    const h1 = await drawn("h1");
    const btnId = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find((x) => /start the diagnostic/i.test(x.textContent)); b.setAttribute("data-check-start", ""); return true; });
    const btn = btnId ? await drawn("[data-check-start]") : [];
    expect("diagnostic: the heading is drawn in Poppins Black and the button in ExtraBold, as her picture", all(h1, /^Poppins-Black$/) && btn.length === 1 && /Poppins-ExtraBold/.test(btn[0]), `${h1.join(", ")} | ${btn.join(", ")}`);
  }

  await page.goto(`${BASE}/insights`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  // DRAWN, NOT TYPED (pass 9c): a typed arrow comes from each visitor's own
  // system font, and on a Mac its head was more than twice the height of hers.
  const ia = await page.$$eval("[data-post-group] .grid.lg\\:grid-cols-3 > a[data-post-tag]", (cards) => cards.map((c) => {
    const s = c.querySelector("[data-card-arrow]"); const svg = s?.querySelector("svg"); const r = svg?.getBoundingClientRect();
    return s && svg && !s.textContent.trim() ? `${Math.round(r.width)}x${Math.round(r.height)}` : "typed";
  }));
  expect("insights: every card arrow is drawn at her picture's size (about 10 by 4, in an 8 tall box), not typed", ia.length >= 6 && ia.every((x) => x === "10x8"), ia.join(", "));
  await page.close();
}

// HER PICTURES, THE THIRD ROUND, 2 October (pass 9c): the service card shadow
// (slide 2), the founder section as her second picture (slide 3), and the team
// cards without a border (slide 5).
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const cdp = await page.context().newCDPSession(page);
  const drawn = async (selector) => {
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
    const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector });
    const faces = [];
    for (const nodeId of nodeIds) faces.push((await cdp.send("CSS.getPlatformFontsForNode", { nodeId })).fonts.map((f) => f.postScriptName || f.familyName).join("+"));
    return faces;
  };
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const shadows = await page.$$eval("#services ul > li > div", (cards) => cards.map((c) => getComputedStyle(c).boxShadow));
  expect("services: the cards carry her faint shadow, not the wide one", shadows.length === 3 && shadows.every((v) => /0px 1px 3px/.test(v) && /0px 4px 16px/.test(v) && !/48px/.test(v)), [...new Set(shadows)].join(" | "));
  const f = await page.evaluate(() => {
    const e = [...document.querySelectorAll("p")].find((x) => /^Meet the CEO/i.test(x.textContent.trim()));
    const h = e.nextElementSibling; const ps = [...h.nextElementSibling.querySelectorAll("p")]; const a = h.nextElementSibling.nextElementSibling;
    h.setAttribute("data-check-founder-h", ""); a.setAttribute("data-check-founder-a", "");
    return { ls: getComputedStyle(h).letterSpacing, lh: ps.map((p) => getComputedStyle(p).lineHeight), btnShadow: getComputedStyle(a).boxShadow, btnSize: getComputedStyle(a).fontSize };
  });
  const fh = await drawn("[data-check-founder-h]"), fa = await drawn("[data-check-founder-a]");
  expect("homepage: the founder section follows her second picture (ExtraBold heading, untightened, paragraphs at 1.8, ExtraBold button with no shadow)",
    /^Poppins-ExtraBold$/.test(fh[0] || "") && /Poppins-ExtraBold/.test(fa[0] || "") && f.ls === "normal" && f.lh.length === 2 && f.lh.every((v) => v === "28.8px") && !/[1-9]\d*px [1-9]/.test(f.btnShadow.replace(/rgba?\([^)]*\)/g, "")) && f.btnSize === "13px",
    `${fh.join(",")} | ${fa.join(",")} | ${JSON.stringify(f)}`);
  await page.goto(`${BASE}/about`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const t = await page.evaluate(() => [...document.querySelectorAll("#team ul > li.flex, #team article")].map((c) => ({ border: getComputedStyle(c).borderTopWidth, tagsTop: getComputedStyle(c.querySelector("ul.flex")).marginTop })));
  expect("about: no border round any team card, and her 4px above the tags on the four from her file", t.length === 5 && t.every((c) => c.border === "0px") && t.slice(1).every((c) => c.tagsTop === "4px"), JSON.stringify(t));
  await page.close();
}

// THE NEW LOGO TILES CARRY THE OLD TILES' GLOW. The four tiles drawn in CSS
// (Ford, dubizzle, OSN and the delivered-for four) were a flat near-black
// beside the six original pictures, which have a faint green glow at the foot.
// Each CSS tile must paint the glow: a radial gradient over black.
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "load" });
  const flat = await page.$$eval("[aria-hidden='false'] .logo-tile, [aria-hidden='false'] .rounded-lg.aspect-\\[345\\/185\\]", (tiles) =>
    tiles.filter((t) => !/radial-gradient/.test(getComputedStyle(t).backgroundImage)).map((t) => (t.querySelector("img, svg")?.getAttribute("alt") || t.querySelector("svg")?.getAttribute("aria-label") || "?")),
  );
  const count = await page.$$eval("[aria-hidden='false'] .logo-tile", (t) => t.length);
  expect("every logo tile drawn on the page carries the glow", count === 7 && flat.length === 0, `${count} glow tiles, flat: ${flat.join(", ")}`);
  await page.close();
}

// NO GREY BAND UNDER THE CASE STUDIES. Her v3 slide 11: "remove the band". The
// band was the case study cards' soft shadow, cut square on every side by the
// sideways-scrolling list that holds them. It survived one fix that only gave
// the shadow room below, so the assertion is on the cause: the cards carry no
// shadow at all, on both pages the slider appears on.
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ["/", "/about"]) {
    await page.goto(`${BASE}${route}`, { waitUntil: "load" });
    // The Who we serve box on the homepage too, from 2 October, so no box on
    // the page carries a shadow the others do not (her v3 slide 11).
    const shadows = await page.$$eval(route === "/" ? ".snap-x > li, [data-persona-box]" : ".snap-x > li", (cards) => cards.map((c) => getComputedStyle(c).boxShadow));
    expect(
      `${route}: the case study cards carry no shadow, so no band shows under them`,
      // Tailwind composes box-shadow from several layers and a card with no
      // shadow still computes a list of transparent zero layers rather than
      // "none", so a layer counts only if it has a visible colour and a
      // non-zero length.
      shadows.length > 0 &&
        shadows.every((v) =>
          v === "none" ||
          v.split(/,(?![^(]*\))/).every((layer) => layer.includes("rgba(0, 0, 0, 0)") || !/[1-9]/.test(layer.replace(/rgba?\([^)]*\)/, ""))),
        ),
      shadows.length ? `box-shadow ${[...new Set(shadows)].join(" | ")}` : "no case study cards found",
    );
  }
  await page.close();
}

// THE DIAGNOSTIC'S ADVICE APPEARS ON SCREEN AFTER UNLOCK, AND NOT BEFORE.
//
// Her v3 slide 8: "The data all shown here, it will all pop up on screen when
// they enter their email address in". Taken off the screen on 18 September and
// restored on 2 October. Asserted both ways, because the two ways it can break
// are opposite: the section vanishing again, or showing before the email is in.
//
// NOTHING IS SENT. Every POST to /api/ is answered in the browser with
// { ok: true }, so this runs safely against production: no email reaches the
// team or anyone else. The intercept is itself asserted, so a renamed endpoint
// cannot quietly let a real submission through.
//
// Skipped when the diagnostic is switched off, since the route then 404s.
if (process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTIC === "true") {
  const { readFileSync } = await import("node:fs");
  const quiz = readFileSync(new URL("../src/content/diagnostic-quiz.ts", import.meta.url), "utf8");
  const questions = [...quiz.matchAll(/\{\s*domain:\s*"(\w+)",\s*text:\s*"([^"]+)"/g)].map((m) => ({ d: m[1], t: m[2] }));
  for (const [label, width, mobile] of [["desktop", 1440, false], ["touch", 375, true]]) {
    const context = await browser.newContext({ viewport: { width, height: mobile ? 812 : 900 }, isMobile: mobile, hasTouch: mobile });
    const page = await context.newPage();
    const posts = [];
    await page.route("**/api/**", (r) => {
      if (r.request().method() !== "POST") return r.continue();
      posts.push(r.request().url());
      return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await page.goto(`${BASE}/diagnostic`, { waitUntil: "load" });
    await page.getByRole("button", { name: /start the diagnostic/i }).click();
    // Low on the two Data and visibility statements only, so it is the
    // constraint, which is the area her slide 8 pictures show.
    for (let i = 0; i < questions.length; i++) {
      const heading = (await page.locator("h2").first().innerText()).trim();
      const q = questions.find((x) => heading.includes(x.t.slice(0, 40)));
      await page.getByRole("button", { name: q?.d === "dv" ? "Strongly disagree" : "Strongly agree", exact: true }).click();
      await page.getByRole("button", { name: i === questions.length - 1 ? "See my results" : "Next" }).click();
    }
    await page.waitForSelector("[data-diagnostic-capture]");
    expect(`${label}: the diagnostic advice is not on screen before the email is in`, (await page.locator("[data-diagnostic-advice]").count()) === 0);
    await page.fill("#d-name", "Test Person");
    await page.fill("#d-biz", "Test Business");
    await page.fill("#d-email", "test@example.com");
    await page.selectOption("#d-industry", { index: 1 });
    await page.selectOption("#d-role", { index: 1 });
    await page.getByRole("button", { name: "Unlock my score" }).click();
    const shown = await page.waitForSelector("[data-diagnostic-advice]", { timeout: 8000 }).then(() => true, () => false);
    expect(`${label}: the diagnostic advice appears on screen after unlock`, shown);
    expect(`${label}: the unlock was answered in the browser, so nothing was sent`, posts.length === 1 && posts[0].endsWith("/api/diagnostic"), `intercepted ${posts.length}`);
    if (shown) {
      const advice = await page.locator("[data-diagnostic-advice]").evaluate((el) => ({
        constraint: el.querySelector("[data-diagnostic-constraint]")?.textContent?.trim(),
        checks: el.querySelectorAll("ol > li").length,
        buttons: [...el.querySelectorAll("a")].map((a) => ({
          text: a.textContent.trim(),
          href: a.getAttribute("href"),
          pill: parseFloat(getComputedStyle(a).borderTopLeftRadius) >= a.getBoundingClientRect().height / 2,
        })),
      }));
      expect(`${label}: the advice names the constraint`, advice.constraint === "Data and visibility", `got "${advice.constraint}"`);
      expect(`${label}: the advice carries her three checks`, advice.checks === 3, `found ${advice.checks}`);
      const book = advice.buttons.find((b) => b.text === "Book a call");
      expect(`${label}: "Book a call" goes to /contact`, book?.href === "/contact", JSON.stringify(advice.buttons));
      expect(`${label}: the advice buttons are rectangular, not pills`, advice.buttons.length === 2 && advice.buttons.every((b) => !b.pill), JSON.stringify(advice.buttons));
    }
    await context.close();
  }
}

await browser.close();

if (failures.length === 0) {
  console.log(`behaviour-check: clean (${checks} interaction assertions, desktop and touch)`);
} else {
  for (const f of failures) console.error(`  ${f}`);
  console.error(`\nbehaviour-check: ${failures.length} of ${checks} interaction assertions failed.`);
  process.exit(1);
}
