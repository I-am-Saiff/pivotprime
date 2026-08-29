import { chromium } from "playwright-core";
const B = process.argv[2] ?? "http://localhost:3987";
const cb = () => "?cb=" + Date.now();
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const CONTRAST = (needle) => {
  const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const rgba = (s) => { c.fillStyle="#000"; c.fillStyle=s; c.globalCompositeOperation="copy";
    c.fillRect(0,0,1,1); const [r,g,bb,a]=c.getImageData(0,0,1,1).data; return [r,g,bb,a/255]; };
  const over=(f,bg)=>f.map((v,i)=>i<3?v*f[3]+bg[i]*(1-f[3]):1);
  const lum=([r,g,bb])=>{const t=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};
    return .2126*t(r)+.7152*t(g)+.0722*t(bb)};
  const el=[...document.querySelectorAll("*")].find(e=>
    [...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()===needle));
  if(!el) return null;
  const cs=getComputedStyle(el);
  let bg=[255,255,255,1];
  for(let n=el;n;n=n.parentElement){const x=rgba(getComputedStyle(n).backgroundColor);if(x[3]===1){bg=x;break;}}
  const fg=over(rgba(cs.color),bg);
  const L1=lum(fg),L2=lum(bg);
  const hex=a=>"#"+a.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");
  return `${hex(fg)} on ${hex(bg)} = ${(((Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05))).toFixed(2)}:1`;
};

// 1. Right cards mid green.
await p.goto(`${B}/services/operational-clarity-audit${cb()}`, { waitUntil: "networkidle" });
await p.waitForTimeout(500);
console.log("1. RIGHT CARDS");
console.log("   audit pair:", await p.evaluate(() => {
  const g = [...document.querySelectorAll("div.grid")].find(d => /What We Look At/.test(d.textContent));
  return [...g.children].slice(0,2).map(c => getComputedStyle(c).backgroundColor).join("  |  ");
}));
console.log("   What You Get body text:", await p.evaluate(CONTRAST, "A findings report with every gap ranked by risk and by effort"));
await p.goto(`${B}/${cb()}`, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
console.log("   fees pair:", await p.evaluate(() => {
  const panel=[...document.querySelectorAll("div")].find(d=>/Our Fees/.test(d.textContent)&&getComputedStyle(d).borderRadius.startsWith("24"));
  const boxes=[...panel.querySelectorAll(":scope > div > div.grid > div")].slice(0,2);
  return boxes.map(x=>getComputedStyle(x).backgroundColor).join("  |  ");
}));
console.log("   Pivot Prime Model dd:", await p.evaluate(CONTRAST, "A fixed element covers the work itself. A results element sits against that target."));
console.log("   Results Element tile:", await p.evaluate(() => {
  const el=[...document.querySelectorAll("div")].find(d=>/Results Element/.test(d.textContent)&&d.children.length===2&&getComputedStyle(d).borderRadius.startsWith("12"));
  return el?getComputedStyle(el).backgroundColor:null;
}));
await p.goto(`${B}/services/technology-builds${cb()}`, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
console.log("   tech pair:", await p.evaluate(() => {
  const lis=[...document.querySelectorAll("li")].filter(l=>/Automate Everything|Fix the Constraint First/.test(l.querySelector("h3")?.textContent??""));
  return lis.map(l=>`${l.querySelector("h3").textContent.trim().slice(0,22)}: ${getComputedStyle(l).backgroundColor}`).join("  |  ");
}));

// 2. Why this exists gone from all five.
console.log("\n2. WHY THIS EXISTS");
for (const r of ["operational-clarity-audit","fractional-leadership","build-and-place","technology-builds","uae-market-entry"]) {
  const html = await (await fetch(`${B}/services/${r}${cb()}`)).text();
  console.log(`   ${r.padEnd(26)} ${html.includes("Why this exists") ? "STILL PRESENT" : "gone"}`);
}

// 3. Dots gone from service-page dark backgrounds.
console.log("\n3. DOT PATTERNS");
for (const r of ["operational-clarity-audit","fractional-leadership","build-and-place","technology-builds","uae-market-entry"]) {
  const html = await (await fetch(`${B}/services/${r}${cb()}`)).text();
  const n = (html.match(/radial-gradient\(rgba\(255,255,255/g) ?? []).length;
  console.log(`   ${r.padEnd(26)} white-dot patterns in HTML: ${n}`);
}

// 4. Process map, BOTH states.
console.log("\n4. PROCESS MAP");
await p.goto(`${B}/services/operational-clarity-audit${cb()}`, { waitUntil: "networkidle" });
await p.locator("text=As it runs today").first().scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
for (const state of ["As it runs today", "After the audit"]) {
  await p.getByRole("button", { name: state }).click(); await p.waitForTimeout(900);
  const r = await p.evaluate(() => {
    const chips = [...document.querySelectorAll("[data-on-light]")].filter(e => e.textContent.trim() && e.getBoundingClientRect().height > 0);
    return chips.map(e => `${e.textContent.trim()}:${getComputedStyle(e).color}`);
  });
  console.log(`   [${state}] ${r.join("  ")}`);
}

// 5. Build-and-place seats.
console.log("\n5. SEATS DIAGRAM");
await p.goto(`${B}/services/build-and-place${cb()}`, { waitUntil: "networkidle" });
await p.evaluate(() => [...document.querySelectorAll("[data-on-light]")][0]?.scrollIntoView({ block: "center" }));
await p.waitForTimeout(1600);
console.log(await p.evaluate(() => [...document.querySelectorAll("[data-on-light] b")].map(b =>
  `${b.textContent.trim()}: ${getComputedStyle(b).color}`)));
await b.close();
