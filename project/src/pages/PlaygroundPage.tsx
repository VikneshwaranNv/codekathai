import { ArrowLeft, Play, Send, Terminal, Lightbulb, CheckCircle2, XCircle, Code2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { playgroundProblems, type PlaygroundProblem } from '@/data/playground';
import { simulateCProgram, checkSolution } from '@/lib/cSimulator';
import type { Page } from '@/components/Navbar';

interface PlaygroundPageProps {
  onNavigate: (page: Page) => void;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-bamboo-100 text-bamboo-700',
  medium: 'bg-golden-100 text-golden-700',
  hard: 'bg-rose-100 text-rose-700',
};

export default function PlaygroundPage({ onNavigate }: PlaygroundPageProps) {
  const [selected, setSelected] = useState<PlaygroundProblem | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');
  const [showHints, setShowHints] = useState(false);
  const [hintIdx, setHintIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [testResults, setTestResults] = useState<{ input: string; expected: string; actual: string; passed: boolean }[]>([]);

  const openProblem = (p: PlaygroundProblem) => {
    setSelected(p);
    setCode(p.starterCode);
    setOutput('');
    setRunStatus('idle');
    setShowHints(false);
    setHintIdx(0);
    setShowSolution(false);
    setTestResults([]);
  };

  const runCode = () => {
    if (!selected) return;
    setRunStatus('running');
    const result = simulateCProgram(code, selected.testCases[0]?.input);
    setOutput(result.error ? result.error : result.output);
    setRunStatus(result.error ? 'failed' : 'idle');
  };

  const submitCode = () => {
    if (!selected) return;
    setRunStatus('running');
    const result = checkSolution(code, selected.testCases);
    setTestResults(result.results);
    const allPassed = result.passed;
    setRunStatus(allPassed ? 'passed' : 'failed');
    const failed = result.results.find((r) => !r.passed);
    if (failed) {
      setOutput(`Test failed!\nInput: ${failed.input}\nExpected: ${failed.expected}\nGot: ${failed.actual}`);
    } else {
      setOutput(`All ${result.results.length} test cases passed!`);
    }
  };

  if (!selected) {
    return (
      <div className="container-page py-10">
        <button onClick={() => onNavigate('dashboard')} className="btn-ghost mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </button>

        <div className="mb-8">
          <span className="eyebrow">Coding Playground</span>
          <h1 className="section-title mt-2">Code & Run</h1>
          <p className="mt-3 max-w-2xl text-ink-600">
            Pick a problem, write your solution in the code editor, run it against test cases, and submit to check all tests.
            Like LeetCode — but with Tamil storytelling.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {playgroundProblems.map((p) => (
            <button
              key={p.id}
              onClick={() => openProblem(p)}
              className="card group p-5 text-left transition-all hover:shadow-glow hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                    <Code2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-bamboo-950">{p.title}</h3>
                    <p className="font-tamil text-xs text-bamboo-600">{p.tamilTitle}</p>
                  </div>
                </div>
                <span className={`chip ${difficultyColors[p.difficulty]}`}>{p.difficulty}</span>
              </div>

              <p className="mt-3 text-sm text-ink-600">{p.description}</p>

              <div className="mt-4 flex items-center gap-2">
                <span className="chip bg-bamboo-50 text-bamboo-700 border border-bamboo-100">{p.category}</span>
                <span className="chip bg-bamboo-50 text-bamboo-600">{p.testCases.length} tests</span>
              </div>

              <div className="mt-4 flex items-center gap-1.5 font-semibold text-bamboo-700 group-hover:gap-2.5 transition-all text-sm">
                Solve now <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-6">
      <button onClick={() => setSelected(null)} className="btn-ghost mb-4 text-sm">
        <ArrowLeft className="h-4 w-4" /> All Problems
      </button>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Panel: Question */}
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-bamboo-950">{selected.title}</h2>
              <span className={`chip ${difficultyColors[selected.difficulty]}`}>{selected.difficulty}</span>
            </div>
            <p className="font-tamil text-sm text-bamboo-600">{selected.tamilTitle}</p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm leading-relaxed text-ink-700">{selected.description}</p>
                <p className="mt-1 font-tamil text-sm leading-relaxed text-ink-500">{selected.tamilDescription}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Examples</p>
                {selected.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl bg-bamboo-50 p-3 text-sm">
                    <p className="text-ink-700"><span className="font-semibold">Input:</span> {ex.input}</p>
                    <p className="text-ink-700"><span className="font-semibold">Output:</span> {ex.output}</p>
                    <p className="mt-1 text-xs text-ink-500">{ex.explanation}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Constraints</p>
                <ul className="space-y-1">
                  {selected.constraints.map((c, i) => (
                    <li key={i} className="text-sm text-ink-600">• {c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Complexity</p>
                <div className="flex gap-3">
                  <span className="chip bg-bamboo-100 text-bamboo-700">Time: {selected.timeComplexity}</span>
                  <span className="chip bg-bamboo-100 text-bamboo-700">Space: {selected.spaceComplexity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hints */}
          <div className="card p-5">
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
                {selected.hints.slice(0, hintIdx + 1).map((h, i) => (
                  <div key={i} className="rounded-xl bg-golden-50 p-3 text-sm text-ink-700">
                    <span className="font-semibold text-golden-700">Hint {i + 1}:</span> {h}
                  </div>
                ))}

                <div className="flex gap-2">
                  {hintIdx < selected.hints.length - 1 && (
                    <button onClick={() => setHintIdx((i) => i + 1)} className="btn-ghost text-xs">
                      Next Hint
                    </button>
                  )}
                  {hintIdx >= selected.hints.length - 1 && !showSolution && (
                    <button onClick={() => setShowSolution(true)} className="btn-gold text-xs">
                      Reveal Solution
                    </button>
                  )}
                </div>

                {showSolution && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Solution</p>
                    <pre className="overflow-x-auto rounded-xl bg-ink-900 p-4 text-sm text-bamboo-100 font-mono">
                      {selected.solution}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="space-y-4">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-bamboo-100 bg-bamboo-50 px-4 py-2.5">
              <span className="flex items-center gap-2 text-sm font-semibold text-bamboo-800">
                <Code2 className="h-4 w-4" /> Code Editor
              </span>
              <span className="text-xs text-ink-400">C Language</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-80 w-full resize-none bg-ink-900 p-4 font-mono text-sm text-bamboo-100 outline-none"
              spellCheck={false}
            />
            <div className="flex items-center gap-2 border-t border-bamboo-100 bg-bamboo-50 px-4 py-3">
              <button onClick={runCode} className="btn-primary text-sm">
                <Play className="h-4 w-4" /> Run
              </button>
              <button onClick={submitCode} className="btn-gold text-sm">
                <Send className="h-4 w-4" /> Submit
              </button>
              <button onClick={() => { setCode(selected.starterCode); setOutput(''); setRunStatus('idle'); setTestResults([]); }} className="btn-ghost text-sm">
                Reset
              </button>
            </div>
          </div>

          {/* Console Output */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-bamboo-100 bg-bamboo-50 px-4 py-2.5">
              <span className="flex items-center gap-2 text-sm font-semibold text-bamboo-800">
                <Terminal className="h-4 w-4" /> Console
              </span>
              {runStatus === 'passed' && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-bamboo-600">
                  <CheckCircle2 className="h-4 w-4" /> All Tests Passed
                </span>
              )}
              {runStatus === 'failed' && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                  <XCircle className="h-4 w-4" /> Tests Failed
                </span>
              )}
            </div>
            <div className="min-h-[120px] bg-ink-900 p-4">
              {output ? (
                <pre className="whitespace-pre-wrap font-mono text-sm text-bamboo-100">{output}</pre>
              ) : (
                <p className="font-mono text-sm text-ink-500">Click "Run" to see output...</p>
              )}
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="card p-4">
              <p className="mb-3 text-sm font-semibold text-bamboo-800">Test Results</p>
              <div className="space-y-2">
                {testResults.map((r, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-xl p-3 ${r.passed ? 'bg-bamboo-50' : 'bg-rose-50'}`}>
                    {r.passed ? (
                      <CheckCircle2 className="h-5 w-5 text-bamboo-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600" />
                    )}
                    <div className="flex-1 text-sm">
                      <span className="font-medium text-ink-700">Test {i + 1}</span>
                      {!r.passed && (
                        <p className="text-xs text-rose-600">Expected: {r.expected} | Got: {r.actual}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
