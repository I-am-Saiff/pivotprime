/**
 * The five service cards, spec 3.4.
 *
 * Spec 4 says the /services parent page "lists all five in the order below, with
 * the card copy from 3.4 and a link each. No new copy needed for it", so this is
 * the single source for both the parent page and the homepage services section.
 *
 * Copy is verbatim. The spec sets card headings in capitals, which is styling
 * rather than copy: the same services are written in sentence case in their own
 * page headings in 4.1 to 4.5. Titles are stored in sentence case and the card
 * applies capitals in CSS, so the string stays readable to a screen reader.
 *
 * Order is deliberate and must not be alphabetised. Spec 2.1: "The audit is
 * first because it is the entry point and the only priced offer. The retainer is
 * second because it is the destination."
 */

export type ServiceCard = {
  slug: string;
  title: string;
  /** The single line where a figure or its absence sits. Spec 3.4 requires this
   *  in the same position and type size on every card so the row stays balanced. */
  priceLine: string;
  body: string[];
  /** What the price depends on, so a buyer can place themselves before a number
   *  is discussed. Spec pricing rule. */
  scopeLine: string;
  ctaLabel: string;
  href: string;
};

export const SERVICES: ServiceCard[] = [
  {
    slug: "operational-clarity-audit",
    title: "Operational Clarity Audit",
    // The only published figure on the entire site. Spec pricing rule: a floor,
    // never a range, and no ceiling anywhere even if one appears in an older file.
    priceLine: "From AED 15,000",
    body: [
      "We map how the business actually runs today: process, bottlenecks, founder dependency, margin leakage, and where technology genuinely helps. You get a prioritised roadmap of what to fix and in what order. Most engagements start here.",
    ],
    scopeLine:
      "Scope depends on the size of the business, how many functions are in review, and how many people we interview.",
    ctaLabel: "See what the audit covers",
    href: "/services/operational-clarity-audit",
  },
  {
    slug: "fractional-leadership",
    title: "Fractional COO, CFO and Chief of Staff",
    priceLine: "Scoped per engagement",
    body: [
      "COO, Chief of Staff and CFO seats, for businesses that need executive capability for a season rather than a lifetime.",
      "We build the operating model, run the weekly execution, then hand it to an operations lead, ours or yours, so the structure holds long after the intensive phase ends. Where the constraint is the numbers rather than the operation, a fractional CFO takes cash, forecasting, board reporting and fundraising readiness.",
    ],
    scopeLine:
      "Priced on the days a month, the seniority of the seat, and how much of the delivery team sits underneath it.",
    ctaLabel: "How the fractional leadership works",
    // Spec 2.1 lists /services/fractional-leadership while 4.2 and the 3.4 card button
    // say /services/fractional-leadership. Holding the COO slug so it matches the
    // nav label and the market's search term. The other redirects here.
    // See docs/PENDING-COPY.md section 2.1.
    href: "/services/fractional-leadership",
  },
  {
    slug: "build-and-place",
    title: "Build and Place",
    priceLine: "Scoped per engagement",
    body: [
      "We put people inside your business to execute the fix rather than leaving you to run it yourself. Project managers, fractional CFOs, engineers and marketers, sourced, vetted and managed by us.",
    ],
    scopeLine: "Priced on the roles, the days a month and the length of the engagement.",
    ctaLabel: "How we staff an engagement",
    href: "/services/build-and-place",
  },
  {
    slug: "technology-builds",
    title: "Technology Builds",
    priceLine: "Scoped per engagement",
    body: [
      "Websites, CRMs, workflow automation, dashboards and AI where it genuinely removes cost.",
      "A standalone service. Come to us with an app or a system you want built, or with a process that is eating your team, and we will build it. The only technology work we take on is the kind pointed at a real problem we have identified.",
    ],
    scopeLine:
      "Priced on the build itself, the systems it has to connect to, and whether you want us to help you maintain it afterwards.",
    ctaLabel: "See what tech we can build",
    href: "/services/technology-builds",
  },
  {
    slug: "uae-market-entry",
    title: "UAE Market Entry",
    priceLine: "Scoped per engagement",
    body: [
      "Licence to functioning operation. We build the financial model first, with the investment, breakeven and return priced in, then build the entity, approvals, premises, hiring, compliance and supply chain around it.",
    ],
    scopeLine:
      "Priced on the entity structure, whether the products need regulatory approval, and how much of the operation we build rather than advise on.",
    ctaLabel: "What market entry includes",
    href: "/services/uae-market-entry",
  },
];

export const SERVICES_EYEBROW = "Our services";
export const SERVICES_HEADING = "What do we actually do";

/**
 * AUTHORED, NOT FROM THE SPEC. Section 3.4 gives this page an eyebrow, a heading
 * and five cards, and no sentence between them, so the page went straight from a
 * question to a price. An answer engine quoting it got a card title and a number.
 *
 * One sentence saying what the page is. Logged for Iram in PENDING-COPY 1r.
 */
export const SERVICES_STANDFIRST =
  "Five services, used on their own or together. Most engagements begin with the audit, because we will not take responsibility for a fix we have not measured.";

/**
 * Spec 3.4 card 6.
 *
 * The spec reads "START WITH THE DIAGNOSTIC (TEXT AS PER CARD SHOWN)". The card
 * it points at is one of the embedded reference images, in which the copy is
 * legible, so this is transcribed from the document rather than written.
 *
 * The card exists only to sell the diagnostic, so it renders only when the
 * diagnostic does. It is not substituted with a contact CTA: unlike the hero
 * button, every line of it describes the instrument by duration and output, so
 * there is nothing here a contact form could honour.
 */
export const DIAGNOSTIC_CARD = {
  eyebrow: "Not sure",
  title: "Start with the diagnostic",
  body: "Four minutes, six areas, one named constraint. It will tell you which of the five you actually need.",
  ctaLabel: "Take the diagnostic",
  href: "/diagnostic",
};

/**
 * HER SLIDE 4, 26 September: THE HOMEPAGE SECTION IS THREE CARDS, NOT FIVE.
 *
 * Her note: "Have refined it so it reads as 3 cards under diagnose, lead and
 * build. And only 3 offers now." The five offers are still five pages; they are
 * grouped into three cards, with Build and Place living inside the Lead card
 * and UAE Market Entry inside the Build card.
 *
 * TRANSCRIBED FROM A SCREENSHOT OF HER ARTIFACT, NOT FROM A FILE. Every string
 * below was read off an image rather than copied out of something she sent, so
 * it is her wording at one remove. PENDING-COPY 1f3 records it as transcribed
 * rather than verbatim so it can be checked against her original. One phrase is
 * flagged there as a possible mis-read: "Operational Leads", where her article
 * copy elsewhere says "Operations Leads". It is left as transcribed.
 *
 * THIS IS SEPARATE FROM SERVICES ABOVE, DELIBERATELY. SERVICES is rendered by
 * ServiceCards on BOTH the homepage and /services, and her scope for this change
 * is "the services section on the homepage only. No other page." So /services
 * keeps the five-card grid and this drives the homepage alone. The two now say
 * different things about the same offers, which is her instruction rather than
 * drift, and it is written down in PENDING-COPY 1f3 for her to settle.
 *
 * EYEBROWS AND BUTTON LABELS ARE STORED IN SENTENCE CASE. She writes them in
 * capitals; the capitals are a CSS text-transform on this site, so storing them
 * would double up.
 *
 * HOUSE RULES COST HER COPY NOTHING: no em dash anywhere in it and no American
 * spelling. "prioritised" and "licence" are already British.
 */
export type HomeServiceBlock = {
  /** Absent on a card's first block, where the card title is the heading. */
  heading?: string;
  body: string;
  ctaLabel: string;
  href: string;
};

export type HomeServiceCard = {
  eyebrow: string;
  title: string;
  priceLine: string;
  /** Her slide gives one only to the audit card. Cards two and three have none. */
  scopeLine?: string;
  blocks: HomeServiceBlock[];
};

export const HOME_SERVICES: HomeServiceCard[] = [
  {
    eyebrow: "We diagnose",
    title: "Operational Clarity Audit",
    priceLine: "From AED 15,000",
    scopeLine:
      "Scope depends on the size of the business, how many functions are in review, and how many people we interview.",
    blocks: [
      {
        body: "We map exactly where your business is losing time and money. We find the constraints, the cost leaks and the processes eating your capacity, then give you a prioritised roadmap of what to fix and in what order. Most engagements start here.",
        ctaLabel: "See what the audit covers",
        href: "/services/operational-clarity-audit",
      },
    ],
  },
  {
    eyebrow: "We lead",
    title: "Fractional COO, CFO and Chief of Staff",
    priceLine: "Scoped per engagement",
    blocks: [
      {
        body: "COO, Chief of Staff and CFO seats for businesses that need executive capability for a season rather than a lifetime. We build the operating model and run the weekly execution, then hand it to an operations lead so the structure holds long after the intensive phase ends.",
        ctaLabel: "How the fractional leadership works",
        href: "/services/fractional-leadership",
      },
      {
        heading: "Build and Place",
        body: "We put the right people inside your business temporarily to execute your priorities. Project Managers, Software Engineers, Operational Leads, all sourced, vetted and managed by us.",
        ctaLabel: "How we staff an engagement",
        href: "/services/build-and-place",
      },
    ],
  },
  {
    eyebrow: "We build",
    title: "Technology and Market Entry",
    priceLine: "Scoped per engagement",
    blocks: [
      {
        heading: "Technology Builds",
        body: "Apps, websites, CRMs, workflow automation, AI agents and dashboards where technology genuinely removes cost. Come to us with a system you want built or a manual process costing your team hours every week, and we will build it.",
        ctaLabel: "See what tech we can build",
        href: "/services/technology-builds",
      },
      {
        heading: "UAE Market Entry",
        body: "We help international businesses set up in Dubai, from licence to functioning operation. We build the financial model first, then handle the entity, approvals, premises, hiring, compliance, logistics and supply chain. Everything, end to end.",
        ctaLabel: "What market entry includes",
        href: "/services/uae-market-entry",
      },
    ],
  },
];

/**
 * The diagnostic, out of the grid and full width beneath it, her slide 4.
 *
 * It was card six inside the five-card grid. She repeats "immediately" in the
 * last sentence and repeats "diagnostic" in the first two; both are hers and
 * both are left alone on instruction.
 *
 * STILL GATED on NEXT_PUBLIC_ENABLE_DIAGNOSTIC, like the card it replaces:
 * every line of it describes the instrument by duration and output, so there is
 * nothing here a contact form could honour if the route were off.
 */
export const HOME_DIAGNOSTIC_PANEL = {
  eyebrow: "Not sure",
  heading: "Start with the diagnostic",
  body: "If you aren't sure exactly what service you need, take our operational diagnostic. A four-minute diagnostic that scores your business and tells you exactly where the constraint is. You get the result immediately and also some steps on how to improve, immediately.",
  ctaLabel: "Take the diagnostic",
  href: "/diagnostic",
};
