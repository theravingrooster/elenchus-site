// Examine section on Home. Each example keeps four question and feedback turns.

// One example step: a question and a brief, source-grounded reply.
// Replies examine the headline's scope and assumptions without scoring the reader.
export type Turn = {
  question: string;
  feedback: string;
};

export type DemoClaim = {
  // Short word on the switch bar.
  bar: string;
  // The claim being examined.
  claim: string;
  // Primary reports behind the example, distinct from the supplied headline.
  sources: { label: string; href: string }[];
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
    claimLabel: "Headline",
    sourcesLabel: "Sources",
    previousLabel: "Previous",
    previousAction: "Previous question",
    nextAction: "Next question",
    typingLabel: "Preparing a reply…",
    responseDelayMs: 800,
    // Default claim is the first (Medicine).
    defaultClaim: 0,
    claims: [
      {
        bar: "Medicine",
        claim: "Universal Semaglutide Access Could Save 28 Million Lives in 5 Years, Study Finds.",
        sources: [
          { label: "ADA abstract · 2025", href: "https://doi.org/10.2337/db25-2043-LB" },
        ],
        thread: [
          {
            question: "Were 28 million lives actually saved?",
            feedback:
              "The number is a five-year simulation result: 7.41% fewer modeled deaths under universal access to semaglutide.",
          },
          {
            question: "Who does “universal” include?",
            feedback:
              "Adults who meet the model’s eligibility rules for obesity or type 2 diabetes. Those rules determine who counts.",
          },
          {
            question: "Does access mean everyone takes it?",
            feedback:
              "Availability alone doesn’t establish uptake. We need the model’s assumptions about treatment use and adherence to interpret the estimate.",
          },
          {
            question: "What can we actually say?",
            feedback:
              "A simulation projects roughly 28 million fewer deaths over five years under universal access. The word “could” carries the model’s conditions.",
          },
        ],
      },
      {
        bar: "School",
        claim: "Younger Students’ Test Scores Bounce Back After the Pandemic.",
        sources: [
          { label: "NAEP · 2025 results", href: "https://www.nationsreportcard.gov/ltt/2025/" },
        ],
        thread: [
          {
            question: "Which students bounced back?",
            feedback:
              "Nine-year-olds improved on the 2025 long-term NAEP tests. Thirteen-year-olds remained below their pre-pandemic averages in both subjects.",
          },
          {
            question: "Did reading and math recover equally?",
            feedback:
              "For nine-year-olds, reading was not significantly different from 2020. Math improved since 2022, but was still four points lower than 2020.",
          },
          {
            question: "Caught up compared with when?",
            feedback:
              "A gain since 2022 is one comparison. Thirteen-year-olds’ 2025 reading average was not significantly different from 1971.",
          },
          {
            question: "Can we say kids are caught up?",
            feedback:
              "We can say nine-year-olds’ average reading score is back near its 2020 level. That conclusion doesn’t extend to every age or subject.",
          },
        ],
      },
      {
        bar: "Family",
        claim: "No Longer a Coin Toss: Less than Half of Marriages Predicted to End in Divorce.",
        sources: [
          { label: "CDC · 2023", href: "https://www.cdc.gov/nchs/fastats/marriage-divorce.htm" },
          { label: "Pew · 2025", href: "https://www.pewresearch.org/short-reads/2025/10/16/8-facts-about-divorce-in-the-united-states/" },
        ],
        thread: [
          {
            question: "What do the official numbers count?",
            feedback:
              "CDC’s 2023 figures count marriages and divorces per 1,000 residents. The divorce figures cover 45 states and D.C.",
          },
          {
            question: "Can I divide the divorce rate by the marriage rate?",
            feedback:
              "That compares events in one year. Those divorces mostly concern earlier weddings, and the two rates cover different populations.",
          },
          {
            question: "Does Pew’s one-third figure settle it?",
            feedback:
              "One-third of ever-married Americans reported a first-marriage divorce by 2023. Some ongoing marriages could still end in divorce.",
          },
          {
            question: "What would support a prediction of less than half?",
            feedback:
              "We’d need to define which marriages, distinguish divorce from separation, and estimate outcomes over a specified period.",
          },
        ],
      },
    ] satisfies DemoClaim[],
  },
};
