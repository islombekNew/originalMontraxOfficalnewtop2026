# MONTRAX Portfolio — Discovery javoblari

> Phase 1 discovery sessiyasi. Sana: 2026-07-04

## Blok 1 — Strategiya ✅

1. **Asosiy auditoriya:** CRM/dev klient — Mix Mobile, Montrax Savdo kabi tizim buyurtma beradiganlar. Texnik case study'lar oldinda bo'ladi, lekin grafik dizayn ham kuchli ko'rsatiladi (ustozning tanqidi shu edi).
2. **Tillar:** Uzbek + English asosiy. Rus tili — agar oson qo'shilsa, qo'shiladi (nice-to-have, blocker emas).
3. **Bosh xabar (5 daqiqada yodda qoladigan narsa):** "Bu bola ham chizadi, ham quradi" — dizayn + kod kombinatsiyasi. Hero copy shu tezisga quriladi.
4. **Asosiy CTA:** Telegram yozish (@Montrax_offical). Butun sayt shu action'ga optimallashadi — form ikkinchi darajali.
5. **Brend vs Shaxs:** Shaxs birinchi. Janob shaxsan oldinda, MONTRAX — brend imzo sifatida. Copy "I/Men" tonida, real foto, shaxsiy hikoya.

### Arxitektura xulosalari (Blok 1'dan kelib chiqadi)
- Featured work: dev loyihalar (CRM'lar) yuqorida, lekin har case'da dizayn qarorlari ham ko'rsatiladi — "design + code" tezisini isbotlash uchun
- i18n: UZ + EN (next-intl), RU keyinroq qo'shilishi mumkin bo'lgan struktura
- Contact: Telegram deep-link asosiy CTA, form yordamchi (Telegram bot'ga yuboradi — Blok 4'da aniqlanadi)
- About: shaxsiy hikoya markazda, MONTRAX brendi "mening studiom" sifatida

## Blok 2 — Loyiha kontenti ⏳ (qisman)

6. **Featured loyihalar (sanalar bilan):**
   - **KinoDam bot** — 2026-yil 23-aprel
   - **Mix Mobile baza** (CRM backend/tizim) — 2026-yil 20-iyun
   - **Mix Mobile dizaynlar** (grafik ishlar) — 2026-yil 25-iyun
   - **Montrax Savdo** — 2026-yil 3-iyul (eng yangi)
   - Qolgan detallar (klient, rol, tools, URL) — Janob keyinroq beradi ⏳

7. Materiallar ro'yxati — ⏳ kutilmoqda (Janob keyin beradi)
8. Grafik dizayn kategoriyalari — ⏳ kutilmoqda
9. Eng kuchli 3 / eng zaif 2 ish — ⏳ kutilmoqda
10. **Testimonial:** YO'Q — bo'lim umuman qo'yilmaydi. Fake initsial testimonial taqiqlangan, real klient roziligi hozircha yo'q. Keyinchalik real testimonial paydo bo'lsa qo'shiladi.
11. **Halol statistika:** 10+ real loyiha (Janob aytishicha). Saytda "10+ projects" ishlatiladi — LEKIN work grid'da kamida 8-10 ish ko'rsatilsa ishonchli bo'ladi, aks holda raqamni pastga tushiramiz. Fake "120+ projects / 80+ clients" o'chiriladi.
12. **Video material:** yo'q. Motion reel Phase 6'da — CRM screen recording ro'yxatini men tuzib beraman, Janob yozib oladi.

## Blok 3 — Vizual til ✅

13. **Reference:** Janob menga topshirdi. Yo'nalish: Locomotive asymmetric grid + Rauno precision detail + dark dev-studio estetikasi.
14. **His:** Dark & precise — qora fon, aniq grid, sovuq professional.
15. **Signature moment:** 3D scene hero'da (Three.js, sichqonchaga reaktiv). Boshlang'ich kod skill'ning `assets/three-signature-effects.html` faylida bor — ranglarni moslab qayta ishlatiladi.
16. **Ranglar:** Janob menga topshirdi. Qaror: fon `#05070a`, accent mint-yashil `#2fe6a6` (MONTRAX identity), 3-4 neutral shade. Agar buildda professional ko'rinmasa qayta ko'riladi.
17. **Typography:** Janob menga topshirdi. Qaror: **Clash Display** (display/headings, Fontshare bepul) + **Inter** (body, kelajakda RU uchun kirill support ham bor). Fluid clamp() scale.
18. **Motion:** Balanced/expressive — har sahifada 1-2 wow moment, qolgani nozik reveal'lar.

## Blok 4 — Texnik ✅

19. **Domain:** Hozirgi Netlify qoladi — montraxportfolios.netlify.app. Deploy target: **Netlify** (@netlify/plugin-nextjs bilan). Custom domain keyin.
20. **CMS:** MDX fayllar — har case study `.mdx`, git versiya nazorati, $0.
21. **Analytics:** Janob menga topshirdi. Qaror: **Cloudflare Web Analytics** — bepul, bitta yengil script, cookie banner kerak emas, Netlify bilan ishlaydi. (Vercel Analytics Netlify'da ishlamaydi, Plausible pullik, GA og'ir.)
22. **Contact form:** Telegram bot (grammY) — form submit → Janobning Telegram'iga xabar. Asosiy CTA baribir to'g'ridan-to'g'ri Telegram deep-link.

---

## YAKUNIY XULOSA (barcha bloklar)

| Qaror | Qiymat |
|---|---|
| Auditoriya | CRM/dev klient birinchi, grafik dizayn kuchli ikkinchi |
| Tillar | UZ + EN (next-intl), RU — kelajakda |
| Bosh xabar | "Dizayn + kod ikkalasini biladi" |
| CTA | Telegram (@Montrax_offical) |
| Pozitsiya | Shaxs birinchi, MONTRAX — brend imzo |
| His | Dark & precise |
| Signature | 3D hero (Three.js), custom cursor yordamchi |
| Ranglar | `#05070a` fon, `#2fe6a6` accent, neutrallar |
| Typography | Clash Display + Inter, fluid clamp |
| Motion | Balanced — sahifada 1-2 wow moment |
| Testimonial | YO'Q (real material kelguncha) |
| Statistika | Faqat halol: 10+ loyiha (grid tasdiqlasa), 2026'dan aktiv |
| Stack | Next.js 15 + TS + Tailwind v4 + Framer Motion + GSAP + Lenis + R3F + MDX |
| Deploy | Netlify (montraxportfolios.netlify.app) |
| Analytics | Cloudflare Web Analytics |
| Form | Telegram bot (grammY) |
