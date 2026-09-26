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
   * photographs for all four now, Saif's having arrived on 1 September.
   *
   * STILL NULLABLE ON PURPOSE. The monogram below is the generic fallback for
   * anyone added without a photograph, not something built for one card, so the
   * branch stays even though no person currently takes it.
   */
  photo: { src: string; alt: string } | null;
  /** Fallback monogram, used when photo is null. */
  initials: string;
};

/**
 * HER BIOGRAPHY, slide 7 of the 26 September deck, verbatim.
 *
 * WHAT IT REPLACES is preserved in PENDING-COPY 1f2: two paragraphs opening
 * "Fellow of the Institute and Faculty of Actuaries. One of roughly 75,000
 * qualified actuaries worldwide..." and closing "Founded Pivot Prime to close
 * the gap between what a business decides and what it actually delivers."
 * Hers says more and says it in her own voice, so it replaces rather than joins
 * it.
 *
 * THREE THINGS ABOUT HER WORDING, none of them a silent change.
 *
 *   "Actuaries,and holds" IS "Actuaries, and holds". Her deck runs the two
 *   together with no space, which is a text box artefact rather than her
 *   intent, and Saif said so when sending the slide.
 *
 *   "$120M" IS HERS AND STAYS. The old paragraph said "$100 million"; she
 *   writes $120M and the figure and the form are both hers. It is a book size
 *   rather than a price, so the one-price rule does not reach it.
 *
 *   THE HOUSE RULES COST HER COPY NOTHING ELSE. No em dash anywhere in it, and
 *   no American spelling: lint-copy is clean on both after the change.
 */
export const FOUNDER: Person & { tags: string[] } = {
  name: "Iram Kauser",
  role: "Founder & CEO",
  body: [
    "Iram has held the roles that Pivot Prime now provides for its clients.",
    "Chief of Staff to the CEO of AIG GCCNA. Head of Operations at Gallagher's Middle East brokerage, with full accountability for compliance, finance, IT, HR, claims and offshore delivery. Head of Pricing and Portfolio Management for a $120M book spanning the Middle East, Africa and Israel. She has not studied these functions from the outside. She has run them.",
    "Over sixteen years at AIG, MetLife and Gallagher, she built operating models from scratch, led enterprise transformation aligned with DFSA standards, scaled delivery capability across borders, and closed major commercial partnerships in the region. She has been based in Dubai for ten years and understands the market the way only someone who has operated inside it does.",
    "She is a Fellow of the Institute and Faculty of Actuaries, and holds an MSc in Mathematics with Distinction from the University of Birmingham.",
    "She founded Pivot Prime on one conviction: the people best placed to fix a business are those who have run one.",
  ],
  photo: { src: "/iram-kauser.jpg", alt: "Iram Kauser" },
  initials: "IK",
  /**
   * HER TAG LINE, slide 7, split on her own separator.
   *
   * She wrote it as one line: "Fellow, IFoA · Gallagher · AIG · MetLife · UK ·
   * Middle East · Africa · 16 years senior leadership", and the brief says it
   * is a list of chips rather than a sentence. The middle dot is what divides
   * her items, so it divides them here: eight chips, in her order.
   *
   * THAT IS EIGHT WHERE THERE WERE FOUR. The old row grouped the companies into
   * one chip and the regions into another, with the dots living INSIDE a chip.
   * Reading her line that way would have meant choosing her grouping for her,
   * and it would also have lost her reordering, which puts Gallagher first.
   * Flagged in PENDING-COPY 1f2 with the four-chip alternative.
   *
   * The chip treatment itself is the card's own and is untouched.
   */
  tags: [
    "Fellow, IFoA",
    "Gallagher",
    "AIG",
    "MetLife",
    "UK",
    "Middle East",
    "Africa",
    "16 years senior leadership",
  ],
};

/**
 * The three seats, in her slide's order.
 *
 * Saif Ur Rehman was deliberately absent until now, on his own instruction. He
 * is on the slide with a title and a biography, and is included on instruction.
 *
 * HIS PHOTOGRAPH ARRIVED 1 SEPTEMBER and the card carries it, so all three seats
 * are photographs and none renders a monogram. The source was 1023x1537, a 2:3
 * portrait against the card's 4:5 box, so it was cropped to 4:5 at prepare time
 * rather than left for the browser: 17% off the bottom, which is the table and
 * his hands. The crop was measured against the face before it was made, not
 * after. PENDING-COPY 1d8.
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
    photo: { src: "/saif-ur-rehman.jpg", alt: "Saif Ur Rehman Khan" },
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
