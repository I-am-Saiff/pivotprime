import {chromium} from 'playwright-core';
import fs from 'fs';
const dir='/private/tmp/claude-501/-Users-saif-pivotprime/67974f8f-8a37-4067-857d-c0792a752d21/scratchpad/hers';
fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir,{recursive:true});
const b=await chromium.launch({channel:'chrome'});
// hers
const h=await b.newPage({viewport:{width:1240,height:1400}});
await h.goto('file:///Users/saif/pivotprime/repo/req/pivot-prime-kpi-cards_3.html',{waitUntil:'networkidle'});
await h.waitForTimeout(2200);
await h.screenshot({path:`${dir}/hers-1240.png`, clip:await h.locator('.grid').boundingBox()});
// ours
for(const w of [1440,360]){
 const p=await b.newPage({viewport:{width:w,height:1400}});
 await p.goto('http://localhost:3000/',{waitUntil:'networkidle'});
 const ul=p.locator('[data-metric-cards]'); await ul.scrollIntoViewIfNeeded(); await p.waitForTimeout(2200);
 const bb=await ul.boundingBox();
 await p.screenshot({path:`${dir}/ours-${w}.png`, clip:bb});
 console.log(w,'grid h',Math.round(bb.height),'cols',await p.evaluate(()=>getComputedStyle(document.querySelector('[data-metric-cards]')).gridTemplateColumns.split(' ').length),
  'card h',await p.evaluate(()=>Math.round(document.querySelector('[data-kpi-index]').getBoundingClientRect().height)),
  'section',await p.evaluate(()=>Math.round(document.querySelector('[data-metric-cards]').closest('section').getBoundingClientRect().height)));
 await p.close();
}
await b.close();
