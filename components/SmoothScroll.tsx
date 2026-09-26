"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// DESIGN.md: Lenis smooth scroll, skipped entirely for reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
