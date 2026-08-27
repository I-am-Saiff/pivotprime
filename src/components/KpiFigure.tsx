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
 * A range counts both ends together, so "40-60%" runs 0-0 up to 40-60 rather
 * than appearing whole while the other four cards animate.
 */
const DURATION = 1000;

/** Every run of digits in the value, with the text around them left alone. */
function parts(text: string) {
  const found = [...text.matchAll(/\d+/g)];
  return found.length ? found : null;
}

export default function KpiFigure({ text, active }: { text: string; active: boolean }) {
  const [frame, setFrame] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const numbers = parts(text);
    if (!numbers) return;

    const started = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // Ease out, so it slows into the real number rather than snapping.
      const eased = 1 - Math.pow(1 - t, 3);
      let out = "";
      let cursor = 0;
      for (const match of numbers) {
        const at = match.index;
        out += text.slice(cursor, at) + Math.round(Number(match[0]) * eased);
        cursor = at + match[0].length;
      }
      setFrame(out + text.slice(cursor));
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
