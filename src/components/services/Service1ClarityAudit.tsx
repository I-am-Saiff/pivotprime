import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import ClarityAuditProcessMap from "./ClarityAuditProcessMap";

export default function Service1ClarityAudit() {

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-16 md:pt-40 md:pb-24">
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-sans text-white">
            Operational <span className="text-[#00d76d]">Clarity Audit.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            A structured diagnosis of what is actually limiting the business, and a prioritised plan for fixing it.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">From AED 15,000</b>
            <span className="text-sm text-[#8fb3a4]">Typically 12 to 20 working days</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Scope depends on the size of the business, how many functions are in review, and how many people we interview.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Stage / Map Section */}
      <ClarityAuditProcessMap />

      {/* Columns Section */}
      <section className="py-10 sm:py-16 md:py-24 surface-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-14">
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              What we look at
            </div>
            <ul className="space-y-3">
              {[
                "The commercial model, pricing, and margin by product, client or service",
                "The P&L, cost structure, working capital and how reliably cash is collected",
                "How work actually flows day to day, and where it stalls or reverses",
                "Which decisions route through the founder, and which genuinely need to",
                "Roles, ownership and accountability, and where they are unclear",
                "Where automation would remove real cost, and where it would add a tool"
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
              What you get
            </div>
            <ul className="space-y-3">
              {[
                "An as-is versus to-be map of how work runs today and what changes",
                "A findings report with every gap ranked by risk and by effort",
                "A prioritised roadmap: what to fix now, what can wait",
                "A baseline set of measurements to judge the improvements against",
                "A costed view of what to fix internally and what needs outside capacity",
                "An executive summary written for owners and investors"
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
        </div>
      </section>

    </div>
  );
}
