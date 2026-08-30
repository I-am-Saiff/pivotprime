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
      {/* Interactive Symptom Chips Grid */}
      <ul className="flex flex-wrap gap-2.5 sm:gap-3">
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

      {/* Dynamic Resolution CTA Bar — stacks vertically on mobile */}
      <div className="mt-8 rounded-2xl bg-forest p-5 sm:p-6 text-white shadow-xl border border-white/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Label + description */}
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-neon leading-tight">
              {selectedCount > 0
                ? `${selectedCount} Operational Blocker${selectedCount > 1 ? "s" : ""} Identified`
                : "Select the symptoms that sound familiar"}
            </p>
            <p className="text-sm text-white/90 font-medium mt-1 leading-snug">
              {selectedCount > 0
                ? "We solve these exact bottlenecks with structured operating models."
                : "Tap any blockers above to see how we structure the fix."}
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
    </div>
  );
}
