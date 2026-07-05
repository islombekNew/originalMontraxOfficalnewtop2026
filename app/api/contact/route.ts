import { NextResponse } from "next/server";

/** Contact form → Telegram bot orqali Janobning shaxsiy chatiga.
 *  .env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID */
export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Telegram not configured" },
      { status: 503 }
    );
  }

  let body: { name?: string; contact?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = (body.name ?? "").slice(0, 100).trim();
  const contact = (body.contact ?? "").slice(0, 100).trim();
  const message = (body.message ?? "").slice(0, 2000).trim();

  if (!name || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const text = [
    "📩 Portfolio'dan yangi xabar",
    "",
    `👤 Ism: ${name}`,
    `📞 Aloqa: ${contact || "ko'rsatilmagan"}`,
    "",
    message,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
