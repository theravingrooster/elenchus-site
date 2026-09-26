import { chrome } from "@/content/chrome";

// PAGES.md (#27): Home, Method, and /ask are pages. Examine and Who are anchors on Home.
// Do not add to this list without a human decision.
export const routes = [
  { href: "/", label: chrome.nav.home },
  { href: "/method", label: chrome.nav.method },
  { href: "/#examine", label: chrome.nav.practice },
  { href: "/#who", label: chrome.nav.for },
  { href: "/ask", label: chrome.nav.ask },
] as const;

// PAGES.md nav order: Method · Examine · Who (/method, /#examine, /#who).
// /ask stays a page and stays in the ⌘K palette, but is not in the nav.
// The wordmark links home.
export const navRoutes = routes.filter((r) => r.href !== "/" && r.href !== "/ask");
