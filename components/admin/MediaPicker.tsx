"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaFile } from "@/lib/cms/types";

export type PickResult = { url: string; w?: number; h?: number };

export function useMediaLibrary() {
  const [uploaded, setUploaded] = useState<MediaFile[]>([]);
  const [bundled, setBundled] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setUploaded(data.uploaded ?? []);
        setBundled(data.bundled ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { uploaded, bundled, loading, reload };
}

export async function uploadFile(file: File): Promise<PickResult & { name: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Yuklashda xato");
  return data;
}

export default function MediaPicker({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (r: PickResult) => void;
}) {
  const { uploaded, bundled, loading, reload } = useMediaLibrary();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const r = await uploadFile(files[0]);
      await reload();
      onPick({ url: r.url, w: r.w, h: r.h });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yuklashda xato");
    } finally {
      setBusy(false);
    }
  }

  const filter = (list: MediaFile[]) =>
    q ? list.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())) : list;

  const Grid = ({ list }: { list: MediaFile[] }) => (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {list.map((f) => (
        <button
          key={f.name}
          type="button"
          onClick={() => {
            onPick({ url: f.url });
            onClose();
          }}
          className="group overflow-hidden rounded-lg border border-a-line bg-a-panel-2 text-left"
          title={f.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.url}
            alt=""
            className="aspect-square w-full object-cover transition-opacity group-hover:opacity-80"
            loading="lazy"
          />
          <span className="block truncate px-1.5 py-1 text-[10px] text-a-muted">
            {f.name.split("/").pop()}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10"
      onClick={onClose}
    >
      <div
        className="a-card w-full max-w-4xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Rasm tanlang</h2>
          <div className="flex items-center gap-2">
            <input
              className="a-input !w-44"
              placeholder="Qidirish…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              className="a-btn a-btn-primary a-btn-sm"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              {busy ? "Yuklanmoqda…" : "Yangi yuklash"}
            </button>
            <button className="a-btn a-btn-sm" onClick={onClose}>
              Yopish
            </button>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleUpload(e.target.files)}
        />

        {error && <p className="mb-3 text-sm text-a-danger">{error}</p>}
        {loading && <p className="text-sm text-a-muted">Yuklanmoqda…</p>}

        {uploaded.length > 0 && (
          <>
            <h3 className="a-label mt-2">Yuklangan rasmlar</h3>
            <Grid list={filter(uploaded)} />
          </>
        )}

        <h3 className="a-label mt-5">Loyihadagi rasmlar</h3>
        <Grid list={filter(bundled)} />
      </div>
    </div>
  );
}
