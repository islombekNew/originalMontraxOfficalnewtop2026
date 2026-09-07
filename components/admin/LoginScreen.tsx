"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginScreen({ passSet }: { passSet: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Kirish amalga oshmadi");
        return;
      }
      router.refresh();
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="a-card w-full max-w-sm p-7">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-a-accent">
            MONTRAX
          </div>
          <h1 className="mt-1.5 text-xl font-semibold">Boshqaruv paneli</h1>
          <p className="mt-1 text-sm text-a-muted">
            Sayt matnlari, ishlar va rasmlarni shu yerdan boshqarasiz.
          </p>
        </div>

        {!passSet ? (
          <div className="rounded-lg border border-a-line bg-a-panel-2 p-4 text-sm leading-relaxed text-a-dim">
            <b>ADMIN_PASS o'rnatilmagan.</b>
            <br />
            <code className="text-xs">.env</code> fayliga parol qo'shing va
            serverni qayta ishga tushiring:
            <pre className="mt-2 overflow-x-auto rounded bg-a-bg p-2 text-xs">
              ADMIN_PASS=sizning_parolingiz
            </pre>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label className="a-label" htmlFor="pw">
              Parol
            </label>
            <input
              id="pw"
              type="password"
              autoFocus
              autoComplete="current-password"
              className="a-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && (
              <p className="mt-2 text-sm text-a-danger">{error}</p>
            )}
            <button
              type="submit"
              className="a-btn a-btn-primary mt-4 w-full"
              disabled={busy || !password}
            >
              {busy ? "Tekshirilmoqda…" : "Kirish"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
