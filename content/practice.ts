// Examine section on Home. Each example keeps four question and feedback turns.

// One example step: a question and a short note about what it examines.
// Feedback nudges the next question. It never scores, never says "correct", never answers the claim.
export type Turn = {
  question: string;
  feedback: string;
};

export type DemoClaim = {
  // Short word on the switch bar.
  bar: string;
  // The claim being examined.
  claim: string;
  // Four turns in order.
  thread: [Turn, Turn, Turn, Turn];
};

export const practice = {
  title: "Practice",
  intro: {
    label: "01 / EXAMINE",
    heading: "Start with a claim.",
    body: "Choose an example and follow the questions.",
    methodLink: "Read the method",
  },
  demo: {
    name: "Elenchus",
    avatar: "E",
    exampleLabel: "Example",
    conversationLabel: "Example conversation",
    readerLabel: "You",
    endLabel: "End of example",
    // Accessible name for the example selectors.
    switcherLabel: "Choose a claim",
    // The first message identifies the claim being examined.
    claimLabel: "Claim",
    previousLabel: "Previous",
    previousAction: "Previous question",
    nextAction: "Next question",
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
              "Make “healthy” more precise. Ask what benefit the claim describes.",
          },
          {
            question: "What does “good for your heart” mean?",
            feedback:
              "Ask how the benefit was measured and who was compared.",
          },
          {
            question: "Who did they compare the wine drinkers with?",
            feedback:
              "Examine the comparison. What else could differ between the groups?",
          },
          {
            question: "What evidence would separate wine from those other factors?",
            feedback:
              "Name the evidence needed to attribute a difference to wine.",
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
              "Define what counts and who the rule applies to.",
          },
          {
            question: "Does the count include food and other drinks?",
            feedback:
              "Now trace the number to its original source.",
          },
          {
            question: "Where did eight come from?",
            feedback:
              "Read what the source measured and the conditions it considered.",
          },
          {
            question: "What evidence would support the same amount for everyone?",
            feedback:
              "Identify the rule’s assumption. Ask how you could test it.",
          },
        ],
      },
      {
        bar: "Divorce",
        claim: "Half of all marriages end in divorce.",
        thread: [
          {
            question: "Is that number accurate?",
            feedback:
              "Ask which marriages, where, and over what period.",
          },
          {
            question: "Half of which marriages?",
            feedback:
              "Define the group. Then inspect how the number was calculated.",
          },
          {
            question: "How was the rate calculated?",
            feedback:
              "Check whether the calculation answers the claim.",
          },
          {
            question: "Would the claim still hold across different years and groups?",
            feedback:
              "Ask what evidence would make you narrow or revise the claim.",
          },
        ],
      },
    ] satisfies DemoClaim[],
  },
};
