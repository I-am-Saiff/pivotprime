import Image from "next/image";
import Link from "next/link";
import AnchorLink from "@/components/AnchorLink";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { CONTACT_CTA, HERO_CTA, JOURNEY_CTA, WHATSAPP_CTA } from "@/content/cta";
import {
  LOGO_GROUPS,
  CLOSE,
  FOUNDER,
  HERO,
  HOW_WE_ARE_PAID,
  PATTERNS,
  PROOF,
  RESULTS,
} from "@/content/homepage";
import { SERVICES_EYEBROW, SERVICES_HEADING } from "@/content/services";
import HomeServices from "@/components/HomeServices";
import PatternsList from "@/components/PatternsList";
import CaseStudies from "@/components/CaseStudies";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import FeeCalculator from "@/components/FeeCalculator";
import KpiCards from "@/components/KpiCards";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* THE ORDER OF THESE SECTIONS IS HERS, NOT THE SPEC'S NUMBERING.

          Slide 2 of her 26 September deck gives the running order verbatim:
          Hero, Logos and institutions, Pain accordion, Who we serve, Measured
          Impact, What do we actually do, Meet Iram, Case Studies, Sign off CTA.
          "Pain accordion" is her name for the patterns section, which she
          spells out in the same note.

          SO THE 3.x COMMENTS BELOW NO LONGER RUN IN NUMERICAL ORDER, and that
          is correct rather than a mistake to tidy. Each one still names the
          spec clause its section answers; the sequence on the page is hers.

          THE FEES BLOCK, 3.10, IS NOT IN HER NINE. It is kept and left directly
          before the closing CTA, which is where it already sat, so its
          relationship to the closer is unchanged. It is the only section on the
          page her list does not name. PENDING-COPY 1f0. */}

      {/* 3.1 Hero */}
      <section className="relative flex min-h-[100svh] items-center px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 lg:px-8">
        {/* Background — layered gradient lets the wave texture breathe */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/home-banner.jpg"
            alt=""
            fill
            aria-hidden="true"
            className="animate-water-pan object-cover"
            priority
          />
          {/* Bottom-heavy gradient: bright at top, darker at bottom so text always reads */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-forest/60 to-forest/85" />
          {/* Subtle radial vignette on left where text lives */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_50%,rgba(1,51,37,0.35),transparent)]" />
        </div>

        <div className="page-container relative z-10 text-white">
          {/* Eyebrow. HER WORDS AND HER ORDER, from the slide 1 comment:
              "Strategy, Operations, technology, execution at the top." The four
              words replace an "Operations · Strategy · Execution" that was ours:
              it is in neither the copy document, nor the live site, nor any
              mockup. Styling and position unchanged. PENDING-COPY 1ah. */}
          {/* The dots are back at every width, on the client's 28 August
              instruction: without them the four words read as four unrelated
              words rather than as one line.

              The dot TRAILS its word rather than leading the next one, and the
              pair is one inline-block. A break can only land between pairs, and
              since every pair opens with a word, no line can ever start with a
              dot. Leading dots were tried first and put "·Technology" at the
              head of the second row at 360.
              PENDING-COPY 1ah. */}
          <span className="mb-6 flex flex-wrap gap-x-2 text-xs font-bold tracking-[0.22em] text-neon uppercase">
            {["Strategy", "Operations", "Technology", "Execution"].map((word, i) => (
              <span key={word} className="inline-block whitespace-nowrap">
                {word}
                {i < 3 && (
                  <span aria-hidden="true" className="ml-2">
                    ·
                  </span>
                )}
              </span>
            ))}
          </span>

          {/* Neon accent rule */}
          <div className="mb-6 h-[3px] w-12 rounded-full bg-neon" aria-hidden="true" />

          <h1 className="max-w-4xl text-[2.6rem] leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {HERO.heading}
          </h1>

          {/* Lead — the most important sentence */}
          <p className="mt-6 max-w-2xl text-xl leading-snug font-semibold text-white/95 sm:text-2xl md:text-3xl">
            <em className="block italic">{HERO.leadItalic}</em>
            <em className="block text-neon italic underline decoration-neon/40 decoration-[3px] underline-offset-[8px]">{HERO.leadStrong}</em>
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
            {HERO.body}
          </p>

          {/* CTAs */}
          {/* THE CTA AREA IS A GRID, from 26 September, and it is a grid
              because two of her instructions pull in opposite directions at
              different widths.

              SHE WANTED THE LINE UNDER THE FIRST BUTTON ONLY. Putting it in a
              flex column with that button did that, and cost 132px of gap: the
              column took its width from the line's max-w-sm, so the second
              button went from 16px away to 148px away at 768, 1024 and 1440.
              Measured before and after rather than guessed.

              AND SHE WANTED THE BUTTONS BACK TOGETHER. So the line no longer
              sizes anything: w-0 min-w-full below means it contributes nothing
              to the column's width and is then laid out at that column's width,
              which is the button's. It wraps to four lines instead of three,
              which is what she asked for in preference to the gap.

              AND AT 375 IT READS WRONG UNDER THE FIRST BUTTON. Judged by
              looking, not by the rule: with the buttons stacked full width, a
              paragraph between them stops them reading as a pair and pushes the
              second one down the screen. She asked for it moved below both at
              that width only if it looked that way, and it does.

              A grid is what does both. One column at 375 with the line ordered
              last, two columns above it with the line in row two under the
              first button. Flex could not: order inside the first button's
              column cannot move a child out of that column, and taking it out
              of the column would make it a third button-row item at every
              width. PENDING-COPY 1e8. */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-4">
            {/* AnchorLink, not next/link, from 3 September. The green button
                was a next/link and scrolled on the first click only; measured
                on a production build, clicks two and three left scrollY at 0.
                The black one is a plain anchor and never had the fault, and is
                moved across for the same treatment rather than left as a second
                way of doing the same thing. Both keep their href, so both still
                work with JavaScript off. src/lib/anchor-scroll.ts. */}
            <AnchorLink
              href={HERO_CTA.href}
              className="order-1 inline-flex items-center justify-center rounded-xl bg-neon px-7 py-3.5 text-xs font-bold tracking-wider text-forest uppercase shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none sm:col-start-1 sm:row-start-1"
            >
              {HERO_CTA.label}
            </AnchorLink>

            <AnchorLink
              href={HERO.secondaryHref}
              className="order-2 inline-flex items-center justify-center rounded-xl border border-white/20 bg-black px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-200 hover:border-white/45 hover:bg-black/85 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none sm:col-start-2 sm:row-start-1 sm:self-start"
            >
              {HERO.secondaryLabel}
            </AnchorLink>

            {/* w-0 min-w-full, NOT a max-width, and the two halves do different
                jobs. width:0 is what the browser uses when it works out how wide
                this grid column wants to be, so the line contributes nothing to
                that figure and the column comes out the width of the button
                alone. min-width:100% is what it is actually laid out at, which
                is that same width, so it wraps rather than widening anything.

                mt-2 tops the mobile row gap up from 12px to 20px, which is the
                space the line had under the button row before any of this. */}
            {DIAGNOSTIC_ENABLED && (
              <p className="order-3 mt-2 w-0 min-w-full text-sm leading-relaxed text-white/70 sm:col-start-1 sm:row-start-2 sm:mt-0">
                {HERO.diagnosticExplainer}
              </p>
            )}
          </div>

          {/* HER SOCIAL PROOF MICRO-LINE IS GONE, her slide 1, 26 September:
              "Trusted by SMEs across insurance, fintech, wellness & retail."
              She asked for the whole sentence removed rather than reworded. It
              is preserved unrendered as PROOF.trustedHeroLine and written out
              in PENDING-COPY 1e7, and the longer variant of the same claim in
              the proof bar below has gone with it. */}
        </div>
      </section>

      {/* 3.2 Proof bar. MOVE: the logo rows sat buried inside a later section
          and belong directly under the hero.

          THE GAP UNDER THE PHOTOGRAPH MATCHES EVERY OTHER GAP, 2 October. Her
          v3 slide 11: "Use the same spacing between every section". Every gap
          below is two section paddings, 192 on a computer and 112 on a phone,
          but the photograph is a full-bleed block, so the space under its edge
          was this section's padding alone plus the line's margin: 108 and 68.
          The top padding is doubled instead, pt-28 and sm:pt-48. */}
      <section className="surface-page px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-48 sm:pb-24">
        <div className="page-container">
          {/* THE SECOND TRUSTED-BY LINE IS GONE TOO, and it is the one worth
              noticing: {PROOF.trusted} read "Trusted by businesses across
              insurance, wellness, retail, fragrance, fintech and consumer
              goods.", which is the same claim as the hero micro-line in
              different words, and it is spec 3.2 green-block copy. She asked us
              to look for a longer variant on the page and remove it if we found
              one. Removing her own spec copy is her later instruction beating
              her earlier document, so the assertion on it has moved to
              check-content's FORBIDDEN list rather than being dropped. The rest
              of this bar is untouched. PENDING-COPY 1e7. */}
          {/* LEFT-ALIGNED, 2 OCTOBER. Her 23 August slide 2: "If rest is not
              centre aligned then this also shouldn't be as it looks off against
              next sections." Her v3 slide 11 asks the same of every section. */}
          <p className="max-w-3xl text-sm text-neutral-500">
            {PROOF.featuredPrefix}
            {PROOF.publications.map((pub, i) => (
              <span key={pub.href}>
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={pub.title}
                  className="-my-3.5 inline-block py-3.5 font-semibold text-mid underline underline-offset-2 hover:text-forest"
                >
                  {pub.name}
                </a>
                {i === 0 ? " and " : "."}
              </span>
            ))}
          </p>

        {/* TWO ROWS, OPPOSITE DIRECTIONS, each carrying one labelled group.
            Matching the live site, where both label cards travel in the row
            rather than sitting above it.

            THE LABEL CARDS ARE HEADINGS, NOT PICTURES. On the live site each is
            a JPG of the words, so a screen reader announced them as client logos
            and a crawler read nothing. Here each is an h3 in the served HTML,
            styled to read as a card in the row.

            NO LOGO APPEARS TWICE IN ONE VIEWPORT. Each row carries its group
            once per copy rather than repeating a subset to fill the track, so
            the widest thing on screen at any moment is one label plus its
            logos. The previous version repeated a three-logo subset and two
            Nivishe cards could sit in view together. Both copies exist only for
            the -50% loop, and one copy is wider than the viewport at every
            width, so the seam is the only place two copies meet.

            Only the first copy is announced, so every logo and every label is in
            the accessibility tree exactly once. */}
        {/* INSIDE THE SHARED CONTAINER, 2 OCTOBER. The rows sat outside it and
            ran edge to edge of the section, 32 to 1408 at 1440, while every
            other section sits at 144 to 1296. Her v3 slide 11: "use one
            content width for every section". The rows still scroll; they are
            clipped at the content edges now instead of the page edges, and the
            section keeps one container, which the layout check counts. */}
        <div className="mt-7 sm:mt-10 space-y-5">
          {LOGO_GROUPS.map((group, rowIndex) => (
            <div key={group.label} className="w-full overflow-hidden">
              <div
                className={`flex w-max items-center ${
                  rowIndex % 2 === 0
                    ? "animate-[marquee_46s_linear_infinite]"
                    : "animate-[marquee-reverse_46s_linear_infinite]"
                } motion-reduce:animate-none motion-reduce:w-full`}
              >
                {/* WRAPPED, NOT STOPPED, WHEN MOTION IS REDUCED, 2 October. A
                    visitor whose device asks for less movement used to get the
                    row frozen at its start, so only the label and the first few
                    tiles ever showed, and the logos her v3 slide 1 asked for,
                    all at the end of the rows, never appeared for them. Now the
                    first copy wraps onto as many lines as it needs and the
                    second copy, which exists only for the loop, is hidden. */}
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className={`flex items-center space-x-12 px-6 motion-reduce:flex-wrap motion-reduce:gap-4 motion-reduce:space-x-0 motion-reduce:px-0 ${
                      copy === 1 ? "motion-reduce:hidden" : ""
                    }`}
                    aria-hidden={copy === 1}
                  >
                    {/* MIST FILL, the fourth and current state, on the client's
                        1 September instruction that these two carry the same
                        fill as the testimonial quote card in Who we serve. That
                        card is bg-mist with forest text, so this is the same
                        token rather than a colour matched by eye.

                        The full sequence, since this tile has moved more than
                        anything else on the page: bg-forest/[0.04], which
                        composited ten points darker than the section and read as
                        a grey patch; no fill, which matched the page exactly;
                        bg-neon, the header CTA's green; and now bg-mist. The
                        text has been text-forest throughout. No border, which is
                        how it has been since the neon change. */}
                    <h3 className="flex h-20 w-56 flex-shrink-0 items-center justify-center rounded-lg bg-mist px-5 text-center font-sans text-xs font-bold tracking-[0.14em] text-forest uppercase md:h-24 md:w-64">
                      {group.label}
                    </h3>
                    {/* TWO KINDS OF LOGO IN ONE ROW, from her slide 1 of the v3
                        deck, and the difference is in the files rather than in
                        the design.

                        THE ORIGINAL SIX ARE PRE-BAKED PANELS: 345x185 JPGs with a
                        near-black ground and a white logo flattened into the
                        picture. They carry their own panel, so they are drawn as
                        they always were.

                        THE FOUR SHE ASKED FOR ARE THE COMPANIES' OWN FILES,
                        unaltered, so the panel and the monochrome are applied
                        here instead. That is the whole reason for the branch: an
                        official logo is used as published or not at all, and
                        flattening one onto a dark panel in an image editor means
                        recolouring someone's trademark by hand.

                        THE PANEL MATCHES THE OLD TILES AS THEY RENDER, 2 October.
                        The original JPEGs carry a near-black ground and a faint
                        green glow at the foot, and the contrast filter on them
                        takes the ground to black. These tiles had a flat
                        near-black and no glow, so side by side they read as a
                        second batch. They now use .logo-tile in globals.css:
                        black with the glow drawn from palette tokens only, the
                        values sampled from the old tiles on the live page. The
                        near-black palette exception is gone with it.
                        PENDING-COPY 1g2 and 1g5.

                        aspect-[345/185] gives the new tiles the exact footprint
                        of the old ones, so the row's rhythm and the marquee's
                        travel are unchanged. max-h and max-w together are what
                        balances a wide wordmark against a square mark: the
                        wordmark meets the width limit first and the square meets
                        the height limit first, so neither ends up optically
                        larger than the other. */}
                    {group.logos.map((logo) =>
                      logo.tile ? (
                        <div
                          key={`${copy}-${logo.src}`}
                          className="flex h-20 flex-shrink-0 items-center justify-center rounded-lg logo-tile aspect-[345/185] md:h-24"
                        >
                          {/* sizes IS LOAD-BEARING, AND ITS ABSENCE WAS A FAULT OF
                              MINE THAT COST EVERY VISITOR. width and height carry
                              each file's own pixel size so the box is reserved
                              before it loads, and without sizes next/image takes
                              that as the display width: it built a 1x/2x srcSet
                              of 1200 and 3840 for Cinnacare and 1080 and 2048 for
                              Nurture, to fill a slot about 136px wide. Eight of
                              those requested at once is also what stopped the
                              homepage reaching networkidle locally, which is how
                              it was found. With sizes the browser picks a variant
                              by the tile's real width instead. */}
                          {logo.use ? (
                            /* A LOGO THAT ONLY EXISTS AS A SPRITE SYMBOL, Ford.
                               The sprite file is the exact bytes ford.com
                               served and <use> draws one symbol out of it, as
                               Ford's own header does. No next/image: this is not
                               an image element, so there is no srcSet and no
                               sizes to set, and the 16.5KB file is fetched once
                               and cached. The accessible name sits on the svg,
                               and the marquee's second copy hides it, the same
                               as the alt does for every other tile. */
                            <svg
                              viewBox={logo.use.viewBox}
                              role={copy === 0 ? "img" : undefined}
                              aria-label={copy === 0 ? logo.alt : undefined}
                              aria-hidden={copy === 0 ? undefined : true}
                              className={`${logo.size ?? "max-h-[58%] max-w-[76%]"} h-full w-auto`}
                            >
                              <use href={`${logo.src}#${logo.use.symbol}`} />
                            </svg>
                          ) : (
                          <Image
                            src={logo.src}
                            alt={copy === 0 ? logo.alt : ""}
                            width={logo.w ?? 345}
                            height={logo.h ?? 185}
                            sizes="(min-width: 768px) 180px, 150px"
                            unoptimized={logo.raw}
                            className={`${logo.size ?? "max-h-[58%] max-w-[76%]"} w-auto object-contain ${
                              logo.mono === false ? "" : "brightness-0 invert"
                            }`}
                          />
                          )}
                        </div>
                      ) : (
                        <Image
                          key={`${copy}-${logo.src}`}
                          src={logo.src}
                          alt={copy === 0 ? logo.alt : ""}
                          width={345}
                          height={185}
                          className="h-20 w-auto flex-shrink-0 rounded-lg object-contain contrast-[1.18] md:h-24"
                        />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 3.5 The patterns, her "Pain accordion", which is the name she uses
          for it on slide 2 and spells out in her own note.

          IT IS THIRD ON THE PAGE NOW, straight after the logos. The paragraph
          below is the reason it used to sit below the services and is kept for
          the record, because it is the argument her slide 2 overrules rather
          than a description of where it is. PENDING-COPY 1f0.

          THE OLD REASON: MOVED below the services: having just read what
          Pivot Prime sells, the visitor now recognises their own symptom and
          knows which service it points to. Spec 3.5. */}
      {/* id and scroll-mt-28 mirror the #services section above, which is the
          only other anchor target on this page. The hero's first button points
          here. globals.css already gives every [id] a 7rem scroll-margin-top so
          a target does not land under the floating nav; scroll-mt-28 is the same
          7rem stated locally, which is how #services carries it. */}
      <section id="patterns" className="scroll-mt-28 surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container">
          {/* The heading is black again, on her 31 August instruction. It was
              black over cream chips, went green on 28 August with the chips,
              and is black over the white chips now. The eyebrow stays green:
              she named the heading only. Black on the page ground is 18.9:1
              against the 4.0:1 the mid green managed. */}
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-mid uppercase">
            {PATTERNS.eyebrow}
          </p>
          <h2 className="mb-7 sm:mb-10 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {PATTERNS.heading}
          </h2>
          <PatternsList />
        </div>
      </section>

      {/* Audiences Section / Chapter 03 — Who We Serve */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container">
          <PersonaSwitcher />
        </div>
      </section>

      {/* 3.3 Results, her "Measured Impact". Figures are green and count up on
          scroll; labels and context are in the standard body colour. Spec 3.3.

          IT NO LONGER SITS UNDER THE PROOF BAR. This block used to open with
          "Sits immediately under the proof bar, before the services: after 'we
          build it' the visitor's next thought is 'prove it'". Her slide 2 of 26
          September puts the pain accordion and Who we serve between the logos
          and this, so that sentence stopped being true and has gone rather than
          been left to mislead. Its own padding is small, 32px at 375 and 48px
          at 1440, which was chosen for the proof bar adjacency; the section
          above it now carries 56px and 96px of its own, so the space above this
          heading grew rather than collapsed. PENDING-COPY 1f0. */}
      {/* pb-28 below sm: clears the floating WhatsApp button so the last
          card does not end underneath it. PENDING-COPY 1ak. */}
      <section className="surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container">
          <header className="mb-3 sm:mb-4 max-w-3xl">
            <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-mid mb-3">
              MEASURED IMPACT
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {RESULTS.heading}
            </h2>
            <p className="mt-3 text-lg text-neutral-600 md:text-xl">{RESULTS.standfirst}</p>
          </header>

          <KpiCards />
        </div>
      </section>

      {/* 3.4 What do we actually do. NEW. The hero's secondary CTA anchors here. */}
      <section id="services" className="scroll-mt-28 surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container">
          <header className="mb-9 sm:mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-mid uppercase">
              {SERVICES_EYEBROW}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {SERVICES_HEADING}
            </h2>
          </header>

          <HomeServices />
        </div>
      </section>

      {/* 3.6 One accountable party REMOVED, 25 August.

          Her comment on slide 6 of Website Revisions 2208v3 reads, in full:
          "Remove this section". It covered the heading "Knowing what is wrong
          is hard. Being the one who has to fix it is harder.", four body
          paragraphs, the pull quote, the CTA, the Diagnose / Align / Rebuild /
          Embed cards and the process efficiency badge.

          SPEC 3.6 MARKS THIS SECTION "NEW", so the document asked for it and
          her comment removes it. The comment is dated 22 August and the
          document is v1.7.1, so the comment is the later instruction and wins.

          Every word is preserved in docs/PENDING-COPY.md 1w. ACCOUNTABLE stays
          in the content layer, unused, so restoring it is a re-render rather
          than a retype. */}

      {/* 3.7 The person behind it. Two columns always: portrait right on
          desktop, above the copy on mobile. When the portrait file has not
          yet been supplied the right column shows a branded placeholder so
          the layout does not collapse and the two-column intent is preserved.
          Spec 8.2: nothing is better than stock, so the placeholder uses
          initials + brand colour rather than any photography. Spec 3.7. */}
      <section className="surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container grid items-center gap-7 sm:gap-12 md:grid-cols-2">
          {/* Copy column — left on desktop */}
          <div>
            {/* HER v3 SLIDE 3 ADDS AN EYEBROW. There was none here: the section
                went straight into its H2, so this is a new element rather than a
                changed string. Same treatment as the other section eyebrows on
                this page, which is where the capitals come from. */}
            {/* Her slide 3 picture, measured 2 October: a little more space
                under it on a computer and slightly closer letters. This line
                only; the What we do eyebrow keeps its own. */}
            <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-mid uppercase md:mb-[22px]">
              {FOUNDER.eyebrow}
            </p>
            {/* HER SECOND PICTURE ON SLIDE 3, measured 2 October against the
                page it was taken from: the heading in ExtraBold with no
                tightening and close lines, the paragraphs at 1.8, and her
                spacing scaled to this heading's size (hers is 32px, this 36). */}
            <h2 className="mb-9 font-heavy text-3xl leading-[1.08] font-extrabold text-foreground md:text-4xl">
              {FOUNDER.heading}
            </h2>
            <div className="space-y-[22px]">
              {FOUNDER.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-[1.8] text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* A solid button on the navbar's shape language, not a bare text
                link: 12px radius, neon fill, forest text, the header CTA's
                padding scale. The other homepage arrow link, "More case
                studies", already carries it. */}
            {/* Her second picture's button, in ExtraBold with her short arrow
                and no shadow, at her size scaled to this heading. Its shape
                stays rectangular, her note [3] on the same slide. */}
            <Link
              href={FOUNDER.ctaHref}
              className="mt-11 inline-flex min-h-11 items-center justify-center gap-[11px] rounded-xl bg-neon px-8 py-[18px] font-heavy text-[13px] leading-[1.5] font-extrabold tracking-[0.08em] text-forest uppercase transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {FOUNDER.ctaLabel}
              <span aria-hidden="true" className="font-arrow leading-none">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Portrait column — right on desktop, top on mobile */}
          <div className="order-first md:order-last">
            {/* The portrait is supplied and committed, so there is no longer a
                placeholder branch. The one that stood here rendered an initials
                badge reading "Portrait coming soon" and became dead the moment
                the client sent the file. Removing it also clears the last
                inherited em dash, which lived in its aria-label. */}
            <Image
                src={FOUNDER.portrait.src}
                alt={FOUNDER.portrait.alt}
                width={720}
                height={900}
                className="aspect-[4/5] w-full rounded-2xl object-cover object-top"
              />
          </div>
        </div>
      </section>

      {/* 3.8 Case studies. KEEP. Placement is confirmed by the spec: directly
          after the founder section and before the personas, so the founder
          section establishes who is behind the work, the case studies prove it,
          and the personas then ask the visitor to place themselves. */}
      <section className="surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container">
          {/* Slide 8: the anonymised ones "sit only on the about page and you
              link to them", with a "more case studies" button here. */}
          <CaseStudies scope="homepage" />

          {/* On the shared left edge, her v3 slide 11: "all headings, cards and
              buttons start on the same left edge". It was centred. */}
          <div className="mt-8 sm:mt-12">
            <Link
              href="/about#case-studies"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-neon px-5 py-2.5 font-sans text-xs font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              More case studies
              <span aria-hidden="true" className="ml-2 text-base leading-none">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3.10 How we are paid. Dark card treatment — the performance-linked
          model is a differentiator and deserves visual weight. No percentage
          or formula published per spec 3.10. */}
      <section className="surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        {/* THE SHARED CONTAINER NOW, AND THAT REVERSES AN EARLIER INSTRUCTION
            OF HERS. This box was deliberately max-w-7xl: on 29 August she asked
            for it to run the full width horizontally, and 7xl was the widest
            container the page used. Her v3 slide 11 is later and asks for one
            content width on every section, which cannot hold if this one stays
            wider than the rest. So it is 1152 like everything else and is 128px
            narrower than it was. Flagged in PENDING-COPY 1g0 rather than changed
            quietly, because "full width" was her own word for it. */}
        <div className="page-container">
          {/* CREAM, from 29 August. She marked this box by its bright green bar
              and asked for the background to change; the bar and its writing are
              kept. Everything on it was written for a dark ground, so the
              heading, the lead and both lower boxes move to forest and mid.
              The dot grid was white at 7% and is invisible on cream, so it is
              forest at 6% instead: same texture, same idea, readable ground. */}
          {/* WHITE, from 31 August, matching the other cards on the page. It
              was cream, then mist on the EF instruction, and she has now taken
              it to white. The two comparison boxes and the calculator inside it
              keep the fills they have. The dot grid is what separates the white
              traditional-model box from the white panel behind it: the panel is
              textured, the box is flat with a border. */}
          <div className="relative overflow-hidden rounded-3xl border border-forest/10 bg-white px-5 py-8 sm:px-8 sm:py-12 md:px-12 md:py-14">
            {/* Dot-grid texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(1,51,37,0.06)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none"
            />

            {/* Content — her slide 9 of Website Revisions 2208v3, shown on the
                27 August call: eyebrow, the position line, the two-model
                contrast, and the commitment band. Everything that explained the
                model at length is gone, which is what "minimal" meant. */}
            <div className="relative z-10">
              {/* Her bright green bar and its writing, kept. The eyebrow moves
                  from neon to mid: neon on cream measures about 1.7:1 and is
                  unreadable. mid is the colour every other eyebrow on a light
                  ground already uses. */}
              <span className="mb-3 block text-xs font-bold tracking-[0.22em] text-mid uppercase">Our fees</span>
              <div className="mb-4 h-[3px] w-10 rounded-full bg-neon" aria-hidden="true" />

              <h2 className="max-w-2xl text-2xl font-extrabold leading-[1.1] tracking-tight text-forest sm:text-3xl md:text-4xl">
                {HOW_WE_ARE_PAID.mockupHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-snug text-mid sm:text-lg">
                {HOW_WE_ARE_PAID.lead}
              </p>

              {/* items-stretch, not items-start: her instruction of 29 August is
                  that the two comparison boxes are the same size. items-start let
                  each size to its own content, and ours carries two rows to their
                  one, so they never matched. */}
              <div className="mt-5 grid items-stretch gap-3 md:grid-cols-2">
                {/* Traditional model: white. Ours: cream. Both on a cream panel,
                    so the pair is separated by the border and the label colour
                    rather than by a light-against-dark contrast that no longer
                    exists now the panel itself is light. */}
                <div className="rounded-2xl border border-forest/10 bg-white p-5 sm:p-6">
                  {/* forest/70, not /55: on the white box the lighter tint measured 3.49:1
                      against a 4.5 requirement. This label is a neutral, not her
                      green, so darkening it costs the design nothing. */}
                  <p className="text-[11px] font-bold tracking-[0.18em] text-forest/70 uppercase">
                    {HOW_WE_ARE_PAID.contrast.traditional.label}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-forest sm:text-lg">
                    {HOW_WE_ARE_PAID.contrast.traditional.headline}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest/70 sm:text-base">
                    {HOW_WE_ARE_PAID.contrast.traditional.body[0]}
                  </p>
                </div>

                {/* Matches the Stretched Founder card, her 29 August instruction: the
                    card-dark fill via the same variable, border-neutral-100,
                    neon labels, white body. White on this fill is 13.99:1. */}
                <div className="card-dark rounded-2xl border border-neutral-100 p-5 sm:p-6">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-neon uppercase">
                    {HOW_WE_ARE_PAID.contrast.pivotPrime.label}
                  </p>
                  <dl className="mt-3 space-y-3">
                    {HOW_WE_ARE_PAID.contrast.pivotPrime.rows.map((row) => (
                      <div key={row.label}>
                        <dt className="text-[11px] font-bold tracking-[0.16em] text-neon uppercase">
                          {row.label}
                        </dt>
                        <dd className="mt-1 text-[13px] leading-relaxed text-white sm:text-sm">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* The calculator and her commitment band share a row from md up,
                  so the section carries the new block without growing.
                  PENDING-COPY 1an. */}
              {/* STACKED, NOT SIDE BY SIDE, from 29 August: the calculator takes
                  the row, and her "If we haven't" line runs horizontally across
                  the bottom underneath it. It shared a row with the calculator
                  before, which is the stacking she asked to remove. */}
              <div className="mt-3">
                <FeeCalculator />
              </div>

              {/* Her bottom band, verbatim. It is the section in one sentence.
                  Cream on cream, separated by its ring, with the writing in
                  forest now the ground is light. The two lines sit side by side
                  from sm up so the band reads as one horizontal rule across the
                  foot of the box rather than as two stacked lines. */}
{/* HER NAMED EXCEPTION, 30 and 31 August: this box stays dark
                  green with a clear heading. It was cream when she named it, so
                  honouring "stays dark green" meant returning it to dark.

                  THE HEADING IS A HEADING NOW. "Performance Linked Fee" was an
                  11px uppercase label trailing after the sentence, which is a
                  tag rather than the clear heading she asked for. It leads the
                  box at a legible size, and the small trailing label it used to
                  be is the extraneous text that goes with the change. No word of
                  hers is deleted: the sentence under it is her pull box
                  verbatim. PENDING-COPY 1b7. */}
              <div className="mt-3 rounded-2xl bg-forest px-5 py-5 text-center ring-1 ring-neon/40 sm:px-6">
                <h3 className="font-sans text-base font-bold tracking-tight text-neon sm:text-lg">
                  Performance linked fees
                </h3>
                <p className="mt-2 text-[15px] font-bold leading-snug text-white sm:text-lg">
                  {HOW_WE_ARE_PAID.commitment.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.11 Close / Banner Card (Chapter 05 Style) */}
      <section className="surface-page px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div className="page-container rounded-[32px] bg-forest text-white p-10 sm:p-14 md:p-20 relative overflow-hidden border border-white/10 shadow-2xl text-center">
          <div aria-hidden="true" className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-white">
            {/* SIZED WITH THE OTHER SECTION HEADINGS, her slide 9: "seems
                wrong size and the text is too big". Measured before changing
                anything. This heading ran 30 / 36 / 48 / 60px while every other
                section heading on the page runs 30 / 36 / 48 from
                "text-3xl md:text-4xl lg:text-5xl", so it was a step larger at
                768 and at 1440 and already matched at 375.

                The class list below is now that same ladder, character for
                character, rather than a new value chosen to look right: the
                sm:text-4xl that only this heading carried has gone with the
                lg:text-6xl, so all three breakpoints line up with its
                neighbours.

                ONE THING IS DELIBERATELY NOT COPIED ACROSS: the neighbours also
                carry text-foreground, which is right on the light page ground
                and would be dark text on dark inside this closer. Only the size
                ladder is matched; the colour is inherited from the panel as
                before. PENDING-COPY 1e7. */}
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl leading-tight">
              {CLOSE.heading}
            </h2>

            {/* Gated: the sentence promises a scored view in four minutes, which
                the contact page cannot honour. No substitute is invented, because
                the spec provides none. */}
            {DIAGNOSTIC_ENABLED && (
              <p className="mx-auto mb-7 sm:mb-10 max-w-2xl text-lg text-white/85">{CLOSE.standfirst}</p>
            )}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-8">
              <Link
                href={JOURNEY_CTA.href}
                className="inline-flex items-center justify-center rounded-xl bg-neon px-8 py-4 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-white hover:scale-105 shadow-lg focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
              >
                {JOURNEY_CTA.label}
              </Link>
              <a
                href={WHATSAPP_CTA.href}
                target={WHATSAPP_CTA.external ? "_blank" : undefined}
                rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-xl border border-white/40 backdrop-blur-md px-8 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all hover:border-neon hover:text-neon hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
              >
                {CLOSE.whatsappLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

