"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import type { DesignWork } from "@/lib/work-types";
import { EASE_OUT_EXPO } from "@/lib/design/motion";

/** Grafik ishlar — scroll-linked horizontal drift.
 *  Sahifa scroll'ga bog'liq: pastga siljisa strip chapga suriladi. */
export default function DesignStrip({ works }: { works: DesignWork[] }) {
  const t = useTranslations("designStrip");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], ["5%", "-45%"]);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.4 });

  return (
    <section
      ref={ref}
      className="section-gap relative overflow-hidden border-t border-line"
    >
      <div className="container-wide mb-12">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          sub={t("sub")}
          serifWord={t("serifWord")}
          variant="serifWord"
        />
      </div>

      {/* Scroll-linked horizontal drift */}
      <motion.div
        style={{ x }}
        className="flex gap-6 px-5 will-change-transform"
      >
        {works.concat(works).map((w, idx) => (
          <motion.figure
            key={`${w.src}-${idx}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.8,
              ease: EASE_OUT_EXPO,
              delay: (idx % works.length) * 0.05,
            }}
            className="group glow-ring relative w-72 shrink-0 overflow-hidden rounded-xl border border-line bg-surface md:w-[26rem]"
            data-cursor="view"
          >
            <div
              className="relative"
              style={{ aspectRatio: `${w.w} / ${w.h}` }}
            >
              <Image
                src={w.src}
                alt={w.alt}
                fill
                sizes="(max-width: 768px) 288px, 416px"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />

              {/* Hover wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Bottom bar — hover'da chiqadi */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-bg/95 p-4 backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {w.category}
                  </div>
                  <div className="mt-1 text-sm text-ink">{w.alt}</div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.figure>
        ))}
      </motion.div>

      {/* Instruction chip */}
      <div className="container-wide mt-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="text-accent">◆</span> {t("scrollHint")}
        </p>
      </div>
    </section>
  );
}
