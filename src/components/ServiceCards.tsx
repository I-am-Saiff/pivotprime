"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { DIAGNOSTIC_CARD, SERVICES } from "@/content/services";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

/**
 * The service card grid, spec 3.4.
 *
 * Shared between the homepage section and the /services parent page, because
 * spec 4 defines the parent as "a copy of the services section from the home
 * page" with "no new copy needed for it". Two implementations would drift.
 *
 * On mobile (< md): Renders as a smooth, horizontal swipeable snap-track to
 * prevent excessive vertical scrolling.
 * On desktop (md+): Renders as a clean, balanced responsive grid.
 *
 * Cards run to their natural length and are equalised by the grid; the section
 * compact and uniform while preserving 100% crawlable markup in the HTML.
 */
/**
 * headingLevel exists because this component is both a section of the homepage
 * and the whole of /services. On the homepage the section already has an h2, so
 * the card titles are h3 beneath it. On /services the page heading is the h1 and
 * there was no h2 at all, so the cards were h3 under an h1 with a level skipped.
 */
export default function ServiceCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" } = {}) {
  const CardHeading = headingLevel;
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = SERVICES.length + (DIAGNOSTIC_ENABLED ? 1 : 0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardStep = offsetWidth * 0.85;
    const index = Math.round(scrollLeft / (cardStep || 1));
    setActiveIndex(Math.min(Math.max(index, 0), totalCards - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const children = scrollRef.current.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative">
      <ul
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:pb-0 md:pt-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:items-stretch md:overflow-visible md:snap-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* An odd count leaves the last grid cell empty, and the section reads
            as a card that failed to render. Five services in three columns left
            one gap at lg and one at md; the sixth card only exists when the
            diagnostic ships, so the count is computed rather than assumed. */}
        {SERVICES.map((service, i) => {
          const total = SERVICES.length + (DIAGNOSTIC_ENABLED ? 1 : 0);
          const isLast = i === SERVICES.length - 1 && !DIAGNOSTIC_ENABLED;
          // Literal class strings only. Tailwind scans source text, so an
          // interpolated `lg:col-span-${n}` is never generated and the cell
          // silently stays empty.
          const spanMd = isLast && total % 2 === 1 ? "md:col-span-2" : "";
          const spanLg = !isLast || total % 3 === 0 ? "" : total % 3 === 2 ? "lg:col-span-2" : "lg:col-span-3";
          return (
            <li
              key={service.slug}
              className={`flex flex-shrink-0 w-[84vw] max-w-[340px] snap-center md:w-auto md:max-w-none md:flex-shrink ${spanMd} ${spanLg}`}
            >
              <Link
                href={service.href}
                className="group frosted-card-light flex w-full flex-col rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-mid/30 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <div className="flex items-center justify-end mb-2 md:hidden">
                  <span className="text-[11px] font-semibold text-mid/80 uppercase tracking-wider">
                    Swipe →
                  </span>
                </div>

                <CardHeading className="text-lg font-bold text-forest group-hover:text-mid transition-colors">
                  {service.title}
                </CardHeading>

                {/* Price Line */}
                <p className="mt-1.5 font-bold text-mid text-sm sm:text-base">{service.priceLine}</p>

                {/* FULL BODY COPY, NO CLAMP.
                    The card used to clamp to two lines with a "Read more"
                    toggle. The copy was in the served HTML either way, so this
                    was presentational only, but the cut landed mid-word:
                    "founder dependency,..." and "the length o...". That reads as
                    a rendering fault rather than a summary, and clamping copy
                    the document sets verbatim is the wrong instinct anyway.
                    Cards are stretched to a common height by the grid instead. */}
                {/* grow, from the 1 September pass. The grid stretches every
                    card in a row to the tallest one, and the slack used to land
                    on the CTA's mt-auto: on "Build and Place" at 1024 that was
                    283px of empty card between the scope note and the link,
                    against 21px on the card beside it. The cards were level and
                    the insides were not.

                    The description takes the slack instead, so the scope note
                    and the CTA stay together as a footer group at the foot of
                    the card and the distance from the last line of text to the
                    link is the pt-5 that was always intended. Equal height is
                    untouched: this redistributes space inside the card, it does
                    not change the card's height. No copy was shortened. */}
                <div className="mt-4 grow space-y-3">
                  {service.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="leading-relaxed text-neutral-600 text-sm"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <p className="mt-4 border-t border-neutral-200/80 pt-3 text-xs leading-relaxed text-neutral-500">
                  {service.scopeLine}
                </p>

                {/* CTA Link */}
                <span className="mt-auto inline-flex items-center pt-5 text-sm font-bold text-forest group-hover:text-mid">
                  {service.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}

        {/* Diagnostic Card */}
        {DIAGNOSTIC_ENABLED && (
          <li className="flex flex-shrink-0 w-[84vw] max-w-[340px] snap-center md:w-auto md:max-w-none md:flex-shrink">
            <Link
              href={DIAGNOSTIC_CARD.href}
              className="group flex w-full flex-col rounded-2xl bg-forest p-6 sm:p-7 text-white transition-colors hover:bg-forest/90 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-neon uppercase">
                {DIAGNOSTIC_CARD.eyebrow}
              </span>
              <h3 className="text-xl font-bold">{DIAGNOSTIC_CARD.title}</h3>
              <p className="mt-3 leading-relaxed text-white/80 text-sm">{DIAGNOSTIC_CARD.body}</p>
              <span className="mt-auto inline-flex items-center pt-6 text-sm font-bold text-neon">
                {DIAGNOSTIC_CARD.ctaLabel}
                <span
                  aria-hidden="true"
                  className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Swipe / Page Dot Indicators */}
      <div className="mt-6 flex items-center justify-center md:hidden" aria-hidden="true">
        {Array.from({ length: totalCards }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            // Decorative, so it leaves the tab order with its aria-hidden row.
            // The dot stays 8px; the button around it is 44 so a finger lands.
            tabIndex={-1}
            onClick={() => scrollToIndex(idx)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                idx === activeIndex ? "w-6 bg-mid" : "w-2 bg-neutral-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
