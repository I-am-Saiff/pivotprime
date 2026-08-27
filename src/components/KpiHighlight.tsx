"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows one result card at a time, on a five second beat.
 *
 * WHAT THIS IS NOT
 *
 * It is not a re-run of ResultsGraphic. That component rendered only the active
 * metric, so four figures out of five were absent from the served HTML and a
 * crawler saw one card. Here every card is rendered by the server component that
 * passes them in as `children`, all five are in the DOM at all times, and the
 * only thing that changes is a `data-kpi-active` attribute. CSS stacks them in
 * one grid cell and fades the inactive ones out. Turning JavaScript off leaves
 * card one visible and the other four in the HTML behind it.
 *
 * It pauses on hover and on focus anywhere inside, and under
 * prefers-reduced-motion it never advances at all.
 */
export default function KpiHighlight({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let i = 0;
    const id = window.setInterval(() => {
      if (paused.current) return;
      i = (i + 1) % count;
      setActive(i);
    }, 5000);

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
