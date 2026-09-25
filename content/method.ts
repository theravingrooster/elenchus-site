// Owner: Elenchus Voice. Route: /method
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/method`". Every block ends on its own closing question.
// `[VOICE]` marks a slot Studio added for Voice to fill.

export const method = {
  title: "Method",
  header: {
    label: "01 / METHOD",
    heading: "[VOICE] page heading",
  },
  steps: {
    label: "02 / STEPS",
    heading: "Five steps. Decide last.",
    steps: [
      "Define the terms",
      "Name the source",
      "Surface the assumption",
      "Ask what would falsify it",
      "Decide",
    ],
    question: "[VOICE] steps closing question",
  },
  // Piercing vs noise. `lead` is set large in serif; `paragraphs` is one entry per paragraph.
  piercing: {
    label: "03 / PIERCING",
    lead: "[VOICE] piercing lead sentence",
    paragraphs: ["[VOICE] piercing body"],
    question: "[VOICE] piercing closing question",
  },
  // Optional (Method only). Set to null to drop the block.
  machines: {
    label: "04 / MACHINES",
    lead: "[VOICE] machines lead sentence",
    paragraphs: ["[VOICE] machines body"],
    question: "[VOICE] machines closing question",
  } as { label: string; lead: string; paragraphs: string[]; question: string } | null,
};
