"use client";

import { useRef, useState } from "react";
import { useMediaLibrary, uploadFile } from "./MediaPicker";
import type { MediaFile } from "@/lib/cms/types";

function human(bytes: number) {
  if (!bytes) return "—";
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const { uploaded, bundled, loading, reload } = useMediaLibrary();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      for (const f of Array.from(files)) await uploadFile(f);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yuklashda xato");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(name: string) {
    if (!confirm("Rasm butunlay o'chiriladi. Saytda ishlatilayotgan bo'lsa, o'sha joyda bo'sh ko'rinadi. Davom etamizmi?"))
      return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "O'chirishda xato");
      } else {
        await reload();
      }
    } finally {
      setBusy(false);
    }
  }

  function copy(url: string) {
    const abs = url.startsWith("http") ? url : `${location.origin}${url}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(url);
      setTimeout(() => setCopied(""), 1500);
    });
    void abs;
  }

  const Card = ({ f, canDelete }: { f: MediaFile; canDelete: boolean }) => (
    <div className="a-card overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={f.url}
        alt=""
        className="aspect-square w-full bg-a-panel-2 object-cover"
        loading="lazy"
      />
      <div className="p-2.5">
        <div className="truncate text-xs font-medium" title={f.name}>
          {f.name.split("/").pop()}
        </div>
        <div className="mt-0.5 text-[11px] text-a-muted">{human(f.size)}</div>
        <div className="mt-2 flex gap-1">
          <button className="a-btn a-btn-sm flex-1" onClick={() => copy(f.url)}>
            {copied === f.url ? "Nusxalandi" : "Manzil"}
          </button>
          {canDelete && (
            <button
              className="a-btn a-btn-sm a-btn-danger"
              onClick={() => remove(f.name)}
              disabled={busy}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          className="a-btn a-btn-primary"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
        >
          {busy ? "Yuklanmoqda…" : "+ Rasm yuklash"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button className="a-btn" onClick={reload} disabled={loading}>
          Yangilash
        </button>
        {error && <span className="text-sm text-a-danger">{error}</span>}
      </div>

      <h2 className="a-label">Yuklangan rasmlar ({uploaded.length})</h2>
      {uploaded.length === 0 ? (
        <p className="mb-6 text-sm text-a-muted">
          Hozircha yuklangan rasm yo'q.
        </p>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {uploaded.map((f) => (
            <Card key={f.name} f={f} canDelete />
          ))}
        </div>
      )}

      <h2 className="a-label">Loyihadagi rasmlar ({bundled.length})</h2>
      <p className="mb-3 text-sm text-a-muted">
        Bular kod bilan birga keladi — admin paneldan o'chirib bo'lmaydi, lekin
        ishlatish mumkin.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {bundled.map((f) => (
          <Card key={f.name} f={f} canDelete={false} />
        ))}
      </div>
    </>
  );
}
