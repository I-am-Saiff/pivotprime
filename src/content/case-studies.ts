/**
 * The three case studies, spec 3.8 and section 6.
 *
 * Tagged KEEP: "Keep all three case studies and the existing carousel." The copy
 * below is carried over unchanged from the existing build.
 *
 * They appear in two places. Spec 3.8 places them on the homepage, directly
 * after the founder section and before the personas, and section 6 keeps them on
 * /about behind the #case-studies anchor. One source, so the two cannot drift.
 *
 * NOTE ON FIGURES. Several results here are also in the section 9 master table,
 * which the spec says still contains a direct contradiction on operational
 * waste. The 67% and the 13% retention figure are attributed to specific case
 * studies by section 9, which is how they are used. Sign-off is tracked as item
 * 1.4, and client naming as item 1.7, which is why these are described by sector
 * rather than named.
 */

/**
 * A result line. The figure is separated from the sentence so it can be withheld
 * without losing the claim.
 *
 * Spec section 1: "Any result figure or percentage must come from the master
 * table in Section 9 and nowhere else." Section 9 is a table of contradictions
 * for Iram to resolve, not a list of approved numbers, so only the figures it
 * actually carries are published: 67% transaction processing, 13% retention,
 * 17% profit margin, and up to 2 days a week of founder time.
 *
 * Everything else keeps its narrative and shows an empty slot, the same
 * treatment as the homepage metric cards. The claim survives; the unverified
 * number does not go out.
 */
export type Result = {
  /** Null where the figure is not in the master table. The label still renders. */
  figure: string | null;
  /**
   * MUST READ AS A COMPLETE LINE WITH NO FIGURE IN FRONT OF IT.
   *
   * Where a figure is published the label continues from it, so "67%" plus
   * "faster transaction processing per customer" reads as one sentence. Where
   * the figure is withheld the label is all there is, and a continuation
   * stranded on its own reads as a bug: the first pass shipped "reduction in
   * operational waste across onboarding and processing" and "improvement in
   * gross margin after the pricing reset", which look like something failed to
   * load rather than like a number awaiting confirmation.
   *
   * So a withheld line is written as a statement in its own right. Adding a
   * figure back later means rewording the label to continue from it.
   */
  label: string;
};

export type CaseStudy = {
  id: string;
  /**
   * Slide 8: "the three which are anonymised sit only on the about page and you
   * link to them."
   *
   * WHICH THREE IS SETTLED, and we had it backwards. pp-case-studies.html, her
   * own 22 August file, numbers them in its markup: case study 1 is Cinnacare,
   * case study 2 is Scentmatic, and the anonymised set is Financial Services,
   * Founder-Led and Fitness & Wellness. Those three carry the flag now. The
   * three that carried it before came from her About design and never appear in
   * her numbering at all, so they stay off the homepage as well. PENDING-COPY 1y.
   */
  aboutOnly?: boolean;
  /** The client's name where she has cleared it, the sector where she has not. */
  sector: string;
  /** Her own second line, e.g. "Baby Skincare · UK & UAE Launch". Named studies only. */
  subtitle?: string;
  /**
   * Her headline for the study, from pp-case-studies.html. Added 26 August after
   * check-dropped-mockup-copy found all five of them in her file and on no page
   * of the site — including on the two studies built from that same file an hour
   * earlier. The sector line says who; this says what happened.
   */
  headline?: string;
  /**
   * Supplied 24 August. Only the two named studies have one, which is what
   * "the pictures are for case study 1 and 2" resolves to once her numbering is
   * read. PENDING-COPY 1y.
   */
  photo?: { src: string; alt: string; width: number; height: number };
  /**
   * One line saying who in the business delivered it, where that is not the
   * consulting engagement the other studies describe. Nurture is our technology
   * team's own product work, and a card that reads like the others would imply
   * an advisory engagement that did not happen. PENDING-COPY 1ap.
   */
  attribution?: string;
  /** An outbound link to the live product, where one exists. */
  link?: { href: string; label: string };
  challenge: string;
  pivotLead: string;
  pivot: string[];
  results: Result[];
};

export const CASE_STUDIES: CaseStudy[] = [
  /**
   * CASE STUDY 1, NURTURE. Added 28 August on the client's instruction, placed
   * ahead of Cinnacare everywhere case studies appear.
   *
   * THIS ONE IS OURS, NOT AN ENGAGEMENT. Nurture is a product our technology
   * team built. The other studies describe consulting work for a client, and a
   * card written the same way would imply an advisory engagement that never
   * happened, so `attribution` says plainly who delivered it.
   *
   * EVERY FACT BELOW COMES FROM nurtureuae.com AND NOTHING ELSE. In particular:
   * the site's app store buttons are placeholders, so nothing here says the app
   * is downloadable or listed.
   *
   * NO FIGURES. Not withheld pending the section 9 table like the others:
   * nobody has produced a verified number for this product at all, so the
   * results are capability statements. PENDING-COPY 1aq.
   *
   * PERMISSION IS NOT YET IN WRITING. Naming the app and using its screenshot
   * are pending Kieran's confirmation. PENDING-COPY 1ap.
   */
  {
    id: "nurture",
    headline: "A childcare app where the household actually shares the day",
    sector: "Nurture",
    subtitle: "Childcare technology \u00b7 UAE",
    attribution: "Built by our technology team.",
    photo: {
      src: "/case-studies/nurture-app.jpg",
      alt: "The Nurture app home screen, showing a child profile, the day's summary of activities, meals, sleep and photos, and quick access tiles",
      width: 738,
      height: 1600,
    },
    link: { href: "https://nurtureuae.com", label: "View the product" },
    challenge:
      "In a UAE household the people caring for a child are rarely all in the same place, and often do not share a first language. Parents, nannies and drivers each hold part of the day, and none of them holds the whole of it.",
    pivotLead: "We built one place where the whole household sees the same day.",
    pivot: [
      "Real-time daily care logs for feeds, naps and nappies",
      "Instant messaging with one-tap translation across six languages",
      "Photo and video sharing to a shared family timeline",
      "Role-based access, so parents, nannies and drivers each see only what they should",
    ],
    results: [
      { figure: null, label: "An activities hub with age-appropriate developmental guides" },
      { figure: null, label: "AI meal planning, with a caregiver cookbook alongside it" },
      { figure: null, label: "Nurture Academy, carrying certified early-childhood courses" },
      { figure: null, label: "Child development tracking across the household" },
      { figure: null, label: "Built to UAE PDPL, encrypted in transit, with hashed PINs" },
    ],
  },
  /**
   * CASE STUDY 1 AND 2, named, from pp-case-studies.html of 22 August.
   *
   * Her file names them in its own markup — "── CASE STUDY 1: CINNACARE ──",
   * "── CASE STUDY 2: SCENTMATIC ──" — and its standfirst states the permission
   * in her words: "Two named clients who have given us permission to share their
   * stories, and three anonymised."
   *
   * EVERY NUMERIC FIGURE IS WITHHELD, on the same rule as every other result on
   * the site. Spec section 1: result figures come from the section 9 master
   * table and nowhere else, and none of these is in it. The non-numeric markers
   * she wrote — the regulatory approval, the roadmap, the tax position — are not
   * result figures and stay, but they stay in the label rather than in the
   * figure slot: `figure` means a number the master table carries, and the
   * Verified badge and the two-column layout both read it. A tick in that slot
   * put a Verified badge on a card with no verified number on it.
   * PENDING-COPY 1ab carries the rule question.
   */
  {
    id: "cinnacare",
    headline: "From concept to two-country operation, built from scratch",
    sector: "Cinnacare",
    subtitle: "Baby Skincare · UK and UAE Launch",
    photo: {
      src: "/case-studies/cinnacare-baby-oil.jpg",
      alt: "Two Cinnacare Soothing Baby Oil bottles on a pale surface beside a knitted blanket and eucalyptus leaves",
      width: 1400,
      height: 933,
    },
    challenge:
      "A UK baby skincare founder came to us with a product formula and a vision: launch simultaneously in the UK and UAE. What followed was not a strategy engagement.",
    pivotLead:
      "We built the whole thing, while the founder focused on the product.",
    pivot: [
      "Regulatory approval and company structures in both markets",
      "Brand identity and the supply chain behind it",
      "Pricing, and the UAE market entry itself",
    ],
    results: [
      { figure: null, label: "Instagram reach grew sharply in the first 30 days" },
      { figure: null, label: "Two countries set up and compliant, UK and UAE simultaneously" },
      { figure: null, label: "Formula approved by the UK regulator" },
      { figure: null, label: "A full operational roadmap: brand, supply chain, pricing and go to market" },
    ],
  },
  {
    id: "scentmatic",
    headline: "Sometimes the most valuable advice is: don't.",
    sector: "Scentmatic",
    subtitle: "UAE Market Entry · Financial Modelling",
    photo: {
      src: "/case-studies/scentmatic-vendor.jpg",
      alt: "The Scentmatic Vendor fragrance dispensing machine installed on a bar counter",
      width: 808,
      height: 540,
    },
    challenge:
      "A UK fragrance tech company came to us asking whether UAE expansion made financial sense. We built a full cash-flow model, month by month, venue by venue, sensitivity scenario by sensitivity scenario.",
    pivotLead:
      "The answer was honest: the way they planned to enter would lose them money.",
    pivot: [
      "We showed them exactly why",
      "We built an alternative path that worked, and let them decide",
      "They chose to wait, and kept a complete roadmap ready for when the time is right",
    ],
    results: [
      { figure: null, label: "Capital protected from a loss-making entry plan" },
      { figure: null, label: "A projected margin modelled on the alternative plan" },
      { figure: null, label: "A breakeven point established on the revised model" },
      { figure: null, label: "Zero tax liability identified in year one through the UAE structure" },
    ],
  },
  {
    id: "financial-services",
    headline: "KYC timelines were killing growth. We rebuilt the operation.",
    aboutOnly: true,
    sector: "Financial Services Company",
    challenge:
      "Customer onboarding and policy processing were slow and inconsistent. Teams lacked visibility into workload, cost per client, and profitability at a client and transaction level. KYC timelines were unpredictable, creating customer frustration and internal pressure. Leadership could not clearly see where time and cost were being lost.",
    pivotLead: "We rebuilt operations with discipline and data at the centre.",
    pivot: [
      "Mapped end-to-end customer and transaction workflows",
      "Reduced duplication and rework across compliance and operations",
      "Offshored selected onboarding activities to reduce bottlenecks and cost",
      "Built real-time dashboards tracking cost per client, transaction time, CAC, and LTV",
    ],
    results: [
      { figure: "67%", label: "faster transaction processing per customer" },
      { figure: null, label: "KYC completion time reduced substantially" },
      { figure: null, label: "Operational waste reduced across onboarding and processing" },
      { figure: null, label: "Roles removed from high-cost locations" },
    ],
  },
  {
    id: "founder-led",
    headline: "Everything ran through the founder. We rebuilt the structure so it didn't have to.",
    aboutOnly: true,
    sector: "Founder-Led Business",
    challenge:
      "The founder was approving every decision. The team had capability but it lacked clear ownership. We mapped what should and shouldn't escalate, then redesigned roles around judgement, not just task delivery.",
    pivotLead: "We focused on founder load release through structure and behaviour.",
    pivot: [
      "Translated the founder's vision into clear decision standards and success criteria.",
      "Defined which decisions stayed with the founder and which should never escalate.",
      "Redesigned roles around ownership and judgement, not just task delivery.",
      "Introduced simple operating rhythms to reduce ad-hoc interruptions and constant checking.",
    ],
    results: [
      { figure: "Up to 2 days a week", label: "returned to the founder by removing admin work and decision drag" },
      { figure: null, label: "Fewer escalations and faster team decisions" },
      { figure: null, label: "Greater confidence in delegation without loss of quality or control" },
    ],
  },
  {
    id: "fitness-wellness",
    headline: "Members were leaving. Nobody could see why, until we built the visibility.",
    aboutOnly: true,
    sector: "Fitness and Wellness Company, UAE",
    challenge:
      "Strong demand, loyal core, but churn was rising and nobody could pinpoint it. The team was focused on new sign-ups while existing members quietly left. We rebuilt retention around experience, behaviour, and team incentives.",
    pivotLead: "We rebuilt retention around experience, behaviour, and ownership.",
    pivot: [
      "Identified the moments that mattered most to members, including onboarding, class atmosphere, music, and post-class follow-up.",
      "Shifted the focus from transactions to community and identity, reinforcing progress and belonging.",
      "Aligned team incentives to retention behaviours rather than sign-ups alone.",
      "Introduced simple dashboards tracking attendance patterns, engagement drop-off, and early churn signals.",
    ],
    results: [
      { figure: "13%", label: "increase in member retention" },
      { figure: "17%", label: "improvement in profit margin through reduced churn and better utilisation" },
      { figure: null, label: "Clear visibility on why members stayed, allowing teams to act before churn occurred" },
    ],
  },
  /**
   * The three below come from the 23 August About mockup. Not one of their
   * figures appears in the section 9 master table, so every figure slot is
   * empty and only the narrative renders. They are built rather than dropped,
   * on Saif's instruction, and their wording is unconfirmed: PENDING-COPY 1i.
   *
   * Their attributed testimonial quotes are NOT carried. A quote signed by a
   * named role at a named client is a commercial claim, and none is in the spec.
   */
  {
    id: "professional-services",
    aboutOnly: true,
    sector: "Professional Services, UAE",
    challenge:
      "Rapid growth exposed pricing gaps and an unstructured delivery process. The business was winning work but the margin on it varied engagement to engagement, and nobody could say reliably which work was profitable.",
    pivotLead: "We rebuilt pricing and standardised how delivery runs.",
    pivot: [
      "Rebuilt the pricing model against the actual cost of delivery.",
      "Standardised the delivery process across all client engagements.",
      "Separated billable work from admin so the split was visible.",
    ],
    results: [
      { figure: null, label: "Gross margin improved after the pricing reset" },
      { figure: null, label: "Time spent on non-billable admin reduced" },
      { figure: null, label: "Delivery process standardised across all client engagements" },
    ],
  },
  {
    id: "retail-consumer",
    aboutOnly: true,
    sector: "Retail and Consumer, Gulf",
    challenge:
      "Inventory was misaligned with demand and markdowns were consuming margin quietly. Buying decisions were made on instinct and the cost of getting them wrong only showed up at the end of a season.",
    pivotLead: "We put demand planning in front of the buying decision.",
    pivot: [
      "Introduced and embedded a demand planning process.",
      "Tracked sell-through by product line rather than in aggregate.",
      "Made markdown exposure visible before the season rather than after it.",
    ],
    results: [
      { figure: null, label: "Markdown losses reduced over two seasons" },
      { figure: null, label: "Sell-through rate improved across core product lines" },
      { figure: null, label: "Demand planning process introduced and embedded" },
    ],
  },
  {
    id: "technology-saas",
    aboutOnly: true,
    sector: "Technology and SaaS, MENA",
    challenge:
      "The sales pipeline looked healthy but conversion was slow and the reasons were unclear. Deals were being lost in follow-up rather than on price or product.",
    pivotLead: "We rebuilt the CRM around the sales motion that actually happens.",
    pivot: [
      "Rebuilt the CRM around the real sales motion rather than an idealised one.",
      "Made the follow-up stage explicit and owned.",
      "Tracked cycle time by stage so the delay had a location.",
    ],
    results: [
      { figure: null, label: "Pipeline-to-close conversion rate improved" },
      { figure: null, label: "Average sales cycle reduced" },
      { figure: null, label: "CRM rebuilt around actual sales motion, not guesswork" },
    ],
  },
];

/**
 * IRAM'S OWN WORDS, slide 8, verbatim. Not a client testimonial, so it carries
 * no third-party permission problem: it is the founder speaking about her own
 * team. The client quotes on the named case studies are still owed with consent.
 */
export const FOUNDER_QUOTE = {
  body:
    "We are a team that genuinely enjoys getting into a business and making it work better, and we care just as much about seeing our clients thrive as they do. That is why we will always tell you what we actually think, even when it is not what you were hoping to hear. Doing right by our clients is not a policy, it's who we are.",
  attribution: "Iram Kauser, Founder and CEO",
};

/**
 * HER SECOND FOUNDER QUOTE, from pp-case-studies.html, where it sits directly
 * above case study 1.
 *
 * NOT AN ALTERNATIVE TO FOUNDER_QUOTE. The slide 8 one is about how the firm
 * behaves and sits with the case studies section on the homepage. This one is
 * about what the work finds, which is why she put it above the studies
 * themselves. Both are hers, both are dated 22 August, and neither supersedes
 * the other. Rendered on /about only, above the case studies section, which is
 * the position her own file gives it.
 */
export const CASE_STUDIES_PULLQUOTE = {
  body:
    "Before we propose anything, we go in and find exactly where the business is bleeding. Most founders already feel something is wrong, they just don't know where to look. Once we can show them the number, the conversation changes completely.",
  attribution: "Iram Kauser, Founder and CEO, Pivot Prime",
};

export const CASE_STUDIES_HEADING = "What we have achieved";
export const CASE_STUDIES_STANDFIRST = "Real problems, real execution, real results.";
