import type { CSSProperties } from "react";
import type { Logo } from "@/content/homepage";

/**
 * ONE SIZE FOR EVERY LOGO IN THE TWO ROWS, her note of 3 October: "When fixing
 * logos please make all same size also the AIG became so small now?"
 *
 * Every mark is drawn from its measured box inside its own file (Logo.mark) and
 * scaled to one shared target, as fractions of the tile:
 *
 *   - no wider than maxWidth and no taller than maxHeight, the box every mark
 *     fits inside, so nothing comes near a tile's edge;
 *   - and, inside that box, the same area for every mark, so a long wordmark
 *     ("MANCAVE", "Scentmatic") and a compact emblem (AIG, OSN) carry about the
 *     same weight rather than the same width or the same height.
 *
 * The numbers were chosen by laying all twenty tiles side by side at phone and
 * computer size and looking at the rows together. PENDING-COPY 1g7.
 */
export const LOGO_MARK = { maxWidth: 0.6, maxHeight: 0.4, area: 0.11 } as const;

/** Every tile has the older pictures' footprint, 345 by 185. */
export const LOGO_TILE_ASPECT = 345 / 185;

/** The tile's width in CSS px on a phone and from md up (h-20 and md:h-24). */
const TILE_WIDTH = { phone: 150, computer: 180 } as const;

type MarkInput = Pick<Logo, "w" | "h" | "mark" | "weight" | "tile" | "mono">;

/** The mark's width and height as fractions of the tile's width and height. */
export function logoMarkFraction({ mark, weight }: Pick<Logo, "mark" | "weight">) {
  const [, , mw, mh] = mark;
  const shape = mw / mh;
  const cap = Math.min(LOGO_MARK.maxWidth, (LOGO_MARK.maxHeight * shape) / LOGO_TILE_ASPECT);
  const width = Math.min(cap, Math.sqrt((LOGO_MARK.area * shape) / LOGO_TILE_ASPECT) * (weight ?? 1));
  return { width, height: (width * LOGO_TILE_ASPECT) / shape };
}

/**
 * Where the file is placed inside the tile so its mark lands centred at the
 * target size, as percentages of the tile, plus the clip that shows only the
 * mark for files whose own ground, glow or frame must not show: the older
 * pictures, and Nurture's badge.
 */
export function logoMarkStyle(logo: MarkInput): { style: CSSProperties; sizes: string } {
  const [mx, my, mw, mh] = logo.mark;
  const { width, height } = logoMarkFraction(logo);
  const sx = width / mw;
  const sy = height / mh;
  const pct = (v: number) => `${+(v * 100).toFixed(3)}%`;

  const clipped = !logo.tile || logo.mono === false;
  let clipPath: string | undefined;
  if (clipped) {
    // A little air round the mark, in the file's own units, so no edge of the
    // lettering is shaved.
    const pad = Math.max(2, 0.05 * Math.min(mw, mh));
    const top = Math.max(0, my - pad) / logo.h;
    const left = Math.max(0, mx - pad) / logo.w;
    const bottom = Math.max(0, logo.h - (my + mh + pad)) / logo.h;
    const right = Math.max(0, logo.w - (mx + mw + pad)) / logo.w;
    clipPath = `inset(${pct(top)} ${pct(right)} ${pct(bottom)} ${pct(left)})`;
  }

  const across = logo.w * sx;
  return {
    style: {
      left: pct(0.5 - (mx + mw / 2) * sx),
      top: pct(0.5 - (my + mh / 2) * sy),
      width: pct(across),
      height: pct(logo.h * sy),
      clipPath,
    },
    sizes: `(min-width: 768px) ${Math.ceil(TILE_WIDTH.computer * across)}px, ${Math.ceil(TILE_WIDTH.phone * across)}px`,
  };
}
