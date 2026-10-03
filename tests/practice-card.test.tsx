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

function partialReply(text: string, chunks: number) {
  return text.split(/\s+/).slice(0, chunks * practice.demo.responseChunkSize).join(" ");
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
  expect(next).toHaveAccessibleName("Next question: End of example");
  fireEvent.click(next);
  expectTranscript(claim, claim.thread.length);
  for (let sentTurns = claim.thread.length - 1; sentTurns >= 0; sentTurns--) {
    fireEvent.click(previous);
    expectTranscript(claim, sentTurns);
    expect(next).toBeEnabled();
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

it("buffers the reply, reveals words in chunks, and releases controls only at completion", () => {
  const claim = practice.demo.claims[practice.demo.defaultClaim];
  render(<PracticeCard />);
  const next = screen.getByRole("button", { name: /^Next question:/ });
  const previous = screen.getByRole("button", { name: "Previous question" });
  next.focus();
  expect(next).toHaveFocus();
  fireEvent.click(next);
  const messages = within(screen.getByRole("log", { name: "Example conversation" }));
  expect(messages.getByText(claim.thread[0].question)).toBeVisible();
  expect(messages.queryByText(claim.thread[0].feedback)).not.toBeInTheDocument();
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
  expect(messages.queryByText(claim.thread[0].feedback)).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.typingLabel);
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByText(partialReply(claim.thread[0].feedback, 1))).toBeVisible();
  expect(screen.getByText(partialReply(claim.thread[0].feedback, 1)).closest('[aria-hidden="true"]')).not.toBeNull();
  expect(messages.queryByText(claim.thread[0].feedback)).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.streamingLabel);
  expect(next).toHaveAttribute("aria-disabled", "true");
  expect(previous).toBeDisabled();
  expect(next).toHaveFocus();

  act(() => vi.advanceTimersByTime(practice.demo.responseChunkDelayMs - 1));
  expect(screen.getByText(partialReply(claim.thread[0].feedback, 1))).toBeVisible();
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByText(partialReply(claim.thread[0].feedback, 2))).toBeVisible();
  expect(screen.getByText(partialReply(claim.thread[0].feedback, 2)).closest('[aria-hidden="true"]')).not.toBeNull();
  fireEvent.click(next);
  expect(messages.getAllByText(claim.thread[0].question)).toHaveLength(1);
  expect(vi.getTimerCount()).toBe(1);

  const chunks = Math.ceil(claim.thread[0].feedback.split(/\s+/).length / practice.demo.responseChunkSize);
  act(() => vi.advanceTimersByTime((chunks - 2) * practice.demo.responseChunkDelayMs - 1));
  expect(messages.queryByText(claim.thread[0].feedback)).not.toBeInTheDocument();
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
  { selection: "changing", phase: "streaming" },
  { selection: "reselecting", phase: "streaming" },
])("cancels the $phase reply when $selection an example", ({ selection, phase }) => {
  const claim = practice.demo.claims[practice.demo.defaultClaim];
  const selected = selection === "changing" ? practice.demo.claims.find((item) => item !== claim)! : claim;
  render(<PracticeCard />);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  act(() => vi.advanceTimersByTime(phase === "waiting" ? Math.floor(practice.demo.responseDelayMs / 2) : practice.demo.responseDelayMs + practice.demo.responseChunkDelayMs));
  expect(vi.getTimerCount()).toBe(1);
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

it.each(["waiting", "streaming"])("clears the %s timer when the conversation unmounts", (phase) => {
  const { unmount } = render(<PracticeCard />);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  if (phase === "streaming") act(() => vi.advanceTimersByTime(practice.demo.responseDelayMs));
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
  expect(screen.queryByText(claim.thread[0].feedback)).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent(practice.demo.typingLabel);
  act(() => vi.advanceTimersByTime(1));
  expectTranscript(claim, 1);
  expect(screen.getByText(claim.thread[0].feedback).closest('[aria-hidden="true"]')).toBeNull();
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  expect(screen.getByRole("button", { name: /^Next question:/ })).not.toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("button", { name: "Previous question" })).toBeEnabled();
  expect(vi.getTimerCount()).toBe(0);
});
