import { motion } from 'framer-motion';
import { useTimeBreakdown } from '@/hooks/useMasterClock';
import { useDailyStyle } from '@/hooks/useDailyStyle';
import { DailyBackground } from './DailyBackground';
import { CountdownCell } from './CountdownCell';

export function LastMinute() {
  const t = useTimeBreakdown();
  const style = useDailyStyle();

  return (
    <DailyBackground>
      <motion.div
        className="day-bg__panel countdown-last-minute"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          width: '100%',
          padding: 32,
          gap: 24,
        }}
      >
        <h2 className="day-subheading">Còn 1 phút nữa thôi</h2>
        <div className="countdown-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 420 }}>
          <CountdownCell value={t.seconds} label="Giây" cardStyle={style.cardStyle} />
          <CountdownCell value={t.ms} label="Ms" cardStyle={style.cardStyle} digits={3} />
        </div>
      </motion.div>
    </DailyBackground>
  );
}
