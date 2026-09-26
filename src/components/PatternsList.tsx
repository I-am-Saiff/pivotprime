"use client";

import { useState } from "react";
import Link from "next/link";
import { PATTERNS } from "@/content/homepage";
import { CONTACT_CTA } from "@/content/cta";

/**
 * The patterns list, spec 3.5.
 *
 * Implemented as an interactive "Symptom Checker / Pain-Point Matrix":
 * Visitors tap one or more symptoms they recognise in their organisation,
 * which highlights the blockers and surfaces a tailored consultation CTA.
 *
 * All 10 items are always rendered in full in the server HTML for complete
 * crawlability and SEO compliance.
 */
export default function PatternsList() {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setSelected((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const selectedItems = PATTERNS.items.filter((_, i) => selected[i]);
  const selectedCount = selectedItems.length;

  const contactHref = selectedCount > 0
    ? `/contact?message=${encodeURIComponent(
        "I would like to discuss fixing these operational bottlenecks:\n• " +
        selectedItems.join("\n• ")
      )}`
    : "/contact";

  return (
    <div className="relative">
      {/* HER SLIDE 5, 26 September: THIS BAR MOVED ABOVE THE TEN ITEMS.

          It sat under the list. She wants the reader told what to do before
          they meet the things to tap, so it is the first thing after the
          heading now and the items follow it.

          THE CALL TO ACTION CAME WITH IT, AND THAT IS WORTH KNOWING. Her note
          describes the bar and the call to action as two things, "then the
          green bar ... then the CTA". They are one element: the button is
          inside this bar, to the right of the two lines above sm and beneath
          them at 375. Moving the bar moves the button, so the section ends on
          the ten items rather than on a button. Splitting them would be
          redesigning the bar rather than moving it, so it is reported in
          PENDING-COPY 1e8 for her to decide instead.

          mt-8 has gone with the move: it was the space below the list and this
          sits directly under the heading now, which brings its own margin.

          "above" IS "below" IN THE SECOND LINE, her 2b, because the items are
          underneath it now. Nothing else in that sentence changed and the first
          line is untouched. PENDING-COPY 1e8. */}
      <div className="rounded-2xl bg-forest p-5 sm:p-6 text-white shadow-xl border border-white/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Label + description */}
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-neon leading-tight">
              {selectedCount > 0
                ? `${selectedCount} operational blocker${selectedCount > 1 ? "s" : ""} identified`
                : "Select the symptoms that sound familiar"}
            </p>
            <p className="text-sm text-white/90 font-medium mt-1 leading-snug">
              {selectedCount > 0
                ? "We solve these exact bottlenecks with structured operating models."
                : "Tap any blockers below to see how we structure the fix."}
            </p>
          </div>

          {/* Full-width on mobile, auto-width on sm+ */}
          <Link
            href={contactHref}
            className="inline-flex w-full sm:w-auto flex-shrink-0 items-center justify-center px-6 py-3 rounded-xl text-sm font-bold bg-neon text-forest hover:bg-white transition-all shadow-md"
          >
            {CONTACT_CTA.label}
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Interactive Symptom Chips Grid. mt-8 is the space the bar carried
          when it sat below this list; the two have swapped places, so the
          space swaps with them and the rhythm of the section is unchanged. */}
      <ul className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
        {PATTERNS.items.map((item, i) => {
          const isChecked = !!selected[i];
          return (
            <li key={item} className="flex-grow sm:flex-grow-0">
              <button
                type="button"
                onClick={() => toggleItem(i)}
                className={`group flex min-h-11 w-full sm:w-auto items-center gap-3 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-left text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                  isChecked
                    ? "bg-forest text-white border-forest shadow-md scale-[1.02] ring-2 ring-neon/40"
                    : "bg-shell text-forest border-forest/15 hover:border-mid/50 hover:shadow-sm"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isChecked
                      ? "bg-neon text-forest"
                      : "bg-forest/10 text-forest group-hover:bg-mid/20 group-hover:text-mid"
                  }`}
                >
                  {isChecked ? "✓" : "+"}
                </span>
                <span>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
