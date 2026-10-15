import { differenceInDays, format, startOfYear } from 'date-fns';
import { PALETTES, type DailyPalette } from '@/data/dailyPalettes';
import { MESSAGES_EN, MESSAGES_VI } from '@/data/dailyMessages';
import { mulberry32, pick } from '@/utils/rng';
import { ENV } from '@/config/env';

export type DailyLayout = 'centered' | 'split' | 'overlay' | 'tilted' | 'minimal';
export type DailyMotion = 'fade' | 'slide' | 'blur-zoom' | 'rotate-3d';
export type CardStyle = 'glass' | 'paper' | 'neon' | 'soft';

export interface DailyStyle {
  id: string;
  dayKey: string;
  dayOfYear: number;
  palette: DailyPalette;
  fontHeading: string;
  fontBody: string;
  layout: DailyLayout;
  motion: DailyMotion;
  imageSeed: string;
  imageBlur: number;
  imageTint: string;
  vignette: number;
  particleColor: string;
  cardStyle: CardStyle;
  message: string;
  emoji: string;
}

const FONTS_HEAD = [
  'Playfair Display',
  'Cormorant Garamond',
  'Inter',
  'Lobster',
  'Cinzel',
  'Abril Fatface',
  'Marcellus',
] as const;

const FONTS_BODY = ['Inter', 'Cormorant Garamond', 'Lora', 'Source Serif Pro'] as const;

const LAYOUTS: readonly DailyLayout[] = ['centered', 'split', 'overlay', 'tilted', 'minimal'];
const MOTIONS: readonly DailyMotion[] = ['fade', 'slide', 'blur-zoom', 'rotate-3d'];
const CARD_STYLES: readonly CardStyle[] = ['glass', 'paper', 'neon', 'soft'];

const EMOJIS = [
  '🌸',
  '✨',
  '🌟',
  '💫',
  '🌷',
  '🌺',
  '🌹',
  '🌻',
  '🌼',
  '💐',
  '🦋',
  '🌈',
  '🎀',
  '💖',
  '💝',
  '💗',
  '💞',
  '💕',
  '☀️',
  '🌙',
  '⭐',
  '🌌',
  '🎇',
  '🎆',
  '🍀',
  '🌿',
  '🍃',
  '🌱',
  '🌊',
  '❄️',
];

export function generateDailyStyle(date: Date = new Date()): DailyStyle {
  const dayOfYear = differenceInDays(date, startOfYear(date)) + 1;
  const seed = date.getFullYear() * 1000 + dayOfYear;
  const rng = mulberry32(seed);

  const palette = pick(PALETTES, rng) as DailyPalette;
  const messages = ENV.language === 'en' ? MESSAGES_EN : MESSAGES_VI;
  const message = messages[dayOfYear % messages.length] as string;

  return {
    id: `day-${dayOfYear}-${date.getFullYear()}`,
    dayKey: format(date, 'yyyy-MM-dd'),
    dayOfYear,
    palette,
    fontHeading: pick(FONTS_HEAD, rng) as string,
    fontBody: pick(FONTS_BODY, rng) as string,
    layout: pick(LAYOUTS, rng),
    motion: pick(MOTIONS, rng),
    imageSeed: `bday-${format(date, 'yyyy-MM-dd')}`,
    imageBlur: 1 + rng() * 4,
    imageTint: palette.gradient,
    vignette: 0.3 + rng() * 0.3,
    particleColor: palette.accent,
    cardStyle: pick(CARD_STYLES, rng),
    message,
    emoji: pick(EMOJIS, rng),
  };
}

let cached: { key: string; style: DailyStyle } | null = null;

export function getDailyStyle(date: Date = new Date()): DailyStyle {
  const key = format(date, 'yyyy-MM-dd');
  if (cached && cached.key === key) return cached.style;
  const style = generateDailyStyle(date);
  cached = { key, style };
  return style;
}
