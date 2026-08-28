#!/usr/bin/env node
/**
 * Palette guard.
 *
 * The approved brand palette is ten values, defined once as tokens in
 * src/app/globals.css: five from the spec's swatch plate and five added from the
 * client's swatch of 22 August 2026. Everything else on dark is derived from them with white
 * alpha, following the mockups, rather than by inventing new greens. This script
 * fails the build when a raw hex colour appears anywhere it should not.
 *
 * Two exemptions, both deliberate:
 *
 *   globals.css      the one place hex values belong, since it defines the tokens
 *   GRANDFATHERED    components transcribed directly from the approved mockups in
 *                    req/. Every hex in them traces back to a mockup, so they are
 *                    correct but not yet tokenised. They are frozen rather than
 *                    normalised, so this guard can run today instead of after a
 *                    large refactor. Removing a path from this list is the way to
 *                    tokenise that component.
 *
 * Reviewed exceptions go in scripts/palette-allow.json.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const ALLOW_FILE = join(ROOT, "scripts", "palette-allow.json");

const TOKEN_SOURCE = "src/app/globals.css";

/**
 * WORK QUEUE, NOT A PERMANENT EXEMPTION.
 *
 * Removing a path from this list is the tokenisation step for that component:
 * delete the line, run the guard, replace what it reports. The list is expected
 * to shrink to empty. Do not add to it without a reason recorded in
 * docs/PENDING-COPY.md.
 */
const GRANDFATHERED = [
  // Service4TechBuilds was removed from this list on 23 August when it was
  // rebuilt on tokens. That is what removing a path here is for.
  "src/components/services/Service1ClarityAudit.tsx",
  // Extracted from Service1ClarityAudit and carrying its raw hexes with it, so
  // the debt moved with the markup rather than being paid off. Still owed.
  "src/components/services/ClarityAuditProcessMap.tsx",
  "src/components/services/Service2FractionalLeadership.tsx",
  "src/components/services/Service3BuildPlace.tsx",
  "src/components/services/Service5MarketEntry.tsx",
  "src/components/diagnostic/",
];

// Negative lookbehind for &, so HTML entities are not mistaken for colours.
// &#10003; is a checkmark, not #10003.
const HEX = /(?<!&)#[0-9a-fA-F]{3,8}\b/g;

/**
 * Tokens that have been removed from @theme.
 *
 * This exists because of a failure mode that nothing else catches. Deleting a
 * token does not break a utility that references it: Tailwind simply stops
 * generating the class, so `hover:bg-primary-dark` silently renders no style at
 * all. eslint sees a valid string, tsc sees a valid string, the build passes,
 * and the button just stops changing on hover. Nobody finds that by reading a
 * diff.
 *
 * Add an entry here whenever a colour token is deleted, so a stale reference
 * fails the build instead of quietly rendering nothing.
 */
/**
 * GOLD AND TAN, BANNED OUTRIGHT.
 *
 * Two of the client's ten swatch values are warm: #9f7a3d and #e8d7b5. Neither
 * is used. The instruction of 28 August is that no gold or tan appears anywhere
 * on the site, so they are not defined as tokens and any literal use of them is
 * a build failure rather than a review comment.
 *
 * This list is checked in EVERY file including the grandfathered ones and
 * globals.css, because the point is that the value cannot come back at all, not
 * that it cannot come back in files we have already tokenised. Gold has now
 * returned twice: once as an eyebrow colour on the audit page and once as the
 * "before" tint on a comparison panel, both times inside grandfathered files
 * that the ordinary hex rule skips.
 *
 * `near` is the tolerance in RGB distance. An exact-match list would miss the
 * next slightly different amber somebody types.
 */
const BANNED_WARM = [
  { hex: "#9f7a3d", why: "her bronze, in the swatch and unused" },
  { hex: "#e8d7b5", why: "her sand, in the swatch and unused" },
  { hex: "#c8af50", why: "gold" },
  { hex: "#c49040", why: "the amber on her KPI mockup's before blocks" },
  { hex: "#af8943", why: "the gold eyebrow that kept coming back" },
  { hex: "#6b5a3c", why: "the warm brown body colour on the audit page" },
];

/** How far from a banned value still counts as that value. */
const WARM_TOLERANCE = 22;

function rgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

/** Hue in degrees, 0 to 360. */
function hue(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

/**
 * True for any colour that reads as gold or tan.
 *
 * TWO TESTS, AND THE SECOND IS HUE-BOUNDED ON PURPOSE. Distance alone, at a
 * tolerance loose enough to catch a nearby amber, also caught #cfd9d4 (a cool
 * grey-green) and #e8c4ba (a pale salmon). A red-over-green-over-blue shape test
 * alone caught the terracotta the process map uses for its warning state, which
 * is a warning colour rather than gold. So the shape test is confined to the
 * yellow-orange band, 28 to 58 degrees, where gold, tan and amber actually sit.
 */
function isWarm(hex) {
  const [r, g, b] = rgb(hex);
  if ([r, g, b].some(Number.isNaN)) return false;
  for (const banned of BANNED_WARM) {
    const [br, bg, bb] = rgb(banned.hex);
    if (Math.hypot(r - br, g - bg, b - bb) <= WARM_TOLERANCE) return banned;
  }
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  const h = hue(r, g, b);
  if (r > g && g > b && spread >= 40 && r >= 110 && h >= 28 && h <= 58) {
    return { hex, why: "reads as gold or tan: yellow-orange hue, saturated" };
  }
  return null;
}

const REMOVED_TOKENS = [
  { name: "sand", removedIn: "the 28 August gold sweep", use: "linen, or white alpha on dark" },
  { name: "bronze", removedIn: "the 28 August gold sweep", use: "mid for an accent" },
  { name: "primary-dark", removedIn: "c04d14b", use: "hover:bg-mid/90 on light, hover:bg-neon/90 on dark" },
  { name: "dark", removedIn: "c04d14b", use: "forest, or foreground for text" },
  { name: "light", removedIn: "c04d14b", use: "background, or a neutral utility" },
];

/** Tailwind colour utilities, so `dark:` the variant is never mistaken for `bg-dark`. */
const COLOUR_UTILITIES =
  "bg|text|border|ring|fill|stroke|from|via|to|outline|decoration|shadow|accent|caret|divide|placeholder";

function removedTokenPattern(name) {
  // Matches an optional variant chain, then utility-token, then an optional
  // opacity modifier: hover:bg-primary-dark, md:text-dark/50, border-light.
  return new RegExp(`(?:^|[\\s"'\`:])(?:${COLOUR_UTILITIES})-${name}(?:\\/\\d+)?(?![\\w-])`, "g");
}

function loadAllowlist() {
  if (!existsSync(ALLOW_FILE)) return [];
  try {
    const parsed = JSON.parse(readFileSync(ALLOW_FILE, "utf8"));
    return Array.isArray(parsed.allow) ? parsed.allow : [];
  } catch (err) {
    console.error(`palette-lint: could not parse ${relative(ROOT, ALLOW_FILE)}: ${err.message}`);
    process.exit(2);
  }
}

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkFiles(full, out);
    else if (/\.(tsx?|css)$/.test(entry)) out.push(full);
  }
  return out;
}

function main() {
  const allow = loadAllowlist();
  const findings = [];
  const staleFindings = [];
  const warmFindings = [];

  for (const file of walkFiles(SRC)) {
    const rel = relative(ROOT, file).split(sep).join("/");

    // The warm-colour ban runs on every file, before the exemptions, because
    // both times gold came back it came back inside an exempt one.
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
        for (const hex of line.match(HEX) ?? []) {
          const hit = isWarm(hex);
          if (!hit) continue;
          warmFindings.push({
            file: rel,
            line: i + 1,
            hex,
            why: hit.why,
            text: line.trim().slice(0, 96),
          });
        }
      });

    if (rel === TOKEN_SOURCE) continue;
    if (GRANDFATHERED.some((p) => rel.startsWith(p))) continue;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      // A hex inside an SVG path or a comment is not a colour decision.
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const match of line.matchAll(HEX)) {
        const hex = match[0];
        const allowed = allow.some(
          (a) => a.file === rel && a.hex.toLowerCase() === hex.toLowerCase(),
        );
        if (allowed) continue;
        findings.push({ rel, line: i + 1, column: match.index + 1, hex });
      }
    });
  }

  // Stale references to deleted tokens, checked across all of src including the
  // grandfathered paths: a class that generates nothing is a bug everywhere.
  for (const file of walkFiles(SRC)) {
    const rel = relative(ROOT, file).split(sep).join("/");
    if (rel === TOKEN_SOURCE) continue;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const token of REMOVED_TOKENS) {
        for (const match of line.matchAll(removedTokenPattern(token.name))) {
          staleFindings.push({
            rel,
            line: i + 1,
            column: match.index + 1,
            token,
            text: match[0].trim(),
          });
        }
      }
    });
  }

  if (findings.length === 0 && staleFindings.length === 0 && warmFindings.length === 0) {
    console.log("palette-lint: clean");
    return;
  }

  for (const f of warmFindings) {
    console.error(`${f.file}:${f.line}  ${f.hex} is gold or tan — ${f.why}`);
    console.error(`  ${f.text}`);
    console.error(
      `  No gold or tan appears anywhere on this site, by the client's instruction of ` +
        `28 August 2026. Use mid or neon for an accent, linen or shell for a warm neutral, ` +
        `or white alpha on dark. This rule runs on every file including the grandfathered ` +
        `ones, because gold has come back twice inside those.`,
    );
  }

  for (const f of findings) {
    console.error(`${f.rel}:${f.line}:${f.column}  raw hex ${f.hex}`);
    console.error(
      `  use a palette token (forest, neon, mid, background, foreground, shell, mist, linen), or derive from one ` +
        `with white alpha as the mockups do. If this value is genuinely correct, add it to ` +
        `scripts/palette-allow.json with a reason.`,
    );
  }

  for (const f of staleFindings) {
    console.error(`${f.rel}:${f.line}:${f.column}  "${f.text}" references the removed token --color-${f.token.name}`);
    console.error(
      `  this class generates no CSS at all, so it renders no style rather than failing. ` +
        `Removed in ${f.token.removedIn}. Use ${f.token.use}.`,
    );
  }

  const total = findings.length + staleFindings.length + warmFindings.length;
  console.error(`\npalette-lint: ${total} problem${total === 1 ? "" : "s"}.`);
  process.exit(1);
}

main();
