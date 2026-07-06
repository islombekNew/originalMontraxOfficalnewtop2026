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

/** Grafik dizayn ishlari — public/media/design/ dagi rasmlar.
 *  Har fayl BIR marta, w/h — real o'lchamlar (sharp bilan tekshirilgan). */
export const designWorks: DesignWork[] = [
  { src: "/media/design/thumb-oppo-findx9.jpg", alt: "OPPO Find X9 Ultra — YouTube thumbnail", category: "Thumbnail", w: 1280, h: 720 },
  { src: "/media/design/thumb-3.jpg", alt: "Realme GT 8 Pro — YouTube thumbnail", category: "Thumbnail", w: 1280, h: 767 },
  { src: "/media/design/thumb-2.jpg", alt: "iPhone vs Vivo — kamera jangi poster", category: "Poster", w: 947, h: 1280 },
  { src: "/media/design/thumb-4.jpg", alt: "iOS 27 obzor — poster", category: "Poster", w: 960, h: 1280 },
  { src: "/media/design/work-1.jpg", alt: "E-commerce mahsulot kartasi", category: "E-commerce", w: 1024, h: 1024 },
  { src: "/media/design/work-2.jpg", alt: "E-commerce mahsulot kartasi", category: "E-commerce", w: 1024, h: 1024 },
  { src: "/media/design/work-3.jpg", alt: "E-commerce mahsulot kartasi", category: "E-commerce", w: 1024, h: 1024 },
  { src: "/media/design/work-4.jpg", alt: "E-commerce mahsulot kartasi", category: "E-commerce", w: 1024, h: 1024 },
  { src: "/media/design/work-5.jpg", alt: "E-commerce mahsulot kartasi", category: "E-commerce", w: 1024, h: 1024 },
  { src: "/media/design/work-6.png", alt: "Banner dizayn", category: "Banner", w: 1536, h: 1024 },
];
