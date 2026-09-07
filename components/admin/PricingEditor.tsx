"use client";

import type { PriceCategory, PriceItem } from "@/lib/cms/types";
import { useDocEditor } from "./useDocEditor";
import SaveBar from "./SaveBar";

const uid = (p: string) => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export default function PricingEditor({
  initial,
  serviceTitles,
}: {
  initial: PriceCategory[];
  serviceTitles: Record<string, string>;
}) {
  const { value, setValue, dirty, saving, error, savedAt, save, reset } =
    useDocEditor<PriceCategory[]>("pricing", initial);

  const patchCat = (id: string, p: Partial<PriceCategory>) =>
    setValue((l) => l.map((c) => (c.id === id ? { ...c, ...p } : c)));

  const patchItem = (catId: string, itemId: string, p: Partial<PriceItem>) =>
    setValue((l) =>
      l.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, ...p } : i)) }
          : c
      )
    );

  const addItem = (catId: string) =>
    setValue((l) =>
      l.map((c) =>
        c.id === catId
          ? {
              ...c,
              items: [
                ...c.items,
                { id: uid("p"), uz: "Yangi xizmat", en: "New service", price: "0" },
              ],
            }
          : c
      )
    );

  const removeItem = (catId: string, itemId: string) =>
    setValue((l) =>
      l.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      )
    );

  const moveItem = (catId: string, itemId: string, dir: -1 | 1) =>
    setValue((l) =>
      l.map((c) => {
        if (c.id !== catId) return c;
        const items = [...c.items];
        const i = items.findIndex((x) => x.id === itemId);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= items.length) return c;
        [items[i], items[j]] = [items[j], items[i]];
        return { ...c, items };
      })
    );

  const moveCat = (id: string, dir: -1 | 1) =>
    setValue((l) => {
      const s = [...l];
      const i = s.findIndex((c) => c.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= s.length) return l;
      [s[i], s[j]] = [s[j], s[i]];
      return s;
    });

  const addCat = () =>
    setValue((l) => [
      ...l,
      {
        id: uid("cat"),
        key: "",
        titleUz: "Yangi kategoriya",
        titleEn: "New category",
        descUz: "",
        descEn: "",
        visible: true,
        items: [],
      },
    ]);

  const removeCat = (id: string, title: string) => {
    if (!confirm(`«${title}» kategoriyasi barcha narxlari bilan o'chiriladi. Davom etamizmi?`))
      return;
    setValue((l) => l.filter((c) => c.id !== id));
  };

  return (
    <>
      <div className="mb-4">
        <button className="a-btn a-btn-primary" onClick={addCat}>
          + Yangi kategoriya
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {value.map((cat, ci) => (
          <div key={cat.id} className="a-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-a-muted">
                  {String(ci + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold">
                  {cat.titleUz || serviceTitles[cat.key] || cat.key || "Nomsiz"}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  className="a-btn a-btn-sm"
                  onClick={() => moveCat(cat.id, -1)}
                  disabled={ci === 0}
                >
                  ↑
                </button>
                <button
                  className="a-btn a-btn-sm"
                  onClick={() => moveCat(cat.id, 1)}
                  disabled={ci === value.length - 1}
                >
                  ↓
                </button>
                <button
                  className="a-btn a-btn-sm a-btn-danger"
                  onClick={() => removeCat(cat.id, cat.titleUz || cat.key)}
                >
                  O'chirish
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="a-label">Nomi — o'zbekcha</label>
                <input
                  className="a-input"
                  value={cat.titleUz ?? ""}
                  onChange={(e) => patchCat(cat.id, { titleUz: e.target.value })}
                  placeholder={serviceTitles[cat.key] ?? ""}
                />
              </div>
              <div>
                <label className="a-label">Nomi — inglizcha</label>
                <input
                  className="a-input"
                  value={cat.titleEn ?? ""}
                  onChange={(e) => patchCat(cat.id, { titleEn: e.target.value })}
                />
              </div>
              <div>
                <label className="a-label">Tavsif — o'zbekcha</label>
                <textarea
                  className="a-textarea"
                  rows={2}
                  value={cat.descUz ?? ""}
                  onChange={(e) => patchCat(cat.id, { descUz: e.target.value })}
                />
              </div>
              <div>
                <label className="a-label">Tavsif — inglizcha</label>
                <textarea
                  className="a-textarea"
                  rows={2}
                  value={cat.descEn ?? ""}
                  onChange={(e) => patchCat(cat.id, { descEn: e.target.value })}
                />
              </div>
            </div>

            {cat.key && (
              <p className="mt-2 text-xs text-a-muted">
                Bo'sh qoldirsangiz «Matnlar → Xizmatlar» bo'limidagi{" "}
                <code>{cat.key}</code> matni ishlatiladi.
              </p>
            )}

            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="a-check"
                checked={cat.visible !== false}
                onChange={(e) => patchCat(cat.id, { visible: e.target.checked })}
              />
              Saytda ko'rsatilsin
            </label>

            {/* Narx qatorlari */}
            <div className="mt-5 border-t border-a-line pt-4">
              <div className="mb-2 hidden gap-2 md:grid md:grid-cols-[1fr_1fr_150px_auto]">
                <span className="a-label !mb-0">Xizmat — o'zbekcha</span>
                <span className="a-label !mb-0">Xizmat — inglizcha</span>
                <span className="a-label !mb-0">Narx</span>
                <span />
              </div>

              <div className="flex flex-col gap-2">
                {cat.items.map((item, ii) => (
                  <div
                    key={item.id}
                    className="grid gap-2 md:grid-cols-[1fr_1fr_150px_auto] md:items-center"
                  >
                    <input
                      className="a-input"
                      value={item.uz}
                      onChange={(e) =>
                        patchItem(cat.id, item.id, { uz: e.target.value })
                      }
                    />
                    <input
                      className="a-input"
                      value={item.en}
                      onChange={(e) =>
                        patchItem(cat.id, item.id, { en: e.target.value })
                      }
                    />
                    <input
                      className="a-input"
                      value={item.price}
                      onChange={(e) =>
                        patchItem(cat.id, item.id, { price: e.target.value })
                      }
                      placeholder="150 000+"
                    />
                    <div className="flex items-center gap-1">
                      <label
                        className="a-chip cursor-pointer"
                        title="Oylik to'lov sifatida ko'rsatilsin"
                      >
                        <input
                          type="checkbox"
                          className="a-check !h-3.5 !w-3.5"
                          checked={Boolean(item.monthly)}
                          onChange={(e) =>
                            patchItem(cat.id, item.id, {
                              monthly: e.target.checked,
                            })
                          }
                        />
                        /oy
                      </label>
                      <label
                        className="a-chip cursor-pointer"
                        title="Narx o'rniga «Loyihaga qarab» yozilsin"
                      >
                        <input
                          type="checkbox"
                          className="a-check !h-3.5 !w-3.5"
                          checked={Boolean(item.custom)}
                          onChange={(e) =>
                            patchItem(cat.id, item.id, {
                              custom: e.target.checked,
                            })
                          }
                        />
                        kelishuv
                      </label>
                      <button
                        className="a-btn a-btn-sm"
                        onClick={() => moveItem(cat.id, item.id, -1)}
                        disabled={ii === 0}
                      >
                        ↑
                      </button>
                      <button
                        className="a-btn a-btn-sm"
                        onClick={() => moveItem(cat.id, item.id, 1)}
                        disabled={ii === cat.items.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        className="a-btn a-btn-sm a-btn-danger"
                        onClick={() => removeItem(cat.id, item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="a-btn a-btn-sm mt-3"
                onClick={() => addItem(cat.id)}
              >
                + Narx qatori qo'shish
              </button>
            </div>
          </div>
        ))}
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
