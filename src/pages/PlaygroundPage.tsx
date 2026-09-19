import { useState, useMemo } from 'react';
import { Play, RotateCcw, Code2, Sliders, Bug, FileText } from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import CCodeEditor, { type IdeTheme } from '@/components/CCodeEditor';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import CDebuggerPanel from '@/components/CDebuggerPanel';
import CheatSheetModal from '@/components/CheatSheetModal';
import { parseCExecutionSteps } from '@/lib/cDebuggerEngine';

interface PlaygroundPageProps {
  onNavigate: (page: Page) => void;
}

const PRESETS = [
  {
    name: 'Factorial (scanf)',
    code: `#include <stdio.h>\n\nint main() {\n    int n;\n    unsigned long long fact = 1;\n\n    printf("Enter a number: ");\n    if (scanf("%d", &n) != 1 || n < 0) {\n        printf("Please enter a non-negative integer.\\n");\n        return 1;\n    }\n\n    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }\n\n    printf("Factorial of %d = %llu\\n", n, fact);\n    return 0;\n}`,
    defaultInput: '9',
  },
  {
    name: 'Fibonacci Series (scanf)',
    code: `#include <stdio.h>\n\nint main() {\n    int n;\n    unsigned long long first = 0, second = 1, next;\n\n    printf("Enter the number of terms: ");\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        printf("Please enter a positive integer.\\n");\n        return 1;\n    }\n\n    printf("Fibonacci Series: ");\n    for (int i = 0; i < n; i++) {\n        if (i <= 1) {\n            next = i;\n        } else {\n            next = first + second;\n            first = second;\n            second = next;\n        }\n        printf("%llu ", next);\n    }\n    printf("\\n");\n    return 0;\n}`,
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

  // Flowchart Generator Modal State
  const [showFlowchartModal, setShowFlowchartModal] = useState<boolean>(false);

  // Debugger & Cheat Sheet State
  const [showDebugger, setShowDebugger] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);

  // Compute debug execution steps for active code
  const debugSteps = useMemo(() => {
    return parseCExecutionSteps(code);
  }, [code]);

  const activeDebugStep = debugSteps[activeStepIndex] || debugSteps[0];

  // IDE Studio Customization State
  const [theme, setTheme] = useState<IdeTheme>(() => {
    return (localStorage.getItem('codekathai_ide_theme') as IdeTheme) || 'bamboo';
  });

  const [fontSize, setFontSize] = useState<number>(13);

  const handleThemeChange = (newTheme: IdeTheme) => {
    setTheme(newTheme);
    localStorage.setItem('codekathai_ide_theme', newTheme);
  };

  const handleRun = async (overrideInput?: string) => {
    setIsRunning(true);
    setError(null);
    setOutput('Compiling and running C code...');

    const activeStdin = overrideInput !== undefined ? overrideInput.trim() : programInput.trim();
    if (overrideInput !== undefined) {
      setProgramInput(overrideInput);
    }

    // Run code through GCC compiler engine
    const result = await compileAndRunCProgram(code, activeStdin || '9');

    if (result.error) {
      setError(result.error);
      setOutput('');
    } else {
      setOutput(result.output || 'Program finished with exit code 0.');
      setError(null);
    }
    setIsRunning(false);
  };

  const handleClear = () => {
    setCode('');
    setProgramInput('9');
    setOutput('');
    setError(null);
  };

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Programiz-like Interactive C Compiler</span>
          <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
            C Code Playground ⚡
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-400">
            எந்த C நிரலையும் எழுதி, Terminal-ல் நேரடியாக எண்களை (எ.கா. 9) உள்ளிட்டு Run பட்டனை அழுத்தவும்.
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
              <Code2 className="h-4 w-4 text-emerald-500" /> main.c Editor
            </span>

            {/* Editor Action Controls: Font Size, Debugger, Cheat Sheet, Clear, Run */}
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="hidden sm:flex items-center gap-1 bg-ink-800/80 px-2 py-0.5 rounded-full text-[10px] text-ink-300">
                <Sliders className="h-3 w-3 text-emerald-400" />
                <span>Font:</span>
                {[12, 14, 16].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      fontSize === sz ? 'bg-emerald-600 text-white' : 'hover:text-white'
                    }`}
                  >
                    {sz}px
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowDebugger(!showDebugger)}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                  showDebugger
                    ? 'bg-[#00ff66]/20 text-[#00ff66] border-[#00ff66]/50 shadow-glow-sm'
                    : 'bg-ink-800 text-emerald-300 border-emerald-500/30 hover:bg-ink-700'
                }`}
                title="Step-by-Step Visual Execution Debugger"
              >
                <Bug className="h-3.5 w-3.5" />
                {showDebugger ? 'Hide Debugger' : '🔍 Step Debugger (படி படியாக)'}
              </button>

              <button
                onClick={() => setShowCheatSheet(true)}
                className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-golden-500/20 text-golden-300 border border-golden-500/40 hover:bg-golden-500/30 transition-all cursor-pointer"
                title="Generate Printable C Reference Cheat Sheet"
              >
                <FileText className="h-3.5 w-3.5" /> 📄 Cheat Sheet PDF
              </button>

              <button
                onClick={handleClear}
                className="btn-ghost flex items-center gap-1 px-2.5 py-1 text-xs text-ink-600 dark:text-ink-300 hover:text-rose-500 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </button>

              <button
                onClick={() => handleRun()}
                disabled={isRunning}
                className="btn-primary flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-emerald-600 to-bamboo-600 hover:from-emerald-500 hover:to-bamboo-500 text-white shadow-soft cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" /> {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>

          <div className="p-3 bg-ink-950 flex-1">
            <CCodeEditor
              value={code}
              onChange={setCode}
              rows={17}
              placeholder="// Write your C code here..."
              fontSize={fontSize}
              highlightedStepLineIndex={showDebugger && activeDebugStep ? activeDebugStep.lineNumber : null}
            />
          </div>
        </div>

        {/* RIGHT: INTERACTIVE TERMINAL OUTPUT */}
        <div className="flex flex-col gap-6">
          <InteractiveTerminal
            output={output}
            error={error}
            isRunning={isRunning}
          />

          {/* STEP-BY-STEP VISUAL DEBUGGER PANEL */}
          {showDebugger && (
            <CDebuggerPanel
              steps={debugSteps}
              activeStepIndex={activeStepIndex}
              onStepChange={setActiveStepIndex}
              onClose={() => setShowDebugger(false)}
            />
          )}
        </div>
      </div>

      {/* PRINTABLE BILINGUAL CHEAT SHEET MODAL */}
      <CheatSheetModal
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
        title="Interactive C Playground Reference"
        tamilTitle="சி நிரலாக்க குறிப்பேடு"
        conceptSummaryEn="Master C variable declarations, data types, logic conditions, and loops through real-time in-browser execution."
        conceptSummaryTa="நிரலாக்க மாறிகள், தரவு வகைகள், மற்றும் கட்டுப்பாட்டு அமைப்புகளை நேரடி சோதனைகள் வழியாக கற்றுக்கொள்ளுங்கள்."
        codeSnippet={code}
        challengeTitle="Try Modifying Code & Running Tests"
        challengeDescription="Change variable values or add printf statements to observe real-time terminal output and memory updates."
      />
    </div>
  );
}
