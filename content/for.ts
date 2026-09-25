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
      lead: "For the eighteen-year-old who thought college would teach something that mattered and found a sequence of boxes instead.",
      paragraphs: [
        "They can feel the missing piece and cannot name it. Feeds hand them claims whose costs stay offstage. Parties arrive already finished. They do not want a side yet. They are looking for an anchor.",
        "The anchor is not a feed, a party, or a fluent machine. You become it by pressing the next claim you already hold.",
        "Also for students rewarded for the first polished answer. For operators who ship on a sentence no one tested. For anyone who notices they stop when the sentence sounds done.",
        "Elenchus is not for everyone. It is hard on purpose.",
      ],
      question:
        "Which of your current beliefs have never been through the second question?",
    },
    {
      label: "03 / NOT",
      lead: "We will not walk conspiracy circuits.",
      paragraphs: [
        "We will not promise a higher IQ. We will not make you look clever in a room. We will not pick a team for you. We will not answer the question so you can skip the work.",
        "It teaches you to question. That is it.",
      ],
      question:
        "What statement are you least willing to put under examination?",
    },
  ],
};
