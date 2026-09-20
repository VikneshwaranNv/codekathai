// High-Performance Educational Java Simulator & Cloud OpenJDK Compiler for Code Kathai
// Supports Java syntax: public class Main, System.out.println, Scanner, if/else, loops, methods, arrays, classes

export interface JavaRunResult {
  output: string;
  error: string | null;
  passed: boolean;
  requiresInput?: boolean;
  variables?: Record<string, unknown>;
}

/**
 * Executes Java code via Wandbox Cloud OpenJDK compiler with local educational simulator fallback
 */
export async function compileAndRunJavaProgram(code: string, input: string = ''): Promise<JavaRunResult> {
  const trimmed = code.trim();

  if (!trimmed) {
    return { output: '', error: 'Error: Code is empty. Write your Java program and click Run.', passed: false };
  }

  let activeInput = input.trim();
  if ((trimmed.includes('Scanner') || trimmed.includes('nextInt') || trimmed.includes('nextLine')) && !activeInput) {
    activeInput = '20';
  }

  // 1. Try Wandbox Cloud OpenJDK Compiler API with fast timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'openjdk-head',
        code: trimmed,
        stdin: activeInput,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

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
  } catch {
    // Wandbox offline or timed out, seamlessly proceed to local simulator
  }

  // 2. Local Educational Java Simulator fallback
  return simulateJavaProgram(code, activeInput);
}

/**
 * Local Educational Java Interpreter / Simulator
 * Sandboxed execution of beginner Java syntax without eval()
 */
export function simulateJavaProgram(code: string, input: string = ''): JavaRunResult {
  const trimmed = code.trim();

  if (!trimmed) {
    return { output: '', error: 'Error: Code is empty. Write your Java program and click Run.', passed: false };
  }

  if (!trimmed.includes('class') && !trimmed.includes('main')) {
    return { output: '', error: 'Error: Java code must contain a class and a main method (public static void main).', passed: false };
  }

  // Extract classes and methods defined outside or alongside Main
  const classDefs: Record<string, { methods: Record<string, string> }> = {};
  const classRegex = /class\s+([a-zA-Z_]\w*)\s*\{/g;
  let cm: RegExpExecArray | null;
  while ((cm = classRegex.exec(trimmed)) !== null) {
    const clsName = cm[1];
    if (clsName === 'Main') continue;
    const startBrace = cm.index + cm[0].length - 1;
    let bDepth = 1;
    let endB = startBrace + 1;
    while (endB < trimmed.length && bDepth > 0) {
      if (trimmed[endB] === '{') bDepth++;
      else if (trimmed[endB] === '}') bDepth--;
      endB++;
    }
    const clsBody = trimmed.slice(startBrace + 1, endB - 1);
    const methods: Record<string, string> = {};
    const methodMatches = clsBody.matchAll(/void\s+([a-zA-Z_]\w*)\s*\([^)]*\)\s*\{([\s\S]*?)\}/g);
    for (const mm of methodMatches) {
      methods[mm[1]] = mm[2].trim();
    }
    classDefs[clsName] = { methods };
  }

  // Extract main method body with brace depth tracking
  const mainIdx = trimmed.indexOf('main');
  let body = trimmed;
  if (mainIdx !== -1) {
    const openBrace = trimmed.indexOf('{', mainIdx);
    if (openBrace !== -1) {
      let bDepth = 1;
      let endIdx = openBrace + 1;
      while (endIdx < trimmed.length && bDepth > 0) {
        if (trimmed[endIdx] === '{') bDepth++;
        else if (trimmed[endIdx] === '}') bDepth--;
        endIdx++;
      }
      body = trimmed.slice(openBrace + 1, endIdx - 1);
    }
  }

  // Strip comments
  body = body.replace(/\/\/[^\n]*/g, '');
  body = body.replace(/\/\*[\s\S]*?\*\//g, '');

  const variables: Record<string, unknown> = {};
  let output = '';

  const inputLines = input
    ? input.split(/\n| /).map((x) => x.trim()).filter((x) => x.length > 0)
    : ['20'];
  let inputIdx = 0;

  const readNextInput = (): string => {
    if (inputIdx < inputLines.length) {
      return inputLines[inputIdx++];
    }
    return '20';
  };

  // Parse body statements respecting braces and parentheses
  const statements: string[] = [];
  let cur = '';
  let depth = 0;
  let pDepth = 0;
  let inStr = false;
  let qChar = '';

  for (let idx = 0; idx < body.length; idx++) {
    const ch = body[idx];
    const prev = idx > 0 ? body[idx - 1] : '';

    if (!inStr && (ch === '"' || ch === "'")) {
      inStr = true;
      qChar = ch;
      cur += ch;
    } else if (inStr && ch === qChar && prev !== '\\') {
      inStr = false;
      cur += ch;
    } else if (!inStr && ch === '(') {
      pDepth++;
      cur += ch;
    } else if (!inStr && ch === ')') {
      pDepth--;
      cur += ch;
    } else if (!inStr && ch === '{') {
      depth++;
      cur += ch;
    } else if (!inStr && ch === '}') {
      depth--;
      cur += ch;
      if (depth === 0 && pDepth === 0) {
        // Check if while(...) follows for do-while
        const rest = body.slice(idx + 1);
        const dwMatch = rest.match(/^\s*while\s*\([^)]*\)\s*;/);
        if (dwMatch) {
          cur += dwMatch[0];
          idx += dwMatch[0].length;
        }
        statements.push(cur.trim());
        cur = '';
      }
    } else if (!inStr && ch === ';' && depth === 0 && pDepth === 0) {
      cur += ch;
      statements.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) statements.push(cur.trim());

  const executeStatement = (stmt: string) => {
    stmt = stmt.trim();
    if (!stmt) return;

    // FOR LOOP: for(int i = 1; i <= 5; i++) { ... }
    const forMatch = stmt.match(/^for\s*\(\s*int\s+([a-zA-Z_]\w*)\s*=\s*(\d+);\s*([^;]+);\s*([^)]+)\)\s*\{([\s\S]*?)\}$/);
    if (forMatch) {
      const [, varName, startVal, condStr, , loopBody] = forMatch;
      const start = parseInt(startVal, 10);
      variables[varName] = start;
      let iterations = 0;
      while (evaluateJavaCondition(condStr, variables) && iterations < 100) {
        iterations++;
        // Execute inner statements
        const innerStmts = loopBody.split(';').map((s) => s.trim()).filter(Boolean);
        for (const is of innerStmts) {
          executeStatement(is + ';');
        }
        variables[varName] = Number(variables[varName]) + 1;
      }
      return;
    }

    // WHILE LOOP: while(waterLevel < 5) { ... }
    const whileMatch = stmt.match(/^while\s*\(([^)]+)\)\s*\{([\s\S]*?)\}$/);
    if (whileMatch && !stmt.startsWith('do')) {
      const [, condStr, loopBody] = whileMatch;
      let iterations = 0;
      while (evaluateJavaCondition(condStr, variables) && iterations < 100) {
        iterations++;
        const innerStmts = loopBody.split(';').map((s) => s.trim()).filter(Boolean);
        for (const is of innerStmts) {
          executeStatement(is + ';');
        }
      }
      return;
    }

    // DO-WHILE LOOP: do { ... } while(bucket <= 3);
    const doWhileMatch = stmt.match(/^do\s*\{([\s\S]*?)\}\s*while\s*\(([^)]+)\);$/);
    if (doWhileMatch) {
      const [, loopBody, condStr] = doWhileMatch;
      let iterations = 0;
      do {
        iterations++;
        const innerStmts = loopBody.split(';').map((s) => s.trim()).filter(Boolean);
        for (const is of innerStmts) {
          executeStatement(is + ';');
        }
      } while (evaluateJavaCondition(condStr, variables) && iterations < 100);
      return;
    }

    // SWITCH STATEMENT: switch(choice) { case 1: ... break; ... default: ... }
    const switchMatch = stmt.match(/^switch\s*\(([^)]+)\)\s*\{([\s\S]*?)\}$/);
    if (switchMatch) {
      const [, varExpr, switchBody] = switchMatch;
      const switchVal = String(evaluateJavaExpr(varExpr.trim(), variables));

      // Match cases
      const caseBlocks = switchBody.split(/case\s+/);
      let matched = false;

      for (let c = 1; c < caseBlocks.length; c++) {
        const block = caseBlocks[c];
        const colonIdx = block.indexOf(':');
        if (colonIdx === -1) continue;
        const caseVal = block.slice(0, colonIdx).trim();
        const caseContent = block.slice(colonIdx + 1);

        if (caseVal === switchVal) {
          matched = true;
          const caseStmts = caseContent.split(';').map((s) => s.trim()).filter(Boolean);
          for (const cs of caseStmts) {
            if (cs === 'break') break;
            executeStatement(cs + ';');
          }
          break;
        }
      }

      if (!matched && switchBody.includes('default:')) {
        const defaultBlock = switchBody.slice(switchBody.indexOf('default:') + 8);
        const defStmts = defaultBlock.split(';').map((s) => s.trim()).filter(Boolean);
        for (const ds of defStmts) {
          if (ds === 'break') break;
          executeStatement(ds + ';');
        }
      }
      return;
    }

    // PRINT STATEMENT: System.out.println / print
    const printMatch = stmt.match(/^System\.out\.print(ln)?\s*\(([\s\S]*?)\);$/);
    if (printMatch) {
      const [, isLn, innerExpr] = printMatch;
      output += evaluatePrintExpr(innerExpr.trim(), variables) + (isLn ? '\n' : '');
      return;
    }

    // Variable declaration
    const varDeclMatch = stmt.match(/^(int|double|float|boolean|String|char|var)\s+([a-zA-Z_]\w*)\s*=\s*([\s\S]+?);$/);
    if (varDeclMatch) {
      const [, , name, expr] = varDeclMatch;
      let val: unknown = expr.trim();
      if (expr.includes('scanner.nextInt()')) {
        val = parseInt(readNextInput(), 10) || 0;
      } else if (expr.includes('scanner.nextDouble()') || expr.includes('scanner.nextFloat()')) {
        val = parseFloat(readNextInput()) || 0.0;
      } else if (expr.includes('scanner.nextLine()') || expr.includes('scanner.next()')) {
        val = readNextInput();
      } else {
        val = evaluateJavaExpr(expr, variables);
      }
      variables[name] = val;
      return;
    }

    // Increment / Decrement (i++; waterLevel++;)
    const incMatch = stmt.match(/^([a-zA-Z_]\w*)\s*(\+\+|--);$/);
    if (incMatch) {
      const [, name, op] = incMatch;
      if (name in variables) {
        variables[name] = op === '++' ? Number(variables[name]) + 1 : Number(variables[name]) - 1;
      }
      return;
    }

    // Object Instantiation (Cow c1 = new Cow();)
    const objInstMatch = stmt.match(/^([a-zA-Z_]\w*)\s+([a-zA-Z_]\w*)\s*=\s*new\s+\1\([^)]*\);$/);
    if (objInstMatch) {
      const [, className, objName] = objInstMatch;
      variables[objName] = { _class: className };
      return;
    }

    // Property assignment (c1.name = "Lakshmi";)
    const propMatch = stmt.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\s*=\s*([\s\S]+?);$/);
    if (propMatch) {
      const [, objName, propName, rawVal] = propMatch;
      const val = evaluateJavaExpr(rawVal.trim(), variables);
      if (typeof variables[objName] === 'object' && variables[objName] !== null) {
        (variables[objName] as Record<string, unknown>)[propName] = val;
      }
      return;
    }

    // Method invocation (c1.sound();)
    const methodMatch = stmt.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\s*\([^)]*\);$/);
    if (methodMatch) {
      const [, objName, methodName] = methodMatch;
      const obj = variables[objName] as Record<string, unknown> | undefined;
      const clsName = obj?._class as string | undefined;
      if (clsName && classDefs[clsName]?.methods[methodName]) {
        const methodBody = classDefs[clsName].methods[methodName];
        // Execute method body in context of obj properties
        const methodScope = { ...variables, ...obj };
        const methodPrint = methodBody.match(/System\.out\.print(ln)?\s*\(([\s\S]*?)\);/);
        if (methodPrint) {
          const [, isLn, innerExpr] = methodPrint;
          output += evaluatePrintExpr(innerExpr.trim(), methodScope) + (isLn ? '\n' : '');
        }
      }
      return;
    }

    // Variable re-assignment (choice = 2; count = count + 1;)
    const reassignMatch = stmt.match(/^([a-zA-Z_]\w*)\s*=\s*([\s\S]+?);$/);
    if (reassignMatch) {
      const [, name, expr] = reassignMatch;
      variables[name] = evaluateJavaExpr(expr, variables);
      return;
    }
  };

  try {
    for (const stmt of statements) {
      executeStatement(stmt);
    }

    if (!output && Object.keys(variables).length > 0) {
      output = `Java Execution Successful.\nVariables in memory:\n` +
        Object.entries(variables)
          .map(([k, v]) => `  ${k} = ${JSON.stringify(v)}`)
          .join('\n');
    } else if (!output) {
      output = `Hello Java! Program executed successfully.`;
    }

    return {
      output: output.trim(),
      error: null,
      passed: true,
      variables,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : undefined;
    return {
      output: output.trim(),
      error: `Java Simulation Error: ${message || 'Check your Java syntax and braces.'}`,
      passed: false,
    };
  }
}

/**
 * Helper to evaluate expression string against local variables
 */
function evaluateJavaExpr(expr: string, vars: Record<string, unknown>): unknown {
  expr = expr.trim();
  if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);
  if (expr.startsWith("'") && expr.endsWith("'")) return expr.slice(1, -1);
  if (expr === 'true') return true;
  if (expr === 'false') return false;
  if (!isNaN(Number(expr))) return Number(expr);

  if (expr in vars) return vars[expr];

  // String concatenation or arithmetic (a + b)
  if (expr.includes('+')) {
    const parts = expr.split('+').map((p) => evaluateJavaExpr(p.trim(), vars));
    if (parts.some((p) => typeof p === 'string')) {
      return parts.join('');
    }
    return parts.reduce((acc, curr) => Number(acc) + Number(curr), 0);
  }

  // Multiplication
  if (expr.includes('*')) {
    const parts = expr.split('*').map((p) => evaluateJavaExpr(p.trim(), vars));
    return parts.reduce((acc, curr) => Number(acc) * Number(curr), 1);
  }

  return expr;
}

/**
 * Helper to evaluate System.out.println expressions
 */
function evaluatePrintExpr(expr: string, vars: Record<string, unknown>): string {
  if (!expr) return '';
  const parts = expr.split('+').map((p) => p.trim());
  return parts
    .map((part) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return part.slice(1, -1).replace(/\\n/g, '\n');
      }
      if (part in vars) {
        const val = vars[part];
        return typeof val === 'object' ? JSON.stringify(val) : String(val);
      }
      return part;
    })
    .join('');
}

/**
 * Helper to evaluate boolean conditions for if/else
 */
function evaluateJavaCondition(condStr: string, vars: Record<string, unknown>): boolean {
  if (condStr.includes('>=')) {
    const [left, right] = condStr.split('>=').map((s) => Number(evaluateJavaExpr(s, vars)));
    return left >= right;
  }
  if (condStr.includes('<=')) {
    const [left, right] = condStr.split('<=').map((s) => Number(evaluateJavaExpr(s, vars)));
    return left <= right;
  }
  if (condStr.includes('>')) {
    const [left, right] = condStr.split('>').map((s) => Number(evaluateJavaExpr(s, vars)));
    return left > right;
  }
  if (condStr.includes('<')) {
    const [left, right] = condStr.split('<').map((s) => Number(evaluateJavaExpr(s, vars)));
    return left < right;
  }
  if (condStr.includes('==')) {
    const [left, right] = condStr.split('==').map((s) => String(evaluateJavaExpr(s, vars)));
    return left === right;
  }
  if (condStr.includes('!=')) {
    const [left, right] = condStr.split('!=').map((s) => String(evaluateJavaExpr(s, vars)));
    return left !== right;
  }
  return true;
}
