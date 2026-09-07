/** Standart (fallback) kontent — CMS'da yozuv bo'lmasa shu ishlatiladi.
 *  Bu saytning hozirgi holati: Supabase ulanmagan bo'lsa ham sayt to'liq ishlaydi. */

import uzMessages from "@/messages/uz.json";
import enMessages from "@/messages/en.json";
import type {
  DesignItem,
  FaqItem,
  MessagesDoc,
  PriceCategory,
  SectionConfig,
  SettingsDoc,
} from "./types";

export const defaultMessages: Record<"uz" | "en", MessagesDoc> = {
  uz: uzMessages as unknown as MessagesDoc,
  en: enMessages as unknown as MessagesDoc,
};

export const defaultDesign: DesignItem[] = [
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
].map((d, i) => ({ ...d, id: `design-${i + 1}`, order: i, visible: true }));

export const defaultPricing: PriceCategory[] = [
  {
    id: "cat-design",
    key: "design",
    visible: true,
    items: [
      { id: "p-logo", uz: "Logo dizayn", en: "Logo design", price: "60 000+" },
      { id: "p-ig", uz: "Instagram post / banner", en: "Instagram post / banner", price: "50 000+" },
      { id: "p-brand", uz: "Branding pack", en: "Branding pack", price: "140 000+" },
      { id: "p-thumb", uz: "Thumbnail / reklama creative", en: "Thumbnail / ad creative", price: "50 000+" },
    ],
  },
  {
    id: "cat-smm",
    key: "smm",
    visible: true,
    items: [
      { id: "p-plan", uz: "Kontent plan (7–30 kun)", en: "Content plan (7–30 days)", price: "160 000+" },
      { id: "p-post", uz: "Post yozish + dizayn", en: "Post copy + design", price: "60 000+" },
      { id: "p-igman", uz: "Instagram sahifa yuritish", en: "Instagram page management", price: "500 000+", monthly: true },
      { id: "p-adstrat", uz: "Reklama strategiya", en: "Ad strategy", price: "200 000+" },
    ],
  },
  {
    id: "cat-ai",
    key: "ai",
    visible: true,
    items: [
      { id: "p-prompt", uz: "AI prompt yozish (oddiy)", en: "AI prompt writing (basic)", price: "40 000+" },
      { id: "p-flow", uz: "Maxsus AI workflow", en: "Custom AI workflow", price: "150 000+" },
      { id: "p-chatbot", uz: "AI chatbot setup", en: "AI chatbot setup", price: "260 000+" },
    ],
  },
  {
    id: "cat-vibe",
    key: "vibe",
    visible: true,
    items: [
      { id: "p-landing", uz: "Landing page", en: "Landing page", price: "400 000+" },
      { id: "p-bot", uz: "Telegram bot", en: "Telegram bot", price: "111 000+" },
      { id: "p-auto", uz: "Mini avtomatlashtirish tizimlari", en: "Mini automation systems", price: "400 000+" },
    ],
  },
  {
    id: "cat-web",
    key: "web",
    visible: true,
    items: [
      { id: "p-crm", uz: "CRM / boshqaruv tizimi", en: "CRM / management system", price: "600 000+" },
      { id: "p-shop", uz: "E-commerce", en: "E-commerce", price: "600 000+" },
      { id: "p-app", uz: "Murakkab web ilova", en: "Complex web app", price: "600 000+" },
    ],
  },
];

export const defaultSettings: SettingsDoc = {
  telegramUrl: "https://t.me/Montrax_offical",
  social: [
    { id: "s-tg", label: "Telegram", href: "https://t.me/Montrax_offical", visible: true },
    { id: "s-ch", label: "Kanal", href: "https://t.me/montrax_kanal", visible: true },
    { id: "s-ig", label: "Instagram", href: "https://www.instagram.com/montraxoffical/", visible: true },
    { id: "s-gh", label: "GitHub", href: "https://github.com/islombekNew", visible: true },
  ],
  aboutTools: [
    "Next.js 15", "TypeScript", "Prisma", "Tailwind CSS", "grammY",
    "NextAuth", "PostgreSQL", "Photoshop", "Figma", "ComfyUI / Flux",
    "GSAP", "Framer Motion",
  ],
  aboutPhoto: "/media/personal/islombek.jpg",
  brandLogo: "/media/brand/logo-mark.png",
  ogImage: "",
};

export const defaultSections: SectionConfig[] = [
  { key: "hero", labelUz: "Hero — bosh ekran", visible: true, order: 0 },
  { key: "expertise", labelUz: "Yo'nalishlar lentasi", visible: true, order: 1 },
  { key: "featured", labelUz: "Tanlangan ishlar", visible: true, order: 2 },
  { key: "designStrip", labelUz: "Dizayn galereya", visible: true, order: 3 },
  { key: "aboutTeaser", labelUz: "Men haqimda (qisqa)", visible: true, order: 4 },
  { key: "servicesTeaser", labelUz: "Xizmatlar (qisqa)", visible: true, order: 5 },
  { key: "cta", labelUz: "Yakuniy chaqiruv (CTA)", visible: true, order: 6 },
];

type Flat = Record<string, string>;
const uzSp = (uzMessages as unknown as Record<string, Flat>).servicesPage;
const enSp = (enMessages as unknown as Record<string, Flat>).servicesPage;

export const defaultFaq: FaqItem[] = [1, 2, 3, 4].map((n) => ({
  id: `faq-${n}`,
  uzQ: uzSp[`faq${n}q`] ?? "",
  uzA: uzSp[`faq${n}a`] ?? "",
  enQ: enSp[`faq${n}q`] ?? "",
  enA: enSp[`faq${n}a`] ?? "",
  visible: true,
}));
