import { METRICS } from "@/content/homepage";

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
 * The mockup's per-card visuals are not built. Each one encodes a specific
 * figure, so there is nothing to draw until the figures exist.
 */
export default function KpiCards() {
  const cards = METRICS.filter((m) => m.pending !== "not-yet-supplied");

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((metric) => (
        <li
          key={metric.label}
          className="flex flex-col rounded-2xl bg-forest p-6 ring-1 ring-neon/20"
        >
          <p className="font-sans text-[11px] font-bold tracking-[0.18em] text-neon uppercase">
            Measured impact
          </p>

          {/* The figure slot. Empty until spec section 9 is resolved: no zero, no
              dash and no "coming soon", because a placeholder in a results
              section reads as a result. It keeps its height so confirming a
              figure does not reflow the section. */}
          <p
            aria-hidden={metric.figure === null}
            className="mt-6 min-h-[3.5rem] font-sans text-5xl leading-none font-extrabold tracking-tight text-linen"
          >
            {metric.figure === null ? "" : `${metric.figure}${metric.suffix}`}
          </p>

          <p className="mt-4 text-base font-medium text-white">{metric.label}</p>
          <p className="mt-3 border-t border-neon/15 pt-3 text-sm leading-relaxed text-sand/80">
            {metric.context}
          </p>
        </li>
      ))}
    </ul>
  );
}
