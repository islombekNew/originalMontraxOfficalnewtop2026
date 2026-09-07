"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useSiteSettings, useSocialLinks } from "@/components/SiteSettings";

export default function Footer() {
  const t = useTranslations("footer");
  const { brandLogo } = useSiteSettings();
  const social = useSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Oversized brand text — pastdan chiqadi */}
      <div className="container-wide relative pt-20 pb-6">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex select-none items-center gap-3 whitespace-nowrap font-display text-[clamp(2.4rem,12vw,13rem)] font-semibold leading-none tracking-tighter md:gap-6"
        >
          {brandLogo && (
            <Image
              src={brandLogo}
              alt=""
              aria-hidden
              width={512}
              height={512}
              className="h-[0.62em] w-[0.62em] shrink-0 opacity-90"
            />
          )}
          <span>
            MONTRAX
            <span className="font-editorial italic text-accent">.</span>
          </span>
        </motion.h2>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Tagline + status */}
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-dim">
              {t("tagline")}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {t("status")}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {t("navHeading")}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/work", label: t("linkWork") },
                { href: "/about", label: t("linkAbout") },
                { href: "/services", label: t("linkServices") },
                { href: "/contact", label: t("linkContact") },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor
                    className="link-accent text-ink-dim"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {t("socialHeading")}
            </h3>
            <ul className="space-y-2 text-sm">
              {social.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="link-accent text-ink-dim"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {t("metaHeading")}
            </h3>
            <div className="space-y-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              <div>{t("locationLine")}</div>
              <div>{t("timezoneLine")}</div>
              <div>© {year} MONTRAX</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
          <p>{t("rights")}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor
            className="link-accent flex items-center gap-2 text-ink-dim"
          >
            {t("backToTop")}
            <span className="inline-block">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
