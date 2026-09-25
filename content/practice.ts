// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Chat demo (#23).
//
// The bars, claims, questions, and feedback are Ryan's, word for word; do not rewrite them.
// `[VOICE]` marks a slot Studio added for Voice to fill.

// One turn in the chat: a question (right bubble), then feedback on that question (left bubble).
// Feedback nudges the next question. It never scores, never says "correct", never answers the claim.
export type Turn = {
  question: string;
  feedback: string;
};

export type DemoClaim = {
  // Short word on the switch bar.
  bar: string;
  // The claim, the first bubble on the left.
  claim: string;
  // Four turns in order.
  thread: [Turn, Turn, Turn, Turn];
};

const placeholderThread: DemoClaim["thread"] = [
  { question: "[VOICE] Q1", feedback: "[VOICE] F1" },
  { question: "[VOICE] Q2", feedback: "[VOICE] F2" },
  { question: "[VOICE] Q3", feedback: "[VOICE] F3" },
  { question: "[VOICE] Q4", feedback: "[VOICE] F4" },
];

export const practice = {
  title: "Practice",
  intro: {
    label: "01 / PRACTICE",
    heading: "Take one claim. Run the drill.",
    body: "These are claims people already repeat. Watch the second question hit them. Do not look for a dunk. The page will not score you. It will not tell you that you are sharp. It will not hand you the answer. Follow the question that appears. Stop when you can decide.",
  },
  demo: {
    label: "02 / EXAMINE",
    // Accessible name for the row of three bars.
    switcherLabel: "Choose a claim",
    // Small mono labels above each bubble.
    claimLabel: "Claim",
    questionLabel: "Question",
    feedbackLabel: "[VOICE] feedback label",
    // Default claim is the first (Wine).
    defaultClaim: 0,
    claims: [
      { bar: "Wine", claim: "[VOICE] Wine claim", thread: placeholderThread },
      { bar: "Water", claim: "[VOICE] Water claim", thread: placeholderThread },
      { bar: "Divorce", claim: "[VOICE] Divorce claim", thread: placeholderThread },
    ] satisfies DemoClaim[],
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
