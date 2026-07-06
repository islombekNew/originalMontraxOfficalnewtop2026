"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import type { DesignWork } from "@/lib/work-types";
import { EASE_OUT_EXPO } from "@/lib/design/motion";

/** Grafik ishlar — film-strip: qo'lda sudrab o'tkaziladi (drag) + scroll'da
 *  nozik drift. Har karta bir xil balandlikda, eni rasm nisbatidan keladi —
 *  shunda pastida bo'sh joy qolmaydi. */
export default function DesignStrip({ works }: { works: DesignWork[] }) {
  const t = useTranslations("designStrip");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  /* Scroll-linked nozik drift — asosiy harakat endi drag'da */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], ["1%", "-6%"]);
  const driftX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.4 });

  /* Drag chegarasi: track kengligi - ko'rinadigan eni */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth - (el.parentElement?.clientWidth ?? 0);
      setDragLimit(overflow > 0 ? overflow : 0);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [works.length]);

  return (
    <section
      ref={sectionRef}
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

      {/* Drift (tashqi) + drag (ichki) — ikkalasi qo'shilib ishlaydi */}
      <motion.div style={{ x: driftX }}>
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -dragLimit, right: 0 }}
          dragElastic={0.06}
          className="flex h-64 cursor-grab items-stretch gap-6 px-5 will-change-transform active:cursor-grabbing md:h-80"
        >
          {works.map((w, idx) => (
            <motion.figure
              key={w.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                ease: EASE_OUT_EXPO,
                delay: idx * 0.05,
              }}
              className="group relative h-full shrink-0 overflow-hidden rounded-xl border border-line bg-surface"
              style={{ aspectRatio: `${w.w} / ${w.h}` }}
              data-cursor
            >
              <Image
                src={w.src}
                alt={w.alt}
                fill
                sizes="(max-width: 768px) 60vw, 480px"
                draggable={false}
                className="pointer-events-none object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />

              {/* Hover'da chiqadigan pastki yorliq */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-black/40 p-4 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
                  {w.category}
                </div>
                <div className="mt-1 text-sm text-white">{w.alt}</div>
              </div>
            </motion.figure>
          ))}
        </motion.div>
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
