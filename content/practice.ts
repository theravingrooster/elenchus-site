// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Card demo for v1 (#15).
//
// Studio set up this shape. Every string marked [VOICE] is a placeholder.
// Voice pastes Ryan's three bars, claims, and threads word for word; no rewrites.

export type NoteKind = "Gap" | "Premise" | "Contradiction";

// One exchange in the thread: a question, then a short note on what it found.
// The note is never labeled AI, never scored, never "correct".
export type Exchange = {
  question: string;
  note: { kind: NoteKind; text: string };
};

export type DemoClaim = {
  // Short word on the switch bar.
  bar: string;
  // The claim, shown large under the bars.
  text: string;
  // Four exchanges in order: define the terms, name the source,
  // surface the assumption, ask what would falsify it.
  thread: [Exchange, Exchange, Exchange, Exchange];
  // The closing Decide line.
  decide: string;
};

const placeholderClaim = (n: number): DemoClaim => ({
  bar: `[VOICE] Bar ${n}`,
  text: `[VOICE] Claim ${n}`,
  thread: [
    { question: "[VOICE] Q", note: { kind: "Gap", text: "[VOICE] Note" } },
    { question: "[VOICE] Q", note: { kind: "Premise", text: "[VOICE] Note" } },
    { question: "[VOICE] Q", note: { kind: "Premise", text: "[VOICE] Note" } },
    { question: "[VOICE] Q", note: { kind: "Contradiction", text: "[VOICE] Note" } },
  ],
  decide: "[VOICE] Decide line",
});

export const practice = {
  title: "Practice",
  intro: {
    label: "01 / PRACTICE",
    heading: "Take one claim. Run the drill.",
    body: "This is the habit, run once, slowly. Choose one of three claims. Scroll, and five steps follow, in order. Each step asks one question of the claim, not of the person who said it, and notes what that question found. The page stops before the answer. That part is yours. Nothing here is scored. There is no right response to reveal, only a decision to make. Which claim would you run next?",
  },
  demo: {
    label: "02 / EXAMINE",
    // Accessible name for the row of three bars.
    switcherLabel: "Choose a claim",
    // Mono labels in the card.
    claimLabel: "Claim",
    questionLabel: "Question",
    decideLabel: "Decide",
    // Default claim is the first (Wine).
    defaultClaim: 0,
    claims: [placeholderClaim(1), placeholderClaim(2), placeholderClaim(3)] satisfies DemoClaim[],
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
