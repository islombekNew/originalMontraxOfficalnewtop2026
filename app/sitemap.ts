import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCaseSlugs } from "@/lib/work";
import { SITE_URL as BASE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/work", "/about", "/services", "/contact"];
  const casePaths = (await getCaseSlugs()).map((slug) => `/work/${slug}`);

  return routing.locales.flatMap((locale) =>
    [...staticPaths, ...casePaths].map((p) => ({
      url: `${BASE}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
}
