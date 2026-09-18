"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { INDUSTRIES } from "@/content/industries";
import { DOMAIN_NAME, DOMAIN_ORDER, QUESTIONS, SCALE } from "@/content/diagnostic-quiz";
import { DIAGNOSTIC_CAPTURE, DIAGNOSTIC_RESULTS } from "@/content/diagnostic-copy";
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
 * THREE CHANGES FROM 13 SEPTEMBER, all hers, all reversing or trimming what
 * shipped on the 12th. PENDING-COPY 1e1.
 *
 *   NO INTRO SCREEN. It opened on her four persona cards behind a "Start the
 *   diagnostic" button. The hero button and a direct visit both land on
 *   question one now. Her intro copy is kept in diagnostic-copy.ts and in
 *   PENDING-COPY, unrendered, so the decision is reversible.
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
 * Questions and results are state the reader creates by answering, so there is
 * no copy a crawler should see and cannot.
 */

type Stage = "questions" | "results";
type SendState = "idle" | "sending" | "sent" | "error";

export default function QuizApp() {
  // No "intro" member: question one is where this opens.
  const [stage, setStage] = useState<Stage>("questions");
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
   * Dropping it was a defect that only showed at 375: the next screen opened
   * mid-question with the footer in view because the page kept its scroll
   * position. Keyed on the step as well as the stage so it fires between
   * questions, not only between screens. "instant" rather than smooth: this is
   * a screen change, not a scroll.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stage, current]);

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
            <h1
              aria-live="polite"
              className="text-lg font-bold leading-snug text-balance text-forest sm:text-xl"
            >
              {question.text}
            </h1>

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
            {/* No intro to go back to, so question one has nothing behind it.
                Rendered disabled rather than removed, so the Next button does
                not jump across the row between question one and two. */}
            <button
              type="button"
              onClick={() => setCurrent((c) => c - 1)}
              disabled={current === 0}
              className="-mx-2 inline-flex min-h-11 items-center px-2 text-xs font-semibold text-forest/55 transition-colors hover:text-forest disabled:pointer-events-none disabled:opacity-0"
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
  const veil = unlocked
    ? ""
    : "blur-[7px] select-none pointer-events-none";

  return (
    <section className="surface-page px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-24 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* ---- score and breakdown, blurred until the form is sent ---- */}
        <div
          data-diagnostic-veiled={unlocked ? "false" : "true"}
          aria-hidden={unlocked ? undefined : "true"}
          className={`transition-[filter] duration-500 ${veil}`}
        >
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
                      {isConstraint ? (
                        <span className="ml-2 rounded-[100px] bg-mid/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-mid uppercase">
                          {DIAGNOSTIC_RESULTS.constraintTag}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[12px] font-bold text-forest tabular-nums sm:text-[13px]">
                      {domainScores[d]}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-forest/8">
                    <div
                      className={`h-full rounded-full ${isConstraint ? "bg-mid" : "bg-neon"}`}
                      style={{ width: `${domainScores[d]}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
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
