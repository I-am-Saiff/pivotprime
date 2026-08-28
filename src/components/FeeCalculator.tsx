"use client";

import { useState } from "react";

/**
 * The fee, worked through on a slider.
 *
 * WHAT IT PUBLISHES, AND UNDER WHOSE AUTHORITY
 *
 * A fixed element of AED 20,000, a results element of 10 to 20 per cent, and
 * the arithmetic that joins them. Spec section 1 says "One price only appears on
 * the site: the Operational Clarity Audit floor. No other figure and no upper
 * limit appears anywhere", and spec 3.10 says "Do not publish a specific
 * percentage or a formula here." This does all three. It is built on the
 * client's verbal instruction of 28 August 2026 and is recorded in
 * docs/PENDING-COPY.md 1an and 1ao, which also record that AED 20,000 and the
 * AED 15,000 audit floor elsewhere on the site cannot both be right.
 *
 * THE DEFAULT IS SERVER-RENDERED. `value` starts at 400,000, so the served HTML
 * already carries AED 400,000, AED 20,000 and AED 40,000 to 80,000. Without
 * JavaScript the slider does not move and the figures still read.
 */
const MIN = 100_000;
const MAX = 2_000_000;
const STEP = 50_000;
const DEFAULT = 400_000;
const FIXED = 20_000;

/**
 * Each figure is built as one string rather than as `AED {value}`. JSX splits an
 * interpolation into separate text nodes, so the served markup read
 * "AED <!-- -->400,000" and no check that greps for the whole figure could find
 * it. The rule on this branch is that the copy is in the served HTML, and half a
 * figure does not satisfy it.
 */
const aed = (n: number) => n.toLocaleString("en-US");

export default function FeeCalculator() {
  const [value, setValue] = useState(DEFAULT);

  const low = Math.round(value * 0.1);
  const high = Math.round(value * 0.2);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label htmlFor="fee-value" className="text-[11px] font-bold tracking-[0.18em] text-white/70 uppercase">
          The saving or gain we agree with you
        </label>
        <p className="font-sans text-xl leading-none font-extrabold tracking-tight text-white tabular-nums sm:text-3xl">
          {`AED ${aed(value)}`}
        </p>
      </div>

      <input
        id="fee-value"
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        // A range input is 16px tall by default, which is not a touch target.
        // The extra height is the control, not padding around it.
        className="mt-1 h-11 w-full accent-[var(--color-neon)]"
        aria-describedby="fee-note"
      />

      {/* Two across at every width: stacked, the pair alone added seventy
          pixels to a section that was told not to grow. */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 sm:px-4">
          <p className="text-[10px] font-bold tracking-[0.16em] text-white/50 uppercase">Fixed element</p>
          <p className="mt-1 font-sans text-base leading-tight font-extrabold tracking-tight text-white tabular-nums sm:text-2xl">
            {`AED ${aed(FIXED)}`}
          </p>
        </div>
        <div className="rounded-xl border border-neon/30 bg-neon/10 px-3 py-2.5 sm:px-4">
          <p className="text-[10px] font-bold tracking-[0.16em] text-neon uppercase">Results element</p>
          <p className="mt-1 font-sans text-base leading-tight font-extrabold tracking-tight text-neon tabular-nums sm:text-2xl">
            {`AED ${aed(low)} to ${aed(high)}`}
          </p>
        </div>
      </div>

      <p id="fee-note" className="mt-2.5 text-[12px] leading-snug text-white/60 sm:text-[12.5px] sm:leading-relaxed">
        The fixed element covers the work. The results element is only earned if the agreed number moves.
      </p>
    </div>
  );
}
