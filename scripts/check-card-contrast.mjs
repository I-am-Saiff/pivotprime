#!/usr/bin/env node
/**
 * Contrast on the dark cards.
 *
 * Lightening a card's fill costs contrast on everything written on it, and the
 * thing that breaks first is not the white body copy. It is the neon eyebrow,
 * because neon is itself a light green. This measures every text node on every
 * card rather than checking the card's own fill against white and calling it
 * done.
 *
 * Three things it does that a hand check does not:
 *
 *   - Composites. Most of the text on these cards is white or linen at an
 *     alpha, and most of the ancestors are transparent. The effective colour of
 *     `text-linen/75` is whatever it lands on, so both the text and the
 *     background are flattened through their ancestors before comparing.
 *   - Normalises. Chrome reports colours in whatever space the source used, so
 *     oklab(...) and lab(...) come back alongside rgb(). Everything is pushed
 *     through a canvas to land on plain 8-bit RGBA.
 *   - Uses the right threshold. 3:1 for large text, 4.5:1 otherwise, per WCAG
 *     2.2 1.4.3, decided per node from its own computed size and weight.
 *
 * Usage:
 *   node scripts/check-card-contrast.mjs
 *   node scripts/check-card-contrast.mjs --fill='#013325'       measure a candidate
 *   node scripts/check-card-contrast.mjs --base=http://host:3000
 *
 * Requires a running server.
 */

import { chromium } from "playwright-core";

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const BASE = arg("base", process.env.CHECK_BASE_URL ?? "http://localhost:3000");
/** Override --card-dark-fill at runtime, to measure a value before committing it. */
const FILL_OVERRIDE = arg("fill", null);
const WIDTH = Number(arg("width", "1440"));

/** Routes that actually render a dark card. The rest carry only nav and footer. */
const ROUTES = [
  "/",
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
  "/contact",
];

const MEASURE = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  /** Any CSS colour to [r,g,b,a], by asking the engine rather than parsing. */
  const toRGBA = (css) => {
    if (!css || css === "transparent") return [0, 0, 0, 0];
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = css;
    ctx.globalCompositeOperation = "copy";
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a / 255];
  };

  const over = (fg, bg) => {
    const a = fg[3] + bg[3] * (1 - fg[3]);
    if (a === 0) return [0, 0, 0, 0];
    return [
      (fg[0] * fg[3] + bg[0] * bg[3] * (1 - fg[3])) / a,
      (fg[1] * fg[3] + bg[1] * bg[3] * (1 - fg[3])) / a,
      (fg[2] * fg[3] + bg[2] * bg[3] * (1 - fg[3])) / a,
      a,
    ];
  };

  /** Flatten every painted background from the element up, until opaque. */
  const backdrop = (el) => {
    const layers = [];
    for (let p = el; p; p = p.parentElement) {
      const c = toRGBA(getComputedStyle(p).backgroundColor);
      if (c[3] === 0) continue;
      layers.push(c);
      if (c[3] === 1) break;
    }
    let out = [255, 255, 255, 1];
    for (let i = layers.length - 1; i >= 0; i--) out = over(layers[i], out);
    return out;
  };

  const lum = ([r, g, b]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  const ratio = (a, b) => {
    const [hi, lo] = lum(a) >= lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
    return (hi + 0.05) / (lo + 0.05);
  };

  const hex = ([r, g, b]) =>
    "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

  const fill = getComputedStyle(document.documentElement)
    .getPropertyValue("--card-dark-fill").trim();
  const fillRGBA = toRGBA(fill);
  const fillKey = fillRGBA.slice(0, 3).map(Math.round).join(",");

  const out = [];
  for (const el of document.querySelectorAll("*")) {
    const own = toRGBA(getComputedStyle(el).backgroundColor);
    if (own[3] !== 1 || own.slice(0, 3).map(Math.round).join(",") !== fillKey) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 24) continue;

    // Nested cards are measured on their own; skip so a card is not reported twice.
    let nested = false;
    for (let p = el.parentElement; p; p = p.parentElement) {
      const c = toRGBA(getComputedStyle(p).backgroundColor);
      if (c[3] === 1 && c.slice(0, 3).map(Math.round).join(",") === fillKey) { nested = true; break; }
    }
    if (nested) continue;

    const nodes = [];
    for (const d of [el, ...el.querySelectorAll("*")]) {
      const hasText = [...d.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 0,
      );
      if (!hasText) continue;
      const cs = getComputedStyle(d);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (Number(cs.opacity) === 0) continue;

      const bg = backdrop(d);
      // SVG text is painted with `fill`, not `color`. Reading `color` here
      // reported the four labels on the homepage's first KPI visual as black on
      // forest, 1.5:1, when they are actually neon and perfectly legible.
      const paint =
        d.namespaceURI === "http://www.w3.org/2000/svg" && cs.fill && cs.fill !== "none"
          ? cs.fill
          : cs.color;
      const fg = over(toRGBA(paint), bg);
      const size = parseFloat(cs.fontSize);
      const weight = Number(cs.fontWeight) || 400;
      // WCAG large text: 18pt (24px), or 14pt (18.66px) when bold.
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;
      const got = ratio(fg, bg);

      nodes.push({
        ratio: Math.round(got * 100) / 100,
        need,
        pass: got >= need,
        fg: hex(fg),
        bg: hex(bg),
        size: Math.round(size * 10) / 10,
        weight,
        sample: d.textContent.trim().replace(/\s+/g, " ").slice(0, 34),
      });
    }

    out.push({
      cls: (typeof el.className === "string" ? el.className : "").slice(0, 90),
      tag: el.tagName.toLowerCase(),
      w: Math.round(r.width),
      h: Math.round(r.height),
      nodes,
    });
  }
  return { fill, fillHex: hex(fillRGBA), cards: out };
};

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 } });
if (FILL_OVERRIDE) {
  await page.addInitScript((v) => {
    addEventListener("DOMContentLoaded", () =>
      document.documentElement.style.setProperty("--card-dark-fill", v));
  }, FILL_OVERRIDE);
}

let cardCount = 0;
let nodeCount = 0;
const failures = [];
let worst = { ratio: Infinity };
let fillHex = "";

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
  const { fillHex: fh, cards } = await page.evaluate(MEASURE);
  fillHex = fh;
  for (const card of cards) {
    cardCount++;
    for (const n of card.nodes) {
      nodeCount++;
      if (n.ratio < worst.ratio) worst = { ...n, route, cls: card.cls };
      if (!n.pass) failures.push({ ...n, route, cls: card.cls });
    }
  }
  const min = Math.min(...cards.flatMap((c) => c.nodes.map((n) => n.ratio)), Infinity);
  console.log(
    `${route.padEnd(42)} ${String(cards.length).padStart(2)} card(s)` +
      (Number.isFinite(min) ? `  min ${min.toFixed(2)}:1` : ""),
  );
}

console.log(`\ncard fill        ${fillHex}${FILL_OVERRIDE ? `  (override ${FILL_OVERRIDE})` : ""}`);
console.log(`cards measured   ${cardCount}`);
console.log(`text nodes       ${nodeCount}`);
if (Number.isFinite(worst.ratio)) {
  console.log(
    `lowest ratio     ${worst.ratio}:1  (needs ${worst.need}) ` +
      `${worst.fg} on ${worst.bg} @${worst.size}px/${worst.weight}  ${worst.route}  "${worst.sample}"`,
  );
}

if (failures.length) {
  console.log(`\nBELOW THRESHOLD: ${failures.length}`);
  for (const f of failures.slice(0, 40)) {
    console.log(
      `  ${String(f.ratio).padStart(5)}:1 < ${f.need}  ${f.fg} on ${f.bg} ` +
        `@${f.size}px/${f.weight}  ${f.route}  "${f.sample}"`,
    );
  }
  process.exit(1);
}
console.log("\ncard-contrast: clean");
await browser.close();
