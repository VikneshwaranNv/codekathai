import { BookOpen, Trophy, User, LayoutGrid, Menu, X, PlayCircle, Code2, Sparkles, Grid3x3, GraduationCap, LogOut } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/lib/auth';

export type Page = 'home' | 'levels' | 'dashboard' | 'lesson' | 'quiz' | 'profile' | 'story' | 'playground' | 'practice' | 'patterns' | 'tutor' | 'level-dashboard' | 'intermediate-story' | 'advanced-story';

interface NavbarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const links: { id: Page; label: string; icon: typeof BookOpen }[] = [
  { id: 'home', label: 'Home', icon: BookOpen },
  { id: 'levels', label: 'Levels', icon: GraduationCap },
  { id: 'dashboard', label: 'Courses', icon: LayoutGrid },
  { id: 'playground', label: 'Playground', icon: Code2 },
  { id: 'practice', label: 'Practice', icon: Sparkles },
  { id: 'patterns', label: 'Patterns', icon: Grid3x3 },
  { id: 'tutor', label: 'AI Tutor', icon: Trophy },
  { id: 'story', label: 'Story', icon: PlayCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const go = (p: Page) => {
    onNavigate(p);
    setOpen(false);
  };

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
  };

  const displayName = profile?.full_name || 'Learner';

  return (
    <header className="sticky top-0 z-40 border-b border-bamboo-100/80 bg-bamboo-50/80 backdrop-blur-md dark:border-bamboo-800/80 dark:bg-ink-950/80">
      <nav className="container-page flex h-16 items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-600 text-white shadow-soft">
            <BookOpen className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-bamboo-950">Code Kathai</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bamboo-600">Code Stories</span>
          </span>
        </button>

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => {
            const Icon = l.icon;
            const active = current === l.id || (l.id === 'dashboard' && current === 'lesson');
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-bamboo-600 text-white shadow-soft'
                    : 'text-ink-700 hover:bg-bamboo-100 hover:text-bamboo-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {l.label}
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="text-sm font-semibold text-bamboo-800 dark:text-bamboo-200 max-w-[120px] truncate">
            {displayName}
          </span>
          <ThemeToggle />
          <button onClick={handleSignOut} className="btn-ghost px-3 py-2 text-xs" title="Sign out">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-bamboo-200 bg-white text-bamboo-800 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-bamboo-100 bg-white lg:hidden">
          <div className="container-page grid grid-cols-2 gap-1 py-3">
            {links.map((l) => {
              const Icon = l.icon;
              const active = current === l.id || (l.id === 'dashboard' && current === 'lesson');
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                    active ? 'bg-bamboo-600 text-white' : 'text-ink-700 hover:bg-bamboo-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={handleSignOut}
              className="col-span-2 mt-1 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
