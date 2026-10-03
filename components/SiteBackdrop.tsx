// A static, etched field of contours. The formations live at the viewport edges;
// an opacity mask leaves the reading column quiet without changing the palette.
// Generated on the server from fixed geometry: no animation or browser listeners.

type Formation = {
  x: number;
  y: number;
  start: number;
  step: number;
  count: number;
  phase: number;
};

const formations: Formation[] = [
  { x: 100, y: 270, start: 76, step: 19, count: 25, phase: 0.7 },
  { x: 1380, y: 980, start: 110, step: 22, count: 27, phase: 2.2 },
];

function contourPath(formation: Formation, radius: number) {
  const points = Array.from({ length: 97 }, (_, index) => {
    const angle = (index / 96) * Math.PI * 2;
    const ripple =
      1 +
      0.11 * Math.sin(angle * 3 + formation.phase) +
      0.05 * Math.cos(angle * 5 - formation.phase);
    const x =
      formation.x +
      Math.cos(angle) * radius * ripple +
      Math.sin(angle * 2 + formation.phase) * radius * 0.08;
    const y =
      formation.y +
      Math.sin(angle) * radius * ripple * 0.86 +
      Math.cos(angle * 2 - formation.phase) * radius * 0.09;

    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `${points.join(" ")} Z`;
}

// Fixed integer sequence gives sparse stippling, without repeating a tiled pattern.
function stippling() {
  let seed = 731;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  return Array.from({ length: 240 }, (_, index) => {
    const formation = formations[index % formations.length];
    const angle = next() * Math.PI * 2;
    const radius = 180 + next() * 440;
    const x = formation.x + Math.cos(angle) * radius;
    const y = formation.y + Math.sin(angle) * radius * 0.86;
    const r = 0.45 + next() * 0.55;

    return { x, y, r };
  }).filter(({ x, y }) => x > 0 && x < 1440 && y > 0 && y < 1200);
}

const dots = stippling();

export function SiteBackdrop() {
  return (
    <div aria-hidden="true" className="site-backdrop">
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="none"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="backdrop-center-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="white" />
            <stop offset="0.22" stopColor="white" stopOpacity="0.7" />
            <stop offset="0.42" stopColor="white" stopOpacity="0.12" />
            <stop offset="0.58" stopColor="white" stopOpacity="0.12" />
            <stop offset="0.78" stopColor="white" stopOpacity="0.7" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <mask id="backdrop-reading-space">
            <rect width="1440" height="1200" fill="url(#backdrop-center-fade)" />
          </mask>
        </defs>

        <g className="site-backdrop-contours" mask="url(#backdrop-reading-space)" fill="none" stroke="currentColor">
          {formations.map((formation, formationIndex) =>
            Array.from({ length: formation.count }, (_, index) => (
              <path
                key={`${formationIndex}-${index}`}
                d={contourPath(formation, formation.start + formation.step * index)}
                strokeOpacity={index % 5 === 0 ? 0.3 : 0.17}
                strokeWidth={index % 5 === 0 ? 0.85 : 0.65}
                vectorEffect="non-scaling-stroke"
              />
            )),
          )}
        </g>

        <g className="site-backdrop-stippling" mask="url(#backdrop-reading-space)" fill="currentColor" opacity="0.2">
          {dots.map((dot, index) => (
            <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} />
          ))}
        </g>
      </svg>
    </div>
  );
}
