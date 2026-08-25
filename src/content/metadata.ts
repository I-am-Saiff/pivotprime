import type { Metadata } from "next";

/**
 * Per-page titles and descriptions. Spec 4.5.
 *
 * "A unique title tag and meta description on every page, written for a human
 * rather than stuffed. Roughly 55 characters and 155 characters."
 *
 * Every page has its own. Nothing inherits a template, because the five service
 * pages are the ones meant to rank and a shared description would put them in
 * competition with each other for the same words.
 *
 * The UAE Market Entry page carries the terms spec 4.5 names as the site's real
 * organic opportunity: "UAE market entry", "setting up a business in Dubai" and
 * "company formation UAE", used in a sentence rather than stuffed.
 */

export const SITE_NAME = "Pivot Prime";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pivotprime.ae";

type PageMeta = { title: string; description: string; path: string };

/**
 * TODO(client): there is no Open Graph image.
 *
 * Nothing in public/ is a share card. The candidates are hero photographs and
 * client logos, and cropping a photograph of water gives a reader nothing when
 * Iram shares a link on LinkedIn or WhatsApp, which spec 4.5 names as the case
 * that matters. An unbranded default is worse than none, so no og:image is
 * declared and the card falls back to title and description, which are correct.
 *
 * Needs one asset at 1200x630 carrying the logo and a short line.
 * Tracked in docs/PENDING-COPY.md item 1.15.
 */
export const OG_IMAGE: { url: string; width: number; height: number } | null = null;

export const PAGES = {
  home: {
    title: "Pivot Prime | The consultancy that actually executes",
    description:
      "Most consultants recommend the fix. We build it. Fractional C-suite leadership and hands-on execution for founder-led and mid-sized businesses in the UAE.",
    path: "/",
  },
  services: {
    title: "Services | Pivot Prime",
    description:
      "Operational audits, fractional leadership, embedded delivery teams, technology builds and UAE market entry. We find what is holding you back, then fix it.",
    path: "/services",
  },
  clarityAudit: {
    title: "Operational Clarity Audit | Pivot Prime",
    description:
      "A structured diagnosis of what is actually limiting the business, and a prioritised plan for fixing it. From AED 15,000, typically 12 to 20 working days.",
    path: "/services/operational-clarity-audit",
  },
  fractional: {
    title: "Fractional COO, CFO and Chief of Staff | Pivot Prime",
    description:
      "Senior leadership for a season, not a lifetime. We build the operating model, run the weekly execution, then hand it to an operations lead so it holds.",
    path: "/services/fractional-coo",
  },
  buildAndPlace: {
    title: "Build and Place | Pivot Prime",
    description:
      "We put project managers, fractional CFOs, engineers and marketers inside your business to execute the fix. Sourced, vetted and managed by us.",
    path: "/services/build-and-place",
  },
  technologyBuilds: {
    title: "Technology Builds | Pivot Prime",
    description:
      "Websites, CRMs, workflow automation, dashboards and AI, built after the diagnosis rather than instead of it. We build at the constraint, not over it.",
    path: "/services/technology-builds",
  },
  marketEntry: {
    title: "UAE Market Entry | Pivot Prime",
    description:
      "Setting up a business in Dubai takes more than company formation. Market entry from licence to a functioning, properly priced operation, numbers first.",
    path: "/services/uae-market-entry",
  },
  howWeWork: {
    title: "How we work | Pivot Prime",
    description:
      "Discover, design, deliver. How Pivot Prime diagnoses what is blocking progress, designs the fix, and stays to execute it rather than handing over a report.",
    path: "/services/how-we-work",
  },
  forFounders: {
    title: "For founders | Pivot Prime",
    description:
      "You have created something real, and everything still depends on you. Build a business that runs without the founder in every decision, starting with the audit.",
    path: "/for-founders",
  },
  forSmes: {
    title: "For SMEs | Pivot Prime",
    description:
      "Revenue is increasing but margins are uneven. Predictable profit, pricing you can defend, and operations that scale, for SMEs growing faster than their systems.",
    path: "/for-smes",
  },
  forCorporateLeaders: {
    title: "For corporate leaders | Pivot Prime",
    description:
      "Expected to deliver change without headcount or a long approval cycle. Embedded execution support and an on-demand specialist bench, without a permanent cost.",
    path: "/for-corporate-leaders",
  },
  forPlOwners: {
    title: "For P&L owners | Pivot Prime",
    description:
      "Accountable for the P&L across teams, markets and moving parts. A small number of moves that materially shift trajectory, rather than competing initiatives.",
    path: "/for-pl-owners",
  },
  about: {
    title: "About Pivot Prime",
    description:
      "Led by a Fellow of the Institute and Faculty of Actuaries, after sixteen years in senior operating roles at AIG, MetLife and Gallagher. Why Pivot Prime exists.",
    path: "/about",
  },
  contact: {
    title: "Contact | Pivot Prime",
    description:
      "Tell us what you are working through and we will follow up within one working day. WhatsApp is the fastest way to reach us.",
    path: "/contact",
  },
  insights: {
    title: "Insights | Pivot Prime",
    description:
      "Writing from Pivot Prime on operations, execution and building businesses that scale in the UAE.",
    path: "/insights",
  },
  privacy: {
    title: "Privacy policy | Pivot Prime",
    description:
      "What Pivot Prime collects, why we collect it, how long we keep it, and what you can ask us to do about it.",
    path: "/privacy",
  },
} satisfies Record<string, PageMeta>;

/** Builds the Next metadata object, including canonical and Open Graph. */
export function pageMetadata(key: keyof typeof PAGES): Metadata {
  const page = PAGES[key];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: SITE_NAME,
      locale: "en_AE",
      type: "website",
      ...(OG_IMAGE ? { images: [OG_IMAGE] } : {}),
    },
    twitter: {
      card: OG_IMAGE ? "summary_large_image" : "summary",
      title: page.title,
      description: page.description,
    },
  };
}
