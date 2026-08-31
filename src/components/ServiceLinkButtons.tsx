import Link from "next/link";
import { serviceLinksIn } from "@/content/service-links";

/**
 * The service buttons at the foot of a persona card.
 *
 * WHICH BUTTONS IS NOT DECIDED HERE. It is decided by the sub-line, through
 * serviceLinksIn, so the same sentence produces the same button on every page.
 * A card whose sub-line names no service renders nothing at all, not an empty
 * row: `null` rather than an empty flex container, so the card's spacing does
 * not change on the pages that get no buttons.
 *
 * THE STYLE IS THE HEADER'S "Talk to us" BUTTON, her instruction: the same
 * neon fill, forest text, rounded-xl, px-5 py-2, weight and tracking.
 *
 * Two deliberate differences, both because that button is not in this
 * situation. Its focus ring is offset against the dark header; here the offset
 * is the default, because a forest ring on a light card draws a dark halo. And
 * it carries min-h-11: the header button is hidden below lg and is never a
 * touch target, while these are on the page at every width, and 44px is the
 * smallest a finger can reliably hit.
 */
export default function ServiceLinkButtons({ subline }: { subline: string }) {
  const links = serviceLinksIn(subline);
  if (links.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-neon px-5 py-2 text-xs font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
