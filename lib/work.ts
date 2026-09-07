import { getDesignItems, getWorkItems } from "./cms/read";
import type { CaseMeta, DesignWork } from "./work-types";

export type { CaseMeta, DesignWork };
export type CaseStudy = CaseMeta & { body: string };

/** Ishlar endi CMS'dan keladi (admin panel). CMS bo'sh bo'lsa —
 *  content/work/*.mdx fayllari ishlatiladi, ya'ni sayt hech qachon bo'sh qolmaydi. */

function toMeta(
  w: Awaited<ReturnType<typeof getWorkItems>>[number],
  locale: string
): CaseMeta {
  const side = locale === "en" ? w.en : w.uz;
  const fb = locale === "en" ? w.uz : w.en;
  const pick = (a: string, b: string) => (a && a.trim() ? a : b);
  return {
    slug: w.slug,
    title: pick(side.title, fb.title),
    client: pick(side.client, fb.client),
    year: pick(side.year, fb.year),
    role: pick(side.role, fb.role),
    tools: w.tools,
    summary: pick(side.summary, fb.summary),
    cover: w.cover,
    category: w.category,
    order: w.order,
  };
}

export async function getCaseStudies(locale: string): Promise<CaseMeta[]> {
  const items = await getWorkItems();
  return items
    .filter((w) => w.published !== false)
    .map((w) => toMeta(w, locale));
}

export async function getCaseStudy(
  slug: string,
  locale: string
): Promise<CaseStudy | null> {
  const items = await getWorkItems();
  const w = items.find((x) => x.slug === slug && x.published !== false);
  if (!w) return null;
  const side = locale === "en" ? w.en : w.uz;
  const fb = locale === "en" ? w.uz : w.en;
  return {
    ...toMeta(w, locale),
    body: side.body?.trim() ? side.body : fb.body ?? "",
  };
}

export async function getCaseSlugs(): Promise<string[]> {
  const items = await getWorkItems();
  return items.filter((w) => w.published !== false).map((w) => w.slug);
}

export async function getDesignWorks(): Promise<DesignWork[]> {
  const items = await getDesignItems();
  return items
    .filter((d) => d.src)
    .map(({ src, alt, category, w, h }) => ({ src, alt, category, w, h }));
}
