import { pad2 } from '@/utils/math';

interface Props {
  value: number;
  label: string;
  cardStyle: 'glass' | 'paper' | 'neon' | 'soft';
  digits?: 2 | 3;
}

export function CountdownCell({ value, label, cardStyle, digits = 2 }: Props) {
  const display = digits === 3 ? String(value).padStart(3, '0') : pad2(value);
  return (
    <div className={`countdown-cell card-${cardStyle}`}>
      <span className="countdown-cell__num">{display}</span>
      <span className="countdown-cell__label">{label}</span>
    </div>
  );
}
