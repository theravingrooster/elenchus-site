import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { PracticeCard } from "@/components/PracticeCard";
import { practice } from "@/content/practice";

function expectTranscript(claim: typeof practice.demo.claims[number], index: number) {
  const messages = within(screen.getByRole("log", { name: "Example conversation" }));
  expect(messages.getAllByRole("listitem")).toHaveLength(1 + 2 * (index + 1));
  expect(messages.getByText(claim.claim)).toBeVisible();
  for (const [turnIndex, turn] of claim.thread.entries()) {
    if (turnIndex <= index) {
      expect(messages.getByText(turn.question)).toBeVisible();
      expect(messages.getByText(turn.feedback)).toBeVisible();
    } else {
      expect(messages.queryByText(turn.question)).not.toBeInTheDocument();
      expect(messages.queryByText(turn.feedback)).not.toBeInTheDocument();
    }
  }
  expect(screen.getByText(`${String(index + 1).padStart(2, "0")} / 04`)).toBeVisible();
}

it.each(practice.demo.claims)("appends and removes recorded $bar replies within the conversation", async (claim) => {
  const user = userEvent.setup();
  render(<PracticeCard />);
  await user.click(screen.getByRole("button", { name: claim.bar }));
  expect(screen.getByRole("button", { name: claim.bar })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  for (const other of practice.demo.claims.filter((item) => item !== claim)) {
    expect(screen.queryByText(other.claim)).not.toBeInTheDocument();
  }

  const previous = screen.getByRole("button", { name: "Previous question" });
  const next = screen.getByRole("button", { name: /^Next question:/ });
  expect(previous).toBeDisabled();
  expect(next).toBeEnabled();
  expect(next).toHaveAccessibleName(`Next question: ${claim.thread[1].question}`);
  expectTranscript(claim, 0);
  await user.click(previous);
  expectTranscript(claim, 0);

  for (let index = 1; index < claim.thread.length; index++) {
    await user.click(next);
    expectTranscript(claim, index);
    expect(previous).toBeEnabled();
  }
  expect(next).toBeDisabled();
  expect(next).toHaveAccessibleName("Next question: End of example");
  await user.click(next);
  expectTranscript(claim, claim.thread.length - 1);
  await user.click(previous);
  expectTranscript(claim, claim.thread.length - 2);
  expect(next).toBeEnabled();
});

it("starts with Wine and replaces the transcript when a claim is selected", async () => {
  const user = userEvent.setup();
  const [wine, water] = practice.demo.claims;
  render(<PracticeCard />);
  expect(screen.getByRole("button", { name: "Wine" })).toHaveAttribute("aria-pressed", "true");
  expectTranscript(wine, 0);
  await user.click(screen.getByRole("button", { name: /^Next question:/ }));
  await user.click(screen.getByRole("button", { name: /^Next question:/ }));
  expectTranscript(wine, 2);

  await user.click(screen.getByRole("button", { name: water.bar }));
  expectTranscript(water, 0);
  const messages = within(screen.getByRole("log", { name: "Example conversation" }));
  expect(messages.queryByText(wine.claim)).not.toBeInTheDocument();
  for (const turn of wine.thread) {
    expect(messages.queryByText(turn.question)).not.toBeInTheDocument();
    expect(messages.queryByText(turn.feedback)).not.toBeInTheDocument();
  }
  expect(screen.getByRole("button", { name: "Previous question" })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: wine.bar }));
  expectTranscript(wine, 0);
  await user.click(screen.getByRole("button", { name: /^Next question:/ }));
  await user.click(screen.getByRole("button", { name: wine.bar }));
  expectTranscript(wine, 0);
});
