import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLORS = ['#ff77c1', '#5cc8ff', '#ffe27a', '#7cffcb', '#ff6b6b', '#a78bfa'];

interface Rocket {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  age: number;
  maxAge: number;
  exploded: boolean;
}

interface Particle {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  age: number;
  maxAge: number;
  size: number;
}

let nextId = 0;

function Firework() {
  const rockets = useRef<Rocket[]>([]);
  const particles = useRef<Particle[]>([]);
  const lastRocket = useRef(0);

  useFrame((_, delta) => {
    const now = performance.now();
    // Launch rocket every 0.8s
    if (now - lastRocket.current > 800 && rockets.current.length < 6) {
      lastRocket.current = now;
      rockets.current.push({
        id: nextId++,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          0.1,
          (Math.random() - 0.5) * 14,
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          8 + Math.random() * 4,
          (Math.random() - 0.5) * 0.5,
        ),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        age: 0,
        maxAge: 0.4 + Math.random() * 0.4,
        exploded: false,
      });
    }

    // Update rockets
    rockets.current = rockets.current.filter((r) => {
      r.age += delta;
      r.position.addScaledVector(r.velocity, delta);
      r.velocity.y -= 9 * delta;

      if (r.age > r.maxAge && !r.exploded) {
        r.exploded = true;
        // Spawn particles
        for (let i = 0; i < 28; i++) {
          const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.3;
          const speed = 2 + Math.random() * 4;
          particles.current.push({
            id: nextId++,
            position: r.position.clone(),
            velocity: new THREE.Vector3(
              Math.cos(angle) * speed,
              Math.sin(angle) * speed,
              (Math.random() - 0.5) * speed,
            ),
            color: r.color,
            age: 0,
            maxAge: 0.8 + Math.random() * 0.6,
            size: 0.08 + Math.random() * 0.06,
          });
        }
        return false;
      }
      return !r.exploded && r.position.y > -0.5;
    });

    // Update particles
    particles.current = particles.current.filter((p) => {
      p.age += delta;
      p.position.addScaledVector(p.velocity, delta);
      p.velocity.y -= 2.5 * delta;
      return p.age < p.maxAge;
    });
  });

  const points = useMemo(() => new THREE.BufferGeometry(), []);
  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.1,
        vertexColors,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame(() => {
    const all = [...particles.current];
    const positions = new Float32Array(all.length * 3);
    const colors = new Float32Array(all.length * 3);
    const tmp = new THREE.Color();

    all.forEach((p, i) => {
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
      tmp.set(p.color);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    });

    points.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    points.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  });

  return <points geometry={points} material={mat} />;
}

const vertexColors = true;

export function Fireworks() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      camera={{ position: [0, 0, 30], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
    >
      <Firework />
    </Canvas>
  );
}
