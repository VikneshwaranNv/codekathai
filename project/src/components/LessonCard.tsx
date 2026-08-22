import { Clock, Zap, ChevronRight } from 'lucide-react';

interface LessonCardProps {
  title: string;
  tamilTitle: string;
  duration: number;
  xp: number;
  index: number;
  completed?: boolean;
  onStart: () => void;
}

export default function LessonCard({
  title,
  tamilTitle,
  duration,
  xp,
  index,
  completed,
  onStart,
}: LessonCardProps) {
  return (
    <button
      onClick={onStart}
      className="group flex w-full items-center gap-4 rounded-2xl border border-bamboo-100 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-bamboo-300 hover:shadow-card"
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold ${
          completed ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700'
        }`}
      >
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="truncate font-semibold text-bamboo-950">{title}</h4>
        </div>
        <p className="truncate font-tamil text-sm text-bamboo-700">{tamilTitle}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {duration} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Zap className="h-3 w-3 text-golden-500" /> {xp} XP
          </span>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-bamboo-400 transition-transform group-hover:translate-x-1 group-hover:text-bamboo-600" />
    </button>
  );
}
