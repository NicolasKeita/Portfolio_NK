import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '../../types';

interface SkillsSphereProps {
  skills: Skill[];
  activeId: string | null;
  onSelect: (skill: Skill) => void;
}

/**
 * Distributes N points on a sphere evenly using the Fibonacci sphere algorithm.
 */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function SkillTag({
  position,
  label,
  iconId,
  isActive,
  onHover,
  onClick,
}: {
  position: THREE.Vector3;
  label: string;
  iconId: string;
  isActive: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = isActive || hovered ? '#60a5fa' : '#94a3b8';

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Smooth lerp toward target scale
    const target = isActive || hovered ? 1.25 : 0.9;
    meshRef.current.scale.lerp(
      new THREE.Vector3(target, target, target),
      delta * 4
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={0.9}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Invisible clickable sphere */}
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />

      {/* Floating label */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.22}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
          maxWidth={1.8}
          textAlign="center"
        >
          {label}
        </Text>
      </Float>
    </mesh>
  );
}

function SphereContent({
  skills,
  activeId,
  onSelect,
}: SkillsSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(
    () => fibonacciSphere(skills.length, 2.8),
    [skills.length]
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillTag
          key={skill.id}
          position={positions[i]}
          label={skill.label}
          iconId={skill.icon}
          isActive={activeId === skill.id}
          onHover={() => {}}
          onClick={() => onSelect(skill)}
        />
      ))}
    </group>
  );
}

export function SkillsSphere({ skills, activeId, onSelect }: SkillsSphereProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', minHeight: 400 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-5, -3, 2]} intensity={0.4} color="#a78bfa" />
      <SphereContent
        skills={skills}
        activeId={activeId}
        onSelect={onSelect}
      />
    </Canvas>
  );
}