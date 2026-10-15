import { useEffect } from 'react';
import { useUIStore } from '@/state/uiStore';
import { isBrowser, prefersReducedMotion } from '@/utils/dom';

export function useDom(): {
  reducedMotion: boolean;
  audioOn: boolean;
  showFps: boolean;
  fullscreen: boolean;
  toggleAudio: () => void;
  toggleFps: () => void;
  toggleFullscreen: () => void;
} {
  const ui = useUIStore();
  const reducedMotion = isBrowser() ? prefersReducedMotion() : false;
  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);
  return { reducedMotion, ...ui };
}
