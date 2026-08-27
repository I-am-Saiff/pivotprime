"use client";

import type { Metric } from "@/content/homepage";

/**
 * One distinct visual per result card, animating when its card becomes active.
 *
 * WHY THIS EXISTS
 *
 * Her comment on slide 3: "Really good idea, but just need Different visual
 * language for each KPI". Her own mockup, req/pivot-prime-kpi-cards_3.html,
 * carries the five ideas: a four-stage track, a before-and-after comparison, a
 * retained-versus-churned grid, a profit trend, and a pair of speed bars.
 *
 * EACH ONE NOW HAS ITS OWN SHAPE, on the client's 27 August instruction: the
 * stages run round a ring, the units are hexagons, the retention dots sit on a
 * circle, the trend is drawn inside a circular frame, and the two speeds are
 * concentric arcs. The card stays a rectangle so the layout holds.
 *
 * ONE HUE, TWO WEIGHTS. Before and after are the same green separated by
 * opacity. An earlier version drew "before" in bronze, which against a forest
 * card read as muddy khaki rather than as a dimmer version of the same thing.
 * Nothing in this file uses bronze or sand.
 *
 * TIMING. The carousel advances every 2.5 seconds, so every animation here is
 * built to finish inside about 1.5, leaving the finished state to rest rather
 * than being cut off mid-draw.
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

const W = 280;
const H = 150;
const CX = 140;
const CY = 70;

export default function KpiVisual({ metric, active }: { metric: Metric; active: boolean }) {
  const run = active;
  const pct = metric.figure === null ? 0 : Math.max(0, Math.min(100, metric.figure));

  return (
    <div className="w-full" aria-hidden="true">
      {metric.visual === "track" && <StageRing run={run} />}
      {metric.visual === "before-after-blocks" && <HexRows run={run} pct={pct} />}
      {metric.visual === "dot-grid" && <DotRing run={run} pct={pct} />}
      {metric.visual === "trend" && <TrendDial run={run} pct={pct} />}
      {metric.visual === "before-after-tracks" && <SpeedArcs run={run} pct={pct} />}
    </div>
  );
}

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block h-auto w-full">
      {children}
    </svg>
  );
}

/** Where a stage sits on the ring, starting at twelve o'clock. */
function onRing(index: number, count: number, radius: number) {
  const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
  return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle) };
}

/**
 * ALIGN / BUILD / EMBED / DONE, filling clockwise round a ring.
 * Each quarter draws, then its node lights, then the next quarter starts.
 */
function StageRing({ run }: { run: boolean }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  const SEG = C / 4 - 6; // the gap is what makes four stages read as four

  return (
    <Chrome>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-neon)" strokeOpacity={DIM} strokeWidth="7" />

      {[0, 1, 2, 3].map((i) => (
        <circle
          key={`arc${i}`}
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="var(--color-neon)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.85"
          strokeDasharray={`${SEG} ${C}`}
          strokeDashoffset={run ? 0 : SEG}
          transform={`rotate(${i * 90 - 90} ${CX} ${CY})`}
          style={{ transition: `stroke-dashoffset 260ms ${EASE} ${i * 200}ms` }}
        />
      ))}

      {STAGES.map((stage, i) => {
        const { x, y } = onRing(i, 4, R);
        const label = onRing(i, 4, R + 22);
        const anchor = i === 1 ? "start" : i === 3 ? "end" : "middle";
        return (
          <g key={stage}>
            <circle cx={x} cy={y} r="9" fill="var(--color-forest)" />
            <circle
              cx={x}
              cy={y}
              r="5.5"
              fill="var(--color-neon)"
              fillOpacity={run ? 1 : DIM}
              style={{ transition: `fill-opacity 240ms ${EASE} ${i * 200 + 200}ms` }}
            />
            <text
              x={label.x}
              y={label.y + 3.5}
              textAnchor={anchor}
              fill="#fff"
              fillOpacity={run ? 0.7 : 0.28}
              className="font-sans text-[9px] font-bold tracking-[0.16em] uppercase"
              style={{ transition: `fill-opacity 240ms ${EASE} ${i * 200 + 200}ms` }}
            >
              {stage}
            </text>
          </g>
        );
      })}
    </Chrome>
  );
}

/** A flat-topped hexagon in a w by h box at x, y. */
function hex(x: number, y: number, w: number, h: number) {
  return [
    [x + w * 0.25, y],
    [x + w * 0.75, y],
    [x + w, y + h / 2],
    [x + w * 0.75, y + h],
    [x + w * 0.25, y + h],
    [x, y + h / 2],
  ]
    .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
    .join(" ");
}

/** The before row fades down while the after row fills left to right. */
function HexRows({ run, pct }: { run: boolean; pct: number }) {
  const remaining = Math.max(1, Math.round((1 - pct / 100) * 10));
  const CELL = 28;
  const HEX_W = 24;
  const HEX_H = 26;
  return (
    <Chrome>
      <text x="0" y="22" fill="#fff" fillOpacity="0.45" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        Before
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <polygon
          key={`b${i}`}
          points={hex(i * CELL, 34, HEX_W, HEX_H)}
          fill="var(--color-neon)"
          // Ten solid units that dim as the after row fills: you watch the waste
          // leave rather than being shown two static rows.
          fillOpacity={run ? 0.2 : 0.62}
          style={{ transition: `fill-opacity 300ms ${EASE} ${180 + i * 40}ms` }}
        />
      ))}
      <text x="0" y="96" fill="var(--color-neon)" fillOpacity="0.75" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        After
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <polygon
          key={`a${i}`}
          points={hex(i * CELL, 108, HEX_W, HEX_H)}
          fill="var(--color-neon)"
          fillOpacity={run ? (i < remaining ? 0.95 : DIM) : DIM}
          style={{ transition: `fill-opacity 260ms ${EASE} ${i * 45}ms` }}
        />
      ))}
    </Chrome>
  );
}

/**
 * The retention base as a full ring of dots, with the uplift as a bright arc
 * drawn over it.
 *
 * The earlier version filled only the figure's share, so 13% lit four dots out
 * of twenty-four and a legend reading "retained / churned" described the
 * opposite of what was drawn. The figure is an increase, not a retention rate,
 * so the ring is the base and the arc is the gain. The two labels are ours;
 * hers named two things this card does not measure.
 */
function DotRing({ run, pct }: { run: boolean; pct: number }) {
  // 24 rather than 32: at r=50 the larger count left barely three pixels
  // between neighbours and the ring read as a dashed line.
  const total = 24;
  const R = 50;
  const ARC_R = R + 13;
  const C = 2 * Math.PI * ARC_R;
  const uplift = C * (pct / 100);

  return (
    <Chrome>
      {Array.from({ length: total }, (_, i) => {
        const { x, y } = onRing(i, total, R);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="5"
            fill="var(--color-neon)"
            // The base fills quickly and stays dim, so the arc that lands on top
            // of it is the only bright thing on the card.
            fillOpacity={run ? 0.34 : 0}
            stroke="var(--color-neon)"
            strokeOpacity={DIM * 2.4}
            strokeWidth="1.8"
            style={{ transition: `fill-opacity 180ms ${EASE} ${i * 18}ms` }}
          />
        );
      })}

      <circle
        cx={CX}
        cy={CY}
        r={ARC_R}
        fill="none"
        stroke="var(--color-neon)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeDasharray={`${uplift} ${C}`}
        strokeDashoffset={run ? 0 : uplift}
        transform={`rotate(-90 ${CX} ${CY})`}
        // Last, and on its own, so the eye lands on the gain rather than on the
        // base it sits above.
        style={{ transition: `stroke-dashoffset 420ms ${EASE} 520ms` }}
      />

      <circle cx={CX - 62} cy={H - 12} r="5" fill="var(--color-neon)" fillOpacity="0.34" stroke="var(--color-neon)" strokeOpacity={DIM * 2.4} strokeWidth="1.8" />
      <text x={CX - 50} y={H - 8} fill="#fff" fillOpacity="0.5" className="font-sans text-[9px] font-bold tracking-[0.14em] uppercase">
        Retention base
      </text>
      <rect x={CX + 58} y={H - 15} width="16" height="5" rx="2.5" fill="var(--color-neon)" />
      <text x={CX + 80} y={H - 8} fill="var(--color-neon)" fillOpacity="0.85" className="font-sans text-[9px] font-bold tracking-[0.14em] uppercase">
        Uplift
      </text>
    </Chrome>
  );
}

/** The trend drawn on a curved field inside a soft circular frame. */
function TrendDial({ run, pct }: { run: boolean; pct: number }) {
  const R = 60;
  const rise = (pct / 100) * 62;
  const left = CX - 52;
  const right = CX + 52;
  const base = CY + 24;
  const pts = [0, 0.25, 0.5, 0.75, 1].map((t) => {
    const x = left + (right - left) * t;
    // Slightly convex, so the line follows the curve of the frame rather than
    // cutting a chord across it.
    const y = base - rise * (t * 0.8 + t * t * 0.2) - Math.sin(t * Math.PI) * 5;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = pts.join(" ");
  const end = pts[pts.length - 1].split(",").map(Number);

  return (
    <Chrome>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-neon)" strokeOpacity={DIM * 1.8} strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r={R - 14} fill="none" stroke="var(--color-neon)" strokeOpacity={DIM * 0.6} strokeWidth="1" />
      <text x={CX} y={H - 8} textAnchor="middle" fill="#fff" fillOpacity="0.45" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        Margin
      </text>

      <clipPath id="kpi-dial">
        <circle cx={CX} cy={CY} r={R - 2} />
      </clipPath>
      <g clipPath="url(#kpi-dial)">
        <polygon
          points={`${line} ${right},${base + 40} ${left},${base + 40}`}
          fill="var(--color-neon)"
          fillOpacity={run ? 0.16 : 0}
          style={{ transition: `fill-opacity 420ms ${EASE} 420ms` }}
        />
        <polyline
          points={line}
          fill="none"
          stroke="var(--color-neon)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="160"
          strokeDashoffset={run ? 0 : 160}
          style={{ transition: `stroke-dashoffset 720ms ${EASE} 60ms` }}
        />
      </g>
      <circle
        cx={end[0]}
        cy={end[1]}
        r="5"
        fill="var(--color-neon)"
        fillOpacity={run ? 1 : 0}
        style={{ transition: `fill-opacity 200ms ${EASE} 720ms` }}
      />
    </Chrome>
  );
}

/** Two concentric arcs race. The after arc is done long before the before arc. */
function SpeedArcs({ run, pct }: { run: boolean; pct: number }) {
  const OUTER = 54;
  const INNER = 36;
  const SWEEP = 0.78; // three quarters of the ring, so the two ends stay visible
  const outerC = 2 * Math.PI * OUTER;
  const innerC = 2 * Math.PI * INNER;
  const outerRun = outerC * SWEEP;
  const innerRun = innerC * SWEEP * (1 - pct / 100);

  return (
    <Chrome>
      <g transform={`rotate(-90 ${CX} ${CY})`}>
        <circle
          cx={CX}
          cy={CY}
          r={OUTER}
          fill="none"
          stroke="var(--color-neon)"
          strokeOpacity={DIM}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${outerC * SWEEP} ${outerC}`}
        />
        <circle
          cx={CX}
          cy={CY}
          r={OUTER}
          fill="none"
          stroke="var(--color-neon)"
          strokeOpacity="0.4"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${outerRun} ${outerC}`}
          strokeDashoffset={run ? 0 : outerRun}
          style={{ transition: `stroke-dashoffset 1200ms ${EASE} 80ms` }}
        />
        <circle
          cx={CX}
          cy={CY}
          r={INNER}
          fill="none"
          stroke="var(--color-neon)"
          strokeOpacity={DIM}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${innerC * SWEEP} ${innerC}`}
        />
        <circle
          cx={CX}
          cy={CY}
          r={INNER}
          fill="none"
          stroke="var(--color-neon)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeOpacity="0.95"
          strokeDasharray={`${innerRun} ${innerC}`}
          strokeDashoffset={run ? 0 : innerRun}
          // A shorter distance on a shorter clock, so the after arc visibly
          // stops while the before arc is still travelling. The gap is the point.
          style={{ transition: `stroke-dashoffset 420ms ${EASE} 80ms` }}
        />
      </g>
      <text x={CX} y={CY - 4} textAnchor="middle" fill="#fff" fillOpacity="0.45" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        Before
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" fill="var(--color-neon)" fillOpacity="0.75" className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase">
        After
      </text>
    </Chrome>
  );
}
