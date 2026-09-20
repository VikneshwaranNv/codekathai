import { Sprout, ArrowRight, Check } from 'lucide-react';
import type { Level } from '@/types';
import type { Page } from '@/components/Navbar';
import { useAuth } from '@/lib/auth';

interface LevelsPageProps {
  onNavigate: (page: Page) => void;
  onSelectLevel: (level: Level) => void;
}

export default function LevelsPage({ onNavigate, onSelectLevel }: LevelsPageProps) {
  const { profile } = useAuth();
  const current = profile?.currentLevel ?? 'beginner';

  const levelOptions: {
    id: Level;
    title: string;
    tamilTitle: string;
    icon: typeof Sprout;
    color: string;
    bg: string;
    description: string;
    tamilDescription: string;
    storyAnalogy: string;
  }[] = [
    {
      id: 'beginner',
      title: '🌱 Beginner Level / முதல் படி',
      tamilTitle: 'தொடக்க நிலை',
      icon: Sprout,
      color: 'border-bamboo-500 text-bamboo-700 dark:text-bamboo-300',
      bg: 'bg-gradient-to-r from-bamboo-50 to-emerald-50 dark:from-bamboo-950/40 dark:to-emerald-950/40',
      description: 'Start your coding journey — master C & Java fundamentals through rich Tamil stories and interactive visual diagrams.',
      tamilDescription: 'மாறிகள் (Variables), தரவு வகைகள், Control Flow, Methods, Class, Object, Encapsulation, Polymorphism, Abstraction, Interface, Packages & Exception Handling வரை அனைத்தும் எளிய தமிழ் கதைகள் மூலம்!',
      storyAnalogy: 'Variables = Storage Box, Class & Object = Blueprint, OOP = Real-world Analogies',
    },
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="eyebrow mb-2">First Step Learning Journey</span>
        <h1 className="font-display text-3xl font-extrabold text-bamboo-950 dark:text-white sm:text-4xl">
          First Step Learning Track / முதல் படி கற்றல் நிலை
        </h1>
        <p className="font-tamil mt-3 text-sm text-ink-600 dark:text-ink-300">
          எளிய தமிழ் கதைகள், Visual வரைபடங்கள் மற்றும் நேரடி Compilers கொண்டு C &amp; Java கற்றுக் கொள்ளுங்கள்.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {levelOptions.map((lvl) => {
          const Icon = lvl.icon;
          const isCurrent = current === lvl.id;
          return (
            <div
              key={lvl.id}
              className={`card flex flex-col justify-between p-8 border-2 transition-all ${lvl.color} ${lvl.bg} shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-soft dark:bg-ink-900">
                    <Icon className="h-6 w-6 text-bamboo-600" />
                  </span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 rounded-full bg-bamboo-600 px-3 py-1 text-xs font-bold text-white">
                      <Check className="h-3.5 w-3.5" /> Active Track
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white">
                  {lvl.title}
                </h3>
                <p className="font-tamil text-xs font-bold text-bamboo-700 dark:text-bamboo-300 mt-1">
                  {lvl.tamilTitle}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-ink-700 dark:text-ink-300">
                  {lvl.description}
                </p>

                <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  {lvl.tamilDescription}
                </p>

                <div className="mt-4 rounded-xl bg-white/80 p-4 dark:bg-ink-900/80 border border-bamboo-200 dark:border-bamboo-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bamboo-600">
                    Covered Core Concepts:
                  </span>
                  <p className="text-xs font-semibold text-ink-800 dark:text-ink-200 mt-1">
                    Variables • Data Types • Control Flow • Methods • Class &amp; Objects • Encapsulation • Polymorphism • Abstraction • Interface • Packages • Exception Handling
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectLevel(lvl.id);
                  onNavigate('dashboard');
                }}
                className="mt-6 btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-soft bg-bamboo-600 hover:bg-bamboo-500 text-white"
              >
                Start Learning Track ➔
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
