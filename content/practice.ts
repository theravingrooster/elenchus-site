// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Scroll demo for v1 (#13).
//
// Studio set up this shape; Voice wrote the questions and notes.
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

export const practice = {
  title: "Practice",
  intro: {
    label: "01 / PRACTICE",
    heading: "Take one claim. Run the drill.",
    body: "This is the habit, run once, slowly. Choose one of three claims. Scroll, and five steps follow, in order. Each step asks one question of the claim, not of the person who said it, and notes what that question found. The page stops before the answer. That part is yours. Nothing here is scored. There is no right response to reveal, only a decision to make. Which claim would you run next?",
  },
  demo: {
    label: "02 / EXAMINE",
    // Accessible name for the group of three claim buttons.
    switcherLabel: "Choose a claim",
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
      {
        id: "C-01",
        text: "If it is trending, it is important.",
        steps: [
          {
            question:
              "Trending where, by what count, over what window? And important to whom?",
            note: {
              kind: "Gap",
              text: "The claim uses “important” without saying for whom or for what.",
            },
          },
          {
            question:
              "Who decides what trends: the people reading, or the feed that ranks them?",
            note: {
              kind: "Premise",
              text: "The ranking comes from a system built to hold attention, not to weigh consequences.",
            },
          },
          {
            question: "What must be true for attention to measure importance?",
            note: {
              kind: "Premise",
              text: "It assumes that what many people look at is what matters to them.",
            },
          },
          {
            question:
              "Can you name something that trended and changed nothing, or something important that never trended?",
            note: {
              kind: "Contradiction",
              text: "One case of either breaks the “if, then” the claim depends on.",
            },
          },
          {
            question:
              "What is left of the claim once trending is only a count of attention?",
            note: {
              kind: "Gap",
              text: "A narrower claim about attention remains, and whether you hold it is yours to decide.",
            },
          },
        ],
      },
      {
        id: "C-02",
        text: "The first answer that sounds finished is good enough.",
        steps: [
          {
            question:
              "Good enough for what: a bus time, a diagnosis, a decision you cannot undo?",
            note: {
              kind: "Gap",
              text: "“Good enough” names no purpose, so there is nothing to check it against.",
            },
          },
          {
            question:
              "Where did the first answer come from, and what made it sound finished?",
            note: {
              kind: "Premise",
              text: "Sounding finished describes how an answer is delivered, not how it was checked.",
            },
          },
          {
            question:
              "What must be true for the first finished answer to be the right one?",
            note: {
              kind: "Premise",
              text: "It assumes an answer that sounds complete has already been tested.",
            },
          },
          {
            question:
              "When did a first answer sound finished and turn out wrong?",
            note: {
              kind: "Contradiction",
              text: "If you can recall one, the claim cannot hold as a rule.",
            },
          },
          {
            question:
              "For this question, what would you need before you called an answer enough?",
            note: {
              kind: "Gap",
              text: "The claim now depends on the stakes, and naming them is your decision.",
            },
          },
        ],
      },
      {
        id: "C-03",
        text: "A fluent explanation is the same thing as understanding.",
        steps: [
          {
            question:
              "What does “understanding” mean here: repeating it, applying it, or predicting with it?",
            note: {
              kind: "Gap",
              text: "The claim treats three different abilities as one word.",
            },
          },
          {
            question:
              "Whose fluency: a teacher’s, a textbook’s, a machine’s, or your own?",
            note: {
              kind: "Premise",
              text: "Fluency belongs to the speaker and shows nothing yet about what the listener can do.",
            },
          },
          {
            question:
              "What must be true for smooth words to prove a grasp of the thing?",
            note: {
              kind: "Premise",
              text: "It assumes no one can explain well what they do not understand.",
            },
          },
          {
            question:
              "Can someone explain it fluently and still fail the first new case?",
            note: {
              kind: "Contradiction",
              text: "If fluency survives a failed application, it is not the same thing as understanding.",
            },
          },
          {
            question:
              "What test would you want to pass before you say you understand this?",
            note: {
              kind: "Gap",
              text: "The claim leaves open what counts as proof, and choosing that test is yours.",
            },
          },
        ],
      },
    ] satisfies DemoClaim[],
    // Shown after the last step. The page stops before any answer.
    stop: "The drill stops here. The decision is yours.",
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
