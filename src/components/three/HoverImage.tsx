"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uHover; // 0..1
  uniform vec2 uMouse;
  uniform vec3 uAccent;

  // simple noise
  float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 toMouse = uv - uMouse;
    float dist = length(toMouse);

    // ripple displacement
    float n = noise(uv * 6.0 + uTime * 0.4);
    float ripple = sin(dist * 24.0 - uTime * 3.5) * 0.5 + 0.5;
    float strength = smoothstep(0.6, 0.0, dist) * uHover;

    vec2 disp = normalize(toMouse + 0.0001) * 0.03 * strength * ripple;
    disp += (n - 0.5) * 0.012 * uHover;

    // RGB shift on hover
    float shift = 0.006 * uHover;
    float r = texture2D(uTex, uv - disp - vec2(shift, 0.0)).r;
    float g = texture2D(uTex, uv - disp).g;
    float b = texture2D(uTex, uv - disp + vec2(shift, 0.0)).b;
    vec3 col = vec3(r, g, b);

    // accent tint
    col = mix(col, col * 0.55 + uAccent * 0.45, 0.2 * uHover);

    // vignette
    float vig = smoothstep(1.05, 0.35, length(uv - 0.5) * 1.4);
    col *= mix(0.85, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane({
  src,
  accent,
  hover,
  mouse,
}: {
  src: string;
  accent: string;
  hover: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    });
  }, [src]);

  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    const target = hover.current;
    const cur = m.uniforms.uHover.value as number;
    m.uniforms.uHover.value = cur + (target - cur) * 0.08;
    const tx = mouse.current.x;
    const ty = mouse.current.y;
    const mu = m.uniforms.uMouse.value as THREE.Vector2;
    mu.x += (tx - mu.x) * 0.12;
    mu.y += (ty - mu.y) * 0.12;
  });

  if (!texture) return null;

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{
          uTex: { value: texture },
          uTime: { value: 0 },
          uHover: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uAccent: { value: accentColor },
        }}
      />
    </mesh>
  );
}

export function HoverImage({
  src,
  accent = "#5b8cff",
  className = "",
}: {
  src: string;
  accent?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hover = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => (hover.current = 1);
    const onLeave = () => (hover.current = 0);
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Plane src={src} accent={accent} hover={hover} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HoverImage;
