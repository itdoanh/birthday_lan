import { create } from 'zustand';

interface UIState {
  audioOn: boolean;
  fps: number;
  showFps: boolean;
  fullscreen: boolean;
  toggleAudio: () => void;
  setFps: (n: number) => void;
  toggleFps: () => void;
  toggleFullscreen: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  audioOn: true,
  fps: 0,
  showFps: false,
  fullscreen: false,
  toggleAudio: () => set((s) => ({ audioOn: !s.audioOn })),
  setFps: (fps) => set({ fps }),
  toggleFps: () => set((s) => ({ showFps: !s.showFps })),
  toggleFullscreen: () => set((s) => ({ fullscreen: !s.fullscreen })),
}));
