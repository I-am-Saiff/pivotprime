import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forPlOwners");

export default function ForCorporateOwners() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-16 bg-neutral-50/50">
      
      {/* Hero Section */}
      <header className="bg-forest text-white relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Restored with the chapter number stripped. She asked for the labels reworded, not deleted. */}
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-neon uppercase">For P&amp;L owners</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            You are responsible for the whole system.
          </h1>
          <p className="text-lg md:text-xl text-white/85 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
            Performance, risk, and long-term direction all sit with you. You’re running a complex organisation with multiple products, senior leaders, regulators, boards, and markets to answer to.
          </p>
          <p className="text-base md:text-lg text-white/75 font-normal leading-relaxed max-w-3xl mx-auto">
            The business is stable, but progress is slow, change is expensive, and every initiative competes with ten others. Growth exists, but momentum is harder to create. Execution happens, but not always in the direction you intend.
          </p>
        </div>
      </header>

      {/* Detail Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-forest">What We Offer</h2>
          </div>

          {/* Section 1 */}
          <div className="frosted-card-light border-forest/20 p-8 md:p-14 rounded-[28px] mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Why your unit isn&apos;t moving faster than the market</h2>
            <h3 className="text-lg font-bold text-mid mb-8">A reset of where capital, leadership attention, and effort are actually going, and what to cut.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p className="font-semibold text-forest">
                  This is about understanding why you’re not moving faster than the market.
                </p>
                <p>
                  We look at where capital, leadership attention, and effort are spread too thin, where growth is capped by internal friction, and where competitors are quietly out-executing you.
                </p>
                <p>
                  This work surfaces where margin and growth are leaking, which initiatives are noise versus advantage and what must change to outperform peers, not just keep pace.
                </p>
                <p>
                  The outcome is a small number of moves that materially shift trajectory, not a long list of initiatives.
                </p>
              </div>
              <div className="md:col-span-5 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">This is a 2 to 12 week reset, depending on scope and complexity.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">Most CEOs start here when growth plateaus, regulation shifts, or competitive pressure increases.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="frosted-card-light border-forest/20 p-8 md:p-14 rounded-[28px] mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Your decisions don&rsquo;t survive the next layers of the organisation</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Senior-level support that closes the gap between what gets decided and what actually lands.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p className="font-semibold text-forest">
                  Most corporate strategies fail quietly, not loudly. They get approved, socialised, and then diluted across layers of the organisation.
                </p>
                <p>
                  We operate as a Chief of Staff or executive extension to ensure the decisions that matter actually land, across functions, regions, and senior teams.
                </p>
                <p>
                  This includes translating strategic intent into executable priorities, managing cross-functional dependencies and politics, keeping momentum when priorities collide and giving you real visibility on what is moving and what is stuck.
                </p>
                <p>
                  This is how strategy survives scale.
                </p>
              </div>
              <div className="md:col-span-5 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">Engaged on a flexible basis, typically over 3–6 months.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">Typically engaged after priorities are reset, when execution needs senior-level coordination, follow-through, and momentum.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="frosted-card-light border-forest/20 p-8 md:p-14 rounded-[28px] mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Grow output without growing the cost base</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Smarter operating design, targeted automation, and AI adoption, applied where it actually reduces drag.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p className="font-semibold text-forest">
                  Large organisations slow down in invisible ways. Processes calcify, systems are under-used, and teams compensate instead of fixing root causes.
                </p>
                <p>
                  We help remove friction that limits speed and scale, using smarter operating design, automation, and selective AI adoption.
                </p>
                <p>
                  This is not transformation theatre. It is targeted change that improves execution velocity, cost discipline, and decision quality without destabilising the organisation.
                </p>
              </div>
              <div className="md:col-span-5 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">Typically delivered over 3–9 months, depending on the scope of change.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">Usually engaged once direction is set, to modernise how work actually gets done.</p>
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
            The outcome is a small number of moves that materially shift trajectory, rather than a long list of initiatives that compete with each other.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/services/build-and-place" className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-mid hover:scale-105">
              How we staff an engagement
              <span aria-hidden="true" className="ml-2 text-base leading-none">&rarr;</span>
            </Link>
            <Link href="/services/technology-builds" className="inline-flex items-center justify-center rounded-full bg-white border border-forest/20 px-8 py-3.5 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-forest hover:text-white hover:scale-105">
              See what tech we can build
              <span aria-hidden="true" className="ml-2 text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-[32px] bg-forest text-white p-10 md:p-14 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to create real momentum?
            </h2>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 font-bold tracking-wider uppercase text-forest bg-neon hover:bg-white hover:scale-105 transition-all rounded-full shadow-xl text-xs">
              Book your first conversation <span className="ml-2 text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
