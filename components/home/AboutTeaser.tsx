"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import { EASE_OUT_EXPO } from "@/lib/design/motion";

const TAGS = [
  "Next.js",
  "TypeScript",
  "Figma",
  "Photoshop",
  "Prisma",
  "grammY",
  "Three.js",
  "Tailwind",
];

export default function AboutTeaser() {
  const t = useTranslations("aboutTeaser");
  const [imgOk, setImgOk] = useState(true);

  /* Parallax tilt effect */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 120,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <section className="section-gap relative overflow-hidden border-t border-line">
      {/* Fon dekoratsiya — devor uchi katta soyali serif harfi */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/4 select-none font-editorial text-[24rem] italic leading-none text-line-warm opacity-30"
      >
        I
      </div>

      <div className="container-wide relative">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          {/* Chap: portret — tilt parallax + iliq ramka */}
          <Reveal className="relative order-2 md:order-1">
            <motion.div
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                const r = el.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
              }}
              onMouseLeave={() => {
                mx.set(0);
                my.set(0);
              }}
              style={{
                rotateX: rx,
                rotateY: ry,
                transformStyle: "preserve-3d",
                transformPerspective: 800,
              }}
              className="relative aspect-[4/5] max-w-md overflow-hidden rounded-2xl border border-line bg-surface"
            >
              {imgOk ? (
                <Image
                  src="/media/personal/islombek.jpg"
                  alt="Islombek — MONTRAX"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface via-surface-2 to-bg">
                  <span className="font-editorial text-9xl italic text-line">
                    I
                  </span>
                </div>
              )}

              {/* Portret ustidagi grid — vinyette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(6,8,9,0.6) 100%)",
                }}
              />

              {/* Editorial angle label */}
              <div className="absolute left-4 top-4 rounded-full border border-accent/50 bg-bg/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
                <span className="mr-2">●</span>2026
              </div>
            </motion.div>

            {/* Overlapping metadata card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT_EXPO }}
              className="absolute -bottom-4 -right-4 rounded-xl border border-line bg-bg/90 px-5 py-3 backdrop-blur"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Based in
              </div>
              <div className="mt-1 font-display text-lg">
                Namangan, <span className="font-editorial italic text-olive">UZ</span>
              </div>
            </motion.div>
          </Reveal>

          {/* O'ng: editorial matn + tag cloud */}
          <div className="order-1 md:order-2">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
                <span className="text-accent">◆</span>
                {t("kicker")}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-display text-4xl leading-tight md:text-5xl">
                {t("text")}
              </p>
            </Reveal>

            {/* Tools chip cloud — animated */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.3 },
                },
              }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, y: 12, scale: 0.92 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: EASE_OUT_EXPO },
                    },
                  }}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-dim transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <Reveal delay={0.4}>
              <Link
                href="/about"
                data-cursor
                className="group mt-10 inline-flex items-center gap-3 text-sm text-ink"
              >
                <span className="link-accent">{t("cta")}</span>
                <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
