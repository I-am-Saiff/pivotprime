import { chromium } from "playwright-core";
const B = process.argv[2] ?? "http://localhost:3987";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
let bad = 0;
for (const route of ["/", "/about"]) {
  await p.goto(`${B}${route}?cb=${Date.now()}`, { waitUntil: "networkidle" });
  console.log(`\n===== ${route} =====`);
  for (const s of await p.evaluate(() => {
    const out = [];
    for (const li of document.querySelectorAll("li")) {
      if (!li.querySelector("h4")) continue;
      const h4s = [...li.querySelectorAll("h4")].map(h => h.textContent.trim());
      if (!h4s.some(t => /Results/i.test(t))) continue;
      out.push({ name: li.querySelector("h3")?.textContent.trim() ?? "(unnamed)", h4s,
        n: h4s.filter(t => /^The Results$/i.test(t)).length,
        bullets: [...li.querySelectorAll("ul li")].length,
        lead: li.querySelector('[class*="card-dark-fill"] p')?.textContent.trim().slice(0, 46) ?? null });
    }
    return out;
  })) {
    if (s.n !== 1) bad++;
    console.log(`  ${s.name.padEnd(34)} "The Results" x${s.n} ${s.n === 1 ? "OK " : "BAD"}  ${String(s.bullets).padStart(2)} points  headings ${JSON.stringify(s.h4s)}`);
    console.log(`      lead: "${s.lead}"`);
  }
}
console.log(bad ? `\n${bad} studies still duplicated` : "\nevery case study has exactly one results section");
await b.close();
process.exit(bad ? 1 : 0);
