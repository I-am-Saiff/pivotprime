import Image from "next/image";
import Link from "next/link";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { CONTACT_CTA, HERO_CTA, JOURNEY_CTA, WHATSAPP_CTA } from "@/content/cta";
import {
  ACCOUNTABLE,
  CLIENT_LOGOS,
  CLIENT_LOGOS_HEADING,
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
          {/* Eyebrow */}
          <span className="mb-6 block text-xs font-bold tracking-[0.22em] text-neon uppercase">
            Operations · Strategy · Execution
          </span>

          {/* Neon accent rule */}
          <div className="mb-6 h-[3px] w-12 rounded-full bg-neon" aria-hidden="true" />

          <h1 className="max-w-4xl text-[2.6rem] leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {HERO.heading}
          </h1>

          {/* Lead — the most important sentence */}
          <p className="mt-6 max-w-2xl text-xl leading-snug font-semibold text-white/95 sm:text-2xl md:text-3xl">
            {HERO.lead}
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
      <section className="border-b border-neutral-100 bg-white py-14">
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

        {/* The strip's heading, as text. It used to be the first image in the
            carousel, so it was announced to a screen reader as a client logo and
            read by a crawler as nothing at all. */}
        <h2 className="mt-14 text-center font-sans text-xs font-bold tracking-[0.22em] text-neutral-500 uppercase">
          {CLIENT_LOGOS_HEADING}
        </h2>

        {/* TWO ROWS, OPPOSITE DIRECTIONS, matching the live site. Spec 3.2:
            the movement holds attention and is one of the few animations doing
            a job.

            The seven logos split four and three. A row of three does not fill
            1440 on its own, so each row repeats its own subset until the track
            is wide enough to have no visible gap as it loops, then the whole
            track is rendered twice and translated exactly -50%, which lands the
            second copy where the first began and makes the seam invisible.

            Only the first repetition of each row is announced. Every logo is
            therefore in the accessibility tree exactly once across both rows,
            and every logo is in the served HTML regardless.

            overflow-hidden on each row clips the track so neither can widen the
            document, which matters more with two rows than with one. */}
        <div className="mt-8 space-y-5">
          {[
            { logos: CLIENT_LOGOS.slice(0, 4), repeats: 3, animation: "animate-[marquee_40s_linear_infinite]" },
            { logos: CLIENT_LOGOS.slice(4), repeats: 3, animation: "animate-[marquee-reverse_40s_linear_infinite]" },
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="w-full overflow-hidden">
              {/* The animation is a class, not an inline style. As a style it
                  outranked motion-reduce:animate-none, so the strip kept moving
                  for anyone who had asked it not to. */}
              <div className={`flex w-max items-center ${row.animation} motion-reduce:animate-none`}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                    {Array.from({ length: row.repeats }).map((_, rep) => (
                      <div
                        key={rep}
                        className="flex items-center space-x-12 px-6"
                        aria-hidden={rep > 0}
                      >
                        {row.logos.map((logo) => (
                          <Image
                            key={`${copy}-${rep}-${logo.src}`}
                            src={logo.src}
                            alt={copy === 0 && rep === 0 ? logo.alt : ""}
                            // The source files are 345x185, so this is the
                            // largest variant available and a 96px card stays
                            // inside 2x on a high-density screen.
                            width={345}
                            height={185}
                            // The marks are white on a dark gradient baked into
                            // the file. opacity-70 faded the whole card toward
                            // the white page, which lightened the gradient and
                            // dimmed the mark at the same time, so it cost
                            // contrast twice over. Full opacity plus a small
                            // contrast lift pushes the whites whiter and the
                            // gradient darker without making the strip brighter.
                            className="h-20 w-auto rounded-lg object-contain contrast-[1.18] md:h-24"
                          />
                        ))}
                      </div>
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
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
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
      <section id="services" className="scroll-mt-28 bg-white px-4 pb-24 sm:px-6 lg:px-8">
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
      <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
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

      {/* 3.6 One accountable party / Chapter 01: The Gap */}
      <section className="bg-forest px-4 py-24 text-white sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          {/* Two lines, not three. The measure is widened and the size lifted
              one step at each breakpoint. Measured at 360, 768 and 1440 rather
              than eyeballed; the line count is asserted below the fold of this
              file's review, in the commit body. */}
          <h2 className="mb-8 max-w-5xl text-[1.625rem] leading-[1.15] font-extrabold tracking-tight sm:text-[2.125rem] md:text-5xl lg:text-[3.5rem]">
            {ACCOUNTABLE.heading}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
            {/* Left side: Body copy & Pull quote */}
            <div className="lg:col-span-6 space-y-6">
              {ACCOUNTABLE.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/85 text-base md:text-lg">
                  {paragraph}
                </p>
              ))}

              <blockquote className="my-8 border-l-2 border-neon pl-6 text-lg md:text-xl leading-snug font-semibold text-white/95">
                {ACCOUNTABLE.pullQuote}
              </blockquote>

              <div className="pt-2">
                <Link
                  href={CONTACT_CTA.href}
                  className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
                >
                  {ACCOUNTABLE.ctaLabel}
                  <span aria-hidden="true" className="ml-2 text-base leading-none">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side: 2x2 Glassmorphic Feature Grid + Stat Badge */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">01</span>
                  <h3 className="text-white font-bold text-lg mb-2">Diagnose</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    We look at how decisions are made, how work flows, and where accountability quietly breaks down.
                  </p>
                </div>

                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">02</span>
                  <h3 className="text-white font-bold text-lg mb-2">Align</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    Strategy stops living on paper. We connect it to owners, sequence, and the operating rhythm of the week.
                  </p>
                </div>

                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">03</span>
                  <h3 className="text-white font-bold text-lg mb-2">Rebuild</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    We remove duplicated work and legacy drag, then rebuild the process so it holds without you.
                  </p>
                </div>

                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">04</span>
                  <h3 className="text-white font-bold text-lg mb-2">Embed</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    We work alongside your team until the new way is the normal way, and growth becomes repeatable.
                  </p>
                </div>
              </div>

              {/* Glass Stat Badge */}
              <div className="glass-badge-dark rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-neon tracking-tight">+40–60%</div>
                  <p className="text-xs text-white/80 font-medium mt-1">
                    reduction in duplicated work, rework and inefficiencies
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-neon/20 flex items-center justify-center text-neon shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.7 The person behind it. Two columns always: portrait right on
          desktop, above the copy on mobile. When the portrait file has not
          yet been supplied the right column shows a branded placeholder so
          the layout does not collapse and the two-column intent is preserved.
          Spec 8.2: nothing is better than stock, so the placeholder uses
          initials + brand colour rather than any photography. Spec 3.7. */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
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
      <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CaseStudies />
        </div>
      </section>

      {/* Audiences Section / Chapter 03 — Who We Serve */}
      <section className="py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <PersonaSwitcher />
        </div>
      </section>

      {/* 3.10 How we are paid. Dark card treatment — the performance-linked
          model is a differentiator and deserves visual weight. No percentage
          or formula published per spec 3.10. */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            {/* Dot-grid texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 grid gap-10 md:grid-cols-2 md:gap-16 md:items-start">
              {/* Left — heading block */}
              <div>
                <div className="mb-5 h-[3px] w-10 rounded-full bg-neon" aria-hidden="true" />
                <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight md:text-4xl">
                  {HOW_WE_ARE_PAID.heading}
                </h2>

                {/* Lead sentence — neon highlight */}
                <p className="mt-5 text-lg font-semibold leading-snug text-neon md:text-xl">
                  {HOW_WE_ARE_PAID.lead}
                </p>

                {/* Outcome badge */}
                <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-neon/30 bg-neon/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-neon flex-shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold tracking-wider text-neon uppercase">
                    Performance-linked fees
                  </span>
                </div>
              </div>

              {/* Right — body copy */}
              <div className="space-y-5">
                {HOW_WE_ARE_PAID.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="leading-relaxed text-white/80 text-sm sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {/* The pricing model, stated in prose. Spec section 1 allows one
                    price on the whole site and spec 3.10 bars a percentage or a
                    formula here, so the model is described rather than worked
                    through. PENDING-COPY 1h. */}
                <div className="mt-8 rounded-2xl border border-neon/25 bg-neon/[0.07] p-5">
                  <p className="text-xs font-bold tracking-[0.18em] text-neon uppercase">
                    How the fee is built
                  </p>
                  {HOW_WE_ARE_PAID.structure.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Bottom strip — what it means in practice */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 flex gap-4 items-start">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neon/15 text-neon">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Every engagement starts with a measurement baseline. That baseline is what our outcome-linked fee is held against.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.11 Close / Banner Card (Chapter 05 Style) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
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

