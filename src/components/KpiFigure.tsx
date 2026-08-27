"use client";

import { useEffect, useState } from "react";

/**
 * The printed figure, counting up when its card becomes active.
 *
 * It renders `text` on the server, on the first client paint, and any time it is
 * not mid-count, so the served HTML carries "+27%" and never "0%". CountUp
 * shipped every result figure on this page as the string `0` by animating from
 * zero on mount; nothing here writes to the DOM until an animation frame runs.
 *
 * A value with no single number in it, like "40-60%", is never animated. There
 * is no honest way to count up a range, so it simply appears.
 */
export default function KpiFigure({ text, active }: { text: string; active: boolean }) {
  // A frame only counts while the card is still the one that produced it, so a
  // stale final value from the previous pass cannot flash before the new count
  // starts. `frame` is cleared by the effect's own cleanup rather than by
  // reading a ref during render.
  const [frame, setFrame] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const single = /^([+-]?)(\d+)(\D*)$/.exec(text);
    if (!single) return;

    const [, sign, digits, tail] = single;
    const target = Number(digits);
    const started = performance.now();
    const DURATION = 900;
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // Ease out, so it slows into the real number rather than snapping.
      const eased = 1 - Math.pow(1 - t, 3);
      setFrame(`${sign}${Math.round(target * eased)}${tail}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      setFrame(null);
    };
  }, [active, text]);

  return <>{frame ?? text}</>;
}
