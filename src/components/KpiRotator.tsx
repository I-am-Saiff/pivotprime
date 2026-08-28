"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/**
 * Shows one result card at a time, on a three second beat.
 *
 * IT DOES NOT OWN THE CARDS. Every card is rendered by KpiCards, a server
 * component, and passed in as `children`. This wrapper sets one attribute,
 * `data-kpi-active`, and the CSS in globals.css stacks the five in one grid cell
 * and cross-fades between them. Nothing here can add, remove or restyle a card:
 * the design is exactly the grid card from her own file.
 *
 * ALL FIVE STAY IN THE SERVED HTML. There is no conditional rendering anywhere
 * below, and the stacking CSS is scoped to the attribute, which only this
 * component sets. Without JavaScript, and under prefers-reduced-motion, the five
 * lay out as her grid, static, with nothing hidden.
 *
 * The stack takes the height of the tallest card, so advancing never moves the
 * page. Hover, focus and the manual controls all pause the beat.
 */
const INTERVAL = 3000;
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isMotionWelcome() {
  return !window.matchMedia(REDUCED).matches;
}

export default function KpiRotator({
  labels,
  children,
}: {
  labels: string[];
  children: React.ReactNode;
}) {
  const rotating = useSyncExternalStore(subscribeToMotion, isMotionWelcome, () => false);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // A manual choice holds that card until the pointer or focus leaves, so the
  // beat does not pull the page away from something being read.
  const [held, setHeld] = useState(false);
  const frozen = paused || held;

  useEffect(() => {
    // Torn down and rebuilt when frozen rather than ticking and skipping, so the
    // next card gets a full three seconds after a hover.
    if (!rotating || frozen) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % labels.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [labels.length, rotating, frozen]);

  const go = useCallback(
    (i: number) => {
      setHeld(true);
      setActive(((i % labels.length) + labels.length) % labels.length);
    },
    [labels.length],
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
      {children}

      {/* Real buttons, so they are in the tab order and answer Enter and Space
          with no key handling of our own. Absent when nothing rotates: there is
          nothing to step through when all five are on screen. */}
      {rotating && (
        <div className="mt-5 flex items-center justify-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous result"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon/30 text-neon transition-colors hover:bg-neon/10 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${label}`}
              aria-current={active === i}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
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
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon/30 text-neon transition-colors hover:bg-neon/10 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none sm:inline-flex"
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
