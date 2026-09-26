import Link from "next/link";
import { HOME_DIAGNOSTIC_PANEL, HOME_SERVICES } from "@/content/services";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

/**
 * The homepage services section, her slide 4 of the 26 September deck.
 *
 * "Have refined it so it reads as 3 cards under diagnose, lead and build. And
 * only 3 offers now."
 *
 * THIS IS NOT ServiceCards AND DOES NOT REPLACE IT. ServiceCards renders the
 * five-card grid on BOTH the homepage and /services, and her scope for this
 * change is "the services section on the homepage only. No other page." So the
 * homepage renders this and /services still renders ServiceCards, untouched.
 * The two now describe the same five offers differently, which is her
 * instruction rather than drift, and PENDING-COPY 1f3 puts the question of
 * whether /services should follow back to her. A SECOND COMPONENT IS NOT
 * CONSOLIDATION AND IS NOT CLAIMED AS ANY.
 *
 * ALL FIVE SERVICE PAGES ARE STILL LINKED FROM HERE, which is the thing that
 * had to survive the change: Build and Place is inside the Lead card and UAE
 * Market Entry is inside the Build card, and they came off the header dropdown
 * on her slide 10, so these are two of the routes check-links walks the site to
 * find. Six links in total, the five services and the diagnostic.
 *
 * WHAT WENT WITH THE OLD GRID, on the homepage only:
 *
 *   THE HORIZONTAL SWIPE CAROUSEL below md, with its snap track and its row of
 *   page dots. Her brief asks for three cards "stacking cleanly on narrow",
 *   which is a plain stacked grid, and a carousel of three is a worse way to
 *   read three things than a column of three.
 *
 *   THE COLUMN SPANNING. The old grid computed md:col-span-2 and lg:col-span-2
 *   or lg:col-span-3 for the last card, so an odd count did not leave an empty
 *   cell. Three cards in three columns divide exactly, so there is nothing left
 *   to compensate for and the arithmetic goes with it.
 *
 *   THE WHOLE CARD AS ONE LINK. Each card carried a single <Link> wrapping
 *   everything. Cards two and three now hold two blocks with a link each, and a
 *   link inside a link is invalid, so the card is a plain container and the
 *   links sit on the blocks.
 *
 * A SERVER COMPONENT. The old one was "use client" for the carousel's scroll
 * state; with the carousel gone there is no state, so every word here is in the
 * served HTML with nothing to hydrate.
 */
export default function HomeServices() {
  return (
    <>
      {/* items-stretch is what keeps the three level: each card grows to the
          tallest, and the scope note on card one is pushed to the foot by
          mt-auto so the three bottom edges line up rather than the copy
          floating. */}
      <ul className="grid gap-5 md:grid-cols-3 md:items-stretch">
        {HOME_SERVICES.map((service) => (
          <li key={service.title} className="flex">
            <div className="frosted-card-light flex w-full flex-col rounded-2xl p-6 sm:p-7">
              <span className="block text-xs font-semibold tracking-[0.2em] text-mid uppercase">
                {service.eyebrow}
              </span>
              <h3 className="mt-2.5 text-lg font-bold text-forest">{service.title}</h3>
              <p className="mt-1.5 text-sm font-bold text-mid sm:text-base">{service.priceLine}</p>

              {service.blocks.map((block, i) => (
                <div
                  key={block.href}
                  // The divider is a border on the second block rather than an
                  // <hr> between them, so a card with one block cannot render a
                  // rule with nothing under it.
                  className={i === 0 ? "mt-4" : "mt-5 border-t border-forest/10 pt-5"}
                >
                  {block.heading && (
                    <h4 className="mb-1.5 text-base font-bold text-forest">{block.heading}</h4>
                  )}
                  <p className="text-sm leading-relaxed text-neutral-600">{block.body}</p>
                  <Link
                    href={block.href}
                    className="group mt-3 inline-flex items-center text-sm font-bold text-forest transition-colors hover:text-mid focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {block.ctaLabel}
                    <span
                      aria-hidden="true"
                      className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              ))}

              {/* Her slide gives a scope note to the audit card and to neither
                  of the others, so this is conditional rather than an empty
                  paragraph on two cards out of three. */}
              {service.scopeLine && (
                <p className="mt-auto pt-6 text-xs leading-relaxed text-neutral-500">
                  {service.scopeLine}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* THE DIAGNOSTIC IS OUT OF THE GRID, her slide 4: full width beneath the
          three cards rather than a sixth card inside them. The button sits to
          the right of the copy from md up and beneath it below that, which is
          what she drew. */}
      {DIAGNOSTIC_ENABLED && (
        <div className="mt-5 rounded-2xl bg-forest p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-3xl">
              <span className="block text-xs font-semibold tracking-[0.2em] text-neon uppercase">
                {HOME_DIAGNOSTIC_PANEL.eyebrow}
              </span>
              <h3 className="mt-2.5 text-xl font-bold sm:text-2xl">
                {HOME_DIAGNOSTIC_PANEL.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {HOME_DIAGNOSTIC_PANEL.body}
              </p>
            </div>

            <Link
              href={HOME_DIAGNOSTIC_PANEL.href}
              className="inline-flex min-h-11 flex-shrink-0 items-center justify-center rounded-xl bg-neon px-7 py-3.5 text-xs font-bold tracking-wider text-forest uppercase shadow-lg transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {HOME_DIAGNOSTIC_PANEL.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
