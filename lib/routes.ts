import { chrome } from "@/content/chrome";

// The whole site is one page; navigation jumps to its two sections.
export const routes = [
  { href: "/", label: chrome.nav.home },
  { href: "/#method", label: chrome.nav.why },
  { href: "/#examine", label: chrome.nav.practice },
] as const;

// Why · Examine. Keep the original Method fragment for existing section links.
export const navRoutes = routes.filter((r) => r.href !== "/");
