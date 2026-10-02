"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/**
 * Shows one result card at a time, on a six second beat.
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
 * page.
 *
 * SIX SECONDS, FROM 27 September, AND WHY IT WAS THREE. Her note: "on mobile,
 * it is flashing too fast, so has to move a bit slower". Each card carries a
 * four-stage diagram, a figure, a name and a supporting line, eleven words of
 * prose in all, and the cross-fade below eats 420ms of every beat. Three
 * seconds left about 2.6 seconds to take all of that in. Six leaves 5.6, which
 * is a comfortable read of eleven words with a look at the diagram, and puts a
 * full cycle of five cards at thirty seconds.
 *
 * ONE INTERVAL, NOT TWO, because the cards carry identical content at every
 * width and there is nothing to read at 375 that is not also there at 1440. Her
 * brief asked for one unless two could be justified, and they cannot be here.
 */
const INTERVAL = 6000;
/**
 * How long a manual choice holds before the beat resumes. One full interval, so
 * the card someone chose gets the same dwell as one the timer chose.
 */
const HOLD = INTERVAL;
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
  /**
   * PAUSED IS KEYBOARD FOCUS ONLY NOW, AND HOVER NO LONGER PAUSES AT ALL. This
   * is the fix for the half of her note that reads "on desktop it doesn't seem
   * to work, it is not changing", and the cause was not the timer.
   *
   * MEASURED BEFORE CHANGING ANYTHING. With the pointer parked away from it the
   * carousel advanced on a 3000ms beat at 1440 exactly as it did at 375: four
   * changes in fourteen seconds at both. With the pointer resting anywhere on
   * it, nine seconds produced zero changes. It is a wide block high on the page,
   * so on a desktop the pointer sits on it while somebody reads, and it looks
   * dead. That is the difference between her desktop and her phone, where there
   * is no hover at all and the thing she saw was the speed.
   *
   * Pausing on hover is a courtesy and WCAG 2.2.2 does not ask for it; what it
   * asks for is a way to stop moving content, which the dots and the arrows
   * are. Focus pause stays, so a keyboard reader stepping into the controls is
   * not pulled off the card they are on.
   *
   * BUT ONLY KEYBOARD FOCUS, WHICH IS :focus-visible AND NOT :focus. Dropping
   * the hover pause and keeping a plain focus pause put the same bug back
   * through a different door, and the probe caught it rather than the diff:
   * clicking a dot focuses that dot, nothing ever blurs it, and the carousel
   * froze for good at both widths. Tapping did the same on touch. Matching
   * :focus-visible is the difference between a reader who tabbed in, who should
   * not be pulled along, and one who clicked, who has just told us which card
   * they want and is covered by the hold below. PENDING-COPY 1e9.
   */
  const [paused, setPaused] = useState(false);
  /**
   * A manual choice holds the beat for one interval and then lets it go.
   *
   * IT USED TO HOLD UNTIL THE POINTER OR FOCUS LEFT, and on a touch screen
   * neither ever does: measured at 375 with touch emulation, tapping a dot
   * stopped the carousel for the whole ten seconds that followed and it never
   * restarted. A timed hold cannot strand it, on any input.
   */
  const [heldUntil, setHeldUntil] = useState(0);

  useEffect(() => {
    if (!rotating || paused) return;
    // Rebuilt rather than left ticking, so the card showing now always gets a
    // full interval whether it arrived by timer or by a tap.
    const wait = Math.max(INTERVAL, heldUntil - Date.now());
    const id = window.setTimeout(() => {
      setActive((current) => (current + 1) % labels.length);
      setHeldUntil(0);
    }, wait);
    return () => window.clearTimeout(id);
  }, [labels.length, rotating, paused, active, heldUntil]);

  const go = useCallback(
    (i: number) => {
      setHeldUntil(Date.now() + HOLD);
      setActive(((i % labels.length) + labels.length) % labels.length);
    },
    [labels.length],
  );

  const release = useCallback(() => setPaused(false), []);

  return (
    <div
      data-kpi-active={rotating ? active : undefined}
      onFocusCapture={(event) => {
        // :focus-visible is only true when the browser would draw a focus ring,
        // which is keyboard navigation and not a click or a tap.
        const target = event.target;
        if (target instanceof HTMLElement && target.matches(":focus-visible")) setPaused(true);
      }}
      onBlurCapture={release}
    >
      {children}

      {/* Real buttons, so they are in the tab order and answer Enter and Space
          with no key handling of our own. Absent when nothing rotates: there is
          nothing to step through when all five are on screen. */}
      {rotating && (
        /* -mb-[18px] on a phone: the lower half of the dots' 44px tap area is
           empty, and it made this one section gap 18px larger than the rest
           (her v3 slide 11). From sm the arrows' boxes fill the row. */
        <div className="mt-5 -mb-[18px] flex items-center justify-center gap-1 sm:mb-0 sm:gap-3">
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
