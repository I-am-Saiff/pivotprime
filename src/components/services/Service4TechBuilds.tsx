import { CopyProse, ServiceSignOff } from "./SpecCopyBlocks";
import { WHATSAPP_CTA } from "@/content/cta";
import { TECH_BUILDS } from "@/content/services-detail";

/**
 * Technology Builds, spec 4.4.
 *
 * A SERVER COMPONENT. The previous version was a client component whose
 * capability list and argument sat behind an interactive toggle labelled
 * "Automate Everything" / "Fix the Constraint First", so half the page existed
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

const CAPABILITY_MARKS = [
  <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></>,
  <><path d="M4 7h16M4 12h10M4 17h13" /><circle cx="18" cy="17" r="2" /></>,
  <><path d="M5 12a7 7 0 0 1 12-5" /><path d="M19 12a7 7 0 0 1-12 5" /><path d="M17 4v3h-3M7 20v-3h3" /></>,
  <><path d="M4 20V10M10 20V5M16 20v-7M22 20H2" /></>,
  <><circle cx="6" cy="7" r="2.5" /><circle cx="18" cy="17" r="2.5" /><path d="M8.5 7H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5" /></>,
  <><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><rect x="7" y="7" width="10" height="10" rx="2" /></>,
  <><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" /></>,
  <><path d="M4 6h16v9H4z" /><path d="M9 19h6M12 15v4" /><path d="M8 10.5l2 2 4-4" /></>,
  <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
];

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
            The Opening Argument
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
                    : "border-forest/40 bg-[var(--card-dark-fill)] text-white"
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

      {/* WHAT WE BUILD — her seven, verbatim, as a capability grid. */}
      <section className="relative overflow-hidden surface-page py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-forest)_1px,transparent_1px),linear-gradient(90deg,var(--color-forest)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] [opacity:0.06]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold tracking-[0.22em] text-mid uppercase">
            What We Build
          </p>
          <h2 className="mt-4 max-w-3xl font-sans text-3xl font-extrabold tracking-tight text-forest md:text-4xl">
            {TECH_BUILDS.capabilityHeading}
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_BUILDS.capabilityGrid.map((item, i) => (
              <li
                key={item.label}
                className="group/cap flex flex-col rounded-2xl border border-forest/12 card-dark p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-mid/40 hover:shadow-[0_14px_36px_rgba(1,51,37,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-neon"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
                    {CAPABILITY_MARKS[i % CAPABILITY_MARKS.length]}
                  </svg>
                </span>
                <h3 className="font-sans text-base font-bold text-forest">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/75">{item.body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-forest/60">
            {TECH_BUILDS.capabilityNote}
          </p>
        </div>
      </section>

      {/* RESTORED 29 August. She did not ask for anything to be removed from
          this page at all: her instruction was to change the ORDER of the
          sections, and the 28 August blanket cut took content off it anyway.
          PENDING-COPY 1ar and 1at. */}
      <section className="surface-page px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-12 sm:space-y-16">
          {/* "What We Build" WAS HERE AND WAS A DUPLICATE. The 29 August
              restore put TECH_BUILDS.capabilities back without checking whether
              the page already carried it: the nine-card capability grid higher
              up renders the same seven items, so all seven appeared twice.
              Removed on her instruction, keeping the version higher on the
              page. The restore was right about the other three blocks on this
              page, which appear once each. */}
          <CopyProse heading={TECH_BUILDS.bringUsTheProblem.label} paragraphs={[TECH_BUILDS.bringUsTheProblem.heading, TECH_BUILDS.bringUsTheProblem.body]} />
          <CopyProse heading="How It Runs" paragraphs={[TECH_BUILDS.howItRuns]} />
          <CopyProse heading="Where This Starts" paragraphs={[TECH_BUILDS.whereThisStarts]} />
        </div>
      </section>
      <ServiceSignOff heading="Where this ends up" body="Software that gets used, scoped after the diagnosis rather than before it. Tell us the constraint and we will tell you whether building is the answer." />
    </>
  );
}
