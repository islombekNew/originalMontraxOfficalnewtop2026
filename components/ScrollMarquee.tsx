"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

interface Props {
  text: string;
  className?: string;
  /** Scroll ta'sirini kuchaytirish yoki kamaytirish */
  intensity?: number;
  /** Belgi orasidagi ajratuvchi */
  separator?: string;
}

/** Scroll bilan kengroq harakatlanuvchi oversized text ticker.
 *  Sahifa yuqoriga scroll'da chapga, pastga scroll'da o'ngga suriladi. */
export default function ScrollMarquee({
  text,
  className = "",
  intensity = 1,
  separator = "◆",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [`0%`, `-${20 * intensity}%`]),
    { stiffness: 60, damping: 20 }
  );

  const items = Array.from({ length: 6 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap font-editorial text-[clamp(4rem,14vw,14rem)] italic leading-none"
      >
        {items.map((_, i) => (
          <span key={i} className="mr-12 flex items-center gap-12">
            {text}
            <span className="text-accent">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
