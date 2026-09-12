import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizApp from "@/components/diagnostic/QuizApp";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

// HER TWELVE-QUESTION INSTRUMENT IS WHAT MOUNTS HERE, from 12 September. The
// route previously rendered DiagnosticApp, the deep 42-statement version. That
// component and src/lib/diagnostic/ stay in the tree, parked and untouched, and
// nothing imports them any more. They are a different and longer instrument
// that predates her file, not an earlier draft of it. PENDING-COPY 1e0.
//
// STILL BEHIND NEXT_PUBLIC_ENABLE_DIAGNOSTIC. Turning the flag on is the whole
// of the release: this route stops calling notFound(), the noindex below lifts
// on its own, sitemap.ts adds /diagnostic and robots.ts stops disallowing it,
// all from the same constant. Nothing else has to change.
export const metadata: Metadata = {
  title: "Operational Constraint Diagnostic | Pivot Prime",
  description:
    "A structured assessment across six operational domains, scoring where a business is strongest and weakest and naming the constraint holding back the rest.",
  robots: DIAGNOSTIC_ENABLED ? undefined : { index: false, follow: false },
};

export default function DiagnosticPage() {
  if (!DIAGNOSTIC_ENABLED) notFound();

  return (
    <div className="flex min-h-screen flex-col surface-page">
      <QuizApp />
    </div>
  );
}
