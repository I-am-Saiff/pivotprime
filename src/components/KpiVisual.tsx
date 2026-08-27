"use client";

import type { Metric } from "@/content/homepage";

/**
 * One distinct visual per result card, animating when its card becomes active.
 *
 * WHY THIS EXISTS
 *
 * Her comment on slide 3: "Really good idea, but just need Different visual
 * language for each KPI". Her own mockup, req/pivot-prime-kpi-cards_3.html,
 * shows what she means, so the geometry is taken from that file rather than
 * invented: a four-stage track, a before-and-after block comparison, a
 * retained-versus-churned dot grid, a profit trend, and a pair of speed bars.
 *
 * ONE HUE, TWO WEIGHTS. Before and after are the same green separated by
 * opacity. The earlier version drew "before" in bronze, which against a forest
 * card read as muddy khaki rather than as a dimmer version of the same thing.
 * Nothing in this file uses bronze or sand.
 *
 * HOW THE MOTION WORKS, AND WHY IT IS SAFE
 *
 * `run` is the `active` prop and there is no state here at all. Every element is
 * rendered at all times; `run` only changes inline geometry that CSS transitions
 * between, so nothing mounts, unmounts or hides. The parent passes active=true
 * for every card while it is not rotating, so the server output, the
 * no-JavaScript case and reduced motion are all the finished drawing.
 */
const STAGES = ["Align", "Build", "Embed", "Done"];
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

/** The dimmed weight of the same green. Before, unfilled, not-yet. */
const DIM = 0.16;

export default function KpiVisual({ metric, active }: { metric: Metric; active: boolean }) {
  const run = active;
  const pct = metric.figure === null ? 0 : Math.max(0, Math.min(100, metric.figure));

  return (
    <div className="w-full" aria-hidden="true">
      {metric.visual === "track" && <Track run={run} />}
      {metric.visual === "before-after-blocks" && <Blocks run={run} pct={pct} />}
      {metric.visual === "dot-grid" && <Dots run={run} pct={pct} />}
      {metric.visual === "trend" && <Trend run={run} pct={pct} />}
      {metric.visual === "before-after-tracks" && <Bars run={run} pct={pct} />}
    </div>
  );
}

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 280 132" width="100%" className="block h-auto w-full">
      {children}
    </svg>
  );
}

/** ALIGN / BUILD / EMBED / DONE. Each stage lights, then draws on to the next. */
function Track({ run }: { run: boolean }) {
  return (
    <Chrome>
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={38 + i * 68}
          y1="52"
          x2={98 + i * 68}
          y2="52"
          stroke="var(--color-neon)"
          strokeWidth="2"
          strokeDasharray="60"
          strokeDashoffset={run ? 0 : 60}
          strokeOpacity="0.5"
          style={{ transition: `stroke-dashoffset 380ms ${EASE} ${260 + i * 420}ms` }}
        />
      ))}
      {STAGES.map((stage, i) => {
        const cx = 26 + i * 68;
        return (
          <g key={stage}>
            <circle
              cx={cx}
              cy="52"
              r="17"
              fill="var(--color-neon)"
              fillOpacity={run ? 0.14 : 0}
              style={{ transition: `fill-opacity 360ms ${EASE} ${i * 420}ms` }}
            />
            <circle
              cx={cx}
              cy="52"
              r="7"
              fill="var(--color-neon)"
              fillOpacity={run ? 1 : DIM}
              style={{ transition: `fill-opacity 360ms ${EASE} ${i * 420}ms` }}
            />
            <text
              x={cx}
              y="88"
              textAnchor="middle"
              fill="#fff"
              fillOpacity={run ? 0.7 : 0.28}
              className="font-sans text-[9px] font-bold tracking-[0.16em] uppercase"
              style={{ transition: `fill-opacity 360ms ${EASE} ${i * 420}ms` }}
            >
              {stage}
            </text>
          </g>
        );
      })}
    </Chrome>
  );
}

/** The before row fades down while the after row fills left to right. */
function Blocks({ run, pct }: { run: boolean; pct: number }) {
  const remaining = Math.max(1, Math.round((1 - pct / 100) * 10));
  return (
    <Chrome>
      <text x="0" y="14" fill="#fff" fillOpacity="0.45" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        Before
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={`b${i}`}
          x={i * 28}
          y="24"
          width="22"
          height="22"
          rx="5"
          fill="var(--color-neon)"
          // Ten solid blocks that dim as the after row fills: you watch the
          // waste leave rather than being shown two static rows.
          fillOpacity={run ? 0.2 : 0.62}
          style={{ transition: `fill-opacity 420ms ${EASE} ${300 + i * 60}ms` }}
        />
      ))}
      <text x="0" y="82" fill="var(--color-neon)" fillOpacity="0.75" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        After
      </text>
      {Array.from({ length: 10 }, (_, i) => {
        const kept = i < remaining;
        return (
          <rect
            key={`a${i}`}
            x={i * 28}
            y="92"
            width="22"
            height="22"
            rx="5"
            fill="var(--color-neon)"
            fillOpacity={run ? (kept ? 0.95 : DIM) : DIM}
            style={{ transition: `fill-opacity 380ms ${EASE} ${i * 70}ms` }}
          />
        );
      })}
    </Chrome>
  );
}

/** Dots fill one by one in a quick cascade. The churned few stay hollow. */
function Dots({ run, pct }: { run: boolean; pct: number }) {
  const total = 40;
  const on = Math.max(1, Math.round((pct / 100) * total));
  return (
    <Chrome>
      {Array.from({ length: total }, (_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const filled = i < on;
        return (
          <circle
            key={i}
            cx={12 + col * 28}
            cy={16 + row * 26}
            r="8"
            fill="var(--color-neon)"
            fillOpacity={run && filled ? 0.95 : 0}
            stroke="var(--color-neon)"
            strokeOpacity={DIM * 2.4}
            strokeWidth="1.8"
            style={{ transition: `fill-opacity 260ms ${EASE} ${i * 34}ms` }}
          />
        );
      })}
      <circle cx="12" cy="124" r="5" fill="var(--color-neon)" />
      <text x="24" y="128" fill="#fff" fillOpacity="0.6" className="font-sans text-[9px] font-bold tracking-[0.14em] uppercase">
        Retained
      </text>
      <circle cx="122" cy="124" r="5" fill="none" stroke="var(--color-neon)" strokeOpacity={DIM * 2.4} strokeWidth="1.8" />
      <text x="134" y="128" fill="#fff" fillOpacity="0.38" className="font-sans text-[9px] font-bold tracking-[0.14em] uppercase">
        Churned
      </text>
    </Chrome>
  );
}

/** The line draws left to right with the area filling in behind it. */
function Trend({ run, pct }: { run: boolean; pct: number }) {
  const rise = (pct / 100) * 82;
  const pts = [
    [6, 112],
    [74, 112 - rise * 0.26],
    [142, 112 - rise * 0.56],
    [210, 112 - rise * 0.82],
    [274, 112 - rise],
  ];
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <Chrome>
      <text x="0" y="14" fill="#fff" fillOpacity="0.45" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        Margin
      </text>
      {[0, 1, 2].map((i) => (
        <line key={i} x1="0" y1={44 + i * 34} x2="280" y2={44 + i * 34} stroke="var(--color-neon)" strokeOpacity={DIM * 0.8} strokeWidth="1" />
      ))}
      <polygon
        points={`${line} 274,120 6,120`}
        fill="var(--color-neon)"
        fillOpacity={run ? 0.16 : 0}
        style={{ transition: `fill-opacity 700ms ${EASE} 520ms` }}
      />
      <polyline
        points={line}
        fill="none"
        stroke="var(--color-neon)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="300"
        strokeDashoffset={run ? 0 : 300}
        style={{ transition: `stroke-dashoffset 1000ms ${EASE} 100ms` }}
      />
      <circle
        cx="274"
        cy={112 - rise}
        r="5.5"
        fill="var(--color-neon)"
        fillOpacity={run ? 1 : 0}
        style={{ transition: `fill-opacity 240ms ${EASE} 1000ms` }}
      />
    </Chrome>
  );
}

/** Two bars race. The after bar is done long before the before bar is. */
function Bars({ run, pct }: { run: boolean; pct: number }) {
  const FULL = 268;
  const after = Math.max(18, FULL * (1 - pct / 100));
  return (
    <Chrome>
      <text x="0" y="26" fill="#fff" fillOpacity="0.45" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        Before
      </text>
      <rect x="0" y="36" width={FULL} height="14" rx="7" fill="var(--color-neon)" fillOpacity={DIM} />
      <rect
        x="0"
        y="36"
        width={run ? FULL : 0}
        height="14"
        rx="7"
        fill="var(--color-neon)"
        fillOpacity="0.4"
        style={{ transition: `width 1500ms ${EASE} 120ms` }}
      />
      <text x="0" y="86" fill="var(--color-neon)" fillOpacity="0.75" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        After
      </text>
      <rect x="0" y="96" width={FULL} height="14" rx="7" fill="var(--color-neon)" fillOpacity={DIM} />
      <rect
        x="0"
        y="96"
        width={run ? after : 0}
        height="14"
        rx="7"
        fill="var(--color-neon)"
        fillOpacity="0.95"
        // Shorter distance and a shorter clock, so the after bar visibly stops
        // while the before bar is still travelling. The gap is the point.
        style={{ transition: `width 620ms ${EASE} 120ms` }}
      />
    </Chrome>
  );
}
