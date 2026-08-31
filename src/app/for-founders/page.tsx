import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forFounders");

export default function ForFounders() {
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
            <h3 className="text-lg font-bold text-mid mb-6">Through an Operational Clarity Audit. From AED 15,000.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">This is a 12-14 hour piece of analysis.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">People you can trust to carry the work</h2>
            <h3 className="text-lg font-bold text-mid mb-6">Through hiring support, role design and Build and Place.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">Role clarity and hiring direction are typically established in 1–2 weeks, depending on scope.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="frosted-card-light border-forest/20 p-6 md:p-10 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Growth without more chaos</h2>
            <h3 className="text-lg font-bold text-mid mb-6">Through Fractional Leadership. Scoped per engagement.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-12 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base">This typically runs over 30 to 90 days.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Spec 5 routing block: each persona page points at the service the
          findings actually justify. */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 max-w-4xl rounded-2xl border border-forest/15 bg-forest/[0.04] p-8 text-center backdrop-blur-sm">
          <p className="mb-6 text-base sm:text-lg leading-relaxed text-neutral-700">
            Most founders start with the audit, because it is the cheapest way to find out whether the problem is the process, the people, or the founder.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/services/operational-clarity-audit" className="inline-flex items-center justify-center rounded-xl bg-forest px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-mid hover:scale-105">
              See what the audit covers
              <span aria-hidden="true" className="ml-2 text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

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
