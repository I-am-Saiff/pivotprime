/**
 * Extracts the final website copy out of docs/spec.md.
 *
 * WHY THIS EXISTS
 *
 * Every assertion in the conformance suite used to carry a phrase I had typed
 * out by hand from the spec. That produced failures in both directions and no
 * way to tell them apart:
 *
 *   A false pass. A forbidden assertion read "We have sat in the system" while
 *   the page rendered "We've", so it passed while the section was still there.
 *
 *   A false accusation. An assertion read "we hand it over with documentation"
 *   where the spec says "and hand it over", so a page that carried the copy
 *   correctly was reported as missing it.
 *
 * Both come from the same cause: the needle was my transcription rather than the
 * document. So no assertion states copy any more. It names a section and a block
 * index, and the phrase is read out of the spec at run time. A typo in this file
 * cannot invent copy, it can only fail to find a block, which is loud.
 *
 * STRUCTURE THIS PARSES
 *
 * Spec section 1: green-bordered blocks are final website copy, italic grey text
 * is instruction to the developer and never appears on the site. Pandoc renders
 * the green blocks as pipe tables and the instructions as plain italics, so the
 * tables are exactly the copy and nothing else.
 *
 *   ## **3.1 Hero**
 *   +--------------------------------+
 *   | **The consultancy that ...**   |   <- block 0
 *   |                                |
 *   | Most consultants recommend ... |   <- block 1
 *   +================================+
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const SPEC_PATH = join(process.cwd(), "docs", "spec.md");

let cache = null;
let gridCache = null;

function unescapePandoc(text) {
  return (
    text
      // [Iram Kauser]{.mark} is pandoc's rendering of highlighted text.
      .replace(/\[([^\]]*)\]\{[^}]*\}/g, "$1")
      .replace(/\\(["'\-*_.$&#])/g, "$1")
      .replace(/\*\*/g, "")
      // A leading bullet is list markup, not part of the sentence.
      .replace(/^[-•]\s+/, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Returns { "3.1": [block, block, ...], ... } where each block is one paragraph
 * of final copy, unwrapped and unescaped.
 */
export function loadSpecBlocks() {
  if (cache) return cache;

  let raw;
  try {
    raw = readFileSync(SPEC_PATH, "utf8");
  } catch {
    throw new Error(
      `spec-blocks: cannot read ${SPEC_PATH}. It is generated and gitignored, so run:\n` +
        `  pandoc req/PivotPrime_Website_Copy_Spec_v1_7_1.docx -t markdown --extract-media=docs/spec-media -o docs/spec.md`,
    );
  }

  const sections = {};
  let current = null;
  let inTable = false;
  let paragraph = [];
  let blocks = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      const text = unescapePandoc(paragraph.join(" "));
      if (text) blocks.push(text);
      paragraph = [];
    }
  };
  const flushSection = () => {
    flushParagraph();
    if (current && blocks.length) {
      sections[current] = (sections[current] ?? []).concat(blocks);
    }
    blocks = [];
  };

  for (const line of raw.split("\n")) {
    const heading = line.match(/^#{2,3} \*\*([0-9]+(?:\.[0-9]+)?)[ .]/);
    if (heading) {
      flushSection();
      current = heading[1];
      inTable = false;
      continue;
    }
    if (!current) continue;

    // Table borders open and close a green block.
    if (/^\+[-=+]+\+$/.test(line)) {
      flushParagraph();
      inTable = !/^\+=+\+$/.test(line) ? true : false;
      continue;
    }

    if (inTable && line.startsWith("|")) {
      const cell = line.replace(/^\|/, "").replace(/\|$/, "").trim();
      if (cell === "") flushParagraph();
      else paragraph.push(cell);
    }
  }
  flushSection();

  cache = sections;
  return sections;
}

/**
 * The copy inside pandoc's *dashed* grid tables, cell by cell.
 *
 * WHY THIS IS SEPARATE FROM loadSpecBlocks()
 *
 * The document uses two table syntaxes and they mean different things. Green
 * copy blocks come out as `+---+` pipe tables and are final website copy, which
 * is what loadSpecBlocks() returns. The instruction tables — "Block /
 * Currently / Change to" in section 5, the typographical corrections in 2.5 —
 * come out as bare dashed rulers with the columns laid out by character
 * position. They are instructions, not blocks of page copy, so they do not
 * belong in the copy-coverage audit's needle list.
 *
 * But the wording in the "Change to" column IS the client's, and the reverse
 * audit was calling it ours. Five sub-lines on the persona pages, including
 * "Through a Fractional COO retainer. Scoped per engagement." straight out of
 * the 5.1 table, were listed in sanctioned-copy.json as copy we invented,
 * because a haystack built only from pipe tables cannot contain them.
 *
 * Each cell is returned on its own rather than joined. Joining them and
 * searching the result matches across cell boundaries: on the first run of this
 * parser "We understand human behaviour" appeared to be sanctioned by two
 * unrelated neighbouring cells. It is in the document, in 2.5, but the run that
 * said so was not evidence of it.
 */
export function loadSpecGridCells() {
  if (gridCache) return gridCache;

  const raw = readFileSync(SPEC_PATH, "utf8");
  const lines = raw.split("\n");
  // Two or more runs of dashes on one line: the column ruler. A single run is a
  // horizontal rule or a one-column table and carries no column geometry.
  const RULER = /^\s*-{3,}(\s+-{3,})+\s*$/;
  const cells = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (!RULER.test(lines[i])) continue;
    const columns = [];
    const re = /-{3,}/g;
    let m;
    while ((m = re.exec(lines[i]))) columns.push([m.index, m.index + m[0].length]);

    // Per column, a list of paragraphs; a blank line starts a new one.
    const acc = columns.map(() => [[]]);
    let j = i + 1;
    for (; j < lines.length; j += 1) {
      const line = lines[j];
      if (RULER.test(line) || /^\s*-{3,}\s*$/.test(line)) break;
      if (/^\s*$/.test(line)) {
        acc.forEach((column) => column.push([]));
        continue;
      }
      columns.forEach(([start, end], k) => {
        // The ruler under the last column stops at its widest row, so anything
        // beyond it still belongs to that column.
        const piece = k === columns.length - 1 ? line.slice(start) : line.slice(start, end);
        const text = piece.trim();
        if (text) acc[k][acc[k].length - 1].push(text);
      });
    }

    acc.forEach((column) =>
      column.forEach((paragraph) => {
        const text = unescapePandoc(paragraph.join(" "));
        if (text) cells.push(text);
      }),
    );
    i = j - 1;
  }

  gridCache = cells;
  return cells;
}

/**
 * The copy at `section` block `index`, as the spec wrote it.
 * Throws rather than returning undefined: an assertion that cannot find its
 * source is a broken assertion, not a passing one.
 */
export function specBlock(section, index) {
  const blocks = loadSpecBlocks()[section];
  if (!blocks) {
    throw new Error(`spec-blocks: no copy blocks found for spec section ${section}`);
  }
  if (index >= blocks.length) {
    throw new Error(
      `spec-blocks: section ${section} has ${blocks.length} blocks, asked for index ${index}`,
    );
  }
  return blocks[index];
}

/** A button label, with the "BUTTON:" marker and the arrow and URL removed. */
export function specButton(section, index) {
  return specBlock(section, index)
    .replace(/^BUTTON:\s*/i, "")
    .replace(/\s*(→|->).*$/, "")
    .trim();
}
