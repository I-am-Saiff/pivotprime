# Pending copy and open decisions

---

## 0. Stage one scope and the diagnostic flag

Stage one ships the site itself. The diagnostic, its report, the email delivery
of that report and the database are a later phase.

### 0.1 The flag

`NEXT_PUBLIC_ENABLE_DIAGNOSTIC`, defined in `src/lib/flags.ts`, **defaults to
false**. While false:

- `/diagnostic` returns `notFound()`, so the route 404s
- the page declares `robots: { index: false, follow: false }`
- the route is excluded from `/sitemap.xml`
- neither the navigation nor the footer carries a diagnostic entry

It is `NEXT_PUBLIC_` because it is read in page modules evaluated during the
build and in client components, so it has to be inlined rather than read from the
server environment. That also means **flipping it requires a rebuild**, not just
a restart.

An unset or misspelt variable keeps the diagnostic off. The failure mode of a
typo is a hidden feature rather than an unfinished one exposed to the public.

### 0.2 Where the work is kept

**Nothing was reverted.** The diagnostic work stays in the tree, gated. The full
record is on **`feature/diagnostic-phase-2`**, branched from `3518f02`, which
carries:

- the deep instrument rebuilt to one domain per screen (spec 8.2)
- the corrected domain order and explicit tie-breaking
- stable, spec-derived statement ids and the twelve anchor ids
- the scoring, presentation and statement modules with 24 tests

Ongoing diagnostic work belongs on that branch, not on `revamp/spec-v1.7.1`.

### 0.3 What is not built yet

The instrument currently at `/diagnostic` is the **deep 42-statement version**.
The split into a public 12-question instrument at `/diagnostic` and an unlisted
deep one at `/diagnostic/deep` is later-phase work, so `/diagnostic/deep` does
not exist and 404s on its own account rather than by the flag.

### 0.4 The CTA substitution — **needs a decision, not blocking**

The spec makes the diagnostic the destination of the secondary CTA everywhere:
the hero, the homepage close, and the routing blocks on the service and persona
pages. With the diagnostic gated, those CTAs would lead to a 404.

For stage one they point at `/contact`. Both labels are the spec's own wording,
nothing is invented:

| Phase | Label | Destination | Spec source |
|---|---|---|---|
| Phase two | Take the 4-minute diagnostic | `/diagnostic` | 2.2, secondary CTA |
| **Stage one** | **Talk to us** | **`/contact`** | 2.2, header button |

Both live in `src/content/cta.ts` as `JOURNEY_CTA`, selected by the flag, so
every consumer follows automatically. Reverting is not an edit at all: turn the
flag on and the diagnostic label and destination come back.

**The judgement call, flagged rather than assumed.** The brief said to keep the
spec's secondary CTA wording. Read literally that would ship a button reading
"Take the 4-minute diagnostic" that lands on a contact form, promising an
instrument that does not exist and delivering a form instead. That is a worse
defect than the substitution it is meant to avoid, so the label moves with the
destination, using the spec's other CTA wording rather than new copy. Say if you
want the literal reading instead: it is one line in `cta.ts`.

### 0.6 One sentence gated on the homepage close

Spec 3.11 gives the close a supporting line: "Two ways to start. Take the
diagnostic and get a scored view of your biggest constraint in four minutes, or
message us and we will walk through it together."

**Not shown in stage one.** It names the instrument by duration and output, which
the contact page cannot honour, and the spec offers no stage-one alternative. The
heading and the two buttons carry the section without it. Nothing is owed by the
client and nothing needs writing: it appears exactly as written the moment the
diagnostic ships.

Found by cross-checking the audit's gated list against this document, which is
the point of keeping the two in step: the sentence was gated in code and recorded
nowhere Iram would see it.

### 0.5 WhatsApp

In scope for stage one and unchanged in intent. The floating button appears on
every page and each service page carries two inline WhatsApp CTAs, which were
already present rather than added.

The number now comes from `NEXT_PUBLIC_WHATSAPP_NUMBER` rather than being
hardcoded in eleven places. When it is unset, every WhatsApp CTA degrades to
`/contact` rather than producing a broken `wa.me` link, and the label falls back
from "Talk to us on WhatsApp" to "Talk to us" so it does not promise a channel
it cannot open.


---

Everything the build is waiting on, and every deviation logged rather than
silently taken. Nothing here blocks stage one.

Items marked **client** need Iram. Items marked **Saif** are ours. Items marked
**logged** are decided and recorded so they can be reversed cheaply.

---

## 1. Copy still with the client

Each of these lives in `src/content/` behind a `TODO(client)` marker and renders
as an empty block until the real text lands. No placeholder figures, no invented
client names.

| # | Item | Spec § | Owner | Blocks |
|---|---|---|---|---|
| 1.1 | Eighteen constraint commentary blocks: per domain, three to four sentences on what the constraint costs, three checks to run this week, and one recommendation paragraph | 7.2, deep 8.4 | client | Report email, both diagnostics |
| 1.2 | Homepage result card 6: a count of bespoke builds shipped, or manual hours removed per month | 3.3, 10 #4 | **Saif** | Homepage results band |
| 1.3 | Confirmation of result cards 4 and 5 against the master table | 3.3, 10 #4 | client | Homepage results band |
| 1.4 | Master results table sign-off. Operational waste is published as both "40 to 60% reduction" and "10 to 40% reduction". These cannot both be true and the spec calls it a direct contradiction | 9, 10 #5 | client | Homepage, About, case studies |
| 1.5 | **Confirmation**, not copy. Spec 3.10 gives the block in full; the instruction is "Iram to confirm final wording before this section goes live". The section is therefore built with the spec copy and needs sign-off before launch rather than before build. No percentage or formula is published | 3.10, 10 #3 | client | Launch, not build |
| 1.6 | Which team members appear, with photographs and one-line credentials | 6.3, 10 #2 | client | About team layer |
| 1.7 | Which clients may be named, confirmed in writing | 3.8, 10 #1 | client | Case studies, logo bar |
| 1.8 | Privacy policy legal sign-off by a UAE-qualified adviser | 2.7 | client | `/privacy`, both diagnostics, all three API routes |
| 1.9 | Founder portrait. **Delivered 22 August 2026 and live on the homepage.** A seated portrait, 1066x1600, at `public/iram-kauser.jpg`. Spec 8.1 asks for the Arabian Mirror frame at full resolution; this is a seated portrait and is not a crop from an article, but the file cannot confirm it is that frame at its original size, so this is closed as delivered rather than as verified. If a larger original exists, send it: at 1066px wide it is very slightly under twice the 552px it occupies on a desktop screen, which is the width a high-density display wants. **The two article URLs are no longer outstanding**: they were carried as hyperlinks in the docx and were only missing from my plain-text conversion. Both are now wired into the proof bar | 8.1, 10 #8 | — | Nothing. Shipped |
| 1.10 | CRM, dashboard and Scentmatic assets, client data blurred | 8.1, 10 #8 | **Saif** | Technology Builds |
| 1.11 | Homepage services card 6. **Copy recovered and written, not shipping.** "(TEXT AS PER CARD SHOWN)" points at a reference image in which the card is legible, so it was transcribed rather than invented, and lives in `src/content/services.ts` as `DIAGNOSTIC_CARD`. It does **not** appear in stage one: every line names the diagnostic by duration and output, so it is gated with `NEXT_PUBLIC_ENABLE_DIAGNOSTIC` and ships when the instrument does. Nothing is owed by the client here, and nothing further needs writing | 3.4 | — | Nothing. Ships with the diagnostic |
| 1.12 | RAKEZ activity scope confirmation for selling software as a standalone product | 10 #7 | client | Technology Builds going live |
| 1.15 | **An Open Graph share card**, 1200x630, carrying the logo and a short line. This is the image anyone sees when a Pivot Prime link is shared on LinkedIn or WhatsApp, which spec 4.5 names as the case that matters. Nothing in the project is a share card: the candidates are hero photographs and client logos, and a cropped photograph of water tells a reader nothing. No `og:image` is declared, so a shared link falls back to the title and description, which are correct. An unbranded default would be worse than none | 4.5 | client | Nothing renders wrongly, but shared links have no image |
| 1.14 | Alt text for four client logos. `logo-text-block-2`, `clogo3a`, `Frame-17` and `instagram` are unidentifiable from their filenames and currently carry a generic "Client logo". Spec 4.5 asks for descriptive alt text. Needed alongside the 10 #1 sign-off on which clients may be named | 4.5, 10 #1 | client | Nothing, the images render |
| 1.13 | The WhatsApp pre-fill message. Spec 2.2 says to point the header button "at WhatsApp with the homepage pre-fill" but never states the wording. Linking without pre-filled text until it arrives, which opens the chat empty rather than putting words in a prospect's mouth | 2.2 | client | Nothing, the CTA works without it |

---

## 1a. Sweep against the source document

Two items above were logged as missing when they were only missing from my
plain-text conversion of the spec. Every remaining item has now been re-checked
against the pandoc output and the 48 embedded reference images.

**Cleared, never actually owed:**

- The two article URLs (was part of 1.9). Carried as hyperlinks in the docx.
- Homepage services card 6 (1.11). Legible in the reference image the spec
  points at.

**Reclassified:**

- The contingent fee section (1.5). The copy exists in full; what is owed is
  sign-off before launch, not text before build.

**Confirmed genuinely outstanding.** Each carries an explicit instruction in the
document itself, so these are real: 1.1 and the deep questions ("IRAM TO WRITE"),
1.2 ("SAIF TO SUPPLY metric 6"), 1.3 ("IRAM TO CONFIRM the five ranges"), 1.4,
1.6, 1.7, 1.8, 1.9 portrait, 1.10, 1.12, 1.13, 1.14.

The document contains exactly two hyperlinks in total, both now used, so no
further link artefacts are hiding in it.

---

## 1ad. The fractional cost taper, updated to her 22 August revision — **for Iram**

**We were building the 13 August version.** `pivotprimeservicepages.html`, sent on
22 August and not processed until 26 August, revises this section and the site
had the earlier one.

| | 13 August, what we had | 22 August, what she sent |
|---|---|---|
| Bands | MONTH 1 / MONTH 3 / MONTH 6+ | Months 1–2 / Months 3–4 / Month 5+ |
| Shape | one curve with two lines | three phase cards |
| Lines | "Senior time required" and **"Your monthly cost"** | "Pivot Prime involvement" only |
| Detail | none | 8 to 10, then 3 to 5, then 1 to 2 days a month |
| Client side | absent | a "Your team" column at every phase |

**She removed the monthly cost line herself**, which agrees with section 1: one
price only appears on the site, the audit floor. Nothing needs deciding.

Built as static cards rather than her animated curve, so every word is in the
served HTML. The involvement bar is decorative and the day counts are in the
sentence, so nothing is carried by the bar alone. Her ordering is kept: on the
last card "Your team" comes first and Pivot Prime second, which is how her markup
signals the handover.

**One re-punctuation to tell her about.** Her phase 1 line reads "Primary
ownership — 8 to 10 days a month". Section 1 of her own document bans the em
dash from the site, so it is a colon here. Same class of change as the two
expanded contractions in 1f, and recorded for the same reason.

---

## 1ae. The fees section, rebuilt to her design without the figures — **for Iram**

**She sent a design and we did not have it.** `pp-fees_3.html` and
`pp-fees_4.html`, both 22 August, arrived in the same batch as the case studies
file and were not processed until 26 August. The section had been built prose-only
partly because no design existed. Two did.

**Neither is buildable as drawn**, and confirming the numbers would not help:

| | Publishes |
|---|---|
| `pp-fees_3` | $400,000, 20%, and the formula in words |
| `pp-fees_4` | $400,000, 20%, $320,000, $80,000, and the whole arithmetic |

> Section 1: "One price only appears on the site: the Operational Clarity Audit
> floor. No other figure and no upper limit appears anywhere."

> Section 3.10: "Do not publish a specific percentage or a formula here."

**So the layout is hers and the number boxes carry wording.** What is built:

- her eyebrow, kept as "Our fees" per her slide 10 comment
- her heading, "Most consultants charge whether it works or not."
- her traditional-versus-Pivot-Prime contrast from `_4`, with spec 3.10's own
  first block heading the traditional column, which is where it belongs
- her four model boxes reduced to two. "We agree a target" and "Our fee
  structure" survive with words in place of figures; "You keep" and "We earn"
  are dropped outright, because that pair exists only to show the split, which
  is the formula
- her commitment box, verbatim: *"If we haven't moved your numbers, most of our
  fee doesn't get paid."* It states the entire model with no figure in it
- her numbered sequence from `_3`
- the audit floor, AED 15,000, as the only figure on the section

**Nothing of hers was cut for length.** Every sentence in either file is either on
the page or is a figure the rules bar.

**Two changes to tell her about.**

Her H2 is now the section's spine heading, so spec 3.10's "Most consultants are
paid for the recommendation" moved from H2 to the H3 over the traditional column.
Both are her copy and both are still served; only which one is the page's
skeleton changed.

Four of her sentences here use an em dash, which section 1 bans from the site.
They are colons and commas. Same class of change as the two expanded contractions
in 1f. Her *"We do the work — inside your business, not from a slide deck"* is
split into a title and a line rather than carrying a dash.

**Still open, and unchanged by any of this:** whether the rule itself should
move. If she wants the worked example published, that is a change to section 1
and 3.10, not a change to this build. Section 2 of her outstanding file asks it.

---

## 1af. Three things logged rather than built — **for Iram**

Each of these is hers to settle. None is blocking and none should be decided here.

### The case study figures: a rule question, not a missing number

`pp-case-studies.html` and `pp-about-v2_2.html` **now agree**, independently, on
the figures for the three anonymised studies:

| | Both files say |
|---|---|
| Financial Services | 67% faster transaction processing · KYC 10 days to 3 · 25% reduction in operational waste · 2 to 3 FTE roles removed |
| Founder-Led | 2 days a week returned to the founder |
| Fitness & Wellness | +13% retention · +17% profit margin |

Section 4 of her outstanding file asks her for exactly these numbers. **They are
not missing. They are barred**, because section 1 says every result figure comes
from the section 9 master table and these are not in it — except the 67%, the 13%
and the 17%, which are, and which are published.

So the question is no longer "what is the number". It is **"does the master-table
rule still hold, now that two of your own files agree on figures the table does
not carry?"** One sentence from her turns them on. The same applies to Cinnacare
and Scentmatic, whose figures are withheld on the same rule from a single source.

### The slide 12 caption comment: withdrawn, or resolved?

Her v2 deck carries a comment on slide 12 that v3 does not: **"REMOVE THE TEXT AT
THE BOTTOM OF ANIMATION"**. Slide 12 is the before-and-after process map on the
audit page, and the text at the bottom is:

> Seven steps, four handoffs that double back, and two that nobody owns. This is
> what most businesses look like when you actually map them rather than describe
> them.

That caption is on the site. **The comment was deleted between v2 and v3** while
the other slide-12 comment survived word for word, so it was removed deliberately
rather than lost.

Deleting a comment means one of two things and only she knows which: she
withdrew the instruction, or she marked it done. **Not actioned.** Removing a
caption on a comment she deleted is the worse of the two mistakes to make.

### Her two files disagree on whether clients are anonymised

Both are hers, both are 22 to 24 August, and **the disagreement is now visible on
two different pages of the site**:

| | Says |
|---|---|
| `pp-case-studies.html` | "Two named clients who have given us permission to share their stories, and three anonymised" |
| `pp-about-v2_2.html` | "Every number below is verified. **Clients are anonymised.**" |

The homepage now names Cinnacare and Scentmatic, on the authority of the first
file. The About page carries the standfirst from the second. A reader moving
between them sees a promise of anonymity next to two named clients.

This compounds the point already in 6b of her outstanding file: the homepage logo
strip already names seven clients while the stories promise anonymity. **Whichever
way she goes, three places have to agree**: the logo strip, the case study
standfirst, and the About page.

---

## 1ag. Her own new copy uses em dashes and section 1 bans them — **for Iram**

Section 1 bans the em dash from the site. Every file she sent on 22 August uses
them heavily: `pp-fees_3`, `pp-fees_4`, `pp-case-studies.html` and the revised
service pages.

**We convert them on sight, and by 26 August that had happened nine times**
without her being told once. Measured against the served pages rather than
counted by hand, because the first count given to Saif was five and it was wrong.

| Her sentence | Built as |
|---|---|
| "Primary ownership — 8 to 10 days a month" | colon |
| "…running the day-to-day — with us available, not resident" | comma |
| "We do the work — inside your business, not from a slide deck" | split into title and line |
| "Most founders already feel something is wrong — they just don't know where to look" | comma |
| "We built a full cash-flow model — month by month, venue by venue" | comma |
| "From concept to two-country operation — built from scratch" | comma |
| "Nobody could see why — until we built the visibility" | comma |
| "The team had capability — it lacked clear ownership" | comma |
| "Strong demand, loyal core — but churn was rising" | comma |

The last two predate this batch and were converted earlier; they are listed
because they are the same change and she has never been told about any of them.

**The tension is real and it is hers to settle.** The ban is in a document from
13 August. The copy it is being applied to is from 22 August and is also hers.
Following the older rule is the safer default while she is not here, but it is
a default, not a finding. `docs/FOR-IRAM-outstanding.md` section 9a puts the
three options to her.

`copy-lint` enforces the ban and is what catches each one, so this cannot drift
silently. Em dashes inside code comments are not flagged and do not need to be:
the lint reads rendered strings.

---

## 1ah. The hero eyebrow is now her four words — **for Iram**

Her comment on **slide 1**, which is on all three decks identically:

> "…Use video in the back, **Strategy, Operations, technology, execution at the
> top.** Different fonts or italics for the most consultants…"

The eyebrow now reads **STRATEGY · OPERATIONS · TECHNOLOGY · EXECUTION**, in her
order. Same styling, same position directly under the navbar.

**This does not override a spec block.** It was checked three ways before the
change: spec 3.1 has five blocks and none of them is an eyebrow; the phrase is on
no page of the live pivotprime.ae; and it is in none of her mockups. The line it
replaced, "Operations · Strategy · Execution", was **ours**. So this is authored
copy giving way to her instruction, which is the direction that needs no
permission.

**It has never been in the authored list either**, and that is a scope gap rather
than an oversight: `check-unsanctioned-copy` collects headings, links and buttons,
and the eyebrow is a `<span>`. Any other authored eyebrow on the site is
invisible to it for the same reason. Logged in 1j as a work item.

### It wraps at 360, and that is not being papered over

Measured on the built page rather than estimated:

| Viewport | Text width | Space available | Result |
|---|---|---|---|
| 1440 | 437px | 1152px | one line |
| 768 | 437px | 720px | one line |
| **360** | **437px** | **328px** | **two lines** |

At 360 it breaks as `STRATEGY · OPERATIONS · TECHNOLOGY` on the first line and
`· EXECUTION` on the second, so **the second line begins with an orphaned
separator**. That is the part that reads as a fault rather than as a wrap.

**Nothing was shrunk to hide it.** Reducing the type or the letter-spacing would
make her four words fit and make them harder to read at the one width where they
are hardest to read already. Left as it is, reported to Saif, and the options are
his call: drop the separators to line breaks at 360, hide the middle dots and let
the words wrap as a list, or accept the wrap.

---

## 1aj. The KPI cards, the eyebrow wrap, the floating button, and four comments nobody had processed

### Her per-card visuals are built

Slide 3: *"Really good idea, but just need Different visual language for each
KPI"*. Built from her own `req/pivot-prime-kpi-cards_3.html` rather than
invented: a four-node ALIGN / BUILD / EMBED / DONE track, a before-and-after
block comparison, a retention dot grid with her legend, a profit trend on a
gridded field, and a pair of speed tracks. Her `.kpi-label` card names are back
with them.

**Four of the five encode the figure.** Ten blocks becoming seven is a percentage
drawn instead of written; a line has a slope; a dot grid split into retained and
churned is a ratio. Publishing those while the written figures are withheld would
put the same unapproved numbers on the page in the one form no check reads. So
each card renders its frame now and the data-bearing mark appears with the
figure. Card one is complete today because her track carries no quantity at all.

Static, not animated. Her mockup moves particles along the track and grows the
trend line; both would put the moving part outside the served HTML for a
decoration.

### The 360 eyebrow

The four words need two lines at 360. With the separators in the flow the break
landed after "Technology" and the second line opened with an orphaned dot. The
dots are decorative, so they are hidden below `sm` and the words wrap as words.
First attempt used inline-block spans and the browser collapsed the space before
each dot, rendering "STRATEGY. OPERATIONS."; caught by looking at it. Flex with
`gap-x-2` instead.

### The floating WhatsApp button

A fixed button passes over whatever is beneath it, so it cannot be made never to
overlap. At 360 it was 64px square over a full-width column and covered the tail
of a line on the KPI cards and the persona quote. It is 48px in the corner below
`sm`, and those two sections carry a bottom gutter taller than it. Measured by
sampling what sits under the button every 200px down the page: seven text
elements before, and after the change nothing but section eyebrows passing
mid-scroll, which is unavoidable.

### Four comments from the decks that nobody had processed

Found by the corrected extraction, on top of the three now in the client file:

| Slide | Her words | State |
|---|---|---|
| 9 | "The quote boxes maybe in the lighter green to stand out bit more." | not done. The persona quote boxes are not on `mist` |
| 12 | "WHAT YOU GET PART OF ALL SERVICES SHOWN LIKE THE ONE HERE, RIGHT SIDE SHADED" | on the audit page only. Four service pages have no such panel |
| 14 | "Text on the animation at the bottom, remove that." | the same instruction as her slide 12 one, for Build and Place. Not actioned, and the slide 12 version is already logged as withdrawn-or-resolved in 1af |
| 8 and 15 | "Try to have some of Saif's work shown in here too... at least one case study" and "Saif to put all his work or design this however he wants" | no case study of his work exists, and the Technology Builds page does not showcase any |

None is blocking. The last one needs Saif rather than Iram.

---

## 1ak. The page background is warmed to shell, and a functional sweep — **for Iram**

### Every light page background is now her cream

Her slide 3 comment: *"Lets try few new colour ways with all the colours shown
here we have few background options instead of white cold..we can use the
ivory"*. `shell`, `#fefbf8`, is the ivory on her own swatch and it is now the
page base site-wide. Nineteen sections that were explicitly pure white moved with
it, and the two cool grey bands became `linen`, the palette's warm grey, so the
banding rhythm survives the warming instead of going muddy against it.

**Cards stayed white on purpose.** Warming both would have flattened the
separation between a card and the page it sits on, so the page carries the cream
and the card keeps the white. Palette tokens only; `palette-lint` clean.

**Contrast measured afterwards, and one class fails, before and after.** `mid`
green (`#009f50`) at small sizes reads 3.2 to 3.5 against light backgrounds where
WCAG AA wants 4.5. On pure white it was 3.46; on shell it is 3.35, so the warming
moved it by roughly a tenth and did not cause it. It affects the eyebrow above
most sections and the green sub-lines on the audience pages. Changing it touches
every eyebrow on the site, so it is a decision rather than a fix, and it is
Saif's to make. Two smaller ones sit with it: the neon eyebrow on the patterns
section reads 1.86, and the form's "(optional)" reads 2.52.

### What the functional sweep found

556 links and buttons clicked on every route, at 1440 and 360, with a real touch
context for the dropdowns. Every internal link resolves 200, every in-page anchor
target exists, every external link carries `rel="noopener"`, all six redirects
answer 308 to a destination that returns 200, and the three dropdowns, the mobile
menu and its disclosures, the three seat tabs and their deep links, the process
map toggle and the case study arrows all behave.

**One defect worth her knowing about, now fixed.** With JavaScript disabled the
contact page showed a pulsing grey placeholder and no form at all. The form reads
a query parameter for its prefilled message, and doing that in the browser forced
React to stream the whole form inside a hidden container with a script to reveal
it; with no JavaScript that script never runs. The page is the one whose entire
job is the enquiry. The parameter is read on the server now and the form is in
the page as it arrives, with its own address and method, so it posts natively.

**One thing left for her.** The footer carries two social icons, LinkedIn and
Instagram, and both link to nothing. **Send the two profile addresses** and they
work; until then they are a dead link on every page of the site.

---

## 1al. Eleven more lines of ours, and the fees section made shorter — **for Iram**

### The fees section is 37% shorter on desktop and 44% on mobile

Measured, not estimated: 1801px to 1135px at 1440, and 2944px to 1649px at 360.
**Not one word of hers was cut.** The traditional-versus-Pivot contrast and her
commitment line stay in view, and the supporting detail sits behind a native
expander. `details` needs no JavaScript, so every sentence is in the page as it
arrives whether it is open or shut, and `check-content` fails if any of it stops
being served.

**One new heading and one new sentence, both ours.** Her copy says what the
section is *about* — "Most consultants charge whether it works or not" — but
never says in plain words what the pricing model *is*, and that is the thing
somebody types into a search box:

> **How Pivot Prime charges: a fixed fee plus a results-linked element**
>
> Every engagement has two parts. A fixed element covers the work itself, and a
> results element is paid against a target agreed with you before anything
> starts. The Operational Clarity Audit starts at AED 15,000, and everything
> else is scoped per engagement.

Her heading moved down one line and now leads the section as a statement rather
than as its title; spec 3.10's own first block is still the heading over the
traditional column. Both are still on the page.

### The Technology Builds capability grid

Nine tiles. Seven carry spec 4.4's sentences **verbatim** with a short label
above each; the labels are ours. Two are ours in full and are flagged as such:

| Ours | Why it is not hers |
|---|---|
| **Agentic web applications** | 4.4 covers AI agents and custom applications, but not this |
| **Mobile applications** | 4.4 covers websites and says nothing about mobile |

Both were named as capabilities by Saif on 26 August. The grid heading and the
line under it are ours too.

**Eleven lines in total**, and they take the authored list from 18 to 29. They
are in the table in 1f with the rest.

### The result cards read as finished rather than empty

The figure slot was leaving a hole, so the label under it now carries the weight
the number would and the card ends on a rule rather than on space. A slow
emphasis cycles across the five cards.

**It cannot hide anything.** Every card is server-rendered and all five are in
the page at all times; the only thing that moves is one attribute that CSS uses
to lift a card. With JavaScript off there are five readable cards and no
emphasis. It pauses on hover and on focus, and under reduced motion it never
starts.

---

## 1b. Spec instructions that describe the live WordPress site, not this build

Iram wrote parts of the spec against what she could see on pivotprime.ae. Those
instructions cannot be actioned here, because the fault they describe does not
exist in this codebase. This list is the answer to "why was this not done", and
it exists so the question can be answered without re-deriving it during review.

Each was checked by looking for the **corrected** text, not by confirming the
faulty text was absent. Those are different questions, and conflating them is
what let the persona pages ship the spec's own working notes as live copy.

**One entry on this list was wrong.** Correction 5 was recorded as live-site only
because a search of the source for `SME's` found nothing. The text was there as
`SME&apos;s`, which no literal search of the source will ever match. Checks that
read the served page do not have this blind spot, which is why the pre-launch
pass found it. Anything checked by grepping source rather than output should be
treated as unconfirmed.

### Section 2.5, typographical corrections

| # | Correction | Status here |
|---|---|---|
| 1 | "2-12 week rest" to "2 to 12 week reset" | **Applied.** The faulty version was live in this repo |
| 2 | "intergrated execution roadmap" to "integrated" | **Live-site only.** Neither spelling appears anywhere in this codebase, so there is no sentence to correct |
| 3 | "The team is stretched. misaligned, or burned out" | **Applied**, and the corrected wording is carried into the rebuilt 3.5 patterns list |
| 4 | "Legacy processes drain time and money." trailing stop | **Superseded.** Spec 3.5 rewrites the patterns list and that pattern is not in it, so the sentence no longer exists to punctuate |
| 5 | "This is where most SME's start" to "SMEs" | **Applied.** Previously recorded here as live-site only, wrongly. The faulty text was in this repo all along as `SME&apos;s`, and the audit that cleared it grepped the source for a literal apostrophe. An HTML entity is invisible to that search. Found by the pre-launch checks, which read the served page rather than the source |
| 6 | "We understand human behavior" to "behaviour" | **Applied.** The faulty version was live in this repo |

### Section 5.3

"The 'What We Offer' heading is an H1 on this page and an H2 on the other three.
Demote it to H2."

**Nothing to action, but not for the reason first recorded.** The heading does not
exist on the Corporate Leaders page here, which is the page the demotion targets.
It does exist on P&L Owners, already as an H2, which is the level the spec asks
for. The earlier entry said only that it was absent from Corporate Leaders, which
read as though it were absent everywhere. Now asserted, so it cannot drift to an
H1 later.

### Section 6.2

"Delete the section below." The image it points at shows a section headed
"Growth rarely follows a clean plan / Neither does execution", with the four
capability cards inside it. That wrapper does not exist in this codebase. The
four capabilities themselves do, and 6.2 tags those KEEP, so nothing is deleted
here and nothing is missing.

### Section 11, visual defects

The spec is explicit that these were "found by capturing the live pages". None
reproduce here:

- **11.1** card headings breaking mid-word. No `word-break` or `overflow-wrap`
  rule forces breaks inside words in this codebase.
- **11.2** case studies two and three not rendering on the About page. All three
  render correctly here.
- **11.3** carousels clipping their second card. There is no carousel component
  in this codebase.
- **11.4** the patterns list reading as a formatting fault. **Superseded**
  rather than merely absent: 3.5 rewrites the section outright, so the list it
  describes no longer exists to be misformatted.
- **11.5** confirmations from the captures, including the hero button reading
  GET IN TOUCH. **Superseded** by the 3.1 rebuild, which replaces that button.

**Two categories, not one.** 11.1, 11.2 and 11.3 are *non-reproducing*: the fault
described does not exist in this codebase, but the sections do, so they stay on
the pre-launch QA list. 11.4 and 11.5 are *superseded*: a later clause replaces
the thing being complained about, so there is nothing left to check. The same
distinction applies in 2.5, where correction 4 is superseded by 3.5 rather than
being live-site only.

**How to treat section 11 instead.** It is a pre-launch QA checklist to run
against the new build once the homepage is finished, not a defect list against
this repo. Several of the faults it describes are ones a rebuild can reintroduce,
which is what `npm run check:overflow` and `npm run check:content` now guard.

---

## 1c. Copy that was rewritten rather than cut — **for Iram**

This is separate from anything missing, because the two need different reactions.
A sentence that was cut leaves a hole somebody eventually notices. A sentence
that was rewritten leaves a page that reads perfectly well and no longer says
what you wrote. Nothing about the page looks wrong.

All of the below has been restored to your wording. Nothing here needs a decision
unless you disagree with a restoration.

### The two that change what the page sells

**1. The audit lost its name.** Spec 4.4 routes an uncertain visitor with "start
with an **Operational Clarity Audit**, and we will tell you honestly whether a
build is the right answer". The page shipped "start with **an audit**". The named
service became a common noun, on the page whose job is routing people into it,
and it is the only priced offer on the site.

**2. The sentence where you turn work down was deleted.** Spec 4.5 reads "We are
not interested in beginning a UAE entry that will not make money in the UAE." It
was not on the page at all. It is the strongest line in that section, because it
is the only place the firm says no.

Both read as blunt, which is presumably why they went. Blunt was the point.

### The rest, restored

| Your wording | What shipped |
|---|---|
| so **the leadership team** works on what only they can do | so **leadership** works on what only they can do |
| Dashboards and reporting, so decisions are made on numbers **rather than instinct** | …made on numbers |
| **Chairing and running** the operating rhythm: **the** meetings, **the** agendas, **the** follow-through | Chairing the operating rhythm: the meetings, agendas and follow-through |
| **Fractional** Chief of Staff | Chief of Staff |
| migration from spreadsheets **and inherited systems** | migration from spreadsheets |
| Dashboards and management reporting, **so decisions are made on numbers rather than instinct** | Dashboards and management reporting |
| Integrations between **the** systems you already pay for and **are not getting value from** | …and are not using |
| AI agents and assistants, where they remove real cost **rather than add a feature** | …where they remove real cost |
| every assumption **of the entry** priced in | every assumption priced in |

Two further sentences had gone entirely: spec 4.4's "So, before we build anything
we find out where the business is actually losing time, margin or control, and
then we build at that point", and the three seat descriptions on 4.2 had each
lost their middle sentence, the one saying what the seat actually covers.

### Why this was not caught sooner

The check that compares the site against your document originally matched on the
opening clause of each block. A sentence whose first few words survived passed,
however much of the rest had been changed. It now matches the whole block, which
found ten rewrites and three deletions that the earlier version had approved.

---

## 1d. Design against spec, resolved toward the spec — **for Iram**

Three service pages were built from the mockups rather than from your document,
so in places the designer's captions had replaced your copy: spec 4.3's five
seats, each a full paragraph, existed on the page only as two-word labels reading
"drives delivery" and "owns the numbers".

**Your copy is restored and the designs are kept.** Nothing your designer built
has been removed. On the Build and Place diagram the role names stay, because
they identify the parts of the picture; only the descriptor line under each was
removed, because the cards now carry the same idea in full and printing it twice
reads as a mistake.

If you want a diagram to carry more once you have seen the page, that is a
conversation. It was not a decision to take on your behalf now.

---

## 1e. Two calls to action corrected — **for Iram**

Both used wording section 2.2 of your document asks us to remove. Line 226 reads:

> *The header button currently reads BOOK DISCOVERY CALL. Change it to TALK TO US
> and point it at WhatsApp with the homepage pre-fill.*

**The header button.** It read "Book Consultation" for one commit. That is the
wording the line above asks to be taken off the site, so it now reads "Talk to
us" and opens WhatsApp, as instructed. Nothing else about the button changed.

**The enquiry form's button.** It read "Request a discovery call". That was ours,
not yours, and it used the same phrase. It now reads "Send enquiry", which
describes what the button does and claims nothing about what happens next.

**A third place we found while checking.** "Book discovery call" was also on the
How We Work page, twice, on the coaching and workshops cards. Also ours. Both now
read "Talk to us". You did not ask us to look for it; the new check below found it.

**The pre-fill is not built.** Line 227 says to point the header button at
WhatsApp "with the homepage pre-fill". Your document refers to that pre-filled
message as something that already exists, but never gives its wording, and there
is none in the code we inherited. We are not going to invent the first sentence a
prospect sends you. **The button opens WhatsApp with an empty message until you
give us that line.** Tracked as item 1.16.

---

## 1f. Copy on the site that came from neither source — **for Iram**

We now check the site the other way round. Until this week we only asked "is every
line of your document on the site?", which reached 198 out of 198 and stayed there
while two buttons nobody had approved sat on screen. A check that only reads your
document cannot see writing your document never asked for.

So every heading and every button on the site is now traced back to one of three
places: a block in your document, the wording kept from the current pivotprime.ae,
or this list.

**The count was wrong until 25 August, and it was wrong in the direction that
that costs you time.** This list said 44, then 41, then 29. The real figure is
**18**. Twenty-three lines it named as ours are yours, and all of them were
corrected before anything went to you.

The 18 are structural and connective writing that no source of yours supplied,
mostly the sub-headings that hold a page together and the closing lines above a
button. **None of it is wrong, and none of it is invented positioning.** But none
of it is yours either, and you should read it and either approve it or replace it.

| Page | Where | Copy we wrote |
|---|---|---|
| `/` | Panel headline, Stretched founder | "You built something real, and everything still runs through you." |
| `/` | Panel headline, Scaling SME leader | "The business is stable, but strategic momentum is hard to create." |
| `/` | Panel headline, Corporate innovator | "You are expected to deliver change without the team it really takes." |
| `/` | Button on the P&L owner panel | "Design the execution roadmap →" |
| `/` | The numbered tabs above the panels | "01 Scaling SME leader"<br>"02 Corporate innovator"<br>"04 Stretched founder" |
| `/` and `/about` | Client story heading | "Fitness and Wellness Company, UAE" |
| `/about` | The three newer client story headings | "Professional Services, UAE"<br>"Retail and Consumer, Gulf"<br>"Technology and SaaS, MENA" |
| `/contact` | Page heading | "Tell us what's slowing you down." |
| `/contact` | The WhatsApp link | "WhatsApp us on +971 52 440 1075" |
| `/services/operational-clarity-audit` | Heading over the before-and-after map | "How the work runs today, and what it becomes." |
| `/services/operational-clarity-audit` | Heading in the dark closing panel | "Almost every engagement begins with the audit." |
| `/services/fractional-leadership` | Heading, why the cost falls over time | "Heavy at the start. Light by the end." |
| `/services/fractional-leadership` | Heading above the three seat tabs | "Three seats. Pick the one that is missing." |
| `/services/fractional-leadership` | The three seat tabs | "Fractional COO Owns execution"<br>"Fractional Chief of Staff Owns follow-through"<br>"Fractional CFO Owns the numbers" |
| `/services/fractional-leadership` | Heading over the honest-limits panel | "Where it does not fit" |
| `/services/fractional-leadership` | Heading in the dark closing panel | "Find out which seat is actually missing." |
| `/services/build-and-place` | Section heading | "One contract. One accountable party." |
| `/services/build-and-place` | Heading above the role cards | "The seats we place" |
| `/services/uae-market-entry` | Closing section heading | "Where it ends up" |
| `/for-founders` | The line above the closing button | "Ready to take work off your plate?" |
| `/for-smes` | The line above the closing button | "Ready to make your business predictable?" |
| `/for-corporate-leaders` | The line above the closing button | "Need on-demand execution support?" |
| `/for-pl-owners` | The line above the closing button | "Ready to create real momentum?" |

**Three lines this list was wrong about, in the other direction, and they are
back.** It recorded the heading "An app you want built, or a process that is
eating your team" and the two toggle labels "Automate everything" and "Fix the
constraint first" as copy we had written to fill gaps, and retired.

**All three are hers**, from the Technology Builds page of
`req/pivotprime-service-pages.html`, which has been in the project since 13
August. We deleted the client's copy believing it was ours, and this list told
her so.

Restored 26 August, on the Technology Builds page. Her mockup runs the two labels
as a toggle and injects the second caption from script, so half her argument is
not in her own served HTML; both halves are static here. The second caption,
recovered from her script:

> Automate the approval step itself and the whole line clears. Nothing else in
> the process changed. That is why we find the constraint before we build
> anything.

`npm run check:dropped` now walks her mockups and reports anything of hers the
site renders nowhere, which is the direction that produced this. It found five
more on its first run: her headline on every case study, including on the two
built from her file an hour earlier. Those are back too.

### The twenty-three that were wrongly listed as ours

Three separate faults, all in our check rather than on the site. Nothing on the
page changed; what changed is who these lines are credited to.

**Eleven come from your own HTML mockups**, which the reverse audit was not
reading at all. It traced rendered copy to the copy document, to the live site
and to this list, and those are three of the four places your wording lives. The
fourth is the mockups in `req/`. Anything taken from one came back as ours:

| From | Copy |
|---|---|
| `pivotprime-service-pages.html` | "How the work runs today, and what it becomes."<br>"Almost every engagement begins with the audit."<br>"Heavy at the start. Light by the end."<br>"Three seats. Pick the one that is missing."<br>"Where it does not fit"<br>"Find out which seat is actually missing."<br>"Fractional COO Owns execution"<br>"Fractional CFO Owns the numbers"<br>"One contract. One accountable party." |
| `pivotprime-persona-pages.html`, `pivotprime-persona-tiles.html` | "Design the execution roadmap →" |
| `pp-about-v2_2.html` | "Professional Services · UAE" — the comma in our version is ours, the words are hers |

`check-unsanctioned-copy.mjs` now reads every `.html` in `req/` as a fourth
source. The three loose mockups that lived outside the repository are copied into
`req/` so the check is self-contained. Inline tags are stripped before the text
is split, because both the mockup and the page colour half a heading with a
`<span>` and splitting on every tag cuts the heading in two: the first version of
this failed on "Heavy at the start. Light by the end." for exactly that reason,
and was fixed before it was believed.

**Five are your document's own wording.** Your copy spec writes its instructions
in two kinds of table. The green copy blocks come out of the conversion as one
shape, and the "Block / Currently / Change to" instruction tables come out as
another, laid out by character position across the page. Our checker only read
the first kind. So the entire "Change to" column of section 5, which is where you
wrote the sub-line under every persona card, was invisible to it, and the lines
we built straight from your instruction came back as lines we had invented.

| Now credited to | Copy |
|---|---|
| Spec 5.1 | "Through an Operational Clarity Audit. From AED 15,000." |
| Spec 5.1 | "Through hiring support, role design and Build and Place." |
| Spec 5.1 and 5.2 | "Through a Fractional COO retainer. Scoped per engagement." |
| Spec 5.3 | "Through Build and Place. Scoped per engagement." |
| Spec 2.5 | "We understand human behaviour" — your own spelling correction |

**Seven are kept from your current site**, under the section 6.2 instruction to
keep the About content as it stands. Verified against the served pages on
pivotprime.ae on 25 August.

| From | Copy |
|---|---|
| /who-we-are | "What we have achieved" |
| /who-we-are | "At Pivot Prime, we bring four things into every engagement" |
| /who-we-are | "• We structure problem solving"<br>"• We embed operational discipline"<br>"• We enable data tracking" |
| The homepage | "We do not just understand your challenges."<br>"We have sat in the system." |

**One thing to correct rather than approve.** The last two of those are yours with
the contraction expanded:

| On pivotprime.ae today | On the rebuild |
|---|---|
| "We've sat in the system." | "We have sat in the system." |
| "We don't just understand your challenges." | "We do not just understand your challenges." |

Section 1 of your document says green blocks must not be re-punctuated. KEEP
content deserves the same treatment and did not get it. Tell us to restore the
contractions and we will.

---

## 1g. Five new colours, and what we named them — **for Iram**

Your swatch on slide 3 of *Website Revisions 2208v1* adds five colours. They are in
the build as design tokens:

| Your hex | The name we gave it |
|---|---|
| `#fefbf8` | shell |
| `#e8f4ec` | mist |
| `#e8d7b5` | sand |
| `#9f7a3d` | bronze |
| `#efeae0` | linen |

**The names are ours, not yours.** Your swatch labels each circle with its hex code
and nothing else, and the code needs a word rather than a number so that a colour can
be changed in one place later. Rename any of them and we will follow.

The top row of your swatch is identical to the five colours already in the build, so
nothing existing changed.

**Six colours in the two mockups are not on the swatch and we have not used them.**
Four are close enough to a swatch colour to be that colour with a rounding error.
Two are a gold and a dark olive, `#c8af50` and `#3a3510`, that have no relative on
the swatch at all. Four more are nearest to a swatch colour of a completely different
family: `#b8d9c6` is a pale green whose closest match is a sand. Rather than guess, we
have left all of them out and the audit lists each one. See `docs/REVISIONS-2208.md`.

---

## 1h. How we are paid, in words rather than a worked example — **for Iram**

Your 23 August design for the fees chapter works through an example: a target, a
percentage, the amount you keep and the amount we earn. **We have not built it,
and the reason is not the numbers.**

Two rules in your own document stop it, independently of each other:

> Section 1: *"One price only appears on the site: the Operational Clarity Audit
> floor. No other figure and no upper limit appears anywhere."*

> Section 3.10: *"Do not publish a specific percentage or a formula here."*

The worked example publishes four figures and a percentage. Confirming that the
numbers are correct does not help, because both rules bar them whatever they are.
**This is a decision about the rule, not about the numbers.** Either section 1 is
amended to allow a worked example, or the example stays off the site.

So the page now states the model in words. Two sentences, ours rather than yours,
for you to approve or rewrite:

> Every engagement has two parts. A fixed element covers the work itself, and a
> results element sits against a target we agree with you before anything starts.

> The Operational Clarity Audit starts at AED 15,000. Everything else is scoped
> per engagement, because the shape of the work decides the cost.

This also settles something the design left open. It priced the audit in **AED**
and worked the fee example in **dollars**, on the same page, with no rate between
them. Naming only the audit floor, in AED, removes the question.

**Separately, and already on the site:** section 3.10 ends *"Iram to confirm final
wording before this section goes live."* The four sentences of that section are
your document's own words and are built exactly as written, but they have not been
confirmed by you. That confirmation is still owed. Item 1.5.

---

## 1i. The About page, reduced — **for Iram**

Your new About design is not built in full. What is built is the part that needs
nobody's permission: the opening statement, who we are, the founder, and the
client stories folded onto the same page.

**Two things are deliberately empty, waiting for you.**

*The team.* Your design names three more people with titles and biographies. None
of them is in your copy document, and a name and a job title on a live website is
not something we will publish on anyone's say-so but yours. The section is built
and currently shows the founder only. Send the wording and the others drop in.

*The bench.* Your design lists around twenty capability labels. The section is
built with its heading and its introduction, and the list itself is empty. Same
reason: send the labels and they appear.

**The client stories.** All six are on the page, including the three new ones from
your design. **Their numbers are not.** Your document is explicit, in section 1:
*"Any result figure or percentage must come from the master table in Section 9 and
nowhere else."* Only four figures actually appear in that table, and those four are
published: 67% faster transaction processing, 13% retention, 17% profit margin, and
up to two days a week returned to the founder.

Every other figure shows as an empty space with the sentence intact, so the story
still reads and the unverified number stays off the site. That covers 25%
operational waste, the KYC day count, the FTE reduction, and everything in the
three new stories: gross margin, non-billable admin, markdown losses, pipeline
conversion and sales cycle. **Send the numbers, or confirm they belong in the
master table, and they appear.**

**The testimonial quotes are owed, not dropped.** Your design carries a quote under
each new client story, signed by a role and a company type: a Managing Partner, a
Commercial Director, a CEO. None is on the site. This is not a design decision we
have taken; it is a gap waiting on you.

Send each quote with confirmation that the client has agreed to it being published,
and we will put them in. Until then the stories run without them. A quote
attributed to a named role at a named client is a claim neither we nor a visitor
can check, and if the client has not agreed to it, publishing it is a problem
whatever the words say.

**One thing that follows from the withheld figures.** The results panel on each
story carried a "Verified" label. On the three new stories, where every figure is
waiting on you, that label was asserting the opposite of the truth. It now appears
only on a story that actually publishes a confirmed figure.

**One correction, and the cause is in your own document.** Your credential appears
twice in the copy document with two different figures:

| | |
|---|---|
| Section 3.7, the homepage | a multi-line book worth more than **$120 million** |
| Section 6.3, the About page | **$100 million** |

Both are final-copy blocks, so the site reproduced both and the two pages
disagreed about the same fact. Your new About design says $100 million, which
matches 6.3.

We have standardised on **$120 million** across the site rather than quietly
taking the lower one. That means the About page no longer matches section 6.3
word for word, which is recorded against that section.

**Please confirm which figure is right.** It is a fact about you, it is on the
site now, and it is the one thing here that the document cannot settle for us.

---

## 1j. Work items carried forward, not for Iram

Internal. Recorded so they are not rediscovered.

**Cleared 24 August:** `SpecCopyBlocks.tsx` tokenised, its nine raw hexes gone and
the file removed from the palette guard's grandfathered list. The three
unsanctioned calls to action wired to the content layer. The inherited em dashes
cleared, one by removing the "Chapter 04 — Fees" eyebrow and one by deleting the
dead portrait placeholder. Every check is now clean.

**Open: four service page components are client components without needing to be.**
`Service1ClarityAudit`, `Service2FractionalLeadership`, `Service3BuildPlace` and
`Service5MarketEntry` all carry `"use client"`. This is NOT the Technology Builds
defect: their content is fully present in the served HTML, measured on all nine
service and audience pages by comparing the raw HTML against the page with every
toggle clicked open. Zero words missing on any of them. It is a hydration cost and
a shape that invites the defect back, not a live defect. The four audience pages
are already server components.

---

## 1j-a. Two records corrected on 25 August, on Saif's own knowledge

Neither of these came from a file in the working folder. Both are Saif stating
what he knows about channels this project cannot read, and both are recorded that
way rather than as something verified here, because the pattern that produced
them is the one that cost this branch the most: **instructions arriving in
channels nobody audits.** Forty-four PowerPoint comments sat unread from 22
August because every audit read rendered images. Email is the same shape.

### The logo: sent to Saif on 11 August, never seen here

**Status: not seen.** Not "never sent", which is what the client file used to say
and which was wrong. Not "received, pending integration", which is what it said
next and which claimed more than is true.

Saif has the file. It is in Iram's email of **11 August, titled "Pivot Prime
Logo", five attachments, two of them PDFs.** Nothing from that email has been in
the working folder and nothing from it has been opened here.

**What is actually reachable from this repository** is one logo file,
`Cinnacare PRIMARY LOGO V2 BG1.pdf` inside `fwdwebsitecopy.zip`, timestamped
24 August. That is a *client's* logo, not the Pivot Prime mark, and it is not the
file in question.

**Nothing is built on it and nothing should be.** Five attachments with two PDFs
almost certainly means variants — a primary mark, a mono or reversed version,
possibly a favicon-sized one — and which variant belongs in which of the four
places is a decision that needs the files open, not inferred from a filename.

Saif is putting them somewhere the repository can see. Until then this is an
item **we cannot start**, rather than one we have not got to.

Four places carry the mark and all four change together: the header, the footer,
the browser tab icon, and the social share image. The share image is separately
outstanding, so the two should be done in one pass.

### Phase 2: the diagnostic statements must be randomised, not grouped

Her email of 12 August requires the diagnostic questions to appear **in random
order rather than grouped by domain**.

**This reverses 3.1 below, and 3.1 is currently built the other way.** The
history matters:

1. The inherited implementation interleaved, round-robining across all six
   domains so every screen mixed all six. That is her email's structure.
2. Deep spec §8.2 says "One domain per screen, seven statements visible together,
   with a progress indicator showing six steps."
3. We rebuilt it to §8.2 — six domain-titled screens — and kept a randomised
   statement order **inside** each screen to stop straight-lining. That is
   recorded in 3.1 as "resolved, built to spec".

So the original developer was following her email and we replaced it with the
document. **The email is the client's own later instruction and the document is
the client's own earlier one**, which is the same precedence question already
settled in favour of the client's later word for spec 3.6 (1w), How We Work (1x)
and the fractional rename (1u).

**Not actioned, and deliberately so.** The diagnostic is not in stage one, so
nothing on the live site is wrong today. But this is not a small change when it
comes:

- The six-screen structure is the screen structure. Random order across domains
  means one long list or arbitrary pagination, and the six-step progress
  indicator §8.2 asks for stops being meaningful.
- Scoring is unaffected — statements already carry stable spec-derived ids and
  the export keys on identity rather than render position, which was built for
  exactly this kind of reordering.
- Deep spec §8.2 will then be a deviation and needs its own entry, the same way
  everything else built against her later word does.

### Status: reported, not read at source

**This instruction has not been read here.** It reaches this record as Saif's
account of an email of 12 August that nobody on this side has opened. That is not
a doubt about Saif; it is the difference between an instruction and a paraphrase
of one, and this branch has been taught that difference expensively.

**Nothing is to be built on the paraphrase.** "Random order, not grouped" is
eleven words standing in for whatever she actually wrote, and the eleven words
already carry at least two unanswered questions: whether random means shuffled
across all six domains or shuffled within a screen, and whether the six-step
progress indicator survives either reading. A build that guesses those is a build
that has to be undone.

**What unblocks it:** the email itself, forwarded or pasted, at which point this
entry is rewritten from the source and 3.1 is decided properly. The diagnostic is
out of stage one, so nothing is waiting on it and there is no reason to guess.

---

## 1k. Two lines of ours on the contact page, and where Insights went

**The contact page opening.** It read: *"Three fields, thirty seconds. We reply
with a first read on your bottleneck and a time for a 30-minute discovery call,
with no pitch deck."* Two problems. It used **discovery call**, which section 2.2
of your document instructs off the site. And it promised three fields when the
message box is optional, so it was describing a form that no longer exists.

It now reads:

> Name and email is enough to start. We reply with a first read on your
> bottleneck and a time to talk it through, with no pitch deck.

Ours, not yours. Replace it if you would rather it said something else.

**Insights is no longer in the top menu.** The page has a heading and three lines
on it, because the first article has not been written. In the menu that offered
every visitor an empty page. The page is still there and any link to it still
works, and it is still listed in the footer. **It goes back in the menu the day
there is a first piece to read.**

---

## 1l. The privacy policy no longer mentions the diagnostic — text kept

The policy described completing a diagnostic, how individual answers are held and
how long they are kept. The diagnostic is not part of this phase, so readers were
being told how their data is handled for something they cannot find on the site.

Those clauses are removed from the page and preserved here word for word. They go
back when the diagnostic ships. **Nothing has been lost.**

> **What we collect.** When you contact us or complete a diagnostic, we collect
> the name, email address, business name and answers you give us.

> **Diagnostic responses.** Individual diagnostic answers are held by Pivot Prime
> and are not shared with anyone else in your business. Where several people from
> the same business complete a diagnostic, only the aggregate result is shared.

> **How long we keep it.** Enquiries and diagnostic responses are kept for
> twenty-four months, then deleted, unless you become a client and we need them
> for the engagement.

The page now describes only the contact form, which is the only thing on the site
that collects anything.

---

## 1m. Ruling: en dashes are fine, em dashes are not

Settled 24 August, recorded so it is not raised again.

Section 1 of the copy document bans the em dash. It says nothing about the en
dash, and an en dash in a numeric range, "1–2 weeks", "12–14 hours", is correct
typography rather than a violation. **They stay.** The copy checker only ever
tested for em dashes and is correct as written.

---

## 1n. Gallagher removed from the client strip, and a heading rescued from an image

**Gallagher is off the homepage logo strip.** Not because of the open decision
about which clients may be named. That decision is still open and nothing has
been added.

The strip is headed **"Companies we have delivered for"**. Two sections further
down the same page, your own credential names **AIG, MetLife and Gallagher** as
the companies you spent sixteen years working *at*. A reader who scrolls the
homepage sees Gallagher described both ways within one screen.

If Gallagher is a delivery client, say so and it goes straight back. If it is a
former employer, it should not be in that strip at all. **Either way the page
should not say both.**

**Three logos we could not previously describe are now described.** They were
labelled only "Client logo" because nobody could tell what they were from their
filenames. Opening them settled it:

| The file | What it actually is |
|---|---|
| `Frame-17` | **Democrance** |
| `instagram` | **Women Who Thrive.** Nothing to do with Instagram; the filename is wrong |
| `clogo3a` | **Gallagher.** Removed, see above |

A fourth was described wrongly rather than not at all: `stydio-with-bg` was
labelled **Stydio**, taken from its filename. The wordmark in the image reads
**studio88**. Corrected.

That leaves seven logos in the strip, each now named properly for anyone using a
screen reader, and it closes the open item about their descriptions.

**And one of them was never a logo.** The first item scrolling past in the strip
was a picture of the words "Companies we have delivered for". A heading, set as
an image, animating past the reader in a row of company marks. Anyone using a
screen reader heard it announced as a client logo, and search engines could not
read it at all. **The same words are now real text above the strip.** Nothing was
reworded.

---

## 1o. Alt text swept by eye, and the logo strip cross-checked

**Every image the site serves was opened and compared with its description.**
Nine carry a description; the rest are decorative. Two descriptions are wrong,
and both are wrong the same way "Stydio" was: taken from the filename rather
than from the image.

| Image | Description says | The wordmark actually reads |
|---|---|---|
| InsuranceHub logo | Insurance Hub | **InsuranceHub.ae** — one word, and it carries the domain |
| Man Cave logo | Man Cave | **MANCAVE PROJECT** — one word, and "Project" is dropped |

Correct and confirmed: Democrance, Birds of Paradise Foundation, Nivishe, Women
Who Thrive, studio88, and the founder portrait. The homepage hero photograph is
decorative and correctly carries no description.

**Not fixed, reported for a decision**, because "Man Cave Project" and
"InsuranceHub.ae" are company names and we have been wrong about company names on
this page twice already.

### None of the logos repeats the Gallagher problem

Gallagher came out because it appeared twice on the same page saying two
different things. **Every remaining logo was checked for the same shape across all
sixteen pages, and none of them appears anywhere on the site except as its own
logo.** Gallagher and MetLife still appear in Iram's credential, which is how we
know the check works.

**One adjacency worth her attention, not a contradiction.** Two of the seven
logos are insurance businesses: InsuranceHub.ae, and Democrance, whose own
strapline is "Democratizing Insurance". The first client story on the site is an
anonymous **"Financial Services Company"** whose detail is KYC timelines, policy
processing and onboarding. The About page promises that clients are anonymised.
With seven named logos and six anonymous stories in overlapping sectors, anyone
in that market could make a reasonable guess. **The anonymity is thinner than it
reads.** Nothing has been changed; this goes to Iram with the naming decision.

---

## 1p. The live site's logo strip mixes former employers with clients

The live pivotprime.ae logo strip, under the heading **"Companies we have
delivered for"**, carries **Willis Towers Watson, KPMG, AIG and MetLife**, plus a
card reading **"Experience inside global institutions"** scrolling in the same
row.

Those four are Iram's former employers. Her own credential names AIG, MetLife and
Gallagher as the companies she spent sixteen years working at.

> ### RESOLVED 25 AUGUST. The removal is undone.
>
> Iram circled both label cards in her own carousel and asked for that structure
> back. That answers the question this entry was holding open: the employer
> logos belong on the site, under their own label, exactly as her live site has
> them. **Gallagher is back**, alongside MetLife, Sky, Willis Towers Watson,
> KPMG and AIG, in a group headed "Experience inside global institutions".
>
> Nothing about the original reasoning was wrong. Gallagher under a heading
> reading "companies we have delivered for" was a claim the page could not
> support. It is now under the label that describes it accurately, which is what
> was needed all along.

**CORRECTION TO THE FIRST VERSION OF THIS ENTRY.** It said the live site presents
those four "under a heading claiming delivery". That is not right, and the
`logo-text-block-1-2.jpg` file is what settles it. The live strip runs **two**
heading cards through one scrolling row: "Companies we have delivered for" and
"Experience inside global institutions". The employer group always had its own
label. The two groups were simply sharing a single row, so whichever label had
scrolled past was the one the reader no longer had in view. The live site never
claimed those four as clients; its labels stopped doing their job.

**None of the four is in our build.** Checked today: the strip carries Democrance,
InsuranceHub, studio88, Women Who Thrive, Man Cave, Birds of Paradise Foundation
and Nivishe, and nothing else. So nothing needed removing.

**But all five files are sitting in the repository, unused**, which is how we
know the separation was deliberate rather than accidental:

| File | What it is |
|---|---|
| `clogo1a.jpg` | MetLife |
| `clogo2a.jpg` | KPMG |
| `clogo5a.jpg` | Willis Towers Watson |
| `clogo6a.jpg` | AIG |
| `logo-text-block-1-2.jpg` | the words "Experience inside global institutions", set as an image |

The second text card is the giveaway: the live strip runs **two** heading cards
through one scrolling row, so the employer group had its own label all along. The
rebuild kept the client half and dropped the employer half and its label.
Gallagher was the one that slipped across, and it is now out.

> ### RESOLVED 25 AUGUST, and she noticed first.
>
> She flagged the strip before we raised it, circling both label cards. All six
> employer logos are now on the site in their own labelled group: MetLife,
> Gallagher, Sky, Willis Towers Watson, KPMG and AIG. Sky was the sixth and was
> sitting in the repository as `Frame-15.jpg`, outside the logos folder, which is
> why the first sweep found five rather than six.
>
> The offer in section 6c of the outstanding file is therefore built rather than
> pending. The two label cards are text in the served HTML rather than the
> pictures of words her live site uses, so a screen reader reads them as headings
> instead of announcing them as client logos.

**Iram has to be told this before she notices.** She will look at the new site,
see four recognisable global brands missing, and reasonably ask where they went.
The answer is that they are her CV rather than her client list, that we have
separated the two, and that they can come back the moment she says so, under
their own heading rather than under "Companies we have delivered for".

---

## 1q. Tried and rejected: centring the hero heading

Recorded so nobody spends an afternoon on it again.

The live site's H1 is centred, line one full width and line two shorter beneath
it. Ours is left-aligned. Centring the H1 and its sub-line at 1440 and 768, with
the eyebrow, body copy and buttons left where they are, was tried and reverted.

**It reads worse than what it replaces**, for two specific reasons rather than
taste:

- **The neon accent rule is orphaned.** It sits under the eyebrow at the left
  edge as the anchor for a left-aligned stack. With the heading centred it points
  at nothing.
- **The left edges stop relating to each other.** Eyebrow at 145px, centred H1 at
  345px, body copy back at 145px. Three alignment changes inside one block, which
  reads as a layout fault rather than a composition.

At 768 the H1 already fills the width so centring is nearly invisible, but it
orphans "build it." in the middle of the line, which the left-aligned version
does not.

**The underlying reason it cannot be lifted piecemeal:** on the live site the
whole hero is centred, so the heading has a composition around it. Centring only
the heading inside a left-aligned hero is a different thing wearing the same
shape. Doing it properly means restyling the hero, which was explicitly not the
brief. No type sizes were changed in the attempt.

---

## 1r. Three opening sentences we wrote — **for Iram**

Three pages did not say what they were in their first line. That matters more
than it used to: when someone asks an AI assistant about fractional COO support
in Dubai, it quotes the first clear sentence it can find under a heading. These
pages gave it a card title and a price.

Ours, not yours. Approve or replace:

**Services page.** Your document gives this page a heading and five cards and no
sentence in between, so it went straight from a question to a price:

> Five services, used on their own or together. Most engagements begin with the
> audit, because we will not take responsibility for a fix we have not measured.

**How we work.** It read "It's about doing what works", which claims something
without saying what the page contains:

> How an engagement actually runs, from the first conversation to the point where
> the change holds without us.

**For corporate leaders.** The line under the heading was the second half of the
heading's own sentence, so read on its own it started mid-thought, "often without
enough people or budget to do it properly":

> You are often expected to do it without enough people or budget.

---

## 1s. Alt text, corrected finding

An earlier audit of ours reported that fifteen pages carried images with no
descriptions. **That was wrong, and the mistake was a misread column in our own
report.** Every image on the site is on the homepage, all forty-four of them have
descriptions, and the other fifteen pages contain no images at all.

There is a real version of the finding underneath it. Those pages use inline
graphics rather than image files, and most are unlabelled: small decorative icons
that should be hidden from screen readers, and on the fractional leadership page
one substantial diagram that carries meaning and needs a description. Between
four and twenty-six per page. **Not fixed, and not urgent**, but it is the actual
accessibility gap rather than the one we first reported.

A check now runs on every route and fails if any image is missing its description
attribute, so the homepage-only blind spot cannot come back.

---

## 1t. The team page is built. Why, on what authority, and one thing not used

The three names were on the outstanding list waiting for Iram's written
confirmation. They are now built, on Saif's decision, and the reasoning is
recorded here rather than left implicit.

**What we are treating as her authority:** she named all three in her own About
design, `pp-about-v2_2.html`, each with a title and a written biography. She then
sent a photograph of Justin on 23 August and one of Khushi on 24 August, both
unprompted, neither requested by us. Naming somebody and then sending their
photograph is a clearer instruction than a sentence saying "yes" would be.

**This is still not a written confirmation from each person.** The standard we
applied to the testimonial quotes was the individual's own consent, not the
client's. That distinction stands and remains outstanding for all three.

**Names, titles and biographies are verbatim** from her file. Nothing was
rewritten, tightened or shortened.

**One exception, and it is not a rewrite.** Iram's biography is section 6.3 of the
copy document rather than the one in the design. They are the same text except
for one figure: the design says the multi-line book was worth **over $100
million**, and both 6.3 and the homepage say **more than $120 million**. Taking
the design verbatim would have put the lower figure back and made the About page
disagree with the homepage again, which is the thing that was fixed on 23 August.
Section 3 of the outstanding file still asks her which is right.

**The fourth person in her design is deliberately absent.** Saif Ur Rehman
appears there with a title and a biography and is not on the site, on his own
instruction.

### Photograph resolutions, checked at the rendered size

Same check as the founder portrait.

| | Source | Largest rendered box | Enough for a high-density screen? |
|---|---|---|---|
| Iram | 4099 x 6149 | 446 x 558 | Comfortably |
| Justin | 1280 x 1600 | 446 x 558 | Yes, 1280 against the 892 a 2x screen needs |
| Khushi | 1086 x 1448 | 446 x 558 | Yes, 1086 against 892 |

All three are adequate. **Neither new photograph needs to be re-supplied.**

The cards go three across above 1024 and stack below it. The two-column step is
skipped deliberately: three cards in two columns strands the third on its own
row. Stacked cards are capped at 28rem and centred, because a full-width portrait
at 768 was 718px wide against a 640px file and was being upscaled.

---

## 1u. Fractional Leadership, and one wording inconsistency to confirm

**Done, on your instruction.** Slide 13: *"Drop down to be changed to Fractional
Leadership instead of Fractional COO"*. The menu and the page now say Fractional
Leadership, and the page's own web address changed to match. The old address
still works and forwards to the new one, so nothing anyone has already shared
will break.

Your document agreed with you already, which is worth knowing: section 4.2's own
heading for that page is "Fractional Leadership". Section 2.1 lists it under the
other name. We had followed 2.1; you and 4.2 outvote it.

**One thing to confirm rather than discover.** The service card on the homepage
and the services page still reads **"Fractional COO, CFO and Chief of Staff"**,
because that is a final-copy block in section 3.4 and you did not ask for it to
change. So the menu says one thing and the card names the three seats.

That is defensible: the menu is a category and the card lists what is in it. But
it is the sort of difference you would notice later and wonder about. **Tell us if
you would rather the card read "Fractional Leadership" too**, and it changes in
one place.

**And two sub-lines that had been missed, now changed.** The rename reached the
menu, the page and the web address, but not the persona pages. Card 3 on both
`/for-founders` and `/for-smes` still read **"Through a Fractional COO retainer.
Scoped per engagement."**, which is your own wording from the block tables in
sections 5.1 and 5.2. Those are the two pages a founder or an SME owner lands on,
so the old name was surviving in the place it was most likely to be read.

They now read **"Through Fractional Leadership. Scoped per engagement."** The
sentence is unchanged; only the service name inside it moved, to the one slide 13
settled on. **Say the word and the spec's original sentence goes back.**

That leaves the homepage service card as the only place naming the three seats,
which is the question above.

---

## 1v. Your comments from the 22 August deck, now on the site

Everything below is word for word from your own comments. Nothing was tightened,
shortened or rephrased.

| Where | What you asked for |
|---|---|
| Case studies | Your quote about the team, in full |
| Client story 2 | Your rewrite: "The founder was approving every decision..." |
| Client story 3 | Your rewrite: "Strong demand, loyal core, but churn was rising..." |
| P&L owners, all three cards | Your six new titles and subtitles |
| Corporate innovator, card 3 | "Senior judgment, on call", its subtitle, and the side box |
| UAE market entry | "We are not interested in launching a business in the UAE which will fail" and the subheading |
| Corporate innovator quote | Qatar, not Riyadh |
| Client story attributions | Industry in capitals, following your own example |
| Build and Place diagram | Project Manager, Software Engineer, Fractional COO added, "Watch the seats fill" removed |

### One consequence worth a look

**The three P&L owner cards no longer say which service delivers the outcome.**

They used to carry a line naming it: *"Through an extended Operational Clarity
Audit"*, *"Through fractional Chief of Staff support"*, *"Through Build and Place
and Technology Builds"*. Your new subtitles replace those lines rather than sit
under them, so the delivering service is no longer named on that page.

On the corporate innovator page your subtitle keeps it, *"Through Fractional
Leadership Services..."*, which is why that page still routes and this one does
not.

This may be exactly what you want: the new titles speak to the problem rather
than the product, which is stronger. But it is a change in what the page does,
not just how it reads. **If you want the service named as well, send us where you
want it and we will put it back under your subtitle.**

Those four lines are recorded as deliberately absent, so nothing reports them as
missing copy.

---

## 1w. The section you asked us to remove, kept word for word

Slide 6, your comment in full: *"Remove this section."* It is off the homepage.

**Your own document asked for it.** Section 3.6 is tagged NEW, so this was written
in for a reason. Your comment is dated 22 August and the document is version
1.7.1, so the comment is the later instruction and we followed it. **If 3.6 is
still what you want, say so and it comes straight back** — nothing was retyped or
paraphrased, it is all here and still in the code, simply not rendered.

**Heading**

> Knowing what is wrong is hard. Being the one who has to fix it is harder.

**Body**

> Most engagements end with a report. The findings are correct, everyone agrees,
> and the work goes back onto a team already at capacity.

> So we finish it. We place a project manager, a fractional CFO, an engineer or a
> marketer inside your business. Sourced, vetted and managed by us. They report to
> us, not to you.

> No visa, no end-of-service liability, no permanent salary for a temporary
> problem.

> One contract, one invoice, one accountable party. For exactly as long as you
> need it.

**Pull quote**

> A consultant tells you what to do. A recruiter finds you someone. Neither one is
> accountable for whether it worked.

**The four steps**

> **Diagnose** — We look at how decisions are made, how work flows, and where accountability quietly breaks down.
> **Align** — Strategy stops living on paper. We connect it to owners, sequence, and the operating rhythm of the week.
> **Rebuild** — We remove duplicated work and legacy drag, then rebuild the process so it holds without you.
> **Embed** — We work alongside your team until the new way is the normal way, and growth becomes repeatable.

**And the figure alongside them**

> +40 to 60% reduction in duplicated work, rework and inefficiencies

That figure is one of the five still waiting on section 1 of this document, so it
was not being published anyway.

---

## 1x. How We Work, off the site — **DECIDED, not pending**

Slide 17: *"Hide this or delete for now but would like to save what it says in
case we want to use later? For now its not needed."*

**Closed on 26 August, on Saif's instruction: taken at face value.** This is no
longer an open question and the client file no longer asks her one. It was framed
as needing her confirmation, which invited her to re-decide something she had
already decided in plain words.

The page is off the site. Visiting its address returns a not-found page, it is out
of the menu, and it is out of the sitemap so search engines stop listing it. **It
is hidden, not deleted.** The page and every sentence on it are still in the
project and a single switch, `NEXT_PUBLIC_ENABLE_HOW_WE_WORK`, puts it back
exactly as it was.

Held as a decision in `check-content`, which fails if the route stops returning
404, so it cannot come back by accident.

Here is everything it said, so you can read it without the site:

> How we work
> How an engagement actually runs, from the first conversation to the point where the change holds without us.
> At Pivot Prime, we help uncover what’s blocking progress, we align your teams and we turn strategy in to real results.
> Without the fluff.
> What we do:
> Turn plans into outcomes.
> Help teams translate strategy into clear actions.
> Set decision rights, success standards, and operating rhythm so progress does not depend on one person pushing.
> Make the business run cleanly.
> Fix broken processes and unclear ownership.
> Remove slow decisions, wasted time, and duplicated effort so work moves without friction.
> Make data useful, not overwhelming.
> Help teams capture the right data at source by redesigning workflows, decision points, and accountability.
> Clean, structure, and visualise it so leaders can trust what they are seeing and act with confidence.
> Build cultures that support performance.
> Clarify expectations, standards, and accountability.
> Help teams work with trust, pace, and ownership instead of burnout or confusion.
> Most consultants stop at strategy.
> We step into the messy middle and help you execute, adapt, and move the business forward.
> Businesses don’t need more ideas, they need results. With Pivot Prime you get real support, real momentum, and real results.
> of senior executives say they miss goals due to poor execution*
> *Source: Robert S. Kaplan, David P. Norton, Balanced Scorecard
> The Pivot Prime Method
> We focus on what actually moves the business.
> You can bring us in for the full journey or for a single step, we meet you where you need us most.
> Discover
> See what is really holding you back.
> We go inside the business to understand how it truly runs.
> • Structure and roles
> • How decisions are made
> • How work flows day to day
> • Where time and effort are lost
> This includes real conversations, process mapping, and close observation when needed.
> You can stop here if clarity is what you need first.
> Design
> Decide what to fix and how.
> We design a plan with both quick wins and long term moves:
> • What matters now
> • What can wait
> • What will move results
> • Who owns each decision
> Plans are built for your people, pace, and reality.
> You can start at this phase if the problems are already clear.
> Deliver
> Ensure there are measurable results.
> We stay with you as plans turn into action.
> • Execution support alongside your team
> • Help hiring or reshaping roles
> • Ongoing check-ins and accountability
> We stay until progress is visible.
> You can bring us in just for delivery if needed.
> People, roles, and ways of working must support it.
> Underpinning the Pivot Prime Method are two execution pillars that ensure delivery holds in the real world.
> Executive coaching and leadership labs
> Designed for founders, senior leaders, and managers navigating complex decisions and people dynamics.
> Team building workshops and communication labs
> When teams struggle to work well together, progress slows and effort is wasted.
> Strategy sets direction, but execution is what creates results
> At Pivot Prime, we do not give advice and walk away, we work with you to understand what is blocking progress, agree what matters most, and act on it together.
> You may come to us at the start, in the middle, or under pressure. Wherever you are, we meet you there, define the work that will make the biggest difference, and stay with you as it gets done.
> What is blocking progress
> A short assessment that surfaces the real constraints in the business, not surface symptoms, and focuses attention on what is actually slowing results.
> Outcome:
> Clarity on the true blockers to performance.
> First conversation
> A focused conversation to understand your context, pressure points, and goals, and to determine whether working together is the right next step.
> Clear alignment on the problem, the ambition, and whether Pivot Prime is the right fit.
> Discover through a deep diagnostic
> We examine strategy, operations, structure, culture, people, and numbers to identify where work is breaking down and where effort is not translating into results.
> A clear, in-depth view of strengths, weaknesses, and the true sources of friction in the business.
> Design the action plan
> A focused plan that sets priorities, ownership, and sequencing, balancing immediate improvements with decisions that strengthen performance over time.
> A practical plan built for execution and results, not presentation.
> Deliver with hands-on support
> We work alongside you and your team to turn the plan into action, remove obstacles, and maintain momentum through delivery.
> Progress you can see and measure, whether that is revenue growth, improved margins, or a more controlled and effective operation.
> Sustained results
> A business that runs with clarity and control delivers stronger financial performance, and gives leaders confidence that effort and decisions are producing real outcomes.
> Long term momentum, confidence, and a sustained strategic edge.
> Where this starts
> Almost every engagement begins with an Operational Clarity Audit, because we will not take responsibility for outcomes in a business we have not properly diagnosed.
> See what the audit covers
> →
> Stop guessing what is holding growth back,
> start with a proper diagnosis.
> Book your first conversation

---

## 1y. The rest of your 22 August comments, built

**Client stories. SETTLED 26 AUGUST, and we had it backwards.**
`pp-case-studies.html`, sent 22 August and not processed until now, numbers the
studies in its own markup: case study 1 is Cinnacare, case study 2 is Scentmatic,
and the anonymised set is Financial Services, Founder-Led and Fitness & Wellness.

So *"the pictures are for case study 1 and 2"* resolves to the two named clients,
which is exactly the two photograph sets she sent on 24 August, and Cinnacare
finally has a home. *"The three which are anonymised sit only on the about page"*
resolves to the three we had left on the homepage.

We had moved Professional Services, Retail & Consumer and Technology & SaaS
instead, because they were the three that had never been on the homepage and the
numbering was unreadable. **Now inverted**: the homepage carries Cinnacare and
Scentmatic with her photographs, and everything else is on /about. Held as a
decision in `check-content`, so the split cannot silently flip back.

The three from her About design keep `aboutOnly` as well: they do not appear in
her numbering at all, so nothing puts them on the homepage.

**Who we serve** is now in your order: stretched founder, SME, corporate
innovator, P&L owner. **"Mid-market execution owner" is gone everywhere** —
menu, homepage, the page itself, its title and its search description. Checked
against the live pages, not the code: zero occurrences in any form.

**The founders and SME pages** are stripped to the heading, the sub-line and the
box, as slide 18 asks. Nothing was thrown away. Here is every paragraph removed:

**for-founders**

> We look at how your business actually runs today. We review your commercial model, P&L, marketing and sales, operations, and how decisions and work really flow. We speak with you and, where useful, selected team members.

> The focus is simple: understanding where progress still depends on you, where things slow down, and what needs to change first.

> Once it’s clear where the pressure sits, we help you put the right structure around people. This is about creating roles with real ownership, clear judgement, and defined outcomes.

> We support role design, hiring strategy, and assessments, including behavioural and practical tools that reduce the risk of mishires. We can support or run interviews with you, depending on what you need.

> The result is people who can carry work properly, make decisions, and reduce how much comes back to you.

> As the business grows, what once worked often starts to strain. We review how work flows day to day, where friction builds, and where effort is being duplicated or wasted.

> We help reset workflows, priorities, and standards. This can include process design, automation opportunities, and documenting how critical work should run so execution becomes more predictable as volume increases.

> The aim is simple: growth stops creating more mess, and momentum continues without constant intervention.

**for-smes**

> We review how money actually moves through the business today. That includes revenue drivers, pricing logic, margin by product or client, cost structure, working capital, and how reliably cash is collected.

> We look at where profit is leaking, where effort is not converting into margin, and where growth is creating pressure instead of strength. This often includes reviewing receivables, cost creep, pricing consistency, and operational drag that is quietly eroding results.

> The outcome is clarity on what is really driving performance month to month, what needs tightening first, and where predictability can be restored.

> As SMEs grow, pricing often lags behind reality. Products, clients, and services evolve, but prices stay flat, inconsistent, or driven by instinct rather than evidence.

> We analyse your pricing across clients, products, and contracts, looking at contribution margin, delivery effort, variability, and risk. This includes identifying where work creep exists, where clients are underpriced, and where value is being given away unintentionally.

> We help you design pricing logic that matches how your business actually operates. That may include tiered pricing, client segmentation, minimum fees, usage-based elements, or clearer rules around discounting and scope.

> The result is pricing you can defend, margins you can predict, and growth that increases profit instead of diluting it.

> What worked at a smaller size often starts to strain as volume increases. Processes become inconsistent, work is duplicated, priorities compete, and execution becomes noisy.

> We review how work actually flows across teams, where friction builds, and where effort is being wasted. We reset workflows, clarify priorities, define standards, and document how critical processes should run.

> This can include process redesign, automation opportunities, and creating operating rhythm so execution becomes more predictable as complexity increases.

> The aim is simple: growth stops creating chaos, and momentum continues without constant firefighting.

---

## 1z. Your new subtitles removed the line that said which service to buy

One sentence, because it is the only thing in this batch that changes what a page
does rather than how it reads.

Your three new P&L owner cards replaced both lines: the title **and** the line
underneath that named the service delivering it, so *"Through an extended
Operational Clarity Audit"*, *"Through fractional Chief of Staff support"* and
*"Through Build and Place and Technology Builds"* are all gone, and three of your
four P&L cards now route a reader nowhere. Your corporate innovator card kept its
routing line, *"Through Fractional Leadership Services..."*, which is why that one
still does.

**Do you want the service line kept underneath your new subtitle?** If so we put
all three back under your wording, and nothing you wrote changes.

---

## 1aa. One paragraph taken off /for-smes, kept word for word — **for Iram**

**This is her copy, removed on Saif's instruction. It is not a cut for length.**

The three cards on `/for-smes` are the same shape: a heading, a green line naming
the service that delivers it, and a grey box giving the duration and when people
usually come to it. Card 2 had a fourth thing the other two did not, a paragraph
of prose sitting directly under its green line, so one card in three looked
different from its neighbours.

It survived the earlier strip by accident rather than by decision. The prose on
the other cards sat inside a column the strip targeted; this one sits outside it,
straight under the heading, so the change went round it.

The paragraph, in full:

> We look at contribution margin, delivery effort, variability and risk across
> every client, product and contract, then design pricing logic you can defend,
> rather than pricing that was set once and never revisited.

It is spec 5.2 copy, and it is the clearest sentence on the whole site where the
actuarial background is doing visible work: contribution margin, variability and
risk are an actuary's vocabulary, on the page that sells pricing. Nothing else on
the site makes that connection explicit.

**Restoring it is one line.** The question is whether the pricing card should be
allowed to carry more than the other two, or whether all three should carry a
paragraph. Either is buildable; the current state is the third option, which is
none of them.

`check-content` holds this as a decision, so the paragraph cannot return by
accident without the failure naming this entry.

---

## 1ab. The About page rebuilt from slides 21 and 22, and everything it removed — **for Iram**

**This is the largest removal on the branch. Nothing is lost; all of it is below,
word for word.**

`/about` is now her redesign: hero, who we are, the team, the bench, the case
studies, the CTA. That structure is not a reading of the slides. It is the
literal section order of `req/pp-about-v2_2.html`, which carries the same page in
markup and whose own comments read NAV, HERO, ABOUT, TEAM, BENCH, CASE STUDIES,
CTA. There is no 6.1 in it, no four capabilities, and no roles layer.

**Why the deck wins.** The deck is dated 22 August; the copy document is version
1.7.1 and predates it. That is the same precedence already applied to spec 3.6
(1w) and How We Work (1x), on her own comments. Applied here it removes more,
because the redesign replaces a whole page rather than one section.

**What she did not say.** She did not write "delete 6.1" or "delete the four
capabilities". She sent a redesign that has neither. Building the redesign and
keeping the removed sections underneath it would have produced a page neither
document describes, so the removal follows from the instruction rather than from
a judgement about the copy. **It is still a removal of her copy, and it is
section 26 of `docs/FOR-IRAM-outstanding.md` for that reason.**

`check-content` holds it as a decision and fails if any of it renders again.
`audit-spec-copy` carries one `EXPECTED_ABSENT` entry per section rather than one
per block, so the condition that brings each back is written once.

### Gone: spec 6.1, "Why Pivot Prime exists", all four blocks

> **Why Pivot Prime exists**

> Sitting on an executive committee, you see exactly where value is won or lost:
> in the gap between what leadership decides and what actually gets delivered.

> Large corporates have entire layers of people to close that gap. The businesses
> driving this region's growth, the founder-led companies, the mid-sized firms
> scaling fast, and the international businesses arriving here, mostly do not.
> They feel the cost of it directly on the P&L.

> Iram Kauser spent sixteen years closing that gap inside large organisations.
> Then she built Pivot Prime to close it for the businesses that need it most and
> have nobody to do it.

The "Read the full interview" link to the West Asia piece went with it. It is
still in the proof bar on the homepage, so the interview is not off the site.

**6.1 is tagged NEW in the copy document**, which means it was written in
deliberately and had never appeared on the old site. Of everything in this
entry, this is the block most likely to be wanted back.

### Gone: spec 6.2's four capabilities, and their four explanatory paragraphs

The heading:

> At Pivot Prime, we bring four things into every engagement

The four, each of which was also a card and then a longer paragraph:

> • We structure problem solving — We take problems that feel tangled and surface
> the full picture, making sure nothing important is missed. We help leaders see
> gaps, dependencies, and risks that are often overlooked when everything is
> treated as one big issue.

> • We embed operational discipline — We put structure behind execution through
> clear ownership, decision frameworks, and practical operating rhythms. Standard
> ways of working are defined so progress does not depend on individual heroics
> or constant follow up.

> • We enable data tracking — We build practical dashboards based on the data and
> KPIs that actually matter for your business. These dashboards give leaders a
> reliable way to track progress, spot issues early, and make informed decisions
> without digging through spreadsheets.

> • We understand human behaviour — Strategies only hold when they fit the
> culture, capacity, and motivations of the people expected to deliver them. We
> work with how teams actually operate under pressure, how leaders influence
> action, and where resistance or fatigue shows up.

And the line under them:

> We help unlock the version of the business that is possible when structure,
> people, operations, and data work together: Your Prime State.

**Two consequences worth knowing.** This is KEEP content from the live site under
6.2, so it is the second time this branch has removed something the document says
to keep. And "We understand human behaviour" was the corrected spelling spec 2.5
asks for, so **that correction now has nothing on the site to apply to** — 1b's
2.5 table changes from "Applied" to "no longer applicable" for row 6.

### Gone: spec 6.3's roles layer, all five seats

> **How we staff an engagement**
> One senior operator, and a bench built around the five things that most often break.

> A business rarely stalls for one reason. It stalls because the numbers are not
> owned, or because delivery is not being driven, or because manual work has
> quietly consumed the team, or because the operation finally works and nobody is
> being told about it.

> So the bench is built around those. We bring in only what the diagnosis
> actually justifies, and we manage whoever we bring.

> **The finance seat: fractional CFO** — Founder-led businesses almost always
> outgrow their bookkeeping before they outgrow their accountant. Cash, runway,
> forecasting, collections, board and investor reporting, and readiness for the
> next raise. The CFO layer is what turns a business that is growing into a
> business that can prove it.

> **The delivery seat: project management** — A plan that nobody owns day to day
> is a plan that quietly does not happen. The project manager sits inside the
> client team and drives the order and project lifecycle, the suppliers, the
> timelines and the documentation, so that execution does not depend on the
> founder chasing it.

> **The technology seat: engineering and automation** — Once the process is
> clear, a great deal of it usually does not need a human at all. Custom
> automation, CRM and workflow build, dashboards and reporting. Always scoped
> after the diagnosis, so we build at the constraint rather than over the parts
> that already work.

> **The demand seat: marketing and brand** — Fixing the operation raises the
> ceiling. It does not by itself fill the room. Positioning, go-to-market and the
> client-facing material that carries it, for the point at which the business is
> finally ready to be bought at scale.

> **The digital seat: web** — Website design, build and maintenance. Used where
> the shopfront no longer matches the business behind it.

The seats themselves are not off the site: spec 4.3 puts the same five on
`/services/build-and-place`, in full, and that page is untouched. What is gone is
the version of them on About.

### Gone: the old hero, and the two relocated homepage sections

The hero it replaced:

> **From pressure to Prime State**
> Not traditional consultants, we are your execution partners.
> We have worked inside complex systems, managing targets, navigating real constraints, and carrying responsibility for results.
> We have also stepped back as advisors, to question what actually drives progress when effort is high but outcomes are not changing.
> Pivot Prime exists because we have lived both sides. We understand what it takes to move work forward when plans meet pressure, people, and reality.

Her new hero says the same thing in eleven words, which is presumably why she
rewrote it.

**And the two sections moved here from the homepage** under 2.4, which now have
no home on either page:

> We do not just understand your challenges. We fix what's really holding your business back.

> We have sat in the system. Now we help reshape it.

That reopens 2.4. They were moved here rather than deleted specifically so they
would survive; the redesign has no slot for them. **They are off the site
entirely until she says where they go.** This is the one item in this entry that
is a genuine loss rather than a replacement, and it is called out separately in
her file.

### What was added

Saif Ur Rehman is on the page. He was deliberately absent from the team section
on his own instruction and is now included, also on his own instruction. He is on
slide 21 with a title and a biography, so no permission question arises that did
not already arise for the other two.

His card renders initials rather than a photograph. Her slide draws all four as
initials; we hold photographs for the other three and use them.

**Justin and Khushi were already published**, since the team build on 24 August.
The rebuild changes their layout, not their status. The written confirmation that
each is happy to appear has still not arrived, and section 5 of her file said
"none is published" until today, which had been wrong for a day and would have
told her the opposite of what her own site shows. Corrected.

---

## 2. Spec contradictions, logged and worked around

### 2.1 The fractional service slug — **logged, decided**

The spec gives two URLs for one page:

- §2.1 "New URLs required" lists `/services/fractional-coo`
- §4.2 defines the page as `/services/fractional-leadership`, and the §3.4 card button points there

**Decided:** hold `/services/fractional-coo`. The slug and the nav label match, and
it is the term searched in this market. The H1 stays "Fractional Leadership" as
§4.2 wrote it, because the page covers COO, Chief of Staff and CFO seats. A
permanent redirect from `/services/fractional-leadership` means either link
resolves. Iram to be told, not to be waited on.

### 2.2 The Chief of Staff anchor — **resolved, built**

§4.2 instructs "build the three anchors: `#coo`, `#chief-of-staff` and `#cfo`",
then eleven lines later labels the same seat `#cos`.

**Built.** `#chief-of-staff` is canonical. `#cos` is aliased, along with
`#fractional-coo` and `#fractional-cfo`, so a link written from either reading of
the spec lands on the right seat. Resolution lives in `src/lib/seat-anchors.ts`
as a pure function with tests.

The seats are an interactive tab set, so the fragment selects the seat rather
than only scrolling to it: `/services/fractional-coo#cfo` opens the CFO seat when
opened cold, and selecting a seat rewrites the fragment so the URL is shareable.

Iram may still want to know the spec says two different things, since the same
inconsistency will be in any link she has already sent out.

### 2.3 Persona headlines: spec against mockup — **client**

§§5.1 to 5.4 say to keep the existing persona H1s verbatim, describing them as
the strongest writing on the site. `req/pivotprime-persona-pages.html` carries
four completely different ones.

| Live and in this repo (spec says keep) | Mockup |
|---|---|
| You've created something real. | You're a founder, and everything still depends on you. |
| Revenue is increasing, but margins are uneven. | You are running an SME that is growing but not settled. |
| You're carrying delivery, risk, and outcomes | You're expected to drive results, but you are alone in the execution. |
| You are responsible for the whole system. | You are accountable for the P&L, across teams, markets and moving parts. |

**Built as:** the spec version, the live copy. If Iram confirms the mockup is the
later approval, the swap is one line per page. Saif is asking her directly.

### 2.4 Two homepage sections with no place in the spec order — **logged, relocated not deleted**

The homepage currently carries two sections that do not appear anywhere in the
3.1 to 3.12 running order:

- "We don't just understand your challenges. We fix what's really holding your business back"
- "We've sat in the system. Now we help reshape it."

**Decided:** neither is deleted. Both move into the About page content under §6.1,
where "We've sat in the system" reads as authority copy rather than homepage
filler. The homepage renders the twelve specified sections and nothing else.
Iram can veto the move without anyone rewriting copy.

---

## 3. Build deviations found in the existing code

### 3.1 The deep diagnostic screen structure — **REOPENED by her 12 August email, see 1j-a**

Deep spec §8.2 says "One domain per screen, seven statements visible together,
with a progress indicator showing six steps." The implementation interleaved
instead, round-robining across all six domains so every page mixed all six.

**Built to spec.** Six domain-titled screens of seven statements each.

The straight-lining risk that the interleave was reaching for is handled without
breaking §8.2: statement order is randomised **within** each domain screen, per
session. Seven near-identical statements in a fixed column is what invites a
straight run down one point of the scale, and shuffling inside the block removes
that without moving a statement between domains.

Scoring is unaffected. Statements now carry a stable, spec-derived id, so the
exported answers key on identity rather than on the position a statement happened
to render at. Re-run comparison holds and the twelve short-instrument anchors
still map.

### 3.1a The six discarded thematic page titles — **client, if wanted**

The interleaved layout carried six thematic section titles. They belonged to a
structure where a page genuinely had no single subject, and they appear in
neither the website spec nor the diagnostic document, so they are not sanctioned
copy. Section titles are now the domain names from spec §7.1.

Recorded here in case Iram wants them back as section furniture, for example as a
strapline under the domain name:

1. How the business runs today
2. Where the money actually goes
3. What happens under pressure
4. Who owns what
5. What the numbers tell you
6. What is holding the ceiling down

Note they were written against the old page order, so they do not map one to one
onto the six domains as they now stand.

### 3.1b One deep statement had drifted from the spec — **corrected**

Deep spec statement 10 reads "What sales commits to is consistently what
**operations** can actually deliver." The repo had "what **delivery** can
actually deliver", which also reads awkwardly against its own verb. Corrected to
the spec wording while moving the pool into `src/lib/diagnostic/statements.ts`.

Flagged because it is a change to an instrument statement, not to marketing copy.
It is not an anchor, so no short-instrument comparison is affected.

### 3.3 The patterns animation — **for Iram**

The spec asks for each pattern to type onto the screen. It has been built so the
patterns **reveal one after another, with the reading rhythm intact and pausing
when you hover**, rather than being typed out letter by letter.

The reason is search. A typed effect only puts each sentence on the page as it
finishes typing it, which means all ten patterns are missing from what Google
reads. This way the words are present for search engines and for anyone whose
browser blocks animation, and the section still reveals itself line by line as
you scroll to it.

If it does not feel right once you see it, that is a conversation rather than a
fault, and there are other ways to get closer to the original idea without
hiding the copy.

### 3.4 The patterns treatment: 3.5 and 11.4 contradict each other — **logged**

Spec 3.5 says the alternation between bold green and grey italic "stays. It is
the visual rhythm of the section." Spec 11.4 says the opposite: "Set every item
in the same weight and colour. The alternation currently reads as half the list
having failed to load."

Resolved towards the v1.7.1 annotation, which is the most recent instruction and
addresses both: "Main heading black, eyebrow bright green and then the sentences
can be a mix of all the greens including the darkest green." The items are one
weight in a mix of palette greens, so there is rhythm without the grey italic
that 11.4 objects to.

### 3.5 Case studies are stacked, not a carousel — **logged**

Spec 3.8 says "Keep all three case studies and the existing carousel", then
immediately "try to make them scroll better and look better if we can, I think
currently they look ugly", with a blunter annotation in v1.7.1. Spec 11.3
separately records that the site's carousels clip their second card and read as
a rendering error.

**Stacked.** Nothing is hidden behind an interaction, nothing clips, and all
three studies are in the server-rendered HTML rather than one being visible and
two waiting on JavaScript. The same component renders them on the homepage and
on /about, so the two cannot drift.

### 3.2 Joint-constraint reporting is narrower than the spec — **logged**

Deep spec §4.4 says "where two are within three points of each other, present
them as joint". The implementation only ever marks the second-ranked domain as
joint with the first. Two domains tied at ranks three and four are not marked.
Low impact, since the report leads on the primary constraint, but it is not what
the spec describes.

---

## 4. Colours

### 4.1 The six off-palette values — **resolved**

All six are resolved and applied. The palette stays at five.

| Hex | Was | Now |
|---|---|---|
| `#093524` | Dark section background on 8 files | Collapsed to `#013325`. The two differ by 8 on red and 2 elsewhere, the same colour typed twice |
| `#4fb968` | Homepage sub-headings | Replaced by context, not by value: `mid` on light, `neon` on dark, which is the mockups' own `.g` / `.ondark .g` rule |
| `#123e2d` | Card surface on dark | `rgba(255,255,255,.05)`, derived from forest |
| `#21533e` | Card border on dark | `rgba(255,255,255,.14)` |
| `#164b36` | Card hover | `rgba(255,255,255,.08)` |
| `#21352b` | Marquee divider | `rgba(255,255,255,.14)` |

Spec 3.9 tags the persona cards KEEP. That covers the design intent of the
cards, not the four hexes someone reached for to build them, so deriving the
surfaces from the forest token sits inside the tag rather than against it.

### 4.2 The mockups disagree with each other on the neon — **logged**

`req/pivotprime-diagnostic-deep v2 mock up.html` declares `--neon:#22c55e`.
Every other mockup declares `--neon:#00d76d`, and `#00d76d` is what the swatch
plate in the copy spec shows. This is a mockup inconsistency, not a developer
error: the deep diagnostic was built faithfully to a mockup that was itself off.

**Standardised on `#00d76d` site-wide.** Worth telling whoever produced the
mockups, so the next export does not reintroduce it.

### 4.3 Deliberately off-palette — **enforced**

`#25D366` on the floating WhatsApp button is Meta's mandated brand green. It is
registered in `scripts/palette-allow.json` with the reason, and carries a comment
at the usage site, so nobody "fixes" it to `--color-neon` in three months.

### 4.4 Three leftovers not covered by the six — **open, low priority**

These predate the rebuild, live only in `globals.css`, and were not part of the
six resolved above, so they have not been touched.

| Token | Hex | Reached through |
|---|---|---|
| `--color-primary-dark` | `#008744` | `hover:bg-primary-dark`, used site-wide on buttons |
| `--color-dark` | `#121212` | No current usage found |
| `--color-light` | `#f5f5f5` | No current usage found |

`--color-primary-dark` is the live one: it is the hover state on every primary
button. The mockups do hover with opacity rather than a second green, so the
consistent fix is to drop the token and hover on alpha. Not done unasked,
because it changes every button on the site.

---

## 1am. The five result figures are now live, overriding the Section 9 table — **for Iram**

**What changed.** The five figures on the homepage results cards were empty for
weeks and are now published:

| Card | Figure |
| --- | --- |
| Execution | +7% |
| Process Efficiency | 40-60% |
| Customer Retention | +13% |
| Profit Growth | +27% |
| Transaction Speed | 67% |

**Where they came from.** Your own `pivot-prime-kpi-cards_3.html`, and your deck
comment confirming that the HTML was provided so these cards could be built.
You authorised them verbally on 27 August 2026.

**What they override.** Spec 3.3 says "IRAM TO CONFIRM the five ranges above
against the master table in Section 9 before they go live", and Section 9 lists
different values for four of the five. Only Transaction Speed matches. Your
mockup and your deck are being treated as the later and more specific
instruction, so the table no longer governs these five numbers.

**How to undo it.** Every value sits in one place, `METRICS` in
`src/content/homepage.ts`, as a `figure` for the drawing and a `figureText` for
the printed value. Changing a number, or emptying one, is a one-line edit per
card and nothing else moves.

Card 6, bespoke builds, still has no figure from anyone and still does not
render, per spec 3.4's "Do not launch this card with a placeholder."

---

## 1an. The homepage now publishes a fee, a percentage and the formula — **for Iram**

**What is on the page.** A slider in the fees section. You move it to the saving
or gain agreed with the client, anywhere from AED 100,000 to AED 2,000,000, and
it shows two figures:

- **The fixed element, AED 20,000**, which does not change.
- **The results element, 10 to 20% of the slider value.** At AED 400,000 that
  reads AED 40,000 to 80,000.

Under it: "The fixed element covers the work. The results element is only earned
if the agreed number moves."

**What it overrides.** Two instructions in your own document, each of which bars
it on its own:

- Spec section 1: "One price only appears on the site: the Operational Clarity
  Audit floor. No other figure and no upper limit appears anywhere."
- Spec 3.10: "Do not publish a specific percentage or a formula here."

The slider publishes a second price, an upper limit, a percentage and the
arithmetic that joins them.

**Authority.** Your verbal instruction on 28 August 2026. **Pending your written
confirmation.** Nothing else on the site was changed to match it.

**How to undo it.** The whole block is `src/components/FeeCalculator.tsx`. The
range, the step, the default, the fixed element and the two percentages are five
constants at the top of that file. Removing the component from the homepage
leaves the fees section exactly as it was.

---

## 1ao. AED 20,000 and AED 15,000 are both on the site and cannot both be right — **for Iram**

The new fixed element is **AED 20,000**. The Operational Clarity Audit floor is
**AED 15,000**, and it is still stated in five places:

| Where | How it reads |
| --- | --- |
| Homepage, fees section answer line | "The Operational Clarity Audit starts at AED 15,000" |
| `/services` | "From AED 15,000" on the audit card |
| `/services/operational-clarity-audit` | "From AED 15,000", and in the page's search description |
| `/for-founders` | "Through an Operational Clarity Audit. From AED 15,000." |
| `/for-smes` | "Through an Operational Clarity Audit. From AED 15,000." |

A reader moving between the homepage and any service page sees two different
starting prices for what looks like the same thing. **Nothing has been changed.**
Which of the two is correct, and whether they describe the same fee at all, is
yours to settle. Once you say, it is a one-line edit in each place.

Authority for publishing AED 20,000 while AED 15,000 stands: your verbal
instruction on 28 August 2026, pending written confirmation. See [1an](#1an).

---

## 1ap. Nurture is our own product, published in your case studies — **for Iram, and pending Kieran**

**What is on the site.** A new case study, Nurture, placed first on the homepage
and on `/about`, ahead of Cinnacare. It describes a UAE childcare app: shared
daily care logs, translated messaging, a family timeline, role-based access for
parents, nannies and drivers.

**Two things about it are different from every other card.**

1. **It is not a consulting engagement.** Nurture is a product our own
   technology team built. Written like the other studies it would read as
   advisory work done for a client, which is not what happened. The card
   therefore carries one line — "Built by our technology team." — directly under
   the headline. Nothing on it claims a Pivot Prime engagement.
2. **Permission is not yet in writing.** Naming the app, describing it, linking
   to nurtureuae.com and using its screenshot are all pending **Kieran's written
   confirmation**. It is live now on the verbal go-ahead of 28 August 2026.

**What it deliberately does not say.** It does not say the app is downloadable
or listed on any app store. Nurture's own site currently uses placeholder store
links, so no availability claim can be supported. Every fact on the card comes
from nurtureuae.com and nowhere else.

**How to undo it.** The whole study is one entry at the top of
`CASE_STUDIES` in `src/content/case-studies.ts`. Deleting that entry removes it
from both places and renumbers the rest automatically.

---

## 1aq. Nurture carries no figures at all, and why that is a different reason from the others — **for Iram**

Every other case study shows results with the number withheld: the claim is
written out, and the figure waits for the Section 9 master table to be settled.
Nurture is not that case. **No number has been produced for it by anyone.**

So its five result lines are capability statements rather than results awaiting
a figure: the activities hub, the AI meal planning and caregiver cookbook,
Nurture Academy, development tracking, and the PDPL and encryption position.
Each is a true statement about what the product does, and none of them implies a
measurement.

If verified numbers for Nurture exist, send them and they go in the same slot the
other cards use. Until then the card claims capability and not outcome, which is
the only honest form it can take.

---

## 1ar. Every service page trimmed to its hero, and all the copy below it preserved here — **for Iram**

**What changed.** On 28 August 2026, on your instruction, all five service pages were cut to what sits above the "Why this exists" heading: the hero, the scoped line, the CTAs and the one section directly beneath them. Everything below that point was removed from the page.

**None of it is lost.** It is all spec 4.x copy and it is all reproduced below, word for word, so any of it can be put back. The strings are still in `src/content/services-detail.ts` — nothing was deleted from the content file, only from the pages that rendered it. Restoring a block is re-adding the section that read it.

**The content checks were not deleted.** Four assertions covered copy that is now gone. They have been rewritten to assert the removal instead, so if a section reappears without your say-so the check fails and names this entry. See `scripts/check-content.mjs`.

### Operational Clarity Audit — `/services/operational-clarity-audit`, spec 4.1

**after**

> The audit ends with a decision, not a filing cabinet. Some clients take the roadmap and execute it themselves, and that is a legitimate outcome. Most ask us to run some or all of it, which is where the fractional COO retainer, a placed project manager, CFO or engineer, or a technology build comes in. We will tell you plainly which of those the findings actually justify.
>

**afterHeading**

> What happens after
>

**get**

> An as-is versus to-be map of how work runs today and exactly what changes
>
> A findings report with every gap ranked by risk and by effort
>
> A prioritised roadmap: what to fix now, what can wait, what will move results
>
> A baseline set of measurements that the improvements will later be judged against
>
> A costed view of what to fix internally and what needs outside capacity
>
> An executive summary written for owners and investors, not only for operations
>

**getHeading**

> What you get
>

**how**

> One-to-one interviews with the people doing the work, not only the leadership team. Private conversations surface what people will not say in a room.
>
> Process mapping end to end. A facilitated workshop per function, where the team walks the process on screen and stress tests it together, so the findings are owned rather than imposed. Direct observation where it helps.
>

**howHeading**

> How we do it
>

**look**

> The commercial model, pricing, and margin by product, client or service
>
> The P&L, cost structure, working capital and how reliably cash is collected
>
> How work actually flows day to day, and where it stalls, duplicates or reverses
>
> Which decisions route through the founder, and which of those genuinely need to
>
> Roles, ownership and accountability, and where they are unclear
>
> Where automation or AI would remove real cost, and where it would only add another tool
>
> Data: what is captured, what is trusted, and what leaders are actually deciding on
>

**lookHeading**

> What we look at
>

**pricing**

> Sometimes the constraint is not the process, it is the price. We look at contribution margin, delivery effort, variability and risk across every client, product and contract, then design pricing logic you can defend.
>
> This runs either as part of a full audit, or as a standalone piece of work where pricing is clearly the problem.
>

**pricingHeading**

> Pricing and margin engagements
>

**scopeLine**

> Scope depends on the size of the business, how many functions are in review, and how many people we interview. A single-site founder-led business sits at the lower end. A multi-division operation with fifty or more staff is a larger piece of work.
>

**why**

> Every business has a theory about why growth is harder than it should be. Usually the theory is wrong, or it describes a symptom of something further upstream.
>
> Leaders carry an idealistic picture of how the business works. The people doing the work know what is actually possible. The gap between those two pictures is where almost every operational problem lives. The audit closes it with evidence rather than opinion.
>

**whyHeading**

> Why this exists
>

### Fractional Leadership — `/services/fractional-leadership`, spec 4.2

**why**

> Most growing businesses do not need a permanent executive. They need executive-level expertise for a defined period: someone senior enough to design the operating model, build the processes, set the standard for how things should run, and hold the delivery week to week.
>
> Every seat works the same way. We build the structure, then hand it to someone cheaper to run. A COO builds the operating model and hands the day to day to an operations lead. A Chief of Staff establishes the operating rhythm and decision rights, then leaves them running without needing a person to enforce them. A CFO builds the reporting, forecasting and controls, then hands them to a finance manager or your accountant.
>
> In each case you keep the senior judgement without carrying a full-time executive salary, and the structure keeps working long after the intensive phase ends.
>
> We add seats as demand justifies them.
>

**whyHeading**

> Why this exists
>

### Build and Place — `/services/build-and-place`, spec 4.3

**cards**

> Project management
>
> Runs delivery inside your team: the order and project lifecycle, supplier and stakeholder coordination, SLA and timeline tracking, and documentation that outlives the engagement. Used where the plan is clear and the problem is that nothing is being driven.
>
> Finance
>
> Fractional CFO support: board and investor reporting, cash, runway and forecasting, collections and credit control, statutory reporting, and readiness for the next round. Used where the founder feels the absence of a finance seat every single week.
>
> Technology
>
> Engineers who build the automation, the CRM, the dashboards and the internal tools. Scoped after the diagnosis, never before it. If the work is a standalone build rather than an embedded seat, see Technology Builds.
>
> Marketing and brand
>
> Positioning, go-to-market, and the client-facing material that carries it. Used where the operation has been fixed but the business still is not being bought.
>
> Web and digital
>
> Website design, build and maintenance, and the digital estate around it. Used where the shopfront no longer matches the business behind it.
>

**priced**

> We scope the work with you, agree the days and what good looks like, and put it into a single proposal. You pay Pivot Prime and we pay the delivery partner. If the full team is not affordable, we reduce the scope rather than quietly reducing the quality of who we put in front of you.
>

**pricedHeading**

> How it is priced
>

**rolesHeading**

> The seats we place
>

**scopeLine**

> Priced on the roles, the days a month and the length of the engagement.
>

**why**

> Most consultancies sell advice and leave the client to execute it. We place people inside the business and stay accountable for the outcome.
>
> Everyone we place is sourced, vetted and managed by us. They report to us rather than to you, which means you are not carrying the recruitment risk, the performance management, or the awkward conversation if it is not working. One contract, one invoice, one accountable party.
>

**whyHeading**

> Why this exists
>

### Technology Builds — `/services/technology-builds`, spec 4.4

**bringUsTheProblem**

> Bring us the problem
>
> An app you want built, or a process that is eating your team.
>
> Either works. The only technology work we take on is the kind pointed at a real problem.
>

**capabilityGrid**

> Websites and digital estate
>
> Websites: design, build, maintenance and the digital estate around them
>
> CRM builds
>
> CRM build and configuration, including migration from spreadsheets and inherited systems
>
> Business process automation
>
> Workflow automation across sales, operations, finance and fulfilment
>
> Dashboards and reporting
>
> Dashboards and management reporting, so decisions are made on numbers rather than instinct
>
> Systems integration
>
> Integrations between the systems you already pay for and are not getting value from
>
> Internal tools
>
> Internal tools and custom applications where nothing off the shelf fits
>
> AI integrations and agents
>
> AI agents and assistants, where they remove real cost rather than add a feature
>
> Agentic web applications
>
> Web applications that carry out a task end to end rather than presenting a form and waiting.
>
> Mobile applications
>
> Native and cross-platform apps, where the work genuinely happens away from a desk.
>

**capabilityHeading**

> Nine things we build, and one rule about when we build them
>

**capabilityNote**

> Every one of these is scoped against a defined problem first. We do not start a build to find out whether it was needed.
>

**howItRuns**

> We scope the build against a defined problem and agree what it has to change. We build it, test it with the people who will actually use it, and hand it over with documentation rather than a demo. If you want us to run and maintain it afterwards, we can. If you want to own it outright, you own it, including the code.
>

**whereThisStarts**

> If you already know what you need built, we can start there. If you are not certain the technology is the actual constraint, start with an Operational Clarity Audit, and we will tell you honestly whether a build is the right answer.
>

### UAE Market Entry — `/services/uae-market-entry`, spec 4.5

**build**

> Entity structure, licensing and regulatory approvals
>
> A full financial model: investment, breakeven, return, and pricing built for this market
>
> Product and regulatory compliance, so what you sell can legally be sold here
>
> Commercial real estate and office fit-out
>
> Hiring, with local market HR expertise
>
> Manufacturing, logistics and supply chain
>
> Brand localisation and go-to-market
>
> The operating model, and the people to run it once you are live
>

**buildHeading**

> What we build
>

**close**

> We take clients from a licence to a functioning, properly priced operation that can actually succeed here. If the model says it will not, we would rather tell you before you spend the money than after.
>

**closeHeading**

> Where it ends up
>

**misconception**

> The most common assumption is that a business which works elsewhere can be copied into Dubai. Almost nothing pastes cleanly.
>
> The regulatory position changes depending on whether you sit in a free zone or on the mainland. Consumer habits are different: this is a market that lives on delivery apps, expects service levels that would be considered premium elsewhere, and buys through community and word of mouth as much as through marketing.
>
> The commercial calendar is different too. Ramadan reshapes trading for a month, and a large part of your customer base leaves the country over the summer, so a plan built on twelve even months will miss badly. Heat changes how logistics, storage and footfall work for half the year. And the culture rewards relationships and patience, so businesses that arrive expecting to transact at home-market speed stall in ways they cannot explain.
>

**misconceptionHeading**

> The misconception
>

### The three seat panels on Fractional Leadership

The COO, Chief of Staff and CFO panels went with the section that held them. Their content is in `SEATS` in `src/components/services/Service2FractionalLeadership.tsx`, which is untouched: it is the rendering that was removed, not the copy. Its removal is what the three `id="coo"`, `id="chief-of-staff"` and `id="cfo"` assertions now record.


---

## 1as. One rule for paired elements, applied site-wide — **for Iram**

**The rule, set on your instruction of 28 August 2026.** Wherever two elements
sit side by side as a pair, they are visually opposed: one white, one green, and
**the green one is always on the right**.

For two-button toggles, the position decides the colour and not the state: the
left button is white with dark text and the right is light green with dark text,
whichever one is pressed. The pressed one is marked by a ring and a heavier
weight. The old behaviour swapped both fills on every click, so the control
inverted as you used it and read as two different controls.

Where a pair sits on the dark forest panel, the fills stay in that panel's own
tone rather than going literally white, so nothing floats.

The rule now lives in one component, `src/components/PairToggle.tsx`, so any new
toggle inherits it rather than restating it.

**Update, 28 August 2026.** The capability grid on Technology Builds — the nine
things we build, with the note beneath it — has been **restored in full**, in its
original position and with its original treatment. It sat below the "Why this
exists" heading and the blanket cut took it with the trailing prose. It was never
the target.

The rule as the client actually intended it: **remove the trailing prose sections
that explain the philosophy behind the service; keep everything that tells a
visitor what the service is, what it includes, or what they get.** Measured
against that rule, the cut took substantive content from all five pages, not just
this one. The audit of what went from each is in
[1at](#1at-what-the-blanket-cut-actually-took-from-each-service-page--for-iram).

---

## 1at. What the blanket cut actually took from each service page — **for Iram**

Measured against the rule as you meant it — remove the trailing philosophy prose,
keep anything that says what the service is, what it includes or what you get —
here is what went from each of the five. **Nothing below has been restored except
the Technology Builds capability grid.** Say which of these you want back.

### Operational Clarity Audit

| Removed | Verdict |
| --- | --- |
| "How we do it" and "What happens after" — the designed two-part section | **Substantive.** It is how the audit runs and what lands at the end. |
| `whyHeading` + `why` | Philosophy. Correct target. |
| `lookHeading` + `look` — seven things we look at | **Substantive.** What the audit covers. |
| `howHeading` + `how` | **Substantive.** How it runs. |
| `getHeading` + `get` — six deliverables | **Substantive.** What you get. |
| `afterHeading` + `after` | **Substantive.** What happens next. |
| `pricingHeading` + `pricing` | **Substantive.** How it is priced. |

The "What we look at / What you get" columns directly under the hero survived, so
the page still says what the audit covers. Everything else above did not.

### Fractional Leadership

| Removed | Verdict |
| --- | --- |
| The three seat panels — COO, Chief of Staff, CFO, each with "What the seat covers" | **Substantive, and the core of the page.** It is the only place that says what each seat does. |
| "How it runs" | **Substantive.** |
| `whyHeading` + `why` | Philosophy. Correct target. |

### Build and Place

| Removed | Verdict |
| --- | --- |
| The columns section | **Substantive.** |
| The closer section and its CTA | Closing prose plus a call to action. |
| `whyHeading` + `why` | Philosophy. Correct target. |
| `rolesHeading` + `cards` — the roles we place | **Substantive.** What the service includes. |
| `pricedHeading` + `priced` | **Substantive.** How it is priced. |

### Technology Builds

| Removed | Verdict |
| --- | --- |
| The capability grid, nine tiles plus the note | **Substantive. RESTORED 28 August.** |
| "How it runs" and "Where this starts", with "Bring us the problem" | **Substantive.** How to start and what we take on. |
| The closing CTA | Call to action. |

### UAE Market Entry

| Removed | Verdict |
| --- | --- |
| The columns section | **Substantive.** |
| The closer section and its CTA | Closing prose plus a call to action. |
| `misconceptionHeading` + `misconception` | Philosophy, arguably. It is the argument for the service rather than its content. |
| `buildHeading` + `build` — eight things we build for entry | **Substantive.** What you get. |
| `closeHeading` + `close` | Closing prose. Correct target. |

**In short:** on every one of the five, the cut took content that answers "what
is this and what do I get", not only the trailing explanation. The full text of
every removed block is preserved in [1ar](#1ar).

---

## 1au. The supporting line on each result card has been removed — **for Iram**

On your instruction of 28 August 2026 the result cards were cut to a compact strip: the small label, the figure, the headline and the visual. **The supporting sentence under each headline is no longer rendered on any of the five.** It is your copy, from spec 3.3, so it is preserved here word for word.

| Card | The sentence that no longer appears |
| --- | --- |
| Execution | Decision rights, operating rhythm and delivery ownership rebuilt. |
| Process Efficiency | Processes mapped end to end and redesigned around how the work actually flows. |
| Customer Retention | Service cancellation drivers identified and addressed. |
| Profit Growth | Pricing, margin and commercial model redesigned. |
| Transaction Speed | End to end customer and transaction workflows mapped and rebuilt. |
| Bespoke Builds | Custom systems, CRMs, dashboards and automations built for clients. |

The strings are still in `METRICS` in `src/content/homepage.ts` as the `context` field, untouched. Putting them back is one line in `KpiCards`, not a retype.

Card six, bespoke builds, still does not render at all, so its line was never on the page.


---

## 1av. The results section is your own design file now — **for Iram**

`req/pivot-prime-kpi-cards_3.html` has been reproduced as the results section:
five cards in a grid, one column below 600px, two from 600 and three from 900,
so the five land as three across and two beneath. Your card, your label with its
lit dot, your 96px visual well, your metric with the figure in bright green and
the unit in cream, your name line and your supporting line under a hairline rule.

**The rotating carousel is gone.** Everything it went through — the shapes, the
pills, the ellipse, the progress bar — was ours and none of it was in your file.

**Four things in your file we did not reproduce exactly.**

1. **The amber.** Your "before" blocks on Process Efficiency, and the "before"
   bar on Transaction Speed, are `#c49040`. The standing instruction is that this
   section carries no brown or gold, so both are drawn in the same green at the
   lower weight. Your contrast survives as one hue at two weights. **Say the word
   and the amber goes back.**
2. **The typeface.** Your file sets the figures in Syne 800 and the body in
   Inter. The site is Poppins throughout. The size, weight, line height and
   letter spacing are matched exactly; the letterforms are not.
3. **The looping particles.** Your execution card runs three dots round the track
   on an infinite loop. The brief here was that each visual animates once on
   arrival and then rests, so the track draws itself once instead.
4. **Three lines of your copy differ**, because the site carries the spec 3.3
   wording and your design file carries a shorter version of the same idea:

   | Your file | The site |
   | --- | --- |
   | Less duplicated work, rework & waste | Reduction in duplicated work, rework and inefficiency |
   | Increase in profit margin | Increase in profit |
   | End-to-end workflows mapped and rebuilt. KYC completion cut from 10 days to 3. | End to end customer and transaction workflows mapped and rebuilt. |

   Yours is tighter and the card would be shorter with it. Tell us which wins and
   it is a one-line change each.

**One thing to know about the height.** Five cards in a grid is 685px at 1440
against 180px for the single rotating strip it replaces, so this section is
taller than it was an hour ago. It is your design, and it shows all five results
at once rather than one every two and a half seconds.

**KYC figures.** Your Transaction Speed card publishes "10 days avg." and
"3 days". They are in your design file, so they are on the page, on the same
authority as [1am](#1am): your file overrides the Section 9 table.

---

## 1aw. Industry is now a required field on the contact form — **for Iram**

**What changed.** A required Industry dropdown sits between Work email and the
message box, with fourteen options: Insurance, Financial services, Fintech,
Retail and consumer goods, Wellness and healthcare, Fragrance and beauty,
Logistics and supply chain, Real estate and construction, Professional services,
Technology and SaaS, Manufacturing, Hospitality, Education, Other. Choosing
Other reveals a short text box, which is then required too.

The industry appears in the enquiry email, in its subject line, and in the
autoresponder the sender receives.

**One line of copy changed.** The contact standfirst said "Name and email is
enough to start", which stopped being true. It now reads **"Three fields is
enough to start."** The rest of the sentence is unchanged. That half-sentence is
ours, not the spec's, so replace it if you would put it differently.

---

## 1ax. No gold or tan anywhere, and the build now enforces it — **for Iram**

Gold had come back twice: as the small heading colour on the Operational Clarity
Audit page and as the "before" tint on comparison panels. Every warm value has
been removed site-wide and replaced with palette greens or neutrals.

**Two of your ten swatch values are now deliberately not tokens at all:**
`#9f7a3d` and `#e8d7b5`. They are in your swatch and we do not use either, so
rather than leave them defined and rely on nobody reaching for them, they are
gone and the palette guard fails the build on any use of them.

`scripts/lint-palette.mjs` now rejects any gold or tan hex anywhere in the code,
including in the files the older rule skipped — which is where both relapses
happened. It matches by closeness to the known values and by shape, restricted to
the yellow-orange band so a terracotta warning colour is not mistaken for gold.

**Also on that page:** the "What we look at" and "What you get" columns are a
comparison pair, so they now follow the site rule — white on the left, green on
the right. They were two unfilled columns with a gold heading each.

---

## 1ay. Insights built from your five files — **for Iram**

`/insights` and four article pages are built from `pp-insights_3.html` and
`pp-blog-1` to `pp-blog-4`, delivered 29 August. **Every word is yours**, lifted
out of your files by a script rather than retyped, and checked back against them:
112 of 112 strings match, and 74 assertions confirm your copy and your metadata
are in the served HTML with JavaScript switched off. Your titles, descriptions
and keywords go into each page exactly as you wrote them.

**Your slugs are kept.** Your files cross-link each other as
`/blog/consultant-leaves`, `/blog/technology-process`, `/blog/decisions-layers`
and `/blog/margin-revenue`. Those four names are unchanged, moved under
`/insights`, and `/blog` and `/blog/*` now redirect, so any link you have already
sent still works.

Insights is back in the top navigation and in the sitemap, and the `noindex` is
gone. All three were only there because the page had no articles on it. **1k is
closed.**

### Four things need a decision from you

**1. The "Growth" tab is not shown, and comes back on its own.** Settled 29
August. Your six categories are Execution, Leadership, Technology, Finance and
Growth; your four pieces cover the first four, so a Growth tab would open an
empty list. Growth is still in the content module and the rendered tabs are
worked out from the articles that exist, so **publishing one Growth article
brings the tab back with no code change.**

**2. Your ten "Browse by topic" items stay as plain labels.** Settled 29 August:
they are exactly as your file has them. Every one points at `href="#"` in your
file, there is no topic archive behind them, and a link that goes nowhere is
worse than a label that was never one.

**3. The subscribe form delivers by email, and stays that way.** Settled 29
August. The address is validated, it reaches `hello@pivotprime.ae`, and the
subscriber gets a confirmation. It is not stored in a list, because the site has
no database and no email platform beyond the one that sends the contact form.
This is what the rest of the site does and it works today. A real mailing list
remains available later as a separate decision and cost.

**4. Your category tabs filter, and that is confirmed.** The script in your file
moves the underline and nothing else, so on your page every tab showed every
article. They filter now, confirmed 29 August. Every card stays in the page
either way, so with JavaScript switched off all four articles are readable.

### Your five extra colours, mapped

Your files name five values outside the ten-colour palette. Each is mapped to the
nearest thing already on the site, measured rather than judged by eye:

| Yours | Where you use it | Mapped to | Renders | Difference |
|---|---|---|---|---|
| `#f5f5f3` | page background | the site's page ground | `#f8f4ee` | 5.9 |
| `#ffffff` | cards, filter bar | `shell` | `#fefbf8` | 5.9 |
| `#0a1a12` | body text | `foreground` | `#000000` | 33 |
| `#4a6657` | secondary text | `forest` at 75% | `#40655a` | 10.2 |
| `#dde6e0` | borders and rules | `forest` at 12% | `#e0e3df` | 4.2 |
| `#001f14` | behind the featured photo | `forest` | `#013325` | 26.3 |

Your `#013325`, `#00d76d` and `#009f50` are already exact palette values and are
untouched. A sixth value, `#2a3d31`, is in your article files but not on the list
you gave: it is your article body text, mapped to `forest` at 85%.

**Your em dashes are kept.** Your copy uses 28 of them and the house style rule
from spec section 1 bans them. Your signed-off copy outranks a rule we set for
copy we write ourselves, so the rule now carries a recorded exception for your
words only.

**Your featured photograph** is the Pexels image hard-coded in your file. It is
copied into the site rather than loaded from Pexels on every visit, so the page
does not depend on their servers and no reader's address is passed to them.

---

## 1az. Process efficiency is now 43% — **for Iram**

Changed on your instruction of 29 August, from the `40-60%` range that came from
your KPI mockup. It is updated in the figure, in the label inside the drawing,
and in the check that pins the five authorised figures.

**The drawing was redrawn to match**, on your instruction of 29 August: four
wasted blocks of ten rather than five, so the picture and the label agree. The
marked bracket moved with them, so the span it brackets is the same four blocks
it shades.

**This settles a contradiction** your own master table flagged: it carried
"40 to 60%" in one row and "10 to 40%" in another and marked the row as needing
resolution before launch. 43% supersedes both.

---

## 1b0. Her WhatsApp instructions of 29 August — **for Iram**

**Your "#ef" was incomplete.** It matches no colour we were offered as an
option: cream is `#fefbf8` and mist is `#e8f4ec`, and neither starts with "ef".
The only value in your ten-colour palette that does is **linen `#efeae0`**. Saif
chose **cream `#fefbf8`** for every instance, so that is what has shipped. If you
meant linen, it is one line to change.

### The three case studies

**Nurture** and **Cinnacare** now have one list each instead of two. The separate
results panel is gone on those two cards, which also means each now has one "The
Results" heading rather than two.

Nurture went from nine points to six. "An activities hub" and "Nurture Academy"
are one bullet, as you asked. Care logs and photo sharing were combined, and so
were meal planning and development tracking.

**Cinnacare:** "Two countries set up and compliant, UK and UAE simultaneously" is
removed on your instruction. **Worth knowing:** that was the only line on the
card saying the two launches happened at the same time, which is what the
headline claims. The headline now carries it alone. Say the word and it comes
back.

**The Instagram figures are new and are not in your section 9 master table.** The
rule on this site is that result figures come from that table and nowhere else.
"800 views to 30,000 views" is published on your direct instruction, recorded
here the same way your five KPI figures were, so it is reversible.

**Scentmatic** keeps its two sections, because you asked to merge only Nurture
and Cinnacare. Its four results are your words. **This replaces "Zero tax
liability identified in year one through the UAE structure"**, which was the only
tax point on the card. You said replace, so it has gone. It can come back as a
fifth point.

Websites added: **cinnacare.com** and **scentmatic.co.uk**, both labelled "Visit
the site" to match "View the product" on Nurture. The Scentmatic photograph was
being cropped from its top edge, which cut the machine off below the middle; it
is centred now. The crop is set per card, so the Nurture phone screenshot still
shows the top of its screen.

### The fees box

The box is cream, and it runs wider than before, to the widest width this layout
uses. Your bright green bar and its writing are kept. The two comparison boxes
are now exactly the same height: the traditional model is white, ours is cream.
The calculator and the "If we haven't" line are both cream, and that line now
runs straight across the bottom instead of sitting beside the calculator.

**One thing you should know.** Everything written in that box was white or bright
green because the box was dark green. On cream, bright green is unreadable, so
the small labels are now the mid green used for every other small heading on a
light background. Measured, that green on cream is **3.35:1 against a 4.5:1
requirement** for small text. It is the same value already used site-wide, so
this is not new, but it is below standard. Moving those labels to dark green
would fix it and would lose the green accent. Your call.

The logo strip cards are back to the faint tint they had before the light green
round, with the writing still dark green.

---

## 1b1. One results section per case study — **for Iram**

You spotted the duplicate on Scentmatic. **It was on seven of the nine case
studies, not one.** Here is what was actually there before this change:

| Case study | "The Results" headings |
|---|---|
| Nurture | 1 |
| Cinnacare | 1 |
| Scentmatic | **2** |
| Financial Services Company | **2** |
| Founder-Led Business | **2** |
| Fitness and Wellness Company | **2** |
| Professional Services | **2** |
| Retail and Consumer | **2** |
| Technology and SaaS | **2** |

**Nurture and Cinnacare were the only two that were already correct**, and only
because merging their two lists on 29 August emptied the second one. Every other
card had both sections. The cause was the rename: the left-hand section was "The
pivot" until you renamed it "The Results", and the green panel below it was
already called that.

**The green panel is the section that survived**, on every card. Two reasons: the
four points you sent for Scentmatic were already in it, and it is the only place
a figure and the Verified badge appear at all. Four of your case studies publish
a figure there, including 67%, 13% and 17%.

**Scentmatic:** your four points are now the whole list. The three older points
in the left column are gone, on your instruction.

**Everywhere else nothing was deleted.** The two lists were joined, in the order
of what we did and then what it produced, so the anonymised studies keep every
point they had. Their lists are now six to eight points long.

**Your sentence above each list is kept.** It used to sit above the section that
has gone, so it moved into the panel with the list it introduces.

All nine cards now have exactly one results section, confirmed on the live site.

---

## 1b2. Reverted to the previous colours, and the service pages restored — **for Iram**

**Your shorthand.** You write `#ef` and `#fef`. Checked against your ten-colour
swatch: **`#ef` can only be linen `#efeae0`** and **`#fef` can only be cream
`#fefbf8`**. Nothing else on the swatch starts with either. That reading is used
throughout, and it corrects the round before this one, where `#ef` was read as
cream.

**1. The colours are back.** The site-wide lightening of the dark cards is
undone: all 53 cards are `#013325` again, exactly as before. It is one value in
one place, so it can be moved back the other way in a line.

**2 and 3. Everything cut from the five service pages is back**, along with a
sign-off section at the foot of each one. The 28 August cut was wrong and you
said so twice.

**The three seat panels on Fractional Leadership had to be recovered from the
version history**, because the record here preserved only "Why this exists" for
that page. They are now in the content file rather than only in the markup, so a
change to the page cannot take the words with it again. All three are on the page
at once: the version before the cut hid two of the three behind a tab, which meant
they were invisible to search engines.

**On Technology Builds you never asked for a removal at all.** Your instruction
was to change the order. Everything is back, and the current order is in the
report so you can tell us the order you want.

**4. Fractional Leadership:** the section is `#efeae0`, the "Your Team" boxes are
`#efeae0`, and the phase tags stay in the darkest green. The phase cards are light
again: they and the Pivot Prime box inside them were both dark green, so that box
had no visible edge.

**5. Paired boxes:** left white, right light green, never dark green.

**6 and 7. The fees box** is `#efeae0` with your bright green bar and its writing
kept. The traditional model is white, the Pivot Prime model is `#efeae0`, the
calculator and the "If we haven't" line are cream `#fefbf8`, the box runs the full
width and that line runs across the bottom.

**One conflict in your message.** Item 6 asks for the quote box on the right in
`#efeae0`; item 7 asks for the two lower boxes inside the fees box in cream
`#fefbf8`. They are the same box. Cream was used, because item 7 describes where
it sits. Say the word and it becomes `#efeae0`.

**8. The photo could not be added.** There is no photograph of Saif in the working
folder. The file there, `WEBSITE PHOTO.jpg`, is byte for byte the same image as
the one already on Iram's card. Sending Saif's portrait is all that is needed.

**Still worth knowing:** the small labels in the fees box measure about 3.3:1
against a 4.5:1 requirement, because mid green on a light ground is faint. Dark
green would fix it and lose the green accent.

---

## 1b3. A duplicate on Technology Builds, and two more found — **for Iram**

The 29 August restore put sections back without checking whether the page already
carried them. On **Technology Builds** that meant the seven capability lines
appeared twice: once in the nine-card grid and again in a "What We Build" list
below it. **The lower one is removed.** The grid higher up is untouched.

**Two more, found by checking the other four pages and left in place for you to
decide:**

**Operational Clarity Audit.** The restored spec lists overlap the two columns
already under the hero. Three of the seven "what we look at" lines and two of the
six "what you get" lines are word for word the same in both places. The rest
differ slightly: the columns carry a shortened version and the restored section
carries your full spec wording. Either the columns go, or the restored section
goes, or the columns keep the short version and we accept the overlap.

**UAE Market Entry.** Your closing line, "We take clients from a licence to a
functioning, properly priced operation that can actually succeed here", appears
twice: once as its own section and once in the new sign-off at the foot, because
that sign-off was written from your own closing copy. One of the two should go.

**Checked and clean:** Fractional Leadership and Build and Place. Every restored
block on those two appears exactly once.
