import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from './Stars';
import * as THREE from 'three';

export function Atmosphere() {
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!moonRef.current) return;
    moonRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 30;
    moonRef.current.position.z = Math.cos(state.clock.getElapsedTime() * 0.05) * 30 - 40;
    moonRef.current.position.y = 25;
  });

  return (
    <>
      {/* Night sky */}
      <color attach="background" args={['#050a18']} />

      {/* Fog */}
      <fog attach="fog" args={['#0a1428', 30, 120]} />

      {/* Moon */}
      <mesh ref={moonRef} position={[30, 25, -40]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial color="#fef9c3" emissive="#fef9c3" emissiveIntensity={0.6} roughness={0.9} />
      </mesh>
      <pointLight position={[30, 25, -40]} color="#fef9c3" intensity={4} distance={150} decay={1.5} />

      {/* Ambient */}
      <ambientLight color="#1a2a5a" intensity={0.6} />

      {/* Hemisphere */}
      <hemisphereLight
        color="#1a3a6a"
        groundColor="#0a0a0a"
        intensity={0.8}
      />

      {/* Stars */}
      <Stars />
    </>
  );
}
