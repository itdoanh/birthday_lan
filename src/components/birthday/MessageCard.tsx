import { motion, AnimatePresence } from 'framer-motion';
import { useWishStore } from '@/state/wishStore';
import { ENV } from '@/config/env';

export function MessageCard() {
  const show = useWishStore((s) => s.showMessage);
  const blown = useWishStore((s) => s.blown);

  if (!blown) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="message-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="message-card__inner card-glass"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="message-card__title">Happy Birthday 🎉</h2>
            <p className="message-card__body">{ENV.birthdayMessage}</p>
            <p className="message-card__from">— Mãi yêu {ENV.personName} —</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
