import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishStore } from '@/state/wishStore';

export function WishDialog() {
  const open = useWishStore((s) => s.open);
  const closeWish = useWishStore((s) => s.closeWish);
  const blowCandle = useWishStore((s) => s.blowCandle);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      blowCandle();
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="wish-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="wish-dialog__panel card-neon"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="wish-dialog__title">Hãy ước một điều nhé 🌟</h3>
            <p className="wish-dialog__body">
              Hãy viết ra điều bạn mong ước, rồi thổi nến. Điều ước sẽ được giữ kín trong
              tim bạn.
            </p>
            {!submitted ? (
              <form onSubmit={submit}>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Điều em ước…"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.4)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontFamily: 'inherit',
                    fontSize: 16,
                    resize: 'vertical',
                    marginBottom: 16,
                  }}
                />
                <div className="wish-dialog__actions">
                  <button type="button" className="btn btn-ghost" onClick={closeWish}>
                    Để sau
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Ước xong — Thổi nến 🕯️
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: 48 }}
              >
                ✨🌠✨
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
