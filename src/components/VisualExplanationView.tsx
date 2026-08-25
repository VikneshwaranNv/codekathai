import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  GitFork,
  Box,
  Layers,
  HelpCircle,
  BookOpen,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import type { VisualExplanationData, VisualStep } from '@/lib/visualGenerator';

interface VisualExplanationViewProps {
  data: VisualExplanationData;
  onSampleInputChange?: (newInput: string) => void;
  onHighlightLine?: (lineIdx: number) => void;
}

export default function VisualExplanationView({
  data,
  onSampleInputChange,
  onHighlightLine,
}: VisualExplanationViewProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sampleInputVal, setSampleInputVal] = useState(data.sampleInput || '20');
  const [langMode, setLangMode] = useState<'english' | 'tamil'>('tamil');

  // Auto-play timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && data.steps.length > 0) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= data.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, data.steps.length]);

  // Notify parent on step change for code editor line highlighting
  useEffect(() => {
    if (data.steps[currentStepIdx] && onHighlightLine) {
      onHighlightLine(data.steps[currentStepIdx].highlightLineIndex);
    }
  }, [currentStepIdx, data.steps, onHighlightLine]);

  if (!data.isValidCode) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-900 dark:bg-red-950/40">
        <div className="flex items-center gap-2 font-bold text-red-700 dark:text-red-300">
          <HelpCircle className="h-5 w-5 text-red-600" /> Invalid or Incomplete C Code
        </div>
        <p className="mt-2 text-xs leading-relaxed text-red-800 dark:text-red-200">
          {data.syntaxErrorMessage || 'Please enter valid C code containing int main() to generate visual explanation.'}
        </p>
      </div>
    );
  }

  const activeStep: VisualStep | undefined = data.steps[currentStepIdx];

  const handleRunNewInput = () => {
    if (onSampleInputChange) {
      onSampleInputChange(sampleInputVal);
    }
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Concept Detected Banner & Language Selector */}
      <div className="card p-4 bg-gradient-to-r from-bamboo-600 to-bamboo-800 text-white shadow-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="chip bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider mb-1 inline-block">
            <Sparkles className="h-3.5 w-3.5 inline mr-1 text-golden-400" /> AI Visual Concept Detected
          </span>
          <h3 className="font-display text-lg font-bold">
            {langMode === 'tamil' ? data.tamilConcept : data.concept}
          </h3>
        </div>
        <div className="flex gap-1 bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => setLangMode('english')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              langMode === 'english' ? 'bg-white text-bamboo-950 shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLangMode('tamil')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              langMode === 'tamil' ? 'bg-golden-500 text-bamboo-950 shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            தமிழ் (Tamil)
          </button>
        </div>
      </div>

      {/* 2. Interactive Program Flow Pipeline */}
      <div className="card p-4 border border-bamboo-200 dark:border-bamboo-800 bg-bamboo-50/50 dark:bg-ink-900">
        <p className="text-[11px] font-bold text-bamboo-800 dark:text-bamboo-300 uppercase tracking-wider mb-3">
          🗺️ Program Execution Flow Chart:
        </p>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          {data.programFlow.map((node, i) => {
            const isCurrent = activeStep && node.toLowerCase().includes(activeStep.type);
            return (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 scale-105'
                      : i === 0 || i === data.programFlow.length - 1
                      ? 'bg-bamboo-200 text-bamboo-900 dark:bg-ink-800 dark:text-bamboo-200'
                      : 'bg-white text-bamboo-950 dark:bg-ink-950 dark:text-white border border-bamboo-100 dark:border-bamboo-800'
                  }`}
                >
                  {node}
                </span>
                {i < data.programFlow.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-bamboo-400 dark:text-bamboo-600 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Sample Input Box (Try Input) */}
      <div className="card p-4 border border-bamboo-200 dark:border-bamboo-800 bg-white dark:bg-ink-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-golden-500" />
          <span className="text-xs font-bold text-bamboo-950 dark:text-white">
            {langMode === 'tamil' ? 'மாதிரி உள்ளீடு (Sample Input):' : 'Try Sample Input:'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={sampleInputVal}
            onChange={(e) => setSampleInputVal(e.target.value)}
            className="w-24 rounded-xl border border-bamboo-300 bg-bamboo-50 px-3 py-1 text-xs font-mono font-bold text-bamboo-950 focus:border-bamboo-600 focus:outline-none dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
          />
          <button
            onClick={handleRunNewInput}
            className="btn-primary text-xs px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-sm flex items-center gap-1"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {langMode === 'tamil' ? 'இயக்கி பார் 🚀' : 'Run Visual Explanation'}
          </button>
        </div>
      </div>

      {/* 4. Code Visualization Engine & Step Controls */}
      {activeStep && (
        <div className="card p-5 border border-bamboo-200 dark:border-bamboo-800 bg-white dark:bg-ink-950 shadow-lg space-y-4">
          {/* Step Header & Player Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bamboo-100 dark:border-bamboo-800 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Step {activeStep.stepNumber} of {data.steps.length}
              </span>
              <h4 className="font-display text-base font-bold text-bamboo-950 dark:text-white">
                {langMode === 'tamil' ? activeStep.tamilTitle : activeStep.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStepIdx((prev) => Math.max(prev - 1, 0))}
                disabled={currentStepIdx === 0}
                className="btn-ghost p-1.5 text-xs text-ink-600 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsPlaying((v) => !v)}
                className="btn-primary text-xs px-3 py-1 bg-bamboo-600 hover:bg-bamboo-700 text-white font-bold flex items-center gap-1"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                {isPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={() => setCurrentStepIdx((prev) => Math.min(prev + 1, data.steps.length - 1))}
                disabled={currentStepIdx === data.steps.length - 1}
                className="btn-ghost p-1.5 text-xs text-ink-600 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Current Code Line Highlight */}
          <div className="rounded-xl bg-ink-900 p-3 text-xs font-mono text-emerald-400 border border-ink-800 flex items-center justify-between">
            <span>{activeStep.codeLine}</span>
            <span className="text-[10px] font-sans text-ink-400 font-bold">Line {activeStep.highlightLineIndex}</span>
          </div>

          {/* Animated Value Pipeline: e.g. 20 -> age -> age >= 18 -> TRUE -> Adult */}
          <div className="rounded-2xl bg-bamboo-50/80 dark:bg-ink-900 p-4 border border-bamboo-200 dark:border-bamboo-800">
            <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2">
              💡 Visual Value Movement Pipeline:
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-mono">
              <span className="rounded-lg bg-golden-100 text-golden-800 px-3 py-1 border border-golden-300 dark:bg-golden-950 dark:text-golden-300">
                Input: {sampleInputVal}
              </span>
              <ArrowRight className="h-4 w-4 text-bamboo-600 animate-pulse" />
              <span className="rounded-lg bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300">
                {activeStep.visualLabel}
              </span>
              <ArrowRight className="h-4 w-4 text-bamboo-600 animate-pulse" />
              <span className="rounded-lg bg-bamboo-600 text-white px-3 py-1 shadow-sm">
                Result: {activeStep.value}
              </span>
            </div>
          </div>

          {/* DYNAMIC DIAGRAMS */}

          {/* 1. DECISION DIAMOND DIAGRAM (If-Else) */}
          {activeStep.decisionBranch && (
            <div className="rounded-2xl bg-white dark:bg-ink-950 p-5 border border-bamboo-200 dark:border-bamboo-800 text-center space-y-4">
              <p className="text-xs font-bold text-bamboo-950 dark:text-white uppercase tracking-wider">
                ❖ Decision Diamond Flow (நிபந்தனை வைர வரைபடம்)
              </p>

              {/* Diamond Node */}
              <div className="inline-block relative p-4 rounded-2xl bg-golden-50 border-2 border-golden-400 text-golden-950 shadow-md font-mono text-xs font-bold dark:bg-golden-950 dark:text-golden-200 dark:border-golden-600">
                <GitFork className="h-5 w-5 mx-auto mb-1 text-golden-600" />
                Condition: {activeStep.decisionBranch.conditionText}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {/* YES BRANCH */}
                <div
                  className={`rounded-2xl p-4 border transition-all ${
                    activeStep.decisionBranch.evaluatedResult
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold scale-105'
                      : 'bg-bamboo-50 border-bamboo-200 opacity-40 dark:bg-ink-900 dark:border-bamboo-800 text-ink-500'
                  }`}
                >
                  <p className="text-xs font-bold mb-1">↙ YES (உண்மை - True)</p>
                  <p className="text-xs font-mono">{activeStep.decisionBranch.yesOutput}</p>
                  {activeStep.decisionBranch.evaluatedResult && (
                    <span className="chip bg-white text-emerald-800 font-bold text-[10px] mt-2 inline-block">
                      ✓ Executed Path
                    </span>
                  )}
                </div>

                {/* NO BRANCH */}
                <div
                  className={`rounded-2xl p-4 border transition-all ${
                    !activeStep.decisionBranch.evaluatedResult
                      ? 'bg-red-500 text-white border-red-600 shadow-md font-bold scale-105'
                      : 'bg-bamboo-50 border-bamboo-200 opacity-40 dark:bg-ink-900 dark:border-bamboo-800 text-ink-500'
                  }`}
                >
                  <p className="text-xs font-bold mb-1">NO ↘ (பொய் - False)</p>
                  <p className="text-xs font-mono">{activeStep.decisionBranch.noOutput}</p>
                  {!activeStep.decisionBranch.evaluatedResult && (
                    <span className="chip bg-white text-red-800 font-bold text-[10px] mt-2 inline-block">
                      ✓ Executed Path
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. MEMORY STORAGE BOX DIAGRAM (Variables) */}
          {activeStep.memoryBox && (
            <div className="rounded-2xl bg-white dark:bg-ink-950 p-4 border border-bamboo-200 dark:border-bamboo-800 space-y-3">
              <p className="text-xs font-bold text-bamboo-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Box className="h-4 w-4 text-emerald-600" /> RAM Memory Box (நினைவகப் பெட்டி)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl bg-bamboo-50 dark:bg-ink-900 p-3 border border-bamboo-200 dark:border-bamboo-800">
                  <span className="text-[10px] text-ink-400 font-bold uppercase block">Variable Name</span>
                  <span className="font-mono text-xs font-bold text-bamboo-900 dark:text-bamboo-200">{activeStep.memoryBox.varName}</span>
                </div>
                <div className="rounded-xl bg-bamboo-50 dark:bg-ink-900 p-3 border border-bamboo-200 dark:border-bamboo-800">
                  <span className="text-[10px] text-ink-400 font-bold uppercase block">Data Type</span>
                  <span className="font-mono text-xs font-bold text-bamboo-900 dark:text-bamboo-200">{activeStep.memoryBox.varType}</span>
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/60 p-3 border border-emerald-300 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">Stored Value</span>
                  <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">{activeStep.memoryBox.value}</span>
                </div>
                <div className="rounded-xl bg-bamboo-50 dark:bg-ink-900 p-3 border border-bamboo-200 dark:border-bamboo-800">
                  <span className="text-[10px] text-ink-400 font-bold uppercase block">RAM Address</span>
                  <span className="font-mono text-xs font-bold text-bamboo-900 dark:text-bamboo-200">{activeStep.memoryBox.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. ARRAY CONTIGUOUS MEMORY CELLS DIAGRAM */}
          {activeStep.arrayCells && (
            <div className="rounded-2xl bg-white dark:bg-ink-950 p-4 border border-bamboo-200 dark:border-bamboo-800 space-y-3">
              <p className="text-xs font-bold text-bamboo-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-emerald-600" /> Array Memory Sequence Cells
              </p>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                {activeStep.arrayCells.map((cell) => (
                  <div key={cell.index} className="rounded-xl bg-bamboo-50 dark:bg-ink-900 p-3 border border-bamboo-300 dark:border-bamboo-700">
                    <span className="text-[10px] text-ink-400 font-bold block mb-1">Index [{cell.index}]</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cell.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Real-Life Analogy Section */}
      <div className="card p-5 border border-golden-200 dark:border-golden-900 bg-golden-50/50 dark:bg-golden-950/20 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-golden-600" />
          <h4 className="font-display text-base font-bold text-bamboo-950 dark:text-white">
            {langMode === 'tamil' ? data.realLifeAnalogy.tamilTitle : data.realLifeAnalogy.title}
          </h4>
        </div>

        <p className="text-xs leading-relaxed text-ink-800 dark:text-ink-200 font-medium">
          {langMode === 'tamil' ? data.realLifeAnalogy.tamilStory : data.realLifeAnalogy.story}
        </p>

        {/* Action to C Keyword Mapping Table */}
        <div className="overflow-x-auto rounded-xl border border-golden-200 dark:border-golden-800 bg-white dark:bg-ink-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-golden-100/70 dark:bg-golden-950 text-golden-950 dark:text-golden-200 font-bold">
              <tr>
                <th className="p-3">Real-Life Action (நிஜ உலக செயல்)</th>
                <th className="p-3">C Keyword (சி சொல்)</th>
                <th className="p-3">Concept Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-golden-100 dark:divide-golden-900 font-medium">
              {data.realLifeAnalogy.mappings.map((m, i) => (
                <tr key={i} className="hover:bg-golden-50/50 dark:hover:bg-ink-900">
                  <td className="p-3 font-semibold text-bamboo-950 dark:text-white">{m.action}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{m.cKeyword}</td>
                  <td className="p-3 text-ink-600 dark:text-ink-300">
                    {langMode === 'tamil' ? m.tamilDescription : m.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
