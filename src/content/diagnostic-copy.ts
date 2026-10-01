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
 * HER INTRO SCREEN, REWRITTEN FROM SLIDE 7 OF THE v3 DECK, 30 September.
 *
 * SOURCE: req/Last_Bits_with_comments_v3.pptx, slide 7. Her three notes on it:
 *
 *   [1] "FREE DIAGNOSTIC, SLIGHTLY BIGGER, OR HIGHLIGHTED,"
 *   [2] "Main page to look like second pic shown here, remove all the stretched
 *       founder stuff etc, and have the lighter background similar to most of
 *       the website. Keep wording as shown in this picture"
 *   [3] "start the diagnostic button to be rectangular like all other buttons
 *       and example shown below"
 *
 * THE WORDING IS IN HER PICTURE, NOT IN HER TEXT, which is what "keep wording as
 * shown in this picture" means: the strings below are read off the image on that
 * slide, ppt/media/image13.png, rather than retyped from a sentence of hers.
 * PENDING-COPY 1g1 records that and reproduces the image's wording so she can
 * check it against her own.
 *
 * THE META LINE IS UNCHANGED AND THAT IS DELIBERATE: her new picture carries the
 * same four items the screen already had, in the same order, so stats below is
 * the one thing on this screen her redesign does not touch.
 *
 * WHAT IT REPLACES, preserved in PENDING-COPY 1g1:
 *   eyebrow  "Pivot Prime · Free diagnostic"
 *   heading  "What is your business" / "actually running on?"
 *   deck     "Twelve questions. Four minutes. A clear picture of what is holding
 *             your operations back, and the one constraint worth fixing first."
 *   note     "No email required until the end. Free, always."
 *
 * THE NOTE IS THE ONE WITH A HISTORY. It was hers, rewritten on 30 August when
 * the flow changed, and restored verbatim on 26 September when the gate came
 * back. Her new picture replaces it with a different promise about the results
 * being immediate. That is her third word on this line and it is the one that
 * ships; the other two are both in PENDING-COPY.
 */
export const DIAGNOSTIC_INTRO = {
  // "FREE DIAGNOSTIC" on her image. Stored sentence case because the eyebrow
  // treatment uppercases in CSS, as every other eyebrow on this site does.
  // SHORTER THAN IT WAS: the old one opened "Pivot Prime ·" and her image does
  // not, so the prefix goes with the rest of the old screen.
  eyebrow: "Free diagnostic",
  headingLead: "What is stopping your",
  headingAccent: "business from growing?",
  deck: "Answer questions about how the business actually runs and you get a clear view of where you can improve. We will name at least one specific constraint and tell you exactly how to start fixing it.",
  stats: ["12 questions", "4 minutes", "6 operational domains", "Personalised report"],
  /**
   * HER FOUR ICP CARDS, NO LONGER RENDERED, from 26 September.
   *
   * She asked for the cards taken off the intro screen: it keeps the eyebrow,
   * the heading, the deck, the meta line and the start button with its note.
   * Nothing reads this array while they are off.
   *
   * KEPT RATHER THAN DELETED, the same way the whole intro was kept when it was
   * removed on 18 September, and for the reason that decision proved out: the
   * intro came back eight days later and her wording was still here to come
   * back with it. These four are finished copy she wrote. The full wording is
   * also in PENDING-COPY 1e3 so she can read it without opening the repository.
   *
   * To switch them back on: map this array in QuizApp's intro screen again,
   * between the deck and the meta line, and put back the spacing that came out
   * with it (the deck's bottom margin and the meta line's top margin). The
   * removed markup is in the commit that took them off.
   *
   * Verbatim but for the one em dash in the first.
   */
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
   * HER THIRD WORDING FOR THIS LINE, from the slide 7 picture.
   *
   * The first was hers: "No email required until the end. Free, always." The
   * second was ours, written on 30 August when the score came before the form,
   * and retired on 26 September when her own line became true again. This is
   * hers again and it describes the same flow from the other end: what the
   * reader gets rather than what they are not asked for. Both earlier versions
   * are in PENDING-COPY 1g1.
   */
  note: "Complete the diagnostic and your personalised results are on screen straight away. No waiting, no sales call.",
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
  /**
   * SHORTENED FROM "Book a call with Iram" ON 26 SEPTEMBER, her instruction,
   * everywhere the string appeared.
   *
   * THE EMAIL IS THE ONLY THING THAT READS THIS NOW. The results screen stopped
   * rendering the constraint section on 18 September, so this label reaches a
   * reader through buildReportEmail and nowhere else. It is in her scope for
   * that reason: she asked for the email included deliberately, so the site and
   * the emailed report do not disagree on what the button says.
   *
   * The site's own three instances live in src/content/insights.ts.
   * PENDING-COPY 1e4.
   */
  bookLabel: "Book a call",
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
