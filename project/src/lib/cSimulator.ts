export interface RunResult {
  output: string;
  error: string | null;
  passed: boolean;
  expectedOutput?: string;
}

export function simulateCProgram(code: string, input?: string): RunResult {
  const trimmed = code.trim();

  if (!trimmed.includes('int main')) {
    return { output: '', error: 'Error: Could not find int main() function. Every C program needs a main function.', passed: false };
  }

  const mainMatch = trimmed.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  if (!mainMatch) {
    return { output: '', error: 'Error: Could not parse the main function body. Check your braces {}.', passed: false };
  }

  let body = mainMatch[1];

  body = body.replace(/\/\/[^\n]*/g, '');
  body = body.replace(/\/\*[\s\S]*?\*\//g, '');

  const includes = trimmed.match(/#include\s*<[^>]+>/g) || [];

  if (!includes.some((inc) => inc.includes('stdio.h'))) {
    return { output: '', error: 'Error: Missing #include <stdio.h> — needed for printf and scanf.', passed: false };
  }

  const variables: Record<string, number | string> = {};
  const arrays: Record<string, number[]> = {};
  let output = '';

  const inputLines = input ? input.split(/\n| /).filter((x) => x.length > 0) : [];
  let inputIdx = 0;

  const nextInput = (): string => {
    if (inputIdx < inputLines.length) return inputLines[inputIdx++];
    return '0';
  };

  const evalExpr = (expr: string): number => {
    let e = expr.trim();
    e = e.replace(/\b(\w+)\b/g, (match) => {
      if (match in variables && typeof variables[match] === 'number') {
        return String(variables[match]);
      }
      return match;
    });

    e = e.replace(/arr\[(\d+)\]/g, (_, idx) => {
      return String(arrays['arr']?.[parseInt(idx)] ?? 0);
    });

    try {
      const result = Function(`"use strict"; return (${e})`)();
      return typeof result === 'number' ? result : 0;
    } catch {
      return 0;
    }
  };

  const resolveValue = (val: string): number | string => {
    const trimmed = val.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.slice(1, -1);
    }
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      return trimmed.slice(1, -1);
    }
    if (trimmed in variables) {
      return variables[trimmed];
    }
    const num = Number(trimmed);
    if (!isNaN(num)) return num;
    return evalExpr(trimmed);
  };

  const processStatement = (stmt: string): boolean => {
    const s = stmt.trim();
    if (!s) return true;

    const declMatch = s.match(/^(int|long|float|double|char|short)\s+(.+)$/);
    if (declMatch) {
      const rest = declMatch[2].replace(/;$/, '');
      if (rest.includes('[')) {
        const arrMatch = rest.match(/(\w+)\s*\[(\d+)\]/);
        if (arrMatch) {
          arrays[arrMatch[1]] = new Array(parseInt(arrMatch[2])).fill(0);
        }
      } else if (rest.includes('=')) {
        const [name, val] = rest.split('=').map((x) => x.trim());
        variables[name] = resolveValue(val);
      } else {
        variables[rest] = 0;
      }
      return true;
    }

    const assignMatch = s.match(/^(\w+)\s*=\s*(.+?);?$/);
    if (assignMatch && !s.includes('==') && !s.includes('printf') && !s.includes('scanf')) {
      const name = assignMatch[1];
      const val = assignMatch[2].replace(/;$/, '');
      variables[name] = resolveValue(val);
      return true;
    }

    const arrAssignMatch = s.match(/^(\w+)\s*\[(\d+)\]\s*=\s*(.+?);?$/);
    if (arrAssignMatch) {
      const name = arrAssignMatch[1];
      const idx = parseInt(arrAssignMatch[2]);
      const val = resolveValue(arrAssignMatch[3].replace(/;$/, ''));
      if (!arrays[name]) arrays[name] = [];
      arrays[name][idx] = typeof val === 'number' ? val : 0;
      return true;
    }

    if (s.startsWith('printf')) {
      const argMatch = s.match(/printf\s*\(([\s\S]*)\)\s*;?$/);
      if (argMatch) {
        let args = argMatch[1].trim();
        const formatMatch = args.match(/^"([^"]*)"(.*)$/);
        if (formatMatch) {
          let format = formatMatch[1];
          const restArgs = formatMatch[2].replace(/^,\s*/, '').trim();
          const argValues: (number | string)[] = [];
          if (restArgs) {
            const argParts = restArgs.split(',').map((a) => a.trim());
            for (const ap of argParts) {
              argValues.push(resolveValue(ap));
            }
          }

          let argIdx = 0;
          let result = format.replace(/%d|%ld|%lld|%f|%lf|%c|%s/g, (spec) => {
            const val = argValues[argIdx++];
            if (spec === '%d' || spec === '%ld' || spec === '%lld') return String(Math.trunc(Number(val)));
            if (spec === '%f' || spec === '%lf') return Number(val).toFixed(6);
            if (spec === '%c') return String(val).charAt(0);
            if (spec === '%s') return String(val);
            return String(val);
          });

          result = result.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
          output += result;
        } else {
          const val = resolveValue(args.replace(/;$/, ''));
          output += String(val);
        }
      }
      return true;
    }

    if (s.startsWith('scanf')) {
      const argMatch = s.match(/scanf\s*\("([^"]*)"\s*,\s*(.+)\)\s*;?$/);
      if (argMatch) {
        const format = argMatch[1];
        const varNames = argMatch[2].split(',').map((v) => v.trim().replace(/&/, ''));
        let fmtIdx = 0;
        format.replace(/%d|%f|%lf|%c|%s/g, () => {
          const name = varNames[fmtIdx++];
          const inp = nextInput();
          if (format.includes('%f') || format.includes('%lf')) {
            variables[name] = parseFloat(inp);
          } else if (format.includes('%c')) {
            variables[name] = inp.charAt(0);
          } else if (format.includes('%s')) {
            variables[name] = inp;
          } else {
            variables[name] = parseInt(inp);
          }
          return '';
        });
      }
      return true;
    }

    if (s.startsWith('return')) return false;

    return true;
  };

  const statements = body.split(/;/);
  for (const stmt of statements) {
    const cont = processStatement(stmt);
    if (cont === false) break;
  }

  const forLoopMatch = body.match(/for\s*\(([^;]*);\s*([^;]*);\s*([^)]*)\)\s*\{([\s\S]*?)\}/);
  if (forLoopMatch) {
    output = '';
    const init = forLoopMatch[1];
    const cond = forLoopMatch[2];
    const incr = forLoopMatch[3];
    const loopBody = forLoopMatch[4];

    processStatement(init);

    let maxIter = 1000;
    while (evalExpr(cond) && maxIter-- > 0) {
      for (const stmt of loopBody.split(/;/)) {
        processStatement(stmt);
      }
      processStatement(incr);
    }
  }

  return { output: output.trim(), error: null, passed: true };
}

export function checkSolution(code: string, testCases: { input: string; expected: string }[]): { passed: boolean; results: { input: string; expected: string; actual: string; passed: boolean }[] } {
  const results = testCases.map((tc) => {
    const result = simulateCProgram(code, tc.input);
    return {
      input: tc.input,
      expected: tc.expected.trim(),
      actual: result.output.trim(),
      passed: result.output.trim() === tc.expected.trim(),
    };
  });

  return { passed: results.every((r) => r.passed), results };
}
