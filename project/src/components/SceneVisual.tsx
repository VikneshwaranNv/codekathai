import type { StoryScene } from '@/data/course';

interface SceneVisualProps {
  visual: StoryScene['visual'];
  className?: string;
}

export default function SceneVisual({ visual, className = '' }: SceneVisualProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      {renderVisual(visual)}
    </div>
  );
}

function renderVisual(visual: StoryScene['visual']) {
  switch (visual) {
    case 'lunchbox':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
          <defs>
            <linearGradient id="lb-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd24a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          {/* handle */}
          <path d="M70 40 Q100 20 130 40" stroke="#b45309" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* lid */}
          <rect x="40" y="40" width="120" height="24" rx="8" fill="#f59e0b" />
          {/* body */}
          <rect x="40" y="58" width="120" height="80" rx="12" fill="url(#lb-body)" stroke="#b45309" strokeWidth="2" />
          {/* latches */}
          <rect x="48" y="50" width="8" height="14" rx="2" fill="#b45309" />
          <rect x="144" y="50" width="8" height="14" rx="2" fill="#b45309" />
          {/* label */}
          <rect x="78" y="78" width="44" height="22" rx="4" fill="#fff" opacity="0.9" />
          <text x="100" y="93" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#b45309">Kavi</text>
          {/* food hint */}
          <circle cx="68" cy="118" r="6" fill="#479a63" />
          <circle cx="100" cy="120" r="7" fill="#347d4d" />
          <circle cx="130" cy="118" r="6" fill="#6bb684" />
        </svg>
      );
    case 'memory':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[280px]">
          {/* memory grid */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 42}
                y={20 + row * 32}
                width="36"
                height="26"
                rx="4"
                fill={row === 1 && col === 2 ? '#479a63' : '#e3f4e8'}
                stroke={row === 1 && col === 2 ? '#347d4d' : '#c7e8d1'}
                strokeWidth="1.5"
              />
            ))
          )}
          {/* highlight box */}
          <rect x="104" y="52" width="36" height="26" rx="4" fill="#479a63" />
          <text x="122" y="70" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">20</text>
          {/* label */}
          <text x="122" y="48" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#347d4d">age</text>
          <text x="100" y="150" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600" fill="#6e7864">computer memory</text>
        </svg>
      );
    case 'containers':
      return (
        <svg viewBox="0 0 220 160" className="h-full w-full max-w-[300px]">
          {[
            { x: 20, color: '#479a63', label: 'int', val: '5' },
            { x: 86, color: '#f59e0b', label: 'float', val: '3.14' },
            { x: 152, color: '#347d4d', label: 'char', val: 'A' },
          ].map((b) => (
            <g key={b.label}>
              <rect x={b.x} y="40" width="54" height="70" rx="8" fill={b.color} opacity="0.15" stroke={b.color} strokeWidth="2" />
              <rect x={b.x + 6} y="56" width="42" height="40" rx="4" fill="#fff" stroke={b.color} strokeWidth="1.5" />
              <text x={b.x + 27} y="80" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700" fill={b.color}>{b.val}</text>
              <text x={b.x + 27} y="34" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill={b.color}>{b.label}</text>
            </g>
          ))}
        </svg>
      );
    case 'calculator':
      return (
        <svg viewBox="0 0 160 180" className="h-full w-full max-w-[220px]">
          <rect x="30" y="20" width="100" height="140" rx="12" fill="#fff" stroke="#479a63" strokeWidth="2.5" />
          <rect x="40" y="30" width="80" height="26" rx="4" fill="#1f412c" />
          <text x="116" y="48" textAnchor="end" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700" fill="#6bb684">2 + 3 = 5</text>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={40 + c * 26} y={66 + r * 26} width="22" height="22" rx="4" fill="#e3f4e8" stroke="#c7e8d1" />
            ))
          )}
          <rect x="118" y="66" width="22" height="74" rx="4" fill="#f59e0b" />
          <text x="129" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">=</text>
        </svg>
      );
    case 'signal':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
          {/* pole */}
          <rect x="96" y="50" width="8" height="100" rx="2" fill="#565e4f" />
          <rect x="60" y="40" width="80" height="90" rx="8" fill="#393f36" />
          {/* lights */}
          <circle cx="100" cy="60" r="10" fill="#ef4444" opacity="0.3" />
          <circle cx="100" cy="85" r="10" fill="#f59e0b" opacity="0.3" />
          <circle cx="100" cy="110" r="10" fill="#479a63" className="animate-pulse" />
          {/* glow */}
          <circle cx="100" cy="110" r="16" fill="#479a63" opacity="0.3" className="animate-pulse-ring" />
        </svg>
      );
    case 'repeat':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
          {/* circular arrow */}
          <path
            d="M50 80 A50 50 0 1 1 150 80 A50 50 0 1 1 50 80"
            fill="none"
            stroke="#479a63"
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="animate-spin"
            style={{ transformOrigin: 'center', animationDuration: '6s' }}
          />
          {/* arrow head */}
          <path d="M150 80 L142 70 L142 90 Z" fill="#479a63" />
          {/* counter */}
          <circle cx="100" cy="80" r="26" fill="#fff" stroke="#479a63" strokeWidth="2.5" />
          <text x="100" y="86" textAnchor="middle" fontSize="18" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">i=0</text>
          {/* ticks */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx={100 + 50 * Math.cos((deg * Math.PI) / 180)}
              cy={80 + 50 * Math.sin((deg * Math.PI) / 180)}
              r="4"
              fill="#f59e0b"
            />
          ))}
        </svg>
      );
    case 'machine':
      return (
        <svg viewBox="0 0 220 140" className="h-full w-full max-w-[300px]">
          {/* input */}
          <rect x="10" y="50" width="40" height="40" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
          <text x="30" y="74" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">in</text>
          {/* arrow */}
          <path d="M54 70 L86 70" stroke="#479a63" strokeWidth="3" fill="none" markerEnd="url(#arr)" />
          {/* machine */}
          <rect x="90" y="40" width="60" height="60" rx="10" fill="#f59e0b" />
          <text x="120" y="74" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#fff">fn()</text>
          {/* arrow */}
          <path d="M154 70 L186 70" stroke="#479a63" strokeWidth="3" fill="none" markerEnd="url(#arr)" />
          {/* output */}
          <rect x="190" y="50" width="40" height="40" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
          <text x="210" y="74" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">out</text>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#479a63" />
            </marker>
          </defs>
        </svg>
      );
    case 'lockers':
      return (
        <svg viewBox="0 0 220 140" className="h-full w-full max-w-[300px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={20 + i * 38} y="30" width="32" height="80" rx="4" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
              <rect x={20 + i * 38 + 6} y="40" width="20" height="14" rx="2" fill="#fff" stroke="#c7e8d1" />
              <text x={36 + i * 38} y="92" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">{i * 10}</text>
              <text x={36 + i * 38} y="22" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600" fill="#6e7864">[{i}]</text>
            </g>
          ))}
        </svg>
      );
    case 'address':
      return (
        <svg viewBox="0 0 220 160" className="h-full w-full max-w-[300px]">
          {/* house */}
          <path d="M40 80 L70 50 L100 80 L100 130 L40 130 Z" fill="#e3f4e8" stroke="#479a63" strokeWidth="2.5" />
          <rect x="60" y="100" width="20" height="30" rx="2" fill="#479a63" />
          {/* pointer pin */}
          <path d="M150 30 C170 30 180 50 160 70 C140 50 150 30 150 30 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <circle cx="160" cy="48" r="6" fill="#fff" />
          {/* dotted line */}
          <path d="M150 60 Q120 90 100 100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <text x="70" y="148" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" fill="#347d4d">value</text>
          <text x="165" y="24" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" fill="#b45309">address</text>
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full max-w-[260px]">
          <rect x="20" y="20" width="160" height="100" rx="10" fill="#1f412c" />
          <circle cx="34" cy="34" r="3" fill="#ef4444" />
          <circle cx="44" cy="34" r="3" fill="#f59e0b" />
          <circle cx="54" cy="34" r="3" fill="#6bb684" />
          <text x="100" y="70" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono" fontWeight="600" fill="#6bb684">int age = 20;</text>
          <text x="100" y="92" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="#ffd24a">printf(age);</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full max-w-[240px]">
          <rect x="40" y="30" width="120" height="80" rx="12" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
          <circle cx="100" cy="70" r="20" fill="#6bb684" />
        </svg>
      );
  }
}
