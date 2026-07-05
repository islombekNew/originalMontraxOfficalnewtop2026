import { NextResponse } from "next/server";

/** Contact form → Telegram bot orqali FAQAT .env'da ro'yxatlangan
 *  chat ID'larga yuboriladi (Islombekning 2 akkaunti). Boshqa hech kimga
 *  yuborilmaydi — ID'lar server tarafda qattiq belgilangan.
 *  .env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_IDS (vergul bilan) */
export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
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

  // Ikkala akkauntga parallel yuborish — bittasi yetib borsa ham ok
  const results = await Promise.allSettled(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      })
    )
  );

  const anyOk = results.some(
    (r) => r.status === "fulfilled" && r.value.ok
  );

  if (!anyOk) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
