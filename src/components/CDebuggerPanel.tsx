import React, { useState, useEffect } from 'react';
import { type DebugStep } from '@/lib/cDebuggerEngine';

interface CDebuggerPanelProps {
  steps: DebugStep[];
  activeStepIndex: number;
  onStepChange: (index: number) => void;
  onClose?: () => void;
}

export default function CDebuggerPanel({
  steps,
  activeStepIndex,
  onStepChange,
  onClose,
}: CDebuggerPanelProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const totalSteps = steps.length;
  const currentStep = steps[activeStepIndex] || steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        if (activeStepIndex >= totalSteps - 1) {
          setIsPlaying(false);
        } else {
          onStepChange(activeStepIndex + 1);
        }
      }, 1200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, totalSteps, activeStepIndex, onStepChange]);

  if (!totalSteps) {
    return (
      <div className="bg-[#020702] border border-[#00ff66]/30 rounded-2xl p-4 text-[#00ff66] font-mono text-xs">
        <p className="animate-pulse text-amber-400 font-bold">
          ⚠️ Write executable C code to start step-by-step visual debugging!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#020702] border border-[#00ff66]/40 rounded-2xl p-4 font-mono text-xs shadow-2xl text-gray-100 flex flex-col gap-4">
      {/* HEADER & CONTROL BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00ff66]/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-[#00ff66] flex items-center gap-1.5 bg-[#051505] px-3 py-1 rounded-full border border-[#00ff66]/30 shadow-glow-sm">
            🔍 Step Visual Debugger (படி படியாக இயக்கு)
          </span>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
            Step {activeStepIndex + 1} of {totalSteps}
          </span>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(0);
            }}
            disabled={activeStepIndex === 0}
            className="px-2.5 py-1 rounded-lg bg-ink-800 hover:bg-ink-700 disabled:opacity-40 text-gray-200 font-bold transition-all cursor-pointer"
            title="Reset to First Step"
          >
            ⏮ Reset
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(Math.max(0, activeStepIndex - 1));
            }}
            disabled={activeStepIndex === 0}
            className="px-3 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 disabled:opacity-40 text-emerald-300 font-bold transition-all cursor-pointer border border-emerald-500/30"
          >
            ◀ Prev
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(Math.min(totalSteps - 1, activeStepIndex + 1));
            }}
            disabled={activeStepIndex >= totalSteps - 1}
            className="px-4 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-ink-950 font-black hover:brightness-110 disabled:opacity-40 shadow-md transition-all cursor-pointer"
          >
            ▶ Next (அடுத்த படி)
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer border ${
              isPlaying
                ? 'bg-amber-500 text-ink-950 border-amber-400 animate-pulse'
                : 'bg-ink-800 text-amber-300 border-amber-500/30 hover:bg-ink-700'
            }`}
          >
            {isPlaying ? '⏸ Pause' : '⏩ Auto Play'}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-1 rounded-lg bg-red-950/80 text-red-400 hover:bg-red-900 border border-red-500/30 transition-all cursor-pointer ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="w-full bg-ink-950 h-2 rounded-full overflow-hidden border border-ink-800">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full transition-all duration-300"
          style={{ width: `${((activeStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* ACTIVE LINE EXPLANATION & CONTENT */}
      <div className="bg-[#051505] p-3 rounded-xl border border-[#00ff66]/30 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-amber-300 flex items-center gap-1">
            📍 Line {currentStep.lineNumber}:
            <code className="text-[#00ff66] bg-ink-950 px-2 py-0.5 rounded border border-ink-800">
              {currentStep.lineContent}
            </code>
          </span>
          <span className="text-gray-400 italic">Bilingual Explanation</span>
        </div>
        <p className="text-emerald-300 font-medium text-xs leading-relaxed">
          {currentStep.explanationEn}
        </p>
        <p className="text-golden-300 font-medium text-xs leading-relaxed">
          {currentStep.explanationTa}
        </p>
      </div>

      {/* TWO COLUMN DISPLAY: LEFT MEMORY STACK / RIGHT TERMINAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT: MEMORY STACK & VARIABLE LOCKERS */}
        <div className="bg-ink-950 p-3 rounded-xl border border-ink-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-sky-400 border-b border-ink-800 pb-1.5">
            <span className="flex items-center gap-1">🗄️ Memory Stack & Variable Lockers</span>
            <span className="text-[10px] text-gray-400">{currentStep.variables.length} active variables</span>
          </div>

          {currentStep.variables.length === 0 ? (
            <div className="py-6 text-center text-gray-500 italic text-[11px]">
              No active variables declared in memory yet...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
              {currentStep.variables.map((v) => (
                <div
                  key={v.name}
                  className="bg-[#041204] p-2 rounded-lg border border-[#00ff66]/30 flex flex-col gap-1 shadow-md hover:border-[#00ff66] transition-all"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-extrabold text-[#00ff66]">{v.name}</span>
                    <span className="text-amber-400 font-mono text-[9px] bg-ink-900 px-1.5 rounded border border-amber-500/20">
                      {v.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 text-[10px]">Value:</span>
                    <span className="font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {v.value}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono flex items-center justify-between border-t border-ink-800/60 pt-1 mt-0.5">
                    <span>Address:</span>
                    <span className="text-sky-300">{v.address}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: CUMULATIVE TERMINAL OUTPUT */}
        <div className="bg-[#020502] p-3 rounded-xl border border-ink-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 border-b border-ink-800 pb-1.5">
            <span className="flex items-center gap-1">💻 Live Terminal Stream</span>
            <span className="text-[10px] text-emerald-400 font-mono">stdout</span>
          </div>
          <pre className="text-[#00ff66] font-mono text-xs bg-[#010301] p-3 rounded-lg border border-[#00ff66]/20 h-[140px] overflow-y-auto whitespace-pre-wrap select-text">
            {currentStep.stdout || '// Terminal output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
