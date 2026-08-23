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
  heading: "The consultancy that actually executes",
  /** Set noticeably larger than the paragraph beneath it. Spec 3.1: "That
   *  sentence is doing the most work on the page, so give it room." */
  lead: "Most consultants recommend the fix. We build it.",
  body: "We combine fractional C-suite leadership with hands-on execution capability. We find what is holding your business back, then bring the people, systems and technology to fix it.",
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
export const CLIENT_LOGOS = [
  { src: "/logos/logo-text-block-2.jpg", alt: "Client logo" },
  { src: "/logos/clogo3a.jpg", alt: "Client logo" },
  { src: "/logos/Frame-17.jpg", alt: "Client logo" },
  { src: "/logos/insurancehub-with-bg-white.jpg", alt: "Insurance Hub" },
  { src: "/logos/stydio-with-bg.jpg", alt: "Stydio" },
  { src: "/logos/instagram.jpg", alt: "Client logo" },
  { src: "/logos/man-cave-with-bg.jpg", alt: "Man Cave" },
  { src: "/logos/bop-foundation-with-bg-white.jpg", alt: "Birds of Paradise Foundation" },
  { src: "/logos/nivishe.jpg", alt: "Nivishe" },
];

/**
 * TODO(client): five of the nine logo files are unidentifiable from their
 * filenames, so their alt text is a generic "Client logo". Spec 4.5 asks for
 * descriptive alt text naming what the image actually is. Iram to confirm which
 * client each of logo-text-block-2, clogo3a, Frame-17 and instagram belongs to,
 * alongside the spec 10 decision 1 sign-off on which clients may be named at
 * all. Tracked in docs/PENDING-COPY.md item 1.14.
 */
export const LOGOS_NEED_ALT_TEXT = true;

// 3.3 RESULTS
export const RESULTS = {
  heading: "This is what our team has delivered",
  standfirst: "We do not measure success in slide decks. We measure what changed.",
};

export type Metric = {
  figure: number | null;
  suffix: string;
  label: string;
  context: string;
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
 * The five figures below are the exact values in v1.7.1, which tightened the
 * earlier ranges into single numbers. They carry an "IRAM TO CONFIRM ... against
 * the master table in Section 9" instruction, and section 9 still records a
 * direct contradiction on operational waste, so these are built as specified and
 * await sign-off before launch. Tracked as items 1.3 and 1.4.
 *
 * TODO(client): metric 6 has no figure. Spec 3.3 marks it "SAIF TO SUPPLY" and
 * is explicit: "Do not launch this card with a placeholder." It is therefore
 * filtered out entirely rather than shown with an XX, and appears the moment the
 * number lands. Tracked as item 1.2.
 */
export const METRICS: Metric[] = [
  {
    figure: null,
    suffix: "%",
    pending: "client-confirmation",
    label: "Faster execution across teams",
    context: "Decision rights, operating rhythm and delivery ownership rebuilt.",
  },
  {
    figure: null,
    suffix: "%",
    pending: "client-confirmation",
    label: "Reduction in duplicated work, rework and inefficiency",
    context:
      "Processes mapped end to end and redesigned around how the work actually flows.",
  },
  {
    figure: null,
    suffix: "%",
    pending: "client-confirmation",
    label: "Increase in customer retention",
    context: "Service cancellation drivers identified and addressed.",
  },
  {
    figure: null,
    suffix: "%",
    pending: "client-confirmation",
    label: "Increase in profit",
    context: "Pricing, margin and commercial model redesigned.",
  },
  {
    figure: null,
    suffix: "%",
    pending: "client-confirmation",
    label: "Faster transaction processing",
    context: "End to end customer and transaction workflows mapped and rebuilt.",
  },
  {
    figure: null,
    suffix: "",
    pending: "not-yet-supplied",
    label: "Bespoke software and automation builds delivered",
    context: "Custom systems, CRMs, dashboards and automations built for clients.",
  },
];

// 3.5 THE PATTERNS
export const PATTERNS = {
  heading: "These are the patterns before growth stalls",
  eyebrow: "Recognise any of these",
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
  ctaLabel: "Talk to our team",
};

// 3.7 THE PERSON BEHIND IT
export const FOUNDER = {
  heading: "Pivot Prime is led by a Mathematician, and that changes how the work gets done.",
  body: [
    "Iram Kauser is one of roughly 75,000 qualified actuaries worldwide. She spent sixteen years in senior operating roles at AIG, MetLife and Gallagher across the UK, the Middle East and Africa: Chief of Staff to a regional CEO across more than 150 staff, and pricing and portfolio strategy for a multi-line book worth more than $120 million.",
    "People will tell you a process is fine, or that the real problem is headcount. A numbers-led approach takes the emotion out of it. We measure how long each step actually takes, the pass and fail rates, the man hours per function and the cost per transaction, before anyone argues about what to change.",
  ],
  ctaLabel: "Meet the team",
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
  portrait: { src: "/iram-kauser.jpg", alt: "Iram Kauser, Founder and CEO of Pivot Prime" } as {
    src: string;
    alt: string;
  } | null,
};

// 3.10 HOW WE ARE PAID
export const HOW_WE_ARE_PAID = {
  heading: "Most consultants are paid for the recommendation",
  lead: "We are paid partly on whether the numbers move.",
  body: [
    "Before anything changes we baseline it: how long each step takes, pass and fail rates, man hours per function, cost per transaction. Then we agree which of those numbers has to move and by when, and a meaningful part of our fee sits on the other side of them moving.",
    "It is a discipline rather than a sales device. You cannot bill on outcomes unless you were serious about measuring in the first place.",
  ],
  // Spec 3.10: "Do not publish a specific percentage or a formula here." None is
  // published. The section is built from the spec's own block and awaits Iram's
  // confirmation before launch, not before build. Item 1.5.
};

// 3.11 CLOSE
export const CLOSE = {
  heading: "Find out what is actually holding the business back",
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
