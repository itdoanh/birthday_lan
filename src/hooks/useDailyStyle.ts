import { useMemo } from 'react';
import { getDailyStyle } from '@/utils/dayStyle';

export function useDailyStyle(date: Date = new Date()) {
  return useMemo(() => getDailyStyle(date), [date.toDateString()]);
}
