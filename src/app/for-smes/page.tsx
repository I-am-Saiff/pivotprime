import Link from "next/link";
import ServiceLinkButtons from "@/components/ServiceLinkButtons";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forSmes");

export default function ForSMEs() {
  // The sub-line under each card heading, in card order. One definition, so
  // the heading and the service button beneath it cannot drift apart: the
  // button is chosen by reading this text, in src/content/service-links.ts.
  const SUBLINES = [
    "Through an Operational Clarity Audit. From AED 15,000.",
    "Through pricing and margin architecture. Part of an Operational Clarity Audit, or scoped on its own.",
    "Through Fractional Leadership. Scoped per engagement.",
  ];

  return (
    <div className="flex flex-col min-h-screen pb-10 sm:pb-16">
      
      {/* Hero Section */}
      {/* FLUSH TO THE TOP, 3 September. The page wrapper carried
          "pt-12 sm:pt-20", which pushed this dark hero 48px, then 80px, down
          the viewport and left a band of page ground above it. The header is a
          floating pill inset from the edges, so that band showed around it and
          the header read as sitting on cream rather than on the hero.

          The wrapper padding is gone and the clearance moved into the hero
          itself, which is how the homepage and all five service pages already
          do it: pt-28 sm:pt-32 md:pt-40, copied from them rather than picked.
          Bottom padding is untouched. PENDING-COPY 1d9. */}
      <header className="bg-forest text-white relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Restored with the chapter number stripped. She asked for the labels reworded, not deleted. */}
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-neon uppercase">For SMEs</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            Revenue is increasing, but margins are uneven.
          </h1>
          {/* The same token as the eyebrow above the heading, text-neon, her
              31 August instruction that the two match precisely. */}
          <p className="text-lg md:text-xl text-neon font-medium leading-relaxed max-w-3xl mx-auto">
            Some months feel strong, others feel tighter than they should.
          </p>
        </div>
      </header>

      {/* Detail Sections */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Predictable profit and cash flow</h2>
            <h3 className="text-lg font-bold text-mid mb-6">{SUBLINES[0]}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">This is a 15-20 day analysis.</p>
              </div>
            </div>
            <ServiceLinkButtons subline={SUBLINES[0]} />
          </div>

          {/* Section 2 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Pricing that makes sense</h2>
            <h3 className="text-lg font-bold text-mid mb-6">{SUBLINES[1]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">This is typically a 2–4 week engagement.</p>
              </div>
            </div>
            <ServiceLinkButtons subline={SUBLINES[1]} />
          </div>

          {/* Section 3 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Operations that can scale</h2>
            <h3 className="text-lg font-bold text-mid mb-6">{SUBLINES[2]}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">Typically runs over 30–90 days, depending on scope.</p>
              </div>
            </div>
            <ServiceLinkButtons subline={SUBLINES[2]} />
          </div>

        </div>
      </section>

      {/* THE SPEC 5 ROUTING BLOCK WAS HERE and is removed on her 31 August
          instruction, on all four "Who it's for" pages. It was a sentence
          pointing the reader at a service plus a link to it. Every sentence is
          preserved in docs/PENDING-COPY.md 1c1, and its absence is asserted in
          the DECISIONS list in scripts/check-content.mjs rather than the old
          assertions simply being deleted.

          Nothing is orphaned by this: each service it linked to is also linked
          from the homepage and from /services, which check-links verifies by
          walking the site. */}

      {/* CTA Section */}
      <section className="px-4 py-6 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-[32px] bg-forest text-white p-7 sm:p-10 md:p-14 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to make your business predictable?
            </h2>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 font-bold tracking-wider uppercase text-forest bg-neon hover:bg-white hover:scale-105 transition-all rounded-xl shadow-xl text-xs">
              Book your first conversation <span className="ml-2 text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
