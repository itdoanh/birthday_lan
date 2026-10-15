import { useEffect, useState } from 'react';
import { picsumUrl } from '@/utils/picsum';

export type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface PicsumImage {
  url: string;
  status: ImageStatus;
}

export function usePicsumImage(seed: string | number, w = 1920, h = 1080): PicsumImage {
  const url = picsumUrl(seed, w, h);
  const [status, setStatus] = useState<ImageStatus>('loading');

  useEffect(() => {
    setStatus('loading');
    const img = new Image();
    img.onload = () => setStatus('loaded');
    img.onerror = () => setStatus('error');
    img.src = url;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return { url, status };
}
