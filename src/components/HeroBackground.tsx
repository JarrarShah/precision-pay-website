// src/components/HeroBackground.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-generate stable random values outside of render to ensure purity
const PARTICLE_COUNT = 800;
const INITIAL_PARTICLES = {
  positions: new Float32Array(PARTICLE_COUNT * 3).map(() => (Math.random() - 0.5) * 10),
  velocities: new Float32Array(PARTICLE_COUNT * 3).map(() => (Math.random() - 0.5) * 0.002),
};

const INITIAL_ORBS = Array.from({ length: 4 }, () => ({
  position: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3 - 1] as [number, number, number],
  scale: 0.5 + Math.random() * 1.2,
  speed: 0.3 + Math.random() * 0.5,
  phase: Math.random() * Math.PI * 2,
}));

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = PARTICLE_COUNT;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const t = clock.getElapsedTime() * 0.15;
    const velocities = INITIAL_PARTICLES.velocities;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posAttr.array[i3] += velocities[i3] + Math.sin(t + i * 0.01) * 0.0005;
      posAttr.array[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(t + i * 0.01) * 0.0005;
      posAttr.array[i3 + 2] += velocities[i3 + 2];

      // Wrap around
      if (Math.abs(posAttr.array[i3]) > 5) posAttr.array[i3] *= -0.9;
      if (Math.abs(posAttr.array[i3 + 1]) > 5) posAttr.array[i3 + 1] *= -0.9;
      if (Math.abs(posAttr.array[i3 + 2]) > 3) posAttr.array[i3 + 2] *= -0.9;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={INITIAL_PARTICLES.positions}
          itemSize={3}
          args={[INITIAL_PARTICLES.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowOrbs() {
  const group = useRef<THREE.Group>(null);
  const orbs = INITIAL_ORBS;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const orb = orbs[i];
      if (!orb) return;
      child.position.x =
        orb.position[0] + Math.sin(t * orb.speed + orb.phase) * 1.5;
      child.position.y =
        orb.position[1] + Math.cos(t * orb.speed * 0.7 + orb.phase) * 1;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#1a3a5c" : "#2a1a4c"}
            transparent
            opacity={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div
      className="hero-canvas"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Particles />
        <GlowOrbs />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
