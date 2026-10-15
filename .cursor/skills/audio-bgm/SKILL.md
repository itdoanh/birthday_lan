# Audio Background Music

## Audio Manager

`src/audio/audioManager.ts` — singleton class wrapping Howler.js

### Methods

```typescript
audio.load(track: AudioTrack): Howl
audio.play(id: string, fadeMs?: number): void
audio.stop(id: string, fadeMs?: number): void
audio.stopAll(fadeMs?: number): void
audio.setMuted(muted: boolean): void
audio.setMasterVolume(v: number): void
```

### Usage

```typescript
import { audio } from '@/audio/audioManager';

// Load a track
audio.load({ id: 'bgm', src: ['/audio/bgm.mp3'], loop: true, volume: 0.7 });

// Play with fade-in
audio.play('bgm', 800);

// Stop with fade-out
audio.stop('bgm', 600);

// Toggle mute
audio.setMuted(!audio.isMuted());
```

## UI Integration

`src/components/hud/Hud.tsx` — HUD buttons call `audio.setMuted()` through `useUIStore`.

## Notes

- Use `html5: false` for better performance on desktop
- Always use `preload: true` for background music
- Set `loop: true` for BGM tracks
- Recommended fade-in/out duration: 600-800ms for smooth transitions
