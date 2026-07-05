"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** StackSection v3 — sof sticky "card deck", transform/opacity YO'Q
 *  (scroll'dagi miltillashning sababi transform edi).
 *
 *  Balandligi viewport'dan katta panel: avval to'liq scroll bo'lishi kerak,
 *  keyin pin. CSS'da `top` foizi o'z balandligiga bog'lanmaydi, shuning uchun
 *  ResizeObserver bilan o'lchab `top = vh - height` qilib qo'yamiz. */
export default function StackSection({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      setTop(h > vh ? vh - h : 0);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`stack-panel ${className}`}
      style={{ zIndex: index + 1, top }}
    >
      {children}
    </section>
  );
}
