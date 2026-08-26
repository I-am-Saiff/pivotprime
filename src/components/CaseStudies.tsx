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
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-forest shadow-sm transition-all hover:bg-neutral-50 hover:border-forest hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none active:scale-95"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-forest shadow-sm transition-all hover:bg-neutral-50 hover:border-forest hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none active:scale-95"
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
            className="flex-shrink-0 w-full snap-center frosted-card-light rounded-[28px] p-6 sm:p-10 md:p-12 shadow-sm"
          >
            {/* Two columns while the right side has something to carry: a
                results panel with figures in it, or one of the two photographs
                she sent for the named studies. With every figure withheld and no
                picture the panel is three short lines, so the right column ended
                well above the left and the card looked unfinished. Those cards
                run in one column and end level. PENDING-COPY 1i. */}
            <div
              className={
                study.results.some((r) => r.figure) || study.photo
                  ? "flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12 items-start"
                  : "flex flex-col gap-8"
              }
            >
              {/* Left Column: Challenge & The Pivot */}
              <div
                className={
                  study.results.some((r) => r.figure) || study.photo
                    ? "lg:col-span-7 space-y-7"
                    : "space-y-7"
                }
              >
                <div>
                  <span className="mb-2 inline-flex items-center px-3 py-1 rounded-full bg-forest/5 text-xs font-bold tracking-wider text-forest uppercase">
                    Case Study {i + 1}
                  </span>
                  <SubHeading className="text-2xl font-extrabold text-forest md:text-3xl mt-2">
                    {study.sector}
                  </SubHeading>
                  {study.subtitle && (
                    <p className="mt-1 text-sm font-bold text-mid sm:text-base">{study.subtitle}</p>
                  )}
                  {study.headline && (
                    <p className="mt-3 text-lg font-bold leading-snug text-forest/85 sm:text-xl">
                      {study.headline}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-forest text-base sm:text-lg">The challenge</h4>
                  <p className="leading-relaxed text-neutral-600 text-sm sm:text-base">{study.challenge}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-forest text-base sm:text-lg">The pivot</h4>
                  <p className="mb-3 leading-relaxed text-neutral-700 font-medium text-sm sm:text-base">
                    {study.pivotLead}
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-neutral-600">
                    {study.pivot.map((point) => (
                      <li key={point} className="flex items-start">
                        <span className="text-mid font-bold mr-2.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: her photograph, where there is one, then the results. */}
              <div
                className={
                  study.results.some((r) => r.figure) || study.photo
                    ? "w-full space-y-6 lg:col-span-5"
                    : "w-full space-y-6"
                }
              >
                {study.photo && (
                  <Image
                    src={study.photo.src}
                    alt={study.photo.alt}
                    width={study.photo.width}
                    height={study.photo.height}
                    sizes="(min-width: 1024px) 34vw, 92vw"
                    className="w-full rounded-2xl border border-forest/15 object-cover shadow-sm"
                  />
                )}
              <div
                className="w-full rounded-2xl bg-forest p-6 sm:p-8 text-white shadow-xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
                    <h4 className="font-bold text-neon text-sm sm:text-base uppercase tracking-wider">
                      The Results
                    </h4>
                    {/* "Verified" is only true of a figure the master table
                        carries. On a card whose figures are all withheld it was
                        asserting the opposite of the truth, so it renders only
                        when the card actually publishes one. */}
                    {study.results.some((r) => r.figure) ? (
                    <span className="text-xs font-semibold text-white/60">Verified</span>
                    ) : null}
                  </div>

                  <ul className="space-y-4">
                    {study.results.map((result) => (
                      <li key={result.label} className="flex items-start text-sm sm:text-base font-medium text-white/95 leading-snug">
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
      <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
        {studies.map((_, idx) => (
          <button
            key={idx}
            type="button"
            // The row is aria-hidden, so these must leave the tab order with it.
            // The arrows above are the labelled, focusable control.
            tabIndex={-1}
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-mid" : "w-2 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
