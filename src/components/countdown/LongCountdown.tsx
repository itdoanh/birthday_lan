import { motion } from 'framer-motion';
import { useTimeBreakdown } from '@/hooks/useMasterClock';
import { useDailyStyle } from '@/hooks/useDailyStyle';
import { DailyBackground } from './DailyBackground';
import { CountdownCell } from './CountdownCell';
import { ENV } from '@/config/env';

export function LongCountdown() {
  const t = useTimeBreakdown();
  const style = useDailyStyle();

  return (
    <DailyBackground>
      <motion.div
        className="day-bg__panel countdown-long"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          width: '100%',
          gap: 24,
        }}
      >
        <div>
          <h1
            className="day-heading"
            style={{ fontFamily: style.fontHeading }}
          >
            Đếm ngược đến ngày của {ENV.personName}
          </h1>
          <p className="day-subheading">Một hành trình đầy yêu thương sắp bắt đầu</p>
        </div>
        <div className="countdown-grid">
          <CountdownCell value={t.days} label="Ngày" cardStyle={style.cardStyle} digits={3} />
          <CountdownCell value={t.hours} label="Giờ" cardStyle={style.cardStyle} />
          <CountdownCell value={t.minutes} label="Phút" cardStyle={style.cardStyle} />
          <CountdownCell value={t.seconds} label="Giây" cardStyle={style.cardStyle} />
        </div>
      </motion.div>
    </DailyBackground>
  );
}
