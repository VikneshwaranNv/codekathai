import { Terminal as TerminalIcon, CheckCircle2, XCircle, AlertTriangle, Play, Check } from 'lucide-react';

interface InteractiveTerminalProps {
  output: string;
  error: string | null;
  isRunning: boolean;
  onRun?: (inputVal: string) => void;
  initialInput?: string;
  placeholder?: string;
  className?: string;
}

export default function InteractiveTerminal({
  output,
  error,
  isRunning,
  className = '',
}: InteractiveTerminalProps) {
  const isSuccess = !error && output && !isRunning;
  const isError = Boolean(error);
  const isWarning = Boolean(error && error.toLowerCase().includes('warning') && !error.toLowerCase().includes('error'));

  return (
    <div className={`card flex flex-col overflow-hidden border border-bamboo-700/80 bg-[#090d16] text-white min-h-[340px] shadow-2xl rounded-2xl ${className}`}>
      {/* Real IDE Compiler Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-ink-800/80 bg-[#0d1322] px-4 py-3 select-none">
        <div className="flex items-center gap-3">
          {/* Mac/Linux Terminal Window Control Dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
            <TerminalIcon className="h-4 w-4 text-emerald-400" />
            <span>GCC Compiler Console (v13.2.0)</span>
          </span>
        </div>

        {/* Real-time Compiler Status Badges */}
        <div className="flex items-center gap-2">
          {isRunning && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/40 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Compiling Code...
            </span>
          )}
          {isSuccess && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Exit Code: 0 (Success)
            </span>
          )}
          {isError && !isWarning && (
            <span className="flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-bold text-rose-300 border border-rose-500/40 animate-pulse">
              <XCircle className="h-3.5 w-3.5 text-rose-400" /> Compilation Error
            </span>
          )}
          {isWarning && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/40">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> Compiler Warning
            </span>
          )}
        </div>
      </div>

      {/* Main Terminal Screen Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between font-mono text-xs leading-relaxed overflow-y-auto bg-[#090d16]">
        <div className="whitespace-pre-wrap">
          {isRunning ? (
            <div className="flex items-center gap-2 text-amber-300 font-bold animate-pulse py-6">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              Compiling C code with GCC compiler engine...
            </div>
          ) : isError ? (
            <div className="space-y-3">
              <div className="rounded-xl bg-rose-950/60 p-4 border border-rose-800/80 text-rose-200">
                <p className="font-bold text-rose-400 mb-2 flex items-center gap-1.5 text-xs">
                  <XCircle className="h-4 w-4" /> GCC Compiler Failure Breakdown:
                </p>
                <pre className="whitespace-pre-wrap font-mono text-xs text-rose-300 leading-relaxed">{error}</pre>
              </div>
              <p className="text-[11px] text-stone-400 italic">
                💡 Tip: Review line numbers, missing semicolons ';', or bracket closures in main.c.
              </p>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="text-[10px] text-stone-500 select-none pb-1 border-b border-stone-800/60">
                $ gcc main.c -o main && ./main
              </div>
              <pre className="text-emerald-300 font-bold whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{output}</pre>
            </div>
          ) : (
            <div className="py-10 text-center text-stone-500 italic space-y-1">
              <p className="text-xs text-stone-400 font-bold font-mono">&gt; Compiler Ready</p>
              <p className="text-[11px] text-stone-500">Click "Run Code" above to compile and execute program output.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
