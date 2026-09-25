// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Scroll demo for v1 (#13).
//
// Studio set up this shape. Every string marked [VOICE] is a placeholder for Voice.
// The three claims and the five step names are Ryan's, word for word; do not rewrite them.

export type NoteKind = "Gap" | "Premise" | "Contradiction";

export type DemoStep = {
  // One sample question for this step, applied to this claim.
  question: string;
  // One sentence on what that question found, labeled Gap, Premise, or Contradiction.
  // Never a score, never "correct".
  note: { kind: NoteKind; text: string };
};

export type DemoClaim = {
  id: string;
  text: string;
  // Exactly five, in the order of `practice.demo.steps`.
  steps: [DemoStep, DemoStep, DemoStep, DemoStep, DemoStep];
};

const placeholderSteps = (): DemoClaim["steps"] => [
  { question: "[VOICE] Sample question: define the terms.", note: { kind: "Gap", text: "[VOICE] One sentence on what it found." } },
  { question: "[VOICE] Sample question: name the source.", note: { kind: "Gap", text: "[VOICE] One sentence on what it found." } },
  { question: "[VOICE] Sample question: surface the assumption.", note: { kind: "Premise", text: "[VOICE] One sentence on what it found." } },
  { question: "[VOICE] Sample question: ask what would falsify it.", note: { kind: "Contradiction", text: "[VOICE] One sentence on what it found." } },
  { question: "[VOICE] Sample question: decide.", note: { kind: "Gap", text: "[VOICE] One sentence on what it found." } },
];

export const practice = {
  title: "Practice",
  intro: {
    label: "01 / PRACTICE",
    heading: "Take one claim. Run the drill.",
    body: "This is the habit, run once, slowly. A claim appears. It could come from an institution, the news, a colleague, or a machine. Four questions follow, in order. Each one asks something of the claim, not of the person who said it. The page stops before the answer. That part is yours. Nothing here is scored. There is no right response to reveal, only a decision to make. Which claim would you run next?",
  },
  demo: {
    label: "02 / EXAMINE",
    // Accessible name for the group of three claim buttons.
    switcherLabel: "[VOICE] Choose a claim",
    // Mono label above the claim being examined.
    claimLabel: "Claim",
    // The five steps, in order (Ryan's spec, verbatim).
    steps: [
      "Define the terms",
      "Name the source",
      "Surface the assumption",
      "Ask what would falsify it",
      "Decide",
    ],
    // Mono label above each sample question.
    questionLabel: "Question",
    // Default claim is the second (index 1).
    defaultClaim: 1,
    claims: [
      { id: "C-01", text: "If it is trending, it is important.", steps: placeholderSteps() },
      { id: "C-02", text: "The first answer that sounds finished is good enough.", steps: placeholderSteps() },
      { id: "C-03", text: "A fluent explanation is the same thing as understanding.", steps: placeholderSteps() },
    ] satisfies DemoClaim[],
    // Shown after the last step. The page stops before any answer.
    stop: "The drill stops here. The decision is yours.",
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
