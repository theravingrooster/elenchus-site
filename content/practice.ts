// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Static walkthrough for v1.

export const practice = {
  title: "Practice",
  intro: {
    label: "01 / PRACTICE",
    heading: "Take one claim. Run the drill.",
    body: "This is the habit, run once, slowly. A claim appears. It could come from an institution, the news, a colleague, or a machine. Four questions follow, in order. Each one asks something of the claim, not of the person who said it. The page stops before the answer. That part is yours. Nothing here is scored. There is no right response to reveal, only a decision to make. Which claim would you run next?",
  },
  walkthrough: {
    label: "02 / WALKTHROUGH",
    claim: {
      id: "Q-001",
      source: "media",
      text: "Reading on paper leads to better comprehension than reading on a screen.",
    },
    // PAGES.md: the drill runs in four lines, then the page stops.
    lines: [
      "Define the terms. Comprehension of what: facts recalled, arguments followed, or both? Measured how, and when?",
      "Name the source. Which study, run on whom, and reported by whom?",
      "Surface the assumption. That the screen is the cause, not the length of the text, the time allowed, or the reader's habits.",
      "Ask what would falsify it. Readers who score the same on paper and on screen, with the text, the time, and the test held equal.",
    ],
    stop: "The drill stops here. The decision is yours.",
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
