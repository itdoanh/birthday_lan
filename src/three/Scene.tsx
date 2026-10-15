import { Suspense } from 'react';
import { Atmosphere } from './Atmosphere';
import { City } from './City';
import { Lake } from './Lake';
import { Cake } from './Cake';
import { CameraRig } from './CameraRig';
import { PostFX } from './postFX';

interface SceneProps {
  blown: boolean;
}

export function Scene({ blown }: SceneProps) {
  return (
    <>
      <Atmosphere />
      <CameraRig autoOrbit={!blown} />
      <Suspense fallback={null}>
        <City />
        <Lake />
        <Cake blown={blown} />
      </Suspense>
      <PostFX />
    </>
  );
}
