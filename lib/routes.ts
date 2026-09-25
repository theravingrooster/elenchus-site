import { chrome } from "@/content/chrome";

// v1 is exactly five routes (/docs/PAGES.md). Do not add to this list
// without a human decision.
export const routes = [
  { href: "/", label: chrome.nav.home },
  { href: "/method", label: chrome.nav.method },
  { href: "/practice", label: chrome.nav.practice },
  { href: "/for", label: chrome.nav.for },
  { href: "/ask", label: chrome.nav.ask },
] as const;

// PAGES.md nav order: Method · Examine · Who (/method, /practice, /for).
// /ask stays a page and stays in the ⌘K palette, but is not in the nav.
// The wordmark links home.
export const navRoutes = routes.filter((r) => r.href !== "/" && r.href !== "/ask");
