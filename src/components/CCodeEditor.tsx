import { useRef } from 'react';

interface CCodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export default function CCodeEditor({
  value,
  onChange,
  placeholder = '// Write C code here...',
  rows = 16,
  className = '',
}: CCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

  return (
    <div className={`flex rounded-xl border border-bamboo-800 bg-ink-950 font-mono text-xs overflow-hidden shadow-inner ${className}`}>
      {/* Line Numbers Sidebar */}
      <div className="select-none bg-ink-900 px-3 py-4 text-right font-mono text-[11px] text-ink-500 border-r border-ink-800 leading-6">
        {lineNumbers.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>

      {/* Editor Main Input Area */}
      <div className="relative flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          spellCheck={false}
          className="w-full h-full bg-transparent font-mono text-xs leading-6 text-emerald-400 caret-white focus:outline-none resize-none whitespace-pre"
        />
      </div>
    </div>
  );
}
