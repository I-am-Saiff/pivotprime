import type { MouseEvent } from "react";

/**
 * Makes a same-page anchor scroll on EVERY click, not only the first.
 *
 * THE DEFECT THIS FIXES. The homepage hero's green button is a next/link
 * pointing at #patterns. Measured on a production build: the first click
 * scrolls, and every click after it does nothing, whatever the current hash.
 * The router sees the same route, decides there is nothing to navigate to, and
 * has already prevented the browser's own fragment scroll. The nav's About
 * dropdown is worse: /about#team never scrolls at all while you are already on
 * /about, not even the first time.
 *
 * The black hero button, a plain <a href="#services">, was never affected. A
 * bare anchor re-scrolls natively however many times it is clicked. So this is
 * a next/link defect rather than the "no hashchange event" it looks like.
 *
 * WHY scrollIntoView AND NOT A COMPUTED OFFSET. globals.css sets
 * `:target, [id] { scroll-margin-top: 7rem }` so a target does not land under
 * the floating header. scrollIntoView honours scroll-margin, so the offset here
 * is the same one the working case already produces, with no second definition
 * of the header height to drift.
 *
 * WHAT IT DELIBERATELY DOES NOT TOUCH. It runs only when the href resolves to
 * an element on the current page. A link to another page, a modified click, or
 * a fragment with no matching element all fall through to the browser. That
 * keeps the href real: it still works with JavaScript off, still right-clicks,
 * still copies and shares.
 *
 * It also leaves the fractional page's seat anchors alone. Those open a seat by
 * listening for hashchange, and #coo, #cfo and #chief-of-staff are real element
 * ids on that page, so a document-wide interceptor would have swallowed the
 * event that opens the seat. This is opt-in per link instead, and no seat link
 * uses it.
 */
export function handleAnchorClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
): void {
  // Anything the browser should own: new tab, new window, middle click, or a
  // handler that already claimed this event.
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const hashAt = href.indexOf("#");
  if (hashAt < 0) return;

  const path = href.slice(0, hashAt);
  const id = href.slice(hashAt + 1);
  if (!id) return;

  // A cross-page anchor must navigate normally; only the same page is ours.
  if (path && path !== window.location.pathname) return;

  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();

  // Spec 8.3, and the same guard globals.css puts on scroll-behavior: no smooth
  // scrolling for a reader who has asked for less motion.
  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  // Keep the address bar honest so the link is still shareable. replaceState
  // when the hash is already this one, so five clicks on the same button do not
  // leave five entries to press Back through.
  const next = `${window.location.pathname}${window.location.search}#${id}`;
  if (window.location.hash === `#${id}`) {
    window.history.replaceState(null, "", next);
  } else {
    window.history.pushState(null, "", next);
  }
}
