/** Admin panelda matn kalitlarini odam tilida ko'rsatish uchun yorliqlar.
 *  Yorliq topilmasa — kalitning o'zi ko'rsatiladi (sayt buzilmaydi). */

export const NAMESPACE_LABELS: Record<string, { title: string; hint?: string }> = {
  nav: { title: "Menyu", hint: "Yuqoridagi navigatsiya havolalari" },
  floating: { title: "Suzuvchi Telegram tugmasi", hint: "O'ng pastdagi tugma" },
  expertise: { title: "Yo'nalishlar lentasi", hint: "Bosh sahifadagi harakatlanuvchi qator" },
  hero: { title: "Bosh ekran (Hero)", hint: "Saytga kirganda ko'rinadigan birinchi ekran" },
  featured: { title: "Tanlangan ishlar", hint: "Bosh sahifadagi loyihalar bo'limi sarlavhalari" },
  designStrip: { title: "Dizayn galereya", hint: "Bosh sahifadagi grafik ishlar bo'limi" },
  aboutTeaser: { title: "Men haqimda — qisqa", hint: "Bosh sahifadagi qisqa tanishtiruv" },
  services: { title: "Xizmatlar — nom va tavsif", hint: "Bosh sahifa va narx-menyuda ishlatiladi" },
  cta: { title: "Yakuniy chaqiruv (CTA)", hint: "Har sahifa oxiridagi «yozing» bloki" },
  footer: { title: "Pastki panel (Footer)" },
  work: { title: "Ishlar sahifasi" },
  caseStudy: { title: "Case study sahifasi", hint: "Loyiha ichidagi yorliqlar" },
  about: { title: "Men haqimda sahifasi" },
  servicesPage: { title: "Xizmatlar sahifasi", hint: "FAQ savollari alohida bo'limda tahrirlanadi" },
  contact: { title: "Aloqa sahifasi", hint: "Forma matnlari va xabarlar" },
  meta: { title: "SEO — sarlavha va tavsif", hint: "Google va ijtimoiy tarmoqlarda ko'rinadi" },
};

export const KEY_LABELS: Record<string, string> = {
  // nav
  "nav.work": "Ishlar", "nav.about": "Men haqimda", "nav.services": "Xizmatlar",
  "nav.contact": "Aloqa", "nav.cta": "Yuqoridagi tugma",
  // floating
  "floating.message": "Asosiy yozuv", "floating.via": "Ostidagi kichik yozuv",
  // expertise
  "expertise.dev": "1-yo'nalish", "expertise.design": "2-yo'nalish",
  "expertise.smm": "3-yo'nalish", "expertise.vibe": "4-yo'nalish",
  // hero
  "hero.kicker": "Tepadagi kichik yozuv",
  "hero.line1": "Katta sarlavha — 1-qator",
  "hero.line2Prefix": "2-qator boshi",
  "hero.line2": "2-qator (ajratilgan so'z)",
  "hero.sub": "Tavsif matni",
  "hero.ctaPrimary": "Asosiy tugma",
  "hero.ctaSecondary": "Ikkinchi tugma",
  "hero.cornerStatus": "Burchakdagi holat",
  "hero.cornerLocation": "Burchakdagi joylashuv",
  "hero.scrollHint": "Pastga siljish yozuvi",
  "hero.stat1value": "1-raqam", "hero.stat1label": "1-raqam izohi",
  "hero.stat2value": "2-raqam", "hero.stat2label": "2-raqam izohi",
  "hero.stat3value": "3-raqam", "hero.stat3label": "3-raqam izohi",
  // featured
  "featured.kicker": "Kichik yozuv", "featured.title": "Sarlavha",
  "featured.serifWord": "Kursiv bilan ajratiladigan so'z",
  "featured.viewAll": "«Hammasini ko'rish» tugmasi",
  "featured.caseCta": "Loyiha kartasidagi havola",
  // designStrip
  "designStrip.kicker": "Kichik yozuv", "designStrip.title": "Sarlavha",
  "designStrip.serifWord": "Kursiv so'z", "designStrip.sub": "Tavsif",
  "designStrip.scrollHint": "Sudrash bo'yicha maslahat",
  // aboutTeaser
  "aboutTeaser.kicker": "Kichik yozuv", "aboutTeaser.text": "Matn",
  "aboutTeaser.cta": "Tugma",
  // services
  "services.kicker": "Kichik yozuv", "services.title": "Sarlavha",
  "services.serifWord": "Kursiv so'z", "services.viewAll": "«Batafsil» tugmasi",
  "services.web.title": "Web & CRM — nomi", "services.web.desc": "Web & CRM — tavsifi",
  "services.design.title": "Grafik dizayn — nomi", "services.design.desc": "Grafik dizayn — tavsifi",
  "services.bot.title": "Telegram botlar — nomi", "services.bot.desc": "Telegram botlar — tavsifi",
  "services.vibe.title": "Vibe coding — nomi", "services.vibe.desc": "Vibe coding — tavsifi",
  "services.ai.title": "AI & Prompt — nomi", "services.ai.desc": "AI & Prompt — tavsifi",
  "services.smm.title": "SMM — nomi", "services.smm.desc": "SMM — tavsifi",
  // cta
  "cta.kicker": "Kichik yozuv", "cta.bgWord": "Fondagi katta so'z",
  "cta.titlePrefix": "Sarlavha boshi", "cta.titleAccent": "Ajratilgan so'z",
  "cta.sub": "Tavsif", "cta.button": "Asosiy tugma", "cta.or": "«yoki» yozuvi",
  "cta.formLink": "Forma havolasi", "cta.footNote1": "Izoh 1",
  "cta.footNote2": "Izoh 2", "cta.footNote3": "Izoh 3",
  // footer
  "footer.tagline": "Tavsif", "footer.status": "Holat yozuvi",
  "footer.navHeading": "«Navigatsiya» sarlavhasi",
  "footer.linkWork": "Havola — Ishlar", "footer.linkAbout": "Havola — Men haqimda",
  "footer.linkServices": "Havola — Xizmatlar", "footer.linkContact": "Havola — Aloqa",
  "footer.socialHeading": "«Ijtimoiy» sarlavhasi", "footer.metaHeading": "«Meta» sarlavhasi",
  "footer.locationLine": "Joylashuv", "footer.timezoneLine": "Vaqt mintaqasi",
  "footer.rights": "Mualliflik qatori", "footer.backToTop": "«Yuqoriga» tugmasi",
  // work
  "work.title": "Sarlavha", "work.sub": "Tavsif",
  "work.filterAll": "Filtr — hammasi", "work.filterDev": "Filtr — tizimlar",
  "work.filterDesign": "Filtr — dizayn", "work.openCase": "Kartadagi havola",
  "work.designNote": "Dizayn bo'limi izohi",
  // caseStudy
  "caseStudy.client": "«Klient» yorlig'i", "caseStudy.year": "«Yil» yorlig'i",
  "caseStudy.role": "«Rol» yorlig'i", "caseStudy.tools": "«Tools» yorlig'i",
  "caseStudy.nextProject": "«Keyingi loyiha»", "caseStudy.backToWork": "«Orqaga» havolasi",
  // about
  "about.title": "Sarlavha", "about.intro": "Kirish matni",
  "about.story1": "Hikoya — 1-abzas", "about.story2": "Hikoya — 2-abzas",
  "about.processTitle": "«Qanday ishlayman» sarlavhasi",
  "about.process1title": "1-bosqich nomi", "about.process1desc": "1-bosqich tavsifi",
  "about.process2title": "2-bosqich nomi", "about.process2desc": "2-bosqich tavsifi",
  "about.process3title": "3-bosqich nomi", "about.process3desc": "3-bosqich tavsifi",
  "about.toolsTitle": "«Tools» sarlavhasi", "about.photoAlt": "Rasm uchun alt matn",
  // servicesPage
  "servicesPage.title": "Sarlavha", "servicesPage.sub": "Tavsif",
  "servicesPage.priceFrom": "«dan boshlab»", "servicesPage.duration": "«Muddat»",
  "servicesPage.example": "«Real misol»", "servicesPage.customPrice": "«Loyihaga qarab»",
  "servicesPage.priceNote": "Narx haqida izoh", "servicesPage.faqTitle": "FAQ sarlavhasi",
  // contact
  "contact.title": "Sarlavha", "contact.sub": "Tavsif",
  "contact.telegramTitle": "Telegram bloki sarlavhasi",
  "contact.telegramDesc": "Telegram bloki tavsifi",
  "contact.formName": "Forma — ism maydoni", "contact.formContact": "Forma — aloqa maydoni",
  "contact.formMessage": "Forma — xabar maydoni", "contact.formSubmit": "Forma — yuborish tugmasi",
  "contact.formSending": "Yuborilmoqda holati", "contact.formSuccess": "Muvaffaqiyat xabari",
  "contact.formError": "Xato xabari", "contact.socialTitle": "«Boshqa kanallar» sarlavhasi",
  // meta
  "meta.homeTitle": "Bosh sahifa sarlavhasi", "meta.homeDesc": "Bosh sahifa tavsifi",
  "meta.workTitle": "Ishlar sahifasi sarlavhasi", "meta.aboutTitle": "Men haqimda sarlavhasi",
  "meta.servicesTitle": "Xizmatlar sarlavhasi", "meta.contactTitle": "Aloqa sarlavhasi",
};

/** servicesPage ichidagi faq* kalitlari alohida FAQ bo'limida tahrirlanadi */
export function isHiddenKey(ns: string, key: string) {
  return ns === "servicesPage" && /^faq\d+[qa]$/.test(key);
}

export function labelFor(ns: string, key: string) {
  return KEY_LABELS[`${ns}.${key}`] ?? key;
}

export function nsLabel(ns: string) {
  return NAMESPACE_LABELS[ns] ?? { title: ns };
}
