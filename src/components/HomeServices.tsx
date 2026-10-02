import Link from "next/link";
import { HOME_DIAGNOSTIC_PANEL, HOME_SERVICES } from "@/content/services";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

/**
 * The services section: three cards and the diagnostic panel beneath them.
 * Her slide 4 of 26 September, revised by her slide 2 of the v3 deck on 30
 * September.
 *
 * IT IS NOW ON BOTH THE HOMEPAGE AND /services, FROM HERE. The 26 September note
 * in this file said the opposite, because her scope then was "the homepage only.
 * No other page", so /services kept the old five-card ServiceCards grid and the
 * two pages deliberately described the same offers differently. Her v3 slide 2
 * ends that: "/services still says which of the five you actually need. Changing
 * that word while the same page still lists five cards would contradict itself.
 * Make /services render the same three cards and diagnostic panel as the
 * homepage, from the same component, so the two cannot drift again."
 *
 * So ServiceCards renders nowhere now. It is left in the tree unrendered rather
 * than deleted, with a note at the top of it saying so.
 *
 * WHAT HER v3 MOCKUP CHANGED INSIDE THE CARDS:
 *
 *   THE SUB-BLOCKS WENT. Cards two and three each carried a second block with
 *   its own h4 and its own link, for Build and Place and UAE Market Entry. Those
 *   were still two full offers inside three cards, which is what she objected
 *   to. Each is now one sentence in the note on the card above it, and each card
 *   has exactly one link again.
 *
 *   SO THE DIVIDER MOVED RATHER THAN GOING. It used to separate two blocks.
 *   Card two's note sits under a rule in her mockup and card one's does not, so
 *   it is a property of the note now. The asymmetry is hers.
 *
 *   THE PRICE LINE IS CONDITIONAL. Cards two and three read "Scoped per
 *   engagement" until now and her mockup gives neither any price line, so only
 *   the audit has one and the other two go straight from title to body.
 *
 *   THE EYEBROW SITS IN A PALE MIST CAPSULE and THE TITLE IS MID GREEN. Both are
 *   hers. The capsule is the treatment the seat tags on the fractional page
 *   already use, bg-mist at the site's 12px radius, rather than a new fully
 *   rounded shape: the one radius she has asked for across this site is 12px,
 *   and PENDING-COPY 1f8 puts the choice back to her. THAT ENTRY ALSO CARRIES
 *   THE CONTRAST MEASUREMENT: mid green reads 3.15:1 on the card and 3.06:1 in
 *   the capsule, against the 4.5:1 the rest of the site meets, and the titles
 *   were at 12.8:1 in forest before this. Built as she asked and reported rather
 *   than overridden. THE PRICE LINE IS FOREST
 *   NOW, not mid, because the title took mid and two mid lines in a row read as
 *   one block. That is a consequence of her change rather than a change of hers.
 *
 * THE LINK IS PUSHED TO THE FOOT WITH mt-auto so the three link rows line up
 * across the row whatever the copy does above them. Card three carries no note,
 * so without this its link would float a third of the way up the card next to
 * the other two.
 *
 * A SERVER COMPONENT, as before: no carousel, no state, every word of it in the
 * served HTML with nothing to hydrate.
 */
export default function HomeServices({
  headingLevel = "h3",
}: { headingLevel?: "h2" | "h3" } = {}) {
  const CardHeading = headingLevel;
  const PanelHeading = headingLevel;

  /**
   * data-services-grid IS LOAD-BEARING FOR THE CHECK, and it is here rather than
   * on either page because the component is the thing both pages share.
   *
   * The guard that holds her three offers first asserted the three card titles
   * against the whole page, and it passed with card three's title broken on
   * purpose: "Technology Builds" is a label in the header services dropdown, so
   * it is in the served HTML of every page on the site whatever the cards say.
   * A presence check that the navigation can satisfy is not a check on the cards.
   * Scoping it needs one anchor that means the same thing on / and on /services,
   * and the homepage's own id="services" sits on a section /services has not got.
   */
  return (
    <div data-services-grid="">
      {/* items-stretch is what keeps the three level: each card grows to the
          tallest and the link is pushed to the foot by mt-auto, so the three
          bottom edges line up rather than the copy floating. */}
      <ul className="grid gap-5 md:grid-cols-3 md:items-stretch">
        {HOME_SERVICES.map((service) => (
          <li key={service.title} className="flex">
            <div className="frosted-card-light flex w-full flex-col rounded-2xl p-6 sm:p-7">
              {/* HER SLIDE 2 PICTURE, measured, 2 October: a full-width pale green
                  bar with round ends and dark bold lettering. It was a short
                  mid-green capsule the width of its words. Weight 700, the
                  heaviest the site loads; hers is 800, about 6% heavier. */}
              <span className="rounded-full bg-mid/12 px-3.5 py-1.5 text-xs leading-[17px] font-bold tracking-[0.08em] text-forest uppercase">
                {service.eyebrow}
              </span>
              <CardHeading className="mt-3.5 text-lg font-bold text-mid">
                {service.title}
              </CardHeading>

              {service.priceLine && (
                // Plain, small and grey-green, as her picture has it.
                <p className="mt-1 mb-1 text-[0.78rem] leading-normal font-medium text-forest/75">
                  {service.priceLine}
                </p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{service.body}</p>

              {/* The rule is a border on the note rather than an <hr>, so a card
                  without a note cannot render a rule with nothing under it. */}
              {service.note && (
                <p
                  className={
                    service.note.dividedAbove
                      ? "mt-px border-t border-forest/10 pt-[18.5px] text-xs leading-relaxed text-neutral-500"
                      : "mt-4 text-xs leading-relaxed text-neutral-500"
                  }
                >
                  {service.note.text}
                </p>
              )}

              {/* Her picture: a rule above the link on the cards whose note has
                  none (We Diagnose and We Build), and none on We Lead, whose
                  rule sits above its note. */}
              <Link
                href={service.href}
                className={`group mt-auto inline-flex items-center pt-[18px] ${service.note?.dividedAbove ? "" : "border-t border-forest/15"} text-sm font-bold text-forest transition-colors hover:text-mid focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none`}
              >
                {service.ctaLabel}
                <span
                  aria-hidden="true"
                  className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* THE DIAGNOSTIC IS OUT OF THE GRID, her slide 4: full width beneath the
          three cards rather than a sixth card inside them. The button sits to
          the right of the copy from md up and beneath it below that, which is
          what she drew. Unchanged by her v3 slide 2: "The full-width diagnostic
          panel beneath the cards stays as it is." */}
      {DIAGNOSTIC_ENABLED && (
        <div className="mt-5 rounded-2xl bg-forest p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-3xl">
              <span className="block text-xs font-semibold tracking-[0.2em] text-neon uppercase">
                {HOME_DIAGNOSTIC_PANEL.eyebrow}
              </span>
              <PanelHeading className="mt-2.5 text-xl font-bold sm:text-2xl">
                {HOME_DIAGNOSTIC_PANEL.heading}
              </PanelHeading>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {HOME_DIAGNOSTIC_PANEL.body}
              </p>
            </div>

            <Link
              href={HOME_DIAGNOSTIC_PANEL.href}
              className="inline-flex min-h-11 flex-shrink-0 items-center justify-center rounded-xl bg-neon px-7 py-3.5 text-xs font-bold tracking-wider text-forest uppercase shadow-lg transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {/* The arrow her picture and her linked page both show. One run with
                  the label, so the flex button keeps the space before it. */}
              <span>
                {HOME_DIAGNOSTIC_PANEL.ctaLabel}{" "}
                <span aria-hidden="true" className="text-[10.25px] font-normal">
                  &rarr;
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
