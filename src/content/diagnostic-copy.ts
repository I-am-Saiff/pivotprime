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
 * TWO LINES THAT THE FLOW CHANGE MADE UNTRUE. Her file gates the score behind
 * the capture form while telling the reader it appears immediately; the score
 * comes first now, per the 30 August meeting, so two sentences that described
 * the old order had to move with it:
 *
 *   "No email required until the end. Free, always."
 *     Her line, written when the form sat between the last question and the
 *     score. There is no email required at any point now, so "until the end" is
 *     no longer the truth and has gone.
 *
 *   "Your score will appear on screen immediately. A detailed written report,
 *    with specific next steps for your constraint area, goes to your inbox."
 *     The first sentence promised something the reader is already looking at by
 *     the time they reach this form. Only the report sentence survives.
 *
 * PENDING-COPY 1e0 carries both for her to confirm.
 */

/**
 * HER INTRO SCREEN, NO LONGER RENDERED, from 13 September.
 *
 * She asked for the intro removed: the hero button and a direct visit both open
 * on question one now. This block is kept rather than deleted because the
 * decision is hers to reverse, and the four persona cards are finished copy she
 * wrote. Nothing imports it while the intro is off. The full wording is also in
 * PENDING-COPY 1e1 so she can read it without opening the repository.
 *
 * To bring the intro back: render it from QuizApp again and start the stage at
 * "intro" rather than "questions".
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
  // Her "No email required until the end" line is gone with the gate. See above.
  note: "Free, always. Your results appear on screen before anything is asked of you.",
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
