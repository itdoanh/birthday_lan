import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePhaseStore } from '@/state/phaseStore';

const PRELOAD_ASSETS = [
  'https://picsum.photos/seed/bday-warmup/200/200',
];

export function Warmup() {
  const start = usePhaseStore((s) => s.start);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    let count = 0;
    const total = PRELOAD_ASSETS.length + 3;

    const tick = () => {
      if (!mounted) return;
      count += 1;
      setProgress(Math.min(100, (count / total) * 100));
      if (count >= total) {
        setTimeout(() => start(), 350);
      } else {
        setTimeout(tick, 320);
      }
    };
    PRELOAD_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });
    tick();
    tick();
    tick();

    return () => {
      mounted = false;
    };
  }, [start]);

  return (
    <motion.div
      className="warmup"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ display: 'grid', placeItems: 'center', gap: 20 }}>
        <div
          style={{
            fontSize: 64,
            filter: 'drop-shadow(0 0 24px rgba(255,119,193,0.5))',
          }}
        >
          🎂
        </div>
        <h1 className="warmup__title">Birthday LAN</h1>
        <p className="warmup__sub">Đang chuẩn bị hành trình đặc biệt…</p>
        <div className="warmup__progress" aria-hidden>
          <div className="warmup__bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
