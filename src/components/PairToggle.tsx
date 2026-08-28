"use client";

/**
 * The site's two-button toggle.
 *
 * THE RULE, set 28 August 2026 and applied everywhere a pair appears: the two
 * members are visually opposed, one white and one green, and the green one is
 * always on the right.
 *
 * POSITION DECIDES THE COLOUR, NOT STATE. The left button is shell with forest
 * text and the right is neon with forest text, whichever one is active. The
 * active member is marked by a ring and a heavier weight, so the pair never
 * inverts as it is pressed — the old version swapped both fills on every click,
 * which made the control read as two different controls.
 *
 * It sits on a forest card, so the track behind it is the card's own dark tone
 * rather than a third colour.
 */
export default function PairToggle({
  left,
  right,
  active,
  onChange,
  className = "",
}: {
  left: string;
  right: string;
  /** 0 = left, 1 = right. */
  active: 0 | 1;
  onChange: (next: 0 | 1) => void;
  className?: string;
}) {
  const base =
    "inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-[13px] transition-[box-shadow,font-weight]";

  return (
    <div
      data-pair-toggle
      className={`inline-flex gap-1 rounded-2xl border border-white/15 bg-forest/50 p-1 ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(0)}
        aria-pressed={active === 0}
        className={`${base} bg-shell ${active === 0 ? "font-extrabold ring-2 ring-neon" : "font-semibold ring-0"}`}
      >
        {left}
      </button>
      <button
        type="button"
        onClick={() => onChange(1)}
        aria-pressed={active === 1}
        className={`${base} bg-neon ${active === 1 ? "font-extrabold ring-2 ring-shell" : "font-semibold ring-0"}`}
      >
        {right}
      </button>
    </div>
  );
}
