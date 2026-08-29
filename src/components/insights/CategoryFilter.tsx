"use client";

import { useState } from "react";
import { ACTIVE_FILTERS } from "@/content/insights";

/**
 * Her category tabs.
 *
 * EVERY CARD STAYS IN THE SERVED HTML. Filtering sets one attribute on <html>'s
 * nearest scope, a data attribute on the wrapper this renders into, and CSS
 * hides the cards that do not match. Nothing is conditionally rendered, so with
 * JavaScript off every article is on the page and every tab is inert rather
 * than broken. That is the standing rule on this site and this is the third
 * place it has mattered.
 *
 * The tabs are real buttons in a tablist, so the control is reachable and
 * announced. Her file used bare <button> elements with no state exposed at all.
 *
 * ACTIVE_FILTERS, not her full six. "Growth" has no article behind it, and a tab
 * that opens an empty list is a dead control. Her category stays in the content
 * module and the tab comes back by itself when a Growth piece is published.
 */
export default function CategoryFilter({ targetId }: { targetId: string }) {
  const [active, setActive] = useState(ACTIVE_FILTERS[0]);

  const select = (label: string) => {
    setActive(label);
    const target = document.getElementById(targetId);
    if (target) target.setAttribute("data-active-tag", label);
  };

  return (
    <div className="border-b border-forest/12 bg-shell px-4 sm:px-6 lg:px-8">
      <div
        role="tablist"
        aria-label="Filter articles by category"
        className="scrollbar-hide mx-auto flex max-w-[1060px] gap-1 overflow-x-auto"
      >
        {ACTIVE_FILTERS.map((label) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(label)}
              className={`cursor-pointer border-b-2 px-[18px] py-4 text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "border-neon text-forest"
                  : "border-transparent text-forest/75 hover:text-forest"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
