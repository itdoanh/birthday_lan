import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Lake() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = -0.5 + Math.sin(t * 0.3) * 0.03;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[80, 80, 64, 64]} />
      <meshStandardMaterial
        color="#1a3a5c"
        metalness={0.9}
        roughness={0.05}
        envMapIntensity={1.2}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}
