import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Code2, Eye, Bug, FileCode, Star, Send, Award, Play } from 'lucide-react';
import { useState } from 'react';
import { practiceProblems, type PracticeProblem, type Difficulty, type ProblemType } from '@/data/practice';
import type { Page } from '@/components/Navbar';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import CCodeEditor from '@/components/CCodeEditor';
import InteractiveTerminal from '@/components/InteractiveTerminal';

interface PracticePageProps {
  onNavigate: (page: Page) => void;
}

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-950 dark:text-bamboo-300',
  medium: 'bg-golden-100 text-golden-700 dark:bg-golden-950 dark:text-golden-300',
  hard: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
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
  const [filterDiff, setFilterDiff] = useState<Difficulty | 'all'>('easy'); // Default to easy
  const [active, setActive] = useState<PracticeProblem | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintIdx, setHintIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [debugInput, setDebugInput] = useState('');
  const [debugResult, setDebugResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Compiler state for practice problems
  const [userCode, setUserCode] = useState('');
  const [programInput, setProgramInput] = useState('9');
  const [compilerOutput, setCompilerOutput] = useState('');
  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const filtered = practiceProblems.filter((p) => {
    if (filterDiff !== 'all' && p.difficulty !== filterDiff) return false;
    return true;
  });

  const openProblem = (p: PracticeProblem) => {
    setActive(p);
    setPicked(null);
    setSubmitted(false);
    setShowHints(false);
    setHintIdx(0);
    setShowSolution(false);
    setDebugInput(p.buggyCode ?? '');
    setDebugResult('idle');
    setUserCode(p.code || p.buggyCode || p.solution || '#include <stdio.h>\n\nint main() {\n    int n;\n    printf("Enter number: ");\n    scanf("%d", &n);\n    printf("Output: %d\\n", n);\n    return 0;\n}');
    setProgramInput('9');
    setCompilerOutput('');
    setCompilerError(null);
  };

  const handleRunCompiler = async (overrideInput?: string) => {
    if (!userCode.trim()) return;
    setIsCompiling(true);
    setCompilerError(null);
    setCompilerOutput('Compiling C code with GCC...');

    const activeStdin = overrideInput !== undefined ? overrideInput.trim() : programInput.trim();
    if (overrideInput !== undefined) {
      setProgramInput(overrideInput);
    }

    const result = await compileAndRunCProgram(userCode, activeStdin || '9');
    if (result.error) {
      setCompilerError(result.error);
      setCompilerOutput('');
    } else {
      setCompilerOutput(result.output || 'Program finished with exit code 0.');
      setCompilerError(null);
    }
    setIsCompiling(false);
  };

  const handleSubmitAnswer = () => {
    if (!active || picked === null || submitted) return;
    setSubmitted(true);
  };

  if (active) {
    const Icon = typeIcons[active.type];
    const isCorrect = submitted && picked === active.answerIndex;

    return (
      <div className="container-page py-6">
        <button onClick={() => setActive(null)} className="btn-ghost mb-4 text-sm font-bold">
          <ArrowLeft className="h-4 w-4 inline mr-1" /> All Problems / வினாக்கள் பட்டியல்
        </button>

        <div className="card p-6 border border-bamboo-200 dark:border-bamboo-800 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-950 dark:text-bamboo-300 font-bold">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-bamboo-950 dark:text-white">{active.title}</h2>
                <p className="font-tamil text-xs font-semibold text-bamboo-600 dark:text-bamboo-300">{active.tamilTitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className={`chip font-bold ${difficultyColors[active.difficulty]}`}>{active.difficulty.toUpperCase()}</span>
              <span className="chip bg-bamboo-50 text-bamboo-700 border border-bamboo-100 dark:bg-ink-900 dark:text-bamboo-300 dark:border-bamboo-800 font-bold">{typeLabels[active.type]}</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold leading-relaxed text-ink-900 dark:text-white">{active.prompt}</p>
            {active.tamilPrompt && (
              <p className="mt-1 font-tamil text-xs leading-relaxed text-ink-600 dark:text-ink-300">{active.tamilPrompt}</p>
            )}
          </div>

          {/* Interactive GCC Compiler Panel with In-Terminal Input Prompt */}
          <div className="mt-6 rounded-2xl border border-bamboo-200 bg-ink-950 p-4 shadow-md dark:border-bamboo-800">
            <div className="flex items-center justify-between border-b border-ink-800 pb-3 mb-3">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Code2 className="h-4 w-4" /> ⚡ C GCC Compiler (Edit Code & Type Input directly in Terminal)
              </span>
              <button
                onClick={() => handleRunCompiler()}
                disabled={isCompiling}
                className="btn-primary flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft"
              >
                <Play className="h-3.5 w-3.5 fill-current" /> {isCompiling ? 'Running...' : 'Run Code'}
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Code Editor */}
              <div>
                <CCodeEditor
                  value={userCode}
                  onChange={setUserCode}
                  rows={10}
                  placeholder="// Write or modify C code..."
                />
              </div>

              {/* Interactive Terminal Output */}
              <div>
                <InteractiveTerminal
                  output={compilerOutput}
                  error={compilerError}
                  isRunning={isCompiling}
                  onRun={handleRunCompiler}
                  initialInput={programInput}
                  placeholder="Type number here (e.g. 9) & press Enter..."
                />
              </div>
            </div>
          </div>

          {/* MCQ Options with Submit Answer Button & Green/Red Feedback */}
          {active.options && (
            <div className="mt-5 space-y-3">
              {active.options.map((opt, i) => {
                const isSelected = picked === i;
                let cardStyle =
                  'border-bamboo-200 bg-bamboo-50/50 hover:bg-bamboo-100 text-ink-900 dark:border-bamboo-800 dark:bg-ink-900 dark:text-white';

                if (submitted) {
                  if (i === active.answerIndex) {
                    cardStyle =
                      'border-emerald-600 bg-emerald-500 text-white font-bold shadow-md dark:bg-emerald-600 dark:border-emerald-400';
                  } else if (isSelected && i !== active.answerIndex) {
                    cardStyle =
                      'border-red-600 bg-red-500 text-white font-bold shadow-md dark:bg-red-600 dark:border-red-400';
                  } else {
                    cardStyle =
                      'opacity-40 border-bamboo-100 bg-bamboo-50 dark:border-bamboo-900 dark:bg-ink-950 text-ink-500';
                  }
                } else if (isSelected) {
                  cardStyle =
                    'border-bamboo-600 bg-bamboo-100 text-bamboo-950 font-bold ring-2 ring-bamboo-500 dark:bg-ink-800 dark:text-white';
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (!submitted) setPicked(i);
                    }}
                    disabled={submitted}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-xs font-semibold transition-all ${cardStyle}`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold shadow-sm ${
                          submitted && i === active.answerIndex
                            ? 'bg-white text-emerald-700'
                            : submitted && isSelected
                            ? 'bg-white text-red-700'
                            : 'bg-white text-bamboo-800 dark:bg-ink-800 dark:text-white'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="font-mono">{opt}</span>
                    </span>
                    {submitted && i === active.answerIndex && <CheckCircle2 className="h-5 w-5 text-white" />}
                    {submitted && isSelected && i !== active.answerIndex && <XCircle className="h-5 w-5 text-white" />}
                  </button>
                );
              })}

              {/* Submit Answer Button */}
              {!submitted && (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={picked === null}
                  className="btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 shadow-soft mt-3"
                >
                  <Send className="h-4 w-4" /> Submit Answer / விடையைச் சமர்ப்பி
                </button>
              )}

              {/* Green / Red Feedback Banner */}
              {submitted && (
                <div className="mt-4 space-y-3 animate-fadeIn">
                  {isCorrect ? (
                    <div className="rounded-2xl bg-emerald-500/20 p-4 border border-emerald-500/50 text-emerald-900 dark:text-emerald-200">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /> 🎉 Correct Answer! / சரியான விடை!
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-red-500/20 p-4 border border-red-500/50 text-red-900 dark:text-red-200">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" /> ❌ Incorrect! / தவறான விடை! (Correct: Option {String.fromCharCode(65 + (active.answerIndex ?? 0))})
                      </p>
                    </div>
                  )}

                  {/* Technical Explanation */}
                  <div className="rounded-2xl bg-bamboo-50 p-4 border border-bamboo-200 dark:bg-ink-900 dark:border-bamboo-800">
                    <p className="text-xs font-bold text-bamboo-800 dark:text-bamboo-300 mb-1">
                      💡 Explanation / விளக்கம்:
                    </p>
                    <p className="text-xs leading-relaxed text-ink-800 dark:text-ink-200 whitespace-pre-wrap">
                      {active.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <button onClick={() => onNavigate('dashboard')} className="btn-ghost mb-6 text-xs font-bold">
        <ArrowLeft className="h-4 w-4 inline mr-1" /> Back to Courses
      </button>

      <div className="mb-8">
        <span className="eyebrow">PRACTICE CODING</span>
        <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl mt-2">
          Sharpen Your Skills 🎯
        </h1>
        <p className="mt-2 max-w-2xl text-xs text-ink-600 dark:text-ink-400">
          C Programming Technical Placement & Interview Questions mapped directly for practice with interactive GCC compiler.
        </p>
      </div>

      {/* Special Banner for 100 Technical MCQs */}
      <div className="mb-8 card p-6 bg-gradient-to-r from-bamboo-600 to-bamboo-800 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="chip bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider mb-2 inline-block">
              <Award className="h-3.5 w-3.5 inline mr-1" /> Campus Placement Special
            </span>
            <h2 className="font-display text-xl font-bold">100 Technical C Placement MCQs Bank 🌟</h2>
            <p className="font-tamil text-xs text-white/90 mt-1">
              TCS, Wipro, Infosys, Zoho & Accenture நிறுவனங்களின் 100 முக்கியமான C நிரலாக்க வினாக்கள்!
            </p>
          </div>
          <button
            onClick={() => setFilterDiff('easy')}
            className="btn-primary bg-golden-500 hover:bg-golden-400 text-bamboo-950 text-xs font-bold px-5 py-2.5 shadow-md"
          >
            Show Easy (100 MCQs) 🎯
          </button>
        </div>
      </div>

      {/* Clean Filters Bar */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setFilterDiff('all')}
          className={`chip font-bold ${filterDiff === 'all' ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700 dark:bg-ink-800 dark:text-bamboo-300'}`}
        >
          All Levels
        </button>
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => setFilterDiff(d)}
            className={`chip font-bold ${filterDiff === d ? difficultyColors[d] : 'bg-bamboo-50 text-ink-500 border border-bamboo-100 dark:bg-ink-900 dark:text-ink-400 dark:border-bamboo-800'}`}
          >
            {d} {d === 'easy' ? '(100 MCQs) 🌟' : ''}
          </button>
        ))}
      </div>

      {/* Problems Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((p) => {
          const Icon = typeIcons[p.type];
          return (
            <button
              key={p.id}
              onClick={() => openProblem(p)}
              className="card group p-5 text-left transition-all hover:shadow-lg border border-bamboo-100 dark:border-bamboo-800 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-950 dark:text-bamboo-300 font-bold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-bamboo-950 dark:text-white">{p.title}</h3>
                    <p className="font-tamil text-xs font-semibold text-bamboo-600 dark:text-bamboo-300">{p.tamilTitle}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`chip text-[10px] font-bold ${difficultyColors[p.difficulty]}`}>{p.difficulty}</span>
                  <span className="text-[10px] font-bold text-ink-400">{typeLabels[p.type]}</span>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-2">{p.prompt}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="chip bg-bamboo-50 text-bamboo-700 border border-bamboo-100 text-[10px] font-bold dark:bg-ink-900 dark:text-bamboo-300 dark:border-bamboo-800">{p.category}</span>
                <span className="text-xs font-bold text-bamboo-600 group-hover:translate-x-1 transition-all">Solve Question ➔</span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center border border-bamboo-200 dark:border-bamboo-800">
          <p className="text-xs font-semibold text-ink-500">No problems match these filters. Click "Show Easy (100 MCQs)" to view placement questions.</p>
        </div>
      )}
    </div>
  );
}
