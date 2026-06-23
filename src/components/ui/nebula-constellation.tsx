import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { Skill } from '../../types';

/* ─── Props ─── */
interface NebulaConstellationProps {
  skills: Skill[];
  activeId: string | null;
  hoveredId: string | null;
  onSelect: (skill: Skill) => void;
  onHover: (id: string | null) => void;
  isCenterHovered: boolean;
  onCenterHover: (v: boolean) => void;
  centerLabel: string;
  centerSub?: string;
}

/* ─── Positions 3D en éventail face caméra ─── */
function computePositions(count: number, radius: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / (count - 1)) * Math.PI - Math.PI / 2;
    positions.push([
      Math.sin(angle) * radius,
      Math.cos(angle) * radius * 0.55,
      -0.4,
    ]);
  }
  return positions;
}

/* ─── Particules ─── */
function StarField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(4000);
    for (let i = 0; i < 4000; i++) arr[i] = (Math.random() - 0.5) * 20;
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    ref.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1 +
      state.pointer.y * 0.05;
    ref.current.rotation.z =
      Math.cos(state.clock.getElapsedTime() * 0.005) * 0.05 +
      state.pointer.x * 0.05;
  });

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/* ─── Pulse lumineux le long d'une ligne ─── */
function PulseLine({
  start,
  end,
  active,
}: {
  start: [number, number, number];
  end: [number, number, number];
  active: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (active) {
      progress.current += delta * 1.2;
      if (progress.current > 1) progress.current = 0;
    } else {
      progress.current = 0;
    }
    ref.current.position.lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      progress.current,
    );
  });

  if (!active) return null;

  return (
    <mesh ref={ref} position={start}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
    </mesh>
  );
}

/* ─── Scene intérieure ─── */
function Scene({
  skills,
  activeId,
  hoveredId,
  onSelect,
  onHover,
  isCenterHovered,
  onCenterHover,
  centerLabel,
  centerSub,
}: NebulaConstellationProps) {
  const centerPos: [number, number, number] = [0, 0, 0];
  const positions = useMemo(
    () => computePositions(skills.length, 3.8),
    [skills.length],
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color="#a78bfa" />

      <StarField />

      {/* Lignes + pulses */}
      {skills.map((skill, i) => {
        const end = positions[i];
        const hl = isCenterHovered || hoveredId === skill.id;
        return (
          <group key={skill.id}>
            <Line
              points={[centerPos, end]}
              color={hl ? '#22d3ee' : '#1e293b'}
              lineWidth={hl ? 2.5 : 0.6}
              transparent
              opacity={hl ? 0.9 : 0.15}
            />
            <PulseLine start={centerPos} end={end} active={hl} />
          </group>
        );
      })}

      {/* Noyau central */}
      <Html
        position={centerPos}
        transform
        distanceFactor={5}
        center
        sprite
      >
        <div
          onMouseEnter={() => onCenterHover(true)}
          onMouseLeave={() => onCenterHover(false)}
          className={`p-5 rounded-3xl border backdrop-blur-xl text-center cursor-default transition-all duration-500 min-w-[160px] ${
            isCenterHovered
              ? 'border-cyan-400/60 bg-slate-950/90 shadow-[0_0_40px_rgba(34,211,238,0.3)] scale-105'
              : 'border-slate-800 bg-slate-950/60 shadow-2xl'
          }`}
        >
          {centerSub && (
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-1">
              {centerSub}
            </div>
          )}
          <div className="text-sm font-extrabold text-white whitespace-nowrap tracking-tight">
            {centerLabel}
          </div>
        </div>
      </Html>

      {/* Badges compétences */}
      {skills.map((skill, i) => {
        const pos = positions[i];
        const isH = hoveredId === skill.id;

        return (
          <Html
            key={skill.id}
            position={pos}
            transform
            distanceFactor={5}
            center
            sprite
          >
            <button
              onMouseEnter={() => {
                onHover(skill.id);
                onSelect(skill);
              }}
              onMouseLeave={() => onHover(null)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 w-[88px] ${
                isH
                  ? 'border-cyan-400/50 bg-slate-900/70 shadow-[0_0_20px_rgba(34,211,238,0.2)] scale-110'
                  : isCenterHovered
                    ? 'border-cyan-400/15 bg-slate-900/40'
                    : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              <svg className="w-5 h-5 stroke-white/70 fill-none stroke-[1.8]">
                <use href={`#${skill.icon}`} />
              </svg>
              <span
                className={`text-[10px] font-medium leading-tight text-center ${
                  isH
                    ? 'text-cyan-300'
                    : isCenterHovered
                      ? 'text-cyan-200/50'
                      : 'text-white/60'
                }`}
              >
                {skill.label}
              </span>
            </button>
          </Html>
        );
      })}

      {/* Bloom */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          height={300}
          intensity={1.2}
        />
      </EffectComposer>
    </>
  );
}

/* ─── Export ─── */
export function NebulaConstellation(props: NebulaConstellationProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', minHeight: 500 }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}