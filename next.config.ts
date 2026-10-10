import type { NextConfig } from "next";

/**
 * Fail loudly rather than degrade quietly.
 *
 * When NEXT_PUBLIC_WHATSAPP_NUMBER is missing, every WhatsApp call to action
 * falls back to /contact and relabels itself. That fallback exists so a missing
 * variable never produces a broken wa.me link, but it is a downgrade: WhatsApp
 * is the default business channel in this market and spec 2.2 makes it the
 * primary CTA. A production deploy that silently ships without it would lose the
 * main conversion path with nothing in the logs to say so.
 *
 * This runs during `next build` and `next dev`, because next.config.ts is
 * evaluated on both.
 */
function warnOnMissingWhatsAppNumber() {
  if (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) return;

  const rule = "=".repeat(72);
  console.warn(
    [
      "",
      rule,
      "  WARNING  NEXT_PUBLIC_WHATSAPP_NUMBER is not set.",
      "",
      "  Every WhatsApp call to action will fall back to /contact and relabel",
      "  itself from 'Talk to us on WhatsApp' to 'Talk to us'. The site will",
      "  work, but the primary conversion path in spec 2.2 is not shipping.",
      "",
      "  Set it in .env.local for development, or in the project environment",
      "  before deploying. Format: international, digits only, no plus.",
      rule,
      "",
    ].join("\n"),
  );
}

warnOnMissingWhatsAppNumber();

/**
 * Permanent redirects from the old WordPress information architecture to the
 * one specified in spec 2.1.
 *
 * These are 308s. Spec 4.5 requires a 301 from every current URL to its new
 * equivalent so existing pages do not lose the ranking they hold, and 308 is
 * the permanent redirect that also preserves the request method. Search engines
 * treat both as permanent for ranking purposes.
 *
 * The four persona pages keep their live URLs, apart from Corporate Owners
 * which becomes P&L Owners per spec 5.4, so no other persona redirect exists.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Spec 4.6: "What We Do" is renamed and moves under Services.
      // THE CANONICAL SLUG FLIPPED, 25 August.
      //
      // The spec contradicts itself: 2.1 lists /services/fractional-coo under
      // "New URLs required", while 4.2 and the 3.4 card button both point at
      // /services/fractional-leadership. We had held the COO slug because it
      // matched the nav label, and redirected leadership to it.
      //
      // Slide 13 of the client's deck settles it the other way: "Drop down to
      // be changed to Fractional Leadership instead of Fractional COO". Spec
      // 4.2's own hero heading is "Fractional Leadership", and the services
      // mockup labels the same card that too, so three sources now agree and
      // the nav label is no longer a reason to hold the other slug.
      //
      // The direction of this redirect is therefore reversed. Leaving both
      // rules in place made a loop, which is how the reversal was caught.
      // PENDING-COPY 1u.
      {
        source: "/services/fractional-coo",
        destination: "/services/fractional-leadership",
        permanent: true,
      },
      // Repointed 25 August: /services/how-we-work is unpublished per slide 17,
      // so the old WordPress path would have redirected into a 404. It goes to
      // the services index instead, which is the nearest live equivalent.
      { source: "/what-we-do", destination: "/services", permanent: true },

      // Spec 6: the About page absorbs Who We Are, with team and case studies
      // as in-page anchors. Anchors cannot be set from a config redirect, so
      // the deep links land at the top of /about and the anchor nav takes over.
      { source: "/who-we-are", destination: "/about", permanent: true },

      // Spec 2.1: Prime Insights becomes Insights.
      { source: "/our-blog", destination: "/insights", permanent: true },

      /* HER OWN CROSS-LINKS POINT AT /blog.
         
         The four article files she delivered on 29 August link to each other as
         /blog/consultant-leaves, /blog/technology-process,
         /blog/decisions-layers and /blog/margin-revenue, and each one links back
         to /blog for the index. The articles live under /insights, so without
         these two rules every link she has already written, and anything she has
         already sent to anyone, lands on a 404.

         The wildcard is listed after the bare path. Next matches in order and
         /blog/:slug does not match /blog itself, but keeping the specific rule
         first means the index never depends on that. */
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },

      // Spec 5.4: the nav label changes from Corporate Owners to P&L Owners.
      { source: "/for-corporate-owners", destination: "/for-pl-owners", permanent: true },

      // Spec 2.4: the footer link points at /contact, the live page is
      // /contact-us. Standardising on /contact and redirecting the old path.
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },

  /**
   * The opt-out link in Pivot Prime's outreach email.
   *
   * Every cold email sent from saif@pivotprime.ae carries
   * https://pivotprime.ae/unsubscribe?e=... in its footer, and its
   * List-Unsubscribe header points at /unsubscribe/one-click for the mail
   * client's own unsubscribe button. The opt-out itself lives on the sending
   * platform's backend; these two rewrites serve it here, so a recipient never
   * sees another product's domain. Remove them and every opt-out link in every
   * email already delivered becomes a 404.
   *
   * The host travels in the destination path (/t/pivotprime.ae/...) because
   * the backend's hosting replaces X-Forwarded-Host with its own name, and the
   * page needs the host to show Pivot Prime's legal entity and address. The
   * query string passes through unchanged.
   *
   * beforeFiles, so no page or later route can shadow them. Guarded in
   * scripts/check-content.mjs DECISIONS; PENDING-COPY 1g8.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/unsubscribe",
          destination: "https://lead-gen-mvp-production.up.railway.app/t/pivotprime.ae/unsubscribe",
        },
        {
          source: "/unsubscribe/one-click",
          destination:
            "https://lead-gen-mvp-production.up.railway.app/t/pivotprime.ae/unsubscribe/one-click",
        },
      ],
    };
  },
};

export default nextConfig;
