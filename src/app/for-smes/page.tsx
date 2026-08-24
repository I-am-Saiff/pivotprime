import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forSmes");

export default function ForSMEs() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-16 bg-neutral-50/50">
      
      {/* Hero Section */}
      <header className="bg-forest text-white relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            Revenue is increasing, but margins are uneven.
          </h1>
          <p className="text-lg md:text-xl text-white/85 font-medium leading-relaxed max-w-3xl mx-auto">
            Some months feel strong, others feel tighter than they should. Cash flow needs attention, costs creep quietly, and performance depends too much on who is chasing what. You’re past early chaos, but not yet operating with the consistency, visibility, or control that scale demands.
          </p>
        </div>
      </header>

      {/* Detail Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="frosted-card-light p-8 md:p-14 rounded-[28px] mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Predictable profit and cash flow</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Through an Operational Clarity Audit. From AED 15,000.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p>
                  We review how money actually moves through the business today. That includes revenue drivers, pricing logic, margin by product or client, cost structure, working capital, and how reliably cash is collected.
                </p>
                <p>
                  We look at where profit is leaking, where effort is not converting into margin, and where growth is creating pressure instead of strength. This often includes reviewing receivables, cost creep, pricing consistency, and operational drag that is quietly eroding results.
                </p>
                <p>
                  The outcome is clarity on what is really driving performance month to month, what needs tightening first, and where predictability can be restored.
                </p>
              </div>
              <div className="md:col-span-5 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">This is a 15-20 day analysis.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">This is where most SMEs start. It creates a clear baseline before structural or operational changes are made.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="frosted-card-light p-8 md:p-14 rounded-[28px] mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Pricing that makes sense</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Through pricing and margin architecture. Part of an Operational Clarity Audit, or scoped on its own.</h3>
            {/* Spec 5.2: "the clearest place on the whole site where the
                actuarial background is directly relevant, and it is currently
                being left on the table." */}
            <p className="mb-8 leading-relaxed text-neutral-600">
              We look at contribution margin, delivery effort, variability and risk across every
              client, product and contract, then design pricing logic you can defend, rather than
              pricing that was set once and never revisited.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p>
                  As SMEs grow, pricing often lags behind reality. Products, clients, and services evolve, but prices stay flat, inconsistent, or driven by instinct rather than evidence.
                </p>
                <p>
                  We analyse your pricing across clients, products, and contracts, looking at contribution margin, delivery effort, variability, and risk. This includes identifying where work creep exists, where clients are underpriced, and where value is being given away unintentionally.
                </p>
                <p>
                  We help you design pricing logic that matches how your business actually operates. That may include tiered pricing, client segmentation, minimum fees, usage-based elements, or clearer rules around discounting and scope.
                </p>
                <p>
                  The result is pricing you can defend, margins you can predict, and growth that increases profit instead of diluting it.
                </p>
              </div>
              <div className="md:col-span-5 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">This is typically a 2–4 week engagement.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">Most SMEs come here after the profit and cash flow review, once it’s clear where margin instability is coming from.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="frosted-card-light p-8 md:p-14 rounded-[28px] mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest mb-3">Operations that can scale</h2>
            <h3 className="text-lg font-bold text-mid mb-8">Through a Fractional COO retainer. Scoped per engagement.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-base">
                <p>
                  What worked at a smaller size often starts to strain as volume increases. Processes become inconsistent, work is duplicated, priorities compete, and execution becomes noisy.
                </p>
                <p>
                  We review how work actually flows across teams, where friction builds, and where effort is being wasted. We reset workflows, clarify priorities, define standards, and document how critical processes should run.
                </p>
                <p>
                  This can include process redesign, automation opportunities, and creating operating rhythm so execution becomes more predictable as complexity increases.
                </p>
                <p>
                  The aim is simple: growth stops creating chaos, and momentum continues without constant firefighting.
                </p>
              </div>
              <div className="md:col-span-5 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-center">
                <p className="text-mid font-bold text-base mb-3">Typically runs over 30–90 days, depending on scope.</p>
                <p className="text-forest text-sm font-medium leading-relaxed">This typically follows growth or hiring pressure, when the business needs to stabilise at a new level.</p>
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
            Most SMEs start with the audit, because margin instability almost never comes from where the business assumes it does.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/services/operational-clarity-audit" className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-mid hover:scale-105">
              See what the audit covers
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
              Ready to make your business predictable?
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
