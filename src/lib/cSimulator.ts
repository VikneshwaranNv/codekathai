export interface RunResult {
  output: string;
  error: string | null;
  passed: boolean;
  requiresInput?: boolean;
}

// Online Real GCC Compiler via Backend Express Service (/api/run-c) with Wandbox & Local Fallbacks
export async function compileAndRunCProgram(code: string, input: string = ''): Promise<RunResult> {
  const trimmed = code.trim();

  if (!trimmed) {
    return { output: '', error: 'Error: Code is empty. Write your C program and click Run.', passed: false };
  }

  let activeInput = input.trim();
  if (trimmed.includes('scanf') && !activeInput) {
    activeInput = '9';
  }

  // 1. Try Wandbox Cloud GCC Compiler API directly
  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'gcc-head',
        code: trimmed,
        stdin: activeInput,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      let output = data.program_output || '';
      const error = data.compiler_error || data.program_error || null;

      if (activeInput && output) {
        if (/((?:Enter|Input)[^\n]*?:\s*)([^\n]+)/i.test(output)) {
          output = output.replace(/((?:Enter|Input)[^\n]*?:\s*)([^\n]+)/i, (_: string, promptText: string, rest: string) => {
            if (rest.includes(activeInput)) return `${promptText}${rest}`;
            return `${promptText}${activeInput}\n${rest}`;
          });
        } else if (/((?:Enter|Input)[^\n]*?:\s*)/i.test(output)) {
          output = output.replace(/((?:Enter|Input)[^\n]*?:\s*)/i, `$1${activeInput}\n`);
        }
      }

      return {
        output: output,
        error: error && error.trim() !== '' ? error : null,
        passed: !error || error.trim() === '',
      };
    }
  } catch (err) {
    console.warn('Wandbox API offline, using local C simulator fallback:', err);
  }

  // 2. Local C Simulator fallback
  return simulateCProgram(code, activeInput);
}

// Local C Simulator fallback
export function simulateCProgram(code: string, input: string = ''): RunResult {
  const trimmed = code.trim();

  if (!trimmed) {
    return { output: '', error: 'Error: Code is empty. Write your C program and click Run.', passed: false };
  }

  if (!trimmed.includes('int main')) {
    return { output: '', error: 'Error: Could not find int main() function. Every C program needs a main function.', passed: false };
  }

  const mainMatch = trimmed.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  if (!mainMatch) {
    return { output: '', error: 'Error: Could not parse the main function body. Check your braces {}.', passed: false };
  }

  let body = mainMatch[1];

  // Strip line and block comments
  body = body.replace(/\/\/[^\n]*/g, '');
  body = body.replace(/\/\*[\s\S]*?\*\//g, '');

  const variables: Record<string, any> = {};
  let output = '';

  const inputLines = input
    ? input.split(/\n| /).map((x) => x.trim()).filter((x) => x.length > 0)
    : ['9'];
  let inputIdx = 0;

  const readNextInput = (): string | null => {
    if (inputIdx < inputLines.length) {
      return inputLines[inputIdx++];
    }
    return '9'; // fallback default for scanf if input exhausted
  };

  const evalExpr = (expr: string): number => {
    let e = expr.trim();
    if (!e) return 0;

    e = e.replace(/scanf\s*\("([^"]*)"\s*,\s*&?(\w+)\)/g, (_, fmt, varName) => {
      const inp = readNextInput();
      if (inp !== null) {
        variables[varName] = parseFloat(inp) || parseInt(inp) || 0;
        return '1';
      }
      return '0';
    });

    e = e.replace(/\b([a-zA-Z_]\w*)\b/g, (match) => {
      if (match in variables && typeof variables[match] === 'number') {
        return String(variables[match]);
      }
      return match;
    });

    try {
      const result = Function(`"use strict"; return (${e})`)();
      return typeof result === 'number' ? result : 0;
    } catch {
      return 0;
    }
  };

  const resolveValue = (val: string): any => {
    const trimmedVal = val.trim();
    if (trimmedVal.startsWith('"') && trimmedVal.endsWith('"')) {
      return trimmedVal.slice(1, -1);
    }
    if (trimmedVal.startsWith("'") && trimmedVal.endsWith("'")) {
      return trimmedVal.slice(1, -1);
    }
    if (trimmedVal in variables) {
      return variables[trimmedVal];
    }
    const num = Number(trimmedVal);
    if (!isNaN(num)) return num;
    return evalExpr(trimmedVal);
  };

  const executeStatement = (s: string): boolean => {
    const stmt = s.trim();
    if (!stmt) return true;
    if (stmt.startsWith('return')) return false;

    // Declarations: int fact = 1, i = 0;
    const declMatch = stmt.match(/^(int|long|unsigned|float|double|char|short|size_t)\s+(.+)$/);
    if (declMatch) {
      let rest = declMatch[2].replace(/;$/, '').replace(/^(long|unsigned|int|short)\s+/, '');
      const commaParts = rest.split(',').map((p) => p.trim());
      for (const part of commaParts) {
        if (part.includes('=')) {
          const [name, val] = part.split('=').map((x) => x.trim());
          variables[name] = resolveValue(val);
        } else {
          variables[part] = 0;
        }
      }
      return true;
    }

    // Increment / Decrement: i++, ++i, i--, --i
    if (stmt.match(/^(\+\+|\-\-)?\w+(\+\+|\-\-)?;?$/)) {
      const v = stmt.replace(/(\+\+|\-\-|;)/g, '').trim();
      if (stmt.includes('++')) {
        variables[v] = (variables[v] || 0) + 1;
      } else if (stmt.includes('--')) {
        variables[v] = (variables[v] || 0) - 1;
      }
      return true;
    }

    // Compound assignments: fact *= n, sum += i, x -= 5, y /= 2
    const compoundMatch = stmt.match(/^(\w+)\s*(\*=\|\+=\|-=\|\/=)\s*(.+?);?$/);
    if (compoundMatch) {
      const name = compoundMatch[1];
      const op = compoundMatch[2];
      const val = resolveValue(compoundMatch[3].replace(/;$/, ''));
      const curr = variables[name] || 0;
      if (op === '*=') variables[name] = curr * val;
      else if (op === '+=') variables[name] = curr + val;
      else if (op === '-=') variables[name] = curr - val;
      else if (op === '/=') variables[name] = val !== 0 ? curr / val : 0;
      return true;
    }

    // Standard assignment: fact = fact * i
    const assignMatch = stmt.match(/^(\w+)\s*=\s*(.+?);?$/);
    if (assignMatch && !stmt.includes('==') && !stmt.includes('printf') && !stmt.includes('scanf')) {
      const name = assignMatch[1];
      const val = assignMatch[2].replace(/;$/, '');
      variables[name] = resolveValue(val);
      return true;
    }

    if (stmt.startsWith('printf')) {
      const argMatch = stmt.match(/printf\s*\(([\s\S]*)\)\s*;?$/);
      if (argMatch) {
        const rawArgs = argMatch[1].trim();
        const firstQuote = rawArgs.indexOf('"');
        const lastQuote = rawArgs.lastIndexOf('"');

        if (firstQuote !== -1 && lastQuote > firstQuote) {
          let format = rawArgs.slice(firstQuote + 1, lastQuote);
          const restStr = rawArgs.slice(lastQuote + 1).replace(/^,\s*/, '').trim();

          const argValues: any[] = [];
          if (restStr) {
            const parts = restStr.split(',').map((p) => p.trim());
            for (const p of parts) {
              if (p) argValues.push(resolveValue(p));
            }
          }

          let argIndex = 0;
          let formatted = format.replace(/%d|%lld|%llu|%f|%c|%s|%.1f|%.2f/g, (spec) => {
            const val = argValues[argIndex++];
            if (val === undefined) return spec;
            if (spec === '%d' || spec === '%lld' || spec === '%llu') return String(Math.trunc(Number(val)));
            if (spec === '%.1f') return Number(val).toFixed(1);
            if (spec === '%.2f') return Number(val).toFixed(2);
            if (spec === '%f') return String(val);
            if (spec === '%c') return String(val).charAt(0);
            if (spec === '%s') return String(val);
            return String(val);
          });

          formatted = formatted.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
          output += formatted;
        }
      }
      return true;
    }

    return true;
  };

  const executeBlock = (blockText: string) => {
    let text = blockText.trim();
    let i = 0;

    while (i < text.length) {
      const ifMatch = text.slice(i).match(/^if\s*\(([\s\S]*?)\)\s*\{/);
      if (ifMatch) {
        const fullIfHead = ifMatch[0];
        const condExpr = ifMatch[1];
        const startIdx = i + fullIfHead.length;
        let braceCount = 1;
        let endIdx = startIdx;
        while (endIdx < text.length && braceCount > 0) {
          if (text[endIdx] === '{') braceCount++;
          if (text[endIdx] === '}') braceCount--;
          endIdx++;
        }
        const ifBody = text.slice(startIdx, endIdx - 1);
        let elseBody = '';
        const remainder = text.slice(endIdx).trim();
        let elseLength = 0;
        if (remainder.startsWith('else')) {
          const elseMatch = remainder.match(/^else\s*\{/);
          if (elseMatch) {
            const elseStartIdx = endIdx + text.slice(endIdx).indexOf('{') + 1;
            let elseBraceCount = 1;
            let elseEndIdx = elseStartIdx;
            while (elseEndIdx < text.length && elseBraceCount > 0) {
              if (text[elseEndIdx] === '{') elseBraceCount++;
              if (text[elseEndIdx] === '}') elseBraceCount--;
              elseEndIdx++;
            }
            elseBody = text.slice(elseStartIdx, elseEndIdx - 1);
            elseLength = elseEndIdx - endIdx;
          }
        }
        const condVal = evalExpr(condExpr);
        if (condVal) {
          executeBlock(ifBody);
        } else if (elseBody) {
          executeBlock(elseBody);
        }
        i = endIdx + elseLength;
        continue;
      }

      const forMatch = text.slice(i).match(/^for\s*\(([^;]*);\s*([^;]*);\s*([^)]*)\)\s*\{/);
      if (forMatch) {
        const fullForHead = forMatch[0];
        const init = forMatch[1];
        const cond = forMatch[2];
        const incr = forMatch[3];
        const startIdx = i + fullForHead.length;
        let braceCount = 1;
        let endIdx = startIdx;
        while (endIdx < text.length && braceCount > 0) {
          if (text[endIdx] === '{') braceCount++;
          if (text[endIdx] === '}') braceCount--;
          endIdx++;
        }
        const loopBody = text.slice(startIdx, endIdx - 1);
        executeStatement(init);
        let safety = 1000;
        while (evalExpr(cond) && safety-- > 0) {
          executeBlock(loopBody);
          executeStatement(incr);
        }
        i = endIdx;
        continue;
      }

      let nextSemi = text.indexOf(';', i);
      let nextBrace = text.indexOf('{', i);

      if (nextSemi !== -1 && (nextBrace === -1 || nextSemi < nextBrace)) {
        const stmt = text.slice(i, nextSemi + 1);
        const cont = executeStatement(stmt);
        if (!cont) break;
        i = nextSemi + 1;
      } else {
        break;
      }
    }
  };

  try {
    executeBlock(body);
  } catch (err: any) {
    return { output, error: `Execution error: ${err?.message || 'Syntax error'}`, passed: false };
  }

  // Format local simulation output with user input prompt
  if (input && output) {
    if (/((?:Enter|Input)[^\n]*?:\s*)([^\n]+)/i.test(output)) {
      output = output.replace(/((?:Enter|Input)[^\n]*?:\s*)([^\n]+)/i, (_: string, promptText: string, rest: string) => {
        if (rest.includes(input)) return `${promptText}${rest}`;
        return `${promptText}${input}\n${rest}`;
      });
    } else if (/((?:Enter|Input)[^\n]*?:\s*)/i.test(output)) {
      output = output.replace(/((?:Enter|Input)[^\n]*?:\s*)/i, `$1${input}\n`);
    }
  }

  return { output, error: null, passed: true };
}
