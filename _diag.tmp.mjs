/** Every text node on every route whose composited colour is nearly the colour
 *  it sits on. This is the site-wide white-on-white detector for item 6. */
import { chromium } from "playwright-core";
const B = process.argv[2] ?? "http://localhost:3987";
const ROUTES = ["/","/services","/services/operational-clarity-audit","/services/fractional-leadership",
 "/services/build-and-place","/services/technology-builds","/services/uae-market-entry",
 "/for-founders","/for-smes","/for-corporate-leaders","/for-pl-owners","/about","/insights",
 "/insights/consultant-leaves","/insights/technology-process","/insights/decisions-layers",
 "/insights/margin-revenue","/contact","/privacy"];
const PROBE = () => {
  const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const rgba = (s) => { c.fillStyle="#000"; c.fillStyle=s; c.globalCompositeOperation="copy";
    c.fillRect(0,0,1,1); const [r,g,b,a]=c.getImageData(0,0,1,1).data; return [r,g,b,a/255]; };
  const over=(f,bg)=>f.map((v,i)=>i<3?v*f[3]+bg[i]*(1-f[3]):1);
  const lum=([r,g,b])=>{const t=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};
    return .2126*t(r)+.7152*t(g)+.0722*t(b)};
  const ratio=(a,b)=>{const[h,l]=lum(a)>=lum(b)?[lum(a),lum(b)]:[lum(b),lum(a)];return(h+.05)/(l+.05)};
  const hex=a=>"#"+a.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");
  const back=(el)=>{const L=[];for(let n=el;n;n=n.parentElement){const x=rgba(getComputedStyle(n).backgroundColor);
    if(!x[3])continue;L.push(x);if(x[3]===1)break;}let o=[255,255,255,1];for(let i=L.length-1;i>=0;i--)o=over(L[i],o);return o;};
  const out=[];
  for(const el of document.querySelectorAll("*")){
    const has=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()); if(!has)continue;
    const cs=getComputedStyle(el);
    if(cs.visibility==="hidden"||cs.display==="none")continue;
    const r=el.getBoundingClientRect(); if(r.width<2||r.height<2)continue;
    // Elements animated to invisible still matter if they END visible; report
    // opacity separately rather than skipping.
    const bg=back(el);
    const paint = el.namespaceURI==="http://www.w3.org/2000/svg"&&cs.fill&&cs.fill!=="none"?cs.fill:cs.color;
    const fg=over(rgba(paint),bg);
    const rt=ratio(fg,bg);
    if(rt<2) out.push({t:el.textContent.trim().replace(/\s+/g," ").slice(0,40),
      fg:hex(fg),bg:hex(bg),r:+rt.toFixed(2),op:cs.opacity,cls:(typeof el.className==="string"?el.className:"").slice(0,60)});
  }
  return out;
};
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
let total = 0;
for (const route of ROUTES) {
  await p.goto(B + route, { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(600);
  const hits = await p.evaluate(PROBE);
  if (hits.length) { console.log(`\n${route}  ${hits.length} invisible/near-invisible text element(s)`);
    hits.forEach(h => console.log(`   ${h.r}:1  ${h.fg} on ${h.bg}  op=${h.op}  "${h.t}"  [${h.cls}]`)); }
  total += hits.length;
}
console.log(`\nTOTAL: ${total}`);
await b.close();
