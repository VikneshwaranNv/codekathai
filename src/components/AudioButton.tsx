import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, Loader2 } from 'lucide-react';

interface AudioButtonProps {
  src: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AudioButton({ src, label = 'Play Tamil Voice', size = 'md', className = '' }: AudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const onTime = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setStatus('idle');
      setProgress(0);
      audio.currentTime = 0;
    };
    const onPlaying = () => setStatus('playing');
    const onPause = () => setStatus((s) => (s === 'error' ? s : 'paused'));
    const onWaiting = () => setStatus('loading');
    const onError = () => setStatus('error');

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('error', onError);
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === 'error') {
      setStatus('idle');
      return;
    }

    if (status === 'idle' || status === 'paused') {
      if (audio.src !== src) {
        audio.src = src;
        audio.load();
      }
      setStatus('loading');
      audio.play().catch(() => setStatus('error'));
    } else if (status === 'playing') {
      audio.pause();
    }
  }, [status, src]);

  const restart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || status === 'error') return;
    if (audio.src !== src) {
      audio.src = src;
      audio.load();
    }
    audio.currentTime = 0;
    setProgress(0);
    setStatus('loading');
    audio.play().catch(() => setStatus('error'));
  }, [status, src]);

  const sizeClasses = {
    sm: 'h-9 px-3 text-xs gap-1.5',
    md: 'h-11 px-4 text-sm gap-2',
    lg: 'h-12 px-5 text-sm gap-2.5',
  };

  const iconSize = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={toggle}
        disabled={status === 'loading'}
        className={`btn bg-bamboo-600 text-white hover:bg-bamboo-700 ${sizeClasses[size]} relative overflow-hidden`}
        aria-label={label}
      >
        <span className="absolute inset-0 -z-10 bg-bamboo-600 transition-all" style={{ width: `${progress}%`, opacity: 0.25 }} />
        {status === 'loading' ? (
          <Loader2 className={`${iconSize[size]} animate-spin`} />
        ) : status === 'playing' ? (
          <Pause className={iconSize[size]} />
        ) : (
          <Play className={`${iconSize[size]} fill-current`} />
        )}
        <Volume2 className={iconSize[size]} />
        <span>{status === 'playing' ? 'Playing...' : status === 'error' ? 'Voice N/A' : label}</span>
      </button>

      {(status === 'playing' || status === 'paused') && (
        <button
          onClick={restart}
          className={`grid place-items-center rounded-full bg-bamboo-100 text-bamboo-700 transition-all hover:bg-bamboo-200 ${sizeClasses[size].split(' ')[0]}`}
          aria-label="Restart voice"
        >
          <RotateCcw className={iconSize[size]} />
        </button>
      )}
    </div>
  );
}
