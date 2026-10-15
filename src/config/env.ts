function env(key: string, fallback = ''): string {
  if (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env) {
    const v = (import.meta as { env: Record<string, string> }).env[key];
    if (v !== undefined && v !== '') return v;
  }
  return fallback;
}

export const ENV = {
  birthdayDate: env('VITE_BIRTHDAY_DATE', '2026-11-30T00:00:00'),
  personName: env('VITE_PERSON_NAME', 'Em yêu'),
  birthdayMessage: env(
    'VITE_BIRTHDAY_MESSAGE',
    'Chúc em một ngày sinh nhật thật tuyệt vời',
  ),
  language: env('VITE_LANGUAGE', 'vi') as 'vi' | 'en',
  imageProvider: env('VITE_IMAGE_PROVIDER', 'picsum') as 'picsum',
};

export function getTargetDate(): Date {
  const d = new Date(ENV.birthdayDate);
  if (Number.isNaN(d.getTime())) {
    return new Date(Date.now() + 30 * 86_400_000);
  }
  return d;
}
