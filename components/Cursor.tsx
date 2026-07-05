"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor v2 — ring lerp bilan ergashadi, hover holatida kattalashadi.
 * `data-cursor="view"` bo'lgan elementga tegsa ring "VIEW" tugmasiga aylanadi.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      if (!el) {
        ring.classList.remove("is-hover", "is-view");
        setLabel(null);
        return;
      }
      const kind = el.dataset.cursor;
      if (kind === "view") {
        ring.classList.remove("is-hover");
        ring.classList.add("is-view");
        setLabel("View");
      } else {
        ring.classList.remove("is-view");
        ring.classList.add("is-hover");
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:flex">
        {label && (
          <span className="pointer-events-none select-none font-mono">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
