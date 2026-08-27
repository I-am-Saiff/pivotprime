"use client";

import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import { BUILD_AND_PLACE } from "@/content/services-detail";
import { CopyCards, CopyProse } from "./SpecCopyBlocks";


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
      <header className="bg-[#013325] text-white relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px]" />
        
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
      <section className="surface-page py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
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

      {/* Columns Section */}
      <section className="py-16 md:py-24 surface-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              What you are not carrying
            </div>
            <ul className="space-y-3">
              {[
                "Recruitment risk, and the cost of getting it wrong",
                "Performance management and the awkward conversation",
                "Visas, medical cover and end-of-service liability",
                "A permanent salary for a temporary problem",
                "Five separate contracts and five separate invoices"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-[15.5px] text-[#0c1a15]">
                  <div className="w-[17px] h-[17px] rounded-full bg-[#009f50] flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              How it is priced
            </div>
            <p className="text-[#0c1a15] mb-3">
              We scope the work with you, agree the days and what good looks like, and put it into a single proposal. You pay Pivot Prime and we pay the delivery partner.
            </p>
            <p className="text-[#0c1a15]">
              If the full team is not affordable, we reduce the scope rather than quietly reducing the quality of who we put in front of you.
            </p>
          </div>
        </div>
      </section>

      {/* Closer Section */}
      <section className="surface-page py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#02291e] text-white rounded-xl p-8 md:p-12">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d] mb-4">
              The difference
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 max-w-lg text-white">
              A consultant tells you what to do. A recruiter finds you someone.
            </h3>
            <p className="text-[#bfd8cd] mb-8">
              Neither one is accountable for whether it worked. That is the gap this service exists to close.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all">
                {WHATSAPP_CTA.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spec 4.3, restored. The designed diagram above carried these five
          seats as two-word captions; spec section 1 requires the green-block
          copy verbatim, and a caption is not a compression of a paragraph. The
          diagram is kept and its descriptor lines removed, so the same words do
          not appear twice on the page. See docs/PENDING-COPY.md. */}
      <section className="surface-page py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse heading={BUILD_AND_PLACE.whyHeading} paragraphs={BUILD_AND_PLACE.why} />
        </div>
      </section>

      <section className="surface-page py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyCards heading={BUILD_AND_PLACE.rolesHeading} cards={BUILD_AND_PLACE.cards} />
        </div>
      </section>

      <section className="surface-page py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse
            heading={BUILD_AND_PLACE.pricedHeading}
            paragraphs={[BUILD_AND_PLACE.priced, BUILD_AND_PLACE.scopeLine]}
          />
        </div>
      </section>

    </div>
  );
}
