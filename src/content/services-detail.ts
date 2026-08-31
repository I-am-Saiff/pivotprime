/**
 * Spec copy for the service pages that the build compressed.
 *
 * The pages were built from the mockups rather than from the spec, and the
 * designer's captions replaced the copy: spec 4.3's five cards, each a full
 * paragraph, arrived as a diagram with two-word labels. Spec section 1 is
 * explicit that green-block copy is used verbatim, and a two-word caption is not
 * a compression of a paragraph, it is an omission of one.
 *
 * The design is kept in every case. Where a caption would repeat a paragraph
 * word for word, the caption goes and the copy carries the meaning, because a
 * diagram of five roles beside five cards naming those roles reads as a mistake.
 * If Iram wants the diagram to say more once she has seen the page, that is a
 * conversation, not a decision to take on her behalf now.
 *
 * Gaps were measured with `npm run audit:copy`, which reads the phrases out of
 * docs/spec.md rather than from anyone's transcription.
 */

export type ServiceDetailCard = { title: string; body: string };

/**
 * The closer at the foot of each service page, 30 August.
 *
 * HERS, VERBATIM, out of the `.closer` block on the matching page of
 * pivotprimeservicepages.html. The pages used to end with a sign-off written
 * here rather than by her; the meeting note keeps the block and points at her
 * file for it, so her eyebrow, heading and line are what ship.
 *
 * ONE LINE IS NOT HERS. Her Fractional Leadership closer reads "The diagnostic
 * will tell you in four minutes, before anyone quotes you anything." The
 * diagnostic is not built, so that sentence would promise an instrument the
 * site cannot honour. The line kept in its place is the one this page has been
 * carrying. PENDING-COPY 0.4 and 1b7.
 */
export const SERVICE_CLOSERS = {
  clarityAudit: {
    eyebrow: "Start here",
    heading: "Almost every engagement begins with the audit.",
    body: "We will not commit to owning outcomes in a business we have not properly diagnosed.",
  },
  fractional: {
    eyebrow: "Next step",
    heading: "Find out which seat is actually missing.",
    body: "A seat for a season, then a structure that holds without us in it. Tell us what is stretched and we will tell you which seat, and for how long.",
  },
  buildAndPlace: {
    eyebrow: "The difference",
    heading: "A consultant tells you what to do. A recruiter finds you someone.",
    body: "Neither one is accountable for whether it worked. That is the gap this service exists to close.",
  },
  techBuilds: {
    eyebrow: "Bring us the problem",
    heading: "An app you want built, or a process that is eating your team.",
    body: "Either works. The only technology work we take on is the kind pointed at a real problem.",
  },
  marketEntry: {
    eyebrow: "Straight answer",
    heading: "We are not interested in launching a business here that will not make money here.",
    body: "If the model says it will not, we would rather tell you before you spend the money than after.",
  },
};

/** Spec 4.3, blocks 6 to 25. */
export const BUILD_AND_PLACE = {
  whyHeading: "Why this exists",
  why: [
    "Most consultancies sell advice and leave the client to execute it. We place people inside the business and stay accountable for the outcome.",
    "Everyone we place is sourced, vetted and managed by us. They report to us rather than to you, which means you are not carrying the recruitment risk, the performance management, or the awkward conversation if it is not working. One contract, one invoice, one accountable party.",
  ],
  rolesHeading: "The seats we place",
  cards: [
    {
      title: "Project management",
      body: "Runs delivery inside your team: the order and project lifecycle, supplier and stakeholder coordination, SLA and timeline tracking, and documentation that outlives the engagement. Used where the plan is clear and the problem is that nothing is being driven.",
    },
    {
      title: "Finance",
      body: "Fractional CFO support: board and investor reporting, cash, runway and forecasting, collections and credit control, statutory reporting, and readiness for the next round. Used where the founder feels the absence of a finance seat every single week.",
    },
    {
      title: "Technology",
      body: "Engineers who build the automation, the CRM, the dashboards and the internal tools. Scoped after the diagnosis, never before it. If the work is a standalone build rather than an embedded seat, see Technology Builds.",
    },
    {
      title: "Marketing and brand",
      body: "Positioning, go-to-market, and the client-facing material that carries it. Used where the operation has been fixed but the business still is not being bought.",
    },
    {
      title: "Web and digital",
      body: "Website design, build and maintenance, and the digital estate around it. Used where the shopfront no longer matches the business behind it.",
    },
  ] satisfies ServiceDetailCard[],
  /**
   * Her column, out of the Build and Place page of
   * pivotprimeservicepages.html. The 30 August structure puts this beside "How
   * it is priced", and neither has been on the page until now.
   */
  notCarryingHeading: "What you are not carrying",
  notCarrying: [
    "Recruitment risk, and the cost of getting it wrong",
    "Performance management and the awkward conversation",
    "Visas, medical cover and end-of-service liability",
    "A permanent salary for a temporary problem",
    "Five separate contracts and five separate invoices",
  ],
  pricedHeading: "How it is priced",
  /** Spec 4.3, split at her file's paragraph break. Same words either way. */
  priced: [
    "We scope the work with you, agree the days and what good looks like, and put it into a single proposal. You pay Pivot Prime and we pay the delivery partner.",
    "If the full team is not affordable, we reduce the scope rather than quietly reducing the quality of who we put in front of you.",
  ],
  scopeLine: "Priced on the roles, the days a month and the length of the engagement.",
};

/** Spec 4.5, THE MISCONCEPTION and WHAT WE BUILD and CLOSE. */
export const MARKET_ENTRY = {
  misconceptionHeading: "The misconception",
  misconception: [
    "The most common assumption is that a business which works elsewhere can be copied into Dubai. Almost nothing pastes cleanly.",
    "The regulatory position changes depending on whether you sit in a free zone or on the mainland. Consumer habits are different: this is a market that lives on delivery apps, expects service levels that would be considered premium elsewhere, and buys through community and word of mouth as much as through marketing.",
    "The commercial calendar is different too. Ramadan reshapes trading for a month, and a large part of your customer base leaves the country over the summer, so a plan built on twelve even months will miss badly. Heat changes how logistics, storage and footfall work for half the year. And the culture rewards relationships and patience, so businesses that arrive expecting to transact at home-market speed stall in ways they cannot explain.",
  ],
  /**
   * Her left column on the UAE Market Entry page of
   * pivotprimeservicepages.html, verbatim. The 30 August structure puts it
   * beside "What we build"; it has not been on the page before.
   */
  numbersHeading: "The numbers come first",
  numbers: [
    "There are hundreds of company formation experts in Dubai who will get you a licence and sometimes a bank account. We support all of that, but the licence is where we start rather than where we stop.",
    "Before anything else we build a financial model with you: every assumption priced in, the investment required, the breakeven point and the expected return.",
    "This is where most international businesses go wrong. They price for this market using home-market assumptions and end up busy but unprofitable.",
  ],
  buildHeading: "What we build",
  build: [
    "Entity structure, licensing and regulatory approvals",
    "A full financial model: investment, breakeven, return, and pricing built for this market",
    "Product and regulatory compliance, so what you sell can legally be sold here",
    "Commercial real estate and office fit-out",
    "Hiring, with local market HR expertise",
    "Manufacturing, logistics and supply chain",
    "Brand localisation and go-to-market",
    "The operating model, and the people to run it once you are live",
  ],
  closeHeading: "Where it ends up",
  close:
    "We take clients from a licence to a functioning, properly priced operation that can actually succeed here. If the model says it will not, we would rather tell you before you spend the money than after.",
};

/** Spec 4.2, blocks 6 to 9 and 14. */
/**
 * The cost taper, from her 22 August service mockup.
 *
 * SHE REVISED THIS AND WE HAD THE OLD ONE. The 13 August mockup drew a curve
 * labelled MONTH 1 / MONTH 3 / MONTH 6+ with two lines: "Senior time required"
 * and "Your monthly cost". The 22 August file replaces it with three phase
 * cards, moves the bands to 1–2 / 3–4 / 5+, names the days a month at each
 * stage, adds what your team is doing alongside, and **removes the monthly cost
 * line**. That removal is hers and it agrees with spec section 1, which allows
 * one price on the site.
 *
 * Static cards rather than her animated curve: every word is in the served HTML,
 * and the involvement bar is decorative, so the day counts are in the sentence
 * rather than only in the bar.
 */
export const FRACTIONAL_PHASES = [
  {
    band: "Months 1–2",
    badge: "Build",
    title: "We lead.",
    pivotPrime:
      // Her mockup writes this with an em dash. Section 1 of her own copy
      // document bans the em dash from the site, so it is a colon here. Recorded
      // in PENDING-COPY 1f alongside the two expanded contractions, because
      // re-punctuating her copy is the same class of change.
      "Primary ownership: 8 to 10 days a month. Setting the operating model, building the team structure, owning the decisions.",
    yourTeam: "Observing, learning the rhythm. Beginning to own the day-to-day tasks.",
    involvement: 90,
  },
  {
    band: "Months 3–4",
    badge: "Transfer",
    title: "We hand it over.",
    pivotPrime:
      "3 to 5 days a month. Coaching your lead, sitting in the critical decisions, closing the remaining gaps.",
    yourTeam: "Running the day-to-day. Escalating where needed. Building confidence in the seat.",
    involvement: 52,
  },
  {
    band: "Month 5+",
    badge: "Running",
    title: "Your team runs it.",
    pivotPrime: "1 to 2 days a month. Available. Not required.",
    yourTeam:
      "Full ownership. The operating model holds itself. Decisions are made without us in the room.",
    involvement: 18,
    yourTeamFirst: true,
  },
];

/** Her closing line under the phase cards, 22 August wording. */
export const FRACTIONAL_PHASES_CAPTION =
  "Most businesses do not need a permanent executive. They need executive-level expertise for a defined season, then a much more junior lead running the day-to-day, with us available, not resident.";

/**
 * The two columns that close the Fractional Leadership page, hers, out of
 * pivotprimeservicepages.html. Neither has been on the site before: the 30
 * August structure puts "Where it does not fit" beside "How it runs", after the
 * seats and before the closer.
 *
 * The first is the page's honest disqualifier, which is why it is worth having:
 * it names the three cases where this service is the wrong answer.
 */
export const FRACTIONAL_FIT = {
  notFitHeading: "Where it does not fit",
  notFit:
    "A complex operation with 200 or more staff, several products and sites in multiple countries needs a permanent COO. A Chief of Staff seat only works where there is a leadership team to serve. And if the problem is one defined project rather than the way the business runs, you need a project manager, which costs less.",
  howHeading: "How it runs",
  how: [
    "Almost every retainer begins with an Operational Clarity Audit, because we will not commit to owning outcomes in a business we have not properly diagnosed. The audit also tells us what the retainer needs to cover, which is why we scope it afterwards rather than before.",
    "The CFO seat is the exception. Where the need is cash, reporting or an imminent raise, we can start there and diagnose alongside it.",
    "Three-month minimum, reviewed quarterly. A meaningful part of the fee can be structured against agreed KPIs.",
  ],
  /** Her section head above the three seat cards. */
  seatsEyebrow: "The seats we fill",
  seatsHeading: "Three seats.",
  seatsHeadingAccent: "Pick the one that is missing.",
};

export const FRACTIONAL = {
  whyHeading: "Why this exists",
  why: [
    "Most growing businesses do not need a permanent executive. They need executive-level expertise for a defined period: someone senior enough to design the operating model, build the processes, set the standard for how things should run, and hold the delivery week to week.",
    "Every seat works the same way. We build the structure, then hand it to someone cheaper to run. A COO builds the operating model and hands the day to day to an operations lead. A Chief of Staff establishes the operating rhythm and decision rights, then leaves them running without needing a person to enforce them. A CFO builds the reporting, forecasting and controls, then hands them to a finance manager or your accountant.",
    "In each case you keep the senior judgement without carrying a full-time executive salary, and the structure keeps working long after the intensive phase ends.",
    "We add seats as demand justifies them.",
  ],
};

/** Spec 4.1, the blocks the designed page compressed. */
export const CLARITY_AUDIT = {
  scopeLine: "Scope depends on the size of the business, how many functions are in review, and how many people we interview. A single-site founder-led business sits at the lower end. A multi-division operation with fifty or more staff is a larger piece of work.",
  whyHeading: "Why this exists",
  why: [
    "Every business has a theory about why growth is harder than it should be. Usually the theory is wrong, or it describes a symptom of something further upstream.",
    "Leaders carry an idealistic picture of how the business works. The people doing the work know what is actually possible. The gap between those two pictures is where almost every operational problem lives. The audit closes it with evidence rather than opinion.",
  ],
  /**
   * THE FOUR RESTORED BLOCKS CARRY HER MOCKUP'S WORDING, NOT THE SPEC'S,
   * from 1 September. She is reviewing the site against
   * req/pivotprime-service-pages-2208.html, so where her file and the copy
   * document disagree her file wins on Saif's ruling.
   *
   * These four are therefore the one place in this file where the strings are
   * NOT spec 4.1's. Every difference is small and every one is a reduction:
   * six things we look at rather than seven, and shorter endings on the other
   * three. The spec's fuller versions are preserved verbatim in
   * docs/PENDING-COPY.md 1c7 rather than deleted, so putting them back is a
   * copy-paste from the record.
   */
  lookHeading: "What we look at",
  look: [
    "The commercial model, pricing, and margin by product, client or service",
    "The P&L, cost structure, working capital and how reliably cash is collected",
    "How work actually flows day to day, and where it stalls or reverses",
    "Which decisions route through the founder, and which genuinely need to",
    "Roles, ownership and accountability, and where they are unclear",
    "Where automation would remove real cost, and where it would add a tool",
  ],
  howHeading: "How we do it",
  how: [
    "One-to-one interviews with the people doing the work, not only the leadership team. Private conversations surface what people will not say in a room.",
    "Process mapping end to end, then a facilitated workshop per function where the team walks the process on screen and stress tests it together. The findings are owned rather than imposed.",
  ],
  getHeading: "What you get",
  get: [
    "An as-is versus to-be map of how work runs today and what changes",
    "A findings report with every gap ranked by risk and by effort",
    "A prioritised roadmap: what to fix now, what can wait",
    "A baseline set of measurements to judge the improvements against",
    "A costed view of what to fix internally and what needs outside capacity",
    "An executive summary written for owners and investors",
  ],
  afterHeading: "What happens after",
  after: ["The audit ends with a decision, not a filing cabinet. Some clients take the roadmap and execute it themselves, and that is a legitimate outcome. Most ask us to run some or all of it. We will tell you plainly which of those the findings actually justify."],
  pricingHeading: "Pricing and margin engagements",
  pricing: [
    "Sometimes the constraint is not the process, it is the price. We look at contribution margin, delivery effort, variability and risk across every client, product and contract, then design pricing logic you can defend.",
    "This runs either as part of a full audit, or as a standalone piece of work where pricing is clearly the problem.",
  ],
};

/**
 * Technology Builds, spec 4.4.
 *
 * GENERATED FROM docs/spec.md, not transcribed. Every string below was read out
 * of the document by scripts/ at build-authoring time, so the words in this file
 * are the document’s own. PENDING-COPY section 1c exists because ten sentences
 * were quietly tightened when a human typed them.
 */
export const TECH_BUILDS = {
  heading: "Technology Builds",
  standfirst: "Software, automation and AI, built after the diagnosis rather than instead of it.",
  priceLabel: "Scoped per engagement",
  priceDetail: "Priced on the build itself, the systems it has to connect to, and whether you want us to run it afterwards.",
  argument: {
    claim: "We do not sprinkle AI over a business and call it transformation.",
    body: ["A business moves at the speed of its biggest constraint. Making everything else faster only builds a longer queue in front of it. So, before we build anything we find out where the business is actually losing time, margin or control, and then we build at that point.", "That is the difference between technology that pays for itself and technology that becomes another subscription nobody opens."],
  },
  /**
   * The capability grid. Spec 4.4 blocks 11 to 17 verbatim, each paired with a
   * short label so the grid reads as a set of capabilities rather than a list
   * of sentences. The labels are ours; the sentence under each is hers.
   *
   * TWO ARE AUTHORED IN FULL and are marked. Saif named mobile applications and
   * agentic web applications as capabilities on 26 August; 4.4 covers websites,
   * custom applications and AI agents but neither of those two phrases. Logged
   * in PENDING-COPY 1al rather than quietly folded into her list.
   */
  /** Authored. The grid needed a heading and the two authored tiles needed
   *  naming as ours in public. PENDING-COPY 1al. */
  capabilityHeading: "Nine things we build, and one rule about when we build them",
  capabilityNote:
    "Every one of these is scoped against a defined problem first. We do not start a build to find out whether it was needed.",
  capabilityGrid: [
    { label: "Websites and digital estate", spec: true, body: "Websites: design, build, maintenance and the digital estate around them" },
    { label: "CRM builds", spec: true, body: "CRM build and configuration, including migration from spreadsheets and inherited systems" },
    { label: "Business process automation", spec: true, body: "Workflow automation across sales, operations, finance and fulfilment" },
    { label: "Dashboards and reporting", spec: true, body: "Dashboards and management reporting, so decisions are made on numbers rather than instinct" },
    { label: "Systems integration", spec: true, body: "Integrations between the systems you already pay for and are not getting value from" },
    { label: "Internal tools", spec: true, body: "Internal tools and custom applications where nothing off the shelf fits" },
    { label: "AI integrations and agents", spec: true, body: "AI agents and assistants, where they remove real cost rather than add a feature" },
    { label: "Agentic web applications", spec: false, body: "Web applications that carry out a task end to end rather than presenting a form and waiting." },
    { label: "Mobile applications", spec: false, body: "Native and cross-platform apps, where the work genuinely happens away from a desk." },
  ],
  capabilities: [
    "Websites: design, build, maintenance and the digital estate around them",
    "CRM build and configuration, including migration from spreadsheets and inherited systems",
    "Workflow automation across sales, operations, finance and fulfilment",
    "Dashboards and management reporting, so decisions are made on numbers rather than instinct",
    "Integrations between the systems you already pay for and are not getting value from",
    "Internal tools and custom applications where nothing off the shelf fits",
    "AI agents and assistants, where they remove real cost rather than add a feature",
  ],
  /**
   * RESTORED 26 AUGUST. PENDING-COPY 1f listed these as copy we had written to
   * fill gaps and retired. They are hers, out of the toggle on the Technology
   * Builds page of her service mockup, and have been in req/ since 13 August.
   * We deleted her copy believing it was ours.
   *
   * Her mockup runs them as a two-state toggle and injects the second caption
   * from script, so the second half is not in her served HTML at all. Both are
   * rendered here as a static contrast: same words, both halves in the page as
   * it arrives, no interaction to hide either from a crawler.
   */
  constraintContrast: [
    {
      label: "Automate everything",
      body: "Speed up everything except the bottleneck and the queue in front of it simply gets longer. The business feels busier and delivers exactly as much as it did before.",
    },
    {
      label: "Fix the constraint first",
      body: "Automate the approval step itself and the whole line clears. Nothing else in the process changed. That is why we find the constraint before we build anything.",
    },
  ],
  /** Also hers, from the "Where this starts" panel of the same mockup. */
  bringUsTheProblem: {
    label: "Bring us the problem",
    heading: "An app you want built, or a process that is eating your team.",
    body: "Either works. The only technology work we take on is the kind pointed at a real problem.",
  },
  howItRunsHeading: "How it runs",
  /** Spec 4.4, split at her file's paragraph break. Same words either way. */
  howItRuns: [
    "We scope the build against a defined problem and agree what it has to change. We build it, test it with the people who will actually use it, and hand it over with documentation rather than a demo.",
    "If you want us to run and maintain it afterwards, we can. If you want to own it outright, you own it, including the code.",
  ],
  whereThisStartsHeading: "Where this starts",
  whereThisStarts: "If you already know what you need built, we can start there. If you are not certain the technology is the actual constraint, start with an audit and we will tell you honestly whether a build is the right answer.",
};

/**
 * The three seats, spec 4.2, restored 29 August.
 *
 * RECOVERED FROM GIT, NOT RETYPED. The 28 August cut took these panels off the
 * page and PENDING-COPY 1ar preserved only `why`, so the copy existed nowhere
 * but in the commit before the cut. It is lifted out of 22a0b4e^ verbatim and
 * put in the content file this time, so a change to the markup can no longer
 * take the words with it. PENDING-COPY 1at called this "the core of the page".
 *
 * THE ANCHORS ARE LOAD-BEARING. Spec 4.2: the persona pages and the homepage
 * services card link into #coo, #chief-of-staff and #cfo directly. While these
 * panels were gone those links landed on a page with no such anchor.
 *
 * ALL THREE RENDER AT ONCE. The pre-cut version put them behind a tab, so two
 * of the three were absent from the served HTML: that is the defect AGENTS.md
 * records as "two thirds of the fractional page, behind a tab".
 */
export type Seat = { title: string; short: string; h: string; l: string[]; n: string };

export const SEATS: Seat[] = [
    {
      title: "Fractional COO",
      short: "Owns execution",
      h: "What the COO seat covers",
      l: [
        "Ownership of execution against an agreed plan, with weekly accountability",
        "The operating model, decision rights and operating rhythm",
        "Process design, SOPs and operational governance",
        "Supplier, cost and margin discipline",
        "Hiring, team structure and onboarding",
        "Dashboards and reporting, so decisions are made on numbers rather than instinct",
        "Managing the delivery team, whether that is your people or ours",
      ],
      n: "The operating model, the weekly delivery, the team. For businesses where the work happens but nothing finishes predictably.",
    },
    {
      title: "Fractional Chief of Staff",
      short: "Owns follow-through",
      h: "What the Chief of Staff seat covers",
      l: [
        "Translating strategic decisions into work that actually moves",
        "Priority management across functions, and resolving the ones that collide",
        "Preparing the leadership team for the decisions ahead of them",
        "Chairing and running the operating rhythm: the meetings, the agendas, the follow-through",
        "Managing cross-functional programmes that have no natural owner",
        "Protecting senior attention, so the leadership team works on what only they can do",
        "Sitting in the meetings that matter, including board and investor conversations",
      ],
      n: "Translates decisions into movement across functions, manages the priorities that collide, and keeps senior attention on what matters. For complex organisations where the strategy is right and cannot land on its own.",
    },
    {
      title: "Fractional CFO",
      short: "Owns the numbers",
      h: "What the CFO seat covers",
      l: [
        "Cash, runway and rolling forecasts",
        "Management reporting and the board pack",
        "Collections, credit control and working capital",
        "Pricing, margin and unit economics",
        "Fundraising readiness: the model, the data room and the numbers behind the story",
        "Budgeting, cost control and supplier terms",
        "Statutory reporting, audit and compliance coordination",
      ],
      n: "Cash, runway and forecasting, collections, board and investor reporting, and readiness for the next round. For businesses raising capital, or where the founder feels the absence of a finance seat every week.",
    },
  ];
