"use client";

import { useMemo, useState } from "react";
import type { MessagesDoc } from "@/lib/cms/types";
import { isHiddenKey, labelFor, nsLabel } from "@/lib/cms/labels";
import SaveBar from "./SaveBar";

type Leaf = { path: string[]; sub: string; label: string };

function collectLeaves(obj: unknown, prefix: string[] = []): string[][] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    typeof v === "object" && v !== null && !Array.isArray(v)
      ? collectLeaves(v, [...prefix, k])
      : [[...prefix, k]]
  );
}

function getAt(obj: unknown, path: string[]): string {
  let cur: unknown = obj;
  for (const p of path) {
    if (typeof cur !== "object" || cur === null) return "";
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : "";
}

function setAt<T extends object>(obj: T, path: string[], value: string): T {
  const [head, ...rest] = path;
  const src = obj as Record<string, unknown>;
  if (!rest.length) return { ...src, [head]: value } as T;
  const child = (src[head] ?? {}) as object;
  return { ...src, [head]: setAt(child, rest, value) } as T;
}

export default function TextsEditor({
  initialUz,
  initialEn,
}: {
  initialUz: MessagesDoc;
  initialEn: MessagesDoc;
}) {
  const [uz, setUz] = useState<MessagesDoc>(initialUz);
  const [en, setEn] = useState<MessagesDoc>(initialEn);
  const [q, setQ] = useState("");
  const [openNs, setOpenNs] = useState<string | null>(
    Object.keys(initialUz)[0] ?? null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [baseline, setBaseline] = useState(() =>
    JSON.stringify({ uz: initialUz, en: initialEn })
  );

  const dirty = JSON.stringify({ uz, en }) !== baseline;

  // Bo'lim → tahrirlanadigan kalitlar
  const groups = useMemo(() => {
    return Object.keys(initialUz).map((ns) => {
      const leaves: Leaf[] = collectLeaves(initialUz[ns])
        .filter((p) => !isHiddenKey(ns, p[0]))
        .map((p) => {
          const sub = p.join(".");
          return { path: [ns, ...p], sub, label: labelFor(ns, sub) };
        });
      return { ns, ...nsLabel(ns), leaves };
    });
  }, [initialUz]);

  const filtered = useMemo(() => {
    if (!q.trim()) return groups;
    const needle = q.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        leaves: g.leaves.filter(
          (l) =>
            l.label.toLowerCase().includes(needle) ||
            l.sub.toLowerCase().includes(needle) ||
            getAt(uz, l.path).toLowerCase().includes(needle) ||
            getAt(en, l.path).toLowerCase().includes(needle)
        ),
      }))
      .filter((g) => g.leaves.length > 0);
  }, [groups, q, uz, en]);

  async function save() {
    setSaving(true);
    setError("");
    try {
      for (const [key, value] of [
        ["messages:uz", uz],
        ["messages:en", en],
      ] as const) {
        const res = await fetch("/api/admin/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error ?? "Saqlashda xato");
          return;
        }
      }
      setBaseline(JSON.stringify({ uz, en }));
      setSavedAt(new Date().toLocaleTimeString("uz-UZ"));
    } catch {
      setError("Tarmoq xatosi — saqlanmadi");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    const b = JSON.parse(baseline) as { uz: MessagesDoc; en: MessagesDoc };
    setUz(b.uz);
    setEn(b.en);
    setError("");
  }

  const searching = q.trim().length > 0;

  return (
    <>
      <div className="mb-5">
        <input
          className="a-input md:max-w-md"
          placeholder="Matn yoki maydon nomi bo'yicha qidirish…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((g) => {
          const open = searching || openNs === g.ns;
          return (
            <section key={g.ns} className="a-card overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                onClick={() => setOpenNs(open && !searching ? null : g.ns)}
              >
                <span>
                  <span className="font-semibold">{g.title}</span>
                  {g.hint && (
                    <span className="ml-2 text-xs text-a-muted">{g.hint}</span>
                  )}
                </span>
                <span className="shrink-0 text-xs text-a-muted">
                  {g.leaves.length} ta maydon {open ? "▲" : "▼"}
                </span>
              </button>

              {open && (
                <div className="border-t border-a-line px-5 py-4">
                  <div className="mb-2 hidden gap-4 md:grid md:grid-cols-[220px_1fr_1fr]">
                    <span className="a-label !mb-0">Maydon</span>
                    <span className="a-label !mb-0">O'zbekcha</span>
                    <span className="a-label !mb-0">Inglizcha</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {g.leaves.map((l) => {
                      const uzV = getAt(uz, l.path);
                      const enV = getAt(en, l.path);
                      const long = uzV.length > 80 || enV.length > 80;
                      const Tag = long ? "textarea" : "input";
                      return (
                        <div
                          key={l.sub}
                          className="grid gap-2 md:grid-cols-[220px_1fr_1fr] md:items-start md:gap-4"
                        >
                          <div className="pt-1.5">
                            <div className="text-sm font-medium">{l.label}</div>
                            <div className="font-mono text-[10px] text-a-muted">
                              {g.ns}.{l.sub}
                            </div>
                          </div>
                          <Tag
                            className={long ? "a-textarea" : "a-input"}
                            rows={long ? 3 : undefined}
                            value={uzV}
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                              >
                            ) => setUz((p) => setAt(p, l.path, e.target.value))}
                          />
                          <Tag
                            className={long ? "a-textarea" : "a-input"}
                            rows={long ? 3 : undefined}
                            value={enV}
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                              >
                            ) => setEn((p) => setAt(p, l.path, e.target.value))}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-a-muted">Hech narsa topilmadi.</p>
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
