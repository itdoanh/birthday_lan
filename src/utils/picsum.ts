/**
 * Picsum Photos API helper.
 * Docs: https://picsum.photos/
 */

export function picsumUrl(seed: string | number, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${w}/${h}`;
}

export function picsumGray(seed: string | number, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${w}/${h}?grayscale`;
}

export function picsumBlur(seed: string | number, w: number, h: number, blur = 2): string {
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${w}/${h}?blur=${blur}`;
}

export interface PicsumMeta {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export async function fetchPicsumInfo(seed: string | number): Promise<PicsumMeta | null> {
  try {
    const res = await fetch(`https://picsum.photos/seed/${encodeURIComponent(String(seed))}/info`);
    if (!res.ok) return null;
    return (await res.json()) as PicsumMeta;
  } catch {
    return null;
  }
}
