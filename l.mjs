import {chromium} from 'playwright-core';
const b=await chromium.launch({channel:'chrome'});
for(const w of [1440,360]){
 const ctx=await b.newContext({viewport:{width:w,height:1400}});
 const p=await ctx.newPage();
 await p.goto('https://pivotprime.vercel.app/?cb='+String(process.hrtime.bigint()),{waitUntil:'networkidle'});
 const ul=p.locator('[data-metric-cards]'); await ul.scrollIntoViewIfNeeded(); await p.waitForTimeout(4000);
 await p.screenshot({path:`/private/tmp/claude-501/-Users-saif-pivotprime/67974f8f-8a37-4067-857d-c0792a752d21/scratchpad/hers/final-${w}.png`, clip:await ul.boundingBox()});
 console.log(w, await p.evaluate(()=>{
  const ul=document.querySelector('[data-metric-cards]');
  const cards=[...document.querySelectorAll('[data-kpi-index]')];
  const t=ul.textContent.replace(/\s+/g,' ');
  const bar=[...document.querySelectorAll('[data-kpi-index="4"] div')].find(d=>d.textContent.trim()==='3 days');
  return `cards=${cards.length} visible=${cards.filter(e=>getComputedStyle(e).opacity!=='0').length} cols=${getComputedStyle(ul).gridTemplateColumns.split(' ').length} radius=${getComputedStyle(cards[0]).borderRadius} clip=${getComputedStyle(cards[0]).clipPath} dots=${document.querySelectorAll('[aria-label^="Show "]').length} bar=${document.querySelectorAll('[data-kpi-progress]').length} afterBar=${bar?getComputedStyle(bar).width:'?'} figs=${['+7%','40-60%','+13%','+27%','67%'].filter(f=>t.includes(f)).length}/5`;
 }));
 await ctx.close();
}
await b.close();
