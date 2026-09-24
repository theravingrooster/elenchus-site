// Owner: Elenchus Voice. Route: /
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/` Home".

export const home = {
  // PAGES.md: pick one display line, do not stack.
  display: "[placeholder: display line, one of the three in PAGES.md]",
  // PAGES.md: 2–3 sentences from the canonical paragraph. VOICE.md: ≤ 40 words.
  body: "[placeholder: 2–3 sentences from the canonical paragraph in VOICE.md]",
  primaryAction: "Examine a claim",
  secondaryAction: "The method",
  examine: {
    label: "01 / EXAMINE",
    fieldLabel: "[placeholder: field label, paste or type a statement]",
    verb: "[placeholder: verb]",
  },
  closing: {
    label: "02 / THE SECOND QUESTION",
    question: "What would have to be true for that to hold?",
  },
};
