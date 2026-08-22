import { useState } from 'react';
import { Play, RotateCcw, Code2, Terminal, MessageSquare } from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import CCodeEditor from '@/components/CCodeEditor';

interface PlaygroundPageProps {
  onNavigate: (page: Page) => void;
}

const PRESETS = [
  {
    name: 'Fibonacci Series (scanf)',
    code: `#include <stdio.h>\n\nint main() {\n    int n;\n    // Initialize the first two terms of the sequence\n    unsigned long long first = 0, second = 1, next;\n\n    printf("Enter the number of terms: ");\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        printf("Please enter a positive integer.\\n");\n        return 1;\n    }\n\n    printf("Fibonacci Series: ");\n    for (int i = 0; i < n; i++) {\n        if (i <= 1) {\n            next = i;\n        } else {\n            next = first + second;\n            first = second;\n            second = next;\n        }\n        printf("%llu ", next);\n    }\n    printf("\\n");\n    return 0;\n}`,
    defaultInput: '8',
  },
  {
    name: 'Hello World',
    code: `#include <stdio.h>\n\nint main() {\n    printf("Vanakkam Code Kathai!\\n");\n    printf("Welcome to C Programming in Tamil!\\n");\n    return 0;\n}`,
    defaultInput: '',
  },
  {
    name: 'Variables & Data Types',
    code: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float mark = 94.5;\n    char grade = 'A';\n    \n    printf("Age: %d\\n", age);\n    printf("Mark: %.1f\\n", mark);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}`,
    defaultInput: '',
  },
  {
    name: 'If Else Condition',
    code: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age >= 18) {\n        printf("Status: Eligible to Vote!\\n");\n    } else {\n        printf("Status: Not Eligible\\n");\n    }\n    return 0;\n}`,
    defaultInput: '',
  },
  {
    name: 'For Loop Counter',
    code: `#include <stdio.h>\n\nint main() {\n    printf("Counting from 1 to 5:\\n");\n    for (int i = 1; i <= 5; i++) {\n        printf("Item %d\\n", i);\n    }\n    return 0;\n}`,
    defaultInput: '',
  },
];

export default function PlaygroundPage({ onNavigate }: PlaygroundPageProps) {
  const [code, setCode] = useState(PRESETS[0].code);
  const [programInput, setProgramInput] = useState(PRESETS[0].defaultInput);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('Compiling and running C code...');

    // Run code through C compiler engine
    const result = await compileAndRunCProgram(code, programInput);

    if (result.error) {
      setError(result.error);
      setOutput('');
    } else {
      let finalOutput = result.output;
      if (code.includes('scanf') && !programInput.trim() && !finalOutput.includes('Series')) {
        finalOutput += '\n\n💡 [Tip: Enter your input value in the "Program Input (stdin)" box below and click Run Code!]';
      }
      setOutput(finalOutput || 'Program finished with exit code 0.');
      setError(null);
    }
    setIsRunning(false);
  };

  const handleClear = () => {
    setCode('');
    setProgramInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Programiz-like C Compiler</span>
          <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
            C Code Playground ⚡
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-400">
            எந்த C நிரலையும் எழுதி, தேவைப்பட்டால் எண்களை உள்ளிட்டு Run பட்டனை அழுத்தவும்.
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCode(p.code);
                setProgramInput(p.defaultInput);
                setOutput('');
                setError(null);
              }}
              className="rounded-full bg-bamboo-100 px-3.5 py-1.5 text-xs font-bold text-bamboo-800 hover:bg-bamboo-200 dark:bg-ink-800 dark:text-bamboo-300"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT: C CODE EDITOR */}
        <div className="card flex flex-col overflow-hidden border border-bamboo-200 dark:border-bamboo-800">
          <div className="flex items-center justify-between border-b border-bamboo-100 bg-bamboo-50 px-4 py-3 dark:border-bamboo-800 dark:bg-ink-900">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-900 dark:text-bamboo-200">
              <Code2 className="h-4 w-4" /> main.c Editor
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="btn-ghost flex items-center gap-1 px-3 py-1 text-xs text-ink-600 hover:text-red-600"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="btn-primary flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft"
              >
                <Play className="h-3.5 w-3.5 fill-current" /> {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-ink-950 flex-1">
            <CCodeEditor
              value={code}
              onChange={setCode}
              rows={16}
              placeholder="// Write your C code here..."
            />
          </div>
        </div>

        {/* RIGHT: TERMINAL OUTPUT & STDIN INPUT */}
        <div className="flex flex-col gap-4">
          {/* Terminal Output */}
          <div className="card flex-1 flex flex-col overflow-hidden border border-bamboo-200 dark:border-bamboo-800 bg-ink-950 text-white min-h-[320px]">
            <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-4 py-3">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Terminal className="h-4 w-4" /> Terminal Output
              </span>
              <span className="text-[10px] uppercase font-mono text-ink-400">C GCC Compiler</span>
            </div>

            <div className="p-4 flex-1 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {error ? (
                <span className="text-red-400">{error}</span>
              ) : (
                output || <span className="text-ink-600">Click "Run Code" to compile and view output...</span>
              )}
            </div>
          </div>

          {/* Program Input Box (stdin) */}
          <div className="card p-4 border border-bamboo-200 dark:border-bamboo-800 bg-white dark:bg-ink-900">
            <label className="flex items-center gap-2 text-xs font-bold text-bamboo-950 dark:text-white uppercase tracking-wider mb-2">
              <MessageSquare className="h-4 w-4 text-golden-500" /> Program Input / User Input (stdin)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter inputs for scanf() here (e.g. 8)"
                value={programInput}
                onChange={(e) => setProgramInput(e.target.value)}
                className="w-full rounded-xl border border-bamboo-300 bg-bamboo-50 px-4 py-2 text-xs font-mono font-bold text-bamboo-950 focus:border-bamboo-600 focus:outline-none dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
              />
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="btn-primary text-xs px-4 py-2 whitespace-nowrap bg-bamboo-600 hover:bg-bamboo-700 font-bold"
              >
                {isRunning ? 'Running...' : 'Submit & Run'}
              </button>
            </div>
            <p className="mt-1 text-[11px] text-ink-500">
              Enter numbers for programs using <code className="font-mono text-bamboo-600">scanf()</code> (e.g. enter 8 for Fibonacci series).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
