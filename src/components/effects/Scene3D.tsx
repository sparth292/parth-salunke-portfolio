"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function CoreOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.12;
      outerRef.current.rotation.y = t * 0.18;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.08;
      innerRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={1}>
      {/* Outer shell — lighter blue */}
      <Sphere ref={outerRef} args={[1.85, 64, 64]} scale={1.25}>
        <MeshDistortMaterial
          color="#2563eb"
          distort={0.4}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          emissive="#3b82f6"
          emissiveIntensity={0.25}
        />
      </Sphere>

      {/* Inner core — deep navy (gradient feel) */}
      <Sphere ref={innerRef} args={[1.15, 48, 48]} scale={0.95}>
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1e3a8a"
          emissiveIntensity={0.55}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>

      {/* Soft glow halo */}
      <Sphere args={[2.4, 32, 32]}>
        <meshBasicMaterial
          color="#1d4ed8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 300;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#3b82f6"
        transparent
        opacity={0.35}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} color="#0f172a" />
      <pointLight position={[8, 6, 8]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-6, -4, 4]} intensity={0.6} color="#1e40af" />
      <pointLight position={[0, 0, -5]} intensity={0.4} color="#172554" />
      <CoreOrb />
      <ParticleField />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
