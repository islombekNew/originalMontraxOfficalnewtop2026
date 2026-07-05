"use client";

import { useTranslations } from "next-intl";

/** Yo'nalishlar marquee — hero va featured orasidagi ingichka strip.
 *  4 yo'nalish katta serif/display almashinuvida, orasida tools nomlari. */
export default function ExpertiseStrip() {
  const t = useTranslations("expertise");

  const items = [
    { label: t("dev"), serif: false },
    { label: "Next.js", serif: true, dim: true },
    { label: t("design"), serif: false },
    { label: "Photoshop", serif: true, dim: true },
    { label: t("smm"), serif: false },
    { label: "Kontent", serif: true, dim: true },
    { label: t("vibe"), serif: false },
    { label: "Claude Code", serif: true, dim: true },
  ];

  return (
    <div className="relative overflow-hidden border-y border-line-warm bg-surface py-5">
      <div className="marquee-track items-baseline gap-10 pr-10">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-baseline gap-10">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-baseline gap-10 whitespace-nowrap">
                <span
                  className={
                    item.serif
                      ? "font-editorial text-2xl italic text-muted"
                      : "font-display text-3xl font-medium text-ink md:text-4xl"
                  }
                >
                  {item.label}
                </span>
                <span className="text-accent">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
