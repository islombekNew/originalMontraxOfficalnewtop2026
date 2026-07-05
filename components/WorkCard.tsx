"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { revealUp, EASE_OUT_EXPO } from "@/lib/design/motion";
import type { CaseMeta } from "@/lib/work-types";

export default function WorkCard({
  item,
  large = false,
  index = 0,
}: {
  item: CaseMeta;
  large?: boolean;
  index?: number;
}) {
  /* Tilt & zoom hover */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), {
    stiffness: 150,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), {
    stiffness: 150,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealUp}
      transition={{ delay: index * 0.06 }}
      className={large ? "md:col-span-2" : ""}
    >
      <Link
        href={`/work/${item.slug}`}
        className="group block"
        data-cursor="view"
      >
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
            transformPerspective: 900,
          }}
          className={`glow-ring relative overflow-hidden rounded-2xl border border-line bg-surface ${
            large ? "aspect-[16/8]" : "aspect-[4/3]"
          }`}
        >
          {/* Image — hover scale */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={item.cover}
              alt={item.title}
              fill
              sizes={
                large
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          </div>

          {/* Mask reveal — pastdan yuqoriga (overlay bilan, image ustidan) */}
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 1.1,
              ease: EASE_OUT_EXPO,
              delay: index * 0.06 + 0.1,
            }}
            className="absolute inset-0 origin-top bg-bg"
          />

          {/* Chuqur wash — matn o'qilishi uchun (cover rasm ranglariga bog'liqmas) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

          {/* Top-left: year badge */}
          <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
            {item.year}
          </div>

          {/* Bottom overlay content — hover'da yuqori chiqadi */}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {item.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/25 bg-black/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/85 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-2xl font-medium text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:text-accent-soft md:text-3xl">
                {item.title}
              </h3>
            </div>

            {/* Arrow badge */}
            <motion.div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
              whileHover={{ scale: 1.1 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            {item.summary}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
