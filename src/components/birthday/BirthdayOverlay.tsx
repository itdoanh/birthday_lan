import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three';
import { useWishStore } from '@/state/wishStore';
import { usePhaseStore } from '@/state/phaseStore';
import { Scene } from '@/three/Scene';
import { Fireworks } from '@/fx/Fireworks';
import { Confetti } from '@/fx/Confetti';

export function BirthdayOverlay() {
  const phase = usePhaseStore((s) => s.phase);
  const blown = useWishStore((s) => s.blown);
  const showMessage = useWishStore((s) => s.showMessage);

  if (phase !== 6) return null;

  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: SRGBColorSpace,
        }}
        camera={{ position: [0, 4, 10], fov: 50, near: 0.1, far: 300 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <Scene blown={blown} />
        </Suspense>
      </Canvas>

      {blown && <Fireworks />}
      {showMessage && <Confetti />}
    </>
  );
}
