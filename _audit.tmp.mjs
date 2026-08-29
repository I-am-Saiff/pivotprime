import { chromium } from "playwright-core";
const B = "https://pivotprime.vercel.app";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
for (const route of ["/", "/about"]) {
  await p.goto(`${B}${route}?cb=${Date.now()}`, { waitUntil: "networkidle" });
  console.log(`\n===== ${route} =====`);
  for (const s of await p.evaluate(() => {
    const out = [];
    for (const li of document.querySelectorAll("li")) {
      if (!li.querySelector("h4")) continue;
      const h4s = [...li.querySelectorAll("h4")].map(h => h.textContent.trim());
      if (!h4s.some(t => /Results/i.test(t))) continue;
      out.push({
        name: li.querySelector("h3")?.textContent.trim() ?? "(unnamed)",
        h4s,
        resultsHeadings: h4s.filter(t => /^The Results$/i.test(t)).length,
        lists: [...li.querySelectorAll("ul")].map(u => u.querySelectorAll("li").length),
        hasDarkPanel: !!li.querySelector('[class*="card-dark-fill"]'),
      });
    }
    return out;
  })) {
    console.log(`  ${s.name.padEnd(26)} "The Results" x${s.resultsHeadings}  lists ${JSON.stringify(s.lists)}  darkPanel ${s.hasDarkPanel}`);
    console.log(`      headings: ${JSON.stringify(s.h4s)}`);
  }
}
await b.close();
