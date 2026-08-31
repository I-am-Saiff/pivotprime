"use client";

import { Fragment, useState, useSyncExternalStore } from "react";

import { PairDark, PairLight, SectionHead, ServiceSignOff } from "./SpecCopyBlocks";
import { FRACTIONAL_FIT, SEATS, SERVICE_CLOSERS } from "@/content/services-detail";
import { SEAT_IDS, seatIndexFromHash } from "@/lib/seat-anchors";

import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import { FRACTIONAL_PHASES, FRACTIONAL_PHASES_CAPTION } from "@/content/services-detail";

// The URL fragment is an external mutable source. useSyncExternalStore is the
// supported way to read one without a hydration mismatch: the server snapshot is
// always empty, and React re-reads on the client after hydration. Reading
// location.hash during render, or syncing it with setState inside an effect,
// would either mismatch or trigger the cascading render the lint rule flags.
function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export default function Service2FractionalLeadership() {
  // Which seat is open is derived from the fragment rather than held
  // separately, so /services/fractional-leadership#cfo opens the CFO seat when
  // opened cold, and a click afterwards takes precedence over it. Spec 4.2
  // calls these anchors load-bearing: persona pages and the homepage card link
  // into a seat.
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const [picked, setPicked] = useState<number | null>(null);
  const openSeat = picked ?? seatIndexFromHash(hash);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-16 md:pt-40 md:pb-24">
        {/* The dot pattern was here. Removed from every service-page dark
            background on her 29 August instruction, item 3. */}

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

      {/* Curve Section.

          CREAM, from 31 August. This was the last pale green band on any
          service page: every other section on all five sits on the page ground,
          so this one read as a stripe across an otherwise continuous page. The
          cards inside it keep their own fills, which is where the colour
          belongs. The phase cards are shell and stay lighter than the ground
          behind them, so the pale green going does not cost them their edge. */}
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
                className="flex flex-col rounded-xl border border-forest/15 bg-shell p-6 shadow-sm"
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
                  {/* Her "Your Team" box in #efeae0, 29 August. It was
                      card-dark, which on this card meant forest on forest. */}
                  <div className="rounded-lg border border-forest/12 bg-mist p-4">
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

      {/* THE THREE SEATS, as her file builds them, from 30 August.

          Her pattern is a tab set: three clickable seat cards, and the chosen
          seat's duties below them. The meeting instruction is the same, so this
          is her markup rather than the three stacked panels this page carried
          after the 29 August restore.

          ALL THREE PANELS ARE IN THE SERVED HTML. Her own file renders one, from
          script, into an empty div, so two thirds of this page's substance never
          reaches a crawler; that is the exact defect AGENTS.md records against
          this section. Here every panel is rendered and the two that are not
          open carry the `hidden` attribute, so the copy is in the page with
          JavaScript off and the tabs are the only thing that needs it.

          THE ANCHORS SIT ON THE BUTTONS, not on the panels, because a fragment
          pointing at a hidden element scrolls nowhere. #coo, #chief-of-staff and
          #cfo land on the card, and the fragment also chooses which panel opens,
          so an inbound link to a seat still shows that seat. */}
      <section className="surface-page px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            eyebrow={FRACTIONAL_FIT.seatsEyebrow}
            heading={
              <>
                {FRACTIONAL_FIT.seatsHeading}{" "}
                <span className="text-mid">{FRACTIONAL_FIT.seatsHeadingAccent}</span>
              </>
            }
          />

          {/* ONE GRID, BUTTON THEN ITS OWN PANEL, from the 31 August narrow-width
              report. The button row and the panel row used to be two separate
              blocks, so below md the three buttons stacked and the open panel
              landed underneath all three: on a phone you tapped the CFO seat and
              the content appeared two cards further down, with nothing tying it
              to what you pressed.

              Interleaved in the DOM, the panel is the accordion body directly
              beneath its own header at every width below 768. At md the order
              utilities put all three buttons back in row one and the panel below
              them spanning the full width, which is the tab layout unchanged.

              THE STATE MACHINE IS UNTOUCHED. This was already a single-open
              disclosure: one openSeat index, real buttons carrying aria-expanded
              and aria-controls pointing at the panel ids, all three panels in the
              served HTML with the closed two marked hidden, and the COO seat open
              by default because seatIndexFromHash returns 0 for an empty
              fragment. Only the layout moved.

              SPACING HOLDS AT md: the panel's mt-6 became the grid's md:gap-y-6,
              so the 24px between the buttons and the panel is the same 24px it
              was, and the 12px between the buttons is untouched. */}
          <div className="grid gap-3 md:grid-cols-3 md:gap-y-6">
            {SEATS.map((seat, i) => {
              const isOpen = i === openSeat;
              return (
                <Fragment key={seat.title}>
                  <button
                    type="button"
                    id={SEAT_IDS[i]}
                    onClick={() => setPicked(i)}
                    aria-expanded={isOpen}
                    aria-controls={`${SEAT_IDS[i]}-panel`}
                    className={`rounded-xl border p-5 text-left transition-all md:order-1 ${
                      isOpen
                        ? "border-forest bg-forest"
                        : "border-forest/12 bg-shell hover:-translate-y-0.5 hover:border-mid/40 hover:shadow-[0_14px_30px_rgba(1,51,37,0.07)]"
                    }`}
                  >
                    <span
                      className={`block font-sans text-base font-bold ${isOpen ? "text-white" : "text-forest"}`}
                    >
                      {seat.title}
                    </span>
                    <span
                      className={`mt-1.5 block text-sm ${isOpen ? "text-mist" : "text-forest/70"}`}
                    >
                      {seat.short}
                    </span>
                  </button>

                  <div
                    id={`${SEAT_IDS[i]}-panel`}
                    hidden={i !== openSeat}
                    className="grid gap-5 md:order-2 md:col-span-3 md:grid-cols-2 md:gap-6"
                  >
                    {/* Left white, right dark green, her 31 August rule. Both halves
                        were plain text on the page ground until now. */}
                    <PairLight label={seat.h} labelAs="h3">
                      <p className="leading-relaxed text-forest/70">{seat.n}</p>
                    </PairLight>
                    <PairDark>
                      <ul className="grid gap-2.5">
                        {seat.l.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[15.5px] text-white">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon"
                            />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </PairDark>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Her closing pair: the honest disqualifier beside how the retainer
          actually runs. Both are hers, out of pivotprimeservicepages.html, and
          neither has been on this page before. The aside is her `.notefit`,
          which is gold in her file and green here. */}
      <section className="surface-page px-4 pb-10 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-2 md:gap-6">
          {/* "Where it does not fit" was her gold-turned-green aside; it is the
              white half of the pair now, on her 31 August instruction. */}
          <PairLight label={FRACTIONAL_FIT.notFitHeading} labelAs="h3">
            <p className="leading-relaxed text-forest/75">{FRACTIONAL_FIT.notFit}</p>
          </PairLight>
          <PairDark label={FRACTIONAL_FIT.howHeading}>
            <div className="space-y-3">
              {FRACTIONAL_FIT.how.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </PairDark>
        </div>
      </section>

      <ServiceSignOff {...SERVICE_CLOSERS.fractional} />
    </div>
  );
}
