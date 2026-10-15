import { Howl } from 'howler';

export interface AudioTrack {
  id: string;
  src: string[];
  volume?: number;
  loop?: boolean;
  fadeMs?: number;
}

class AudioManager {
  private tracks = new Map<string, Howl>();
  private muted = false;
  private masterVolume = 0.7;

  load(track: AudioTrack): Howl {
    const existing = this.tracks.get(track.id);
    if (existing) return existing;
    const howl = new Howl({
      src: track.src,
      volume: (track.volume ?? this.masterVolume) * (this.muted ? 0 : 1),
      loop: track.loop ?? true,
      html5: false,
      preload: true,
    });
    this.tracks.set(track.id, howl);
    return howl;
  }

  play(id: string, fadeMs = 0): void {
    const t = this.tracks.get(id);
    if (!t) return;
    if (t.playing()) return;
    if (fadeMs > 0) {
      t.volume(0);
      t.play();
      t.fade(0, this.masterVolume * (this.muted ? 0 : 1), fadeMs);
    } else {
      t.play();
    }
  }

  stop(id: string, fadeMs = 0): void {
    const t = this.tracks.get(id);
    if (!t) return;
    if (fadeMs > 0) t.fade(t.volume(), 0, fadeMs).once('fade', () => t.stop());
    else t.stop();
  }

  stopAll(fadeMs = 600): void {
    this.tracks.forEach((t) => this.stop(t === t ? '' : '', fadeMs));
    this.tracks.forEach((t) => {
      if (t.playing()) {
        if (fadeMs > 0) t.fade(t.volume(), 0, fadeMs).once('fade', () => t.stop());
        else t.stop();
      }
    });
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.tracks.forEach((t) => t.volume(muted ? 0 : this.masterVolume));
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMasterVolume(v: number): void {
    this.masterVolume = Math.max(0, Math.min(1, v));
    if (!this.muted) this.tracks.forEach((t) => t.volume(this.masterVolume));
  }
}

export const audio = new AudioManager();
