"use client";

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type MotionProps } from "framer-motion";

type ButtonProps = ComponentPropsWithoutRef<"button"> & MotionProps;
type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, keyof MotionProps> & MotionProps;

type Props =
  | ({ as?: "button"; children: ReactNode; strength?: number } & ButtonProps)
  | ({ as: "a"; children: ReactNode; strength?: number; href: string } & AnchorProps);

/** Magnetic hover — kursor yaqinlashsa element unga tortiladi.
 *  Farmer motion spring bilan yumshoq. */
export default function MagneticButton(props: Props) {
  const { as = "button", children, strength = 0.35, className, ...rest } = props as Props & {
    className?: string;
  };
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (as === "a") {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={className}
        {...(rest as AnchorProps)}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...(rest as ButtonProps)}
    >
      {children}
    </motion.button>
  );
}
