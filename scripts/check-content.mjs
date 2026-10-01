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
 * THE DIAGNOSTIC'S GATE, READ RATHER THAN ASSUMED.
 *
 * Four assertions below used to state the gated-off world as a fact: the route
 * 404s, the sitemap omits it, robots disallows it, and two phrases must not
 * appear. All four were correct while NEXT_PUBLIC_ENABLE_DIAGNOSTIC was unset
 * and all four failed the moment it was set, which is the guard working.
 *
 * They are flag-aware now rather than inverted, so each one asserts whichever
 * world the flag actually selects. Inverting them would have protected the live
 * diagnostic and stopped protecting the gate, and the gate is the state this
 * project has spent most of its life in. Set the same variable for the checker
 * as for the build it is checking. PENDING-COPY 1e0.
 */
const DIAGNOSTIC_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTIC === "true";

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
      /**
       * THE HERO PRIMARY CTA, RETARGETED 26 September rather than deleted.
       *
       * THIS ASSERTION WOULD HAVE GONE ON PASSING AND MEANT NOTHING. It read
       * "Find out what is holding your business back", and her slide 9 makes
       * that exact sentence the homepage CLOSING HEADING. So after her change
       * the string is still on the page, 3000px further down, and a presence
       * check on it would have stayed green while the hero button said
       * something else entirely. Same shape as the "43%" assertion that "-43%"
       * satisfied by substring. It is matched on her new label now, and the old
       * sentence is asserted separately below as the closing heading.
       */
      { spec: "3.1 + her slide 1", text: "Get your operations score", why: "hero primary CTA" },
      { spec: "3.1", text: "See what we actually do", why: "hero secondary CTA" },
      // The proof bar's trusted-by line is NOT asserted present any more. She
      // had both trusted-by sentences removed on 26 September, so the
      // assertion moved to the FORBIDDEN list below rather than being deleted:
      // removing spec copy on a later instruction is a decision worth failing
      // on if it is ever silently reverted. PENDING-COPY 1e7.
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
      // 3.7 WAS REPLACED WHOLESALE BY HER v3 SLIDE 3, "Meet the CEO". The
      // Mathematician heading and the actuary credential are both gone from the
      // page, so asserting them would assert the copy she replaced. Preserved in
      // PENDING-COPY 1f5. Her three new elements are asserted instead, including
      // the eyebrow, which the section did not have at all before.
      { spec: "her v3 slide 3", text: "Meet the CEO & Founder", why: "founder eyebrow, a new element in this section" },
      { spec: "her v3 slide 3", text: "Iram Kauser has spent sixteen years running operations inside billion-dollar organisations", why: "founder heading" },
      { spec: "her v3 slide 3", text: "She moved to Dubai from the UK ten years ago", why: "founder paragraph two, which proves both paragraphs are served" },
      { spec: "her v3 slide 3", text: "Meet the full team", why: "founder button, relabelled from \"Meet the team\"" },
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
      // Her slide 9 wording, which is the sentence that was the hero primary
      // button until the same change. The full stop is hers and is asserted
      // with it, so the two cannot be confused for one another.
      { spec: "3.11 + her slide 9", text: "Find out what is holding your business back.", why: "close heading" },
      { spec: "her slide 9", text: "tells you exactly where your business is losing capacity", why: "close subtext" },
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
      // "-43%" carries its minus from 1 September: the card measures a
      // reduction and she asked for the sign. Asserted with the sign on, so a
      // revert to a bare "43%" fails here rather than passing on a substring.
      const authorised = ["+7%", "-43%", "+13%", "+27%", "67%"];
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
    what: DIAGNOSTIC_ENABLED
      ? "/diagnostic serves while the flag is on"
      : "/diagnostic 404s while the flag is off",
    where: "PENDING-COPY 0.1 and 1e0",
    run: async (get) => {
      const res = await get("/diagnostic");
      const want = DIAGNOSTIC_ENABLED ? 200 : 404;
      if (res.status !== want) return `expected ${want}, got ${res.status}`;
      if (!DIAGNOSTIC_ENABLED) return null;
      // ON, THE PAGE MUST SERVE HER INTRO SCREEN. This is the third position
      // for the same assertion, and it has moved with the flow each time rather
      // than being dropped: an empty shell is the failure worth catching, and
      // what counts as a shell changes when the opening screen changes.
      //
      // It asserted her intro heading until 18 September, when she had the
      // intro removed and the quiz opened on question one; it asserted her
      // first statement from then until 26 September, when she reversed that.
      //
      // Both her heading and her start button, because the intro is the only
      // screen in the served HTML now and a heading with no way out of it is
      // still a broken page. Not the "Question 1 of 12" counter, which is one
      // click away and, in any case, is split by React's comment markers in
      // server output: it renders as "Question <!-- -->1<!-- --> of <!-- -->12"
      // and a literal search for the readable string finds nothing.
      const html = await res.text();
      if (!html.includes("What is your business")) {
        return "the route serves but her intro copy is not in it";
      }
      return html.includes("Start the diagnostic")
        ? null
        : "her intro copy is served but the start button is not, so the quiz cannot be begun";
    },
  },
  {
    what: "no em dash or double hyphen reaches a reader on any route",
    where: "PENDING-COPY 1f1",
    run: async (get) => {
      /**
       * HER SLIDE 14: "Remove the emdash from the articles and anywhere on the
       * website."
       *
       * ASSERTED ON THE RENDERED OUTPUT, NOT THE SOURCE, and that is the point
       * of it. lint-copy reads src/content string literals and JSX text, and it
       * found two of the thirty em dashes that were actually on the page: the
       * other twenty-eight were in insights.ts fields it does not walk. Copy
       * reaches a reader from places a linter does not read, so the check that
       * matters is the one that looks at what was served.
       *
       * EN DASHES ARE NOT INCLUDED. Seven survive, every one a numeric range:
       * "Months 1-2", "3-6 months", "30-90 days". That is correct British
       * typography for a span of numbers and is not what she asked to remove.
       * Reported to her in PENDING-COPY 1f1 rather than changed.
       */
      const routes = ["/", "/about", "/services", "/contact", "/privacy", "/insights",
        "/insights/consultant-leaves", "/insights/technology-process",
        "/insights/decisions-layers", "/insights/margin-revenue",
        "/services/operational-clarity-audit", "/services/fractional-leadership",
        "/services/build-and-place", "/services/technology-builds",
        "/services/uae-market-entry", "/for-founders", "/for-smes",
        "/for-pl-owners", "/for-corporate-leaders"];
      for (const route of routes) {
        const html = await (await get(route)).text();
        // The served HTML, entities included: an em dash can arrive as a raw
        // character or as &mdash; and both read the same to a reader.
        const text = textOf(html).replace(/&mdash;/g, "\u2014");
        const em = text.indexOf("\u2014");
        if (em !== -1) return `${route} still carries an em dash: "...${text.slice(Math.max(0, em - 60), em + 60).trim()}..."`;
        const dh = text.indexOf("--");
        if (dh !== -1) return `${route} carries a double hyphen: "...${text.slice(Math.max(0, dh - 60), dh + 60).trim()}..."`;
      }
      return null;
    },
  },
  {
    what: "her P&L reads as P&L rather than as an escaped entity",
    where: "PENDING-COPY 1f1",
    run: async (get) => {
      /**
       * HER SLIDE 16 CORRECTION, and working out what she was correcting took
       * looking at the page rather than at the string.
       *
       * She gave the sentence back as "a P&L within a larger organization". The
       * source already read "a P&L within a larger organisation", so the only
       * visible difference was her z, which the site's British English does not
       * take. What she had actually seen was the rendering: the source held
       * "P&amp;L" as a plain string, React escaped the ampersand again, and the
       * reader met "P&amp;L" on screen. A site-wide sweep for entities visible
       * in text found exactly one, this one.
       *
       * Asserted both ways: the entity absent and the real thing present.
       */
      const html = await (await get("/insights/decisions-layers")).text();
      const text = textOf(html);
      if (text.includes("P&amp;L")) return "the lead sentence still shows the escaped entity P&amp;L to the reader";
      return text.includes("a P&L within a larger organisation")
        ? null
        : "her corrected lead sentence is not on the page";
    },
  },
  {
    what: "the patterns instruction sits above the ten symptoms and points down at them",
    where: "PENDING-COPY 1e8",
    run: async (get) => {
      /**
       * HER SLIDE 5, 26 September: the green bar moved from under the symptom
       * list to directly under the heading, so a reader is told what to do
       * before meeting the things to tap.
       *
       * ASSERTED BY POSITION, not by presence. Both strings were on the page
       * before the move and both are on it after, so a presence check would
       * have passed either way and proved nothing about the one thing that
       * changed. The order in the served HTML is the decision.
       *
       * AND THE WORD IT TURNS ON. "Tap any blockers below" only reads correctly
       * while the bar is above the list; if the bar ever goes back under it,
       * the sentence points at nothing. "above" is asserted absent so the pair
       * cannot drift apart silently.
       */
      const html = await (await get("/")).text();
      const bar = html.indexOf("Select the symptoms that sound familiar");
      const firstItem = html.indexOf("Sales sells things operations cannot deliver");
      if (bar === -1) return "the patterns instruction bar is not in the served HTML";
      if (firstItem === -1) return "the ten symptoms are not in the served HTML";
      if (bar > firstItem) return "the instruction bar is below the symptoms again, and her slide 5 puts it above them";
      if (!html.includes("Tap any blockers below")) return "the instruction no longer points down at the symptoms";
      if (html.includes("Tap any blockers above")) return "the instruction still says \"above\" while the symptoms sit below it";
      /**
       * AND THE BUTTON IS BELOW THE TEN ITEMS, 27 September. It was inside the
       * bar and travelled up with it, leaving the section ending on ten chips
       * with nothing to act on. Her slide 5 keeps it at the foot, so the three
       * pieces are asserted in her order: instruction, items, button. Matched
       * on the button class rather than its label, because "Talk to us" also
       * appears in the header and the footer, and NOT on its href: the href
       * only carries ?message= once symptoms are selected, and this check
       * fetches with JavaScript off, so the static state is a plain /contact.
       * The first version of this assertion looked for ?message= and could
       * never have passed. The class string occurs exactly once on the page.
       */
      const lastItem = html.indexOf("You keep losing customers");
      const sectionCta = html.indexOf("px-6 py-3 rounded-xl text-sm font-bold bg-neon text-forest", lastItem);
      if (lastItem === -1) return "the tenth symptom is not in the served HTML";
      if (sectionCta === -1) return "the patterns call to action is no longer below the ten items";
      return null;
    },
  },
  {
    what: "the hero line is sized by the first button rather than sizing the row",
    where: "PENDING-COPY 1e8",
    run: async (get) => {
      /**
       * Her 26 September note: the line under the first button, the buttons
       *16px apart. Those fight, and w-0 min-w-full is what settles it: the
       * line contributes nothing to the grid column's width and is then laid
       * out at that column's width. A max-width in its place put the buttons
       * 148px apart at 768, 1024 and 1440.
       *
       * The class is asserted rather than the geometry because this check
       * reads HTML with no browser and cannot measure a gap. The geometry is
       * measured in the browser at four widths instead, and recorded in the
       * commit rather than here.
       */
      const html = await (await get("/")).text();
      if (!DIAGNOSTIC_ENABLED) return null;
      return /class="[^"]*\bw-0 min-w-full\b[^"]*"/.test(html)
        ? null
        : "the hero explainer no longer carries w-0 min-w-full, so it is sizing the button row again";
    },
  },
  {
    what: "the two cross-link blocks carry her copy and point at the two de-navigated pages",
    where: "PENDING-COPY 1e6",
    run: async (get) => {
      /**
       * HER SLIDES 11 AND 12, the other half of the dropdown removal on slide
       * 10. These two blocks are how she wants Build and Place and UAE Market
       * Entry reached now that neither is in the header.
       *
       * ASSERTED TOGETHER WITH THE LINK, not just the prose. A block whose
       * paragraph survives while its button is dropped would leave both pages
       * exactly as hard to reach as before the blocks were added, and the
       * paragraph would read as an orphan. The href is matched raw for that
       * reason, and the first clause of each body is matched on the
       * tag-stripped page so a phrase split across elements still counts.
       */
      const blocks = [
        [
          "/services/operational-clarity-audit",
          "market entry feasibility is included as part of the audit",
          'href="/services/uae-market-entry"',
          "Find out more about UAE Market Entry",
        ],
        [
          "/services/fractional-leadership",
          "We source, vet and manage Project Managers, Software Engineers and Operations Leads",
          'href="/services/build-and-place"',
          "Find out more about Build and Place",
        ],
      ];
      for (const [route, body, href, label] of blocks) {
        const html = await (await get(route)).text();
        if (!textOf(html).includes(body)) return `${route} has lost her cross-link paragraph`;
        if (!html.includes(href)) return `${route} carries the paragraph but no longer links the page it is about`;
        if (!textOf(html).includes(label)) return `${route} has lost the "${label}" button`;
      }
      return null;
    },
  },
  {
    what: "two services are off the header dropdown while both pages stay live and linked",
    where: "PENDING-COPY 1e5",
    run: async (get) => {
      /**
       * HER SLIDE 10, 26 September: Build and Place and UAE Market Entry come
       * off the services dropdown. The pages stay.
       *
       * THIS GUARD IS POINTED AT THE DANGEROUS HALF. Removing a page from the
       * navigation is how /services/how-we-work ended up linked from nowhere
       * at all while every check passed on it. So the dropdown removal is
       * asserted together with the three things that must remain true for it
       * to be safe: both routes answer 200, both are in the sitemap, and
       * neither has been quietly retired as "unused" later.
       *
       * Counted on /privacy, which carries no service cards of its own, so a
       * link to either route on that page can only have come from the header.
       * Counting on / or /services would measure the cards instead and pass
       * whatever the header did.
       */
      const privacy = await (await get("/privacy")).text();
      for (const slug of ["build-and-place", "uae-market-entry"]) {
        const n = privacy.split(`href="/services/${slug}"`).length - 1;
        if (n !== 0) return `/services/${slug} is still linked ${n} time(s) from the header`;
      }
      // And the three that stay, so this fails if the dropdown is emptied too.
      for (const slug of ["operational-clarity-audit", "fractional-leadership", "technology-builds"]) {
        if (!privacy.includes(`href="/services/${slug}"`)) {
          return `/services/${slug} has gone from the header dropdown as well`;
        }
      }
      const sitemap = await (await get("/sitemap.xml")).text();
      for (const slug of ["build-and-place", "uae-market-entry"]) {
        const res = await get(`/services/${slug}`);
        if (res.status !== 200) return `/services/${slug} answers ${res.status}, but it is meant to stay live`;
        if (!sitemap.includes(`/services/${slug}`)) return `/services/${slug} has fallen out of the sitemap`;
      }
      return null;
    },
  },
  {
    what: "the persona dropdown carries her slide 13 capitalisation",
    where: "PENDING-COPY 1e5",
    run: async (get) => {
      // Asserted on the served HTML because the capitals are stored in the
      // copy, not applied by CSS: measured text-transform is "none" on all
      // four at 375 and 1440. A text-transform added later would make the page
      // read differently from the string and this check would not see it,
      // which is recorded in navigation.ts rather than guarded here.
      //
      // "For P&L owners" carries a lowercase "owners" because she wrote it
      // that way. It is asserted exactly, so tidying it fails the run.
      const html = await (await get("/privacy")).text();
      const wanted = ["For Founders", "For SMEs", "For Corporate Innovators", "For P&amp;L owners"];
      for (const label of wanted) {
        if (!html.includes(label)) return `the persona dropdown does not say "${label}"`;
      }
      return html.includes("For P&amp;L Owners")
        ? 'the persona dropdown still capitalises "Owners", and her slide 13 does not'
        : null;
    },
  },
  {
    what: "the site's buttons carry the hero button's radius, and the diagnostic keeps its own",
    where: "PENDING-COPY 1e4",
    run: async (get) => {
      /**
       * HER 26 SEPTEMBER INSTRUCTION, WHICH LIVES ONLY AS A CLASS NAME.
       *
       * She flagged on six slides that buttons should be rectangular rather
       * than pill-shaped, and pasted the homepage hero primary button as the
       * correct example each time. That button measures 12px, from rounded-xl,
       * so 12px is the target rather than square.
       *
       * Three buttons were pills at rounded-[100px] and are not any more: the
       * two insights closers and the newsletter subscribe button. Matched on
       * the class next to its neighbours rather than on "rounded-xl" alone,
       * which appears dozens of times per page and would pass on any of them.
       *
       * AND THE DIAGNOSTIC IS ASSERTED STILL PILL-SHAPED, because she put that
       * route out of scope explicitly. A later sweep that "finished the job"
       * would be undoing her decision, not completing it, and this is the line
       * that says so.
       */
      const pages = [
        ["/insights", "inline-flex items-center rounded-xl bg-neon px-[30px]", "the /insights closer button"],
        ["/insights/consultant-leaves", "inline-flex items-center rounded-xl bg-neon px-[30px]", "the article closer button"],
        ["/insights", "cursor-pointer rounded-xl bg-forest px-6 py-[13px]", "the newsletter subscribe button"],
        // The field beside that button, squared on 26 September so the pair
        // reads as one control. Not a button, so it is asserted here rather
        // than under the button rule, and it is in this list because leaving
        // the two out of step is what the change was for.
        ["/insights", "flex-1 rounded-xl border-[1.5px]", "the newsletter email field"],
      ];
      for (const [route, needle, name] of pages) {
        const html = await (await get(route)).text();
        if (!html.includes(needle)) return `${name} on ${route} is not at the hero button's radius`;
      }
      if (!DIAGNOSTIC_ENABLED) return null;
      const diag = await (await get("/diagnostic")).text();
      return diag.includes("rounded-[100px] bg-neon px-10 py-4")
        ? null
        : "the diagnostic start button lost its own radius, and that route is out of scope";
    },
  },
  {
    what: "every instance of the booking label reads 'Book a call'",
    where: "PENDING-COPY 1e4",
    run: async (get) => {
      // Her 26 September instruction, shortened from "Book a call with Iram".
      // Asserted on the served pages rather than in src, because the string
      // lives in a content module and a page could stop reading it. The
      // diagnostic report email carries the same label from the same
      // instruction; it is covered by its own test, not by an HTTP check.
      for (const route of ["/insights", "/insights/consultant-leaves"]) {
        const html = await (await get(route)).text();
        if (html.includes("Book a call with Iram")) return `${route} still says "Book a call with Iram"`;
        if (!html.includes("Book a call")) return `${route} carries no booking button at all`;
      }
      return null;
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
    what: DIAGNOSTIC_ENABLED
      ? "the sitemap lists the live diagnostic"
      : "the sitemap excludes the gated diagnostic",
    where: "PENDING-COPY 0.1",
    run: async (get) => {
      const xml = await (await get("/sitemap.xml")).text();
      const listed = xml.includes("/diagnostic");
      if (DIAGNOSTIC_ENABLED) return listed ? null : "the diagnostic is live but not in the sitemap";
      return listed ? "sitemap lists the gated route" : null;
    },
  },
  {
    what: "robots.txt disallows the gated diagnostic and the API",
    where: "spec 4.5",
    run: async (get) => {
      const txt = await (await get("/robots.txt")).text();
      if (!txt.includes("Disallow: /api/")) return "does not disallow /api/";
      const blocked = txt.includes("Disallow: /diagnostic");
      if (DIAGNOSTIC_ENABLED && blocked) return "the diagnostic is live but robots still blocks it";
      if (!DIAGNOSTIC_ENABLED && !blocked) return "does not disallow the gated route";
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
    what: "every team member carries her own LinkedIn, and Iram carries none rather than a guess",
    where: "PENDING-COPY 1f9 and FOR-IRAM-outstanding",
    run: async (get) => {
      /**
       * HER v3 SLIDES 4 AND 5, delivered as req/meet-the-team.html.
       *
       * A WRONG PROFILE URL IS THE WORST DEFECT THIS SECTION CAN HAVE. It does
       * not look broken: the button works, the page is fine, and it sends a
       * reader to a stranger who shares a name. Nothing else on the site would
       * notice. So the four URLs are asserted literally, each paired with the
       * person whose card it must sit in, rather than counting four links.
       *
       * IRAM'S ABSENCE IS ASSERTED TOO, and that is the half most likely to be
       * "fixed" by someone later. Her file gives a LinkedIn for the other four
       * and none for her; the repository, req/, the whole working folder and
       * both PowerPoint decks were searched, extracted rather than grepped as
       * archives, and there is none. The only LinkedIn on the site is the
       * company page in the footer, which must never stand in for a person. So
       * this fails if a fifth personal profile appears on the page before
       * docs/FOR-IRAM-outstanding.md is answered, and it fails if the company
       * page turns up inside the team section.
       */
      const html = await (await get("/about")).text();
      const team = html.slice(html.indexOf('id="team"'), html.indexOf("</section>", html.indexOf('id="team"')));
      if (!team) return "/about has lost the team section";

      const cards = [
        ["Justin Ford", "https://www.linkedin.com/in/justinford84/"],
        ["Nisha Barot", "https://www.linkedin.com/in/nishabarot/"],
        ["Saif Ur Rehman", "https://www.linkedin.com/in/saif-bookmeetings/"],
        ["Khushi Popat", "https://www.linkedin.com/in/khushi-popat-44464b1ab/"],
      ];
      for (const [name, url] of cards) {
        if (!textOf(team).includes(name)) return `the team section has lost ${name}`;
        if (!team.includes(`href="${url}"`)) return `${name} no longer links ${url}, which is the profile in her own file`;
        const first = name.split(" ")[0];
        if (!textOf(team).includes(`Connect with ${first} on LinkedIn`)) {
          return `${name}'s button has lost her label, "Connect with ${first} on LinkedIn"`;
        }
      }
      // Opened in a new tab, and never without the opener protection.
      const links = [...team.matchAll(/<a[^>]*href="https:\/\/www\.linkedin\.com\/in\/[^"]*"[^>]*>/g)].map((m) => m[0]);
      if (links.length !== 4) return `the team section has ${links.length} personal LinkedIn links, and her file gives four`;
      for (const a of links) {
        if (!a.includes('target="_blank"')) return "a LinkedIn button no longer opens in a new tab";
        if (!a.includes('rel="noopener noreferrer"')) return "a LinkedIn button has lost rel=noopener noreferrer";
      }
      if (team.includes("linkedin.com/company")) {
        return "the company LinkedIn page is inside the team section, and it must never stand in for a person's profile";
      }
      return null;
    },
  },
  {
    what: "the services section is her three offers on / and /services alike, and the two folded pages are still reachable",
    where: "PENDING-COPY 1f6",
    run: async (get) => {
      /**
       * HER v3 SLIDE 2, 30 September. THIS ASSERTION HAS BEEN MOVED, NOT
       * DELETED, AND THE MOVE IS THE POINT OF IT.
       *
       * It used to read "the homepage services section is three cards and still
       * links all five service pages", and it asserted
       * href="/services/build-and-place" on the homepage, because her slide 4 of
       * 26 September put Build and Place inside card two as a full sub-offer with
       * its own link. Her v3 slide 2 says that was not three offers: "Build and
       * Place is still a full offer inside the Lead card, and UAE Market Entry is
       * still a full offer inside the Build card. Fold both into short notes as
       * in the mock-up, so there are only 3 offers." So the old assertion now
       * asserts the opposite of her instruction, and asserting a link from the
       * homepage would hold the sub-block in place.
       *
       * SO IT ASSERTS REACHABILITY WHERE SHE PUT IT INSTEAD. Both pages are
       * still live, and they are reached from the two cross-link blocks she asked
       * for on slides 11 and 12: the UAE Market Entry block on the audit page and
       * the Need other staff block on the fractional page. Those two pages are
       * themselves linked from the cards here, so neither route is stranded. This
       * is the half that can lose a whole page without anything else noticing,
       * which is how /services/how-we-work came to be linked from nowhere at all
       * while every check passed on it.
       *
       * AND IT NOW COVERS /services AS WELL, which is her second instruction:
       * "Make /services render the same three cards and diagnostic panel as the
       * homepage, from the same component, so the two cannot drift again." Every
       * assertion below runs against both routes, so a card edited into one and
       * not the other fails here rather than being found by reading two files.
       */
      const TITLES = [
        "Operational Clarity Audit",
        "Fractional COO, CFO and Chief of Staff",
        "Technology Builds",
      ];
      const LABELS = [
        "See what the audit covers",
        "How fractional leadership works",
        "See what we can build",
      ];
      // The notes the two folded offers became. First clause only, matched on
      // the tag-stripped page.
      const NOTES = [
        "we include UAE market entry feasibility as part of the audit scope",
        "We also source, vet and manage Project Managers, Software Engineers and Operations Leads",
      ];

      /**
       * EVERY ASSERTION BELOW IS SCOPED TO THE GRID, NOT TO THE PAGE, AND BOTH
       * DIRECTIONS NEEDED IT. Twice, measured rather than reasoned:
       *
       *   THE PRESENCE CHECKS PASSED WITH A CARD BROKEN ON PURPOSE. Card three's
       *   title was changed back to "Technology and Market Entry" to prove this
       *   assertion still fails, and it did not: "Technology Builds" is a label
       *   in the header services dropdown, so it is in the served HTML of every
       *   page whatever the cards say. A check the navigation can satisfy is not
       *   a check on the cards. The heading-order list caught the break; this did
       *   not, and it is the one that is supposed to.
       *
       *   THE ABSENCE CHECKS FAILED ON COPY THEY ARE NOT ABOUT. "UAE Market
       *   Entry" matched the Scentmatic case study's tag row on the homepage,
       *   "UAE Market Entry · Financial modelling", which is hers and has nothing
       *   to do with the service cards.
       *
       * data-services-grid is on the shared component itself, so it means the
       * same thing on both routes. The homepage's own id="services" sits on a
       * section /services has not got.
       */
      const gridOf = (html) => {
        const at = html.indexOf("data-services-grid");
        if (at === -1) return null;
        const end = html.indexOf("</section>", at);
        return end === -1 ? null : html.slice(at, end);
      };

      for (const route of ["/", "/services"]) {
        const html = await (await get(route)).text();
        const grid = gridOf(html);
        if (!grid) return `${route} is not rendering the shared services grid at all`;
        const text = textOf(grid);

        for (const needle of [...TITLES, ...LABELS, ...NOTES, "From AED 15,000"]) {
          if (!text.includes(needle)) return `the services grid on ${route} has lost ${JSON.stringify(needle)}`;
        }
        // Folded into notes means no sub-heading and no link. Her card one says
        // "UAE market entry feasibility" in lower case, so these capitalised
        // names inside the grid can only be the offer blocks coming back.
        for (const gone of ["Build and Place", "UAE Market Entry"]) {
          if (text.includes(gone)) return `${route} shows "${gone}" as an offer again, and her v3 slide 2 folded it into a note`;
        }
        if (text.includes("Scoped per engagement")) {
          return `${route} has "Scoped per engagement" back on a card, and her mockup gives cards two and three no price line`;
        }
        // The sub-blocks each had their own h4. One link per card is the shape
        // she asked for, so the grid carries no sub-heading at all now.
        if (/<h4[\s>]/.test(grid)) {
          return `${route} has a sub-heading back inside a service card, which is the sub-offer shape her v3 slide 2 removed`;
        }
        for (const slug of ["build-and-place", "uae-market-entry"]) {
          if (grid.includes(`href="/services/${slug}"`)) return `${route} links /services/${slug} from a card again`;
        }
        for (const slug of ["operational-clarity-audit", "fractional-leadership", "technology-builds"]) {
          if (!grid.includes(`href="/services/${slug}"`)) return `the services grid on ${route} no longer links /services/${slug}`;
        }
        // Three cards, counted rather than inferred from three titles matching.
        const cards = grid.split("<li ").length - 1;
        if (cards !== 3) return `${route} renders ${cards} service cards, and her v3 slide 2 asks for three`;
      }

      // REACHABILITY, which is what this assertion was moved to hold.
      const reachable = [
        ["/services/uae-market-entry", "/services/operational-clarity-audit", "Find out more about UAE Market Entry"],
        ["/services/build-and-place", "/services/fractional-leadership", "Find out more about Build and Place"],
      ];
      const sitemap = await (await get("/sitemap.xml")).text();
      for (const [target, from, button] of reachable) {
        const res = await get(target);
        if (res.status !== 200) return `${target} answers ${res.status}, and it is meant to stay live`;
        if (!sitemap.includes(target)) return `${target} has fallen out of the sitemap`;
        const parent = await (await get(from)).text();
        if (!parent.includes(`href="${target}"`)) {
          return `${target} is linked from nowhere: it came off the cards and ${from} no longer links it either`;
        }
        if (!textOf(parent).includes(button)) return `the "${button}" block has gone from ${from}, which is the route to ${target} now`;
      }

      if (!DIAGNOSTIC_ENABLED) return null;
      // The panel, not a card inside the grid: its heading has to sit AFTER the
      // card list on both routes, which is the structural thing her slide 4
      // changed about it and her v3 slide 2 left alone.
      for (const route of ["/", "/services"]) {
        const grid = gridOf(await (await get(route)).text());
        const list = grid.indexOf("Operational Clarity Audit");
        const panel = grid.indexOf("Start with the diagnostic");
        if (panel === -1) return `the diagnostic panel is not on ${route}`;
        if (panel < list) return `the diagnostic sits above the three cards on ${route} rather than in a panel beneath them`;
        // Beneath the cards means outside the card list, not a fourth <li>.
        if (grid.lastIndexOf("</ul>") > panel) return `the diagnostic is back inside the card list on ${route}`;
      }
      return null;
    },
  },
  {
    what: "the case study results sit above the product link on both pages",
    where: "PENDING-COPY 1f2",
    run: async (get) => {
      /**
       * HER SLIDE 8: "The results to come before the view the product links."
       *
       * MEASURED PER LINK, NOT PER PAGE. Three of the nine studies carry a
       * link and all three render on both routes, so a first-occurrence check
       * would pass on the strength of card one while cards two and three had
       * drifted. For every link on the page this walks back from it and asks
       * which marker it meets first: within a card the order is challenge,
       * results, link, so the nearest one behind a link must be the results
       * panel. If the link went back above the panel the nearest marker behind
       * it would be the challenge heading instead, which is precisely the
       * arrangement she asked us to change.
       */
      for (const route of ["/", "/about"]) {
        const html = await (await get(route)).text();
        for (const label of ["View the product", "Visit the site"]) {
          let from = 0;
          for (;;) {
            const at = html.indexOf(label, from);
            if (at === -1) break;
            from = at + 1;
            const results = html.lastIndexOf("The results", at);
            const challenge = html.lastIndexOf("The challenge", at);
            if (results === -1) return `${route}: a "${label}" link has no results panel before it`;
            if (challenge > results) {
              return `${route}: a "${label}" link sits above its results panel, and her slide 8 puts the results first`;
            }
          }
        }
      }
      return null;
    },
  },
  {
    what: "both the About card and the homepage say 120, in the form each of her slides uses",
    where: "PENDING-COPY 1i, 1f2, 1f4 and 1f5",
    run: async (get) => {
      /**
       * THIS DECISION HAS FLIPPED, AND THE GUARD IS WHAT CAUGHT IT.
       *
       * It used to assert a deliberate DISAGREEMENT: the About card said
       * "worth over $100 million" because her slide 21 said so, and the
       * homepage said "more than $120 million" because spec 3.7 and the live
       * site did. Two figures for one book, each with a source, recorded rather
       * than quietly reconciled.
       *
       * Her slide 7 of 26 September rewrites the About biography and writes
       * "$120M" in it. That is the later instruction and it supersedes slide
       * 21, so the disagreement is hers to have ended and the two now agree on
       * the number. This assertion follows it rather than being deleted: the
       * pair still has to be checked, because one of them drifting back is
       * exactly what it was written for.
       *
       * THE FORM MATCHED ON 27 SEPTEMBER TOO. This assertion held the About
       * card at "$120M" and the homepage at "$120 million" for a day and
       * reported the difference to her rather than regularising it on her
       * behalf. She asked for the homepage levelled to her form, so both read
       * "$120M" now and this checks for that.
       *
       * THIRD POSITION FOR ONE ASSERTION, AND EVERY MOVE HAS BEEN HERS. Slide
       * 21 set the disagreement, slide 7 of 26 September ended it on the
       * number, and her follow-up ended it on the form. It has been moved each
       * time rather than deleted, which is why the drift was visible at all.
       * PENDING-COPY 1f4.
       */
      const about = await (await get("/about")).text();
      const home = await (await get("/")).text();
      if (about.includes("worth over $100 million")) {
        return "the About card is back to $100 million, and her slide 7 replaced that paragraph with one saying $120M";
      }
      if (!about.includes("$120M book")) {
        return "the About card no longer says $120M, which is her slide 7 wording";
      }
      // FOURTH POSITION, AND THIS MOVE REVERSES THE THIRD. Her v3 slide 3 of 30
      // September rewrites the homepage founder paragraph and writes the figure
      // out in full: "a book worth more than $120 million". That is later than
      // the 27 September instruction that levelled the homepage to "$120M", so
      // it wins on the homepage. SHE HAS NOT TOUCHED THE ABOUT BIOGRAPHY, so
      // that keeps "$120M" and the two forms differ again, deliberately. The
      // number is what this pair is really for, and both still say 120.
      if (home.includes("more than $120M")) {
        return "the homepage is back to $120M, and her v3 slide 3 writes the figure out as $120 million";
      }
      if (!home.includes("more than $120 million")) {
        return "the homepage no longer says $120 million, which is her v3 slide 3 wording";
      }
      if (home.includes("$100 million")) {
        return "the homepage has picked up $100 million, which is the figure her slide 7 replaced";
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
      // Both are gated copy: they belong on the page once the diagnostic is
      // live, and must not appear while it 404s. Asserted only in the off
      // state, for the same reason as the four decisions above. PENDING-COPY 1e0.
      ...(DIAGNOSTIC_ENABLED
        ? []
        : [
            { spec: "stage one", text: "four-minute assessment", why: "diagnostic explainer is gated" },
            { spec: "stage one", text: "Start with the diagnostic", why: "services card 6 is gated" },
          ]),
      { spec: "3", text: "sat in the system", why: "relocated to /about, must not remain on the homepage. Matched on the invariant substring: the homepage rendered the contraction \"We've\" while the relocated copy reads \"We have\", and an assertion on either full form passes while the section is still there" },
      { spec: "3", text: "understand your challenges", why: "relocated to /about, matched on the invariant substring" },
      /**
       * BOTH TRUSTED-BY SENTENCES, her slide 1, 26 September.
       *
       * She asked for "Trusted by SMEs across insurance, fintech, wellness &
       * retail." removed in full, and asked us to find any longer variant of
       * the same claim on the page. There was one: the proof bar's line, which
       * is spec 3.2 green-block copy out of her own document. Both are off.
       *
       * Asserted here rather than simply unasserted because one of them is her
       * spec's own wording: a later instruction overriding an earlier document
       * is exactly the kind of decision that gets quietly reverted by someone
       * reading the spec and finding a line missing. Matched on "Trusted by",
       * which neither variant can come back without. PENDING-COPY 1e7.
       */
      { spec: "her slide 1", text: "Trusted by", why: "both trusted-by lines were removed in full, the hero micro-line and the longer spec 3.2 proof bar variant" },
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
    /**
     * REORDERED 27 September TO HER SLIDE 2, and this list is the reason the
     * move was safe to make.
     *
     * It caught the reorder on the first run with six positional mismatches,
     * which is exactly what it exists for: presence checks cannot see order,
     * and every one of these eight headings was still on the page. Moved to her
     * sequence rather than loosened, so it goes on catching the next accidental
     * move. Her order, verbatim from the slide: Hero, Logos and institutions,
     * Pain accordion, Who we serve, Measured Impact, What do we actually do,
     * Meet Iram, Case Studies, Sign off CTA. The hero is an H1 and the logos
     * carry no heading, so the eight below are her nine minus those two, plus
     * the fees block she does not name. PENDING-COPY 1f0.
     */
    h2: [
      // The proof strip's two labels are H3 inside the row, not H2 above it.
      // They were image cards on the live site, briefly a static H2 here, and
      // are now headings travelling in the row as the client asked. They are
      // asserted by the reverse audit and by the strip's own structure rather
      // than by this list, which tracks the page's H2 spine.
      "These are the patterns before growth stalls", // 3.5, her "Pain accordion"
      "You don", // 3.9 Who we serve, contraction differs by apostrophe encoding
      "This is what our team has delivered", // 3.3, her "Measured Impact"
      "What do we actually do", // 3.4
      // 3.7's heading was replaced wholesale by her v3 slide 3. The section has
      // not moved: it is still her "Meet Iram" position, with her own heading in
      // it and an eyebrow above it that the section did not have before.
      "Iram Kauser has spent sixteen years running operations", // her v3 slide 3, "Meet the CEO"
      "What we have achieved", // 3.8 Case Studies
      // 27 August: the authored SEO H2 was cut with the rest of the fees
      // explanation on the client's verbal instruction, so the spine heading is
      // hers again. Her lead survives beneath it and "Most consultants are paid
      // for the recommendation" is the H3 over the traditional column.
      //
      // NOT IN HER SLIDE 2 AT ALL. It is kept directly before the closer, which
      // is where it already sat, so its relationship to the closer is
      // unchanged. It is the only section on the page her order does not name.
      "Most consultants charge whether it works or not.", // 3.10
      "Find out what is holding your business back.", // 3.11, her slide 9 wording
    ],
  },
  {
    route: "/services",
    spec: "4",
    // THREE CARD TITLES, NOT FIVE, SINCE HER v3 SLIDE 2. This page rendered
    // ServiceCards until then, so this list held the five titles plus nothing for
    // the diagnostic, which was a card with an H3 inside the grid. It now renders
    // HomeServices, the same component as the homepage, so the diagnostic is a
    // full-width panel whose heading takes the same level as the cards.
    //
    // The titles are H2 here and H3 on the homepage, from the one component via
    // headingLevel. On the homepage the section already carries its own H2 above
    // the cards; here the page heading is the H1 and there would be no H2 at
    // all, so the cards would sit under an H1 with a level skipped, which spec
    // 4.5 forbids.
    h2: [
      "Operational Clarity Audit",
      "Fractional COO, CFO and Chief of Staff",
      "Technology Builds",
      // Gated with the panel it belongs to, as the card it replaced was.
      ...(DIAGNOSTIC_ENABLED ? ["Start with the diagnostic"] : []),
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
