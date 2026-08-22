import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Volume2,
  Box,
  Cpu,
  Code2,
  Trophy,
  Star,
  ChevronRight,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import AudioButton from '@/components/AudioButton';

interface VariablesStoryPageProps {
  onNavigate: (page: Page) => void;
}

type SceneId = 1 | 2 | 3 | 4 | 5;

interface SceneMeta {
  id: SceneId;
  title: string;
  audio: string;
}

const scenes: SceneMeta[] = [
  { id: 1, title: 'ஒரு பெட்டிக்குள் தகவல்', audio: '/audio/variables/scene1.mp3' },
  { id: 2, title: 'Variable என்றால் என்ன?', audio: '/audio/variables/scene2.mp3' },
  { id: 3, title: 'Code Connection', audio: '/audio/variables/scene3.mp3' },
  { id: 4, title: 'Computer Memory', audio: '/audio/variables/scene4.mp3' },
  { id: 5, title: 'Quick Challenge', audio: '/audio/variables/scene5.mp3' },
];

export default function VariablesStoryPage({ onNavigate }: VariablesStoryPageProps) {
  const [scene, setScene] = useState<SceneId>(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const go = useCallback((to: SceneId) => {
    setDirection(to > scene ? 'next' : 'prev');
    setScene(to);
  }, [scene]);

  const next = useCallback(() => scene < 5 && go((scene + 1) as SceneId), [scene, go]);
  const prev = useCallback(() => scene > 1 && go((scene - 1) as SceneId), [scene, go]);

  const restart = () => {
    setDirection('prev');
    setScene(1);
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="chip bg-golden-100 text-golden-700">
            <Sparkles className="h-3.5 w-3.5" /> Flagship Demo · Variables
          </span>
          <h1 className="section-title mt-3">Variables Story Mode</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            A complete animated Tamil storytelling lesson. Watch Kavi and Code Buddy explain variables through 5 interactive scenes — with Tamil voice.
          </p>
        </div>
        <button onClick={() => onNavigate('dashboard')} className="btn-ghost text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Course
        </button>
      </div>

      {/* Story stage */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bamboo-50 via-white to-golden-50 p-1 shadow-card">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-white/70">
          {/* Stage header */}
          <div className="relative flex items-center justify-between border-b border-bamboo-100/80 bg-white/60 px-5 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-600 text-white">
                <Box className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-bamboo-600">
                  Variables · Module 2
                </p>
                <p className="font-tamil text-sm text-bamboo-800">மாறிகள்</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={restart}
                className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 transition-all hover:bg-bamboo-200"
                aria-label="Restart story"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Scene content */}
          <div className="relative min-h-[460px] px-5 py-8 sm:px-10 sm:py-12">
            <div key={scene} className={direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}>
              {scene === 1 && <Scene1 />}
              {scene === 2 && <Scene2 />}
              {scene === 3 && <Scene3 />}
              {scene === 4 && <Scene4 />}
              {scene === 5 && <Scene5 />}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="relative border-t border-bamboo-100/80 bg-white/60 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                disabled={scene === 1}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 transition-all hover:bg-bamboo-200 disabled:opacity-40"
                aria-label="Previous scene"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex flex-1 items-center gap-2">
                {scenes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className="group flex-1"
                    aria-label={`Scene ${s.id}`}
                  >
                    <div
                      className={`h-2.5 overflow-hidden rounded-full transition-all duration-300 ${
                        s.id === scene ? 'bg-bamboo-100' : s.id < scene ? 'bg-bamboo-200' : 'bg-ink-100'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          s.id < scene ? 'w-full bg-bamboo-600' : s.id === scene ? 'w-full bg-bamboo-500' : 'w-0'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                disabled={scene === 5}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bamboo-600 text-white transition-all hover:bg-bamboo-700 disabled:opacity-40"
                aria-label="Next scene"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-500">
                Scene {scene} of 5 · {scenes[scene - 1].title}
              </span>
              {scene === 5 ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-bamboo-700">
                  <Trophy className="h-3.5 w-3.5" /> Final Challenge
                </span>
              ) : (
                <span className="text-ink-400">Tap next to continue</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scene map */}
      <div className="mt-8">
        <p className="eyebrow mb-3">Story Map</p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {scenes.map((s) => {
            const active = s.id === scene;
            const done = s.id < scene;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`card p-4 text-left transition-all hover:-translate-y-0.5 ${
                  active ? 'ring-2 ring-bamboo-500' : done ? 'opacity-80' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-bold ${
                      active ? 'bg-bamboo-600 text-white' : done ? 'bg-bamboo-100 text-bamboo-700' : 'bg-ink-100 text-ink-400'
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bamboo-500">Scene {s.id}</span>
                </div>
                <p className="mt-2 font-tamil text-sm font-semibold text-bamboo-950">{s.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion CTA */}
      <div className="mt-8 rounded-3xl bg-gradient-to-br from-bamboo-700 to-bamboo-900 p-6 text-center text-white sm:p-8">
        <h3 className="font-display text-xl font-semibold">Loved the story?</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-bamboo-100">
          This is the flagship demo. The full Variables module has 5 topics, each with its own story, code breakdown, and challenge.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button onClick={() => onNavigate('lesson')} className="btn-gold text-sm">
            Open Full Lesson <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => onNavigate('quiz')} className="btn-ghost text-sm bg-white/10 text-white border-white/20 hover:bg-white/20">
            Take the Quiz <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ SCENE 1: Lunch Box ============ */
function Scene1() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-bamboo-100 text-bamboo-700">Scene 1</span>
        <h2 className="font-tamil text-lg font-semibold text-bamboo-950">ஒரு பெட்டிக்குள் தகவல்</h2>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Kavi */}
        <div className="flex shrink-0 flex-col items-center animate-slide-in-left">
          <div className="rounded-3xl bg-gradient-to-b from-bamboo-100 to-bamboo-50 p-3 ring-1 ring-bamboo-200">
            <CharacterAvatar character="kavi" emotion="curious" size={140} />
          </div>
          <p className="mt-2 text-sm font-bold text-bamboo-700">Kavi</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Student</p>
        </div>

        {/* Speech bubble */}
        <div className="flex-1">
          <div className="relative animate-slide-in-right rounded-2xl border-2 border-bamboo-100 bg-white px-5 py-4 shadow-soft">
            <div className="mb-1.5 flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-bamboo-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-700">Kavi</span>
            </div>
            <p className="font-tamil text-base leading-relaxed text-ink-800">
              என்னிடம் ஒரு lunch box இருக்கு. இதுக்குள்ள நான் உணவை வைக்கலாம். இந்த box-க்கு ஒரு பெயரும் இருக்கு.
            </p>
            <span className="absolute -left-2 top-6 h-0 w-0 rotate-90 border-x-8 border-t-8 border-x-transparent border-t-white" />
          </div>

          {/* Lunch box visual */}
          <div className="mt-5 grid place-items-center rounded-2xl bg-bamboo-50/70 p-4 animate-scale-in">
            <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
              <defs>
                <linearGradient id="lb1-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd24a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <path d="M70 40 Q100 20 130 40" stroke="#b45309" strokeWidth="6" fill="none" strokeLinecap="round" className="animate-bounce-soft" />
              <rect x="40" y="40" width="120" height="24" rx="8" fill="#f59e0b" />
              <rect x="40" y="58" width="120" height="80" rx="12" fill="url(#lb1-body)" stroke="#b45309" strokeWidth="2" />
              <rect x="48" y="50" width="8" height="14" rx="2" fill="#b45309" />
              <rect x="144" y="50" width="8" height="14" rx="2" fill="#b45309" />
              <rect x="78" y="78" width="44" height="22" rx="4" fill="#fff" opacity="0.9" />
              <text x="100" y="93" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#b45309">Kavi</text>
              <circle cx="68" cy="118" r="6" fill="#479a63" />
              <circle cx="100" cy="120" r="7" fill="#347d4d" />
              <circle cx="130" cy="118" r="6" fill="#6bb684" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <AudioButton src={scenes[0].audio} label="Play Tamil Voice" size="md" />
      </div>
    </div>
  );
}

/* ============ SCENE 2: Variable = Box ============ */
function Scene2() {
  const highlights = ['Variable', 'data', 'box'];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-golden-100 text-golden-700">Scene 2</span>
        <h2 className="font-tamil text-lg font-semibold text-bamboo-950">Variable என்றால் என்ன?</h2>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row-reverse">
        {/* Code Buddy */}
        <div className="flex shrink-0 flex-col items-center animate-slide-in-right">
          <div className="rounded-3xl bg-gradient-to-b from-golden-100 to-golden-50 p-3 ring-1 ring-golden-200">
            <CharacterAvatar character="buddy" emotion="explain" size={140} />
          </div>
          <p className="mt-2 text-sm font-bold text-golden-700">Code Buddy</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">AI Mentor</p>
        </div>

        {/* Speech bubble */}
        <div className="flex-1">
          <div className="relative animate-slide-in-left rounded-2xl border-2 border-golden-100 bg-golden-50 px-5 py-4 shadow-soft">
            <div className="mb-1.5 flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-golden-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-golden-700">Code Buddy</span>
            </div>
            <p className="font-tamil text-base leading-relaxed text-ink-800">
              Programming லும் இதே மாதிரி தான்.{' '}
              <span className="rounded-md bg-golden-200 px-1.5 py-0.5 font-bold text-golden-800 animate-token-pop">Variable</span>{' '}
              என்பது{' '}
              <span className="rounded-md bg-golden-200 px-1.5 py-0.5 font-bold text-golden-800 animate-token-pop" style={{ animationDelay: '0.3s' }}>data</span>{' '}
              வை சேமிக்கும் ஒரு{' '}
              <span className="rounded-md bg-golden-200 px-1.5 py-0.5 font-bold text-golden-800 animate-token-pop" style={{ animationDelay: '0.6s' }}>box</span>{' '}
              மாதிரி.
            </p>
            <span className="absolute -right-2 top-6 h-0 w-0 -rotate-90 border-x-8 border-t-8 border-x-transparent border-t-golden-50" />
          </div>

          {/* Box analogy visual */}
          <div className="mt-5 grid place-items-center rounded-2xl bg-bamboo-50/70 p-4 animate-scale-in">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-bamboo-100 ring-2 ring-bamboo-300">
                  <Box className="h-10 w-10 text-bamboo-600" />
                </div>
                <p className="mt-1 text-xs font-semibold text-bamboo-700">Lunch Box</p>
              </div>
              <div className="text-2xl text-bamboo-400">=</div>
              <div className="text-center">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-golden-100 ring-2 ring-golden-300">
                  <code className="font-mono text-sm font-bold text-golden-700">var</code>
                </div>
                <p className="mt-1 text-xs font-semibold text-golden-700">Variable</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <AudioButton src={scenes[1].audio} label="Play Tamil Voice" size="md" />
      </div>
    </div>
  );
}

/* ============ SCENE 3: Code Connection ============ */
interface Token {
  text: string;
  label: string;
  tamil: string;
  color: string;
  ring: string;
  delay: number;
}

const codeTokens: Token[] = [
  { text: 'int', label: 'Data Type', tamil: 'இது data type', color: 'bg-bamboo-100 text-bamboo-700', ring: 'ring-bamboo-400', delay: 0 },
  { text: 'age', label: 'Variable Name', tamil: 'இது variable name', color: 'bg-golden-100 text-golden-700', ring: 'ring-golden-400', delay: 0.4 },
  { text: '20', label: 'Stored Value', tamil: 'இது stored value', color: 'bg-bamboo-100 text-bamboo-700', ring: 'ring-bamboo-400', delay: 0.8 },
];

function Scene3() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % (codeTokens.length + 1)), 1800);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-bamboo-100 text-bamboo-700">Scene 3</span>
        <h2 className="font-tamil text-lg font-semibold text-bamboo-950">Code Connection</h2>
      </div>

      {/* Animated code */}
      <div className="overflow-hidden rounded-2xl bg-ink-950 shadow-card animate-scale-in">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-golden-400/80" />
          <span className="h-3 w-3 rounded-full bg-bamboo-400/80" />
          <span className="ml-2 font-mono text-xs text-white/40">variables.c</span>
        </div>
        <div className="px-6 py-6 font-mono text-2xl sm:text-3xl">
          <code className="flex flex-wrap items-center gap-1">
            {codeTokens.map((tok, i) => (
              <span key={tok.text} className="relative">
                <span
                  className={`rounded-lg px-2 py-1 transition-all duration-300 ${
                    active === i + 1 || active === 0 ? `${tok.color} ring-2 ${tok.ring} animate-token-pop` : 'text-white/50'
                  }`}
                  style={{ animationDelay: `${tok.delay}s` }}
                >
                  {tok.text}
                </span>
                {active === i + 1 && (
                  <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-ink-800 shadow-card animate-pop">
                    {tok.tamil}
                  </span>
                )}
              </span>
            ))}
            {active === 0 && <span className="text-white/50">;</span>}
            {active > 0 && <span className="text-white/80">;</span>}
            <span className="ml-1 inline-block h-6 w-1.5 animate-type-cursor bg-bamboo-400 align-middle" />
          </code>
        </div>
      </div>

      {/* Explanation cards */}
      <div className="mt-14 grid gap-3 sm:grid-cols-3">
        {codeTokens.map((tok, i) => (
          <div
            key={tok.text}
            className={`card p-4 transition-all ${active === i + 1 ? `ring-2 ${tok.ring} -translate-y-1` : ''}`}
          >
            <code className={`rounded-md ${tok.color} px-2 py-1 font-mono text-sm font-bold`}>{tok.text}</code>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-400">{tok.label}</p>
            <p className="font-tamil text-sm text-ink-700">{tok.tamil}</p>
          </div>
        ))}
      </div>

      {/* Tamil voice line */}
      <div className="mt-5 rounded-2xl bg-bamboo-50 px-5 py-3 animate-fade-up">
        <p className="font-tamil text-sm leading-relaxed text-ink-700">
          இந்த code ல age என்ற variable குள்ள 20 என்ற value store ஆகுது.
        </p>
      </div>

      <div className="mt-5">
        <AudioButton src={scenes[2].audio} label="Play Tamil Voice" size="md" />
      </div>
    </div>
  );
}

/* ============ SCENE 4: Computer Memory ============ */
function Scene4() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-bamboo-100 text-bamboo-700">Scene 4</span>
        <h2 className="font-tamil text-lg font-semibold text-bamboo-950">Computer Memory</h2>
      </div>

      {/* Flow: Variable box → Memory → Stored value */}
      <div className="card p-6 animate-scale-in">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Variable box */}
          <div className="text-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl bg-golden-100 ring-2 ring-golden-300">
              <div className="text-center">
                <Box className="mx-auto h-7 w-7 text-golden-600" />
                <code className="font-mono text-xs font-bold text-golden-700">age</code>
              </div>
            </div>
            <p className="mt-1 text-xs font-semibold text-golden-700">Variable Box</p>
          </div>

          {/* Flow arrow with data packet */}
          <div className="relative h-2 w-24 rounded-full bg-bamboo-200 sm:w-32">
            <span className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-bamboo-600 animate-data-flow" />
          </div>

          {/* Computer memory */}
          <div className="text-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl bg-bamboo-100 ring-2 ring-bamboo-300">
              <Cpu className="h-9 w-9 text-bamboo-600" />
            </div>
            <p className="mt-1 text-xs font-semibold text-bamboo-700">Computer Memory</p>
          </div>

          {/* Flow arrow */}
          <div className="relative h-2 w-24 rounded-full bg-bamboo-200 sm:w-32">
            <span className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-bamboo-600 animate-data-flow" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Stored value */}
          <div className="text-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl bg-bamboo-600 text-white ring-2 ring-bamboo-400">
              <code className="font-mono text-2xl font-bold">20</code>
            </div>
            <p className="mt-1 text-xs font-semibold text-bamboo-700">Stored Value</p>
          </div>
        </div>

        {/* Memory grid visualization */}
        <div className="mt-6 rounded-2xl bg-ink-950 p-4">
          <p className="mb-3 text-center font-mono text-xs text-white/40">memory layout</p>
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: 18 }).map((_, i) => {
              const isAge = i === 7;
              return (
                <div
                  key={i}
                  className={`grid h-9 place-items-center rounded-md font-mono text-xs ${
                    isAge ? 'bg-bamboo-500 text-white ring-2 ring-bamboo-300 animate-glow-pulse' : 'bg-white/5 text-white/30'
                  }`}
                >
                  {isAge ? '20' : '··'}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center font-mono text-xs text-bamboo-300">age → memory[7] = 20</p>
        </div>
      </div>

      {/* Tamil explanation */}
      <div className="mt-5 rounded-2xl bg-bamboo-50 px-5 py-3 animate-fade-up">
        <p className="font-tamil text-sm leading-relaxed text-ink-700">
          Computer memory ல variable ஒரு இடத்தை பிடித்து data வை store செய்கிறது.
        </p>
      </div>

      <div className="mt-5">
        <AudioButton src={scenes[3].audio} label="Play Tamil Voice" size="md" />
      </div>
    </div>
  );
}

/* ============ SCENE 5: Quick Challenge ============ */
function Scene5() {
  const options = [
    { label: 'A', text: 'int', correct: false },
    { label: 'B', text: 'marks', correct: true },
    { label: 'C', text: '95', correct: false },
  ];
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;
  const correct = picked !== null && options[picked].correct;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-golden-100 text-golden-700">Scene 5</span>
        <h2 className="font-tamil text-lg font-semibold text-bamboo-950">Quick Challenge</h2>
      </div>

      <div className="card p-6 animate-scale-in">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-golden-100 text-golden-700">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow">Interactive Question</p>
            <h3 className="font-display text-lg font-semibold text-bamboo-950">Pick the variable name</h3>
          </div>
        </div>

        <p className="mt-4 font-tamil text-base text-ink-800">இதில் variable name எது?</p>

        {/* Code */}
        <div className="mt-3 overflow-hidden rounded-xl bg-ink-950 px-5 py-4 font-mono text-xl">
          <code>
            <span className="text-bamboo-400">int</span>
            <span className="text-white"> </span>
            <span className={revealed ? 'text-golden-400 animate-token-pop' : 'text-white'}>marks</span>
            <span className="text-white"> = </span>
            <span className="text-bamboo-300">95</span>
            <span className="text-white">;</span>
          </code>
        </div>

        {/* Options */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {options.map((o, i) => {
            let cls = 'border-bamboo-100 bg-white hover:border-bamboo-300 hover:bg-bamboo-50';
            if (revealed && o.correct) cls = 'border-bamboo-600 bg-bamboo-50 ring-2 ring-bamboo-400';
            else if (revealed && picked === i && !o.correct) cls = 'border-red-300 bg-red-50';
            else if (revealed) cls = 'border-bamboo-100 opacity-60';
            return (
              <button
                key={o.label}
                onClick={() => setPicked(i)}
                disabled={revealed}
                className={`flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${cls}`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-bamboo-100 text-xs font-bold text-bamboo-700">
                  {o.label}
                </span>
                <span className="font-mono text-sm font-semibold">{o.text}</span>
                {revealed && o.correct && <CheckCircle2 className="h-5 w-5 text-bamboo-600" />}
                {revealed && picked === i && !o.correct && <XCircle className="h-5 w-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {/* Answer animation */}
        {revealed && (
          <div className={`mt-5 animate-pop rounded-2xl p-5 ${correct ? 'bg-bamboo-600 text-white' : 'bg-golden-500 text-ink-900'}`}>
            <div className="flex items-center gap-3">
              {correct ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : (
                <XCircle className="h-7 w-7" />
              )}
              <div>
                <p className="font-display text-lg font-semibold">
                  {correct ? 'சரி! Correct!' : 'இல்லை — மறுபடி யோசிக்கவும்'}
                </p>
                <p className="text-sm opacity-90">
                  {correct
                    ? 'marks தான் variable name. int என்பது data type, 95 என்பது value.'
                    : 'marks தான் variable name — box-ன் பெயர். மீண்டும் முயற்சி செய்!'}
                </p>
              </div>
            </div>
            {correct && (
              <div className="mt-3 flex items-center gap-2">
                <Star className="h-5 w-5 fill-current animate-confetti" />
                <span className="text-sm font-semibold">+50 XP earned!</span>
              </div>
            )}
          </div>
        )}

        {!revealed && (
          <button onClick={() => setPicked(1)} className="sr-only">hint</button>
        )}
      </div>

      <div className="mt-5">
        <AudioButton src={scenes[4].audio} label="Play Tamil Voice" size="md" />
      </div>
    </div>
  );
}
