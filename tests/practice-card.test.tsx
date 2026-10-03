import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { PracticeCard } from "@/components/PracticeCard";
import { practice } from "@/content/practice";

it("switches the whole recorded thread and shows it for reduced-motion readers", async () => {
  const user = userEvent.setup();
  render(<PracticeCard />);
  expect(screen.getByRole("button", { name: "Wine" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("A glass of red wine a day is good for your heart.")).toBeVisible();

  for (const claim of practice.demo.claims) {
    await user.click(screen.getByRole("button", { name: claim.bar }));
    expect(screen.getByRole("button", { name: claim.bar })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
    const thread = screen.getByRole("list");
    expect(within(thread).getAllByRole("listitem")).toHaveLength(9);
    expect(within(thread).getByText(claim.claim)).toBeVisible();
    for (const turn of claim.thread) {
      expect(within(thread).getByText(turn.question)).toBeVisible();
      expect(within(thread).getByText(turn.feedback)).toBeVisible();
    }
    for (const other of practice.demo.claims.filter((item) => item !== claim)) {
      expect(within(thread).queryByText(other.claim)).not.toBeInTheDocument();
    }
    for (const bubble of within(thread).getAllByRole("listitem")) {
      expect(bubble).toHaveAttribute("data-hidden", "false");
    }
  }
});
