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
    slug: "fractional-coo",
    title: "Fractional COO, CFO and Chief of Staff",
    priceLine: "Scoped per engagement",
    body: [
      "COO, Chief of Staff and CFO seats, for businesses that need executive capability for a season rather than a lifetime.",
      "We build the operating model, run the weekly execution, then hand it to an operations lead, ours or yours, so the structure holds long after the intensive phase ends. Where the constraint is the numbers rather than the operation, a fractional CFO takes cash, forecasting, board reporting and fundraising readiness.",
    ],
    scopeLine:
      "Priced on the days a month, the seniority of the seat, and how much of the delivery team sits underneath it.",
    ctaLabel: "How the fractional leadership works",
    // Spec 2.1 lists /services/fractional-coo while 4.2 and the 3.4 card button
    // say /services/fractional-leadership. Holding the COO slug so it matches the
    // nav label and the market's search term. The other redirects here.
    // See docs/PENDING-COPY.md section 2.1.
    href: "/services/fractional-coo",
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
