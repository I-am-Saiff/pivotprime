/**
 * The client's twelve-question diagnostic. Her file is the specification.
 *
 * SOURCE: /Users/saif/pivotprime/diagnostic/pp-diagnostic_5 (1).html, with the
 * report layout in pp-all-reports (1).html. The domain commentary, checks and
 * offer are byte-identical across both of her files, so there is one copy of
 * them and it is this one.
 *
 * GENERATED FROM HER FILE, NOT TYPED. Her data blocks are valid object literals,
 * so they were parsed and emitted rather than transcribed. Every case in
 * docs/PENDING-COPY.md section 1c came from hand entry, including one that
 * reduced a named and priced service to a common noun.
 *
 * TWO EDITS TO HER STRINGS, both required by house rules she set:
 *
 *   EM DASHES. Nine of them across ten positions, converted one at a time to a
 *   comma, a colon or a full stop as the sentence needed. Section 1 of her
 *   document bans them and scripts/lint-copy.mjs fails the build on one. Her
 *   wording is otherwise untouched, word for word.
 *
 *   DOMAIN NAMES to sentence case, matching the 1 September change that took
 *   the rest of the site off Title Case. "Founder Dependency" becomes "Founder
 *   dependency". The statements, bands and body copy keep her capitalisation.
 *
 * WHAT IS NOT HERE. The 42-statement instrument in src/lib/diagnostic/ is a
 * different and longer thing that predates this. It stays parked and untouched.
 * PENDING-COPY 1e0.
 */

export type DomainId = "fd" | "pd" | "cm" | "dv" | "pa" | "tl";

export type Question = { domain: DomainId; text: string };
export type ScalePoint = { value: number; label: string };
export type Band = { min: number; max: number; label: string; desc: string };
export type DomainContent = { commentary: string; checks: string[]; offer: string };

/** Her presentation order: one question per domain, twice through. */
export const QUESTIONS: Question[] = [
  { domain: "fd", text: "If the founder were uncontactable for two weeks, the business would continue without disruption." },
  { domain: "pd", text: "Our core processes are documented well enough that a new person could follow them." },
  { domain: "cm", text: "We know our profit margin by product, service or client, not just overall." },
  { domain: "dv", text: "I can see how the business is performing this month without asking someone to prepare it." },
  { domain: "pa", text: "Every important outcome in the business has one clearly named owner." },
  { domain: "tl", text: "Our systems reduce manual work rather than creating more of it." },
  { domain: "fd", text: "Decisions below a certain value are made without needing the founder to approve them." },
  { domain: "pd", text: "Work is delivered on time without someone having to chase it." },
  { domain: "cm", text: "Our prices were set deliberately and have been reviewed in the last twelve months." },
  { domain: "dv", text: "When two people in the business report the same number, they agree." },
  { domain: "pa", text: "The team has the capacity to absorb the growth we are planning." },
  { domain: "tl", text: "Information moves between our tools without anyone re-entering it manually." },
];

/** Her five-point scale. The value is what the score is built from. */
export const SCALE: ScalePoint[] = [
  { value: 0, label: "Strongly disagree" },
  { value: 1, label: "Disagree" },
  { value: 2, label: "Neither agree nor disagree" },
  { value: 3, label: "Agree" },
  { value: 4, label: "Strongly agree" },
];

export const DOMAIN_ORDER: DomainId[] = ["fd", "pd", "cm", "dv", "pa", "tl"];

/** Sentence case, per the 1 September change. Hers are Title Case. */
export const DOMAIN_NAME: Record<DomainId, string> = {
  fd: "Founder dependency",
  pd: "Process and delivery",
  cm: "Commercial and margin",
  dv: "Data and visibility",
  pa: "People and accountability",
  tl: "Technology leverage",
};

export const BANDS: Band[] = [
  { min: 0, max: 39, label: "Constrained", desc: "The business is being held back in more than one place at once." },
  { min: 40, max: 64, label: "Straining", desc: "The business works, but it is absorbing effort it should not need to." },
  { min: 65, max: 84, label: "Stable", desc: "The foundations hold. One area is limiting what the rest could do." },
  { min: 85, max: 100, label: "Built to Scale", desc: "Structurally sound. The constraint is likely to be demand rather than operations." },
];

export const DOMAIN_CONTENT: Record<DomainId, DomainContent> = {
  fd: {
    commentary: "When growth depends on the founder being present for every significant decision, it creates a ceiling that neither investment nor effort can raise. The founder becomes the bottleneck in their own business, unable to step back far enough to work on it rather than in it. Over time this erodes the team's confidence in acting without approval, and the business loses the organisational muscle it needs to scale. The cost is not always visible in a single quarter, but it compounds.",
    checks: [
      "List every decision you made last week that someone else could have made. For each one, write down why it came to you instead of being handled by the team.",
      "Check whether your team has written clarity on what they are authorised to decide without your sign-off. If they do not, drafting that document is this week's task.",
      "Identify one recurring process that only works reliably when you are present, and this week, teach someone else to own it completely.",
    ],
    offer: "The Operational Clarity Audit begins by mapping every decision that sits with the founder by habit rather than by design. We redesign the delegation structure, document the authority framework, and work with the team until they are genuinely operating independently in the areas where the founder's time is most expensive. For founder-dependent businesses, this is typically where the largest gains are available fastest.",
  },
  pd: {
    commentary: "When core processes live in people's heads rather than in documented systems, every departure becomes a delivery risk and every growth hire takes longer to become productive. The business can be excellent at what it does while remaining structurally fragile: dependent on the specific people who happen to be there right now. In practice this means delivering consistently requires constant supervision, clients experience variability they cannot predict, and the team spends energy improvising rather than executing.",
    checks: [
      "Pick your most important recurring deliverable and ask whether a capable person joining this week could produce it at your standard, using only what is currently documented. If the answer is no, that documentation does not yet exist.",
      "Review the last time something was delivered late or incorrectly, and trace it to its root cause. In most cases it will point to a handoff or a step that was never clearly defined.",
      "Ask three team members independently to describe the same core process. The gaps between their answers show you exactly where the documentation work needs to begin.",
    ],
    offer: "The Operational Clarity Audit maps how work actually flows through your business, not how it is supposed to on paper, but how decisions are made, where handoffs happen, and where the team invents workarounds because the official process does not reflect reality. We then redesign the core processes and stay until they are documented, adopted, and running without us.",
  },
  cm: {
    commentary: "A business can grow revenue consistently while quietly eroding the margin that makes growth worth having. Pricing set without a current view of costs, discounts given without tracking their cumulative effect, and contracts never reviewed against a cost base that has since changed all contribute to a gap between what the business turns over and what it actually keeps. That gap is almost always larger than leadership expects when it finally gets measured properly, and it compounds year on year until someone looks closely enough to see it.",
    checks: [
      "Pull the last three months' numbers and calculate your actual gross margin by service line or client type. Compare it to what you expected. If there is a gap, it will show you exactly where to look.",
      "Identify the last pricing decision your business made, and check whether it was based on your current cost structure or on a number that was set some time ago and has not been revisited.",
      "List the clients or services where you have a sense that the margin is thinner than it should be. Quantify that suspicion this week. The number will tell you what to prioritise.",
    ],
    offer: "The Operational Clarity Audit includes a structured margin review: mapping pricing decisions against current costs, identifying where discounting has become habitual, and finding the contracts and relationships where the commercial terms no longer reflect what the business is worth. Our fractional CFO works directly inside your numbers, not from a spreadsheet we hand back to you to implement.",
  },
  dv: {
    commentary: "When a business leader cannot see how the business is performing without asking someone to compile the data, decisions are always made on information that is already out of date. The problem is rarely that the data does not exist, it almost always does, but that it lives in formats that require assembly rather than inspection. This creates a lag between what is happening and what leadership can respond to. In a competitive market, that lag has a real cost. It also means that when two people discuss performance, they are often working from different numbers without realising it.",
    checks: [
      "Try to answer the following without asking anyone to prepare anything: what is the business's revenue this month so far, and what is the margin on that revenue? The friction you experience in getting that answer shows you exactly what the problem is.",
      "Identify the most important operational metric in your business and track how long it currently takes to produce it on demand. Anything over 24 hours is worth addressing.",
      "Find a number that appears in more than one report or is produced by more than one person. Check whether it is consistent across sources. If it is not, that inconsistency is eroding confidence in your own data.",
    ],
    offer: "The Operational Clarity Audit designs the reporting infrastructure your business needs to run on current information rather than historical summaries. We establish the handful of metrics that actually matter, connect them to the systems that hold the data, and build the dashboard that gives leadership a real-time view without manual preparation. The goal is visibility that requires no one to ask.",
  },
  pa: {
    commentary: "In most businesses that struggle with accountability, the problem is not that people do not care: it is that ownership has never been made explicit. When outcomes have sponsors and contributors but no single named owner, the natural human tendency is to assume someone else is holding the thread. Important things fall through gaps that nobody created intentionally, and when they do, it is genuinely difficult to establish what went wrong because responsibility was distributed rather than assigned. The highest performers feel this most acutely, and they do not stay long in environments where it persists.",
    checks: [
      "Take the three most important things your business is trying to achieve in the next 90 days. Write down, for each one, the single person who will be accountable if it does not happen. If you cannot write one name for each, the accountability does not yet exist.",
      "Look at something that was supposed to happen last month and did not. Be honest about whether there was a single owner, and whether that person knew they were the owner.",
      "Talk to two or three of your strongest performers and ask them directly: do they feel that their authority matches their accountability? Their answer will tell you something important about retention risk.",
    ],
    offer: "The Operational Clarity Audit restructures how outcomes are owned inside your business: mapping every critical deliverable to a single accountable person, redesigning the meeting and review cadence so that accountability is visible rather than assumed, and building the performance framework that lets good people do their best work without chasing clarity they should not need to chase.",
  },
  tl: {
    commentary: "Technology that was supposed to reduce work and has instead added to it is one of the most common and least-discussed drains on operational capacity in growing businesses. The tools are usually not the problem: the problem is that they were implemented before the process underneath them was properly designed, which means the software is running on a broken foundation. The result is low adoption, workarounds that have become normalised, and data that moves between systems because someone copies it rather than because the systems are connected. This absorbs hours of productive time every week across the team and is rarely captured in any single number.",
    checks: [
      "Ask the team to name the biggest manual task they do regularly that they expected a tool to handle for them. Their answer will show you where the technology gap is in practice rather than on paper.",
      "List the tools the business currently pays for. For each one, estimate what percentage of its available functionality the team actually uses. Anything below 40 per cent is worth a conversation about why.",
      "Identify anywhere information is manually re-entered from one system into another. Estimate the time this takes across the team each week. That number is the minimum value of fixing the integration.",
    ],
    offer: "The Operational Clarity Audit maps the technology stack against the actual processes it is supposed to support, identifies where tools were built on top of unclear workflows rather than clean ones, and redesigns the operational foundation before recommending any new system or integration. Our technology lead works directly inside the business, not as an external advisor, which means the changes actually get implemented.",
  },
};
