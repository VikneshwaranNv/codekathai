import { useState, type KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, CheckCircle2, XCircle, AlertTriangle, Play } from 'lucide-react';

interface InteractiveTerminalProps {
  output: string;
  error: string | null;
  isRunning: boolean;
  onRun: (inputVal: string) => void;
  initialInput?: string;
  placeholder?: string;
}

export default function InteractiveTerminal({
  output,
  error,
  isRunning,
  onRun,
  initialInput = '9',
  placeholder = 'Type number here (e.g. 9) & press Enter...',
}: InteractiveTerminalProps) {
  const [terminalInput, setTerminalInput] = useState(initialInput);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isRunning) {
      e.preventDefault();
      onRun(terminalInput);
    }
  };

  const handleExecute = () => {
    if (!isRunning) {
      onRun(terminalInput);
    }
  };

  const isSuccess = !error && output && !isRunning;
  const isError = Boolean(error);
  const isWarning = Boolean(error && error.toLowerCase().includes('warning') && !error.toLowerCase().includes('error'));

  return (
    <div className="card flex flex-col overflow-hidden border border-bamboo-200 dark:border-bamboo-800 bg-ink-950 text-white min-h-[340px] shadow-lg">
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <TerminalIcon className="h-4 w-4" /> Terminal Output (Programiz GCC Compiler)
        </span>

        {/* Visual Status Badges */}
        {isSuccess && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="h-3.5 w-3.5" /> Compilation Successful
          </span>
        )}
        {isError && !isWarning && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-[11px] font-bold text-red-400 border border-red-500/40 animate-pulse">
            <XCircle className="h-3.5 w-3.5" /> Compilation Error
          </span>
        )}
        {isWarning && (
          <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400 border border-amber-500/40">
            <AlertTriangle className="h-3.5 w-3.5" /> Compiler Warning
          </span>
        )}
      </div>

      {/* Main Terminal Output Screen */}
      <div className="p-4 flex-1 flex flex-col justify-between font-mono text-xs leading-relaxed overflow-y-auto">
        <div className="whitespace-pre-wrap mb-4">
          {isRunning ? (
            <div className="flex items-center gap-2 text-amber-400 font-bold animate-pulse">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Compiling and executing C code with GCC...
            </div>
          ) : isError ? (
            <div className="space-y-2">
              <div className="rounded-xl bg-red-950/60 p-3 border border-red-800 text-red-300">
                <p className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                  <XCircle className="h-4 w-4" /> Compiler Error Breakdown:
                </p>
                <pre className="whitespace-pre-wrap font-mono text-xs text-red-200">{error}</pre>
              </div>
              <p className="text-[11px] text-ink-400">
                💡 Tip: Check line numbers, semicolon ';' endings, and closing braces {'}'} in your code.
              </p>
            </div>
          ) : output ? (
            <div className="text-emerald-300 font-bold whitespace-pre-wrap">{output}</div>
          ) : (
            <span className="text-ink-600">Click "Run Code" or type an input below and press Enter...</span>
          )}
        </div>

        {/* Interactive Command Prompt Line */}
        <div className="border-t border-ink-800/80 pt-3 mt-2">
          <p className="text-[10px] text-ink-400 font-bold mb-1.5 uppercase tracking-wider flex items-center gap-1">
            <span>⚡ Program Input (stdin): Type number below and hit Enter</span>
          </p>
          <div className="flex items-center gap-2 bg-ink-900/90 rounded-xl p-2 border border-emerald-500/40 focus-within:border-emerald-400 transition-all">
            <span className="text-emerald-400 font-bold select-none pl-1">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent font-mono text-xs font-bold text-emerald-300 outline-none placeholder:text-ink-600"
            />
            <button
              onClick={handleExecute}
              disabled={isRunning}
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition-all disabled:opacity-50 whitespace-nowrap shadow-sm"
              title="Execute with terminal input"
            >
              <Play className="h-3 w-3 fill-current" />
              {isRunning ? 'Running...' : 'Run ↵'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
