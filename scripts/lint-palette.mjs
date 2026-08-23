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
  "src/components/services/Service2FractionalLeadership.tsx",
  "src/components/services/Service3BuildPlace.tsx",
  "src/components/services/Service5MarketEntry.tsx",
  // Surfaced by that removal: the directory-wide entry had been hiding this
  // file, which nobody had ever listed. Still owed, now visible.
  "src/components/services/SpecCopyBlocks.tsx",
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
const REMOVED_TOKENS = [
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

  for (const file of walkFiles(SRC)) {
    const rel = relative(ROOT, file).split(sep).join("/");
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

  if (findings.length === 0 && staleFindings.length === 0) {
    console.log("palette-lint: clean");
    return;
  }

  for (const f of findings) {
    console.error(`${f.rel}:${f.line}:${f.column}  raw hex ${f.hex}`);
    console.error(
      `  use a palette token (forest, neon, mid, background, foreground, shell, mist, sand, bronze, linen), or derive from one ` +
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

  const total = findings.length + staleFindings.length;
  console.error(`\npalette-lint: ${total} problem${total === 1 ? "" : "s"}.`);
  process.exit(1);
}

main();
