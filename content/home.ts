// Owner: Elenchus Voice. Route: /
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/` Home". `[VOICE]` marks a slot Studio added for Voice to fill.

export const home = {
  // PAGES.md: the display line. Do not stack a second motto on it.
  display: "[VOICE] display line",
  // PAGES.md: three sentences, verbatim, one per entry. Each renders as its own paragraph.
  sentences: ["[VOICE] sentence 1", "[VOICE] sentence 2", "[VOICE] sentence 3"],
  closing: {
    question: "What would have to be true for that to hold?",
  },
  // PAGES.md: second block, below the first screen.
  second: {
    label: "02 / CLAIM",
    // Set large in serif, like a section heading.
    lead: "[VOICE] second block lead sentence",
    // One entry per paragraph.
    paragraphs: ["[VOICE] second block body"],
    question: "[VOICE] second block closing question",
  },
};
