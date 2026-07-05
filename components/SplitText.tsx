"use client";

import { motion } from "framer-motion";
import { charReveal, EASE_OUT_EXPO } from "@/lib/design/motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "div";
}

/** Character-level split reveal — har harf pastdan chiqadi (mask bilan).
 *  Bo'sh joylarni saqlaydi (nbsp bilan). */
export default function SplitText({ text, className, delay = 0, as = "span" }: Props) {
  const Tag = motion[as] as typeof motion.span;
  const chars = Array.from(text);

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="char-mask"
          style={{ display: c === " " ? "inline" : "inline-block" }}
        >
          {c === " " ? (
            " "
          ) : (
            <motion.span
              custom={i}
              variants={charReveal}
              transition={{
                duration: 0.8,
                ease: EASE_OUT_EXPO,
                delay: delay + i * 0.025,
              }}
            >
              {c}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
