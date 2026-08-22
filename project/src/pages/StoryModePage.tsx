import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Code2,
  SkipForward,
  SkipBack,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import type { ModuleId } from '@/data/course';
import { lessons, modules } from '@/data/course';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import SceneVisual from '@/components/SceneVisual';
import CodeBlock from '@/components/CodeBlock';

interface StoryModePageProps {
  onNavigate: (page: Page) => void;
  onStartLesson: (moduleId: ModuleId, lessonId: string) => void;
}

const speakerMeta = {
  kavi: {
    name: 'Kavi',
    role: 'Student',
    accent: 'bamboo',
    ring: 'ring-bamboo-200',
    bg: 'from-bamboo-100 to-bamboo-50',
    bubble: 'bg-white border-bamboo-100',
    label: 'text-bamboo-700',
    tail: 'border-t-white',
  },
  buddy: {
    name: 'Code Buddy',
    role: 'AI Mentor',
    accent: 'golden',
    ring: 'ring-golden-200',
    bg: 'from-golden-100 to-golden-50',
    bubble: 'bg-golden-50 border-golden-100',
    label: 'text-golden-700',
    tail: 'border-t-golden-50',
  },
} as const;

export default function StoryModePage({ onNavigate, onStartLesson }: StoryModePageProps) {
  const storyLessons = lessons.filter((l) => l.story.length > 0);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [scene, setScene] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const lesson = storyLessons[lessonIdx];
  const mod = modules.find((m) => m.id === lesson.moduleId)!;
  const total = lesson.story.length;
  const current = lesson.story[scene];

  const next = useCallback(() => {
    setScene((s) => Math.min(total - 1, s + 1));
  }, [total]);
  const prev = useCallback(() => {
    setScene((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    setScene(0);
    setAutoPlay(false);
  }, [lessonIdx]);

  useEffect(() => {
    if (!autoPlay) return;
    if (scene >= total - 1) {
      setAutoPlay(false);
      return;
    }
    const t = setTimeout(() => next(), 4500);
    return () => clearTimeout(t);
  }, [autoPlay, scene, total, next]);

  const restart = () => {
    setScene(0);
    setAutoPlay(false);
  };

  const switchLesson = (idx: number) => {
    setLessonIdx(idx);
  };

  const isComplete = scene === total - 1;

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="chip bg-golden-100 text-golden-700">
            <PlayCircle className="h-3.5 w-3.5" /> Story Mode
          </span>
          <h1 className="section-title mt-3">Code Kathai Stories</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            Watch Kavi and Code Buddy bring programming concepts to life through animated Tamil conversations.
          </p>
        </div>
        <button onClick={() => onNavigate('dashboard')} className="btn-ghost text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Course
        </button>
      </div>

      {/* Lesson picker */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {storyLessons.map((l, i) => {
          const lm = modules.find((m) => m.id === l.moduleId)!;
          const active = i === lessonIdx;
          return (
            <button
              key={l.id}
              onClick={() => switchLesson(i)}
              className={`shrink-0 rounded-2xl border px-4 py-2.5 text-left transition-all ${
                active
                  ? 'border-bamboo-600 bg-bamboo-600 text-white shadow-soft'
                  : 'border-bamboo-100 bg-white text-ink-700 hover:border-bamboo-300'
              }`}
            >
              <p className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-bamboo-100' : 'text-bamboo-500'}`}>
                {lm.title}
              </p>
              <p className="text-sm font-semibold">{l.title}</p>
            </button>
          );
        })}
      </div>

      {/* Story stage */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bamboo-50 via-white to-golden-50 p-1 shadow-card">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-white/70">
          {/* Decorative backdrop */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-bamboo-100 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-golden-100 blur-3xl" />
          </div>

          {/* Stage header */}
          <div className="relative flex items-center justify-between border-b border-bamboo-100/80 bg-white/60 px-5 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-600 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-bamboo-600">
                  {mod.title} · {lesson.title}
                </p>
                <p className="font-tamil text-sm text-bamboo-800">{lesson.tamilTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoPlay((v) => !v)}
                className={`grid h-9 w-9 place-items-center rounded-xl transition-all ${
                  autoPlay ? 'bg-golden-500 text-white' : 'bg-bamboo-100 text-bamboo-700 hover:bg-bamboo-200'
                }`}
                aria-label={autoPlay ? 'Pause' : 'Auto-play'}
              >
                {autoPlay ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
              </button>
              <button
                onClick={restart}
                className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 transition-all hover:bg-bamboo-200"
                aria-label="Restart story"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Scene stage */}
          <div className="relative min-h-[420px] px-5 py-8 sm:px-10 sm:py-12">
            <SceneStage key={`${lesson.id}-${scene}`} scene={current} />
          </div>

          {/* Progress indicator */}
          <div className="relative border-t border-bamboo-100/80 bg-white/60 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                disabled={scene === 0}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 transition-all hover:bg-bamboo-200 disabled:opacity-40"
                aria-label="Previous scene"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <div className="flex flex-1 items-center gap-2">
                {lesson.story.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setScene(i)}
                    className="group flex-1"
                    aria-label={`Scene ${i + 1}`}
                  >
                    <div
                      className={`h-2.5 overflow-hidden rounded-full transition-all duration-300 ${
                        i === scene ? 'bg-bamboo-100' : i < scene ? 'bg-bamboo-200' : 'bg-ink-100'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          i < scene
                            ? 'w-full bg-bamboo-600'
                            : i === scene && autoPlay
                            ? 'w-2/3 bg-bamboo-600'
                            : i === scene
                            ? 'w-full bg-bamboo-500'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                disabled={isComplete}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bamboo-600 text-white transition-all hover:bg-bamboo-700 disabled:opacity-40"
                aria-label="Next scene"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-500">
                Scene {scene + 1} of {total}
              </span>
              {isComplete ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-bamboo-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Story complete
                </span>
              ) : autoPlay ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-golden-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-golden-500" /> Auto-playing
                </span>
              ) : (
                <span className="text-ink-400">Tap next to continue</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion CTA */}
      {isComplete && (
        <div className="mt-6 animate-fade-up rounded-3xl bg-gradient-to-br from-bamboo-700 to-bamboo-900 p-6 text-center text-white sm:p-8">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-white/15 animate-pop">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="font-display text-xl font-semibold">You finished the story!</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-bamboo-100">
            Now try the full lesson to see the code breakdown, practice question, and mini challenge.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onStartLesson(lesson.moduleId, lesson.id)}
              className="btn-gold text-sm"
            >
              Open Full Lesson <ArrowRight className="h-4 w-4" />
            </button>
            {lessonIdx < storyLessons.length - 1 ? (
              <button
                onClick={() => switchLesson(lessonIdx + 1)}
                className="btn-ghost text-sm bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Next Story <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => onNavigate('quiz')} className="btn-ghost text-sm bg-white/10 text-white border-white/20 hover:bg-white/20">
                Take Quiz <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Character cards */}
      <div className="mt-10">
        <p className="eyebrow mb-2">Cast</p>
        <h2 className="font-display text-2xl font-semibold text-bamboo-950">The Storytellers</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {(['kavi', 'buddy'] as const).map((ch) => {
            const m = speakerMeta[ch];
            const isBuddy = ch === 'buddy';
            return (
              <div key={ch} className={`card p-5 ring-1 ${m.ring}`}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-3xl bg-gradient-to-b ${m.bg} p-2`}>
                    <CharacterAvatar character={ch} emotion="happy" size={88} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${m.label}`}>{m.role}</p>
                    <h3 className="font-display text-lg font-semibold text-bamboo-950">{m.name}</h3>
                    <p className="mt-1 text-sm text-ink-600">
                      {isBuddy
                        ? 'Your patient AI mentor. Turns tricky ideas into simple Tamil stories.'
                        : 'A curious beginner who asks the questions you would ask.'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SceneStage({ scene }: { scene: typeof lessons[number]['story'][number] }) {
  const meta = speakerMeta[scene.speaker as 'kavi' | 'buddy'] ?? speakerMeta.kavi;
  const isBuddy = scene.speaker === 'buddy';
  const hasCode = !!scene.code;

  return (
    <div
      key={scene.id}
      className="mx-auto max-w-3xl"
    >
      <div
        className={`flex flex-col gap-5 sm:flex-row ${
          isBuddy ? 'sm:flex-row-reverse' : ''
        }`}
      >
        {/* Character */}
        <div className={`flex shrink-0 flex-col items-center ${isBuddy ? 'sm:items-end' : 'sm:items-start'}`}>
          <div className={`rounded-3xl bg-gradient-to-b ${meta.bg} p-2 ring-1 ${meta.ring}`}>
            <CharacterAvatar
              character={scene.speaker as 'kavi' | 'buddy'}
              emotion={scene.emotion}
              size={120}
            />
          </div>
          <p className={`mt-2 text-sm font-bold ${meta.label}`}>{meta.name}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">{meta.role}</p>
        </div>

        {/* Speech bubble + visual */}
        <div className="flex-1">
          {/* Speech bubble */}
          <div
            className={`relative animate-slide-in-right rounded-2xl border-2 ${meta.bubble} px-5 py-4 shadow-soft`}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <MessageCircle className={`h-4 w-4 ${meta.label}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${meta.label}`}>{meta.name}</span>
            </div>
            <p className="font-tamil text-[15px] leading-relaxed text-ink-800 sm:text-base">
              {scene.dialogue}
            </p>
            {/* Tail */}
            <span
              className={`absolute -top-2 ${isBuddy ? 'right-8' : 'left-8'} h-0 w-0 rotate-180 border-x-8 border-t-8 border-x-transparent ${meta.tail}`}
            />
          </div>

          {/* Visual + code */}
          <div className={`mt-5 grid gap-4 ${hasCode ? 'sm:grid-cols-2' : ''}`}>
            <div className="grid min-h-[160px] place-items-center rounded-2xl bg-bamboo-50/70 p-4 animate-scale-in">
              <SceneVisual visual={scene.visual} />
            </div>
            {hasCode && (
              <div className="animate-fade-up">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-ink-500">
                  <Code2 className="h-3.5 w-3.5" /> Code
                </div>
                <CodeBlock parts={scene.code!} animate />
              </div>
            )}
          </div>

          {scene.caption && (
            <p className="mt-4 text-center font-mono text-xs text-bamboo-600 animate-fade-in">
              {scene.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
