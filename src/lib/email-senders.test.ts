import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FROM, TO } from "./email";

/**
 * EVERY ROUTE SENDS FROM THE VERIFIED DOMAIN, AND FROM THE SAME PLACE.
 *
 * This exists because one of them did not. /api/insights carried its own
 * `const FROM = "Pivot Prime <hello@pivotprime.ae>"`, a domain Resend has never
 * verified: the verified one is send.pivotprime.ae. Every subscribe attempt was
 * rejected at the first send, the route answered 502, and the reader was told
 * "That did not go through". Measured against production before the fix: HTTP
 * 502, and no mail to anyone. The client reported it as "it doesn't work when
 * we subscribe", which is exactly what it was.
 *
 * Nothing caught it. The route had tests for none of this, check-content cannot
 * post a form, and reading the file shows a sender address that looks entirely
 * reasonable until it is compared with the one two files away. So the check is
 * the comparison itself: no route may declare its own sender.
 *
 * SOURCE IS THE RIGHT THING TO READ HERE, unusually for this repository. The
 * defect is a duplicated constant, which is a source-level fact; a served page
 * cannot show which address a server-side send used.
 */

const API = join(process.cwd(), "src/app/api");

const routeFiles = readdirSync(API, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => join(API, e.name, "route.ts"));

describe("every API route sends from the one verified sender", () => {
  it("finds the routes it means to check", () => {
    // A rename that empties this list would make every assertion below pass
    // over nothing, which is the failure mode this guards.
    expect(routeFiles.length).toBeGreaterThanOrEqual(3);
  });

  it("uses a sender on the verified domain", () => {
    expect(FROM).toContain("@send.pivotprime.ae");
  });

  for (const file of routeFiles) {
    const name = file.split("/").slice(-2).join("/");
    const src = readFileSync(file, "utf8");
    /**
     * Comments stripped before the literal-address check, because the route
     * that carried the defect now DOCUMENTS it: its header quotes the old
     * "Pivot Prime <hello@pivotprime.ae>" verbatim so the next reader knows
     * what went wrong. The first run of this test failed on that comment,
     * which is the test being right about the wrong lines. Code only.
     */
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

    it(`${name} declares no sender of its own`, () => {
      expect(code).not.toMatch(/^\s*const\s+FROM\s*=/m);
      expect(code).not.toMatch(/^\s*const\s+TO\s*=/m);
      // The literal address, however it is spelt, belongs in one file only.
      expect(code).not.toContain("pivotprime.ae>");
    });

    it(`${name} takes its sender from the shared module`, () => {
      expect(src).toMatch(/import\s*\{[^}]*\bFROM\b[^}]*\}\s*from\s*"@\/lib\/email"/);
      expect(src).toMatch(/from:\s*FROM/);
    });

    it(`${name} sends to the shared inbox rather than a literal`, () => {
      expect(src).toMatch(/import\s*\{[^}]*\bTO\b[^}]*\}\s*from\s*"@\/lib\/email"/);
      expect(TO).toBe("hello@pivotprime.ae");
    });
  }
});
