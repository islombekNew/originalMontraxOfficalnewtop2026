import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/cms/auth";
import { driverName, readDoc, writeDoc } from "@/lib/cms/store";
import {
  CMS_BUCKET,
  MEDIA_BUCKET,
  ensureBucket,
} from "@/lib/cms/supabase";
import { readMdxWork, revalidateCms } from "@/lib/cms/read";
import {
  defaultDesign,
  defaultFaq,
  defaultMessages,
  defaultPricing,
  defaultSections,
  defaultSettings,
} from "@/lib/cms/defaults";
import { CMS_KEYS } from "@/lib/cms/types";

export const runtime = "nodejs";

/** Saytning hozirgi holatini CMS'ga ko'chiradi.
 *  Supabase yangi ulanganda bir marta bosiladi.
 *  Mavjud yozuvlarga TEGMAYDI — tahrirlaringiz yo'qolmaydi. */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Kirilmagan" }, { status: 401 });
  }

  let overwrite = false;
  try {
    overwrite = Boolean((await req.json())?.overwrite);
  } catch {
    /* tana bo'sh — standart rejim */
  }

  /* Bucket'larni tayyorlash — foydalanuvchi SQL yozmasin */
  if (driverName() === "supabase") {
    for (const [id, isPublic] of [
      [CMS_BUCKET, false],
      [MEDIA_BUCKET, true],
    ] as const) {
      const r = await ensureBucket(id, isPublic);
      if (!r.ok) {
        return NextResponse.json(
          {
            error: `«${id}» bucket yaratilmadi: ${r.error}. SUPABASE_SERVICE_ROLE_KEY to'g'ri ekanini tekshiring.`,
          },
          { status: 500 }
        );
      }
    }
  }

  const docs: Array<[string, unknown]> = [
    [CMS_KEYS.messagesUz, defaultMessages.uz],
    [CMS_KEYS.messagesEn, defaultMessages.en],
    [CMS_KEYS.work, readMdxWork()],
    [CMS_KEYS.design, defaultDesign],
    [CMS_KEYS.pricing, defaultPricing],
    [CMS_KEYS.settings, defaultSettings],
    [CMS_KEYS.sections, defaultSections],
    [CMS_KEYS.faq, defaultFaq],
  ];

  const written: string[] = [];
  const skipped: string[] = [];

  try {
    for (const [key, value] of docs) {
      if (!overwrite && (await readDoc(key))) {
        skipped.push(key);
        continue;
      }
      await writeDoc(key, value);
      written.push(key);
    }
    revalidateCms();
    return NextResponse.json({ ok: true, written, skipped });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Yuklashda xato", written },
      { status: 500 }
    );
  }
}
