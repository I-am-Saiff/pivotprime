/**
 * Phase flags.
 *
 * Stage one ships the site itself. The diagnostic, the report, the email
 * delivery of that report and the database all move to a later phase.
 *
 * The diagnostic work is not reverted, it is gated. The deep instrument, the
 * corrected domain order, the stable statement ids and the presentation module
 * all remain in the tree and are preserved in full on the
 * feature/diagnostic-phase-2 branch.
 *
 * NEXT_PUBLIC_ is required rather than incidental: the flag is read in page
 * modules that are evaluated during the build and in client components, so it
 * has to be inlined at build time rather than read from the server environment.
 *
 * Defaults to false. An unset or misspelt variable keeps the diagnostic off,
 * which is the safe direction: the failure mode of a typo is a hidden feature
 * rather than an unfinished one exposed to the public.
 */
export const DIAGNOSTIC_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTIC === "true";

/**
 * The WhatsApp business number, used by the floating button and every inline
 * WhatsApp call to action.
 *
 * Read from the environment rather than hardcoded. Falls back to an empty
 * string, and every consumer routes to the contact page when it is empty, so a
 * missing variable degrades to a working contact route rather than to a broken
 * wa.me link.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const WHATSAPP_URL = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "/contact";

export const HAS_WHATSAPP = WHATSAPP_NUMBER.length > 0;

/**
 * /services/how-we-work is unpublished.
 *
 * Slide 17 of Website Revisions 2208v3: "Hide this or delete for now but would
 * like to save what it says in case we want to use later? For now its not
 * needed." Hidden rather than deleted, because she asked for the words kept.
 *
 * The route returns 404 while this is false. The page component and every
 * sentence on it stay in the tree, so turning this on republishes it unchanged.
 * The copy is also transcribed into docs/PENDING-COPY.md 1x where she can read
 * it without the site.
 */
export const HOW_WE_WORK_PUBLISHED = process.env.NEXT_PUBLIC_ENABLE_HOW_WE_WORK === "true";
