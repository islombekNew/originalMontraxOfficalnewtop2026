"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { EASE_OUT_EXPO } from "@/lib/design/motion";

type Variant = "default" | "numbered" | "serifWord" | "sideKicker" | "editorial";

interface Props {
  kicker: string;
  title: string;
  sub?: string;
  /** Editorial variantda italic serifga o'tkaziladigan so'z(lar).
   *  Default variantda ham ishlatilishi mumkin — bitta so'zni ohangda ajratish uchun. */
  serifWord?: string;
  index?: string;         // "01" kabi — numbered variant uchun
  variant?: Variant;
  align?: "left" | "center";
}

/** MONTRAX SectionHeading — 5 xil treatment.
 *  Har bir bo'limda AYNAN bir xil "one green word" naqshini takrorlamaslik uchun. */
export default function SectionHeading({
  kicker,
  title,
  sub,
  serifWord,
  index = "00",
  variant = "default",
  align = "left",
}: Props) {
  /* Serif so'zni title ichidan chiqarish — birinchi topilgani */
  const renderTitle = () => {
    if (!serifWord || !title.toLowerCase().includes(serifWord.toLowerCase())) {
      return title;
    }
    const idx = title.toLowerCase().indexOf(serifWord.toLowerCase());
    const before = title.slice(0, idx);
    const match = title.slice(idx, idx + serifWord.length);
    const after = title.slice(idx + serifWord.length);
    return (
      <>
        {before}
        <span className="font-editorial italic text-olive">{match}</span>
        {after}
      </>
    );
  };

  const alignClass = align === "center" ? "text-center" : "";

  if (variant === "numbered") {
    return (
      <Reveal>
        <div className={`flex flex-wrap items-start gap-6 md:gap-10 ${alignClass}`}>
          <span className="font-editorial text-6xl italic text-accent md:text-8xl">
            {index}
          </span>
          <div className="flex-1 pt-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              {kicker}
            </p>
            <h2 className="font-display text-h1">{renderTitle()}</h2>
            {sub && <p className="text-lead mt-4 max-w-xl text-muted">{sub}</p>}
          </div>
        </div>
      </Reveal>
    );
  }

  if (variant === "sideKicker") {
    return (
      <div className="flex items-start gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="hidden shrink-0 pt-2 md:block"
        >
          <div
            className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {kicker}
          </div>
        </motion.div>
        <Reveal className="flex-1">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent md:hidden">
            {kicker}
          </p>
          <h2 className="font-display text-h1">{renderTitle()}</h2>
          {sub && <p className="text-lead mt-4 max-w-xl text-muted">{sub}</p>}
        </Reveal>
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <Reveal className={alignClass}>
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
          <span className="text-accent">◆</span>
          {kicker}
        </p>
        <h2 className="font-display text-h1">
          {renderTitle()}
          <span className="text-accent">.</span>
        </h2>
        {sub && (
          <p className="font-editorial mt-6 max-w-2xl text-2xl italic leading-snug text-ink-dim">
            {sub}
          </p>
        )}
      </Reveal>
    );
  }

  if (variant === "serifWord") {
    return (
      <Reveal className={alignClass}>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
          <span className="inline-block h-px w-6 bg-accent" />
          {kicker}
        </p>
        <h2 className="font-display text-h1">{renderTitle()}</h2>
        {sub && <p className="text-lead mt-4 max-w-xl text-muted">{sub}</p>}
      </Reveal>
    );
  }

  /* default */
  return (
    <Reveal className={alignClass}>
      <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span className="inline-block h-px w-8 bg-accent" />
        {kicker}
      </p>
      <h2 className="font-display text-h1">{renderTitle() || title}</h2>
      {sub && <p className="text-lead mt-4 max-w-xl text-muted">{sub}</p>}
    </Reveal>
  );
}
