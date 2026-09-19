import { parseCToFlowchart, type FlowchartGraph, type FlowchartNode } from './cFlowchartParser';
export type { FlowchartGraph, FlowchartNode };

/**
 * Parses Java source code string into structured Flowchart Graph
 */
export function parseJavaToFlowchart(javaCode: string): FlowchartGraph {
  const lines = javaCode.split('\n');
  const nodes: FlowchartNode[] = [];

  // 1. Always start with START Node
  nodes.push({
    id: 'node_start',
    type: 'start',
    label: 'START main()',
    codeSnippet: 'public static void main(String[] args) {',
    tamilExplanation: 'Java நிரலின் தொடக்கம் - main() முறைமை தொடங்குகிறது.',
    englishExplanation: 'Entry point of Java JVM execution (main method).',
  });

  let nodeCounter = 1;
  let hasBranches = false;
  let hasLoops = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Skip empty lines or pure comment lines
    if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) {
      continue;
    }

    const nodeId = `node_${nodeCounter++}`;

    // 2. Scanner Input
    if (line.includes('Scanner') || line.includes('scanner.next')) {
      nodes.push({
        id: nodeId,
        type: 'input',
        label: `INPUT: Scanner Read`,
        codeSnippet: line,
        tamilExplanation: 'Scanner மூலம் பயனரிடமிருந்து உள்ளீடு பெறப்படுகிறது.',
        englishExplanation: 'Reading user input from System.in using Scanner.',
        lineIndex: i + 1,
      });
      continue;
    }

    // 3. System.out.println Output
    if (line.includes('System.out.print')) {
      const matchStr = line.match(/System\.out\.print(ln)?\s*\((.*)\);/);
      const printContent = matchStr ? matchStr[2] : line;
      nodes.push({
        id: nodeId,
        type: 'output',
        label: `PRINT: ${printContent.length > 25 ? printContent.slice(0, 22) + '...' : printContent}`,
        codeSnippet: line,
        tamilExplanation: 'முனையத்தில் வெளியீடு அச்சிடப்படுகிறது.',
        englishExplanation: 'Printing output string or variable to stdout terminal.',
        lineIndex: i + 1,
      });
      continue;
    }

    // 4. If Decision
    if (line.startsWith('if')) {
      hasBranches = true;
      const condMatch = line.match(/if\s*\(([^)]+)\)/);
      const cond = condMatch ? condMatch[1] : 'condition';

      nodes.push({
        id: nodeId,
        type: 'decision',
        label: `IF (${cond}) ?`,
        codeSnippet: line,
        tamilExplanation: `நிபந்தனை சோதனை: (${cond}) சரியா?`,
        englishExplanation: `Conditional evaluation: checks if (${cond}) is true or false.`,
        yesTargetId: `node_${nodeCounter}`,
        noTargetId: `node_${nodeCounter + 1}`,
        lineIndex: i + 1,
      });
      continue;
    }

    // 5. For / While Loop
    if (line.startsWith('for') || line.startsWith('while')) {
      hasLoops = true;
      const loopMatch = line.match(/(?:for|while)\s*\(([^)]+)\)/);
      const loopCond = loopMatch ? loopMatch[1] : 'loop condition';

      nodes.push({
        id: nodeId,
        type: 'loop',
        label: `LOOP (${loopCond})`,
        codeSnippet: line,
        tamilExplanation: `மடக்கு சோதனை: (${loopCond}) தொடர்கிறது.`,
        englishExplanation: `Loop condition check: executes loop body while (${loopCond}) holds true.`,
        lineIndex: i + 1,
      });
      continue;
    }

    // 6. Variable Declarations / Reassignments / Object Declarations
    if (
      line.match(/^(int|double|float|boolean|String|char|[A-Z]\w*)\s+[a-zA-Z_]\w*/) ||
      line.includes('new ') ||
      line.includes('=')
    ) {
      if (!line.startsWith('public class') && !line.startsWith('public static void main')) {
        nodes.push({
          id: nodeId,
          type: 'process',
          label: `PROCESS: ${line.length > 30 ? line.slice(0, 27) + '...' : line}`,
          codeSnippet: line,
          tamilExplanation: 'மாறி உருவாக்கம் அல்லது நினைவக கணித செயல்முறை.',
          englishExplanation: 'Variable assignment, expression calculation, or object allocation.',
          lineIndex: i + 1,
        });
        continue;
      }
    }

    // 7. Return Statement
    if (line.startsWith('return')) {
      nodes.push({
        id: nodeId,
        type: 'process',
        label: `RETURN: ${line}`,
        codeSnippet: line,
        tamilExplanation: 'முறைமையின் முடிவில் மதிப்பு திருப்பியனுப்பப்படுகிறது.',
        englishExplanation: 'Method execution complete, returning value to caller.',
        lineIndex: i + 1,
      });
      continue;
    }
  }

  // 8. Always end with END Node
  nodes.push({
    id: 'node_end',
    type: 'end',
    label: 'END (Program Finish)',
    codeSnippet: '}',
    tamilExplanation: 'Java நிரலின் நிறைவு - JVM இயக்கம் முடிவடைகிறது.',
    englishExplanation: 'Program execution completed successfully.',
  });

  return {
    title: 'Java Execution Flowchart',
    nodes,
    hasBranches,
    hasLoops,
  };
}

/**
 * Universal Unified Parser: Dispatches to C or Java flowchart parser based on language
 */
export function parseCodeToFlowchart(language: 'c' | 'java', code: string): FlowchartGraph {
  if (language === 'java') {
    return parseJavaToFlowchart(code);
  }
  // Default to C Flowchart Parser
  return parseCToFlowchart(code);
}
