import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Trophy,
  Flame,
  Sprout,
  Crown,
} from 'lucide-react';
import type { ModuleId, Level } from '@/types';
import { modules } from '@/data/course';
import { useAuth } from '@/lib/auth';
import type { ProgressState } from '@/lib/useProgress';
import type { Page } from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onStartLesson: (moduleId: ModuleId, lessonId: string) => void;
  progress: ProgressState;
}

export default function DashboardPage({
  onNavigate,
  onStartLesson,
  progress,
}: DashboardPageProps) {
  const { profile } = useAuth();
  const currentLevel: Level = profile?.currentLevel ?? 'beginner';
  const name = profile?.name ?? 'Learner';

  const levelBadge =
    currentLevel === 'beginner' ? (
      <span className="flex items-center gap-1 text-xs font-bold text-bamboo-700 bg-bamboo-100 px-3 py-1 rounded-full dark:bg-bamboo-950 dark:text-bamboo-300">
        <Sprout className="h-3.5 w-3.5" /> Beginner Track
      </span>
    ) : currentLevel === 'intermediate' ? (
      <span className="flex items-center gap-1 text-xs font-bold text-golden-700 bg-golden-100 px-3 py-1 rounded-full dark:bg-golden-950 dark:text-golden-300">
        <Flame className="h-3.5 w-3.5" /> Intermediate Track
      </span>
    ) : (
      <span className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full dark:bg-purple-950 dark:text-purple-300">
        <Crown className="h-3.5 w-3.5" /> Advanced Track
      </span>
    );

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Welcome Banner */}
      <div className="card mb-8 p-6 sm:p-8 bg-gradient-to-r from-bamboo-600 to-emerald-700 text-white border-0 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-200">
                Dashboard
              </span>
              {levelBadge}
            </div>
            <h1 className="font-display text-2xl font-bold sm:text-4xl">Hi {name} 👋</h1>
            <p className="font-tamil mt-1 text-sm text-bamboo-100">
              உங்கள் C Programming கற்றல் பயணத்தைத் தொடருங்கள்! (Current Level: {currentLevel})
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-bamboo-200">Total XP</span>
              <p className="font-display text-xl font-bold text-golden-300">
                {progress.xp} XP
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-bamboo-200">Completed</span>
              <p className="font-display text-xl font-bold text-white">
                {progress.completedCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-bamboo-950 dark:text-white sm:text-2xl">
            C Programming Course Modules
          </h2>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-400">
            ஒவ்வொரு module-ஐயும் தேர்வு செய்து தமிழ் கதைகள் வழியே பயிலுங்கள்.
          </p>
        </div>
        <button
          onClick={() => onNavigate('levels')}
          className="btn-ghost text-xs font-bold text-bamboo-700 hover:bg-bamboo-100 dark:text-bamboo-300"
        >
          Change Level ({currentLevel}) →
        </button>
      </div>

      {/* Modules List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => {
          const topicIds = mod.topics.map((t) => t.id);
          const p = progress.moduleProgress(mod.id, topicIds);
          const firstLessonId = mod.topics[0]?.id ?? `${mod.id}-what-is-var`;

          return (
            <div
              key={mod.id}
              className="card flex flex-col justify-between p-6 border border-bamboo-100 dark:border-bamboo-800 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-950 dark:text-bamboo-300 font-bold text-sm">
                    #{mod.index}
                  </span>
                  <span className="text-xs font-bold text-ink-500">{mod.topics.length} Topics</span>
                </div>

                <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
                  {mod.title}
                </h3>
                <p className="font-tamil text-xs font-bold text-bamboo-700 dark:text-bamboo-300 mt-0.5">
                  {mod.tamilTitle}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                  {mod.description}
                </p>

                <p className="font-tamil mt-1 text-xs text-ink-500">
                  {mod.tamilDescription}
                </p>

                <div className="mt-4">
                  <ProgressBar value={p} showLabel />
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onStartLesson(mod.id, firstLessonId)}
                  className="btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                >
                  {p > 0 ? 'Continue Module' : 'Start Module'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
