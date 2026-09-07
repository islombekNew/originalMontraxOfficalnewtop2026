"use client";

import type { SettingsDoc, SocialLink } from "@/lib/cms/types";
import { useDocEditor } from "./useDocEditor";
import SaveBar from "./SaveBar";
import ImageField from "./ImageField";

export default function SettingsEditor({ initial }: { initial: SettingsDoc }) {
  const { value, setValue, dirty, saving, error, savedAt, save, reset } =
    useDocEditor<SettingsDoc>("settings", initial);

  const patch = (p: Partial<SettingsDoc>) => setValue((v) => ({ ...v, ...p }));

  const patchSocial = (id: string, p: Partial<SocialLink>) =>
    patch({ social: value.social.map((s) => (s.id === id ? { ...s, ...p } : s)) });

  const moveSocial = (id: string, dir: -1 | 1) => {
    const s = [...value.social];
    const i = s.findIndex((x) => x.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= s.length) return;
    [s[i], s[j]] = [s[j], s[i]];
    patch({ social: s });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Telegram */}
        <section className="a-card p-5">
          <h2 className="mb-1 font-semibold">Asosiy aloqa</h2>
          <p className="mb-4 text-sm text-a-muted">
            Bu havola bosh sahifadagi tugmalarda, suzuvchi tugmada va aloqa
            sahifasida ishlatiladi.
          </p>
          <label className="a-label">Telegram havolasi</label>
          <input
            className="a-input"
            value={value.telegramUrl}
            onChange={(e) => patch({ telegramUrl: e.target.value })}
            placeholder="https://t.me/foydalanuvchi"
          />
        </section>

        {/* Ijtimoiy tarmoqlar */}
        <section className="a-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Ijtimoiy tarmoqlar</h2>
              <p className="text-sm text-a-muted">
                Footer va aloqa sahifasida chiqadi.
              </p>
            </div>
            <button
              className="a-btn a-btn-sm"
              onClick={() =>
                patch({
                  social: [
                    ...value.social,
                    {
                      id: `s-${Date.now().toString(36)}`,
                      label: "Yangi havola",
                      href: "https://",
                      visible: true,
                    },
                  ],
                })
              }
            >
              + Qo'shish
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {value.social.map((s, i) => (
              <div
                key={s.id}
                className="grid gap-2 md:grid-cols-[180px_1fr_auto] md:items-center"
              >
                <input
                  className="a-input"
                  value={s.label}
                  onChange={(e) => patchSocial(s.id, { label: e.target.value })}
                  placeholder="Nomi"
                />
                <input
                  className="a-input font-mono text-xs"
                  value={s.href}
                  onChange={(e) => patchSocial(s.id, { href: e.target.value })}
                  placeholder="https://"
                />
                <div className="flex items-center gap-1">
                  <label className="a-chip cursor-pointer">
                    <input
                      type="checkbox"
                      className="a-check !h-3.5 !w-3.5"
                      checked={s.visible !== false}
                      onChange={(e) =>
                        patchSocial(s.id, { visible: e.target.checked })
                      }
                    />
                    ko'rinsin
                  </label>
                  <button
                    className="a-btn a-btn-sm"
                    onClick={() => moveSocial(s.id, -1)}
                    disabled={i === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="a-btn a-btn-sm"
                    onClick={() => moveSocial(s.id, 1)}
                    disabled={i === value.social.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    className="a-btn a-btn-sm a-btn-danger"
                    onClick={() =>
                      patch({
                        social: value.social.filter((x) => x.id !== s.id),
                      })
                    }
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rasmlar */}
        <section className="a-card flex flex-col gap-5 p-5">
          <h2 className="font-semibold">Rasmlar</h2>
          <ImageField
            label="«Men haqimda» sahifasidagi surat"
            value={value.aboutPhoto}
            onChange={(r) => patch({ aboutPhoto: r.url })}
            hint="Vertikal 4:5 nisbat eng chiroyli chiqadi. Bo'sh bo'lsa «I» harfi ko'rinadi."
          />
          <ImageField
            label="Footer'dagi logo belgisi"
            value={value.brandLogo}
            onChange={(r) => patch({ brandLogo: r.url })}
          />
          <ImageField
            label="Ijtimoiy tarmoqlarda ulashish rasmi (OG image)"
            value={value.ogImage}
            onChange={(r) => patch({ ogImage: r.url })}
            hint="Telegram yoki Facebook'da havola ulashilganda ko'rinadi. 1200×630 px."
          />
        </section>

        {/* Tools */}
        <section className="a-card p-5">
          <h2 className="mb-1 font-semibold">Tools ro'yxati</h2>
          <p className="mb-3 text-sm text-a-muted">
            «Men haqimda» sahifasidagi teglar. Har birini yangi qatorga yozing.
          </p>
          <textarea
            className="a-textarea font-mono text-xs"
            rows={8}
            value={value.aboutTools.join("\n")}
            onChange={(e) =>
              patch({
                aboutTools: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </section>
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
