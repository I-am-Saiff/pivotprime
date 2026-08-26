import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
for (const w of [1440, 360]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const h = await p.evaluate(() => {
    const el = [...document.querySelectorAll("span")].find((x) => x.textContent.trim() === "Our fees");
    const sec = el?.closest("section");
    return sec ? Math.round(sec.getBoundingClientRect().height) : null;
  });
  const kpi = await p.evaluate(() => {
    const ul = document.querySelector("[data-metric-cards]");
    return ul ? Math.round(ul.getBoundingClientRect().height) : null;
  });
  console.log(`${w}px  fees section ${h}px   kpi grid ${kpi}px`);
  await p.close();
}
await b.close();
