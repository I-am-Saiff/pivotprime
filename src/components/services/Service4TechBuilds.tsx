import Link from "next/link";
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
export default function Service4TechBuilds() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold tracking-tight md:text-6xl">
            {TECH_BUILDS.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">
            {TECH_BUILDS.standfirst}
          </p>

          <div className="mt-10 border-t border-neon/20 pt-8">
            <p className="font-sans text-xl font-bold text-neon">{TECH_BUILDS.priceLabel}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              {TECH_BUILDS.priceDetail}
            </p>
          </div>

          <a
            href={WHATSAPP_CTA.href}
            target={WHATSAPP_CTA.external ? "_blank" : undefined}
            rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-neon px-7 py-3.5 font-sans text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
          >
            {WHATSAPP_CTA.label}
          </a>
        </div>
      </section>

      {/* THE OPENING ARGUMENT — before the list, deliberately. */}
      <section className="bg-shell py-20 md:py-28">
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
        </div>
      </section>

      {/* WHAT WE BUILD — concrete, in the spec's own words. */}
      <section className="bg-linen py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold tracking-[0.22em] text-mid uppercase">
            What we build
          </p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-forest/10 sm:grid-cols-2">
            {TECH_BUILDS.capabilities.map((item, i, all) => (
              <li
                key={item.slice(0, 30)}
                // Spec 4.4 lists seven. An odd count in a two-column grid leaves
                // the last cell empty, and the hairline background shows through
                // it as a grey block, so the final odd item spans the row.
                className={`flex gap-4 bg-shell p-6 ${
                  i === all.length - 1 && all.length % 2 === 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span aria-hidden="true" className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                <span className="text-sm leading-relaxed text-forest sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT RUNS + WHERE THIS STARTS */}
      <section className="bg-forest py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.22em] text-neon uppercase">
              How it runs
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/80">{TECH_BUILDS.howItRuns}</p>
          </div>
          <div className="rounded-2xl border border-neon/25 bg-neon/[0.06] p-7">
            <p className="font-sans text-xs font-bold tracking-[0.22em] text-neon uppercase">
              Where this starts
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/80">
              {TECH_BUILDS.whereThisStarts}
            </p>
            <Link
              href="/services/operational-clarity-audit"
              className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-neon underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              See what the audit covers
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-shell py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <a
            href={WHATSAPP_CTA.href}
            target={WHATSAPP_CTA.external ? "_blank" : undefined}
            rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-full bg-mid px-8 py-4 font-sans text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-forest focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {WHATSAPP_CTA.label}
          </a>
        </div>
      </section>
    </>
  );
}
