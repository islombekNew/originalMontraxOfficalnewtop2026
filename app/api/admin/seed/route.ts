import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/cms/auth";
import { readDoc, writeDoc } from "@/lib/cms/store";
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
