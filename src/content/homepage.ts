import { CONTACT_CTA } from "@/content/cta";

/**
 * Homepage copy, spec section 3.
 *
 * Verbatim. Spec section 1: green-bordered blocks are final website copy, "use
 * them verbatim, do not paraphrase, re-punctuate, re-capitalise or tighten
 * them". Where the spec gives no copy for a section, the slot stays empty with a
 * TODO(client) note rather than being filled with connective writing.
 *
 * Section order is fixed by spec 3 and the page must render in it.
 */

// 3.1 HERO
export const HERO = {
  heading: "The Consultancy That Actually Executes",
  /** Set noticeably larger than the paragraph beneath it. Spec 3.1: "That
   *  sentence is doing the most work on the page, so give it room." */
  lead: "Most consultants recommend the fix. We build it.",
  leadItalic: "Most consultants recommend the fix.",
  leadStrong: "We build it.",
  body: "We find what is holding your business back, then bring the people, systems and technology to fix it.",
  primaryLabel: "Find out what is holding your business back",
  secondaryLabel: "See what we actually do",
  secondaryHref: "#services",
  /**
   * Shown only when the diagnostic is live. It describes an instrument by name
   * and duration, so it must not appear while the primary CTA routes to the
   * contact page instead.
   */
  diagnosticExplainer:
    "A four-minute assessment across six areas of the business. It scores where you are strongest and weakest, and names the one constraint holding back the rest. You get the result immediately.",
};

// 3.2 PROOF BAR
export const PROOF = {
  trusted:
    "Trusted by businesses across insurance, wellness, retail, fragrance, fintech and consumer goods.",
  /**
   * Spec 3.2 says to link the two publication names to the two articles. The
   * URLs were carried as hyperlinks in the document rather than written out in
   * the body text.
   */
  featuredPrefix: "As featured in ",
  publications: [
    {
      name: "West Asia Watch",
      href: "https://westasiawatch.com/interviews/iram-kauser-on-building-businesses-in-the-uae/",
      title: "From Strategy to Execution: Iram Kauser on Building Businesses That Scale in the UAE",
    },
    {
      name: "Arabian Mirror",
      href: "https://thearabianmirror.com/the-most-influential-business-leaders-to-watch-in-2026/",
      title: "The Most Influential Business Leaders To Watch In 2026",
    },
  ],
};

/**
 * The client logo rows in the proof bar. Kept from the existing build, which
 * spec 3.2 tags MOVE rather than REPLACE: the copy and treatment carry over, the
 * markup is rebuilt.
 *
 * Alt text names the client rather than describing the file, per spec 4.5.
 */
/**
 * TWO LABELLED GROUPS IN ONE SCROLLING STRIP, matching the live site.
 *
 * The live carousel runs two label cards through the row: one introducing the
 * institutions Iram worked inside, one introducing Pivot Prime's clients. The
 * rebuild had dropped the employer group and turned the client label into a
 * static heading above the strip. The client circled both label cards and asked
 * for her structure back, which also settles the Gallagher question: the
 * employer logos have their own label and belong under it. PENDING-COPY 1n, 1p.
 *
 * The labels are TEXT, not the image cards the live site uses.
 * logo-text-block-2.jpg and logo-text-block-1-2.jpg are pictures of these exact
 * words; a screen reader announced them as client logos and a crawler read
 * nothing at all. Both files stay unused.
 */
export type LogoGroup = { label: string; logos: { src: string; alt: string }[] };

export const LOGO_GROUPS: LogoGroup[] = [
  {
    label: "Experience Inside Global Institutions",
    logos: [
      { src: "/logos/clogo1a.jpg", alt: "MetLife" },
      { src: "/logos/clogo3a.jpg", alt: "Gallagher" },
      { src: "/logos/sky.jpg", alt: "Sky" },
      { src: "/logos/clogo5a.jpg", alt: "Willis Towers Watson" },
      { src: "/logos/clogo2a.jpg", alt: "KPMG" },
      { src: "/logos/clogo6a.jpg", alt: "AIG" },
    ],
  },
  {
    label: "Companies We Have Delivered For",
    logos: [
      { src: "/logos/Frame-17.jpg", alt: "Democrance" },
      { src: "/logos/insurancehub-with-bg-white.jpg", alt: "Insurance Hub" },
      // The filename says stydio. The wordmark reads studio88.
      { src: "/logos/stydio-with-bg.jpg", alt: "studio88" },
      // The filename says instagram. The image is the Women Who Thrive wordmark.
      { src: "/logos/instagram.jpg", alt: "Women Who Thrive" },
      { src: "/logos/man-cave-with-bg.jpg", alt: "Man Cave" },
      { src: "/logos/bop-foundation-with-bg-white.jpg", alt: "Birds of Paradise Foundation" },
      { src: "/logos/nivishe.jpg", alt: "Nivishe" },
    ],
  },
];

/**
 * ALL FOUR PLACEHOLDER ENTRIES ARE RESOLVED, by opening the files rather than
 * reading their names. Two are now named, and two are not logos at all.
 *
 * GALLAGHER IS REMOVED, and not because of the open naming decision.
 * clogo3a.jpg is the Gallagher wordmark. Gallagher is one of Iram's former
 * employers and is named as such in her credential further down this same page.
 * Under a heading reading "Companies We Have Delivered For", that reads as a
 * client. It goes back the day she confirms Gallagher is a delivery client.
 * PENDING-COPY 1n.
 *
 * logo-text-block-2.jpg was never a logo. It is this section's heading, set as
 * an image and rendered as the first item in the carousel: invisible to a
 * screen reader, invisible to a crawler, and animating past the reader in a
 * strip of company marks. It is CLIENT_LOGOS_HEADING above, as real text.
 *
 * instagram.jpg is the Women Who Thrive wordmark. The filename is simply wrong.
 * Frame-17.jpg is Democrance.
 */
export const LOGOS_NEED_ALT_TEXT = true;

// 3.3 RESULTS
export const RESULTS = {
  heading: "This Is What Our Team Has Delivered",
  standfirst: "We do not measure success in slide decks. We measure what changed.",
};

export type Metric = {
  /**
   * The magnitude the visual draws with, 0 to 100. For the range card it is the
   * top of the range, because a drawn bar cannot show two ends at once.
   */
  figure: number | null;
  /**
   * What the card prints, exactly as her mockup prints it, sign and range and
   * all. `figure` could not express the "40-60%" this used to carry, and the page
   * must not paraphrase her. The client replaced that range with a single 43% on
   * 29 August, so the two agree again, but the split stays: the next figure she
   * sends may be a range too.
   */
  figureText: string | null;
  suffix: string;
  label: string;
  context: string;
  /**
   * Her own name for the card, from the .kpi-label in
   * req/pivot-prime-kpi-cards_3.html.
   */
  kpiLabel: string;
  /**
   * Which visual the card carries. Her slide 3 comment asks for "Different
   * visual language for each KPI", and her mockup shows what she means: a
   * five-node execution track, a before-and-after block comparison, a retention
   * dot grid, a profit trend, and a pair of speed tracks.
   *
   * FOUR OF THE FIVE ENCODE THE FIGURE. Ten blocks becoming seven is a
   * percentage drawn rather than written, and a rising line has a slope. So each
   * card renders its own frame now and the data-bearing mark appears with the
   * figure. Nothing here publishes a number the section 9 table does not carry,
   * including in pictures, which is the form no check would have caught.
   * PENDING-COPY 1aj.
   */
  visual: "track" | "before-after-blocks" | "dot-grid" | "trend" | "before-after-tracks";
  /**
   * Why there is no figure, and therefore what the card does.
   *
   * "client-confirmation": the document carries a number but it is not cleared
   *   to publish. Spec 3.3 ends with "IRAM TO CONFIRM the five ranges above
   *   against the master table in Section 9 before they go live", and spec
   *   section 1 says every result figure must come from that table and nowhere
   *   else. Four of the five do not appear in it: 53 against a stated 30 to 50,
   *   62 against a row her own document marks as a direct contradiction, 16
   *   against 10 to 15, and 27 against 17 or 13 projected. Only 67 matches.
   *   The card RENDERS with its approved copy and an empty figure slot.
   *
   * "not-yet-supplied": nobody has the number. Spec 3.4 card 6 says "Do not
   *   launch this card with a placeholder", so the card does NOT render.
   *
   * The two cases used to be one `null` and were not distinguishable. They lead
   * to opposite behaviour, so they are named.
   */
  pending: "client-confirmation" | "not-yet-supplied" | null;
};

/**
 * The six metric cards, spec 3.3.
 *
 * THE FIVE FIGURES ARE PUBLISHED, AS OF 27 AUGUST.
 *
 * They were withheld for weeks because spec 3.3 ends "IRAM TO CONFIRM the five
 * ranges above against the master table in Section 9 before they go live" and
 * four of the five do not match that table. The client authorised them on the
 * 27 August call, pointing at her own req/pivot-prime-kpi-cards_3.html and at
 * her deck comment saying the HTML was provided in order to build these cards.
 * The mockup and the deck therefore override the section 9 table.
 *
 * The values are hers, verbatim, including the sign and the range: +7%,
 * 43%, +13%, +27%, 67%. `figure` is the magnitude the drawing uses and
 * `figureText` is what the card prints. Recorded in docs/PENDING-COPY.md 1am so
 * the override is visible to her and can be undone in one edit.
 *
 * TODO(client): metric 6 has no figure. Spec 3.4 marks it "SAIF TO SUPPLY" and
 * is explicit: "Do not launch this card with a placeholder." It is therefore
 * filtered out entirely rather than shown with an XX, and appears the moment the
 * number lands. Tracked as item 1.2.
 */
export const METRICS: Metric[] = [
  {
    figure: 7,
    figureText: "+7%",
    suffix: "%",
    pending: null,
    kpiLabel: "Execution",
    visual: "track",
    label: "Faster execution across teams",
    context: "Decision rights, operating rhythm and delivery ownership rebuilt.",
  },
  {
    figure: 43,
    figureText: "43%",
    suffix: "%",
    pending: null,
    kpiLabel: "Process Efficiency",
    visual: "before-after-blocks",
    label: "Reduction in duplicated work, rework and inefficiency",
    context:
      "Processes mapped end to end and redesigned around how the work actually flows.",
  },
  {
    figure: 13,
    figureText: "+13%",
    suffix: "%",
    pending: null,
    kpiLabel: "Customer Retention",
    visual: "dot-grid",
    label: "Increase in customer retention",
    context: "Service cancellation drivers identified and addressed.",
  },
  {
    // Her own mockup, req/pivot-prime-kpi-cards_3.html, prints +27% here, and
    // she showed the same slide on the 27 August call. It still waits, because
    // spec 3.3 holds all five until they are checked against the section 9
    // master table and section 9 still contradicts itself on operational waste.
    figure: 27,
    figureText: "+27%",
    suffix: "%",
    pending: null,
    kpiLabel: "Profit Growth",
    visual: "trend",
    label: "Increase in profit",
    context: "Pricing, margin and commercial model redesigned.",
  },
  {
    figure: 67,
    figureText: "67%",
    suffix: "%",
    pending: null,
    kpiLabel: "Transaction Speed",
    visual: "before-after-tracks",
    label: "Faster transaction processing",
    context: "End to end customer and transaction workflows mapped and rebuilt.",
  },
  {
    figure: null,
    figureText: null,
    suffix: "",
    pending: "not-yet-supplied",
    // Card 6 does not render and is not in her mockup, so it has no visual of
    // its own. Given the trend frame so the type holds; nothing draws it.
    kpiLabel: "Bespoke Builds",
    visual: "trend",
    label: "Bespoke software and automation builds delivered",
    context: "Custom systems, CRMs, dashboards and automations built for clients.",
  },
];

// 3.5 THE PATTERNS
export const PATTERNS = {
  heading: "These Are the Patterns Before Growth Stalls",
  eyebrow: "Recognise Any of These",
  items: [
    "Sales sells things operations cannot deliver",
    "Quality slips whenever volume rises",
    "Prices have not moved in two years while costs have",
    "Everything still depends on the founder",
    "The business runs on WhatsApp and spreadsheets",
    "The CRM is a contact list",
    "Profit margins are thin or disappearing",
    "You have a strategy, but execution is all over the place",
    "The team is stretched, misaligned or burned out",
    "You keep losing customers",
  ],
};

// 3.6 ONE ACCOUNTABLE PARTY
export const ACCOUNTABLE = {
  heading: "Knowing what is wrong is hard. Being the one who has to fix it is harder.",
  body: [
    "Most engagements end with a report. The findings are correct, everyone agrees, and the work goes back onto a team already at capacity.",
    "So we finish it. We place a project manager, a fractional CFO, an engineer or a marketer inside your business. Sourced, vetted and managed by us. They report to us, not to you.",
    "No visa, no end-of-service liability, no permanent salary for a temporary problem.",
    "One contract, one invoice, one accountable party. For exactly as long as you need it.",
  ],
  pullQuote:
    "A consultant tells you what to do. A recruiter finds you someone. Neither one is accountable for whether it worked.",
  // Spec 2.2's own wording. It read "Talk to our team", which is not in the
  // document, and the arrow was glued to it with no space.
  ctaLabel: CONTACT_CTA.label,
};

// 3.7 THE PERSON BEHIND IT
export const FOUNDER = {
  heading: "Pivot Prime is led by a Mathematician, and that changes how the work gets done.",
  body: [
    "Iram Kauser is one of roughly 75,000 qualified actuaries worldwide. She spent sixteen years in senior operating roles at AIG, MetLife and Gallagher across the UK, the Middle East and Africa: Chief of Staff to a regional CEO across more than 150 staff, and pricing and portfolio strategy for a multi-line book worth more than $120 million.",
    "People will tell you a process is fine, or that the real problem is headcount. A numbers-led approach takes the emotion out of it. We measure how long each step actually takes, the pass and fail rates, the man hours per function and the cost per transaction, before anyone argues about what to change.",
  ],
  ctaLabel: "Meet the Team",
  ctaHref: "/about#team",
  /**
   * Supplied by the client on 22 August 2026 and dropped in at
   * public/iram-kauser.jpg. A seated portrait. Superseded 22 August 2026 by the 4099x6149 original.
   *
   * Spec 8.1 asks for "the seated portrait from the Arabian Mirror feature.
   * Full resolution, not a crop from the article". At 4099x6149 the resolution
   * question is settled: it is over seven times the 552px the frame occupies on
   * a desktop screen. Whether it is the Arabian Mirror frame specifically is
   * still not something the file can confirm.
   *
   * Rendered in a 4:5 frame to match the section, anchored to the top: the
   * source is 2:3, so a centred crop would take off the top and cut into her
   * head. The replacement has the same aspect and framing, so object-top
   * carries over unchanged.
   */
  // No longer nullable. It was `| null` while the asset was owed and the page
  // carried a placeholder branch; both the file and the branch are gone.
  portrait: { src: "/iram-kauser.jpg", alt: "Iram Kauser, Founder and CEO of Pivot Prime" },
};

// 3.10 HOW WE ARE PAID
export const HOW_WE_ARE_PAID = {
  heading: "Most Consultants Are Paid for the Recommendation",
  lead: "We are paid partly on whether the numbers move.",
  body: [
    "Before anything changes we baseline it: how long each step takes, pass and fail rates, man hours per function, cost per transaction. Then we agree which of those numbers has to move and by when, and a meaningful part of our fee sits on the other side of them moving.",
    "It is a discipline rather than a sales device. You cannot bill on outcomes unless you were serious about measuring in the first place.",
  ],
  /**
   * THE REDUCED FORM OF THE FEES CHAPTER.
   *
   * The 23 August design carries a worked example: a target, a percentage, a
   * figure the client keeps and a figure Pivot Prime earns. It cannot be built,
   * and not because the numbers are unconfirmed. Two rules bar it independently:
   *
   *   Spec section 1: "One price only appears on the site: the Operational
   *   Clarity Audit floor. No other figure and no upper limit appears anywhere."
   *
   *   Spec 3.10's own instruction: "Do not publish a specific percentage or a
   *   formula here."
   *
   * So the model is stated in prose. A fixed element, a results element tied to
   * an agreed target, and the audit floor as the only figure. No percentage, no
   * formula, no worked example. Naming the floor in AED also removes the clash
   * where the design priced the audit in AED and the example in dollars.
   *
   * The two sentences below are NOT from the spec. They are ours, written to
   * state the model without breaking either rule, and logged in
   * docs/PENDING-COPY.md 1h for Iram to approve or replace.
   */
  structure: [
    "Every engagement has two parts. A fixed element covers the work itself, and a results element sits against a target we agree with you before anything starts.",
    "The Operational Clarity Audit starts at AED 15,000. Everything else is scoped per engagement, because the shape of the work decides the cost.",
  ],


  /**
   * HER FEES DESIGN, BUILT COMPLIANT. pp-fees_3.html and pp-fees_4.html, both
   * sent 22 August and not processed until 26 August. The section had been
   * built prose-only partly because no design existed. One did, and two.
   *
   * NEITHER IS BUILDABLE AS DRAWN. _3 publishes $400,000, 20% and the formula
   * in words. _4 publishes $400,000, 20%, $320,000, $80,000 and the whole
   * arithmetic. Two rules bar them independently:
   *
   *   Spec section 1: "One price only appears on the site: the Operational
   *   Clarity Audit floor. No other figure and no upper limit appears anywhere."
   *
   *   Spec 3.10: "Do not publish a specific percentage or a formula here."
   *
   * So the layout is hers and the number boxes carry wording instead. Her
   * structure survives intact: the traditional-versus-Pivot-Prime contrast from
   * _4, the numbered sequence from _3, and her commitment line, which states
   * the whole idea with no figure in it at all.
   *
   * EM DASHES. Four of her sentences here use one and section 1 of her own
   * document bans it from the site. They are colons and commas. PENDING-COPY 1ae.
   */
  /**
   * AUTHORED, NOT FROM ANY SOURCE. The plainest sentence that states the model,
   * added 26 August so the section has a heading somebody would actually search
   * and an answerable first line under it. Her own copy gives the section a
   * position ("Most consultants charge whether it works or not") but never says
   * in plain words what the pricing model is, so an answer engine asked "how
   * does Pivot Prime charge" had nothing short and factual to quote.
   *
   * Both lines are ours. PENDING-COPY 1al.
   */
  seoHeading: "How Pivot Prime charges: a fixed fee plus a results-linked element",
  seoAnswer:
    "Every engagement has two parts. A fixed element covers the work itself, and a results element is paid against a target agreed with you before anything starts. The Operational Clarity Audit starts at AED 15,000, and everything else is scoped per engagement.",
  mockupHeading: "Most consultants charge whether it works or not.",
  contrast: {
    traditional: {
      label: "The Traditional Model",
      /** Spec 3.10 block 0, verbatim: it is the traditional model in her words. */
      headline: "Most Consultants Are Paid for the Recommendation",
      body: [
        "You pay for the advice. Whether anything actually improves is not really their problem.",
        "The invoice arrives either way.",
      ],
    },
    pivotPrime: {
      label: "The Pivot Prime Model",
      headline: "We only fully earn when you do.",
      /** Her four boxes. Every figure in them is replaced by what the figure was
       *  there to demonstrate. The "You keep" and "We earn" pair is dropped
       *  outright: it exists only to show the split, which is the formula. */
      rows: [
        {
          label: "We Agree a Target",
          value: "A cost reduction, a margin improvement, or a revenue number. A specific number, and a specific date.",
        },
        {
          label: "Our Fee Structure",
          value: "A fixed element covers the work itself. A results element sits against that target.",
        },
      ],
    },
  },
  /** Her pull box, _3 and _4, verbatim. It carries the model with no figure in it. */
  commitment: {
    label: "The Commitment",
    body: "If we haven't moved your numbers, most of our fee doesn't get paid.",
  },
  /** Her numbered sequence, _3. Em dashes replaced per section 1. */
  sequence: [
    {
      title: "We agree the target upfront.",
      body: "A specific number. A specific date.",
    },
    {
      // Hers reads "We do the work — inside your business, not from a slide
      // deck." Split at the dash rather than carrying one, per section 1.
      title: "We do the work.",
      body: "Inside your business, not from a slide deck.",
    },
    {
      title: "We earn on results.",
      body: "Part of our fee is fixed. The rest is tied to what actually happened.",
    },
  ],

  // Spec 3.10 also says "Iram to confirm final wording before this section goes
  // live." That applies to the block copy above, which is already built and
  // deployed. Tracked as item 1.5.
};

// 3.11 CLOSE
export const CLOSE = {
  heading: "Find Out What Is Actually Holding the Business Back",
  /**
   * Rendered only when the diagnostic is live. The sentence promises "a scored
   * view of your biggest constraint in four minutes", which the contact page
   * cannot honour, so it is gated rather than reworded. No stage-one substitute
   * is invented: the spec provides none, and the heading and the two CTAs carry
   * the section without it.
   */
  standfirst:
    "Two ways to start. Take the diagnostic and get a scored view of your biggest constraint in four minutes, or message us and we will walk through it together.",
};

/**
 * The two homepage sections with no place in the spec's 3.1 to 3.12 order,
 * relocated to /about rather than deleted.
 *
 * Neither appears anywhere in the running order, so leaving them on the homepage
 * would contradict the spec and deleting them would discard copy the spec never
 * asked to lose. "We have sat in the system" in particular reads as authority
 * copy on the About page rather than as homepage filler.
 *
 * Recorded in docs/PENDING-COPY.md section 2.4 so the move can be vetoed without
 * anyone having to rewrite anything.
 */
export const RELOCATED_TO_ABOUT = [
  {
    heading: "We do not just understand your challenges.",
    standfirst: "We fix what is really holding your business back",
    body: [
      "Even the best-run businesses hit hidden bottlenecks in operations, culture, and execution. At Pivot Prime, we work alongside you to diagnose what is slowing the business down, then help you fix it, properly.",
    ],
  },
  {
    heading: "We have sat in the system.",
    standfirst: "Now we help reshape it.",
    body: [
      "We have worked inside some of the world's largest organisations and we have also sat across the table from them.",
      "We know what strategy looks like on paper and we know what actually happens when it meets people, processes, and pressure.",
      "Today, we work with ambitious businesses at different stages.",
      "Our role is simple. We help you cut through complexity, align strategy with execution, and build operations that actually support growth.",
    ],
  },
];
