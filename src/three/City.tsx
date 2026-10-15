import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Building({ x, z, w, h, d }: { x: number; z: number; w: number; h: number; d: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const flicker = 0.6 + 0.4 * Math.sin(t * 3.7 + x * 0.3) * Math.sin(t * 2.1 + z * 0.4);
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flicker * 0.6;
  });

  return (
    <mesh ref={meshRef} position={[x, h / 2, z]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color="#1a2a3a"
        emissive="#ffcc44"
        emissiveIntensity={0.4}
        roughness={0.8}
        metalness={0.3}
      />
    </mesh>
  );
}


function NeonSign({ x, y, z, color }: { x: number; y: number; z: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7 + 0.3 * Math.sin(t * 2);
  });
  return (
    <mesh ref={ref} position={[x, y, z]}>
      <boxGeometry args={[3.5, 0.55, 0.06]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

export function City() {
  const buildings = useMemo(() => {
    const rng = (() => {
      let s = 42;
      return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    })();

    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: (rng() - 0.5) * 60,
      z: -18 + (rng() - 0.5) * 50,
      w: 1.5 + rng() * 3,
      h: 4 + rng() * 16,
      d: 1.5 + rng() * 3,
    }));
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <Building key={b.id} x={b.x} z={b.z} w={b.w} h={b.h} d={b.d} />
      ))}
      <NeonSign x={0} y={5} z={-14} color="#ff77c1" />
      <NeonSign x={0} y={3.5} z={-14} color="#5cc8ff" />
    </group>
  );
}
