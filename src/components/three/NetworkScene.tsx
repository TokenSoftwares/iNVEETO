"use client";

/* The render loop mutates three.js buffers and eased state in place, which is the
   intended R3F pattern; the React Compiler immutability rules do not apply here. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { buildTopology, smoothstep, STAGES } from "./formations";
import { storyState } from "./store";

const GROUP_COLORS = [new THREE.Color("#7d5ba6"), new THREE.Color("#9a7fc2"), new THREE.Color("#b8a3d6")];
const EMPHASIS = new THREE.Color("#4b3374");
const MINT = new THREE.Color("#55d6be");
const tmpObj = new THREE.Object3D();
const tmpColor = new THREE.Color();

const tmpVec = new THREE.Vector3();

type Props = {
  count: number;
  quality: "high" | "low";
  running: boolean;
};

export default function NetworkScene({ count, quality, running }: Props) {
  const [dpr, setDpr] = useState<[number, number]>(quality === "high" ? [1, 1.75] : [1, 1.25]);
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={dpr}
      camera={{ position: [0, 0, 10], fov: 35, near: 0.1, far: 50 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-6, -2, 3]} intensity={0.5} color="#dccfee" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 5, 2]} scale={[10, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-5, 0, 3]} scale={[3, 8, 1]} color="#f0eaf8" />
        <Lightformer form="ring" intensity={1.4} position={[4, 1, 4]} scale={2.5} color="#c8b6e2" />
      </Environment>
      <Network count={count} quality={quality} />
    </Canvas>
  );
}

function Network({ count, quality }: Omit<Props, "running">) {
  const topo = useMemo(() => buildTopology(count), [count]);
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const edges = useRef<THREE.LineSegments>(null);
  const sameEdges = useRef<THREE.LineSegments>(null);
  const spokes = useRef<THREE.LineSegments>(null);
  const hubs = useRef<(THREE.Mesh | null)[]>([null, null, null]);

  // Live (eased) state
  const live = useMemo(() => {
    const f0 = topo.formations[0];
    return {
      pos: f0.pos.slice(),
      scale: f0.scale.slice(),
      glow: f0.glow.slice(),
      mint: f0.mint.slice(),
      hubPos: f0.hubs.map((h) => new THREE.Vector3(...h)),
      hubScale: [...f0.hubScale],
      edgeOpacity: f0.edgeOpacity,
      sameOpacity: 0,
      spokeOpacity: 0,
      phase: Float32Array.from({ length: count }, (_, i) => (i * 2.399) % (Math.PI * 2)),
      pointer: new THREE.Vector3(99, 99, 0),
    };
  }, [topo, count]);

  const edgeGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(topo.edges.length * 3), 3).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, [topo]);
  const sameGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(topo.sameEdges.length * 3), 3).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, [topo]);
  const spokeGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(topo.spokes.length * 6), 3).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, [topo]);

  const sphere = useMemo(() => new THREE.SphereGeometry(1, quality === "high" ? 20 : 12, quality === "high" ? 14 : 8), [quality]);
  const hubGeom = useMemo(() => new THREE.SphereGeometry(0.42, 48, 32), []);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20);
    const t = state.clock.elapsedTime;
    // Opening moment: the network blooms out from its centre while the headline reveals.
    const b0 = Math.min(1, Math.max(0, (t - 0.1) / 2.1));
    const bloom = storyState.reduced ? 1 : 1 - Math.pow(1 - b0, 3);
    const reduced = storyState.reduced;
    const s = Math.min(STAGES - 1, Math.max(0, storyState.stage));
    const i0 = Math.floor(s);
    const i1 = Math.min(STAGES - 1, i0 + 1);
    const f = smoothstep(0.18, 0.82, s - i0);
    const A = topo.formations[i0];
    const B = topo.formations[i1];
    const k = reduced ? 1 : 1 - Math.exp(-dt * 3.4);
    const kFast = reduced ? 1 : 1 - Math.exp(-dt * 6);

    // Pointer in the network's local plane (only near hero / unified)
    const interactive = 1 - Math.min(1, Math.abs(s - 0) * 1.5) + (s > 6.4 ? smoothstep(6.4, 7, s) : 0);
    live.pointer.set(storyState.pointerX * 4.6 - storyState.offsetX, storyState.pointerY * 2.8 - storyState.offsetY, 0);

    const P = live.pos;
    for (let i = 0; i < topo.n; i++) {
      const i3 = i * 3;
      let tx = A.pos[i3] + (B.pos[i3] - A.pos[i3]) * f;
      let ty = A.pos[i3 + 1] + (B.pos[i3 + 1] - A.pos[i3 + 1]) * f;
      let tz = A.pos[i3 + 2] + (B.pos[i3 + 2] - A.pos[i3 + 2]) * f;
      if (!reduced) {
        const ph = live.phase[i];
        const drift = s < 1.5 || s > 6 ? 0.07 : 0.03;
        tx += Math.sin(t * 0.6 + ph) * drift;
        ty += Math.cos(t * 0.5 + ph * 1.3) * drift;
        tz += Math.sin(t * 0.4 + ph * 0.7) * drift;
        if (interactive > 0.01) {
          const dx = tx - live.pointer.x;
          const dy = ty - live.pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 1.6) {
            const push = (1 - d2 / 1.6) * 0.5 * interactive;
            const d = Math.sqrt(d2) || 1;
            tx += (dx / d) * push;
            ty += (dy / d) * push;
            tz += push * 0.6;
          }
        }
      }
      P[i3] += (tx - P[i3]) * k;
      P[i3 + 1] += (ty - P[i3 + 1]) * k;
      P[i3 + 2] += (tz - P[i3 + 2]) * k;
      const ts = A.scale[i] + (B.scale[i] - A.scale[i]) * f;
      live.scale[i] += (ts - live.scale[i]) * k;
      const tg = A.glow[i] + (B.glow[i] - A.glow[i]) * f;
      live.glow[i] += (tg - live.glow[i]) * kFast;

      tmpObj.position.set(P[i3], P[i3 + 1], P[i3 + 2]);
      tmpObj.scale.setScalar(0.058 * topo.size[i] * live.scale[i]);
      tmpObj.updateMatrix();
      nodes.current!.setMatrixAt(i, tmpObj.matrix);
      const tm = A.mint[i] + (B.mint[i] - A.mint[i]) * f;
      live.mint[i] += (tm - live.mint[i]) * kFast;
      tmpColor.copy(GROUP_COLORS[topo.group[i]]).lerp(EMPHASIS, live.glow[i]).lerp(MINT, live.mint[i]);
      nodes.current!.setColorAt(i, tmpColor);
    }
    nodes.current!.instanceMatrix.needsUpdate = true;
    if (nodes.current!.instanceColor) nodes.current!.instanceColor.needsUpdate = true;

    // Hubs
    let mainHub = 0;
    for (let h = 0; h < 3; h++) {
      const ta = A.hubs[h];
      const tb = B.hubs[h];
      const hv = live.hubPos[h];
      hv.x += (ta[0] + (tb[0] - ta[0]) * f - hv.x) * k;
      hv.y += (ta[1] + (tb[1] - ta[1]) * f - hv.y) * k;
      hv.z += (ta[2] + (tb[2] - ta[2]) * f - hv.z) * k;
      const sc = A.hubScale[h] + (B.hubScale[h] - A.hubScale[h]) * f;
      live.hubScale[h] += (sc - live.hubScale[h]) * k;
      if (live.hubScale[h] > live.hubScale[mainHub]) mainHub = h;
      const m = hubs.current[h];
      if (m) {
        m.position.copy(hv);
        if (!reduced) m.position.y += Math.sin(t * 0.7 + h * 2) * 0.05;
        m.scale.setScalar(live.hubScale[h]);
      }
    }

    // Edges
    live.edgeOpacity += (A.edgeOpacity + (B.edgeOpacity - A.edgeOpacity) * f - live.edgeOpacity) * k;
    const ea = edgeGeom.attributes.position as THREE.BufferAttribute;
    const E = topo.edges;
    for (let e = 0; e < E.length; e++) {
      const src = E[e] * 3;
      ea.array[e * 3] = P[src];
      ea.array[e * 3 + 1] = P[src + 1];
      ea.array[e * 3 + 2] = P[src + 2];
    }
    ea.needsUpdate = true;
    (edges.current!.material as THREE.LineBasicMaterial).opacity = live.edgeOpacity * bloom * bloom;
    edges.current!.visible = live.edgeOpacity > 0.005;

    live.sameOpacity += (A.sameOpacity + (B.sameOpacity - A.sameOpacity) * f - live.sameOpacity) * k;
    const qa = sameGeom.attributes.position as THREE.BufferAttribute;
    const SE = topo.sameEdges;
    for (let e = 0; e < SE.length; e++) {
      const src = SE[e] * 3;
      qa.array[e * 3] = P[src];
      qa.array[e * 3 + 1] = P[src + 1];
      qa.array[e * 3 + 2] = P[src + 2];
    }
    qa.needsUpdate = true;
    (sameEdges.current!.material as THREE.LineBasicMaterial).opacity = live.sameOpacity;
    sameEdges.current!.visible = live.sameOpacity > 0.005;

    // Spokes from the dominant hub to the selected segment
    live.spokeOpacity += (A.spokeOpacity + (B.spokeOpacity - A.spokeOpacity) * f - live.spokeOpacity) * k;
    const sa = spokeGeom.attributes.position as THREE.BufferAttribute;
    const hp = hubs.current[mainHub]?.position ?? live.hubPos[mainHub];
    const S = topo.spokes;
    for (let j = 0; j < S.length; j++) {
      const src = S[j] * 3;
      sa.array[j * 6] = hp.x;
      sa.array[j * 6 + 1] = hp.y;
      sa.array[j * 6 + 2] = hp.z;
      sa.array[j * 6 + 3] = P[src];
      sa.array[j * 6 + 4] = P[src + 1];
      sa.array[j * 6 + 5] = P[src + 2];
    }
    sa.needsUpdate = true;
    (spokes.current!.material as THREE.LineBasicMaterial).opacity = live.spokeOpacity;
    spokes.current!.visible = live.spokeOpacity > 0.005;

    // Hero labels: project each hub to screen space and move its DOM label there.
    const labelOpacity = (1 - smoothstep(0.05, 0.45, s)) * smoothstep(0.75, 1, bloom);
    const { width, height } = state.size;
    storyState.labelEls.forEach((el, h) => {
      const m = hubs.current[h];
      if (!el || !m) return;
      el.style.opacity = String(labelOpacity);
      el.style.visibility = labelOpacity < 0.02 ? "hidden" : "visible";
      if (labelOpacity < 0.02) return;
      m.getWorldPosition(tmpVec);
      tmpVec.project(state.camera);
      const x = (tmpVec.x * 0.5 + 0.5) * width;
      const y = (-tmpVec.y * 0.5 + 0.5) * height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });

    // Placement + gentle rotation + pointer parallax
    const o = outer.current!;
    o.position.x += (storyState.offsetX - o.position.x) * kFast;
    o.position.y += (storyState.offsetY - o.position.y) * kFast;
    const sc = storyState.scale;
    o.scale.setScalar(o.scale.x + (sc - o.scale.x) * kFast);
    if (!reduced) {
      o.rotation.y += (storyState.pointerX * 0.22 - o.rotation.y) * (1 - Math.exp(-dt * 2));
      o.rotation.x += (-storyState.pointerY * 0.14 - o.rotation.x) * (1 - Math.exp(-dt * 2));
      const spin = s < 1.2 || s > 6.5 ? 0.06 : s > 3.5 && s < 4.6 ? 0.12 : 0.015;
      inner.current!.rotation.y += dt * spin;
    }
    inner.current!.scale.setScalar(0.001 + bloom);
    if (!reduced) {
      inner.current!.rotation.z = (1 - bloom) * 0.5;
    }
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <instancedMesh ref={nodes} args={[sphere, undefined, topo.n]} frustumCulled={false}>
          <meshPhysicalMaterial roughness={0.28} metalness={0} clearcoat={1} clearcoatRoughness={0.2} envMapIntensity={0.9} />
        </instancedMesh>
        <lineSegments ref={edges} geometry={edgeGeom} frustumCulled={false}>
          <lineBasicMaterial color="#7d5ba6" transparent opacity={0.2} depthWrite={false} />
        </lineSegments>
        <lineSegments ref={sameEdges} geometry={sameGeom} frustumCulled={false}>
          <lineBasicMaterial color="#7d5ba6" transparent opacity={0} depthWrite={false} />
        </lineSegments>
        <lineSegments ref={spokes} geometry={spokeGeom} frustumCulled={false}>
          <lineBasicMaterial color="#8a6ab5" transparent opacity={0} depthWrite={false} />
        </lineSegments>
        {[0, 1, 2].map((h) => (
          <mesh
            key={h}
            ref={(m) => {
              hubs.current[h] = m;
            }}
            geometry={hubGeom}
          >
            {quality === "high" ? (
              <meshPhysicalMaterial
                transmission={1}
                thickness={0.9}
                roughness={0.12}
                ior={1.32}
                color="#f2edf9"
                attenuationColor="#b8a3d6"
                attenuationDistance={1.4}
                clearcoat={1}
                envMapIntensity={1.2}
              />
            ) : (
              <meshPhysicalMaterial color="#e8def5" roughness={0.2} clearcoat={1} transparent opacity={0.85} />
            )}
          </mesh>
        ))}
      </group>
    </group>
  );
}
