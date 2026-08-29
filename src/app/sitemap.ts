import type { MetadataRoute } from "next";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { SERVICES } from "@/content/services";
import { ARTICLE_SLUGS } from "@/content/insights";
import { SITE_URL } from "@/content/metadata";

/**
 * Sitemap.
 *
 * Deliberately minimal for stage one. It exists now rather than in the SEO pass
 * because the diagnostic gating requires the flagged routes to be excluded, and
 * an exclusion is only demonstrable against a sitemap that exists.
 *
 * Anchors are not listed. /about#team and /about#case-studies are sections of
 * /about, not separate documents, and listing fragments as URLs misrepresents
 * the site's structure.
 *
 * /insights and her four articles are listed from 29 August. The page was
 * omitted while it carried noindex for having nothing on it; the client
 * delivered four finished pieces, the noindex is gone, and the articles are the
 * only pages on this site written to rank on their own.
 *
 * /privacy is omitted while its text is unsigned: the page carries noindex until
 * a UAE-qualified adviser has reviewed it, and a sitemap entry would contradict
 * that.
 */
const ROUTES = [
  "/",
  "/services",
  ...SERVICES.map((s) => s.href),
  "/for-founders",
  "/for-smes",
  "/for-corporate-leaders",
  "/for-pl-owners",
  "/about",
  "/contact",
  "/insights",
  ...ARTICLE_SLUGS.map((slug) => `/insights/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  const routes = [...ROUTES];

  // Stage one keeps the diagnostic out entirely. When the flag is turned on,
  // the public instrument joins the sitemap and the unlisted deep one does not:
  // spec 7.3 requires it to stay noindex and reachable only by a tokenised link.
  if (DIAGNOSTIC_ENABLED) routes.push("/diagnostic");

  return routes.map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
