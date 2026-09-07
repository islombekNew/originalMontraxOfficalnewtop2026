"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeedButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function run() {
    if (
      !confirm(
        "Saytning hozirgi matnlari, ishlari va narxlari ma'lumotlar bazasiga ko'chiriladi.\n\nAvval saqlangan tahrirlaringizga tegilmaydi. Davom etamizmi?"
      )
    )
      return;

    setBusy(true);
    setMsg("");
    setErr("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Xato");
        return;
      }
      setMsg(
        `${data.written.length} ta bo'lim yuklandi` +
          (data.skipped.length
            ? `, ${data.skipped.length} tasi allaqachon bor edi — tegilmadi.`
            : ".")
      );
      router.refresh();
    } catch {
      setErr("Tarmoq xatosi");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button className="a-btn a-btn-primary" onClick={run} disabled={busy}>
        {busy ? "Yuklanmoqda…" : "Boshlang'ich ma'lumotni yuklash"}
      </button>
      {msg && <span className="text-sm text-a-ok">{msg}</span>}
      {err && <span className="text-sm text-a-danger">{err}</span>}
    </div>
  );
}
