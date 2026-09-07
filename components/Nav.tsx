"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useSiteSettings } from "@/components/SiteSettings";
import MagneticButton from "@/components/MagneticButton";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/contact", key: "contact" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const { telegramUrl, brandLogo } = useSiteSettings();
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 transition-all duration-500 ${
        scrolled ? "top-3" : "top-6"
      }`}
    >
      <nav className="container-wide">
        <div
          className={`flex h-14 items-center justify-between rounded-full border px-3 pl-6 backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "border-line/70 bg-bg/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
              : "border-line/40 bg-bg/40"
          }`}
        >
          {/* Logo — brend belgisi + wordmark */}
          <Link
            href="/"
            data-cursor
            className="group flex items-center gap-2.5 text-sm font-medium tracking-tight"
          >
            <motion.span
              className="relative flex h-7 w-7 items-center justify-center rounded-md border border-line bg-ink text-paper"
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Belgi mask sifatida chiziladi — rangi badge matn rangidan keladi,
                  shunda to'q fonda ham ko'rinadi (SVG ichidagi rangga bog'liq emas). */}
              <span
                aria-hidden
                className="h-3 w-[0.95rem] bg-current"
                style={{
                  WebkitMaskImage: `url(${brandLogo})`,
                  maskImage: `url(${brandLogo})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </motion.span>
            <span className="font-display font-semibold tracking-tight">
              MONTRAX
            </span>
            <span className="font-editorial italic text-accent">/</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted md:inline">
              Studio
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.key}
                  href={l.href}
                  data-cursor
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "text-ink"
                      : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-line bg-surface"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative">{t(l.key)}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LocaleSwitcher locale={locale} pathname={pathname} />
            <MagneticButton
              as="a"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent md:inline-flex"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {t("cta")}
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="container-wide md:hidden"
          >
            <div className="mt-3 rounded-3xl border border-line bg-bg/90 p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      className="font-display block py-2 text-3xl font-medium"
                    >
                      {t(l.key)}
                    </Link>
                  </motion.div>
                ))}
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-paper"
                >
                  {t("cta")} →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LocaleSwitcher({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line px-2 py-1 font-mono text-[10px]">
      {(["uz", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-line">·</span>}
          <Link
            href={pathname}
            locale={l}
            data-cursor
            className={`uppercase tracking-wider transition-colors ${
              locale === l ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
