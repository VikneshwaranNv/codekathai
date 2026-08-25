import { useEffect, useState } from 'react';
import type { CodePart } from '@/types';

interface CodeBlockProps {
  parts: CodePart[];
  caption?: string;
  animate?: boolean;
  className?: string;
}

const toneClasses: Record<string, string> = {
  keyword: 'text-pink-400 font-bold',      // Control & Return Keywords -> Pink
  type: 'text-sky-400 font-extrabold',      // Data Types -> Sky Blue
  name: 'text-amber-300 font-bold',        // Functions & Identifiers -> Amber Yellow
  value: 'text-emerald-400 font-semibold',  // Strings & Literals -> Emerald Green
  number: 'text-orange-400 font-bold',     // Numbers -> Orange
  punct: 'text-rose-400 font-bold',        // Operators & Punctuation -> Rose
  comment: 'text-slate-400 italic',         // Comments -> Muted Slate
  plain: 'text-gray-100 font-medium',       // Plain Variables & Text -> Soft White
};

export default function CodeBlock({ parts, caption, animate = true, className = '' }: CodeBlockProps) {
  const [revealed, setRevealed] = useState(animate ? 0 : parts.length);

  useEffect(() => {
    if (!animate) {
      setRevealed(parts.length);
      return;
    }
    setRevealed(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealed(i);
      if (i < parts.length) setTimeout(tick, 90);
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [parts, animate]);

  return (
    <div className={`overflow-hidden rounded-2xl bg-ink-950 border border-ink-800 shadow-card ${className}`}>
      {/* Top Header with Color Guide Indicator */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-ink-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-xs font-bold text-emerald-400">code.c</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] font-mono select-none">
          <span className="text-sky-400 font-bold">Data Type</span>
          <span className="text-pink-400 font-bold">Keyword</span>
          <span className="text-amber-300 font-bold">Function</span>
          <span className="text-gray-100 font-medium">Variable</span>
        </div>
      </div>
      <div className="px-5 py-4 font-mono text-[15px] leading-relaxed text-gray-100">
        <pre className="whitespace-pre-wrap break-words">
          <code>
            {parts.map((p, idx) => (
              <span
                key={idx}
                className={`${toneClasses[p.tone ?? 'plain']} transition-opacity duration-200`}
                style={{ opacity: idx < revealed ? 1 : 0 }}
              >
                {p.text}
              </span>
            ))}
            <span className="ml-0.5 inline-block h-4 w-2 animate-type-cursor bg-emerald-400 align-middle" />
          </code>
        </pre>
        {caption && (
          <p className="mt-3 border-t border-white/10 pt-3 font-sans text-xs font-semibold text-emerald-300">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
