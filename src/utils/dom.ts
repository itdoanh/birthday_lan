export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function prefersReducedMotion(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice(): boolean {
  if (!isBrowser()) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function safeStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function requestFullscreen(el: Element | null): Promise<void> {
  if (!el) return Promise.resolve();
  const fn =
    (el as HTMLElement & { requestFullscreen?: () => Promise<void> }).requestFullscreen ??
    (el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen ??
    (el as HTMLElement & { msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen;
  if (!fn) return Promise.resolve();
  return fn.call(el) as Promise<void>;
}

export function exitFullscreen(): Promise<void> {
  if (!isBrowser()) return Promise.resolve();
  const fn =
    document.exitFullscreen ??
    (document as Document & { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen ??
    (document as Document & { msExitFullscreen?: () => Promise<void> }).msExitFullscreen;
  if (!fn) return Promise.resolve();
  return fn.call(document) as Promise<void>;
}
