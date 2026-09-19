// Step-by-Step Visual C Execution Engine for Code Kathai
// Parses C code into line-by-line execution states with variable stack & terminal outputs

export interface DebugVariable {
  name: string;
  type: string;
  value: string;
  address: string;
}

export interface DebugStep {
  stepIndex: number;
  lineNumber: number;
  lineContent: string;
  variables: DebugVariable[];
  stdout: string;
  explanationEn: string;
  explanationTa: string;
}

/**
 * Generates mock memory address for variables (e.g., 0x7ffd9a04)
 */
function generateMemoryAddress(varName: string, index: number): string {
  const base = 0x7ffd9a00 + index * 4;
  return `0x${base.toString(16)}`;
}

/**
 * Parses C source code into step-by-step debugging snapshots
 */
export function parseCExecutionSteps(code: string): DebugStep[] {
  if (!code || !code.trim()) return [];

  const lines = code.split('\n');
  const steps: DebugStep[] = [];
  const currentVariables = new Map<string, DebugVariable>();
  let accumulatedOutput = '';
  let varCounter = 0;

  // Track simple variable declarations, assignments, and print statements
  lines.forEach((lineText, idx) => {
    const lineNumber = idx + 1;
    const trimmed = lineText.trim();

    // Skip empty lines or pure comment lines from execution steps
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    let explanationEn = `Executing line ${lineNumber}: ${trimmed}`;
    let explanationTa = `வரி ${lineNumber} இயக்கப்படுகிறது: ${trimmed}`;
    let stateChanged = false;

    // 1. Variable Declaration & Assignment (e.g., int age = 20; float pi = 3.14; char grade = 'A';)
    const varDeclMatch = trimmed.match(/^(int|float|double|char)\s+([a-zA-Z_]\w*)\s*=\s*(.+);$/);
    if (varDeclMatch) {
      const [, varType, varName, rawVal] = varDeclMatch;
      const cleanVal = rawVal.replace(/['"]/g, '').trim();
      const addr = generateMemoryAddress(varName, varCounter++);

      currentVariables.set(varName, {
        name: varName,
        type: varType,
        value: cleanVal,
        address: addr,
      });

      explanationEn = `Declared ${varType} variable '${varName}' and initialized to ${cleanVal}.`;
      explanationTa = `'${varName}' என்ற ${varType} மாறி உருவாக்கப்பட்டு ${cleanVal} என மதிப்பு அளிக்கப்பட்டது.`;
      stateChanged = true;
    } else {
      // 2. Variable Reassignment (e.g., age = 25; count += 1;)
      const reassignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+);$/);
      if (reassignMatch && !trimmed.startsWith('return') && !trimmed.startsWith('if') && !trimmed.startsWith('for') && !trimmed.startsWith('while')) {
        const [, varName, rawVal] = reassignMatch;
        if (currentVariables.has(varName)) {
          const existing = currentVariables.get(varName)!;
          const cleanVal = rawVal.replace(/['"]/g, '').trim();

          currentVariables.set(varName, {
            ...existing,
            value: cleanVal,
          });

          explanationEn = `Updated variable '${varName}' value to ${cleanVal}.`;
          explanationTa = `'${varName}' மாறியின் புதிய மதிப்பு ${cleanVal} என புதுப்பிக்கப்பட்டது.`;
          stateChanged = true;
        }
      }
    }

    // 3. Printf Statements (e.g., printf("Hello World\n"); or printf("Sum = %d", sum);)
    const printfMatch = trimmed.match(/printf\s*\(\s*"([^"]+)"(?:\s*,\s*(.+))?\s*\);/);
    if (printfMatch) {
      const [, formatStr, args] = printfMatch;
      let outputText = formatStr.replace(/\\n/g, '\n');

      if (args) {
        const argNames = args.split(',').map((s) => s.trim());
        argNames.forEach((arg) => {
          if (currentVariables.has(arg)) {
            const val = currentVariables.get(arg)!.value;
            outputText = outputText.replace(/%[dfcs]/, val);
          }
        });
      }

      accumulatedOutput += outputText;
      explanationEn = `Printed output to terminal: "${outputText.trim()}"`;
      explanationTa = `முனையத்தில் வெளியீடு அச்சிடப்பட்டது: "${outputText.trim()}"`;
      stateChanged = true;
    }

    // 4. Return statement (e.g., return 0;)
    if (trimmed.startsWith('return')) {
      explanationEn = `Program finished with exit code ${trimmed.replace('return', '').replace(';', '').trim() || '0'}.`;
      explanationTa = `நிரல் வெற்றிகரமாக இயங்கி முடிந்தது.`;
      stateChanged = true;
    }

    // 5. Structure / Header / Function Signatures
    if (trimmed.startsWith('#include') || trimmed.startsWith('int main')) {
      stateChanged = true;
    }

    if (stateChanged || trimmed.includes('{') || trimmed.includes('}')) {
      steps.push({
        stepIndex: steps.length + 1,
        lineNumber,
        lineContent: trimmed,
        variables: Array.from(currentVariables.values()),
        stdout: accumulatedOutput,
        explanationEn,
        explanationTa,
      });
    }
  });

  return steps;
}
