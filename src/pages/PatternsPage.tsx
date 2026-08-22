import { useState } from 'react';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Terminal,
  Code2,
  ChevronRight,
  Flame,
  Sprout,
  Crown,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { patternCategories, patternProblems } from '@/data/patterns';
import type { PatternProblem } from '@/types';
import { useProgress } from '@/lib/useProgress';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import CCodeEditor from '@/components/CCodeEditor';

interface PatternsPageProps {
  onNavigate: (page: Page) => void;
}

export default function PatternsPage({ onNavigate }: PatternsPageProps) {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [activePattern, setActivePattern] = useState<PatternProblem | null>(null);

  // Workspace state
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [compiling, setCompiling] = useState(false);
  const [evalResult, setEvalResult] = useState<'idle' | 'success' | 'fail'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [mobileTab, setMobileTab] = useState<'practice' | 'compiler'>('practice');

  const { completeLesson } = useProgress();

  const filtered =
    activeCat === 'all'
      ? patternProblems
      : patternProblems.filter((p) => p.category === activeCat);

  const openPatternWorkspace = (p: PatternProblem) => {
    setActivePattern(p);
    setCode(p.starterCode);
    setOutput('');
    setCompilerError(null);
    setEvalResult('idle');
    setShowHint(false);
    setMobileTab('practice');
  };

  const handleRunCode = async () => {
    if (!activePattern) return;

    if (!code.trim()) {
      setOutput('');
      setCompilerError('Error: Please write C code before running.');
      setEvalResult('fail');
      return;
    }

    setCompiling(true);
    setEvalResult('idle');
    setCompilerError(null);
    setOutput('Compiling C code with GCC...');

    // Call real GCC compiler API
    const simResult = await compileAndRunCProgram(code, '');

    if (simResult.error) {
      setCompilerError(simResult.error);
      setOutput('');
      setEvalResult('fail');
      setCompiling(false);
      return;
    }

    const generatedOutput = simResult.output || '';
    setOutput(generatedOutput);
    setCompiling(false);

    // Strict output comparison
    const cleanUser = generatedOutput.trim().replace(/\r\n/g, '\n');
    const cleanExpected = activePattern.expectedOutput.trim().replace(/\r\n/g, '\n');

    if (cleanUser && cleanUser === cleanExpected) {
      setEvalResult('success');
      completeLesson('problemsolving', activePattern.id, activePattern.xp);
    } else {
      setEvalResult('fail');
    }
  };

  const handleReset = () => {
    if (activePattern) {
      setCode(activePattern.starterCode);
      setOutput('');
      setCompilerError(null);
      setEvalResult('idle');
    }
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
    setCompilerError(null);
    setEvalResult('idle');
  };

  /* ========================================================================
     PATTERNS WORKSPACE VIEW (SPLIT SCREEN DESKTOP / TABS MOBILE)
     ======================================================================== */
  if (activePattern) {
    const levelIcon =
      activePattern.difficulty === 'beginner' ? (
        <Sprout className="h-4 w-4 text-bamboo-600" />
      ) : activePattern.difficulty === 'intermediate' ? (
        <Flame className="h-4 w-4 text-golden-600" />
      ) : (
        <Crown className="h-4 w-4 text-purple-600" />
      );

    return (
      <div className="container-page py-6 sm:py-8">
        {/* Workspace Top Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-bamboo-100 pb-4 dark:border-bamboo-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePattern(null)}
              className="btn-ghost flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="h-4 w-4" /> All Patterns
            </button>
            <span className="text-ink-300">|</span>
            <div className="flex items-center gap-2">
              {levelIcon}
              <h1 className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
                {activePattern.title}
              </h1>
              <span className="font-tamil text-xs text-bamboo-600">({activePattern.tamilTitle})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-golden-100 px-3 py-1 text-xs font-bold text-golden-800 dark:bg-golden-950 dark:text-golden-300">
              +{activePattern.xp} XP
            </span>
            <button onClick={handleReset} className="btn-ghost px-3 py-1.5 text-xs" title="Reset Code">
              <RotateCcw className="h-3.5 w-3.5 inline mr-1" /> Reset
            </button>
            <button
              onClick={handleRunCode}
              disabled={compiling}
              className="btn-primary flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 font-bold shadow-soft"
            >
              <Play className="h-3.5 w-3.5 fill-current" /> {compiling ? 'Compiling...' : 'Run Code'}
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="mb-4 flex border-b border-bamboo-100 bg-bamboo-50/50 p-1 dark:border-bamboo-800 dark:bg-ink-900 lg:hidden">
          <button
            onClick={() => setMobileTab('practice')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              mobileTab === 'practice'
                ? 'bg-white text-bamboo-800 shadow-soft dark:bg-ink-800 dark:text-bamboo-300'
                : 'text-ink-600'
            }`}
          >
            Practice Editor 📝
          </button>
          <button
            onClick={() => setMobileTab('compiler')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              mobileTab === 'compiler'
                ? 'bg-white text-bamboo-800 shadow-soft dark:bg-ink-800 dark:text-bamboo-300'
                : 'text-ink-600'
            }`}
          >
            Compiler Output 💻
          </button>
        </div>

        {/* Workspace Split-Screen Container */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT PANEL — STUDENT PRACTICE */}
          <div
            className={`card flex flex-col overflow-hidden border border-bamboo-200 dark:border-bamboo-800 ${
              mobileTab === 'compiler' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="border-b border-bamboo-100 bg-bamboo-50/80 p-4 dark:border-bamboo-800 dark:bg-ink-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-bamboo-800 dark:text-bamboo-300 uppercase tracking-wider">
                  Pattern Task & Editor
                </span>
                <button
                  onClick={() => setShowHint((v) => !v)}
                  className="flex items-center gap-1 text-xs font-bold text-golden-700 hover:text-golden-600"
                >
                  <Lightbulb className="h-4 w-4" /> {showHint ? 'Hide Hint' : 'Smart Hint'}
                </button>
              </div>

              <p className="mt-2 text-xs text-ink-700 dark:text-ink-300">
                {activePattern.concept}
              </p>
              <p className="font-tamil mt-1 text-xs text-bamboo-700 dark:text-bamboo-300">
                {activePattern.tamilConcept}
              </p>

              {showHint && (
                <div className="mt-3 rounded-xl bg-golden-50 p-3 text-xs text-golden-900 border border-golden-200 dark:bg-golden-950/60 dark:text-golden-200 dark:border-golden-800">
                  <span className="font-bold">Hint:</span> {activePattern.hints[0]}
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col bg-ink-950 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] text-ink-400">pattern.c</span>
                <button onClick={handleClear} className="text-[10px] text-ink-500 hover:text-red-400">
                  Clear Editor
                </button>
              </div>
              <CCodeEditor
                value={code}
                onChange={setCode}
                rows={12}
                placeholder="// Write C loops to print the pattern..."
              />
            </div>
          </div>

          {/* RIGHT PANEL — C COMPILER & EVALUATION */}
          <div
            className={`card flex flex-col overflow-hidden border border-bamboo-200 dark:border-bamboo-800 bg-ink-950 text-white ${
              mobileTab === 'practice' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900 p-4">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Terminal className="h-4 w-4" /> 💻 C Compiler Output
              </span>
              <span className="text-[10px] font-mono uppercase text-ink-400">GCC Compiler</span>
            </div>

            {/* Expected vs Actual */}
            <div className="p-4 flex-1 space-y-4 overflow-y-auto font-mono text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
                  Expected Pattern Output:
                </span>
                <pre className="rounded-xl bg-ink-900 p-3 text-bamboo-200 border border-ink-800 whitespace-pre">
                  {activePattern.expectedOutput}
                </pre>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
                  Your Program Output:
                </span>
                {compilerError ? (
                  <div className="rounded-xl bg-red-950/80 p-3 text-red-400 border border-red-800 whitespace-pre-wrap">
                    {compilerError}
                  </div>
                ) : (
                  <pre className="rounded-xl bg-ink-900 p-3 text-emerald-300 border border-ink-800 whitespace-pre min-h-[80px]">
                    {output || '// Write your C loops and click "Run Code" to compile...'}
                  </pre>
                )}
              </div>

              {/* Match Feedback Banner */}
              {evalResult === 'success' && (
                <div className="rounded-xl bg-emerald-500/20 p-4 border border-emerald-500/40 text-emerald-300">
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" /> 🎉 Super! Pattern correct!
                  </div>
                  <p className="font-tamil text-xs text-emerald-200">
                    வாழ்த்துகள்! நீங்கள் சரியாக வடிவத்தை அச்சிட்டுள்ளீர்கள். +{activePattern.xp} XP பெற்றுள்ளீர்கள்.
                  </p>
                </div>
              )}

              {evalResult === 'fail' && (
                <div className="rounded-xl bg-amber-500/20 p-4 border border-amber-500/40 text-amber-300">
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    <XCircle className="h-5 w-5 text-amber-400" /> பரவாயில்லை! இன்னும் கொஞ்சம் try பண்ணுங்க 😊
                  </div>
                  <p className="font-tamil text-xs text-amber-200">
                    உங்கள் நிரலின் வெளியீடு எதிர்பார்த்த pattern-உடன் சரியாகப் பொருந்த வேண்டும்.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================================
     PATTERNS LISTING VIEW
     ======================================================================== */
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">🧩 Pattern Practice Workspace</span>
          <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
            Pattern Printing Laboratory
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-400">
            Star, Number, Hollow மற்றும் Advanced Pattern பிராபிளம்களை நேரடி Compiler-ல் இயக்கிப் பயிற்சி செய்யுங்கள்.
          </p>
        </div>
        <button onClick={() => onNavigate('dashboard')} className="btn-ghost text-xs">
          <ArrowLeft className="h-4 w-4 inline mr-1" /> Back to Dashboard
        </button>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {patternCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activeCat === c.id
                ? 'bg-bamboo-600 text-white shadow-soft'
                : 'bg-bamboo-100 text-bamboo-800 hover:bg-bamboo-200 dark:bg-ink-800 dark:text-bamboo-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Pattern Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const badgeColor =
            p.difficulty === 'beginner'
              ? 'bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300'
              : p.difficulty === 'intermediate'
              ? 'bg-golden-100 text-golden-800 dark:bg-golden-950 dark:text-golden-300'
              : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';

          return (
            <div
              key={p.id}
              onClick={() => openPatternWorkspace(p)}
              className="card group cursor-pointer flex flex-col justify-between p-6 border border-bamboo-100 dark:border-bamboo-800 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-950 dark:text-bamboo-300 font-bold">
                    <Code2 className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold capitalize ${badgeColor}`}>
                    {p.difficulty}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-bamboo-950 dark:text-white">
                  {p.title}
                </h3>
                <p className="font-tamil text-xs font-semibold text-bamboo-700 dark:text-bamboo-300 mt-0.5">
                  {p.tamilTitle}
                </p>

                <div className="mt-4 rounded-xl bg-ink-950 p-3 font-mono text-xs text-bamboo-300">
                  <pre className="whitespace-pre">{p.expectedOutput}</pre>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-bamboo-100 pt-4 dark:border-bamboo-800">
                <span className="text-xs font-bold text-golden-600">+{p.xp} XP</span>
                <span className="flex items-center gap-1 text-xs font-bold text-bamboo-700 dark:text-bamboo-300 group-hover:translate-x-1 transition-all">
                  Solve Pattern <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
