import {
  Trophy,
  Zap,
  Flame,
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  Target,
  Star,
  ChevronRight,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { profile, badges, modules, lessons } from '@/data/course';
import ProgressBar from '@/components/ProgressBar';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import type { ProgressState } from '@/lib/useProgress';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  progress: ProgressState;
}

export default function ProfilePage({ onNavigate, progress }: ProfilePageProps) {
  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);
  const liveXp = progress.stats?.xp ?? profile.xp;
  const liveLevel = progress.stats?.level ?? profile.level;
  const liveStreak = progress.stats?.streak ?? profile.streak;
  const xpToNext = liveLevel * 500;
  const xpPct = Math.min(100, Math.round((liveXp / xpToNext) * 100));
  const completedLessons = lessons.filter((l) => progress.isCompleted(l.moduleId, l.id)).length;
  const totalLessons = lessons.length;

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Header card */}
      <div className="card mb-8 overflow-hidden">
        <div className="relative bg-gradient-to-br from-bamboo-700 to-bamboo-900 px-6 py-8 sm:px-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-golden-400/20 blur-2xl" />
          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="rounded-3xl bg-white/10 p-2">
              <CharacterAvatar character="kavi" emotion="happy" size={110} animate={false} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{profile.name}</h1>
                <span className="chip bg-golden-400/20 text-golden-200">
                  <Star className="h-3 w-3 fill-golden-300 text-golden-300" /> Level {liveLevel}
                </span>
              </div>
              <p className="mt-1 text-bamboo-100">{profile.handle} · {profile.rank}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-bamboo-100 sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Joined {profile.joined}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-golden-300" /> {liveStreak} day streak
                </span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="relative mt-6 rounded-2xl bg-white/10 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Level {liveLevel}</span>
              <span className="text-bamboo-100">{liveXp} / {xpToNext} XP</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-golden-300 to-golden-500 transition-all duration-700"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-bamboo-100">{xpToNext - liveXp} XP to Level {liveLevel + 1}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: 'Lessons Done', value: `${completedLessons}/${totalLessons}`, pct: Math.round((completedLessons / totalLessons) * 100), color: 'bamboo' },
          { icon: Target, label: 'Avg Quiz Score', value: `${profile.averageScore}%`, pct: profile.averageScore, color: 'golden' },
          { icon: Trophy, label: 'Badges Earned', value: `${earnedBadges.length}/${badges.length}`, pct: Math.round((earnedBadges.length / badges.length) * 100), color: 'bamboo' },
          { icon: Flame, label: 'Day Streak', value: `${liveStreak}`, pct: Math.min(100, liveStreak * 5), color: 'golden' },
        ].map((s) => {
          const SIcon = s.icon;
          return (
            <div key={s.label} className="card p-5">
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${s.color === 'golden' ? 'bg-golden-100 text-golden-700' : 'bg-bamboo-100 text-bamboo-700'}`}>
                  <SIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-bamboo-950">{s.value}</p>
                  <p className="text-xs font-semibold text-ink-500">{s.label}</p>
                </div>
              </div>
              <ProgressBar value={s.pct} size="sm" className="mt-3" />
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="eyebrow">Achievements</p>
            <h2 className="font-display text-2xl font-semibold text-bamboo-950">Badges & Awards</h2>
          </div>
          <span className="text-sm text-ink-500">{earnedBadges.length} earned</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {earnedBadges.map((b) => {
            const BIcon = (Icons as unknown as Record<string, Icons.LucideIcon>)[b.icon] ?? Icons.Award;
            return (
              <div key={b.id} className="card animate-scale-in p-5 text-center ring-1 ring-bamboo-200">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-bamboo-500 to-bamboo-700 text-white shadow-soft">
                  <BIcon className="h-7 w-7" />
                </span>
                <p className="mt-3 font-semibold text-bamboo-950">{b.name}</p>
                <p className="mt-1 text-xs text-ink-500">{b.description}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-bamboo-600">
                  Earned {b.date}
                </p>
              </div>
            );
          })}
          {lockedBadges.map((b) => {
            const BIcon = (Icons as unknown as Record<string, Icons.LucideIcon>)[b.icon] ?? Icons.Award;
            return (
              <div key={b.id} className="card p-5 text-center opacity-60">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">
                  <BIcon className="h-7 w-7" />
                </span>
                <p className="mt-3 font-semibold text-ink-600">{b.name}</p>
                <p className="mt-1 text-xs text-ink-400">{b.description}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                  Locked
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module progress */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="eyebrow">Course Progress</p>
            <h2 className="font-display text-2xl font-semibold text-bamboo-950">Module by module</h2>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="text-sm font-semibold text-bamboo-700 hover:text-bamboo-900">
            All modules <ChevronRight className="inline h-4 w-4" />
          </button>
        </div>
        <div className="card divide-y divide-bamboo-50">
          {modules.map((m) => {
            const MIcon = (Icons as unknown as Record<string, Icons.LucideIcon>)[m.icon] ?? Icons.Box;
            return (
              <div key={m.id} className="flex items-center gap-4 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                  <MIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-bamboo-950">{m.title}</p>
                    {m.starred && <Star className="h-3 w-3 shrink-0 fill-golden-400 text-golden-400" />}
                  </div>
                  <ProgressBar value={progress.moduleProgress(m.id)} size="sm" className="mt-2" />
                </div>
                <span className="shrink-0 text-sm font-bold text-bamboo-700">{progress.moduleProgress(m.id)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-golden-100 to-bamboo-100 p-6 text-center sm:p-8">
        <Zap className="mx-auto h-8 w-8 text-golden-600" />
        <h3 className="mt-3 font-display text-xl font-semibold text-bamboo-950">Keep your streak alive!</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-600">
          You're on a {liveStreak}-day streak. Complete one more lesson today to keep it going.
        </p>
        <button onClick={() => onNavigate('dashboard')} className="btn-primary mt-5 text-sm">
          Continue Learning <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
