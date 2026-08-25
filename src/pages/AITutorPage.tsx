import { ArrowLeft, Sparkles, BookOpen, Lightbulb, AlertCircle, Repeat, MessageSquare, Eye } from 'lucide-react';
import { useState } from 'react';
import { explainLineByLine, explainAsTamilStory, generateSimilarQuestion, explainError } from '@/data/aiTutor';
import type { Page } from '@/components/Navbar';
import { generateVisualExplanation, type VisualExplanationData } from '@/lib/visualGenerator';
import VisualExplanationView from '@/components/VisualExplanationView';

interface AITutorPageProps {
  onNavigate: (page: Page) => void;
}

type Mode = 'line-by-line' | 'tamil-story' | 'similar-question' | 'error-explain' | 'visual';

const modes: { id: Mode; label: string; icon: typeof BookOpen; description: string }[] = [
  { id: 'line-by-line', label: 'Explain Line by Line', icon: BookOpen, description: 'Understand each line of your code' },
  { id: 'tamil-story', label: 'Tamil Story Explanation', icon: Sparkles, description: 'Learn through a Tamil story' },
  { id: 'similar-question', label: 'Generate Similar Question', icon: Repeat, description: 'Practice with a new question' },
  { id: 'error-explain', label: 'Explain Compiler Error', icon: AlertCircle, description: 'Understand what went wrong' },
  { id: 'visual', label: 'Visual Explanation', icon: Eye, description: 'See your code as a visual concept' },
];

export default function AITutorPage({ onNavigate }: AITutorPageProps) {
  const [mode, setMode] = useState<Mode>('visual'); // Default to Visual Explanation
  const [code, setCode] = useState(`#include <stdio.h>
int main() {
  int age;
  scanf("%d", &age);

  if (age >= 18)
    printf("Adult");
  else
    printf("Minor");

  return 0;
}`);
  const [errorText, setErrorText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [lineResults, setLineResults] = useState<{ line: string; explanation: string; tamilExplanation: string }[] | null>(null);
  const [visualData, setVisualData] = useState<VisualExplanationData | null>(null);
  const [category, setCategory] = useState('Variables');
  const [sampleInputVal, setSampleInputVal] = useState('20');
  const [highlightedLineIdx, setHighlightedLineIdx] = useState<number | null>(null);

  const run = (inputVal?: string) => {
    setResult(null);
    setLineResults(null);
    setVisualData(null);

    const activeInput = inputVal !== undefined ? inputVal : sampleInputVal;

    if (mode === 'line-by-line') {
      setLineResults(explainLineByLine(code));
    } else if (mode === 'tamil-story') {
      setResult(explainAsTamilStory(code));
    } else if (mode === 'similar-question') {
      const q = generateSimilarQuestion(category);
      setResult(`Question: ${q.question}\n\nTamil: ${q.tamilQuestion}\n\nHint: ${q.hint}`);
    } else if (mode === 'error-explain') {
      const expl = explainError(errorText || 'expected ;');
      setResult(`Explanation: ${expl.explanation}\n\nTamil: ${expl.tamilExplanation}\n\nFix: ${expl.fix}`);
    } else if (mode === 'visual') {
      const v = generateVisualExplanation(code, activeInput);
      setVisualData(v);
    }
  };

  const handleSampleInputChange = (newInput: string) => {
    setSampleInputVal(newInput);
    run(newInput);
  };

  return (
    <div className="container-page py-10">
      <button onClick={() => onNavigate('dashboard')} className="btn-ghost mb-6 text-sm font-bold">
        <ArrowLeft className="h-4 w-4 inline mr-1" /> Back to Courses
      </button>

      <div className="mb-8">
        <span className="eyebrow">AI TUTOR</span>
        <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl mt-2">
          Your Personal Code Guide 🌟
        </h1>
        <p className="mt-2 max-w-2xl text-xs text-ink-600 dark:text-ink-400">
          Get visual explanations, line-by-line breakdowns, Tamil stories, similar practice questions, and compiler error help — all powered by your AI tutor.
        </p>
      </div>

      {/* Mode Selection (5 Options) */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setResult(null);
                setLineResults(null);
                setVisualData(null);
              }}
              className={`card p-4 text-left transition-all ${
                mode === m.id
                  ? 'ring-2 ring-bamboo-500 bg-bamboo-50/50 dark:bg-ink-900 shadow-md font-bold'
                  : 'hover:shadow-card hover:-translate-y-0.5 border border-bamboo-100 dark:border-bamboo-800'
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl font-bold ${
                  mode === m.id ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700 dark:bg-ink-800 dark:text-bamboo-300'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-bold text-bamboo-950 dark:text-white text-xs">{m.label}</p>
              <p className="mt-1 text-[11px] text-ink-500 line-clamp-2">{m.description}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Panel with TOP Explain Button */}
        <div className="card p-5 border border-bamboo-200 dark:border-bamboo-800 shadow-md flex flex-col justify-between">
          <div>
            {/* Header Bar with TOP EXPLAIN BUTTON */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-bamboo-100 dark:border-bamboo-800 pb-3">
              <span className="flex items-center gap-2 text-xs font-bold text-bamboo-900 dark:text-bamboo-200">
                <MessageSquare className="h-4 w-4 text-bamboo-600" />
                {mode === 'error-explain'
                  ? 'Paste Error Message'
                  : mode === 'similar-question'
                  ? 'Choose Category'
                  : 'Paste Your C Code'}
              </span>

              {/* TOP EXPLAIN BUTTON */}
              <button
                onClick={() => run()}
                className="btn-primary flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {mode === 'similar-question' ? 'Generate Question' : 'Explain Code 🚀'}
              </button>
            </div>

            {mode === 'similar-question' ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-bamboo-200 bg-white px-4 py-3 text-xs font-bold text-bamboo-950 outline-none focus:border-bamboo-500 dark:bg-ink-900 dark:text-white dark:border-bamboo-800"
              >
                {['Variables', 'Loops', 'Conditions', 'Arrays', 'Functions'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            ) : mode === 'error-explain' ? (
              <textarea
                value={errorText}
                onChange={(e) => setErrorText(e.target.value)}
                placeholder="Paste your compiler error here, e.g. 'expected ; before token}'"
                className="h-64 w-full resize-none rounded-xl bg-ink-950 p-4 font-mono text-xs text-emerald-400 outline-none border border-ink-800"
                spellCheck={false}
              />
            ) : (
              <div className="rounded-xl bg-ink-950 p-3 border border-ink-800">
                <div className="mb-2 text-[10px] font-mono text-ink-400 flex items-center justify-between">
                  <span>main.c</span>
                  <span className="text-emerald-400 font-bold text-[10px]">C Code Editor</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-64 w-full resize-none bg-transparent font-mono text-xs text-emerald-300 outline-none leading-relaxed"
                  spellCheck={false}
                />
              </div>
            )}
          </div>

          {/* Additional Bottom Explain Button for convenience */}
          <button
            onClick={() => run()}
            className="btn-primary mt-4 w-full py-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft"
          >
            <Sparkles className="h-4 w-4 inline mr-1" />
            {mode === 'similar-question' ? 'Generate Question' : 'Explain Code 🚀'}
          </button>
        </div>

        {/* Output Panel (AI Tutor Response) */}
        <div className="card p-5 border border-bamboo-200 dark:border-bamboo-800 shadow-md">
          <div className="mb-3 flex items-center justify-between border-b border-bamboo-100 dark:border-bamboo-800 pb-3">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-900 dark:text-bamboo-200">
              <Lightbulb className="h-4 w-4 text-golden-500" /> AI Tutor Response
            </span>
            {mode === 'visual' && (
              <span className="text-[10px] font-bold text-ink-400">Interactive Concept Diagram</span>
            )}
          </div>

          {!result && !lineResults && !visualData && (
            <div className="flex h-64 flex-col items-center justify-center text-center p-6">
              <Sparkles className="h-10 w-10 text-golden-500 mb-3 animate-bounce" />
              <p className="text-xs font-bold text-bamboo-950 dark:text-white">
                Select a mode and click "Explain Code 🚀" at the top to get your AI tutor response.
              </p>
              <p className="text-[11px] text-ink-500 mt-1">
                Visual Explanation mode converts your C code into an interactive visual story!
              </p>
            </div>
          )}

          {/* Visual Explanation Mode View */}
          {visualData && (
            <VisualExplanationView
              data={visualData}
              onSampleInputChange={handleSampleInputChange}
              onHighlightLine={(idx) => setHighlightedLineIdx(idx)}
            />
          )}

          {/* Line by Line View */}
          {lineResults && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lineResults.map((lr, i) => (
                <div key={i} className="rounded-xl bg-bamboo-50 p-3 dark:bg-ink-900 border border-bamboo-200 dark:border-bamboo-800">
                  <p className="font-mono text-xs font-bold text-bamboo-900 dark:text-bamboo-200">{lr.line}</p>
                  <p className="mt-1 text-xs text-ink-700 dark:text-ink-300">{lr.explanation}</p>
                  <p className="mt-1 font-tamil text-xs text-ink-500 dark:text-ink-400">{lr.tamilExplanation}</p>
                </div>
              ))}
            </div>
          )}

          {/* Story / Error / Question View */}
          {result && (
            <div className="rounded-xl bg-bamboo-50 p-4 dark:bg-ink-900 border border-bamboo-200 dark:border-bamboo-800">
              <pre className="whitespace-pre-wrap text-xs font-medium text-ink-800 dark:text-ink-200 leading-relaxed">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
