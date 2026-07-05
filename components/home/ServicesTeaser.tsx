"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { staggerContainer, revealUp, EASE_OUT_EXPO } from "@/lib/design/motion";

const SERVICES = [
  {
    key: "web" as const,
    index: "01",
    tools: ["Next.js", "TypeScript", "Prisma", "Postgres"],
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 13l2 2-2 2M12 17h4" />
      </svg>
    ),
  },
  {
    key: "design" as const,
    index: "02",
    tools: ["Figma", "Photoshop", "Illustrator", "After Effects"],
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 0 18M8 10.5a1 1 0 1 0 0-2M15 9a1 1 0 1 0 0-2" />
      </svg>
    ),
  },
  {
    key: "bot" as const,
    index: "03",
    tools: ["grammY", "Node.js", "Webhooks"],
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      </svg>
    ),
  },
  {
    key: "vibe" as const,
    index: "04",
    tools: ["Claude Code", "Cursor", "Next.js", "v0"],
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    key: "smm" as const,
    index: "05",
    tools: ["Kontent reja", "Photoshop", "CapCut", "Analytics"],
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="m3 11 18-7-7 18-2.5-7.5L3 11Z" />
        <circle cx="19" cy="5" r="2.5" />
      </svg>
    ),
  },
  {
    key: "ai" as const,
    index: "06",
    tools: ["Prompt", "AI workflow", "Chatbot", "ComfyUI"],
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <rect x="7" y="7" width="10" height="10" rx="3" />
        <circle cx="12" cy="12" r="1.6" />
      </svg>
    ),
  },
];

/** Services teaser — 3 ta bir xil karta EMAS. Editorial magazine list style. */
export default function ServicesTeaser() {
  const t = useTranslations("services");

  return (
    <section className="section-gap relative border-t border-line">
      <div className="container-wide">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            serifWord={t("serifWord")}
            variant="editorial"
          />
          <Reveal>
            <Link
              href="/services"
              data-cursor
              className="group link-accent flex items-center gap-2 text-sm text-ink-dim"
            >
              {t("viewAll")}
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Ro'yxat — har bir servis: big number + title + description + tools row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="divide-y divide-line border-y border-line"
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.key}
              variants={revealUp}
              className="group relative"
            >
              <Link
                href="/services"
                data-cursor
                className="grid items-start gap-6 px-2 py-10 transition-colors md:grid-cols-[auto_1fr_auto] md:gap-10 md:py-14"
              >
                {/* Big index number */}
                <div className="font-editorial text-6xl italic leading-none text-line transition-colors duration-500 group-hover:text-accent md:text-8xl">
                  {s.index}
                </div>

                {/* Title + description */}
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="text-accent transition-transform duration-500 group-hover:rotate-45">
                      {s.icon}
                    </div>
                    <h3 className="font-display text-3xl font-medium md:text-4xl">
                      {t(`${s.key}.title`)}
                    </h3>
                  </div>
                  <p className="max-w-xl text-base leading-relaxed text-ink-dim md:text-lg">
                    {t(`${s.key}.desc`)}
                  </p>

                  {/* Tools row */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* O'ng arrow */}
                <div className="hidden self-center md:block">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-ink-dim transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                    whileHover={{ scale: 1.06 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Hover glow line */}
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 0 }}
                  animate={{}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT_EXPO }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
