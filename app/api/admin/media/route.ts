import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/cms/auth";
import {
  deleteMedia,
  listBundledMedia,
  listMedia,
  uploadMedia,
} from "@/lib/cms/store";
import { revalidateCms } from "@/lib/cms/read";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const OK_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Kirilmagan" }, { status: 401 });
  }
  const [uploaded, bundled] = await Promise.all([
    listMedia(),
    listBundledMedia(),
  ]);
  return NextResponse.json({ uploaded, bundled });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Kirilmagan" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Fayl yuborilmadi" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fayl topilmadi" }, { status: 400 });
  }
  if (!OK_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Rasm formati qo'llab-quvvatlanmaydi: ${file.type || "noma'lum"}` },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Fayl 8 MB dan katta. Kichraytiring." },
      { status: 400 }
    );
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const res = await uploadMedia(file.name, bytes, file.type);

    // O'lcham — dizayn galereyasi uchun kerak
    let w = 0;
    let h = 0;
    try {
      const sharp = (await import("sharp")).default;
      const meta = await sharp(bytes).metadata();
      w = meta.width ?? 0;
      h = meta.height ?? 0;
    } catch {
      /* sharp SVG'ni o'qiy olmasligi mumkin — muhim emas */
    }

    revalidateCms();
    return NextResponse.json({ ...res, w, h });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Yuklashda xato" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Kirilmagan" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "Nom ko'rsatilmagan" }, { status: 400 });
  }
  if (name.startsWith("media/")) {
    return NextResponse.json(
      { error: "Loyihaga kiritilgan rasmni admin paneldan o'chirib bo'lmaydi." },
      { status: 400 }
    );
  }
  try {
    await deleteMedia(name);
    revalidateCms();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "O'chirishda xato" },
      { status: 500 }
    );
  }
}
