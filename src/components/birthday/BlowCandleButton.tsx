import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishStore } from '@/state/wishStore';
import { usePhaseStore } from '@/state/phaseStore';

export function BlowCandleButton() {
  const phase = usePhaseStore((s) => s.phase);
  const openWish = useWishStore((s) => s.openWish);
  const [hover, setHover] = useState(false);

  if (phase !== 6) return null;

  return (
    <AnimatePresence>
      <motion.button
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: '8vmin',
          left: '50%',
          x: '-50%',
          zIndex: 40,
          padding: '18px 32px',
          fontSize: 'clamp(1rem, 1.8vmin, 1.2rem)',
          boxShadow: hover
            ? '0 16px 48px rgba(255, 119, 193, 0.55), 0 0 64px rgba(255, 119, 193, 0.35)'
            : '0 8px 28px rgba(255, 119, 193, 0.45)',
        }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onClick={openWish}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileTap={{ scale: 0.95 }}
      >
        🕯️ Thổi nến & ước
      </motion.button>
    </AnimatePresence>
  );
}
