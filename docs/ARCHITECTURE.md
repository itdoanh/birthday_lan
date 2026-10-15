# Birthday LAN v2

## Cấu trúc

```
src/
├── config/          env.ts — biến môi trường
├── state/           Zustand stores (clock, phase, wish, ui)
├── utils/           time, math, rng, dom, picsum, dayStyle
├── data/            dailyPalettes (30+), dailyMessages (365+)
├── hooks/           useMasterClock, useDom, useFullscreen, usePicsumImage, useDailyStyle
├── audio/           audioManager (Howler)
├── styles/          global.css, dayStyles.css
├── components/
│   ├── warmup/      Warmup.tsx
│   ├── countdown/   LongCountdown, LastHour, LastMinute, Analog60, Digit10, DailyBackground, DailyMessage, FloatingParticles, CountdownCell
│   ├── birthday/    BirthdayOverlay, WishDialog, BlowCandleButton, MessageCard
│   ├── hud/         Hud, FPS
│   └── shell/       Overlay, BackgroundMusic
├── three/           Scene, postFX, Cake, City, Lake, Stars, Atmosphere, CameraRig
└── fx/              Fireworks, Confetti
```

## Luồng

1. Warmup → Phase 1 (LongCountdown) → Phase 2 (LastHour) → Phase 3 (LastMinute) → Phase 4 (Analog60) → Phase 5 (Digit10)
2. Tới giờ → Phase 6 (BirthdayOverlay: 3D scene)
3. User click "Thổi nến" → WishDialog → BlowCandle → Fireworks + Confetti → MessageCard

## Công nghệ

- Vite 5 + React 18 + TypeScript 5 strict
- Three.js r169 + @react-three/fiber + @react-three/drei
- @react-three/postprocessing (Bloom, DOF, ChromaticAberration, Vignette, SMAA, Noise)
- Zustand state
- Framer Motion UI
- date-fns
- Howler audio
