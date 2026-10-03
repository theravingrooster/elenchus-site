"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { chrome } from "@/content/chrome";
import { navRoutes } from "@/lib/routes";
import { CommandPalette } from "./CommandPalette";

export function SiteHeader() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  // Next's client navigation uses pushState, which does not emit hashchange.
  // Update the chosen section for links and the palette; history events sync Back/Forward.
  const onNavigate = useCallback((href: string) => {
    setHash(href.startsWith("/#") ? href.slice(1) : "");
    setDrawerOpen(false);
  }, []);
  const currentHref = pathname === "/" ? `/${hash}` : pathname;
  const currentFor = (href: string) =>
    currentHref === href ? (href.includes("#") ? "location" : "page") : undefined;

  return (
    <header className="border-b border-rule">
      {/* DESIGN.md top status line */}
      <div className="border-b border-rule">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-2 md:px-12 lg:px-20">
          <p className="mono-label">{chrome.status}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-3 px-4 py-5 sm:gap-6 sm:px-6 md:px-12 lg:px-20">
        <Link href="/" onNavigate={() => onNavigate("/")} className="shrink-0 font-serif text-xl tracking-[0.18em]" aria-current={currentFor("/")}>
          {chrome.wordmark}
        </Link>

        <nav className="hidden items-center gap-3 md:flex" aria-label="Primary">
          {navRoutes.map((route, i) => (
            <Fragment key={route.href}>
              {i > 0 && (
                <span aria-hidden="true" className="mono-label">
                  ·
                </span>
              )}
              <Link
                href={route.href}
                onNavigate={() => onNavigate(route.href)}
                aria-current={currentFor(route.href)}
                className="mono-label underline-offset-[6px] hover:underline aria-[current=page]:underline aria-[current=location]:underline"
              >
                {route.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="btn max-sm:px-3"
            onClick={() => {
              setDrawerOpen(false);
              setPaletteOpen(true);
            }}
            aria-label={chrome.palette.placeholder}
          >
            <span className="sm:hidden">{chrome.palette.trigger}</span>
            <span className="hidden sm:inline">{chrome.palette.hint}</span>
          </button>
          <button
            type="button"
            className="btn max-sm:px-3 md:hidden"
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? chrome.menu.close : chrome.menu.open}
          </button>
        </div>
      </div>

      {/* PAGES.md: simple drawer on small screens, no hamburger animation. */}
      {drawerOpen && (
        <nav id="site-drawer" className="border-t border-rule md:hidden" aria-label="Primary">
          <ul className="mx-auto max-w-[88rem] px-6">
            {navRoutes.map((route) => (
              <li key={route.href} className="border-b border-rule last:border-b-0">
                <Link
                  href={route.href}
                  onClick={() => setDrawerOpen(false)}
                  onNavigate={() => onNavigate(route.href)}
                  aria-current={currentFor(route.href)}
                  className="mono-label block py-4 aria-[current=page]:underline aria-[current=location]:underline"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onNavigate={onNavigate} />
    </header>
  );
}
