import { useMemo, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '../../types';

type LayoutPosition = { x: number; y: number };

/* ─── Props ─── */
interface NebulaConstellationProps {
  skills: Skill[];
  layoutPositions?: Record<string, LayoutPosition>;
  activeId: string | null;
  hoveredId: string | null;
  onSelect: (skill: Skill) => void;
  onHover: (id: string | null) => void;
  isCenterHovered: boolean;
  onCenterHover: (v: boolean) => void;
  centerLabel: string;
  centerSub?: string;
}

/* ─── Particules ─── */
const STAR_COUNT = 733;

function StarField() {
  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, []);

  return (
    <Points
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#7dd3fc"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.42}
      />
    </Points>
  );
}

function NebulaVeil() {
  return (
    <group position={[0, 0, -1.8]}>
      <mesh position={[-2.8, 0.9, -0.8]}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.07} depthWrite={false} />
      </mesh>
      <mesh position={[2.9, -0.8, -1.2]}>
        <sphereGeometry args={[3.1, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <mesh position={[0.1, 0.2, -1.8]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.045} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─── Signal statique sur les lignes actives ─── */
function SignalDot({
  start,
  end,
  active,
}: {
  start: [number, number, number];
  end: [number, number, number];
  active: boolean;
}) {
  if (!active) return null;
  const position = new THREE.Vector3(...start).lerp(new THREE.Vector3(...end), 0.62);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.92} />
    </mesh>
  );
}

function AnchorNode({
  position,
  active,
}: {
  position: [number, number, number];
  active: boolean;
}) {
  return (
    <group position={position} scale={active ? 1.16 : 1}>
      <mesh>
        <sphereGeometry args={[active ? 0.22 : 0.16, 16, 16]} />
        <meshBasicMaterial color={active ? '#67e8f9' : '#93c5fd'} transparent opacity={active ? 0.86 : 0.48} />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.48 : 0.34, 16, 16]} />
        <meshBasicMaterial color={active ? '#22d3ee' : '#60a5fa'} transparent opacity={active ? 0.14 : 0.08} depthWrite={false} />
      </mesh>
    </group>
  );
}

function CenterCore({ active }: { active: boolean }) {
  return (
    <group position={[0, 0, -0.08]} scale={active ? 1.08 : 1}>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={active ? 0.7 : 0.46} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.78, 0.014, 12, 96]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.42} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={active ? 0.12 : 0.07} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─── Scene intérieure ─── */
function Scene({
  skills,
  layoutPositions,
  activeId,
  hoveredId,
  isCenterHovered,
}: NebulaConstellationProps) {
  const { viewport } = useThree();
  const centerPos: [number, number, number] = [0, 0, 0];
  const positions = useMemo(() => {
    return skills.map((skill, i) => {
      const fallbackAngle = (i / skills.length) * Math.PI * 2;
      const fallback = {
        x: Math.cos(fallbackAngle) * 30,
        y: Math.sin(fallbackAngle) * 30,
      };
      const position = layoutPositions?.[skill.id] ?? fallback;
      return [
        (position.x / 100) * viewport.width,
        -(position.y / 100) * viewport.height,
        -0.45 + Math.sin(i * 1.7) * 0.12,
      ] as [number, number, number];
    });
  }, [skills, layoutPositions, viewport.width, viewport.height]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color="#a78bfa" />

      <NebulaVeil />
      <StarField />
      <CenterCore active={isCenterHovered || hoveredId !== null} />

      {/* Lignes + pulses */}
      {skills.map((skill, i) => {
        const end = positions[i];
        const hl = isCenterHovered || hoveredId === skill.id || activeId === skill.id;
        const next = positions[(i + 1) % positions.length];
        return (
          <group key={skill.id}>
            <Line
              points={[end, next]}
              color={hl || activeId === skills[(i + 1) % skills.length].id ? '#60a5fa' : '#1e3a5f'}
              lineWidth={hl ? 1.3 : 0.6}
              transparent
              opacity={hl ? 0.3 : 0.1}
            />
            <Line
              points={[centerPos, end]}
              color={hl ? '#67e8f9' : '#334155'}
              lineWidth={hl ? 3.3 : 1.05}
              transparent
              opacity={hl ? 0.76 : 0.17}
            />
            <AnchorNode position={end} active={hl} />
            <SignalDot start={centerPos} end={end} active={hl} />
          </group>
        );
      })}
    </>
  );
}

/* ─── Export ─── */
export function NebulaConstellation(props: NebulaConstellationProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 50 }}
      dpr={[1, 1.25]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', minHeight: 760 }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
