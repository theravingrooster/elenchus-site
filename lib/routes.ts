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

// Nav order: Method · Practice · For · Ask. The wordmark links home.
export const navRoutes = routes.slice(1);
