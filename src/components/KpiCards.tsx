import { METRICS } from "@/content/homepage";
import KpiAutoVisual from "./KpiAutoVisual";
import KpiHighlight from "./KpiHighlight";

/**
 * The five result cards, spec 3.3.
 *
 * REPLACES ResultsGraphic, which showed one metric at a time on a three second
 * rotation. Only the active metric was ever in the DOM, so 62%, 16% and 27% were
 * absent from the served HTML: a crawler or a reader without JavaScript saw one
 * figure out of five. This is a server component with all five cards rendered at
 * once, so there is no active-item state to hide anything behind.
 *
 * EVERY FIGURE SLOT IS EMPTY, DELIBERATELY.
 *
 * Spec 3.3 ends "IRAM TO CONFIRM the five ranges above against the master table
 * in Section 9 before they go live", and spec section 1 says every result figure
 * must come from that table and nowhere else. Four of the five do not appear in
 * it. The 22 August mockup proposes a different five, of which two appear in the
 * table and two appear nowhere at all. Neither set is safe to publish, so the
 * layout ships and the numbers wait. The labels and context below ARE approved
 * green-block copy and are rendered verbatim.
 *
 * Card 6 is a different case and does not render: nobody has that number yet,
 * and spec 3.4 says "Do not launch this card with a placeholder."
 *
 * HER PER-CARD VISUALS ARE BUILT, as of 26 August, on her slide 3 comment
 * "Different visual language for each KPI". See KpiVisual: the geometry comes
 * from her own req/pivot-prime-kpi-cards_3.html rather than being invented, and
 * the parts of it that encode the figure wait for the figure, because ten blocks
 * becoming seven is a percentage drawn instead of written.
 */
export default function KpiCards() {
  const cards = METRICS.filter((m) => m.pending !== "not-yet-supplied");

  return (
    <KpiHighlight count={cards.length}>
      <ul data-metric-cards className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((metric, i) => (
        <li
          key={metric.label}
          data-kpi-index={i}
          className="group/kpi flex flex-col rounded-2xl bg-forest p-6 ring-1 ring-neon/20 transition-[box-shadow,transform,background-color] duration-700 ease-out motion-reduce:transition-none"
        >
          {/* The figure, or nothing at all. No zero, no dash, no "coming soon":
              a placeholder in a results section reads as a result.
              The slot used to reserve 3.5rem so a confirmed figure would not
              reflow the section. It reserved a visible void instead, and a card
              that reflows once beats a card that looks broken for a week. */}
          {metric.figure !== null && (
            <p className="mb-4 font-sans text-5xl leading-none font-extrabold tracking-tight text-linen">
              {metric.figure}
              {metric.suffix}
            </p>
          )}

          {/* Her own card name, from the .kpi-label in her mockup. */}
          <p className="font-sans text-[10px] font-bold tracking-[0.18em] text-neon/70 uppercase">
            {metric.kpiLabel}
          </p>

          <KpiAutoVisual figure={metric.figure} index={i} />

          {/* With the figure withheld this line is the card's headline, not a
              caption under one, so it carries the weight the number would. */}
          <p className="mt-auto text-lg leading-snug font-bold text-white sm:text-xl">{metric.label}</p>
          <p className="mt-3 border-t border-neon/15 pt-3 text-sm leading-relaxed text-sand/80">
            {metric.context}
          </p>
        </li>
      ))}
      </ul>
    </KpiHighlight>
  );
}
