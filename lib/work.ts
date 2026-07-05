import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseMeta, DesignWork } from "./work-types";

export type { CaseMeta, DesignWork };
export type CaseStudy = CaseMeta & { body: string };

const WORK_DIR = path.join(process.cwd(), "content", "work");

export function getCaseStudies(locale: string): CaseMeta[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  const files = fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(`.${locale}.mdx`));

  return files
    .map((file) => {
      const slug = file.replace(`.${locale}.mdx`, "");
      const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<CaseMeta, "slug">) };
    })
    .sort((a, b) => a.order - b.order);
}

export function getCaseStudy(slug: string, locale: string): CaseStudy | null {
  const file = path.join(WORK_DIR, `${slug}.${locale}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...(data as Omit<CaseMeta, "slug">), body: content };
}

export function getCaseSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return [
    ...new Set(
      fs
        .readdirSync(WORK_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.(uz|en)\.mdx$/, ""))
    ),
  ];
}

/** Grafik dizayn ishlari — public/media/design/ dagi rasmlar */
export const designWorks: DesignWork[] = [
  { src: "/media/design/thumb-oppo-findx9.jpg", alt: "OPPO Find X9 Ultra — YouTube thumbnail", category: "Thumbnail", w: 1280, h: 720 },
  { src: "/media/design/thumb-2.jpg", alt: "YouTube thumbnail dizayn", category: "Thumbnail", w: 1280, h: 720 },
  { src: "/media/design/thumb-3.jpg", alt: "YouTube thumbnail dizayn", category: "Thumbnail", w: 1280, h: 720 },
  { src: "/media/design/thumb-4.jpg", alt: "YouTube thumbnail dizayn", category: "Thumbnail", w: 1280, h: 720 },
  { src: "/media/design/poster-ios27.jpg", alt: "iOS 27 — poster dizayn", category: "Poster", w: 1080, h: 1350 },
  { src: "/media/design/poster-iphonevivo.jpg", alt: "iPhone vs Vivo — poster", category: "Poster", w: 1080, h: 1350 },
  { src: "/media/design/poster-oppo.jpg", alt: "OPPO — poster dizayn", category: "Poster", w: 1080, h: 1350 },
  { src: "/media/design/poster-realme.jpg", alt: "Realme — poster dizayn", category: "Poster", w: 1080, h: 1350 },
  { src: "/media/design/work-1.jpg", alt: "Grafik dizayn ishi", category: "Design", w: 1080, h: 1080 },
  { src: "/media/design/work-2.jpg", alt: "Grafik dizayn ishi", category: "Design", w: 1080, h: 1080 },
  { src: "/media/design/work-3.jpg", alt: "Grafik dizayn ishi", category: "Design", w: 1080, h: 1080 },
  { src: "/media/design/work-4.jpg", alt: "Grafik dizayn ishi", category: "Design", w: 1080, h: 1080 },
  { src: "/media/design/work-5.jpg", alt: "Grafik dizayn ishi", category: "Design", w: 1080, h: 1080 },
  { src: "/media/design/work-6.png", alt: "Grafik dizayn ishi", category: "Design", w: 1080, h: 1080 },
];
