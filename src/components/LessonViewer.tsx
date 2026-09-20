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
  Trophy,
  Zap,
  Clock,
  Check,
  Play,
  FileText,
} from 'lucide-react';
import type { Lesson, Level, Module, StoryScene } from '@/types';
import CodeBlock from '@/components/CodeBlock';
import StoryCard from '@/components/StoryCard';
import SceneVisual from '@/components/SceneVisual';
import CCodeEditor from '@/components/CCodeEditor';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import CheatSheetModal from '@/components/CheatSheetModal';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import { compileAndRunJavaProgram } from '@/lib/javaSimulator';
import { useLanguage } from '@/lib/languageContext';

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
}: LessonViewerProps) {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('concept');
  const [, setSceneIndex] = useState(0);
  const [practicePicked, setPracticePicked] = useState<number | null>(null);
  const [challengeCode, setChallengeCode] = useState(lesson.challenge.starter);
  const [challengePassed, setChallengePassed] = useState<boolean | null>(null);
  const [, setShowCompletionModal] = useState(false);

  // Default starter code based on language
  const defaultLessonCode = language === 'java'
    ? (lesson.code.snippet || `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}`)
    : (lesson.code.snippet || `#include <stdio.h>\n\nint main() {\n    printf("Hello Lesson!\\n");\n    return 0;\n}`);

  // Lesson Compiler State
  const initialCode = lesson.code.parts.map((p) => p.text).join('') || defaultLessonCode;
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
    setLessonCode(c || defaultLessonCode);
    setLessonCompilerOutput('');
    setLessonCompilerError(null);
  }, [lesson.id, language]);

  const handleRunLessonCompiler = async (overrideInput?: string) => {
    setIsCompilingLesson(true);
    setLessonCompilerError(null);

    if (language === 'java') {
      setLessonCompilerOutput('Compiling lesson code with Java OpenJDK...');
      const result = await compileAndRunJavaProgram(lessonCode, overrideInput || '');
      if (result.error) {
        setLessonCompilerError(result.error);
        setLessonCompilerOutput('');
      } else {
        setLessonCompilerOutput(result.output || 'Program finished with exit code 0.');
        setLessonCompilerError(null);
      }
    } else {
      setLessonCompilerOutput('Compiling lesson code with GCC...');
      const result = await compileAndRunCProgram(lessonCode, overrideInput || '5');
      if (result.error) {
        setLessonCompilerError(result.error);
        setLessonCompilerOutput('');
      } else {
        setLessonCompilerOutput(result.output || 'Program finished with exit code 0.');
        setLessonCompilerError(null);
      }
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

  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);

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

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-golden-500/20 text-golden-300 border border-golden-500/40 text-xs font-bold hover:bg-golden-500/30 transition-all cursor-pointer shadow-soft"
            title="Export Lesson Cheat Sheet as PDF"
          >
            <FileText className="h-3.5 w-3.5" /> 📄 Export Cheat Sheet PDF
          </button>

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
        <div className={`p-6 text-white sm:p-8 ${
          level === 'beginner'
            ? 'bg-gradient-to-r from-bamboo-600 via-bamboo-700 to-emerald-800'
            : level === 'intermediate'
            ? 'bg-gradient-to-r from-amber-600 via-golden-600 to-bamboo-800'
            : 'bg-gradient-to-r from-purple-700 via-indigo-800 to-ink-950'
        }`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  Module {module.index} · Lesson
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase shadow-sm ${levelBadgeColor}`}>
                  {levelBadgeLabel}
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
              <p className="font-tamil mt-1 text-sm text-white/90">{lesson.tamilTitle}</p>
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
                  <SceneVisual visual={(lesson.visualExplanation.diagramType as StoryScene['visual']) || 'generic'} />
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
                  {language === 'java' ? 'Java Code Example (High-Contrast View)' : 'C Code Example (High-Contrast View)'}
                </h3>
                <CodeBlock
                  parts={
                    lesson.code.parts && lesson.code.parts.length > 0
                      ? lesson.code.parts
                      : [{ text: lesson.code.snippet || defaultLessonCode, tone: 'plain' }]
                  }
                />
              </div>

              {/* Interactive Compiler Section inside Lesson */}
              <div className="rounded-2xl border border-bamboo-200 bg-ink-950 p-4 shadow-md dark:border-bamboo-800">
                <div className="flex items-center justify-between border-b border-ink-800 pb-3 mb-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Code2 className="h-4 w-4" /> {language === 'java' ? '⚡ Live Lesson Java OpenJDK Compiler (Edit & Run Live)' : '⚡ Live Lesson C GCC Compiler (Edit & Run Live)'}
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
                  {/* Code Editor */}
                  <div>
                    <CCodeEditor
                      value={lessonCode}
                      onChange={setLessonCode}
                      rows={10}
                      placeholder={language === 'java' ? '// Edit lesson Java code here...' : '// Edit lesson C code here...'}
                      language={language}
                      onLanguageChange={(newLang) => setLanguage(newLang)}
                      filename={language === 'java' ? 'Main.java' : 'main.c'}
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
                      language={language}
                    />
                  </div>
                </div>
              </div>

              {lesson.outputExplanation && (
                <div className="rounded-xl border border-bamboo-100 bg-bamboo-50/50 p-4 dark:border-bamboo-800 dark:bg-ink-900">
                  <h4 className="text-xs font-bold text-bamboo-800 dark:text-bamboo-300">
                    💡 Output Explanation
                  </h4>
                  <p className="mt-1 text-xs text-ink-700 dark:text-ink-300">
                    {lesson.outputExplanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: STORY */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-bamboo-100 bg-bamboo-50/40 p-6 dark:border-bamboo-800 dark:bg-ink-900/40">
                <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white mb-4">
                  Tamil Story Walkthrough 🎭
                </h3>
                <div className="space-y-4">
                  {lesson.story.map((scene) => (
                    <StoryCard key={scene.id} scene={scene} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PRACTICE & CHALLENGE */}
          {activeTab === 'practice' && (
            <div className="space-y-8">
              {/* Practice MCQ */}
              <div className="rounded-2xl border border-bamboo-200 bg-white p-6 dark:border-bamboo-800 dark:bg-ink-900 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-golden-600 dark:text-golden-400">
                  Practice MCQ
                </span>
                <h3 className="font-display text-base font-bold text-bamboo-950 dark:text-white mt-1">
                  {lesson.practice.question}
                </h3>

                <div className="mt-4 grid gap-3">
                  {lesson.practice.options.map((opt, i) => {
                    const isSelected = practicePicked === i;
                    const isCorrect = i === lesson.practice.answerIndex;
                    let style =
                      'border-bamboo-200 bg-bamboo-50/50 hover:bg-bamboo-100 text-ink-900 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white';

                    if (practicePicked !== null) {
                      if (isCorrect) {
                        style = 'border-emerald-500 bg-emerald-500 text-white font-bold';
                      } else if (isSelected) {
                        style = 'border-red-500 bg-red-500 text-white font-bold';
                      } else {
                        style = 'opacity-40 border-bamboo-100 dark:border-bamboo-900';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handlePracticeOption(i)}
                        disabled={practicePicked !== null}
                        className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${style}`}
                      >
                        <span>{opt}</span>
                        {practicePicked !== null && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        )}
                        {practicePicked !== null && isSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-white" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {practicePicked !== null && (
                  <div className="mt-4 rounded-xl bg-bamboo-50 p-4 border border-bamboo-200 dark:bg-ink-950 dark:border-bamboo-800 text-xs text-bamboo-900 dark:text-bamboo-200 font-medium">
                    {lesson.practice.explanation}
                  </div>
                )}
              </div>

              {/* Code Challenge */}
              <div className="rounded-2xl border border-bamboo-200 bg-ink-950 p-6 dark:border-bamboo-800 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {lesson.challenge.title}
                  </span>
                  <span className="text-[11px] font-bold text-golden-400">
                    +{lesson.xp} XP Reward
                  </span>
                </div>

                <p className="mt-2 text-xs text-white font-semibold leading-relaxed">
                  {lesson.challenge.prompt}
                </p>

                <div className="mt-4">
                  <CCodeEditor
                    value={challengeCode}
                    onChange={setChallengeCode}
                    rows={6}
                    placeholder="// Write challenge code..."
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={checkChallenge}
                    className="btn-primary text-xs px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" /> Verify Solution
                  </button>

                  <button
                    onClick={() => handleComplete()}
                    className="btn-primary text-xs px-5 py-2 bg-bamboo-600 hover:bg-bamboo-700 text-white font-bold flex items-center gap-1.5 shadow-soft"
                  >
                    <Trophy className="h-4 w-4" /> Complete Lesson
                  </button>
                </div>

                {challengePassed === true && (
                  <div className="mt-4 rounded-xl bg-emerald-500/20 p-4 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Great Job! Challenge Passed. Click "Complete Lesson" to earn +{lesson.xp} XP!
                  </div>
                )}

                {challengePassed === false && (
                  <div className="mt-4 rounded-xl bg-red-500/20 p-4 border border-red-500/50 text-red-300 text-xs font-medium">
                    ❌ Not quite right. Hint: <code className="font-mono text-golden-300">{lesson.challenge.hint}</code>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-bamboo-200 pt-6 dark:border-bamboo-800">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="btn-ghost flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" /> Prev: {prevLesson.title}
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="btn-primary flex items-center gap-2 text-xs font-bold bg-bamboo-600 hover:bg-bamboo-700 text-white px-5 py-2.5 shadow-soft"
          >
            Next: {nextLesson.title} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigateModule()}
            className="btn-primary flex items-center gap-2 text-xs font-bold bg-golden-500 hover:bg-golden-400 text-bamboo-950 px-5 py-2.5 shadow-soft"
          >
            Finish Module 🎉 <Trophy className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Printable Cheat Sheet Modal */}
      {showCheatSheet && (
        <CheatSheetModal
          isOpen={showCheatSheet}
          onClose={() => setShowCheatSheet(false)}
          title={lesson.title}
          tamilTitle={lesson.tamilTitle}
          conceptSummaryEn={lesson.concept}
          conceptSummaryTa={lesson.tamilExplanation}
          codeSnippet={lesson.code.snippet || lesson.code.parts.map((p) => p.text).join('')}
          challengeTitle={lesson.challenge.title}
          challengeDescription={lesson.challenge.prompt}
        />
      )}
    </div>
  );
}
