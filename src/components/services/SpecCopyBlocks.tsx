import { CONTACT_CTA as SIGN_OFF_CTA } from "@/content/cta";

/**
 * The service pages' shared section vocabulary, taken from her own file.
 *
 * pivotprimeservicepages.html builds all five pages out of four repeating
 * pieces: a section head (eyebrow, heading, standfirst), a `.lab` label above a
 * column, a `.ticks` list, a `.notefit` aside, and a `.closer` at the foot. The
 * components below are those pieces, so the five pages are assembled from her
 * structure rather than five hand-built approximations of it.
 *
 * WHAT CHANGED FROM HER FILE, AND WHY. Two of her pieces are gold: `.lab` sets
 * its label in `--gold` and `.notefit` is a gold left border over a warm cream.
 * The 30 August instruction is that no gold appears anywhere and that her gold
 * values become green, so the label is mid green and the aside is a mid green
 * border over mist, her EF, #e8f4ec. Guarded by scripts/lint-palette.mjs, which
 * fails the build on either warm value.
 *
 * The plain CopyProse, CopyCards and CopyList blocks that used to live here are
 * gone. They existed to carry spec copy the designed pages had dropped, stacked
 * underneath the design; the 30 August batch rebuilds each page to her file's
 * structure, so the copy that survives is inside the design and the copy that
 * does not is recorded in docs/PENDING-COPY.md 1b7 instead of being rendered in
 * a second, plainer version of the same page.
 */

/** Her `.lab`: the small uppercase label that heads a column. Gold in her file. */
export function Lab({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-[12px] font-semibold text-mid">
      {children}
    </div>
  );
}

/** Her `.sechead`: eyebrow, heading, optional standfirst. */
export function SectionHead({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-7 max-w-2xl sm:mb-10">
      <span className="block font-sans text-[13px] font-semibold text-mid">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold text-forest md:text-4xl">{heading}</h2>
      {sub ? <p className="mt-3 text-forest/70">{sub}</p> : null}
    </div>
  );
}

/**
 * Her `.ticks`: a list with the tick disc against each line.
 *
 * onDark inverts the disc for a list inside the dark half of a pair: neon disc
 * with a forest tick, which is the treatment the right-hand cards have carried
 * since 29 August. Mid green discs on the dark fill would be nearly invisible.
 */
export function TickList({ items, onDark = false }: { items: string[]; onDark?: boolean }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 text-[15.5px] ${onDark ? "text-white" : "text-forest"}`}
        >
          <span
            aria-hidden="true"
            className={`mt-1 flex h-[17px] w-[17px] flex-shrink-0 items-center justify-center rounded-full ${onDark ? "bg-neon" : "bg-mid"}`}
          >
            {/* The tick is drawn in the inherited colour rather than a
                literal, so this file needs no entry in the palette guard's
                grandfathered list. */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-2.5 w-2.5 ${onDark ? "text-forest" : "text-white"}`}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * THE TWO-COLUMN PAIR: white on the left, dark green on the right, every time.
 *
 * Her 31 August instruction, and the rule the site has been applying to pairs
 * since 29 August, now applied to the content pairs on the service pages as
 * well. Both halves are defined here once, so the four pairs across four pages
 * cannot drift from each other the way two copies of a card already have on
 * this branch.
 *
 * THE DARK HALF MATCHES THE CASE STUDY RESULTS PANEL: the same
 * --card-dark-fill, the same white border at a tenth, the same shadow, white
 * body text and the label in neon. It uses the .card-dark class to get that
 * fill, which also carries the descendant remap, so a list or a paragraph
 * written for a light ground is repainted for the dark one rather than needing
 * a second set of classes at every call site.
 *
 * SENTENCE CASE FROM 1 SEPTEMBER, on the client instruction relayed that day.
 * These labels were her .lab treatment: 10.5px, 0.2em tracking and
 * text-transform uppercase, which is what her own file sets. She has asked for
 * the first letter capital and the rest normal, so the transform is off and the
 * caps tracking with it, for the same reason it came off "The results" and the
 * case study attribution: 0.2em exists to open up capitals and reads loose on a
 * sentence. 10.5px was also a size chosen for caps, so it goes to 12px to stay
 * legible in mixed case. Colour, weight and position are unchanged.
 *
 * THIS IS SHARED, so it moves four pages, not the two she named: the audit page
 * and Fractional Leadership that she pointed at, plus Build and Place and UAE
 * Market Entry, which use the same pair. Leaving those two in capitals would
 * have split the treatment across sibling pages. PENDING-COPY 1c8.
 *
 * ONE THING FROM THAT PANEL IS DELIBERATELY NOT COPIED: its radial dot texture.
 * The 29 August instruction was to take the dot pattern off every dark
 * background on the service pages, and that instruction has not been reversed.
 * PENDING-COPY 1c0.
 */
export function PairLight({
  label,
  labelAs = "div",
  children,
}: {
  label?: string;
  labelAs?: "div" | "h3";
  children: React.ReactNode;
}) {
  const Label = labelAs;
  return (
    <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-7">
      {label ? (
        <Label className="font-sans text-[12px] font-semibold text-mid">
          {label}
        </Label>
      ) : null}
      <div className={label ? "mt-3" : ""}>{children}</div>
    </div>
  );
}

export function PairDark({
  label,
  labelAs = "div",
  children,
}: {
  label?: string;
  labelAs?: "div" | "h3";
  children: React.ReactNode;
}) {
  const Label = labelAs;
  return (
    <div className="card-dark rounded-2xl border border-white/10 p-6 shadow-xl sm:p-7">
      {label ? (
        <Label className="font-sans text-[12px] font-semibold text-neon">
          {label}
        </Label>
      ) : null}
      <div className={label ? "mt-3" : ""}>{children}</div>
    </div>
  );
}

/**
 * Her `.notefit`: the aside that sits beside a column of prose.
 *
 * Gold border over #fdf9f2 in her file, with the body in a warm brown. Here it
 * is a mid green border over mist, her EF colour, with the body in forest, on
 * the 30 August instruction that the gold values become green and that the
 * backgrounds she calls EF are #e8f4ec.
 */
export function NoteCard({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="rounded-r-xl border-l-[3px] border-mid bg-mist px-6 py-5 sm:px-7">
      <h3 className="text-lg font-bold text-forest">{heading}</h3>
      <p className="mt-2.5 text-[15.5px] leading-relaxed text-forest/80">{body}</p>
    </div>
  );
}

/**
 * Her `.closer`: the dark block at the foot of every service page.
 *
 * DARK AGAIN, FROM 30 AUGUST. This was a light linen card, on the earlier
 * instruction that boxes should not be dark green across the site. The meeting
 * note is explicit that every service page ends with "the dark closer with
 * eyebrow, heading, line and CTA, as her file has and as she asked to keep", and
 * the meeting overrides the file and everything before it. PENDING-COPY 1b7.
 *
 * The eyebrow, heading and line are hers, out of the closer on the matching page
 * of pivotprimeservicepages.html. Her file gives two of the five closers a
 * second button reading "Take the 4-minute diagnostic"; the diagnostic is not
 * built, so the single CTA here follows the flag like every other one on the
 * site. PENDING-COPY 0.4.
 */
export function ServiceSignOff({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="surface-page px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl bg-forest p-7 sm:p-10 md:p-11">
        <span className="block font-sans text-[13px] font-semibold text-neon">
          {eyebrow}
        </span>
        <h2 className="mt-3 max-w-[22ch] text-2xl font-bold text-white md:text-3xl">{heading}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-mist">{body}</p>
        <a
          href={SIGN_OFF_CTA.href}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-neon px-7 py-3 text-xs font-bold tracking-wider text-forest uppercase transition-colors hover:bg-white"
        >
          {SIGN_OFF_CTA.label}
        </a>
      </div>
    </section>
  );
}
