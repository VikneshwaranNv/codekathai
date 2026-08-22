import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  className?: string;
  trackClassName?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ProgressBar({
  value,
  className = '',
  trackClassName = '',
  showLabel = false,
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  const [width, setWidth] = useState(animated ? 0 : value);
  const clamped = Math.max(0, Math.min(100, value));

  useEffect(() => {
    if (!animated) {
      setWidth(clamped);
      return;
    }
    const t = setTimeout(() => setWidth(clamped), 80);
    return () => clearTimeout(t);
  }, [clamped, animated]);

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 overflow-hidden rounded-full bg-bamboo-100 ${heights[size]} ${trackClassName}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-bamboo-500 to-bamboo-600 transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-bold text-bamboo-700 tabular-nums">{Math.round(clamped)}%</span>
      )}
    </div>
  );
}
