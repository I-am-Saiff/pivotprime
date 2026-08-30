import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forCorporateLeaders");

export default function ForCorporateLeaders() {
  return (
    <div className="flex flex-col min-h-screen pt-12 sm:pt-20 pb-10 sm:pb-16">
      
      {/* Hero Section */}
      <header className="bg-forest text-white relative overflow-hidden py-10 sm:py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Restored with the chapter number stripped. She asked for the labels reworded, not deleted. */}
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-neon uppercase">For corporate leaders</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            You’re carrying delivery, risk, and outcomes
          </h1>
          <p className="text-lg md:text-xl text-neon font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
            You are often expected to do it without enough people or budget.
          </p>
          <p className="text-base md:text-lg text-white/85 font-medium leading-relaxed max-w-3xl mx-auto">
            You’re expected to make things work across functions, vendors, and priorities, while keeping the organisation steady and your own credibility intact.
          </p>
        </div>
      </header>

      {/* Detail Sections */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="frosted-card-light border-forest/20 p-8 md:p-14 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Execution support without headcount</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Through Build and Place. Scoped per engagement.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p className="font-semibold text-forest">
                  This is for leaders who need real delivery, not another steering committee.
                </p>
                <p>
                  We operate as an extension of your function, helping you plan, coordinate, and deliver work across teams and vendors, without adding permanent headcount or disrupting the organisation.
                </p>
                <p>
                  Support can include project management, operational coordination, vendor oversight, documentation, and day-to-day execution support during high-pressure periods such as launches, integrations, audits, or regulatory change.
                </p>
              </div>
              <div className="md:col-span-5 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">We can provide execution support for anywhere from 4 weeks to 6 months+.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">Most leaders start here when delivery pressure is high and internal bandwidth is stretched.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="frosted-card-light border-forest/20 p-8 md:p-14 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">On-demand specialist bench</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Through Build and Place. Scoped per engagement.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p className="font-semibold text-forest">
                  You don’t need to hire for everything, but you do need access to people who know what they’re doing.
                </p>
                <p>
                  We give you access to a vetted bench of specialists across operations, HR, compliance, legal, data, automation, and transformation support, who work as one coordinated team, not disconnected vendors.
                </p>
                <p>
                  This allows you to bring in the right capability for one month, three months, or a defined piece of work, without long approval cycles or permanent cost.
                </p>
              </div>
              <div className="md:col-span-5 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">Typical engagements to use our partner bench are flexible and based on need.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">Often used when workload spikes or specialist input is required fast.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="frosted-card-light border-forest/20 p-8 md:p-14 rounded-[28px] mb-7 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Senior judgment, on call</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Through Fractional Leadership Services. A confidential resource to pressure-test decisions before they cost you.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p className="font-semibold text-forest">
                  This is for leaders who carry responsibility without cover.
                </p>
                <p>
                  We act as a confidential sounding board to help you pressure-test decisions, structure thinking, and sharpen how you communicate with senior stakeholders, regulators, and boards.
                </p>
                <p>
                  This is decision support for people who can’t afford mistakes.
                </p>
              </div>
              <div className="md:col-span-5 card-dark p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">The typical engagement is monthly or ad hoc.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">This is like having an Executive Board that you can consult when you need.</p>
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
            You do not need to hire for everything. You do need access to people who know what they are doing, without a long approval cycle or a permanent cost.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/services/build-and-place" className="inline-flex items-center justify-center rounded-xl bg-forest px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-mid hover:scale-105">
              How we staff an engagement
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
              Need on-demand execution support?
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
