import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Stars() {
  const points = useMemo(() => {
    const rng = (() => {
      let s = 77;
      return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    })();

    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      positions[i * 3] = (rng() - 0.5) * 200;
      positions[i * 3 + 1] = 20 + rng() * 80;
      positions[i * 3 + 2] = (rng() - 0.5) * 200;
    }
    return positions;
  }, []);

  const matRef = useRef<THREE.PointsMaterial>(null);
  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.size = 0.25 + 0.08 * Math.sin(state.clock.getElapsedTime() * 0.5);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial ref={matRef} color="#ffffff" size={0.25} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}
