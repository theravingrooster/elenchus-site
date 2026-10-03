import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { PracticeCard } from "@/components/PracticeCard";
import { practice } from "@/content/practice";

function expectTurn(claim: typeof practice.demo.claims[number], index: number) {
  expect(screen.getByText(claim.claim)).toBeVisible();
  expect(screen.getByText(claim.thread[index].question)).toBeVisible();
  expect(screen.getByText(claim.thread[index].feedback)).toBeVisible();
  for (const [otherIndex, turn] of claim.thread.entries()) {
    if (otherIndex !== index) expect(screen.queryByText(turn.question)).not.toBeInTheDocument();
  }
  expect(screen.getByText(`${String(index + 1).padStart(2, "0")} / 04`)).toBeVisible();
}

it.each(practice.demo.claims)("shows and navigates one $bar question at a time", async (claim) => {
  const user = userEvent.setup();
  render(<PracticeCard />);
  await user.click(screen.getByRole("button", { name: claim.bar }));
  expect(screen.getByRole("button", { name: claim.bar })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  for (const other of practice.demo.claims.filter((item) => item !== claim)) {
    expect(screen.queryByText(other.claim)).not.toBeInTheDocument();
  }

  const previous = screen.getByRole("button", { name: "Previous question" });
  const next = screen.getByRole("button", { name: "Next question" });
  expect(previous).toBeDisabled();
  expect(next).toBeEnabled();
  expectTurn(claim, 0);
  await user.click(previous);
  expectTurn(claim, 0);

  for (let index = 1; index < claim.thread.length; index++) {
    await user.click(next);
    expectTurn(claim, index);
    expect(previous).toBeEnabled();
  }
  expect(next).toBeDisabled();
  await user.click(next);
  expectTurn(claim, claim.thread.length - 1);
  await user.click(previous);
  expectTurn(claim, claim.thread.length - 2);
  expect(next).toBeEnabled();
});

it("starts with Wine and resets to the first question whenever a claim is selected", async () => {
  const user = userEvent.setup();
  const [wine, water] = practice.demo.claims;
  render(<PracticeCard />);
  expect(screen.getByRole("button", { name: "Wine" })).toHaveAttribute("aria-pressed", "true");
  expectTurn(wine, 0);
  await user.click(screen.getByRole("button", { name: "Next question" }));
  await user.click(screen.getByRole("button", { name: "Next question" }));
  expectTurn(wine, 2);

  await user.click(screen.getByRole("button", { name: water.bar }));
  expectTurn(water, 0);
  expect(screen.getByRole("button", { name: "Previous question" })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: wine.bar }));
  expectTurn(wine, 0);
  await user.click(screen.getByRole("button", { name: "Next question" }));
  await user.click(screen.getByRole("button", { name: wine.bar }));
  expectTurn(wine, 0);
});
