import { create } from 'zustand';
import { getTargetDate } from '@/config/env';

interface ClockState {
  target: Date;
  now: number;
  setNow: (n: number) => void;
}

export const useClockStore = create<ClockState>((set) => ({
  target: getTargetDate(),
  now: Date.now(),
  setNow: (now) => set({ now }),
}));
