import { Star, Play } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Module } from '@/data/course';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  module: Module;
  onStart: () => void;
  index: number;
}

export default function CourseCard({ module, onStart }: CourseCardProps) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[module.icon] ?? Icons.Box;

  return (
    <div
      className={`group card relative flex flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
        module.starred ? 'ring-1 ring-golden-200' : ''
      }`}
    >
      {module.starred && (
        <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-golden-100 text-golden-600">
          <Star className="h-4 w-4 fill-golden-500" />
        </span>
      )}

      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700 transition-colors group-hover:bg-bamboo-600 group-hover:text-white">
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-bamboo-500">
            Module {module.index}
          </p>
          <h3 className="font-display text-lg font-semibold text-bamboo-950">{module.title}</h3>
        </div>
      </div>

      <p className="mb-1 font-tamil text-sm font-medium text-bamboo-700">{module.tamilTitle}</p>
      <p className="mb-4 text-sm leading-relaxed text-ink-600">{module.description}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-ink-500">{module.topics.length} topics</span>
          <span className="font-bold text-bamboo-700">{module.progress}%</span>
        </div>
        <ProgressBar value={module.progress} size="sm" />
        <button
          onClick={onStart}
          className="btn w-full bg-bamboo-600 text-sm text-white hover:bg-bamboo-700"
        >
          {module.progress > 0 && module.progress < 100 ? (
            <>
              <Play className="h-4 w-4 fill-current" /> Continue
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" /> Start Lesson
            </>
          )}
        </button>
      </div>
    </div>
  );
}
