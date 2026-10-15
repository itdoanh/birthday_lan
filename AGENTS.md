# Birthday LAN v2 — Agent Guidelines

## Project overview

Birthday countdown web app with 6 phases:
1. Long countdown (>1h) — 4-cell grid, Picsum daily background, 30+ auto-generated styles
2. Last Hour (<1h) — 3-cell
3. Last Minute (<1m) — 2-cell with ms
4. Analog60 (<10s) — decimal seconds
5. Digit10 (<1s) — single big digit 10→0
6. Birthday (finished) — GTA-V-level 3D scene with PBR, Bloom, DOF, fireworks, confetti

## Key rules

1. **Phase 1-5 are 2D only** — never mount Canvas/Three.js before phase 6
2. **Daily style is deterministic** — uses `mulberry32` seeded PRNG, cache by `YYYY-MM-DD`
3. **All phase transitions** go through `usePhaseStore`, never skip phases
4. **3D is lazy** — BirthdayOverlay only renders when `phase === 6`
5. **Picsum images** are free, no API key needed, stable per seed

## File locations

- 3D: `src/three/Scene.tsx`, `src/three/postFX.tsx`
- Countdown: `src/components/countdown/`
- State: `src/state/phaseStore.ts`, `src/state/clockStore.ts`
- Styles: `src/styles/dayStyles.css`, `src/styles/global.css`
- Data: `src/data/dailyPalettes.ts`, `src/data/dailyMessages.ts`

## Performance targets

- Phase 1-5: 60fps easy (2D only)
- Phase 6: 30fps minimum on mid-range GPU
- DPR clamp: [1, 1.5] default, [1, 2] on demand
- Bloom kernelSize: HUGE (32) for quality, LARGE (16) fallback

## Common patterns

```typescript
// Daily style
const style = useDailyStyle(); // caches per day

// Phase check
const phase = usePhaseStore((s) => s.phase);
if (phase !== 6) return null; // only render 3D when needed

// Countdown value
const t = useTimeBreakdown(); // returns breakdown() result
```
