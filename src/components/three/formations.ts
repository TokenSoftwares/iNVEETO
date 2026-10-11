/**
 * Formation targets for the "connected universe".
 *
 * The same N nodes travel through eight arrangements as the visitor scrolls:
 *   0 hero      – a living network with three module lobes
 *   1 problem   – scattered, disconnected data
 *   2 organize  – three tidy address-book clusters (tags)
 *   3 select    – a highlighted segment steps forward, the rest recede
 *   4 invite    – the segment orbits the event hub
 *   5 confirm   – guests settle into an attendance board
 *   6 engage    – communication rings radiate outward
 *   7 unified   – all three modules linked into one system
 *
 * Each formation gives every node a position, a scale and an emphasis (0..1).
 */

export const STAGES = 8;

export type Formation = {
  pos: Float32Array; // N*3
  scale: Float32Array; // N
  glow: Float32Array; // N, 0 = base color, 1 = deep brand purple
  mint: Float32Array; // N, 0..1 toward the logo mint (hero figures, checked-in guests)
  hubs: [number, number, number][]; // 3 module hubs
  hubScale: [number, number, number];
  edgeOpacity: number;
  /** links between nodes of the same module only (tidy clusters) */
  sameOpacity: number;
  spokeOpacity: number;
};

/** Deterministic PRNG so server/client and every reload agree. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
function fib(i: number, n: number): [number, number, number] {
  const y = 1 - (i / Math.max(1, n - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const th = GOLDEN * i;
  return [Math.cos(th) * r, y, Math.sin(th) * r];
}

export type Topology = {
  n: number;
  group: Uint8Array; // 0 address book, 1 events, 2 campaigns
  selected: Uint8Array; // part of the demo segment
  checkedIn: Uint8Array; // part of the segment that checks in
  size: Float32Array; // per-node size variance
  edges: Uint16Array; // pairs
  sameEdges: Uint16Array; // pairs within one module
  spokes: Uint16Array; // selected node indices (hub → node lines)
  formations: Formation[];
};

export function buildTopology(n: number): Topology {
  const rnd = mulberry32(20190508); // iNVEETO's site launch date as the seed
  const group = new Uint8Array(n);
  const selected = new Uint8Array(n);
  const checkedIn = new Uint8Array(n);
  const size = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    group[i] = i % 3;
    size[i] = 0.55 + Math.pow(rnd(), 2.2) * 1.25;
  }
  // ~16% of nodes form the selected segment, biased to the address-book lobe.
  const selIdx: number[] = [];
  for (let i = 0; i < n; i++) {
    const p = group[i] === 0 ? 0.3 : 0.09;
    if (rnd() < p) {
      selected[i] = 1;
      selIdx.push(i);
    }
  }
  selIdx.forEach((idx, k) => {
    if (k / selIdx.length < 0.72) checkedIn[idx] = 1;
  });

  const lobes: [number, number, number][] = [
    [-0.9, 0.55, 0.3],
    [1.0, 0.35, -0.2],
    [0.05, -0.95, 0.25],
  ];

  const F: Formation[] = [];
  const make = (): Formation => ({
    pos: new Float32Array(n * 3),
    scale: new Float32Array(n).fill(1),
    glow: new Float32Array(n),
    mint: new Float32Array(n),
    hubs: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    hubScale: [1, 1, 1],
    edgeOpacity: 0,
    sameOpacity: 0,
    spokeOpacity: 0,
  });

  // 0 · hero network
  {
    const f = make();
    for (let i = 0; i < n; i++) {
      const [x, y, z] = fib(i, n);
      const r = 2.3 * (0.72 + rnd() * 0.42);
      const l = lobes[group[i]];
      const pull = 0.42;
      f.pos[i * 3] = x * r * (1 - pull) + l[0] * 2.1 * pull;
      f.pos[i * 3 + 1] = y * r * (1 - pull) + l[1] * 2.1 * pull;
      f.pos[i * 3 + 2] = z * r * (1 - pull) + l[2] * 2.1 * pull;
      const r2 = rnd();
      f.glow[i] = r2 < 0.06 ? 1 : 0;
      f.mint[i] = r2 > 0.955 ? 1 : 0;
    }
    f.hubs = lobes.map((l) => [l[0] * 1.75, l[1] * 1.75, l[2] * 1.75]) as Formation["hubs"];
    f.hubScale = [1, 1, 1];
    f.edgeOpacity = 0.22;
    F.push(f);
  }

  // 1 · problem: scattered, disconnected
  {
    const f = make();
    for (let i = 0; i < n; i++) {
      f.pos[i * 3] = (rnd() - 0.5) * 9.5;
      f.pos[i * 3 + 1] = (rnd() - 0.5) * 6;
      f.pos[i * 3 + 2] = (rnd() - 0.8) * 4;
      f.scale[i] = 0.8;
    }
    f.hubs = [
      [-3.2, 2, -2],
      [3, -1.6, -2.5],
      [0.5, 2.6, -3],
    ];
    f.hubScale = [0.45, 0.45, 0.45];
    f.edgeOpacity = 0.0;
    F.push(f);
  }

  // 2 · organize: three neat clusters (tags)
  const clusterC: [number, number, number][] = [
    [-1.3, 0.85, 0],
    [1.3, 0.85, 0],
    [0, -1.35, 0],
  ];
  {
    const f = make();
    const counts = [0, 0, 0];
    const totals = [0, 0, 0];
    for (let i = 0; i < n; i++) totals[group[i]]++;
    for (let i = 0; i < n; i++) {
      const g = group[i];
      const [x, y, z] = fib(counts[g]++, totals[g]);
      const c = clusterC[g];
      const r = 0.85;
      f.pos[i * 3] = c[0] + x * r;
      f.pos[i * 3 + 1] = c[1] + y * r;
      f.pos[i * 3 + 2] = c[2] + z * r;
      f.scale[i] = 0.85;
    }
    f.hubs = clusterC.map((c) => [c[0], c[1], c[2]]) as Formation["hubs"];
    f.hubScale = [0.9, 0.9, 0.9];
    f.edgeOpacity = 0;
    f.sameOpacity = 0.2;
    F.push(f);
  }

  // 3 · select: segment steps forward into a ring, others recede
  {
    const f = make();
    const base = F[2];
    let k = 0;
    const total = selIdx.length;
    for (let i = 0; i < n; i++) {
      if (selected[i]) {
        const a = (k++ / total) * Math.PI * 2;
        const rr = 1.55 + (k % 3) * 0.28;
        f.pos[i * 3] = Math.cos(a) * rr;
        f.pos[i * 3 + 1] = Math.sin(a) * rr * 0.92;
        f.pos[i * 3 + 2] = 1.2 + Math.sin(a * 3) * 0.25;
        f.scale[i] = 1.15;
        f.glow[i] = 1;
      } else {
        f.pos[i * 3] = base.pos[i * 3] * 1.25;
        f.pos[i * 3 + 1] = base.pos[i * 3 + 1] * 1.25;
        f.pos[i * 3 + 2] = base.pos[i * 3 + 2] - 2.6;
        f.scale[i] = 0.55;
      }
    }
    f.hubs = [
      [0, 0, 1.2],
      [2.6, 1.8, -2.6],
      [-2.6, -1.8, -2.6],
    ];
    f.hubScale = [0.7, 0.4, 0.4];
    f.edgeOpacity = 0;
    f.sameOpacity = 0.04;
    F.push(f);
  }

  // 4 · invite: segment orbits the event hub on a tilted ring
  {
    const f = make();
    let k = 0;
    const total = selIdx.length;
    for (let i = 0; i < n; i++) {
      if (selected[i]) {
        const a = (k++ / total) * Math.PI * 2;
        const rr = 2.05;
        f.pos[i * 3] = Math.cos(a) * rr;
        f.pos[i * 3 + 1] = Math.sin(a) * rr * 0.42;
        f.pos[i * 3 + 2] = Math.sin(a) * rr * 0.85;
        f.scale[i] = 1.1;
        f.glow[i] = 1;
      } else {
        const [x, y, z] = fib(i, n);
        f.pos[i * 3] = x * 5.2;
        f.pos[i * 3 + 1] = y * 3.4;
        f.pos[i * 3 + 2] = z * 2 - 4;
        f.scale[i] = 0.45;
      }
    }
    f.hubs = [
      [0, 0, 0],
      [3.4, 2.2, -3],
      [-3.4, -2.2, -3],
    ];
    f.hubScale = [1.65, 0.35, 0.35];
    f.edgeOpacity = 0;
    f.spokeOpacity = 0.32;
    F.push(f);
  }

  // 5 · confirm: segment settles into an attendance board
  {
    const f = make();
    const cols = 8;
    let k = 0;
    const total = selIdx.length;
    const rows = Math.ceil(total / cols);
    for (let i = 0; i < n; i++) {
      if (selected[i]) {
        const c = k % cols;
        const r = Math.floor(k / cols);
        k++;
        f.pos[i * 3] = (c - (cols - 1) / 2) * 0.48;
        f.pos[i * 3 + 1] = ((rows - 1) / 2 - r) * 0.48;
        f.pos[i * 3 + 2] = 0.6;
        f.scale[i] = checkedIn[i] ? 1.25 : 0.85;
        f.mint[i] = checkedIn[i] ? 1 : 0;
      } else {
        const [x, y, z] = fib(i, n);
        f.pos[i * 3] = x * 5.6;
        f.pos[i * 3 + 1] = y * 3.6;
        f.pos[i * 3 + 2] = z * 2 - 4.5;
        f.scale[i] = 0.4;
      }
    }
    f.hubs = [
      [0, -((rows + 1) / 2) * 0.48 - 0.55, 0.6],
      [3.4, 2.4, -3],
      [-3.4, -2.4, -3],
    ];
    f.hubScale = [0.55, 0.3, 0.3];
    f.edgeOpacity = 0;
    f.spokeOpacity = 0.12;
    F.push(f);
  }

  // 6 · engage: concentric rings (segments) radiating from the campaign hub
  {
    const f = make();
    const rings = [0.85, 1.4, 1.95, 2.5];
    const per = Math.ceil(n / rings.length);
    for (let i = 0; i < n; i++) {
      const ring = Math.min(rings.length - 1, Math.floor(i / per));
      const idx = i - ring * per;
      const a = (idx / per) * Math.PI * 2 + ring * 0.4;
      const rr = rings[ring] + (rnd() - 0.5) * 0.12;
      f.pos[i * 3] = Math.cos(a) * rr;
      f.pos[i * 3 + 1] = Math.sin(a) * rr;
      f.pos[i * 3 + 2] = -ring * 0.35;
      f.scale[i] = 0.9 - ring * 0.1;
      f.glow[i] = selected[i] ? 1 : 0;
    }
    f.hubs = [
      [3.2, 2.4, -3],
      [-3.2, 2.4, -3],
      [0, 0, 0.3],
    ];
    f.hubScale = [0.3, 0.3, 1.2];
    f.edgeOpacity = 0;
    f.spokeOpacity = 0.14;
    F.push(f);
  }

  // 7 · unified: three linked module clusters around one centre
  {
    const f = make();
    const tri: [number, number, number][] = [
      [-1.75, 1.05, 0],
      [1.75, 1.05, 0],
      [0, -1.95, 0],
    ];
    const counts = [0, 0, 0];
    const totals = [0, 0, 0];
    for (let i = 0; i < n; i++) totals[group[i]]++;
    for (let i = 0; i < n; i++) {
      const g = group[i];
      const [x, y, z] = fib(counts[g]++, totals[g]);
      const r = 0.95 + rnd() * 0.25;
      f.pos[i * 3] = tri[g][0] + x * r;
      f.pos[i * 3 + 1] = tri[g][1] + y * r;
      f.pos[i * 3 + 2] = tri[g][2] + z * r;
      const r3 = rnd();
      f.glow[i] = r3 < 0.07 ? 1 : 0;
      f.mint[i] = r3 > 0.95 ? 1 : 0;
    }
    f.hubs = tri;
    f.hubScale = [1.05, 1.05, 1.05];
    f.edgeOpacity = 0.03;
    f.sameOpacity = 0.22;
    f.spokeOpacity = 0;
    F.push(f);
  }

  // Edges: each node to its 2 nearest neighbours in the hero network, plus
  // a sparse set of long links between lobes.
  const pairs: number[] = [];
  const P = F[0].pos;
  for (let i = 0; i < n; i++) {
    let b1 = -1,
      b2 = -1,
      d1 = Infinity,
      d2 = Infinity;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const dx = P[i * 3] - P[j * 3];
      const dy = P[i * 3 + 1] - P[j * 3 + 1];
      const dz = P[i * 3 + 2] - P[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < d1) {
        d2 = d1;
        b2 = b1;
        d1 = d;
        b1 = j;
      } else if (d < d2) {
        d2 = d;
        b2 = j;
      }
    }
    if (b1 > i) pairs.push(i, b1);
    if (b2 > i) pairs.push(i, b2);
    if (rnd() < 0.035) pairs.push(i, Math.floor(rnd() * n));
  }

  // Same-module edges: 2 nearest neighbours within the module, measured in the organize formation.
  const same: number[] = [];
  const Q = F[2].pos;
  for (let i = 0; i < n; i++) {
    let b1 = -1,
      b2 = -1,
      d1 = Infinity,
      d2 = Infinity;
    for (let j = 0; j < n; j++) {
      if (j === i || group[j] !== group[i]) continue;
      const dx = Q[i * 3] - Q[j * 3];
      const dy = Q[i * 3 + 1] - Q[j * 3 + 1];
      const dz = Q[i * 3 + 2] - Q[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < d1) {
        d2 = d1;
        b2 = b1;
        d1 = d;
        b1 = j;
      } else if (d < d2) {
        d2 = d;
        b2 = j;
      }
    }
    if (b1 > i) same.push(i, b1);
    if (b2 > i) same.push(i, b2);
  }

  return {
    n,
    group,
    sameEdges: Uint16Array.from(same),
    selected,
    checkedIn,
    size,
    edges: Uint16Array.from(pairs),
    spokes: Uint16Array.from(selIdx),
    formations: F,
  };
}

export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
