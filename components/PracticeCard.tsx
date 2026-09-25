"use client";

import { useEffect, useRef, useState } from "react";
import { practice } from "@/content/practice";

type Row =
  | { key: string; type: "question"; label: string; text: string }
  | { key: string; type: "note"; label: string; text: string }
  | { key: string; type: "decide"; label: string; text: string };

// /practice demo (#15). One tall card with a hairline border and no shadow.
// Top: three equal bars switch the claim. Then the claim, large. Then a vertical
// thread, one full-width row at a time, alternating a question and a short note,
// ending on Decide. Rows reveal as they enter the viewport. No typewriter, no bounce.
// No side-by-side columns at any width. Reduced motion shows the whole thread static.
// Server render is fully visible, so the thread reads without JavaScript.
export function PracticeCard() {
  const { demo } = practice;
  const [active, setActive] = useState<number>(demo.defaultClaim);
  const claim = demo.claims[active];

  const rows: Row[] = [
    ...claim.thread.flatMap((ex, i): Row[] => [
      { key: `q${i}`, type: "question", label: demo.questionLabel, text: ex.question },
      { key: `n${i}`, type: "note", label: ex.note.kind, text: ex.note.text },
    ]),
    { key: "decide", type: "decide", label: demo.decideLabel, text: claim.decide },
  ];

  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [hidden, setHidden] = useState<boolean[]>(() => rows.map(() => false));

  // On mount and on every claim switch: rows still below the fold hide, then reveal
  // one at a time as each enters the viewport. Rows already in view stay shown.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = rowRefs.current;
    const below = els.map((el) => !!el && el.getBoundingClientRect().top > window.innerHeight * 0.9);
    setHidden(below);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const i = Number((entry.target as HTMLElement).dataset.row);
          setHidden((prev) => prev.map((h, j) => (j === i ? false : h)));
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el, i) => el && below[i] && io.observe(el));
    return () => io.disconnect();
  }, [active]);

  return (
    <div className="border border-ink">
      {/* Three equal bars. Selected is ink on paper inverted; the others are full ink. */}
      <div role="group" aria-label={demo.switcherLabel} className="grid grid-cols-3 border-b border-ink">
        {demo.claims.map((c, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className="claim-bar border-l border-ink py-4 first:border-l-0 md:py-5"
          >
            {c.bar}
          </button>
        ))}
      </div>

      <div className="px-5 pt-10 pb-12 md:px-12 md:pt-14 md:pb-16">
        <figure aria-live="polite">
          <figcaption className="mono-label">{demo.claimLabel}</figcaption>
          <blockquote className="mt-5 max-w-[24ch] font-serif text-4xl italic leading-[1.05] tracking-[-0.015em] md:text-6xl">
            {claim.text}
          </blockquote>
        </figure>

        {/* The thread. One row per line, stacked, full width. */}
        <ol className="mt-12 border-t border-rule md:mt-16">
          {rows.map((row, i) => (
            <li
              key={`${active}-${row.key}`}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              data-row={i}
              data-hidden={hidden[i] ? "true" : "false"}
              className={`thread-row border-b border-rule ${
                row.type === "question" ? "py-8 md:py-10" : "py-6 pl-5 md:py-8 md:pl-10"
              }`}
            >
              <p className="mono-label">{row.label}</p>
              <p
                className={
                  row.type === "question"
                    ? "mt-4 max-w-[40ch] font-serif text-2xl leading-snug md:text-3xl"
                    : row.type === "decide"
                      ? "mt-4 max-w-[48ch] font-serif text-xl italic leading-snug md:text-2xl"
                      : "mt-3 max-w-[60ch]"
                }
              >
                {row.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
