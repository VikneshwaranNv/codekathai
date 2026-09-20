import { useRef, useState, type UIEvent, type KeyboardEvent } from 'react';
import { Coffee, Code2, Globe } from 'lucide-react';

export type IdeTheme = 'bamboo' | 'matrix' | 'cyberpunk' | 'dracula' | 'sepia';

export interface ThemeConfig {
  id: IdeTheme;
  name: string;
  icon: string;
  bg: string;
  lineBg: string;
  text: string;
  caret: string;
  keywordColor: string;
  dataTypeColor: string;
  stringColor: string;
}

export const IDE_THEMES: ThemeConfig[] = [
  {
    id: 'bamboo',
    name: '🎋 Bamboo Minimal',
    icon: '🎋',
    bg: 'bg-ink-950',
    lineBg: 'bg-ink-900/60 border-ink-800 text-ink-500',
    text: 'text-gray-100',
    caret: 'caret-emerald-400',
    keywordColor: 'text-pink-400',
    dataTypeColor: 'text-sky-400',
    stringColor: 'text-emerald-400',
  },
  {
    id: 'matrix',
    name: '📟 Matrix Hacker',
    icon: '📟',
    bg: 'bg-[#050e05]',
    lineBg: 'bg-[#020702] border-[#0a200a] text-[#00aa44]',
    text: 'text-[#00ff66]',
    caret: 'caret-[#00ff66]',
    keywordColor: 'text-[#00f0ff]',
    dataTypeColor: 'text-[#00ff66]',
    stringColor: 'text-[#ffea00]',
  },
  {
    id: 'cyberpunk',
    name: '🌆 Cyberpunk Neon',
    icon: '🌆',
    bg: 'bg-[#0d0221]',
    lineBg: 'bg-[#080117] border-[#2a0845] text-[#7b2cbf]',
    text: 'text-[#e2f1ff]',
    caret: 'caret-[#ff007f]',
    keywordColor: 'text-[#ff007f]',
    dataTypeColor: 'text-[#00f0ff]',
    stringColor: 'text-[#00ff99]',
  },
  {
    id: 'dracula',
    name: '🧛 Dracula Midnight',
    icon: '🧛',
    bg: 'bg-[#1e1e2e]',
    lineBg: 'bg-[#181825] border-[#313244] text-[#6c7086]',
    text: 'text-[#cdd6f4]',
    caret: 'caret-[#cba6f7]',
    keywordColor: 'text-[#f38ba8]',
    dataTypeColor: 'text-[#cba6f7]',
    stringColor: 'text-[#a6e3a1]',
  },
  {
    id: 'sepia',
    name: '📜 Tamil Sepia',
    icon: '📜',
    bg: 'bg-[#fdf6e3]',
    lineBg: 'bg-[#eee8d5] border-[#d33682]/20 text-[#93a1a1]',
    text: 'text-[#433422]',
    caret: 'caret-[#b58900]',
    keywordColor: 'text-[#d33682]',
    dataTypeColor: 'text-[#268bd2]',
    stringColor: 'text-[#2aa198]',
  },
];

interface CCodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  errorLineIndex?: number | null;
  highlightedStepLineIndex?: number | null;
  theme?: IdeTheme;
  onThemeChange?: (theme: IdeTheme) => void;
  typingSoundEnabled?: boolean;
  onToggleTypingSound?: () => void;
  fontSize?: number;
  language?: 'c' | 'java';
  onLanguageChange?: (lang: 'c' | 'java') => void;
  filename?: string;
}

/**
 * High-contrast Syntax Highlighter for C & Java code
 */
function highlightSyntax(code: string): string {
  if (!code) return '';

  const escapeHtml = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = code.split('\n');

  const highlightedLines = lines.map((line) => {
    const lineText = line;
    let resultHtml = '';
    let i = 0;

    while (i < lineText.length) {
      // 1. Single-line Comment: //
      if (lineText.slice(i, i + 2) === '//') {
        const commentText = lineText.slice(i);
        resultHtml += `<span class="text-slate-400 italic font-normal">${escapeHtml(commentText)}</span>`;
        break;
      }

      // 2. Preprocessor directive: #include, #define
      if (lineText[i] === '#') {
        let prepEnd = i;
        while (prepEnd < lineText.length && /[a-zA-Z0-9_#]/.test(lineText[prepEnd])) {
          prepEnd++;
        }
        const directive = lineText.slice(i, prepEnd);
        resultHtml += `<span class="text-purple-400 font-bold">${escapeHtml(directive)}</span>`;
        i = prepEnd;

        // Header file after #include: <stdio.h> or "header.h"
        const remaining = lineText.slice(i);
        const headerMatch = remaining.match(/^\s*(&lt;|<)[^>]*(&gt;|>)|^\s*"[^"]*"/);
        if (headerMatch) {
          const matchedHeader = headerMatch[0];
          resultHtml += `<span class="text-teal-300 font-semibold">${escapeHtml(matchedHeader)}</span>`;
          i += matchedHeader.length;
        }
        continue;
      }

      // 3. String Literal: "..."
      if (lineText[i] === '"') {
        let endIdx = i + 1;
        while (endIdx < lineText.length && (lineText[endIdx] !== '"' || lineText[endIdx - 1] === '\\')) {
          endIdx++;
        }
        if (endIdx < lineText.length) endIdx++; // include closing quote
        const strLit = lineText.slice(i, endIdx);
        resultHtml += `<span class="text-emerald-400 font-semibold">${escapeHtml(strLit)}</span>`;
        i = endIdx;
        continue;
      }

      // 4. Character Literal: '...'
      if (lineText[i] === "'") {
        let endIdx = i + 1;
        while (endIdx < lineText.length && (lineText[endIdx] !== "'" || lineText[endIdx - 1] === '\\')) {
          endIdx++;
        }
        if (endIdx < lineText.length) endIdx++;
        const charLit = lineText.slice(i, endIdx);
        resultHtml += `<span class="text-emerald-400 font-semibold">${escapeHtml(charLit)}</span>`;
        i = endIdx;
        continue;
      }

      // 5. Numbers (Integer / Float)
      if (/\d/.test(lineText[i]) && (i === 0 || !/[a-zA-Z_]/.test(lineText[i - 1]))) {
        let numEnd = i;
        while (numEnd < lineText.length && /[\d.fF]/.test(lineText[numEnd])) {
          numEnd++;
        }
        const numLit = lineText.slice(i, numEnd);
        resultHtml += `<span class="text-orange-400 font-bold">${escapeHtml(numLit)}</span>`;
        i = numEnd;
        continue;
      }

      // 6. Keywords, Data Types, Functions, Identifiers
      if (/[a-zA-Z_]/.test(lineText[i])) {
        let wordEnd = i;
        while (wordEnd < lineText.length && /[a-zA-Z0-9_]/.test(lineText[wordEnd])) {
          wordEnd++;
        }
        const word = lineText.slice(i, wordEnd);
        const restOfLine = lineText.slice(wordEnd).trim();
        const isFunctionCall = restOfLine.startsWith('(');

        // C & Java Data Types
        const dataTypes = new Set([
          'int',
          'float',
          'double',
          'char',
          'void',
          'long',
          'short',
          'boolean',
          'byte',
          'String',
          'unsigned',
          'signed',
          'size_t',
          'struct',
          'union',
          'enum',
          'bool',
          'int8_t',
          'int16_t',
          'int32_t',
          'int64_t',
          'uint8_t',
          'uint16_t',
          'uint32_t',
          'uint64_t',
        ]);
        
        // C & Java Keywords
        const keywords = new Set([
          'public',
          'private',
          'protected',
          'class',
          'static',
          'new',
          'import',
          'package',
          'extends',
          'implements',
          'final',
          'abstract',
          'interface',
          'this',
          'super',
          'try',
          'catch',
          'finally',
          'throw',
          'throws',
          'instanceof',
          'if',
          'else',
          'for',
          'while',
          'do',
          'return',
          'switch',
          'case',
          'break',
          'continue',
          'typedef',
          'sizeof',
          'goto',
          'const',
          'extern',
          'volatile',
        ]);

        // C & Java Standard Functions & Classes
        const stdFunctions = new Set([
          'printf',
          'scanf',
          'main',
          'System',
          'out',
          'println',
          'print',
          'Scanner',
          'nextInt',
          'nextLine',
          'substring',
          'length',
          'charAt',
          'equals',
          'malloc',
          'free',
          'exit',
          'push',
          'pop',
          'peek',
          'enqueue',
          'dequeue',
        ]);

        if (dataTypes.has(word)) {
          // Data Types -> Sky Blue
          resultHtml += `<span class="text-sky-400 font-extrabold">${escapeHtml(word)}</span>`;
        } else if (keywords.has(word)) {
          // Keywords & Return -> Vivid Pink
          resultHtml += `<span class="text-pink-400 font-bold">${escapeHtml(word)}</span>`;
        } else if (stdFunctions.has(word) || isFunctionCall) {
          // Functions -> Amber Yellow
          resultHtml += `<span class="text-amber-300 font-bold">${escapeHtml(word)}</span>`;
        } else {
          // Variables / Identifiers -> Bright Soft White
          resultHtml += `<span class="text-gray-100 font-medium">${escapeHtml(word)}</span>`;
        }

        i = wordEnd;
        continue;
      }

      // 7. Operators & Punctuation
      const char = lineText[i];
      if (/[+\-*/%=&|!<>?:;.,(){}[\]]/.test(char)) {
        let opClass = 'text-gray-300';
        if (/[+\-*/%=<>&|!]/.test(char)) {
          // Operators -> Rose Red
          opClass = 'text-rose-400 font-bold';
        } else if (/[(){}[\]]/.test(char)) {
          // Brackets -> Warm Yellow
          opClass = 'text-yellow-300 font-bold';
        } else if (/[;,.]/.test(char)) {
          // Punctuation -> Slate
          opClass = 'text-slate-300';
        }

        resultHtml += `<span class="${opClass}">${escapeHtml(char)}</span>`;
        i++;
        continue;
      }

      // Plain whitespace
      resultHtml += escapeHtml(char);
      i++;
    }

    return resultHtml;
  });

  return highlightedLines.join('\n');
}

export default function CCodeEditor({
  value,
  onChange,
  placeholder = '// Write code here...',
  rows = 16,
  className = '',
  errorLineIndex = null,
  highlightedStepLineIndex = null,
  fontSize = 12,
  language = 'c',
  onLanguageChange,
  filename,
}: CCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const [activeLine, setActiveLine] = useState<number>(1);

  const activeThemeConfig = IDE_THEMES.find((t) => t.id === 'matrix') || IDE_THEMES[1];

  const displayFilename = filename || (language === 'java' ? 'Main.java' : 'main.c');

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 15);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Synchronize scrolling between textarea and overlay
  const handleScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (overlayRef.current) {
      overlayRef.current.scrollTop = scrollTop;
      overlayRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  // Handle Tab Indentation and IDE Auto-Closing Pairs
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    // 1. Tab Indentation (4 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
      return;
    }

    // Brackets & Quotes Pairs Mapping
    const pairMap: Record<string, string> = {
      '{': '}',
      '(': ')',
      '[': ']',
      '"': '"',
      "'": "'",
    };

    // 2. Auto-close opening brackets & quotes: {, (, [, ", '
    if (pairMap[e.key]) {
      const closing = pairMap[e.key];

      if (start !== end) {
        e.preventDefault();
        const selectedText = value.substring(start, end);
        const newValue = value.substring(0, start) + e.key + selectedText + closing + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          target.selectionStart = start + 1;
          target.selectionEnd = end + 1;
        }, 0);
        return;
      }

      if ((e.key === '"' || e.key === "'") && value[start] === e.key) {
        e.preventDefault();
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 1;
        }, 0);
        return;
      }

      e.preventDefault();
      const newValue = value.substring(0, start) + e.key + closing + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
      return;
    }

    // 3. Skip over closing bracket/quote if already right in front of cursor
    const closingChars = new Set(['}', ')', ']', '"', "'"]);
    if (closingChars.has(e.key) && value[start] === e.key) {
      e.preventDefault();
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
      return;
    }

    // 4. Smart Backspace: Delete matching empty pair
    if (e.key === 'Backspace' && start === end && start > 0) {
      const charBefore = value[start - 1];
      const charAfter = value[start];
      if (pairMap[charBefore] && pairMap[charBefore] === charAfter) {
        e.preventDefault();
        const newValue = value.substring(0, start - 1) + value.substring(start + 1);
        onChange(newValue);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start - 1;
        }, 0);
        return;
      }
    }
  };

  const handleSelect = (e: UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const cursorPos = target.selectionStart;
    const currentLine = value.substring(0, cursorPos).split('\n').length;
    setActiveLine(currentLine);
  };

  const highlightedHtml = highlightSyntax(value);

  return (
    <div
      className={`flex flex-col rounded-2xl border border-bamboo-800 ${activeThemeConfig.bg} font-mono text-xs overflow-hidden shadow-2xl transition-colors duration-500 ${className}`}
    >
      {/* IDE Header with Filename Tab & Language Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0a200a] bg-[#020702] px-4 py-2 text-[11px] select-none">
        {/* Filename & IDE Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#00ff66] flex items-center gap-1.5 bg-[#051505] px-3 py-1 rounded-full border border-[#00ff66]/30 shadow-glow-sm">
            {language === 'java' ? <Coffee className="h-3.5 w-3.5 text-golden-400" /> : <Code2 className="h-3.5 w-3.5 text-emerald-400" />}
            <span>{displayFilename}</span>
          </span>
        </div>

        {/* Interactive Compiler Language Selector Dropdown */}
        {onLanguageChange && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Globe className="h-3 w-3 text-emerald-400" /> Language:
            </span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as 'c' | 'java')}
              className="bg-[#0b1c0b] border border-[#00ff66]/40 text-[#00ff66] rounded-lg px-2.5 py-1 text-xs font-bold font-mono focus:outline-none focus:ring-1 focus:ring-[#00ff66] cursor-pointer"
            >
              <option value="java">☕ Java (Main.java)</option>
              <option value="c">⚡ C (main.c)</option>
            </select>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 overflow-hidden min-h-[280px]">
        {/* Line Numbers Sidebar */}
        <div
          ref={lineNumbersRef}
          className={`select-none ${activeThemeConfig.lineBg} px-3 py-4 text-right font-mono text-[11px] leading-6 overflow-hidden min-w-[40px]`}
        >
          {lineNumbers.map((num) => {
            const isActive = num === activeLine;
            const isError = errorLineIndex === num;
            const isStep = highlightedStepLineIndex === num;
            return (
              <div
                key={num}
                className={`px-1 rounded transition-colors ${
                  isError
                    ? 'bg-red-900/80 text-white font-bold animate-pulse'
                    : isStep
                    ? 'bg-[#00ff66]/30 text-[#00ff66] font-bold border-l-2 border-[#00ff66] shadow-glow-sm'
                    : isActive
                    ? 'text-emerald-400 font-bold bg-emerald-500/20'
                    : ''
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Editor Main Container */}
        <div className="relative flex-1 overflow-hidden min-h-[280px]">
          {/* Layer 1: Syntax Highlighting Visual Overlay */}
          <div
            ref={overlayRef}
            aria-hidden="true"
            className={`absolute inset-0 p-4 font-mono text-xs leading-6 pointer-events-none overflow-auto whitespace-pre tab-4 ${activeThemeConfig.text}`}
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: highlightedHtml + '<br/>' }}
          />

          {/* Layer 2: Transparent Input Textarea for native typing & copy/paste */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}
            onKeyUp={handleSelect}
            onClick={handleSelect}
            rows={rows}
            placeholder={placeholder}
            spellCheck={false}
            style={{ fontSize: `${fontSize}px` }}
            className={`absolute inset-0 w-full h-full p-4 bg-transparent font-mono text-xs leading-6 text-transparent ${activeThemeConfig.caret} focus:outline-none resize-none whitespace-pre overflow-auto tab-4 selection:bg-emerald-500/30 selection:text-transparent`}
          />
        </div>
      </div>
    </div>
  );
}
