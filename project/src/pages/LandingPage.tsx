import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Languages,
  Code2,
  Trophy,
  Users,
  Zap,
  Target,
  GraduationCap,
  Heart,
  PlayCircle,
  MessageCircle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Grid3x3,
  Terminal,
  Bug,
  Star,
  Layers,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import CharacterCard from '@/components/CharacterCard';
import ProgressBar from '@/components/ProgressBar';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const why = [
  {
    icon: Languages,
    title: 'Tamil Storytelling',
    body: 'Concepts explained in simple spoken Tamil \u2014 no complicated words, just clear understanding.',
  },
  {
    icon: Sparkles,
    title: 'Visual Stories',
    body: 'Animated characters and scenes make abstract programming ideas feel real and memorable.',
  },
  {
    icon: Code2,
    title: 'Concepts First, Code Next',
    body: 'You understand the why before the how. Syntax becomes easy once the idea clicks.',
  },
  {
    icon: Target,
    title: 'Real-Life Examples',
    body: 'Lunch boxes, traffic signals, lockers \u2014 everyday analogies that map directly to code.',
  },
];

const steps = [
  { icon: BookOpen, title: 'Read the Concept', body: 'A short, friendly intro to the idea.', tamil: 'கருத்து' },
  { icon: Languages, title: 'Tamil Explanation', body: 'Simple spoken Tamil makes it click.', tamil: 'தமிழ் விளக்கம்' },
  { icon: Heart, title: 'Real-Life Example', body: 'Everyday analogies you already know.', tamil: 'உதாரணம்' },
  { icon: PlayCircle, title: 'Visual Story', body: 'Kavi & Code Buddy bring it to life.', tamil: 'கதை' },
  { icon: Code2, title: 'Code Example', body: 'See the concept written in real C.', tamil: 'நிரல்' },
  { icon: Trophy, title: 'Practice & Challenge', body: 'Quiz, then a mini challenge to lock it in.', tamil: 'பயிற்சி' },
];

const features = [
  { icon: MessageCircle, title: 'Animated Characters', body: 'Kavi and Code Buddy guide every lesson with dialogue and emotion.' },
  { icon: Zap, title: 'Interactive Code Blocks', body: 'Code types itself in front of you with color-highlighted tokens.' },
  { icon: Trophy, title: 'XP & Badges', body: 'Earn points, unlock badges, and keep your streak alive.' },
  { icon: TrendingUp, title: 'Progress Tracking', body: 'See exactly how far you\u2019ve come, module by module.' },
  { icon: GraduationCap, title: 'Beginner Friendly', body: 'No prior experience needed. We start from "What is C?"' },
  { icon: Target, title: 'Mini Challenges', body: 'Each lesson ends with a small challenge to apply what you learned.' },
];

const benefits = [
  'Understand concepts, not just syntax',
  'Learn in your language, at your pace',
  'Remember through stories, not memorization',
  'Build real confidence with C programming',
  'Track progress and stay motivated',
];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="container-page relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="chip bg-bamboo-100 text-bamboo-700">
              <Sparkles className="h-3.5 w-3.5" /> Premium EdTech · C Programming
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-bamboo-950 sm:text-5xl lg:text-6xl text-balance">
              Learn Coding <span className="text-bamboo-600">Through</span> Stories
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
              Understand programming concepts with Tamil explanations, visual stories, and real-world examples — not by memorizing syntax.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('dashboard')} className="btn-primary text-base">
                Start Learning <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => onNavigate('story')} className="btn-gold text-base">
                <PlayCircle className="h-4 w-4" /> Watch Story Mode
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink-600">
              <div>
                <p className="font-display text-2xl font-semibold text-bamboo-700">10</p>
                <p className="text-xs">Modules</p>
              </div>
              <div className="h-8 w-px bg-bamboo-200" />
              <div>
                <p className="font-display text-2xl font-semibold text-bamboo-700">38</p>
                <p className="text-xs">Lessons</p>
              </div>
              <div className="h-8 w-px bg-bamboo-200" />
              <div>
                <p className="font-display text-2xl font-semibold text-bamboo-700">100%</p>
                <p className="text-xs">Tamil</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-scale-in">
            <div className="relative mx-auto max-w-md">
              <div className="card relative overflow-hidden p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="chip bg-golden-100 text-golden-700">
                    <PlayCircle className="h-3.5 w-3.5" /> Story Preview
                  </span>
                  <span className="text-xs font-semibold text-ink-400">Variables · Lesson 1</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gradient-to-b from-bamboo-100 to-bamboo-50 p-3">
                    <CharacterAvatar character="kavi" emotion="curious" size={140} />
                    <p className="mt-1 text-center text-xs font-bold text-bamboo-700">Kavi</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-b from-golden-100 to-golden-50 p-3">
                    <CharacterAvatar character="buddy" emotion="explain" size={140} />
                    <p className="mt-1 text-center text-xs font-bold text-golden-700">Code Buddy</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-bamboo-50 px-4 py-3">
                  <p className="font-tamil text-sm leading-relaxed text-ink-800">
                    Variable என்பது ஒரு box மாதிரி. அதற்குள் நம்ம data-வை store செய்யலாம்.
                  </p>
                </div>
                <div className="mt-3 rounded-xl bg-ink-950 px-4 py-3 font-mono text-sm">
                  <span className="text-bamboo-400">int</span>
                  <span className="text-white"> age = </span>
                  <span className="text-golden-400">20</span>
                  <span className="text-white">;</span>
                </div>
              </div>
              {/* floating chips */}
              <div className="absolute -right-3 -top-3 animate-float rounded-2xl bg-white px-3 py-2 shadow-card">
                <span className="chip bg-bamboo-100 text-bamboo-700">
                  <Zap className="h-3.5 w-3.5" /> +50 XP
                </span>
              </div>
              <div className="absolute -bottom-4 -left-3 animate-float rounded-2xl bg-white px-3 py-2 shadow-card" style={{ animationDelay: '1s' }}>
                <span className="chip bg-golden-100 text-golden-700">
                  <Trophy className="h-3.5 w-3.5" /> Badge Earned
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-y border-bamboo-100 bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Code Kathai?</p>
            <h2 className="section-title mt-2">Learning that actually sticks</h2>
            <p className="mt-3 text-ink-600">
              Most students memorize syntax but never understand the concept. We flip that — stories first, code second.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-bamboo-950">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{w.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="section-title mt-2">Every lesson follows the same path</h2>
            <p className="mt-3 text-ink-600">Six steps, repeated for every concept, so learning feels predictable and calm.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card flex items-start gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bamboo-600 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-semibold text-bamboo-200">{i + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-bamboo-950">{s.title}</h3>
                      <span className="font-tamil text-xs text-bamboo-600">{s.tamil}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-600">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="border-y border-bamboo-100 bg-white/60 py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Learning Journey</p>
            <h2 className="section-title mt-2">From "What is C?" to confident coder</h2>
            <p className="mt-3 text-ink-600">
              A guided path through 10 modules. Each builds on the last, with stories and challenges at every step.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: 'Introduction', pct: 100 },
                { label: 'Variables \u2b50', pct: 60 },
                { label: 'Data Types \u2b50', pct: 20 },
                { label: 'Operators \u2b50', pct: 0 },
              ].map((j) => (
                <div key={j.label} className="card flex items-center gap-4 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-bamboo-100 text-bamboo-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-bamboo-950">{j.label}</p>
                      <span className="text-xs font-bold text-bamboo-700">{j.pct}%</span>
                    </div>
                    <ProgressBar value={j.pct} size="sm" className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="card relative overflow-hidden p-6">
              <p className="font-display text-lg font-semibold text-bamboo-950">Your journey, visualized</p>
              <div className="mt-5 space-y-4">
                {[
                  { t: 'Concept understood', d: 'You read the story and the idea clicks.' },
                  { t: 'Code written', d: 'You see real C code and how it maps to the story.' },
                  { t: 'Quiz passed', d: 'You prove you understand, not just memorize.' },
                  { t: 'Challenge done', d: 'You apply the concept in a tiny real task.' },
                ].map((s, i) => (
                  <div key={s.t} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-bamboo-600 text-sm font-bold text-white">{i + 1}</span>
                      {i < 3 && <span className="my-1 h-8 w-px bg-bamboo-200" />}
                    </div>
                    <div className="pb-2">
                      <p className="font-semibold text-bamboo-950">{s.t}</p>
                      <p className="text-sm text-ink-600">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY MODE */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">New Feature</p>
            <h2 className="section-title mt-2">Code Kathai Story Mode</h2>
            <p className="mt-3 text-ink-600">
              A cinematic, scene-by-scene experience where Kavi and Code Buddy explain every concept through animated Tamil conversations.
            </p>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <div className="card relative overflow-hidden p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="chip bg-golden-100 text-golden-700">
                  <PlayCircle className="h-3.5 w-3.5" /> Variables · Scene 2
                </span>
                <span className="text-xs font-semibold text-ink-400">Auto-play</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gradient-to-b from-golden-100 to-golden-50 p-3">
                  <CharacterAvatar character="buddy" emotion="explain" size={130} />
                  <p className="mt-1 text-center text-xs font-bold text-golden-700">Code Buddy</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl bg-golden-50 border-2 border-golden-100 px-4 py-3">
                    <p className="font-tamil text-sm leading-relaxed text-ink-800">
                      Programming-ல variable என்பது data store செய்யும் box மாதிரி.
                    </p>
                  </div>
                  <div className="rounded-xl bg-ink-950 px-3 py-2 font-mono text-xs">
                    <span className="text-bamboo-400">int</span>
                    <span className="text-white"> age = </span>
                    <span className="text-golden-400">20</span>
                    <span className="text-white">;</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${i === 1 ? 'bg-bamboo-600' : i < 1 ? 'bg-bamboo-300' : 'bg-ink-100'}`} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-bamboo-950">Stories that make concepts click</h3>
              <p className="mt-3 text-ink-600">
                Each story has 4+ animated scenes: a real-world setup, a Tamil explanation, a memory visualization, and a highlighted code reveal.
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { icon: MessageCircle, title: 'Speech bubbles', body: 'Characters talk in simple spoken Tamil.' },
                  { icon: Sparkles, title: 'Smooth scene transitions', body: 'Each scene fades and slides in gracefully.' },
                  { icon: TrendingUp, title: 'Story progress indicator', body: 'A bar shows how far through the story you are.' },
                  { icon: PlayCircle, title: 'Auto-play mode', body: 'Sit back and watch the story unfold on its own.' },
                ].map((f) => {
                  const FIcon = f.icon;
                  return (
                    <div key={f.title} className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                        <FIcon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="font-semibold text-bamboo-950">{f.title}</p>
                        <p className="text-sm text-ink-600">{f.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => onNavigate('story')} className="btn-gold mt-6 text-base">
                <PlayCircle className="h-4 w-4" /> Try Story Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CHARACTERS */}
      <section className="border-t border-bamboo-100 bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Meet your guides</p>
            <h2 className="section-title mt-2">Friends who make it fun</h2>
            <p className="mt-3 text-ink-600">Two characters join you in every lesson — one asks, one explains.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <CharacterCard character="kavi" />
            <CharacterCard character="buddy" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-bamboo-100 bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Features</p>
            <h2 className="section-title mt-2">Built for real understanding</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-golden-100 text-golden-700">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-bamboo-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Platform</p>
            <h2 className="section-title mt-2">A complete learning platform</h2>
            <p className="mt-3 text-ink-600">From your first line of code to interview-ready problem solving — everything in one place.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, title: 'Learning Levels', body: 'Three structured paths — Beginner, Intermediate, and Advanced — covering everything from basics to data structures and algorithms.', action: () => onNavigate('levels') },
              { icon: Code2, title: 'Coding Playground', body: 'A LeetCode-like editor with test cases, run, submit, and console output. Write real C code and see results instantly.', action: () => onNavigate('playground') },
              { icon: Sparkles, title: 'Practice Coding', body: 'MCQs, output prediction, debugging, scenario-based problems, and interview questions across Easy, Medium, and Hard.', action: () => onNavigate('practice') },
              { icon: Grid3x3, title: 'Pattern Practice', body: 'Star, number, alphabet, pyramid, hollow, Pascal, diamond, and butterfly patterns — the most asked interview problems.', action: () => onNavigate('patterns') },
              { icon: Lightbulb, title: 'AI Tutor', body: 'Get line-by-line explanations, Tamil story explanations, similar questions, and compiler error help — your personal code guide.', action: () => onNavigate('tutor') },
              { icon: Trophy, title: 'Progress Tracking', body: 'Completed lessons, solved problems, XP, day streaks, badges, and overall progress — all saved automatically.', action: () => onNavigate('profile') },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <button key={f.title} onClick={f.action} className="card group p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-bamboo-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
                  <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-bamboo-700 group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Student Benefits</p>
            <h2 className="section-title mt-2">What you walk away with</h2>
            <p className="mt-3 text-ink-600">More than passing a test — you build a real foundation in programming.</p>
            <div className="mt-6 space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bamboo-600 text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-ink-800">{b}</p>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('dashboard')} className="btn-primary mt-8 text-base">
              Begin Your Journey <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <div className="card grid grid-cols-2 gap-4 p-6">
              {[
                { icon: Trophy, label: 'Badges', value: '4', color: 'golden' },
                { icon: Zap, label: 'XP Points', value: '1240', color: 'bamboo' },
                { icon: TrendingUp, label: 'Avg Score', value: '86%', color: 'bamboo' },
                { icon: Heart, label: 'Day Streak', value: '5', color: 'golden' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-2xl bg-bamboo-50 p-5 text-center">
                    <span className={`mx-auto grid h-11 w-11 place-items-center rounded-xl ${s.color === 'golden' ? 'bg-golden-100 text-golden-700' : 'bg-bamboo-100 text-bamboo-700'}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 font-display text-2xl font-semibold text-bamboo-950">{s.value}</p>
                    <p className="text-xs font-semibold text-ink-500">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bamboo-700 to-bamboo-900 p-10 text-center sm:p-16">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-golden-400/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-bamboo-400/20 blur-2xl" />
            <h2 className="relative font-display text-3xl font-semibold text-white sm:text-4xl text-balance">
              Your first story is waiting
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-bamboo-100">
              Start with Variables and meet Kavi and Code Buddy. No sign-up needed for this preview.
            </p>
            <button onClick={() => onNavigate('dashboard')} className="btn-gold relative mt-6 text-base">
              Start Learning <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
