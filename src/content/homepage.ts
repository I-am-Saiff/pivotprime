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
  heading: "The consultancy that actually executes",
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
  /**
   * HER SLIDE 1 WORDING, 26 September, replacing ours. The sentence it replaces
   * described the instrument at length; hers names it and says what it tells
   * you. Still gated on the flag for the original reason: it describes an
   * instrument by name and duration and must not appear while the primary CTA
   * routes somewhere else. PENDING-COPY 1e7.
   */
  diagnosticExplainer:
    "A four-minute diagnostic that scores your business and tells you exactly where the constraint is. You get the result immediately.",
};

// 3.2 PROOF BAR
export const PROOF = {
  /**
   * BOTH TRUSTED-BY LINES ARE OFF THE PAGE, her slide 1, 26 September. Neither
   * is deleted.
   *
   * She asked for "Trusted by SMEs across insurance, fintech, wellness &
   * retail." to go in full rather than be reworded, and asked us to look for a
   * second, longer variant of the same line on the same page. THERE WAS ONE:
   * this one, the proof bar line, which is spec 3.2 copy out of her own
   * document. Two sentences making the same claim in different words, sitting
   * about 800px apart. Both are off the page now.
   *
   * THE SPEC ONE IS THE HARDER CALL AND IS RECORDED AS SUCH. This string is
   * green-block copy from docs/spec.md, so removing it is her later instruction
   * overriding her own earlier document rather than a tidy-up. Its
   * check-content assertion has moved to the FORBIDDEN list rather than being
   * deleted, so the removal is asserted rather than merely unasserted.
   * PENDING-COPY 1e7.
   *
   * The rest of the proof bar stays: "As featured in", both publication links
   * and the logo rows are untouched.
   */
  trusted:
    "Trusted by businesses across insurance, wellness, retail, fragrance, fintech and consumer goods.",
  /**
   * The hero micro-line, the one she named. It was written into page.tsx rather
   * than held in a content file; it is preserved here so both variants of the
   * same claim live in one place and either is one line to put back.
   */
  trustedHeroLine: "Trusted by SMEs across insurance, fintech, wellness & retail.",
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
export type Logo = {
  src: string;
  alt: string;
  /**
   * True when the file is the company's own logo rather than one of the older
   * pre-baked panels, so the strip has to draw the panel around it.
   */
  tile?: boolean;
  /**
   * False for a FILLED mark, Ford's oval and Nurture's badge, where making
   * every pixel white would leave a blank shape. Those are inverted instead, so
   * the fill turns white and the lettering knocked out of it stays dark.
   */
  mono?: boolean;
  /**
   * Serve the company's file exactly as it is, with no optimiser re-encode and
   * no srcSet. For a source smaller than the srcSet widths next/image would
   * claim for it. See the Dubizzle entry for the defect this prevents.
   */
  raw?: boolean;
  /** Where the file came from. Recorded so provenance travels with the asset. */
  source?: string;
  /** The file's own pixel size (or viewBox size), which the mark box is measured in. */
  w: number;
  h: number;
  /**
   * WHERE THE MARK SITS INSIDE THE FILE, as [x, y, width, height] in the file's
   * own pixels (viewBox units for an SVG), measured from the file itself.
   *
   * HER NOTE OF 3 OCTOBER: "please make all same size also the AIG became so
   * small now?" AIG had not changed: its own picture is 345x184 with a 72x39
   * mark in it, the smallest of any tile, and every tile used to be sized by
   * its file's box, margin and all. From pass 10 every mark is sized by this
   * box against one shared target (LOGO_MARK in page.tsx), so the margin a
   * file happens to carry no longer decides how big its logo looks.
   */
  mark: [number, number, number, number];
  /**
   * Optical correction against the shared target, chosen by laying the whole
   * row out at phone and computer size. 1 is the target; leave it unset unless
   * the row was looked at.
   */
  weight?: number;
  /**
   * sha256 of the file exactly as the company's site served it. The guard
   * hashes what this site serves and fails if the two ever differ, which is the
   * mechanical form of "the company's file, unaltered".
   */
  sha256?: string;
  /**
   * For a logo that exists only as a symbol inside an SVG sprite. The sprite is
   * shipped byte for byte as the company served it and the tile draws the symbol
   * with <use>, so no new SVG is ever built out of someone else's artwork.
   */
  use?: { symbol: string; viewBox: string };
};

export type LogoGroup = { label: string; logos: Logo[] };

export const LOGO_GROUPS: LogoGroup[] = [
  /* ORDER, 2 OCTOBER: the new logos follow the order her v3 slide 1 names
     them, "Ford, Dubizzle and OSN" and "Cinnacare, Nurture UAE, Scentmatic
     or BookMeetings", after the logos that were already in each row. */
  {
    label: "Experience inside global institutions",
    logos: [
      { src: "/logos/clogo1a.jpg", alt: "MetLife", w: 345, h: 185, mark: [92, 76, 160, 34] },
      { src: "/logos/clogo3a.jpg", alt: "Gallagher", w: 345, h: 185, mark: [123, 60, 99, 69] },
      { src: "/logos/sky.jpg", alt: "Sky", w: 345, h: 185, mark: [124, 64, 97, 58], weight: 0.92 },
      { src: "/logos/clogo5a.jpg", alt: "Willis Towers Watson", w: 345, h: 185, mark: [125, 43, 87, 99] },
      { src: "/logos/clogo2a.jpg", alt: "KPMG", w: 345, h: 185, mark: [100, 64, 145, 58] },
      { src: "/logos/clogo6a.jpg", alt: "AIG", w: 345, h: 184, mark: [123, 72, 72, 39], weight: 0.92 },

      /**
       * HER v3 SLIDE 1: "Ford, Dubizzle and OSN are missing." Pass 6.
       *
       * Last pass all three refused curl. This pass each official site was
       * opened in a real, headed Chrome on this Mac with its default user agent
       * and nothing altered, and an independent second agent then loaded the
       * same page in a fresh browser and confirmed the bytes were identical. Any
       * page that showed a bot challenge was stopped on, not worked around. Each
       * page was acquired with a single load, except dubizzlegroup.com, which
       * took two: see the Dubizzle entry below for why.
       * Sources and outcomes are in PENDING-COPY 1g2.
       */
      {
        /**
         * FORD, AND WHY IT IS DRAWN WITH <use> AND IN COLOUR.
         *
         * ford.com does not serve its logo as a file. The header draws it with
         * <svg aria-label="Ford Home Page"><use href="#navigation-menu-ford-logo">
         * against a hidden sprite of twenty-three symbols inlined in the page
         * HTML. That sprite is shipped here exactly as ford.com served it, cut
         * from the raw document response and confirmed byte-identical by a second
         * independent load. Lifting the one symbol out into a new SVG of its own
         * would be building a file out of Ford's artwork, so the tile references
         * the symbol inside the unaltered sprite instead, the same way Ford's own
         * header does. The other twenty-two symbols are Ford's UI icons; they
         * ship unused, 16.5KB, as the price of not editing the file.
         *
         * WHITE SINCE HER NOTE OF 3 OCTOBER, "Make the logos same treatment
         * sir u cant have it messy like this some colour and not". The oval is
         * filled, so brightness(0) invert(1), the treatment the line logos get,
         * would turn the whole oval white and lose the script and inner ring,
         * which are white knock-outs: a plain white ellipse. Inverting it instead
         * (mono: false) turns the navy oval white and leaves the script dark, the
         * tile's own ground showing through it. Done in CSS; the sprite is
         * untouched and its hash still holds.
         */
        src: "/logos/ford-sprite.svg",
        alt: "Ford",
        tile: true,
        mono: false,
        use: { symbol: "navigation-menu-ford-logo", viewBox: "0 0 80 30" },
        w: 80,
        h: 30,
        // The oval fills the whole symbol.
        mark: [0, 0, 80, 30],
        sha256: "bd3255a78363498e550ede3c4d8cb3cfe646867d0775e7159c99f94f10783e7b",
        source:
          "https://www.ford.com/ (inline sprite in the page HTML, symbol navigation-menu-ford-logo)",
      },
      {
        /**
         * PLAIN "dubizzle", ON HER INSTRUCTION IN PASS 7. Pass 6 put up the
         * "dubizzle group" header logo, the parent company's mark, because the
         * rule then was the logo at the top of the company's own site, and
         * dubizzle.com itself put up an Imperva challenge and then a 403 that
         * was stopped on, with no click and no retry. Justin's biography names
         * dubizzle, the brand he worked for, and this is that brand's own mark.
         *
         * FROM THE SAME OFFICIAL PAGE. dubizzlegroup.com shows it in its "Our
         * Brands" block as <img class="dubizzle_logo" alt="Dubizzle">, on the
         * group's own CDN subdomain. Loaded once in a real, headed Chrome with
         * nothing altered and nothing clicked; no challenge. An independent second
         * agent loaded the page in a fresh browser, found the same element for
         * itself, and received the identical 3,941 bytes. Not redrawn, not
         * recoloured: a transparent palette PNG, charcoal with a red flame, and
         * the strip's own filter makes it white as it does every institution.
         *
         * THE ALT IS LOWER CASE because her copy keeps the brand's casing
         * exactly, as Justin's biography does, and the mark itself reads so.
         */
        src: "/logos/dubizzle.png",
        alt: "dubizzle",
        tile: true,
        /**
         * RAW, FOR THE REASON PASS 6 FOUND. Under the optimiser the tile would
         * load a q=75 WebP re-encode, never this file, so the hash below would
         * check something no visitor receives; and next/image would build a
         * srcSet up to 3840w for a 530px picture, which the browser divides by
         * the w descriptor and lays out smaller than the tile allows. Served raw
         * there is no srcSet and no guess: 3,941 bytes, the exact file the group
         * served, laid out from its own 530x170 and clamped by the tile limits.
         */
        raw: true,
        w: 530,
        h: 170,
        // The ink fills the file edge to edge, with 3px of air under it.
        mark: [0, 0, 530, 167],
        sha256: "e62ec73d4c67799f0af5b14ff836cfd6a3e7cc75f15238891c16c62482b5994a",
        source: "https://cdn.dubizzlegroup.com/wp-content/uploads/2024/09/about_our_brands_logo_01.png",
      },
      {
        /**
         * OSN, the plain OSN mark and not OSN+. osn.com redirects to
         * /en-ae/home on its own domain; the header carries three marks, the red
         * OSN logo, OSNtv and OSN+, and this is the first, with alt="OSN" in
         * their own markup. Its own file, served as image/svg+xml, single colour,
         * so the strip's white treatment applies cleanly.
         */
        src: "/logos/osn.svg",
        alt: "OSN",
        tile: true,
        w: 46,
        h: 30,
        // The ink fills the viewBox.
        mark: [0, 0, 46, 30],
        weight: 0.9,
        sha256: "37c7b7e721c9844df05202293efe7a5f6f9b70536225cf66a23feaf6146e40ac",
        source: "https://www.osn.com/osn/media/OSNMedia/osntv/images/common/osn-red-logo.svg",
      },
    ],
  },
  {
    label: "Companies we have delivered for",
    logos: [
      { src: "/logos/Frame-17.jpg", alt: "Democrance", w: 345, h: 185, mark: [72, 75, 201, 38], weight: 1.06 },
      { src: "/logos/insurancehub-with-bg-white.jpg", alt: "Insurance Hub", w: 345, h: 185, mark: [68, 66, 209, 53], weight: 1.05 },
      // The filename says stydio. The wordmark reads studio88.
      { src: "/logos/stydio-with-bg.jpg", alt: "studio88", w: 345, h: 185, mark: [93, 73, 159, 38], weight: 0.92 },
      // The filename says instagram. The image is the Women Who Thrive wordmark.
      { src: "/logos/instagram.jpg", alt: "Women Who Thrive", w: 345, h: 185, mark: [111, 62, 105, 57], weight: 0.92 },
      { src: "/logos/man-cave-with-bg.jpg", alt: "Man Cave", w: 345, h: 185, mark: [75, 77, 178, 30] },
      { src: "/logos/bop-foundation-with-bg-white.jpg", alt: "Birds of Paradise Foundation", w: 345, h: 185, mark: [83, 57, 170, 62], weight: 1.1 },
      { src: "/logos/nivishe.jpg", alt: "Nivishe", w: 345, h: 185, mark: [136, 47, 74, 84] },

      /**
       * HER SLIDE 1 OF THE v3 DECK, 30 September: "The 'Companies we have
       * delivered for' strip has none of Cinnacare, Nurture UAE, Scentmatic or
       * BookMeetings yet."
       *
       * All four are case studies the site already carries in words, and three
       * of the four URLs below are the ones the case studies themselves link to.
       *
       * SOURCED FROM EACH COMPANY'S OWN SITE AND NOWHERE ELSE. No aggregator, no
       * redrawing, no AI, no recolouring of a file. The exact source URL for each
       * is in PENDING-COPY 1g2 and in docs/FOR-IRAM-outstanding.md.
       *
       * THESE FOUR ARE NOT PRE-BAKED TILES, which is the one way they differ from
       * the six above. Those six are 345x185 JPGs with a near-black panel and a
       * white logo flattened into the picture. These are the companies' own
       * files, unaltered, and the panel and the monochrome are applied in CSS at
       * render time. That is the only way to use an official file without editing
       * it.
       */
      {
        src: "/logos/cinnacare.png",
        w: 1200,
        h: 259,
        mark: [0, 0, 1200, 259],
        alt: "Cinnacare",
        tile: true,
        source: "https://cinnacare.com/cdn/shop/files/slice17.png",
      },
      {
        /**
         * WHITE SINCE HER NOTE OF 3 OCTOBER, without touching the file.
         *
         * Nurture's file is a purple wordmark and bird on a white badge inside a
         * purple square. brightness(0) invert(1) would turn the whole square
         * white, so it is inverted instead (mono: false): the white badge turns
         * dark, the purple wordmark turns white. The badge's edge and the
         * square frame are left out by showing only the mark box below, which
         * is the wordmark and bird inside the badge, measured from the file.
         */
        src: "/logos/nurture-uae.png",
        w: 1024,
        h: 1024,
        alt: "Nurture UAE",
        tile: true,
        mono: false,
        mark: [92, 281, 847, 380],
        weight: 1.05,
        source: "https://nurtureuae.com/assets/img/nurture-icon-1024.png",
      },
      {
        src: "/logos/scentmatic.png",
        w: 1200,
        h: 670,
        /**
         * SCENTMATIC'S FILE IS MOSTLY EMPTY SPACE: the wordmark is a band across
         * the middle of a 1200x670 canvas. The mark box is that band, so it is
         * sized like the rest without trimming the company's file.
         */
        mark: [214, 258, 807, 116],
        alt: "Scentmatic",
        tile: true,
        source: "https://scentmatic.co.uk/cdn/shop/files/scentmatic_logo.png",
      },
      {
        src: "/logos/bookmeetings.svg",
        w: 200,
        h: 40,
        // The ink ends well short of the viewBox's right edge.
        mark: [0.7, 3.8, 161.3, 35.2],
        weight: 0.96,
        alt: "BookMeetings",
        tile: true,
        source: "https://bookmeetings.io/logo.svg",
      },
    ],
  },
];

/**
 * FORD, OSN AND DUBIZZLE: MISSING AFTER PASS 5, ALL THREE ON THE PAGE AFTER PASS 6.
 *
 * In pass 5 all three refused curl: ford.com 403, osn.com 406, dubizzle.com a
 * bot interstitial. A logo aggregator would have had them in a minute and was
 * ruled out, and they were left absent.
 *
 * In pass 6 each official site was opened in a real, headed Chrome on this Mac
 * with its default user agent and nothing altered: no stealth, no spoofing, no
 * banner clicked. A page that showed a challenge was stopped on and never loaded
 * again. ONE PAGE WAS LOADED TWICE, AND THAT IS RECORDED RATHER THAN SMOOTHED
 * OVER: the first load of dubizzlegroup.com finished, then the acquiring
 * script's own screenshot call timed out and it exited before saving anything,
 * so the site was never actually observed. It had shown no challenge. One more
 * load with a fixed script captured the logo. That is a retry after our own
 * crash, not a second attempt at a page that had refused us.
 * An independent second agent then loaded the same page in a fresh browser,
 * found the header logo for itself, and confirmed the saved file was
 * byte-identical to what it received. The hashes are on the entries above and
 * the guard checks the served files against them.
 *
 *   Ford      ford.com, no challenge. The logo is a symbol in an inline sprite.
 *   OSN       osn.com -> /en-ae/home, no challenge. The plain OSN mark.
 *   Dubizzle  dubizzle.com challenged and was stopped on. dubizzlegroup.com,
 *             the parent group, served normally; its header mark reads
 *             "dubizzle group", and that was the logo shown after pass 6.
 *
 * PASS 7 SWAPPED DUBIZZLE FOR THE PLAIN "dubizzle" MARK, on her instruction,
 * from the "Our Brands" block of the same official page, loaded once with no
 * challenge and confirmed byte-identical by a second, independent load. The
 * group file was deleted, since nothing referenced it any more.
 *
 * Sources are in PENDING-COPY 1g2, and the pass 7 change in 1g3.
 */

/**
 * ALL FOUR PLACEHOLDER ENTRIES ARE RESOLVED, by opening the files rather than
 * reading their names. Two are now named, and two are not logos at all.
 *
 * GALLAGHER IS REMOVED, and not because of the open naming decision.
 * clogo3a.jpg is the Gallagher wordmark. Gallagher is one of Iram's former
 * employers and is named as such in her credential further down this same page.
 * Under a heading reading "Companies we have delivered for", that reads as a
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
  heading: "This is what our team has delivered",
  // "has" added 2 October, her 23 August slide 3 comment: "we do not measure
  // success in slide decks, we measure what has changed." Spec 3.3 reads
  // "what changed"; her comment is later. Only the comma had been applied.
  standfirst: "We do not measure success in slide decks, we measure what has changed.",
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
    // A MINUS SIGN, from her 1 September screenshots. The card measures a
    // reduction and printed it as a bare 43%, which reads as a gain in a row
    // where the other four are gains. The value is untouched: it is still the
    // 43% she authorised on 27 August, now carrying its direction.
    // PENDING-COPY 1d1.
    figureText: "-43%",
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
  // Spec 2.2's own wording. It read "Talk to our team", which is not in the
  // document, and the arrow was glued to it with no space.
  ctaLabel: CONTACT_CTA.label,
};

// 3.7 THE PERSON BEHIND IT
/**
 * HER SLIDE 3 OF THE v3 DECK, 30 September, "Meet the CEO".
 *
 * WHAT IT REPLACES IS PRESERVED IN PENDING-COPY 1f5: the heading "Pivot Prime is
 * led by a Mathematician, and that changes how the work gets done.", the actuary
 * paragraph, and the numbers-led paragraph beginning "People will tell you a
 * process is fine". Hers is about the operating record rather than the
 * qualification, so it replaces them rather than joining them. The portrait and
 * the section's position on the page are unchanged, as she asked.
 *
 * THE EYEBROW IS HER WRITTEN WORDING, NOT HER IMAGE, AND THE SECTION HAD NONE.
 * Her mockup image shows "Our CEO and Founder"; her written instruction says
 * "Meet the CEO & Founder". The written wording wins and the discrepancy is
 * recorded in PENDING-COPY 1f5 rather than settled on her behalf. Stored in
 * sentence case because the eyebrow treatment uppercases it in CSS.
 *
 * "$120 million", NOT "$120M", AND THAT REVERSES SOMETHING WE DID ON HER
 * INSTRUCTION. The homepage was levelled from "$120 million" to "$120M" on 27
 * September so it matched the form in her About biography. This copy is later and
 * writes the figure out in full, so it wins here. HER ABOUT BIOGRAPHY KEEPS
 * "$120M": she has not changed that, so the two forms differ again, deliberately.
 * The check holding the pair is moved rather than deleted, for the fourth time,
 * and every move has been hers.
 *
 * TRANSCRIBED FROM A SCREENSHOT of her mockup rather than copied from a file,
 * like her slide 2 copy. PENDING-COPY 1f5 records that.
 */
export const FOUNDER = {
  eyebrow: "Meet the CEO & Founder",
  heading:
    "Iram Kauser has spent sixteen years running operations inside billion-dollar organisations. Pivot Prime is built from that.",
  body: [
    "Senior operating roles at AIG, MetLife and Gallagher, across the UK, the Middle East and Africa. Chief of Staff to a regional CEO, managing priorities across more than 150 staff. Pricing and portfolio strategy for a book worth more than $120 million. Her background spans the full breadth of what it actually takes to run a business: compliance, finance, IT, HR and transactional processing. Not strategy or theory, but the execution itself. Iram knows how to diagnose, lead and build.",
    "She moved to Dubai from the UK ten years ago. The team around her reflects the same depth, with real experience across the same disciplines and the same region.",
  ],
  ctaLabel: "Meet the full team",
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
  heading: "Most consultants are paid for the recommendation",
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
      label: "The traditional model",
      /** Spec 3.10 block 0, verbatim: it is the traditional model in her words. */
      headline: "Most consultants are paid for the recommendation",
      body: [
        "You pay for the advice. Whether anything actually improves is not really their problem.",
        "The invoice arrives either way.",
      ],
    },
    pivotPrime: {
      label: "The Pivot Prime model",
      headline: "We only fully earn when you do.",
      /** Her four boxes. Every figure in them is replaced by what the figure was
       *  there to demonstrate. The "You keep" and "We earn" pair is dropped
       *  outright: it exists only to show the split, which is the formula. */
      rows: [
        {
          label: "We agree a target",
          value: "A cost reduction, a margin improvement, or a revenue number. A specific number, and a specific date.",
        },
        {
          label: "Our fee structure",
          // HER OWN WORDING, 1 September, replacing "A fixed element covers the
          // work itself. A results element sits against that target." Part of
          // her ask for plainer language for visitors who are not technical:
          // "fixed element" and "results element" are the terms the spec uses
          // about the model, not the terms a reader arrives with. Her sentence
          // also says which part is the bigger one, which ours never did.
          // PENDING-COPY 1d2.
          value:
            "Our fee has a smaller fixed part and then a bigger part linked to the results we achieve for your business.",
        },
      ],
    },
  },
  /** Her pull box, _3 and _4, verbatim. It carries the model with no figure in it. */
  commitment: {
    label: "The commitment",
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
  /**
   * HER SLIDE 9, 26 September. It read "Find out what is actually holding the
   * business back", which is spec 3.11 wording. Hers is the sentence that was
   * the hero primary button until this same change: the wording moves down the
   * page rather than leaving the site, which is why her slides 1 and 9 were
   * given together. The full stop is hers. PENDING-COPY 1e7.
   */
  heading: "Find out what is holding your business back.",
  /**
   * HER SECOND BUTTON LABEL, slide 9: "TALK TO US". Sentence case, because the
   * capitals are a CSS transform on the button.
   *
   * IT LIVES HERE RATHER THAN ON WHATSAPP_CTA, and that is the whole reason it
   * exists as a separate string. WHATSAPP_CTA.label reads "Talk to us on
   * WhatsApp" and is rendered by all five service pages and the parked
   * diagnostic app as well as by this closer; renaming it there would have
   * retitled a button on six other pages, which her scope excludes. The href,
   * the target and the rel still come from WHATSAPP_CTA, so the destination
   * cannot drift from the other six. PENDING-COPY 1e7.
   */
  whatsappLabel: "Talk to us",
  /**
   * Rendered only when the diagnostic is live. The sentence promises "a scored
   * view of your biggest constraint in four minutes", which the contact page
   * cannot honour, so it is gated rather than reworded. No stage-one substitute
   * is invented: the spec provides none, and the heading and the two CTAs carry
   * the section without it.
   */
  standfirst:
    "The four-minute diagnostic tells you exactly where your business is losing capacity and what to fix first. If you would rather talk it through, we are on WhatsApp.",
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
