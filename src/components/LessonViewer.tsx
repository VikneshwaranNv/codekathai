import { useState, useEffect } from 'react';
import {
  BookOpen,
  Languages,
  Globe,
  Code2,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Trophy,
  Zap,
  Clock,
  RotateCcw,
  Check,
  Play,
} from 'lucide-react';
import type { Lesson, Level, Module } from '@/types';
import CodeBlock from '@/components/CodeBlock';
import StoryCard from '@/components/StoryCard';
import SceneVisual from '@/components/SceneVisual';
import CCodeEditor from '@/components/CCodeEditor';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import { compileAndRunCProgram } from '@/lib/cSimulator';

interface LessonViewerProps {
  lesson: Lesson;
  module: Module;
  level: Level;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  onNavigateModule: () => void;
  onSelectLesson: (lessonId: string) => void;
  onCompleteLesson: (lessonId: string, xp: number) => void;
  isCompleted: boolean;
}

type Tab = 'concept' | 'tamil' | 'real' | 'code' | 'story' | 'practice';

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: 'concept', label: 'Concept', icon: BookOpen },
  { id: 'tamil', label: 'Tamil', icon: Languages },
  { id: 'real', label: 'Real Life', icon: Globe },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'story', label: 'Story', icon: PlayCircle },
  { id: 'practice', label: 'Practice', icon: HelpCircle },
];

export default function LessonViewer({
  lesson,
  module,
  level,
  prevLesson,
  nextLesson,
  onNavigateModule,
  onSelectLesson,
  onCompleteLesson,
  isCompleted,
}: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('concept');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [practicePicked, setPracticePicked] = useState<number | null>(null);
  const [challengeCode, setChallengeCode] = useState(lesson.challenge.starter);
  const [challengePassed, setChallengePassed] = useState<boolean | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Lesson Compiler State
  const initialCode =
    lesson.code.parts.map((p) => p.text).join('') ||
    '#include <stdio.h>\n\nint main() {\n    printf("Hello Lesson!\\n");\n    return 0;\n}';
  const [lessonCode, setLessonCode] = useState(initialCode);
  const [lessonCompilerOutput, setLessonCompilerOutput] = useState('');
  const [lessonCompilerError, setLessonCompilerError] = useState<string | null>(null);
  const [isCompilingLesson, setIsCompilingLesson] = useState(false);

  useEffect(() => {
    setActiveTab('concept');
    setSceneIndex(0);
    setPracticePicked(null);
    setChallengeCode(lesson.challenge.starter);
    setChallengePassed(null);
    setShowCompletionModal(false);

    const c = lesson.code.parts.map((p) => p.text).join('');
    setLessonCode(
      c || '#include <stdio.h>\n\nint main() {\n    printf("Hello Lesson!\\n");\n    return 0;\n}',
    );
    setLessonCompilerOutput('');
    setLessonCompilerError(null);
  }, [lesson.id]);

  const handleRunLessonCompiler = async (overrideInput?: string) => {
    setIsCompilingLesson(true);
    setLessonCompilerError(null);
    setLessonCompilerOutput('Compiling lesson code with GCC...');

    const result = await compileAndRunCProgram(lessonCode, overrideInput || '5');

    if (result.error) {
      setLessonCompilerError(result.error);
      setLessonCompilerOutput('');
    } else {
      setLessonCompilerOutput(result.output || 'Program finished with exit code 0.');
      setLessonCompilerError(null);
    }
    setIsCompilingLesson(false);
  };

  const handlePracticeOption = (idx: number) => {
    setPracticePicked(idx);
  };

  const checkChallenge = () => {
    const cleanUser = challengeCode.replace(/\s+/g, '');
    const cleanExpected = lesson.challenge.expected.replace(/\s+/g, '');
    if (cleanUser.includes(cleanExpected) || cleanUser === cleanExpected) {
      setChallengePassed(true);
    } else {
      setChallengePassed(false);
    }
  };

  const handleComplete = () => {
    onCompleteLesson(lesson.id, lesson.xp);
    setShowCompletionModal(true);
  };

  const levelBadgeLabel =
    level === 'beginner'
      ? '🌱 Beginner'
      : level === 'intermediate'
      ? '🚀 Intermediate'
      : '🧠 Advanced';

  const levelBadgeColor =
    level === 'beginner'
      ? 'bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300'
      : level === 'intermediate'
      ? 'bg-golden-100 text-golden-800 dark:bg-golden-950 dark:text-golden-300'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';

  return (
    <div className="container-page py-6 sm:py-10">
      {/* Breadcrumb Header & Top Next Lesson Quick Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <button
            onClick={onNavigateModule}
            className="flex items-center gap-1 font-medium hover:text-bamboo-700 dark:hover:text-bamboo-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {module.title}
          </button>
          <span>/</span>
          <span className="font-semibold text-bamboo-800 dark:text-bamboo-200">
            {lesson.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="flex items-center gap-1.5 rounded-full bg-bamboo-100 px-3.5 py-1.5 text-xs font-bold text-bamboo-800 hover:bg-bamboo-200 dark:bg-bamboo-950 dark:text-bamboo-300 dark:hover:bg-bamboo-900 transition-all border border-bamboo-200 dark:border-bamboo-800"
            >
              Next Lesson: {nextLesson.title} <ArrowRight className="h-3.5 w-3.5 text-bamboo-600" />
            </button>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${levelBadgeColor}`}>
            {levelBadgeLabel}
          </span>
        </div>
      </div>

      {/* Main Card Header */}
      <div className="card mb-6 overflow-hidden border border-bamboo-100 dark:border-bamboo-800">
        <div className="bg-gradient-to-r from-bamboo-600 via-bamboo-700 to-bamboo-800 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-bamboo-200">
                Module {module.index} · Lesson
              </p>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
              <p className="font-tamil mt-1 text-sm text-bamboo-100">{lesson.tamilTitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                <Clock className="h-3.5 w-3.5" /> {lesson.duration} min
              </span>
              <span className="flex items-center gap-1 rounded-full bg-golden-500 px-3 py-1.5 text-xs font-bold text-ink-950 shadow-soft">
                <Zap className="h-3.5 w-3.5 fill-current" /> +{lesson.xp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-bamboo-100 bg-bamboo-50/50 p-1 dark:border-bamboo-800 dark:bg-ink-900/50">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-white text-bamboo-700 shadow-soft dark:bg-ink-800 dark:text-bamboo-300'
                    : 'text-ink-600 hover:bg-white/60 dark:text-ink-400'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: CONCEPT */}
          {activeTab === 'concept' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
                  Technical Concept
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  {lesson.concept}
                </p>
              </div>

              <div className="rounded-xl border border-bamboo-200 bg-bamboo-50/60 p-5 dark:border-bamboo-800 dark:bg-bamboo-950/40">
                <h4 className="font-display text-sm font-semibold text-bamboo-900 dark:text-bamboo-200">
                  Visual Model: {lesson.visualExplanation.title}
                </h4>
                <p className="mt-1 text-xs text-ink-600 dark:text-ink-400">
                  {lesson.visualExplanation.description}
                </p>
                <div className="mt-4 flex justify-center">
                  <SceneVisual visual={lesson.visualExplanation.diagramType as any} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TAMIL EXPLANATION */}
          {activeTab === 'tamil' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-amber-500/10 p-6 border border-amber-500/20">
                <h3 className="font-tamil font-display text-xl font-bold text-amber-900 dark:text-amber-300">
                  எளிய தமிழ் விளக்கம் 💡
                </h3>
                <p className="font-tamil mt-3 text-base leading-relaxed text-ink-800 dark:text-ink-200">
                  {lesson.tamilExplanation}
                </p>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold text-bamboo-950 dark:text-white mb-3">
                  English Technical Terms (கலைச்சொற்கள்)
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lesson.englishTerms.map((term, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-bamboo-100 bg-white p-4 dark:border-bamboo-800 dark:bg-ink-900 shadow-sm"
                    >
                      <span className="font-mono text-xs font-bold text-bamboo-600 dark:text-bamboo-400">
                        {term.term}
                      </span>
                      <p className="font-tamil mt-1 text-xs text-ink-700 dark:text-ink-300">
                        {term.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REAL LIFE EXAMPLE */}
          {activeTab === 'real' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-bamboo-200 bg-gradient-to-br from-bamboo-50 to-emerald-50 p-6 dark:border-bamboo-800 dark:from-ink-900 dark:to-bamboo-950">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-600 text-white">
                    <Globe className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-bamboo-700 dark:text-bamboo-300 uppercase tracking-wider">
                      Real Life Analogy
                    </span>
                    <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
                      {lesson.realLife.title}
                    </h3>
                  </div>
                </div>
                <p className="font-tamil mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  {lesson.realLife.body}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CODE & INTERACTIVE COMPILER */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-bamboo-950 dark:text-white mb-2">
                  C Code Example (High-Contrast View)
                </h3>
                <CodeBlock parts={lesson.code.parts} />
              </div>

              {/* Interactive Compiler Section inside Lesson */}
              <div className="rounded-2xl border border-bamboo-200 bg-ink-950 p-4 shadow-md dark:border-bamboo-800">
                <div className="flex items-center justify-between border-b border-ink-800 pb-3 mb-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Code2 className="h-4 w-4" /> ⚡ Live Lesson C GCC Compiler (Edit & Run Live)
                  </span>
                  <button
                    onClick={() => handleRunLessonCompiler()}
                    disabled={isCompilingLesson}
                    className="btn-primary flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />{' '}
                    {isCompilingLesson ? 'Running...' : 'Run Lesson Code'}
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {/* C Code Editor */}
                  <div>
                    <CCodeEditor
                      value={lessonCode}
                      onChange={setLessonCode}
                      rows={10}
                      placeholder="// Edit lesson C code here..."
                    />
                  </div>

                  {/* Interactive Terminal */}
                  <div>
                    <InteractiveTerminal
                      output={lessonCompilerOutput}
                      error={lessonCompilerError}
                      isRunning={isCompilingLesson}
                      onRun={handleRunLessonCompiler}
                      initialInput="5"
                      placeholder="Type input here & press Enter..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold text-bamboo-950 dark:text-white mb-3">
                  Code Token Breakdown
                </h4>
                <div className="grid gap-2">
                  {lesson.code.explanation.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-bamboo-100 bg-bamboo-50/50 p-3 dark:border-bamboo-800 dark:bg-ink-900/50"
                    >
                      <code className="font-mono text-xs font-bold text-bamboo-700 dark:text-bamboo-300">
                        {item.token}
                      </code>
                      <span className="font-tamil text-xs text-ink-600 dark:text-ink-400">
                        {item.meaning}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-bamboo-200 bg-white p-4 dark:border-bamboo-800 dark:bg-ink-900">
                <span className="text-xs font-bold text-bamboo-600 dark:text-bamboo-400 uppercase tracking-wider">
                  Output Explanation
                </span>
                <p className="font-tamil mt-1 text-xs text-ink-700 dark:text-ink-300">
                  {lesson.outputExplanation}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: VISUAL STORY (Kavi & Code Buddy) */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
                    Visual Story Kathai 🎭
                  </h3>
                  <p className="text-xs text-ink-500">
                    Scene {sceneIndex + 1} of {lesson.story.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={sceneIndex === 0}
                    onClick={() => setSceneIndex((s) => Math.max(0, s - 1))}
                    className="btn-ghost px-3 py-1.5 text-xs disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={sceneIndex === lesson.story.length - 1}
                    onClick={() => setSceneIndex((s) => Math.min(lesson.story.length - 1, s + 1))}
                    className="btn-primary px-3 py-1.5 text-xs disabled:opacity-40"
                  >
                    Next Scene
                  </button>
                </div>
              </div>

              {/* Story Scene Card */}
              {lesson.story[sceneIndex] && <StoryCard scene={lesson.story[sceneIndex]} />}
            </div>
          )}

          {/* TAB 6: PRACTICE & MINI CHALLENGE */}
          {activeTab === 'practice' && (
            <div className="space-y-8">
              {/* Practice Question */}
              <div className="rounded-2xl border border-bamboo-200 bg-white p-6 dark:border-bamboo-800 dark:bg-ink-900 shadow-sm">
                <span className="eyebrow mb-2">Practice Quiz</span>
                <h3 className="font-tamil text-base font-bold text-bamboo-950 dark:text-white mb-4">
                  {lesson.practice.question}
                </h3>

                <div className="grid gap-3">
                  {lesson.practice.options.map((opt, idx) => {
                    const isSelected = practicePicked === idx;
                    const isCorrect = idx === lesson.practice.answerIndex;
                    let style =
                      'border-bamboo-200 bg-bamboo-50/50 hover:bg-bamboo-100 dark:border-bamboo-800 dark:bg-ink-800';

                    if (practicePicked !== null) {
                      if (isCorrect) {
                        style =
                          'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200';
                      } else if (isSelected) {
                        style =
                          'border-red-500 bg-red-50 text-red-900 dark:bg-red-950/60 dark:text-red-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handlePracticeOption(idx)}
                        className={`flex items-center justify-between rounded-xl border p-4 text-left font-semibold transition-all ${style}`}
                      >
                        <span className="text-sm">{opt}</span>
                        {practicePicked !== null && isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        )}
                        {practicePicked !== null && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {practicePicked !== null && (
                  <div className="mt-4 rounded-xl bg-bamboo-50 p-4 dark:bg-ink-800 border border-bamboo-200 dark:border-bamboo-700">
                    <p className="font-tamil text-xs font-semibold text-bamboo-900 dark:text-bamboo-200">
                      {lesson.practice.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Mini Challenge */}
              <div className="rounded-2xl border border-bamboo-200 bg-white p-6 dark:border-bamboo-800 dark:bg-ink-900 shadow-sm">
                <span className="eyebrow mb-2">Mini Challenge 🚀</span>
                <h3 className="font-display text-base font-bold text-bamboo-950 dark:text-white">
                  {lesson.challenge.title}
                </h3>
                <p className="mt-1 text-xs text-ink-600 dark:text-ink-400">
                  {lesson.challenge.prompt}
                </p>

                <div className="mt-4">
                  <textarea
                    rows={4}
                    value={challengeCode}
                    onChange={(e) => setChallengeCode(e.target.value)}
                    className="w-full rounded-xl border border-bamboo-300 bg-ink-950 p-4 font-mono text-xs text-emerald-400 focus:outline-none focus:ring-2 focus:ring-bamboo-500"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-ink-500">Hint: {lesson.challenge.hint}</span>
                  <button onClick={checkChallenge} className="btn-primary text-xs px-4 py-2">
                    Check Challenge
                  </button>
                </div>

                {challengePassed === true && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600">
                    <Check className="h-4 w-4" /> Great job! Challenge passed!
                  </div>
                )}
                {challengePassed === false && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-600">
                    <XCircle className="h-4 w-4" /> Try again! Make sure your code matches expected syntax.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800 shadow-soft">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="btn-ghost flex items-center gap-2 text-xs font-bold text-ink-700 dark:text-ink-300 hover:text-bamboo-700"
          >
            <ArrowLeft className="h-4 w-4" /> Previous: {prevLesson.title}
          </button>
        ) : (
          <button onClick={onNavigateModule} className="btn-ghost flex items-center gap-2 text-xs font-bold">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </button>
        )}

        <button
          onClick={handleComplete}
          className="btn-primary flex items-center gap-2 bg-gradient-to-r from-bamboo-600 to-golden-600 text-xs px-6 py-3 font-bold shadow-soft hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" />
          {isCompleted ? 'Completed (Earn XP)' : 'Complete Lesson & Claim XP 🎉'}
        </button>

        {nextLesson ? (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="btn-primary flex items-center gap-2 bg-bamboo-600 hover:bg-bamboo-700 text-white text-xs px-6 py-3 font-bold shadow-soft transition-all"
          >
            <span>Next Lesson: <strong>{nextLesson.title}</strong> (அடுத்த பாடம்)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onNavigateModule}
            className="btn-primary flex items-center gap-2 bg-emerald-600 text-white text-xs px-6 py-3 font-bold"
          >
            <span>Finish Course Track 🎉</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-golden-100 text-golden-600 dark:bg-golden-950 dark:text-golden-400 animate-bounce">
              <Trophy className="h-10 w-10" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-bamboo-950 dark:text-white">
              🎉 Lesson Complete!
            </h2>
            <p className="font-tamil mt-2 text-sm text-bamboo-700 dark:text-bamboo-300">
              வாழ்த்துகள்! நீங்கள் வெற்றிகரமாக பாடத்தை முடித்துவிட்டீர்கள்.
            </p>

            <div className="my-6 rounded-2xl bg-bamboo-50 p-4 dark:bg-ink-800 flex justify-around">
              <div>
                <span className="text-xs text-ink-500">XP Earned</span>
                <p className="font-display text-xl font-bold text-golden-600">+{lesson.xp} XP</p>
              </div>
              <div className="border-r border-bamboo-200 dark:border-bamboo-700" />
              <div>
                <span className="text-xs text-ink-500">Lesson Status</span>
                <p className="font-display text-xl font-bold text-bamboo-600">Completed</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {nextLesson ? (
                <button
                  onClick={() => {
                    setShowCompletionModal(false);
                    onSelectLesson(nextLesson.id);
                  }}
                  className="btn-primary w-full text-sm py-3 font-bold bg-bamboo-600 hover:bg-bamboo-700 text-white flex items-center justify-center gap-2"
                >
                  <span>Next Lesson: <strong>{nextLesson.title}</strong> (அடுத்த பாடம்)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowCompletionModal(false);
                    onNavigateModule();
                  }}
                  className="btn-primary w-full text-sm py-3 bg-emerald-600 text-white font-bold"
                >
                  Return to Course Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  onNavigateModule();
                }}
                className="btn-ghost w-full text-xs py-2 text-ink-500"
              >
                Back to Module Courses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
