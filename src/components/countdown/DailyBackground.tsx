import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePicsumImage } from '@/hooks/usePicsumImage';
import { useDailyStyle } from '@/hooks/useDailyStyle';
import { DailyMessage } from './DailyMessage';
import { FloatingParticles } from './FloatingParticles';
import { easeOutCubic } from '@/utils/math';

interface Props {
  children?: React.ReactNode;
  className?: string;
  showMessage?: boolean;
}

export function DailyBackground({ children, className = '', showMessage = true }: Props) {
  const style = useDailyStyle();
  const { url, status } = usePicsumImage(style.imageSeed);
  const [now] = useState(() => new Date());
  const [dayKey, setDayKey] = useState(() => style.dayKey);

  useEffect(() => {
    if (style.dayKey !== dayKey) setDayKey(style.dayKey);
  }, [style.dayKey, dayKey]);

  return (
    <div
      className={`day-bg palette-${style.palette.id} motion-${style.motion} layout-${style.layout} ${className}`}
      style={
        {
          fontFamily: style.fontBody,
          ['--palette-accent' as string]: style.palette.accent,
          ['--palette-primary' as string]: style.palette.primary,
          ['--palette-glow' as string]: style.palette.glow,
        } as React.CSSProperties
      }
    >
      <motion.div
        key={dayKey}
        className="day-bg__image-wrap"
        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {status === 'loaded' && (
          <img
            src={url}
            alt=""
            style={{ filter: `blur(${style.imageBlur}px)` }}
            draggable={false}
          />
        )}
        <div className="day-bg__tint" style={{ background: style.imageTint }} />
        <div
          className="day-bg__vignette"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${style.vignette}))`,
          }}
        />
        <div className="day-bg__noise" />
      </motion.div>

      <div className="day-bg__content" style={{ fontFamily: style.fontBody }}>
        {children}
      </div>

      <FloatingParticles color={style.palette.accent} count={28} />
      {showMessage && (
        <DailyMessage
          message={style.message}
          emoji={style.emoji}
          delay={now.getSeconds() * 0.04}
          easeFn={easeOutCubic}
        />
      )}
    </div>
  );
}
