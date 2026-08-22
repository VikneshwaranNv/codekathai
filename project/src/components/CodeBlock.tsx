import { useEffect, useState } from 'react';
import type { CodePart } from '@/data/course';

interface CodeBlockProps {
  parts: CodePart[];
  caption?: string;
  animate?: boolean;
  className?: string;
}

const toneClasses: Record<string, string> = {
  keyword: 'text-golden-500 font-semibold',
  type: 'text-bamboo-600 font-semibold',
  name: 'text-ink-900',
  value: 'text-golden-600 font-medium',
  punct: 'text-ink-400',
  comment: 'text-ink-400 italic',
  plain: 'text-ink-700',
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
    <div className={`overflow-hidden rounded-2xl bg-ink-950 shadow-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-golden-400/80" />
        <span className="h-3 w-3 rounded-full bg-bamboo-400/80" />
        <span className="ml-2 font-mono text-xs text-white/40">code.c</span>
      </div>
      <div className="px-5 py-4 font-mono text-[15px] leading-relaxed">
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
            <span className="ml-0.5 inline-block h-4 w-2 animate-type-cursor bg-bamboo-400 align-middle" />
          </code>
        </pre>
        {caption && (
          <p className="mt-3 border-t border-white/10 pt-3 font-sans text-xs text-bamboo-300">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
