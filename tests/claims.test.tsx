import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ClaimsProvider } from "@/components/ClaimsProvider";
import { PracticeCard } from "@/components/PracticeCard";
import { practice, type DemoClaim } from "@/content/practice";

const sdk = vi.hoisted(() => ({
  createClient: vi.fn(),
  from: vi.fn(),
  select: vi.fn(),
  eq: vi.fn(),
  order: vi.fn(),
  abortSignal: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@supabase/supabase-js", () => ({ createClient: sdk.createClient }));

import { getClaims } from "@/lib/claims";

const url = "https://example.test";
const anonKey = "test-anon-key";
const claim: DemoClaim = {
  bar: "Energy",
  claim: "A new report predicts lower household energy use.",
  sources: [{ label: "Energy report", href: "https://example.test/energy" }],
  thread: [
    { question: "Lower use compared with what?", feedback: "Compare the projection with its stated baseline." },
    { question: "Which households were counted?", feedback: "Check whether the sample covers the affected households." },
    { question: "What behavior does the forecast assume?", feedback: "Identify the changes the forecast relies on." },
    { question: "What would change the estimate?", feedback: "Test the forecast with plausible alternative assumptions." },
  ],
};
const otherClaim: DemoClaim = {
  ...claim,
  bar: "Transport",
  claim: "A new report predicts shorter journeys.",
  sources: [{ label: "Transport report", href: "https://example.test/transport" }],
};

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", url);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", anonKey);
  Object.values(sdk).forEach((mock) => mock.mockReset());
  sdk.createClient.mockReturnValue({ from: sdk.from });
  sdk.from.mockReturnValue({ select: sdk.select });
  sdk.select.mockReturnValue({ eq: sdk.eq });
  sdk.eq.mockReturnValue({ order: sdk.order });
  sdk.order.mockReturnValue({ abortSignal: sdk.abortSignal });
  sdk.abortSignal.mockResolvedValue({ data: [claim], error: null });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("server claim loading", () => {
  it.each(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"])(
    "returns local examples without creating a client when %s is missing",
    async (name) => {
      vi.stubEnv(name, undefined);
      expect(await getClaims()).toBe(practice.demo.claims);
      expect(sdk.createClient).not.toHaveBeenCalled();
    },
  );

  it("queries published claims in position order and returns only the chat fields", async () => {
    sdk.abortSignal.mockResolvedValue({
      data: [
        { ...claim, id: "energy", published: true, position: 0 },
        { ...otherClaim, id: "transport", published: true, position: 1 },
      ],
      error: null,
    });

    expect(await getClaims()).toEqual([claim, otherClaim]);
    expect(sdk.createClient).toHaveBeenCalledWith(url, anonKey, expect.objectContaining({
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    }));
    expect(sdk.from).toHaveBeenCalledWith("claims");
    expect(sdk.select).toHaveBeenCalledWith("bar,claim,sources,thread");
    expect(sdk.eq).toHaveBeenCalledWith("published", true);
    expect(sdk.order).toHaveBeenCalledWith("position", { ascending: true });
    expect(sdk.abortSignal).toHaveBeenCalledWith(expect.any(AbortSignal));
  });

  it("falls back when the query reports an error even if it includes data", async () => {
    sdk.abortSignal.mockResolvedValue({ data: [claim], error: { message: "Query unavailable" } });
    expect(await getClaims()).toBe(practice.demo.claims);
  });

  it("falls back when the query rejects", async () => {
    sdk.abortSignal.mockRejectedValue(new Error("Network unavailable"));
    expect(await getClaims()).toBe(practice.demo.claims);
  });

  it("falls back when client initialization throws", async () => {
    sdk.createClient.mockImplementationOnce(() => { throw new Error("Invalid URL"); });
    expect(await getClaims()).toBe(practice.demo.claims);
    expect(sdk.from).not.toHaveBeenCalled();
  });

  it.each([
    ["an empty result", []],
    ["a non-array result", null],
    ["a missing turn", [{ ...claim, thread: claim.thread.slice(0, 3) }]],
    ["an invalid reply", [{ ...claim, thread: [{ ...claim.thread[0], feedback: null }, ...claim.thread.slice(1)] }]],
    ["whitespace-only turn text", [{ ...claim, thread: [{ question: "  ", feedback: "\n\t" }, ...claim.thread.slice(1)] }]],
    ["empty sources", [{ ...claim, sources: [] }]],
    ["an invalid source", [{ ...claim, sources: [{ label: "Report", href: null }] }]],
    ["a mix of valid and invalid rows", [claim, { ...otherClaim, bar: "" }]],
  ])("falls back for %s", async (_description, data) => {
    sdk.abortSignal.mockResolvedValue({ data, error: null });
    expect(await getClaims()).toBe(practice.demo.claims);
  });

  it("adds a sixty-second refresh policy without losing request headers or cancellation", async () => {
    const response = new Response("ok");
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal("fetch", fetchMock);
    await getClaims();
    const options = sdk.createClient.mock.calls[0][2];
    const signal = new AbortController().signal;
    const init = { headers: { "x-test": "claim-request" }, signal };

    expect(await options.global.fetch("https://example.test/claims", init)).toBe(response);
    expect(fetchMock).toHaveBeenCalledWith("https://example.test/claims", {
      ...init, next: { revalidate: 60 },
    });
  });
});

it("uses loaded examples for the selectors, sources, composer, and conversation", async () => {
  sdk.abortSignal.mockResolvedValue({ data: [claim, otherClaim], error: null });
  const claims = await getClaims();
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  render(<ClaimsProvider claims={claims}><PracticeCard /></ClaimsProvider>);

  const selectors = within(screen.getByRole("group", { name: practice.demo.switcherLabel }));
  expect(selectors.getAllByRole("button").map((button) => button.textContent)).toEqual([claim.bar, otherClaim.bar]);
  expect(screen.getByText(claim.claim)).toBeVisible();
  expect(screen.getByRole("link", { name: /Energy report/ })).toHaveAttribute("href", claim.sources[0].href);
  expect(screen.getByRole("button", { name: /^Next question:/ })).toHaveAccessibleName(`Next question: ${claim.thread[0].question}`);
  for (const localClaim of practice.demo.claims) {
    expect(selectors.queryByRole("button", { name: localClaim.bar })).not.toBeInTheDocument();
  }

  fireEvent.click(selectors.getByRole("button", { name: otherClaim.bar }));
  expect(screen.getByText(otherClaim.claim)).toBeVisible();
  expect(screen.queryByText(claim.claim)).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Energy report/ })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Transport report/ })).toHaveAttribute("href", otherClaim.sources[0].href);
  fireEvent.click(screen.getByRole("button", { name: /^Next question:/ }));
  act(() => vi.runAllTimers());
  const transcript = within(screen.getByRole("log", { name: practice.demo.conversationLabel }));
  expect(transcript.getByText(otherClaim.thread[0].question)).toBeVisible();
  expect(transcript.getByText(otherClaim.thread[0].feedback)).toBeVisible();
  expect(transcript.getAllByRole("listitem")).toHaveLength(3);
});
