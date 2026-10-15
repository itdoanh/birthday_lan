import { motion } from 'framer-motion';
import { useTimeBreakdown } from '@/hooks/useMasterClock';
import { useDailyStyle } from '@/hooks/useDailyStyle';
import { DailyBackground } from './DailyBackground';
import { pad2 } from '@/utils/math';

export function Analog60() {
  const t = useTimeBreakdown();
  const style = useDailyStyle();
  const total = Math.max(0, t.total);
  const sec = Math.floor((total / 1000) % 60);
  const msec = Math.floor((total % 1000) / 10);

  return (
    <DailyBackground>
      <motion.div
        className="day-bg__panel countdown-analog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          gap: 12,
        }}
      >
        <h2 className="day-subheading">{pad2(sec)}.{pad2(msec)}</h2>
        <div
          className={`card-${style.cardStyle}`}
          style={{
            fontFamily: style.fontHeading,
            fontSize: 'clamp(6rem, 18vmin, 14rem)',
            fontWeight: 800,
            padding: '20px 60px',
            borderRadius: 24,
            letterSpacing: '-0.04em',
            textShadow: '0 8px 32px rgba(0,0,0,0.4)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {pad2(sec)}
          <span style={{ opacity: 0.4 }}>.</span>
          {pad2(msec)}
        </div>
      </motion.div>
    </DailyBackground>
  );
}
