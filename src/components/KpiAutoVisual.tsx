"use client";

import { useEffect, useState } from "react";

/**
 * The rotating visual language for one result card.
 *
 * Her instruction on the 27 August call: the cards should not sit still, and a
 * single card should be able to say the same number as a ring, as a bar pair, as
 * a trend and as a dot grid. Her slide 3 comment asked for a different visual
 * language per KPI; this is that idea moved from card-to-card to over-time.
 *
 * WHAT IS AND IS NOT IN THE SERVED HTML
 *
 * All four frames are rendered at all times. Only opacity changes, so nothing is
 * mounted or unmounted and there is no state a crawler can miss. The figure and
 * every word on the card are server-rendered by KpiCards and are not touched
 * here. Under prefers-reduced-motion the rotation never starts and frame one
 * stays put.
 *
 * A frame that encodes the figure draws nothing when `figure` is null, which is
 * the same rule KpiVisual follows: a drawn percentage is still a published
 * percentage.
 */
const FRAMES = 4;

export default function KpiAutoVisual({
  figure,
  index,
}: {
  figure: number | null;
  index: number;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    // Staggered by card, so five cards do not all flip on the same beat.
    let i = 0;
    const id = window.setInterval(
      () => {
        i = (i + 1) % FRAMES;
        setFrame(i);
      },
      3400 + index * 260,
    );
    return () => window.clearInterval(id);
  }, [index]);

  // Clamped only for drawing. The written figure is KpiCards' job.
  const pct = figure === null ? null : Math.max(0, Math.min(100, figure));

  return (
    <div className="relative mt-1 mb-5 h-[76px]" aria-hidden="true">
      <Frame on={frame === 0}>
        <Ring pct={pct} />
      </Frame>
      <Frame on={frame === 1}>
        <Bars pct={pct} />
      </Frame>
      <Frame on={frame === 2}>
        <Trend pct={pct} />
      </Frame>
      <Frame on={frame === 3}>
        <Dots pct={pct} />
      </Frame>
    </div>
  );
}

function Frame({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
        on ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function Ring({ pct }: { pct: number | null }) {
  const C = 2 * Math.PI * 26;
  return (
    <svg viewBox="0 0 260 76" width="100%" height="76">
      <circle cx="34" cy="38" r="26" fill="none" stroke="var(--color-mid)" strokeOpacity="0.25" strokeWidth="6" />
      {pct !== null && (
        <circle
          cx="34"
          cy="38"
          r="26"
          fill="none"
          stroke="var(--color-neon)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(C * pct) / 100} ${C}`}
          transform="rotate(-90 34 38)"
        />
      )}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="80"
          y={22 + i * 14}
          width={pct === null ? 60 : 40 + i * 30}
          height="6"
          rx="3"
          fill="var(--color-neon)"
          fillOpacity={pct === null ? 0.12 : 0.28 + i * 0.16}
        />
      ))}
    </svg>
  );
}

function Bars({ pct }: { pct: number | null }) {
  const filled = pct === null ? 0 : Math.max(1, Math.round((pct / 100) * 10));
  return (
    <svg viewBox="0 0 260 76" width="100%" height="76">
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={`b${i}`} x={i * 26} y="10" width="20" height="22" rx="4" fill="var(--color-bronze)" fillOpacity="0.35" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={`a${i}`}
          x={i * 26}
          y="44"
          width="20"
          height="22"
          rx="4"
          fill="var(--color-neon)"
          fillOpacity={i < filled ? 0.85 : 0.12}
        />
      ))}
    </svg>
  );
}

function Trend({ pct }: { pct: number | null }) {
  const rise = pct === null ? 0 : (pct / 100) * 44;
  return (
    <svg viewBox="0 0 260 76" width="100%" height="76">
      {[0, 1, 2].map((i) => (
        <line key={i} x1="0" y1={18 + i * 20} x2="260" y2={18 + i * 20} stroke="var(--color-mid)" strokeOpacity="0.18" strokeWidth="1" />
      ))}
      {pct !== null && (
        <>
          <polyline
            points={`4,64 70,${64 - rise * 0.3} 140,${64 - rise * 0.62} 210,${64 - rise * 0.84} 254,${64 - rise}`}
            fill="none"
            stroke="var(--color-neon)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="254" cy={64 - rise} r="5" fill="var(--color-neon)" />
        </>
      )}
    </svg>
  );
}

function Dots({ pct }: { pct: number | null }) {
  const total = 40;
  const on = pct === null ? 0 : Math.round((pct / 100) * total);
  return (
    <svg viewBox="0 0 260 76" width="100%" height="76">
      {Array.from({ length: total }, (_, i) => {
        const col = i % 20;
        const row = Math.floor(i / 20);
        return (
          <circle
            key={i}
            cx={7 + col * 13}
            cy={26 + row * 22}
            r="5"
            fill={i < on ? "var(--color-neon)" : "none"}
            fillOpacity={i < on ? 0.9 : 0}
            stroke="var(--color-mid)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
