"use client";

import { Lab, TickList, ServiceSignOff } from "./SpecCopyBlocks";
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
            <div className="relative h-[290px] md:h-[420px] w-full" ref={benchRef}>
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
            
            <p className="text-[14px] text-[#5e6f68] mt-6 min-h-[44px] max-w-2xl">
              Five seats we can fill. You never take all five. The audit says which ones the business actually needs, and that is what gets placed.
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
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <Lab>{BUILD_AND_PLACE.notCarryingHeading}</Lab>
            <div className="mt-3">
              <TickList items={BUILD_AND_PLACE.notCarrying} />
            </div>
          </div>
          <div>
            <Lab>{BUILD_AND_PLACE.pricedHeading}</Lab>
            <div className="mt-3 space-y-3">
              {BUILD_AND_PLACE.priced.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-forest/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ServiceSignOff {...SERVICE_CLOSERS.buildAndPlace} />
    </div>
  );
}
