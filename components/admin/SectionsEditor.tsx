"use client";

import type { SectionConfig } from "@/lib/cms/types";
import { useDocEditor } from "./useDocEditor";
import SaveBar from "./SaveBar";

export default function SectionsEditor({ initial }: { initial: SectionConfig[] }) {
  const { value, setValue, dirty, saving, error, savedAt, save, reset } =
    useDocEditor<SectionConfig[]>("sections", initial);

  const sorted = [...value].sort((a, b) => a.order - b.order);

  const move = (key: string, dir: -1 | 1) =>
    setValue((l) => {
      const s = [...l].sort((a, b) => a.order - b.order);
      const i = s.findIndex((x) => x.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= s.length) return l;
      [s[i], s[j]] = [s[j], s[i]];
      return s.map((x, k) => ({ ...x, order: k }));
    });

  const toggle = (key: string, visible: boolean) =>
    setValue((l) => l.map((x) => (x.key === key ? { ...x, visible } : x)));

  return (
    <>
      <div className="flex flex-col gap-2">
        {sorted.map((s, i) => (
          <div
            key={s.key}
            className="a-card flex flex-wrap items-center gap-3 px-4 py-3"
          >
            <span className="w-7 text-sm font-semibold text-a-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-medium">{s.labelUz}</span>
              <span className="ml-2 font-mono text-[11px] text-a-muted">
                {s.key}
              </span>
            </span>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="a-check"
                checked={s.visible}
                onChange={(e) => toggle(s.key, e.target.checked)}
                disabled={s.key === "hero"}
              />
              {s.visible ? "Ko'rinadi" : "Yashirin"}
            </label>

            <div className="flex gap-1">
              <button
                className="a-btn a-btn-sm"
                onClick={() => move(s.key, -1)}
                disabled={i === 0 || s.key === "hero"}
              >
                ↑
              </button>
              <button
                className="a-btn a-btn-sm"
                onClick={() => move(s.key, 1)}
                disabled={i === sorted.length - 1 || s.key === "hero"}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-a-muted">
        Hero — bosh ekran o'chirilmaydi va joyi o'zgarmaydi: u saytning birinchi
        ko'rinishi.
      </p>

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
