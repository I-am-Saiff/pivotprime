import Image from "next/image";
import Link from "next/link";
import { FOUNDER, PEOPLE, TEAM_ANCHOR, TEAM_INTRO, type Person } from "@/content/team";
import CaseStudies from "@/components/CaseStudies";
import { CASE_STUDIES_PULLQUOTE } from "@/content/case-studies";
import { ABOUT_HERO, BENCH, WHO_WE_ARE } from "@/content/about";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("about");

/**
 * The portrait tile. Her slide draws all four as initials on a dark tile; we
 * hold real photographs for three of them, so the tile takes a photo when there
 * is one and the monogram when there is not. Same shape either way, so a card
 * with initials does not read as a card that failed to load.
 */
function Portrait({ person, className }: { person: Person; className: string }) {
  if (person.photo) {
    return (
      <Image
        src={person.photo.src}
        alt={person.photo.alt}
        width={640}
        height={800}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 28rem, 100vw"
        className={`${className} object-cover object-top`}
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

export default function About() {
  return (
    <div className="flex min-h-screen flex-col pt-20 pb-16">
      {/* HERO, slide 21 */}
      <header className="relative overflow-hidden bg-forest py-20 text-white md:py-28">
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
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
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

      {/* MEET THE TEAM, slide 21. Anchor target for /about#team. */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8" id={TEAM_ANCHOR}>
        <div className="mx-auto max-w-6xl">
          <span className="mb-4 block text-xs font-bold tracking-[0.22em] text-mid uppercase">
            {TEAM_INTRO.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-forest md:text-4xl lg:text-5xl">
            {TEAM_INTRO.heading}
          </h2>

          {/* The founder card runs the full width, photograph beside the text,
              as the slide draws it. */}
          <article className="mt-12 overflow-hidden rounded-[28px] border border-forest/20 surface-page shadow-[0_16px_48px_rgba(1,51,37,0.06)]">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-12 md:gap-10 md:p-10">
              <div className="md:col-span-4 lg:col-span-3">
                <Portrait person={FOUNDER} className="aspect-[4/5] w-full rounded-2xl" />
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <p className="text-xs font-bold tracking-[0.18em] text-mid uppercase">
                  {FOUNDER.role}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-forest md:text-3xl">
                  {FOUNDER.name}
                </h3>
                <div className="mt-4 space-y-4">
                  {FOUNDER.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {FOUNDER.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-forest/15 bg-forest/[0.04] px-3 py-1.5 text-xs font-semibold text-forest"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* Three across at 1440, one at 360. Three in a two-column row would
              strand the third, so the middle step is skipped. */}
          <ul className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
            {PEOPLE.map((person) => (
              <li
                key={person.name}
                className="flex flex-col overflow-hidden rounded-[28px] border border-forest/20 surface-page shadow-[0_16px_48px_rgba(1,51,37,0.06)]"
              >
                <Portrait person={person} className="aspect-[4/5] w-full" />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-bold tracking-[0.18em] text-mid uppercase">
                    {person.role}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-forest">{person.name}</h3>
                  {person.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-4 leading-relaxed text-neutral-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {person.seat ? (
                    <p className="mt-6 inline-flex w-fit rounded-full border border-forest/15 bg-forest/[0.04] px-3 py-1.5 text-xs font-semibold text-forest lg:mt-auto lg:pt-1.5">
                      {person.seat}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE BENCH, slide 22. Twenty capability labels, verbatim. */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] bg-forest p-8 text-white md:p-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
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
                    className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/90"
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
      <section className="py-24" id="case-studies">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Her pull quote from pp-case-studies.html, in the position her own
              file gives it: directly above the studies. The slide 8 quote is a
              different thing and stays with the homepage section. */}
          <figure className="mx-auto mb-14 max-w-3xl border-l-4 border-mid pl-6 sm:pl-8">
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
      <section className="bg-forest px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold tracking-[0.22em] text-neon uppercase">Start here</p>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
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
