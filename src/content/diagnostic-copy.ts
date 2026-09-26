/**
 * The diagnostic's screen copy, from her file.
 *
 * SOURCE: pp-diagnostic_5 (1).html, the intro, capture and results screens.
 * Her wording throughout, with two kinds of change, both recorded here rather
 * than made quietly.
 *
 * EM DASHES, three of them in this copy, converted to a comma or a colon as the
 * sentence needed. Section 1 of her document bans them and lint-copy fails the
 * build on one. These are separate from the nine in the domain content, which
 * are handled in diagnostic-quiz.ts.
 *
 * TWO LINES THAT THE 30 AUGUST FLOW CHANGE MADE UNTRUE. That build put the
 * score before the form, so two sentences of hers that described the old order
 * were rewritten with it. The gate came back on 18 September and one of the two
 * is hers again; the other is still ours:
 *
 *   "No email required until the end. Free, always."
 *     RESTORED 26 September. Rewritten while no email was required at any
 *     point, so "until the end" was not the truth. The email is asked for after
 *     the twelfth question again, so her line is accurate again and is back
 *     verbatim. See DIAGNOSTIC_INTRO.note below. PENDING-COPY 1e2.
 *
 *   "Your score will appear on screen immediately. A detailed written report,
 *    with specific next steps for your constraint area, goes to your inbox."
 *     STILL CUT. The first sentence is not true of the veiled score either: it
 *     appears blurred, and only the report sentence survives. The capture copy
 *     that replaced it says plainly what filling the form in gets them.
 *
 * PENDING-COPY 1e0 carries both for her to confirm.
 */

/**
 * HER INTRO SCREEN, RENDERED AGAIN FROM 26 SEPTEMBER.
 *
 * It was removed on 18 September on her instruction and restored on hers. The
 * block was kept unrendered through that week rather than deleted, precisely so
 * a reversal would not mean reconstructing her wording, and that is what it was
 * worth: every string below is the one she wrote, unchanged by the round trip.
 * The full wording is also in PENDING-COPY 1e1. PENDING-COPY 1e2.
 */
export const DIAGNOSTIC_INTRO = {
  eyebrow: "Pivot Prime · Free diagnostic",
  headingLead: "What is your business",
  headingAccent: "actually running on?",
  // Her em dash before "and the one constraint" is a comma.
  deck: "Twelve questions. Four minutes. A clear picture of what is holding your operations back, and the one constraint worth fixing first.",
  stats: ["12 questions", "4 minutes", "6 operational domains", "Personalised report"],
  /** Her four ICP cards, verbatim but for the one em dash in the first. */
  audience: [
    {
      label: "The stretched founder",
      text: "Everything runs through you. You are the decision-maker, the closer, and the safety net, and it is slowing growth down.",
    },
    {
      label: "The growing SME",
      text: "Revenue is moving. But the business is not keeping up. You are hiring into chaos rather than into structure.",
    },
    {
      label: "The P&L owner",
      text: "You run a division or business unit and need operational clarity to hit your numbers without asking for more headcount.",
    },
    {
      label: "The scale-ready business",
      text: "Growth is the plan. But before you put fuel on it, you need to know which part of the engine will break first.",
    },
  ],
  startLabel: "Start the diagnostic",
  /**
   * HER OWN LINE IS BACK, because the gate it describes is back.
   *
   * Her file reads "No email required until the end. Free, always." It was
   * rewritten on 30 August, when the score came before the form, to
   * "Free, always. Your results appear on screen before anything is asked of
   * you." That was true of that build and is false of this one: the score has
   * been veiled behind the form since 18 September, so the adapted line would
   * have gone back on screen promising the opposite of what the page does.
   *
   * Restoring her wording rather than writing a third version: "until the end"
   * is accurate again, because the email is asked for after the twelfth
   * question and not before. PENDING-COPY 1e2.
   */
  note: "No email required until the end. Free, always.",
} as const;

export const DIAGNOSTIC_RESULTS = {
  eyebrow: "Your operational readiness score",
  scoreOf: "out of 100",
  breakdownLabel: "Domain breakdown",
  constraintTag: "Constraint",
  constraintLabel: "Primary constraint",
  meansLabel: "What this means for your business",
  checksLabel: "Three things to check this week",
  offerTag: "What Pivot Prime would do about it",
  offerTitle: "The Operational Clarity Audit",
  bookLabel: "Book a call with Iram",
  whatsappLabel: "Talk to us on WhatsApp",
} as const;

export const DIAGNOSTIC_CAPTURE = {
  heading: "Unlock your score and",
  headingAccent: "get the full report",
  /**
   * THE FORM IS THE GATE AGAIN, from 13 September, which is what her original
   * file does. The score and the breakdown render blurred above this, and the
   * copy has to say plainly what the reader gets for filling it in, because a
   * blurred number with no explanation reads as a page that failed to load.
   */
  sub: "Enter your details to unlock your score and get the full report, with what your result means and the three things to check this week.",
  submitLabel: "Unlock my score",
  privacy:
    "Your details are used only to send your report. We do not share them with third parties.",
  sentHeading: "Your score is unlocked",
  /** Her instruction of 13 September is that this says to check the inbox. */
  sentBody:
    "Your full report has been emailed to you. Check your inbox for what your result means, the three things to check this week and what we would do about it.",
  roles: [
    "Founder / CEO",
    "Managing Director",
    "COO / Operations",
    "CFO / Finance",
    "Business Unit Head",
    "General Manager",
    "Other",
  ],
} as const;
