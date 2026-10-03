"use client";

import { useEffect, useId, useRef, useState } from "react";
import { practice } from "@/content/practice";

export function PracticeCard() {
  const { demo } = practice;
  const [active, setActive] = useState(demo.defaultClaim);
  const [sentTurns, setSentTurns] = useState(0);
  const [isReplyPending, setIsReplyPending] = useState(false);
  const [isReplyRevealing, setIsReplyRevealing] = useState(false);
  const conversationId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = demo.claims[active];
  const atEnd = sentTurns === current.thread.length;
  const replyStatus = isReplyRevealing ? demo.streamingLabel : demo.typingLabel;
  const nextPrompt = isReplyPending
    ? replyStatus
    : atEnd ? demo.endLabel : current.thread[sentTurns].question;
  const answeredTurns = sentTurns - (isReplyPending ? 1 : 0);
  const messages = [
    { key: "claim", side: "incoming", claim: true, text: current.claim },
    ...current.thread.slice(0, sentTurns).flatMap((turn, index) => [
      { key: "question-" + index, side: "outgoing", claim: false, text: turn.question },
      ...(index < answeredTurns ? [
        { key: "reply-" + index, side: "incoming", claim: false, text: turn.feedback },
      ] : []),
    ]),
  ];

  // Start at the headline; keep only the inner history following the reply.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = sentTurns === 0 ? 0 : log.scrollHeight;
  }, [active, sentTurns, isReplyPending, isReplyRevealing]);

  useEffect(() => () => {
    if (replyTimer.current !== null) clearTimeout(replyTimer.current);
  }, []);

  function selectClaim(index: number) {
    if (replyTimer.current !== null) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    setIsReplyPending(false);
    setIsReplyRevealing(false);
    setActive(index);
    setSentTurns(0);
  }

  function sendQuestion() {
    if (atEnd || isReplyPending || replyTimer.current !== null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function finishReply() {
      replyTimer.current = null;
      setIsReplyRevealing(false);
      setIsReplyPending(false);
    }

    setSentTurns((value) => value + 1);
    setIsReplyRevealing(false);
    setIsReplyPending(true);
    replyTimer.current = setTimeout(() => {
      if (reducedMotion) {
        finishReply();
      } else {
        setIsReplyRevealing(true);
        replyTimer.current = setTimeout(finishReply, demo.responseRevealMs);
      }
    }, demo.responseDelayMs);
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
                {message.claim && (
                  <div className="chat-sources" aria-label={demo.sourcesLabel}>
                    <span className="mono-label">{demo.sourcesLabel}</span>
                    {current.sources.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                        {source.label}<span className="sr-only"> (opens in a new tab)</span>
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
          {isReplyPending && (
            <li
              className="chat-message"
              data-side="incoming"
              data-phase={isReplyRevealing ? "revealing" : "waiting"}
              aria-hidden="true"
            >
              <span aria-hidden="true" className="chat-avatar">{demo.avatar}</span>
              <div className="chat-bubble chat-reply">
                {/* Lay out the whole reply once so uncovering it never shifts the history. */}
                <p className="chat-reveal-copy" style={{ animationDuration: demo.responseRevealMs + "ms" }}>
                  {current.thread[sentTurns - 1].feedback}
                </p>
                {!isReplyRevealing && <span className="chat-typing-dots"><span /><span /><span /></span>}
              </div>
            </li>
          )}
        </ol>
      </div>

      {/* Announce the phase once; the log receives the full reply when finished. */}
      <p role="status" className="sr-only">{isReplyPending ? nextPrompt : ""}</p>

      <div className="border-t border-rule px-4 pt-2 pb-4 md:px-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label={demo.previousAction}
            aria-controls={conversationId}
            disabled={sentTurns === 0 || isReplyPending}
            onClick={() => setSentTurns((value) => Math.max(0, value - 1))}
            className="example-nav mono-label"
          >
            <span aria-hidden="true">←</span> {demo.previousLabel}
          </button>
          <p className="mono-label shrink-0 whitespace-nowrap tabular-nums">
            {String(sentTurns).padStart(2, "0")} / {String(current.thread.length).padStart(2, "0")}
          </p>
        </div>
        <button
          type="button"
          aria-label={demo.nextAction + ": " + nextPrompt}
          aria-controls={conversationId}
          disabled={atEnd && !isReplyPending}
          aria-disabled={atEnd || isReplyPending}
          onClick={sendQuestion}
          className="chat-send"
        >
          <span>{nextPrompt}</span>
          <span aria-hidden="true" className="chat-send-icon">↑</span>
        </button>
      </div>
    </div>
  );
}
