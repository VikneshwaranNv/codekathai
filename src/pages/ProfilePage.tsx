import { Trophy, Award, Flame, Zap, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { ProgressState } from '@/lib/useProgress';
import type { Page } from '@/components/Navbar';
import SectionProgressTracker from '@/components/SectionProgressTracker';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  progress: ProgressState;
}

export default function ProfilePage({ onNavigate, progress }: ProfilePageProps) {
  const { profile } = useAuth();
  const name = profile?.name ?? 'Learner';
  const email = profile?.email ?? 'learner@codekathai.com';
  const level = profile?.currentLevel ?? 'beginner';
  const badges = profile?.badges ?? ['🌱 Starter', '📖 First Kathai'];

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Profile Header */}
      <div className="card mb-8 p-6 sm:p-8 border border-bamboo-100 dark:border-bamboo-800">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-3xl bg-bamboo-600 font-display text-2xl font-bold text-white shadow-soft">
              {name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white">
                Hi {name} 👋
              </h1>
              <p className="text-xs text-ink-500">{email}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-bamboo-100 px-3 py-1 text-xs font-bold text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300 capitalize">
                <GraduationCap className="h-3.5 w-3.5" /> Current Track: {level}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('levels')}
            className="btn-secondary text-xs px-4 py-2"
          >
            Change Learning Level Track
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="card p-5 border border-bamboo-100 dark:border-bamboo-800 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-golden-100 text-golden-600 dark:bg-golden-950 dark:text-golden-400">
            <Zap className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold text-ink-500 uppercase">Total XP</span>
            <p className="font-display text-xl font-bold text-golden-600">{progress.xp} XP</p>
          </div>
        </div>

        <div className="card p-5 border border-bamboo-100 dark:border-bamboo-800 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
            <Flame className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold text-ink-500 uppercase">Day Streak</span>
            <p className="font-display text-xl font-bold text-orange-600">{progress.streak} Days 🔥</p>
          </div>
        </div>

        <div className="card p-5 border border-bamboo-100 dark:border-bamboo-800 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-600 dark:bg-bamboo-950 dark:text-bamboo-400">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold text-ink-500 uppercase">Lessons Completed</span>
            <p className="font-display text-xl font-bold text-bamboo-600">
              {progress.completedCount}
            </p>
          </div>
        </div>

        <div className="card p-5 border border-bamboo-100 dark:border-bamboo-800 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold text-ink-500 uppercase">Current Level</span>
            <p className="font-display text-xl font-bold text-purple-600">Level {progress.level}</p>
          </div>
        </div>
      </div>

      {/* UNIVERSAL ALL-SECTIONS PROGRESS TRACKER */}
      <div className="mb-8">
        <SectionProgressTracker progress={progress} />
      </div>

      {/* Badges Section */}
      <div className="card p-6 border border-bamboo-100 dark:border-bamboo-800 mb-8">
        <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white mb-4">
          Badges & Achievements / விருதுகள் 🏆
        </h3>

        <div className="flex flex-wrap gap-3">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className="rounded-2xl border border-golden-200 bg-golden-50 px-4 py-2 text-xs font-bold text-golden-800 dark:border-golden-800 dark:bg-golden-950 dark:text-golden-300 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
