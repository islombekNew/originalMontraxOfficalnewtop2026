/** MONTRAX CMS — admin paneldan boshqariladigan ma'lumot tiplari.
 *  Har bir "doc" — bitta jsonb yozuv, kaliti CMS_KEYS ichida. */

export type Locale = "uz" | "en";

/** messages/*.json daraxti — chuqurligi 2 (namespace → key → matn) */
export type MessagesDoc = Record<string, Record<string, unknown>>;

export type WorkItemLocale = {
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  body: string;
};

export type WorkItem = {
  id: string;
  slug: string;
  order: number;
  category: "dev" | "design";
  cover: string;
  tools: string[];
  published: boolean;
  uz: WorkItemLocale;
  en: WorkItemLocale;
};

export type DesignItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  w: number;
  h: number;
  order: number;
  visible: boolean;
};

export type PriceItem = {
  id: string;
  uz: string;
  en: string;
  price: string;
  monthly?: boolean;
  custom?: boolean;
};

export type PriceCategory = {
  id: string;
  /** messages.services.<key> dan sarlavha/tavsif oladi; bo'sh bo'lsa titleUz/titleEn ishlatiladi */
  key: string;
  titleUz?: string;
  titleEn?: string;
  descUz?: string;
  descEn?: string;
  visible: boolean;
  items: PriceItem[];
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  /** footer va contact sahifasida ko'rsatilsinmi */
  visible: boolean;
};

export type SettingsDoc = {
  telegramUrl: string;
  social: SocialLink[];
  aboutTools: string[];
  aboutPhoto: string;
  brandLogo: string;
  ogImage: string;
  /** contact sahifasidagi FAQ va boshqa bir martalik qiymatlar shu yerda emas —
   *  ular messages ichida, chunki tarjima qilinadi */
};

export type SectionKey =
  | "hero"
  | "expertise"
  | "featured"
  | "designStrip"
  | "aboutTeaser"
  | "servicesTeaser"
  | "cta";

export type SectionConfig = {
  key: SectionKey;
  labelUz: string;
  visible: boolean;
  order: number;
};

export type FaqItem = {
  id: string;
  uzQ: string;
  uzA: string;
  enQ: string;
  enA: string;
  visible: boolean;
};

export const CMS_KEYS = {
  messagesUz: "messages:uz",
  messagesEn: "messages:en",
  work: "work",
  design: "design",
  pricing: "pricing",
  settings: "settings",
  sections: "sections",
  faq: "faq",
} as const;

export type CmsKey = (typeof CMS_KEYS)[keyof typeof CMS_KEYS];

export type MediaFile = {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
};
