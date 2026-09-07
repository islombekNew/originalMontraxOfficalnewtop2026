import Link from "next/link";
import { cmsStatus } from "@/lib/cms/store";
import { getWorkItems, getDesignItems, getPricing, getFaq } from "@/lib/cms/read";
import PageHead from "@/components/admin/PageHead";
import SeedButton from "@/components/admin/SeedButton";

export const dynamic = "force-dynamic";

const CARDS = [
  { href: "/admin/texts", title: "Matnlar", desc: "Saytdagi har bir so'z — sarlavha, tavsif, tugma yozuvi. O'zbekcha va inglizcha." },
  { href: "/admin/work", title: "Ishlar", desc: "Loyiha qo'shish, tahrirlash, o'chirish, tartibini o'zgartirish." },
  { href: "/admin/design", title: "Dizayn galereya", desc: "Bosh sahifadagi grafik ishlar: rasm yuklash, tartib, yashirish." },
  { href: "/admin/pricing", title: "Narx-menyu", desc: "Kategoriya va xizmat narxlari — qo'shish va o'zgartirish." },
  { href: "/admin/faq", title: "Savol-javob", desc: "Xizmatlar sahifasidagi savollar." },
  { href: "/admin/sections", title: "Bosh sahifa bo'limlari", desc: "Bo'limni yashirish yoki tartibini o'zgartirish." },
  { href: "/admin/settings", title: "Havolalar & sozlama", desc: "Telegram, ijtimoiy tarmoqlar, tools ro'yxati, rasmlar." },
  { href: "/admin/media", title: "Rasmlar kutubxonasi", desc: "Rasm yuklash va o'chirish." },
];

export default async function AdminHome() {
  const [status, work, design, pricing, faq] = await Promise.all([
    cmsStatus(),
    getWorkItems(),
    getDesignItems(),
    getPricing(),
    getFaq(),
  ]);

  const ok = status.driver === "supabase" && status.tableReady;

  return (
    <>
      <PageHead
        title="Boshqaruv paneli"
        hint="Saytdagi hamma narsani shu yerdan o'zgartirasiz. O'zgarish saqlangach sayt darhol yangilanadi."
      />

      {/* Ulanish holati */}
      <div className="a-card mb-6 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: ok ? "var(--a-ok)" : "var(--a-accent)" }}
          />
          <b className="text-sm">
            {ok
              ? "Supabase ulangan — o'zgarishlar jonli saytda saqlanadi"
              : status.driver === "fs"
              ? "Lokal rejim — o'zgarishlar shu kompyuterdagi fayllarga yoziladi"
              : "Supabase ulangan, lekin sozlash tugallanmagan"}
          </b>
        </div>

        {status.message && (
          <p className="mt-2 text-sm text-a-dim">{status.message}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Flag ok={status.urlSet} label="SUPABASE_URL" />
          <Flag ok={status.anonSet} label="SUPABASE_ANON_KEY" />
          <Flag ok={status.serviceSet} label="SUPABASE_SERVICE_ROLE_KEY" />
          <Flag ok={status.tableReady} label="cms_docs jadvali" />
          <Flag ok={status.bucketReady} label="media bucket" />
        </div>

        {!ok && (
          <div className="mt-4 rounded-lg border border-a-line bg-a-panel-2 p-4 text-sm leading-relaxed text-a-dim">
            <b>Jonli saytda ishlashi uchun:</b>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>
                <a
                  className="text-a-accent underline"
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                >
                  supabase.com
                </a>
                &nbsp;da yangi loyiha oching (bepul).
              </li>
              <li>
                SQL Editor'ga <code>supabase/schema.sql</code> faylini
                nusxalab «Run» bosing.
              </li>
              <li>
                Settings → API dan <code>URL</code>, <code>anon</code> va{" "}
                <code>service_role</code> kalitlarini oling.
              </li>
              <li>
                Ularni <code>.env</code> (lokal) va Vercel → Settings →
                Environment Variables ga qo'ying.
              </li>
              <li>
                Shu yerga qaytib «Boshlang'ich ma'lumotni yuklash» tugmasini
                bosing.
              </li>
            </ol>
            <p className="mt-3">
              To'liq yo'riqnoma: <code>ADMIN.md</code> faylida.
            </p>
          </div>
        )}

        {status.tableReady && <SeedButton />}
      </div>

      {/* Raqamlar */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat n={work.length} label="loyiha" />
        <Stat n={design.length} label="dizayn rasm" />
        <Stat n={pricing.reduce((s, c) => s + c.items.length, 0)} label="narx qatori" />
        <Stat n={faq.length} label="savol-javob" />
      </div>

      {/* Bo'limlar */}
      <div className="grid gap-3 md:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="a-card block p-5 transition-colors hover:border-a-accent"
          >
            <div className="font-semibold">{c.title}</div>
            <p className="mt-1 text-sm leading-relaxed text-a-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

function Flag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className="a-chip"
      style={{ color: ok ? "var(--a-ok)" : "var(--a-muted)" }}
    >
      {ok ? "✓" : "✕"} {label}
    </span>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="a-card p-4">
      <div className="text-2xl font-semibold">{n}</div>
      <div className="text-xs uppercase tracking-wider text-a-muted">{label}</div>
    </div>
  );
}
