"use client";

import { useEffect, useId, useRef, useState } from "react";
import { practice } from "@/content/practice";

export function PracticeCard() {
  const { demo } = practice;
  const [active, setActive] = useState(demo.defaultClaim);
  const [step, setStep] = useState(0);
  const conversationId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const current = demo.claims[active];
  const atEnd = step === current.thread.length - 1;
  const nextPrompt = atEnd ? demo.endLabel : current.thread[step + 1].question;
  const messages = [
    { key: "claim", side: "incoming", claim: true, text: current.claim },
    ...current.thread.slice(0, step + 1).flatMap((turn, index) => [
      { key: "question-" + index, side: "outgoing", claim: false, text: turn.question },
      { key: "reply-" + index, side: "incoming", claim: false, text: turn.feedback },
    ]),
  ];

  // Keep the newest exchange in view without moving the page or keyboard focus.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [active, step]);

  function selectClaim(index: number) {
    setActive(index);
    setStep(0);
  }

  return (
    <div className="demo-chat">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-4 md:px-5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="chat-avatar">{demo.avatar}</span>
          <div>
            <p className="font-serif text-xl leading-none">{demo.name}</p>
            <p className="mono-label mt-2">{demo.exampleLabel}</p>
          </div>
        </div>
        <div role="group" aria-label={demo.switcherLabel} className="flex flex-wrap gap-2">
          {demo.claims.map((claim, index) => (
            <button
              key={claim.bar}
              type="button"
              aria-pressed={index === active}
              aria-controls={conversationId}
              onClick={() => selectClaim(index)}
              className="chat-claim-selector mono-label"
            >
              {claim.bar}
            </button>
          ))}
        </div>
      </div>

      <div
        id={conversationId}
        ref={logRef}
        role="log"
        aria-label={demo.conversationLabel}
        aria-live="polite"
        aria-relevant="additions"
        aria-atomic="false"
        tabIndex={0}
        data-lenis-prevent
        className="demo-chat-log"
      >
        <ol className="chat-messages">
          {messages.map((message) => (
            <li key={current.bar + "-" + message.key} className="chat-message" data-side={message.side}>
              <span className="sr-only">{message.side === "incoming" ? demo.name : demo.readerLabel}: </span>
              {message.side === "incoming" && <span aria-hidden="true" className="chat-avatar">{demo.avatar}</span>}
              <div className="chat-bubble">
                {message.claim && <span className="mono-label mb-2 block">{demo.claimLabel}</span>}
                <p>{message.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-rule px-4 pt-2 pb-4 md:px-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label={demo.previousAction}
            aria-controls={conversationId}
            disabled={step === 0}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            className="example-nav mono-label"
          >
            <span aria-hidden="true">←</span> {demo.previousLabel}
          </button>
          <p className="mono-label shrink-0 whitespace-nowrap tabular-nums">
            {String(step + 1).padStart(2, "0")} / {String(current.thread.length).padStart(2, "0")}
          </p>
        </div>
        <button
          type="button"
          aria-label={demo.nextAction + ": " + nextPrompt}
          aria-controls={conversationId}
          disabled={atEnd}
          onClick={() => setStep((value) => Math.min(current.thread.length - 1, value + 1))}
          className="chat-send"
        >
          <span>{nextPrompt}</span>
          <span aria-hidden="true" className="chat-send-icon">↑</span>
        </button>
      </div>
    </div>
  );
}
