"use client";

import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";
import type { Metric } from "@/content/homepage";

/**
 * Her five visuals, from req/pivot-prime-kpi-cards_3.html.
 *
 * THIS IS HER FILE, NOT OUR DESIGN. Every earlier version of this section — the
 * clip-path shapes, the pills, the rotating carousel — was ours and she never
 * asked for any of it. The geometry, the viewBox sizes, the stroke widths, the
 * dash patterns and the label positions below are transcribed from her file.
 *
 * TWO DELIBERATE DEVIATIONS, both recorded in PENDING-COPY 1av:
 *
 *   1. Her "before" blocks on card two are amber. The standing
 *      instruction is that nothing in this section is brown or gold, so they are
 *      drawn in mid green at the same opacities. Her contrast survives as one
 *      hue at two weights.
 *   2. Her execution card runs three particles on an infinite loop. The brief is
 *      that each visual animates once on arrival and then rests, so the track
 *      draws once instead.
 *
 * MOTION. `useRevealOnScroll` starts revealed, so the finished drawing is what
 * the server sends and what a reader without JavaScript sees. It un-reveals only
 * when the card is below the fold and motion is allowed, then draws on
 * intersection. Nothing is ever conditionally rendered.
 */
const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export default function KpiVisual({ metric, index }: { metric: Metric; index: number }) {
  const [ref, run] = useRevealOnScroll<HTMLDivElement>(index * 70);

  return (
    <div ref={ref} className="mb-[18px] flex min-h-[96px] flex-1 items-center" aria-hidden="true">
      {metric.visual === "track" && <Track run={run} />}
      {metric.visual === "before-after-blocks" && <Waste run={run} />}
      {metric.visual === "dot-grid" && <Dots run={run} />}
      {metric.visual === "trend" && <Trend run={run} />}
      {metric.visual === "before-after-tracks" && <Speed run={run} />}
    </div>
  );
}

/** Her card 1: a four-node track, ALIGN / BUILD / EMBED / DONE. */
function Track({ run }: { run: boolean }) {
  return (
    <svg viewBox="0 0 260 72" width="100%" height="96" className="overflow-visible" fill="none">
      {[
        [28, 82],
        [100, 154],
        [172, 232],
      ].map(([x1, x2], i) => (
        <line
          key={x1}
          x1={x1}
          y1="36"
          x2={x2}
          y2="36"
          stroke="var(--color-mid)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          style={{
            // Her dashes are static; the draw is ours, standing in for her
            // looping particles.
            clipPath: run ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: `clip-path 320ms ${EASE} ${180 + i * 200}ms`,
          }}
        />
      ))}

      {[18, 90, 162].map((cx, i) => (
        <g key={cx} style={{ opacity: run ? 1 : 0.25, transition: `opacity 260ms ${EASE} ${i * 200}ms` }}>
          <circle cx={cx} cy="36" r="9" fill="var(--color-forest)" stroke="var(--color-neon)" strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx={cx} cy="36" r="3" fill="var(--color-mid)" />
        </g>
      ))}

      <g style={{ opacity: run ? 1 : 0.25, transition: `opacity 260ms ${EASE} 600ms` }}>
        <circle cx="242" cy="36" r="14" fill="var(--color-neon)" fillOpacity="0.1" />
        <circle cx="242" cy="36" r="9" fill="var(--color-forest)" stroke="var(--color-neon)" strokeWidth="1.5" />
        <circle cx="242" cy="36" r="3.5" fill="var(--color-neon)" />
      </g>

      {[
        [18, "Align"],
        [90, "Build"],
        [162, "Embed"],
      ].map(([x, label]) => (
        <text
          key={String(x)}
          x={x as number}
          y="58"
          textAnchor="middle"
          fill="var(--color-linen)"
          fillOpacity="0.5"
          fontSize="7.5"
          letterSpacing="0.06em"
          className="uppercase"
        >
          {label}
        </text>
      ))}
      <text x="242" y="58" textAnchor="middle" fill="var(--color-neon)" fontSize="7.5" fontWeight="600" letterSpacing="0.06em" className="uppercase">
        Done
      </text>
    </svg>
  );
}

/** Her card 2: ten blocks before, seven after, with the waste marked. */
function Waste({ run }: { run: boolean }) {
  const before = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225];
  return (
    <svg viewBox="0 0 252 80" width="100%" height="96" fill="none">
      <text x="0" y="11" fill="var(--color-linen)" fillOpacity="0.55" fontSize="8" fontWeight="600" letterSpacing="0.1em">
        BEFORE
      </text>
      {before.map((x, i) => (
        <rect
          key={x}
          x={x}
          y="16"
          width="22"
          height="16"
          rx="3"
          // Her five productive blocks, then five she draws in amber. Same
          // split, one hue: the wasted five are the lighter weight.
          fill="var(--color-mid)"
          fillOpacity={i < 5 ? 0.3 : 0.62}
          stroke={i < 5 ? undefined : "var(--color-neon)"}
          strokeOpacity={i < 5 ? undefined : 0.35}
          strokeWidth={i < 5 ? undefined : 1}
        />
      ))}
      <line x1="125" y1="40" x2="247" y2="40" stroke="var(--color-neon)" strokeOpacity="0.45" strokeWidth="0.5" strokeDasharray="2 2" />
      <text x="186" y="50" textAnchor="middle" fill="var(--color-neon)" fillOpacity="0.8" fontSize="7.5" letterSpacing="0.06em">
        43% INEFFICIENCY
      </text>

      <text x="0" y="66" fill="var(--color-neon)" fontSize="8" fontWeight="600" letterSpacing="0.1em">
        AFTER
      </text>
      {[0, 25, 50, 75, 100, 125, 150].map((x, i) => (
        <rect
          key={`a${x}`}
          x={x}
          y="70"
          width="22"
          height="10"
          rx="3"
          fill="var(--color-neon)"
          fillOpacity={i < 4 ? 1 : i === 4 ? 0.5 : 0.1}
          stroke={i > 4 ? "var(--color-neon)" : undefined}
          strokeOpacity={i > 4 ? 0.2 : undefined}
          strokeWidth={i > 4 ? 1 : undefined}
          style={{ opacity: run ? 1 : 0, transition: `opacity 220ms ${EASE} ${i * 70}ms` }}
        />
      ))}
    </svg>
  );
}

/** Her card 3: twenty dots, the last two hollow, with her legend. */
function Dots({ run }: { run: boolean }) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <div className="grid w-full grid-cols-10 gap-[5px]">
        {Array.from({ length: 20 }, (_, i) => {
          const lost = i >= 18;
          return (
            <span
              key={i}
              className={`aspect-square rounded-full ${lost ? "border-[1.5px] border-linen/45" : "bg-neon"}`}
              style={{ opacity: run ? 1 : 0, transition: `opacity 200ms ${EASE} ${i * 26}ms` }}
            />
          );
        })}
      </div>
      <div className="flex gap-3">
        <span className="flex items-center gap-[5px] text-[9.5px] text-linen/75">
          <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-neon" />
          Retained
        </span>
        <span className="flex items-center gap-[5px] text-[9.5px] text-linen/75">
          <span className="h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-linen/45" />
          Churned
        </span>
      </div>
    </div>
  );
}

/** Her card 4: the margin line, revealed left to right with its area beneath. */
function Trend({ run }: { run: boolean }) {
  const line = "8,70 48,65 95,59 140,50 180,37 222,22 252,10";
  return (
    <svg viewBox="0 0 260 80" width="100%" height="96" fill="none">
      <defs>
        <linearGradient id="kpi-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-neon)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-neon)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="74" x2="260" y2="74" stroke="var(--color-neon)" strokeOpacity="0.15" strokeWidth="1" />
      {[54, 34, 14].map((y) => (
        <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="var(--color-neon)" strokeOpacity="0.07" strokeWidth="1" />
      ))}

      {/* Her clip-path reveal, as a CSS transition rather than a rAF loop. */}
      <g
        style={{
          clipPath: run ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 1300ms ${EASE} 300ms`,
        }}
      >
        <path d={`M${line.split(" ").join(" L")} L252,74 L8,74 Z`} fill="url(#kpi-area)" />
        <polyline points={line} stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="252" cy="10" r="9" fill="var(--color-neon)" fillOpacity="0.15" />
        <circle cx="252" cy="10" r="3.5" fill="var(--color-neon)" />
        <text x="240" y="8" fill="var(--color-neon)" fontSize="8.5" fontWeight="600" textAnchor="end">
          +27%
        </text>
      </g>
      <text x="2" y="79" fill="var(--color-linen)" fillOpacity="0.35" fontSize="7.5">
        0
      </text>
    </svg>
  );
}

/** Her card 5: two tracks, the after bar filling to 30%. */
function Speed({ run }: { run: boolean }) {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex flex-col gap-[5px]">
        <p className="text-[9px] font-semibold tracking-[0.1em] text-linen/70 uppercase">Before — KYC completion</p>
        <div className="h-6 overflow-hidden rounded-[5px] bg-white/[0.04]">
          {/* Her amber "before" fill, drawn in the same green at the dim weight:
              this section carries no brown. PENDING-COPY 1av. */}
          <div className="flex h-full w-full items-center rounded-[5px] border border-neon/25 bg-neon/[0.10] px-2.5 text-[10px] font-semibold whitespace-nowrap text-linen">
            10 days avg.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="text-[9px] font-semibold tracking-[0.1em] text-linen/70 uppercase">After — KYC completion</p>
        <div className="h-6 overflow-hidden rounded-[5px] bg-white/[0.04]">
          <div
            className="flex h-full items-center overflow-hidden rounded-[5px] bg-neon px-2.5 text-[10px] font-semibold whitespace-nowrap text-forest"
            style={{ width: run ? "30%" : "0%", transition: `width 1300ms ${EASE} 450ms` }}
          >
            3 days
          </div>
        </div>
      </div>
    </div>
  );
}
