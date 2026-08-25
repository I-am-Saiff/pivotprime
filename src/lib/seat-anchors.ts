/**
 * Seat anchors for /services/fractional-leadership.
 *
 * Spec 4.2: "Build the three anchors on this page: #coo, #chief-of-staff and
 * #cfo. The persona pages and the homepage services card all link directly into
 * a specific seat, so the anchors are load-bearing rather than convenience."
 *
 * The spec then contradicts itself eleven lines later by labelling the Chief of
 * Staff seat `#cos`. `#chief-of-staff` is canonical and `#cos` is aliased, so
 * whichever fragment a link was written with, it lands. See
 * docs/PENDING-COPY.md section 2.2.
 */

export const SEAT_IDS = ["coo", "chief-of-staff", "cfo"] as const;

export type SeatId = (typeof SEAT_IDS)[number];

/** Fragments that are not canonical but must still resolve. */
const SEAT_ALIASES: Record<string, SeatId> = {
  cos: "chief-of-staff",
  "chief-of-staff": "chief-of-staff",
  "fractional-leadership": "coo",
  "fractional-cfo": "cfo",
};

/**
 * Resolves a raw location.hash to a canonical seat id.
 * Returns null for an empty, unknown or malformed fragment.
 */
export function resolveSeatFromHash(hash: string): SeatId | null {
  if (!hash || hash.length < 2) return null;

  let raw: string;
  try {
    raw = decodeURIComponent(hash.replace(/^#/, "")).toLowerCase();
  } catch {
    return null;
  }

  if ((SEAT_IDS as readonly string[]).includes(raw)) return raw as SeatId;
  return SEAT_ALIASES[raw] ?? null;
}

/** Index of a seat in the canonical order, or 0 when the fragment means nothing. */
export function seatIndexFromHash(hash: string): number {
  const id = resolveSeatFromHash(hash);
  return id ? SEAT_IDS.indexOf(id) : 0;
}
