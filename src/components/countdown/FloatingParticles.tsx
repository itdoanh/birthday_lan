import { useMemo } from 'react';
import { mulberry32 } from '@/utils/rng';

interface Props {
  color: string;
  count?: number;
}

export function FloatingParticles({ color, count = 24 }: Props) {
  const items = useMemo(() => {
    const rng = mulberry32(Date.now() & 0xffff);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rng() * 100,
      size: 4 + rng() * 8,
      duration: 6 + rng() * 8,
      delay: -rng() * 12,
    }));
  }, [count]);

  return (
    <div className="particles" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            background: color,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
