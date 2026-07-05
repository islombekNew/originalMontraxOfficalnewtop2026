"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Sahifaning tepasida yupqa scroll progress bar — spring bilan silliq */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });

  return <motion.div className="scroll-progress w-full" style={{ scaleX }} />;
}
