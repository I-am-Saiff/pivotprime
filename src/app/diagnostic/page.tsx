import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiagnosticApp from "@/components/diagnostic/DiagnosticApp";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

// Stage one does not ship the diagnostic. The route stays in the tree behind
// NEXT_PUBLIC_ENABLE_DIAGNOSTIC so the work is preserved rather than reverted,
// and is excluded from the sitemap by the same flag. Ongoing work lives on
// feature/diagnostic-phase-2.
//
// Note the instrument currently mounted here is the deep 42-statement version.
// The split into a public 12-question instrument at /diagnostic and an unlisted
// deep one at /diagnostic/deep is later-phase work, so /diagnostic/deep does not
// exist yet and 404s on its own.
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
      <DiagnosticApp />
    </div>
  );
}
