"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import { Link } from "@/i18n/navigation";
import { TELEGRAM_URL } from "@/lib/nav-data";
import { EASE_OUT_EXPO } from "@/lib/design/motion";

/** MONTRAX Hero v3 — editorial cover story tuzilishi.
 *  Chap: sarlavha + copy + CTA. O'ng: portret + meta. WebGL yo'q — o'rniga
 *  scroll'ga parallax bog'langan katta serif "M" harfi va nozik grid. */
export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const stats = [
    { value: t("stat1value"), label: t("stat1label") },
    { value: t("stat2value"), label: t("stat2label") },
    { value: t("stat3value"), label: t("stat3label") },
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Ultra-katta serif "M" — parallax fon dekori */}
      <motion.div
        aria-hidden
        style={{ y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute -bottom-32 -left-16 select-none font-editorial text-[45vw] italic leading-none text-line-warm md:-bottom-40 md:text-[38vw]"
      >
        M
      </motion.div>

      {/* Nozik grid dekori — o'ng-yuqori */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-30"
        style={{
          maskImage:
            "radial-gradient(ellipse 40% 50% at 90% 20%, black, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 40% 50% at 90% 20%, black, transparent 60%)",
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M48 0H0V48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-line"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Corner meta */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="container-wide relative z-10 mb-12 hidden items-start justify-between text-[11px] uppercase tracking-widest text-muted md:flex"
      >
        <div className="font-mono">
          <span className="mr-2 inline-flex items-center gap-2">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
            </span>
            {t("cornerStatus")}
          </span>
        </div>
        <div className="font-mono">
          {t("cornerLocation")} — 41.0°N 71.6°E
        </div>
      </motion.div>

      <div className="container-wide relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-16">
          {/* CHAP — sarlavha va copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE_OUT_EXPO }}
              className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-ink-dim"
            >
              <span className="font-mono text-accent">(01)</span>
              <span className="h-px w-12 bg-line-warm" />
              <span>{t("kicker")}</span>
            </motion.div>

            <h1 className="font-display text-hero">
              <SplitText text={t("line1")} className="block" delay={0.1} />
              <span className="block">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.75,
                    duration: 0.9,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="font-editorial italic text-accent"
                >
                  {t("line2Prefix")}
                </motion.span>{" "}
                <SplitText text={t("line2")} className="inline-block" delay={0.95} />
              </span>
            </h1>

            <motion.p
              className="text-lead mt-10 max-w-xl text-ink-dim"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 0.9, ease: EASE_OUT_EXPO }}
            >
              {t("sub")}
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
            >
              <MagneticButton
                as="a"
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-paper"
                data-cursor
              >
                <span className="relative z-10">{t("ctaPrimary")}</span>
                <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </MagneticButton>

              <Link
                href="/work"
                data-cursor
                className="group link-accent inline-flex items-center gap-2 px-2 py-4 text-sm text-ink"
              >
                <span>{t("ctaSecondary")}</span>
                <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>

            {/* Halol stats — kichik, editorial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.7 }}
              className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-line-warm pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-editorial text-3xl italic leading-none text-accent">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* O'NG — portret, meta, kichik detallar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.1, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            <motion.div
              style={{ y: photoY }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line-warm bg-surface"
            >
              <Image
                src="/media/personal/islombek.jpg"
                alt="Islombek — MONTRAX"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />

              {/* Editorial angle label */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-paper/30 bg-ink/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper backdrop-blur">
                <span className="text-accent-soft">●</span>
                <span>2026 · Portret</span>
              </div>
            </motion.div>

            {/* Overlapping caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: EASE_OUT_EXPO }}
              className="absolute -bottom-6 -left-6 max-w-[240px] rounded-xl border border-line bg-paper px-5 py-4 shadow-lg"
              style={{
                boxShadow:
                  "0 30px 60px -30px color-mix(in srgb, var(--ink) 25%, transparent)",
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Studio
              </div>
              <div className="mt-1 font-display text-base text-ink">
                MONTRAX ·{" "}
                <span className="font-editorial italic text-accent">solo</span>
              </div>
              <div className="mt-1 text-[11px] text-ink-dim">
                Namangan · UZ · GMT+5
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — pastda nozik */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {t("scrollHint")}
          </span>
          <motion.span
            className="block h-10 w-px origin-top bg-gradient-to-b from-accent to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
