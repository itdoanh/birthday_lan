import { useEffect, useRef } from 'react';
import { useUIStore } from '@/state/uiStore';

export function FPS() {
  const showFps = useUIStore((s) => s.showFps);
  const setFps = useUIStore((s) => s.setFps);
  const acc = useRef({ frames: 0, last: performance.now() });

  useEffect(() => {
    if (!showFps) return;
    let raf = 0;
    const tick = () => {
      acc.current.frames += 1;
      const now = performance.now();
      if (now - acc.current.last >= 1000) {
        setFps(acc.current.frames);
        acc.current.frames = 0;
        acc.current.last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showFps, setFps]);

  if (!showFps) return null;
  return <span className="hud__fps">{useUIStore.getState().fps} FPS</span>;
}
