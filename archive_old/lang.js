/* ══════════════════════════════════════
   MONTRAX — i18n Language System v2.0
   Supports: uz (default), en, ru
   Pages: index, frontend, design, contact, pricing, admin
   Persisted via localStorage
   ══════════════════════════════════════ */

const LANG_KEY = "montrax_lang";

const translations = {
  uz: {
    // ── NAV ──
    nav_home: "Asosiy",
    nav_frontend: "Frontend",
    nav_design: "Dizayn",
    nav_products: "Mahsulotlar",
    nav_pricing: "Narxlar",
    nav_contact: "Aloqa",
    nav_hire: "Yollash",

    // ── HERO (index) ──
    hero_available: "Yangi loyihalar uchun mavjud",
    hero_title:
      'Men <span class="ae">tajriba</span> yarataman, <span class="ap">natija</span> beraman.',
    hero_sub:
      "Frontend Dasturchi va Grafik Dizayner — estetika va unumdorlik bir joyda.",
    hero_btn_work: "Ishlarni Ko'rish →",
    hero_btn_contact: "Bog'lanish",
    hero_stat1_lbl: "Yillik Tajriba",
    hero_stat2_lbl: "Loyiha Bajarildi",
    hero_stat3_lbl: "Tilda Xizmat (UZ·EN·RU)",

    // ── SECTIONS (index) ──
    sec_frontend_label: "Frontend Dasturlash",
    sec_frontend_title: 'Aniqlik bilan <span class="ae">kodlangan.</span>',
    sec_frontend_desc:
      "React, Next.js, Vue — har bir interfeys yuqori darajada ishlash uchun yaratilgan.",
    sec_frontend_view: "Barcha Loyihalar →",

    sec_design_label: "Grafik Dizayn",
    sec_design_title: "Dizayn o'z-o'zidan <span class=\"ap\">gapiradi.</span>",
    sec_design_desc:
      "Brend identifikatsiya, UI/UX, animatsiya — niyat bilan yaratilgan.",
    sec_design_view: "Barcha Dizaynlar →",

    sec_products_label: "E-Tijorat Dizayni",
    sec_products_title: 'Mahsulot kartlari <span class="ae">sotadi.</span>',
    sec_products_desc: "Konversiyaga yo'naltirilgan e-tijorat interfeyslari.",

    sec_services_label: "Nima Taklif Qilaman",
    sec_services_title: 'Natija <span class="ae">beradigan</span> xizmatlar.',
    sec_services_desc:
      "Kontseptsiyadan ishga tushirishgacha — har bir xizmat o'lchanadigan natijalarga mo'ljallangan.",

    // ── SERVICES ──
    srv1_title: "Frontend Dasturlash",
    srv1_desc:
      "React, Next.js, Vue — yuqori unumli interfeys, toza kod va har qanday Figma dizaynidan piksel-mukammal amalga oshirish.",
    srv2_title: "Brend Identifikatsiya",
    srv2_desc:
      "Logo tizimlari, rang paletrasi, tipografiya va brend ko'rsatmalari — brendi bir zumda tanish bo'lishi uchun.",
    srv3_title: "UI / UX Dizayn",
    srv3_desc:
      "Foydalanuvchi tadqiqoti, wireframe va yuqori darajali Figma dizaynlar — intuitiv va chiroyli tajribalar.",
    srv4_title: "E-Tijorat",
    srv4_desc:
      "Konversiyaga yo'naltirilgan do'konlar — Shopify, WooCommerce yoki maxsus loyihalar.",
    srv5_title: "Motion Dizayn",
    srv5_desc:
      "Logo animatsiyalari, UI o'tishlari va brend harakat to'plamlari.",
    srv6_title: "Tezlik va SEO",
    srv6_desc:
      "Core Web Vitals optimallashtirish, texnik SEO va sahifa tezligini yaxshilash.",

    // ── CTA (index) ──
    cta_eye: "Ajoyib narsa qurishga tayyormisiz?",
    cta_title:
      'Birgalikda ajralib <span class="ae">turadigan</span> narsa yarataylik.',
    cta_desc:
      "Loyiha fikringiz bormi? Auditoriyangiz hech qachon unutmaydigan raqamli tajriba yarataylik.",
    cta_btn: "Hozir Bog'lanish",
    cta_btn2: "Portfelni Ko'rish",

    // ── FOOTER ──
    foot_desc:
      "Frontend Dasturchi va Grafik Dizayner — konversiya qiladigan mukammal raqamli tajribalar yaratadi.",
    foot_services: "Xizmatlar",
    foot_navigate: "Navigatsiya",
    foot_touch: "Bog'laning",
    foot_copy: "Barcha huquqlar himoyalangan.",
    foot_made: "Elektr aniqlik bilan yaratilgan",

    // ── PRICING PAGE ──
    pricing_label: "Narx Rejalari",
    pricing_title: 'Sizga mos <span class="ae">rejani</span> tanlang.',
    pricing_desc: "Har bir loyiha uchun shaffof va adolatli narxlar.",
    plan_basic: "Boshlang'ich",
    plan_pro: "Professional",
    plan_elite: "Elite",
    plan_basic_desc: "Kichik loyihalar va startaplar uchun",
    plan_pro_desc: "O'sib borayotgan bizneslar uchun",
    plan_elite_desc: "Yirik korporativ loyihalar uchun",
    plan_btn_basic: "Boshlash",
    plan_btn_pro: "Tanlash",
    plan_btn_elite: "Bog'lanish",
    plan_popular: "Mashhur",
    plan_custom: "Maxsus narx",
    plan_from: "dan boshlab",
    currency: "USD",

    // ── CONTACT PAGE ──
    contact_label: "Aloqa",
    contact_title: 'Keling, <span class="ae">gaplashaylik.</span>',
    contact_desc:
      "Loyiha fikringiz, savol yoki hamkorlik — istalgan narsada yozing.",
    form_name: "Ismingiz",
    form_email: "Email manzilingiz",
    form_subject: "Mavzu",
    form_message: "Xabaringiz...",
    form_send: "Xabar Yuborish →",
    form_sending: "Yuborilmoqda...",
    form_sent: "Xabar yuborildi! Tez orada javob beraman.",
    contact_or: "yoki to'g'ridan-to'g'ri bog'laning",
    contact_social_title: "Ijtimoiy Tarmoqlar",
    contact_info_title: "Aloqa Ma'lumotlari",
    contact_hours: "Ish Soatlari",
    contact_hours_val: "Dush — Shan: 9:00 — 22:00 (UZT)",
    contact_response: "Javob Vaqti",
    contact_response_val: "Odatda 2 soat ichida",
    contact_location: "Joylashuv",
    contact_location_val: "Toshkent, O'zbekiston",

    // ── DESIGN PAGE ──
    ph_design_sub:
      "Brend identifikatsiya, UI/UX, motion graphics va vizual kommunikatsiya.",

    stat_design_projects: "Dizayn Loyihalari",
    stat_brand_identities: "Brend Identifikatsiya",
    stat_avg_rating: "O'rtacha Reyting",

    sec_featured_label: "Tanlangan Ishlar",
    sec_featured_title:
      'Vizual hikoyalar <span class="ap">rezonans</span> qiladi.',
    sec_featured_desc:
      "Brend identifikatsiya, UI dizayn va vizual kommunikatsiyadan eng yaxshi ishlar.",

    cat_brand: "Brand Identity",
    cat_editorial: "Editorial",
    cat_uiux: "UI/UX Dizayn",
    cat_motion: "Motion Dizayn",
    cat_packaging: "Qadoqlash",
    cat_webdesign: "Veb Dizayn",
    cat_illustration: "Illustratsiya",
    cat_projects: "Ta Loyiha",

    fw1_title: "NEXUS — To'liq Brend Tizimi",
    fw1_desc:
      "Logo, tipografiya, rang tizimi, garov va brend ko'rsatmasi to'plami.",
    fw2_title: "Jurnal Maket Tizimi",
    fw2_desc: "Zamonaviy editorial dizayn tizimi.",
    fw3_title: "Fintech Ilova Interfeysi",
    fw3_desc: "40+ ekranli mobil bank UI.",
    fw4_title: "Animatsiyali Brend To'plami",
    fw4_desc: "Logo animatsiyalari va o'tishlar.",
    fw5_title: "Premium Mahsulot Liniyasi",
    fw5_desc: "Kosmetika brendi uchun hashamatli qadoqlash.",
    fw6_title: "Agentlik Sayti Qayta Dizayni",
    fw6_desc:
      "Maxsus illustratsiyalar va mikro-animatsiyalar bilan to'liq qayta dizayn.",
    fw7_title: "Maxsus Ikonlar Kutubxonasi",
    fw7_desc: "SaaS mahsuloti uchun 200+ maxsus ikonlar va illustratsiyalar.",

    sec_disciplines_label: "Nima Qilaman",
    sec_disciplines_title: "yo'nalishlari",
    sec_disciplines_desc:
      "Kontseptsiyadan oxirgi pikselgacha — har bir soha maxsus ko'nikmalar talab qiladi.",

    cat_brand_desc:
      "Logo tizimlari, rang paletrasi, tipografiya va brend ko'rsatmalari.",
    cat_uiux_desc:
      "Foydalanuvchi tadqiqoti, wireframelar, interaktiv prototiplar va yuqori sifatli Figma dizaynlari.",
    cat_motion_desc:
      "Logo animatsiyalari, UI o'tishlari va brend harakat to'plamlari.",
    cat_print_title: "Bosma va Qadoqlash",
    cat_print_desc:
      "Mahsulot qadoqlash, editorial maketlar va tijorat bosma materiallari.",
    cat_illus_title: "Illustratsiya",
    cat_illus_desc:
      "Maxsus vektor illustratsiyalar, ikonlar kutubxonasi va editorial san'at.",
    cat_web_title: "Veb Dizayn",
    cat_web_desc:
      "Landing sahifalar va veb ilova interfeyslari — toza, zamonaviy va konversiyaga yo'naltirilgan.",

    sec_brand_label: "Brend Loyihalari",
    sec_brand_title: "ishlari",
    sec_brand_desc:
      "Brendlarni noldan qurishdan — strategiya, vizual identifikatsiya va brand kitobgacha.",

    bp1_desc:
      "To'liq brend identifikatsiya: logo, tur, rang tizimi, qog'oz buyumlari va brend ko'rsatmasi.",
    bp2_desc:
      "Ekologik brend: yer paletrasi, maxsus yozuv, qadoqlash, ambalaj va raqamli ko'rsatmalar.",
    bp3_desc:
      "Qalin mahsulot brendi: agressiv tipografiya, neon aksentlar va kuchli vizual identifikatsiya.",
    bp4_desc:
      "Premium identifikatsiya: oltin va qora palitra, serif so'z belgisi va hashamatli brand kitob.",
    bp5_desc:
      "Maxsus illustratsiyalar, ikonlar to'plami, UI to'plami va brend animatsiya ko'rsatmasi.",

    sec_gallery_label: "Galereya",
    sec_gallery_title: "arxivi",
    sec_gallery_desc: "Barcha yo'nalishlardan tanlangan namunalar.",

    filter_all: "Barchasi",
    filter_brand: "Brending",
    filter_ui: "UI/UX",
    filter_print: "Bosma",
    filter_motion: "Motion",

    sec_skills_label: "Ko'nikmalar",
    sec_skills_title: "vositalar",
    sk_software: "Dizayn Dasturlari",
    sk_3d: "3D va Motion",
    sk_disciplines: "Dizayn Yo'nalishlari",
    sk_typography: "Tipografiya",
    sk_other_tools: "Boshqa Vositalar",

    sec_testi_label: "Mijoz Fikrlari",
    sec_testi_title: "deydi",
    testi1_text:
      "Brend identifikatsiya har bir kutishdan oshib ketdi. MONTRAX brendni nafaqat chiroyli, balki mazmunli qildi.",
    testi2_text:
      "Ilovamiz UI o'rtamiyonalikdan mukofotga loyiqga aylandi. Har bir piksel ataylab joylashtirilgan.",
    testi3_text:
      "Javonlarda ajralib turadigan va brend hikoyamizni bir zumda etkazadigan qadoqlash.",

    cta_design_eye: "Dizayn loyihangiz bormi?",
    cta_design_title:
      'Keling ajralib <span class="ap">turadigan</span> narsa yarataylik.',
    cta_design_desc:
      "Ajoyib dizayn ko'rilish va eslab qolish o'rtasidagi farqdir.",
    cta_design_btn: "Loyiha Boshlash →",
    cta_see_frontend: "Frontend Ishlarini Ko'rish",

    // ── ADMIN PAGE ──
    admin_login_tag: "Admin Panel · Kirish",
    admin_phone_label: "Telefon raqam",
    admin_pass_label: "Parol",
    admin_login_btn: "Kirish →",
    admin_login_err: "Telefon raqam yoki parol noto'g'ri!",
    admin_old_pass: "Eski parol",
    admin_new_pass: "Yangi parol",
    admin_conf_pass: "Parolni tasdiqlang",
    admin_change_pass_btn: "Parolni O'zgartirish",
  },

  en: {
    // ── NAV ──
    nav_home: "Home",
    nav_frontend: "Frontend",
    nav_design: "Design",
    nav_products: "Products",
    nav_pricing: "Pricing",
    nav_contact: "Contact",
    nav_hire: "Hire Me",

    // ── HERO ──
    hero_available: "Available for new projects",
    hero_title:
      'I design <span class="ae">experiences</span> that <span class="ap">convert.</span>',
    hero_sub:
      "Frontend Developer & Graphic Designer crafting premium digital experiences — where aesthetics meet performance.",
    hero_btn_work: "View Work →",
    hero_btn_contact: "Contact Me",
    hero_stat1_lbl: "Years Experience",
    hero_stat2_lbl: "Projects Done",
    hero_stat3_lbl: "Languages Supported (UZ·EN·RU)",

    // ── SECTIONS (index) ──
    sec_frontend_label: "Frontend Development",
    sec_frontend_title: 'Coded with <span class="ae">precision.</span>',
    sec_frontend_desc:
      "React, Next.js, Vue — every interface engineered to perform.",
    sec_frontend_view: "View All Projects →",

    sec_design_label: "Graphic Design",
    sec_design_title: 'Design that <span class="ap">speaks.</span>',
    sec_design_desc: "Brand identity, UI/UX, motion — crafted with intention.",
    sec_design_view: "View All Design →",

    sec_products_label: "E-Commerce Design",
    sec_products_title: 'Product cards that <span class="ae">sell.</span>',
    sec_products_desc:
      "Conversion-optimized e-commerce visuals that turn visitors into buyers.",

    sec_services_label: "What I Offer",
    sec_services_title: 'Services built to <span class="ae">deliver.</span>',
    sec_services_desc:
      "From concept to launch — every service designed for measurable results.",

    // ── SERVICES ──
    srv1_title: "Frontend Development",
    srv1_desc:
      "React, Next.js, Vue — high-performance interfaces with clean code and pixel-perfect implementation from any Figma design.",
    srv2_title: "Brand Identity",
    srv2_desc:
      "Logo systems, color palettes, typography, and brand guidelines — a complete visual language that makes your brand instantly recognizable.",
    srv3_title: "UI / UX Design",
    srv3_desc:
      "User research, wireframes, interactive prototypes, and high-fidelity Figma designs — experiences that are intuitive and beautiful.",
    srv4_title: "E-Commerce",
    srv4_desc:
      "Conversion-optimized storefronts with Shopify, WooCommerce, or custom builds.",
    srv5_title: "Motion Design",
    srv5_desc:
      "Logo animations, UI transitions, explainer videos, and brand motion kits.",
    srv6_title: "Performance & SEO",
    srv6_desc:
      "Core Web Vitals optimization, technical SEO, Lighthouse audits, and page speed improvements.",

    // ── CTA ──
    cta_eye: "Ready to build something legendary?",
    cta_title:
      'Let\'s build something that <span class="ae">stands out.</span>',
    cta_desc:
      "Got a project in mind? Let's create a digital experience your audience will never forget.",
    cta_btn: "Contact Me Now",
    cta_btn2: "View Portfolio",

    // ── FOOTER ──
    foot_desc:
      "Frontend Developer & Graphic Designer creating premium digital experiences that convert.",
    foot_services: "Services",
    foot_navigate: "Navigate",
    foot_touch: "Get in Touch",
    foot_copy: "All rights reserved.",
    foot_made: "Crafted with electric precision",

    // ── PRICING ──
    pricing_label: "Pricing Plans",
    pricing_title: 'Choose the right <span class="ae">plan</span> for you.',
    pricing_desc: "Transparent and fair pricing for every project.",
    plan_basic: "Starter",
    plan_pro: "Professional",
    plan_elite: "Elite",
    plan_basic_desc: "For small projects and startups",
    plan_pro_desc: "For growing businesses",
    plan_elite_desc: "For large corporate projects",
    plan_btn_basic: "Get Started",
    plan_btn_pro: "Choose Plan",
    plan_btn_elite: "Contact Us",
    plan_popular: "Popular",
    plan_custom: "Custom Price",
    plan_from: "Starting from",
    currency: "USD",

    // ── CONTACT ──
    contact_label: "Contact",
    contact_title: 'Let\'s <span class="ae">talk.</span>',
    contact_desc: "Project idea, question, or collaboration — write anything.",
    form_name: "Your Name",
    form_email: "Your Email",
    form_subject: "Subject",
    form_message: "Your message...",
    form_send: "Send Message →",
    form_sending: "Sending...",
    form_sent: "Message sent! I'll reply soon.",
    contact_or: "or contact directly",
    contact_social_title: "Social Networks",
    contact_info_title: "Contact Info",
    contact_hours: "Working Hours",
    contact_hours_val: "Mon — Sat: 9:00 AM — 10:00 PM (UZT)",
    contact_response: "Response Time",
    contact_response_val: "Usually within 2 hours",
    contact_location: "Location",
    contact_location_val: "Tashkent, Uzbekistan",

    // ── DESIGN PAGE ──
    ph_design_sub:
      "Brand identity, UI/UX, motion graphics and visual communication.",

    stat_design_projects: "Design Projects",
    stat_brand_identities: "Brand Identities",
    stat_avg_rating: "Avg. Rating",

    sec_featured_label: "Featured Work",
    sec_featured_title: 'Visual stories that <span class="ap">resonate.</span>',
    sec_featured_desc:
      "The best work from brand identity, UI design, and visual communication.",

    cat_brand: "Brand Identity",
    cat_editorial: "Editorial",
    cat_uiux: "UI/UX Design",
    cat_motion: "Motion Design",
    cat_packaging: "Packaging",
    cat_webdesign: "Web Design",
    cat_illustration: "Illustration",
    cat_projects: "Projects",

    fw1_title: "NEXUS — Full Brand System",
    fw1_desc:
      "Logo, typography, color system, stationery and brand guidelines set.",
    fw2_title: "Magazine Layout System",
    fw2_desc: "A modern editorial design system.",
    fw3_title: "Fintech App Interface",
    fw3_desc: "40+ screen mobile banking UI.",
    fw4_title: "Animated Brand Kit",
    fw4_desc: "Logo animations and transitions.",
    fw5_title: "Premium Product Line",
    fw5_desc: "Luxury packaging for a cosmetics brand.",
    fw6_title: "Agency Site Redesign",
    fw6_desc: "Full redesign with custom illustrations and micro-animations.",
    fw7_title: "Custom Icon Library",
    fw7_desc: "200+ custom icons and illustrations for a SaaS product.",

    sec_disciplines_label: "What I Do",
    sec_disciplines_title: "disciplines",
    sec_disciplines_desc:
      "From concept to final pixel — each field demands a unique skill set.",

    cat_brand_desc:
      "Logo systems, color palettes, typography and brand guidelines.",
    cat_uiux_desc:
      "User research, wireframes, interactive prototypes and high-fidelity Figma designs.",
    cat_motion_desc: "Logo animations, UI transitions and brand motion kits.",
    cat_print_title: "Print & Packaging",
    cat_print_desc:
      "Product packaging, editorial layouts and commercial print materials.",
    cat_illus_title: "Illustration",
    cat_illus_desc:
      "Custom vector illustrations, icon libraries and editorial art.",
    cat_web_title: "Web Design",
    cat_web_desc:
      "Landing pages and web app interfaces — clean, modern and conversion-focused.",

    sec_brand_label: "Brand Projects",
    sec_brand_title: "work",
    sec_brand_desc:
      "From building brands from zero — strategy, visual identity and brand book.",

    bp1_desc:
      "Full brand identity: logo, wordmark, color system, stationery and brand guidelines.",
    bp2_desc:
      "Eco brand: earth palette, custom lettering, packaging, ambalaj and digital guidelines.",
    bp3_desc:
      "Bold product brand: aggressive typography, neon accents and strong visual identity.",
    bp4_desc:
      "Premium identity: gold and black palette, serif wordmark and luxury brand book.",
    bp5_desc:
      "Custom illustrations, icon set, UI kit and brand animation guidelines.",

    sec_gallery_label: "Gallery",
    sec_gallery_title: "archive",
    sec_gallery_desc: "Selected samples from all disciplines.",

    filter_all: "All",
    filter_brand: "Branding",
    filter_ui: "UI/UX",
    filter_print: "Print",
    filter_motion: "Motion",

    sec_skills_label: "Skills",
    sec_skills_title: "toolkit",
    sk_software: "Design Software",
    sk_3d: "3D & Motion",
    sk_disciplines: "Design Disciplines",
    sk_typography: "Typography",
    sk_other_tools: "Other Tools",

    sec_testi_label: "Client Reviews",
    sec_testi_title: "say",
    testi1_text:
      "The brand identity exceeded every expectation. MONTRAX made our brand not just beautiful, but meaningful.",
    testi2_text:
      "Our app UI went from mediocre to award-worthy. Every pixel was placed with intention.",
    testi3_text:
      "Packaging that stands out on shelves and communicates our brand story instantly.",

    cta_design_eye: "Got a design project?",
    cta_design_title:
      'Let\'s create something that <span class="ap">stands out.</span>',
    cta_design_desc:
      "Great design is the difference between being seen and being remembered.",
    cta_design_btn: "Start a Project →",
    cta_see_frontend: "View Frontend Work",

    // ── ADMIN ──
    admin_login_tag: "Admin Panel · Login",
    admin_phone_label: "Phone number",
    admin_pass_label: "Password",
    admin_login_btn: "Login →",
    admin_login_err: "Phone number or password is incorrect!",
    admin_old_pass: "Old password",
    admin_new_pass: "New password",
    admin_conf_pass: "Confirm password",
    admin_change_pass_btn: "Change Password",
  },

  ru: {
    // ── NAV ──
    nav_home: "Главная",
    nav_frontend: "Frontend",
    nav_design: "Дизайн",
    nav_products: "Продукты",
    nav_pricing: "Цены",
    nav_contact: "Контакт",
    nav_hire: "Нанять",

    // ── HERO ──
    hero_available: "Доступен для новых проектов",
    hero_title:
      'Я создаю <span class="ae">опыт</span>, который <span class="ap">конвертирует.</span>',
    hero_sub:
      "Frontend-разработчик и графический дизайнер — создаю премиальные цифровые продукты на стыке эстетики и производительности.",
    hero_btn_work: "Смотреть работы →",
    hero_btn_contact: "Связаться",
    hero_stat1_lbl: "Лет опыта",
    hero_stat2_lbl: "Проектов выполнено",
    hero_stat3_lbl: "Языка в работе (UZ·EN·RU)",

    // ── SECTIONS ──
    sec_frontend_label: "Frontend Разработка",
    sec_frontend_title: 'Написано с <span class="ae">точностью.</span>',
    sec_frontend_desc:
      "React, Next.js, Vue — каждый интерфейс создан для максимальной производительности.",
    sec_frontend_view: "Все проекты →",

    sec_design_label: "Графический Дизайн",
    sec_design_title: 'Дизайн, который <span class="ap">говорит.</span>',
    sec_design_desc: "Брендинг, UI/UX, моушн — создано с намерением.",
    sec_design_view: "Все дизайны →",

    sec_products_label: "E-Commerce Дизайн",
    sec_products_title:
      'Карточки товаров, которые <span class="ae">продают.</span>',
    sec_products_desc: "Оптимизированные для конверсии e-commerce интерфейсы.",

    sec_services_label: "Что Предлагаю",
    sec_services_title:
      'Услуги, созданные для <span class="ae">результата.</span>',
    sec_services_desc:
      "От концепции до запуска — каждая услуга нацелена на измеримый результат.",

    // ── SERVICES ──
    srv1_title: "Frontend Разработка",
    srv1_desc:
      "React, Next.js, Vue — высокопроизводительные интерфейсы с чистым кодом и идеальной пиксельной точностью.",
    srv2_title: "Бренд-идентичность",
    srv2_desc:
      "Логосистемы, цветовые палитры, типографика и брендбук — полный визуальный язык вашего бренда.",
    srv3_title: "UI / UX Дизайн",
    srv3_desc:
      "Исследование пользователей, вайрфреймы, прототипы и высококачественные Figma-дизайны.",
    srv4_title: "E-Commerce",
    srv4_desc:
      "Магазины с оптимизацией конверсии — Shopify, WooCommerce или кастомные решения.",
    srv5_title: "Моушн Дизайн",
    srv5_desc:
      "Анимации логотипов, переходы UI, объяснительные видео и наборы фирменного движения.",
    srv6_title: "Производительность и SEO",
    srv6_desc:
      "Оптимизация Core Web Vitals, технический SEO, аудиты Lighthouse и ускорение страниц.",

    // ── CTA ──
    cta_eye: "Готовы создать что-то легендарное?",
    cta_title:
      'Давайте создадим нечто, что <span class="ae">выделяется.</span>',
    cta_desc:
      "Есть идея проекта? Создадим цифровой опыт, который ваша аудитория никогда не забудет.",
    cta_btn: "Связаться сейчас",
    cta_btn2: "Смотреть портфолио",

    // ── FOOTER ──
    foot_desc:
      "Frontend-разработчик и графический дизайнер — создаю премиальные цифровые продукты, которые конвертируют.",
    foot_services: "Услуги",
    foot_navigate: "Навигация",
    foot_touch: "Связаться",
    foot_copy: "Все права защищены.",
    foot_made: "Создано с электрической точностью",

    // ── PRICING ──
    pricing_label: "Тарифные Планы",
    pricing_title: 'Выберите подходящий <span class="ae">план.</span>',
    pricing_desc: "Прозрачные и честные цены для каждого проекта.",
    plan_basic: "Стартовый",
    plan_pro: "Профессиональный",
    plan_elite: "Элитный",
    plan_basic_desc: "Для небольших проектов и стартапов",
    plan_pro_desc: "Для растущего бизнеса",
    plan_elite_desc: "Для крупных корпоративных проектов",
    plan_btn_basic: "Начать",
    plan_btn_pro: "Выбрать",
    plan_btn_elite: "Связаться",
    plan_popular: "Популярный",
    plan_custom: "Индивидуальная цена",
    plan_from: "От",
    currency: "USD",

    // ── CONTACT ──
    contact_label: "Контакт",
    contact_title: 'Давайте <span class="ae">поговорим.</span>',
    contact_desc:
      "Идея проекта, вопрос или сотрудничество — пишите о чём угодно.",
    form_name: "Ваше имя",
    form_email: "Ваш email",
    form_subject: "Тема",
    form_message: "Ваше сообщение...",
    form_send: "Отправить →",
    form_sending: "Отправка...",
    form_sent: "Сообщение отправлено! Отвечу в ближайшее время.",
    contact_or: "или свяжитесь напрямую",
    contact_social_title: "Социальные Сети",
    contact_info_title: "Контактная Информация",
    contact_hours: "Рабочие Часы",
    contact_hours_val: "Пн — Сб: 9:00 — 22:00 (UZT)",
    contact_response: "Время ответа",
    contact_response_val: "Обычно в течение 2 часов",
    contact_location: "Местоположение",
    contact_location_val: "Ташкент, Узбекистан",

    // ── DESIGN PAGE ──
    ph_design_sub:
      "Бренд-идентичность, UI/UX, моушн-графика и визуальная коммуникация.",

    stat_design_projects: "Дизайн-проектов",
    stat_brand_identities: "Бренд-идентичностей",
    stat_avg_rating: "Средний рейтинг",

    sec_featured_label: "Избранные работы",
    sec_featured_title:
      'Визуальные истории, которые <span class="ap">резонируют.</span>',
    sec_featured_desc:
      "Лучшие работы из брендинга, UI-дизайна и визуальной коммуникации.",

    cat_brand: "Бренд-идентичность",
    cat_editorial: "Редакционный",
    cat_uiux: "UI/UX Дизайн",
    cat_motion: "Моушн Дизайн",
    cat_packaging: "Упаковка",
    cat_webdesign: "Веб-дизайн",
    cat_illustration: "Иллюстрация",
    cat_projects: "Проектов",

    fw1_title: "NEXUS — Полная Бренд-система",
    fw1_desc:
      "Логотип, типографика, цветовая система, канцтовары и набор брендбука.",
    fw2_title: "Система макетов журнала",
    fw2_desc: "Современная редакционная система дизайна.",
    fw3_title: "Интерфейс Fintech-приложения",
    fw3_desc: "40+ экранов мобильного банковского UI.",
    fw4_title: "Анимированный Бренд-кит",
    fw4_desc: "Анимации логотипов и переходы.",
    fw5_title: "Премиум Продуктовая Линейка",
    fw5_desc: "Роскошная упаковка для косметического бренда.",
    fw6_title: "Редизайн сайта агентства",
    fw6_desc: "Полный редизайн с кастомными иллюстрациями и микроанимациями.",
    fw7_title: "Библиотека кастомных иконок",
    fw7_desc: "200+ кастомных иконок и иллюстраций для SaaS-продукта.",

    sec_disciplines_label: "Что Делаю",
    sec_disciplines_title: "направления",
    sec_disciplines_desc:
      "От концепции до финального пикселя — каждая область требует уникального набора навыков.",

    cat_brand_desc:
      "Логосистемы, цветовые палитры, типографика и рекомендации по бренду.",
    cat_uiux_desc:
      "Исследование пользователей, вайрфреймы, интерактивные прототипы и Figma-дизайны.",
    cat_motion_desc:
      "Анимации логотипов, переходы UI и наборы фирменного движения.",
    cat_print_title: "Печать и Упаковка",
    cat_print_desc:
      "Упаковка продукта, редакционные макеты и коммерческие печатные материалы.",
    cat_illus_title: "Иллюстрация",
    cat_illus_desc:
      "Кастомные векторные иллюстрации, библиотеки иконок и редакционное искусство.",
    cat_web_title: "Веб-дизайн",
    cat_web_desc:
      "Лендинги и интерфейсы веб-приложений — чистые, современные и ориентированные на конверсию.",

    sec_brand_label: "Бренд-проекты",
    sec_brand_title: "работы",
    sec_brand_desc:
      "От создания брендов с нуля — стратегия, визуальная идентичность и брендбук.",

    bp1_desc:
      "Полная бренд-идентичность: логотип, слово, цветовая система, канцтовары и руководство.",
    bp2_desc:
      "Эко-бренд: земляная палитра, кастомное начертание, упаковка и цифровые рекомендации.",
    bp3_desc:
      "Жирный продуктовый бренд: агрессивная типографика, неоновые акценты и сильная визуальная идентичность.",
    bp4_desc:
      "Премиум-идентичность: золотая и чёрная палитра, засечный логотип и роскошный брендбук.",
    bp5_desc:
      "Кастомные иллюстрации, набор иконок, UI-кит и руководство по анимации бренда.",

    sec_gallery_label: "Галерея",
    sec_gallery_title: "архив",
    sec_gallery_desc: "Избранные образцы из всех направлений.",

    filter_all: "Все",
    filter_brand: "Брендинг",
    filter_ui: "UI/UX",
    filter_print: "Печать",
    filter_motion: "Моушн",

    sec_skills_label: "Навыки",
    sec_skills_title: "инструменты",
    sk_software: "Дизайн-программы",
    sk_3d: "3D и Моушн",
    sk_disciplines: "Дизайн-направления",
    sk_typography: "Типографика",
    sk_other_tools: "Другие Инструменты",

    sec_testi_label: "Отзывы Клиентов",
    sec_testi_title: "говорят",
    testi1_text:
      "Бренд-идентичность превзошла все ожидания. MONTRAX сделал наш бренд не просто красивым, но и осмысленным.",
    testi2_text:
      "Наш UI-приложения перешёл от посредственного к достойному наград. Каждый пиксель размещён намеренно.",
    testi3_text:
      "Упаковка, которая выделяется на полках и мгновенно передаёт историю нашего бренда.",

    cta_design_eye: "Есть дизайн-проект?",
    cta_design_title:
      'Создадим что-то, что <span class="ap">выделяется.</span>',
    cta_design_desc:
      "Великий дизайн — это разница между тем, чтобы быть увиденным и запомненным.",
    cta_design_btn: "Начать Проект →",
    cta_see_frontend: "Смотреть Frontend-работы",

    // ── ADMIN ──
    admin_login_tag: "Панель Администратора · Вход",
    admin_phone_label: "Номер телефона",
    admin_pass_label: "Пароль",
    admin_login_btn: "Войти →",
    admin_login_err: "Номер телефона или пароль неверны!",
    admin_old_pass: "Старый пароль",
    admin_new_pass: "Новый пароль",
    admin_conf_pass: "Подтвердите пароль",
    admin_change_pass_btn: "Изменить Пароль",
  },
};

function getLang() {
  return localStorage.getItem(LANG_KEY) || "uz";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLang(lang);
  updateLangUI(lang);
}

function t(key) {
  const lang = getLang();
  return (
    (translations[lang] && translations[lang][key]) ||
    translations["uz"][key] ||
    key
  );
}

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val =
      (translations[lang] && translations[lang][key]) ||
      translations["uz"][key] ||
      key;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });
  document.querySelectorAll("[data-i18n-val]").forEach((el) => {
    const key = el.getAttribute("data-i18n-val");
    const val =
      (translations[lang] && translations[lang][key]) ||
      translations["uz"][key] ||
      key;
    el.value = val;
  });
  document.documentElement.lang = lang;
}

function updateLangUI(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

function initLang() {
  const lang = getLang();
  applyLang(lang);
  updateLangUI(lang);
}

document.addEventListener("DOMContentLoaded", initLang);
