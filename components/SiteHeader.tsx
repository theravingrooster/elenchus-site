"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { chrome } from "@/content/chrome";
import { navRoutes } from "@/lib/routes";
import { CommandPalette } from "./CommandPalette";

export function SiteHeader() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="border-b border-rule">
      {/* DESIGN.md top status line */}
      <div className="border-b border-rule">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-2 md:px-12 lg:px-20">
          <p className="mono-label">{chrome.status}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-6 py-5 md:px-12 lg:px-20">
        <Link href="/" className="font-serif text-xl tracking-[0.18em]" aria-current={pathname === "/" ? "page" : undefined}>
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
                aria-current={pathname === route.href ? "page" : undefined}
                className="mono-label underline-offset-[6px] hover:underline aria-[current=page]:underline"
              >
                {route.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn hidden sm:inline-flex"
            onClick={() => setPaletteOpen(true)}
            aria-label={chrome.palette.placeholder}
          >
            {chrome.palette.hint}
          </button>
          <Link href="/ask" className="btn btn-primary hidden md:inline-flex">
            {chrome.waitlistVerb}
          </Link>
          <button
            type="button"
            className="btn md:hidden"
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
                  aria-current={pathname === route.href ? "page" : undefined}
                  className="mono-label block py-4 aria-[current=page]:underline"
                >
                  {route.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href="/ask" onClick={() => setDrawerOpen(false)} className="btn btn-primary">
                {chrome.waitlistVerb}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
