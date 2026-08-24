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
    <ul data-metric-cards className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((metric) => (
        <li
          key={metric.label}
          className="flex flex-col rounded-2xl bg-forest p-6 ring-1 ring-neon/20"
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

          <p className="text-base font-medium text-white">{metric.label}</p>
          <p className="mt-3 border-t border-neon/15 pt-3 text-sm leading-relaxed text-sand/80">
            {metric.context}
          </p>
        </li>
      ))}
    </ul>
  );
}
