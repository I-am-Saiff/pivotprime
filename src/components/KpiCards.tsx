import { METRICS } from "@/content/homepage";
import KpiVisual from "./KpiVisual";
import KpiRotator from "./KpiRotator";

/**
 * The five result cards, spec 3.3, built from her own design file.
 *
 * SOURCE: req/pivot-prime-kpi-cards_3.html, the client's approved design for
 * this section. Everything below — the grid, the card, the label, the 96px
 * visual well, the metric, the name, and the rule above the supporting line —
 * is transcribed from that file rather than designed here.
 *
 * TWO DEVIATIONS FROM HER FILE, both from her 1 September screenshots and both
 * recorded in PENDING-COPY 1d1: the lit dot in front of the label is gone and
 * the label is larger, and the % takes the figure's colour rather than her
 * cream. Nothing else about the card has moved.
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
          className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[18px] border border-neon/20 bg-[var(--card-dark-fill)] px-6 pt-6 pb-5"
        >
          {/* Her top glow: a hairline that fades in from both ends. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,215,109,0.5),transparent)]"
          />

          {/* HER LABEL, WITHOUT THE LIT DOT AND AT 12px, from her 1 September
              screenshots. Her file puts a 5px glowing dot in front of every
              .kpi-label and sets the label at 9px. She asked for the marker
              removed on all five cards and the label raised until it reads at a
              glance. The uppercase, the 0.15em tracking and the neon are hers
              and are untouched.

              12px, not larger: the figure below is 54px in the static grid and
              76px while the card rotates, so the label sits at a fifth to a
              sixth of it and cannot read as a second headline. The flex row went
              with the dot, which was the only thing it was aligning.
              PENDING-COPY 1d1. */}
          <p className="mb-[18px] text-[12px] font-semibold tracking-[0.15em] text-neon uppercase">
            {metric.kpiLabel}
          </p>

          <KpiVisual metric={metric} index={i} />

          {/* Her metric. Card two drops to 42px in her file because the range is
              twice as long.

              THE UNIT IS NEON NOW, NOT CREAM. Her file colours the number neon
              and leaves the % in the cream, and her 1 September screenshots ask
              for the two to match on all five cards so "+7%" reads as one value
              rather than a number with a mark after it. One colour across the
              whole string is all that is left to do, so the span that split it
              is gone with the second colour. PENDING-COPY 1d1. */}
          {metric.figureText !== null && (
            <p
              // data-kpi-figure is the hook the rotating state scales up. It
              // does nothing to her static five-across grid, which keeps the
              // 54px and 42px her file specifies.
              data-kpi-figure
              className={`mb-1 font-sans leading-none font-extrabold tracking-[-0.03em] text-neon tabular-nums ${
                metric.figureText.length > 5 ? "text-[42px]" : "text-[54px]"
              }`}
            >
              {metric.figureText}
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
