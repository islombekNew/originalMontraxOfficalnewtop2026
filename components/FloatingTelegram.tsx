"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { TELEGRAM_URL } from "@/lib/nav-data";

/** Har sahifada o'ng chekkada doim ko'rinadigan CTA.
 *  Hero'da (scroll < 200) yashiringan — hero'ning o'z CTA'siga xalaqit bermaydi. */
export default function FloatingTelegram() {
  const t = useTranslations("floating");
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          initial={{ opacity: 0, x: 60, y: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-accent bg-ink py-3 pl-3 pr-4 text-paper shadow-xl backdrop-blur"
          style={{
            boxShadow: "0 20px 60px -20px color-mix(in srgb, var(--accent) 40%, transparent)",
          }}
        >
          {/* Yashil ping — "online" hissi */}
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="relative text-ink"
            >
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            </svg>
          </span>

          <motion.span
            initial={false}
            animate={{
              width: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden whitespace-nowrap"
          >
            <span className="mr-1 text-sm font-medium">{t("message")}</span>
            <span className="text-xs text-paper/60">{t("via")}</span>
          </motion.span>

          {/* Yon strelka */}
          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: expanded ? 4 : 0 }}
            className="text-accent"
          >
            →
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
