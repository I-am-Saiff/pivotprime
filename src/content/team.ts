/**
 * The team section, spec 6.3. Anchor: #team.
 *
 * Built in two layers, deliberately. Spec 6.3: "The top layer is roles, which
 * never change and so never need maintaining. The bottom layer is named people,
 * built as a repeatable card grid... so a person can be added or removed in
 * under a minute without touching the page layout. This is deliberate: the bench
 * will change, the reasons for it will not."
 *
 * Copy is verbatim.
 */

export const TEAM_ANCHOR = "team";

export const TEAM_INTRO = {
  heading: "How we staff an engagement",
  standfirst: "One senior operator, and a bench built around the five things that most often break.",
  body: [
    "A business rarely stalls for one reason. It stalls because the numbers are not owned, or because delivery is not being driven, or because manual work has quietly consumed the team, or because the operation finally works and nobody is being told about it.",
    "So the bench is built around those. We bring in only what the diagnosis actually justifies, and we manage whoever we bring.",
  ],
};

export type Role = { title: string; body: string };

export const ROLES: Role[] = [
  {
    title: "The finance seat: fractional CFO",
    body: "Founder-led businesses almost always outgrow their bookkeeping before they outgrow their accountant. Cash, runway, forecasting, collections, board and investor reporting, and readiness for the next raise. The CFO layer is what turns a business that is growing into a business that can prove it.",
  },
  {
    title: "The delivery seat: project management",
    body: "A plan that nobody owns day to day is a plan that quietly does not happen. The project manager sits inside the client team and drives the order and project lifecycle, the suppliers, the timelines and the documentation, so that execution does not depend on the founder chasing it.",
  },
  {
    title: "The technology seat: engineering and automation",
    body: "Once the process is clear, a great deal of it usually does not need a human at all. Custom automation, CRM and workflow build, dashboards and reporting. Always scoped after the diagnosis, so we build at the constraint rather than over the parts that already work.",
  },
  {
    title: "The demand seat: marketing and brand",
    body: "Fixing the operation raises the ceiling. It does not by itself fill the room. Positioning, go-to-market and the client-facing material that carries it, for the point at which the business is finally ready to be bought at scale.",
  },
  {
    title: "The digital seat: web",
    body: "Website design, build and maintenance. Used where the shopfront no longer matches the business behind it.",
  },
];

export type Person = {
  name: string;
  role: string;
  credential: string;
  /** Portrait. Every entry has one; a card with an empty frame is worse than none. */
  photo: { src: string; alt: string };
  /** The seat label from the client's About design. The founder has none. */
  seat?: string;
};

/**
 * Layer two: named people.
 *
 * Iram's card is here because her copy is given in full in spec 6.3 and she is
 * the founder, so no permission question arises.
 *
 * TODO(client): the remaining bench. Spec 10 decision 2 blocks this: who appears
 * has to be settled, and Justin in particular "is a partner rather than a
 * placement and should be asked separately before he appears". Each card needs a
 * name, role, one-line credential and a photograph.
 *
 * Spec 6.3 requires the grid to render correctly with an empty bench, which is
 * why this is a list rather than a fixed layout. Tracked in
 * docs/PENDING-COPY.md item 1.6.
 */
/**
 * THE FOURTH PERSON IN THE CLIENT'S DESIGN IS NOT HERE. Saif Ur Rehman appears
 * in pp-about-v2_2.html with a title and a biography and is deliberately left
 * out, on his own instruction.
 *
 * IRAM'S BIOGRAPHY IS NOT THE ONE IN THAT FILE. Hers is section 6.3 of the copy
 * document, which is the same text with one difference: the design says the
 * multi-line book was worth over $100 million, and 6.3 and the homepage both say
 * more than $120 million. Taking the design verbatim here would have put the
 * lower figure back on the site and made the About page disagree with the
 * homepage again, which is the thing that was fixed on 23 August. Justin's and
 * Khushi's are verbatim; nothing in either needed a decision.
 *
 * $120 MILLION, NOT $100 MILLION.
 *
 * This file said $100m while src/content/homepage.ts said $120m, so the two
 * pages disagreed about the same credential. The live site and the homepage
 * both say $120m, and the 23 August About mockup says $100m. Standardised on
 * $120m rather than quietly taking the lower one, and logged for Iram to
 * confirm: PENDING-COPY 1i. It is a factual claim about a named person, so it
 * is hers to settle, not ours.
 */
export const PEOPLE: Person[] = [
  {
    name: "Iram Kauser",
    role: "Founder and CEO",
    credential:
      "Fellow of the Institute and Faculty of Actuaries and one of roughly 75,000 qualified actuaries worldwide. Sixteen years in senior operating roles at AIG, MetLife and Gallagher across the UK, the Middle East and Africa, including Chief of Staff to a regional CEO across more than 150 staff, and pricing and portfolio strategy for a multi-line book worth more than $120 million. Founded Pivot Prime to close the gap between what a business decides and what it actually delivers.",
    photo: { src: "/iram-kauser.jpg", alt: "Iram Kauser" },
  },
  {
    /**
     * VERBATIM FROM pp-about-v2_2.html, the client's own About design. Not
     * rewritten, not tightened, not shortened.
     */
    name: "Justin Ford",
    role: "Finance Seat",
    seat: "Fractional CFO",
    credential:
      "Fractional CFO bringing senior finance leadership without the full-time cost. Cash management, forecasting, investor reporting and readiness for the next raise. The layer that turns a growing business into one that can prove it.",
    photo: { src: "/justin-ford.jpg", alt: "Justin Ford" },
  },
  {
    name: "Khushi Popat",
    role: "Content & Social Seat",
    seat: "Digital Storyteller & Social Media Strategist",
    credential:
      "Digital storyteller and social media strategist. Fixing the operation raises the ceiling. Khushi makes sure it gets filled. Positioning, visual storytelling and the client-facing presence that carries the business at scale.",
    photo: { src: "/khushi-popat.jpg", alt: "Khushi Popat" },
  },
];
