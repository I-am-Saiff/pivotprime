/**
 * About page copy.
 *
 * SOURCE: slides 21 and 22 of *Website Revisions 2208v3*, and the client's own
 * About redesign `req/pp-about-v2_2.html`, which is the same page in markup.
 * Every string below is verbatim from that file, which is machine-readable and
 * therefore beats transcribing the slide images by eye.
 *
 * THIS REPLACES SPEC SECTION 6 ON THIS PAGE. Her redesign runs hero, who we are,
 * team, bench, case studies, CTA. It has no "Why Pivot Prime exists" (6.1) and
 * no four capabilities (6.2), and it does not carry the two sections relocated
 * here from the homepage. All of that copy is kept word for word in
 * docs/PENDING-COPY.md 1ab and is listed for her in docs/FOR-IRAM-outstanding.md,
 * because removing her copy is the thing she cannot discover for herself.
 * The deck is dated 22 August and the copy document is version 1.7.1, so the
 * deck is the later instruction, which is the same precedence rule used for
 * spec 3.6 and How We Work.
 */

export const ABOUT_HERO = {
  eyebrow: "About Pivot Prime",
  /** Rendered as two lines, the second in neon, as the slide draws it. */
  headingLead: "Execution partners.",
  headingAccent: "Not consultants.",
  standfirst: "We built Pivot Prime to close the gap between strategy and delivery.",
};

export const WHO_WE_ARE = {
  eyebrow: "Who we are",
  heading: "We've been on both sides of the table.",
  body: [
    "Our team has worked inside complex organisations, managing targets, navigating real constraints, and carrying responsibility for results. We've also advised from the outside, helping leaders understand why effort isn't translating into outcomes.",
    "Pivot Prime exists because of that combination. When plans meet pressure, people, and reality, we know what it takes to keep things moving, and we stay until we see results.",
  ],
};

/**
 * The bench, slide 22.
 *
 * The section returns because the labels arrived. It was built once as a
 * heading over an empty list, which on the page read as a section that had
 * failed to load; the rule that kept it off the site was "nothing beats a slot
 * that looks broken", and twenty labels close it.
 */
export const BENCH = {
  eyebrow: "The bench",
  headingLines: ["One partnership.", "Every capability", "you will ever need."],
  /** The middle line is the accented one on the slide. */
  accentLineIndex: 1,
  body: [
    {
      text: "As we execute plans and make things happen, we draw on a large bench of specialists. People we have worked with, vetted, and trust.",
      emphasis: "You never have to manage them.",
      rest: "You manage one relationship with us, and we manage the rest.",
    },
    {
      text: "We understand your business deeply and become an extension of it. Every specialist we bring in is briefed by us, accountable to us, and integrated into the work already underway.",
    },
  ],
  pill: "One point of contact. Zero coordination overhead.",
  capabilities: [
    "Project management",
    "Data Analytics",
    "AI & Automation",
    "Legal & Compliance",
    "HR & People",
    "Recruitment",
    "Company Formation",
    "Supply Chain",
    "Operations Design",
    "Finance & Accounting",
    "Videography & Production",
    "Marketing & Brand",
    "Business Development",
    "Regulatory Affairs",
    "Change Management",
    "Web Design & Build",
    "Executive Advisory",
    "Training & L&D",
    "Research & Insights",
    "Investor Relations",
  ],
};
