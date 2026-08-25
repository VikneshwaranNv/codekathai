/**
 * Native Web Speech API Utility for Pure Tamil Female Audio Voiceover
 * Maximum Volume Boost & Crystal Clear Spoken Tamil Delivery.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Pre-processes text into pure spoken Tamil script for flawless Tamil voice synthesis.
 */
export function toPureTamilSpeechText(text: string): string {
  if (!text) return '';

  return text
    .replace(/\bint\b/g, 'இன்ட்')
    .replace(/\bfloat\b/g, 'ஃப்ளோட்')
    .replace(/\bchar\b/g, 'கேர்')
    .replace(/\bdouble\b/g, 'டபிள்')
    .replace(/\bvoid\b/g, 'வாய்ட்')
    .replace(/\bmain\(\)\b/g, 'மெயின் சார்பு')
    .replace(/\bmain\b/g, 'மெயின்')
    .replace(/\bprintf\b/g, 'பிரிண்ட் எஃப்')
    .replace(/\bscanf\b/g, 'ஸ்கேன் எஃப்')
    .replace(/\bVariable\b/gi, 'வேரியபிள்')
    .replace(/\bdata\b/gi, 'தரவு')
    .replace(/\bbox\b/gi, 'பெட்டி')
    .replace(/\bCode Buddy\b/gi, 'கோட் படி')
    .replace(/\bKavi\b/gi, 'கவி')
    .replace(/\bProgramming\b/gi, 'நிரலாக்கம்')
    .replace(/\bif\b/g, 'இஃப் நிபந்தனை')
    .replace(/\belse\b/g, 'எல்ஸ்')
    .replace(/\bfor\b/g, 'ஃபார் சுழற்சி')
    .replace(/\bwhile\b/g, 'வைல் சுழற்சி')
    .replace(/\breturn\b/g, 'ரிட்டர்ன்')
    .replace(/;/g, '')
    .replace(/\{/g, '')
    .replace(/\}/g, '')
    .replace(/=/g, 'சமம்')
    .replace(/\+/g, 'கூட்டல்')
    .replace(/\-/g, 'கழித்தல்')
    .replace(/\*/g, 'பெருக்கல்')
    .replace(/\//g, 'வகுத்தல்');
}

export function speakTamilStory(
  rawText: string,
  speaker: 'kavi' | 'buddy' | 'narrator' = 'narrator',
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return false;
  }

  // Stop any currently playing audio
  stopTamilStory();

  try {
    const pureTamilText = toPureTamilSpeechText(rawText);
    const utterance = new SpeechSynthesisUtterance(pureTamilText);

    // MAX VOLUME BOOST
    utterance.volume = 1.0; // 100% max volume

    // Fetch browser voices
    const voices = window.speechSynthesis.getVoices();

    // Search for Tamil Female Voice
    const tamilFemaleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('ta') &&
          (v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('google தமிழ்') ||
            v.name.toLowerCase().includes('heera') ||
            v.name.toLowerCase().includes('valluvar') ||
            v.name.toLowerCase().includes('zira'))
      ) ||
      voices.find((v) => v.lang.startsWith('ta')) ||
      voices.find((v) => v.lang.includes('IN')) ||
      null;

    if (tamilFemaleVoice) {
      utterance.voice = tamilFemaleVoice;
      utterance.lang = tamilFemaleVoice.lang;
    } else {
      utterance.lang = 'ta-IN';
    }

    // High Clarity Pitch & Speed
    if (speaker === 'kavi') {
      utterance.pitch = 1.3; // Bright Tamil Female student voice
      utterance.rate = 0.95;
    } else if (speaker === 'buddy') {
      utterance.pitch = 1.15; // Clear Tamil Female AI Guide voice
      utterance.rate = 1.0;
    } else {
      utterance.pitch = 1.2; // Loud & clear Tamil Female narrator
      utterance.rate = 0.95;
    }

    utterance.onend = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      currentUtterance = null;
      if (onError) onError(e);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Tamil speech synthesis error:', err);
    if (onError) onError(err);
    return false;
  }
}

export function stopTamilStory(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function isSpeechPlaying(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}
