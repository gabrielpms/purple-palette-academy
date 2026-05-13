import { useEffect, useRef, useState } from "react";

/**
 * Two-layer cursor: tiny dot + larger ring.
 * Disabled on touch / coarse pointers and on /admin routes.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reducedMotion) return;
    setEnabled(true);

    let raf = 0;
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      dotX += (targetX - dotX) * 0.6;
      dotY += (targetY - dotY) * 0.6;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!ringRef.current) return;
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select');
      ringRef.current.dataset.hover = interactive ? "1" : "0";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] rounded-full bg-white"
        style={{ transition: "background .2s" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="0"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-white/30 transition-[width,height,border-color,background-color] duration-300 data-[hover='1']:h-[52px] data-[hover='1']:w-[52px] data-[hover='1']:border-primary data-[hover='1']:bg-primary/10"
      />
    </>
  );
}
