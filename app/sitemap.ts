import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCaseSlugs } from "@/lib/work";

const BASE = "https://montraxportfolios.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/work", "/about", "/services", "/contact"];
  const casePaths = getCaseSlugs().map((slug) => `/work/${slug}`);

  return routing.locales.flatMap((locale) =>
    [...staticPaths, ...casePaths].map((p) => ({
      url: `${BASE}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
}
