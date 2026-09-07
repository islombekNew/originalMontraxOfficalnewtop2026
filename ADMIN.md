# MONTRAX — Boshqaruv paneli (admin)

Sayt matnlari, ishlar, rasmlar va narxlarni kod tegmasdan o'zgartirish uchun.

- **Manzil:** `/admin` (lokal: `http://localhost:3000/admin`)
- **Login:** yo'q — faqat parol
- **Parol:** `.env` faylidagi `ADMIN_PASS` qiymati

Parolni istagan vaqt `.env` da o'zgartirsangiz bo'ladi (Vercel'da ham
yangilashni unutmang). O'zgartirgach eski sessiyalar avtomatik bekor bo'ladi.

---

## 1. Qanday ishlaydi

Ikkita rejim bor. Qaysi biri ishlashini `.env` dagi kalitlar hal qiladi:

| Rejim | Qachon | Ma'lumot qayerda | Yozish mumkinmi |
|---|---|---|---|
| **Lokal** | `SUPABASE_SERVICE_ROLE_KEY` bo'sh | `content/cms/*.json` + `public/uploads/` | Faqat kompyuteringizda (`npm run dev`) |
| **Supabase** | URL + service_role kalit bor | Supabase Storage (`montrax-cms` va `media` bucket) | Ha, jonli saytda ham |

**Muhim:** Vercel'da fayl tizimiga yozib bo'lmaydi. Shuning uchun jonli saytda
admin ishlashi uchun Supabase **shart**.

Ma'lumotlar bazasida yozuv bo'lmasa, sayt kodga kiritilgan standart matnlarni
ko'rsatadi (`messages/*.json`, `content/work/*.mdx`). Ya'ni **sayt hech qachon
bo'sh qolmaydi** — Supabase o'chib qolsa ham.

---

## 2. Supabase'ni ulash — 3 qadam

**SQL yozish kerak emas.** Bucket'larni admin panel o'zi yaratadi.

### 2.1. Loyiha ochish
1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Nom: `montrax`, region: **Frankfurt** (O'zbekistonga eng yaqini)
3. Database password'ni saqlab qo'ying (bizga kerak emas, lekin yo'qotmang)
4. ~2 daqiqa kutasiz — loyiha tayyorlanadi

### 2.2. Kalitlarni ko'chirish
**Settings → API** bo'limida uchta qiymat bor:

| Supabase'da | `.env` da |
|---|---|
| Project URL | `SUPABASE_URL` |
| `anon` `public` | `SUPABASE_ANON_KEY` |
| `service_role` `secret` | `SUPABASE_SERVICE_ROLE_KEY` |

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> `service_role` — to'liq huquqli maxfiy kalit. Uni **hech qachon** frontend
> kodga, GitHub'ga yoki hech kimga bermang. Faqat serverda ishlatiladi.

Xuddi shu uchtasini (+ `ADMIN_PASS`) Vercel → **Settings → Environment
Variables** ga ham qo'shing (Production + Preview + Development), keyin
**Redeploy** qiling.

Lokalda `npm run dev` ni qayta ishga tushiring.

### 2.3. Tugmani bosish
`/admin` ga kiring → **«Boshlang'ich ma'lumotni yuklash»**.

Bu bir bosishda:
- `montrax-cms` (yopiq) va `media` (ochiq) bucket'larini yaratadi
- saytning hozirgi matnlari, loyihalari, narxlarini bazaga ko'chiradi

Mavjud yozuvlarga tegmaydi — ikkinchi marta bossangiz ham tahrirlaringiz
o'chmaydi.

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
gif, svg). Yoki `media` bucket yaratilmagan — `/admin` dagi «Boshlang'ich
ma'lumotni yuklash» tugmasini bosing.

**«bucket yaratilmadi» xatosi**
→ `SUPABASE_SERVICE_ROLE_KEY` noto'g'ri yoki `anon` kalit tushib qolgan.
Settings → API dan `service_role` (secret) ni qayta nusxalang.

**Matnni bo'shatib qo'ydim, saytda bo'sh joy**
→ CMS'dagi bo'sh matn standart matnni ham bosib ketadi. Qaytarish uchun
o'sha maydonga qayta yozing (eski matn `messages/uz.json` da turibdi).

**Hammasini boshidan tiklash**
→ Supabase → **Storage → montrax-cms** → kerakli JSON faylni o'chiring
(masalan `messages-uz.json`). Sayt darhol kodga kiritilgan standart holatga
qaytadi, keyin «Boshlang'ich ma'lumotni yuklash» bilan qayta to'ldiriladi.
