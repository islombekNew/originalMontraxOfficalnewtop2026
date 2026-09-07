import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unstable_cache, revalidateTag } from "next/cache";
import { readDoc } from "./store";
import {
  defaultDesign,
  defaultFaq,
  defaultMessages,
  defaultPricing,
  defaultSections,
  defaultSettings,
} from "./defaults";
import {
  CMS_KEYS,
  type DesignItem,
  type FaqItem,
  type MessagesDoc,
  type PriceCategory,
  type SectionConfig,
  type SettingsDoc,
  type WorkItem,
} from "./types";

export const CMS_TAG = "montrax-cms";

/** Kontent o'zgargach barcha sahifalarni yangilash */
export function revalidateCms() {
  revalidateTag(CMS_TAG);
}

// ─── Chuqur birlashtirish ───────────────────────────────────────────────────
// CMS'dagi qiymat ustun, lekin kodda yangi kalit qo'shilsa u ham ko'rinadi.

function isPlain(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlain(base) || !isPlain(override)) {
    return (override === undefined ? base : (override as T));
  }
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    out[k] = k in out ? deepMerge(out[k], v) : v;
  }
  return out as T;
}

// ─── Ishlar: MDX fayllardan standart ro'yxat ────────────────────────────────

const WORK_DIR = path.join(process.cwd(), "content", "work");

function readMdxWork(): WorkItem[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  const slugs = [
    ...new Set(
      fs
        .readdirSync(WORK_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.(uz|en)\.mdx$/, ""))
    ),
  ];

  return slugs
    .map((slug): WorkItem | null => {
      const load = (loc: "uz" | "en") => {
        const file = path.join(WORK_DIR, `${slug}.${loc}.mdx`);
        if (!fs.existsSync(file)) return null;
        const { data, content } = matter(fs.readFileSync(file, "utf-8"));
        return { data: data as Record<string, unknown>, content };
      };
      const uz = load("uz");
      const en = load("en");
      const src = uz ?? en;
      if (!src) return null;

      const side = (x: typeof uz) => ({
        title: String(x?.data.title ?? ""),
        client: String(x?.data.client ?? ""),
        year: String(x?.data.year ?? ""),
        role: String(x?.data.role ?? ""),
        summary: String(x?.data.summary ?? ""),
        body: x?.content?.trim() ?? "",
      });

      return {
        id: slug,
        slug,
        order: Number(src.data.order ?? 99),
        category: (src.data.category === "design" ? "design" : "dev") as "dev" | "design",
        cover: String(src.data.cover ?? ""),
        tools: Array.isArray(src.data.tools) ? (src.data.tools as string[]) : [],
        published: true,
        uz: side(uz ?? src),
        en: side(en ?? src),
      };
    })
    .filter((x): x is WorkItem => x !== null)
    .sort((a, b) => a.order - b.order);
}

// ─── Kesh bilan o'qish ──────────────────────────────────────────────────────

function cached<T>(key: string, load: () => Promise<T>) {
  return unstable_cache(load, [`cms:${key}`], { tags: [CMS_TAG], revalidate: 300 });
}

export const getMessages = (locale: "uz" | "en") =>
  cached(`messages:${locale}`, async () => {
    const doc = await readDoc<MessagesDoc>(
      locale === "uz" ? CMS_KEYS.messagesUz : CMS_KEYS.messagesEn
    );
    return deepMerge(defaultMessages[locale], doc ?? {});
  })();

export const getWorkItems = cached(CMS_KEYS.work, async () => {
  const doc = await readDoc<WorkItem[]>(CMS_KEYS.work);
  const items = doc && doc.length ? doc : readMdxWork();
  return [...items].sort((a, b) => a.order - b.order);
});

export const getDesignItems = cached(CMS_KEYS.design, async () => {
  const doc = await readDoc<DesignItem[]>(CMS_KEYS.design);
  const items = doc && doc.length ? doc : defaultDesign;
  return [...items].filter((d) => d.visible !== false).sort((a, b) => a.order - b.order);
});

export const getPricing = cached(CMS_KEYS.pricing, async () => {
  const doc = await readDoc<PriceCategory[]>(CMS_KEYS.pricing);
  const cats = doc && doc.length ? doc : defaultPricing;
  return cats.filter((c) => c.visible !== false);
});

export const getSettings = cached(CMS_KEYS.settings, async () => {
  const doc = await readDoc<Partial<SettingsDoc>>(CMS_KEYS.settings);
  return deepMerge(defaultSettings, doc ?? {}) as SettingsDoc;
});

export const getSections = cached(CMS_KEYS.sections, async () => {
  const doc = await readDoc<SectionConfig[]>(CMS_KEYS.sections);
  const list = doc && doc.length ? doc : defaultSections;
  // Kodda yangi bo'lim qo'shilsa — CMS'da yo'q bo'lsa ham ko'rinsin
  const known = new Map(list.map((s) => [s.key, s]));
  for (const d of defaultSections) if (!known.has(d.key)) known.set(d.key, d);
  return [...known.values()].sort((a, b) => a.order - b.order);
});

export const getFaq = cached(CMS_KEYS.faq, async () => {
  const doc = await readDoc<FaqItem[]>(CMS_KEYS.faq);
  const items = doc && doc.length ? doc : defaultFaq;
  return items.filter((f) => f.visible !== false);
});

/** Admin uchun — filtrsiz, xom holat */
export async function getRawDoc<T>(key: string, fallback: T): Promise<T> {
  const doc = await readDoc<T>(key);
  return doc ?? fallback;
}

export { readMdxWork };
