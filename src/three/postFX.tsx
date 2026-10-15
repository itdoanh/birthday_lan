import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Vignette,
  Noise,
  SMAA,
  BrightnessContrast,
  HueSaturation,
} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import { Vector2 } from 'three';

export function PostFX() {
  return (
    <EffectComposer multisampling={0} stencilBuffer={false}>
      <Bloom
        intensity={1.6}
        kernelSize={KernelSize.HUGE}
        luminanceThreshold={0.28}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={0.015}
        focalLength={0.04}
        bokehScale={2.8}
        height={480}
      />
      <ChromaticAberration
        offset={new Vector2(0.0014, 0.0014)}
        radialModulation
        modulationOffset={0.3}
      />
      <Vignette eskil={false} offset={0.18} darkness={0.55} />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
      <BrightnessContrast brightness={0} contrast={0.08} />
      <HueSaturation hue={0} saturation={0.1} />
      <SMAA />
    </EffectComposer>
  );
}
