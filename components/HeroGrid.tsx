"use client";

import { useEffect, useState } from "react";

// DESIGN.md: grid overlay at ~8% ink, visible in the hero, fading after first scroll.
export function HeroGrid() {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 8) {
        setFaded(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div aria-hidden="true" className="hero-grid" data-faded={faded} />;
}
