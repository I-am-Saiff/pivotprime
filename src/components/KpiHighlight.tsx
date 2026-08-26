"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cycles emphasis across the result cards.
 *
 * WHAT THIS IS NOT
 *
 * It is not a carousel and it does not own the content. Every card is rendered
 * by the server component that passes them in as `children`, all five are in the
 * served HTML at all times, and nothing here can hide one. The only thing that
 * moves is a `data-kpi-active` attribute, which CSS uses to lift one card.
 * Turning JavaScript off leaves five readable cards with no emphasis, which is
 * the correct degradation for a decoration.
 *
 * That distinction is the whole reason it is built this way. `ResultsGraphic`
 * rotated one metric every three seconds and only the active one was in the DOM,
 * so a crawler saw one figure out of five. This is the same idea with the
 * content left alone.
 *
 * It pauses on hover and on focus anywhere inside, and it does not start at all
 * under prefers-reduced-motion.
 */
export default function KpiHighlight({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  // Starts at the first card rather than at null, so the effect never calls
  // setState in its own body. The React lint rule rejects that shape and
  // AGENTS.md says to change the shape rather than work around the rule.
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Under reduced motion nothing advances. The first card keeps a static
    // emphasis, which is a still state rather than an animation.
    if (reduce.matches) return;

    let i = 0;
    const id = window.setInterval(() => {
      if (paused.current) return;
      i = (i + 1) % count;
      setActive(i);
    }, 2600);

    const stop = () => window.clearInterval(id);
    reduce.addEventListener("change", stop, { once: true });
    return () => {
      stop();
      reduce.removeEventListener("change", stop);
    };
  }, [count]);

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
      data-kpi-active={active}
    >
      {children}
    </div>
  );
}
