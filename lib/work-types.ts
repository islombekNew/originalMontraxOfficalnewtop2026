/** Client komponentlar uchun tiplar (fs'siz) */
export type CaseMeta = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tools: string[];
  summary: string;
  cover: string;
  category: "dev" | "design";
  order: number;
};

export type DesignWork = {
  src: string;
  alt: string;
  category: string;
  w: number;
  h: number;
};
