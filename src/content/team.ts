/**
 * THE TEAM SECTION IS REBUILT FROM HER OWN FILE, req/meet-the-team.html.
 *
 * Her v3 deck slides 4 and 5 come with a working HTML page, found at
 * ~/Downloads/meet-the-team.html and copied into req/ so the source travels with
 * the repository. Every string below is read out of that file rather than
 * retyped, and the four biographies were compared against it before the content
 * was written: all four match it character for character.
 *
 * SO THIS IS NOT TRANSCRIBED COPY, unlike her slide 2 and slide 3 work. It is a
 * file she sent, which is the strongest provenance this project has.
 *
 * HER HOUSE RULES COST HER COPY NOTHING AT ALL. No em dash, no en dash, no
 * double hyphen and no American spelling anywhere in it; "programmes" is already
 * British. One non-ASCII character, the acute in "cafés", which is correct.
 *
 * BRAND CASING IS HERS: dubizzle lower case, Bookmeetings.io, BitOasis, xAI,
 * OpenAI, NKD Studios, Vibe FM. None of it is normalised.
 *
 * WHAT IT REPLACES, all preserved in PENDING-COPY 1f9:
 *
 *   THE ROLE EYEBROWS. "Finance Seat", "Technology Seat" and "Content & Social
 *   Seat" are gone. Her file puts the job title in that position instead, and
 *   the old job titles were in a pill at the foot of the card.
 *
 *   THE PILL ITSELF, which carried "Fractional CFO", "AI & Technology Lead" and
 *   "Digital Storyteller & Social Media Strategist". Her cards carry a row of
 *   tag chips instead, as the founder card already did.
 *
 *   ALL THREE BIOGRAPHIES, which were one short paragraph each.
 *
 * NISHA BAROT IS NEW. Her photograph was supplied as a 1920x2880 full-length
 * standing portrait and is prepared the way Saif's was: cropped at prepare time
 * to the card box so the browser crops nothing. PENDING-COPY 1f9 records the
 * crop.
 */

export const TEAM_ANCHOR = "team";

export const TEAM_INTRO = {
  eyebrow: "Meet the team",
  heading: "The people you work with directly.",
};

/**
 * Saif's biography is a paragraph, a list of four builds, then a paragraph, so
 * a biography is a list of blocks rather than a list of strings. The other three
 * are a single paragraph block each.
 */
export type BioBlock = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

export type Person = {
  name: string;
  /** The job title above the name. Her file calls this the role. */
  role: string;
  bio: BioBlock[];
  /** The chips under the biography. */
  tags: string[];
  /**
   * The LinkedIn profile, or null when we do not have one we can stand behind.
   * Never guessed, and never the company page in a person's place.
   */
  linkedin: { url: string; label: string } | null;
  /**
   * A portrait, or null. Her slide draws all five as initials; we hold real
   * photographs for all five now.
   *
   * `focusY` is her own vertical focus for the photo, as a percentage from the
   * top, used when the source is not already the card's shape. Her file sets
   * Justin 12, Nisha 6, Saif 22, Khushi 25.
   *
   * STILL NULLABLE ON PURPOSE. The monogram is the generic fallback for anyone
   * added without a photograph, not something built for one card.
   */
  photo: { src: string; alt: string; focusY: number } | null;
  /** Fallback monogram, used when photo is null. */
  initials: string;
};

/**
 * HER BIOGRAPHY, slide 7 of the 26 September deck, verbatim. UNCHANGED BY THIS
 * PASS: the brief for the team rebuild is explicit that Iram's biography text is
 * not to be touched, so only the LinkedIn item below is new.
 *
 * WHAT IT REPLACES is preserved in PENDING-COPY 1f2: two paragraphs opening
 * "Fellow of the Institute and Faculty of Actuaries. One of roughly 75,000
 * qualified actuaries worldwide..." and closing "Founded Pivot Prime to close
 * the gap between what a business decides and what it actually delivers."
 *
 * "$120M" IS HERS AND STAYS. It is a book size rather than a price, so the
 * one-price rule does not reach it. The homepage founder section writes the same
 * figure out in full as "$120 million" since her v3 slide 3, which is her later
 * instruction there and not here. PENDING-COPY 1f5.
 *
 * HER TAG LINE, slide 7, split on her own middle dot: eight chips, in her order.
 * The four-chip alternative is in PENDING-COPY 1f2.
 */
/**
 * The LinkedIn label pattern, so five cards cannot word it five ways.
 *
 * DECLARED ABOVE FOUNDER ON PURPOSE. It sat below it while Iram's card had no
 * link; FOUNDER now calls it, and a const arrow used before its declaration
 * throws at module load rather than at render, which would take /about down.
 */
const connect = (firstName: string, url: string) => ({
  url,
  // Sentence case in the string: the button uppercases in CSS, as every other
  // button label on this site does.
  label: `Connect with ${firstName} on LinkedIn`,
});

export const FOUNDER: Person = {
  name: "Iram Kauser",
  role: "Founder & CEO",
  bio: [
    { kind: "p", text: "Iram has held the roles that Pivot Prime now provides for its clients." },
    {
      kind: "p",
      text: "Chief of Staff to the CEO of AIG GCCNA. Head of Operations at Gallagher's Middle East brokerage, with full accountability for compliance, finance, IT, HR, claims and offshore delivery. Head of Pricing and Portfolio Management for a $120M book spanning the Middle East, Africa and Israel. She has not studied these functions from the outside. She has run them.",
    },
    {
      kind: "p",
      text: "Over sixteen years at AIG, MetLife and Gallagher, she built operating models from scratch, led enterprise transformation aligned with DFSA standards, scaled delivery capability across borders, and closed major commercial partnerships in the region. She has been based in Dubai for ten years and understands the market the way only someone who has operated inside it does.",
    },
    {
      kind: "p",
      text: "She is a Fellow of the Institute and Faculty of Actuaries, and holds an MSc in Mathematics with Distinction from the University of Birmingham.",
    },
    {
      kind: "p",
      text: "She founded Pivot Prime on one conviction: the people best placed to fix a business are those who have run one.",
    },
  ],
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
  /**
   * HER OWN PROFILE, SUPPLIED BY SAIF IN PASS 7 and used exactly as given.
   *
   * Her slide 4 asked for "Connect with Iram on LinkedIn" under her bio. Her
   * team file gave a profile for the other four and none for her, and every
   * source we held was searched without finding one, so until now this was null
   * rather than a guess: a guessed profile URL lands on a stranger. The footer's
   * linkedin.com/company/pivotprimeconsultancy is the company page and still
   * does not stand in for a person.
   */
  linkedin: connect("Iram", "https://www.linkedin.com/in/iram-kauser-79539938/"),
  photo: { src: "/iram-kauser.jpg", alt: "Iram Kauser", focusY: 50 },
  initials: "IK",
};

/**
 * The three tall portrait cards, in her file's order: Justin, Nisha, Saif.
 */
export const PEOPLE: Person[] = [
  {
    name: "Justin Ford",
    role: "Fractional CFO",
    bio: [
      {
        kind: "p",
        text: "Justin has run the finance function inside global corporates and fast-growing Gulf scale-ups for more than fifteen years. He trained at KPMG and managed a $650M+ inventory balance at Ford Motor Company. In Dubai he has held senior finance roles at OSN, dubizzle, International SOS and BitOasis, where he built the plan behind its Series C raise. Since 2023 he has been a fractional CFO to founder-led businesses, and he runs his own UAE wellness brand, Life Within.",
      },
    ],
    tags: ["KPMG", "Ford", "OSN", "dubizzle", "BitOasis", "15+ years"],
    linkedin: connect("Justin", "https://www.linkedin.com/in/justinford84/"),
    photo: { src: "/justin-ford.jpg", alt: "Justin Ford, Fractional CFO", focusY: 12 },
    initials: "JF",
  },
  {
    name: "Nisha Barot",
    role: "Strategic Execution & Transformation Consultant",
    bio: [
      {
        kind: "p",
        text: "Nisha turns strategic priorities into delivered outcomes. Over more than ten years she has led programmes, PMOs and governance at Morgan Stanley, Capgemini, Meridiam and Imperial College London, across London, Toronto and Dubai. She is also an investor and board member across more than 20 companies, including OpenAI and xAI. She works with leadership teams on a fractional or project basis, bringing the structure and delivery discipline that carry initiatives through to results.",
      },
    ],
    tags: ["Morgan Stanley", "Capgemini", "Meridiam", "Imperial College London", "10+ years"],
    linkedin: connect("Nisha", "https://www.linkedin.com/in/nishabarot/"),
    /**
     * focusY 50 RATHER THAN HER 6, BECAUSE THE CROP IS ALREADY BAKED IN.
     *
     * Her file sets 6% because it points at an uncropped source and lets the
     * browser do the work. This file is 837x879, which is the card box exactly,
     * so there is nothing for the browser to crop and any focus value is a no-op.
     * Her 6% was the starting point for choosing the crop, not a value to carry
     * through. PENDING-COPY 1f9 has the crop.
     */
    photo: {
      src: "/nisha-barot.jpg",
      alt: "Nisha Barot, Strategic Execution and Transformation Consultant",
      focusY: 50,
    },
    initials: "NB",
  },
  {
    name: "Saif Ur Rehman",
    role: "AI and Technology Solutions Lead",
    bio: [
      {
        kind: "p",
        text: "Saif builds the systems that let a business grow without endlessly adding headcount. He leads backend, AI and automation engineering, and his builds include:",
      },
      {
        kind: "ul",
        items: [
          "Nurture UAE, a family childcare app live on the App Store",
          "A coaching platform linking a UAE national junior boxer with coaches in Russia and the US",
          "AI stock systems for Chaiiwala's UK cafés",
          "Bookmeetings.io, his own outreach platform",
        ],
      },
      { kind: "p", text: "He also rebuilt pivotprime.ae and its business diagnostic." },
    ],
    tags: ["Nurture UAE", "Chaiiwala", "Bookmeetings.io", "AI, automation and apps"],
    linkedin: connect("Saif", "https://www.linkedin.com/in/saif-bookmeetings/"),
    photo: {
      src: "/saif-ur-rehman.jpg",
      alt: "Saif Ur Rehman, AI and Technology Solutions Lead",
      focusY: 22,
    },
    initials: "SR",
  },
];

/**
 * Khushi, in one wide card beneath the three: photograph left, text right,
 * stacking on a phone. Her file's `.card.wide`.
 *
 * SHE IS A SEPARATE EXPORT RATHER THAN A FLAG ON A PERSON, because the row and
 * the wide card are two different layouts and a boolean inside PEOPLE would mean
 * the grid had to filter her out of itself. Her mockup draws four people in two
 * shapes; this is those two shapes.
 */
export const WIDE_PERSON: Person = {
  name: "Khushi Popat",
  role: "Digital Storyteller & Social Media Strategist",
  bio: [
    {
      kind: "p",
      text: "Khushi has spent more than four years building audiences and brands in the UAE's creator and consumer economy. As Business Manager to Nidhi Kumar, the UAE's biggest dance YouTuber, she ran social media, brand partnerships and content production, and launched NKD Studios. At Danube Group she ran social media for Milano by Danube and led commercial shoots with brand ambassador Chitrangda Singh. At Pivot Prime she shapes positioning and visual storytelling.",
    },
  ],
  // "Vibe FM" is in her chips and not in her biography. That is hers and is left
  // alone rather than reconciled.
  tags: ["Danube Group", "NKD Studios", "Vibe FM", "4+ years"],
  linkedin: connect("Khushi", "https://www.linkedin.com/in/khushi-popat-44464b1ab/"),
  photo: {
    src: "/khushi-popat.jpg",
    alt: "Khushi Popat, Digital Storyteller and Social Media Strategist",
    focusY: 25,
  },
  initials: "KP",
};
