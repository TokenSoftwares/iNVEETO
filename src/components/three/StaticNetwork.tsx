import { buildTopology } from "./formations";

/**
 * Static SVG rendering of the hero network (formation 0, simple perspective).
 * Shown before the WebGL scene loads, and as the fallback when WebGL is
 * unavailable or the visitor prefers reduced data.
 */
const topo = buildTopology(160);

export function StaticNetwork({ className = "" }: { className?: string }) {
  const f = topo.formations[0];
  const proj = (i: number) => {
    const x = f.pos[i * 3];
    const y = f.pos[i * 3 + 1];
    const z = f.pos[i * 3 + 2];
    const p = 10 / (10 - z);
    return { x: 300 + x * 62 * p, y: 300 - y * 62 * p, s: p };
  };
  const colors = ["#7d5ba6", "#9a7fc2", "#b8a3d6"];
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden focusable="false">
      <defs>
        <radialGradient id="hubGlass" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f0eaf8" />
          <stop offset="100%" stopColor="#c8b6e2" />
        </radialGradient>
      </defs>
      <g stroke="#7d5ba6" strokeOpacity="0.16" strokeWidth="0.8">
        {Array.from({ length: topo.edges.length / 2 }, (_, e) => {
          const a = proj(topo.edges[e * 2]);
          const b = proj(topo.edges[e * 2 + 1]);
          return <line key={e} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>
      {f.hubs.map((h, i) => {
        const p = 10 / (10 - h[2]);
        return <circle key={`h${i}`} cx={300 + h[0] * 62 * p} cy={300 - h[1] * 62 * p} r={26 * p} fill="url(#hubGlass)" opacity="0.9" />;
      })}
      {Array.from({ length: topo.n }, (_, i) => {
        const p = proj(i);
        return <circle key={i} cx={p.x} cy={p.y} r={3.4 * topo.size[i] * p.s} fill={f.mint[i] ? "#55d6be" : f.glow[i] ? "#3d2a5c" : colors[topo.group[i]]} />;
      })}
    </svg>
  );
}
