/** Saytning kanonik manzili — sitemap, robots va OG teglar uchun bitta manba.
 *  Domen o'zgarsa faqat shu yerni (yoki SITE_URL env'ini) yangilash yetarli. */
export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://montrax-org.uz"
).replace(/\/+$/, "");
