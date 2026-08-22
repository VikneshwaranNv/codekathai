import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ck-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('ck-theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="grid h-10 w-10 place-items-center rounded-xl border border-bamboo-200 bg-white text-bamboo-800 transition-all hover:bg-bamboo-50 active:scale-95 dark:border-bamboo-700 dark:bg-ink-800 dark:text-bamboo-100 dark:hover:bg-ink-700"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
