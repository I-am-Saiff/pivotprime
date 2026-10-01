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
  "Three services, used on their own or together. Most engagements begin with the audit, because we will not take responsibility for a fix we have not measured.";

/**
 * Spec 3.4 card 6. NOTHING RENDERS THIS ANY MORE, and it is kept rather than
 * deleted.
 *
 * It was the diagnostic card inside ServiceCards' grid. HOME_DIAGNOSTIC_PANEL
 * below replaced it on the homepage on 26 September, and her v3 slide 2 points
 * /services at the same component, so ServiceCards renders nowhere and this card
 * renders nowhere with it. Preserved unrendered because it is transcribed spec
 * copy and the grid can be switched back on.
 *
 * "WHICH OF THE FIVE" IS NOW "WHICH OF THE THREE" ANYWAY. Her v3 slide 2 asked
 * for that word changed, and it is changed here even though the sentence no
 * longer reaches a page, so nothing in the repository still says five. What the
 * reader sees in its place is HOME_DIAGNOSTIC_PANEL, which never named a count.
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
  body: "Four minutes, six areas, one named constraint. It will tell you which of the three you actually need.",
  ctaLabel: "Take the diagnostic",
  href: "/diagnostic",
};

/**
 * HER SLIDE 2 OF THE v3 DECK, 30 September: THREE OFFERS, NOT FIVE DRESSED AS
 * THREE.
 *
 * Her 26 September slide 4 asked for three cards and we grouped the five offers
 * into them, with Build and Place a full sub-offer inside the Lead card and UAE
 * Market Entry a full sub-offer inside the Build card, each with its own
 * sub-heading, its own paragraph and its own link. Her status note says that is
 * not what she meant by three: "Build and Place is still a full offer inside the
 * Lead card, and UAE Market Entry is still a full offer inside the Build card.
 * Fold both into short notes as in the mock-up, so there are only 3 offers."
 *
 * SO BOTH SUB-BLOCKS ARE GONE, headings and links with them. UAE market entry
 * survives as one sentence inside the audit card's note and placing people as
 * one sentence inside the lead card's note. Neither is an offer on this page any
 * more.
 *
 * BOTH PAGES ARE STILL LIVE AND STILL LINKED, which is the half that can strand
 * a page. They are reached from the UAE Market Entry block on the audit page and
 * the Need other staff block on the fractional page, her slides 11 and 12, and
 * both of those pages are linked from here. The homepage and /services no longer
 * link either one directly, so the check that used to assert the homepage links
 * /services/build-and-place now asserts that pair of blocks instead.
 *
 * THE PRICE LINE COMES OFF CARDS TWO AND THREE. Both read "Scoped per
 * engagement" until now; her mockup gives neither any price line. Only the
 * audit, the one priced offer, keeps one.
 *
 * CARD THREE IS "Technology Builds" AGAIN. "Technology and Market Entry" only
 * covered two things because market entry was inside it.
 *
 * TRANSCRIBED FROM A SCREENSHOT OF HER MOCKUP, NOT FROM A FILE, as the 26
 * September copy was. PENDING-COPY 1f6 records it as transcribed rather than
 * verbatim. ONE EARLIER MIS-READ FLAG IS NOW SETTLED BY HER OWN TEXT: the
 * Build and Place block was transcribed as "Operational Leads" and flagged as
 * probably "Operations Leads"; her new note writes "Operations Leads", which is
 * also what the fractional page's own block has said since her slide 12.
 *
 * NOW SHARED WITH /services, WHICH IS A REVERSAL OF THE 26 SEPTEMBER NOTE HERE.
 * That note said this component was homepage-only and /services kept the
 * five-card grid, because her scope then was "the homepage only". Her v3 slide 2
 * ends that: "Make /services render the same three cards and diagnostic panel as
 * the homepage, from the same component, so the two cannot drift again." So
 * ServiceCards renders nowhere now and this is the only services grid on the
 * site.
 *
 * EYEBROWS AND BUTTON LABELS ARE STORED IN SENTENCE CASE. She writes them in
 * capitals; the capitals are a CSS text-transform here, so storing them would
 * double up.
 *
 * HOUSE RULES COST HER COPY NOTHING AGAIN: no em dash in any of it, and
 * "prioritised" is already British.
 */
export type HomeServiceCard = {
  eyebrow: string;
  title: string;
  /** The audit only. Her v3 mockup takes the price line off cards two and three. */
  priceLine?: string;
  body: string;
  /**
   * The pale note under the body, which is what Build and Place and UAE Market
   * Entry were folded into. dividedAbove where her mockup draws a rule above it,
   * which is card two only: card one's note runs straight on from the body. That
   * asymmetry is hers and is followed rather than regularised.
   */
  note?: { text: string; dividedAbove?: boolean };
  ctaLabel: string;
  href: string;
};

export const HOME_SERVICES: HomeServiceCard[] = [
  {
    eyebrow: "We diagnose",
    title: "Operational Clarity Audit",
    priceLine: "From AED 15,000",
    body: "We map exactly where your business is losing time and money. We find the constraints, the cost leaks and the processes eating your capacity, then give you a prioritised roadmap of what to fix and in what order. Most engagements start here.",
    // This note replaces the audit card's old scope line as well as absorbing
    // market entry. Her mockup has one note on this card, not a note and a
    // scope line, and the old scope line was ours rather than hers.
    note: {
      text: "Scope covers operations, finance, technology, compliance and people. For international businesses looking to set up in Dubai, we include UAE market entry feasibility as part of the audit scope.",
    },
    ctaLabel: "See what the audit covers",
    href: "/services/operational-clarity-audit",
  },
  {
    eyebrow: "We lead",
    title: "Fractional COO, CFO and Chief of Staff",
    body: "COO, Chief of Staff and CFO seats for businesses that need executive capability for a season rather than a lifetime. We build the operating model and run the weekly execution, then hand it to an operations lead so the structure holds long after the intensive phase ends.",
    note: {
      dividedAbove: true,
      text: "Need people in the seats to execute? We also source, vet and manage Project Managers, Software Engineers and Operations Leads on your behalf.",
    },
    // "How fractional leadership works", not "How the fractional leadership
    // works". She dropped the article.
    ctaLabel: "How fractional leadership works",
    href: "/services/fractional-leadership",
  },
  {
    eyebrow: "We build",
    title: "Technology Builds",
    body: "Apps, websites, CRMs, workflow automation, AI agents and dashboards where technology genuinely removes cost. Come to us with a system you want built or a manual process costing your team hours every week, and we will build it.",
    // "See what we can build", not "See what tech we can build".
    ctaLabel: "See what we can build",
    href: "/services/technology-builds",
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
