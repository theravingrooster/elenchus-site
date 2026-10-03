import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  // PAGES.md: Examine and Who are Home anchors; old routes redirect to them.
  return ["/", "/method", "/ask"].map((path) => ({
    url: new URL(path, SITE_ORIGIN).href,
  }));
}
