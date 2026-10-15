# 3D Scene — GTA V Level

## Tổng quan

Phase 6 (sau khi thổi nến) hiển thị 3D scene đồ họa đỉnh GTA V với các effects cao cấp.

## Renderer config

- `ACESFilmicToneMapping` với exposure 1.15
- `SRGBColorSpace` output
- `PCFSoftShadowMap` shadows
- DPR clamp [1, 1.5]

## Post-processing chain

1. **Bloom** — intensity 1.6, kernelSize HUGE, mipmapBlur, luminanceThreshold 0.28
2. **DepthOfField** — bokehScale 2.8, tạo cinematic shallow DOF
3. **ChromaticAberration** — radial modulation, offset 0.0014
4. **Vignette** — darkness 0.55, offset 0.18
5. **Noise** — opacity 0.04, overlay blend
6. **BrightnessContrast** — contrast 0.08
7. **HueSaturation** — saturation 0.1
8. **SMAA** — anti-aliasing

## Scene elements

- **Atmosphere**: Night sky, fog, moon với volumetric glow, hemisphere light
- **Stars**: 800 điểm sáng với flickering
- **City**: 70 buildings với emissive windows + 2 neon signs
- **Lake**: Reflective plane với gentle wave animation
- **Cake**: 3-layer PBR cake với 5 candles, flame glow, warm light
- **CameraRig**: Auto-orbit khi chưa blown, OrbitControls khi user tương tác

## Performance

- Nếu FPS < 30: giảm bloom intensity
- Shadow map size: 2048 cho quality, 1024 cho performance
- DPR tự động scale trên màn retina
