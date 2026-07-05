import type { Variants, Transition } from "framer-motion";

/** MONTRAX motion tili — barcha komponentlar shu tokenlardan oladi */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

export const DUR = {
  fast: 0.25,
  base: 0.55,
  slow: 0.8,
  epic: 1.2,
} as const;

export const transition: Transition = {
  duration: DUR.base,
  ease: EASE_OUT_EXPO,
};

/** Scroll-triggered reveal — pastdan yumshoq chiqish */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
};

/** Yon tomondan chiqish — asymmetric layout uchun */
export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
};

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
};

/** Blur reveal — nozik, editorial */
export const revealBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_OUT_EXPO },
  },
};

/** Scale-in reveal */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
};

/** Stagger container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

/** Hero satrlari — qatorlab ochilish */
export const heroLine: Variants = {
  hidden: { opacity: 0, y: "60%" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE_OUT_EXPO, delay: 0.12 * i },
  }),
};

/** Character-level split — har bir harf pastdan chiqadi */
export const charReveal: Variants = {
  hidden: { y: "110%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: {
      duration: DUR.slow,
      ease: EASE_OUT_EXPO,
      delay: 0.02 * i + 0.15,
    },
  }),
};

/** Utility: matnni harflarga bo'lish (bo'sh joyni saqlaydi) */
export function splitChars(text: string): string[] {
  return Array.from(text);
}
