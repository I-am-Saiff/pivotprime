/**
 * GENERATED FROM THE CONTENT FILE, NOT TYPED.
 *
 * The standing rule on this branch is that anything with a source of truth is
 * produced from it rather than transcribed: every defect in PENDING-COPY 1c came
 * from hand entry, including one that reduced a named and priced service to a
 * common noun. She asked to read "all the different versions of advice we give",
 * so word for word is the whole value of the document, and the only way to be
 * sure of that is to read the same file the site reads.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
/* Run from the repository root: node scripts/export-diagnostic-advice.mjs */

/* The content file is TypeScript, so it is read as text and the literals are
   lifted out of it, rather than importing it into a plain node process. */
const src = readFileSync("src/content/diagnostic-quiz.ts", "utf8");
const copy = readFileSync("src/content/diagnostic-copy.ts", "utf8");

const DOMAIN_ORDER = ["fd", "pd", "cm", "dv", "pa", "tl"];

const names = {};
{
  const block = src.slice(src.indexOf("DOMAIN_NAME: Record<DomainId, string> = {"));
  for (const m of block.slice(0, block.indexOf("};")).matchAll(/(\w+):\s*"([^"]+)"/g)) names[m[1]] = m[2];
}

const bands = [...src.matchAll(/\{\s*min:\s*(\d+),\s*max:\s*(\d+),\s*label:\s*"([^"]+)",\s*desc:\s*"([^"]+)"\s*\}/g)]
  .map((m) => ({ min: +m[1], max: +m[2], label: m[3], desc: m[4] }));

/* DOMAIN_CONTENT, one entry at a time, bounded by the next key or the end. */
const contentBlock = src.slice(src.indexOf("DOMAIN_CONTENT: Record<DomainId, DomainContent> = {"));
const domains = {};
for (let i = 0; i < DOMAIN_ORDER.length; i++) {
  const id = DOMAIN_ORDER[i];
  const start = contentBlock.indexOf(`\n  ${id}: {`);
  const next = i + 1 < DOMAIN_ORDER.length ? contentBlock.indexOf(`\n  ${DOMAIN_ORDER[i + 1]}: {`) : contentBlock.length;
  const chunk = contentBlock.slice(start, next);
  const commentary = chunk.match(/commentary:\s*"((?:[^"\\]|\\.)*)"/)[1];
  const offer = chunk.match(/offer:\s*"((?:[^"\\]|\\.)*)"/)[1];
  const checksRaw = chunk.slice(chunk.indexOf("checks: ["), chunk.indexOf("],", chunk.indexOf("checks: [")));
  const checks = [...checksRaw.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  const unesc = (s) => s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  domains[id] = { commentary: unesc(commentary), offer: unesc(offer), checks: checks.map(unesc) };
}

const label = (k) => copy.match(new RegExp(`${k}:\\s*"([^"]+)"`))[1];
const L = {
  means: label("meansLabel"),
  checks: label("checksLabel"),
  offerTag: label("offerTag"),
  offerTitle: label("offerTitle"),
  constraint: label("constraintLabel"),
};

/* ---- sanity, before anything is written ---- */
const problems = [];
if (bands.length !== 4) problems.push(`expected 4 score bands, parsed ${bands.length}`);
if (Object.keys(domains).length !== 6) problems.push(`expected 6 domains, parsed ${Object.keys(domains).length}`);
for (const id of DOMAIN_ORDER) {
  const d = domains[id];
  if (!d.commentary || d.commentary.length < 200) problems.push(`${id}: commentary looks truncated`);
  if (d.checks.length !== 3) problems.push(`${id}: expected 3 checks, parsed ${d.checks.length}`);
  if (!d.offer || d.offer.length < 150) problems.push(`${id}: offer looks truncated`);
  if (/\\|^\s*$/.test(d.commentary)) problems.push(`${id}: commentary still contains an escape`);
}
if (problems.length) { console.error("PARSE FAILED:\n  " + problems.join("\n  ")); process.exit(1); }

/* ---- the document ---- */
const out = [];
out.push("# The diagnostic advice, all six versions");
out.push("");
out.push("**For Iram.** Your v3 slide 8: *\"I have to read all the different versions of advice we give, can you share the data all shown here.\"*");
out.push("");
out.push("This is every word of advice the diagnostic can produce. **It is generated straight from the file the website reads**, so it is what a reader sees, not a retyping of it.");
out.push("");
out.push("---");
out.push("");
out.push("## How a reader gets one of these six");
out.push("");
out.push("Twelve questions, two per operational domain, each answered on your five point scale. Each domain is scored out of 100, and the overall score is the average of the six.");
out.push("");
out.push("**The domain with the lowest score becomes their primary constraint**, and that is what decides which of the six versions below they are shown. If two domains tie, the earlier one in your order wins, which is the order they are listed in here.");
out.push("");
out.push("Every reader sees exactly one of the six. They also see their overall score and one of four bands:");
out.push("");
out.push("| Score | Band | What it says |");
out.push("|---|---|---|");
for (const b of bands) out.push(`| ${b.min} to ${b.max} | **${b.label}** | ${b.desc} |`);
out.push("");
out.push("The band and the advice are independent: any of the four bands can appear with any of the six versions.");
out.push("");
out.push("---");

let n = 0;
for (const id of DOMAIN_ORDER) {
  n += 1;
  const d = domains[id];
  out.push("");
  out.push(`## ${n}. ${names[id]}`);
  out.push("");
  out.push(`**Shown when:** ${names[id]} is the reader's lowest scoring domain. On screen it is tagged *${L.constraint}*.`);
  out.push("");
  out.push(`### ${L.means}`);
  out.push("");
  out.push(d.commentary);
  out.push("");
  out.push(`### ${L.checks}`);
  out.push("");
  for (const c of d.checks) out.push(`- ${c}`);
  out.push("");
  out.push(`### ${L.offerTag}`);
  out.push("");
  out.push(`**${L.offerTitle}**`);
  out.push("");
  out.push(d.offer);
  out.push("");
  out.push("---");
}
out.push("");
out.push("*Generated from `src/content/diagnostic-quiz.ts`. If you change any wording here, send the change and we will put it into the site; editing this document does not alter the website.*");

const md = out.join("\n") + "\n";
writeFileSync("docs/FOR-IRAM-diagnostic-advice.md", md);
console.log(`markdown written: ${md.split("\n").length} lines, ${md.length} characters`);

execFileSync("pandoc", [
  "docs/FOR-IRAM-diagnostic-advice.md",
  "-o", "docs/FOR-IRAM-diagnostic-advice.docx",
  /* -smart DISABLES pandoc's typographic conversion, and it is load-bearing.
     With it on, pandoc turned every straight apostrophe into a curly one, so
     "people's heads" in the docx was not the string the site renders. Six of the
     thirty advice strings failed a verbatim comparison because of it. This is a
     word-for-word document or it is nothing. */
  "--from", "markdown-smart", "--to", "docx",
  "--metadata", "title=Pivot Prime diagnostic advice, all six versions",
]);
console.log("docx written");
