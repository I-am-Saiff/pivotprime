/**
 * The team section. Anchor: #team.
 *
 * SOURCE: slide 21 of *Website Revisions 2208v3* and the client's own About
 * redesign `req/pp-about-v2_2.html`. Copy is verbatim from that file.
 *
 * WHAT THIS REPLACED. Spec 6.3 built the section in two layers: five roles that
 * never change, under the heading "How we staff an engagement", and named people
 * beneath them. Her redesign has one layer, four named people, and no roles
 * heading. The five role descriptions are kept word for word in
 * docs/PENDING-COPY.md 1ab.
 *
 * $100 MILLION HERE, $120 MILLION ON THE HOMEPAGE, DELIBERATELY.
 *
 * This file said $120m until now, because spec 3.7 and the live site both say
 * $120m while spec 6.3 says $100m, and standardising upward was the safer of
 * two guesses about a factual claim. Slide 21 is a third source and it says
 * **over $100 million**, agreeing with 6.3. Two of three now say $100m.
 *
 * The instruction is to build her card as her slide has it and to log the
 * disagreement rather than resolve it a second time, so the two pages disagree
 * on purpose and visibly: PENDING-COPY 1i, and section 3 of
 * docs/FOR-IRAM-outstanding.md. It is a claim about a named person and hers to
 * settle. Do not quietly align them.
 */

export const TEAM_ANCHOR = "team";

export const TEAM_INTRO = {
  eyebrow: "Meet the team",
  heading: "The people you work with directly.",
};

export type Person = {
  name: string;
  /** The seat label above the name. */
  role: string;
  /** One or two paragraphs of biography. */
  body: string[];
  /** The pill under the biography. The founder has none; she has tags instead. */
  seat?: string;
  /**
   * A portrait, or null. Her slide draws all four as initials; we hold real
   * photographs for three of the four, and Saif's card renders initials as the
   * slide does rather than an empty frame.
   */
  photo: { src: string; alt: string } | null;
  /** Fallback monogram, used when photo is null. */
  initials: string;
};

export const FOUNDER: Person & { tags: string[] } = {
  name: "Iram Kauser",
  role: "Founder & CEO",
  body: [
    "Fellow of the Institute and Faculty of Actuaries. One of roughly 75,000 qualified actuaries worldwide. Sixteen years in senior operating roles at AIG, MetLife and Gallagher across the UK, Middle East and Africa. Chief of Staff to a regional CEO across more than 150 staff. Pricing and portfolio strategy for a multi-line book worth over $100 million.",
    "Founded Pivot Prime to close the gap between what a business decides and what it actually delivers.",
  ],
  photo: { src: "/iram-kauser.jpg", alt: "Iram Kauser" },
  initials: "IK",
  tags: [
    "Fellow, IFoA",
    "AIG · MetLife · Gallagher",
    "UK · Middle East · Africa",
    "16 years senior leadership",
  ],
};

/**
 * The three seats, in her slide's order.
 *
 * Saif Ur Rehman was deliberately absent until now, on his own instruction. He
 * is on the slide with a title and a biography, and is included on instruction.
 * No photograph, so the card renders initials, which is what the slide draws for
 * every one of the four.
 */
export const PEOPLE: Person[] = [
  {
    name: "Justin Ford",
    role: "Finance Seat",
    seat: "Fractional CFO",
    body: [
      "Fractional CFO bringing senior finance leadership without the full-time cost. Cash management, forecasting, investor reporting and readiness for the next raise. The layer that turns a growing business into one that can prove it.",
    ],
    photo: { src: "/justin-ford.jpg", alt: "Justin Ford" },
    initials: "JF",
  },
  {
    name: "Saif Ur Rehman",
    role: "Technology Seat",
    seat: "AI & Technology Lead",
    body: [
      "AI and technology solutions lead. Scoped after the diagnosis so we build at the constraint, not over the parts that already work. Custom automation, workflow design, CRM build and reporting systems that actually get used.",
    ],
    photo: null,
    initials: "SR",
  },
  {
    name: "Khushi Popat",
    role: "Content & Social Seat",
    seat: "Digital Storyteller & Social Media Strategist",
    body: [
      "Digital storyteller and social media strategist. Fixing the operation raises the ceiling. Khushi makes sure it gets filled. Positioning, visual storytelling and the client-facing presence that carries the business at scale.",
    ],
    photo: { src: "/khushi-popat.jpg", alt: "Khushi Popat" },
    initials: "KP",
  },
];
