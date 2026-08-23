"use client";

import { useState, useRef } from "react";
import {
  CASE_STUDIES,
  CASE_STUDIES_HEADING,
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
}: {
  headingLevel?: 2 | 3;
  showHeading?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const SubHeading = headingLevel === 2 ? "h3" : "h4";

  const scrollRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (offsetWidth || 1));
    setCurrentIndex(Math.min(Math.max(index, 0), CASE_STUDIES.length - 1));
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
    const next = (currentIndex + 1) % CASE_STUDIES.length;
    scrollToIndex(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
    scrollToIndex(prev);
  };

  return (
    <div className="relative overflow-x-clip">
      {showHeading && (
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-mid mb-3">
              CHAPTER 02: PROVEN OUTCOMES
            </span>
            <Heading className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {CASE_STUDIES_HEADING}
            </Heading>
            <p className="mt-4 text-lg text-neutral-600 md:text-xl">{CASE_STUDIES_STANDFIRST}</p>
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
              {currentIndex + 1} / {CASE_STUDIES.length}
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
        {CASE_STUDIES.map((study, i) => (
          <li
            key={study.id}
            className="flex-shrink-0 w-full snap-center frosted-card-light rounded-[28px] p-6 sm:p-10 md:p-12 shadow-sm"
          >
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12 items-start">
              {/* Left Column: Challenge & The Pivot */}
              <div className="lg:col-span-7 space-y-7">
                <div>
                  <span className="mb-2 inline-flex items-center px-3 py-1 rounded-full bg-forest/5 text-xs font-bold tracking-wider text-forest uppercase">
                    Case Study {i + 1}
                  </span>
                  <SubHeading className="text-2xl font-extrabold text-forest md:text-3xl mt-2">
                    {study.sector}
                  </SubHeading>
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

              {/* Right Column: The Results Card */}
              <div className="lg:col-span-5 w-full rounded-2xl bg-forest p-6 sm:p-8 text-white shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
                    <h4 className="font-bold text-neon text-sm sm:text-base uppercase tracking-wider">
                      The Results
                    </h4>
                    <span className="text-xs font-semibold text-white/60">Verified</span>
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
          </li>
        ))}
      </ul>

      {/* Slide Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
        {CASE_STUDIES.map((_, idx) => (
          <button
            key={idx}
            type="button"
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
