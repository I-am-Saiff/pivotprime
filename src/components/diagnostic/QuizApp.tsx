"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { INDUSTRIES } from "@/content/industries";
import { DOMAIN_NAME, DOMAIN_ORDER, QUESTIONS, SCALE } from "@/content/diagnostic-quiz";
import {
  DIAGNOSTIC_CAPTURE,
  DIAGNOSTIC_INTRO,
  DIAGNOSTIC_RESULTS,
} from "@/content/diagnostic-copy";
import { scoreDiagnostic } from "@/lib/diagnostic-score";

/**
 * The client's twelve-question diagnostic.
 *
 * HER DESIGN, THE SITE'S MATERIALS. The statements, the five-point scale, the
 * scoring, the bands and the six domains are hers. What changed is the build:
 * palette tokens instead of five raw hexes, the self-hosted Poppins the rest of
 * the site already loads instead of her Google Fonts link, React state instead
 * of display:none screen swapping.
 *
 * THE INTRO SCREEN IS BACK, 26 SEPTEMBER, on her instruction, reversing the
 * removal of 18 September. It opens on her four persona cards behind a "Start
 * the diagnostic" button again, and the hero button and a direct visit both
 * land there. Nothing after it changed: the questions, the scoring, the veiled
 * score, the capture form and the email are all as they were.
 *
 * The removal was written to be reversible and that is what it cost to reverse:
 * her copy was still in diagnostic-copy.ts and in PENDING-COPY 1e1, so no
 * wording had to be reconstructed. PENDING-COPY 1e2.
 *
 * TWO CHANGES FROM 13 SEPTEMBER, both hers, both reversing what shipped on the
 * 12th. PENDING-COPY 1e1.
 *
 *   THE SCORE IS GATED AGAIN, which is what her original file does. The ring,
 *   the band and the six-domain breakdown render blurred, with the form
 *   directly beneath, and the blur lifts on a successful submit. The 12
 *   September build showed everything immediately with the form underneath;
 *   this reverses that on her instruction.
 *
 *   THE CONSTRAINT SECTION IS OFF THE SCREEN ENTIRELY. The heading, the
 *   commentary, the three checks and the offer paragraph do not render at any
 *   point, blurred or unlocked. They are in the email and nowhere else. The
 *   constraint still tags its row in the breakdown, as her screenshot shows.
 *
 * THE BLUR IS FRICTION, NOT SECURITY. The score is computed in the browser from
 * answers the browser holds, so anyone who opens developer tools can read it
 * through the blur. That is understood and accepted: this is a reason to fill
 * in a form, not a secret. Moving the scoring server-side to make the gate real
 * would mean a round trip per question and is deliberately not done.
 *
 * WHY NOT useRevealOnScroll HERE. Nothing is hidden from the server for effect.
 * The intro is the served HTML; questions and results are state the reader
 * creates by answering. There is no copy a crawler should see and cannot, which
 * is the failure that rule exists to prevent.
 */

type Stage = "intro" | "questions" | "results";
type SendState = "idle" | "sending" | "sent" | "error";

export default function QuizApp() {
  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(QUESTIONS.length).fill(null),
  );
  const [sendState, setSendState] = useState<SendState>("idle");
  const [error, setError] = useState<string | null>(null);

  const unlocked = sendState === "sent";

  /**
   * BACK TO THE TOP ON EVERY STEP, which is what her file does in showScreen().
   *
   * Dropping it was a defect that only showed at 375: the reader scrolls down
   * the intro to reach the start button, and the next screen then opens
   * mid-question with the footer in view because the page kept its scroll
   * position. Keyed on the step as well as the stage so it fires between
   * questions, not only between screens. "instant" rather than smooth: this is
   * a screen change, not a scroll.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stage, current]);

  const start = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrent(0);
    setStage("questions");
  };

  const choose = (value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = value;
      return next;
    });
  };

  const advance = () => {
    if (answers[current] === null) return;
    if (current === QUESTIONS.length - 1) setStage("results");
    else setCurrent((c) => c + 1);
  };

  // SubmitEvent, not FormEvent: React 19 deprecates FormEvent with the note
  // that it "does not actually exist", and onSubmit is typed SubmitEventHandler.
  // The two older forms on the site still use the deprecated alias; they are
  // out of scope here and unaffected.
  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setSendState("sending");
    setError(null);
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The answers go with it. The route rescores them rather than trusting
        // a posted total, so this is the input, not the result.
        body: JSON.stringify({ ...data, answers }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error ?? "That did not go through. Please email hello@pivotprime.ae.");
        setSendState("error");
        return;
      }
      form.reset();
      setSendState("sent");
    } catch {
      setError("That did not go through. Please email hello@pivotprime.ae.");
      setSendState("error");
    }
  };

  /* ---------------------------------------------------------------- intro */
  /*
   * IT FILLS THE SCREEN AND CENTRES, from 26 September, when the four persona
   * cards came off. They were most of this screen's height, and without them
   * the green band stopped 245px above the footer at 768 and 1440 and left a
   * strip of bare page ground under it: a hole, not a margin. Measured before
   * and after rather than judged from the class list.
   *
   * flex min-h-[100svh] items-center is the homepage hero's own treatment,
   * copied rather than invented, svh included: on a phone with the browser
   * chrome showing, 100vh is taller than the screen and would push the start
   * button under the fold. The padding stays as it was and still sets the
   * minimum clearance under the floating header.
   */
  if (stage === "intro") {
    return (
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest px-4 pt-28 pb-16 text-white sm:px-6 sm:pt-32 sm:pb-24 md:pt-40 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.038)_1px,transparent_1px)] [background-size:26px_26px]"
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="mb-5 text-[10px] font-bold tracking-[0.22em] text-neon uppercase">
            {DIAGNOSTIC_INTRO.eyebrow}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
            <span className="block">{DIAGNOSTIC_INTRO.headingLead}</span>
            <span className="block text-neon">{DIAGNOSTIC_INTRO.headingAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/55">
            {DIAGNOSTIC_INTRO.deck}
          </p>

          {/* HER FOUR PERSONA CARDS CAME OFF HERE, 26 September, on her
              instruction. They sat between the deck and the meta line. The copy
              is kept unrendered in DIAGNOSTIC_INTRO.audience with a note on
              switching it back on, the same way the whole intro was kept when
              it was removed on 18 September. PENDING-COPY 1e3. */}

          {/* THE META LINE BELONGS TO THE BUTTON, NOT TO THE DECK. With the
              cards between them, the deck opened a 40px gap and the meta line
              read as the top of the lower block. Taking the cards out left
              32px above it and 36px below, near enough equal that it floated
              between the two. Back to 40 above and 28 below, so the meta line,
              the button and its note read as one cluster under the heading. */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {DIAGNOSTIC_INTRO.stats.map((s) => (
              <li key={s} className="flex items-center gap-2 text-xs text-white/45">
                <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-neon/60" />
                {s}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={start}
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-[100px] bg-neon px-10 py-4 text-sm font-bold text-forest transition-opacity hover:opacity-90"
          >
            {DIAGNOSTIC_INTRO.startLabel}
          </button>
          <p className="mt-4 text-[11px] text-white/30">{DIAGNOSTIC_INTRO.note}</p>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------ questions */
  if (stage === "questions") {
    const question = QUESTIONS[current];
    const pct = Math.round((current / QUESTIONS.length) * 100);
    const isLast = current === QUESTIONS.length - 1;

    return (
      <section className="surface-page px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24 md:pt-40 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div
            className="mb-7 h-[3px] w-full overflow-hidden rounded-full bg-forest/10"
            role="progressbar"
            aria-valuenow={current + 1}
            aria-valuemin={1}
            aria-valuemax={QUESTIONS.length}
            aria-label="Diagnostic progress"
          >
            <div
              className="h-full bg-neon transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-[11px] font-bold tracking-[0.16em] text-forest/60 uppercase">
              Question {current + 1} of {QUESTIONS.length}
            </p>
            <span className="rounded-[100px] border border-mid/20 bg-mid/5 px-3 py-1 text-[9px] font-bold tracking-[0.16em] text-mid uppercase">
              {DOMAIN_NAME[question.domain]}
            </span>
          </div>

          <div className="rounded-2xl border border-forest/10 bg-white p-7 shadow-sm sm:p-9">
            {/* An H2, not an H1, because the intro screen is the served HTML and
                carries the page's H1 again. It was promoted to an H1 while the
                intro was gone and question one was what the page served. aria-live
                so a reader using assistive technology is told the question
                changed; the heading itself is the only thing that moves between
                steps. */}
            <h2
              aria-live="polite"
              className="text-lg font-bold leading-snug text-balance text-forest sm:text-xl"
            >
              {question.text}
            </h2>

            <div className="mt-7 grid gap-2.5">
              {SCALE.map((point) => {
                const chosen = answers[current] === point.value;
                return (
                  <button
                    key={point.value}
                    type="button"
                    onClick={() => choose(point.value)}
                    aria-pressed={chosen}
                    className={`flex min-h-11 items-center gap-3.5 rounded-xl border-[1.5px] px-4 py-3 text-left transition-colors ${
                      chosen
                        ? "border-forest bg-forest/5"
                        : "border-forest/10 bg-white hover:border-mid hover:bg-mid/5"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        chosen ? "border-forest bg-forest" : "border-forest/15"
                      }`}
                    >
                      {chosen ? <span className="h-[7px] w-[7px] rounded-full bg-neon" /> : null}
                    </span>
                    <span
                      className={`text-[13px] ${chosen ? "font-semibold text-forest" : "font-medium text-forest/85"}`}
                    >
                      {point.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            {/* Back at question one returns to the intro, which is her own
                behaviour and is possible again now the intro exists. It was
                disabled on question one while there was nothing behind it. */}
            <button
              type="button"
              onClick={() => (current === 0 ? setStage("intro") : setCurrent((c) => c - 1))}
              className="-mx-2 inline-flex min-h-11 items-center px-2 text-xs font-semibold text-forest/55 transition-colors hover:text-forest"
            >
              Back
            </button>
            <button
              type="button"
              onClick={advance}
              disabled={answers[current] === null}
              className="inline-flex min-h-11 items-center justify-center rounded-[100px] bg-forest px-8 py-3 text-[13px] font-bold text-neon transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-0"
            >
              {isLast ? "See my results" : "Next"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------- results */
  const { domainScores, overall, constraint, band } = scoreDiagnostic(answers);

  /**
   * COMPACT ON PURPOSE. Her instruction is that the form is visible at 375
   * without scrolling, so the score block and the breakdown are sized to leave
   * room for it: a smaller ring and tighter rows below sm, opening out above.
   */
  /**
   * THE VEIL, STRENGTHENED 14 SEPTEMBER. It was a single blur-[7px] over both
   * blocks and it did not hold: at 1440 the score digits and the constraint tag
   * were both readable, and the bar fills gave away all six scores as a chart
   * even with the numbers blurred.
   *
   * Large glyphs survive blur far better than small text, which is why the
   * 56px score read through 7px while the 13px labels did not. So the two
   * blocks are blurred separately now, the score harder than the list, and the
   * score panel carries a scrim on top of the blur as well.
   */
  const scoreVeil = unlocked ? "" : "blur-[14px] select-none";
  const listVeil = unlocked ? "" : "blur-[12px] select-none";

  return (
    <section className="surface-page px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-24 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* ---- score and breakdown, blurred until the form is sent ---- */}
        <div
          data-diagnostic-veiled={unlocked ? "false" : "true"}
          aria-hidden={unlocked ? undefined : "true"}
          className={unlocked ? "" : "pointer-events-none"}
        >
          {/* The scrim is a sibling, not a child: a child would sit inside the
              filtered element and be blurred along with the digits, which would
              make it a smear rather than a veil. */}
          <div className="relative">
          <div className={`transition-[filter] duration-500 ${scoreVeil}`}>
          <div className="rounded-2xl bg-forest px-5 py-6 text-center text-white sm:px-8 sm:py-8">
            <p className="text-[9px] font-bold tracking-[0.2em] text-neon/60 uppercase sm:text-[10px]">
              {DIAGNOSTIC_RESULTS.eyebrow}
            </p>
            <p
              className="mt-3 text-[44px] leading-none font-extrabold tracking-[-0.04em] sm:text-[56px]"
              data-diagnostic-score
            >
              {overall}
              <span className="ml-1.5 align-middle text-[10px] font-semibold tracking-[0.12em] text-neon/50 uppercase">
                {DIAGNOSTIC_RESULTS.scoreOf}
              </span>
            </p>
            <p
              className="mt-3 inline-block rounded-[100px] bg-neon px-4 py-1 text-[11px] font-bold tracking-[0.06em] text-forest uppercase"
              data-diagnostic-band
            >
              {band.label}
            </p>
            <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-white/50">
              {band.desc}
            </p>
          </div>
          </div>
          {unlocked ? null : (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-forest/45"
            />
          )}
          </div>

          <div className={`transition-[filter] duration-500 ${listVeil}`}>
          <p className="pt-6 pb-3 text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
            {DIAGNOSTIC_RESULTS.breakdownLabel}
          </p>
          <ul className="grid gap-2.5">
            {DOMAIN_ORDER.map((d) => {
              const isConstraint = d === constraint;
              return (
                <li key={d} className="grid gap-1" data-domain={d} data-score={domainScores[d]}>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-forest sm:text-[13px]">
                      {DOMAIN_NAME[d]}
                      {/* THE TAG IS WITHHELD UNTIL UNLOCK, not just blurred.
                          Blurring it hides the word and keeps the disclosure:
                          a green chip on one row of six says which domain is
                          the constraint, which is the single most valuable
                          fact in the report. Caught by looking at a capture at
                          1440 rather than by reading the CSS. It renders as
                          hers on unlock. */}
                      {isConstraint && unlocked ? (
                        <span className="ml-2 rounded-[100px] bg-mid/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-mid uppercase">
                          {DIAGNOSTIC_RESULTS.constraintTag}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[12px] font-bold text-forest tabular-nums sm:text-[13px]">
                      {domainScores[d]}
                    </span>
                  </div>
                  {/* THE BARS CARRY NO DATA UNTIL UNLOCK, chosen over blurring
                      them harder. Blur cannot hide a bar: an empty track next
                      to a full one is a difference of shape, not of detail, so
                      the constraint row at 0 and a row at 100 stay obvious at
                      any strength. Six identical neutral bars still read as a
                      breakdown, which is what the section is there to promise,
                      and disclose nothing. */}
                  <div className="h-1.5 overflow-hidden rounded-full bg-forest/8">
                    <div
                      className={`h-full rounded-full ${
                        unlocked
                          ? isConstraint
                            ? "bg-mid"
                            : "bg-neon"
                          : "bg-forest/15"
                      }`}
                      style={{ width: unlocked ? `${domainScores[d]}%` : "100%" }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
        </div>

        {/* ---- the gate, directly beneath with no gap ---- */}
        <div className="mt-5 rounded-2xl bg-forest p-6 text-white sm:p-8" data-diagnostic-capture>
          {unlocked ? (
            <div role="status">
              <h2 className="text-xl font-extrabold tracking-tight">
                {DIAGNOSTIC_CAPTURE.sentHeading}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                {DIAGNOSTIC_CAPTURE.sentBody}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-extrabold tracking-tight text-balance sm:text-2xl">
                {DIAGNOSTIC_CAPTURE.heading}{" "}
                <span className="text-neon">{DIAGNOSTIC_CAPTURE.headingAccent}</span>
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                {DIAGNOSTIC_CAPTURE.sub}
              </p>

              <form onSubmit={onSubmit} className="mt-5 grid gap-3">
                {error ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-white/20 bg-white/10 p-3.5 text-xs font-semibold text-white"
                  >
                    {error}
                  </p>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field id="d-name" name="name" label="Your name" placeholder="Iram Kauser" />
                  <Field id="d-biz" name="biz" label="Business name" placeholder="Pivot Prime" />
                </div>
                <Field
                  id="d-email"
                  name="email"
                  type="email"
                  label="Business email"
                  placeholder="you@yourcompany.com"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select id="d-industry" name="industry" label="Industry" options={[...INDUSTRIES]} />
                  <Select
                    id="d-role"
                    name="role"
                    label="Your role"
                    options={[...DIAGNOSTIC_CAPTURE.roles]}
                  />
                </div>

                {/* Bots fill hidden fields; people do not. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <button
                  type="submit"
                  disabled={sendState === "sending"}
                  className="mt-1 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[100px] bg-neon px-8 py-3.5 text-[13px] font-bold text-forest transition-opacity hover:opacity-88 disabled:opacity-70"
                >
                  {sendState === "sending" ? "Sending" : DIAGNOSTIC_CAPTURE.submitLabel}
                </button>
                <p className="text-center text-[11px] leading-relaxed text-white/30">
                  {DIAGNOSTIC_CAPTURE.privacy}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="grid gap-1">
      <label
        htmlFor={id}
        className="text-[10px] font-bold tracking-[0.1em] text-white/45 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : "off"}
        className="min-h-11 rounded-xl border-[1.5px] border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white transition-colors outline-none placeholder:text-white/25 focus:border-neon/40"
      />
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="grid gap-1">
      <label
        htmlFor={id}
        className="text-[10px] font-bold tracking-[0.1em] text-white/45 uppercase"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className="min-h-11 cursor-pointer rounded-xl border-[1.5px] border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white transition-colors outline-none focus:border-neon/40"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-forest text-white">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
