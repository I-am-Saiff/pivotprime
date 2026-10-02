import Image from "next/image";
import Link from "next/link";
import {
  FOUNDER,
  PEOPLE,
  TEAM_ANCHOR,
  TEAM_INTRO,
  WIDE_PERSON,
  type BioBlock,
  type Person,
} from "@/content/team";
import CaseStudies from "@/components/CaseStudies";
import { CASE_STUDIES_PULLQUOTE } from "@/content/case-studies";
import { ABOUT_HERO, BENCH, WHO_WE_ARE } from "@/content/about";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("about");

/**
 * The portrait tile. Her slide draws everyone as initials on a dark tile; we
 * hold real photographs for all five, so the tile takes a photo when there is
 * one and the monogram when there is not. Same shape either way, so a card with
 * initials does not read as a card that failed to load.
 *
 * objectPosition CARRIES HER OWN VERTICAL FOCUS, which her file sets per person:
 * Justin 12%, Saif 22%, Khushi 25%. Those three source files are 4:5, 4:5 and
 * 3:4 against her 4:4.2 card box, so the browser does crop them and her focus
 * value decides what it keeps. It replaced a blanket object-top, which is 0% and
 * is not what she drew for any of them.
 *
 * NISHA'S VALUE IS 50 AND DOES NOTHING, which is the point: her file is already
 * the card's shape, so there is nothing to crop. PENDING-COPY 1f9.
 *
 * THE MONOGRAM BRANCH IS UNREACHABLE TODAY. It stays: it is the generic fallback
 * for anyone added to the team without a photograph, keyed on person.photo
 * rather than hardcoded to a name, and deleting it would mean the next such card
 * renders an empty frame. PENDING-COPY 1d8.
 */
function Portrait({ person, className }: { person: Person; className: string }) {
  if (person.photo) {
    return (
      <Image
        src={person.photo.src}
        alt={person.photo.alt}
        width={640}
        height={672}
        sizes="(min-width: 1000px) 33vw, (min-width: 680px) 50vw, 100vw"
        style={{ objectPosition: `50% ${person.photo.focusY}%` }}
        className={`${className} object-cover`}
      />
    );
  }
  return (
    <div
      className={`${className} flex items-center justify-center bg-forest`}
      // The name is the heading directly beneath. Reading "SR" out as well adds
      // nothing and reads as a word.
      aria-hidden="true"
    >
      <span className="text-4xl font-extrabold tracking-tight text-neon md:text-5xl">
        {person.initials}
      </span>
    </div>
  );
}

/** Her file's LinkedIn mark, path data and all, so nothing is fetched for it. */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 flex-none">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}

/**
 * The LinkedIn button, her file's `.connect`: neon fill, forest text, the site's
 * 12px radius, the mark before the label.
 *
 * mt-auto PINS IT TO THE FOOT OF THE CARD so the buttons line up across the row
 * however long the biographies run, which is what her `margin-top: auto` does.
 * w-fit keeps it the width of its own words rather than the width of the card.
 *
 * NOTHING RENDERS WHEN THERE IS NO PROFILE. Iram has none in any source we hold,
 * so her card gets no button rather than a dead one or a link to the company
 * page. A guessed profile URL would point at a real person who may not be her.
 *
 * The label is the accessible name on its own and the mark is aria-hidden. The
 * capitals are a CSS text-transform, so the stored string is sentence case, as
 * every other button label on this site is.
 */
function LinkedInButton({ person }: { person: Person }) {
  if (!person.linkedin) return null;
  return (
    <a
      href={person.linkedin.url}
      target="_blank"
      rel="noopener noreferrer"
      /* data-on-light IS LOAD-BEARING, AND IT WAS FOUND BY LOOKING RATHER THAN
         BY READING. The card is .card-dark, whose remap repaints every
         text-forest descendant white so light-on-dark copy stays readable. This
         button is the opposite case: a NEON panel inside the dark card, where
         forest is correct and white is close to unreadable. Measured on the
         first build, the label rendered rgb(255,255,255) on rgb(0,215,109).

         globals.css already carries this exact exception for the light nodes
         inside the dark diagram panels, where the same remap put white on white
         at 1.1:1, so this reuses that mechanism rather than adding a second one.
         The mark inherits it through fill="currentColor". */
      data-on-light=""
      className="mt-auto inline-flex min-h-11 w-fit items-center gap-2.5 rounded-xl bg-neon px-[18px] py-3 text-[0.8rem] font-bold tracking-[0.06em] text-forest uppercase transition-colors hover:bg-neon/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
    >
      <LinkedInMark />
      {person.linkedin.label}
    </a>
  );
}

/** A biography: paragraphs, and for Saif a bulleted list of four builds. */
function Bio({ blocks, className }: { blocks: BioBlock[]; className: string }) {
  return (
    <div className={className}>
      {blocks.map((block) =>
        block.kind === "p" ? (
          <p key={block.text.slice(0, 40)} className="[&+p]:mt-2">
            {block.text}
          </p>
        ) : (
          /* my-2 RATHER THAN HER mt-2. Her file sets .bio ul { margin: 8px 0
             0 } and .bio p + p { margin-top: 8px }, and a p following a ul
             matches neither rule, so "He also rebuilt pivotprime.ae and its
             business diagnostic." ran straight into the last bullet with no
             space at all. It does the same in her own file. One line of spacing
             added and no copy touched; PENDING-COPY 1f9 tells her it was. */
          <ul key={block.items[0]} className="my-2 grid list-disc gap-1 pl-[1.1em] marker:text-neon">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

/**
 * The chip row, her `.tags`.
 *
 * THE CLASSES ARE THE FOUNDER CARD'S OWN, not her file's rgba values, so all
 * five cards carry one chip treatment. card-dark remaps border-forest and
 * bg-forest/ to white alpha on a dark card, which is what her file writes
 * literally; going through the token keeps it inside the palette rule.
 */
function Tags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          // Her file's tags: an outline only, white at 22%, no fill.
          className="rounded-full border border-white/22 px-3 py-1.5 text-[0.78rem] font-semibold text-white"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <div className="flex min-h-screen flex-col pb-10 sm:pb-16">
      {/* HERO, slide 21 */}
      {/* FLUSH TO THE TOP, 3 September. The page wrapper carried
          "pt-12 sm:pt-20", which pushed this dark hero 48px, then 80px, down
          the viewport and left a band of page ground above it. The header is a
          floating pill inset from the edges, so that band showed around it and
          the header read as sitting on cream rather than on the hero.

          The wrapper padding is gone and the clearance moved into the hero
          itself, which is how the homepage and all five service pages already
          do it: pt-28 sm:pt-32 md:pt-40, copied from them rather than picked.
          Bottom padding is untouched. PENDING-COPY 1d9. */}
      <header className="relative overflow-hidden bg-forest pt-28 pb-12 text-white sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="mb-5 block text-xs font-bold tracking-[0.22em] text-neon uppercase">
            {ABOUT_HERO.eyebrow}
          </span>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            <span className="block">{ABOUT_HERO.headingLead}</span>
            <span className="block text-neon">{ABOUT_HERO.headingAccent}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {ABOUT_HERO.standfirst}
          </p>
        </div>
      </header>

      {/* WHO WE ARE, slide 21 */}
      <section className="px-4 py-12 sm:py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-mid uppercase">
            {WHO_WE_ARE.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-forest md:text-4xl lg:text-5xl">
            {WHO_WE_ARE.heading}
          </h2>
          <div className="mt-8 space-y-5">
            {WHO_WE_ARE.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE TEAM. Anchor target for /about#team.

          REBUILT FROM HER OWN FILE, req/meet-the-team.html, which came with her
          v3 deck slides 4 and 5. The layout below is that file's: a section
          header, three tall portrait cards in a row, then one wide card for
          Khushi beneath them, with Iram's card above the three and unchanged.

          THE BREAKPOINTS ARE HERS, not the site's usual ones. She writes 3
          columns above 1000px, 2 columns from 680 to 1000, and 1 column below
          680, so they are arbitrary values rather than md and lg, which fall at
          768 and 1024 and would put the step in the wrong place.

          THAT REVERSES A DELIBERATE DECISION OF OURS, and it is hers to reverse.
          The old grid went straight from one column to three because "three in a
          two-column row would strand the third". Her file has the two-column
          step, so from 680 to 1000 the third card does sit alone on its own row.
          It is her layout; PENDING-COPY 1f9 shows her what it looks like. */}
      <section className="px-4 pb-12 sm:pb-20 sm:px-6 lg:px-8" id={TEAM_ANCHOR}>
        <div className="mx-auto max-w-6xl">
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-mid uppercase">
            {TEAM_INTRO.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-forest md:text-4xl lg:text-5xl">
            {TEAM_INTRO.heading}
          </h2>

          {/* IRAM'S CARD IS UNCHANGED apart from the LinkedIn item, which is the
              brief. It runs the full width, photograph beside the text, as her
              slide draws it, and her portrait keeps its own 4/5 box rather than
              the 4/4.2 the team cards take: the team box is her new file's and
              this card is not in that file. Her biography text is untouched. */}
          <article className="mt-8 sm:mt-12 overflow-hidden rounded-[28px] card-dark">
            <div className="grid grid-cols-1 gap-5 sm:gap-8 p-6 md:grid-cols-12 md:gap-10 md:p-10">
              <div className="md:col-span-4 lg:col-span-3">
                <Portrait person={FOUNDER} className="aspect-[4/5] w-full rounded-2xl" />
              </div>
              <div className="flex flex-col md:col-span-8 lg:col-span-9">
                <p className="text-xs font-bold tracking-[0.18em] text-mid uppercase">
                  {FOUNDER.role}
                </p>
                <h3 className="mt-2 font-heavy text-2xl font-extrabold text-forest md:text-3xl">
                  {FOUNDER.name}
                </h3>
                <Bio blocks={FOUNDER.bio} className="mt-4 space-y-4 leading-relaxed text-neutral-600" />
                <div className="mt-6">
                  <Tags tags={FOUNDER.tags} />
                </div>
                {/* The same button the four team cards use. mt-6 rather than
                    their gap, because this column is not a gapped flex column:
                    it would otherwise sit flush under the chips. Its own mt-auto
                    does nothing here, since her text is always taller than her
                    photograph. */}
                <div className="mt-6">
                  <LinkedInButton person={FOUNDER} />
                </div>
              </div>
            </div>
          </article>

          <ul className="mt-6 grid grid-cols-1 gap-7 min-[680px]:grid-cols-2 min-[1000px]:grid-cols-3">
            {PEOPLE.map((person) => (
              <li
                key={person.name}
                className="flex flex-col overflow-hidden rounded-[28px] card-dark"
              >
                {/* 4/4.2, her file's box. It was 4/5. */}
                <Portrait person={person} className="aspect-[4/4.2] w-full" />
                {/* Her file's padding: 26/22/28 on a phone, 30/32/34 from 680. */}
                <div className="flex flex-1 flex-col gap-3.5 px-[22px] pt-[26px] pb-7 min-[680px]:px-8 min-[680px]:pt-[30px] min-[680px]:pb-[34px]">
                  {/* TWO LINES RESERVED FROM 680 UP, her `min-height: 3em`, so the
                      names line up across the row whether a title wraps or not.
                      Nisha's is the one that wraps. Below 680 the cards are
                      stacked and there is nothing to line up with, so her file
                      drops it there and so does this. */}
                  {/* THREE LINES RESERVED IN THE THREE-COLUMN RANGE, not her
                      two, and the difference was measured rather than guessed.
                      At 1024 her min-height of 3em reserves two lines; Nisha is
                      the only title long enough to take three at that card
                      width, and her name sat 18px below the other two. The
                      reserve exists to align the names, so it is sized to the
                      longest title at the narrowest width it has to hold rather
                      than to the common case. Two lines is still right from 680
                      to 1000, where the cards are wider. PENDING-COPY 1f9. */}
                  <p className="text-[0.72rem] font-bold tracking-[0.16em] text-neon uppercase min-[680px]:min-h-[3em] min-[680px]:leading-[1.5]">
                    {person.role}
                  </p>
                  {/* Her file's .name, .bio and spacer, 2 October: 1.6rem at
                      800, 0.98rem at 1.7, and 6px more above the button. */}
                  <h3 className="font-heavy text-[1.6rem] leading-[1.15] font-extrabold text-forest">{person.name}</h3>
                  <Bio blocks={person.bio} className="text-[0.98rem] leading-[1.7] text-white/78" />
                  <Tags tags={person.tags} className="mt-1" />
                  <div aria-hidden="true" className="h-1.5" />
                  <LinkedInButton person={person} />
                </div>
              </li>
            ))}
          </ul>

          {/* KHUSHI, ONE WIDE CARD BENEATH THE THREE, her `.card.wide`: photo
              left at 38% of the card, text right, stacking below 680 where the
              photo takes the same 4/4.2 box as the three above it. */}
          <article className="mt-7 flex flex-col overflow-hidden rounded-[28px] card-dark min-[680px]:flex-row">
            {/* min-h-0 is her file's "min-height: 0" below 680: without it the
                photograph's own height overrides the 4/4.2 box and the card is
                taller than the three above it. */}
            <div className="aspect-[4/4.2] min-h-0 min-[680px]:aspect-auto min-[680px]:w-[38%] min-[680px]:flex-none">
              <Portrait person={WIDE_PERSON} className="h-full w-full" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3.5 px-[22px] pt-[26px] pb-7 min-[680px]:px-11 min-[680px]:py-10">
              {/* No reserved second line on the wide card, as her file has it:
                  there is no card beside it to align with. */}
              <p className="text-[0.72rem] font-bold tracking-[0.16em] text-neon uppercase">
                {WIDE_PERSON.role}
              </p>
              <h3 className="font-heavy text-[1.6rem] leading-[1.15] font-extrabold text-forest">{WIDE_PERSON.name}</h3>
              <Bio blocks={WIDE_PERSON.bio} className="max-w-[62ch] text-[0.98rem] leading-[1.7] text-white/78" />
              <Tags tags={WIDE_PERSON.tags} className="mt-1" />
              {/* AT THE FOOT, as her file has it: her .connect is margin-top:
                  auto, which outranks the column's centring, so the text starts
                  at the top and the button sits at the bottom. mt-auto on this
                  wrapper does the same here. Her v3 slide 5, "see attached
                  html". */}
              <div className="mt-auto pt-5">
                <LinkedInButton person={WIDE_PERSON} />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* THE BENCH, slide 22. Twenty capability labels, verbatim. */}
      <section className="px-4 pb-12 sm:pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] bg-forest p-8 text-white md:p-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <div className="relative z-10 grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-neon uppercase">
                  {BENCH.eyebrow}
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  {BENCH.headingLines.map((line, i) => (
                    <span
                      key={line}
                      className={i === BENCH.accentLineIndex ? "block text-neon" : "block"}
                    >
                      {line}
                    </span>
                  ))}
                </h2>
                <div className="mt-6 space-y-5">
                  {BENCH.body.map((paragraph) => (
                    <p key={paragraph.text.slice(0, 40)} className="leading-relaxed text-white/75">
                      {paragraph.text}
                      {paragraph.emphasis ? (
                        <>
                          {" "}
                          <strong className="font-bold text-white">{paragraph.emphasis}</strong>{" "}
                          {paragraph.rest}
                        </>
                      ) : null}
                    </p>
                  ))}
                </div>
                <p className="mt-8 inline-flex w-fit items-center rounded-full border border-neon/40 px-5 py-2.5 text-sm font-bold text-neon">
                  <span aria-hidden="true" className="mr-2 text-xs leading-none">
                    &bull;
                  </span>
                  {BENCH.pill}
                </p>
              </div>

              <ul className="flex flex-wrap content-start gap-2.5">
                {BENCH.capabilities.map((capability) => (
                  <li
                    key={capability}
                    // Her five highlighted chips: her .btag.hi, neon at 10% fill,
                    // 25% border and 90% text, from her emailed About design.
                    className={`rounded-full border px-4 py-2 text-sm ${
                      BENCH.highlighted.includes(capability)
                        ? "border-neon/25 bg-neon/10 text-neon/90"
                        : "border-white/15 bg-white/[0.04] text-white/90"
                    }`}
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies, unchanged. Same component as the homepage so the two
          cannot drift. */}
      <section className="py-14 sm:py-24" id="case-studies">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Her pull quote from pp-case-studies.html, in the position her own
              file gives it: directly above the studies. The slide 8 quote is a
              different thing and stays with the homepage section. */}
          <figure className="mx-auto mb-9 sm:mb-14 max-w-3xl border-l-4 border-mid pl-6 sm:pl-8">
            <blockquote className="text-lg leading-relaxed text-forest/85 italic sm:text-xl">
              {CASE_STUDIES_PULLQUOTE.body}
            </blockquote>
            <figcaption className="mt-4 text-xs font-bold tracking-[0.18em] text-mid uppercase">
              {CASE_STUDIES_PULLQUOTE.attribution}
            </figcaption>
          </figure>
          <CaseStudies />
        </div>
      </section>

      {/* Her close, pp-about-v2_2.html. The button was here without the two
          lines above it that give it a reason: check-dropped-mockup-copy found
          them in her file and on no page of the site. */}
      {/* BOXED, 1 September. It was a full-bleed forest band, py-14/sm:py-24
          edge to edge. The container is now the service page closer's exactly:
          the same rounded-2xl, the same p-7 sm:p-10 md:p-11, the same
          max-w-5xl inside the same px-4 sm:px-6 lg:px-8, and the same
          bottom-only section padding, which is her 30 August rule that the
          empty space sits under a block rather than over it.

          The fill, the eyebrow, the heading, the button and the centring are
          untouched. The inner max-w-4xl is gone because the box is the width
          constraint now, which is how the service closers are built.
          PENDING-COPY 1d5. */}
      <section className="surface-page px-4 pb-12 text-center sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-forest p-7 sm:p-10 md:p-11">
          <p className="mb-4 text-xs font-bold tracking-[0.22em] text-neon uppercase">Start here</p>
          <h2 className="mb-7 sm:mb-10 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            The first conversation costs nothing. Not moving does.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center rounded-md bg-primary px-10 py-5 text-lg font-bold tracking-wide text-white uppercase shadow-xl transition-colors hover:bg-neon/90"
          >
            Book your first conversation{" "}
            <span className="ml-3 text-2xl leading-none font-normal transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
