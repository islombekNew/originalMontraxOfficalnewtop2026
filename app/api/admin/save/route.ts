import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/cms/auth";
import { writeDoc } from "@/lib/cms/store";
import { revalidateCms } from "@/lib/cms/read";
import { CMS_KEYS } from "@/lib/cms/types";

export const runtime = "nodejs";

const ALLOWED = new Set<string>(Object.values(CMS_KEYS));

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Kirilmagan" }, { status: 401 });
  }

  let key: string;
  let value: unknown;
  try {
    const body = await req.json();
    key = String(body?.key ?? "");
    value = body?.value;
  } catch {
    return NextResponse.json({ error: "Noto'g'ri JSON" }, { status: 400 });
  }

  if (!ALLOWED.has(key)) {
    return NextResponse.json({ error: `Noma'lum kalit: ${key}` }, { status: 400 });
  }
  if (value === undefined || value === null) {
    return NextResponse.json({ error: "Qiymat bo'sh" }, { status: 400 });
  }

  try {
    await writeDoc(key, value);
    revalidateCms();
    return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Saqlashda xato" },
      { status: 500 }
    );
  }
}
