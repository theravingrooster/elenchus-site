// Owner: Elenchus Voice. Route: /for
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/for`". Two stacked full-width sections, no columns.
// `[VOICE]` marks a slot Studio added for Voice to fill.

export const forPage = {
  title: "For",
  intro: {
    label: "01 / FOR",
    heading: "Who stops at the first fluent answer?",
  },
  // `lead` is set large in serif; `paragraphs` is one entry per paragraph.
  sections: [
    {
      label: "02 / WHO",
      lead: "[VOICE] who it is for, lead",
      paragraphs: ["[VOICE] who it is for, body"],
      question: "Which of your current beliefs have never been through the second question?",
    },
    {
      label: "03 / NOT",
      lead: "[VOICE] what it will not do, lead",
      paragraphs: ["[VOICE] what it will not do, body"],
      question: "What statement are you least willing to put under examination?",
    },
  ],
};
