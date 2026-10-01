/**
 * Insights: her copy, verbatim.
 *
 * Transcribed from the client's own approved files, pp-insights_3.html and
 * pp-blog-1.html through pp-blog-4.html, delivered 29 August 2026. Every string
 * below was lifted out of those files by a script rather than retyped, so the
 * words, the punctuation and the line breaks are hers. Nothing here is written
 * by us and nothing is paraphrased.
 *
 * HER EM DASHES ARE DELIBERATE. Spec section 1 bans the em dash and
 * scripts/lint-copy.mjs enforces it. Her final copy uses 28 of them. Copy she
 * has signed off outranks a house style rule we set for copy we write
 * ourselves, so this file and the article bodies carry a reviewed exception in
 * scripts/copy-lint-allow.json rather than being silently rewritten.
 *
 * HEADINGS ARE SEGMENTS, NOT HTML. Her h1s carry a line break and one phrase in
 * neon. Storing the raw HTML would mean dangerouslySetInnerHTML on client copy,
 * so each heading is an array: { t } is plain text, { em } is the green phrase,
 * { br } is her line break. The renderer walks it.
 *
 * THE THREE SEPTEMBER ARTICLES CAME LATER, from her v3 slide 10 and the page it
 * links to. They are generated from that page the same way; see the comment
 * above them in ARTICLES. Their slugs are the ids her page gives them.
 *
 * SLUGS ARE HERS. Her own cross-links between the four articles already use
 * /blog/consultant-leaves, /blog/technology-process, /blog/decisions-layers and
 * /blog/margin-revenue. Those four slugs are kept exactly and moved under
 * /insights, with /blog/* redirecting, so no link she has already sent breaks.
 */

/** A run of heading copy: plain text, her accent phrase, or her line break. */
export type Segment = { t: string } | { em: string } | { br: true };

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  /** Optional: her August files carry keywords; her September page carries none. */
  metaKeywords?: string;
  headline: Segment[];
  deck: string;
  author: { initials: string; name: string; role: string };
  body: ArticleBlock[];
  /** href defaults to /contact. The September CTA points at the diagnostic. */
  cta: { headline: Segment[]; body: string; button: string; href?: string };
  moreLabel: string;
  more: { slug: string; tag: string; title: string; cta: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "consultant-leaves",
    tag: "Execution",
    date: "August 2026",
    readTime: "6 min read",
    metaTitle: "The consultant leaves. The problem stays. | Pivot Prime",
    metaDescription: "Why most management consulting engagements in the UAE and Gulf fail at execution, and what business leaders should look for instead.",
    metaKeywords: "management consulting Dubai, execution partner UAE, strategy execution, business consulting Gulf, business transformation Dubai, operational excellence UAE, strategy implementation consultant, why consultants fail",
    headline: [{ t: "The consultant leaves." }, { br: true }, { em: "The problem stays." }],
    deck: "Why most management consulting engagements end at the slide deck, and what that gap costs you.",
    author: { initials: "IK", name: "Iram Kauser", role: "Founder and CEO, Pivot Prime" },
    body: [
    { type: "lead", text: "Every senior leader has been here before. An external team is brought in, asks the right questions, runs the workshops, and produces a set of recommendations that genuinely capture what needs to change. The logic is sound, the presentation is polished, and everyone in the room nods. Then, in the weeks that follow, something quietly happens: nothing." },
    { type: "p", text: "The deck gets filed. The team returns to running the business the way it ran before. A few actions are assigned, some of them move forward, most stall as the urgency of the day-to-day reasserts itself. Three or four months later, the leadership team is in the same conversation they were having before the engagement started, except now they have spent a significant amount of money and time to get back to exactly where they were." },
    { type: "p", text: "This is not a strategy failure. In most cases the strategy was sound. It is an execution failure. It happens not because the advice was wrong, but because advice alone does not create change in an organisation. It never has and it never will." },
    { type: "h2", text: "The structural flaw in traditional consulting" },
    { type: "p", text: "Traditional management consulting models are built around two things: diagnosis and prescription. They are genuinely good at identifying what needs to change. They are not structured, commercially or operationally, to make it change. The moment an engagement concludes, full accountability for implementation transfers to the client team. That team was already stretched before the project started, was managing the business throughout, and often had limited involvement in the thinking behind recommendations they are now expected to own and act on." },
    { type: "p", text: "The incentive structure of advisory work makes this almost inevitable. A consulting engagement ends when the deliverable is produced, not when the outcome is achieved. The firm's reputation rests on the quality of the analysis and the clarity of the recommendations. What happens after the final presentation is, structurally, someone else's problem." },
    { type: "quote", text: "\"A diagnosis without a treatment plan that actually gets administered is just an expensive piece of paper, however good the diagnosis was.\"" },
    { type: "p", text: "This is not a criticism of the people involved in these engagements, many of whom are excellent thinkers. It is a criticism of the model. When business transformation is treated as a project that ends at delivery rather than a process that ends at results, the gap between strategy and execution becomes almost impossible to close from the inside alone." },
    { type: "h2", text: "What execution actually requires" },
    { type: "p", text: "Organisations that successfully close the gap between strategy and delivery share a few characteristics that have nothing to do with the quality of their strategic thinking. They have someone accountable for outcomes, not outputs. They have a feedback loop tight enough to catch problems before they compound. And they have decision-making that sits close enough to the work that it can respond to what is actually happening, not to what was predicted six months ago." },
    { type: "p", text: "Building these things requires someone in the room, not quarterly, not monthly, but regularly enough to understand the texture of the problem and adjust in real time. It requires people who have both the strategic context and the operational experience to know which moves to make in which order. And it requires an honest assessment of what the business is actually capable of absorbing at any given moment, not what looks best on a roadmap." },
    { type: "p", text: "None of this is delivered by a presentation. It is delivered by presence, accountability, and sustained engagement with the problem until it is actually solved." },
    { type: "h2", text: "What changes when someone owns the outcome" },
    { type: "p", text: "The difference between advising and executing shows up most clearly in how recommendations are designed. When you know you will not be there during implementation, it is easy to prescribe a best-practice approach. When you know you have to make it work inside the actual business, with the actual team, under the actual constraints the organisation faces, your thinking changes. You ask different questions. You make different tradeoffs. And you produce recommendations that are more honest about what is genuinely achievable and in what timeframe." },
    { type: "p", text: "The accountability shift matters too. When the people responsible for designing the plan are also the people responsible for delivering it, the feedback loop compresses dramatically. Problems surface faster and get addressed while they are still small. Progress is measured against outcomes, not activity. And the team inside the business develops capability through working alongside people who are genuinely delivering, not briefing them on what to do." },
    { type: "quote", text: "\"The gap between strategy and delivery is not closed by better slide decks. It is closed by people who stay in the problem until it is solved.\"" },
    { type: "h2", text: "The question worth asking before you engage anyone" },
    { type: "p", text: "If you are evaluating external support for a business challenge, whether that is an operational improvement, a growth push, a structural change, or a turnaround situation, there is one question worth asking clearly before you commit: will the people I am speaking to now still be here when it is time to make this work?" },
    { type: "p", text: "If the answer is no, you are purchasing advice. That may be exactly what you need in some situations. But if what you actually need is for things to change inside your business, advice alone will not get you there. The execution has to be owned, and owned by people with genuine skin in the game." },
    { type: "p", text: "At Pivot Prime, we operate on one model only: we come in, we do the work, and we stay until we see results. That is not a marketing position. It is the only version of this work we believe is honest enough to offer." },
    ],
    cta: {
      headline: [{ t: "Ready to close the gap" }, { br: true }, { t: "in " }, { em: "your" }, { t: " business?" }],
      body: "The first conversation costs nothing. Not moving does.",
      button: "Book a call",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "decisions-layers", tag: "Leadership", title: "Why your decisions don't survive the layers", cta: "Read →" },
      { slug: "technology-process", tag: "Technology", title: "AI won't save a broken process. But fixing the process will.", cta: "Read →" },
    ],
  },
  {
    slug: "technology-process",
    tag: "Technology",
    date: "August 2026",
    readTime: "5 min read",
    metaTitle: "AI won't save a broken process. But fixing the process will. | Pivot Prime",
    metaDescription: "Why businesses in the UAE and Gulf are investing in AI and automation and seeing weak returns, and what needs to happen before technology can work.",
    metaKeywords: "AI business automation UAE, digital transformation Dubai, business process automation Gulf, CRM implementation UAE, AI consultant MENA, technology solutions Dubai, workflow automation UAE, business digitisation Gulf, AI strategy Middle East, process improvement Dubai, operational efficiency UAE",
    headline: [{ t: "AI won't save a broken process." }, { br: true }, { em: "But fixing the process will." }],
    deck: "Why businesses across the Gulf are investing in technology and seeing weak returns, and what actually needs to happen first.",
    author: { initials: "SR", name: "Saif Ur Rehman", role: "AI and Technology Solutions Lead, Pivot Prime" },
    body: [
    { type: "lead", text: "The most common conversation I have with business leaders across the UAE and wider Gulf goes something like this. They have invested in a CRM, a project management platform, a reporting dashboard, and at least one AI tool in the past twelve months. Adoption is uneven, the data coming out is unreliable, the team uses a fraction of the features available, and the problem that the technology was supposed to solve is still present. The conclusion they have usually reached is that they need better technology. The conclusion they should reach is almost always the opposite." },
    { type: "p", text: "The issue is rarely the software. It is what the software was asked to do, and what it found underneath when it got there." },
    { type: "h2", text: "Technology does not fix broken workflows. It accelerates them." },
    { type: "p", text: "When a business process is unclear, inconsistent, or poorly designed, introducing automation or AI into that process does not resolve the underlying problem. It exposes it, often faster and at greater scale than the manual version ever could. A CRM built on top of a sales process that nobody follows consistently will produce messy, low-quality data. An AI reporting tool connected to unreliable inputs will generate unreliable outputs with great efficiency. An automated workflow built around the way things are actually done, rather than the way they should be done, will entrench the wrong behaviour at speed." },
    { type: "p", text: "This is what I mean by the automation trap. Businesses in the Gulf are under real pressure to digitise and modernise, and that pressure is legitimate. The digital transformation taking place across the UAE and Saudi Arabia represents a genuine opportunity for businesses that approach it correctly. But the pressure to adopt creates a tendency to adopt in the wrong order: technology first, process second, which is roughly equivalent to fitting a faster engine to a car whose steering is broken." },
    { type: "quote", text: "\"The question is never which tool to implement. It is whether the underlying process is worth implementing a tool on top of.\"" },
    { type: "h2", text: "What needs to happen before technology can work" },
    { type: "p", text: "Before any meaningful automation or AI implementation, a business needs a clear picture of how work actually flows through the organisation today, not how it is supposed to flow on paper, but how decisions are actually made, where handoffs actually happen, where information gets stuck or distorted, and where the team invents workarounds because the official process does not reflect reality. That audit, done honestly, is frequently uncomfortable. It surfaces redundancies, unclear ownership, and bottlenecks that have been normalised over time. It also creates the foundation that makes technology genuinely transformative rather than merely expensive." },
    { type: "p", text: "Once the process is clear and designed correctly, the technology question changes completely. Instead of asking which platform is most popular or which tool the competitor is using, the question becomes much more specific: where in this workflow does automation reduce friction without removing necessary human judgment? Where can AI surface patterns or flags that a person would miss in the volume of data? Where does a connected system eliminate the manual re-entry of information that currently absorbs hours of productive time every week?" },
    { type: "p", text: "Those are answerable questions, and the answers lead to technology choices that are scoped tightly, adopted properly, and actually used by the team, because they solve a real, visible problem in a process the team already understands." },
    { type: "h2", text: "Why adoption fails even when the tool is right" },
    { type: "p", text: "One of the most consistent patterns in technology implementation across the region is low adoption despite high investment. The tool is good, the vendor is credible, the leadership team is committed, and six months after go-live, the team has reverted to spreadsheets and WhatsApp groups. This is almost never a training problem, though it is usually diagnosed as one. It is a design problem." },
    { type: "p", text: "When technology is implemented onto an unclear process, the team experiences it as adding complexity rather than removing it. They have to do what they were doing before, plus maintain the new system, which does not yet feel like it gives them anything back. The workaround is rational from their perspective, even if it defeats the purpose of the implementation from above. The solution is not more training on the tool. It is redesigning the process so that using the tool is the path of least resistance, not an additional burden on top of the real work." },
    { type: "quote", text: "\"Low adoption is almost never a training problem. It is a design problem, and designing backwards from the user's daily reality is the only fix that holds.\"" },
    { type: "h2", text: "Where AI genuinely creates a step change" },
    { type: "p", text: "For businesses in the Gulf and across MENA that have done the process work first, the technology upside is real and significant. AI applied to a clean, well-structured data environment can compress decision-making timelines, surface opportunities that would be invisible in manual analysis, and allow a smaller team to manage a volume of operational complexity that would previously have required significantly more headcount. Think of the routine administrative tasks that consume a large fraction of your most capable people's time without generating anything proportionate in return. Automating those alone can return meaningful hours to the business every week." },
    { type: "p", text: "The businesses that are seeing the strongest returns from digital transformation in this region are not necessarily the ones with the most sophisticated tools. They are the ones that designed their operations carefully before they built on top of them. They treated technology as the final layer, not the first move. As a result, everything they implemented actually worked." },
    { type: "p", text: "If your technology investments are not delivering what you expected, it is worth asking honestly whether the process underneath them was ready to support them. More often than not, that is where the answer lives." },
    ],
    cta: {
      headline: [{ t: "Process first." }, { br: true }, { em: "Then technology." }],
      body: "We design the operation before we build on top of it. That is the difference between technology that works and technology that sits unused.",
      button: "Talk to our technology team",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "consultant-leaves", tag: "Execution", title: "The consultant leaves. The problem stays.", cta: "Read →" },
      { slug: "decisions-layers", tag: "Leadership", title: "Why your decisions don't survive the layers", cta: "Read →" },
    ],
  },
  {
    slug: "decisions-layers",
    tag: "Leadership",
    date: "August 2026",
    readTime: "6 min read",
    metaTitle: "Why your decisions don't survive the layers | Pivot Prime",
    metaDescription: "How the hierarchy between local P&L owners and regional or group leadership erodes decision quality, slows execution, and costs businesses in the Gulf more than they realise.",
    metaKeywords: "P&L owner challenges UAE, multinational subsidiary management Gulf, regional CEO challenges, management layers corporate, business decision making Dubai, leadership large organisations, subsidiary autonomy Middle East, P&L management consulting, business execution Gulf, local CEO regional headquarters, corporate hierarchy challenges, business unit leadership UAE",
    headline: [{ t: "Why your decisions" }, { br: true }, { t: "don't survive " }, { em: "the layers." }],
    deck: "How hierarchy erodes decision quality, slows execution, and costs business unit leaders more than they realise, and what to do about it.",
    author: { initials: "IK", name: "Iram Kauser", role: "Founder and CEO, Pivot Prime" },
    body: [
    { type: "lead", text: "If you run a business unit, a regional subsidiary, or a P&L within a larger organisation, you likely know exactly what I am describing before I finish the sentence. You make a call. You communicate it clearly to your team. And somewhere between your desk and the people doing the work, the decision changes shape. It slows down, gets reinterpreted, escalates to someone above you in the regional or group structure, sits in an approval queue, and returns to you three weeks later as something that barely resembles what you originally decided. If it returns at all." },
    { type: "p", text: "This is one of the most corrosive and least-discussed problems in business unit leadership, and it compounds quietly over time in ways that are difficult to see clearly from inside the system. The market moves. The opportunity closes. The team loses confidence in their own ability to act. And the leader who was hired precisely for their judgment finds that their judgment, by the time it reaches the ground, has been diluted beyond recognition." },
    { type: "h2", text: "This is structural, not a people problem" },
    { type: "p", text: "The first thing worth saying clearly is that this is almost never about the individuals involved. The regional director who wants to sign off on your hiring decision is not being obstructionist. They are managing their own accountability in a system that holds them responsible for decisions they often have limited visibility into. The group function that requires four weeks of review before approving a new supplier is not being bureaucratic for its own sake. They are applying a governance standard that was designed, at some point, for a legitimate reason." },
    { type: "p", text: "The problem is that these layers accumulate over time and the organisation rarely pauses to ask whether the decision rights still match the decision speed that the market requires. What was a sensible governance structure for a business of a certain size and complexity becomes a friction machine as the business evolves, and the cost of that friction is paid at the unit level, by the leaders who are closest to the customer and the opportunity but furthest from the authority they need to act on it." },
    { type: "quote", text: "\"The organisation rarely pauses to ask whether the decision rights still match the decision speed the market requires. By the time it does, years of opportunity have already been lost.\"" },
    { type: "h2", text: "The hierarchy tax on your P&L" },
    { type: "p", text: "There is a real financial cost to slow decision-making that rarely shows up explicitly in a management report but is nonetheless present. When a pricing decision takes six weeks instead of six days, you have either missed the window entirely or ceded ground to a competitor who moved faster. When a key hire requires three levels of sign-off and a headcount justification that takes a month to produce, you lose candidates to businesses that can make offers in a week. When an operational change that you and your team can see is clearly necessary has to be translated into a business case, escalated, reviewed, modified, and returned, you have spent the equivalent of weeks of leadership time on a decision that should have taken hours." },
    { type: "p", text: "Multiply these delays across a year and the compounding effect on your business unit's performance is significant. Not as a single dramatic event, but as a slow, consistent drag on the speed and quality of what gets done, and on the quality of the people willing to work inside a system that moves this way." },
    { type: "h2", text: "Why the most capable people leave first" },
    { type: "p", text: "One of the less obvious consequences of excessive management layers is the effect on talent. The people with the most options are your highest performers, your most commercially sharp operators, the ones whose judgment you most rely on. They are also the ones who feel the constraint of a slow decision-making environment most acutely. They did not build their careers to spend them writing approval memos. When they calculate the ratio of their authority to their accountability, and find it badly out of balance, they begin looking for environments where that balance is better." },
    { type: "p", text: "What typically remains are people who have accommodated themselves to the pace of the system, which means the organisation's operational capability quietly degrades at exactly the moment it most needs to be sharp. This is not inevitable, but reversing it requires acknowledging the problem clearly rather than treating it as an unchangeable feature of operating inside a large organisation." },
    { type: "quote", text: "\"Your highest performers calculate the ratio of their authority to their accountability. When they find it badly out of balance, they leave. And they leave quietly.\"" },
    { type: "h2", text: "What can actually be done about it" },
    { type: "p", text: "The organisations that manage this well tend to have done a few things deliberately. They have mapped which decisions genuinely require escalation and which ones have simply accumulated approval requirements by habit rather than design. They have been honest about where the centre's need for oversight conflicts with the unit's need for speed, and have found structures that satisfy both rather than defaulting entirely to one or the other. And they have given their business unit leaders clear, written decision rights that are actually respected rather than theoretically granted but practically undermined." },
    { type: "p", text: "None of this is easy to do from inside the system, particularly when the leader who most needs it is also the one least positioned to renegotiate the terms of their own authority. It often requires someone who understands both the strategic logic of the corporate structure and the operational reality of the unit, and who can build the case for change in language that the centre can hear without feeling threatened by it." },
    { type: "p", text: "What it does not require is acceptance. The number of capable business unit leaders I have spoken with across the Gulf who have concluded that this is simply how large organisations work, and that their job is to navigate the system rather than improve it, is striking. The system is not fixed. Decision rights can be redesigned. Governance structures can be modernised. And business units that move at the speed of their market rather than the speed of their approval queue consistently outperform those that do not." },
    { type: "p", text: "The layers exist. But they do not have to be where your decisions go to die." },
    ],
    cta: {
      headline: [{ t: "Your decisions should" }, { br: true }, { t: "reach the ground " }, { em: "intact." }],
      body: "We work with P&L owners and business unit leaders to build the operating structures that let good decisions move at the speed the market demands.",
      button: "Book a call",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "consultant-leaves", tag: "Execution", title: "The consultant leaves. The problem stays.", cta: "Read →" },
      { slug: "technology-process", tag: "Technology", title: "AI won't save a broken process. But fixing the process will.", cta: "Read →" },
    ],
  },
  {
    slug: "margin-revenue",
    tag: "Finance",
    date: "August 2026",
    readTime: "6 min read",
    metaTitle: "Why your margins are thinner than your revenue suggests | Pivot Prime",
    metaDescription: "Growing the top line is the easy part. Most businesses in the UAE and Gulf quietly give it back through pricing leakage, cost creep, and unconsolidated spend.",
    metaKeywords: "profit margin improvement UAE, business finance Dubai, pricing strategy Gulf, CFO advisory UAE, fractional CFO Dubai, gross margin improvement, cost management UAE, financial operations Gulf, business profitability MENA, finance consultant Dubai, cash flow management UAE",
    headline: [{ t: "Why your margins are thinner" }, { br: true }, { t: "than your revenue " }, { em: "suggests." }],
    deck: "Growing the top line is the easy part. Most businesses quietly give it back through pricing leakage, cost creep and unconsolidated spend. They never quite see where it went.",
    author: { initials: "JF", name: "Justin Ford", role: "Fractional CFO, Pivot Prime" },
    body: [
    { type: "lead", text: "There is a particular kind of frustration I encounter regularly with founders and business unit leaders across the Gulf. Revenue is up. The team is growing. The product is working. And yet the cash position is tighter than it should be, the profitability conversation is uncomfortable, and somewhere between the top line and the bottom line, a significant portion of what the business earns is quietly disappearing. Nobody is being dishonest. Nobody is being wasteful in any obvious way. The money is just... not there." },
    { type: "p", text: "When I sit down with the numbers, the explanation is almost always the same. It is not one big problem. It is a collection of smaller ones, each of which looks manageable in isolation, and each of which has been tolerated long enough to become normal. Together, they add up to a material drag on profitability that compounds year on year and becomes significantly harder to unwind the longer it is left unaddressed." },
    { type: "h2", text: "The pricing problem nobody talks about" },
    { type: "p", text: "Pricing leakage is probably the most common and least visible of the margin killers I see in growing businesses. It takes many forms. Discounts that were offered once as a goodwill gesture and have since become an expected part of every renewal conversation. Contracts that were priced two or three years ago and have never been reviewed against the cost base that has since increased. Proposals where scope has been trimmed to win the deal without a corresponding reduction in the delivery cost. Services that are being provided as part of a relationship but sitting outside any formal agreement." },
    { type: "p", text: "None of these are dramatic in isolation. A five percent discount here, an unreviewed contract there, a scope creep that was absorbed without being billed. But when you map them across the client base or the product portfolio, the aggregate is frequently striking. Businesses that think they are operating at a thirty percent gross margin are sometimes actually operating at twenty-two, and the difference is sitting in a collection of pricing decisions that were made for good reasons at the time and have never been revisited." },
    { type: "quote", text: "\"Businesses that think they are at thirty percent gross margin are often actually at twenty-two. The difference is sitting in pricing decisions that were never revisited.\"" },
    { type: "h2", text: "Cost creep and the baseline problem" },
    { type: "p", text: "The second category is cost creep: the slow accumulation of expenditure that happens when a business grows faster than its financial controls. Software subscriptions that were approved for a specific project and are still running two years later. Headcount additions that made sense at the time but whose output is now difficult to attribute to any revenue-generating activity. Supplier relationships that were set up when the business was smaller and have never been renegotiated at the volumes the business now represents." },
    { type: "p", text: "The underlying issue here is a missing baseline. Without a clear picture of what each area of the cost base is supposed to be delivering, and a regular process for reviewing whether it is delivering it, costs expand to fill whatever budget is available and the baseline quietly shifts upward year on year. By the time anyone looks closely, the cost base has taken on a shape that reflects the history of individual decisions rather than a deliberate view of what the business needs to operate efficiently at its current scale." },
    { type: "p", text: "This is particularly common in businesses that have grown quickly, where the operational infrastructure was built reactively to meet demand rather than designed proactively to support it. The leadership team was understandably focused on growth, the finance function was not yet strong enough to push back, and the cost base accumulated accordingly. That is not a failure of management. It is a very normal consequence of prioritising revenue in the early stages. But at a certain point, cleaning up the cost base becomes as important to profitability as winning new business." },
    { type: "h2", text: "The unconsolidated spend problem" },
    { type: "p", text: "The third category is the one that surprises leaders most when they see it clearly for the first time: unconsolidated spend across the organisation. In businesses of any meaningful size, purchasing decisions happen at multiple levels. Department heads procure tools and services. Teams use expense accounts. Regional offices have local supplier relationships. Each of these feels individually justified and is usually within policy. The problem is that nobody is looking at the full picture, which means there is no one negotiating on volume, no one identifying duplication, and no one asking whether the aggregate of all these individual decisions adds up to a coherent approach to the cost base." },
    { type: "quote", text: "\"Nobody is looking at the full picture, which means nobody is negotiating on volume, nobody is identifying duplication, and the aggregate cost is considerably higher than it needs to be.\"" },
    { type: "p", text: "The solution is not more bureaucracy around purchasing approvals. It is visibility: a consolidated view of what the business is spending, with whom, on what, and whether the terms reflect the relationship that volume of spend should command. That visibility alone, in my experience, typically identifies savings that are meaningful relative to the effort required to capture them." },
    { type: "h2", text: "What to do when the margin conversation gets uncomfortable" },
    { type: "p", text: "The businesses that manage their margins well tend to have one thing in common: they treat the profitability conversation as a regular operational discipline, not a crisis response. They review pricing on a schedule rather than waiting until a contract renewal forces the issue. They hold their cost base to a standard that is defined in advance rather than discovered in arrears. And they have a finance function that is close enough to the business to understand the context behind the numbers, not just to report them." },
    { type: "p", text: "For many businesses in the Gulf at the growth stage, that level of financial infrastructure is not yet in place, and building it full-time is not the right move. The business is not yet at the scale where a senior finance hire makes commercial sense, but it is absolutely at the scale where the absence of senior financial judgment is costing it real money. This is where the fractional model earns its keep. Someone in the room can read the numbers and translate them into specific operational decisions: who to talk to about pricing, which costs to challenge, where the spend is unconsolidated. That value is disproportionate to the cost of having that person." },
    { type: "p", text: "Revenue growth is hard and worth celebrating. But if the margin is not growing with it, the business is working harder than it needs to for less than it deserves. That gap is almost always closeable, and in most cases, it is closer than it looks." },
    ],
    cta: {
      headline: [{ t: "Know where your" }, { br: true }, { t: "margin is " }, { em: "going." }],
      body: "A fresh set of senior eyes on your numbers often finds more than it costs. The first conversation is free.",
      button: "Talk to our finance team",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "consultant-leaves", tag: "Execution", title: "The consultant leaves. The problem stays.", cta: "Read →" },
      { slug: "decisions-layers", tag: "Leadership", title: "Why your decisions don't survive the layers", cta: "Read →" },
    ],
  },

  /**
   * THE THREE SEPTEMBER ARTICLES, HER v3 SLIDE 10: "Add the three articles
   * shown below, for September – find full articles at –" her artifact link.
   *
   * GENERATED FROM HER PAGE, NOT RETYPED. Her page was opened in a real, headed
   * Chrome and each card was clicked open; the text in her article view is
   * byte-identical to what is below, block for block, and a second, independent
   * agent got the same text from its own load. Body word counts: 887, 680, 762.
   * Her apostrophes in these three are straight, and are kept so.
   *
   * WHERE HER PAGE LEAVES A FIELD OF THIS FORMAT EMPTY, nothing is written for
   * it. Her article view has no standfirst, so the deck is her own card excerpt.
   * She gives no role and no keywords: the role is the one each person already
   * carries on the August articles, and keywords are omitted. Her headings are
   * one colour with no line break, so each headline is one plain segment. Her
   * page shows no images and supplies none.
   *
   * THE CFO PIECE IS JUSTIN'S. Her page's own data credits Iram; her slide 10
   * says "fractional CFO (by Justin Ford)" and its picture shows his name on the
   * card. The slide is the instruction, so it wins. PENDING-COPY 1g3.
   *
   * HER CTA IS THE SAME ON ALL THREE and goes to the diagnostic, so it carries
   * an href, and the article page shows it only while the diagnostic is on.
   * "More from Pivot Prime" links each to the other two September pieces.
   */
  {
    slug: "uae-market-entry",
    tag: "UAE Market Entry",
    date: "September 2026",
    readTime: "9 min read",
    metaTitle: "What it actually takes to launch a consumer product in Dubai | Pivot Prime",
    metaDescription: "From entity formation to first retail sales: what market entry in the UAE really involves, and why the timeline is almost always longer than founders expect.",
    headline: [{ t: "What it actually takes to launch a consumer product in Dubai" }],
    deck: "From entity formation to first retail sales: what market entry in the UAE really involves, and why the timeline is almost always longer than founders expect.",
    author: { initials: "IK", name: "Iram Kauser", role: "Founder and CEO, Pivot Prime" },
    body: [
    { type: "lead", text: "Most founders who have successfully built a consumer brand in the UK or Europe arrive in Dubai with a reasonable product, a clear market thesis, and a timeline that is too short by roughly six months. Not because the market is hostile. The UAE actively courts foreign business and has invested heavily in making the process accessible. But the rules are different, the approval bodies are unfamiliar, and the sequence in which you do things matters more than most people expect." },
    { type: "p", text: "This article walks through what a real market entry looks like, using the example of a UK-based functional drinks brand we took through the process: a matcha and mushroom product with proven domestic traction, entering Dubai for the first time. The steps, costs and timelines are real." },
    { type: "h2", text: "The entity question comes first, and it shapes everything else" },
    { type: "p", text: "Before a product can legally be imported or sold in the UAE, there must be a registered entity in the country. Founders often treat this as a formality. It is not. The entity structure you choose determines what you can do commercially, who you need to hire, and how much operational friction you will carry for years." },
    { type: "p", text: "The two main options are a mainland company and a free zone company. A mainland licence allows direct trading in the UAE market, direct government dealings, and unlimited retail and distribution activity. A free zone company is faster and cheaper to set up and permits full foreign ownership, but it cannot trade directly in the UAE mainland without routing through a local distributor. For a consumer product going into retail or food service, that additional layer creates cost and reduces control over customer relationships." },
    { type: "p", text: "For the functional drinks brand, we established a mainland LLC in Dubai. Total cost for entity formation, including professional fees and government charges, came to approximately AED 35,000 to 45,000." },
    { type: "h2", text: "Product registration takes longer than the timeline assumes" },
    { type: "p", text: "The matcha and mushroom formulation included lion's mane and reishi, both of which sit at the edge of what UAE regulators consider established food ingredients versus health supplements. We sought ingredient-level pre-clearance before the client committed to a full production run. This added three weeks at the front of the process but avoided a costly reformulation later." },
    { type: "p", text: "Labelling adds another layer. UAE labelling requirements include Arabic-language text, metric net weight, country of origin, shelf life, a specific nutritional information format, and both manufacturer and importer contact details. The label requires regulatory approval before customs clearance can be obtained. From initial product registration to first import clearance, the realistic timeline for a clean product with complete documentation is three to five months." },
    { type: "h2", text: "Import logistics require decisions that compound later" },
    { type: "p", text: "The UAE is an open and well-functioning import environment. Duties on food products are generally five percent on the customs value. Every food import requires a health certificate from an accredited authority in the country of origin. For UK products, this involves the relevant local authority or an approved third-party certifier. The certificate must accompany the shipment, not follow it." },
    { type: "p", text: "Many first-time UAE exporters default to DDP (Delivered Duty Paid) because it appears to simplify the import process. In practice, it transfers control of customs clearance to a third party with limited accountability. We recommended DAP (Delivered At Place) with a UAE-based agent of the client's choosing, which kept control of the clearance process on the right side of the relationship." },
    { type: "h2", text: "The operational footprint in year one should be intentional, not inherited" },
    { type: "p", text: "For early-stage market entry, third-party logistics is almost always the correct answer. A 3PL removes the commitment of a long-term warehouse lease and a dedicated logistics team. The functional drinks brand worked with a 3PL in Al Quoz at approximately AED 4,000 to 6,000 per month at launch volumes, covering ambient storage, pick-and-pack, and delivery to around 150 retail doors." },
    { type: "h2", text: "People and compliance cannot be sequenced separately" },
    { type: "p", text: "The entity needs a senior person on the ground with authority to act. The UAE introduced a nine percent corporate tax in 2023, and VAT at five percent applies to most products. Both must be registered and managed correctly from the first trading period. For the functional drinks brand, we hired a Country Manager on the client's behalf and arranged an outsourced finance and compliance function through a local accounting firm, which handled the regulatory and fiscal requirements without the cost of a dedicated finance hire in year one." },
    { type: "h2", text: "Channel strategy determines what the next three years look like" },
    { type: "p", text: "The Dubai retail landscape for a functional consumer product divides into three distinct channels. Specialty and health retail is where most functional brands prove their concept in Dubai, with shorter decision cycles and accessible buyers. Premium supermarkets require a structured pitch, category data, and in many cases a listing fee. Hospitality and food service represents the highest-value channel in the long run, but procurement cycles are slower. For most brands, this is a year-two priority." },
    { type: "h2", text: "What the numbers look like" },
    { type: "p", text: "Full market entry for the functional drinks brand, from LLC formation to first meaningful retail sales, required approximately AED 350,000 to 400,000 over twelve months. The founders who navigate this process well treat Dubai as a real business operation and not a remote distribution experiment. Understanding the constraints in detail before capital is deployed is the entire value of a proper market entry assessment." },
    ],
    cta: {
      headline: [{ t: "Want to understand where your business is losing capacity?" }],
      body: "The four-minute diagnostic scores your operations and names the constraint directly.",
      button: "Take the diagnostic →",
      href: "/diagnostic",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "fractional-leadership", tag: "Operations", title: "The case for fractional leadership in a Dubai growth business", cta: "Read →" },
      { slug: "fractional-cfo", tag: "Finance", title: "Why growing businesses in Dubai need a CFO before they think they do", cta: "Read →" },
    ],
  },
  {
    slug: "fractional-leadership",
    tag: "Operations",
    date: "September 2026",
    readTime: "7 min read",
    metaTitle: "The case for fractional leadership in a Dubai growth business | Pivot Prime",
    metaDescription: "Why a growing business at the wrong stage for a permanent COO hire can still access senior operational capability, and why the handover determines whether it holds.",
    headline: [{ t: "The case for fractional leadership in a Dubai growth business" }],
    deck: "Why a growing business at the wrong stage for a permanent COO hire can still access senior operational capability, and why the handover determines whether it holds.",
    author: { initials: "IK", name: "Iram Kauser", role: "Founder and CEO, Pivot Prime" },
    body: [
    { type: "lead", text: "There is a version of operational leadership that most growing businesses need and very few actually have: someone with the seniority and experience to design the operating model from the ground up, run the weekly execution, and then step back once the structure is in place and a capable team is running it." },
    { type: "p", text: "The challenge is that this describes a role with a natural end point. The job is to build something that works without the person who built it. A permanent C-suite hire is not designed for that. A consultant who writes a report does not do it either. The fractional executive model exists precisely in the gap between those two." },
    { type: "h2", text: "What the permanent senior hire actually costs" },
    { type: "p", text: "Founders tend to calculate the cost of a senior hire as a salary number. The real number is larger. A genuine COO in Dubai commands AED 40,000 to 80,000 per month depending on background and industry. On top of that salary sits the cost of the hiring process, the three to six months before a new executive is genuinely productive in a new environment, and the UAE end-of-service gratuity as an exit cost. A senior hire that does not work out costs far more than the salary." },
    { type: "p", text: "This is not an argument against permanent senior hires. It is an argument for being precise about whether the role requires a long-term occupant or a focused, time-limited builder." },
    { type: "h2", text: "The distinction that matters: part-time versus fractional" },
    { type: "p", text: "A part-time executive does a reduced version of the role on an ongoing basis. A fractional executive is fully engaged during a defined engagement period, working toward a specific outcome: build the operating model, install the infrastructure, develop the team that will sustain it, and hand over. The measure of success is whether the business can operate at the same level after the engagement ends." },
    { type: "h2", text: "What the engagement actually looks like" },
    { type: "p", text: "A typical fractional COO engagement runs through three phases. The first sixty to ninety days are diagnostic and design: mapping where the business is losing time and capacity, where money is leaving without clear return, and which processes depend on a single person's knowledge rather than a documented system. The build phase is where the operational work happens: the operating model is designed and installed, the reporting infrastructure is set up, and the cadence of how the business runs week to week is established. This is execution, not advice. The transition phase is where the engagement either justifies itself or does not." },
    { type: "h2", text: "The operations lead: why the handover determines whether it holds" },
    { type: "p", text: "The most common failure mode in fractional leadership is the handover. An experienced executive joins, builds something well-designed, and then leaves. Several months later, the business has quietly reverted because the person who built the system was the only person who understood why it worked." },
    { type: "p", text: "Designing against this starts at the beginning. From the first week, there is an identified operations lead in the business. They are present for every significant design decision, they understand the logic behind every process, and they are progressively taking on ownership of the system during the engagement rather than inheriting it afterwards." },
    { type: "h2", text: "Why the Dubai market makes this model particularly relevant" },
    { type: "p", text: "The salary ranges for senior operational executives in Dubai are high relative to the stage at which many fast-growing companies need serious operational capability. The most capable operational leaders in Dubai frequently prefer fractional engagements to permanent roles. And businesses setting up in the UAE from another market need operational capability from the first week of meaningful trading, not after a lengthy hiring process." },
    { type: "h2", text: "When fractional is the right answer" },
    { type: "p", text: "The model works best when growth has outrun the operating structure, when a funding event creates immediate expectations of operational maturity, or when a new market entry requires intensive, bounded build work. It is not the right answer where the business needs a cultural anchor over many years, or where the complexity of operations genuinely requires a full-time senior leader from the outset. Knowing which situation you are in before committing either way is the more important question." },
    ],
    cta: {
      headline: [{ t: "Want to understand where your business is losing capacity?" }],
      body: "The four-minute diagnostic scores your operations and names the constraint directly.",
      button: "Take the diagnostic →",
      href: "/diagnostic",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "uae-market-entry", tag: "UAE Market Entry", title: "What it actually takes to launch a consumer product in Dubai", cta: "Read →" },
      { slug: "fractional-cfo", tag: "Finance", title: "Why growing businesses in Dubai need a CFO before they think they do", cta: "Read →" },
    ],
  },
  {
    slug: "fractional-cfo",
    tag: "Finance",
    date: "September 2026",
    readTime: "7 min read",
    metaTitle: "Why growing businesses in Dubai need a CFO before they think they do | Pivot Prime",
    metaDescription: "Most businesses in the UAE have finance management. Fewer have financial leadership. The gap between the two costs more than the salary difference suggests.",
    headline: [{ t: "Why growing businesses in Dubai need a CFO before they think they do" }],
    deck: "Most businesses in the UAE have finance management. Fewer have financial leadership. The gap between the two costs more than the salary difference suggests.",
    author: { initials: "JF", name: "Justin Ford", role: "Fractional CFO, Pivot Prime" },
    body: [
    { type: "lead", text: "Most founders of fast-growing businesses in the UAE know they need better financial management. What they underestimate is how far the gap between their current capability and what they actually need has already grown by the time they start looking." },
    { type: "p", text: "The typical picture: the business has a bookkeeper, or a part-time accountant, or a finance manager skilled at processing transactions but who has never built a financial model the board would trust. Revenue is growing. Cash is tighter than the revenue number suggests it should be. The founder cannot explain with precision why. This is not a bookkeeping problem. It is a financial leadership problem." },
    { type: "h2", text: "What a CFO actually does that a finance manager does not" },
    { type: "p", text: "A finance manager handles the operational finance function: accounts payable and receivable, payroll, bank reconciliation, VAT filing, management accounts production. These are execution tasks. A CFO is a strategic financial leader. The role includes designing the financial architecture of the business, building the reporting infrastructure that gives the leadership team genuine visibility, managing banking and investor relationships, and making the financial decisions that shape the trajectory of the business." },
    { type: "p", text: "In the UAE context, the role also covers regulatory complexity that many founders do not fully anticipate. Corporate tax at nine percent was introduced in 2023. Transfer pricing rules apply to businesses with group structures or intercompany transactions. Banking relationships require more active management than in many other markets." },
    { type: "h2", text: "Why the fractional model fits this stage" },
    { type: "p", text: "A business doing AED 20 to 60 million in annual revenue often needs CFO-level capability and cannot yet absorb a full-time CFO cost comfortably. A senior CFO with genuine regional experience commands AED 35,000 to 70,000 per month in the current market. The fractional model addresses this directly: an engagement for a defined period with a specific mandate, at a fraction of the permanent hire cost during the build phase." },
    { type: "p", text: "There is also a quality-of-access argument. The most experienced financial executives in Dubai frequently prefer fractional engagements to permanent roles. A fractional engagement reaches this tier of talent. A permanent hire at the equivalent level, with the salary expectations and equity discussions that come with it, often cannot." },
    { type: "h2", text: "What the engagement builds" },
    { type: "p", text: "The first phase is diagnostic: assessing the quality of the management accounts, the reliability of the cash flow forecast, the state of banking relationships, and the completeness of regulatory compliance. In most businesses at this stage, this surfaces at least one significant gap the founder was not fully aware of." },
    { type: "p", text: "The build phase constructs what is missing: a financial model rebuilt to a standard that supports genuine decision-making, a reporting cadence that gives the leadership team information on a timetable that allows them to act on it, and a control environment that prevents both inadvertent errors and the more deliberate ones that become possible when a business handles larger sums without adequate oversight." },
    { type: "p", text: "The transition phase installs the ongoing capability, typically a finance manager or financial controller hired or developed during the engagement, who can sustain the function at the level the fractional CFO established." },
    { type: "h2", text: "The fundraising case" },
    { type: "p", text: "For businesses considering a raise, the case for fractional CFO engagement is particularly strong. Investors reviewing a UAE business assess the quality of financial information as a proxy for the quality of the business overall. Management accounts that are delayed or formatted inconsistently create a negative signal that is difficult to recover from in a process. The cost of the engagement is almost always small relative to the difference in outcome between a well-run fundraising process and a poorly-run one." },
    { type: "h2", text: "The UAE regulatory environment adds a specific premium to experience" },
    { type: "p", text: "Corporate tax compliance requires understanding what constitutes a taxable entity, how group structures are treated, and how to approach the transition accounting from a pre-tax to a post-tax position. Businesses that treated their UAE entity as a tax-free holding structure and have not reviewed that assumption since the corporate tax introduction are carrying risk they may not have quantified. A fractional CFO with regional experience navigates all of this with a familiarity that takes years to develop from a standing start." },
    { type: "h2", text: "The question most founders avoid" },
    { type: "p", text: "Financial leadership is the function that founders most often underinvest in during the growth phase. Its failures are invisible until they are not. A business that reaches a fundraising conversation without investor-ready financials, or that discovers a VAT exposure during due diligence, pays for that underinvestment at the worst possible moment. If you want to understand the state of your finance function before it becomes an obstacle, the operational diagnostic is where the conversation starts." },
    ],
    cta: {
      headline: [{ t: "Want to understand where your business is losing capacity?" }],
      body: "The four-minute diagnostic scores your operations and names the constraint directly.",
      button: "Take the diagnostic →",
      href: "/diagnostic",
    },
    moreLabel: "More from Pivot Prime",
    more: [
      { slug: "uae-market-entry", tag: "UAE Market Entry", title: "What it actually takes to launch a consumer product in Dubai", cta: "Read →" },
      { slug: "fractional-leadership", tag: "Operations", title: "The case for fractional leadership in a Dubai growth business", cta: "Read →" },
    ],
  },
];

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/* ------------------------------------------------------------------ */
/* The listing page, pp-insights_3.html                                */
/* ------------------------------------------------------------------ */

export const INSIGHTS_META = {
  title: "Insights | Pivot Prime",
  description: "Perspectives on execution, leadership, and business transformation from the Pivot Prime team. Written by practitioners, not theorists.",
  keywords: "business insights UAE, management consulting blog Dubai, execution strategy Gulf, business leadership MENA, operations consulting blog, P&L leadership advice, business transformation insights",
};

export const INSIGHTS_HERO: { eyebrow: string; headline: Segment[]; standfirst: string } = {
  eyebrow: "Pivot Prime Insights",
  headline: [{ t: "Thinking from" }, { br: true }, { t: "the " }, { em: "inside" }, { t: " out." }],
  standfirst: "Perspectives on execution, leadership, and business transformation. Written by practitioners who have done the work, not theorists who have studied it.",
};

/**
 * Her six category tabs, in her order.
 *
 * HER FILE'S SCRIPT ONLY MOVES THE UNDERLINE. It adds and removes an active
 * class and nothing else, so on her page every tab shows every article. A
 * control labelled by category that does not filter by category reads as broken
 * once it is live, so this one filters. That is a behaviour her file left
 * unfinished rather than a design decision of hers being overridden.
 *
 * HER SIX CATEGORIES STAY IN THIS LIST. "Growth" is not rendered today because
 * none of her four articles carries that tag and a tab that opens an empty list
 * is a dead control. It is kept here rather than deleted so that publishing one
 * Growth article brings the tab back on its own, with no code change: see
 * ACTIVE_FILTERS below, which is what the page actually renders.
 */
export const INSIGHTS_FILTERS = ["All", "Execution", "Leadership", "Technology", "Finance", "Growth"];

export type FeaturedCard = {
  label: string; slug: string; quoteLabel: string; quote: Segment[]; tag: string;
  title: string; deck: string; authorInitials: string; authorName: string;
  authorMeta: string; cta: string; image: string; imageAlt: string;
};

export const FEATURED: FeaturedCard = {
  label: "Featured",
  slug: "consultant-leaves",
  quoteLabel: "From the article",
  quote: [{ t: "\"A diagnosis without a treatment plan that actually gets administered is just an " }, { em: "expensive piece of paper," }, { t: " however good the diagnosis was.\"" }],
  tag: "Execution",
  title: "The consultant leaves. The problem stays.",
  deck: "Why most management consulting engagements end at the slide deck, and what that gap costs growing businesses in the Gulf.",
  authorInitials: "IK",
  authorName: "Iram Kauser",
  authorMeta: "Founder and CEO · August 2026 · 6 min read",
  cta: "Read the article →",
  /**
   * Her chosen photograph, from the Pexels URL hard-coded in her file. Copied
   * into public/ rather than hotlinked: a production page should not depend on
   * a third party's CDN staying up, and the request would leak every reader's
   * IP to it. Pexels licenses free commercial use.
   */
  image: "/insights/featured-consultant-leaves.jpg",
  imageAlt: "",
};

export const POSTS_LABEL = "All articles";

export type PostCard = {
  slug: string; tag: string; title: string; deck: string;
  authorInitials: string; authorName: string; date: string; readTime: string; cta: string;
};

export const POSTS: PostCard[] = [
  {
    slug: "decisions-layers",
    tag: "Leadership",
    title: "Why your decisions don't survive the layers",
    deck: "How hierarchy erodes decision quality, slows execution, and costs business unit leaders more than they realise.",
    authorInitials: "IK",
    authorName: "Iram Kauser",
    date: "Aug 2026",
    readTime: "6 min",
    cta: "→",
  },
  {
    slug: "technology-process",
    tag: "Technology",
    title: "AI won't save a broken process. But fixing the process will.",
    deck: "Why businesses across the UAE are investing in technology and seeing weak returns, and what needs to happen first.",
    authorInitials: "SR",
    authorName: "Saif Ur Rehman",
    date: "Aug 2026",
    readTime: "5 min",
    cta: "→",
  },
  {
    slug: "margin-revenue",
    tag: "Finance",
    title: "Why your margins are thinner than your revenue suggests",
    deck: "Growing the top line is the easy part. Most businesses quietly give it back through pricing leakage, cost creep, and unconsolidated spend.",
    authorInitials: "JF",
    authorName: "Justin Ford",
    date: "Aug 2026",
    readTime: "6 min",
    cta: "→",
  },
  // September, in the order her slide 10 picture shows them. See ARTICLES.
  {
    slug: "uae-market-entry",
    tag: "UAE Market Entry",
    title: "What it actually takes to launch a consumer product in Dubai",
    deck: "From entity formation to first retail sales: what market entry in the UAE really involves, and why the timeline is almost always longer than founders expect.",
    authorInitials: "IK",
    authorName: "Iram Kauser",
    date: "Sep 2026",
    readTime: "9 min",
    cta: "→",
  },
  {
    slug: "fractional-leadership",
    tag: "Operations",
    title: "The case for fractional leadership in a Dubai growth business",
    deck: "Why a growing business at the wrong stage for a permanent COO hire can still access senior operational capability, and why the handover determines whether it holds.",
    authorInitials: "IK",
    authorName: "Iram Kauser",
    date: "Sep 2026",
    readTime: "7 min",
    cta: "→",
  },
  {
    slug: "fractional-cfo",
    tag: "Finance",
    title: "Why growing businesses in Dubai need a CFO before they think they do",
    deck: "Most businesses in the UAE have finance management. Fewer have financial leadership. The gap between the two costs more than the salary difference suggests.",
    authorInitials: "JF",
    authorName: "Justin Ford",
    date: "Sep 2026",
    readTime: "7 min",
    cta: "→",
  },
];

/**
 * The tabs the page renders: "All", plus every category with an article behind
 * it right now.
 *
 * Derived rather than hand-maintained, so the list cannot drift from the
 * articles. Adding a Growth piece to ARTICLES and POSTS is the whole of the work
 * needed to bring the Growth tab back. The CSS that filters by category in
 * globals.css still carries a Growth rule for the same reason: it is inert while
 * no article is tagged Growth and correct the moment one is.
 */
const TAGS_IN_USE = new Set([FEATURED.tag, ...POSTS.map((p) => p.tag)]);

export const ACTIVE_FILTERS = INSIGHTS_FILTERS.filter(
  (label, i) => i === 0 || TAGS_IN_USE.has(label),
);

export const TOPICS_LABEL = "Browse by topic";

/**
 * Her ten topics.
 *
 * Every one points at href="#" in her file. Confirmed 29 August that they stay
 * exactly as her file has them: plain labels, not links. There is no topic
 * archive to point them at, and a link that goes nowhere is worse than a label
 * that was never one.
 */
export const TOPICS = ["Strategy execution", "P&L leadership", "Business transformation", "AI and automation", "Operational excellence", "Corporate innovation", "Decision making", "Fractional leadership", "Finance and growth", "Gulf and MENA markets"];

export const SUBSCRIBE: {
  eyebrow: string; headline: Segment[]; standfirst: string;
  placeholder: string; button: string; note: string;
} = {
  eyebrow: "Stay sharp",
  headline: [{ t: "Insights worth " }, { em: "reading." }],
  standfirst: "New articles from the Pivot Prime team, straight to your inbox. No round-ups, no filler. One piece, when it is ready.",
  placeholder: "Your work email",
  button: "Subscribe",
  note: "No spam. Unsubscribe any time.",
};

export const INSIGHTS_CTA: { headline: Segment[]; body: string; button: string } = {
  headline: [{ t: "Reading about it" }, { br: true }, { t: "is the start. " }, { em: "Doing it" }, { t: " is the point." }],
  body: "The first conversation costs nothing. Not moving does.",
  button: "Book a call",
};
