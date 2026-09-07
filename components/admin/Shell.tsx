"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Boshqaruv", icon: "◈" },
  { href: "/admin/texts", label: "Matnlar", icon: "¶" },
  { href: "/admin/work", label: "Ishlar", icon: "▣" },
  { href: "/admin/design", label: "Dizayn galereya", icon: "▦" },
  { href: "/admin/pricing", label: "Narx-menyu", icon: "₴" },
  { href: "/admin/faq", label: "Savol-javob", icon: "?" },
  { href: "/admin/sections", label: "Bosh sahifa bo'limlari", icon: "≡" },
  { href: "/admin/settings", label: "Havolalar & sozlama", icon: "⚙" },
  { href: "/admin/media", label: "Rasmlar kutubxonasi", icon: "◫" },
];

export default function Shell({
  children,
  driver,
}: {
  children: React.ReactNode;
  driver: "supabase" | "fs";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobil sarlavha */}
      <div className="flex items-center justify-between border-b border-a-line bg-a-panel px-4 py-3 md:hidden">
        <span className="text-sm font-semibold tracking-wide">
          MONTRAX <span className="text-a-muted">admin</span>
        </span>
        <button
          className="a-btn a-btn-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Yopish" : "Menyu"}
        </button>
      </div>

      {/* Yon menyu */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } shrink-0 border-b border-a-line bg-a-panel p-3 md:block md:w-60 md:border-b-0 md:border-r`}
      >
        <div className="mb-5 hidden px-2 pt-2 md:block">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-a-accent">
            MONTRAX
          </div>
          <div className="text-sm font-semibold">Boshqaruv paneli</div>
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              data-active={isActive(n.href)}
              className="a-navlink"
              onClick={() => setOpen(false)}
            >
              <span className="w-4 text-center text-a-muted">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 border-t border-a-line px-2 pt-4">
          <div className="mb-3 text-[11px] leading-relaxed text-a-muted">
            Saqlash joyi:{" "}
            <b className={driver === "supabase" ? "text-a-ok" : "text-a-accent"}>
              {driver === "supabase" ? "Supabase" : "lokal fayl"}
            </b>
            {driver === "fs" && (
              <>
                <br />
                Faqat shu kompyuterda saqlanadi.
              </>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="a-btn a-btn-sm w-full"
            >
              Saytni ochish ↗
            </a>
            <button onClick={logout} className="a-btn a-btn-sm w-full">
              Chiqish
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-9">{children}</main>
    </div>
  );
}
