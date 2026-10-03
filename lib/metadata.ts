import type { Metadata } from "next";
import { ask } from "@/content/ask";
import { chrome } from "@/content/chrome";
import { home } from "@/content/home";
import { method } from "@/content/method";

export const SITE_ORIGIN = "https://elenchus-site.vercel.app";

const pages = {
  "/": {
    title: chrome.siteName,
    description: `${home.display} ${home.sentence}`,
  },
  "/method": {
    title: method.title,
    description: `${method.steps.steps.join(". ")}.`,
  },
  "/ask": {
    title: ask.title,
    description: `${ask.intro.heading} ${ask.closing.question}`,
  },
} as const;

export type PagePath = keyof typeof pages;

// Supply complete nested objects: Next replaces rather than deeply merges them.
export function getPageMetadata(path: PagePath): Metadata {
  const page = pages[path];
  const title = path === "/" ? page.title : `${page.title} · ${chrome.siteName}`;
  const image = {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: home.display,
  };

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title:
      path === "/"
        ? { default: page.title, template: `%s · ${chrome.siteName}` }
        : { absolute: title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: chrome.siteName,
      title,
      description: page.description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [image],
    },
  };
}
