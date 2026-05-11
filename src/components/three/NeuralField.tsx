"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const NODE_COUNT = 220;
const MAX_LINK_DIST = 1.4;

function Nodes() {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const cursor = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();

  // Persistent buffers
  const data = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    const base = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.9;
      const y = r * Math.cos(phi) * 0.55;
      const z = r * Math.sin(phi) * Math.sin(theta) * 0.9 - 4;
      positions[i * 3] = base[i * 3] = x;
      positions[i * 3 + 1] = base[i * 3 + 1] = y;
      positions[i * 3 + 2] = base[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const linePositions = new Float32Array(NODE_COUNT * NODE_COUNT * 3 * 2);
    const lineColors = new Float32Array(NODE_COUNT * NODE_COUNT * 3 * 2);
    return { positions, velocities, base, linePositions, lineColors };
  }, []);

  // Listen for mouse move
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const posAttr = points.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;

    const cx = cursor.current.x * 4;
    const cy = cursor.current.y * 2.5;

    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      // gentle orbital drift
      data.positions[ix] += data.velocities[ix] + Math.sin(t * 0.5 + i) * 0.0008;
      data.positions[ix + 1] += data.velocities[ix + 1] + Math.cos(t * 0.4 + i * 1.3) * 0.0008;
      data.positions[ix + 2] += data.velocities[ix + 2];

      // soft pull toward base
      data.positions[ix] += (data.base[ix] - data.positions[ix]) * 0.004;
      data.positions[ix + 1] += (data.base[ix + 1] - data.positions[ix + 1]) * 0.004;
      data.positions[ix + 2] += (data.base[ix + 2] - data.positions[ix + 2]) * 0.004;

      // cursor reactive push
      const dx = data.positions[ix] - cx;
      const dy = data.positions[ix + 1] - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 < 9) {
        const f = (1 - d2 / 9) * 0.025;
        data.positions[ix] += dx * f;
        data.positions[ix + 1] += dy * f;
      }
    }
    posAttr.array = data.positions;
    posAttr.needsUpdate = true;

    // Build links
    let lp = 0;
    let lc = 0;
    const linkPos = data.linePositions;
    const linkCol = data.lineColors;
    const max2 = MAX_LINK_DIST * MAX_LINK_DIST;

    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      const xi = data.positions[ix];
      const yi = data.positions[ix + 1];
      const zi = data.positions[ix + 2];
      // limit fan-out for perf
      for (let j = i + 1; j < Math.min(i + 18, NODE_COUNT); j++) {
        const jx = j * 3;
        const dx = xi - data.positions[jx];
        const dy = yi - data.positions[jx + 1];
        const dz = zi - data.positions[jx + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < max2) {
          const alpha = 1 - d2 / max2;
          linkPos[lp++] = xi;
          linkPos[lp++] = yi;
          linkPos[lp++] = zi;
          linkPos[lp++] = data.positions[jx];
          linkPos[lp++] = data.positions[jx + 1];
          linkPos[lp++] = data.positions[jx + 2];

          // blend electric blue -> violet by depth
          const tBlend = Math.min(1, Math.max(0, (zi + 6) / 8));
          const r = 0.36 + 0.24 * tBlend;
          const g = 0.55 - 0.1 * tBlend;
          const b = 1.0;
          linkCol[lc++] = r * alpha;
          linkCol[lc++] = g * alpha;
          linkCol[lc++] = b * alpha;
          linkCol[lc++] = r * alpha;
          linkCol[lc++] = g * alpha;
          linkCol[lc++] = b * alpha;
        }
      }
    }

    const lineGeo = lines.current?.geometry;
    if (lineGeo) {
      const lPos = lineGeo.attributes.position as THREE.BufferAttribute;
      const lCol = lineGeo.attributes.color as THREE.BufferAttribute;
      lPos.array = linkPos;
      lCol.array = linkCol;
      lPos.needsUpdate = true;
      lCol.needsUpdate = true;
      lineGeo.setDrawRange(0, lp / 3);
    }

    // subtle rotation
    if (points.current) {
      points.current.rotation.y = Math.sin(t * 0.05) * 0.15 + cursor.current.x * 0.15;
      points.current.rotation.x = cursor.current.y * 0.08;
    }
    if (lines.current) {
      lines.current.rotation.copy(points.current!.rotation);
    }
  });

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={data.positions}
            itemSize={3}
            args={[data.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          color="#cfd8ff"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.linePositions.length / 3}
            array={data.linePositions}
            itemSize={3}
            args={[data.linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={data.lineColors.length / 3}
            array={data.lineColors}
            itemSize={3}
            args={[data.lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function HoloIcosa() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.22;
    ref.current.position.y = Math.sin(t * 0.6) * 0.2;
  });
  return (
    <mesh ref={ref} position={[2.6, 0.2, -1]}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshBasicMaterial
        color="#5b8cff"
        wireframe
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function NeuralField({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050507"]} />
        <fog attach="fog" args={["#050507", 5, 14]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Nodes />
          <HoloIcosa />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default NeuralField;
