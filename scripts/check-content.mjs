#!/usr/bin/env node
/**
 * Spec conformance check against the served HTML.
 *
 * Fetches each route's raw HTML, with no browser and no JavaScript, and asserts
 * that the copy the spec requires is actually in it.
 *
 * This exists because of a defect no amount of looking at the site would have
 * found. CountUp initialised its state to zero, so every result figure on the
 * homepage was the string "0" in the server-rendered HTML. The page looked
 * perfect and served crawlers a set of zero per cent improvements, on the one
 * page whose entire job is credibility.
 *
 * Spec 4.5: "Server-side render or pre-render the content. If the copy only
 * appears after JavaScript runs, it is working against you."
 *
 * A plain fetch is the right tool. A browser would run the JavaScript and hide
 * the exact failure being tested for.
 *
 * Every assertion names the spec clause it enforces, so a failure reads as
 * "this page violates spec 5.1" rather than "this string is missing". That makes
 * this file the single place a copy revision lands.
 *
 * Usage:
 *   node scripts/check-content.mjs [baseUrl]
 *   CHECK_BASE_URL=http://localhost:3987 node scripts/check-content.mjs
 */

const BASE = process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000";

/**
 * `text` is matched against the tag-stripped page, so a phrase split across
 * elements still matches. `html` is matched raw, for attributes such as anchor
 * ids and for figures where the surrounding tags disambiguate.
 */
const EXPECTATIONS = [
  {
    route: "/",
    assert: [
      { spec: "3.1", text: "The consultancy that actually executes", why: "hero H1" },
      { spec: "3.1", text: "Most consultants recommend the fix. We build it.", why: "hero lead" },
      { spec: "3.1", text: "Find out what is holding your business back", why: "hero primary CTA" },
      { spec: "3.1", text: "See what we actually do", why: "hero secondary CTA" },
      { spec: "3.2", text: "Trusted by businesses across insurance", why: "proof bar" },
      { spec: "3.2", html: "westasiawatch.com", why: "publication link" },
      { spec: "3.2", html: "thearabianmirror.com", why: "publication link" },
      { spec: "3.3", text: "This is what our team has delivered", why: "results heading" },
      { spec: "3.3", text: "We do not measure success in slide decks", why: "results standfirst" },
      // The figures are the content. All five were "0" before the CountUp fix.
      // The five figures are NOT asserted present. They are asserted ABSENT,
      // in DECISIONS below. Spec 3.3 does not clear them to publish.
      { spec: "3.3", text: "Faster execution across teams", why: "metric 1 label" },
      { spec: "3.3", text: "Reduction in duplicated work, rework and inefficiency", why: "metric 2 label" },
      { spec: "3.3", text: "Increase in customer retention", why: "metric 3 label" },
      { spec: "3.3", text: "Increase in profit", why: "metric 4 label" },
      { spec: "3.3", text: "Faster transaction processing", why: "metric 5 label" },
      { spec: "3.4", text: "What do we actually do", why: "services heading" },
      { spec: "3.4", html: 'id="services"', why: "the hero secondary CTA anchors here" },
      { spec: "pricing rule", text: "From AED 15,000", why: "the only price on the site" },
      { spec: "3.5", text: "These are the patterns before growth stalls", why: "patterns heading" },
      { spec: "3.5", text: "Sales sells things operations cannot deliver", why: "first pattern" },
      { spec: "3.5", text: "You keep losing customers", why: "tenth pattern, proves the whole list is served" },
      { spec: "3.7", text: "Pivot Prime is led by a Mathematician", why: "founder section heading" },
      { spec: "3.7", text: "roughly 75,000 qualified actuaries worldwide", why: "founder credential" },
      { spec: "3.8", text: "What we have achieved", why: "case studies heading" },
      // The anonymised three moved to /about on 26 August, because her own
      // pp-case-studies.html numbers Cinnacare and Scentmatic as case studies 1
      // and 2 and calls the other three the anonymised set. Their results are
      // asserted on /about now, not deleted. PENDING-COPY 1y.
      { spec: "3.8", text: "Cinnacare", why: "case study 1, named" },
      { spec: "3.8", text: "Scentmatic", why: "case study 2, named" },
      { spec: "3.9", text: "You don", why: "persona cards retained, tagged KEEP" },
      { spec: "3.10", text: "Most consultants are paid for the recommendation", why: "3.10 block 0, now the H3 over the traditional-model column" },
      { spec: "her fees mockup", text: "Most consultants charge whether it works or not.", why: "her heading, now the lead line under the H2" },
      { spec: "3.10", text: "We are paid partly on whether the numbers move.", why: "how we are paid lead" },
      { spec: "3.11", text: "Find out what is actually holding the business back", why: "close heading" },
    ],
  },

  // SERVICE PAGES, spec 4.
  {
    route: "/services",
    assert: [
      { spec: "4", text: "What do we actually do", why: "parent reuses the 3.4 section" },
      { spec: "4", text: "Operational Clarity Audit", why: "audit listed first" },
    ],
  },
  {
    route: "/services/operational-clarity-audit",
    assert: [
      { spec: "4.1", text: "Operational Clarity Audit", why: "hero" },
      { spec: "4.1", text: "From AED 15,000", why: "the audit floor" },
      { spec: "4.1", text: "Typically 12 to 20 working days", why: "hero duration" },
    ],
  },
  {
    route: "/services/fractional-leadership",
    assert: [
      { spec: "4.2", text: "Fractional Leadership", why: "H1 stays as 4.2 wrote it" },
      // The three seat anchors were load-bearing assertions until 28 August,
      // when the client had every service page cut back to its hero. They are
      // not deleted: they are inverted below, in DECISIONS, so a section coming
      // back without her say-so fails and names PENDING-COPY 1ar.
    ],
  },
  { route: "/services/build-and-place", assert: [{ spec: "4.3", text: "Build and Place", why: "hero" }] },
  { route: "/services/technology-builds", assert: [{ spec: "4.4", text: "Technology Builds", why: "hero" }] },
  { route: "/services/uae-market-entry", assert: [{ spec: "4.5", text: "UAE Market Entry", why: "hero" }] },

  // PERSONA PAGES, spec 5. Hero copy is KEEP; the sub-line under each block is
  // FIX and must name a real service.
  {
    route: "/for-founders",
    assert: [
      { spec: "5.1", text: "Through an Operational Clarity Audit. From AED 15,000.", why: "block 1 sub-line" },
      { spec: "5.1", text: "Through hiring support, role design and Build and Place.", why: "block 2 sub-line" },
      { spec: "5.1", text: "Through Fractional Leadership. Scoped per engagement.", why: "block 3 sub-line, renamed from the spec's \"Fractional COO retainer\" per slide 13. PENDING-COPY 1u" },
    ],
  },
  {
    route: "/for-smes",
    assert: [
      { spec: "5.2", text: "Through an Operational Clarity Audit. From AED 15,000.", why: "block 1 sub-line" },
      { spec: "5.2", text: "Part of an Operational Clarity Audit, or scoped on its own.", why: "block 2 sub-line" },
      { spec: "5.2", text: "Through Fractional Leadership. Scoped per engagement.", why: "block 3 sub-line, renamed from the spec's \"Fractional COO retainer\" per slide 13. PENDING-COPY 1u" },
    ],
  },
  {
    route: "/for-corporate-leaders",
    assert: [
      { spec: "5.3", text: "Through Build and Place. Scoped per engagement.", why: "blocks 1 and 2 sub-line" },
    ],
  },
  {
    route: "/for-pl-owners",
    assert: [
      { spec: "2.5", text: "This is a 2 to 12 week reset", why: "typographical correction" },
    ],
  },

  {
    route: "/about",
    assert: [
      { spec: "6.3", html: 'id="team"', why: "anchor target for /about#team" },
      { spec: "6", html: 'id="case-studies"', why: "anchor target for /about#case-studies" },
      { spec: "6", text: "13% increase in member retention", why: "case studies also render here" },
      { spec: "6", text: "67% faster transaction processing", why: "moved off the homepage, so /about is the only place this result is served" },
      { spec: "slide 21", text: "Execution partners.", why: "hero, first line" },
      { spec: "slide 21", text: "We've been on both sides of the table.", why: "who we are heading" },
      { spec: "slide 21", text: "The people you work with directly.", why: "team heading" },
      { spec: "slide 21", text: "Saif Ur Rehman", why: "the fourth team card, added on instruction" },
      { spec: "slide 22", text: "One point of contact. Zero coordination overhead.", why: "the bench pill" },
      { spec: "slide 22", text: "Investor Relations", why: "the twentieth capability label" },
    ],
  },
  {
    route: "/contact",
    assert: [
      { spec: "2.3", text: "hello@pivotprime.ae", why: "form routes to this inbox" },
      // The form must post natively, so it works with JavaScript off. The
      // previous button was type="button" with no handler and did nothing at all.
      { spec: "2.3", html: 'action="/api/enquiry"', why: "posts without JavaScript" },
      { spec: "2.3", html: 'method="post"', why: "posts without JavaScript" },
      { spec: "2.2", text: "WhatsApp", why: "visible fallback beside the form" },
    ],
  },
  {
    route: "/insights",
    assert: [{ spec: "2.1", text: "Insights", why: "renamed from Prime Insights" }],
  },
  {
    route: "/privacy",
    assert: [
      { spec: "2.7", text: "Privacy policy", why: "page exists" },
      { spec: "2.7", text: "What we collect", why: "policy section" },
    ],
  },
];

/**
 * Deliberate decisions that live only as a code detail.
 *
 * A correct decision with no assertion behind it is one refactor away from being
 * silently undone. Not hypothetical: migrating /privacy onto the shared metadata
 * helper dropped its noindex, which has to hold until a UAE-qualified adviser
 * signs the policy text off. Nothing failed, because nothing was watching.
 *
 * Each entry is a decision recorded in prose elsewhere. This is the part that
 * notices when it stops being true.
 */
const DECISIONS = [
  {
    what: "the spec 3.6 section is off the homepage, per her slide 6 comment",
    where: "PENDING-COPY 1w",
    run: async (get) => {
      const html = await (await get("/")).text();
      return /Knowing what is wrong is hard/.test(html)
        ? "spec 3.6 is rendering again; her comment on slide 6 says remove it"
        : null;
    },
  },
  {
    what: "/services/how-we-work is unpublished, per her slide 17 comment",
    where: "PENDING-COPY 1x",
    run: async (get) => {
      const res = await get("/services/how-we-work");
      return res.status === 404 ? null : `expected 404, got ${res.status}`;
    },
  },
  {
    what: "the five result figures are the ones the client authorised, overriding the Section 9 table",
    where: "PENDING-COPY 1am",
    run: async (get) => {
      const html = await (await get("/")).text();
      // 27 August: the client authorised these five on the call, pointing at her
      // own pivot-prime-kpi-cards_3.html and at her deck comment saying the HTML
      // was provided to build them. The assertion flipped direction with the
      // decision: it used to prove the figures were absent, and now proves the
      // five she authorised are the five on the page, so a stray edit cannot
      // quietly reintroduce a Section 9 value or drop one of hers.
      const block = html.match(/<ul[^>]*data-metric-cards[\s\S]*?<\/ul>/);
      if (!block) return "the metric card list is not in the served HTML at all";
      // Her design colours the figure and its unit differently, so "+7%" is two
      // elements in the markup. Tags are stripped before matching: the previous
      // version searched the raw HTML and reported four of the five missing on
      // a page that showed all five.
      const text = block[0].replace(/<[^>]+>/g, "").replace(/<!--[\s\S]*?-->/g, "");
      const authorised = ["+7%", "43%", "+13%", "+27%", "67%"];
      const missing = authorised.filter((f) => !text.includes(f));
      if (missing.length) {
        return `${missing.join(", ")} missing from the cards, but PENDING-COPY 1am records all five as authorised by the client on 27 August`;
      }
      // The Section 9 values she overrode. 27 and 67 are hers as well, so only
      // the three that are hers alone can be tested for.
      const superseded = [53, 62, 16].filter((n) => new RegExp(`\\b${n}%`).test(text));
      if (superseded.length) {
        return `${superseded.join(", ")} is a Section 9 value, and PENDING-COPY 1am records the mockup as overriding that table`;
      }
      return /Faster execution across teams/.test(html)
        ? null
        : "the figures are there but the approved copy is not, so the cards are numbers with nothing attached";
    },
  },
  {
    what: "/diagnostic 404s while the flag is off",
    where: "PENDING-COPY 0.1",
    run: async (get) => {
      const res = await get("/diagnostic");
      return res.status === 404 ? null : `expected 404, got ${res.status}`;
    },
  },
  {
    what: "/privacy carries noindex while the policy is unsigned",
    where: "PENDING-COPY item 1.8",
    run: async (get) => {
      const html = await (await get("/privacy")).text();
      return /<meta name="robots" content="[^"]*noindex/.test(html)
        ? null
        : "no noindex, but the policy text is not signed off";
    },
  },
  {
    what: "the sitemap excludes the gated diagnostic",
    where: "PENDING-COPY 0.1",
    run: async (get) => {
      const xml = await (await get("/sitemap.xml")).text();
      return xml.includes("/diagnostic") ? "sitemap lists the gated route" : null;
    },
  },
  {
    what: "robots.txt disallows the gated diagnostic and the API",
    where: "spec 4.5",
    run: async (get) => {
      const txt = await (await get("/robots.txt")).text();
      if (!txt.includes("Disallow: /api/")) return "does not disallow /api/";
      if (!txt.includes("Disallow: /diagnostic")) return "does not disallow the gated route";
      return txt.includes("Sitemap:") ? null : "does not point at the sitemap";
    },
  },
  {
    what: "the What We Offer heading stays an H2",
    where: "spec 5.3",
    run: async (get) => {
      const html = await (await get("/for-pl-owners")).text();
      // Case-insensitive from 30 August: the heading went to sentence case on
      // the selective-capitalisation instruction, and this check is about the
      // heading LEVEL, not its casing.
      if (/<h1[^>]*>[^<]*What we offer/i.test(html)) return "it is an H1, spec 5.3 says demote to H2";
      return /<h2[^>]*>[^<]*What we offer/i.test(html) ? null : "heading not found as an H2";
    },
  },
  {
    what: "the six permanent redirects still resolve",
    where: "spec 2.1 and 2.4",
    run: async (get) => {
      const pairs = [
        ["/what-we-do", "/services"],
        ["/who-we-are", "/about"],
        ["/our-blog", "/insights"],
        ["/for-corporate-owners", "/for-pl-owners"],
        ["/contact-us", "/contact"],
        // Reversed 25 August. fractional-leadership is canonical now and the
        // COO slug redirects to it, per slide 13 and spec 4.2.
        ["/services/fractional-coo", "/services/fractional-leadership"],
      ];
      for (const [from, to] of pairs) {
        const res = await get(from, { redirect: "manual" });
        if (res.status !== 308) return `${from} returned ${res.status}, expected 308`;
        const location = res.headers.get("location") ?? "";
        if (!location.endsWith(to)) return `${from} goes to ${location}, expected ${to}`;
      }
      return null;
    },
  },
  {
    what: "the spec 5.2 pricing paragraph is off /for-smes, so all three cards carry the same shape",
    where: "PENDING-COPY 1aa",
    run: async (get) => {
      const html = await (await get("/for-smes")).text();
      return /contribution margin, delivery effort, variability and risk/.test(html)
        ? "the paragraph is rendering again; the three cards on the page no longer match each other"
        : null;
    },
  },
  {
    what: "the spec 5 routing block is off all four Who it's for pages",
    where: "PENDING-COPY 1c1",
    run: async (get) => {
      // INVERTED, NOT DELETED. Four of these sentences were required
      // assertions until 31 August, when she asked for the block removed from
      // every persona page. Asserting their absence keeps the decision guarded:
      // a failure here reads as "the routing block came back", which is what
      // deleting the assertions outright would have stopped anyone noticing.
      const gone = [
        ["/for-founders", "Most founders start with the audit"],
        ["/for-smes", "Most SMEs start with the audit"],
        ["/for-corporate-leaders", "You do not need to hire for everything"],
        ["/for-corporate-leaders", "How we staff an engagement"],
        ["/for-pl-owners", "rather than a long list of initiatives that compete"],
        // The links that sat under each sentence. They are still on the
        // homepage and on /services, which is why removing them orphans
        // nothing; here they must be absent.
        ["/for-founders", "See what the audit covers"],
        ["/for-smes", "See what the audit covers"],
        ["/for-pl-owners", "See what tech we can build"],
      ];
      for (const [route, needle] of gone) {
        const html = await (await get(route)).text();
        if (html.includes(needle)) {
          return `the routing block is back on ${route}: "${needle}" is rendering again`;
        }
      }
      return null;
    },
  },
  {
    what: 'the persona card 3 sub-lines say "Fractional Leadership", not the spec\'s "Fractional COO retainer"',
    where: "PENDING-COPY 1u",
    run: async (get) => {
      for (const route of ["/for-founders", "/for-smes"]) {
        const html = await (await get(route)).text();
        if (/Fractional COO retainer/.test(html)) {
          return `${route} names the COO retainer again, while the nav and the service page say Fractional Leadership`;
        }
      }
      return null;
    },
  },
  {
    what: "spec 6.1, 6.2 and the 6.3 roles layer are off /about, replaced by her slides 21 and 22",
    where: "PENDING-COPY 1ab",
    run: async (get) => {
      const html = await (await get("/about")).text();
      const back = [
        "Why Pivot Prime exists",
        "At Pivot Prime, we bring four things into every engagement",
        "How we staff an engagement",
        "We have sat in the system.",
      ].filter((needle) => html.includes(needle));
      return back.length
        ? `${back.join("; ")} rendering again on /about, which her About redesign replaced`
        : null;
    },
  },
  {
    what: "the About card says $100 million and the homepage says $120 million, deliberately",
    where: "PENDING-COPY 1i",
    run: async (get) => {
      const about = await (await get("/about")).text();
      const home = await (await get("/")).text();
      if (!about.includes("worth over $100 million")) {
        return "the About card no longer says $100 million, which is what slide 21 says";
      }
      if (!home.includes("more than $120 million")) {
        return "the homepage no longer says $120 million, which is what spec 3.7 and the live site say";
      }
      return null;
    },
  },
  {
    what: "the homepage carries only the two named case studies, and the anonymised set sits on /about",
    where: "PENDING-COPY 1y",
    run: async (get) => {
      const home = await (await get("/")).text();
      const about = await (await get("/about")).text();
      for (const named of ["Cinnacare", "Scentmatic"]) {
        if (!home.includes(named)) return `${named} is not on the homepage; her file numbers it as a case study 1 or 2`;
      }
      for (const anon of ["Financial Services Company", "Founder-Led Business", "Fitness and Wellness Company"]) {
        if (home.includes(anon)) return `${anon} is back on the homepage; her file puts the anonymised three on /about only`;
        if (!about.includes(anon)) return `${anon} is not on /about, so moving it off the homepage dropped it`;
      }
      return null;
    },
  },
  {
    what: "the fees section carries no figure but the audit floor, and no percentage or formula",
    where: "PENDING-COPY 1ae and 1h",
    run: async (get) => {
      const html = (await (await get("/")).text()).replace(/<[^>]+>/g, " ");
      const banned = ["$400,000", "$320,000", "$80,000", "20% of savings", "20% of what"];
      const leaked = banned.filter((b) => html.includes(b));
      if (leaked.length) {
        return `${leaked.join(", ")} published. Section 1 allows one price on the site and 3.10 says "Do not publish a specific percentage or a formula here"`;
      }
      return html.includes("AED 15,000") ? null : "the audit floor is gone, so the section names no price at all";
    },
  },
  {
    what: "the fees section is her slide 9, cut to the contrast and the commitment and nothing else",
    where: "PENDING-COPY 1al",
    run: async (get) => {
      const html = await (await get("/")).text();
      // 27 August, on the client's verbal instruction: the fees chapter was
      // reduced to her slide 9 of Website Revisions 2208v3. The <details> and
      // everything it held are gone, so this asserts the reduction held rather
      // than asserting the expander serves its contents.
      for (const gone of [
        "How the work is measured, and how it runs",
        "Before anything changes we baseline it",
        "It is a discipline rather than a sales device",
      ]) {
        if (html.includes(gone)) return `"${gone.slice(0, 40)}" is back on the page, so the section has grown again`;
      }
      for (const needed of [
        "Most consultants charge whether it works or not.",
        "If we haven't moved your numbers",
      ]) {
        if (!html.includes(needed)) return `"${needed.slice(0, 40)}" is missing, so her slide 9 is not what renders`;
      }
      return null;
    },
  },
  {
    what: "the fee calculator's default state is server-rendered, so the figures are not blank without JavaScript",
    where: "PENDING-COPY 1an",
    run: async (get) => {
      const html = await (await get("/")).text();
      // Each figure is one string in the component precisely so this can find
      // it. JSX interpolation splits "AED {value}" into two text nodes with a
      // comment between them, which no grep for the whole figure can match.
      for (const needed of ["AED 400,000", "AED 20,000", "AED 40,000 to 80,000"]) {
        if (!html.includes(needed)) {
          return `"${needed}" is not in the served HTML, so the calculator renders blank without JavaScript`;
        }
      }
      return null;
    },
  },
  {
    what: "the five service pages carry the structure of her own file, and the blocks the 30 August meeting removed are gone",
    where: "PENDING-COPY 1b7",
    run: async (get) => {
      // THIRD STATE OF THIS GUARD. It asserted the absence of these sections
      // after the 28 August cut, then their presence after she reversed that on
      // 29 August. The 30 August meeting rebuilds each page to the structure of
      // pivotprimeservicepages.html, so what it asserts now is that structure:
      // what her file has is present, what the meeting took out is gone, and
      // the load-bearing anchors survived the rebuild.
      const SERVICE_ROUTES = [
        "/services/operational-clarity-audit", "/services/fractional-leadership",
        "/services/build-and-place", "/services/technology-builds", "/services/uae-market-entry",
      ];

      // Still hers, still absent, from 29 August.
      for (const route of SERVICE_ROUTES) {
        const html = await (await get(route)).text();
        if (html.includes("Why this exists")) {
          return `"Why this exists" is back on ${route}; the client removed it on 29 August`;
        }
      }

      // Present: her structure. The seat anchors are the load-bearing ones,
      // spec 4.2, and the two columns each page gained on 30 August.
      const present = [
        ["/services/fractional-leadership", 'id="coo"'],
        ["/services/fractional-leadership", 'id="chief-of-staff"'],
        ["/services/fractional-leadership", 'id="cfo"'],
        ["/services/fractional-leadership", "Where it does not fit"],
        ["/services/fractional-leadership", "How it runs"],
        ["/services/build-and-place", "What you are not carrying"],
        ["/services/build-and-place", "How it is priced"],
        ["/services/uae-market-entry", "The numbers come first"],
        // Her capability grid, restored 31 August. Batch two had it as a plain
        // tick list; the label below is on the card and not in the sentence, so
        // it is absent whenever the list version is what renders.
        ["/services/technology-builds", "Websites and digital estate"],
        ["/services/technology-builds", "Agentic web applications"],
        // INVERTED, NOT DELETED. These two sat in the absent list below until
        // 31 August, when the removal that put them there was reversed: it was
        // our call rather than hers, and both blocks are in her own file. They
        // are asserted present now so the decision still fails if either goes
        // missing again. "How it runs" is matched on its first sentence rather
        // than on the heading, because the heading is also correct on
        // Fractional Leadership, where it names a different block.
        // PENDING-COPY 1c0.
        ["/services/technology-builds", "Where this starts"],
        ["/services/technology-builds", "We scope the build against a defined problem"],
        // INVERTED 1 September, same reason as the two above: these four sat in
        // the absent list until her file was ruled over her 30 August wording.
        // Asserted present now so the decision fails if any goes missing again.
        // The pricing block is deliberately NOT here and stays in absent: it is
        // not one of the four and its removal is hers. PENDING-COPY 1c7.
        ["/services/operational-clarity-audit", "Roles, ownership and accountability"],
        ["/services/operational-clarity-audit", "An executive summary written for owners"],
        ["/services/operational-clarity-audit", "Private conversations surface"],
        ["/services/operational-clarity-audit", "not a filing cabinet"],
        // HER PER-PAGE HERO EYEBROWS, restored 1 September. All five were absent
        // from the site with no instruction of hers removing them, so their
        // absence was ours. Asserted here because they now live only as markup
        // and nothing else would notice them going again. PENDING-COPY 1c7.
        ["/services/operational-clarity-audit", "Service one"],
        ["/services/fractional-leadership", "Service two"],
        ["/services/build-and-place", "Service three"],
        ["/services/technology-builds", "Service four"],
        ["/services/uae-market-entry", "Service five"],
      ];
      for (const [route, needed] of present) {
        const html = await (await get(route)).text();
        if (!html.includes(needed)) {
          return `"${needed}" is missing from ${route}, and her file's structure for that page has it`;
        }
      }

      // Absent: what the meeting took out. Matched on an invariant sentence
      // rather than on a heading, because two of these headings still appear
      // elsewhere on their own page: "What we build" heads a list on Technology
      // Builds and on UAE Market Entry, and "The misconception" is still the
      // eyebrow over the trading calendar.
      const absent = [
        ["/services/operational-clarity-audit", "Pricing and margin engagements", "the pricing block"],
        ["/services/build-and-place", "The seats we place", "the five role cards"],
        ["/services/uae-market-entry", "Almost nothing pastes cleanly", "the misconception prose"],
      ];
      for (const [route, needle, what] of absent) {
        const html = await (await get(route)).text();
        if (html.includes(needle)) {
          return `${what} is back on ${route}; the 30 August meeting removed it`;
        }
      }

      // The closer she asked to keep on all five, now the dark one her file
      // builds: eyebrow, heading, line and CTA. Checked by its eyebrow, which
      // is per page and appears nowhere else on it.
      const closers = [
        ["/services/operational-clarity-audit", "Start here", "Almost every engagement begins with the audit."],
        ["/services/fractional-leadership", "Next step", "Find out which seat is actually missing."],
        ["/services/build-and-place", "The difference", "A consultant tells you what to do."],
        ["/services/technology-builds", "Bring us the problem", "An app you want built"],
        ["/services/uae-market-entry", "Straight answer", "will not make money here."],
      ];
      for (const [route, eyebrow, heading] of closers) {
        const html = await (await get(route)).text();
        if (!html.includes(eyebrow)) return `${route} has no closer eyebrow ("${eyebrow}")`;
        if (!html.includes(heading)) return `${route} has no closer heading ("${heading}")`;
      }
      return null;
    },
  },
];


/**
 * Copy that must NOT appear.
 *
 * A forbidden assertion is only meaningful if it fires when the content IS
 * present, otherwise it is a green check on a string the page could never
 * render, which is worse than no check at all. That is not hypothetical: the
 * relocation assertion below originally read "We have sat in the system" while
 * the homepage rendered the contraction "We've", so it passed while the section
 * was still there and duplicated.
 *
 * Two rules follow. Match on an invariant substring, never on a full sentence
 * whose contractions, punctuation or capitalisation could differ. And validate
 * the assertion by making the content appear:
 *
 *   NEXT_PUBLIC_ENABLE_DIAGNOSTIC=true npm run build
 *   NEXT_PUBLIC_ENABLE_DIAGNOSTIC=true npx next start
 *   node scripts/check-content.mjs
 *
 * Every gated assertion must fail under that build. If one passes, it is dead
 * weight and needs a better needle.
 */
/**
 * Tab sets, accordions and toggles: every panel must be in the served HTML,
 * including the inactive ones.
 *
 * A component that renders only its active panel hides the rest from crawlers
 * and from anyone whose JavaScript has not run. Two thirds of the fractional
 * page's substance was invisible that way, and it is a silent failure because
 * the page looks complete in a browser.
 *
 * These count panels rather than checking their copy, so reverting to
 * one-at-a-time rendering fails even if the copy is otherwise intact.
 */
/*
 * DiagnosticApp is deliberately not listed. Its step-by-step flow is a form
 * wizard rather than a set of content panels: showing every step at once would
 * break the instrument, and a visitor is meant to reach each one in turn. It is
 * also gated off in stage one. Its absence here is a decision, not an oversight.
 */
const PANEL_SETS = [
  {
    route: "/services/fractional-leadership",
    spec: "4.2",
    pattern: /What the [^<]*seat covers/g,
    // Three again, from 29 August. This assertion was written to catch the tab
    // that served one panel out of three, then set to zero when the client had
    // the section cut. She reversed that, so it is back to what it was built
    // for: all three seats in the served HTML, none behind an interaction.
    expect: 3,
    why: "all three seat panels are restored and none is behind a tab, PENDING-COPY 1b2",
  },
  {
    route: "/services/operational-clarity-audit",
    spec: "4.1",
    pattern: /(Seven steps, four handoffs|Six steps, one direction)/g,
    expect: 2,
    why: "both states of the before-and-after map",
  },
];


const FORBIDDEN = [
  {
    route: "/",
    assert: [
      { spec: "stage one", text: "four-minute assessment", why: "diagnostic explainer is gated" },
      { spec: "stage one", text: "Start with the diagnostic", why: "services card 6 is gated" },
      { spec: "3", text: "sat in the system", why: "relocated to /about, must not remain on the homepage. Matched on the invariant substring: the homepage rendered the contraction \"We've\" while the relocated copy reads \"We have\", and an assertion on either full form passes while the section is still there" },
      { spec: "3", text: "understand your challenges", why: "relocated to /about, matched on the invariant substring" },
    ],
  },
];

/**
 * Expected H2 sequence per page, in document order.
 *
 * Presence checks cannot catch duplication or misordering. A section left behind
 * during a move still satisfies every assertion about the page it moved to, and
 * the page it moved from. This is the check that catches that directly rather
 * than by luck.
 *
 * Entries are substrings, so copy can be revised without rewriting the sequence,
 * but the count and the order are exact.
 */
const HEADING_ORDER = [
  {
    route: "/",
    spec: "3",
    h2: [
      // The proof strip's two labels are H3 inside the row, not H2 above it.
      // They were image cards on the live site, briefly a static H2 here, and
      // are now headings travelling in the row as the client asked. They are
      // asserted by the reverse audit and by the strip's own structure rather
      // than by this list, which tracks the page's H2 spine.
      "This is what our team has delivered", // 3.3
      "What do we actually do", // 3.4
      "These are the patterns before growth stalls", // 3.5
      "Pivot Prime is led by a Mathematician", // 3.7
      "What we have achieved", // 3.8
      "You don", // 3.9, contraction differs by apostrophe encoding
      // 27 August: the authored SEO H2 was cut with the rest of the fees
      // explanation on the client's verbal instruction, so the spine heading is
      // hers again. Her lead survives beneath it and "Most consultants are paid
      // for the recommendation" is the H3 over the traditional column.
      "Most consultants charge whether it works or not.", // 3.10
      "Find out what is actually holding the business back", // 3.11
    ],
  },
  {
    route: "/services",
    spec: "4",
    // The five card titles are H2 here and H3 on the homepage, from the same
    // component via headingLevel. On the homepage the section already carries
    // its own H2 above the cards; here the page heading is the H1 and there was
    // no H2 at all, so the cards sat under an H1 with a level skipped, which
    // spec 4.5 forbids.
    h2: [
      "Operational Clarity Audit",
      "Fractional COO, CFO and Chief of Staff",
      "Build and Place",
      "Technology Builds",
      "UAE Market Entry",
    ],
  },
];

/** Strips tags so a phrase split across elements still matches. */
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

async function main() {
  const failures = [];
  let assertions = 0;

  const fetchPage = async (route) => {
    try {
      const res = await fetch(`${BASE}${route}`);
      if (!res.ok) {
        failures.push({ route, kind: "status", detail: res.status });
        return null;
      }
      return { route, html: await res.text() };
    } catch (err) {
      failures.push({ route, kind: "unreachable", detail: err.message });
      return null;
    }
  };

/**
 * HEADING COMPARISONS IGNORE CASE, FROM 29 AUGUST.
 *
 * The client asked for Title Case on every heading site-wide, so the spec's
 * "What do we actually do" now renders as "What Do We Actually Do". The spec
 * supplies the WORDS; the casing is a separate instruction that came later and
 * overrides it. Comparing case-insensitively keeps this file checking the thing
 * it exists to check, which is that her copy is on the page, without pinning a
 * casing decision she has since changed. It still fails if a word changes,
 * moves or disappears.
 */
const eq = (haystack, needle) =>
  haystack.toLowerCase().includes(needle.toLowerCase());

  const check = (page, list, mustBePresent) => {
    const text = textOf(page.html);
    for (const a of list) {
      assertions += 1;
      const needle = a.text ?? a.html;
      const found = eq(a.html ? page.html : text, needle);
      if (found !== mustBePresent) {
        failures.push({ route: page.route, spec: a.spec, why: a.why, needle, mustBePresent });
      }
    }
  };

  for (const { route, assert } of EXPECTATIONS) {
    const page = await fetchPage(route);
    if (page) check(page, assert, true);
  }
  for (const { route, assert } of FORBIDDEN) {
    const page = await fetchPage(route);
    if (page) check(page, assert, false);
  }

  // Deliberate decisions that would otherwise be undone silently.
  {
    const fetchRaw = (path, init) => fetch(`${BASE}${path}`, init);
    for (const decision of DECISIONS) {
      assertions += 1;
      let problem;
      try {
        problem = await decision.run(fetchRaw);
      } catch (err) {
        problem = `check threw: ${err.message}`;
      }
      if (problem) {
        failures.push({
          route: "decision",
          kind: "structure",
          spec: decision.where,
          detail: `${decision.what} — ${problem}`,
        });
      }
    }
  }

  // SEO, spec 4.5: a unique title and description on every page, a canonical,
  // and Open Graph tags so a link shared on LinkedIn or WhatsApp renders.
  {
    const titles = new Map();
    for (const { route } of EXPECTATIONS) {
      const page = await fetchPage(route);
      if (!page) continue;

      assertions += 3;
      const title = page.html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
      const description = page.html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";

      if (!title) failures.push({ route, kind: "structure", spec: "4.5", detail: "no <title>" });
      if (!description)
        failures.push({ route, kind: "structure", spec: "4.5", detail: "no meta description" });
      if (!page.html.includes('rel="canonical"'))
        failures.push({ route, kind: "structure", spec: "4.5", detail: "no canonical link" });
      if (!page.html.includes('property="og:title"'))
        failures.push({ route, kind: "structure", spec: "4.5", detail: "no Open Graph title" });

      // A shared title or description means two pages compete for the same
      // words, which matters most across the five service pages.
      if (title && titles.has(title)) {
        failures.push({
          route,
          kind: "structure",
          spec: "4.5",
          detail: `title is not unique, shared with ${titles.get(title)}`,
        });
      }
      titles.set(title, route);
    }
  }

  // Every panel of a tab set or toggle, including the inactive ones.
  for (const { route, spec, pattern, expect, why } of PANEL_SETS) {
    const page = await fetchPage(route);
    if (!page) continue;
    assertions += 1;
    const found = (page.html.match(pattern) ?? []).length;
    if (found !== expect) {
      failures.push({
        route,
        kind: "structure",
        spec,
        detail: `expected ${expect} panels in the served HTML (${why}), found ${found}`,
      });
    }
  }

  // Structural: exactly one H1, and the H2 sequence in document order.
  for (const { route, spec, h2 } of HEADING_ORDER) {
    const page = await fetchPage(route);
    if (!page) continue;

    assertions += 1;
    const h1Count = [...page.html.matchAll(/<h1[\s>]/g)].length;
    if (h1Count !== 1) {
      failures.push({ route, kind: "structure", spec: "4.5", detail: `expected exactly one H1, found ${h1Count}` });
    }

    const found = [...page.html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) =>
      textOf(m[1]).trim(),
    );

    assertions += 1;
    if (found.length !== h2.length) {
      failures.push({
        route,
        kind: "structure",
        spec,
        detail: `expected ${h2.length} H2 headings, found ${found.length}`,
        found,
      });
      continue;
    }

    h2.forEach((expected, i) => {
      assertions += 1;
      if (!eq(found[i], expected)) {
        failures.push({
          route,
          kind: "structure",
          spec,
          detail: `H2 ${i + 1} should contain ${JSON.stringify(expected)}, found ${JSON.stringify(found[i])}`,
        });
      }
    });
  }

  if (failures.length === 0) {
    console.log(`content-check: clean (${assertions} spec assertions with JavaScript off)`);
    return;
  }

  for (const f of failures) {
    if (f.kind === "structure") {
      console.error(`${f.route}  structural, spec ${f.spec}: ${f.detail}`);
      if (f.found) f.found.forEach((h, i) => console.error(`    ${i + 1}. ${h}`));
    } else if (f.kind === "status") {
      console.error(`${f.route}  returned ${f.detail}`);
    } else if (f.kind === "unreachable") {
      console.error(`${f.route}  unreachable: ${f.detail}. Is the server running at ${BASE}?`);
    } else if (f.mustBePresent) {
      console.error(`${f.route}  violates spec ${f.spec}  (${f.why})`);
      console.error(`  expected in the server-rendered HTML: ${JSON.stringify(f.needle)}`);
    } else {
      console.error(`${f.route}  leaks gated content, spec ${f.spec}  (${f.why})`);
      console.error(`  must not be present: ${JSON.stringify(f.needle)}`);
    }
  }

  console.error(
    `\ncontent-check: ${failures.length} problem${failures.length === 1 ? "" : "s"} across ${assertions} assertions.`,
  );
  process.exit(1);
}

main();
