"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "hidden" | "shown";

// DESIGN.md: mono section labels (`01 / METHOD`), staggered on first intersection.
// Server render is fully visible; labels only hide if they start below the fold.
export function SectionLabel({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const parts = children.split(" / ");

  return (
    <p ref={ref} className="mono-label" data-reveal={state}>
      {parts.map((part, i) => (
        <span key={i} className="reveal-part" style={{ transitionDelay: `${i * 80}ms` }}>
          {i > 0 && <span aria-hidden="true">&nbsp;/&nbsp;</span>}
          {part}
        </span>
      ))}
    </p>
  );
}
