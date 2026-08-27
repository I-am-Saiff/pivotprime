"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { METRICS } from "@/content/homepage";
import KpiVisual from "./KpiVisual";
import KpiFigure from "./KpiFigure";

/**
 * The five result cards, spec 3.3. One in view at a time, on a four second beat.
 *
 * ALL FIVE ARE IN THE SERVED HTML, ALWAYS.
 *
 * This is the defect this page has now had twice. ResultsGraphic rendered only
 * the active metric, so four figures out of five were absent and a crawler saw
 * one card. Here every card is rendered by this component on the server, the
 * five sit stacked in one grid cell, and only opacity and visibility move.
 * There is no conditional rendering anywhere below.
 *
 * WITHOUT JAVASCRIPT, AND UNDER REDUCED MOTION, there is no rotation at all:
 * `data-kpi-active` is only ever set by the effect, and the CSS that stacks the
 * cards is scoped to that attribute. The fallback is the five cards laid out as
 * an ordinary grid, every figure and every visual drawn in its finished state.
 *
 * The stack takes the height of the tallest card, so advancing never moves the
 * page. Hover, focus and the manual controls all pause the timer.
 *
 * Card 6 does not render: nobody has that number, and spec 3.4 says "Do not
 * launch this card with a placeholder."
 */
const INTERVAL = 4000;

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isMotionWelcome() {
  return !window.matchMedia(REDUCED).matches;
}

export default function KpiCards() {
  const cards = METRICS.filter((m) => m.pending !== "not-yet-supplied");

  // Whether to rotate at all is read from the browser rather than stored, so
  // nothing sets state inside an effect and the server snapshot is honestly
  // "not rotating". On the server and on the first paint that is false, which
  // is what puts all five cards in the served HTML.
  const rotating = useSyncExternalStore(subscribeToMotion, isMotionWelcome, () => false);

  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const held = useRef(false);

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => {
      if (paused.current || held.current) return;
      setActive((current) => (current + 1) % cards.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [cards.length, rotating]);

  // A manual choice holds that card until the pointer or focus leaves, so the
  // timer does not pull the page away from something being read.
  const go = useCallback(
    (i: number) => {
      held.current = true;
      setActive(((i % cards.length) + cards.length) % cards.length);
    },
    [cards.length],
  );

  return (
    <div
      data-kpi-active={rotating ? active : undefined}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => {
        paused.current = false;
        held.current = false;
      }}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => {
        paused.current = false;
        held.current = false;
      }}
    >
      <ul
        data-metric-cards
        className="mx-auto grid max-w-2xl grid-cols-1 gap-4"
        aria-live="off"
      >
        {cards.map((metric, i) => (
          <li
            key={metric.label}
            data-kpi-index={i}
            className="flex flex-col rounded-2xl bg-forest p-6 ring-1 ring-neon/20 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:p-8"
          >
            <p className="font-sans text-[10px] font-bold tracking-[0.18em] text-neon/70 uppercase">
              {metric.kpiLabel}
            </p>

            <KpiVisual metric={metric} active={rotating ? active === i : true} />

            {metric.figureText !== null && (
              <p className="mb-3 font-sans text-5xl leading-none font-extrabold tracking-tight text-neon sm:text-6xl">
                <KpiFigure text={metric.figureText} active={rotating ? active === i : false} />
              </p>
            )}

            <p className="text-lg leading-snug font-bold text-white sm:text-xl">{metric.label}</p>
            <p className="mt-3 border-t border-neon/15 pt-3 text-sm leading-relaxed text-sand/80">
              {metric.context}
            </p>
          </li>
        ))}
      </ul>

      {/* Manual controls. They are real buttons, so they are in the tab order
          and answer Enter and Space without any key handling of our own.
          Hidden when nothing is rotating, because there is nothing to step
          through: every card is already on screen. */}
      {rotating && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous result"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neon/30 text-neon transition-colors hover:bg-neon/10 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {cards.map((metric, i) => (
            <button
              key={metric.label}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${metric.kpiLabel}`}
              aria-current={active === i}
              className="inline-flex h-11 w-6 items-center justify-center focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-neon" : "w-2 bg-neon/30"
                }`}
              />
            </button>
          ))}

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next result"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neon/30 text-neon transition-colors hover:bg-neon/10 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
