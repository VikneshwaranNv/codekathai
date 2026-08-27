import { useState, useMemo } from 'react';
import { X, GitCommit, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Workflow } from 'lucide-react';
import { parseCToFlowchart, type FlowchartNode, type FlowchartNodeType } from '@/lib/cFlowchartParser';
import { playButtonClickSound } from '@/lib/soundEffects';

interface CFlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

export default function CFlowchartModal({ isOpen, onClose, code }: CFlowchartModalProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Parse active C code into Flowchart Graph AST
  const graph = useMemo(() => parseCToFlowchart(code), [code]);
  const activeNode: FlowchartNode | undefined = graph.nodes[selectedNodeIndex] || graph.nodes[0];

  if (!isOpen) return null;

  const handleCopyFlowchartText = () => {
    playButtonClickSound();
    const textLines = graph.nodes.map((n, i) => `${i + 1}. [${n.type.toUpperCase()}] ${n.label}\n   - Ta: ${n.tamilExplanation}\n   - Code: ${n.codeSnippet}`).join('\n\n');
    navigator.clipboard.writeText(`=== C CODE FLOWCHART DIAGRAM ===\n\n${textLines}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNodeColor = (type: FlowchartNodeType) => {
    switch (type) {
      case 'start':
        return { bg: 'bg-emerald-600', border: 'border-emerald-400', text: 'text-white', shape: 'rounded-full px-6 py-2.5 shadow-lg shadow-emerald-900/40 font-bold' };
      case 'end':
        return { bg: 'bg-rose-600', border: 'border-rose-400', text: 'text-white', shape: 'rounded-full px-6 py-2.5 shadow-lg shadow-rose-900/40 font-bold' };
      case 'input':
      case 'output':
        return { bg: 'bg-sky-600', border: 'border-sky-400', text: 'text-white', shape: '-skew-x-6 rounded-xl px-5 py-3 shadow-md font-semibold' };
      case 'decision':
        return { bg: 'bg-gradient-to-r from-purple-600 to-pink-600', border: 'border-purple-400', text: 'text-white', shape: 'rotate-45 rounded-2xl p-4 shadow-xl shadow-purple-950/50 flex items-center justify-center' };
      case 'loop':
        return { bg: 'bg-indigo-600', border: 'border-indigo-400', text: 'text-white', shape: 'rounded-2xl px-5 py-3 shadow-md font-semibold border-2 border-dashed' };
      case 'process':
      default:
        return { bg: 'bg-amber-600', border: 'border-amber-400', text: 'text-white', shape: 'rounded-xl px-5 py-3 shadow-md font-medium' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="card relative w-full max-w-4xl bg-gradient-to-b from-ink-950 via-ink-900 to-bamboo-950 text-white border border-bamboo-700/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="flex flex-wrap items-center justify-between border-b border-bamboo-800/80 bg-ink-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-bamboo-500 to-emerald-600 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                📊 C Code ➔ Flowchart Diagram Generator
              </h2>
              <p className="font-tamil text-xs text-bamboo-300">
                எந்த C நிரலையும் உடனடி தர்க்க வரைபடமாக (Flowchart) மாற்றி பயிலுங்கள்.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFlowchartText}
              className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-200" /> : <Copy className="h-3.5 w-3.5 text-white" />}
              {copied ? 'Copied!' : 'Copy Logic'}
            </button>
            <button
              onClick={() => {
                playButtonClickSound();
                onClose();
              }}
              className="rounded-full p-2 text-stone-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* FLOWCHART SYMBOL LEGEND BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-800/60 bg-black/40 px-6 py-2.5 text-[11px] select-none">
          <span className="font-bold text-bamboo-400 flex items-center gap-1">
            <GitCommit className="h-3.5 w-3.5" /> Shape Guide:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-6 rounded-full bg-emerald-500" />
              <span className="text-emerald-300 font-bold">Start / End</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-5 -skew-x-6 bg-sky-500" />
              <span className="text-sky-300 font-bold">Input / Output</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-5 rounded bg-amber-500" />
              <span className="text-amber-300 font-bold">Process</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rotate-45 bg-purple-500" />
              <span className="text-purple-300 font-bold">Decision</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-5 rounded border border-dashed border-indigo-400 bg-indigo-600" />
              <span className="text-indigo-300 font-bold">Loop</span>
            </span>
          </div>
        </div>

        {/* MAIN FLOWCHART DIAGRAM ARENA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP CONTROLLER BAR */}
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

          {/* ACTIVE SELECTED NODE DETAILS BOX */}
          {activeNode && (
            <div className="rounded-2xl bg-gradient-to-r from-bamboo-950/90 via-ink-900 to-emerald-950/90 p-5 border border-bamboo-700/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="chip bg-bamboo-600 text-white font-mono font-bold text-xs">
                  Node #{selectedNodeIndex + 1}: {activeNode.type.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-bamboo-400 font-bold">
                  {activeNode.lineIndex ? `Line ${activeNode.lineIndex}` : 'Function Scope'}
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

          {/* VISUAL FLOWCHART DIAGRAM TREE */}
          <div className="flex flex-col items-center justify-center space-y-4 py-4 relative">
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
                        className={`min-w-[200px] max-w-[320px] text-center select-none text-xs ${styleConfig.shape} ${styleConfig.bg} ${styleConfig.border} border`}
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
        </div>

        {/* MODAL FOOTER */}
        <div className="border-t border-bamboo-800/80 bg-ink-900/90 px-6 py-3 text-center text-xs text-bamboo-300 font-tamil flex items-center justify-between">
          <span>💡 குறிப்பு: எந்த பெட்டியையும் (Node) கிளிக் செய்து அதன் தர்க்க விளக்கத்தைப் பெறலாம்.</span>
          <button
            onClick={() => {
              playButtonClickSound();
              onClose();
            }}
            className="btn-primary py-1.5 px-5 text-xs font-bold bg-bamboo-600 text-white rounded-xl"
          >
            Close Flowchart
          </button>
        </div>
      </div>
    </div>
  );
}
