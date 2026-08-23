import Link from "next/link";
import { PEOPLE, ROLES, TEAM_ANCHOR, TEAM_INTRO } from "@/content/team";
import CaseStudies from "@/components/CaseStudies";
import { RELOCATED_TO_ABOUT } from "@/content/homepage";
import { WHY_WE_EXIST } from "@/content/about";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("about");


export default function WhoWeAre() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          From pressure to Prime State
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          <span className="text-primary font-bold">Not traditional consultants, we are your execution partners.</span>
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          We have worked inside complex systems, managing targets, navigating real constraints, and carrying responsibility for results.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          We have also stepped back as advisors, to question what actually drives progress when effort is high but outcomes are not changing.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
          Pivot Prime exists because we have lived both sides. We understand what it takes to move work forward when plans meet pressure, people, and reality.
        </p>
      </section>

      {/* 6.1 Why Pivot Prime exists. NEW, and placed at the very top,
          immediately under the H1 and before "From pressure to Prime State",
          as the spec requires. */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {WHY_WE_EXIST.heading}
          </h2>
          <div className="space-y-5">
            {WHY_WE_EXIST.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600 md:text-lg">
                {paragraph}
              </p>
            ))}
            <p className="leading-relaxed text-neutral-600 md:text-lg">
              <Link
                href={WHY_WE_EXIST.founderSentence.nameHref}
                className="font-semibold text-mid underline underline-offset-2 hover:text-forest"
              >
                {WHY_WE_EXIST.founderSentence.name}
              </Link>
              {WHY_WE_EXIST.founderSentence.rest}
            </p>
          </div>
          <a
            href={WHY_WE_EXIST.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-md border border-forest/20 px-6 py-3 text-sm font-bold text-forest uppercase transition-colors hover:bg-forest/[0.04]"
          >
            {WHY_WE_EXIST.ctaLabel}
            <span aria-hidden="true" className="ml-2 text-lg leading-none">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Relocated from the homepage. Neither section appears anywhere in the
          spec's 3.1 to 3.12 running order, so leaving them there would
          contradict the spec and deleting them would discard copy the spec never
          asked to lose. "We have sat in the system" reads as authority copy
          here rather than as homepage filler. Recorded in
          docs/PENDING-COPY.md 2.4 so the move can be vetoed without anyone
          rewriting anything. */}
      {RELOCATED_TO_ABOUT.map((section) => (
        <section key={section.heading} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              {section.heading}
            </h2>
            <p className="mb-8 text-2xl font-medium text-mid md:text-3xl">{section.standfirst}</p>
            <div className="space-y-5">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="leading-relaxed text-neutral-600 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Four Pillars Summary */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">At Pivot Prime, we bring four things into every engagement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We structure problem solving</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We embed operational discipline</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We enable data tracking</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We understand human behaviour</div>
          </div>
          
          <p className="text-xl font-medium text-gray-700">
            We help unlock the version of the business that is possible when structure, people, operations, and data work together: <span className="font-bold text-black">Your Prime State.</span>
          </p>
        </div>
      </section>

      {/* Four Pillars Detail */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We structure problem solving</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              We take problems that feel tangled and surface the full picture, making sure nothing important is missed. We help leaders see gaps, dependencies, and risks that are often overlooked when everything is treated as one big issue.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We embed operational discipline</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              We put structure behind execution through clear ownership, decision frameworks, and practical operating rhythms. Standard ways of working are defined so progress does not depend on individual heroics or constant follow up.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We enable data tracking</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              We build practical dashboards based on the data and KPIs that actually matter for your business. These dashboards give leaders a reliable way to track progress, spot issues early, and make informed decisions without digging through spreadsheets.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We understand human behaviour</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              Strategies only hold when they fit the culture, capacity, and motivations of the people expected to deliver them. We work with how teams actually operate under pressure, how leaders influence action, and where resistance or fatigue shows up.
            </p>
          </div>

        </div>
      </section>

      {/* Team, spec 6.3. Anchor target for /about#team, linked from the About
          dropdown. Layer one is roles, which never change. Layer two is named
          people and is still partly blocked on spec 10 decision 2. */}
      <section className="py-24" id={TEAM_ANCHOR}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-14 max-w-3xl">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              {TEAM_INTRO.heading}
            </h2>
            <p className="mb-6 text-xl font-medium text-mid md:text-2xl">{TEAM_INTRO.standfirst}</p>
            {TEAM_INTRO.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mb-4 leading-relaxed text-neutral-600">
                {paragraph}
              </p>
            ))}
          </header>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role) => (
              <li
                key={role.title}
                className="rounded-xl border border-forest/10 bg-forest/[0.04] p-8"
              >
                <h3 className="mb-3 text-lg font-bold text-forest">{role.title}</h3>
                <p className="leading-relaxed text-neutral-600">{role.body}</p>
              </li>
            ))}
          </ul>

          {/* Spec 6.3 requires this grid to render correctly with an empty
              bench, so the remaining people can drop in without a layout change. */}
          {PEOPLE.length > 0 && (
            <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              {PEOPLE.map((person) => (
                <li key={person.name} className="rounded-xl border border-neutral-200 p-8">
                  <h3 className="text-xl font-extrabold text-foreground">{person.name}</h3>
                  <p className="mt-1 mb-4 text-sm font-bold tracking-wide text-mid uppercase">
                    {person.role}
                  </p>
                  <p className="leading-relaxed text-neutral-600">{person.credential}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* THE BENCH — structure only, deliberately empty.
          The 23 August About mockup lists around twenty capability labels. None
          is in the spec, so none is published. The section renders its heading
          and standfirst and nothing else, so the labels drop into a shape that
          already exists rather than arriving with a layout change.
          PENDING-COPY 1i. */}
      <section className="bg-forest py-24" id="bench">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            One partnership. Every capability you need.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
            We draw on a bench of specialists we have worked with, vetted and trust. You manage one
            relationship with us, and we manage the rest.
          </p>
          <ul className="mt-10 flex flex-wrap gap-3" aria-label="Bench capabilities" />
        </div>
      </section>

      {/* Section 6 keeps the case studies on /about behind the #case-studies
          anchor. Same source as the homepage 3.8 section so the two cannot
          drift. */}
      <section className="bg-gray-50 py-24" id="case-studies">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CaseStudies />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-forest text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 font-bold tracking-wide uppercase text-white bg-primary hover:bg-neon/90 transition-colors rounded-md shadow-xl text-lg group">
            Book your first conversation <span className="ml-3 font-normal text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
