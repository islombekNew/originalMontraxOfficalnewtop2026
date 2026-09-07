"use client";

import { useState } from "react";
import type { WorkItem } from "@/lib/cms/types";
import { useDocEditor } from "./useDocEditor";
import SaveBar from "./SaveBar";
import ImageField from "./ImageField";

const emptyLocale = { title: "", client: "", year: "", role: "", summary: "", body: "" };

function makeNew(order: number): WorkItem {
  const n = Date.now().toString(36);
  return {
    id: `work-${n}`,
    slug: `yangi-loyiha-${n}`,
    order,
    category: "dev",
    cover: "",
    tools: [],
    published: false,
    uz: { ...emptyLocale, title: "Yangi loyiha" },
    en: { ...emptyLocale, title: "New project" },
  };
}

export default function WorkEditor({ initial }: { initial: WorkItem[] }) {
  const { value, setValue, dirty, saving, error, savedAt, save, reset } =
    useDocEditor<WorkItem[]>("work", initial);
  const [openId, setOpenId] = useState<string | null>(null);

  const patch = (id: string, p: Partial<WorkItem>) =>
    setValue((list) => list.map((w) => (w.id === id ? { ...w, ...p } : w)));

  const patchLocale = (
    id: string,
    loc: "uz" | "en",
    p: Partial<WorkItem["uz"]>
  ) =>
    setValue((list) =>
      list.map((w) => (w.id === id ? { ...w, [loc]: { ...w[loc], ...p } } : w))
    );

  const move = (id: string, dir: -1 | 1) =>
    setValue((list) => {
      const sorted = [...list].sort((a, b) => a.order - b.order);
      const i = sorted.findIndex((w) => w.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= sorted.length) return list;
      [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      return sorted.map((w, k) => ({ ...w, order: k }));
    });

  const remove = (id: string, title: string) => {
    if (!confirm(`«${title}» loyihasi butunlay o'chiriladi. Davom etamizmi?`)) return;
    setValue((list) => list.filter((w) => w.id !== id));
  };

  const add = () =>
    setValue((list) => {
      const item = makeNew(list.length);
      setOpenId(item.id);
      return [...list, item];
    });

  const sorted = [...value].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="mb-4">
        <button className="a-btn a-btn-primary" onClick={add}>
          + Yangi loyiha
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((w, i) => {
          const open = openId === w.id;
          return (
            <div key={w.id} className="a-card overflow-hidden">
              {/* Qator */}
              <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded border border-a-line bg-a-panel-2">
                  {w.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.cover} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>

                <button
                  className="min-w-0 flex-1 text-left"
                  onClick={() => setOpenId(open ? null : w.id)}
                >
                  <div className="truncate font-medium">
                    {w.uz.title || w.slug}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-a-muted">
                    <span className="font-mono">/{w.slug}</span>
                    <span className="a-chip">
                      {w.category === "dev" ? "Tizim" : "Dizayn"}
                    </span>
                    {!w.published && (
                      <span className="a-chip" style={{ color: "var(--a-accent)" }}>
                        Yashirin
                      </span>
                    )}
                  </div>
                </button>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    className="a-btn a-btn-sm"
                    onClick={() => move(w.id, -1)}
                    disabled={i === 0}
                    title="Yuqoriga"
                  >
                    ↑
                  </button>
                  <button
                    className="a-btn a-btn-sm"
                    onClick={() => move(w.id, 1)}
                    disabled={i === sorted.length - 1}
                    title="Pastga"
                  >
                    ↓
                  </button>
                  <button
                    className="a-btn a-btn-sm"
                    onClick={() => setOpenId(open ? null : w.id)}
                  >
                    {open ? "Yopish" : "Tahrirlash"}
                  </button>
                  <button
                    className="a-btn a-btn-sm a-btn-danger"
                    onClick={() => remove(w.id, w.uz.title || w.slug)}
                  >
                    O'chirish
                  </button>
                </div>
              </div>

              {/* Tahrir formasi */}
              {open && (
                <div className="border-t border-a-line px-4 py-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="a-label">Havola manzili (slug)</label>
                      <input
                        className="a-input font-mono text-xs"
                        value={w.slug}
                        onChange={(e) =>
                          patch(w.id, {
                            slug: e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, "-")
                              .replace(/-+/g, "-"),
                          })
                        }
                      />
                      <p className="mt-1 text-xs text-a-muted">
                        Sayt manzili: /work/{w.slug || "…"}
                      </p>
                    </div>

                    <div>
                      <label className="a-label">Turkum</label>
                      <select
                        className="a-select"
                        value={w.category}
                        onChange={(e) =>
                          patch(w.id, {
                            category: e.target.value as "dev" | "design",
                          })
                        }
                      >
                        <option value="dev">Tizimlar &amp; botlar</option>
                        <option value="design">Grafik dizayn</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <ImageField
                        label="Muqova rasmi"
                        value={w.cover}
                        onChange={(r) => patch(w.id, { cover: r.url })}
                        hint="Loyiha kartasi va case study tepasida ko'rinadi. Eng yaxshisi 16:9."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="a-label">
                        Tools — vergul bilan ajrating
                      </label>
                      <input
                        className="a-input"
                        value={w.tools.join(", ")}
                        onChange={(e) =>
                          patch(w.id, {
                            tools: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Next.js, TypeScript, Prisma"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-sm md:col-span-2">
                      <input
                        type="checkbox"
                        className="a-check"
                        checked={w.published}
                        onChange={(e) =>
                          patch(w.id, { published: e.target.checked })
                        }
                      />
                      Saytda ko'rsatilsin
                    </label>
                  </div>

                  {/* Til bo'yicha matnlar */}
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {(["uz", "en"] as const).map((loc) => (
                      <div key={loc}>
                        <h4 className="mb-3 text-sm font-semibold">
                          {loc === "uz" ? "O'zbekcha" : "Inglizcha"}
                        </h4>
                        <div className="flex flex-col gap-3">
                          <Field
                            label="Sarlavha"
                            value={w[loc].title}
                            onChange={(v) => patchLocale(w.id, loc, { title: v })}
                          />
                          <Field
                            label="Klient"
                            value={w[loc].client}
                            onChange={(v) => patchLocale(w.id, loc, { client: v })}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Yil"
                              value={w[loc].year}
                              onChange={(v) => patchLocale(w.id, loc, { year: v })}
                            />
                            <Field
                              label="Rol"
                              value={w[loc].role}
                              onChange={(v) => patchLocale(w.id, loc, { role: v })}
                            />
                          </div>
                          <div>
                            <label className="a-label">Qisqa tavsif</label>
                            <textarea
                              className="a-textarea"
                              rows={3}
                              value={w[loc].summary}
                              onChange={(e) =>
                                patchLocale(w.id, loc, { summary: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="a-label">
                              Case study matni (Markdown)
                            </label>
                            <textarea
                              className="a-textarea font-mono text-xs"
                              rows={14}
                              value={w[loc].body}
                              onChange={(e) =>
                                patchLocale(w.id, loc, { body: e.target.value })
                              }
                              placeholder={"## Muammo\n\nMatn…\n\n- ro'yxat\n- yana bir qator"}
                            />
                            <p className="mt-1 text-xs text-a-muted">
                              ## — sarlavha, **qalin**, - ro'yxat
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {sorted.length === 0 && (
          <p className="text-sm text-a-muted">
            Hozircha loyiha yo'q. «Yangi loyiha» tugmasini bosing.
          </p>
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

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="a-label">{label}</label>
      <input
        className="a-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
