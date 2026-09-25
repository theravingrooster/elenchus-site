"use client";

import { useEffect, useRef, useState } from "react";
import { practice } from "@/content/practice";

type Bubble = { key: string; side: "left" | "right"; kind: "claim" | "question" | "feedback"; label: string; text: string };

// /practice demo (#23): a recording of someone learning to ask better questions.
// One tall card, hairline border, no shadow. Top: three equal bars switch the claim.
// Then one vertical chat column, full width: the claim on the left, each question on the
// right, each feedback on the left, stacking as you scroll. No side-by-side columns at any
// width, no typewriter. Reduced motion shows the whole thread static. Server render is fully
// visible, so the thread reads without JavaScript.
export function PracticeCard() {
  const { demo } = practice;
  const [active, setActive] = useState<number>(demo.defaultClaim);
  const current = demo.claims[active];

  const bubbles: Bubble[] = [
    { key: "claim", side: "left", kind: "claim", label: demo.claimLabel, text: current.claim },
    ...current.thread.flatMap((turn, i): Bubble[] => [
      { key: `q${i}`, side: "right", kind: "question", label: demo.questionLabel, text: turn.question },
      { key: `f${i}`, side: "left", kind: "feedback", label: demo.feedbackLabel, text: turn.feedback },
    ]),
  ];

  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [hidden, setHidden] = useState<boolean[]>(() => bubbles.map(() => false));

  // On mount and on every claim switch: bubbles still below the fold hide, then reveal
  // one at a time as each enters the viewport. Bubbles already in view stay shown.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = refs.current;
    const below = els.map((el) => !!el && el.getBoundingClientRect().top > window.innerHeight * 0.9);
    setHidden(below);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const i = Number((entry.target as HTMLElement).dataset.bubble);
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
      {/* Three equal bars. Selected inverts; the others are full ink on paper. */}
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

      {/* The chat. One column; the side of each bubble says who is speaking. */}
      <ol aria-live="polite" className="flex flex-col gap-6 px-4 py-10 md:gap-8 md:px-10 md:py-14">
        {bubbles.map((b, i) => (
          <li
            key={`${active}-${b.key}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-bubble={i}
            data-hidden={hidden[i] ? "true" : "false"}
            data-side={b.side}
            className="chat-row flex flex-col"
          >
            <p className={`mono-label ${b.side === "right" ? "self-end" : ""}`}>{b.label}</p>
            <div
              className={`chat-bubble mt-3 max-w-[88%] md:max-w-[34rem] ${b.side === "right" ? "self-end" : "self-start"}`}
              data-kind={b.kind}
            >
              <p
                className={
                  b.kind === "claim"
                    ? "font-serif text-2xl italic leading-[1.15] md:text-4xl"
                    : b.kind === "question"
                      ? "font-serif text-xl leading-snug md:text-2xl"
                      : ""
                }
              >
                {b.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
