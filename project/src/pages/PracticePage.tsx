import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Code2, Eye, Bug, FileCode, Star } from 'lucide-react';
import { useState } from 'react';
import { practiceProblems, type PracticeProblem, type Difficulty, type ProblemType } from '@/data/practice';
import type { Page } from '@/components/Navbar';

interface PracticePageProps {
  onNavigate: (page: Page) => void;
}

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-bamboo-100 text-bamboo-700',
  medium: 'bg-golden-100 text-golden-700',
  hard: 'bg-rose-100 text-rose-700',
};

const typeIcons: Record<ProblemType, typeof Code2> = {
  mcq: Code2,
  'output-prediction': Eye,
  debugging: Bug,
  scenario: FileCode,
  interview: Star,
  pattern: Code2,
};

const typeLabels: Record<ProblemType, string> = {
  mcq: 'MCQ',
  'output-prediction': 'Output Prediction',
  debugging: 'Debugging',
  scenario: 'Scenario',
  interview: 'Interview',
  pattern: 'Pattern',
};

export default function PracticePage({ onNavigate }: PracticePageProps) {
  const [filterDiff, setFilterDiff] = useState<Difficulty | 'all'>('all');
  const [filterType, setFilterType] = useState<ProblemType | 'all'>('all');
  const [active, setActive] = useState<PracticeProblem | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [hintIdx, setHintIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [debugInput, setDebugInput] = useState('');
  const [debugResult, setDebugResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const filtered = practiceProblems.filter((p) => {
    if (filterDiff !== 'all' && p.difficulty !== filterDiff) return false;
    if (filterType !== 'all' && p.type !== filterType) return false;
    return true;
  });

  const openProblem = (p: PracticeProblem) => {
    setActive(p);
    setPicked(null);
    setShowHints(false);
    setHintIdx(0);
    setShowSolution(false);
    setDebugInput(p.buggyCode ?? '');
    setDebugResult('idle');
  };

  const checkDebug = () => {
    if (!active?.fixedCode) return;
    const norm = (s: string) => s.trim().replace(/\s+/g, ' ');
    setDebugResult(norm(debugInput) === norm(active.fixedCode) ? 'correct' : 'wrong');
  };

  if (active) {
    const Icon = typeIcons[active.type];
    return (
      <div className="container-page py-6">
        <button onClick={() => setActive(null)} className="btn-ghost mb-4 text-sm">
          <ArrowLeft className="h-4 w-4" /> All Problems
        </button>

        <div className="card p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-bamboo-950">{active.title}</h2>
                <p className="font-tamil text-sm text-bamboo-600">{active.tamilTitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className={`chip ${difficultyColors[active.difficulty]}`}>{active.difficulty}</span>
              <span className="chip bg-bamboo-50 text-bamboo-700 border border-bamboo-100">{typeLabels[active.type]}</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm leading-relaxed text-ink-700">{active.prompt}</p>
            <p className="mt-1 font-tamil text-sm leading-relaxed text-ink-500">{active.tamilPrompt}</p>
          </div>

          {/* Code display for output prediction */}
          {active.code && (
            <pre className="mt-4 overflow-x-auto rounded-xl bg-ink-900 p-4 text-sm text-bamboo-100 font-mono">
              {active.code}
            </pre>
          )}

          {/* Buggy code for debugging */}
          {active.buggyCode && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-500">Buggy Code</p>
              <textarea
                value={debugInput}
                onChange={(e) => setDebugInput(e.target.value)}
                className="h-32 w-full resize-none rounded-xl bg-ink-900 p-4 font-mono text-sm text-bamboo-100 outline-none"
                spellCheck={false}
              />
              <button onClick={checkDebug} className="btn-primary mt-2 text-sm">
                <Bug className="h-4 w-4" /> Check Fix
              </button>
              {debugResult === 'correct' && (
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-bamboo-600">
                  <CheckCircle2 className="h-4 w-4" /> Correct! You fixed the bug.
                </p>
              )}
              {debugResult === 'wrong' && (
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-rose-600">
                  <XCircle className="h-4 w-4" /> Not quite — try again or check the hints.
                </p>
              )}
            </div>
          )}

          {/* MCQ / Output prediction options */}
          {active.options && (
            <div className="mt-5 space-y-2">
              {active.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setPicked(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    picked === i
                      ? 'border-bamboo-500 bg-bamboo-50'
                      : 'border-bamboo-100 bg-white hover:bg-bamboo-50'
                  }`}
                >
                  <span className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold ${
                    picked === i ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-ink-700 font-mono">{opt}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  if (picked === active.answerIndex) {
                    setDebugResult('correct');
                  } else {
                    setDebugResult('wrong');
                  }
                }}
                disabled={picked === null}
                className="btn-primary mt-2 text-sm"
              >
                Check Answer
              </button>
              {debugResult === 'correct' && picked === active.answerIndex && (
                <div className="mt-3 rounded-xl bg-bamboo-50 p-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-bamboo-700">
                    <CheckCircle2 className="h-4 w-4" /> Correct!
                  </p>
                  <p className="mt-1 text-sm text-ink-600">{active.explanation}</p>
                </div>
              )}
              {debugResult === 'wrong' && picked !== null && picked !== active.answerIndex && (
                <div className="mt-3 rounded-xl bg-rose-50 p-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-rose-700">
                    <XCircle className="h-4 w-4" /> Not quite.
                  </p>
                  <p className="mt-1 text-sm text-ink-600">The correct answer is {String.fromCharCode(65 + (active.answerIndex ?? 0))}. {active.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Expected output for pattern/scenario */}
          {active.expectedOutput && !active.buggyCode && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Expected Output</p>
              <pre className="overflow-x-auto rounded-xl bg-bamboo-50 p-3 text-sm font-mono text-ink-700">
                {active.expectedOutput}
              </pre>
            </div>
          )}

          {/* Smart Hints */}
          <div className="mt-5 border-t border-bamboo-100 pt-5">
            <button
              onClick={() => setShowHints((v) => !v)}
              className="flex w-full items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold text-bamboo-800">
                <Lightbulb className="h-5 w-5 text-golden-500" /> Smart Hints
              </span>
              <span className="text-sm text-bamboo-600">{showHints ? 'Hide' : 'Show'}</span>
            </button>

            {showHints && (
              <div className="mt-4 space-y-3">
                {active.hints.slice(0, hintIdx + 1).map((h, i) => (
                  <div key={i} className="rounded-xl bg-golden-50 p-3 text-sm text-ink-700">
                    <span className="font-semibold text-golden-700">Hint {i + 1}:</span> {h}
                  </div>
                ))}
                <div className="flex gap-2">
                  {hintIdx < active.hints.length - 1 && (
                    <button onClick={() => setHintIdx((i) => i + 1)} className="btn-ghost text-xs">
                      Next Hint
                    </button>
                  )}
                  {hintIdx >= active.hints.length - 1 && !showSolution && (
                    <button onClick={() => setShowSolution(true)} className="btn-gold text-xs">
                      Reveal Solution
                    </button>
                  )}
                </div>
                {showSolution && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Solution</p>
                    <pre className="overflow-x-auto rounded-xl bg-ink-900 p-4 text-sm text-bamboo-100 font-mono">
                      {active.solution}
                    </pre>
                    <p className="mt-2 text-sm text-ink-600">{active.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <button onClick={() => onNavigate('dashboard')} className="btn-ghost mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Courses
      </button>

      <div className="mb-8">
        <span className="eyebrow">Practice Coding</span>
        <h1 className="section-title mt-2">Sharpen Your Skills</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          MCQs, output prediction, debugging, scenario-based problems, interview questions, and pattern printing —
          all with step-by-step hints.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilterDiff('all')}
          className={`chip ${filterDiff === 'all' ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700'}`}
        >
          All Levels
        </button>
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => setFilterDiff(d)}
            className={`chip ${filterDiff === d ? difficultyColors[d] : 'bg-bamboo-50 text-ink-500 border border-bamboo-100'}`}
          >
            {d}
          </button>
        ))}
        <span className="w-px bg-bamboo-100 mx-1" />
        <button
          onClick={() => setFilterType('all')}
          className={`chip ${filterType === 'all' ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700'}`}
        >
          All Types
        </button>
        {(['mcq', 'output-prediction', 'debugging', 'scenario', 'interview', 'pattern'] as ProblemType[]).map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`chip ${filterType === t ? 'bg-bamboo-600 text-white' : 'bg-bamboo-50 text-ink-500 border border-bamboo-100'}`}
          >
            {typeLabels[t]}
          </button>
        ))}
      </div>

      {/* Problems grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((p) => {
          const Icon = typeIcons[p.type];
          return (
            <button
              key={p.id}
              onClick={() => openProblem(p)}
              className="card group p-5 text-left transition-all hover:shadow-glow hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-bamboo-950">{p.title}</h3>
                    <p className="font-tamil text-xs text-bamboo-600">{p.tamilTitle}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`chip ${difficultyColors[p.difficulty]}`}>{p.difficulty}</span>
                  <span className="text-xs text-ink-400">{typeLabels[p.type]}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-600 line-clamp-2">{p.prompt}</p>
              <div className="mt-3">
                <span className="chip bg-bamboo-50 text-bamboo-700 border border-bamboo-100">{p.category}</span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-ink-500">No problems match these filters. Try a different combination.</p>
        </div>
      )}
    </div>
  );
}
