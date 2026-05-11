"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

function ShaderPlane({ tint = "#5b8cff" }: { tint?: string }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTint: { value: new THREE.Color(tint) },
    }),
    [tint],
  );

  useMemo(() => {
    if (typeof window === "undefined") return;
    const on = (e: MouseEvent) => {
      uniforms.uMouse.value.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", on, { passive: true });
    return () => window.removeEventListener("mousemove", on);
  }, [uniforms]);

  useFrame((s) => {
    uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec3 uTint;

          // hash + noise (iq style)
          float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
          float noise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i+vec2(1.0,0.0));
            float c = hash(i+vec2(0.0,1.0));
            float d = hash(i+vec2(1.0,1.0));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
          }
          float fbm(vec2 p){
            float v = 0.0; float a = 0.5;
            for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
            return v;
          }

          void main(){
            vec2 uv = vUv;
            vec2 p = uv - 0.5;
            p.x *= 1.8;

            float t = uTime * 0.05;
            float n = fbm(p*2.5 + vec2(t, -t*0.7));
            float n2 = fbm(p*1.2 - vec2(t*0.5, t));

            // luminous distance to mouse
            float d = length(uv - uMouse);
            float glow = smoothstep(0.55, 0.0, d) * 0.8;

            vec3 base = vec3(0.02, 0.02, 0.03);
            vec3 col = base;
            col += uTint * 0.35 * smoothstep(0.2, 0.8, n + n2 * 0.6);
            col += vec3(0.61, 0.53, 1.0) * 0.18 * smoothstep(0.4, 1.0, n2);
            col += uTint * glow;

            // vignette
            float vig = smoothstep(1.1, 0.3, length(p));
            col *= mix(0.5, 1.0, vig);

            // film grain
            float g = (hash(uv * (uTime*60.0+1.0)) - 0.5) * 0.04;
            col += g;

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export function AmbientField({
  className = "",
  tint = "#5b8cff",
}: {
  className?: string;
  tint?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ShaderPlane tint={tint} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default AmbientField;
