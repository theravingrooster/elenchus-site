// Owner: Elenchus Voice. Route: /practice
// Section labels (`NN / WORD`) are structural stand-ins from Studio; Voice may rename the word.
// Spec: /docs/PAGES.md "`/practice`". Card demo for v1 (#15).
//
// The three bars, claims, threads, and Decide lines are Ryan's, word for word; do not rewrite them.

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
    // Mono labels in the card.
    claimLabel: "Claim",
    questionLabel: "Question",
    decideLabel: "Decide",
    // Default claim is the first (Wine).
    defaultClaim: 0,
    claims: [
      {
        bar: "Wine",
        text: "A glass of red wine a day is good for your heart.",
        thread: [
          {
            question:
              "What does “good for your heart” mean — fewer deaths, clearer arteries, or a number on a scan?",
            note: {
              kind: "Gap",
              text: "The headline treats “good” as one thing. The studies underneath use different endpoints and usually do not test a daily glass.",
            },
          },
          {
            question: "Who measured this, and against whom?",
            note: {
              kind: "Premise",
              text: "A lot of the coverage rests on observational diet papers. Wine drinkers are often compared with people who already do not drink because they are ill.",
            },
          },
          {
            question: "What has to be true for the wine to be doing the work?",
            note: {
              kind: "Premise",
              text: "That the apparent benefit is the alcohol or the grapes, not money, exercise, or other habits that travel with “a glass at dinner.”",
            },
          },
          {
            question: "What would falsify it?",
            note: {
              kind: "Contradiction",
              text: "If the heart benefit vanishes when you compare wine drinkers with similar people who do not drink, the glass is not the cause.",
            },
          },
        ],
        decide: "Hold the claim only as far as that comparison survives.",
      },
      {
        bar: "Water",
        text: "You should drink eight glasses of water a day.",
        thread: [
          {
            question:
              "Eight glasses of what — water only, or everything you drink and eat?",
            note: {
              kind: "Gap",
              text: "The rule counts a round number. It does not say whether soup, tea, or food water counts.",
            },
          },
          {
            question: "Where did eight come from?",
            note: {
              kind: "Premise",
              text: "The number is a public-health shorthand that leaked into magazines. It is not a finding that human kidneys require eight.",
            },
          },
          {
            question:
              "What has to be true for counting glasses to be the method?",
            note: {
              kind: "Premise",
              text: "That thirst is a bad signal and that a fixed count works for every body, climate, and size.",
            },
          },
          {
            question: "What would falsify it?",
            note: {
              kind: "Contradiction",
              text: "If people in ordinary conditions stay hydrated without hitting eight, the count is a slogan, not a requirement.",
            },
          },
        ],
        decide: "Keep water. Drop the quota unless a clinician set one.",
      },
      {
        bar: "Divorce",
        text: "Half of all marriages end in divorce.",
        thread: [
          {
            question:
              "Half of which marriages — first marriages this year, every marriage ever recorded, which country?",
            note: {
              kind: "Gap",
              text: "“Half” sounds like a fact about a couple getting married tomorrow. The number is usually a mix of years, places, and remarriages.",
            },
          },
          {
            question:
              "Who published the half, and what did they actually count?",
            note: {
              kind: "Premise",
              text: "Headline stats often take divorces in a year over marriages in that same year, which is not a lifetime risk for one couple.",
            },
          },
          {
            question: "What has to be true for 50% to be the odds for you?",
            note: {
              kind: "Premise",
              text: "That your age, year, and first-versus-later marriage match the pile that produced the half.",
            },
          },
          {
            question: "What would falsify it?",
            note: {
              kind: "Contradiction",
              text: "If current first-marriage divorce risk is not 50% once you split the pile by year and age, the sentence is a blunt instrument, not a forecast.",
            },
          },
        ],
        decide: "Ask “half of what” before you treat it as a fate.",
      },
    ] satisfies DemoClaim[],
  },
  closing: {
    label: "03 / THE SECOND QUESTION",
    question: "What would falsify the claim you just let stand?",
  },
};
