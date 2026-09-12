"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { HAS_WHATSAPP, WHATSAPP_URL } from "@/lib/flags";
import { INDUSTRIES } from "@/content/industries";
import {
  DOMAIN_CONTENT,
  DOMAIN_NAME,
  DOMAIN_ORDER,
  QUESTIONS,
  SCALE,
} from "@/content/diagnostic-quiz";
import {
  DIAGNOSTIC_CAPTURE,
  DIAGNOSTIC_INTRO,
  DIAGNOSTIC_RESULTS,
} from "@/content/diagnostic-copy";
import { scoreDiagnostic } from "@/lib/diagnostic-score";

/**
 * The client's twelve-question diagnostic.
 *
 * HER DESIGN, THE SITE'S MATERIALS. The structure, the copy, the five-point
 * scale, the scoring and the four bands are hers. What changed is the build:
 * palette tokens instead of five raw hexes, the self-hosted Poppins the rest of
 * the site already loads instead of her Google Fonts link, React state instead
 * of `display:none` screen swapping, and the site's own card, chip and button
 * treatments.
 *
 * THE FLOW IS INVERTED, ON THE 30 AUGUST DECISION. Her file runs
 * intro, questions, capture, results, with the score gated behind the form.
 * This runs intro, questions, results, capture: the full diagnosis appears the
 * moment the twelfth question is answered, and the form sits underneath it.
 *
 * Her own file contradicts itself on this. Its capture screen reads "Your score
 * will appear on screen immediately" above a form that blocks exactly that.
 * PENDING-COPY 1e0.
 *
 * WHY NOT useRevealOnScroll HERE. Nothing in this component is hidden from the
 * server for effect. The intro is the served HTML; questions and results are
 * state the reader creates by answering. There is no copy that a crawler should
 * see and cannot, which is the failure that rule exists to prevent.
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

  /**
   * BACK TO THE TOP ON EVERY STEP, which is what her file does in showScreen().
   *
   * Dropping it was a real defect and it only showed at 375: the reader scrolls
   * down the intro to reach the start button, and the next screen then opens
   * mid-question with the footer in view, because the page kept the scroll
   * position. Caught in a viewport capture at 375, not at 1440, where the intro
   * fits and the position was already near zero.
   *
   * Keyed on the step as well as the stage so it fires between questions, not
   * only between screens. "instant" rather than smooth: this is a screen
   * change, not a scroll, and animating it would make each question arrive
   * from the wrong direction.
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
  if (stage === "intro") {
    return (
      <section className="relative overflow-hidden bg-forest px-4 pt-28 pb-16 text-white sm:px-6 sm:pt-32 sm:pb-24 md:pt-40 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.038)_1px,transparent_1px)] [background-size:26px_26px]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
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

          <ul className="mx-auto mt-10 grid gap-3 text-left sm:grid-cols-2">
            {DIAGNOSTIC_INTRO.audience.map((a) => (
              <li
                key={a.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-[13px] font-bold text-white">{a.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/45">{a.text}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
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
            className="mt-9 inline-flex min-h-11 items-center justify-center rounded-[100px] bg-neon px-10 py-4 text-sm font-bold text-forest transition-opacity hover:opacity-90"
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
            {/* aria-live so a reader using assistive technology is told the
                question changed; the heading itself is the only thing that
                moves between steps. */}
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
  const content = DOMAIN_CONTENT[constraint];

  return (
    <>
      <section className="relative overflow-hidden bg-forest px-4 pt-28 pb-14 text-center text-white sm:px-6 sm:pt-32 sm:pb-20 md:pt-40 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.038)_1px,transparent_1px)] [background-size:26px_26px]"
        />
        <div className="relative mx-auto max-w-xl">
          <p className="mb-7 text-[10px] font-bold tracking-[0.22em] text-neon/60 uppercase">
            {DIAGNOSTIC_RESULTS.eyebrow}
          </p>
          <div
            className="mx-auto mb-6 flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-neon/20 bg-neon/5"
            data-diagnostic-score
          >
            <span className="text-[56px] leading-none font-extrabold tracking-[-0.04em] text-white">
              {overall}
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-neon/50 uppercase">
              {DIAGNOSTIC_RESULTS.scoreOf}
            </span>
          </div>
          <p
            className="mb-3.5 inline-block rounded-[100px] bg-neon px-5 py-1.5 text-xs font-bold tracking-[0.06em] text-forest uppercase"
            data-diagnostic-band
          >
            {band.label}
          </p>
          <p className="mx-auto max-w-md leading-relaxed text-white/50">{band.desc}</p>
        </div>
      </section>

      <section className="surface-page px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="pt-12 pb-5 text-[10px] font-bold tracking-[0.2em] text-mid uppercase sm:pt-16">
            {DIAGNOSTIC_RESULTS.breakdownLabel}
          </p>

          <ul className="grid gap-4">
            {DOMAIN_ORDER.map((d) => {
              const isConstraint = d === constraint;
              return (
                <li key={d} className="grid gap-2" data-domain={d} data-score={domainScores[d]}>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-forest">
                      {DOMAIN_NAME[d]}
                      {isConstraint ? (
                        <span className="ml-2 rounded-[100px] bg-mid/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-mid uppercase">
                          {DIAGNOSTIC_RESULTS.constraintTag}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[13px] font-bold text-forest tabular-nums">
                      {domainScores[d]}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-forest/8">
                    <div
                      className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                        isConstraint ? "bg-mid" : "bg-neon"
                      }`}
                      style={{ width: `${domainScores[d]}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 rounded-2xl bg-forest p-7 text-white sm:p-9">
            <p className="text-[10px] font-bold tracking-[0.2em] text-neon uppercase">
              {DIAGNOSTIC_RESULTS.constraintLabel}
            </p>
            <h2
              className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl"
              data-diagnostic-constraint
            >
              {DOMAIN_NAME[constraint]}
            </h2>
            <p className="mt-5 text-[12px] font-semibold text-neon">
              {DIAGNOSTIC_RESULTS.meansLabel}
            </p>
            <p className="mt-2 leading-relaxed text-white/80">{content.commentary}</p>
          </div>

          <p className="mt-12 text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
            {DIAGNOSTIC_RESULTS.checksLabel}
          </p>
          <ol className="mt-5 grid gap-3.5">
            {content.checks.map((check, i) => (
              <li
                key={check.slice(0, 40)}
                className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5 sm:p-6"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-mid/10 text-[12px] font-bold text-mid">
                  {i + 1}
                </span>
                <p className="text-[14px] leading-relaxed text-forest/80">{check}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-2xl border-l-[3px] border-mid bg-mist px-6 py-6 sm:px-7">
            <p className="text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
              {DIAGNOSTIC_RESULTS.offerTag}
            </p>
            <p className="mt-2 text-lg font-bold text-forest">
              {DIAGNOSTIC_RESULTS.offerTitle}
            </p>
            <p className="mt-2.5 text-[14px] leading-relaxed text-forest/80">{content.offer}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-[100px] bg-neon px-8 py-3.5 text-[13px] font-bold text-forest transition-opacity hover:opacity-88"
            >
              {DIAGNOSTIC_RESULTS.bookLabel}
            </Link>
            {/* Her file hardcodes wa.me/971000000000, a placeholder. This is the
                same variable every other WhatsApp call to action on the site
                reads, with the same conditional target: WHATSAPP_URL degrades to
                /contact when it is unset, and an unconditional _blank would
                open our own contact page in a new tab. */}
            <a
              href={WHATSAPP_URL}
              target={HAS_WHATSAPP ? "_blank" : undefined}
              rel={HAS_WHATSAPP ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-11 items-center justify-center rounded-[100px] border border-forest/15 px-8 py-3.5 text-[13px] font-bold text-forest transition-colors hover:bg-forest/5"
            >
              {DIAGNOSTIC_RESULTS.whatsappLabel}
            </a>
          </div>

          {/* ---- capture, BELOW the results rather than in front of them ---- */}
          <div
            className="mt-14 rounded-2xl bg-forest p-7 text-white sm:p-9"
            data-diagnostic-capture
          >
            {sendState === "sent" ? (
              <div role="status">
                <h2 className="text-xl font-extrabold tracking-tight text-white">
                  {DIAGNOSTIC_CAPTURE.sentHeading}
                </h2>
                <p className="mt-2 leading-relaxed text-white/55">
                  {DIAGNOSTIC_CAPTURE.sentBody}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold tracking-tight text-balance">
                  {DIAGNOSTIC_CAPTURE.heading}{" "}
                  <span className="text-neon">{DIAGNOSTIC_CAPTURE.headingAccent}</span>
                </h2>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/45">
                  {DIAGNOSTIC_CAPTURE.sub}
                </p>

                <form onSubmit={onSubmit} className="mt-7 grid gap-3.5">
                  {error ? (
                    <p
                      role="alert"
                      className="rounded-xl border border-white/20 bg-white/10 p-4 text-xs font-semibold text-white"
                    >
                      {error}
                    </p>
                  ) : null}

                  <div className="grid gap-3.5 sm:grid-cols-2">
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
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Select id="d-industry" name="industry" label="Industry" options={[...INDUSTRIES]} />
                    <Select
                      id="d-role"
                      name="role"
                      label="Your role"
                      options={[...DIAGNOSTIC_CAPTURE.roles]}
                    />
                  </div>

                  {/* Bots fill hidden fields; people do not. Same trick as the
                      enquiry and subscribe forms. */}
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
    </>
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
    <div className="grid gap-1.5">
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
        className="min-h-11 rounded-xl border-[1.5px] border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white transition-colors outline-none placeholder:text-white/25 focus:border-neon/40"
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
    <div className="grid gap-1.5">
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
        className="min-h-11 cursor-pointer rounded-xl border-[1.5px] border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white transition-colors outline-none focus:border-neon/40"
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
