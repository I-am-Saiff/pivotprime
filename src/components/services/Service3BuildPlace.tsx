"use client";

import { PairDark, PairLight, TickList, ServiceSignOff } from "./SpecCopyBlocks";
import { BUILD_AND_PLACE, SERVICE_CLOSERS } from "@/content/services-detail";

import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";

export default function Service3BuildPlace() {
  // Shared so the reveal never hides content from a crawler or from a
  // visitor who has reduced motion enabled. See the hook for why.
  const [benchRef, isVisible] = useRevealOnScroll<HTMLDivElement>();

  // The descriptor line under each node used to read "drives delivery", "owns
  // the numbers" and so on. Those were the designer's compression of spec 4.3's
  // five card paragraphs, which are now on the page in full below. Carrying both
  // would print the same idea twice, so the diagram keeps the role name that
  // identifies the node and drops the caption. Decision recorded in
  // docs/PENDING-COPY.md.
  // Slide 14, her wording: "Change Project Manager (capital M)", "Software
  // Engineer, instead of Engineer", "Add the Fractional COO".
  const slots = [
    { left: 16, top: 20, b: "Project Manager" },
    { left: 84, top: 20, b: "Fractional CFO" },
    { left: 50, top: 8, b: "Fractional COO" },
    { left: 12, top: 80, b: "Software Engineer" },
    { left: 50, top: 92, b: "Marketing" },
    { left: 88, top: 80, b: "Web and digital" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-16 md:pt-40 md:pb-24">
        {/* The dot pattern was here. Removed from every service-page dark
            background on her 29 August instruction, item 3. */}
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HER HERO EYEBROW, restored 1 September. Her file opens every
              service page with one of these above the h1 and none of the five
              was on the site. No instruction of hers removed them, so their
              absence was ours. Neon rather than mid green because her own CSS
              says so: .eyebrow is mid, and .ondark .eyebrow is neon, and every
              one of these heroes is class="hero ondark" in her file. Same
              10.5px, 600 weight and 0.24em tracking the light-ground section
              eyebrows on these pages already use. PENDING-COPY 1c7. */}
          <span className="mb-4 block font-sans text-[10.5px] font-semibold tracking-[0.24em] text-neon uppercase">
            Service three
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-sans text-white">
            Build and <span className="text-[#00d76d]">Place.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            We put people inside your business to execute the fix, rather than leaving you to run it yourself.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">Scoped per engagement</b>
            <span className="text-sm text-[#8fb3a4]">Roles, days and duration agreed up front</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Sourced, vetted and managed by us. They report to us rather than to you, so you are not carrying the recruitment risk or the performance management.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Stage / Map Section */}
      <section className="surface-page py-10 sm:py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 sm:mb-10 max-w-2xl">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
              How it fits together
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#0c1a15]">
              One contract. <span className="text-[#009f50]">One accountable party.</span>
            </h2>
            <p className="text-[#5e6f68] mt-3">
              We bring in only what the diagnosis justifies, and we manage whoever we bring.
            </p>
          </div>

          <div className="card-dark border border-[#e3eae6] rounded-xl p-6 md:p-8 overflow-hidden shadow-sm">
            {/* The reveal now observes a wrapper holding both layouts rather
                than the scattered map alone. Below 430 the map is display:none,
                and an element with no box reports top 0, which the hook reads as
                already on screen and returns early from: the stack would have
                been stuck in its un-revealed dashed state for good. At 430 and
                up the stack has no box, so the wrapper's geometry is the map's
                geometry and the hook sees exactly what it saw before. */}
            <div ref={benchRef}>
            {/* BELOW 430: A VERTICAL STACK, audit items 8 and 9, same root cause
                as the process map. The six role chips are 118px wide, placed by
                percentage inside an 800-unit viewBox and pulled back by half
                their own width. At 320 the panel is ~240px, so 16% and 84% land
                the outer chips less than 40px from each edge: Software Engineer
                and Web and digital hung 5px past the panel, and four pairs
                overlapped, worst 37x24px where Project Manager met Fractional
                COO. The percentages are fine at 430 and meaningless below it.

                So below 430 the bench runs vertically: the hub first, because it
                is what the six report into, then one role per row at full width
                so the label sets nothing and simply fits. Node fill, border
                weight, radius, type, the data-on-light legibility flag and the
                staggered reveal are the diagram's own; the connector is its own
                #cfe0d8 stroke, run vertically between rows the way the process
                map's is.

                NO RESERVED HEIGHT HERE. The process map needed one because its
                toggle swaps a seven-step state for a six-step one and the panel
                would jump. This diagram has one state and six nodes always, so
                nothing changes height under it and the panel sizes to content.

                WHAT THE STACK CANNOT SHOW: six lines radiating from a centre.
                A vertical run has one spine, so the star becomes a sequence.
                The hub sitting first, above every role, is what carries "one
                contract, one accountable party" here, and the section heading
                and the caption below both state it in words, unchanged. */}
            <div className="min-[430px]:hidden">
              <div className="flex w-full flex-col">
                <div className="rounded-xl bg-[#013325] px-5 py-3.5 text-center text-white">
                  <b className="block font-sans text-[14px] font-semibold">Pivot Prime</b>
                  <span className="text-[11px] text-[#8fb3a4]">manages, invoices, accountable</span>
                </div>
                {slots.map((s, i) => (
                  <div key={s.b} className="flex flex-col">
                    <span
                      aria-hidden="true"
                      className="mx-auto block h-4 w-0 border-l border-[#cfe0d8]"
                    />
                    <div
                      data-on-light="true"
                      className={`w-full rounded-xl p-2.5 text-center transition-all duration-500 ${
                        isVisible
                          ? "border-solid border-[#009f50] bg-[#f2f8f4]"
                          : "border-dashed border-[#cfd9d4] surface-page opacity-50"
                      }`}
                      style={{
                        borderWidth: "1.6px",
                        transitionDelay: `${isVisible ? 280 + i * 260 : 0}ms`,
                      }}
                    >
                      <b
                        className={`block font-sans text-[12.5px] font-semibold transition-colors duration-500 ${
                          isVisible ? "text-[#013325]" : "text-[#5e6f68]"
                        }`}
                        style={{ transitionDelay: `${isVisible ? 280 + i * 260 : 0}ms` }}
                      >
                        {s.b}
                      </b>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 430 AND UP: the scattered bench, unchanged. */}
            <div className="relative hidden h-[290px] w-full min-[430px]:block md:h-[420px]">
              <svg viewBox="0 0 800 290" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                {slots.map((s, i) => {
                  const delay = 280 + i * 260;
                  return (
                    <line 
                      key={i}
                      x1="400" 
                      y1="145" 
                      x2={(s.left / 100) * 800} 
                      y2={(s.top / 100) * 290} 
                      stroke="#cfe0d8" 
                      strokeWidth="1.6" 
                      strokeDasharray="200" 
                      strokeDashoffset={isVisible ? 0 : 200}
                      className="transition-all duration-700 ease-in-out"
                      style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
                    />
                  );
                })}
              </svg>
              
              {/* Hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#013325] text-white rounded-xl px-5 py-3.5 text-center z-10 w-auto min-w-[160px]">
                <b className="block font-sans font-semibold text-[14px]">Pivot Prime</b>
                <span className="text-[11px] text-[#8fb3a4]">manages, invoices, accountable</span>
              </div>
              
              {/* Slots */}
              {slots.map((s, i) => {
                const delay = 280 + i * 260;
                return (
                  <div 
                    key={i}
                    // Legibility: light chip inside a .card-dark panel, see the
                    // data-on-light rule in globals.css. The seat labels were
                    // white on white at 1.08:1.
                    data-on-light="true"
                    className={`absolute w-[118px] -translate-x-1/2 -translate-y-1/2 text-center rounded-xl p-2.5 transition-all duration-500
                      ${isVisible ? "opacity-100 border-solid border-[#009f50] bg-[#f2f8f4]" : "opacity-50 border-dashed border-[#cfd9d4] surface-page"}
                    `}
                    style={{ 
                      left: `${s.left}%`, 
                      top: `${s.top}%`,
                      borderWidth: '1.6px',
                      transitionDelay: `${isVisible ? delay : 0}ms`
                    }}
                  >
                    <b className={`block font-sans font-semibold text-[12.5px] transition-colors duration-500 ${isVisible ? "text-[#013325]" : "text-[#5e6f68]"}`} style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}>
                      {s.b}
                    </b>
                  </div>
                );
              })}
            </div>
            </div>

            <p className="text-[14px] text-[#5e6f68] mt-6 min-h-[44px] max-w-2xl">
              Six seats we can fill. You never take all six. The audit says which ones the business actually needs, and that is what gets placed.
            </p>
          </div>
        </div>
      </section>

      {/* HER PAIR, from 30 August: "What you are not carrying" beside "How it
          is priced", which is the structure her file gives this page between
          the bench diagram and the closer. The left column is hers and is new
          to the site; the right is spec 4.3, split at her paragraph break.

          WHAT WENT: "The seats we place", the five role paragraphs that stood
          here. They are not in her file and not in the structure the meeting
          states for this page, and the bench diagram above names the same six
          seats. Every word is preserved in docs/PENDING-COPY.md 1b7 and stays
          in BUILD_AND_PLACE.cards, so putting them back is a render. */}
      <section className="surface-page px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-2 md:gap-6">
          <PairLight label={BUILD_AND_PLACE.notCarryingHeading}>
            <TickList items={BUILD_AND_PLACE.notCarrying} />
          </PairLight>
          <PairDark label={BUILD_AND_PLACE.pricedHeading}>
            <div className="space-y-3">
              {BUILD_AND_PLACE.priced.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </PairDark>
        </div>
      </section>
      <ServiceSignOff {...SERVICE_CLOSERS.buildAndPlace} />
    </div>
  );
}
