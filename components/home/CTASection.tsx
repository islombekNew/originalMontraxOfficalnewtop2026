"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { useSiteSettings } from "@/components/SiteSettings";

/** Yakuniy CTA — editorial, dramatic. Marquee o'rniga scroll-linked oversized text. */
export default function CTASection() {
  const t = useTranslations("cta");
  const { telegramUrl } = useSiteSettings();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section
      ref={ref}
      className="section-gap relative overflow-hidden border-t border-line"
    >
      {/* Katta scroll-linked serifli fon so'z */}
      <motion.div
        aria-hidden
        style={{ x }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-editorial text-[clamp(6rem,20vw,20rem)] italic leading-none text-line-warm opacity-60"
      >
        {t("bgWord")}
      </motion.div>

      <div className="container-wide relative text-center">
        <Reveal>
          <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ink-dim">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("kicker")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto max-w-4xl font-display text-hero">
            {t("titlePrefix")}{" "}
            <span className="font-editorial italic text-olive">
              {t("titleAccent")}
            </span>
            <span className="text-accent">?</span>
          </h2>
        </Reveal>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="text-lead mx-auto mt-8 max-w-xl text-ink-dim"
        >
          {t("sub")}
        </motion.p>

        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as="a"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-10 py-5 text-base font-medium text-paper"
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="relative z-10">{t("button")}</span>
              <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>

            <Link
              href="/contact"
              data-cursor
              className="group link-accent inline-flex items-center gap-2 px-4 py-4 text-sm text-ink-dim"
            >
              <span>{t("formLink")}</span>
              <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Pastda — vaqt zonasi va qisqa manzil bilan editorial detail */}
        <motion.div
          style={{ y }}
          className="mt-24 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted"
        >
          <span>◆ {t("footNote1")}</span>
          <span className="hidden md:inline">/</span>
          <span>◆ {t("footNote2")}</span>
          <span className="hidden md:inline">/</span>
          <span>◆ {t("footNote3")}</span>
        </motion.div>
      </div>
    </section>
  );
}
