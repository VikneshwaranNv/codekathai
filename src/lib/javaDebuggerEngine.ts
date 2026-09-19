import type { DebugStep, DebugVariable } from './cDebuggerEngine';

/**
 * Generates educational Java Heap address for object instances (e.g. 0x7j_heap_42)
 */
function generateHeapAddress(varName: string, index: number): string {
  const base = 0x7f00 + index * 16;
  return `0x${base.toString(16)} (JVM Heap)`;
}

/**
 * Parses Java source code into step-by-step JVM execution snapshots
 */
export function parseJavaExecutionSteps(javaCode: string): DebugStep[] {
  if (!javaCode || !javaCode.trim()) return [];

  const lines = javaCode.split('\n');
  const steps: DebugStep[] = [];
  const currentVariables = new Map<string, DebugVariable>();
  let accumulatedOutput = '';
  let varCounter = 0;

  lines.forEach((lineText, idx) => {
    const lineNumber = idx + 1;
    const trimmed = lineText.trim();

    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    let explanationEn = `Executing Java line ${lineNumber}: ${trimmed}`;
    let explanationTa = `Java வரி ${lineNumber} இயக்கப்படுகிறது: ${trimmed}`;
    let stateChanged = false;

    // 1. Primitive & String Variable Declarations (int age = 20; String name = "Kavi";)
    const varDeclMatch = trimmed.match(/^(int|double|float|boolean|String|char|var)\s+([a-zA-Z_]\w*)\s*=\s*(.+);$/);
    if (varDeclMatch) {
      const [, type, name, rawVal] = varDeclMatch;
      const cleanVal = rawVal.replace(/['"]/g, '').trim();
      const addr = type === 'String' ? generateHeapAddress(name, varCounter++) : `Stack Frame [${name}]`;

      currentVariables.set(name, {
        name: `Java Local: ${name}`,
        type: `Java ${type}`,
        value: cleanVal,
        address: addr,
      });

      explanationEn = `Declared Java ${type} variable '${name}' with value '${cleanVal}'.`;
      explanationTa = `'${name}' என்ற Java ${type} மாறி உருவாக்கப்பட்டு '${cleanVal}' என Stack/Heap நினைவகத்தில் சேமிக்கப்பட்டது.`;
      stateChanged = true;
    }

    // 2. Object Instantiation (Student s = new Student();)
    const objDeclMatch = trimmed.match(/^([a-zA-Z_]\w*)\s+([a-zA-Z_]\w*)\s*=\s*new\s+\1\([^)]*\);$/);
    if (objDeclMatch) {
      const [, className, objName] = objDeclMatch;
      const heapAddr = generateHeapAddress(objName, varCounter++);

      currentVariables.set(objName, {
        name: `Object Ref: ${objName}`,
        type: `${className} Instance`,
        value: `{ ${className} Object }`,
        address: heapAddr,
      });

      explanationEn = `Instantiated Java Object '${objName}' of Class '${className}' in Heap memory.`;
      explanationTa = `'${className}' வகுப்பில் இருந்து '${objName}' என்ற புதிய பொருள் (Object) Heap நினைவகத்தில் உருவாக்கப்பட்டது.`;
      stateChanged = true;
    }

    // 3. Array Instantiation (int[] nums = {1, 2, 3};)
    const arrayDeclMatch = trimmed.match(/^(int|double|String)\[\]\s+([a-zA-Z_]\w*)\s*=\s*\{([^}]+)\};$/);
    if (arrayDeclMatch) {
      const [, elemType, arrName, rawItems] = arrayDeclMatch;
      const heapAddr = generateHeapAddress(arrName, varCounter++);

      currentVariables.set(arrName, {
        name: `Array Ref: ${arrName}`,
        type: `${elemType}[] Array`,
        value: `[${rawItems.trim()}]`,
        address: heapAddr,
      });

      explanationEn = `Created Java Array '${arrName}' of type ${elemType}[] in Heap memory.`;
      explanationTa = `'${arrName}' என்ற ${elemType}[] வரிசை (Array) Heap நினைவகத்தில் உருவாக்கப்பட்டது.`;
      stateChanged = true;
    }

    // 4. System.out.println & System.out.print Output
    const printMatch = trimmed.match(/System\.out\.print(ln)?\s*\((.*)\);/);
    if (printMatch) {
      const [, isLn, expr] = printMatch;
      let text = expr.replace(/"/g, '').replace(/\\n/g, '\n');

      currentVariables.forEach((v, k) => {
        const cleanName = k.replace(/^(Java Local: |Object Ref: |Array Ref: )/, '');
        text = text.replace(new RegExp(`\\b${cleanName}\\b`, 'g'), v.value);
      });

      accumulatedOutput += text + (isLn ? '\n' : '');
      explanationEn = `Printed output to Java console: "${text.trim()}"`;
      explanationTa = `Java கன்சோல் முனையத்தில் அச்சிடப்பட்டது: "${text.trim()}"`;
      stateChanged = true;
    }

    if (trimmed.startsWith('public class') || trimmed.startsWith('public static void main')) {
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
