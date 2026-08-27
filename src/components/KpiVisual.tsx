"use client";

import type { Metric } from "@/content/homepage";

/**
 * One distinct visual per result card, animating when its card becomes active.
 *
 * WHY THIS EXISTS
 *
 * Her comment on slide 3: "Really good idea, but just need Different visual
 * language for each KPI". Her own mockup, req/pivot-prime-kpi-cards_3.html,
 * shows what she means, so the geometry below is taken from that file rather
 * than invented: a four-node execution track, a before-and-after block
 * comparison, a retained-versus-churned dot grid with a legend, a profit trend
 * on a gridded field, and a pair of before-and-after speed bars.
 *
 * HOW THE MOTION WORKS, AND WHY IT IS SAFE
 *
 * Every element is rendered at all times. `run` only changes inline geometry
 * that CSS transitions between, so nothing mounts, unmounts or hides. The
 * server-rendered HTML is the finished state of the drawing, which is also what
 * a reader sees with JavaScript off and what reduced motion gets.
 *
 * `run` goes false when the card leaves, so the animation replays on the next
 * pass rather than playing once per page load.
 */
const STAGES = ["Align", "Build", "Embed", "Done"];
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export default function KpiVisual({
  metric,
  active,
}: {
  metric: Metric;
  active: boolean;
}) {
  // `run` is the `active` prop and nothing else. There is no state here at all:
  // the parent passes active=true for every card while it is not rotating, so
  // the server output and the no-JavaScript and reduced-motion cases are the
  // finished drawing. Once rotation starts the inactive cards fall back to the
  // empty geometry, which is what gives the next activation something to
  // transition from.
  const run = active;

  const pct = metric.figure === null ? 0 : Math.max(0, Math.min(100, metric.figure));

  // Fixed height, left aligned. The drawings are 260 units wide and the card is
  // wider than that, so a centred SVG floated in the middle with dead space
  // either side of it.
  return (
    <div className="mt-2 mb-6 h-[96px]" aria-hidden="true">
      {metric.visual === "track" && <Track run={run} />}
      {metric.visual === "before-after-blocks" && <Blocks run={run} pct={pct} />}
      {metric.visual === "dot-grid" && <Dots run={run} pct={pct} />}
      {metric.visual === "trend" && <Trend run={run} pct={pct} />}
      {metric.visual === "before-after-tracks" && <Bars run={run} pct={pct} />}
    </div>
  );
}

/** Her ALIGN / BUILD / EMBED / DONE track. The nodes light in sequence. */
function Track({ run }: { run: boolean }) {
  return (
    <svg viewBox="0 0 260 76" width="100%" height="100%" preserveAspectRatio="xMinYMid meet">
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={28 + i * 72}
          y1="30"
          x2={82 + i * 72}
          y2="30"
          stroke="var(--color-neon)"
          strokeWidth="1.5"
          strokeDasharray="54"
          strokeDashoffset={run ? 0 : 54}
          strokeOpacity="0.45"
          style={{ transition: `stroke-dashoffset 420ms ${EASE} ${140 + i * 260}ms` }}
        />
      ))}
      {STAGES.map((stage, i) => {
        const cx = 18 + i * 72;
        return (
          <g key={stage}>
            <circle
              cx={cx}
              cy="30"
              r="13"
              fill="var(--color-neon)"
              fillOpacity={run ? 0.14 : 0}
              style={{ transition: `fill-opacity 320ms ${EASE} ${i * 260}ms` }}
            />
            <circle
              cx={cx}
              cy="30"
              r="5.5"
              fill="var(--color-neon)"
              fillOpacity={run ? 1 : 0.18}
              style={{ transition: `fill-opacity 320ms ${EASE} ${i * 260}ms` }}
            />
            <text
              x={cx}
              y="60"
              textAnchor="middle"
              className="fill-white/60 font-sans text-[8px] font-bold tracking-[0.16em] uppercase"
            >
              {stage}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Her before-and-after block comparison. Ten blocks; the after row empties. */
function Blocks({ run, pct }: { run: boolean; pct: number }) {
  const remaining = Math.max(1, Math.round((1 - pct / 100) * 10));
  return (
    <svg viewBox="0 0 260 76" width="100%" height="100%" preserveAspectRatio="xMinYMid meet">
      <text x="0" y="9" className="fill-white/45 font-sans text-[7.5px] font-bold tracking-[0.18em] uppercase">
        Before
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={`b${i}`} x={i * 26} y="14" width="20" height="16" rx="4" fill="var(--color-bronze)" fillOpacity="0.5" />
      ))}
      <text x="0" y="47" className="fill-neon/70 font-sans text-[7.5px] font-bold tracking-[0.18em] uppercase">
        After
      </text>
      {Array.from({ length: 10 }, (_, i) => {
        const kept = i < remaining;
        return (
          <rect
            key={`a${i}`}
            x={i * 26}
            y="52"
            width="20"
            height="16"
            rx="4"
            fill="var(--color-neon)"
            fillOpacity={run ? (kept ? 0.9 : 0.1) : 0.9}
            style={{ transition: `fill-opacity 380ms ${EASE} ${i * 70}ms` }}
          />
        );
      })}
    </svg>
  );
}

/** Her retained-versus-churned dot grid, legend included. */
function Dots({ run, pct }: { run: boolean; pct: number }) {
  const total = 40;
  // The card reports an increase in retention, so the filled share is the
  // magnitude of that increase and not a claim about absolute retention.
  const on = Math.max(1, Math.round((pct / 100) * total));
  return (
    <svg viewBox="0 0 260 76" width="100%" height="100%" preserveAspectRatio="xMinYMid meet">
      {Array.from({ length: total }, (_, i) => {
        const col = i % 20;
        const row = Math.floor(i / 20);
        const filled = i < on;
        return (
          <circle
            key={i}
            cx={6 + col * 13}
            cy={12 + row * 18}
            r="4.5"
            fill="var(--color-neon)"
            fillOpacity={run && filled ? 0.95 : 0}
            stroke="var(--color-neon)"
            strokeOpacity="0.32"
            strokeWidth="1.4"
            style={{ transition: `fill-opacity 300ms ${EASE} ${i * 22}ms` }}
          />
        );
      })}
      <circle cx="6" cy="62" r="4" fill="var(--color-neon)" />
      <text x="16" y="65" className="fill-white/60 font-sans text-[7.5px] font-bold tracking-[0.14em] uppercase">
        Retained
      </text>
      <circle cx="86" cy="62" r="4" fill="none" stroke="var(--color-neon)" strokeOpacity="0.32" strokeWidth="1.4" />
      <text x="96" y="65" className="fill-white/40 font-sans text-[7.5px] font-bold tracking-[0.14em] uppercase">
        Churned
      </text>
    </svg>
  );
}

/** Her profit trend on a gridded field. The line draws left to right. */
function Trend({ run, pct }: { run: boolean; pct: number }) {
  const rise = (pct / 100) * 46;
  const points = `4,66 68,${66 - rise * 0.28} 132,${66 - rise * 0.58} 196,${66 - rise * 0.82} 252,${66 - rise}`;
  return (
    <svg viewBox="0 0 260 76" width="100%" height="100%" preserveAspectRatio="xMinYMid meet">
      <text x="0" y="9" className="fill-white/45 font-sans text-[7.5px] font-bold tracking-[0.18em] uppercase">
        Margin
      </text>
      {[0, 1, 2].map((i) => (
        <line key={i} x1="0" y1={24 + i * 21} x2="260" y2={24 + i * 21} stroke="var(--color-neon)" strokeOpacity="0.14" strokeWidth="1" />
      ))}
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-neon)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="300"
        strokeDashoffset={run ? 0 : 300}
        style={{ transition: `stroke-dashoffset 1100ms ${EASE} 80ms` }}
      />
      <circle
        cx="252"
        cy={66 - rise}
        r="4.5"
        fill="var(--color-neon)"
        fillOpacity={run ? 1 : 0}
        style={{ transition: `fill-opacity 260ms ${EASE} 900ms` }}
      />
    </svg>
  );
}

/** Her before-and-after speed bars. The after bar shortens as it draws. */
function Bars({ run, pct }: { run: boolean; pct: number }) {
  const after = Math.max(6, 248 * (1 - pct / 100));
  return (
    <svg viewBox="0 0 260 76" width="100%" height="100%" preserveAspectRatio="xMinYMid meet">
      <text x="0" y="12" className="fill-white/45 font-sans text-[7.5px] font-bold tracking-[0.18em] uppercase">
        Before
      </text>
      <rect x="0" y="18" width="248" height="10" rx="5" fill="var(--color-bronze)" fillOpacity="0.5" />
      <text x="0" y="50" className="fill-neon/70 font-sans text-[7.5px] font-bold tracking-[0.18em] uppercase">
        After
      </text>
      <rect
        x="0"
        y="56"
        width={run ? after : 248}
        height="10"
        rx="5"
        fill="var(--color-neon)"
        fillOpacity="0.9"
        style={{ transition: `width 820ms ${EASE} 120ms` }}
      />
    </svg>
  );
}
