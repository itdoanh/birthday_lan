import { useEffect } from 'react';
import { audio } from '@/audio/audioManager';
import { useUIStore } from '@/state/uiStore';

export function BackgroundMusic() {
  const audioOn = useUIStore((s) => s.audioOn);
  useEffect(() => {
    audio.setMuted(!audioOn);
  }, [audioOn]);
  return null;
}
