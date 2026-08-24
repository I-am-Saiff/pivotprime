# Client revisions, 22 August 2026 — audit

Audit only. No code was written in this pass.

## Sources, and what is actually authoritative

| File | What it is | Weight |
|---|---|---|
| `Website Revisions - 2208v1.pptx` | 8 slides, **every one an image**. No text frames, no speaker notes. The alt text pandoc extracted is AI-generated description, not the client's words | Direction only. Nothing in it can be quoted as copy |
| `pivot-prime-kpi-cards_3.html` | Working mockup, 5 KPI cards | Authoritative for structure and colour. **Not** for copy |
| `pp-services_11.html` | Working mockup, 5 service cards | Same |
| `WEBSITE PHOTO.jpg` | 4099x6149 portrait | Asset, drop-in |

**Slides 2, 4, 5, 7 are screenshots of our current site**, marked up.

> ### Slide 7 does not re-approve "BOOK CONSULTATION"
>
> Slide 7 shows the nav reading `BOOK CONSULTATION` and the founder panel reading
> `PORTRAIT COMING SOON`. **Both are states we had already changed before the deck
> arrived.** The screenshot records what Iram was looking at when she wrote her
> notes; it is not an instruction to keep what is in it.
>
> `BOOK CONSULTATION` is the wording spec 2.2 line 226 asks to be removed, and it
> was reverted to `Talk to us` in commit `73ff411`. The portrait placeholder is
> closed by her own new file. **Nobody should read this deck as re-approving that
> nav label.** If Iram does want it back, that is a change to spec 2.2 and needs
> saying in words, not inferring from a screenshot of a bug she was reporting.

---

## Your four, confirmed or corrected

### 1. KPI cards replace ResultsGraphic — **CONFIRMED, with a copy conflict attached**

Structurally you are right, and the served-HTML defect does close with it. All five
figures are in the mockup's static HTML:

```
>+7<  >40–60<  >+13<  >+27<  >67<     all present, none JS-injected
```

One `<script>`, one `createElement`, and it builds a decorative 20-dot retention grid.
No text is injected. That is a real fix for the defect where `ResultsGraphic` rotates
one metric every 3s and serves only the first.

**But the figures are not the spec's.** Spec 3.3 is a green block, verbatim by section 1:

| Spec 3.3 | Mockup | |
|---|---|---|
| 53% | **+7%** | changed |
| 62% | **40–60%** | changed, and now a range |
| 16% | **+13%** | changed |
| 27% | +27% | same |
| 67% | 67% | same |

Three of five results claims have moved. Labels moved too: "Reduction in duplicated
work, rework and inefficiency" → "Less duplicated work, rework & waste"; "Increase in
profit" → "Increase in profit **margin**". **CONFLICT.** These are commercial claims in
a verbatim block. Not ours to reconcile.

### 2. Palette expands to ten — **CONFIRMED exactly**

Slide 3's swatch reads, and I transcribed it from the image rather than trusting the
alt text:

```
row 1   #013325  #00d76d  #009f50  #000000  #ffffff     ← identical to our tokens
row 2   #fefbf8  #e8f4ec  #e8d7b5  #9f7a3d  #efeae0     ← the five you listed
```

Your five match the swatch character for character, and the top row matches
`globals.css` exactly. No existing colour is being redefined.

**Off-swatch hexes: eleven, not four.** You said "including", so this is the rest.
Mapped by perceptual distance, with the declaration each sits in:

| Hex | Nearest token | Δ | Used as | Verdict |
|---|---|---|---|---|
| `#fef9eb` | shell `#fefbf8` | 19 | heading, CTA on gold card | map |
| `#023d28` | forest `#013325` | 21 | body text | map |
| `#012a1d` | forest `#013325` | 23 | heading, CTA | map |
| `#014d2f` | forest `#013325` | 55 | price | map |
| `#c8f0da` | mist `#e8f4ec` | 61 | price on dark | REVIEW |
| `#007d40` | mid `#009f50` | 73 | card background | REVIEW |
| `#c49040` | bronze `#9f7a3d` | 75 | KPI chart stroke + label | REVIEW |
| `#b8d9c6` | sand `#e8d7b5` | 84 | body on dark | REVIEW — nearest is a *sand*, this is a *green*. Wrong hue family |
| `#3a3510` | forest `#013325` | 90 | "dark olive gold" card bg | REVIEW — nearest is green, this is olive |
| `#3d5244` | forest `#013325` | 119 | body text | REVIEW |
| `#c8af50` | bronze `#9f7a3d` | 129 | price, badge stroke | **CANNOT MAP** |

`#c8af50` and `#3a3510` are a gold/olive pair with no counterpart on the swatch. Four
more are nearest-to a token of a different hue family, which means the number is
misleading. **Logged, not mapped silently, as instructed.** Six of the eleven need
Iram to say whether they are a new pair or a mistake.

### 3. Services cards show full body copy — **CONFIRMED structurally, CONFLICT on the copy**

The mockup has no `Read more`, no `line-clamp`, no `<details>`, no `aria-expanded`.
Full body, always visible. That is the right shape.

One correction to the premise: **our current truncation is presentational, not
structural.** `ServiceCards.tsx` uses CSS `line-clamp` (3 occurrences), so the full
sentence *is* in the served HTML today — `Most engagements start here` is present on
`/services`. The crawler sees everything. The reader sees a cut-off sentence. Bad, but
not the served-HTML defect class.

**The mockup's card copy does not match the spec.** Twelve lines are not in
`docs/spec.md` in any form, including all five body paragraphs and two CTA labels:

| Spec | Mockup |
|---|---|
| "…margin leakage, and where technology genuinely helps. You get a prioritised roadmap of what to fix and in what order. Most engagements start here." | "…margin leaks and the decisions that slow everything down." *(two sentences dropped)* |
| "See what tech we can build" | "See what we build" |
| "What market entry includes" | "How market entry works" |

**CONFLICT.** Wiring the mockup's text would overwrite verbatim green-block copy —
the exact defect `PENDING-COPY 1c` was opened for. The layout can be taken; the words
cannot, without Iram saying she rewrote them deliberately.

### 4. Portrait superseded — **CONFIRMED, clean**

`WEBSITE PHOTO.jpg` is 4099x6149, against the current 1066x1600. At 552 CSS px on
desktop that is comfortably past 2x, so the resolution note in `PENDING-COPY 1.9`
closes. Same subject, same seated framing, so `object-top` carries over unchanged.
No conflict. **REPLACE.**

---

## The two things you asked me to check specifically

### Does conditionally-rendered content still exist in the served HTML?

**Yes, everywhere I checked, with JavaScript off.**

- All ten spec 3.5 patterns: present, 1 occurrence each.
- Service card bodies behind the clamp: present.
- Nav dropdown panels: present (asserted since `c69617d`).

The patterns mockup keeps all ten visible simultaneously and adds a
Critical/Structural/Operational severity tier, so it does not regress this.

### Do the mockups reintroduce copy the reverse audit flagged?

**Not in the two HTML files — zero matches against the 44 `awaiting-client` entries.**

That result is narrower than it sounds, and I would rather say so: the deck is images,
so no automated cross-check can read it. Reading slide 5 by eye, the patterns panel
carries `SELECT THE SYMPTOMS THAT SOUND FAMILIAR`, `Discuss Your Fix →` and the three
tier labels. None are in the spec.

---

## A hole in our own reverse audit, found while doing this

`check-unsanctioned-copy.mjs` reported "clean" on a homepage carrying
`Discuss Your Fix →`, which is in neither `docs/spec.md` nor
`scripts/sanctioned-copy.json`.

The cause is mine. It does `html.split(/<\/header>/i).pop()` to skip the site header
before collecting links and buttons. `<header>` is a valid sectioning element and this
page contains **three**, so it takes everything after the *last* one and discards the
rest of the page:

```
links   in full page: 48   seen by the checker: 17   DROPPED: 31
buttons in full page: 39   seen by the checker:  8   DROPPED: 31
```

**FIXED, and it was worse than reported above.** The site header is a `<nav>`, not a
`<header>`, so the slice never excluded the site header at all: it only threw away
page content. The collector now loads each route in Chrome with **JavaScript off**,
the same served HTML the other checks read, and removes the header and footer nodes
by `data-site-header` / `data-site-footer`. No offset arithmetic anywhere. It also
crawls rather than reading the sitemap, which had silently skipped `/privacy`, a
route deliberately kept out of the sitemap because it carries `noindex`.

Corrected numbers, 16 routes:

| | distinct items | trace to spec | trace to allowlist | **unsanctioned** |
|---|---|---|---|---|
| chrome excluded | 168 | 67 | 95 | **6** |
| whole document | 179 | 76 | 97 | **6** |

The previously reported "53 traced, 44 awaiting" described the contents of the
allowlist file, not anything verified. **The real finding is 6 unsanctioned, where it
had reported 0.** All six were invisible to the broken version, and all six come from
the merged commits rather than from this round: `Book a Consultation`,
`Discuss Your Fix →`, `Talk to our team→`, and three `ResultsGraphic` segment labels.

Worth noting for a later decision: including the header and footer costs nothing.
The same six fail either way, and it covers eleven more items. Excluding chrome is
what was asked for and is what ships; there is no evidence it is the better default.

**Sweep of the rest of the suite: no other script has this fault.** Every
`split`/`slice`/`indexOf` elsewhere is on a URL, a filesystem path, or display
truncation. `check-content` and `check-links` match against the whole document and
limit to no region.

**62 of 87 calls to action on the homepage, 71%, are invisible to it** — including
every pattern chip. So "53 traced, 44 awaiting" is understated by an unknown margin,
and the check that was built to close a one-directional gap shipped with a hole of its
own. Headings are unaffected; they match against the full document.

This needs fixing before any of the work below, or the round lands unaudited.

---

## Change list

| # | Change | Component | Tag |
|---|---|---|---|
| 1 | Five KPI cards, all metrics simultaneous | `ResultsGraphic.tsx` → new component | **REPLACE** |
| 2 | Retires the 3s rotation and its served-HTML defect | `ResultsGraphic.tsx` | **REPLACE** |
| 3 | Metric figures 53→+7, 62→40–60, 16→+13 | `content/homepage.ts` `METRICS` | **CONFLICT** vs spec 3.3 |
| 4 | Metric labels reworded | `content/homepage.ts` | **CONFLICT** vs spec 3.3 |
| 5 | Before/after sub-visuals per card (dot grid, KYC 10→3 days) | new | **NEW** |
| 6 | Five palette tokens | `globals.css` `@theme` | **NEW** |
| 7 | Ten-value palette enforced | `scripts/lint-palette.mjs` | **REPLACE** |
| 8 | Eleven off-swatch hexes, six unmappable or wrong-hue | both mockups | **CONFLICT** |
| 9 | Service cards full body, no truncation | `ServiceCards.tsx` | **REPLACE** |
| 10 | Service card body copy rewritten | `content/services.ts` | **CONFLICT** vs spec 4.x |
| 11 | Two service CTA labels rewritten | `content/cta.ts` | **CONFLICT** vs spec |
| 12 | Portrait at 4099x6149 | `public/`, `FOUNDER.portrait` | **REPLACE** |
| 13 | Pattern severity tiers | `PatternsList.tsx` | **NEW** |
| 14 | Pattern panel copy, not in spec | `content/homepage.ts` | **NEW**, unsanctioned |
| 15 | 3 em dashes, 2 en dashes in the KPI mockup | copy linter would reject | **CONFLICT** vs spec §1 |
| 16 | `check-unsanctioned-copy.mjs` drops 71% of homepage CTAs | `scripts/` | **FIX FIRST** |

## What needs Iram, not us

1. The three changed result figures, and whether the labels moved deliberately.
2. The rewritten service card bodies and the two CTA labels.
3. `#c8af50` and `#3a3510`: new sanctioned pair, or an error?
4. The four wrong-hue near-matches.
5. The em and en dashes: her own house rule bans the em dash.

---
---

# Client revisions, 23 August 2026 — audit

Audit only. No code was written in this pass. Appended rather than filed
separately, so the round reads as one thing.

## The batch

Six files touched 22:53–22:58. **Three are byte-identical re-copies** of the 22
August batch, verified by checksum: `Website Revisions - 2208v1.pptx`,
`pivot-prime-kpi-cards_3.html`, `pp-services_11.html`. Only their timestamps moved.

Genuinely new: `Website Revisions - 2208v3.pptx` (22 slides, 47 images, **2 text
runs, no speaker notes** — again almost entirely pictures), `pp-about-v2_2.html`,
`JUSTIN PHOTO.jpg` (1280x1600).

Slides 1–8 of v3 repeat v1. Slides 9–22 are page-level redesign, confirmed.

> ### JUSTIN PHOTO.jpg — received and parked
> Not wired in, nothing built around it, no slot created. It belongs to the team
> page, which is in CONFLICT below and is not being built.

> ### No PDFs, no logo file
> There is no PDF anywhere in the working folder and no logo asset in the batch.
> Logo direction and a background-colour instruction were expected and **neither
> arrived as an asset**. Where a slide implies one, it is tagged below as an
> instruction without an asset. Nothing has been inferred.

---

## The finding that governs everything else

**It is not in this batch. It is in spec v1.7.1, and it applies to the figures
already live.**

Spec section 3.3, immediately under the five metric blocks:

> *IRAM TO CONFIRM the five ranges above against the master table in Section 9
> before they go live. The current site publishes two different figures for
> reduction in operational waste, and both cannot be right.*

And the governing rule, spec section 1:

> - Any result figure or percentage must come from the master table in Section 9
>   and nowhere else.

Section 9 is **not a list of approved figures**. It is a table of contradictions
for Iram to resolve, one figure per row. Checking what the site publishes today
against it:

| Live now (spec 3.3) | Master table says | |
|---|---|---|
| 53% faster execution | 30 to 50% | **outside** |
| 62% waste reduction | 40 to 60% *or* 10 to 40% — row marked "Direct contradiction. Must be reconciled before launch" | **outside both** |
| 16% retention | 10 to 15% band, 13% in case study 3 | **outside** |
| 27% profit | 17%, or 13% projected | **outside** |
| 67% transaction processing | 67% | matches |

**Four of the five figures on the homepage today are outside the table that
governs them, and spec 3.3 says none of the five is cleared to go live.**

This changes the build instruction. Rebuilding the KPI cards with "the existing
spec 3.3 figures" ships four numbers the document itself has not approved. The
layout can be built; the figures cannot come from either source without her.

For completeness, the v3 mockup's figures are closer to the master table on one
row and further on two:

| v3 mockup | vs master table |
|---|---|
| +7% execution | **not in the table at all** (30–50%) |
| 40–60% waste | matches the homepage row, which is the contested one |
| +13% retention | **matches** case study 3 |
| +27% profit margin | **not in the table** (17% / 13%) |
| 67% | matches |

---

## The fees chapter, slide 10 — one correction and one hard conflict

**Correction: there is no AED anywhere on slide 10.** Both redesign variants quote
the worked example in dollars throughout, and the arithmetic is internally
consistent: target $400,000, fee 20% of savings delivered, you keep $320,000, we
earn $80,000. Nothing is mixed within the example.

The currency problem is real but sits one level up: the services cards price the
audit **"From AED 15,000"** while the fees chapter works its example in **dollars**.
Same page set, two currencies, no stated rate.

**The harder conflict is the pricing rule.** Spec section 1:

> - One price only appears on the site: the Operational Clarity Audit floor. No
>   other figure and no upper limit appears anywhere.

The fees chapter as drawn publishes **four more figures**: $400,000, 20%, $320,000,
$80,000. That breaks the rule as written, regardless of whether Iram confirms the
numbers. She has to either amend the rule or drop the worked example. **This is not
a numbers question she can answer with a figure; it is a policy question.**

The commitment wording — "If we haven't moved your numbers, most of our fee doesn't
get paid" — is new copy with no spec block behind it. Spec 3.10 as written carries
"We are paid partly on whether the numbers move." The new line is a stronger claim.

---

## Every figure, name and claim needing Iram — the single list

**Fees, slide 10**
1. The worked example figures: $400,000 target, 20%, $320,000 kept, $80,000 earned.
2. Whether the pricing rule changes to permit them, or the example is dropped.
3. AED for the audit price versus dollars for the fee example.
4. "most of our fee doesn't get paid" — a stronger claim than spec 3.10.

**Result figures**
5. The five in spec 3.3, none cleared: 53, 62, 16, 27, 67.
6. The five in the v3 mockup: +7, 40–60, +13, +27, 67.
7. Section 9 row by row, especially operational waste, marked in her own document
   as needing reconciliation before launch.

**About page, new case studies.** Three clients that appear in no spec section —
Professional Services UAE, Retail & Consumer Gulf, Technology & SaaS MENA — with
figures in none of the master table: +22% gross margin, 40% less non-billable
admin, 31% markdown reduction, +38% pipeline conversion, −19 days sales cycle.
Plus, in existing case studies: 25% operational waste, 2–3 FTE roles removed,
90 days to launch.

**A changed credential.** The site says Iram's book was worth **more than $120
million**. The About mockup says **over $100 million**. One is wrong and it is a
factual claim about a named person. The mockup also adds "Fellow of the Institute
and Faculty of Actuaries", which appears nowhere in the spec.

**Named people.** Justin Ford (Finance Seat, Fractional CFO), Saif Ur Rehman
(Technology Seat), Khushi Popat (Content & Social Seat), each with a title, a bio
and a seat tag. None are in the spec. Nothing built.

**The bench.** Twenty capability labels, no spec source.

---

## Colours

**Four more off-swatch values in the About mockup**, none on her ten-value swatch:

| Hex | Role | Nearest token | Δ | |
|---|---|---|---|---|
| `#f5f5f3` | `--paper`, the page background | shell `#fefbf8` | 21 | map |
| `#dde6e0` | `--line`, borders | linen `#efeae0` | 32 | map |
| `#0a1a12` | `--ink`, body text | forest `#013325` | 61 | REVIEW |
| `#4a6657` | `--muted`, secondary text | bronze `#9f7a3d` | 145 | **CANNOT MAP** — a desaturated green whose nearest token is a gold |

**Fifteen off-swatch values across the three mockups now.** No eleventh token has
been added. `#f5f5f3` as `--paper` is a **page background change** and is the closest
thing in the batch to the background instruction that was expected — but it arrives
as a CSS variable in a mockup, not as an instruction, and it is not on the swatch.
Flagged, not applied.

---

## Change list

| # | Item | Slide | Component | Tag | Launch |
|---|---|---|---|---|---|
| 17 | Fees chapter, worked example | 10 | new | **CONFLICT** — breaks the pricing rule | **BLOCKS** |
| 18 | Fees chapter, layout and commitment panel | 10 | new | NEW | CAN FOLLOW |
| 19 | KPI cards, layout only | 8 | `ResultsGraphic.tsx` | REPLACE | **BLOCKS** |
| 20 | KPI figures, either source | 8 | `content/homepage.ts` | **CONFLICT** vs spec 9 | **BLOCKS** |
| 21 | About page redesign, structure | 21–22 | `app/about/page.tsx` | REPLACE | CAN FOLLOW |
| 22 | About, three new case studies | 21–22 | `content/case-studies.ts` | **CONFLICT** | CAN FOLLOW |
| 23 | Iram's book: $120M vs $100M | 21–22 | `content/homepage.ts` | **CONFLICT** | **BLOCKS** |
| 24 | Team page, three named people | 21–22 | `content/team.ts` | **CONFLICT** | CAN FOLLOW |
| 25 | Bench, twenty labels | 21–22 | new | NEW, unsourced | CAN FOLLOW |
| 26 | Four persona pages redesigned | 12–19 | four page files | REPLACE | CAN FOLLOW |
| 27 | Services dropdown redesign | 11 | `Navbar.tsx` | REPLACE | CAN FOLLOW |
| 28 | As-it-runs-today process map | 13 | `Service1ClarityAudit.tsx` | NEW | CAN FOLLOW |
| 29 | Fractional leadership page, seats diagram | 14–15 | `Service2FractionalLeadership.tsx` | REPLACE | CAN FOLLOW |
| 30 | Technology Builds redesign | 16 | `Service4TechBuilds.tsx` | REPLACE | CAN FOLLOW |
| 31 | UAE Market Entry redesign | 17 | `Service5MarketEntry.tsx` | REPLACE | CAN FOLLOW |
| 32 | How We Work redesign | 18 | `services/how-we-work` | REPLACE | CAN FOLLOW |
| 33 | Four off-swatch colours | 21–22 | `globals.css` | **CONFLICT** | CAN FOLLOW |
| 34 | Page background `#f5f5f3` | 21–22 | `globals.css` | NEW, off-swatch | CAN FOLLOW |
| 35 | Logo direction | — | nav, footer, favicon, OG | **instruction without an asset** | **BLOCKS if wanted** |
| 36 | Justin photo | — | none | received, parked | CAN FOLLOW |


---

## Decisions taken 23 August, written down so they are not re-litigated

### The fees chapter is not being built. Not even the layout.

The layout exists only to display four figures the pricing rule forbids, so
building it would produce a component with nothing it is allowed to show. It is
not blocked on the numbers.

**The choice in front of Iram is not "are these the right figures". It is:**

> Spec section 1 permits **exactly one price on the entire site**: the
> Operational Clarity Audit floor. *"No other figure and no upper limit appears
> anywhere."*
>
> The fees chapter publishes four more: a $400,000 target, a 20% fee, $320,000
> kept and $80,000 earned.
>
> **Either the rule changes, or the worked example goes.** Confirming the numbers
> does not resolve it, because the rule bars them whatever they are.

Two smaller things ride on the same answer: the audit is priced in **AED** while
the fee example is worked in **dollars**, in the same page set with no stated
rate; and the new line *"If we haven't moved your numbers, most of our fee
doesn't get paid"* is a stronger claim than spec 3.10's *"We are paid partly on
whether the numbers move."*

### The KPI cards are built. The figures are not.

`ResultsGraphic` is gone. Five cards render at once as a server component, so the
served-HTML defect closes with it: 62%, 16% and 27% were previously absent from
the HTML entirely. The approved labels and context render verbatim; every figure
slot is empty.

Card 6 still does not render, which is a different case and now a named one.
`Metric.pending` distinguishes `"client-confirmation"` (a number exists but is not
cleared, so the card renders with an empty slot) from `"not-yet-supplied"` (nobody
has the number, so spec 3.4 says do not launch the card). The two used to be a
single `null` and lead to opposite behaviour.

Guarded by a `DECISIONS` entry in `check-content.mjs` that fails if any of the
five appears in the served HTML, and also fails if the copy disappears with them.
Proved by putting 53 back and watching it fail.

### PHASE TWO — cut from this launch, by decision, not by oversight

Everything in the CAN FOLLOW column above is **out of scope for the current
launch**. Recorded here so the boundary is written down rather than assumed:

- the four persona pages (slides 12–19)
- the services dropdown redesign (slide 11)
- the as-it-runs-today process map (slide 13)
- the fractional leadership page and seats diagram (slides 14–15)
- Technology Builds (slide 16)
- UAE Market Entry (slide 17)
- How We Work (slide 18)
- **the entire About redesign** (slides 21–22 and `pp-about-v2_2.html`), which
  carries with it the three named team members, the twenty bench labels, the
  three new case studies and the $120M/$100M discrepancy

The current pages ship as they are. Nothing above is abandoned; it is sequenced.

### Still blocking, and not ours to unblock

| | |
|---|---|
| The five result figures | with Iram, `docs/FOR-IRAM-results-figures.md` |
| The pricing rule versus the fees example | with Iram, policy not figures |
| Iram's book: $120M or $100M | with Iram, a factual claim about her |
| Logo | no asset exists anywhere in either batch |


---

## Delivered beyond the client's phase one — for the record

No action. Written down so the difference between what was asked for and what
exists is not discovered later.

**The client's own definition of phase one was a single long homepage** covering
pages 1 to 16 of the copy document. **Seventeen routes were built:**

```
/                              /about        /contact     /insights   /privacy
/services  + six service pages
/for-smes  /for-founders  /for-corporate-leaders  /for-pl-owners
```

Everything on them traces to the document, and the spec's own instructions ask
for several of them by URL, notably 4.4 requiring /services/technology-builds to
stand alone for paid traffic. So this is not invented scope. It is more scope
than the client scoped, and it has never been priced or signed off as such.

---

## Service components: closed by decision, not outstanding

`Service1ClarityAudit` was converted to a server component with the process map
as a client island. `Service2FractionalLeadership`, `Service3BuildPlace` and
`Service5MarketEntry` **stay as client components and that is the final answer**,
not an open item.

Two mechanical extractions produced broken JSX because those files interleave
computed data with markup, and each split is bespoke rather than scriptable. The
cost exceeded the benefit: this is a hydration cost, not a defect. All nine
service and audience pages serve their full copy, measured against raw HTML with
every toggle clicked open.

`src/components/Reveal.tsx` exists for any future case that is a plain fade
rather than an animation threaded through an SVG.
