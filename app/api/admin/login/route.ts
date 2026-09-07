import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminPassSet,
  checkPassword,
  cookieOptions,
  createToken,
} from "@/lib/cms/auth";

export const runtime = "nodejs";

/** Oddiy brute-force tormozi — bir xil IP uchun ketma-ket xato urinishlar */
const attempts = new Map<string, { n: number; until: number }>();

export async function POST(req: Request) {
  if (!adminPassSet()) {
    return NextResponse.json(
      { error: "ADMIN_PASS o'rnatilmagan. .env fayliga qo'shing." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const rec = attempts.get(ip);
  if (rec && rec.until > Date.now()) {
    return NextResponse.json(
      { error: "Juda ko'p urinish. Bir daqiqadan keyin qayta urinib ko'ring." },
      { status: 429 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    const n = (rec?.n ?? 0) + 1;
    attempts.set(ip, { n, until: n >= 5 ? Date.now() + 60_000 : 0 });
    return NextResponse.json({ error: "Parol noto'g'ri" }, { status: 401 });
  }

  attempts.delete(ip);
  const token = createToken()!;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, cookieOptions);
  return res;
}
