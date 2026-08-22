import { useState } from 'react';
import { Trophy, Zap, Flame, TrendingUp, ChevronRight, Star } from 'lucide-react';
import * as Icons from 'lucide-react';
import { modules, lessons } from '@/data/course';
import CourseCard from '@/components/CourseCard';
import LessonCard from '@/components/LessonCard';
import ProgressBar from '@/components/ProgressBar';
import type { Page } from '@/components/Navbar';
import type { ModuleId } from '@/data/course';
import type { ProgressState } from '@/lib/useProgress';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onStartLesson: (moduleId: ModuleId, lessonId: string) => void;
  progress: ProgressState;
}

export default function DashboardPage({ onNavigate, onStartLesson, progress }: DashboardPageProps) {
  const [activeModule, setActiveModule] = useState<ModuleId>('variables');
  const mod = modules.find((m) => m.id === activeModule)!;
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[mod.icon] ?? Icons.Box;

  const completedCount = lessons.filter((l) => progress.isCompleted(l.moduleId, l.id)).length;
  const xp = progress.stats?.xp ?? 0;
  const streak = progress.stats?.streak ?? 0;
  const level = progress.stats?.level ?? 1;
  const overallProgress = Math.round(
    modules.reduce((sum, m) => sum + progress.moduleProgress(m.id), 0) / modules.length
  );

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">C Programming Course</p>
          <h1 className="section-title mt-1">Your Learning Dashboard</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            10 modules, 38 lessons, and a story in every one. Pick up where you left off.
          </p>
        </div>
        <button onClick={() => onNavigate('profile')} className="btn-ghost text-sm">
          View Profile <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Zap, label: 'XP Points', value: xp.toLocaleString(), accent: 'bamboo' },
          { icon: Flame, label: 'Day Streak', value: streak, accent: 'golden' },
          { icon: Trophy, label: 'Badges Earned', value: '4 / 8', accent: 'golden' },
          { icon: TrendingUp, label: 'Course Progress', value: `${overallProgress}%`, accent: 'bamboo' },
        ].map((s) => {
          const SIcon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${s.accent === 'golden' ? 'bg-golden-100 text-golden-700' : 'bg-bamboo-100 text-bamboo-700'}`}>
                <SIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold text-bamboo-950">{s.value}</p>
                <p className="text-xs font-semibold text-ink-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall progress bar */}
      <div className="card mb-10 p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold text-bamboo-950">Overall Course Progress</p>
          <span className="text-sm font-bold text-bamboo-700">{overallProgress}%</span>
        </div>
        <ProgressBar value={overallProgress} size="lg" />
      </div>

      {/* Modules grid */}
      <div className="mb-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-bamboo-950">Modules</h2>
          <span className="text-sm text-ink-500">{modules.length} modules · {modules.filter(m => m.starred).length} starred</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <CourseCard
              key={m.id}
              module={m}
              index={i}
              onStart={() => {
                setActiveModule(m.id);
                const firstLesson = m.topics[0];
                onStartLesson(m.id, firstLesson.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Active module detail */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="card sticky top-20 overflow-hidden">
            <div className="bg-gradient-to-br from-bamboo-600 to-bamboo-800 p-6 text-white">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-bamboo-100">
                Module {mod.index} {mod.starred && <Star className="ml-1 inline h-3 w-3 fill-golden-300 text-golden-300" />}
              </p>
              <h3 className="font-display text-2xl font-semibold">{mod.title}</h3>
              <p className="font-tamil text-sm text-bamboo-100">{mod.tamilTitle}</p>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-ink-600">{mod.description}</p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-500">Progress</span>
                  <span className="font-bold text-bamboo-700">{progress.moduleProgress(mod.id)}%</span>
                </div>
                <ProgressBar value={progress.moduleProgress(mod.id)} size="sm" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-400">
                {mod.topics.length} Topics
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-bamboo-950">Topics in this module</h2>
            <div className="flex flex-wrap gap-1.5">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    m.id === activeModule
                      ? 'bg-bamboo-600 text-white'
                      : 'bg-bamboo-100 text-bamboo-700 hover:bg-bamboo-200'
                  }`}
                >
                  {m.index}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {mod.topics.map((t, i) => (
              <LessonCard
                key={t.id}
                title={t.title}
                tamilTitle={t.tamilTitle}
                duration={6 + (i % 4)}
                xp={40 + i * 5}
                index={i + 1}
                completed={progress.isCompleted(mod.id, t.id)}
                onStart={() => onStartLesson(mod.id, t.id)}
              />
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-golden-50 to-bamboo-50 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-golden-100 text-golden-700">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-bamboo-950">Module Badge</p>
                <p className="text-sm text-ink-600">Finish all topics to earn the "{mod.title} Master" badge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
