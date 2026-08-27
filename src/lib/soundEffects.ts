// High-Fidelity Web Audio API SFX Engine & Mechanical Keyboard Synthesizer for Code Kathai
// Zero external downloads, 100% crisp high-definition acoustic sounds

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
 * ⌨️ Mechanical Keyboard SFX (Cherry MX Blue / Brown / Red Thock Synthesizer)
 * Creates authentic tactile click + keycap bottom-out thock resonance
 */
export function playMechanicalKeyPressSound(key?: string): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const isSpaceOrEnter = key === 'Enter' || key === ' ' || key === 'Space';

    // 1. High Frequency Tactile Click (Bump)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    const clickFreq = isSpaceOrEnter ? 1400 : 2600 + Math.random() * 500;
    clickOsc.frequency.setValueAtTime(clickFreq, now);
    clickOsc.frequency.exponentialRampToValueAtTime(800, now + 0.008);

    clickGain.gain.setValueAtTime(isSpaceOrEnter ? 0.18 : 0.14, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.008);

    // 2. Keycap Bottom-Out Thock (Resonant Low-Pass Noise & Sub Pulse)
    const bufferSize = ctx.sampleRate * (isSpaceOrEnter ? 0.05 : 0.035);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    const filterCutoff = isSpaceOrEnter ? 350 : 650 + Math.random() * 150;
    filter.frequency.setValueAtTime(filterCutoff, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + (isSpaceOrEnter ? 0.05 : 0.035));

    const thockGain = ctx.createGain();
    thockGain.gain.setValueAtTime(isSpaceOrEnter ? 0.25 : 0.16, now);
    thockGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpaceOrEnter ? 0.05 : 0.035));

    noise.connect(filter);
    filter.connect(thockGain);
    thockGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + (isSpaceOrEnter ? 0.05 : 0.035));
  } catch (e) {
    // Ignore audio context errors
  }
}

/**
 * ⚡ Bug Hunter High-Power Laser Cannon Sound
 */
export function playLaserZapSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Dual Oscillator Laser (Sawtooth + Square for thick synth punch)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(1100, now);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 0.16);

    osc2.frequency.setValueAtTime(550, now);
    osc2.frequency.exponentialRampToValueAtTime(70, now + 0.16);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.16);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.16);
    osc2.stop(now + 0.16);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 💥 Bug Hunter High-Fidelity Explosion & Boss Defeat SFX
 */
export function playExplosionSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.45;

    // 1. Sub-Bass Impact Boom
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + duration);

    subGain.gain.setValueAtTime(0.5, now);
    subGain.gain.exponentialRampToValueAtTime(0.005, now + duration);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + duration);

    // 2. Heavy White Noise Crunch
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + duration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + duration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 🛡️ Metallic Shield Deflect / Dodge Sound Effect
 */
export function playShieldDeflectSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(400, now + 0.18);

    osc2.frequency.setValueAtTime(1800, now);
    osc2.frequency.exponentialRampToValueAtTime(600, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.18);
    osc2.stop(now + 0.18);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 🎺 Bug Hunter Victory Fanfare Jingle (HD Arcade Chord)
 */
export function playVictoryJingleSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    const durations = [0.1, 0.1, 0.1, 0.1, 0.4];
    let timeOffset = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, timeOffset);

      gain.gain.setValueAtTime(0.35, timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.005, timeOffset + durations[idx]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(timeOffset);
      osc.stop(timeOffset + durations[idx]);

      timeOffset += durations[idx] * 0.9;
    });
  } catch (e) {
    console.error('Audio playback error', e);
  }
}

/**
 * 🖱️ High-Quality Button Click SFX
 */
export function playButtonClickSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    console.error('Audio playback error', e);
  }
}
