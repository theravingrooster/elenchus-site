import { chrome } from "@/content/chrome";

// The whole site is one page; navigation jumps to its two sections.
export const routes = [
  { href: "/", label: chrome.nav.home },
  { href: "/#method", label: chrome.nav.method },
  { href: "/#examine", label: chrome.nav.practice },
] as const;

// Method · Examine. The wordmark links to the top of Home.
export const navRoutes = routes.filter((r) => r.href !== "/");
