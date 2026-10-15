import { AnimatePresence, motion } from 'framer-motion';
import { useTimeBreakdown } from '@/hooks/useMasterClock';
import { useDailyStyle } from '@/hooks/useDailyStyle';
import { DailyBackground } from './DailyBackground';

export function Digit10() {
  const t = useTimeBreakdown();
  const style = useDailyStyle();
  const totalSec = Math.max(0, Math.floor(t.total / 1000));
  const display = Math.min(10, totalSec);

  return (
    <DailyBackground showMessage={false}>
      <div
        className="day-bg__panel countdown-digit10"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={display}
            className={`card-${style.cardStyle}`}
            initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.6, rotate: 8, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: style.fontHeading,
              fontWeight: 800,
              padding: '24px 60px',
              borderRadius: 32,
              textShadow: '0 12px 40px rgba(0,0,0,0.5)',
            }}
          >
            <span className="countdown-cell__num" style={{ fontSize: 'clamp(8rem, 30vmin, 28rem)' }}>
              {display}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </DailyBackground>
  );
}
