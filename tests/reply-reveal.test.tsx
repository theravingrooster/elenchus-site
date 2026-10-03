import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ReplyReveal } from "@/components/ReplyReveal";

const text = "A reply that wraps across several measured lines.";
const originalRangeRects = Object.getOwnPropertyDescriptor(Range.prototype, "getClientRects");
const originalFonts = Object.getOwnPropertyDescriptor(document, "fonts");
const originalObserver = Object.getOwnPropertyDescriptor(globalThis, "ResizeObserver");
let bounds: DOMRect;
let rectangles: DOMRect[];
let now: number;
let fontsReady: Promise<void>;
let resolveFonts: () => void;
let frames: Map<number, FrameRequestCallback>;
let observers: CapturingObserver[];
const measureRects = vi.fn(() => rectangles);

class CapturingObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(readonly callback: ResizeObserverCallback) { observers.push(this); }
}

function restoreProperty(target: object, key: string, descriptor?: PropertyDescriptor) {
  if (descriptor) Object.defineProperty(target, key, descriptor);
  else Reflect.deleteProperty(target, key);
}

beforeEach(() => {
  bounds = new DOMRect(20, 100, 200, 48);
  rectangles = [
    new DOMRect(20, 124, 55, 16),
    new DOMRect(60, 100.4, 30, 16),
    new DOMRect(20, 100, 40, 16),
    new DOMRect(20, 100, 0, 16),
  ];
  now = 1000;
  observers = [];
  frames = new Map();
  let frameId = 0;
  fontsReady = new Promise<void>((resolve) => { resolveFonts = resolve; });
  Object.defineProperty(document, "fonts", { configurable: true, value: { ready: fontsReady } });
  Object.defineProperty(Range.prototype, "getClientRects", { configurable: true, value: measureRects });
  Object.defineProperty(globalThis, "ResizeObserver", { configurable: true, writable: true, value: CapturingObserver });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => bounds);
  vi.spyOn(performance, "now").mockImplementation(() => now);
  vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((callback) => {
    frames.set(++frameId, callback);
    return frameId;
  });
  vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation((id) => { frames.delete(id); });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  restoreProperty(Range.prototype, "getClientRects", originalRangeRects);
  restoreProperty(document, "fonts", originalFonts);
  restoreProperty(globalThis, "ResizeObserver", originalObserver);
});

function flushFrames() {
  const callbacks = [...frames.values()];
  frames.clear();
  act(() => callbacks.forEach((callback) => callback(now)));
}

function lines(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLElement>(".chat-reveal-line")];
}

it("combines fragments on one line and covers wrapped text with contiguous bands", () => {
  const { container } = render(<ReplyReveal text={text} revealing durationMs={2600} />);
  flushFrames();
  const bands = lines(container);
  expect(bands).toHaveLength(2);
  expect(parseFloat(bands[0].style.width)).toBeGreaterThanOrEqual(70);
  let bottom = 0;
  for (const band of bands) {
    expect(parseFloat(band.style.top)).toBeCloseTo(bottom);
    expect(parseFloat(band.style.height)).toBeGreaterThan(0);
    expect(parseFloat(band.style.width)).toBeLessThanOrEqual(bounds.width);
    expect(band).toHaveAttribute("aria-hidden", "true");
    expect(band).toHaveTextContent(text);
    bottom += parseFloat(band.style.height);
  }
  expect(bottom).toBeCloseTo(bounds.height);
});

it("remeasures new wrapping while preserving the elapsed reveal clock", () => {
  const { container } = render(<ReplyReveal text={text} revealing durationMs={2600} />);
  flushFrames();
  const base = container.querySelector(".chat-reveal-layout");
  expect(lines(container)).toHaveLength(2);
  expect(parseFloat(lines(container)[0].style.animationDelay)).toBe(0);
  now += 750;
  bounds = new DOMRect(20, 100, 160, 72);
  rectangles = [
    new DOMRect(20, 100, 110, 16),
    new DOMRect(20, 124, 140, 16),
    new DOMRect(20, 148, 80, 16),
  ];
  const observer = observers[0];
  expect(observer.observe).toHaveBeenCalledWith(base);
  act(() => observer.callback([], observer as unknown as ResizeObserver));
  expect(lines(container)).toHaveLength(3);
  expect(parseFloat(lines(container)[0].style.animationDelay)).toBe(-750);
  expect(container.querySelector(".chat-reveal-layout")).toBe(base);
  expect(base).toHaveTextContent(text);
});

it("cleans up frames and observers and ignores late font or resize notifications", async () => {
  const { unmount } = render(<ReplyReveal text={text} revealing durationMs={2600} />);
  const observer = observers[0];
  const lateFrame = [...frames.values()][0];
  expect(frames.size).toBe(1);
  const callsBefore = measureRects.mock.calls.length;
  unmount();
  expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
  expect(observer.disconnect).toHaveBeenCalledTimes(1);
  expect(frames.size).toBe(0);
  await act(async () => {
    lateFrame(now);
    observer.callback([], observer as unknown as ResizeObserver);
    resolveFonts();
    await fontsReady;
  });
  expect(measureRects).toHaveBeenCalledTimes(callsBefore);
});
