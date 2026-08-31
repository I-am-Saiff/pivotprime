/**
 * The five services, and how a sub-line naming one becomes a link to it.
 *
 * THE MAPPING IS DERIVED, NOT ASSIGNED. Her 31 August instruction is that the
 * button on each persona card comes from the service named in that card's
 * sub-line, decided from the text rather than picked per page, so the four
 * pages cannot disagree with each other. `serviceLinksIn` reads a sub-line and
 * returns the services it names, in the order they appear in the sentence.
 *
 * The labels are hers, verbatim from the instruction, and they are the same
 * everywhere the mapping is used.
 *
 * MATCHING IS ON THE SERVICE NAME AS SHE WRITES IT, which is why
 * "Through Fractional Leadership Services." on For Corporate Leaders resolves:
 * it contains the name. It is a plain substring test rather than a word-bounded
 * one because every name here is multi-word and capitalised, so there is
 * nothing shorter for it to collide with.
 */
export type ServiceLink = { name: string; href: string; label: string };

export const SERVICE_LINKS: ServiceLink[] = [
  {
    name: "Operational Clarity Audit",
    href: "/services/operational-clarity-audit",
    label: "See the audit",
  },
  {
    name: "Fractional Leadership",
    href: "/services/fractional-leadership",
    label: "See fractional leadership",
  },
  {
    name: "Build and Place",
    href: "/services/build-and-place",
    label: "See build and place",
  },
  {
    name: "Technology Builds",
    href: "/services/technology-builds",
    label: "See technology builds",
  },
  {
    name: "UAE Market Entry",
    href: "/services/uae-market-entry",
    label: "See market entry",
  },
];

/**
 * The services a sub-line names, in the order the sentence names them.
 * Returns an empty array when it names none, which is a card that gets no
 * button rather than a card that gets a default one.
 */
export function serviceLinksIn(subline: string): ServiceLink[] {
  return SERVICE_LINKS.map((s) => ({ s, at: subline.indexOf(s.name) }))
    .filter(({ at }) => at !== -1)
    .sort((a, b) => a.at - b.at)
    .map(({ s }) => s);
}
