import { useState, useMemo } from 'react';
import { Sparkles, Play, RotateCcw, Code2, Workflow, Copy, Check, ChevronRight, ChevronLeft, Sliders, Zap } from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import CCodeEditor, { type IdeTheme } from '@/components/CCodeEditor';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import { parseCToFlowchart, type FlowchartNode, type FlowchartNodeType } from '@/lib/cFlowchartParser';
import { playButtonClickSound } from '@/lib/soundEffects';

interface FlowchartPageProps {
  onNavigate: (page: Page) => void;
}

const FLOWCHART_PRESETS = [
  {
    name: 'Factorial of Number',
    code: `#include <stdio.h>\n\nint main() {\n    int n = 5;\n    unsigned long long fact = 1;\n\n    printf("Enter number: ");\n    if (n < 0) {\n        printf("Invalid input\\n");\n        return 1;\n    }\n\n    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }\n\n    printf("Factorial of %d = %llu\\n", n, fact);\n    return 0;\n}`,
    input: '5',
  },
  {
    name: 'Even or Odd Check',
    code: `#include <stdio.h>\n\nint main() {\n    int num = 14;\n    printf("Enter an integer: ");\n\n    if (num % 2 == 0) {\n        printf("%d is Even.\\n", num);\n    } else {\n        printf("%d is Odd.\\n", num);\n    }\n    return 0;\n}`,
    input: '14',
  },
  {
    name: 'Largest of 3 Numbers',
    code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 25, c = 15;\n\n    if (a >= b && a >= c) {\n        printf("%d is the largest.\\n", a);\n    } else if (b >= a && b >= c) {\n        printf("%d is the largest.\\n", b);\n    } else {\n        printf("%d is the largest.\\n", c);\n    }\n    return 0;\n}`,
    input: '',
  },
  {
    name: 'Fibonacci Series Loop',
    code: `#include <stdio.h>\n\nint main() {\n    int n = 7;\n    int t1 = 0, t2 = 1, next;\n\n    printf("Fibonacci Series: ");\n    for (int i = 1; i <= n; i++) {\n        printf("%d ", t1);\n        next = t1 + t2;\n        t1 = t2;\n        t2 = next;\n    }\n    printf("\\n");\n    return 0;\n}`,
    input: '7',
  },
];

export default function FlowchartPage({ onNavigate }: FlowchartPageProps) {
  const [code, setCode] = useState<string>(FLOWCHART_PRESETS[0].code);
  const [programInput, setProgramInput] = useState<string>(FLOWCHART_PRESETS[0].input);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Flowchart Generation Trigger State
  const [activeCodeForFlowchart, setActiveCodeForFlowchart] = useState<string | null>(FLOWCHART_PRESETS[0].code);
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);

  // Selected Node Index for Step-by-Step Walkthrough
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // IDE Customization State
  const [theme, setTheme] = useState<IdeTheme>(() => {
    return (localStorage.getItem('codekathai_ide_theme') as IdeTheme) || 'bamboo';
  });

  const [fontSize, setFontSize] = useState<number>(13);

  // Parse active C code into Flowchart AST Graph
  const graph = useMemo(() => {
    return parseCToFlowchart(activeCodeForFlowchart || code);
  }, [activeCodeForFlowchart, code]);

  const activeNode: FlowchartNode | undefined = graph.nodes[selectedNodeIndex] || graph.nodes[0];

  const handleThemeChange = (newTheme: IdeTheme) => {
    setTheme(newTheme);
    localStorage.setItem('codekathai_ide_theme', newTheme);
  };

  // Trigger Flowchart Generation & Compile C Code
  const handleGenerateAndRun = async () => {
    playButtonClickSound();
    setActiveCodeForFlowchart(code);
    setSelectedNodeIndex(0); // RESET TO STEP 1 STARTING!
    setHasGenerated(true);

    setIsRunning(true);
    setError(null);
    setOutput('Compiling and running C program with GCC...');

    const result = await compileAndRunCProgram(code, programInput || '5');

    if (result.error) {
      setError(result.error);
      setOutput('');
    } else {
      setOutput(result.output || 'Program finished with exit code 0.');
      setError(null);
    }
    setIsRunning(false);
  };

  const handleCodeChange = (newVal: string) => {
    setCode(newVal);
    // Mark as ungenerated until user clicks "Generate Flowchart & Run Code"
    setHasGenerated(false);
  };

  const handleCopyFlowchartText = () => {
    playButtonClickSound();
    const textLines = graph.nodes
      .map((n, i) => `${i + 1}. [${n.type.toUpperCase()}] ${n.label}\n   - Tamil: ${n.tamilExplanation}\n   - Code: ${n.codeSnippet}`)
      .join('\n\n');
    navigator.clipboard.writeText(`=== C CODE FLOWCHART DIAGRAM ===\n\n${textLines}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNodeColor = (type: FlowchartNodeType) => {
    switch (type) {
      case 'start':
        return { bg: 'bg-emerald-600', border: 'border-emerald-400', shape: 'rounded-full px-6 py-2.5 shadow-lg shadow-emerald-950/50 font-bold text-white' };
      case 'end':
        return { bg: 'bg-rose-600', border: 'border-rose-400', shape: 'rounded-full px-6 py-2.5 shadow-lg shadow-rose-950/50 font-bold text-white' };
      case 'input':
      case 'output':
        return { bg: 'bg-sky-600', border: 'border-sky-400', shape: '-skew-x-6 rounded-xl px-5 py-3 shadow-md font-semibold text-white' };
      case 'decision':
        return { bg: 'bg-gradient-to-r from-purple-600 to-pink-600', border: 'border-purple-400', shape: 'rotate-45 rounded-2xl p-4 shadow-xl shadow-purple-950/50 flex items-center justify-center text-white' };
      case 'loop':
        return { bg: 'bg-indigo-600', border: 'border-indigo-400', shape: 'rounded-2xl px-5 py-3 shadow-md font-semibold text-white border-2 border-dashed' };
      case 'process':
      default:
        return { bg: 'bg-amber-600', border: 'border-amber-400', shape: 'rounded-xl px-5 py-3 shadow-md font-medium text-white' };
    }
  };

  return (
    <div className="container-page py-6 sm:py-10 space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow flex items-center gap-1.5">
            <Workflow className="h-4 w-4 text-purple-500" /> Interactive C Logic Diagrammer
          </span>
          <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl flex items-center gap-2">
            C Code ➔ Flowchart Studio 📊
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-300">
            எந்த C நிரலையும் ஒட்டி (Paste), "🚀 Generate Flowchart & Run Code" பட்டனை அழுத்தவும். தர்க்க வரைபடம் Step 1-ல் இருந்து தொடங்கும்!
          </p>
        </div>

        {/* C CODE PRESET BUTTONS */}
        <div className="flex flex-wrap gap-2">
          {FLOWCHART_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                playButtonClickSound();
                setCode(p.code);
                setProgramInput(p.input);
                setActiveCodeForFlowchart(p.code);
                setSelectedNodeIndex(0); // START AT STEP 1
                setHasGenerated(true);
                setOutput('');
                setError(null);
              }}
              className="rounded-full bg-bamboo-100 px-3.5 py-1.5 text-xs font-bold text-bamboo-800 hover:bg-bamboo-200 dark:bg-ink-800 dark:text-bamboo-300 transition-transform active:scale-95 cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* TWO COLUMN STUDIO LAYOUT */}
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        
        {/* LEFT COLUMN: C CODE EDITOR & GCC COMPILER */}
        <div className="space-y-6">
          <div className="card flex flex-col overflow-hidden border border-bamboo-200 dark:border-bamboo-800 shadow-xl">
            {/* Editor Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-bamboo-100 bg-bamboo-50 px-4 py-3 dark:border-bamboo-800 dark:bg-ink-900 gap-2">
              <span className="flex items-center gap-2 text-xs font-bold text-bamboo-900 dark:text-bamboo-200">
                <Code2 className="h-4 w-4 text-emerald-500" /> main.c Source Code
              </span>

              <div className="flex items-center gap-2">
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
                  onClick={() => {
                    playButtonClickSound();
                    setCode('');
                    setOutput('');
                    setError(null);
                    setHasGenerated(false);
                  }}
                  className="btn-ghost flex items-center gap-1 px-2.5 py-1 text-xs text-ink-600 dark:text-ink-300 hover:text-rose-500 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear
                </button>
              </div>
            </div>

            {/* C Editor */}
            <div className="p-3 bg-ink-950">
              <CCodeEditor
                value={code}
                onChange={handleCodeChange}
                rows={17}
                placeholder="// Type or paste any C code here..."
                fontSize={fontSize}
              />
            </div>

            {/* MAIN FLOWCHART & COMPILE TRIGGER BUTTON */}
            <div className="p-4 bg-ink-900 border-t border-bamboo-800 flex justify-center">
              <button
                onClick={handleGenerateAndRun}
                disabled={isRunning}
                className="w-full py-3.5 px-6 rounded-2xl text-sm font-extrabold bg-gradient-to-r from-emerald-500 via-bamboo-600 to-golden-500 hover:from-emerald-400 hover:to-golden-400 text-white shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Zap className="h-5 w-5 text-amber-300 animate-bounce" />
                <span>{isRunning ? 'Compiling & Generating Flowchart...' : '🚀 GENERATE FLOWCHART & RUN CODE'}</span>
              </button>
            </div>
          </div>

          {/* COMPILER OUTPUT TERMINAL */}
          <InteractiveTerminal
            output={output}
            error={error}
            isRunning={isRunning}
          />
        </div>

        {/* RIGHT COLUMN: INTERACTIVE VISUAL FLOWCHART DIAGRAM CANVAS */}
        <div className="card p-6 bg-gradient-to-b from-ink-950 via-ink-900 to-bamboo-950 text-white border border-bamboo-700/80 shadow-2xl rounded-3xl space-y-6">
          
          {/* FLOWCHART HEADER & COPY BUTTON */}
          <div className="flex flex-wrap items-center justify-between border-b border-bamboo-800/80 pb-4 gap-2">
            <div>
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-golden-400" /> Interactive Flowchart Diagram
              </h2>
              <p className="font-tamil text-xs text-bamboo-300">
                நிரலின் ஒவ்வொரு படிகளையும் (Steps) கிளிக் செய்து தர்க்கத்தினைப் புரிந்து கொள்ளுங்கள்.
              </p>
            </div>

            <button
              onClick={handleCopyFlowchartText}
              className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-200" /> : <Copy className="h-3.5 w-3.5 text-white" />}
              {copied ? 'Copied!' : 'Copy Logic'}
            </button>
          </div>

          {!hasGenerated ? (
            /* UNGENERATED PLACEHOLDER STATE */
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-5 border-2 border-dashed border-bamboo-700/60 rounded-3xl bg-black/40 min-h-[420px]">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 grid place-items-center animate-bounce">
                <Sparkles className="h-8 w-8 text-golden-400" />
              </div>
              <h3 className="font-display text-lg font-bold text-white max-w-sm">
                👈 Paste or Write Your C Code & Click "🚀 GENERATE FLOWCHART & RUN CODE"
              </h3>
              <p className="font-tamil text-xs text-bamboo-300 max-w-md leading-relaxed">
                உங்கள் C நிரலை இடது பக்க பெட்டியில் எழுதி அல்லது ஒட்டி (Paste), "Generate Flowchart" பட்டனை அழுத்தவும். தர்க்க வரைபடம் Step 1-ல் இருந்து தொடங்கும்!
              </p>
              <button
                onClick={handleGenerateAndRun}
                className="py-3 px-6 text-xs font-extrabold bg-gradient-to-r from-emerald-500 via-bamboo-600 to-golden-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                🚀 Generate Flowchart Now
              </button>
            </div>
          ) : (
            /* GENERATED FLOWCHART VIEW */
            <>
              {/* FLOWCHART SYMBOL SHAPE GUIDE */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-800/60 bg-black/40 px-4 py-2.5 rounded-2xl text-[11px] select-none">
                <span className="font-bold text-bamboo-400">Shapes:</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-300 font-bold">Start/End</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-4 -skew-x-6 bg-sky-500" />
                    <span className="text-sky-300 font-bold">In/Out</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-4 rounded bg-amber-500" />
                    <span className="text-amber-300 font-bold">Process</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rotate-45 bg-purple-500" />
                    <span className="text-purple-300 font-bold">Decision</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-4 rounded border border-dashed border-indigo-400 bg-indigo-600" />
                    <span className="text-indigo-300 font-bold">Loop</span>
                  </span>
                </div>
              </div>

              {/* STEP CONTROLLER BAR - HIGH CONTRAST BUTTONS */}
              <div className="flex items-center justify-between bg-black/60 p-3 rounded-2xl border border-bamboo-800/80 shadow-md">
                <button
                  onClick={() => {
                    playButtonClickSound();
                    setSelectedNodeIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={selectedNodeIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    selectedNodeIndex === 0
                      ? 'bg-ink-800 text-ink-500 border border-ink-700 cursor-not-allowed opacity-50'
                      : 'bg-bamboo-700 hover:bg-bamboo-600 text-white border border-bamboo-500 shadow-md cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" /> Previous Step
                </button>

                <span className="font-mono text-xs font-bold text-golden-400 bg-ink-950 px-3 py-1 rounded-full border border-golden-500/30">
                  Step {selectedNodeIndex + 1} of {graph.nodes.length}
                </span>

                <button
                  onClick={() => {
                    playButtonClickSound();
                    setSelectedNodeIndex((prev) => Math.min(graph.nodes.length - 1, prev + 1));
                  }}
                  disabled={selectedNodeIndex === graph.nodes.length - 1}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    selectedNodeIndex === graph.nodes.length - 1
                      ? 'bg-ink-800 text-ink-500 border border-ink-700 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-emerald-600 to-bamboo-600 hover:from-emerald-500 hover:to-bamboo-500 text-white border border-emerald-400 shadow-lg cursor-pointer'
                  }`}
                >
                  Next Step <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* ACTIVE SELECTED NODE DETAILS DISPLAY */}
              {activeNode && (
                <div className="rounded-2xl bg-gradient-to-r from-bamboo-950/90 via-ink-900 to-emerald-950/90 p-5 border border-bamboo-700/80 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="chip bg-bamboo-600 text-white font-mono font-bold text-xs">
                      Step #{selectedNodeIndex + 1}: {activeNode.type.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-bamboo-400 font-bold">
                      {activeNode.lineIndex ? `Line ${activeNode.lineIndex}` : 'Scope Start'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-golden-300">
                      {activeNode.label}
                    </h3>
                    <p className="font-tamil text-xs text-bamboo-200 leading-relaxed">
                      {activeNode.tamilExplanation}
                    </p>
                    <p className="text-xs text-ink-300 font-sans italic">
                      En: {activeNode.englishExplanation}
                    </p>
                  </div>

                  {/* Code Snippet */}
                  <div className="bg-black/80 rounded-xl p-3 border border-bamboo-900 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>{activeNode.codeSnippet}</code>
                  </div>
                </div>
              )}

              {/* VISUAL FLOWCHART GRAPH TREE */}
              <div className="flex flex-col items-center justify-center space-y-4 py-4 relative max-h-[500px] overflow-y-auto pr-2">
                {graph.nodes.map((node, index) => {
                  const isSelected = index === selectedNodeIndex;
                  const styleConfig = getNodeColor(node.type);

                  return (
                    <div key={node.id} className="flex flex-col items-center relative group">
                      {/* Flow Connection Arrow */}
                      {index > 0 && (
                        <div className="flex flex-col items-center my-2 select-none">
                          <div className="w-0.5 h-6 bg-gradient-to-b from-bamboo-500 to-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 text-xs font-bold font-mono">↓</span>
                        </div>
                      )}

                      {/* Node Container */}
                      <div
                        onClick={() => {
                          playButtonClickSound();
                          setSelectedNodeIndex(index);
                        }}
                        className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? 'ring-4 ring-golden-400 ring-offset-2 ring-offset-ink-950 scale-105 shadow-2xl'
                            : 'opacity-90 hover:opacity-100'
                        }`}
                      >
                        {node.type === 'decision' ? (
                          <div className="relative w-44 h-44 flex items-center justify-center my-2">
                            <div className={`absolute inset-0 ${styleConfig.shape} ${styleConfig.bg} ${styleConfig.border} border-2`} />
                            <div className="relative z-10 text-center p-3 select-none text-white font-bold text-xs leading-tight">
                              <span className="block text-[10px] opacity-80 uppercase tracking-wider mb-1">DECISION</span>
                              {node.label}
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`min-w-[220px] max-w-[340px] text-center select-none text-xs ${styleConfig.shape} ${styleConfig.bg} ${styleConfig.border} border`}
                          >
                            <span className="block text-[9px] opacity-75 uppercase tracking-wider mb-0.5">
                              {node.type}
                            </span>
                            {node.label}
                          </div>
                        )}
                      </div>

                      {/* Branch Labels for Decision & Loop */}
                      {node.type === 'decision' && (
                        <div className="flex justify-between w-64 text-[10px] font-bold font-mono text-golden-300 mt-1 select-none">
                          <span className="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600">✓ YES → Step {index + 2}</span>
                          <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-600">✗ NO → Step {index + 3}</span>
                        </div>
                      )}

                      {node.type === 'loop' && (
                        <div className="flex justify-between w-64 text-[10px] font-bold font-mono text-cyan-300 mt-1 select-none">
                          <span className="bg-indigo-950 px-2 py-0.5 rounded border border-indigo-600">↺ Loop Body</span>
                          <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-600">Exit Loop →</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
