import { useUIStore } from '@/state/uiStore';
import { audio } from '@/audio/audioManager';
import { FPS } from './FPS';
import { useFullscreen } from '@/hooks/useFullscreen';

export function Hud() {
  const audioOn = useUIStore((s) => s.audioOn);
  const showFps = useUIStore((s) => s.showFps);
  const toggleAudio = useUIStore((s) => s.toggleAudio);
  const toggleFps = useUIStore((s) => s.toggleFps);
  const { isFullscreen, toggle: toggleFs } = useFullscreen();

  const onAudio = () => {
    audio.setMuted(audioOn);
    toggleAudio();
  };

  return (
    <div className="hud" aria-label="HUD">
      <FPS />
      <button
        className="hud__btn"
        onClick={toggleFps}
        title={showFps ? 'Ẩn FPS' : 'Hiện FPS'}
        aria-label="Toggle FPS"
      >
        📊
      </button>
      <button
        className="hud__btn"
        onClick={onAudio}
        title={audioOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
        aria-label="Toggle audio"
      >
        {audioOn ? '🔊' : '🔇'}
      </button>
      <button
        className="hud__btn"
        onClick={toggleFs}
        title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
        aria-label="Toggle fullscreen"
      >
        {isFullscreen ? '⛶' : '⛶'}
      </button>
    </div>
  );
}
