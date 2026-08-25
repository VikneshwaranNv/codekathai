import { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  Code2,
  CheckCircle2,
  Video,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import ReelsModal from '@/components/ReelsModal';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [isReelsOpen, setIsReelsOpen] = useState(false);

  return (
    <div className="space-y-16 py-8 sm:py-12">
      <ReelsModal isOpen={isReelsOpen} onClose={() => setIsReelsOpen(false)} />

      {/* Hero Section */}
      <section className="container-page text-center">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow mb-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300 shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="h-4 w-4 text-golden-500 animate-pulse" />
            Tamil-First EdTech C Programming Platform
          </span>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-bamboo-950 dark:text-white sm:text-6xl">
            Learn Coding Through Stories
          </h1>

          <p className="font-tamil mt-6 text-lg sm:text-xl font-medium leading-relaxed text-ink-700 dark:text-ink-300">
            தமிழில் easy-ஆ coding concepts-ஐ புரிஞ்சுக்கலாம். Stories, visuals, real-life examples மற்றும் practice மூலம் C Programming கற்றுக்கொள்ளலாம்.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Start Learning Button */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn-primary px-8 py-3.5 text-base font-bold flex items-center gap-2 shadow-soft hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
            >
              Start Learning <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Learning Through Reels Button */}
            <button
              onClick={() => setIsReelsOpen(true)}
              className="btn-secondary px-6 py-3.5 text-base font-bold flex items-center gap-2 border-bamboo-300 text-bamboo-950 dark:text-white hover:bg-bamboo-100 dark:hover:bg-ink-800 hover:scale-105 hover:shadow-md transition-all duration-300"
            >
              <Video className="h-5 w-5 text-bamboo-600 dark:text-bamboo-400" /> Learning Through Reels 🎬
            </button>

            <button
              onClick={() => onNavigate('levels')}
              className="btn-ghost px-6 py-3.5 text-base font-bold flex items-center gap-2 text-ink-600 dark:text-ink-300 hover:scale-105 transition-all duration-300"
            >
              Explore Courses <GraduationCap className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Code Kathai? */}
      <section className="container-page">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
            Why Code Kathai? / ஏன் கோட் கதை?
          </h2>
          <p className="font-tamil mt-2 text-sm text-ink-600 dark:text-ink-400">
            கடினமான நிரலாக்கக் கருத்துகளை எளிய தமிழ் கதைகள் மூலம் கற்பிக்கும் முதல் தளம்.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Tamil-First Explanations */}
          <div className="group card p-6 border border-bamboo-100 dark:border-bamboo-800 hover:-translate-y-2.5 hover:shadow-2xl hover:border-bamboo-400 dark:hover:border-bamboo-500 hover:ring-4 hover:ring-bamboo-500/10 transition-all duration-300 cursor-pointer bg-gradient-to-b from-white via-white to-bamboo-50/30 dark:from-ink-900 dark:to-ink-900/80">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-600 dark:bg-bamboo-950 dark:text-bamboo-400 mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-bamboo-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <BookOpen className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white group-hover:text-bamboo-700 dark:group-hover:text-bamboo-300 transition-colors">
              Tamil-First Explanations
            </h3>
            <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              ஆங்கிலச் சொற்களுக்குப் பதில் அன்றாடப் பேச்சுத் தமிழில் கருத்துகள் சுலபமாக விளக்கப்படும்.
            </p>
          </div>

          {/* Card 2: Visual Stories */}
          <div className="group card p-6 border border-bamboo-100 dark:border-bamboo-800 hover:-translate-y-2.5 hover:shadow-2xl hover:border-golden-400 dark:hover:border-golden-500 hover:ring-4 hover:ring-golden-500/10 transition-all duration-300 cursor-pointer bg-gradient-to-b from-white via-white to-golden-50/30 dark:from-ink-900 dark:to-ink-900/80">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-golden-100 text-golden-600 dark:bg-golden-950 dark:text-golden-400 mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-golden-500 group-hover:text-ink-950 transition-all duration-300 shadow-sm">
              <PlayCircle className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white group-hover:text-golden-600 dark:group-hover:text-golden-400 transition-colors">
              Visual Stories (Kavi & Code Buddy)
            </h3>
            <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              கவி மற்றும் கோட் புட்டி கதாபாத்திரங்களின் நகைச்சுவையான உரையாடல்கள் மூலம் புரிதல்.
            </p>
          </div>

          {/* Card 3: Interactive C Playground */}
          <div className="group card p-6 border border-bamboo-100 dark:border-bamboo-800 hover:-translate-y-2.5 hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-500 hover:ring-4 hover:ring-purple-500/10 transition-all duration-300 cursor-pointer bg-gradient-to-b from-white via-white to-purple-50/30 dark:from-ink-900 dark:to-ink-900/80">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Code2 className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Interactive C Playground
            </h3>
            <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              பாடங்களைக் கற்ற கையோடு நேரடி C Code Editor-ல் இயக்கி முடிவுகளைப் பார்க்கலாம்.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-bamboo-50/50 py-12 dark:bg-ink-900/50">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
              How It Works / எப்படி செயல்படுகிறது?
            </h2>
            <p className="font-tamil mt-2 text-sm text-ink-600 dark:text-ink-400">
              6 எளிய படிகளில் C Programming தேர்ச்சி!
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { step: '1', title: 'Concept', tamil: 'கருத்து அறிதல்' },
              { step: '2', title: 'Tamil Explanation', tamil: 'எளிய தமிழ் விளக்கம்' },
              { step: '3', title: 'Real Life Example', tamil: 'வாழ்க்கை உவமை' },
              { step: '4', title: 'Visual Kathai', tamil: 'கதை காட்சி' },
              { step: '5', title: 'Code & Output', tamil: 'நிரல் பயிற்சி' },
              { step: '6', title: 'XP & Badge', tamil: 'சான்றிதழ் பெற்றல்' },
            ].map((s, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-2xl border border-bamboo-100 bg-white p-5 dark:border-bamboo-800 dark:bg-ink-900 hover:-translate-y-2 hover:shadow-xl hover:border-bamboo-400 dark:hover:border-bamboo-500 hover:ring-4 hover:ring-bamboo-500/10 transition-all duration-300 cursor-pointer"
              >
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-bamboo-600 font-display font-bold text-white group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-bamboo-600 group-hover:to-emerald-600 group-hover:rotate-6 transition-all duration-300 shadow-md">
                  {s.step}
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-bamboo-950 dark:text-white group-hover:text-bamboo-700 dark:group-hover:text-bamboo-300 transition-colors">
                    {s.title}
                  </h4>
                  <p className="font-tamil text-xs text-bamboo-600 dark:text-bamboo-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {s.tamil}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey / Levels */}
      <section className="container-page">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
            Learning Journey / 3 கற்றல் நிலைகள்
          </h2>
          <p className="font-tamil mt-2 text-sm text-ink-600 dark:text-ink-400">
            உங்கள் தகுதிக்கு ஏற்ப நிலை தேர்வு செய்து கற்கலாம்.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div
            onClick={() => onNavigate('levels')}
            className="group card p-6 border-2 border-bamboo-200 bg-bamboo-50/40 dark:border-bamboo-800 dark:bg-bamboo-950/20 hover:-translate-y-2.5 hover:shadow-2xl hover:border-bamboo-500 hover:bg-bamboo-100/60 transition-all duration-300 cursor-pointer"
          >
            <span className="eyebrow text-bamboo-700">Level 1</span>
            <h3 className="font-display text-xl font-bold text-bamboo-950 dark:text-white mt-2 group-hover:text-bamboo-800 transition-colors">
              🌱 Beginner
            </h3>
            <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300">
              மிக எளிமையான கதைகள் மற்றும் அன்றாட உவமைகள் மூலம் தொடக்கம்.
            </p>
          </div>

          <div
            onClick={() => onNavigate('levels')}
            className="group card p-6 border-2 border-golden-200 bg-golden-50/40 dark:border-golden-800 dark:bg-golden-950/20 hover:-translate-y-2.5 hover:shadow-2xl hover:border-golden-500 hover:bg-golden-100/60 transition-all duration-300 cursor-pointer"
          >
            <span className="eyebrow text-golden-700">Level 2</span>
            <h3 className="font-display text-xl font-bold text-bamboo-950 dark:text-white mt-2 group-hover:text-golden-800 transition-colors">
              🚀 Intermediate
            </h3>
            <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300">
              மாணவர் தகவல்கள் மற்றும் நிஜ உலக பயன்பாடுகளுடன் தர்க்கம் வளர்த்தல்.
            </p>
          </div>

          <div
            onClick={() => onNavigate('levels')}
            className="group card p-6 border-2 border-purple-200 bg-purple-50/40 dark:border-purple-800 dark:bg-purple-950/20 hover:-translate-y-2.5 hover:shadow-2xl hover:border-purple-500 hover:bg-purple-100/60 transition-all duration-300 cursor-pointer"
          >
            <span className="eyebrow text-purple-700">Level 3</span>
            <h3 className="font-display text-xl font-bold text-bamboo-950 dark:text-white mt-2 group-hover:text-purple-800 transition-colors">
              🧠 Advanced
            </h3>
            <p className="font-tamil mt-2 text-xs text-ink-600 dark:text-ink-300">
              நினைவக அமைப்பு, Pointer Mapping மற்றும் ஆழமான மென்பொருள் நுட்பங்கள்.
            </p>
          </div>
        </div>
      </section>

      {/* Features & Student Benefits */}
      <section className="container-page">
        <div className="rounded-3xl bg-gradient-to-r from-bamboo-700 to-emerald-800 p-8 text-white sm:p-12 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold">
              Student Benefits / மாணவர் நன்மைகள்
            </h2>
            <p className="font-tamil mt-3 text-sm leading-relaxed text-bamboo-100">
              Code Kathai தளத்தின் மூலம் C Programming பயிலும் மாணவர்களுக்குக் கிடைக்கும் சிறப்புகள்:
            </p>
            <ul className="mt-6 space-y-3 font-tamil text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-golden-400" /> எளிய தமிழில் மனப்பாடம் இல்லாமல் புரிதல்
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-golden-400" /> Kavi & Code Buddy Visual Stories
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-golden-400" /> நேரடி C Code Editor Playground
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-golden-400" /> XP புள்ளிகள் மற்றும் Badges விருதுகள்
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="btn-primary bg-golden-500 text-ink-950 font-bold px-6 py-3 hover:bg-golden-400 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Start Free Learning Now
              </button>
              <button
                onClick={() => setIsReelsOpen(true)}
                className="btn-secondary bg-white/10 text-white font-bold px-6 py-3 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Video className="h-4 w-4 text-golden-400" /> Learning Through Reels 🎬
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
