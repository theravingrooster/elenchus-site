import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  // Method and Examine are sections of the single authored page.
  return [{ url: new URL("/", SITE_ORIGIN).href }];
}
