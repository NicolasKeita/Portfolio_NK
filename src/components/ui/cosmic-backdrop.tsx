import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

const STAR_COUNT = 900;
const DUST_COUNT = 320;
const CONSTELLATION_COUNT = 18;

function CosmicStars() {
  const farStars = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 32;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = -Math.random() * 14 - 1;
    }
    return arr;
  }, []);

  const dust = useMemo(() => {
    const arr = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const band = Math.sin(i * 0.32) * 1.8;
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8 + band;
      arr[i * 3 + 2] = -Math.random() * 8 - 2;
    }
    return arr;
  }, []);

  return (
    <>
      <Points positions={farStars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#dbeafe"
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          opacity={0.62}
        />
      </Points>
      <Points positions={dust} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          opacity={0.2}
        />
      </Points>
    </>
  );
}

function NebulaClouds() {
  return (
    <group position={[0, 0, -5]}>
      <mesh position={[-4.4, 1.8, 0]}>
        <sphereGeometry args={[3.1, 32, 32]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.14} depthWrite={false} />
      </mesh>
      <mesh position={[3.8, -1.2, -0.8]}>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[0.8, 2.2, -1.4]}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </group>
  );
}

function AmbientConstellations() {
  const nodes = useMemo(() => {
    return Array.from({ length: CONSTELLATION_COUNT }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      return new THREE.Vector3(
        side * (3.2 + Math.random() * 5.6),
        (Math.random() - 0.5) * 7.4,
        -2.5 - Math.random() * 4,
      );
    });
  }, []);

  const links = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      if (i % 3 !== 1) pairs.push([nodes[i], nodes[i + 1]]);
    }
    return pairs;
  }, [nodes]);

  return (
    <group>
      {links.map(([a, b], i) => (
        <Line
          key={`line-${i}`}
          points={[a, b]}
          color={i % 2 ? '#38bdf8' : '#818cf8'}
          transparent
          opacity={0.1}
          lineWidth={0.55}
        />
      ))}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node}>
          <sphereGeometry args={[i % 5 === 0 ? 0.055 : 0.035, 12, 12]} />
          <meshBasicMaterial color={i % 2 ? '#67e8f9' : '#a5b4fc'} transparent opacity={0.48} />
        </mesh>
      ))}
    </group>
  );
}

function BackdropScene() {
  return (
    <>
      <color attach="background" args={['#050816']} />
      <ambientLight intensity={0.22} />
      <NebulaClouds />
      <CosmicStars />
      <AmbientConstellations />
    </>
  );
}

export function CosmicBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#050816]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 58 }}
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <BackdropScene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.08),transparent_38%),linear-gradient(180deg,rgba(5,8,22,0.04),rgba(5,8,22,0.6)_70%,rgba(5,8,22,0.86))]" />
    </div>
  );
}
