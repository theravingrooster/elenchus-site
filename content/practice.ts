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
    label: "02 / EXAMINE",
    heading: "Compared with what?",
    body: "Follow three headlines. Test the comparison behind each claim.",
    whyLink: "Why we question",
  },
  demo: {
    name: "Elenchus",
    avatar: "E",
    exampleLabel: "Example",
    conversationLabel: "Example conversation",
    readerLabel: "You",
    endLabel: "End of example",
    nextHeadlineLabel: "Next headline",
    nextHeadlineAction: "Next headline",
    trackEndLabel: "End of track",
    // Accessible name for the example selectors.
    switcherLabel: "Headlines in order",
    // The first message identifies the claim being examined.
    claimLabel: "Headline",
    sourcesLabel: "Sources",
    previousLabel: "Previous",
    previousAction: "Previous question",
    nextAction: "Next question",
    typingLabel: "Preparing a reply…",
    streamingLabel: "Replying…",
    responseDelayMs: 800,
    responseRevealMs: 2600,
    // Default claim is the first (School).
    defaultClaim: 0,
    claims: [
      {
        bar: "School",
        claim: "Younger Students’ Test Scores Bounce Back After the Pandemic.",
        sources: [
          { label: "NAEP · 2025 results", href: "https://www.nationsreportcard.gov/ltt/2025/" },
        ],
        thread: [
          {
            question: "Why should reaching 2020 count as catching up?",
            feedback:
              "Back to 2020 and on track for 2025 are different standards. Nine-year-olds’ reading was not significantly different from 2020; their math and thirteen-year-olds’ scores remained lower.",
          },
          {
            question: "Did the same children recover, or did a new group score better?",
            feedback:
              "NAEP samples age groups in different years; it does not follow the same children. A higher group average cannot show that the children who lost ground have caught up.",
          },
          {
            question: "Who could still be behind even if the national average recovered?",
            feedback:
              "An average can hide different trajectories. Compare lower- and higher-scoring students with the same baseline before treating a national gain as recovery shared by everyone.",
          },
          {
            question: "Does “not significantly different” rule out a meaningful learning gap?",
            feedback:
              "It means the test did not detect a difference, not that the scores are proven equal. Examine the estimated gap and its uncertainty before deciding that any remaining difference is too small to matter.",
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
            question: "Could the divorce-to-marriage ratio fall without marriages becoming more stable?",
            feedback:
              "More new weddings can lower the ratio without reducing an existing marriage’s divorce risk. The counts also mix marriage years and, in CDC’s data, different geographic coverage.",
          },
          {
            question: "Could Pew’s one-third figure rise even while annual divorce rates fall?",
            feedback:
              "One-third of ever-married people reported a first-marriage divorce by 2023. That cumulative share could rise as ongoing marriages end, even while annual divorce rates fall.",
          },
          {
            question: "Are newer marriages more stable, or have they just had less time to end?",
            feedback:
              "Newer marriage groups have had less time in which a divorce could occur. Compare groups at the same marriage duration before interpreting a lower observed share as greater stability.",
          },
          {
            question: "Could divorce fall because the people who marry have changed?",
            feedback:
              "Pew reports a shift toward more-educated adults in the married population. Compare similar couples at the same marriage duration before treating the decline as evidence that marriages themselves became more stable.",
          },
        ],
      },
      {
        bar: "Medicine",
        claim: "Universal Semaglutide Access Could Save 28 Million Lives in 5 Years, Study Finds.",
        sources: [
          { label: "ADA abstract · 2025", href: "https://doi.org/10.2337/db25-2043-LB" },
        ],
        thread: [
          {
            question: "Twenty-eight million fewer deaths compared with what?",
            feedback:
              "The estimate compares simulated futures over five years. To interpret the difference, we need to know what treatment and care people receive in the scenario without universal access.",
          },
          {
            question: "What makes that benefit hold across different patients and countries?",
            feedback:
              "The model spans 196 countries. Check whether the evidence supports the treatment effects assumed for those populations; different starting risks and care conditions could change the projected benefit.",
          },
          {
            question: "If half the eligible people take it, would half the benefit follow?",
            feedback:
              "That depends on who takes it and for how long. Half the people need not represent half the preventable deaths; the model needs to test that scenario.",
          },
          {
            question: "Which assumption could change the estimate most?",
            feedback:
              "Ask how the estimate changes with lower uptake, more discontinuation, or smaller treatment effects. If plausible alternatives move it sharply, those conditions belong beside the 28 million figure.",
          },
        ],
      },
    ] satisfies DemoClaim[],
  },
};
