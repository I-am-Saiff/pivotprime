"use client";

import { INDUSTRIES } from "@/content/industries";
import { useState } from "react";
import { ENQUIRY_SUBMIT_CTA } from "@/content/cta";

/**
 * Contact form, spec 2.3.
 *
 * PROGRESSIVE ENHANCEMENT, NOT JAVASCRIPT-DEPENDENT.
 *
 * This is a real form with an action and a method, so with JavaScript disabled
 * the browser posts it natively and the route handler answers with a redirect
 * carrying the outcome in the query string. Nothing here is a dead button: the
 * previous version had `type="button"` with no handler at all, so pressing it
 * did nothing under any circumstances.
 *
 * With JavaScript, the submit is intercepted so the result appears inline
 * without a page navigation. The visible email address and WhatsApp link beside
 * the form are the third path, and they work regardless.
 */
export default function EnquiryForm({
  initialStatus,
  initialError,
  prefilledMessage = "",
}: {
  initialStatus?: "sent" | null;
  initialError?: string | null;
  /** Read on the server. useSearchParams here forced a Suspense boundary, which
   *  streamed the whole form inside <div hidden> and left it hidden with
   *  JavaScript off, defeating the progressive enhancement described above. */
  prefilledMessage?: string;
}) {

  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    initialStatus === "sent" ? "sent" : initialError ? "error" : "idle",
  );
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [message, setMessage] = useState(prefilledMessage);
  const [industry, setIndustry] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok || !body.ok) {
        setError(body.error ?? "The message could not be sent. Please email hello@pivotprime.ae.");
        setState("error");
        return;
      }
      form.reset();
      setState("sent");
    } catch {
      setError("The message could not be sent. Please email hello@pivotprime.ae.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-mid/20 bg-mid/5 p-8 text-center"
      >
        <h3 className="mb-2 text-xl font-bold text-forest">Message sent</h3>
        <p className="text-neutral-600">
          We have it, and a confirmation is on its way to your inbox. Someone will reply within one
          working day.
        </p>
      </div>
    );
  }

  return (
    <form
      action="/api/enquiry"
      method="post"
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-neutral-200/80 card-dark p-6 sm:p-8 backdrop-blur-sm"
    >
      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="w-full rounded-xl border border-neutral-200 card-dark px-4 py-3.5 text-sm transition-all placeholder:text-neutral-400 focus:border-neon focus:ring-2 focus:ring-neon/30 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="w-full rounded-xl border border-neutral-200 card-dark px-4 py-3.5 text-sm transition-all placeholder:text-neutral-400 focus:border-neon focus:ring-2 focus:ring-neon/30 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="industry" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Industry
        </label>
        {/* A native select with `required`, so the no-JavaScript path is the
            same path: the browser blocks an empty submit, and if it does not,
            the server rejects it with the same error pattern as every other
            field. `industry` is state only so the Other box can appear; nothing
            about the value depends on JavaScript running. */}
        <select
          id="industry"
          name="industry"
          required
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 card-dark px-4 py-3.5 text-sm transition-all focus:border-neon focus:ring-2 focus:ring-neon/30 focus:outline-none"
        >
          <option value="">Select your industry</option>
          {INDUSTRIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Rendered always, hidden with the `hidden` attribute rather than by
          being absent, so it is in the served HTML. `required` is on it only
          while Other is chosen, which is also what the server enforces. */}
      <div hidden={industry !== "Other"}>
        <label htmlFor="industryOther" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Which industry?
        </label>
        <input
          id="industryOther"
          name="industryOther"
          type="text"
          required={industry === "Other"}
          placeholder="Tell us in a few words"
          className="w-full rounded-xl border border-neutral-200 card-dark px-4 py-3.5 text-sm transition-all placeholder:text-neutral-400 focus:border-neon focus:ring-2 focus:ring-neon/30 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Message / Biggest Challenge Right Now{" "}
          <span className="font-medium normal-case tracking-normal text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're working through..."
          className="w-full resize-none rounded-xl border border-neutral-200 card-dark px-4 py-3.5 text-sm transition-all placeholder:text-neutral-400 focus:border-neon focus:ring-2 focus:ring-neon/30 focus:outline-none"
        />
      </div>

      {/* Honeypot. Hidden from people, filled by bots. Not display:none, which
          some bots skip, and taken out of the tab order and the accessibility
          tree so it never reaches a real visitor. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        // THE LABEL WAS WHITE ON NEON AT 1.92:1, the worst ratio on the site,
        // on the one button that has to work. It was not written that way: the
        // class here has always said text-forest, and the form around it is
        // .card-dark, whose descendant remap repaints every text-forest child
        // white. That is right for text sitting on the dark form and wrong for a
        // label sitting on a bright green button inside it, which is the exact
        // case data-on-light was added for. Forest on neon measures 7.29:1.
        //
        // The hover went with it. It used to swap to forest with white text,
        // which data-on-light would have turned forest on forest. It is white
        // now, which is what every other neon button on the site does, and the
        // label stays forest in both states at 13.98:1.
        data-on-light="true"
        className="w-full rounded-xl bg-neon px-8 py-3.5 font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-white hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-70 text-xs"
      >
        {state === "sending" ? "Sending..." : ENQUIRY_SUBMIT_CTA.label}
      </button>
      <p className="text-center text-[11px] text-neutral-500 font-medium">
        We use your details only to prepare the call.
      </p>
    </form>
  );
}
