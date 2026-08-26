"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/flags";
import { JOURNEY_CTA, WHATSAPP_CTA } from "@/content/cta";
import { SEAT_IDS, seatIndexFromHash } from "@/lib/seat-anchors";
import { FRACTIONAL_PHASES, FRACTIONAL_PHASES_CAPTION, FRACTIONAL } from "@/content/services-detail";
import { CopyProse } from "./SpecCopyBlocks";

// The URL fragment is an external mutable source. useSyncExternalStore is the
// supported way to read one without a hydration mismatch: the server snapshot is
// always empty, and React re-reads on the client after hydration. Reading
// location.hash during render, or syncing it with setState inside an effect,
// would either mismatch or trigger the cascading render the lint rule flags.
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash;
const getServerHash = () => "";

export default function Service2FractionalLeadership() {
  // Which seat is open is derived from the fragment rather than held
  // separately, so /services/fractional-leadership#cfo opens the CFO seat when opened
  // cold, and selecting a seat makes the URL shareable. Spec 4.2 calls these
  // anchors load-bearing: persona pages and the homepage card link into a seat.
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const activeSeat = seatIndexFromHash(hash);

  const selectSeat = (index: number) => {
    // replaceState rather than assigning location.hash: assignment pushes a
    // history entry per click and makes the browser jump to the element.
    window.history.replaceState(null, "", `#${SEAT_IDS[index]}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const SEATS = [
    {
      title: "Fractional COO",
      short: "Owns execution",
      h: "What the COO seat covers",
      l: [
        "Ownership of execution against an agreed plan, with weekly accountability",
        "The operating model, decision rights and operating rhythm",
        "Process design, SOPs and operational governance",
        "Supplier, cost and margin discipline",
        "Hiring, team structure and onboarding",
        "Dashboards and reporting, so decisions are made on numbers rather than instinct",
        "Managing the delivery team, whether that is your people or ours",
      ],
      n: "The operating model, the weekly delivery, the team. For businesses where the work happens but nothing finishes predictably.",
    },
    {
      title: "Fractional Chief of Staff",
      short: "Owns follow-through",
      h: "What the Chief of Staff seat covers",
      l: [
        "Translating strategic decisions into work that actually moves",
        "Priority management across functions, and resolving the ones that collide",
        "Preparing the leadership team for the decisions ahead of them",
        "Chairing and running the operating rhythm: the meetings, the agendas, the follow-through",
        "Managing cross-functional programmes that have no natural owner",
        "Protecting senior attention, so the leadership team works on what only they can do",
        "Sitting in the meetings that matter, including board and investor conversations",
      ],
      n: "Translates decisions into movement across functions, manages the priorities that collide, and keeps senior attention on what matters. For complex organisations where the strategy is right and cannot land on its own.",
    },
    {
      title: "Fractional CFO",
      short: "Owns the numbers",
      h: "What the CFO seat covers",
      l: [
        "Cash, runway and rolling forecasts",
        "Management reporting and the board pack",
        "Collections, credit control and working capital",
        "Pricing, margin and unit economics",
        "Fundraising readiness: the model, the data room and the numbers behind the story",
        "Budgeting, cost control and supplier terms",
        "Statutory reporting, audit and compliance coordination",
      ],
      n: "Cash, runway and forecasting, collections, board and investor reporting, and readiness for the next round. For businesses raising capital, or where the founder feels the absence of a finance seat every week.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
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
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Curve Section */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
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
                className="flex flex-col rounded-xl border border-forest/15 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs font-bold tracking-[0.18em] text-mid uppercase">
                    {phase.band}
                  </span>
                  <span className="rounded-full bg-mist px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-wide text-forest uppercase">
                    {phase.badge}
                  </span>
                </div>

                <p className="mt-3 font-sans text-xl font-bold text-forest">{phase.title}</p>

                {/* Her markup puts Your team first on the last card and dims
                    Pivot Prime there: the order itself carries the handover. */}
                <div
                  className={`mt-5 flex flex-col gap-4 ${phase.yourTeamFirst ? "flex-col-reverse" : ""}`}
                >
                  <div className="rounded-lg bg-forest p-4 text-white">
                    <p className="font-sans text-[11px] font-bold tracking-[0.18em] text-neon uppercase">
                      Pivot Prime
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">{phase.pivotPrime}</p>
                  </div>
                  <div className="rounded-lg border border-forest/12 bg-linen/60 p-4">
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

      {/* Seats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
              The seats we fill
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#0c1a15]">
              Three seats. <span className="text-[#009f50]">Pick the one that is missing.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {SEATS.map((seat, i) => (
              <button
                key={i}
                type="button"
                id={SEAT_IDS[i]}
                onClick={() => selectSeat(i)}
                aria-pressed={activeSeat === i}
                className={`border rounded-xl p-5 text-left cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009f50] focus-visible:ring-offset-2 ${
                  activeSeat === i
                    ? "border-[#013325] bg-[#013325] text-white shadow-lg -translate-y-1"
                    : "border-[#e3eae6] bg-white text-[#0c1a15] hover:border-[#cfe3d8] hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <h4 className="font-sans font-bold text-base mb-1.5">{seat.title}</h4>
                <p className={`text-[13.5px] m-0 ${activeSeat === i ? "text-[#bfd8cd]" : "text-[#5e6f68]"}`}>
                  {seat.short}
                </p>
              </button>
            ))}
          </div>

          {/* All three panels are rendered and the inactive ones hidden, rather
              than rendering only the active seat. Two thirds of this page's
              substantive copy, the Chief of Staff and CFO coverage, was absent
              from the server-rendered HTML because it only existed once a
              visitor clicked. Spec 4.5: content must not depend on JavaScript
              having run. The `hidden` attribute keeps it in the document and out
              of the accessibility tree, so the tab behaviour is unchanged. */}
          <div className="mt-8 pt-8 border-t border-[#e3eae6]">
            {SEATS.map((seat, si) => (
              <div
                key={si}
                hidden={activeSeat !== si}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 animate-fade-in"
              >
                <div>
                  <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
                    {seat.h}
                  </div>
                  <p className="text-[#5e6f68]">{seat.n}</p>
                </div>
                <div>
                  <ul className="space-y-3">
                    {seat.l.map((item, i) => (
                      <li key={i} className="flex gap-3 items-start text-[15.5px] text-[#0c1a15]">
                        <div className="w-[17px] h-[17px] rounded-full bg-[#009f50] flex-shrink-0 mt-1 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px]"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it runs Section */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <div className="bg-[#fdf9f2] border-l-[3px] border-[#af8943] rounded-r-xl p-6 md:p-8">
              <h3 className="font-sans font-bold text-lg text-[#0c1a15] mb-2">Where it does not fit</h3>
              <p className="text-[#6b5a3c] text-[15.5px]">
                A complex operation with 200 or more staff, several products and sites in multiple countries needs a permanent COO. A Chief of Staff seat only works where there is a leadership team to serve. And if the problem is one defined project rather than the way the business runs, you need a project manager, which costs less.
              </p>
            </div>
            <div>
              <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
                How it runs
              </div>
              <p className="text-[#0c1a15] mb-3">
                Almost every retainer begins with an Operational Clarity Audit, because we will not commit to owning outcomes in a business we have not properly diagnosed. The audit also tells us what the retainer needs to cover, which is why we scope it afterwards rather than before.
              </p>
              <p className="text-[#0c1a15] mb-3">
                The CFO seat is the exception. Where the need is cash, reporting or an imminent raise, we can start there and diagnose alongside it.
              </p>
              <p className="text-[#0c1a15]">
                Three-month minimum, reviewed quarterly. A meaningful part of the fee can be structured against agreed KPIs.
              </p>
            </div>
          </div>

          <div className="bg-[#02291e] text-white rounded-xl p-8 md:p-12 mt-10">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d] mb-4">
              Next step
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 max-w-lg text-white">
              Find out which seat is actually missing.
            </h3>
            <p className="text-[#bfd8cd] mb-8">
              The diagnostic will tell you in four minutes, before anyone quotes you anything.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
                {WHATSAPP_CTA.label}
              </a>
              <Link href={JOURNEY_CTA.href} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-transparent text-white border border-white/30 rounded-full hover:border-white transition-colors">
                {JOURNEY_CTA.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spec 4.2 WHY THIS EXISTS, restored. The designed page opened straight
          into the seats, so the argument for a fractional seat at all was
          missing. See docs/PENDING-COPY.md. */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse heading={FRACTIONAL.whyHeading} paragraphs={FRACTIONAL.why} />
        </div>
      </section>

    </div>
  );
}
