import {
  BookOpen,
  Trophy,
  User,
  LayoutGrid,
  Menu,
  X,
  Code2,
  Sparkles,
  Grid3x3,
  GraduationCap,
  LogOut,
  ShieldCheck,
  Bug,
  Workflow,
} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/lib/auth';

export type Page =
  | 'home'
  | 'levels'
  | 'dashboard'
  | 'lesson'
  | 'quiz'
  | 'profile'
  | 'story'
  | 'playground'
  | 'flowchart'
  | 'practice'
  | 'patterns'
  | 'tutor'
  | 'bughunter'
  | 'admin';

interface NavbarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const baseLinks: { id: Page; label: string; icon: typeof BookOpen }[] = [
  { id: 'home', label: 'Home', icon: BookOpen },
  { id: 'levels', label: 'Levels', icon: GraduationCap },
  { id: 'dashboard', label: 'Courses', icon: LayoutGrid },
  { id: 'bughunter', label: '🐛 Bug Hunter', icon: Bug },
  { id: 'flowchart', label: '📊 C Flowchart', icon: Workflow },
  { id: 'playground', label: 'Playground', icon: Code2 },
  { id: 'practice', label: 'Practice', icon: Sparkles },
  { id: 'patterns', label: 'Patterns', icon: Grid3x3 },
  { id: 'tutor', label: 'AI Tutor', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { profile, signOut, isAdmin } = useAuth();

  const go = (p: Page) => {
    onNavigate(p);
    setOpen(false);
  };

  const displayName = profile?.name ? `Hi ${profile.name} 👋` : 'Learner';

  const links = [...baseLinks];
  if (isAdmin) {
    links.push({ id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-bamboo-100/80 bg-white/90 backdrop-blur-md dark:border-bamboo-800/80 dark:bg-ink-950/90">
      <nav className="container-page flex h-16 items-center justify-between">
        <button onClick={() => go(isAdmin ? 'admin' : 'home')} className="flex items-center gap-2.5 text-left">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-600 text-white shadow-soft">
            <BookOpen className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
            Code Kathai
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const Icon = l.icon;
            const active = current === l.id || (l.id === 'dashboard' && current === 'lesson');
            const isAdminBtn = l.id === 'admin';

            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-bamboo-600 text-white shadow-soft'
                    : 'text-ink-700 hover:bg-bamboo-100 hover:text-bamboo-800 dark:text-ink-300 dark:hover:bg-ink-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {l.label}
              </button>
            );
          })}
        </div>

        {/* User Badge & Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <span className="rounded-full bg-bamboo-100 px-3 py-1 text-xs font-bold text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300 max-w-[150px] truncate">
            {displayName}
          </span>
          <button
            onClick={() => signOut()}
            className="btn-ghost p-2 text-xs text-ink-500 hover:text-red-600"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-bamboo-200 bg-white text-bamboo-800 dark:border-bamboo-700 dark:bg-ink-900 dark:text-white"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-bamboo-100 bg-white p-4 dark:border-bamboo-800 dark:bg-ink-900 lg:hidden">
          <div className="mb-3 flex items-center justify-between border-b border-bamboo-100 pb-2 dark:border-bamboo-800">
            <span className="text-xs font-bold text-bamboo-700 dark:text-bamboo-300">
              {displayName} {isAdmin && '(Admin)'}
            </span>
            <span className="text-xs text-ink-400 capitalize">{profile?.currentLevel ?? 'beginner'} Level</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => {
              const Icon = l.icon;
              const active = current === l.id || (l.id === 'dashboard' && current === 'lesson');
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold ${
                    active
                      ? 'bg-bamboo-600 text-white font-bold'
                      : 'text-ink-700 hover:bg-bamboo-50 dark:text-ink-300 dark:hover:bg-ink-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="col-span-2 mt-2 flex items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
