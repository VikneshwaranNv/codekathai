export type FlowchartNodeType =
  | 'start'
  | 'input'
  | 'output'
  | 'process'
  | 'decision'
  | 'loop'
  | 'end';

export interface FlowchartNode {
  id: string;
  type: FlowchartNodeType;
  label: string;
  codeSnippet: string;
  tamilExplanation: string;
  englishExplanation: string;
  yesTargetId?: string;
  noTargetId?: string;
  loopBackTargetId?: string;
  lineIndex?: number;
}

export interface FlowchartGraph {
  title: string;
  nodes: FlowchartNode[];
  hasBranches: boolean;
  hasLoops: boolean;
}

/**
 * Parse ANY C source code string into a structured Flowchart Graph
 */
export function parseCToFlowchart(cCode: string): FlowchartGraph {
  const lines = cCode.split('\n');
  const nodes: FlowchartNode[] = [];

  // 1. Always start with START Node
  nodes.push({
    id: 'node_start',
    type: 'start',
    label: 'START main()',
    codeSnippet: 'int main() {',
    tamilExplanation: 'C நிரலின் ஆரம்பம் - main() சார்பு தொடங்குகிறது.',
    englishExplanation: 'Entry point of C program execution (main function).',
  });

  let nodeCounter = 1;
  let hasBranches = false;
  let hasLoops = false;

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    // Skip empty lines, includes, and standalone comments
    if (
      !trimmed ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('//') ||
      trimmed === '{' ||
      trimmed === '}'
    ) {
      continue;
    }

    // A. Output Statement: printf(...)
    if (trimmed.includes('printf(')) {
      const match = trimmed.match(/printf\s*\(\s*"([^"]*)"/);
      const text = match ? match[1].replace(/\\n/g, '').trim() : 'Display Output';

      nodes.push({
        id: `node_${nodeCounter++}`,
        type: 'output',
        label: `Output: "${text || 'Message'}"`,
        codeSnippet: trimmed,
        tamilExplanation: `வெளியீடு (printf): "${text}" என்ற தகவலை திரையில் அச்சிடுகிறது.`,
        englishExplanation: `Output: Displays "${text}" on the console screen.`,
        lineIndex: idx + 1,
      });
      continue;
    }

    // B. Input Statement: scanf(...)
    if (trimmed.includes('scanf(')) {
      const match = trimmed.match(/scanf\s*\(\s*"([^"]*)"\s*,\s*&?([a-zA-Z0-9_]+)/);
      const varName = match ? match[2] : 'input_var';

      nodes.push({
        id: `node_${nodeCounter++}`,
        type: 'input',
        label: `Input: Read value into '${varName}'`,
        codeSnippet: trimmed,
        tamilExplanation: `உள்ளீடு (scanf): பயனரிடமிருந்து '${varName}' மாறியில் மதிப்பெறுகிறது.`,
        englishExplanation: `Input: Reads input value from user into variable '${varName}'.`,
        lineIndex: idx + 1,
      });
      continue;
    }

    // C. Decision Condition: if (...) / else if (...)
    if (trimmed.startsWith('if') || trimmed.startsWith('else if')) {
      hasBranches = true;
      const match = trimmed.match(/\((.*)\)/);
      const condition = match ? match[1] : trimmed;

      nodes.push({
        id: `node_${nodeCounter++}`,
        type: 'decision',
        label: `Is ${condition} ?`,
        codeSnippet: trimmed,
        tamilExplanation: `நிபந்தனை முடிவு: ${condition} என்பது உண்மையா (TRUE) அல்லது பொய்யா (FALSE) என சரிபார்க்கிறது.`,
        englishExplanation: `Decision Check: Evaluates whether condition '${condition}' is TRUE or FALSE.`,
        lineIndex: idx + 1,
      });
      continue;
    }

    // D. Loop Condition: for (...) / while (...)
    if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
      hasLoops = true;
      const match = trimmed.match(/\((.*)\)/);
      const loopCond = match ? match[1] : trimmed;

      nodes.push({
        id: `node_${nodeCounter++}`,
        type: 'loop',
        label: `Loop: ${loopCond}`,
        codeSnippet: trimmed,
        tamilExplanation: `மடக்கு (Loop): ${loopCond} நிபந்தனை முடியும் வரை திரும்பத் திரும்ப இயங்கும்.`,
        englishExplanation: `Loop Iteration: Repeatedly executes code body while '${loopCond}' remains TRUE.`,
        lineIndex: idx + 1,
      });
      continue;
    }

    // E. Return / End Statement: return 0;
    if (trimmed.startsWith('return')) {
      nodes.push({
        id: `node_${nodeCounter++}`,
        type: 'end',
        label: `END: ${trimmed}`,
        codeSnippet: trimmed,
        tamilExplanation: 'நிரல் நிறைவுற்றது - 0 மதிப்பைத் திருப்பி அளிக்கிறது.',
        englishExplanation: 'Program termination: returns exit code 0.',
        lineIndex: idx + 1,
      });
      continue;
    }

    // F. Process Statement: Variable Declaration / Assignment / Calculation
    if (
      trimmed.includes('=') ||
      trimmed.includes('++') ||
      trimmed.includes('--') ||
      /^(int|float|double|char|long|short)\s+/.test(trimmed)
    ) {
      nodes.push({
        id: `node_${nodeCounter++}`,
        type: 'process',
        label: `Process: ${trimmed.replace(/;$/, '')}`,
        codeSnippet: trimmed,
        tamilExplanation: `செயல்முறை (Process): '${trimmed.replace(/;$/, '')}' என்ற கணக்கீடு அல்லது மதிப்பு மாற்றத்தை செய்கிறது.`,
        englishExplanation: `Process Execution: Calculates or assigns value '${trimmed.replace(/;$/, '')}'.`,
        lineIndex: idx + 1,
      });
      continue;
    }
  }

  // Ensure an END node exists at the end
  if (nodes.length === 0 || nodes[nodes.length - 1].type !== 'end') {
    nodes.push({
      id: 'node_end',
      type: 'end',
      label: 'END Program',
      codeSnippet: 'return 0;\n}',
      tamilExplanation: 'நிரல் வெற்றிகரமாக முடிந்தது.',
      englishExplanation: 'End of program execution.',
    });
  }

  // Connect adjacent nodes sequentially with Yes/No target IDs
  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i];
    const next = nodes[i + 1];

    if (current.type === 'decision') {
      current.yesTargetId = next.id;
      const noTarget = nodes[i + 2] || nodes[nodes.length - 1];
      current.noTargetId = noTarget.id;
    } else if (current.type === 'loop') {
      current.yesTargetId = next.id;
      current.loopBackTargetId = current.id;
      const exitTarget = nodes[i + 2] || nodes[nodes.length - 1];
      current.noTargetId = exitTarget.id;
    } else {
      current.yesTargetId = next.id;
    }
  }

  return {
    title: 'C Program Logic Flowchart',
    nodes,
    hasBranches,
    hasLoops,
  };
}
