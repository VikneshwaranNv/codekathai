import { useState } from 'react';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Page } from '@/components/Navbar';
import type { ProgressState } from '@/lib/useProgress';
import type { Level } from '@/data/levels';
import { intermediateModules, advancedModules, intermediateLessons, advancedLessons, type LevelModule, type LevelLesson } from '@/data/levelCourses';
import LessonCard from '@/components/LessonCard';

interface LevelDashboardPageProps {
  level: Level;
  onNavigate: (page: Page) => void;
  onStartLevelLesson: (lessonId: string, level: Level) => void;
  progress: ProgressState;
}

const levelConfig: Record<Level, { title: string; tamilTitle: string; gradient: string; subtitle: string }> = {
  beginner: { title: 'Beginner', tamilTitle: 'தொடக்க நிலை', gradient: 'from-bamboo-500 to-bamboo-700', subtitle: 'Start from scratch' },
  intermediate: { title: 'Intermediate', tamilTitle: 'நடுநிலை', gradient: 'from-golden-500 to-golden-700', subtitle: 'Build logic and solve problems' },
  advanced: { title: 'Advanced', tamilTitle: 'மேம்பட்ட நிலை', gradient: 'from-rose-500 to-rose-700', subtitle: 'Master data structures and algorithms' },
};

export default function LevelDashboardPage({ level, onNavigate, onStartLevelLesson }: LevelDashboardPageProps) {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);

  const modules: LevelModule[] =
    level === 'intermediate' ? intermediateModules : level === 'advanced' ? advancedModules : [];
  const lessons: LevelLesson[] =
    level === 'intermediate' ? intermediateLessons : level === 'advanced' ? advancedLessons : [];

  const mod = modules[activeModuleIdx] ?? modules[0];
  const Icon = mod ? ((Icons as unknown as Record<string, Icons.LucideIcon>)[mod.icon] ?? Icons.BookOpen) : Icons.BookOpen;
  const cfg = levelConfig[level];
  const moduleLessons = mod ? lessons.filter((l) => l.moduleId === mod.id) : [];

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mb-5 flex items-center gap-2 text-sm text-ink-500">
        <button onClick={() => onNavigate('levels')} className="font-medium hover:text-bamboo-700">
          Learning Paths
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-bamboo-700">{cfg.title}</span>
      </div>

      <div className={`mb-8 overflow-hidden rounded-3xl bg-gradient-to-br ${cfg.gradient} p-8 text-white`}>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{cfg.title} Path</h1>
        <p className="font-tamil mt-1 text-lg text-white/90">{cfg.tamilTitle}</p>
        <p className="mt-3 max-w-xl text-white/80">{cfg.subtitle}</p>
        <div className="mt-4 flex gap-3">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">{modules.length} Modules</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">{lessons.length} Lessons</span>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-5 font-display text-2xl font-semibold text-bamboo-950 dark:text-bamboo-50">Modules</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => {
            const MIcon = (Icons as unknown as Record<string, Icons.LucideIcon>)[m.icon] ?? Icons.BookOpen;
            const mLessons = lessons.filter((l) => l.moduleId === m.id);
            return (
              <button
                key={m.id}
                onClick={() => setActiveModuleIdx(i)}
                className={`card p-5 text-left transition-all hover:shadow-glow hover:-translate-y-0.5 ${
                  i === activeModuleIdx ? 'ring-2 ring-bamboo-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-800 dark:text-bamboo-200">
                    <MIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Module {m.index}</p>
                    <h3 className="font-display text-lg font-semibold text-bamboo-950 dark:text-bamboo-50">{m.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{m.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="chip bg-bamboo-50 text-bamboo-700 dark:bg-bamboo-900 dark:text-bamboo-200">
                    {mLessons.length} lessons
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {mod && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="card sticky top-20 overflow-hidden">
              <div className={`bg-gradient-to-br ${cfg.gradient} p-6 text-white`}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/80">
                  Module {mod.index}
                </p>
                <h3 className="font-display text-2xl font-semibold">{mod.title}</h3>
                <p className="font-tamil text-sm text-white/90">{mod.tamilTitle}</p>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{mod.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-400">
                  {mod.topics.length} Topics
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                Lessons in this module
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {modules.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModuleIdx(i)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      i === activeModuleIdx
                        ? 'bg-bamboo-600 text-white'
                        : 'bg-bamboo-100 text-bamboo-700 hover:bg-bamboo-200 dark:bg-bamboo-900 dark:text-bamboo-200'
                    }`}
                  >
                    {m.index}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {moduleLessons.map((l, i) => (
                <LessonCard
                  key={l.id}
                  title={l.title}
                  tamilTitle={l.tamilTitle}
                  duration={l.duration}
                  xp={l.xp}
                  index={i + 1}
                  completed={false}
                  onStart={() => onStartLevelLesson(l.id, level)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => onNavigate('levels')} className="btn-ghost text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Paths
        </button>
      </div>
    </div>
  );
}
