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
  sector: string;
  challenge: string;
  pivotLead: string;
  pivot: string[];
  results: Result[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "financial-services",
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

export const CASE_STUDIES_HEADING = "What we have achieved";
export const CASE_STUDIES_STANDFIRST = "Real problems, real execution, real results.";
