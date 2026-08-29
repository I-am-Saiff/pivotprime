import { chromium } from "playwright-core";
const B = process.argv[2] ?? "http://localhost:3987";
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto(`${B}/services/technology-builds?cb=${Date.now()}`, { waitUntil: "networkidle" });
const text = norm(await p.evaluate(() => document.body.innerText));
const ITEMS = [
  "Websites: design, build, maintenance and the digital estate around them",
  "CRM build and configuration, including migration from spreadsheets and inherited systems",
  "Workflow automation across sales, operations, finance and fulfilment",
  "Dashboards and management reporting, so decisions are made on numbers rather than instinct",
  "Integrations between the systems you already pay for and are not getting value from",
  "Internal tools and custom applications where nothing off the shelf fits",
  "AI agents and assistants, where they remove real cost rather than add a feature",
];
let bad = 0;
for (const t of ITEMS) {
  const n = norm(t); let c = 0, i = 0;
  while ((i = text.indexOf(n, i)) !== -1) { c++; i += n.length; }
  if (c !== 1) bad++;
  console.log(`  ${c}x  ${t.slice(0, 62)}`);
}
console.log(`\n"What We Build" heading count: ${(await p.evaluate(() => [...document.querySelectorAll("h2,h3")].filter(h => /^What We Build$/i.test(h.textContent.trim())).length))}`);
console.log(await p.evaluate(() => [...document.querySelectorAll("h1,h2")].filter(h => !h.closest("nav,footer")).map((h, i) => `  ${i + 1}. ${h.textContent.trim().slice(0, 58)}`).join("\n")));
console.log(bad ? `\n${bad} items still duplicated` : "\nevery capability item appears exactly once");
await b.close();
process.exit(bad ? 1 : 0);
