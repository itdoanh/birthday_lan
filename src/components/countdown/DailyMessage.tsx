import { motion } from 'framer-motion';

interface Props {
  message: string;
  emoji: string;
  delay?: number;
  easeFn?: (t: number) => number;
}

export function DailyMessage({ message, emoji, delay = 0 }: Props) {
  return (
    <motion.div
      className="daily-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.6 + delay * 0.001, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="daily-message__emoji">{emoji}</span>
      {message}
    </motion.div>
  );
}
