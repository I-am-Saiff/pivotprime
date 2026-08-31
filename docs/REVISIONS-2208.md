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
| The five result figures | with Iram, `docs/FOR-IRAM-outstanding.md` |
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


---
---

# Client assets, 24 August 2026 — audit

Audit only. **Nothing was built and nothing was copied into the project.** The
files remain where they arrived.

## What came, and what each one is

| File | Type | Resolution |
|---|---|---|
| `KHUSHI POPAT PHOTO.jpg` | portrait | 1086 x 1448 |
| `Cinnacare Baby Oil Bottles.png` | product shot | 1536 x 1024 |
| `Cinnacare Socials.png` | social imagery | 3000 x 2000 |
| `Cinnacare PRIMARY LOGO V2 BG1.pdf` | vector logo | vector, 28 KB |
| `CBF8B271-9E5E-4AD4-95A7-236F3DB87DFC.jpg` | **Cinnacare imagery, not the machine** | 1177 x 1122 |
| `PHOTO-2026-04-07-02-18-16.jpg` | **the Scentmatic machine** | **808 x 540** |

### The two unnamed files, identified by looking at them

The brief said "the other one for Scentmatic which is the machine", implying one
unnamed file. There are two, and only one is the machine.

**`PHOTO-2026-04-07-02-18-16.jpg` is the machine.** A black free-standing unit on
a bar counter, screen showing a fragrance bottle and four priced options, branded
**"The Scentmatic Vendor®"** across the front with an SV monogram. Shot in a bar
with glassware and a spirits shelf behind it.

**`CBF8B271-...jpg` is not a machine.** It is a Cinnacare product photograph: an
infant on a pale green background surrounded by skincare ingredients, aloe,
apricot, pomegranate, cinnamon, rosemary, chamomile and beakers of oil. It
belongs with the other Cinnacare files.

**The Scentmatic photograph is the lowest-resolution file in the batch at 808 x
540.** Every other image is at least 1086 wide. Spec 8.1 asks for imagery that
"shows work, not stock" on a page built to carry paid traffic; at 808 wide this
fills roughly half a desktop content column before it starts to soften. **Worth
asking for the original.**

---

## Where the imagery is meant to go

### Scentmatic: a destination exists, but not for this asset

Spec section 8.1's asset table has a row for it:

| Asset | Where it goes | Notes |
|---|---|---|
| Go-to-market strategy, Scentmatic | Technology Builds 4.4, About case studies | *"Blur or remove client-identifying figures unless permission is confirmed."* |

So Scentmatic has a home. **But the asset the document asks for is a go-to-market
strategy document, and what arrived is a product photograph of the vending unit.**
Those are not the same thing, and the row's own note is about blurring figures in
a document, which a photograph of a machine does not have. The photograph may
still be wanted; it is simply not the thing 8.1 requests.

### Cinnacare: no destination anywhere

`Cinnacare` appears **once** in the entire document, in the open-decisions table:

> **Decision 1.** Which clients can be named on the site, and confirmation in
> writing from each. The referral deck already names Insurance Hub, Scentmatic,
> Cinnacare, Democrance, Nivishe, Care Studio and Birds of Paradise, so most of
> this may already be settled.

It is named as a candidate in an **unresolved decision**, not assigned to any
page. It appears in no asset table, in no case study, and nowhere in the 22 or 23
August decks or the About mockup, both of which are images and contain no text at
all.

**Neither name maps to any existing case study.** The six on the site are labelled
by sector: Financial Services, Founder-Led, Fitness and Wellness, Professional
Services, Retail and Consumer, Technology and SaaS. Nothing in any source says
which, if any, is Cinnacare or Scentmatic. Guessing that a baby-oil brand is the
retail story would be inventing a client attribution.

**Both go on the outstanding list, not into the build.**

---

## Naming clients is a decision, and the site is currently inconsistent

The About copy says **"Clients are anonymised."** Every case study on the site
follows that: sector labels, no names.

**But the homepage already names five clients in its logo strip**: Insurance Hub,
Stydio, Man Cave, Birds of Paradise Foundation and Nivishe.

So the policy in practice is **case studies anonymous, logo strip named**. That is
a coherent position, but it is not what the About page says, and nobody has
written it down. It matters here because the two options for this batch fall on
opposite sides of it:

- A Cinnacare **logo in the strip** is consistent with what the site already does.
- Cinnacare **product shots attached to a case study** names the client behind a
  specific story, which is the thing the About copy says does not happen.

Spec decision 1 is explicitly open, and its own wording, *"may already be
settled"*, is not settlement. **Nothing that names a client is being built until
she confirms in writing which clients may be named** — the same standard applied
to the testimonial quotes.

### Found while checking this: the logo strip has three problems

Four logos were carrying the placeholder description "Client logo" because they
could not be identified from their filenames. All four are now identified, by
looking at them:

| File | What it actually is |
|---|---|
| `clogo3a.jpg` | **Gallagher** |
| `Frame-17.jpg` | **Democrance** |
| `logo-text-block-2.jpg` | **not a logo.** A text panel reading "Companies we have delivered for" |
| `instagram.jpg` | **Women Who Thrive.** Not Instagram; the filename is wrong |

Three things follow, none of them urgent, none of them fixed here:

1. **Gallagher is one of Iram's former employers**, named as such in her own
   credential on the homepage and the About page. It is sitting in a strip of
   companies Pivot Prime has delivered for. If Gallagher is not a client, this
   implies a relationship that does not exist.
2. **A section heading is being displayed as a logo.** "Companies we have
   delivered for" is baked into an image and rendered as the first item in the
   carousel.
3. **Democrance and Women Who Thrive are named on the site already**, which adds
   two to the five above and makes the naming question more pressing rather than
   less.

---

## Khushi's photograph

**Stored, wired to nothing**, as instructed. 1086 x 1448, comfortably enough for
any avatar or card treatment.

It is blocked behind the same thing as the other two names: the team entries are
unconfirmed. Spec decision 2 notes that Saif and Reshma "have both been offered a
named position on the website in their proposals, so those two are effectively
agreed" and that Justin is a partner — but **Khushi is not mentioned in that
decision at all**, and the only source naming her is the About mockup, which is
unconfirmed. A photograph is not permission to publish a name, a job title and a
biography.

---

## Change list

| # | Item | Component | Tag | Launch |
|---|---|---|---|---|
| 37 | Khushi portrait | none, stored only | received, parked | CAN FOLLOW |
| 38 | Scentmatic machine photograph | Technology Builds 4.4 | **CONFLICT** — 8.1 asks for a strategy document, not a product shot; and 808 x 540 | CAN FOLLOW |
| 39 | Cinnacare logo, product and social imagery | none | **CONFLICT** — no destination in any source | CAN FOLLOW |
| 40 | Naming any client | case studies, logo strip | **CONFLICT** — spec decision 1 open; About says clients are anonymised | **BLOCKS if any client is to be named** |
| 41 | Gallagher in the client logo strip | `content/homepage.ts` | **CONFLICT** — former employer, not a known client | **BLOCKS** |
| 42 | "Companies we have delivered for" rendered as a logo | `content/homepage.ts` | defect | CAN FOLLOW |
| 43 | Four logo descriptions, now identified | `content/homepage.ts` | closes PENDING-COPY 1.14 once naming is settled | CAN FOLLOW |


---
---

# Client comments inside the decks, read 25 August

Audit only. No code in this pass.

## The miss

**Forty-four client comments have been sitting inside the two decks since 22
August and none of them was read.** Every audit we ran on those files read the
rendered slide images. PowerPoint comments are stored in a separate part of the
file and never appear in a rendering, so nothing we did could have surfaced them.

| File | Comment parts | **Comments** | Author | Read before today |
|---|---|---|---|---|
| `Website Revisions - 2208v1.pptx` | 5 | **7** | Iram Kauser | no |
| `Website Revisions - 2208v3.pptx` | 19 | **37** | Iram Kauser | no |

**v1's seven were missed as well**, which the brief did not anticipate. All seven
reappear inside v3, so nothing is lost, but the 22 August audit was written
without them too.

**`client-comments-2208v3.md` is not in the working folder.** The comments below
were extracted directly from the deck instead, which is the same source the file
would have been made from.

### Everything else checked, same method

| File | Comments |
|---|---|
| `pp-about-v2_2.html` | 13 HTML comments, all structural markers such as `NAV`, `HERO`, `TEAM`, plus "Replace src with Iram's photo URL" |
| `pp-services_11.html` | 10, all section markers. **One is informative**: the card is labelled "2 · Fractional Leadership", which independently corroborates slide 13 |
| `pivot-prime-kpi-cards_3.html` | 22, all structural markers inside the SVG |
| `PivotPrime_Website_Copy_Spec_v1_7_1.docx` | **0** |
| `PivotPrime_Website_Copy_Spec_v1_6_1.docx` | **0** |
| `PivotPrime_Constraint_Diagnostic_v1.docx` | **0** |

The specification documents carry no comments. Nothing else is hiding.

---

## 1. Comments that contradict decisions already shipped

**Six, and one of them reverses a ruling Saif gave.**

| # | Comment | Contradicts | Tag |
|---|---|---|---|
| C1 | **Slide 13:** "Drop down to be changed to **Fractional Leadership** instead of Fractional COO" | Saif's ruling that fixed the `fractional-coo` slug and nav label. The services mockup's own code comment also says "Fractional Leadership", so this is settled in her mind | **CONFLICT** |
| C2 | **Slide 1:** hero button "Change to Confirm you don't need our help, or don't think you need us, found out what we actually do" | Spec 3.1's button is "Find out what is holding your business back", which we restored eight days ago after it had been changed to "Book a Consultation" | **CONFLICT** |
| C3 | **Slide 1:** "Then text is only **we find out what is holding your business back**" | Spec 3.1's hero lead is a green block reading "Most consultants recommend the fix. We build it." | **CONFLICT** |
| C4 | **Slide 3:** "change wording to we do not measure success in slide decks, **we measure what has changed**" | Spec 3.3 green block reads "We measure what changed." One word | **CONFLICT**, trivial to apply, but it is a green block |
| C5 | **Slide 10:** "Eyebrow heading to just say **OUR FEES**" | We removed all five chapter eyebrows including "Chapter 04 — Fees" on Saif's instruction. She wants a labelled eyebrow back, worded differently | **CONFLICT**, partial |
| C6 | **Slide 18:** "Change the eyebrow heading to **FOR FOUNDERS**" | Same. We removed the persona chapter eyebrows | **CONFLICT**, partial |

**On C5 and C6 together with slide 9's "Shouldn't be chapter anything - only WHO
WE SERVE":** she does not want the eyebrows gone, she wants them to stop saying
"Chapter N". Our removal went one step further than she asked. Three of the five
should come back with new wording.

---

## 2. What these comments unblock

**Substantial. Several things on the outstanding list are now answered.**

| Cleared | By |
|---|---|
| **Iram's own testimonial quote** | Slide 8 supplies it verbatim, 63 words, ready to publish. It is HER quote about the team, not a client's, so it carries no third-party permission problem |
| **Case study 2 copy** | Slide 8 rewrites it in full: "The founder was approving every decision..." |
| **Case study 3 copy** | Slide 8 rewrites it in full: "Strong demand, loyal core, but churn was rising..." |
| **Cinnacare and Scentmatic destinations** | Slide 8: "The pictures to use for **each case study 1 and 2** I have shared separately to you in email." Both images now have a home, which the 24 August audit recorded as having none |
| **Corporate innovator quote location** | Slide 9: "put **Qatar** not Riyadh" |
| **Three P&L owner card titles and subtitles** | Slide 20 supplies all six strings verbatim |
| **Corporate innovator card 3** | Slide 19 supplies title, subtitle and side-box copy verbatim |
| **Market entry positioning** | Slide 16 supplies the replacement heading and subheading verbatim |

**Still NOT cleared by these comments:** the five result figures, the client
testimonial quotes for the named case studies, the $120m/$100m credential, the
fees pricing-rule decision, the logo asset, and the background colour. **The
single largest blocker, the section 9 figures, is untouched by all 44 comments.**

---

## 3. Structural, so they can be sequenced

Ordered by how much they move.

| # | Change | Component | Tag |
|---|---|---|---|
| S1 | **Remove the Chapter 01 section entirely** (slide 6, "Remove this section"): "Knowing what is wrong is hard", its four Diagnose/Align/Rebuild/Embed cards and the 40–60% badge | `app/page.tsx`, spec 3.6 | **CONFLICT** with spec 3.6, which is a NEW section in the document |
| S2 | **Hide or delete /services/how-we-work** (slide 17), keeping the text for later | whole route, nav, sitemap | **REPLACE** |
| S3 | **Move all three anonymised case studies to /about**, leaving a "more case studies" button on the homepage | `CaseStudies.tsx`, `/about` | **NEW** |
| S4 | **Reorder the persona pages**: stretched founder, SME, corporate innovator, then P&L owner | `PersonaSwitcher`, nav, four routes | **REPLACE** |
| S5 | **Rename "mid-market execution owner" to "P&L owner" everywhere**, homepage included | four routes, nav, content | **REPLACE** |
| S6 | **Strip the persona pages** to heading, subheading and the box only, deleting the rest. Founders first, then SME | four page files | **REPLACE**, large deletion |
| S7 | **Rename the dropdown to Fractional Leadership** | `navigation.ts`, and the slug question | **CONFLICT**, see C1 |
| S8 | **"What you get" shown on every service page, right side shaded** (slide 12) | five service components | **NEW** |
| S9 | **Video behind the hero** (slide 1) | `app/page.tsx` | **NEW**, asset not supplied |
| S10 | **At least one case study showing Saif's work** (slide 8) | `case-studies.ts` | **NEW**, needs Saif |
| S11 | **Technology Builds rebuilt by Saif** (slide 15): "Saif to put all his work or design this however he wants" | `Service4TechBuilds` | **NEW**, needs Saif |

### Cosmetic, low sequencing risk

Slide 1 top bar colour trial and "small rounding so its more rectangular"
(**ALREADY DONE**, 12px). Slide 2 "fix the logos part, looking cheap"
(**ALREADY DONE**, larger and higher contrast). Slide 2 alignment
(**ALREADY DONE**). Slide 3 different visual language per KPI. Slide 3 ivory
background instead of white. Slide 4 colour the cards differently. Slide 9
industries in caps and lighter green quote boxes. Slide 10 more writing, larger
quote boxes. Slide 11 match the homepage. Slide 14: remove "Watch the seats
fill", add Fractional COO, "Project Manager" capital M, "Software Engineer" not
"Engineer", remove the animation caption.

---

## 4. Still needs her, after all of this

1. **C1 vs Saif's ruling.** Fractional Leadership or Fractional COO, and if the
   label changes, does the URL change with it.
2. **C2's replacement hero button.** The text as written is not a sentence:
   "Confirm you don't need our help, or don't think you need us, found out what
   we actually do". It also replaces a green block. **We will not guess at this.**
3. **S1.** Spec 3.6 is a NEW section in her own document and the comment says
   remove it. One of the two is out of date.
4. **The ivory background** (slide 3) is an eleventh colour unless it is one of
   the ten already on the swatch.
5. **The video** for the hero, which does not exist.
6. **Which photo is case study 1 and which is case study 2.** She says the email
   says; the email is not in the working folder.
7. **The new services page animations** promised on slide 13, not yet sent.
8. **The section 9 figures**, still.

---

## Queued after the layout pass

Recorded 31 August, alongside the shared-layout responsive fixes. Nothing here
has been changed. These are copy and content items, out of scope for a layout
and spacing pass, and are queued for the page-by-page passes that follow.

1. **Homepage case study headings read "The Results" in title case, three
   instances.** Should be sentence case per the 30 August capitalisation
   instruction.
2. **Homepage P&L owner card uses "organizational".** The site is British
   English, so this should be "organisational".
3. **Fractional Leadership tab panels.** Confirm the Chief of Staff and CFO
   panels each carry their own "What the ... seat covers" heading, as the COO
   panel does.
4. **"Performance Linked Fees" heading is title case.** Confirm with Iram before
   changing, since she named that heading specifically on the call.
