"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import WorkCard from "@/components/WorkCard";
import type { CaseMeta, DesignWork } from "@/lib/work-types";

type Filter = "all" | "dev" | "design";

export default function WorkGrid({
  cases,
  designs,
}: {
  cases: CaseMeta[];
  designs: DesignWork[];
}) {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<Filter>("all");

  const showDev = filter === "all" || filter === "dev";
  const showDesign = filter === "all" || filter === "design";

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "dev", label: t("filterDev") },
    { key: "design", label: t("filterDesign") },
  ];

  return (
    <div className="mt-12">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${
              filter === f.key
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-accent/50 hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {showDev && (
          <motion.div
            key="dev"
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2"
          >
            {cases.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </motion.div>
        )}

        {showDesign && (
          <motion.div
            key="design"
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">
              {t("designNote")}
            </p>
            {/* Masonry — columns bilan */}
            <div className="columns-2 gap-5 md:columns-3 [&>figure]:mb-5">
              {designs.map((w) => (
                <figure
                  key={w.src}
                  className="group relative break-inside-avoid overflow-hidden rounded-lg border border-line bg-surface"
                  data-cursor
                >
                  <Image
                    src={w.src}
                    alt={w.alt}
                    width={w.w}
                    height={w.h}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-bg/75 px-3 py-1 text-xs text-accent opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100">
                    {w.category}
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
