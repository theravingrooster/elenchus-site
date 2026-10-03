import type { AnchorHTMLAttributes } from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";

const navigation = vi.hoisted(() => ({ pathname: "/", push: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: navigation.push }),
}));

// Keep Next's normal onNavigate contract, without mounting the App Router.
vi.mock("next/link", () => ({
  default: ({ href, onNavigate, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    onNavigate?: (event: { preventDefault: () => void }) => void;
  }) => (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank") return;
        event.preventDefault();
        let cancelled = false;
        onNavigate?.({ preventDefault: () => { cancelled = true; } });
        if (!cancelled) navigation.push(href);
      }}
    />
  ),
}));

beforeEach(() => {
  navigation.pathname = "/";
  navigation.push.mockImplementation((href: string) => {
    window.history.pushState(null, "", href);
    navigation.pathname = window.location.pathname;
  });
});

function primaryLink(name: string) {
  return within(screen.getByRole("navigation", { name: "Primary" })).getByRole("link", { name });
}

describe("site navigation", () => {
  it.each([
    ["method", "Method"],
    ["examine", "Examine"],
  ])("marks the section on an initial #%s visit", (hash, label) => {
    window.history.replaceState(null, "", `/#${hash}`);
    render(<SiteHeader />);
    expect(primaryLink(label)).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "ELENCHUS" })).not.toHaveAttribute("aria-current");
  });

  it("updates for hash changes and browser history events", () => {
    render(<SiteHeader />);
    act(() => {
      window.history.pushState(null, "", "/#examine");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(primaryLink("Examine")).toHaveAttribute("aria-current", "location");

    act(() => {
      window.history.replaceState(null, "", "/#method");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(primaryLink("Method")).toHaveAttribute("aria-current", "location");
    expect(primaryLink("Examine")).not.toHaveAttribute("aria-current");

    act(() => {
      window.history.replaceState(null, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(primaryLink("Method")).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "ELENCHUS" })).toHaveAttribute("aria-current", "page");
  });

  it("updates ordinary Link navigation without waiting for hashchange", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const navigationLinks = within(screen.getByRole("navigation", { name: "Primary" })).getAllByRole("link");
    expect(navigationLinks.map((link) => link.getAttribute("href"))).toEqual(["/#method", "/#examine"]);
    await user.click(primaryLink("Method"));
    expect(primaryLink("Method")).toHaveAttribute("aria-current", "location");
    await user.click(primaryLink("Examine"));
    expect(primaryLink("Examine")).toHaveAttribute("aria-current", "location");
    expect(primaryLink("Method")).not.toHaveAttribute("aria-current");

    await user.click(screen.getByRole("link", { name: "ELENCHUS" }));
    expect(screen.getByRole("link", { name: "ELENCHUS" })).toHaveAttribute("aria-current", "page");
    expect(primaryLink("Method")).not.toHaveAttribute("aria-current");
    expect(primaryLink("Examine")).not.toHaveAttribute("aria-current");
  });

  it.each(["Control", "Meta"])("opens with %s+K and closes with Escape", async (modifier) => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.keyboard(`{${modifier}>}k{/${modifier}}`);
    expect(screen.getByRole("dialog", { name: "Jump to a section" })).toBeVisible();
    expect(screen.getByRole("combobox")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters the real command palette, navigates, and closes it", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Jump to a section" }));
    expect(screen.getAllByRole("option")).toHaveLength(3);
    for (const name of ["Home", "Method", "Examine"]) {
      expect(screen.getByRole("option", { name })).toBeVisible();
    }
    expect(screen.queryByRole("option", { name: "Who" })).not.toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Ask" })).not.toBeInTheDocument();
    await user.type(screen.getByRole("combobox"), "Method");
    expect(screen.getByRole("option", { name: "Method" })).toBeVisible();
    await user.keyboard("{Enter}");
    expect(navigation.push).toHaveBeenCalledWith("/#method");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(primaryLink("Method")).toHaveAttribute("aria-current", "location");
  });

  it("dismisses the mobile drawer after selecting a section", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const drawer = screen.getByRole("button", { name: "Close" }).getAttribute("aria-controls")!;
    const drawerNav = document.getElementById(drawer)!;
    await user.click(within(drawerNav).getByRole("link", { name: "Examine" }));
    expect(document.getElementById(drawer)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
    expect(primaryLink("Examine")).toHaveAttribute("aria-current", "location");
  });
});
