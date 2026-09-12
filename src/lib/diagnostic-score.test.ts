import { describe, expect, it } from "vitest";
import { scoreDiagnostic, isComplete } from "./diagnostic-score";
import { DOMAIN_ORDER, QUESTIONS } from "@/content/diagnostic-quiz";

/**
 * Cases worked by hand first, then checked against the code. Testing the maths
 * against itself would only prove it is consistent, not that it is right.
 */
describe("scoreDiagnostic", () => {
  it("scores a full house at 100 and the top band", () => {
    const r = scoreDiagnostic(new Array(12).fill(4));
    expect(r.overall).toBe(100);
    DOMAIN_ORDER.forEach((d) => expect(r.domainScores[d]).toBe(100));
    expect(r.band.label).toBe("Built to Scale");
  });

  it("scores all-zero at 0 and the bottom band", () => {
    const r = scoreDiagnostic(new Array(12).fill(0));
    expect(r.overall).toBe(0);
    expect(r.band.label).toBe("Constrained");
  });

  it("puts the midpoint answer at 50, which lands in Straining", () => {
    // Every answer 2 of 4: each domain is 4/8, so 50, and the mean is 50.
    const r = scoreDiagnostic(new Array(12).fill(2));
    expect(r.overall).toBe(50);
    expect(r.band.label).toBe("Straining");
  });

  it("names the lowest domain as the constraint", () => {
    // Her order is fd pd cm dv pa tl, twice. Questions 2 and 8 are 'pd'.
    const answers = new Array(12).fill(4);
    answers[1] = 0;
    answers[7] = 0;
    const r = scoreDiagnostic(answers);
    expect(r.constraint).toBe("pd");
    expect(r.domainScores.pd).toBe(0);
    expect(r.domainScores.fd).toBe(100);
  });

  it("moves the constraint when a different domain is the weak one", () => {
    // Questions 6 and 12 are 'tl'.
    const answers = new Array(12).fill(4);
    answers[5] = 0;
    answers[11] = 1;
    const r = scoreDiagnostic(answers);
    expect(r.constraint).toBe("tl");
    // 0 + 1 of 8 = 12.5%, rounded to 13.
    expect(r.domainScores.tl).toBe(13);
  });

  it("resolves a tie to the earlier domain in her order", () => {
    const answers = new Array(12).fill(4);
    // Flatten fd (0, 6) and tl (5, 11) equally; fd comes first.
    [0, 6, 5, 11].forEach((i) => (answers[i] = 0));
    expect(scoreDiagnostic(answers).constraint).toBe("fd");
  });

  it("treats an unanswered question as zero rather than throwing", () => {
    const answers: (number | null)[] = new Array(12).fill(4);
    answers[0] = null;
    const r = scoreDiagnostic(answers);
    // fd is questions 1 and 7: null + 4 = 4 of 8 = 50.
    expect(r.domainScores.fd).toBe(50);
  });

  it("covers every band boundary with no gap", () => {
    for (let score = 0; score <= 100; score++) {
      const answers = new Array(12).fill(0);
      const r = scoreDiagnostic(answers);
      expect(r.band).toBeDefined();
    }
    expect(scoreDiagnostic(new Array(12).fill(0)).band.label).toBe("Constrained");
  });
});

describe("isComplete", () => {
  it("is false until every question has an answer", () => {
    const answers: (number | null)[] = new Array(12).fill(null);
    expect(isComplete(answers)).toBe(false);
    answers.fill(3);
    answers[11] = null;
    expect(isComplete(answers)).toBe(false);
    answers[11] = 0;
    expect(isComplete(answers)).toBe(true);
  });
});

describe("her content survived generation", () => {
  it("has twelve questions, two per domain", () => {
    expect(QUESTIONS).toHaveLength(12);
    DOMAIN_ORDER.forEach((d) => {
      expect(QUESTIONS.filter((q) => q.domain === d)).toHaveLength(2);
    });
  });

  it("keeps her interleaved order rather than grouping by domain", () => {
    expect(QUESTIONS.map((q) => q.domain)).toEqual([...DOMAIN_ORDER, ...DOMAIN_ORDER]);
  });

  it("carries no em dash, which lint-copy would fail the build on", () => {
    expect(JSON.stringify(QUESTIONS)).not.toContain("—");
  });
});
