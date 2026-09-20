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
  Image as ImageIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

import { useLanguage } from '@/lib/languageContext';

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
  | 'matrix'
  | 'visual'
  | 'practice'
  | 'patterns'
  | 'tutor'
  | 'bughunter'
  | 'admin'
  | 'login';

interface NavbarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const baseLinks: { id: Page; label: string; icon: typeof BookOpen }[] = [
  { id: 'home', label: 'Home', icon: BookOpen },
  { id: 'levels', label: 'Levels', icon: GraduationCap },
  { id: 'dashboard', label: 'Courses', icon: LayoutGrid },
  { id: 'visual', label: '🖼️ Visual Learning', icon: ImageIcon },
  { id: 'matrix', label: '🧬 C ↔ Java Matrix', icon: Sparkles },
  { id: 'bughunter', label: '🐛 Bug Hunter', icon: Bug },
  { id: 'flowchart', label: '📊 Flowchart', icon: Workflow },
  { id: 'playground', label: 'Playground', icon: Code2 },
  { id: 'practice', label: 'Practice', icon: Sparkles },
  { id: 'patterns', label: 'Patterns', icon: Grid3x3 },
  { id: 'tutor', label: 'AI Tutor', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { profile, signOut, isAdmin } = useAuth();
  const { language, setLanguage } = useLanguage();

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
      <nav className="container-page flex h-16 items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-2.5 shrink-0">
          <button onClick={() => go(isAdmin ? 'admin' : 'home')} className="flex items-center gap-2 text-left shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-600 text-white shadow-soft shrink-0">
              <BookOpen className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-base sm:text-lg font-bold text-bamboo-950 dark:text-white hidden sm:inline-block whitespace-nowrap">
              Code Kathai
            </span>
          </button>

          {/* LANGUAGE SWITCHER: C | JAVA */}
          <div className="flex items-center gap-0.5 bg-ink-100 dark:bg-ink-900 p-0.5 rounded-full border border-bamboo-200 dark:border-bamboo-800 shadow-inner text-[11px] font-bold select-none shrink-0">
            <button
              onClick={() => setLanguage('c')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                language === 'c'
                  ? 'bg-bamboo-600 text-white shadow-soft font-extrabold scale-105'
                  : 'text-ink-600 dark:text-ink-400 hover:text-bamboo-600'
              }`}
            >
              💙 C
            </button>
            <button
              onClick={() => setLanguage('java')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                language === 'java'
                  ? 'bg-gradient-to-r from-amber-600 to-golden-600 text-white shadow-soft font-extrabold scale-105'
                  : 'text-ink-600 dark:text-ink-400 hover:text-golden-500'
              }`}
            >
              ☕ Java
            </button>
          </div>
        </div>

        {/* Desktop Links - Scrollable without pushing viewport width */}
        <div className="hidden items-center gap-1 overflow-x-auto no-scrollbar py-1 max-w-[50vw] xl:max-w-none lg:flex shrink min-w-0">
          {links.map((l) => {
            const Icon = l.icon;
            const active = current === l.id || (l.id === 'dashboard' && current === 'lesson');

            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
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
        <div className="hidden items-center gap-2 lg:flex shrink-0">
          <button
            onClick={() => go('profile')}
            className="flex items-center gap-1.5 rounded-full bg-bamboo-100 hover:bg-bamboo-200 px-3 py-1 text-xs font-bold text-bamboo-800 dark:bg-bamboo-950 dark:hover:bg-bamboo-900 dark:text-bamboo-300 max-w-[140px] xl:max-w-[180px] truncate transition-all cursor-pointer shadow-xs border border-bamboo-200/60 dark:border-bamboo-800/60"
            title="View My Profile & Progress"
          >
            <User className="h-3.5 w-3.5 text-bamboo-600 dark:text-bamboo-400 shrink-0" />
            <span className="truncate">{displayName}</span>
          </button>
          <button
            onClick={() => signOut()}
            className="btn-ghost p-2 text-xs text-ink-500 hover:text-red-600"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-bamboo-200 bg-white text-bamboo-800 dark:border-bamboo-700 dark:bg-ink-900 dark:text-white shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-bamboo-100 bg-white/95 backdrop-blur-lg p-4 dark:border-bamboo-800 dark:bg-ink-900 lg:hidden max-w-full overflow-hidden shadow-2xl">
          <div className="mb-3 flex items-center justify-between border-b border-bamboo-100 pb-2 dark:border-bamboo-800">
            <button
              onClick={() => go('profile')}
              className="text-xs font-bold text-bamboo-700 dark:text-bamboo-300 truncate max-w-[200px] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              {displayName} {isAdmin && '(Admin)'}
            </button>
            <span className="text-[10px] uppercase font-bold text-ink-500 bg-ink-100 dark:bg-ink-800 px-2 py-0.5 rounded-full capitalize">
              {profile?.currentLevel ?? 'beginner'} Level
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => {
              const Icon = l.icon;
              const active = current === l.id || (l.id === 'dashboard' && current === 'lesson');
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                    active
                      ? 'bg-bamboo-600 text-white font-bold shadow-soft'
                      : 'text-ink-700 hover:bg-bamboo-50 dark:text-ink-300 dark:hover:bg-ink-800'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{l.label}</span>
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
