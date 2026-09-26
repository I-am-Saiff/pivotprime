/**
 * Site navigation, spec 2.1.
 *
 * Order within the services dropdown is deliberate and must not be
 * alphabetised. Spec 2.1: "The audit is first because it is the entry point and
 * the only priced offer. The retainer is second because it is the destination."
 *
 * The About dropdown items are in-page anchors into /about, not routes. They
 * carry real URL fragments so /about#team can be linked directly from anywhere.
 */

export type NavLink = {
  label: string;
  href: string;
  /** True where the target is a section of a page rather than its own route. */
  anchor?: boolean;
};

export type NavItem = NavLink & { children?: NavLink[] };

export const NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Operational Clarity Audit", href: "/services/operational-clarity-audit" },
      // Slide 13: "Drop down to be changed to Fractional Leadership instead of
      // Fractional COO". The services mockup's own code comment labels the same
      // card "Fractional Leadership", so two independent sources agree. This
      // reverses Saif's earlier ruling that fixed the fractional-coo slug.
      // PENDING-COPY 1u.
      { label: "Fractional Leadership", href: "/services/fractional-leadership" },
      /**
       * BUILD AND PLACE AND UAE MARKET ENTRY ARE OFF THIS DROPDOWN, her slide
       * 10, 26 September. THE PAGES ARE NOT GONE.
       *
       * /services/build-and-place and /services/uae-market-entry stay live,
       * stay in the sitemap, stay indexable and keep every other link to them:
       * the /services index and the homepage service cards both still list all
       * five services, and the persona pages still link both through
       * ServiceLinkButtons. Her plan is to link them from the other service
       * pages in a later pass. Only the header entry has gone.
       *
       * DO NOT READ THIS AS "THE PAGES ARE UNUSED". A page that disappeared
       * from the navigation is exactly how /services/how-we-work became
       * linked from nowhere at all while every check passed on it, which is
       * why check-links walks the site and fails on a sitemap route nothing
       * links. That check is the reason this removal is safe, and it is run
       * against the build that carries it. PENDING-COPY 1e5.
       */
      { label: "Technology Builds", href: "/services/technology-builds" },
    ],
  },
  {
    label: "Who It's For",
    href: "/for-founders",
    /**
     * HER SLIDE 13 CAPITALISATION, 26 September, copied exactly as she wrote
     * the four lines rather than regularised.
     *
     * THE CAPITALS ARE STORED HERE, NOT APPLIED BY CSS. Measured before any
     * string was touched: computed text-transform is "none" on all four labels
     * at 375 and at 1440, in the mobile menu and the desktop dropdown. So
     * editing these strings is the only thing that can change what a reader
     * sees, and there is no CSS rule that will now fight them. Worth measuring
     * because the same premise was inverted on the persona industry lines
     * earlier this month, where the capitals turned out to be in the copy.
     *
     * "owners" IS LOWERCASE IN HER THIRD AND FOURTH ITEMS and that is not a
     * typo of hers to tidy: she wrote "For Corporate Innovators" and "For P&L
     * owners", and the fourth read "For P&L Owners" here until now. Hers wins.
     *
     * "For Corporate Innovators" IS A LABEL, NOT A ROUTE. The page stays at
     * /for-corporate-leaders, its metadata and content are untouched, and the
     * homepage persona tab keeps its own wording ("03 Corporate innovator"),
     * which is derived separately in PersonaSwitcher. PENDING-COPY 1e5.
     */
    children: [
      { label: "For Founders", href: "/for-founders" },
      { label: "For SMEs", href: "/for-smes" },
      { label: "For Corporate Innovators", href: "/for-corporate-leaders" },
      { label: "For P&L owners", href: "/for-pl-owners" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Pivot Prime", href: "/about" },
      { label: "Our Team", href: "/about#team", anchor: true },
      { label: "Case studies", href: "/about#case-studies", anchor: true },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Spec 3.12: the footer link list matches the top level of the navigation. */
/**
 * /insights IS in the main navigation, from 29 August.
 *
 * It was held out of the header while the page was a heading and three lines
 * with no articles under it: an empty page offered to every visitor. The client
 * delivered four finished articles and the listing design on 29 August, so the
 * reason has expired and the entry is back in NAVIGATION above. The noindex and
 * the sitemap omission went with it. PENDING-COPY 1k, closed.
 *
 * It is no longer repeated here, because FOOTER_LINKS already spreads the top
 * level of NAVIGATION and a second entry would render the link twice in the
 * footer.
 */
export const FOOTER_LINKS: NavLink[] = [
  ...NAVIGATION.map(({ label, href }) => ({ label, href })),
  { label: "Privacy", href: "/privacy" },
];

// Calls to action live in src/content/cta.ts, which is the single place the
// stage one substitution is expressed. Nothing here should hold a CTA label or
// a WhatsApp number.
//
// Note there is deliberately no diagnostic entry in either list above: stage one
// does not ship it, and spec 2.1 does not put it in the navigation in any case.
