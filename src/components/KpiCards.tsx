import { METRICS } from "@/content/homepage";
import KpiVisual from "./KpiVisual";
import KpiRotator from "./KpiRotator";

/**
 * The five result cards, spec 3.3, built from her own design file.
 *
 * SOURCE: req/pivot-prime-kpi-cards_3.html, the client's approved design for
 * this section. Everything below — the grid, the card, the label with its lit
 * dot, the 96px visual well, the metric with its neon figure and cream suffix,
 * the name, and the rule above the supporting line — is transcribed from that
 * file rather than designed here.
 *
 * WHAT THIS REPLACES. A rotating carousel of one card, which went through
 * clip-path shapes, pills and ellipses over three rounds. None of it was hers.
 * Her file shows five cards visible together: one column below 600, two from
 * 600, three from 900, so five land as three across and two beneath. Five
 * compact cards also take less height than one large rotating one did.
 *
 * A SERVER COMPONENT. Every word and every figure is in the served HTML, and the
 * card markup below is the only definition of the card anywhere.
 *
 * KpiRotator wraps it to show one card at a time on a three second beat. That
 * wrapper sets a single attribute and changes nothing about the card: the CSS
 * stacks the five in one grid cell and cross-fades. Without JavaScript, and
 * under reduced motion, the attribute is never set and her grid is what
 * renders.
 *
 * Card 6 does not render: nobody has that number, and spec 3.4 says "Do not
 * launch this card with a placeholder."
 */
export default function KpiCards() {
  const cards = METRICS.filter((m) => m.pending !== "not-yet-supplied");

  return (
    <KpiRotator labels={cards.map((m) => m.kpiLabel)}>
    <ul
      data-metric-cards
      className="mx-auto grid max-w-[1080px] grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cards.map((metric, i) => (
        <li
          key={metric.label}
          data-kpi-index={i}
          className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[18px] border border-neon/20 bg-forest px-6 pt-6 pb-5"
        >
          {/* Her top glow: a hairline that fades in from both ends. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,215,109,0.5),transparent)]"
          />

          {/* Her label, with the lit dot in front of it. */}
          <p className="mb-[18px] flex items-center gap-[7px] text-[9px] font-semibold tracking-[0.15em] text-neon uppercase">
            <span
              aria-hidden="true"
              className="h-[5px] w-[5px] shrink-0 rounded-full bg-neon shadow-[0_0_7px_rgba(0,215,109,0.7)]"
            />
            {metric.kpiLabel}
          </p>

          <KpiVisual metric={metric} index={i} />

          {/* Her metric: the figure in neon, the unit in cream. Card two drops
              to 42px in her file because the range is twice as long. */}
          {metric.figureText !== null && (
            <p
              className={`mb-1 font-sans leading-none font-extrabold tracking-[-0.03em] text-linen tabular-nums ${
                metric.figureText.length > 5 ? "text-[42px]" : "text-[54px]"
              }`}
            >
              <span className="text-neon">{metric.figureText.replace(/%$/, "")}</span>
              {metric.figureText.endsWith("%") ? "%" : ""}
            </p>
          )}

          <p className="mb-3.5 text-[12.5px] font-medium text-balance text-shell">{metric.label}</p>

          <p className="mt-auto border-t border-neon/15 pt-3 text-[11px] leading-[1.6] text-linen/75">
            {metric.context}
          </p>
        </li>
      ))}
    </ul>
    </KpiRotator>
  );
}
