/**
 * The pieces both form handlers need, in one place.
 *
 * WHY THIS EXISTS. /api/enquiry had the sender, the timestamp, the HTML escaper
 * and the rate limiter inline. /api/diagnostic needs all four and would have
 * been a second copy of each, which is how the two service-page grids ended up
 * disagreeing on this branch. Extracted rather than duplicated, on the same
 * reasoning as SpecCopyBlocks and PivotMark.
 *
 * Behaviour is unchanged for the enquiry route: same sender, same window, same
 * limit, same escaping. Only the location moved.
 */

/** The inbox somebody reads. A real mailbox, not the sending domain. */
export const TO = "hello@pivotprime.ae";

/**
 * THE VERIFIED SENDING DOMAIN, not the apex. Resend is verified for
 * send.pivotprime.ae and only for that, so the apex address has no DKIM key of
 * its own to sign with. See the note this replaced in the enquiry route.
 */
export const FROM = "Pivot Prime <hello@send.pivotprime.ae>";

/** The timestamp the inbox sees, in the timezone she actually works in. */
export const stampGST = (): string =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date()) + " (Gulf Standard Time)";

/** Escapes a value for interpolation into an email's HTML body. */
export const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

/**
 * Fixed-window limiter, per IP. In-memory: one instance, no store, by scope.
 *
 * A FACTORY, NOT A SHARED MAP. Each route gets its own bucket, so somebody who
 * has just sent an enquiry can still complete the diagnostic. A single shared
 * map would have made the two forms compete for the same five attempts, which
 * is not what the enquiry route's limit was set to mean.
 */
export function createRateLimiter(
  maxPerWindow = 5,
  windowMs = 10 * 60 * 1000,
): (ip: string) => boolean {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function rateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || now > entry.resetAt) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return false;
    }
    entry.count += 1;
    return entry.count > maxPerWindow;
  };
}

/** The caller's IP, as far as the platform will tell us. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
