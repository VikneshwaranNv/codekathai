import { GraduationCap, Sprout, Flame, Crown, ArrowRight, Check } from 'lucide-react';
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
      title: '🌱 Beginner Level',
      tamilTitle: 'தொடக்க நிலை',
      icon: Sprout,
      color: 'border-bamboo-500 text-bamboo-700',
      bg: 'bg-bamboo-50/60 dark:bg-bamboo-950/30',
      description: 'Start from scratch — learn fundamentals of C through lunch box, calculator, and everyday stories.',
      tamilDescription: 'எளிமையான தமிழ் கதைகள் மற்றும் அன்றாட உவமைகள் மூலம் C மொழியின் அடிப்படைகளைக் கற்றுக்கொள்ளுங்கள்.',
      storyAnalogy: 'Variables = Lunch Box Story, Data Types = Storage Containers',
    },
    {
      id: 'intermediate',
      title: '🚀 Intermediate Level',
      tamilTitle: 'நடுநிலை',
      icon: Flame,
      color: 'border-golden-500 text-golden-700',
      bg: 'bg-golden-50/60 dark:bg-golden-950/30',
      description: 'Build logic & problem solving — student mark lists, shopping invoice logic, and loop iterations.',
      tamilDescription: 'தர்க்கத்தை வளர்த்து மாணவர் தரவு மற்றும் நிஜ பயன்பாட்டு கதைகள் மூலம் ஆழமாக பயிலுங்கள்.',
      storyAnalogy: 'Variables = Student Marks Roster, Operators = Shopping Invoice',
    },
    {
      id: 'advanced',
      title: '🧠 Advanced Level',
      tamilTitle: 'மேம்பட்ட நிலை',
      icon: Crown,
      color: 'border-purple-500 text-purple-700',
      bg: 'bg-purple-50/60 dark:bg-purple-950/30',
      description: 'Master memory & architecture — RAM stack frames, static storage, pointer memory maps.',
      tamilDescription: 'நினைவக கட்டமைப்பு, Stack Frame மற்றும் Pointer Memory Address மேலாண்மை.',
      storyAnalogy: 'Variables = RAM Stack Frame Memory, Data Types = Byte Memory Representation',
    },
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="eyebrow mb-2">Select Your Learning Track</span>
        <h1 className="font-display text-3xl font-extrabold text-bamboo-950 dark:text-white sm:text-4xl">
          Choose Your Level / நிலையைத் தேர்வு செய்க
        </h1>
        <p className="font-tamil mt-3 text-sm text-ink-600 dark:text-ink-300">
          ஒவ்வொரு நிலைக்கும் அதற்கே உரிய தனித்துவமான கதைகள் மற்றும் ஆழமான பாடங்கள் வடிவமைக்கப்பட்டுள்ளன.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {levelOptions.map((lvl) => {
          const Icon = lvl.icon;
          const isCurrent = current === lvl.id;
          return (
            <div
              key={lvl.id}
              className={`card flex flex-col justify-between p-6 border-2 transition-all ${lvl.color} ${lvl.bg} shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-soft dark:bg-ink-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 rounded-full bg-bamboo-600 px-3 py-1 text-xs font-bold text-white">
                      <Check className="h-3.5 w-3.5" /> Active Level
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-bamboo-950 dark:text-white">
                  {lvl.title}
                </h3>
                <p className="font-tamil text-xs font-bold text-bamboo-700 dark:text-bamboo-300 mt-0.5">
                  {lvl.tamilTitle}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-ink-700 dark:text-ink-300">
                  {lvl.description}
                </p>

                <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-400">
                  {lvl.tamilDescription}
                </p>

                <div className="mt-4 rounded-xl bg-white/80 p-3 dark:bg-ink-900/80 border border-bamboo-100 dark:border-bamboo-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bamboo-600">
                    Key Visual Story:
                  </span>
                  <p className="text-xs font-semibold text-ink-800 dark:text-ink-200">
                    {lvl.storyAnalogy}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectLevel(lvl.id);
                  onNavigate('dashboard');
                }}
                className="mt-6 btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-soft"
              >
                {isCurrent ? 'Continue Learning' : `Switch to ${lvl.title.split(' ')[1]}`}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
