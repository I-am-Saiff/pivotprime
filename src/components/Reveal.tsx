"use client";

import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

/**
 * The reveal-on-scroll behaviour as a wrapper, so the page around it does not
 * have to be a client component.
 *
 * `useRevealOnScroll` is a hook, so any component calling it is a client
 * component and everything it renders ships to the browser. On the service
 * pages that meant an entire page hydrating in order to fade one panel in.
 * Wrapping instead of hooking keeps the page on the server and sends only this.
 *
 * The hook's own guarantee is unchanged and is the reason it exists: it starts
 * REVEALED and only un-reveals when the element is below the fold and motion is
 * allowed, so nothing here is ever hidden from a crawler or from a visitor with
 * reduced motion. See src/lib/use-reveal-on-scroll.ts.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  revealedClassName = "opacity-100 translate-y-0",
  hiddenClassName = "opacity-0 translate-y-4",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  revealedClassName?: string;
  hiddenClassName?: string;
}) {
  const [ref, isVisible] = useRevealOnScroll<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        isVisible ? revealedClassName : hiddenClassName
      }`}
    >
      {children}
    </div>
  );
}
