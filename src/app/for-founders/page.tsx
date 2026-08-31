import Link from "next/link";
import ServiceLinkButtons from "@/components/ServiceLinkButtons";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forFounders");

export default function ForFounders() {
  // The sub-line under each card heading, in card order. One definition, so
  // the heading and the service button beneath it cannot drift apart: the
  // button is chosen by reading this text, in src/content/service-links.ts.
  const SUBLINES = [
    "Through an Operational Clarity Audit. From AED 15,000.",
    "Through hiring support, role design and Build and Place.",
    "Through Fractional Leadership. Scoped per engagement.",
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 sm:pt-20 pb-10 sm:pb-16">
      
      {/* Hero Section */}
      <header className="bg-forest text-white relative overflow-hidden py-10 sm:py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Her wording, slide 18: "Change the eyebrow heading to FOR FOUNDERS". */}
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-neon uppercase">For founders</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            You’ve created something real.
          </h1>
          <p className="text-lg md:text-xl text-white/85 font-medium leading-relaxed max-w-3xl mx-auto">
            It works, but behind the scenes, everything still depends on you. Decisions funnel back to your desk, growth feels harder than it should and stepping away feels risky.
          </p>
        </div>
      </header>

      {/* Detail Sections */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">A business that doesn&apos;t depend on you</h2>
            <h3 className="text-lg font-bold text-mid mb-6">{SUBLINES[0]}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">This is a 12-14 hour piece of analysis.</p>
              </div>
            </div>
            <ServiceLinkButtons subline={SUBLINES[0]} />
          </div>

          {/* Section 2 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">People you can trust to carry the work</h2>
            <h3 className="text-lg font-bold text-mid mb-6">{SUBLINES[1]}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">Role clarity and hiring direction are typically established in 1–2 weeks, depending on scope.</p>
              </div>
            </div>
            <ServiceLinkButtons subline={SUBLINES[1]} />
          </div>

          {/* Section 3 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Growth without more chaos</h2>
            <h3 className="text-lg font-bold text-mid mb-6">{SUBLINES[2]}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">This typically runs over 30 to 90 days.</p>
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
              Ready to take work off your plate?
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
