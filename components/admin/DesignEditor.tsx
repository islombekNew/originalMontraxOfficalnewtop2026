"use client";

import { useRef, useState } from "react";
import type { DesignItem } from "@/lib/cms/types";
import { useDocEditor } from "./useDocEditor";
import { uploadFile } from "./MediaPicker";
import SaveBar from "./SaveBar";
import ImageField from "./ImageField";

export default function DesignEditor({ initial }: { initial: DesignItem[] }) {
  const { value, setValue, dirty, saving, error, savedAt, save, reset } =
    useDocEditor<DesignItem[]>("design", initial);
  const [uploading, setUploading] = useState(false);
  const [upError, setUpError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const patch = (id: string, p: Partial<DesignItem>) =>
    setValue((l) => l.map((d) => (d.id === id ? { ...d, ...p } : d)));

  const move = (id: string, dir: -1 | 1) =>
    setValue((l) => {
      const s = [...l].sort((a, b) => a.order - b.order);
      const i = s.findIndex((d) => d.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= s.length) return l;
      [s[i], s[j]] = [s[j], s[i]];
      return s.map((d, k) => ({ ...d, order: k }));
    });

  const remove = (id: string) => {
    if (!confirm("Bu rasm galereyadan olib tashlanadi. Davom etamizmi?")) return;
    setValue((l) => l.filter((d) => d.id !== id));
  };

  const addBlank = () =>
    setValue((l) => [
      ...l,
      {
        id: `design-${Date.now().toString(36)}`,
        src: "",
        alt: "",
        category: "Dizayn",
        w: 1200,
        h: 1200,
        order: l.length,
        visible: true,
      },
    ]);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setUpError("");
    try {
      const added: DesignItem[] = [];
      for (const file of Array.from(files)) {
        const r = await uploadFile(file);
        added.push({
          id: `design-${Date.now().toString(36)}-${added.length}`,
          src: r.url,
          alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          category: "Dizayn",
          w: r.w || 1200,
          h: r.h || 1200,
          order: 0,
          visible: true,
        });
      }
      setValue((l) => [...l, ...added].map((d, k) => ({ ...d, order: k })));
    } catch (e) {
      setUpError(e instanceof Error ? e.message : "Yuklashda xato");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const sorted = [...value].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          className="a-btn a-btn-primary"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Yuklanmoqda…" : "+ Rasm yuklash"}
        </button>
        <button className="a-btn" onClick={addBlank}>
          Bo'sh qator qo'shish
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        {upError && <span className="text-sm text-a-danger">{upError}</span>}
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((d, i) => (
          <div key={d.id} className="a-card p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="grid gap-4 md:grid-cols-2">
                <ImageField
                  label={`${i + 1}-rasm`}
                  value={d.src}
                  onChange={(r) =>
                    patch(d.id, {
                      src: r.url,
                      ...(r.w ? { w: r.w } : {}),
                      ...(r.h ? { h: r.h } : {}),
                    })
                  }
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="a-label">Tavsif (alt matn)</label>
                    <input
                      className="a-input"
                      value={d.alt}
                      onChange={(e) => patch(d.id, { alt: e.target.value })}
                      placeholder="Nima aks etgan — Google uchun ham muhim"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="a-label">Turkum</label>
                      <input
                        className="a-input"
                        value={d.category}
                        onChange={(e) =>
                          patch(d.id, { category: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="a-label">Eni (px)</label>
                      <input
                        className="a-input"
                        type="number"
                        value={d.w}
                        onChange={(e) =>
                          patch(d.id, { w: Number(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div>
                      <label className="a-label">Bo'yi (px)</label>
                      <input
                        className="a-input"
                        type="number"
                        value={d.h}
                        onChange={(e) =>
                          patch(d.id, { h: Number(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-start gap-1 md:flex-col">
                <button
                  className="a-btn a-btn-sm"
                  onClick={() => move(d.id, -1)}
                  disabled={i === 0}
                >
                  ↑
                </button>
                <button
                  className="a-btn a-btn-sm"
                  onClick={() => move(d.id, 1)}
                  disabled={i === sorted.length - 1}
                >
                  ↓
                </button>
                <button
                  className="a-btn a-btn-sm a-btn-danger"
                  onClick={() => remove(d.id)}
                >
                  ✕
                </button>
              </div>
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="a-check"
                checked={d.visible !== false}
                onChange={(e) => patch(d.id, { visible: e.target.checked })}
              />
              Saytda ko'rsatilsin
            </label>
          </div>
        ))}

        {sorted.length === 0 && (
          <p className="text-sm text-a-muted">Galereya bo'sh.</p>
        )}
      </div>

      <SaveBar
        dirty={dirty}
        saving={saving}
        error={error}
        savedAt={savedAt}
        onSave={save}
        onReset={reset}
      />
    </>
  );
}
