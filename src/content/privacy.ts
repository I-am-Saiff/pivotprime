/**
 * Privacy policy, spec 2.7.
 *
 * TODO: client sign-off.
 *
 * The spec supplies this as "a working base written for the site as specified"
 * and is explicit about what has to happen before launch: "Have it checked by a
 * UAE-qualified adviser before launch, and update the cookie paragraph if
 * analytics or advertising tools are added later."
 *
 * This is copy that creates a legal obligation, so it is not a placeholder to be
 * improved by a developer. Until it is signed off, the page carries a visible
 * draft notice and the diagnostic API stays behind DIAGNOSTIC_API_ENABLED.
 *
 * THE DIAGNOSTIC CLAUSES ARE REMOVED, NOT LOST.
 *
 * The policy described completing a diagnostic, how individual answers are held
 * and how long they are kept. None of that is on the site in this phase, so a
 * reader was being told how data is handled for something they cannot find. The
 * wording is preserved in docs/PENDING-COPY.md 1l and comes back with the
 * diagnostic.
 *
 * Required because the enquiry form captures an email address and returns a
 * report, which is processing of personal data under the UAE Personal Data
 * Protection Law. Tracked in docs/PENDING-COPY.md item 1.8.
 */

export const PRIVACY_SIGNED_OFF = false;

export const PRIVACY_TITLE = "Privacy Policy";

export const PRIVACY_INTRO =
  "Pivot Prime Consultancy FZ-LLC is registered in Ras Al Khaimah, United Arab Emirates. This policy explains what we collect, why, and what you can ask us to do about it.";

export type PrivacySection = { heading: string; body: string };

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    heading: "What We Collect",
    body: "When you contact us, we collect the name, email address and anything you choose to tell us in the message. We do not collect payment details through this website.",
  },
  {
    heading: "Why We Collect It",
    body: "To reply to you, to produce and send the report you asked for, and to contact you about the work you enquired about. We do not sell your data and we do not share it with third parties for their own marketing.",
  },
  {
    heading: "How Long We Keep It",
    body: "Enquiries are kept for twenty-four months, then deleted, unless you become a client and we need them for the engagement.",
  },
  {
    heading: "Your Rights",
    body: "You can ask us for a copy of what we hold, ask us to correct it, or ask us to delete it. Email hello@pivotprime.ae and we will respond within thirty days.",
  },
  {
    heading: "Cookies",
    body: "This site uses cookies only for basic function and anonymous analytics. It does not use advertising or tracking cookies.",
  },
  {
    heading: "Contact",
    body: "hello@pivotprime.ae",
  },
];

/**
 * Spec 2.7, to be used exactly as written, on an unticked checkbox. The spec is
 * explicit: "Do not pre-tick it."
 */
export const CONSENT_CHECKBOX_LABEL =
  "I agree to Pivot Prime processing the information I have provided in order to produce and send my report, and to contact me about it. I can withdraw this at any time by emailing hello@pivotprime.ae.";
