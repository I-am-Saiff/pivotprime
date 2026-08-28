"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
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
 * five sit stacked in one grid cell, and only opacity, transform and visibility
 * move. There is no conditional rendering of any card below.
 *
 * WITHOUT JAVASCRIPT, AND UNDER REDUCED MOTION, there is no rotation at all.
 * `rotating` is read from the browser through useSyncExternalStore, whose server
 * snapshot is false, and the CSS that stacks the cards is scoped to the
 * data-kpi-active attribute that only appears when rotating. The fallback is the
 * five cards laid out as an ordinary list, every figure printed and every visual
 * drawn in its finished state.
 *
 * The stack takes the height of the tallest card, so advancing never moves the
 * page. Hover, focus and the manual controls all pause the timer, and the
 * progress bar shows that it is paused rather than just stopping.
 *
 * Card 6 does not render: nobody has that number, and spec 3.4 says "Do not
 * launch this card with a placeholder."
 */
const INTERVAL = 2500;

/**
 * One form per slide, on the client's 27 August instruction. The shape is cut
 * with clip-path in globals.css and the composition below is arranged to suit
 * it, rather than every card being poured into the same two-column grid.
 */
const SHAPES = {
  track: "disc",
  "before-after-blocks": "hex",
  "dot-grid": "capsule",
  trend: "angled",
  "before-after-tracks": "bar",
} as const;

/** A faint treatment inside each shape, never competing with the figure. */
const TEXTURE: Record<string, string> = {
  disc: "[background:repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_26px,rgba(0,215,109,0.05)_26px,rgba(0,215,109,0.05)_27px)]",
  hex: "[background-image:linear-gradient(rgba(0,215,109,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,215,109,0.05)_1px,transparent_1px)] [background-size:34px_34px]",
  capsule: "[background:linear-gradient(180deg,rgba(0,215,109,0.10)_0%,transparent_46%,rgba(0,215,109,0.06)_100%)]",
  angled:
    "[background:repeating-linear-gradient(135deg,transparent_0,transparent_16px,rgba(0,215,109,0.045)_16px,rgba(0,215,109,0.045)_17px)]",
  bar: "[background:repeating-linear-gradient(180deg,transparent_0,transparent_13px,rgba(0,215,109,0.05)_13px,rgba(0,215,109,0.05)_14px)]",
};
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isMotionWelcome() {
  return !window.matchMedia(REDUCED).matches;
}

function Label({ metric }: { metric: (typeof METRICS)[number] }) {
  return (
    <p className="font-sans text-[10px] font-bold tracking-[0.18em] text-neon/70 uppercase">
      {metric.kpiLabel}
    </p>
  );
}

function Figure({
  metric,
  counting,
}: {
  metric: (typeof METRICS)[number];
  counting: boolean;
}) {
  if (metric.figureText === null) return null;
  return (
    <p className="mt-2 font-sans text-5xl leading-none font-extrabold tracking-tight text-neon tabular-nums sm:text-6xl">
      <KpiFigure text={metric.figureText} active={counting} />
    </p>
  );
}

export default function KpiCards() {
  const cards = METRICS.filter((m) => m.pending !== "not-yet-supplied");

  const rotating = useSyncExternalStore(subscribeToMotion, isMotionWelcome, () => false);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // A manual choice holds that card until the pointer or focus leaves, so the
  // timer does not pull the page away from something being read.
  const [held, setHeld] = useState(false);
  const frozen = paused || held;

  useEffect(() => {
    // The timer is torn down and rebuilt when the beat is frozen, rather than
    // running and skipping ticks. That way the next card gets a full four
    // seconds after a hover rather than whatever was left of the interval.
    if (!rotating || frozen) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % cards.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [cards.length, rotating, frozen]);

  const go = useCallback(
    (i: number) => {
      setHeld(true);
      setActive(((i % cards.length) + cards.length) % cards.length);
    },
    [cards.length],
  );

  const release = useCallback(() => {
    setPaused(false);
    setHeld(false);
  }, []);

  return (
    <div
      data-kpi-active={rotating ? active : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={release}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={release}
    >
      <ul data-metric-cards className="mx-auto grid max-w-4xl grid-cols-1 gap-4">
        {cards.map((metric, i) => {
          const on = rotating ? active === i : true;
          const counting = rotating ? active === i : false;
          const shape = SHAPES[metric.visual];
          return (
            <li key={metric.label} data-kpi-index={i} data-kpi-shape={shape}>
              {/* A background treatment inside each shape. Low contrast, and
                  always behind the copy: rings inside the disc, a grid inside
                  the hexagon, a gradient up the capsule, diagonals across the
                  cut corner, hairlines along the bar. */}
              <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${TEXTURE[shape]}`} />

              {shape === "disc" && (
                <>
                  {/* The stages ring the rim from md up. At 360 the ring's own
                      labels reach past the lens, so the small screen gets the
                      compact track under the copy instead. */}
                  <div className="pointer-events-none absolute inset-0 hidden md:block">
                    <KpiVisual metric={metric} active={on} variant="edge" />
                  </div>
                  <div className="relative flex h-full flex-col items-center justify-center px-8 text-center md:px-10">
                    <Label metric={metric} />
                    <Figure metric={metric} counting={counting} />
                    <p className="mt-2 max-w-[15rem] text-base leading-snug font-bold text-white sm:text-lg md:max-w-[14rem]">{metric.label}</p>
                    <p className="mt-2 max-w-[15rem] text-[12.5px] leading-relaxed text-white/55 md:max-w-[14rem]">{metric.context}</p>
                    <div className="mt-4 w-full max-w-[13rem] md:hidden">
                      <KpiVisual metric={metric} active={on} />
                    </div>
                  </div>
                </>
              )}

              {shape === "hex" && (
                <div className="relative flex h-full flex-col items-center justify-center px-10 text-center md:px-24">
                  <Label metric={metric} />
                  <Figure metric={metric} counting={counting} />
                  <p className="mt-3 max-w-sm text-lg leading-snug font-bold text-white">{metric.label}</p>
                  <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/55">{metric.context}</p>
                  {/* Narrower than the copy: the rows sit low in the hexagon,
                      where the sides have already begun to close in. */}
                  <div className="mt-5 w-full max-w-[11.5rem] md:max-w-[19rem]">
                    <KpiVisual metric={metric} active={on} />
                  </div>
                </div>
              )}

              {shape === "capsule" && (
                <div className="relative flex h-full flex-col items-center justify-center px-9 text-center">
                  <Label metric={metric} />
                  <Figure metric={metric} counting={counting} />
                  <p className="mt-3 max-w-[15rem] text-lg leading-snug font-bold text-white">{metric.label}</p>
                  <p className="mt-2 max-w-[15rem] text-[13px] leading-relaxed text-white/55">{metric.context}</p>
                  <div className="mt-4 w-full max-w-[14rem]">
                    <KpiVisual metric={metric} active={on} />
                  </div>
                </div>
              )}

              {shape === "angled" && (
                <div className="relative grid h-full items-center gap-6 px-8 py-8 sm:px-12 md:grid-cols-[1.15fr_1fr]">
                  {/* The copy stays clear of the cut, which takes the top right. */}
                  <div className="self-center">
                    <Label metric={metric} />
                    <Figure metric={metric} counting={counting} />
                    <p className="mt-3 max-w-sm text-lg leading-snug font-bold text-white sm:text-xl">{metric.label}</p>
                    <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/55">{metric.context}</p>
                  </div>
                  <div className="self-end md:self-center md:pb-6">
                    <KpiVisual metric={metric} active={on} />
                  </div>
                </div>
              )}

              {shape === "bar" && (
                <div className="relative grid h-full items-center gap-4 px-8 py-6 sm:px-14 md:grid-cols-[auto_1fr_auto] md:gap-10">
                  <div className="md:pr-2">
                    <Label metric={metric} />
                    <Figure metric={metric} counting={counting} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg leading-snug font-bold text-white sm:text-xl">{metric.label}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{metric.context}</p>
                  </div>
                  <div className="w-full max-w-[10rem] justify-self-end md:max-w-[11rem]">
                    <KpiVisual metric={metric} active={on} variant="compact" />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* The beat, made visible. Keyed on the active index so the
          fill restarts with each card, and paused as a state rather than as a
          bar that silently stops. Absent entirely when nothing is rotating. */}
      {rotating && (
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-neon/15">
            <div
              // Keyed on the freeze as well as the card, because the timer is
              // rebuilt when the beat unfreezes: both restart together, so the
              // bar never finishes while the card still has seconds left.
              key={`${active}-${frozen}`}
              data-kpi-progress
              data-paused={frozen ? "" : undefined}
              className="h-full w-full origin-left rounded-full bg-neon"
            />
          </div>

          {/* Manual controls. Real buttons, so they are in the tab order and
              answer Enter and Space with no key handling of our own. */}
          <div className="mt-4 flex items-center justify-center gap-3">
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
        </div>
      )}
    </div>
  );
}
