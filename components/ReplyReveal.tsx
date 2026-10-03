"use client";

import { useEffect, useRef, useState } from "react";

type Line = { top: number; height: number; width: number };
type Measurement = {
  width: number;
  lines: Line[];
  elapsedMs: number;
  revision: number;
};

export function ReplyReveal({ text, revealing, durationMs }: {
  text: string;
  revealing: boolean;
  durationMs: number;
}) {
  const layoutRef = useRef<HTMLParagraphElement>(null);
  const startedAt = useRef<number | null>(null);
  const [measurement, setMeasurement] = useState<Measurement>({
    width: 0, lines: [], elapsedMs: 0, revision: 0,
  });

  useEffect(() => {
    startedAt.current = revealing ? performance.now() : null;
  }, [revealing]);

  useEffect(() => {
    const paragraph = layoutRef.current;
    if (!paragraph) return;
    let disposed = false;

    function measure() {
      if (disposed || !paragraph) return;
      const bounds = paragraph.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const range = document.createRange();
      range.selectNodeContents(paragraph);
      if (typeof range.getClientRects !== "function") return;

      // A line may contain several Range fragments; combine those at the same Y.
      const rows: { top: number; bottom: number; right: number }[] = [];
      const fragments = [...range.getClientRects()]
        .filter((rect) => rect.width > 0 && rect.height > 0)
        .sort((a, b) => a.top - b.top || a.left - b.left);
      for (const rect of fragments) {
        const previous = rows.at(-1);
        if (previous && Math.abs(previous.top - rect.top) < 1) {
          previous.bottom = Math.max(previous.bottom, rect.bottom);
          previous.right = Math.max(previous.right, rect.right);
        } else {
          rows.push({ top: rect.top, bottom: rect.bottom, right: rect.right });
        }
      }
      if (!rows.length) return;

      // Boundaries between line centres retain the full leading and descenders.
      const centres = rows.map((row) => (row.top + row.bottom) / 2 - bounds.top);
      const boundaries = [0, ...centres.slice(1).map((centre, index) =>
        (centres[index] + centre) / 2), bounds.height];
      const lines = rows.map((row, index) => ({
        top: boundaries[index],
        height: boundaries[index + 1] - boundaries[index],
        width: Math.min(bounds.width, row.right - bounds.left + 2),
      }));
      const elapsedMs = startedAt.current === null ? 0 : performance.now() - startedAt.current;

      setMeasurement((previous) => {
        if (previous.width === bounds.width && previous.lines.length === lines.length &&
          lines.every((line, index) => {
            const old = previous.lines[index];
            return old.top === line.top && old.height === line.height && old.width === line.width;
          })) return previous;
        return { width: bounds.width, lines, elapsedMs, revision: previous.revision + 1 };
      });
    }

    const frame = requestAnimationFrame(measure);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(paragraph);
    void document.fonts?.ready.then(measure);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [text]);

  const totalWidth = measurement.lines.reduce((sum, line) => sum + line.width, 0);

  return (
    <div className="chat-reveal-copy" data-revealing={revealing}>
      <p ref={layoutRef} className="chat-reveal-layout">{text}</p>
      {measurement.lines.map((line, index) => {
        const previousWidth = measurement.lines.slice(0, index).reduce((sum, previous) => sum + previous.width, 0);
        const delayMs = previousWidth / totalWidth * durationMs - measurement.elapsedMs;
        return (
          <div
            key={measurement.revision + ":" + index}
            className="chat-reveal-line"
            aria-hidden="true"
            style={{
              top: line.top,
              height: line.height,
              width: line.width,
              animationDuration: line.width / totalWidth * durationMs + "ms",
              animationDelay: delayMs + "ms",
            }}
          >
            <p style={{ top: -line.top, width: measurement.width }}>{text}</p>
          </div>
        );
      })}
    </div>
  );
}
