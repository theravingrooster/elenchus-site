import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteGrid } from "@/components/SiteGrid";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { chrome } from "@/content/chrome";
import { getPageMetadata } from "@/lib/metadata";
import "./globals.css";

// DESIGN.md: a sharp serif with real italics for display and body; mono for labels.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = getPageMetadata("/");

// DESIGN.md: v1 is dark (#19). Browser chrome matches paper.
export const viewport: Viewport = { themeColor: "#0E0D0B", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col text-ink">
        <a href="#main-content" className="skip-link">{chrome.skipToContent}</a>
        {/* Paper comes from <html>, so the fixed grid at z-index -1 shows through the body. */}
        <SiteGrid />
        <SmoothScroll />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
