import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface CameraRigProps {
  autoOrbit?: boolean;
}

export function CameraRig({ autoOrbit = true }: CameraRigProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const angle = useRef(0);

  useFrame((_, delta) => {
    if (!autoOrbit) return;
    angle.current += delta * 0.12;
    camera.position.x = Math.sin(angle.current) * 10;
    camera.position.z = Math.cos(angle.current) * 10;
    camera.position.y = 4 + Math.sin(angle.current * 0.3) * 1;
    camera.lookAt(0, 1.5, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 1.5, 0);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={6}
      maxDistance={20}
      maxPolarAngle={Math.PI * 0.55}
      enableDamping
      dampingFactor={0.05}
    />
  );
}
