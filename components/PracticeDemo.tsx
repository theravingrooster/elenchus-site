"use client";

import { useEffect, useRef, useState } from "react";
import { practice } from "@/content/practice";

type Reveal = "shown" | "hidden";

// /practice scroll demo (#13). Three fixed claims, switched with three text buttons.
// Scrolling plays the drill: each step reveals once as it scrolls into view.
// No typewriter, no bounce, no autoplay. Reduced motion shows every step static.
// Server render is fully visible, so the page reads without JavaScript too.
export function PracticeDemo() {
  const { demo } = practice;
  const [active, setActive] = useState<number>(demo.defaultClaim);
  const [reveal, setReveal] = useState<Reveal[]>(() => demo.steps.map(() => "shown"));
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const endRef = useRef<HTMLParagraphElement | null>(null);
  const [endReveal, setEndReveal] = useState<Reveal>("shown");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = [...stepRefs.current, endRef.current];
    const below = targets.map((el) => !!el && el.getBoundingClientRect().top > window.innerHeight * 0.85);
    setReveal(demo.steps.map((_, i) => (below[i] ? "hidden" : "shown")));
    setEndReveal(below[targets.length - 1] ? "hidden" : "shown");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          if (el === endRef.current) {
            setEndReveal("shown");
            continue;
          }
          const i = Number(el.dataset.step);
          setReveal((prev) => prev.map((r, j) => (j === i ? "shown" : r)));
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((el, i) => el && below[i] && io.observe(el));
    return () => io.disconnect();
  }, [demo.steps]);

  const claim = demo.claims[active];

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
      {/* Claim column. Sticky on wide screens so the claim stays in view while the steps scroll. */}
      <div className="md:sticky md:top-10 md:self-start">
        <div role="group" aria-label={demo.switcherLabel} className="flex flex-col border-t border-rule">
          {demo.claims.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="demo-claim-btn grid grid-cols-[3.5rem_1fr] items-baseline gap-2 border-b border-rule py-3 text-left"
            >
              <span className="mono-label">{c.id}</span>
              <span className="font-serif text-lg leading-snug">{c.text}</span>
            </button>
          ))}
        </div>

        <figure className="mt-10" aria-live="polite">
          <figcaption className="mono-label">
            {demo.claimLabel} {claim.id}
          </figcaption>
          <blockquote className="mt-4 font-serif text-3xl italic leading-[1.1] tracking-[-0.01em] md:text-4xl">
            {claim.text}
          </blockquote>
        </figure>
      </div>

      {/* Steps column. One step per row, hairlines between. */}
      <div>
        <ol className="border-t border-rule">
          {demo.steps.map((stepName, i) => {
            const step = claim.steps[i];
            return (
              <li
                key={stepName}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
                data-reveal-step={reveal[i]}
                className="demo-step border-b border-rule py-10 md:py-14"
              >
                <p className="mono-label">
                  {String(i + 1).padStart(2, "0")} / {stepName}
                </p>
                <p className="mt-6 font-serif text-2xl leading-snug md:text-3xl">{step.question}</p>
                <p className="mt-6 grid grid-cols-[8.5rem_1fr] items-baseline gap-3 md:grid-cols-[10rem_1fr]">
                  <span className="mono-label">{step.note.kind}</span>
                  <span>{step.note.text}</span>
                </p>
              </li>
            );
          })}
        </ol>
        <p ref={endRef} data-reveal-step={endReveal} className="demo-step mono-label mt-10">
          {demo.stop}
        </p>
      </div>
    </div>
  );
}
