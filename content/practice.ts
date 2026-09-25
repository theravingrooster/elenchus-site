// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Chat demo (#23).
//
// The bars, claims, questions, and feedback are Ryan's, word for word; do not rewrite them.

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
    feedbackLabel: "Feedback",
    // Default claim is the first (Wine).
    defaultClaim: 0,
    claims: [
      {
        bar: "Wine",
        claim: "A glass of red wine a day is good for your heart.",
        thread: [
          {
            question: "Is wine healthy?",
            feedback:
              "“Healthy” is the first fluent word. It does not say healthy for whom, compared with what, or measured how. Ask what “good for your heart” is supposed to mean.",
          },
          {
            question:
              "Good how — fewer deaths, clearer arteries, or a number on a scan?",
            feedback:
              "That names the term. The headline still treats those as one thing. Ask who was measured, and against whom.",
          },
          {
            question: "Who did they compare the wine drinkers with?",
            feedback:
              "That is closer to the frame. A lot of the coverage sits on observational papers. Ask what has to be true for the glass to be doing the work.",
          },
          {
            question:
              "What if the benefit is just the kind of person who has a glass at dinner?",
            feedback:
              "That presses the hidden premise. Hold the claim only as far as that comparison survives. Do not decide from the headline.",
          },
        ],
      },
      {
        bar: "Water",
        claim: "You should drink eight glasses of water a day.",
        thread: [
          {
            question: "Is eight glasses a day true?",
            feedback:
              "True is too big. The rule is a count. Ask eight glasses of what, and whether food and tea count.",
          },
          {
            question: "Does the eight include what you already eat and drink?",
            feedback:
              "That opens the term. Now ask where the number came from, not whether water is good.",
          },
          {
            question: "Who said eight, and what did they actually measure?",
            feedback:
              "That goes to the source. The count is a shorthand that leaked into magazines. Ask what would have to be true for a fixed quota to be the method.",
          },
          {
            question:
              "What if thirst already does the job for ordinary people?",
            feedback:
              "That is a falsifier. Keep the water. Drop the quota unless someone set one for a body in front of them.",
          },
        ],
      },
      {
        bar: "Divorce",
        claim: "Half of all marriages end in divorce.",
        thread: [
          {
            question: "Isn’t that just a known fact?",
            feedback:
              "“Known fact” is how a number survives the first glance. Ask half of which marriages.",
          },
          {
            question:
              "Half of first marriages this year, or every marriage ever, in which country?",
            feedback:
              "That defines the pile. Now ask how the half was built — divorces this year over marriages this year is not a lifetime risk for one couple.",
          },
          {
            question: "What would make 50% the odds for a specific couple?",
            feedback:
              "That surfaces the assumption. The headline treats a mixed stack as a fate. Ask what would break the sentence.",
          },
          {
            question:
              "What if you split the stack by year and age and the half disappears?",
            feedback:
              "That is the second question doing the work. Do not take “half” as a forecast until the pile is named.",
          },
        ],
      },
    ] satisfies DemoClaim[],
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
