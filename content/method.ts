// Owner: Elenchus Voice. Route: /method
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/method`". Every block ends on its own closing question.
// `[VOICE]` marks a slot Studio added for Voice to fill.

export const method = {
  title: "Method",
  header: {
    label: "01 / METHOD",
    heading: "Test the claim against its own premises.",
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
    question: "What would falsify it?",
  },
  // Piercing vs noise. `lead` is set large in serif; `paragraphs` is one entry per paragraph.
  piercing: {
    label: "03 / PIERCING",
    lead: "There is a difference between a question that performs doubt and a question that reaches the frame.",
    paragraphs: [
      "A bad question circles what you cannot act on and what does not bear on your life. A piercing question names the hidden premise, shakes how the decision is currently drawn, and leaves you with an angle most people never see.",
      "Elenchus trains the second kind. It does not reward the first.",
    ],
    question: "Where does this claim break if the hidden premise is false?",
  },
  // Optional (Method only). Set to null to drop the block.
  machines: {
    label: "04 / MACHINES",
    lead: "Institutions produce claims. Machines train on those claims and return them fluently.",
    paragraphs: [
      "Treat both as sources. Ask what would have to be true. A model that cannot survive the second question is incomplete, not oracular. Questioning is how you see the gap — and how you ask the next thing that improves the output.",
    ],
    question:
      "What would have to be true for the sentence you just accepted from a model?",
  } as {
    label: string;
    lead: string;
    paragraphs: string[];
    question: string;
  } | null,
};
