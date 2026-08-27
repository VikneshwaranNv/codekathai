// Pure Web Audio API Sound Effects Synthesizer for Code Kathai (Zero external downloads, 100% crisp retro sound)

const SOUND_MUTED_KEY = 'codekathai_sfx_muted';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SOUND_MUTED_KEY) === 'true';
}

export function setSoundMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SOUND_MUTED_KEY, String(muted));
}

export function toggleSoundMuted(): boolean {
  const current = isSoundMuted();
  const next = !current;
  setSoundMuted(next);
  return next;
}

/**
 * ⚡ Laser Zap Sound Effect
 * Oscillating frequency drop for compiler laser attack
 */
export function playLaserZapSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 💥 Retro Explosion Sound Effect
 * White noise buffer decay when Bug Boss is hit or defeated
 */
export function playExplosionSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    const now = ctx.currentTime;
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.linearRampToValueAtTime(100, now + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 🛡️ Shield Deflect / Dodge Sound Effect
 * Quick metallic pitch sweep for bug dodge
 */
export function playShieldDeflectSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 🎺 Victory Fanfare Jingle Sound Effect
 * Upbeat 4-note retro arpeggio sequence (C5 -> E5 -> G5 -> C6)
 */
export function playVictoryJingleSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const durations = [0.12, 0.12, 0.12, 0.35];
    let timeOffset = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, timeOffset);

      gain.gain.setValueAtTime(0.25, timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.01, timeOffset + durations[idx]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(timeOffset);
      osc.stop(timeOffset + durations[idx]);

      timeOffset += durations[idx];
    });
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 🖱️ Soft Retro Button Click SFX
 */
export function playButtonClickSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}
