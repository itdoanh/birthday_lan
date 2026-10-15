import { create } from 'zustand';

export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface PhaseState {
  phase: PhaseId;
  warmup: boolean;
  ready: boolean;
  start: () => void;
  setPhase: (p: PhaseId) => void;
  setReady: (b: boolean) => void;
}

export const usePhaseStore = create<PhaseState>((set) => ({
  phase: 0,
  warmup: true,
  ready: false,
  start: () => set({ warmup: false }),
  setPhase: (phase) => set({ phase }),
  setReady: (ready) => set({ ready }),
}));
