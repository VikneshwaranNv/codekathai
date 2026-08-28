// High-Fidelity Web Audio API SFX Engine & Sci-Fi Keyboard Synthesizer for Code Kathai
// 100% laptop & browser compatibility with automatic Web Audio unlocker

const SOUND_MUTED_KEY = 'codekathai_sfx_muted';

let audioCtx: AudioContext | null = null;
let isUnlocked = false;

function unlockAudio(): void {
  if (isUnlocked && audioCtx && audioCtx.state === 'running') return;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(() => {
        isUnlocked = true;
      }).catch(() => {});
    } else if (audioCtx.state === 'running') {
      isUnlocked = true;
    }
  }
}

// Auto-register global event listeners so Web Audio is unlocked on ANY laptop interaction
if (typeof window !== 'undefined') {
  const unlockEvents = ['click', 'keydown', 'pointerdown', 'touchstart', 'focus'];
  const handleUserInteraction = () => {
    unlockAudio();
    if (isUnlocked) {
      unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUserInteraction));
    }
  };
  unlockEvents.forEach((evt) => window.addEventListener(evt, handleUserInteraction, { passive: true }));
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  unlockAudio();
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

// Pentatonic Synth Scale frequencies for Sci-Fi Cyber Synth Keyboard SFX
const CYBER_PENTATONIC_SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

/**
 * 🎹 Sci-Fi Cyber Synth Melody Mechanical Keyboard SFX
 * Synthesizes loud, crisp, melodic pentatonic notes on typing keypresses
 */
export function playMechanicalKeyPressSound(key?: string): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const isSpaceOrEnter = key === 'Enter' || key === ' ' || key === 'Space';

    const charCode = key ? key.charCodeAt(0) : Math.floor(Math.random() * 10);
    const noteFreq = CYBER_PENTATONIC_SCALE[charCode % CYBER_PENTATONIC_SCALE.length];

    // Primary Melodic Synth Oscillator
    const osc1 = ctx.createOscillator();
    // Harmonic Layer Oscillator (Adds warmth & projection on laptop speakers)
    const osc2 = ctx.createOscillator();

    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(noteFreq, now);
    osc2.frequency.setValueAtTime(noteFreq * 2, now); // 1 Octave higher harmonic for laptop speaker projection

    // Boosted volume gain for loud laptop audio output
    const peakGain = isSpaceOrEnter ? 0.38 : 0.28;
    gain.gain.setValueAtTime(peakGain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isSpaceOrEnter ? 0.25 : 0.15));

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + (isSpaceOrEnter ? 0.25 : 0.15));
    osc2.stop(now + (isSpaceOrEnter ? 0.25 : 0.15));
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
