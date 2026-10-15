import { useEffect, useState } from 'react';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* ignore */
    }
  };

  const exit = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  };

  const toggle = () => (isFullscreen ? exit() : enter());
  return { isFullscreen, enter, exit, toggle };
}
