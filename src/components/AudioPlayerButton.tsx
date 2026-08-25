import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { speakTamilStory, stopTamilStory, isSpeechPlaying } from '@/lib/speechUtils';

interface AudioPlayerButtonProps {
  text: string;
  speaker?: 'kavi' | 'buddy' | 'narrator';
  className?: string;
}

export default function AudioPlayerButton({
  text,
  speaker = 'narrator',
  className = '',
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      // Stop speech if component unmounts
      stopTamilStory();
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      stopTamilStory();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const success = speakTamilStory(
        text,
        speaker,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      if (!success) setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all shadow-sm ${
        isPlaying
          ? 'bg-amber-500 text-bamboo-950 ring-2 ring-amber-300 animate-pulse'
          : 'bg-bamboo-100 text-bamboo-800 hover:bg-bamboo-200 dark:bg-ink-800 dark:text-bamboo-300'
      } ${className}`}
      title={isPlaying ? 'Pause Audio' : 'Play Tamil Voiceover'}
    >
      {isPlaying ? (
        <>
          <Pause className="h-3.5 w-3.5 fill-current" />
          <span>Pause ⏸</span>
          <span className="flex gap-0.5 items-end h-3 ml-1">
            <span className="w-0.5 h-3 bg-bamboo-950 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-2 bg-bamboo-950 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-3.5 bg-bamboo-950 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="h-3.5 w-3.5 text-bamboo-600 dark:text-bamboo-400" />
          <span>Play Audio 🔊</span>
        </>
      )}
    </button>
  );
}
