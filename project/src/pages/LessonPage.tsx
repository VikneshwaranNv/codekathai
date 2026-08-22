import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Languages,
  Globe,
  Code2,
  PlayCircle,
  HelpCircle,
  Sword,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Zap,
  Clock,
  Trophy,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import type { ModuleId, Lesson } from '@/data/course';
import { lessons, modules } from '@/data/course';
import { intermediateLessons, advancedLessons, intermediateModules, advancedModules } from '@/data/levelCourses';
import type { ProgressState } from '@/lib/useProgress';
import CodeBlock from '@/components/CodeBlock';
import StoryCard from '@/components/StoryCard';
import ProgressBar from '@/components/ProgressBar';

interface LessonPageProps {
  moduleId: ModuleId;
  lessonId: string;
  onNavigate: (page: Page) => void;
  onStartLesson: (moduleId: ModuleId, lessonId: string) => void;
  progress: ProgressState;
}

type Tab = 'concept' | 'tamil' | 'real' | 'code' | 'story' | 'practice';
type ChallengeResult = 'idle' | 'success' | 'error';

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: 'concept', label: 'Concept', icon: BookOpen },
  { id: 'tamil', label: 'Tamil', icon: Languages },
  { id: 'real', label: 'Real Life', icon: Globe },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'story', label: 'Story', icon: PlayCircle },
  { id: 'practice', label: 'Practice', icon: HelpCircle },
];

const allLessons: Lesson[] = [...lessons, ...intermediateLessons, ...advancedLessons];
const allModules = [...modules, ...intermediateModules, ...advancedModules];

export default function LessonPage({ moduleId, lessonId, onNavigate, onStartLesson, progress }: LessonPageProps) {
  const [tab, setTab] = useState<Tab>('concept');
  const [scene, setScene] = useState(0);
  const [practicePicked, setPracticePicked] = useState<number | null>(null);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeResult, setChallengeResult] = useState<ChallengeResult>('idle');

  const lesson = allLessons.find((l) => l.id === lessonId && l.moduleId === moduleId) ?? allLessons.find((l) => l.id === lessonId);
  const mod = allModules.find((m) => m.id === moduleId || m.id === lesson?.moduleId) ?? modules[1];
  const topic = mod.topics.find((t) => t.id === lessonId);

  useEffect(() => {
    setTab('concept');
    setScene(0);
    setPracticePicked(null);
    setChallengeInput('');
    setChallengeResult('idle');
  }, [lessonId, moduleId]);

  const lessonIndex = allLessons.findIndex((l) => l.id === (lesson?.id ?? lessonId));
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex >= 0 && lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : undefined;

  if (!lesson) {
    return (
      <div className="container-page py-8 sm:py-10">
        <div className="mb-5 flex items-center gap-2 text-sm text-ink-500">
          <button onClick={() => onNavigate('dashboard')} className="font-medium hover:text-bamboo-700">
            {mod.title}
          </button>
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-bamboo-700">{topic?.title ?? 'Lesson'}</span>
        </div>
        <div className="card p-8 text-center sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-600">
            <BookOpen className="h-8 w-8" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold text-bamboo-950">{topic?.title ?? 'This lesson'}</h1>
          <p className="mx-auto mt-3 max-w-md text-ink-600">
            This lesson's full content is being prepared. You can still explore the other lessons in this module — everything is open for learning!
          </p>
          <button onClick={() => onNavigate('dashboard')} className="btn-primary mx-auto mt-6 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Module
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm text-ink-500">
        <button onClick={() => onNavigate('dashboard')} className="font-medium hover:text-bamboo-700">
          {mod.title}
        </button>
        <ArrowRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-bamboo-700">{lesson.title}</span>
      </div>

      {/* Lesson header */}
      <div className="card mb-6 overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Lesson {lessonIndex + 1} · Module {mod.index}</p>
            <h1 className="font-display text-2xl font-semibold text-bamboo-950 sm:text-3xl">{lesson.title}</h1>
            <p className="font-tamil text-sm text-bamboo-700">{lesson.tamilTitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="chip bg-bamboo-100 text-bamboo-700"><Clock className="h-3.5 w-3.5" /> {lesson.duration} min</span>
            <span className="chip bg-golden-100 text-golden-700"><Zap className="h-3.5 w-3.5" /> {lesson.xp} XP</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-t border-bamboo-100 px-3 py-2 no-scrollbar">
          {tabs.map((t) => {
            const TIcon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active ? 'bg-bamboo-600 text-white shadow-soft' : 'text-ink-600 hover:bg-bamboo-50'
                }`}
              >
                <TIcon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      <div className="animate-fade-in">
        {tab === 'concept' && <ConceptTab lesson={lesson} />}
        {tab === 'tamil' && <TamilTab lesson={lesson} />}
        {tab === 'real' && <RealLifeTab lesson={lesson} />}
        {tab === 'code' && <CodeTab lesson={lesson} />}
        {tab === 'story' && (
          <StoryTab
            lesson={lesson}
            scene={scene}
            setScene={setScene}
          />
        )}
        {tab === 'practice' && (
          <PracticeTab
            lesson={lesson}
            picked={practicePicked}
            setPicked={setPracticePicked}
            challengeInput={challengeInput}
            setChallengeInput={setChallengeInput}
            challengeResult={challengeResult}
            setChallengeResult={setChallengeResult}
            onComplete={() => progress.completeLesson(moduleId, lessonId)}
          />
        )}
      </div>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('dashboard')} className="btn-ghost text-sm">
            <ArrowLeft className="h-4 w-4" /> Course
          </button>
          {prevLesson ? (
            <button
              onClick={() => onStartLesson(prevLesson.moduleId, prevLesson.id)}
              className="btn-ghost text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Previous Lesson
            </button>
          ) : null}
        </div>
        {nextLesson ? (
          <button
            onClick={() => onStartLesson(nextLesson.moduleId, nextLesson.id)}
            className="btn-primary text-sm"
          >
            Next Lesson <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={() => onNavigate('quiz')} className="btn-gold text-sm">
            Take the Quiz <Trophy className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ConceptTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700">
          <BookOpen className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">Concept</p>
          <h2 className="font-display text-xl font-semibold text-bamboo-950">What you're learning</h2>
        </div>
      </div>
      <p className="mt-5 text-lg leading-relaxed text-ink-800">{lesson.concept}</p>
      {lesson.contentSections ? (
        <div className="mt-6 space-y-5">
          {lesson.contentSections.map((section) => (
            <div key={section.heading} className="rounded-2xl bg-bamboo-50 p-5">
              <h3 className="font-display text-lg font-semibold text-bamboo-700">{section.heading}</h3>
              <ul className="mt-3 space-y-2.5">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bamboo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-bamboo-50 p-5">
          <p className="text-sm font-semibold text-bamboo-700">Key takeaway</p>
          <p className="mt-1 text-ink-700">{lesson.concept.split('.')[0]}.</p>
        </div>
      )}
    </div>
  );
}

function TamilTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-golden-100 text-golden-700">
          <Languages className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">Tamil Explanation</p>
          <h2 className="font-display text-xl font-semibold text-bamboo-950">Simple spoken Tamil</h2>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border-2 border-golden-200 bg-golden-50 p-5">
        <p className="font-tamil text-lg leading-relaxed text-ink-800">{lesson.tamilExplanation}</p>
      </div>
      <p className="mt-4 text-xs text-ink-500">We keep Tamil simple and conversational — no textbook words.</p>
    </div>
  );
}

function RealLifeTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700">
          <Globe className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">Real-Life Example</p>
          <h2 className="font-display text-xl font-semibold text-bamboo-950">{lesson.realLife.title}</h2>
        </div>
      </div>
      <p className="mt-5 text-lg leading-relaxed text-ink-800">{lesson.realLife.body}</p>
    </div>
  );
}

function CodeTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink-100 text-ink-700">
          <Code2 className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">Code Example</p>
          <h2 className="font-display text-xl font-semibold text-bamboo-950">See it in C</h2>
        </div>
      </div>
      <div className="mt-5">
        <CodeBlock parts={lesson.code.parts} animate />
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-sm font-semibold text-bamboo-700">What each part means:</p>
        {lesson.code.explanation.map((e) => (
          <div key={e.token} className="flex items-start gap-3 rounded-xl bg-bamboo-50 p-3">
            <code className="rounded-md bg-ink-950 px-2 py-0.5 font-mono text-sm text-bamboo-300">{e.token}</code>
            <p className="text-sm text-ink-700">{e.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryTab({
  lesson,
  scene,
  setScene,
}: {
  lesson: Lesson;
  scene: number;
  setScene: (n: number) => void;
}) {
  const total = lesson.story.length;
  const current = lesson.story[scene];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-golden-100 text-golden-700">
            <PlayCircle className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow">Visual Story</p>
            <h2 className="font-display text-xl font-semibold text-bamboo-950">Kavi & Code Buddy</h2>
          </div>
        </div>
        <span className="chip bg-bamboo-100 text-bamboo-700">
          Scene {scene + 1} / {total}
        </span>
      </div>

      <ProgressBar value={((scene + 1) / total) * 100} size="sm" className="mb-5" />

      <div className="min-h-[340px]">
        <StoryCard scene={current} active index={scene} />
      </div>

      {/* Scene controls */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setScene(Math.max(0, scene - 1))}
          disabled={scene === 0}
          className="btn-ghost text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        <div className="flex gap-1.5">
          {lesson.story.map((_, i) => (
            <button
              key={i}
              onClick={() => setScene(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === scene ? 'w-6 bg-bamboo-600' : 'w-2.5 bg-bamboo-200 hover:bg-bamboo-300'
              }`}
              aria-label={`Scene ${i + 1}`}
            />
          ))}
        </div>
        {scene < total - 1 ? (
          <button onClick={() => setScene(scene + 1)} className="btn-primary text-sm">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="chip bg-bamboo-100 text-bamboo-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Story complete
          </span>
        )}
      </div>
    </div>
  );
}

function PracticeTab({
  lesson,
  picked,
  setPicked,
  challengeInput,
  setChallengeInput,
  challengeResult,
  setChallengeResult,
  onComplete,
}: {
  lesson: Lesson;
  picked: number | null;
  setPicked: (n: number | null) => void;
  challengeInput: string;
  setChallengeInput: (s: string) => void;
  challengeResult: ChallengeResult;
  setChallengeResult: (r: ChallengeResult) => void;
  onComplete: () => void;
}) {
  const correct = picked === lesson.practice.answerIndex;

  const normalizeCode = (s: string): string =>
    s
      .split('\n')
      .map((l) => l.trim().replace(/\s+/g, ' '))
      .filter((l) => l.length > 0)
      .join('\n');

  const runCode = () => {
    if (!challengeInput.trim()) {
      setChallengeResult('error');
      return;
    }
    const normalized = normalizeCode(challengeInput);
    const expected = normalizeCode(lesson.challenge.expected);
    const success = normalized === expected;
    setChallengeResult(success ? 'success' : 'error');
    if (success) onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Practice question */}
      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700">
            <HelpCircle className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow">Practice Question</p>
            <h2 className="font-display text-xl font-semibold text-bamboo-950">Check your understanding</h2>
          </div>
        </div>
        <p className="mt-5 text-lg font-medium text-ink-800">{lesson.practice.question}</p>
        <div className="mt-4 grid gap-2.5">
          {lesson.practice.options.map((opt, i) => {
            let cls = 'border-bamboo-100 bg-white hover:border-bamboo-300';
            if (picked !== null && i === lesson.practice.answerIndex) cls = 'border-bamboo-600 bg-bamboo-50';
            else if (picked === i && i !== lesson.practice.answerIndex) cls = 'border-red-300 bg-red-50';
            else if (picked !== null) cls = 'border-bamboo-100 opacity-60';
            return (
              <button
                key={i}
                onClick={() => setPicked(i)}
                disabled={picked !== null}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${cls}`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-bamboo-100 text-xs font-bold text-bamboo-700">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-mono">{opt}</span>
                </span>
                {picked !== null && i === lesson.practice.answerIndex && <CheckCircle2 className="h-5 w-5 text-bamboo-600" />}
                {picked === i && i !== lesson.practice.answerIndex && <XCircle className="h-5 w-5 text-red-500" />}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className={`mt-4 animate-fade-up rounded-2xl p-4 ${correct ? 'bg-bamboo-50' : 'bg-golden-50'}`}>
            <div className="flex items-start gap-3">
              <Lightbulb className={`mt-0.5 h-5 w-5 shrink-0 ${correct ? 'text-bamboo-600' : 'text-golden-600'}`} />
              <p className="text-sm text-ink-700">{lesson.practice.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Mini challenge */}
      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-golden-100 text-golden-700">
            <Sword className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow">Mini Challenge</p>
            <h2 className="font-display text-xl font-semibold text-bamboo-950">{lesson.challenge.title}</h2>
          </div>
        </div>
        <p className="mt-5 text-ink-700">{lesson.challenge.prompt}</p>

        {/* Code editor */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink-700 bg-ink-950">
          <div className="flex items-center gap-2 border-b border-ink-700 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-xs text-white/50">code.c</span>
          </div>
          <textarea
            value={challengeInput}
            onChange={(e) => {
              setChallengeInput(e.target.value);
              setChallengeResult('idle');
            }}
            placeholder={lesson.challenge.starter}
            rows={8}
            spellCheck={false}
            className="w-full resize-y bg-ink-950 px-4 py-3 font-mono text-base leading-relaxed text-bamboo-300 placeholder:text-white/25 focus:outline-none min-h-[200px]"
          />
          <div className="border-t border-ink-700 px-4 py-3">
            <button
              onClick={runCode}
              className="flex items-center gap-2 rounded-lg bg-bamboo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-bamboo-700"
            >
              <PlayCircle className="h-4 w-4" /> Run Code
            </button>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-golden-50 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-golden-600" />
          <p className="text-sm text-ink-700"><span className="font-semibold">Hint:</span> {lesson.challenge.hint}</p>
        </div>

        {/* Success feedback */}
        {challengeResult === 'success' && (
          <div className="mt-4 animate-pop rounded-2xl border-2 border-green-500 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="font-semibold text-green-700">Correct! Your code compiled and ran successfully. +{lesson.xp} XP earned.</p>
            </div>
          </div>
        )}

        {/* Error feedback */}
        {challengeResult === 'error' && (
          <div className="mt-4 animate-fade-up rounded-2xl border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div>
                <p className="font-semibold text-red-700">
                  {challengeInput.trim()
                    ? 'Compilation error — your code has some issues. Check the hint below and try again.'
                    : 'Please write some code before running.'}
                </p>
                <div className="mt-2 flex items-start gap-2 rounded-xl bg-white/60 p-3">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-golden-600" />
                  <p className="text-sm text-ink-700"><span className="font-semibold">How to fix:</span> {lesson.challenge.hint}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
