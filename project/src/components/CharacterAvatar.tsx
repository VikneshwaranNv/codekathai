import type { StoryScene } from '@/data/course';

interface CharacterAvatarProps {
  character: 'kavi' | 'buddy';
  emotion?: StoryScene['emotion'];
  size?: number;
  animate?: boolean;
}

const emotions: Record<string, { brow: string; mouth: string; eye: string }> = {
  curious: { brow: 'curious', mouth: 'small', eye: 'wide' },
  happy: { brow: 'up', mouth: 'smile', eye: 'happy' },
  thinking: { brow: 'down', mouth: 'flat', eye: 'side' },
  explain: { brow: 'flat', mouth: 'talk', eye: 'normal' },
  surprised: { brow: 'up', mouth: 'o', eye: 'wide' },
  neutral: { brow: 'flat', mouth: 'flat', eye: 'normal' },
};

export function CharacterAvatar({ character, emotion = 'neutral', size = 120, animate = true }: CharacterAvatarProps) {
  const e = emotions[emotion] ?? emotions.neutral;

  if (character === 'kavi') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={animate ? 'animate-bounce-soft' : ''}
        role="img"
        aria-label="Kavi"
      >
        <defs>
          <radialGradient id="kavi-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e3f4e8" />
            <stop offset="100%" stopColor="#c7e8d1" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="56" fill="url(#kavi-bg)" />
        {/* hair */}
        <path d="M28 52 Q30 28 60 26 Q90 28 92 52 Q92 44 60 42 Q28 44 28 52Z" fill="#2f342c" />
        {/* face */}
        <ellipse cx="60" cy="62" rx="26" ry="28" fill="#f5d6b0" />
        {/* eyes */}
        {e.eye === 'wide' ? (
          <>
            <circle cx="50" cy="58" r="4.5" fill="#2f342c" />
            <circle cx="70" cy="58" r="4.5" fill="#2f342c" />
          </>
        ) : e.eye === 'happy' ? (
          <>
            <path d="M46 60 Q50 54 54 60" stroke="#2f342c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M66 60 Q70 54 74 60" stroke="#2f342c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="50" cy="58" r="3" fill="#2f342c" />
            <circle cx="70" cy="58" r="3" fill="#2f342c" />
          </>
        )}
        {/* brows */}
        {e.brow === 'up' && (
          <>
            <path d="M44 50 Q50 47 56 50" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M64 50 Q70 47 76 50" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
        {e.brow === 'curious' && (
          <>
            <path d="M44 51 L56 49" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M64 50 L76 52" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
        {e.brow === 'down' && (
          <>
            <path d="M44 52 Q50 49 56 51" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M64 51 Q70 49 76 52" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
        {e.brow === 'flat' && (
          <>
            <line x1="45" y1="50" x2="55" y2="50" stroke="#2f342c" strokeWidth="2" strokeLinecap="round" />
            <line x1="65" y1="50" x2="75" y2="50" stroke="#2f342c" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {/* mouth */}
        {e.mouth === 'smile' && <path d="M48 74 Q60 84 72 74" stroke="#2f342c" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
        {e.mouth === 'o' && <ellipse cx="60" cy="76" rx="4" ry="5" fill="#2f342c" />}
        {e.mouth === 'talk' && <ellipse cx="60" cy="76" rx="6" ry="3.5" fill="#2f342c" />}
        {e.mouth === 'flat' && <line x1="52" y1="76" x2="68" y2="76" stroke="#2f342c" strokeWidth="2.5" strokeLinecap="round" />}
        {e.mouth === 'small' && <path d="M54 75 Q60 79 66 75" stroke="#2f342c" strokeWidth="2" fill="none" strokeLinecap="round" />}
        {/* bindi */}
        <circle cx="60" cy="44" r="2" fill="#d97706" />
      </svg>
    );
  }

  // Code Buddy - a friendly robot
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={animate ? 'animate-float' : ''}
      role="img"
      aria-label="Code Buddy"
    >
      <defs>
        <radialGradient id="buddy-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff3c7" />
          <stop offset="100%" stopColor="#ffe585" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#buddy-bg)" />
      {/* antenna */}
      <line x1="60" y1="22" x2="60" y2="34" stroke="#479a63" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="20" r="3.5" fill="#479a63" />
      {/* head */}
      <rect x="34" y="34" width="52" height="44" rx="14" fill="#fff" stroke="#479a63" strokeWidth="2.5" />
      {/* screen face */}
      <rect x="40" y="42" width="40" height="28" rx="8" fill="#1f412c" />
      {/* eyes */}
      {e.eye === 'wide' ? (
        <>
          <circle cx="52" cy="56" r="4" fill="#6bb684" />
          <circle cx="68" cy="56" r="4" fill="#6bb684" />
        </>
      ) : e.eye === 'happy' ? (
        <>
          <path d="M48 58 Q52 52 56 58" stroke="#6bb684" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M64 58 Q68 52 72 58" stroke="#6bb684" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="52" cy="56" r="3" fill="#6bb684" />
          <circle cx="68" cy="56" r="3" fill="#6bb684" />
        </>
      )}
      {/* mouth */}
      {e.mouth === 'smile' && <path d="M50 66 Q60 72 70 66" stroke="#6bb684" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {e.mouth === 'o' && <circle cx="60" cy="66" r="3" fill="#6bb684" />}
      {e.mouth === 'talk' && <rect x="55" y="64" width="10" height="5" rx="2.5" fill="#6bb684" />}
      {e.mouth === 'flat' && <line x1="54" y1="66" x2="66" y2="66" stroke="#6bb684" strokeWidth="2" strokeLinecap="round" />}
      {e.mouth === 'small' && <path d="M55 65 Q60 68 65 65" stroke="#6bb684" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {/* body */}
      <rect x="44" y="80" width="32" height="18" rx="8" fill="#fff" stroke="#479a63" strokeWidth="2.5" />
      <circle cx="52" cy="89" r="2" fill="#f59e0b" />
      <circle cx="60" cy="89" r="2" fill="#479a63" />
      <circle cx="68" cy="89" r="2" fill="#f59e0b" />
    </svg>
  );
}
