"use client";

import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import { FRACTIONAL_PHASES, FRACTIONAL_PHASES_CAPTION } from "@/content/services-detail";

// The URL fragment is an external mutable source. useSyncExternalStore is the
// supported way to read one without a hydration mismatch: the server snapshot is
// always empty, and React re-reads on the client after hydration. Reading
// location.hash during render, or syncing it with setState inside an effect,
// would either mismatch or trigger the cascading render the lint rule flags.

export default function Service2FractionalLeadership() {
  // Which seat is open is derived from the fragment rather than held
  // separately, so /services/fractional-leadership#cfo opens the CFO seat when opened
  // cold, and selecting a seat makes the URL shareable. Spec 4.2 calls these
  // anchors load-bearing: persona pages and the homepage card link into a seat.



  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-sans text-white">
            Fractional <span className="text-[#00d76d]">Leadership.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            Senior leadership for a season, not a lifetime. COO, Chief of Staff and CFO seats.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">Scoped per engagement.</b>
            <span className="text-sm text-[#8fb3a4]">Three-month minimum</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Priced on the days a month, the seniority of the seat, and how much of the delivery team sits underneath it. We agree all three before anything is quoted.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Curve Section */}
      <section className="surface-page py-10 sm:py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 sm:mb-10 max-w-2xl">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
              Why it costs less than it looks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#0c1a15]">
              Heavy at the start. <span className="text-[#009f50]">Light by the end.</span>
            </h2>
            <p className="text-[#5e6f68] mt-3">
              We build the structure, then hand it to someone cheaper to run. Senior input falls away as the operating model starts holding itself.
            </p>
          </div>

          {/* Her 22 August phase cards. The 13 August curve this replaces
              carried a "Your monthly cost" line she has since removed, and
              section 1 allows one price on the site. */}
          <ol className="grid gap-4 md:grid-cols-3">
            {FRACTIONAL_PHASES.map((phase) => (
              <li
                key={phase.band}
                className="flex flex-col rounded-xl border border-forest/15 card-dark p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs font-bold tracking-[0.18em] text-mid uppercase">
                    {phase.band}
                  </span>
                  <span className="rounded-xl bg-mist px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-wide text-forest uppercase">
                    {phase.badge}
                  </span>
                </div>

                <p className="mt-3 font-sans text-xl font-bold text-forest">{phase.title}</p>

                {/* Her markup puts Your team first on the last card and dims
                    Pivot Prime there: the order itself carries the handover. */}
                <div
                  className={`mt-5 flex flex-col gap-4 ${phase.yourTeamFirst ? "flex-col-reverse" : ""}`}
                >
                  <div className="rounded-lg bg-[var(--card-dark-fill)] p-4 text-white">
                    <p className="font-sans text-[11px] font-bold tracking-[0.18em] text-neon uppercase">
                      Pivot Prime
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">{phase.pivotPrime}</p>
                  </div>
                  <div className="rounded-lg border border-forest/12 card-dark p-4">
                    <p className="font-sans text-[11px] font-bold tracking-[0.18em] text-mid uppercase">
                      Your team
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest/80">{phase.yourTeam}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  {/* Decorative: the day counts are in the sentence above, so
                      nothing is carried by the bar alone. */}
                  <div aria-hidden="true" className="h-1.5 w-full rounded-full bg-forest/10">
                    <div
                      className="h-1.5 rounded-full bg-mid"
                      style={{ width: `${phase.involvement}%` }}
                    />
                  </div>
                  <p className="mt-2 font-sans text-[11px] font-bold tracking-[0.16em] text-forest/55 uppercase">
                    Pivot Prime involvement
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-forest/70">
            {FRACTIONAL_PHASES_CAPTION}
          </p>
        </div>
      </section>

    </div>
  );
}
