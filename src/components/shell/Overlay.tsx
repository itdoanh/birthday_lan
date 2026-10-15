import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Warmup } from '@/components/warmup/Warmup';
import { LongCountdown } from '@/components/countdown/LongCountdown';
import { LastHour } from '@/components/countdown/LastHour';
import { LastMinute } from '@/components/countdown/LastMinute';
import { Analog60 } from '@/components/countdown/Analog60';
import { Digit10 } from '@/components/countdown/Digit10';
import { BirthdayOverlay } from '@/components/birthday/BirthdayOverlay';
import { WishDialog } from '@/components/birthday/WishDialog';
import { BlowCandleButton } from '@/components/birthday/BlowCandleButton';
import { MessageCard } from '@/components/birthday/MessageCard';
import { Hud } from '@/components/hud/Hud';
import { BackgroundMusic } from '@/components/shell/BackgroundMusic';
import { usePhaseStore } from '@/state/phaseStore';
import { useTimeBreakdown } from '@/hooks/useMasterClock';

export function Overlay() {
  const warmup = usePhaseStore((s) => s.warmup);
  const phase = usePhaseStore((s) => s.phase);
  const setPhase = usePhaseStore((s) => s.setPhase);
  const t = useTimeBreakdown();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (warmup) return;
    if (t.finished) {
      setPhase(6);
      return;
    }
    if (t.total > 3_600_000) setPhase(1);
    else if (t.total > 60_000) setPhase(2);
    else if (t.total > 10_000) setPhase(3);
    else if (t.total > 1_000) setPhase(4);
    else setPhase(5);
  }, [t.total, t.finished, warmup, setPhase]);

  useEffect(() => {
    if (!warmup) {
      const id = setTimeout(() => setEntered(true), 100);
      return () => clearTimeout(id);
    }
  }, [warmup]);

  return (
    <div className="app-root">
      <BackgroundMusic />
      <Hud />
      <AnimatePresence>
        {warmup ? (
          <Warmup key="warmup" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {phase === 1 && <LongCountdown key="p1" />}
            {phase === 2 && <LastHour key="p2" />}
            {phase === 3 && <LastMinute key="p3" />}
            {phase === 4 && <Analog60 key="p4" />}
            {phase === 5 && <Digit10 key="p5" />}
            {phase === 6 && <BirthdayOverlay key="p6" />}
            {entered && <BlowCandleButton key="blow" />}
            <WishDialog />
            <MessageCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
