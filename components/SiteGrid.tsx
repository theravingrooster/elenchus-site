// DESIGN.md: the same graph grid at ~8% ink behind Home, Method, Examine, and Who (#25).
// Server-rendered and fixed to the viewport, so it stays mounted and visible while
// scrolling, including back up to the top of Home. It never fades to zero.
export function SiteGrid() {
  return <div aria-hidden="true" className="site-grid" />;
}
