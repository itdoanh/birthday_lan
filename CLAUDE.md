# Birthday LAN v2

## Stack

- Vite 5 + React 18 + TypeScript 5 strict
- Three.js r169 + @react-three/fiber + @react-three/drei
- @react-three/postprocessing (Bloom, DOF, ChromaticAberration, Vignette, SMAA, Noise)
- Zustand, Framer Motion, date-fns, Howler

## Phases

| Phase | Component | Trigger |
|-------|-----------|---------|
| 1 | LongCountdown | > 1h |
| 2 | LastHour | < 1h |
| 3 | LastMinute | < 1m |
| 4 | Analog60 | < 10s |
| 5 | Digit10 | < 1s |
| 6 | BirthdayOverlay | finished |

## Daily style system

`src/utils/dayStyle.ts` — deterministic per day (YYYY-MM-DD), 30+ palettes, 365+ messages.

## 3D post-FX

`src/three/postFX.tsx` — Bloom + DOF + ChromaticAberration + Vignette + Noise + SMAA.

## Performance

Phase 1-5: 2D only (60fps). Phase 6: 3D GTA-level (30fps+ target).

## Env

```
VITE_BIRTHDAY_DATE=2026-11-30T00:00:00
VITE_PERSON_NAME=Em yêu
VITE_LANGUAGE=vi
```
