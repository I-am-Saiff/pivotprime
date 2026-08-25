import type { MetadataRoute } from "next";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { SERVICES } from "@/content/services";
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
 * /insights is omitted for the same reason from 25 August: it carries noindex
 * while it has no articles on it, so listing it would advertise a page we are
 * asking search engines to skip. It returns with the first piece.
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
