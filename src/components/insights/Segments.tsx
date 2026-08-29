import type { Segment } from "@/content/insights";

/**
 * Renders one of her headings.
 *
 * Her h1s and h2s carry a hard line break and one phrase in neon, written as
 * <br> and <em> in her files. The <em> is not emphasis: her CSS sets
 * font-style:normal on it and uses it purely to colour the phrase, so this
 * renders a <span> and not an <em>. Announcing "inside" as emphasised when it is
 * only green would be an invention of ours, not hers.
 *
 * The break is a real <br>, as she wrote it. On narrow screens a break in the
 * wrong place is worse than none, so callers that need it can pass
 * breakClassName="hidden sm:inline" to drop it on mobile.
 */
export function Segments({
  segments,
  accentClassName = "text-neon",
  breakClassName,
}: {
  segments: Segment[];
  accentClassName?: string;
  breakClassName?: string;
}) {
  return (
    <>
      {segments.map((seg, i) => {
        if ("br" in seg) return <br key={i} className={breakClassName} />;
        if ("em" in seg)
          return (
            <span key={i} className={accentClassName}>
              {seg.em}
            </span>
          );
        return <span key={i}>{seg.t}</span>;
      })}
    </>
  );
}

/** Her flat text version of the same heading, for a title attribute or a test. */
export function segmentsToText(segments: Segment[]): string {
  return segments
    .map((s) => ("br" in s ? " " : "em" in s ? s.em : s.t))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}
