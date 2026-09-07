# MONTRAX — Boshqaruv paneli (admin)

Sayt matnlari, ishlar, rasmlar va narxlarni kod tegmasdan o'zgartirish uchun.
Manzil: **`/admin`**

---

## 1. Qanday ishlaydi

Ikkita rejim bor. Qaysi biri ishlashini `.env` dagi kalitlar hal qiladi:

| Rejim | Qachon | Ma'lumot qayerda | Yozish mumkinmi |
|---|---|---|---|
| **Lokal** | `SUPABASE_SERVICE_ROLE_KEY` bo'sh | `content/cms/*.json` + `public/uploads/` | Faqat kompyuteringizda (`npm run dev`) |
| **Supabase** | URL + service_role kalit bor | Supabase bazasi + Storage | Ha, jonli saytda ham |

**Muhim:** Vercel'da fayl tizimiga yozib bo'lmaydi. Shuning uchun jonli saytda
admin ishlashi uchun Supabase **shart**.

Ma'lumotlar bazasida yozuv bo'lmasa, sayt kodga kiritilgan standart matnlarni
ko'rsatadi (`messages/*.json`, `content/work/*.mdx`). Ya'ni **sayt hech qachon
bo'sh qolmaydi** — Supabase o'chib qolsa ham.

---

## 2. Supabase'ni ulash (bir marta)

Hozirgi `.env` dagi Supabase loyihasi **o'chirilgan** (bepul loyihalar uzoq
ishlatilmasa o'chib ketadi). Yangisini ochish kerak:

### 2.1. Loyiha ochish
1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Nom: `montrax`, region: **Frankfurt** (O'zbekistonga eng yaqini)
3. Parolni saqlab qo'ying

### 2.2. Jadval va bucket yaratish
1. Chapdagi menyudan **SQL Editor** → **New query**
2. Loyihadagi `supabase/schema.sql` faylini to'liq nusxalab qo'ying
3. **Run** bosing

### 2.3. Kalitlarni olish
**Settings → API** bo'limida uchta narsa bor:

| Supabase'da | `.env` da |
|---|---|
| Project URL | `SUPABASE_URL` |
| `anon` `public` | `SUPABASE_ANON_KEY` |
| `service_role` `secret` | `SUPABASE_SERVICE_ROLE_KEY` |

> `service_role` — to'liq huquqli maxfiy kalit. Uni **hech qachon** frontend
> kodga, GitHub'ga yoki hech kimga bermang. U faqat serverda ishlatiladi.

### 2.4. `.env` ga yozish (lokal)
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASS=sizning_parolingiz
```
Keyin `npm run dev` ni qayta ishga tushiring.

### 2.5. Vercel'ga yozish (jonli sayt)
Vercel → loyiha → **Settings → Environment Variables**. Yuqoridagi
to'rttasini qo'shing (Production + Preview + Development), keyin
**Redeploy** qiling.

### 2.6. Boshlang'ich ma'lumotni yuklash
`/admin` sahifasiga kiring → **«Boshlang'ich ma'lumotni yuklash»** tugmasini
bosing. Saytning hozirgi matnlari, loyihalari va narxlari bazaga ko'chadi.

Bu tugma mavjud yozuvlarga tegmaydi — ikkinchi marta bossangiz ham
tahrirlaringiz o'chmaydi.

---

## 3. Bo'limlar

| Bo'lim | Nima qilinadi |
|---|---|
| **Matnlar** | Saytdagi har bir so'z: sarlavha, tavsif, tugma yozuvi, SEO. O'zbekcha va inglizcha yonma-yon. Yuqoridagi qidiruvga so'z yozsangiz, o'sha matn qayerdaligini topadi. |
| **Ishlar** | Loyiha qo'shish/o'chirish, tartib (↑ ↓), muqova rasmi, case study matni (Markdown), «Saytda ko'rsatilsin» belgisi. Birinchi 3 tasi bosh sahifada chiqadi. |
| **Dizayn galereya** | Bosh sahifadagi sudraladigan lenta. Bir nechta rasmni birdan yuklash mumkin — o'lchamlari avtomatik aniqlanadi. |
| **Narx-menyu** | Kategoriya va narx qatorlari. Narx matn sifatida yoziladi («600 000+»). `/oy` — oylik to'lov, `kelishuv` — narx o'rniga «Loyihaga qarab». |
| **Savol-javob** | Xizmatlar sahifasidagi FAQ. Nechta bo'lsa ham bo'ladi. |
| **Bosh sahifa bo'limlari** | Blokni yashirish yoki joyini almashtirish. Hero o'chmaydi. |
| **Havolalar & sozlama** | Telegram manzili, ijtimoiy tarmoqlar, «Men haqimda» surati, logo, OG rasm, tools ro'yxati. |
| **Rasmlar kutubxonasi** | Rasm yuklash va o'chirish. Bitta fayl 8 MB gacha. |

Har sahifa pastida **Saqlash** tugmasi. Saqlanmagan o'zgarish bo'lsa u
sariq rangda ogohlantiradi va sahifadan chiqmoqchi bo'lsangiz brauzer
so'raydi.

---

## 4. Xavfsizlik

- Kirish `ADMIN_PASS` paroli bilan. Parol imzolangan `httpOnly` cookie'ga
  aylanadi, 14 kun amal qiladi.
- 5 marta noto'g'ri parol → bir daqiqa kutish.
- `/admin` Google'ga indekslanmaydi (`robots: noindex`).
- Yozish faqat `service_role` kalit orqali. Saytni ochgan oddiy foydalanuvchi
  ma'lumotni faqat **o'qiy** oladi (RLS siyosati).

**Parolni o'zgartirish:** `.env` va Vercel'dagi `ADMIN_PASS` ni yangilang.
Eski cookie'lar avtomatik bekor bo'ladi.

---

## 5. Tez-tez uchraydigan holatlar

**«Saqlash» xato beryapti, Vercel'da**
→ `SUPABASE_SERVICE_ROLE_KEY` Vercel'ga qo'shilmagan yoki redeploy qilinmagan.

**O'zgartirdim, lekin saytda ko'rinmayapti**
→ Saqlash tugmasi bosilganini tekshiring. Bosilgan bo'lsa — brauzer keshi:
`Ctrl+Shift+R`.

**Rasm yuklanmayapti**
→ 8 MB dan katta yoki format qo'llab-quvvatlanmaydi (jpg, png, webp, avif,
gif, svg). Yoki `media` bucket yaratilmagan — `schema.sql` ni qayta ishga
tushiring.

**Matnni bo'shatib qo'ydim, saytda bo'sh joy**
→ CMS'dagi bo'sh matn standart matnni ham bosib ketadi. Qaytarish uchun
o'sha maydonga qayta yozing (eski matn `messages/uz.json` da turibdi).

**Hammasini boshidan tiklash**
→ Supabase → Table Editor → `cms_docs` → kerakli qatorni o'chiring. Sayt
darhol kodga kiritilgan standart holatga qaytadi.
