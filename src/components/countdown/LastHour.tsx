import { motion } from 'framer-motion';
import { useTimeBreakdown } from '@/hooks/useMasterClock';
import { useDailyStyle } from '@/hooks/useDailyStyle';
import { DailyBackground } from './DailyBackground';
import { CountdownCell } from './CountdownCell';
import { ENV } from '@/config/env';

export function LastHour() {
  const t = useTimeBreakdown();
  const style = useDailyStyle();

  return (
    <DailyBackground>
      <motion.div
        className="day-bg__panel countdown-last-hour"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          width: '100%',
          gap: 24,
        }}
      >
        <h2 className="day-subheading">Sắp đến giờ rồi, {ENV.personName} ơi</h2>
        <div className="countdown-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 560 }}>
          <CountdownCell value={t.hours + t.days * 24} label="Giờ" cardStyle={style.cardStyle} />
          <CountdownCell value={t.minutes} label="Phút" cardStyle={style.cardStyle} />
          <CountdownCell value={t.seconds} label="Giây" cardStyle={style.cardStyle} />
        </div>
      </motion.div>
    </DailyBackground>
  );
}
