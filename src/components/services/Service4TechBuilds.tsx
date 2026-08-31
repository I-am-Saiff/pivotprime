import { Lab, NoteCard, ServiceSignOff } from "./SpecCopyBlocks";
import { WHATSAPP_CTA } from "@/content/cta";
import { SERVICE_CLOSERS, TECH_BUILDS } from "@/content/services-detail";

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
 * ORDER, FROM 30 AUGUST. The argument used to come first, on the reasoning that
 * the differentiator should be read before the catalogue. The meeting note
 * settles it the other way: hero, a brief introduction with no heavy paragraphs,
 * the "What we build" list, "How it runs" with "Where this starts", and the
 * philosophy section moved to the end. That is the order below, and the two
 * paragraphs of argument travel to the end with the section they belong to.
 *
 * THE LIST IS CONVERSATIONAL NOW, on the same instruction. It was a grid of
 * nine tiles, each with a line-art icon and a two-or-three word technical label
 * above her sentence. The labels and the icons are gone and her sentences are a
 * tick list, which is also how her own file writes this section.
 *
 * PALETTE. Tokens only. This file has been removed from the palette guard's
 * grandfathered list, so a raw hex here now fails the build.
 */
/**
 * One line-art mark per capability tile. Decorative and aria-hidden: the label
 * beside each is the content. Drawn from the palette's stroke colour by
 * inheritance, so no colour is declared here.
 *
 * RESTORED 31 August, out of 04572dc, alongside the grid they belong to. Batch
 * two had replaced the grid with a plain tick list on the instruction that the
 * list read conversationally rather than technically; she has asked for the
 * grid back, the version that was live and on screen during the call.
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

      {/* WHAT WE BUILD — the eyebrow, the heading, the line, then her grid.

          THE GRID IS BACK, from 31 August, restored out of 04572dc: the faded
          line ground, the nine cards, each with its mark, its name and its
          short description. Batch two had replaced it with a plain tick list.

          The order within the section is the one batch two introduced and she
          has confirmed: the line that governs the list sits above the cards
          rather than under them, where it used to be. */}
      <section className="relative overflow-hidden surface-page py-12 sm:py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-forest)_1px,transparent_1px),linear-gradient(90deg,var(--color-forest)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] [opacity:0.06]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold tracking-[0.22em] text-mid uppercase">
            What we build
          </p>
          <h2 className="mt-4 max-w-3xl font-sans text-3xl font-extrabold tracking-tight text-forest md:text-4xl">
            {TECH_BUILDS.capabilityHeading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-forest/70">
            {TECH_BUILDS.capabilityNote}
          </p>

          {/* THE LAST TILE SPANS THE ROW FROM 640 TO 1023, audit item 15. Nine
              tiles in the two-column band left the ninth alone beside 368px of
              empty grid at 768 and 401px at 834, and the same gap from 640 up.
              sm:col-span-2 fills that row for the whole two-column band
              and lg:col-span-1 hands it back at 1024, where nine into three
              divides evenly and no span is wanted.

              THE OTHER OPTION WAS THREE COLUMNS AT 768, and it was measured
              rather than guessed at: it makes the tiles 229px, and five of the
              nine labels that sit on one line at every width today wrap to two.
              The tiles are built for the 309px they get at 1024. Spanning the
              last one costs nothing the grid was not already doing on the
              service cards.

              Literal class strings, same reason as ServiceCards: Tailwind scans
              source text, so an interpolated span never gets generated. */}
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_BUILDS.capabilityGrid.map((item, i) => (
              <li
                key={item.label}
                className={`group/cap flex flex-col rounded-2xl border border-forest/12 card-dark p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-mid/40 hover:shadow-[0_14px_36px_rgba(1,51,37,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  i === TECH_BUILDS.capabilityGrid.length - 1 &&
                  TECH_BUILDS.capabilityGrid.length % 2 === 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
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
        </div>
      </section>

      {/* HOW IT RUNS, WITH "WHERE THIS STARTS" UNDER IT. Restored 31 August,
          reversing the removal made earlier the same day. That removal was ours,
          not hers: both blocks are in her own
          req/pivotprime-service-pages-2208.html and neither was on the
          30 August deletion list. Recorded in docs/PENDING-COPY.md 1c0.

          STACKED, NOT A PAIR, because that is what her file does. Her markup
          nests the .notefit inside the same block as the .lab, below its two
          paragraphs, in one column:

            <div class="lab">How it runs</div>
            <p>We scope the build...</p>
            <p>If you want us to run and maintain it...</p>
            <div class="notefit"><h3>Where this starts</h3><p>...</p></div>

          So the 31 August left-white-right-dark rule does not apply here: it
          governs two-column content pairs, and this is not one. The version
          batch two built did set them side by side, which is why they were in
          the way of that rule; her own file was not asking for a pair.

          Lab and NoteCard ARE her .lab and .notefit, so the treatment matches
          the other service pages by construction rather than by imitation. */}
      <section className="surface-page px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Lab>{TECH_BUILDS.howItRunsHeading}</Lab>
          <div className="mt-3 max-w-2xl space-y-3">
            {TECH_BUILDS.howItRuns.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-forest/75">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-7 max-w-2xl">
            <NoteCard
              heading={TECH_BUILDS.whereThisStartsHeading}
              body={TECH_BUILDS.whereThisStarts}
            />
          </div>
        </div>
      </section>

      {/* THE PHILOSOPHY SECTION, at the end from 30 August. The eyebrow read
          "The opening argument" while it was the opening; it is her own word
          for it now that it is not. */}
      <section className="surface-page pb-12 sm:pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold tracking-[0.22em] text-mid uppercase">
            The argument
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
                // The site's pair rule: white on the left, green on the
                // right. From 31 August the left half is white rather than
                // shell and the right carries the same border and shadow as
                // PairDark, so this pair matches the four built with those
                // components. It is the only two-column pair left on this page
                // once "How it runs" and "Where this starts" come off.
                className={`rounded-2xl border p-6 shadow-sm sm:p-7 ${
                  i === 0
                    ? "border-forest/10 bg-white"
                    : "card-dark border-white/10 shadow-xl"
                }`}
              >
                <h3
                  className={`font-sans text-lg font-bold ${i === 0 ? "text-forest" : "text-neon"}`}
                >
                  {state.label}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed sm:text-base ${
                    i === 0 ? "text-forest/80" : "text-white"
                  }`}
                >
                  {state.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceSignOff {...SERVICE_CLOSERS.techBuilds} />
    </>
  );
}
