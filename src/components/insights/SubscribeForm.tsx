"use client";

import { useState } from "react";
import { SUBSCRIBE } from "@/content/insights";

/**
 * Her subscribe block, wired to /api/insights.
 *
 * PROGRESSIVE ENHANCEMENT, matching EnquiryForm. Real action and method, so the
 * browser posts natively without JavaScript and the route answers with a
 * redirect carrying the outcome in the query string. With JavaScript the submit
 * is intercepted and the result appears in place.
 *
 * Her file had an <input> and a <button> with no form, no action and no
 * handler: pressing it did nothing under any circumstances. The markup is hers,
 * the wiring is new.
 */
export default function SubscribeForm({
  initialStatus,
  initialError,
}: {
  initialStatus?: "subscribed" | null;
  initialError?: string | null;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    initialStatus === "subscribed" ? "done" : initialError ? "error" : "idle",
  );
  const [error, setError] = useState<string | null>(initialError ?? null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error ?? "That did not go through. Please email hello@pivotprime.ae.");
        setState("error");
        return;
      }
      form.reset();
      setState("done");
    } catch {
      setError("That did not go through. Please email hello@pivotprime.ae.");
      setState("error");
    }
  };

  return (
    <>
      {/* Fixed height either side of the swap, so confirming a subscription
          does not shorten the section and jump the page. */}
      <div className="min-h-[104px]">
        {state === "done" ? (
          <p
            role="status"
            className="mx-auto flex min-h-[50px] max-w-[420px] items-center justify-center rounded-[100px] border border-mid/30 bg-mid/5 px-6 text-sm font-semibold text-forest"
          >
            You are on the list. The next piece comes to you.
          </p>
        ) : (
          <form
            action="/api/insights"
            method="post"
            onSubmit={onSubmit}
            className="mx-auto flex max-w-[420px] flex-col gap-2.5 sm:flex-row"
          >
            <label htmlFor="subscribe-email" className="sr-only">
              {SUBSCRIBE.placeholder}
            </label>
            <input
              id="subscribe-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={SUBSCRIBE.placeholder}
              className="min-h-[50px] flex-1 rounded-[100px] border-[1.5px] border-forest/12 bg-shell px-[18px] py-[13px] text-[13px] text-foreground transition-colors outline-none placeholder:text-forest/75 focus:border-mid"
            />
            {/* Bots fill hidden fields; people do not. Same trick as the
                enquiry form, and cheaper than a captcha for a reader. */}
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
              disabled={state === "sending"}
              className="min-h-[50px] cursor-pointer rounded-[100px] bg-forest px-6 py-[13px] text-xs font-bold whitespace-nowrap text-neon transition-opacity hover:opacity-85 disabled:opacity-70"
            >
              {state === "sending" ? "Sending" : SUBSCRIBE.button}
            </button>
          </form>
        )}
        {state === "error" && error ? (
          <p role="alert" className="mt-3 text-[11px] font-semibold text-forest">
            {error}
          </p>
        ) : null}
      </div>
      <p className="mt-3 text-[11px] text-forest/75">{SUBSCRIBE.note}</p>
    </>
  );
}
