import type { Metric } from "@/content/homepage";

/**
 * One distinct visual per result card.
 *
 * WHY THIS EXISTS
 *
 * Her comment on slide 3: "Really good idea, but just need Different visual
 * language for each KPI". Her own mockup, req/pivot-prime-kpi-cards_3.html,
 * shows what she means, so the geometry below is taken from that file rather
 * than invented: a four-node execution track, a before-and-after block
 * comparison, a retention dot grid, a profit trend on a gridded field, and a
 * pair of speed tracks.
 *
 * WHAT IS DELIBERATELY NOT DRAWN
 *
 * Four of her five visuals encode the figure itself. Ten blocks becoming seven
 * is a percentage drawn instead of written. A line with a slope is a magnitude.
 * A dot grid split into retained and churned is a ratio. Publishing those while
 * the written figures are withheld would put the same unapproved numbers on the
 * page in a form no check reads.
 *
 * So each card renders its frame now, and the data-bearing mark appears when
 * `figure` does. Card one is the exception and is complete today, because her
 * ALIGN / BUILD / EMBED / DONE track carries no quantity at all.
 *
 * Everything here is server-rendered and static. No animation: her mockup
 * animates particles along the track and grows the trend line, and both would
 * put the moving part outside the served HTML for the sake of a decoration.
 *
 * PENDING-COPY 1aj.
 */

const STAGES = ["Align", "Build", "Embed", "Done"];

export default function KpiVisual({ metric }: { metric: Metric }) {
  const hasFigure = metric.figure !== null;

  if (metric.visual === "track") {
    return (
      <svg viewBox="0 0 260 72" width="100%" height="76" aria-hidden="true" className="mt-1 mb-5">
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={28 + i * 72}
            y1="34"
            x2={82 + i * 72}
            y2="34"
            stroke="var(--color-mid)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        ))}
        {STAGES.map((stage, i) => {
          const cx = 18 + i * 72;
          const last = i === STAGES.length - 1;
          return (
            <g key={stage}>
              {last && <circle cx={cx} cy="34" r="14" fill="var(--color-neon)" fillOpacity="0.1" />}
              <circle
                cx={cx}
                cy="34"
                r="9"
                fill="var(--color-forest)"
                stroke="var(--color-neon)"
                strokeOpacity={last ? 1 : 0.4}
                strokeWidth="1.5"
              />
              <circle cx={cx} cy="34" r={last ? 3.5 : 3} fill={last ? "var(--color-neon)" : "var(--color-mid)"} />
              <text
                x={cx}
                y="60"
                textAnchor="middle"
                fill="var(--color-sand)"
                fillOpacity="0.75"
                fontSize="8"
                fontWeight="600"
                letterSpacing="1"
              >
                {stage.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (metric.visual === "before-after-blocks") {
    // Her rows are five productive blocks then five wasteful ones, becoming five
    // and two. The counts ARE the percentage, so while the figure is withheld
    // both rows carry the same count and only their evenness differs.
    return (
      <svg viewBox="0 0 252 80" width="100%" height="76" aria-hidden="true" className="mt-1 mb-5">
        {(["Before", "After"] as const).map((row, r) => (
          <g key={row}>
            <text
              x="0"
              y={r === 0 ? 9 : 51}
              fill="var(--color-sand)"
              fillOpacity="0.55"
              fontSize="8"
              fontWeight="600"
              letterSpacing="1.2"
            >
              {row.toUpperCase()}
            </text>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const ragged = r === 0 && i % 3 !== 0;
              return (
                <rect
                  key={i}
                  x={i * 25}
                  y={(r === 0 ? 14 : 56) + (ragged ? 3 : 0)}
                  width="22"
                  height={ragged ? 10 : 16}
                  rx="3"
                  fill={r === 0 ? "var(--color-bronze)" : "var(--color-mid)"}
                  fillOpacity={r === 0 ? 0.5 : 0.42}
                  stroke={r === 0 ? "var(--color-bronze)" : "var(--color-mid)"}
                  strokeOpacity={r === 0 ? 0.7 : 0.5}
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ))}
      </svg>
    );
  }

  if (metric.visual === "dot-grid") {
    // Her grid splits into retained and churned, which is the ratio. Until the
    // figure exists it is one uniform field: a surface waiting for a reading.
    return (
      <div className="mt-1 mb-5 h-[76px]">
        <svg viewBox="0 0 252 50" width="100%" height="50" aria-hidden="true">
          {Array.from({ length: 40 }, (_, i) => (
            <circle
              key={i}
              cx={7 + (i % 20) * 13}
              cy={12 + Math.floor(i / 20) * 20}
              r="4.5"
              fill={hasFigure ? "var(--color-neon)" : "none"}
              stroke="var(--color-sand)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <p className="mt-1.5 flex gap-4 font-sans text-[9px] font-semibold tracking-[0.1em] text-sand/60 uppercase">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-neon" />
            Retained
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full border border-sand/45" />
            Churned
          </span>
        </p>
      </div>
    );
  }

  if (metric.visual === "trend") {
    // The gridded field is the frame. The line has a slope, so the slope is the
    // figure and the line waits for it.
    return (
      <svg viewBox="0 0 260 80" width="100%" height="76" aria-hidden="true" className="mt-1 mb-5">
        {[74, 54, 34, 14].map((y, i) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="260"
            y2={y}
            stroke="var(--color-neon)"
            strokeOpacity={i === 0 ? 0.15 : 0.07}
            strokeWidth="1"
          />
        ))}
        {hasFigure && (
          <polyline
            points="8,70 48,65 95,59 140,50 180,37 222,22 252,10"
            stroke="var(--color-neon)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
        <text x="0" y="9" fill="var(--color-sand)" fillOpacity="0.55" fontSize="8" fontWeight="600" letterSpacing="1.2">
          MARGIN
        </text>
      </svg>
    );
  }

  // before-after-tracks. Her fills are labelled "10 days avg." and "3 days",
  // neither of which is in the section 9 table, so the tracks are empty.
  return (
    <div className="mt-1 mb-5 flex h-[76px] flex-col justify-center gap-3">
      {(["Before", "After"] as const).map((row) => (
        <div key={row}>
          <p className="font-sans text-[9px] font-semibold tracking-[0.1em] text-sand/60 uppercase">{row}</p>
          <div className="mt-1 h-2.5 w-full rounded-full bg-white/10">
            {hasFigure && (
              <div
                className="h-2.5 rounded-full bg-neon"
                style={{ width: row === "Before" ? "100%" : "33%" }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
