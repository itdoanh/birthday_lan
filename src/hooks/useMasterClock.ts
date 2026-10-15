import { useEffect, useRef } from 'react';
import { useClockStore } from '@/state/clockStore';
import { breakdown } from '@/utils/time';

export function useMasterClock(): void {
  const setNow = useClockStore((s) => s.setNow);
  const raf = useRef<number>(0);

  useEffect(() => {
    let last = 0;
    const tick = (t: number) => {
      if (t - last >= 100) {
        setNow(Date.now());
        last = t;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [setNow]);
}

export function useTimeBreakdown() {
  const now = useClockStore((s) => s.now);
  const target = useClockStore((s) => s.target);
  return breakdown(target, new Date(now));
}
