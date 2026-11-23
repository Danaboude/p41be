import {
  Component, ElementRef, OnDestroy, computed, inject, input, signal, viewChild
} from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

const LABELS = {
  en: {
    play: 'Play', pause: 'Pause', back: 'Back 5 seconds', forward: 'Forward 5 seconds',
    mute: 'Mute', unmute: 'Unmute', volume: 'Volume', seek: 'Seek', speed: 'Playback speed',
    fullscreen: 'Full screen', exitFullscreen: 'Exit full screen', playVideo: 'Play video'
  },
  nl: {
    play: 'Afspelen', pause: 'Pauzeren', back: '5 seconden terug', forward: '5 seconden vooruit',
    mute: 'Geluid uit', unmute: 'Geluid aan', volume: 'Volume', seek: 'Zoeken', speed: 'Afspeelsnelheid',
    fullscreen: 'Volledig scherm', exitFullscreen: 'Volledig scherm sluiten', playVideo: 'Video afspelen'
  }
};

const SPEEDS = [1, 1.25, 1.5, 2, 0.75];
const SKIP = 5;

/**
 * Shared video player with custom controls.
 * Usage: <app-video-player src="/film.mp4" poster="/poster.webp" title="..." [width]="1920" [height]="1080" />
 * Keyboard (when the player has focus): Space/K play-pause, ←/→ 5 s, M mute, F full screen.
 */
@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
  host: { class: 'block' }
})
export class VideoPlayerComponent implements OnDestroy {
  private translation = inject(TranslationService);

  src = input.required<string>();
  poster = input<string>('');
  title = input<string>('');
  width = input<number>(1920);
  height = input<number>(1080);
  /** Shown on the poster before the first play, e.g. "3:06". Falls back to the real duration once known. */
  durationLabel = input<string>('');
  /** Where the big play button sits on the poster: 'center' (default) or 'lower' (use when the poster has a centred title). */
  playPosition = input<'center' | 'lower'>('center');

  private video = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private root = viewChild.required<ElementRef<HTMLElement>>('root');

  t = computed(() => LABELS[this.translation.lang()]);

  started = signal(false);
  playing = signal(false);
  current = signal(0);
  duration = signal(0);
  buffered = signal(0);
  muted = signal(false);
  volume = signal(1);
  speedIndex = signal(0);
  fullscreen = signal(false);
  controlsVisible = signal(true);
  waiting = signal(false);

  speed = computed(() => SPEEDS[this.speedIndex()]);
  progress = computed(() => (this.duration() ? (this.current() / this.duration()) * 100 : 0));
  bufferedPct = computed(() => (this.duration() ? (this.buffered() / this.duration()) * 100 : 0));
  posterDuration = computed(() => this.durationLabel() || (this.duration() ? this.format(this.duration()) : ''));

  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private onFsChange = () => this.fullscreen.set(typeof document !== 'undefined' && !!document.fullscreenElement);

  constructor() {
    if (typeof document !== 'undefined') document.addEventListener('fullscreenchange', this.onFsChange);
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') document.removeEventListener('fullscreenchange', this.onFsChange);
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  private get el() { return this.video().nativeElement; }

  togglePlay() {
    const v = this.el;
    if (v.paused || v.ended) {
      this.started.set(true);
      v.play().catch(() => this.playing.set(false));
    } else {
      v.pause();
    }
  }

  skip(seconds: number) {
    const v = this.el;
    if (!this.started()) this.started.set(true);
    v.currentTime = Math.min(Math.max(0, v.currentTime + seconds), v.duration || v.currentTime + seconds);
    this.current.set(v.currentTime);
    this.poke();
  }

  seekTo(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    if (!this.duration()) return;
    this.el.currentTime = (value / 100) * this.duration();
    this.current.set(this.el.currentTime);
  }

  toggleMute() {
    const v = this.el;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) v.volume = 0.6;
  }

  setVolume(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.el.volume = value;
    this.el.muted = value === 0;
  }

  cycleSpeed() {
    this.speedIndex.update(i => (i + 1) % SPEEDS.length);
    this.el.playbackRate = this.speed();
  }

  toggleFullscreen() {
    if (typeof document === 'undefined') return;
    const host = this.root().nativeElement;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else if (host.requestFullscreen) {
      host.requestFullscreen().catch(() => {});
    } else {
      // iOS Safari: only the video element can go full screen
      (this.el as any).webkitEnterFullscreen?.();
    }
  }

  onKey(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) return;
    switch (event.key) {
      case ' ': case 'k': case 'K':
        if (target.tagName === 'BUTTON' && event.key === ' ') return;
        event.preventDefault(); this.togglePlay(); break;
      case 'ArrowLeft': event.preventDefault(); this.skip(-SKIP); break;
      case 'ArrowRight': event.preventDefault(); this.skip(SKIP); break;
      case 'm': case 'M': this.toggleMute(); break;
      case 'f': case 'F': this.toggleFullscreen(); break;
      default: return;
    }
    this.poke();
  }

  // Video element events
  onPlay() { this.playing.set(true); this.poke(); }
  onPause() { this.playing.set(false); this.showControls(); }
  onEnded() { this.playing.set(false); this.showControls(); }
  onTime() { this.current.set(this.el.currentTime); }
  onMeta() { this.duration.set(this.el.duration || 0); }
  onVolume() { this.muted.set(this.el.muted); this.volume.set(this.el.muted ? 0 : this.el.volume); }
  onProgress() {
    const b = this.el.buffered;
    if (b.length) this.buffered.set(b.end(b.length - 1));
  }
  onWaiting(state: boolean) { this.waiting.set(state); }

  /** Show controls and hide them again after a short idle time while playing. */
  poke() {
    this.showControls();
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => { if (this.playing()) this.controlsVisible.set(false); }, 2500);
  }

  showControls() { this.controlsVisible.set(true); }

  format(seconds: number): string {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
