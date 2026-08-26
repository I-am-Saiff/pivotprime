<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- project rules, outside the block next dev regenerates -->

## Reveal-on-scroll

Use `useRevealOnScroll` or `useSequentialReveal` from `src/lib/use-reveal-on-scroll.ts`.
Do not write a new `useState(false)` plus `IntersectionObserver`.

Both start **revealed** and un-reveal only when the element is below the fold and
motion is allowed. The naive version has a defect that is invisible in a browser
and obvious to a crawler: whatever the flag hides is hidden in the
server-rendered HTML and stays hidden without JavaScript. `CountUp` shipped every
result figure on the homepage as the string `0` for exactly this reason.

Treat any new `useState(false)` guarding visible content as a defect. The React
lint rule about calling setState synchronously inside an effect will also reject
the naive shape, so extend the primitive rather than working around the rule.

Guarded by `npm run check:content`, which asserts the copy is in the raw HTML
with JavaScript off.

## Commit messages state what was observed

Not what was intended. If a message says a component is shared, every consumer
has been checked. If it says a check passes, the check has been run against the
build being committed. If verification has not happened yet, the message says so
in those words.

This is a rule because it has been broken three times on this branch, each time
converting an unverified claim into a verified-looking one:

- "Verified at 360" when the viewport measured was 369, so the narrowest width
  was never tested and a 9px overflow survived several rounds of checking.
- A forbidden assertion matching `"We have sat in the system"` while the page
  rendered the contraction `"We've"`, so it passed while the section was still
  there and duplicated.
- "The grid is extracted to a shared component ... two implementations would
  drift" while `/services` had never been wired to it, so both implementations
  were sitting in the tree, described as consolidated.

A wrong claim in a commit message is worse than no claim, because it stops the
next person looking.

**Before claiming consolidation**, grep for every consumer. `npm run check`
covers heading structure and served copy, but nothing automatically verifies that
a shared module is the only source.

## The first output of a new measurement is not evidence yet

Run it, then check what it says against something you already know. A new tool is
as capable of being wrong as the thing it replaced, and it is more persuasive
because it looks objective.

This has happened four times on this branch, and the fourth is the instructive
one, because the tool built to solve the problem reproduced it:

- "Verified at 360" while the viewport measured 369.
- A forbidden assertion matching `"We have sat in the system"` where the page
  rendered the contraction, so it passed while the section was still there.
- A commit describing a component as shared while one consumer was never wired.
- `audit-spec-copy.mjs`, built specifically to stop hand-typed needles producing
  false results, reported 92 missing copy blocks on its first run. The real
  figure was 53. It was comparing pandoc's bullet prefixes and `{.mark}` spans
  literally. Then, once fixed, it reported 11 more that were also not defects:
  eight were its own artefacts and three were deliberate.

Before reporting a number a tool produced, find one case in it you can verify by
hand. If that case is wrong, the number is wrong.

## A gated or deviated decision is not done until the client can see it

The four rules above are all about claiming more than you observed. This one is
the opposite failure: doing the work correctly and leaving no trace of it where
the client looks.

Anything gated behind a flag, deferred to a later phase, or built differently
from the spec needs an entry in `docs/PENDING-COPY.md`, written in the client's
language rather than ours. The code change is not finished until that entry
exists.

Spec 3.11 gives the homepage close a supporting sentence promising a scored
result in four minutes. It is correctly gated, because the contact page cannot
honour that promise while the diagnostic is off. It was recorded nowhere the
client would look, so she would have opened her own close section, found the
standfirst missing, and read it as carelessness rather than as a decision.

`scripts/audit-spec-copy.mjs` holds the gated list in code. Every entry there
carries a `tracked:` field naming its `PENDING-COPY` entry, and the two are
cross-checked. That cross-check has now caught two omissions in the record on
work the code was handling correctly.

## Content files with a spec section are generated, not typed

If `docs/spec.md` has a section for it, generate the content file from that
section rather than transcribing it. `src/content/services-detail.ts` shows the
shape: the 4.1 blocks were produced programmatically from the document, so the
strings in the repository are the document's own text.

Every case in `docs/PENDING-COPY.md` section 1c came from hand entry. Ten
sentences were tightened or reordered by whoever typed them, including one that
reduced a named and priced service to a common noun. None of it looked wrong on
the page, which is what makes it expensive.

The existing hand-entered files are covered by `npm run audit:copy` and are not
worth migrating now. This applies to anything new.

### The mechanism for the rule above

An instruction is not enough on its own. `scripts/check-content.mjs` holds a
`DECISIONS` list: each entry states a decision in one line, names its
`docs/PENDING-COPY.md` reference, and runs a check that fails when the decision
stops being true. A failure reads as "this decision was undone", not "this string
is missing".

The list exists because `/privacy` lost its `noindex` during an unrelated
refactor and nothing noticed. When you make a decision that lives only as a code
detail, add it there as well as to `PENDING-COPY`, and prove the check by
breaking the thing on purpose and watching it fail.

**And check output, never source.** A `grep` of `src/` cannot see an HTML entity.
Two entries on the live-site-only list were wrong because they were cleared by
searching source: the spec 2.5 "SME's" typo was in the repo as `SME&apos;s`, and
a heading recorded as absent everywhere was present on another page. Anything
cleared by searching source rather than served output is unconfirmed.

## Anything conditionally rendered must still exist in the served HTML

If it renders only while open, active, hovered or scrolled into view, render it
always and hide it with the `hidden` attribute or CSS. `useState(false)` around
markup is the shape to avoid.

This pattern has now cost, in order:

- every result figure on the homepage, served as `0`
- `FadeUp` content, served invisible
- two thirds of the fractional page, behind a tab
- both captions of the before-and-after process map
- **a whole page.** The navigation dropdown rendered only while open, so
  `/services/how-we-work` was linked from nowhere at all. It resolved, its copy
  was complete, its metadata was correct, and every check passed on it. The five
  other service pages were reachable only because the homepage cards happen to
  link them.

Guarded by `npm run check:links`, which walks the site from the homepage and
fails when a route in the sitemap is linked from no other page.


## Redirect changes are verified by request, not by inspection

Adding a redirect without checking for an existing rule in the opposite direction
is its own failure mode, and reading the diff will not show it.

`/services/fractional-leadership` already redirected to `/services/fractional-coo`,
because spec 2.1 and 4.2 disagree about the slug and we had picked one. When slide
13 settled it the other way, adding `coo -> leadership` left both rules in place.
The new canonical route answered **308 to the old one**. The diff looked correct:
one rule added, pointing the right way.

It surfaced on the first `curl` of the page. So after any change to
`next.config.ts` redirects, request both ends:

```
curl -s -o /dev/null -w "%{http_code} %{redirect_url}" <new-canonical>   # expect 200
curl -s -o /dev/null -w "%{http_code} %{redirect_url}" <old-path>        # expect 308 to the new one
```

`check-content` holds the redirect list in `DECISIONS` and asserts each pair still
resolves. When a direction flips, that list flips with it, or it goes on asserting
the old world and passing.


## Her mockups are a source of copy, and the check runs both ways

`req/*.html` are the client's own designs and they carry finished wording, not
just layout. For a long time the reverse audit traced rendered copy to the spec,
to the live site, or to `sanctioned-copy.json`, and nothing else, so anything
taken from a mockup came back as "we invented this". Eleven of twenty-nine lines
in the authored list were hers, and the client-facing file was about to ask her
to approve her own writing.

`check-unsanctioned-copy.mjs` now reads them as a fourth source. Two details
matter and both were found by testing rather than by reasoning:

- Inline tags are transparent. Both the mockup and the page colour half a
  heading with a `<span>`, so splitting on every tag cuts "Heavy at the start.
  Light by the end." in two and the whole heading matches nothing.
- Runs are matched individually, never joined. A joined haystack sanctioned "We
  understand human behaviour" across two unrelated neighbouring cells.

**That check cannot catch the opposite error.** Copy already deleted renders
nowhere, so it is not in the set being inspected. Three headings were recorded in
`PENDING-COPY` 1f as "copy we had written to fill gaps" and retired. All three
were in her service mockup and had been since 13 August. We deleted the client's
copy believing it was ours.

So `npm run check:dropped` walks her mockups and reports headings and buttons the
site renders nowhere. It **reports and does not fail**: a mockup is a design, not
a contract, and it carries superseded drafts and alternatives. Anything
deliberate goes in `KNOWN_ABSENT` with the later instruction that supersedes it,
by file where a whole mockup is superseded. It is not in `npm run check` for that
reason — a reporting tool wired into a gate becomes a tool people silence.

It earned its place on the first run: it found five of her case study headlines
missing, including on two studies built from that same file an hour earlier.
