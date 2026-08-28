import { WHATSAPP_CTA } from "@/content/cta";
import { TECH_BUILDS } from "@/content/services-detail";

/**
 * Technology Builds, spec 4.4.
 *
 * A SERVER COMPONENT. The previous version was a client component whose
 * capability list and argument sat behind an interactive toggle labelled
 * "Automate everything" / "Fix the constraint first", so half the page existed
 * only in client state and neither label came from the spec. Spec 4.4 also says
 * this page "has to work as a standalone destination, because paid advertising
 * for the software capability will point here directly": a page that renders
 * its argument only after hydration is the wrong shape for paid traffic.
 *
 * ORDER. The argument comes before the list. Spec 4.4's differentiator is that
 * the build follows the diagnosis rather than replacing it, so "We do not
 * sprinkle AI over a business and call it transformation" is the first thing
 * read after the hero, and the seven concrete capabilities follow it. Reversing
 * that would make this a catalogue that happens to have a preamble.
 *
 * PALETTE. Tokens only. This file has been removed from the palette guard's
 * grandfathered list, so a raw hex here now fails the build.
 *
 * Every string is spec 4.4 verbatim, via a content module generated from the
 * document rather than typed.
 */
/**
 * One line-art mark per capability tile. Decorative and aria-hidden: the label
 * beside each is the content. Drawn from the palette's stroke colour by
 * inheritance, so no colour is declared here.
 */

export default function Service4TechBuilds() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-28 sm:pt-32 pb-12 sm:pb-20 text-white md:pt-40 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold tracking-tight md:text-6xl">
            {TECH_BUILDS.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">
            {TECH_BUILDS.standfirst}
          </p>

          <div className="mt-7 sm:mt-10 border-t border-neon/20 pt-8">
            <p className="font-sans text-xl font-bold text-neon">{TECH_BUILDS.priceLabel}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              {TECH_BUILDS.priceDetail}
            </p>
          </div>

          <a
            href={WHATSAPP_CTA.href}
            target={WHATSAPP_CTA.external ? "_blank" : undefined}
            rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-neon px-7 py-3.5 font-sans text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
          >
            {WHATSAPP_CTA.label}
          </a>
        </div>
      </section>

      {/* THE OPENING ARGUMENT — before the list, deliberately. */}
      <section className="surface-page py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold tracking-[0.22em] text-mid uppercase">
            The opening argument
          </p>
          <h2 className="mt-4 max-w-3xl font-sans text-3xl font-extrabold tracking-tight text-forest md:text-4xl">
            {TECH_BUILDS.argument.claim}
          </h2>
          <div className="mt-8 grid gap-6 border-l-2 border-mid/30 pl-6 md:grid-cols-2 md:gap-10">
            {TECH_BUILDS.argument.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-forest/80">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Her toggle, rendered as a contrast. Both halves are in the served
              HTML: her own version injects the second caption from script, so
              half her argument was invisible to a crawler on her page. */}
          <ul className="mt-7 sm:mt-10 grid gap-5 md:grid-cols-2">
            {TECH_BUILDS.constraintContrast.map((state, i) => (
              <li
                key={state.label}
                // The site's pair rule: white on the left, green on the right.
                className={`rounded-2xl border p-6 sm:p-7 ${
                  i === 0
                    ? "border-forest/15 bg-shell"
                    : "border-forest/40 bg-forest text-white"
                }`}
              >
                <h3
                  className={`font-sans text-lg font-bold ${i === 0 ? "text-forest" : "text-white"}`}
                >
                  {state.label}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed sm:text-base ${
                    i === 0 ? "text-forest/80" : "text-white/90"
                  }`}
                >
                  {state.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
