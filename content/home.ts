// Owner: Elenchus Voice. Route: /
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/` Home". `[VOICE]` marks a slot Studio added for Voice to fill.

export const home = {
  // PAGES.md: the display line. Do not stack a second motto on it.
  display: "Elenchus is bringing questioning back to the center of thinking.",
  // PAGES.md: one sentence under the display line, verbatim (#25).
  sentence: "[VOICE] Home hero sentence",
  // Retired by #25: no longer rendered. Voice deletes these.
  // PAGES.md: three sentences, verbatim, one per entry. Each renders as its own paragraph.
  sentences: [
    "We start from a statement someone already believes — from institutions, media, peers, and machines — and ask what would have to be true for it to hold.",
    "Critical thinking is the habit of refusing to stop at the first answer.",
    "The questions we ask, not the things we memorize, are what matter.",
  ],
  closing: {
    question: "What would have to be true for that to hold?",
  },
  // PAGES.md: second block, below the first screen.
  second: {
    label: "02 / CLAIM",
    // Set large in serif, like a section heading.
    lead: "A claim can sound finished and still rest on an assumption you never agreed to.",
    // One entry per paragraph.
    paragraphs: [
      "If this works, a question appears when someone repeats a common assertion — and you follow it instead of dropping it. What looked held together opens. You see the cards. You get slower to put your name behind a trend, a group, or a doctrine that only survived the first glance.",
    ],
    question:
      "Which claim did you let stand this week because it sounded complete?",
  },
};
