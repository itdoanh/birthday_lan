import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CandleProps {
  position: [number, number, number];
}

function Candle({ position }: CandleProps) {
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!flameRef.current) return;
    const t = state.clock.getElapsedTime();
    const flicker = 1 + 0.2 * Math.sin(t * 12) * Math.cos(t * 7);
    flameRef.current.scale.set(flicker, flicker * 1.2, flicker);
    flameRef.current.position.y = position[1] + 0.45 + 0.03 * Math.sin(t * 8);
  });

  return (
    <group position={position}>
      {/* Stick */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.4, 12]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.9} />
      </mesh>
      {/* Wick */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.06, 6]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.48, 0]}>
        <coneGeometry args={[0.05, 0.14, 10]} />
        <meshStandardMaterial
          color="#ffaa33"
          emissive="#ff6600"
          emissiveIntensity={3.5}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Glow */}
      <pointLight position={[0, 0.5, 0]} color="#ff9933" intensity={3} distance={5} decay={2} />
    </group>
  );
}

interface CakeProps {
  blown: boolean;
}

export function Cake({ blown }: CakeProps) {
  const cakeRef = useRef<THREE.Group>(null);

  const layers = [
    { y: 0.25, r: 1.2, h: 0.5, color: '#f472b6' },
    { y: 0.75, r: 0.9, h: 0.5, color: '#fb7185' },
    { y: 1.15, r: 0.6, h: 0.45, color: '#f43f5e' },
  ];

  return (
    <group ref={cakeRef} position={[0, 0, 0]}>
      {/* Base plate */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.6, 0.08, 48]} />
        <meshStandardMaterial color="#e8d5c4" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Cake layers */}
      {layers.map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]} castShadow>
          <cylinderGeometry args={[l.r, l.r * 1.05, l.h, 48]} />
          <meshStandardMaterial color={l.color} roughness={0.4} metalness={0.05} />
        </mesh>
      ))}

      {/* Frosting drips */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.5 + Math.sin(i * 2.5) * 0.15;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 0.7, Math.sin(angle) * r]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.5} />
          </mesh>
        );
      })}

      {/* Candles */}
      {!blown &&
        [0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <Candle
              key={i}
              position={[Math.cos(angle) * 0.35, 1.45, Math.sin(angle) * 0.35]}
            />
          );
        })}

      {/* Warm cake light */}
      <pointLight position={[0, 1.5, 0]} color="#ff9944" intensity={blown ? 1.5 : 8} distance={8} decay={2} />
    </group>
  );
}
