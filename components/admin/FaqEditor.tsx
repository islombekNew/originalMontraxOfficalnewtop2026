"use client";

import type { FaqItem } from "@/lib/cms/types";
import { useDocEditor } from "./useDocEditor";
import SaveBar from "./SaveBar";

export default function FaqEditor({ initial }: { initial: FaqItem[] }) {
  const { value, setValue, dirty, saving, error, savedAt, save, reset } =
    useDocEditor<FaqItem[]>("faq", initial);

  const patch = (id: string, p: Partial<FaqItem>) =>
    setValue((l) => l.map((f) => (f.id === id ? { ...f, ...p } : f)));

  const move = (id: string, dir: -1 | 1) =>
    setValue((l) => {
      const s = [...l];
      const i = s.findIndex((f) => f.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= s.length) return l;
      [s[i], s[j]] = [s[j], s[i]];
      return s;
    });

  const add = () =>
    setValue((l) => [
      ...l,
      {
        id: `faq-${Date.now().toString(36)}`,
        uzQ: "Yangi savol?",
        uzA: "",
        enQ: "New question?",
        enA: "",
        visible: true,
      },
    ]);

  const remove = (id: string) => {
    if (!confirm("Bu savol o'chiriladi. Davom etamizmi?")) return;
    setValue((l) => l.filter((f) => f.id !== id));
  };

  return (
    <>
      <div className="mb-4">
        <button className="a-btn a-btn-primary" onClick={add}>
          + Savol qo'shish
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {value.map((f, i) => (
          <div key={f.id} className="a-card p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-a-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                <button
                  className="a-btn a-btn-sm"
                  onClick={() => move(f.id, -1)}
                  disabled={i === 0}
                >
                  ↑
                </button>
                <button
                  className="a-btn a-btn-sm"
                  onClick={() => move(f.id, 1)}
                  disabled={i === value.length - 1}
                >
                  ↓
                </button>
                <button
                  className="a-btn a-btn-sm a-btn-danger"
                  onClick={() => remove(f.id)}
                >
                  O'chirish
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="a-label">Savol — o'zbekcha</label>
                  <input
                    className="a-input"
                    value={f.uzQ}
                    onChange={(e) => patch(f.id, { uzQ: e.target.value })}
                  />
                </div>
                <div>
                  <label className="a-label">Javob — o'zbekcha</label>
                  <textarea
                    className="a-textarea"
                    rows={4}
                    value={f.uzA}
                    onChange={(e) => patch(f.id, { uzA: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="a-label">Savol — inglizcha</label>
                  <input
                    className="a-input"
                    value={f.enQ}
                    onChange={(e) => patch(f.id, { enQ: e.target.value })}
                  />
                </div>
                <div>
                  <label className="a-label">Javob — inglizcha</label>
                  <textarea
                    className="a-textarea"
                    rows={4}
                    value={f.enA}
                    onChange={(e) => patch(f.id, { enA: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="a-check"
                checked={f.visible !== false}
                onChange={(e) => patch(f.id, { visible: e.target.checked })}
              />
              Saytda ko'rsatilsin
            </label>
          </div>
        ))}

        {value.length === 0 && (
          <p className="text-sm text-a-muted">Savollar yo'q.</p>
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
