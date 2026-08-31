import { ServiceSignOff } from "./SpecCopyBlocks";
import { SERVICE_CLOSERS } from "@/content/services-detail";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import ClarityAuditProcessMap from "./ClarityAuditProcessMap";

export default function Service1ClarityAudit() {

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-16 md:pt-40 md:pb-24">
        {/* Pattern Background */}
        {/* The dot pattern was here. Removed from every service-page dark
            background on her 29 August instruction, item 3. */}
        
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

      {/* THE PAGE ENDS HERE, from 30 August. Her file builds this page as hero,
          the as-is versus to-be map, and the closer, with four blocks in
          between; the meeting instruction is to take those four out as
          redundant clutter, so the structure below the map is the closer alone.

          WHAT WENT: the "What we look at" and "What you get" pair that sat here
          in her design, and the "How we do it", "What happens after" and
          "Pricing and margin engagements" blocks below it. Every word of all
          five is preserved in docs/PENDING-COPY.md 1b7. The copy also stays in
          CLARITY_AUDIT in the content file, so restoring any of them is a
          render, not a retype.

          The pricing block is the one removal she did not name. It is not in her
          file and it is not in the structure the meeting states for this page,
          so it goes with the rest and is flagged for her rather than kept
          quietly. */}
      <ServiceSignOff {...SERVICE_CLOSERS.clarityAudit} />
    </div>
  );
}
