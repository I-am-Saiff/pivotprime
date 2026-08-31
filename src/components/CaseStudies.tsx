"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  CASE_STUDIES,
  CASE_STUDIES_HEADING,
  FOUNDER_QUOTE,
  CASE_STUDIES_STANDFIRST,
} from "@/content/case-studies";

/**
 * The three case studies, spec 3.8 and section 6.
 *
 * Implemented as a horizontal swipeable carousel with arrow controls and
 * slide indicators. All three case studies are always rendered in full in the DOM
 * to guarantee 100% crawlability and zero-JavaScript fallbacks.
 *
 * `headingLevel` lets the homepage render this under an h2 and /about under its
 * own section heading without either page skipping a level, which spec 4.5
 * requires.
 */
export default function CaseStudies({
  headingLevel = 2,
  showHeading = true,
  scope = "all",
}: {
  headingLevel?: 2 | 3;
  showHeading?: boolean;
  /** "homepage" drops the three she asked to sit only on /about. */
  scope?: "all" | "homepage";
}) {
  const studies = scope === "homepage" ? CASE_STUDIES.filter((c) => !c.aboutOnly) : CASE_STUDIES;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const SubHeading = headingLevel === 2 ? "h3" : "h4";

  const scrollRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (offsetWidth || 1));
    setCurrentIndex(Math.min(Math.max(index, 0), studies.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const target = scrollRef.current.children[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % studies.length;
    scrollToIndex(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + studies.length) % studies.length;
    scrollToIndex(prev);
  };

  return (
    <div className="relative overflow-x-clip">
      {showHeading && (
        <header className="mb-7 sm:mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            {/* Her wording, slide 8: "Instead of chapter 2, let's put case studies". */}
            <span className="mb-3 block font-sans text-xs font-semibold tracking-[0.22em] text-mid uppercase">Case studies</span>
            <Heading className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {CASE_STUDIES_HEADING}
            </Heading>
            <p className="mt-4 text-lg text-neutral-600 md:text-xl">{CASE_STUDIES_STANDFIRST}</p>
            {/* Her own words, slide 8, verbatim. HOMEPAGE ONLY: /about renders
                her pp-case-studies.html pull quote directly above this section,
                and both are Iram. Two long quotes from the same person separated
                by one heading reads as a mistake, which is what it looked like
                when this was on both pages. PENDING-COPY 1ai. */}
            {scope === "homepage" && (
              <blockquote className="mt-8 border-l-2 border-mid/40 pl-6">
                <p className="text-base leading-relaxed text-neutral-700 italic md:text-lg">
                  {FOUNDER_QUOTE.body}
                </p>
                <footer className="mt-3 font-sans text-xs font-bold tracking-[0.14em] text-mid uppercase not-italic">
                  {FOUNDER_QUOTE.attribution}
                </footer>
              </blockquote>
            )}
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous case study"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-forest text-white shadow-sm transition-all hover:bg-white hover:border-forest hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase min-w-[50px] text-center">
              {currentIndex + 1} / {studies.length}
            </span>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next case study"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-forest text-white shadow-sm transition-all hover:bg-white hover:border-forest hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Swipeable Carousel Track */}
      <ul
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {studies.map((study, i) => (
          <li
            key={study.id}
            // Modest breathing room under the results panel, from 30 August,
            // and one class so it is the same on every card rather than three
            // cards that happen to look similar.
            className="flex flex-shrink-0 w-full snap-center frosted-card-light rounded-[28px] p-5 pb-9 sm:p-8 sm:pb-12 md:p-9 md:pb-14 shadow-sm"
          >
            {/* ONE COLUMN OF ARGUMENT, THE PICTURE BESIDE IT.

                Until 28 August the results panel sat in the right column under
                the photograph, so the left column stopped at the button while
                the right ran on. The card took the taller side and half of it
                was empty: on the Nurture card that was most of the left half.

                Now the copy and the results are both in the left column, in
                reading order, and the picture is alone on the right where it
                spans both of them. Cards with no picture use the same order in
                one column, so every card reads the same way. PENDING-COPY 1i. */}
            {/* content-start is what actually closes the gap. Every card in
                the carousel takes the height of the tallest, and a grid with
                h-full and no content alignment stretches its ROWS to fill that
                height, so aligning the panel inside row two still left the
                surplus above it. With the rows at their natural height the
                surplus falls to the foot of the card instead. Measured: the
                self-start change alone took Cinnacare from 148px to 78px, and
                this takes it to the same gap Nurture has. */}
            <div className="grid h-full content-start gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
              {/* The argument. */}
              <div
                className={`space-y-5 ${study.photo ? "lg:col-span-7 lg:col-start-1 lg:row-start-1" : "lg:col-span-12"}`}
              >
                <div>
                  <span className="mb-2 inline-flex items-center px-3 py-1 rounded-xl bg-forest/5 text-xs font-bold tracking-wider text-forest uppercase">
                    Case study {i + 1}
                  </span>
                  <SubHeading className="text-2xl font-extrabold text-forest md:text-3xl mt-1.5">
                    {study.sector}
                  </SubHeading>
                  {study.subtitle && (
                    <p className="mt-1 text-sm font-bold text-mid sm:text-base">{study.subtitle}</p>
                  )}
                  {study.headline && (
                    <p className="mt-2 text-lg font-bold leading-snug text-forest/85 sm:text-xl">
                      {study.headline}
                    </p>
                  )}
                  {/* Who delivered it, where that is not the consulting
                      engagement the other cards describe. */}
                  {study.attribution && (
                    <p className="mt-2 text-xs font-bold tracking-[0.14em] text-mid uppercase">
                      {study.attribution}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="mb-1.5 font-bold text-forest text-base sm:text-lg">The challenge</h4>
                  <p className="leading-relaxed text-neutral-600 text-sm sm:text-base">{study.challenge}</p>
                </div>

                {/* THE SECOND RESULTS SECTION USED TO BE HERE, and it was the
                    duplicate. It was "The pivot" until the client renamed that
                    heading on 29 August, at which point every card carrying both
                    it and the green panel below showed "The Results" twice. She
                    asked for one results section per case study, so this one is
                    gone and the panel is the single one. Its lead sentence moved
                    into the panel rather than being dropped: it is her copy and
                    it introduces the list. */}

                {study.link && (
                  <a
                    href={study.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-neon px-5 py-2.5 font-sans text-xs font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {study.link.label}
                    <span aria-hidden="true" className="ml-2 text-base leading-none">
                      &rarr;
                    </span>
                  </a>
                )}
              </div>

              {/* The picture, alone on the right, spanning both rows so it
                  never sets the card's height on its own. Capped: the Nurture
                  screenshot is a phone at 738x1600, which unbounded made the
                  card taller than everything in it. */}
              {study.photo && (
                <div className="relative lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-stretch">
                  <Image
                    src={study.photo.src}
                    alt={study.photo.alt}
                    width={study.photo.width}
                    height={study.photo.height}
                    sizes="(min-width: 1024px) 34vw, 92vw"
                    // Absolute from lg up, so the picture fills the height the
                    // argument sets rather than setting it. With h-full alone the
                    // 738x1600 phone screenshot pushed the card from 932 to 1110.
                    //
                    // THE FOCAL POINT IS PER STUDY, from 29 August. object-top is
                    // right for the Nurture phone screenshot, where the content is
                    // at the top of the screen, and wrong for the Scentmatic
                    // machine, an 808x540 photograph that a tall frame was
                    // cropping off-centre. A study with no explicit focus keeps
                    // the old behaviour, so nothing else moves.
                    className={`max-h-[300px] w-full rounded-2xl border border-forest/15 object-cover shadow-sm sm:max-h-[380px] lg:absolute lg:inset-0 lg:h-full lg:max-h-none ${study.photo.focus ?? "object-top"}`}
                  />
                </div>
              )}

              {/* The results, under the argument they belong to. The row is
                  pushed to the bottom so a short card does not leave the gap
                  between the button and the panel.

                  THE ONLY RESULTS SECTION ON EVERY CARD, from 29 August. There
                  was a second one in the left column, headed "The pivot" until
                  she renamed it, and seven of the nine studies were showing "The
                  Results" twice as a result. This panel is the one that survived
                  because it is where the four points she supplied for Scentmatic
                  already were, and because it is the only place a figure and the
                  Verified badge render at all. Every study now has exactly one.

                  No guard on the list length any more: every study has results,
                  which is checked by check-content rather than assumed here. */}
              {/* self-START, from 31 August. It was self-end, on the reasoning
                  that pushing the panel down would stop a short card leaving a
                  gap above it. It did the opposite. Every card in the carousel
                  takes the height of the tallest, so on all but that one card
                  the surplus was dumped between the button and the panel:
                  measured on the live site at 148px on Cinnacare, 154px on
                  Scentmatic and up to 336px on the /about-only cards, against
                  40px on Nurture, which is the card setting the height. The
                  panel now sits directly under the argument on every card and
                  the surplus falls to the foot of the card, where it reads as
                  the breathing room added on 30 August. */}
              <div
                className={`w-full self-start ${study.photo ? "lg:col-span-7 lg:col-start-1 lg:row-start-2" : "lg:col-span-12"}`}
              >
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--card-dark-fill)] p-5 text-white shadow-xl sm:p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center justify-between border-b border-white/15 pb-2.5">
                      <h4 className="font-bold text-neon text-sm sm:text-base">
                        The results
                      </h4>
                      {/* "Verified" is only true of a figure the master table
                          carries. On a card whose figures are all withheld it was
                          asserting the opposite of the truth, so it renders only
                          when the card actually publishes one. */}
                      {study.results.some((r) => r.figure) ? (
                        <span className="text-xs font-semibold text-white/60">Verified</span>
                      ) : null}
                    </div>

                    {/* Her sentence introducing the list. It sat above the
                        removed section in the left column; it moves here with
                        the list it belongs to rather than being lost with the
                        heading. */}
                    <p className="mb-3 text-sm font-medium leading-relaxed text-white/85 sm:text-base">
                      {study.resultsLead}
                    </p>

                    <ul className="space-y-2.5">
                      {study.results.map((result) => (
                        <li key={result.label} className="flex items-start text-sm font-medium leading-snug text-white/95">
                          <span aria-hidden="true" className="mr-3 mt-0.5 font-bold text-neon text-base leading-none">
                            ✓
                          </span>
                          {/* The figure is withheld where it is not in the section 9
                              master table. The claim still renders, so the case study
                              reads as a result awaiting a number rather than as nothing. */}
                          <span>
                            {result.figure ? (
                              <strong className="font-extrabold text-neon">{result.figure} </strong>
                            ) : null}
                            {result.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Slide Progress Dots */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-0.5" aria-hidden="true">
        {studies.map((_, idx) => (
          <button
            key={idx}
            type="button"
            // The row is aria-hidden, so these must leave the tab order with it.
            // The arrows above are the labelled, focusable control.
            tabIndex={-1}
            onClick={() => scrollToIndex(idx)}
            // The dot stays 8px; the button around it is 44px so a finger can
            // land on it. Measured at 320 they were 8x8 and 13x8.
            className={`flex h-11 w-11 shrink-0 items-center justify-center [&>span]:transition-all [&>span]:duration-300 motion-reduce:[&>span]:transition-none`}
          >
            <span
              className={`block h-2 rounded-full ${
                idx === currentIndex ? "w-8 bg-mid" : "w-2 bg-neutral-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
