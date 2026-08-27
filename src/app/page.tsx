import Image from "next/image";
import Link from "next/link";
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
import ServiceCards from "@/components/ServiceCards";
import PatternsList from "@/components/PatternsList";
import CaseStudies from "@/components/CaseStudies";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import KpiCards from "@/components/KpiCards";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 3.1 Hero */}
      <section className="relative flex min-h-[100svh] items-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 lg:px-8">
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

        <div className="relative z-10 mx-auto w-full max-w-6xl text-white">
          {/* Eyebrow. HER WORDS AND HER ORDER, from the slide 1 comment:
              "Strategy, Operations, technology, execution at the top." The four
              words replace an "Operations · Strategy · Execution" that was ours:
              it is in neither the copy document, nor the live site, nor any
              mockup. Styling and position unchanged. PENDING-COPY 1ah. */}
          {/* Below sm the four words need two lines. With the separators in
              the flow the break landed after "Technology", so the second line
              opened with an orphaned "·". The dots are decorative, so they are
              hidden below sm and the words wrap as words. The separators return
              at sm, where the line fits. PENDING-COPY 1ah. */}
          <span className="mb-6 flex flex-wrap gap-x-2 text-xs font-bold tracking-[0.22em] text-neon uppercase">
            {["Strategy", "Operations", "Technology", "Execution"].map((word, i) => (
              <span key={word} className="contents">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden sm:block">
                    ·
                  </span>
                )}
                <span>{word}</span>
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
            <span className="block text-neon">{HERO.leadStrong}</span>
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
            {HERO.body}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={HERO_CTA.href}
              className="inline-flex items-center justify-center rounded-full bg-neon px-7 py-3.5 text-xs font-bold tracking-wider text-forest uppercase shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {HERO_CTA.label}
            </Link>

            <a
              href={HERO.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-md px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-200 hover:border-white/60 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              {HERO.secondaryLabel}
            </a>
          </div>

          {DIAGNOSTIC_ENABLED && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70">
              {HERO.diagnosticExplainer}
            </p>
          )}

          {/* Social proof micro-line */}
          <p className="mt-10 text-xs text-white/50 tracking-wide">
            Trusted by SMEs across insurance, fintech, wellness &amp; retail.
          </p>
        </div>
      </section>

      {/* 3.2 Proof bar. MOVE: the logo rows sat buried inside a later section
          and belong directly under the hero. */}
      <section className="border-b border-neutral-100 bg-shell py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-base font-medium text-neutral-600 md:text-lg">
            {PROOF.trusted}
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-neutral-500">
            {PROOF.featuredPrefix}
            {PROOF.publications.map((pub, i) => (
              <span key={pub.href}>
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={pub.title}
                  className="font-semibold text-mid underline underline-offset-2 hover:text-forest"
                >
                  {pub.name}
                </a>
                {i === 0 ? " and " : "."}
              </span>
            ))}
          </p>
        </div>

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
        <div className="mt-10 space-y-5">
          {LOGO_GROUPS.map((group, rowIndex) => (
            <div key={group.label} className="w-full overflow-hidden">
              <div
                className={`flex w-max items-center ${
                  rowIndex % 2 === 0
                    ? "animate-[marquee_46s_linear_infinite]"
                    : "animate-[marquee-reverse_46s_linear_infinite]"
                } motion-reduce:animate-none`}
              >
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex items-center space-x-12 px-6"
                    aria-hidden={copy === 1}
                  >
                    <h3 className="flex h-20 w-56 flex-shrink-0 items-center justify-center rounded-lg border border-forest/15 bg-forest/[0.04] px-5 text-center font-sans text-xs font-bold tracking-[0.14em] text-forest uppercase md:h-24 md:w-64">
                      {group.label}
                    </h3>
                    {group.logos.map((logo) => (
                      <Image
                        key={`${copy}-${logo.src}`}
                        src={logo.src}
                        alt={copy === 0 ? logo.alt : ""}
                        width={345}
                        height={185}
                        className="h-20 w-auto flex-shrink-0 rounded-lg object-contain contrast-[1.18] md:h-24"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.3 Results. NEW. Sits immediately under the proof bar, before the
          services: after "we build it" the visitor's next thought is "prove it".
          Figures are green and count up on scroll; labels and context are in the
          standard body colour. Spec 3.3. */}
      {/* pb-28 below sm: clears the floating WhatsApp button so the last
          card does not end underneath it. PENDING-COPY 1ak. */}
      <section className="bg-shell px-4 pt-20 pb-28 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 max-w-3xl">
            <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-mid mb-3">
              MEASURED IMPACT
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {RESULTS.heading}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 md:text-xl">{RESULTS.standfirst}</p>
          </header>

          <KpiCards />
        </div>
      </section>

      {/* 3.4 What do we actually do. NEW. The hero's secondary CTA anchors here. */}
      <section id="services" className="scroll-mt-28 bg-shell px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-mid uppercase">
              {SERVICES_EYEBROW}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {SERVICES_HEADING}
            </h2>
          </header>

          <ServiceCards />
        </div>
      </section>

      {/* 3.5 The patterns. MOVED below the services: having just read what
          Pivot Prime sells, the visitor now recognises their own symptom and
          knows which service it points to. Spec 3.5. */}
      <section className="bg-shell px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-neon uppercase">
            {PATTERNS.eyebrow}
          </p>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {PATTERNS.heading}
          </h2>
          <PatternsList />
        </div>
      </section>

      {/* 3.6 One accountable party REMOVED, 25 August.

          Her comment on slide 6 of Website Revisions 2208v3 reads, in full:
          "Remove this section". It covered the heading "Knowing what is wrong
          is hard. Being the one who has to fix it is harder.", four body
          paragraphs, the pull quote, the CTA, the Diagnose / Align / Rebuild /
          Embed cards and the 40-60% badge.

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
      <section className="bg-shell px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid items-center gap-12 md:grid-cols-2">
          {/* Copy column — left on desktop */}
          <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              {FOUNDER.heading}
            </h2>
            <div className="space-y-5">
              {FOUNDER.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={FOUNDER.ctaHref}
              className="mt-8 inline-flex items-center text-sm font-bold text-forest uppercase hover:text-mid"
            >
              {FOUNDER.ctaLabel}
              <span aria-hidden="true" className="ml-2 text-lg leading-none">
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
      <section className="bg-shell px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Slide 8: the anonymised ones "sit only on the about page and you
              link to them", with a "more case studies" button here. */}
          <CaseStudies scope="homepage" />

          <div className="mt-12 text-center">
            <Link
              href="/about#case-studies"
              className="inline-flex items-center justify-center rounded-full border border-forest/25 px-8 py-4 font-sans text-xs font-bold tracking-wider text-forest uppercase transition-colors hover:border-forest hover:bg-forest hover:text-white focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              More case studies
              <span aria-hidden="true" className="ml-2 text-base leading-none">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Audiences Section / Chapter 03 — Who We Serve */}
      <section className="py-24 bg-linen/40 px-4 sm:px-6 lg:px-8 border-t border-forest/[0.06]">
        <div className="max-w-6xl mx-auto">
          <PersonaSwitcher />
        </div>
      </section>

      {/* 3.10 How we are paid. Dark card treatment — the performance-linked
          model is a differentiator and deserves visual weight. No percentage
          or formula published per spec 3.10. */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 bg-shell">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            {/* Dot-grid texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none"
            />

            {/* Content — her layout from pp-fees_3 and pp-fees_4, restructured
                26 August to lose roughly half its height. Nothing of hers is
                cut: the contrast and the commitment stay in view and the
                supporting detail moves behind a native <details>, which is in
                the served HTML open or closed. PENDING-COPY 1al. */}
            <div className="relative z-10">
              <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-neon uppercase">Our fees</span>
              <div className="mb-5 h-[3px] w-10 rounded-full bg-neon" aria-hidden="true" />

              {/* The searchable H2 and an answerable first line beneath it. */}
              <h2 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
                {HOW_WE_ARE_PAID.seoHeading}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                {HOW_WE_ARE_PAID.seoAnswer}
              </p>

              <p className="mt-6 max-w-3xl text-lg font-semibold leading-snug text-neon md:text-xl">
                {HOW_WE_ARE_PAID.mockupHeading} {HOW_WE_ARE_PAID.lead}
              </p>

              {/* Her contrast, side by side and tighter. */}
              <div className="mt-8 grid items-start gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-white/55 uppercase">
                    {HOW_WE_ARE_PAID.contrast.traditional.label}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-white/85">
                    {HOW_WE_ARE_PAID.contrast.traditional.headline}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {HOW_WE_ARE_PAID.contrast.traditional.body.join(" ")}
                  </p>
                </div>

                <div className="rounded-2xl border border-neon/30 bg-neon/[0.07] p-5 sm:p-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-neon uppercase">
                    {HOW_WE_ARE_PAID.contrast.pivotPrime.label}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {HOW_WE_ARE_PAID.contrast.pivotPrime.headline}
                  </h3>
                  <dl className="mt-3 space-y-2">
                    {HOW_WE_ARE_PAID.contrast.pivotPrime.rows.map((row) => (
                      <div key={row.label}>
                        <dt className="text-[11px] font-bold tracking-[0.16em] text-neon uppercase">
                          {row.label}
                        </dt>
                        <dd className="text-sm leading-relaxed text-white/85">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Her commitment line stays in view: it is the section in one sentence. */}
              <blockquote className="mt-6 rounded-2xl border-l-4 border-neon bg-white/[0.06] px-5 py-4 sm:px-7 sm:py-5">
                <p className="text-xs font-bold tracking-[0.18em] text-neon uppercase">
                  {HOW_WE_ARE_PAID.commitment.label}
                </p>
                <p className="mt-2 text-base font-bold leading-snug text-white sm:text-lg">
                  {HOW_WE_ARE_PAID.commitment.body}
                </p>
              </blockquote>

              {/* Everything below is in the served HTML whether open or shut.
                  <details> needs no JavaScript and no state. */}
              <details className="group/fees mt-6 rounded-2xl border border-white/12 bg-white/[0.03]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold tracking-wide text-neon uppercase sm:px-7 [&::-webkit-details-marker]:hidden">
                  How the work is measured, and how it runs
                  <span
                    aria-hidden="true"
                    className="text-lg leading-none transition-transform duration-200 group-open/fees:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>

                <div className="space-y-6 px-5 pb-6 sm:px-7">
                  <div className="grid gap-5 md:grid-cols-2">
                    {HOW_WE_ARE_PAID.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-sm leading-relaxed text-white/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <ol className="grid gap-4 md:grid-cols-3">
                    {HOW_WE_ARE_PAID.sequence.map((step, i) => (
                      <li key={step.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <span
                          aria-hidden="true"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neon/15 font-sans text-xs font-extrabold text-neon"
                        >
                          {i + 1}
                        </span>
                        <p className="mt-3 text-sm font-bold text-white">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">{step.body}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="rounded-xl border border-neon/25 bg-neon/[0.07] p-4 sm:p-5">
                    <p className="text-xs font-bold tracking-[0.18em] text-neon uppercase">
                      How the fee is built
                    </p>
                    {HOW_WE_ARE_PAID.structure.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-2 text-sm leading-relaxed text-white/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/15 text-neon">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed text-white/70">
                      Every engagement starts with a measurement baseline. That baseline is what our outcome-linked fee is held against.
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* 3.11 Close / Banner Card (Chapter 05 Style) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-shell">
        <div className="mx-auto max-w-6xl rounded-[32px] bg-forest text-white p-10 sm:p-14 md:p-20 relative overflow-hidden border border-white/10 shadow-2xl text-center">
          <div aria-hidden="true" className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-white">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {CLOSE.heading}
            </h2>

            {/* Gated: the sentence promises a scored view in four minutes, which
                the contact page cannot honour. No substitute is invented, because
                the spec provides none. */}
            {DIAGNOSTIC_ENABLED && (
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/85">{CLOSE.standfirst}</p>
            )}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-8">
              <Link
                href={JOURNEY_CTA.href}
                className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-white hover:scale-105 shadow-lg focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
              >
                {JOURNEY_CTA.label}
              </Link>
              <a
                href={WHATSAPP_CTA.href}
                target={WHATSAPP_CTA.external ? "_blank" : undefined}
                rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full border border-white/40 backdrop-blur-md px-8 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all hover:border-neon hover:text-neon hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
              >
                {WHATSAPP_CTA.label}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

