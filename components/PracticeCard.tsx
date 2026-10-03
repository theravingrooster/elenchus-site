"use client";

import { useId, useState } from "react";
import { practice } from "@/content/practice";

export function PracticeCard() {
  const { demo } = practice;
  const [active, setActive] = useState(demo.defaultClaim);
  const [step, setStep] = useState(0);
  const exampleId = useId();
  const current = demo.claims[active];
  const turn = current.thread[step];

  function selectClaim(index: number) {
    setActive(index);
    setStep(0);
  }

  return (
    <div className="overflow-hidden border border-ink bg-paper">
      <div role="group" aria-label={demo.switcherLabel} className="grid grid-cols-3 border-b border-ink">
        {demo.claims.map((claim, index) => (
          <button
            key={claim.bar}
            type="button"
            aria-pressed={index === active}
            aria-controls={exampleId}
            onClick={() => selectClaim(index)}
            className="claim-bar border-l border-ink py-4 first:border-l-0"
          >
            {claim.bar}
          </button>
        ))}
      </div>

      <div id={exampleId} aria-live="polite" aria-atomic="true" className="px-6 pt-7 pb-8 md:px-8 md:pt-8">
        <p className="mono-label">{demo.claimLabel}</p>
        <h3 className="mt-4 max-w-[26ch] font-serif text-2xl leading-[1.15] tracking-[-0.015em] md:text-4xl">
          {current.claim}
        </h3>
        <div className="mt-7 border-t border-rule pt-6">
          <p className="mono-label">{demo.questionLabel}</p>
          <p className="mt-3 min-h-[2.4em] font-serif text-xl leading-[1.2] md:text-2xl">{turn.question}</p>
          <p className="mono-label mt-6">{demo.feedbackLabel}</p>
          <p className="mt-2 max-w-[48ch]">{turn.feedback}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-rule px-3 py-3 md:px-6">
        <button
          type="button"
          aria-label={demo.previousAction}
          aria-controls={exampleId}
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          className="example-nav mono-label"
        >
          <span aria-hidden="true">←</span> {demo.previousLabel}
        </button>
        <p className="mono-label shrink-0 whitespace-nowrap tabular-nums">
          {String(step + 1).padStart(2, "0")} / {String(current.thread.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          aria-label={demo.nextAction}
          aria-controls={exampleId}
          disabled={step === current.thread.length - 1}
          onClick={() => setStep((value) => Math.min(current.thread.length - 1, value + 1))}
          className="example-nav mono-label"
        >
          {demo.nextLabel} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
