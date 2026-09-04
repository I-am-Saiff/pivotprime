"use client";

import type { ReactNode } from "react";
import { handleAnchorClick } from "@/lib/anchor-scroll";

/**
 * An anchor that scrolls to its target every time, not only the first.
 *
 * A plain <a> rather than next/link on purpose: next/link is what breaks
 * repeated same-page anchors, and there is nothing to prefetch at a fragment on
 * the page you are already looking at. The href is real and stays in the served
 * HTML, so this works with JavaScript off. See src/lib/anchor-scroll.ts.
 *
 * It takes any href, including a cross-page one, and only intercepts when the
 * target is on the current page. That makes it safe for the hero buttons, whose
 * href becomes /diagnostic once the flag is turned on.
 */
export default function AnchorLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={(e) => handleAnchorClick(e, href)}>
      {children}
    </a>
  );
}
