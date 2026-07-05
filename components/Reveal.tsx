"use client";

import { motion, type Variants } from "framer-motion";
import { revealUp } from "@/lib/design/motion";

/** Scroll-triggered reveal wrapper — har safar scroll qilganda takrorlanadi.
 *  Foydalanuvchi tepaga chiqib qaytsa, animatsiya boshidan ishga tushadi. */
export default function Reveal({
  children,
  variants = revealUp,
  className,
  delay = 0,
  once = false,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
