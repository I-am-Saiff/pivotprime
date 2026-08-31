"use client";

import { useState } from "react";
import Link from "next/link";

interface PersonaData {
  id: string;
  tabLabel: string;
  tabNumber: string;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  quote: string;
  /**
   * Slide 9: "Industries all to be in caps e.g. Regional Retail Group."
   * The industry is capitalised; the role and the city are not, following her
   * own example, which capitalises only the industry.
   */
  author: string;
  bullets: string[];
}

const PERSONAS: PersonaData[] = [
  // Slide 9: "put stretched founder first please, then SME, then corporate
  // innovator and lastly the mid market execution owner", which slide 20
  // renames to P&L owner.
  {
    id: "founder",
    tabNumber: "04",
    tabLabel: "Stretched founder",
    heading: "You built something real, and everything still runs through you.",
    ctaLabel: "See what you can take off your plate",
    ctaHref: "/for-founders",
    quote: "Taking a two-week holiday without the business stopping was the proof it actually worked.",
    author: "Founder & CEO, Tech-enabled logistics · Dubai",
    bullets: [
      "Every major decision lands back on your desk every single day.",
      "You are simultaneously the glue, the chief salesperson, and the backstop.",
      "Stepping away from the office for two weeks feels genuinely risky.",
      "You need systems, documentation, and placed leaders to run without you.",
    ],
  },
  {
    id: "sme",
    tabNumber: "01",
    tabLabel: "Scaling SME leader",
    heading: "You're running an SME that is growing but not settled.",
    ctaLabel: "Make your business predictable",
    ctaHref: "/for-smes",
    quote: "Margins stopped swinging month to month once the operating rhythm was fixed.",
    author: "Managing Director, Insurance brokerage · Dubai",
    bullets: [
      "Some months feel smooth, others feel like starting from scratch.",
      "Revenue is up, but margins are unpredictable.",
      "Your team is capable, but stretched.",
      "You want to scale like a real company, not just keep surviving.",
    ],
  },
  {
    id: "corporate",
    tabNumber: "02",
    tabLabel: "Corporate innovator",
    heading: "You are expected to deliver change without the team it really takes.",
    ctaLabel: "Get execution support",
    ctaHref: "/for-corporate-leaders",
    quote: "We launched our new venture in 90 days with placed leadership and zero permanent payroll bloat.",
    // Slide 9: "For corporate innovator quote put Qatar not Riyadh".
    author: "VP Innovation, Regional retail group · Qatar",
    bullets: [
      "You carry delivery, risk and outcomes without enough headcount.",
      "Hiring is slow, and permanent payroll expansion is off the table.",
      "Legacy processes and committee friction slow your velocity.",
      "You need high-calibre hands-on capability to ship initiatives now.",
    ],
  },
  {
    id: "pl-owner",
    tabNumber: "03",
    // Slide 20: "On the main home page too it should read as P&L owners".
    tabLabel: "P&L owner",
    heading: "The business is stable, but strategic momentum is hard to create.",
    ctaLabel: "Design the execution roadmap",
    ctaHref: "/for-pl-owners",
    quote: "Every team finally knows their numbers and operating cadence. Noise turned into rhythm.",
    author: "Chief Operating Officer, Distribution group · Abu Dhabi",
    bullets: [
      "Progress is slow and organisational change feels expensive.",
      "Every new strategic initiative competes with ten legacy tasks.",
      "Execution happens, but not always aligned in the direction you intend.",
      "You need structural governance and predictable execution cadences.",
    ],
  },
];

export default function PersonaSwitcher() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full">
      {/* Chapter header */}
      <div className="mb-7 sm:mb-10 text-left max-w-3xl">
        {/* Her wording, slide 9: "Shouldn't be chapter anything - only WHO WE SERVE". */}
        <span className="mb-3 block font-sans text-xs font-semibold tracking-[0.22em] text-mid uppercase">Who we serve</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-forest mb-5">
          You don’t have to figure it all out alone.
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Whether you’re building, scaling, or holding everything together, we work with
          people who lead from the front and carry the pressure every day.
        </p>
      </div>

      {/* Segmented Tab Bar */}
      <div className="w-full overflow-x-auto pb-3 mb-8 scrollbar-hide">
        <div className="inline-flex rounded-2xl bg-neutral-100/80 p-1.5 border border-neutral-200/80 backdrop-blur-md">
          {PERSONAS.map((persona, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex min-h-11 items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-neon text-forest shadow-sm font-bold"
                    : "text-neutral-600 hover:text-forest hover:bg-white/50"
                }`}
              >
                <span className={`text-[10px] tracking-wider font-bold ${isActive ? "text-forest/70" : "text-neutral-400"}`}>
                  {persona.tabNumber}
                </span>
                <span>{persona.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Persona Detail Cards (All rendered for SEO/crawlers, hidden with CSS/attribute) */}
      <div className="relative">
        {PERSONAS.map((persona, idx) => {
          const isVisible = activeIdx === idx;
          return (
            <div
              key={persona.id}
              hidden={!isVisible}
              className="frosted-card-light rounded-[28px] px-8 pt-8 pb-14 transition-all duration-300 sm:pb-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                {/* Left Column: Heading, CTA, Quote */}
                <div className="lg:col-span-7 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest leading-tight mb-8 max-w-xl">
                    {persona.heading}
                  </h3>

                  <div className="mb-8">
                    <Link
                      href={persona.ctaHref}
                      className="inline-flex items-center justify-center rounded-xl bg-neon px-6 py-3.5 text-xs font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-forest hover:text-white hover:scale-105"
                    >
                      {persona.ctaLabel}
                      <span aria-hidden="true" className="ml-2 text-base leading-none">
                        →
                      </span>
                    </Link>
                  </div>

                  {/* Quote Container */}
                  <div className="rounded-2xl border border-forest/10 bg-mist p-6 mt-auto">
                    <p className="text-base sm:text-lg font-semibold text-forest leading-snug mb-3">
                      “{persona.quote}”
                    </p>
                    <span className="block text-xs font-medium text-neutral-500">
                      {persona.author}
                    </span>
                  </div>
                </div>

                {/* Right Column: Bullets */}
                <div className="lg:col-span-5 card-dark rounded-2xl p-6 md:p-8 border border-neutral-100">
                  <span className="block text-xs font-bold uppercase tracking-wider text-mid mb-6">
                    What this looks like:
                  </span>
                  <ul className="space-y-4">
                    {persona.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3.5">
                        <span
                          className="mt-1.5 h-2 w-2 rounded-full bg-neon shrink-0 shadow-[0_0_8px_rgba(0,215,109,0.8)]"
                          aria-hidden="true"
                        />
                        <span className="text-sm md:text-base text-neutral-700 leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
