import {
  BANDS,
  DOMAIN_ORDER,
  QUESTIONS,
  type Band,
  type DomainId,
} from "@/content/diagnostic-quiz";

/**
 * The scoring for the client's twelve-question diagnostic.
 *
 * HER MATHS, UNCHANGED. Two questions per domain, five points each scored 0 to
 * 4, so a domain is out of 8 and is reported as a percentage. The overall score
 * is the unweighted mean of the six domain scores, and the constraint is the
 * lowest-scoring domain.
 *
 * A SEPARATE MODULE FROM src/lib/diagnostic/, WHICH IS PARKED. That directory
 * holds the 42-statement instrument, with its own weighting and its own tests.
 * Nothing here imports it and nothing there is changed. The two are different
 * instruments that happen to share six domain names. PENDING-COPY 1e0.
 *
 * Pure on purpose: no React, no DOM, no clock. The component renders what this
 * returns, and src/lib/diagnostic-score.test.ts checks the arithmetic against
 * hand-worked cases rather than against itself.
 */

/** The highest score a single domain can reach: two questions at four points. */
const MAX_PER_DOMAIN = 8;

export type DiagnosticResult = {
  /** 0 to 100 per domain, in her canonical order. */
  domainScores: Record<DomainId, number>;
  /** 0 to 100, the unweighted mean of the six. */
  overall: number;
  /** The lowest-scoring domain. Ties resolve to the earlier one in her order. */
  constraint: DomainId;
  band: Band;
};

/**
 * `answers` is twelve entries in question order, each 0 to 4, or null where the
 * question was not reached. An unanswered question scores zero, which is how
 * her file behaves: `answers[i] || 0`.
 */
export function scoreDiagnostic(answers: (number | null)[]): DiagnosticResult {
  const domainScores = {} as Record<DomainId, number>;

  for (const domain of DOMAIN_ORDER) {
    const sum = QUESTIONS.reduce(
      (total, question, index) =>
        question.domain === domain ? total + (answers[index] ?? 0) : total,
      0,
    );
    domainScores[domain] = Math.round((sum / MAX_PER_DOMAIN) * 100);
  }

  const overall = Math.round(
    DOMAIN_ORDER.reduce((total, d) => total + domainScores[d], 0) / DOMAIN_ORDER.length,
  );

  // Strictly less than, so an earlier domain in her order holds a tie. Her file
  // resolves ties the same way, by iterating in DOMAIN_ORDER and only replacing
  // on a lower score.
  let constraint: DomainId = DOMAIN_ORDER[0];
  for (const d of DOMAIN_ORDER) {
    if (domainScores[d] < domainScores[constraint]) constraint = d;
  }

  // The bands cover 0 to 100 with no gap, but a band is still resolved by
  // lookup rather than by index arithmetic, so a future edit to BANDS cannot
  // silently shift which score gets which label.
  const band =
    BANDS.find((b) => overall >= b.min && overall <= b.max) ?? BANDS[BANDS.length - 1];

  return { domainScores, overall, constraint, band };
}

/** True once every question has an answer, which is what unlocks the results. */
export function isComplete(answers: (number | null)[]): boolean {
  return answers.length === QUESTIONS.length && answers.every((a) => a !== null);
}
