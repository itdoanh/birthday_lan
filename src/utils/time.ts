import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';

export interface TimeBreakdown {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  finished: boolean;
}

export function breakdown(target: Date, now: Date = new Date()): TimeBreakdown {
  const total = target.getTime() - now.getTime();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, ms: 0, finished: true };
  }
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1_000);
  const ms = total % 1_000;
  return { total, days, hours, minutes, seconds, ms, finished: false };
}

export function shortBreakdown(target: Date, now: Date = new Date()): TimeBreakdown {
  return breakdown(target, now);
}

export function dayKey(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

export function dayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return differenceInDays(date, start);
}

export function dayOfYearKey(date: Date = new Date()): number {
  return differenceInDays(date, new Date(date.getFullYear(), 0, 0));
}

export function countdownDigits(target: Date, now: Date = new Date()): {
  d: number;
  h: number;
  m: number;
  s: number;
  finished: boolean;
} {
  const t = target.getTime() - now.getTime();
  if (t <= 0) return { d: 0, h: 0, m: 0, s: 0, finished: true };
  return {
    d: differenceInDays(target, now),
    h: differenceInHours(target, now) % 24,
    m: differenceInMinutes(target, now) % 60,
    s: differenceInSeconds(target, now) % 60,
    finished: false,
  };
}

export function isoDay(date: Date = new Date()): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX");
}
