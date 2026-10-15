# Birthday Phases Skill

## Phase definitions

| Phase | Trigger | Component | Description |
|-------|---------|-----------|-------------|
| 1 | total > 1h | LongCountdown | 4-cell countdown, daily style background |
| 2 | total < 1h | LastHour | 3-cell (h/m/s) |
| 3 | total < 1m | LastMinute | 2-cell (s.ms) |
| 4 | total < 10s | Analog60 | Decimal display with animation |
| 5 | total < 1s | Digit10 | Single digit 10→0 |
| 6 | finished | BirthdayOverlay | 3D GTA-level scene |

## Phase store

```typescript
// src/state/phaseStore.ts
interface PhaseState {
  phase: PhaseId; // 0 warmup | 1-5 countdown | 6 birthday
  warmup: boolean;
  setPhase: (p: PhaseId) => void;
  start: () => void; // ends warmup
}
```

## Phase transition logic

Located in `src/components/shell/Overlay.tsx` inside `useEffect`:

```typescript
if (t.total > 3_600_000) setPhase(1);
else if (t.total > 60_000) setPhase(2);
else if (t.total > 10_000) setPhase(3);
else if (t.total > 1_000) setPhase(4);
else setPhase(5);
```

## Adding a new phase

1. Add `PhaseId` to `phaseStore.ts`
2. Create component in `src/components/countdown/`
3. Add render condition in `Overlay.tsx`
4. Update transition thresholds in `Overlay.tsx` useEffect
5. Add transition animation in `dayStyles.css`
