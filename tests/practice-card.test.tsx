import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PracticeCard } from "@/components/PracticeCard";
import { practice } from "@/content/practice";

// fireEvent uses Testing Library's act wrapper without user-event's asynchronous
// zero-timeout drain, so advancing these timers controls only the reply buffer.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  vi.spyOn(window, "matchMedia").mockReturnValue({ ...mediaQuery, matches: false });
});
afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function finishReply() {
  act(() => vi.runAllTimers());
}

function expectTranscript(claim: typeof practice.demo.claims[number], sentTurns: number) {
  const messages = within(screen.getByRole("log", { name: "Example conversation" }));
  expect(messages.getAllByRole("listitem")).toHaveLength(1 + 2 * sentTurns);
  expect(messages.getByText(claim.claim)).toBeVisible();
  for (const [turnIndex, turn] of claim.thread.entries()) {
    if (turnIndex < sentTurns) {
      expect(messages.getByText(turn.question)).toBeVisible();
      expect(messages.getByText(turn.feedback)).toBeVisible();
    } else {
      expect(messages.queryByText(turn.question)).not.toBeInTheDocument();
      expect(messages.queryByText(turn.feedback)).not.toBeInTheDocument();
    }
  }
  expect(screen.getByText(`${String(sentTurns).padStart(2, "0")} / ${String(claim.thread.length).padStart(2, "0")}`)).toBeVisible();
}

it.each(practice.demo.claims)("appends and removes recorded $bar replies within the conversation", (claim) => {
  render(<PracticeCard />);
  fireEvent.click(screen.getByRole("button", { name: claim.bar }));
  expect(screen.getByRole("button", { name: claim.bar })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  for (const other of practice.demo.claims.filter((item) => item !== claim)) {
    expect(screen.queryByText(other.claim)).not.toBeInTheDocument();
  }

  const previous = screen.getByRole("button", { name: "Previous question" });
  const next = screen.getByRole("button", { name: /^Next question:/ });
  expect(previous).toBeDisabled();
  expect(next).toBeEnabled();
  expect(next).toHaveAccessibleName(`Next question: ${claim.thread[0].question}`);
  expectTranscript(claim, 0);
  fireEvent.click(previous);
  expectTranscript(claim, 0);

  for (let sentTurns = 1; sentTurns <= claim.thread.length; sentTurns++) {
    fireEvent.click(next);
    finishReply();
    expectTranscript(claim, sentTurns);
    expect(previous).toBeEnabled();
  }
  expect(next).toBeDisabled();
  const endLabel = claim === practice.demo.claims.at(-1) ? practice.demo.trackEndLabel : practice.demo.endLabel;
  expect(next).toHaveAccessibleName(`Next question: ${endLabel}`);
  fireEvent.click(next);
  expectTranscript(claim, claim.thread.length);
  for (let sentTurns = claim.thread.length - 1; sentTurns >= 0; sentTurns--) {
    fireEvent.click(previous);
    expectTranscript(claim, sentTurns);
    expect(next).toBeEnabled();
    expect(screen.queryByRole("button", { name: /^Next headline:/ })).not.toBeInTheDocument();
  }
  expect(previous).toBeDisabled();
  expect(next).toHaveAccessibleName(`Next question: ${claim.thread[0].question}`);
  fireEvent.click(previous);
  expectTranscript(claim, 0);
});

it("starts with the default example and replaces the transcript when a claim is selected", () => {
  const initialClaim = practice.demo.claims[practice.demo.defaultClaim];
  const alternativeClaim = practice.demo.claims.find((claim) => claim !== initialClaim)!;
  render(<PracticeCard />);
  expect(screen.getByRole("button", { name: initialClaim.bar })).toHaveAttribute("aria-pressed", "true");
  expectTranscript(initialClaim, 0);
  expect(screen.getByRole("button", { name: /^Next question:/ })).toHaveAccessibleName(`Next question: ${initialClaim.thread[0].question}`);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  finishReply();
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  finishReply();
  expectTranscript(initialClaim, 2);

  fireEvent.click(screen.getByRole("button", { name: alternativeClaim.bar }));
  expectTranscript(alternativeClaim, 0);
  expect(screen.getByRole("button", { name: /^Next question:/ })).toHaveAccessibleName(`Next question: ${alternativeClaim.thread[0].question}`);
  const messages = within(screen.getByRole("log", { name: "Example conversation" }));
  expect(messages.queryByText(initialClaim.claim)).not.toBeInTheDocument();
  for (const turn of initialClaim.thread) {
    expect(messages.queryByText(turn.question)).not.toBeInTheDocument();
    expect(messages.queryByText(turn.feedback)).not.toBeInTheDocument();
  }
  expect(screen.getByRole("button", { name: "Previous question" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: initialClaim.bar }));
  expectTranscript(initialClaim, 0);
  expect(screen.getByRole("button", { name: /^Next question:/ })).toHaveAccessibleName(`Next question: ${initialClaim.thread[0].question}`);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  fireEvent.click(screen.getByRole("button", { name: initialClaim.bar }));
  expectTranscript(initialClaim, 0);
});

it("walks through the headline track in order and waits for each final reply before advancing", () => {
  render(<PracticeCard />);
  const claims = practice.demo.claims;
  const selectors = within(screen.getByRole("group", { name: practice.demo.switcherLabel }));
  expect(selectors.getAllByRole("button")).toHaveLength(claims.length);
  selectors.getAllByRole("button").forEach((button, index) => expect(button).toHaveAccessibleName(claims[index].bar));

  for (const [index, claim] of claims.entries()) {
    expect(selectors.getByRole("button", { name: claim.bar })).toHaveAttribute("aria-pressed", "true");
    expectTranscript(claim, 0);
    expect(screen.queryByRole("button", { name: /^Next headline:/ })).not.toBeInTheDocument();
    const composer = screen.getByRole("button", { name: /^Next question:/ });
    expect(composer).toHaveAccessibleName(`Next question: ${claim.thread[0].question}`);

    for (let turn = 0; turn < claim.thread.length - 1; turn++) {
      fireEvent.click(composer);
      finishReply();
      expectTranscript(claim, turn + 1);
      expect(screen.queryByRole("button", { name: /^Next headline:/ })).not.toBeInTheDocument();
    }

    fireEvent.click(composer);
    const following = claims[index + 1];
    const advance = following
      ? screen.getByRole("button", { name: `${practice.demo.nextHeadlineAction}: ${following.bar}` })
      : null;
    if (advance) {
      expect(advance).toHaveTextContent(practice.demo.nextHeadlineLabel);
      expect(advance).toBeDisabled();
      fireEvent.click(advance);
      expect(screen.getByText(claim.claim)).toBeVisible();
    }
    act(() => vi.advanceTimersByTime(practice.demo.responseDelayMs));
    if (advance) expect(advance).toBeDisabled();
    act(() => vi.advanceTimersByTime(practice.demo.responseRevealMs - 1));
    if (advance) expect(advance).toBeDisabled();
    act(() => vi.advanceTimersByTime(1));
    expectTranscript(claim, claim.thread.length);
    expect(composer).toBeDisabled();

    if (advance && following) {
      expect(composer).toHaveAccessibleName(`Next question: ${practice.demo.endLabel}`);
      expect(advance).toBeEnabled();
      advance.focus();
      fireEvent.click(advance);
      expectTranscript(following, 0);
      expect(screen.queryByText(claim.claim)).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Previous question" })).toBeDisabled();
      expect(screen.getByRole("button", { name: /^Next question:/ })).toHaveFocus();
    } else {
      expect(screen.queryByRole("button", { name: /^Next headline:/ })).not.toBeInTheDocument();
      expect(composer).toHaveAccessibleName(`Next question: ${practice.demo.trackEndLabel}`);
      fireEvent.click(composer);
      finishReply();
      expectTranscript(claim, claim.thread.length);
    }
  }
});

it("shows each example's sources and clears sources from the previous example", () => {
  render(<PracticeCard />);
  for (const claim of practice.demo.claims) {
    fireEvent.click(screen.getByRole("button", { name: claim.bar }));
    const messages = within(screen.getByRole("log", { name: "Example conversation" }));
    const sourceLinks = messages.getAllByRole("link");
    expect(sourceLinks).toHaveLength(claim.sources.length);
    for (const source of claim.sources) {
      expect(messages.getByRole("link", { name: (name) => name.startsWith(source.label) })).toHaveAttribute("href", source.href);
    }
    for (const other of practice.demo.claims.filter((item) => item !== claim)) {
      for (const source of other.sources.filter((item) => !claim.sources.some((current) => current.href === item.href))) {
        expect(sourceLinks.some((link) => link.getAttribute("href") === source.href)).toBe(false);
      }
    }
  }
});

it("buffers the reply, unveils an inaccessible provisional row, and releases controls at completion", () => {
  const claim = practice.demo.claims[practice.demo.defaultClaim];
  render(<PracticeCard />);
  const next = screen.getByRole("button", { name: /^Next question:/ });
  const previous = screen.getByRole("button", { name: "Previous question" });
  next.focus();
  expect(next).toHaveFocus();
  fireEvent.click(next);
  const messages = within(screen.getByRole("log", { name: "Example conversation" }));
  expect(messages.getByText(claim.thread[0].question)).toBeVisible();
  const provisionalRow = messages.getByText(claim.thread[0].feedback).closest("[data-phase]");
  expect(provisionalRow).toHaveAttribute("aria-hidden", "true");
  expect(provisionalRow).toHaveAttribute("data-phase", "waiting");
  expect(messages.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.typingLabel);
  expect(next).toHaveAttribute("aria-disabled", "true");
  expect(next).not.toBeDisabled();
  expect(next).toHaveFocus();
  expect(previous).toBeDisabled();

  fireEvent.click(next);
  fireEvent.click(previous);
  expect(messages.getAllByText(claim.thread[0].question)).toHaveLength(1);
  expect(vi.getTimerCount()).toBe(1);
  act(() => vi.advanceTimersByTime(practice.demo.responseDelayMs - 1));
  expect(messages.getAllByRole("listitem")).toHaveLength(2);
  expect(provisionalRow).toHaveAttribute("data-phase", "waiting");
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.typingLabel);
  act(() => vi.advanceTimersByTime(1));
  expect(messages.getByText(claim.thread[0].feedback).closest('[aria-hidden="true"]')).not.toBeNull();
  expect(provisionalRow).toHaveAttribute("data-phase", "revealing");
  expect(messages.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.streamingLabel);
  expect(next).toHaveAttribute("aria-disabled", "true");
  expect(previous).toBeDisabled();
  expect(next).toHaveFocus();

  fireEvent.click(next);
  expect(messages.getAllByText(claim.thread[0].question)).toHaveLength(1);
  expect(vi.getTimerCount()).toBe(1);

  act(() => vi.advanceTimersByTime(practice.demo.responseRevealMs - 1));
  expect(messages.getByText(claim.thread[0].feedback).closest('[aria-hidden="true"]')).not.toBeNull();
  expect(messages.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.streamingLabel);
  expect(next).toHaveAttribute("aria-disabled", "true");
  expect(previous).toBeDisabled();
  act(() => vi.advanceTimersByTime(1));
  expectTranscript(claim, 1);
  expect(messages.getByText(claim.thread[0].feedback).closest('[aria-hidden="true"]')).toBeNull();
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  expect(next).toBeEnabled();
  expect(next).not.toHaveAttribute("aria-disabled", "true");
  expect(next).toHaveFocus();
  expect(previous).toBeEnabled();
  expect(vi.getTimerCount()).toBe(0);
});

it.each([
  { selection: "changing", phase: "waiting" },
  { selection: "reselecting", phase: "waiting" },
  { selection: "changing", phase: "revealing" },
  { selection: "reselecting", phase: "revealing" },
])("cancels the $phase reply when $selection an example", ({ selection, phase }) => {
  const claim = practice.demo.claims[practice.demo.defaultClaim];
  const selected = selection === "changing" ? practice.demo.claims.find((item) => item !== claim)! : claim;
  render(<PracticeCard />);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  act(() => vi.advanceTimersByTime(phase === "waiting" ? Math.floor(practice.demo.responseDelayMs / 2) : practice.demo.responseDelayMs + Math.floor(practice.demo.responseRevealMs / 2)));
  expect(vi.getTimerCount()).toBe(1);
  expect(screen.getByText(claim.thread[0].feedback).closest("[data-phase]")).toHaveAttribute("data-phase", phase);
  fireEvent.click(screen.getByRole("button", { name: selected.bar }));
  expectTranscript(selected, 0);
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  expect(vi.getTimerCount()).toBe(0);
  finishReply();
  expectTranscript(selected, 0);
  expect(screen.getByRole("button", { name: "Previous question" })).toBeDisabled();
  expect(screen.getByRole("button", { name: /^Next question:/ })).toBeEnabled();
  expect(screen.getByRole("button", { name: /^Next question:/ })).not.toHaveAttribute("aria-disabled", "true");

  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  finishReply();
  expectTranscript(selected, 1);
});

it.each(["waiting", "revealing"])("clears the %s timer when the conversation unmounts", (phase) => {
  const { unmount } = render(<PracticeCard />);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  if (phase === "revealing") act(() => vi.advanceTimersByTime(practice.demo.responseDelayMs));
  expect(vi.getTimerCount()).toBe(1);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
  finishReply();
  expect(screen.queryByRole("log")).not.toBeInTheDocument();
});

it("shows the whole reply after the buffer when reduced motion is preferred", () => {
  vi.mocked(window.matchMedia).mockReturnValue({ ...window.matchMedia("(prefers-reduced-motion: reduce)"), matches: true });
  const claim = practice.demo.claims[practice.demo.defaultClaim];
  render(<PracticeCard />);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  act(() => vi.advanceTimersByTime(practice.demo.responseDelayMs - 1));
  expect(within(screen.getByRole("log", { name: "Example conversation" })).getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.typingLabel);
  act(() => vi.advanceTimersByTime(1));
  expectTranscript(claim, 1);
  expect(screen.getByText(claim.thread[0].feedback).closest('[aria-hidden="true"]')).toBeNull();
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  expect(screen.getByRole("button", { name: /^Next question:/ })).not.toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("button", { name: "Previous question" })).toBeEnabled();
  expect(vi.getTimerCount()).toBe(0);
});
