import type {
  KathaiStory,
  KathaiStoryStep,
  KathaiDiagramType,
  KathaiClassItem,
  KathaiVariableItem,
  KathaiObjectItem,
} from '@/types/kathaiAi';

/**
 * Intelligent Kathai-AI Engine
 * Parses raw C or Java code and generates an interactive, animated visual story
 * complete with Kavi & Buddy dialogues in Tamil & English, dynamic memory maps,
 * and visual execution diagrams.
 */
export function generateKathaiStory(code: string, language: 'c' | 'java' = 'java'): KathaiStory {
  const cleanCode = code || (language === 'java'
    ? `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Vanakkam CodeKathai!");\n    }\n}`
    : `#include <stdio.h>\nint main() {\n    printf("Vanakkam CodeKathai!\\n");\n    return 0;\n}`);

  const lines = cleanCode.split('\n');

  // Extract key code structural insights
  const classes: KathaiClassItem[] = [];
  const variables: KathaiVariableItem[] = [];
  const objects: KathaiObjectItem[] = [];
  const printStatements: string[] = [];
  let hasLoop = false;
  let loopCondition = '';
  let hasIfElse = false;

  // Regex Parsers for C & Java
  const classRegex = /(?:public\s+)?class\s+([A-Za-z0-9_]+)(?:\s+extends\s+([A-Za-z0-9_]+))?(?:\s+implements\s+([A-Za-z0-9_,\s]+))?/;
  const varRegex = /(?:int|float|double|char|boolean|String|long)\s+([A-Za-z0-9_]+)\s*=\s*([^;]+);/;
  const objRegex = /([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)\s*=\s*new\s+([A-Za-z0-9_]+)\(/;
  const printJavaRegex = /System\.out\.print(?:ln)?\(([^)]+)\)/;
  const printCRegex = /printf\s*\(([^)]+)\)/;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // 1. Detect Class Declarations & Inheritance
    const classMatch = trimmed.match(classRegex);
    if (classMatch && classMatch[1] !== 'Main') {
      const className = classMatch[1];
      const parent = classMatch[2];
      const interfaces = classMatch[3] ? classMatch[3].split(',').map((s) => s.trim()) : undefined;
      classes.push({ name: className, parent, interfaces });
    }

    // 2. Detect Variable Declarations
    const varMatch = trimmed.match(varRegex);
    if (varMatch) {
      variables.push({
        name: varMatch[1],
        value: varMatch[2].replace(/"/g, '').trim(),
        type: trimmed.split(/\s+/)[0],
      });
    }

    // 3. Detect Object Instantiation
    const objMatch = trimmed.match(objRegex);
    if (objMatch) {
      objects.push({
        name: objMatch[2],
        className: objMatch[3],
        address: `0x${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`,
      });
    }

    // 4. Detect Loops & Conditionals
    if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
      hasLoop = true;
      loopCondition = trimmed;
    }
    if (trimmed.startsWith('if') || trimmed.startsWith('else')) {
      hasIfElse = true;
    }

    // 5. Detect Print Outputs
    const printMatch = language === 'java' ? trimmed.match(printJavaRegex) : trimmed.match(printCRegex);
    if (printMatch) {
      const rawText = printMatch[1].replace(/"/g, '').replace(/\\n/g, '').trim();
      printStatements.push(rawText);
    }
  });

  const steps: KathaiStoryStep[] = [];
  let stepIndex = 1;

  // STEP 1: Entry Point Execution
  const entryLineIndex = lines.findIndex((l) => l.includes('main')) + 1 || 1;
  const entryCodeSnippet = lines[entryLineIndex - 1] || (language === 'java' ? 'public static void main(String[] args)' : 'int main()');

  steps.push({
    stepNumber: stepIndex++,
    lineIndex: Math.max(1, entryLineIndex),
    codeSnippet: entryCodeSnippet.trim(),
    speaker: 'kavi',
    speakerTitle: 'Kavi (மாணவர்)',
    dialogue: `வணக்கம் Buddy! இந்த ${language.toUpperCase()} நிரல் எவ்வாறு தனது இயக்கத்தைத் தொடங்குகிறது?`,
    tamilExplanation: `கணினி எஞ்சின் முதன்முதலில் main() நுழைவுப் புள்ளியைக் கண்டறிந்து நினைவகத்தை ஆயத்தப்படுத்துகிறது.`,
    englishExplanation: `The runtime engine locates the main() entry point and initializes the execution environment.`,
    diagramType: 'generic',
    diagramMeta: {
      title: `⚡ ${language.toUpperCase()} Execution Engine Startup`,
      subtitle: `Main Thread Initialized at Line ${entryLineIndex}`,
    },
  });

  // STEP 2: Inheritance & Class Structure (if OOP detected)
  if (classes.length > 0) {
    const mainClass = classes[0];
    let diagramType: KathaiDiagramType = 'class-object';

    if (mainClass.parent && mainClass.interfaces) {
      diagramType = 'hybrid-inheritance';
    } else if (mainClass.interfaces && mainClass.interfaces.length > 1) {
      diagramType = 'multiple-inheritance';
    } else if (mainClass.parent) {
      diagramType = 'single-inheritance';
    }

    const classLineIndex = lines.findIndex((l) => l.includes(`class ${mainClass.name}`)) + 1 || 2;
    const classSnippet = lines[classLineIndex - 1] || `class ${mainClass.name}`;

    steps.push({
      stepNumber: stepIndex++,
      lineIndex: Math.max(1, classLineIndex),
      codeSnippet: classSnippet.trim(),
      speaker: 'buddy',
      speakerTitle: 'Buddy (AI வழிகாட்டி)',
      dialogue: `இங்கே '${mainClass.name}' என்ற வகுப்பு உருவாக்கப்பட்டுள்ளது! ${
        mainClass.parent ? `'${mainClass.parent}' தாய் வகுப்பிலிருந்து பண்புகளை மரபுரிமையாக பெறுகிறது.` : 'இது ஒரு புதிய ஆப்ஜெக்ட் வரைபடமாகும் (Class Blueprint).'
      }`,
      tamilExplanation: `${mainClass.name} வகுப்பு வரையறை. தாய் வகுப்பு: ${mainClass.parent || 'None'}. இடைமுகங்கள்: ${mainClass.interfaces?.join(', ') || 'None'}.`,
      englishExplanation: `Class definition for ${mainClass.name}. Inherits from ${mainClass.parent || 'Base Object'}.`,
      diagramType,
      diagramMeta: {
        title: `🏛️ Class Architecture: ${mainClass.name}`,
        classes,
      },
    });
  }

  // STEP 3: Variable Declarations & Stack Allocation
  if (variables.length > 0) {
    const varLineIndex = lines.findIndex((l) => l.includes(variables[0].name)) + 1 || 3;
    const varSnippet = lines[varLineIndex - 1] || `${variables[0].type} ${variables[0].name} = ${variables[0].value};`;

    steps.push({
      stepNumber: stepIndex++,
      lineIndex: Math.max(1, varLineIndex),
      codeSnippet: varSnippet.trim(),
      speaker: 'kavi',
      speakerTitle: 'Kavi (மாணவர்)',
      dialogue: `Buddy, '${variables[0].name} = ${variables[0].value}' என்ற மாறியின் மதிப்பு நினைவகத்தில் எப்படி சேமிக்கப்படுகிறது?`,
      tamilExplanation: `Stack RAM நினைவகப் பெட்டியில் '${variables[0].name}' எனும் பெயர் கொண்ட நினைவகக் கூடத்தில் '${variables[0].value}' மதிப்பு பதியப்படுகிறது.`,
      englishExplanation: `Variable '${variables[0].name}' of type '${variables[0].type}' is allocated in Stack memory with value '${variables[0].value}'.`,
      diagramType: 'variables',
      diagramMeta: {
        title: `📦 Stack Memory Variable Allocation`,
        variables,
      },
    });
  }

  // STEP 4: Object Creation & Heap Allocation
  if (objects.length > 0) {
    const objLineIndex = lines.findIndex((l) => l.includes(objects[0].name)) + 1 || 4;
    const objSnippet = lines[objLineIndex - 1] || `${objects[0].className} ${objects[0].name} = new ${objects[0].className}();`;

    steps.push({
      stepNumber: stepIndex++,
      lineIndex: Math.max(1, objLineIndex),
      codeSnippet: objSnippet.trim(),
      speaker: 'buddy',
      speakerTitle: 'Buddy (AI வழிகாட்டி)',
      dialogue: `'new ${objects[0].className}()' என அழைத்ததும், Heap RAM-ல் ஒரு புதிய ஆப்ஜெக்ட் உருவாகி, அதன் முகவரி (${objects[0].address}) Stack மாறிக்கு வழங்கப்படுகிறது!`,
      tamilExplanation: `Heap நினைவகத்தில் '${objects[0].className}' ஆப்ஜெக்ட் உருவாக்கப்பட்டு Stack reference மூலம் இணைக்கப்படுகிறது.`,
      englishExplanation: `Dynamic Object of class '${objects[0].className}' instantiated in Heap memory at address '${objects[0].address}'.`,
      diagramType: 'class-object',
      diagramMeta: {
        title: `🏔️ Heap Memory Object Instantiation`,
        objects,
      },
    });
  }

  // STEP 5: Loop / Control Flow Logic (if present)
  if (hasLoop) {
    const loopLineIndex = lines.findIndex((l) => l.includes('for') || l.includes('while')) + 1 || 4;
    const loopSnippet = lines[loopLineIndex - 1] || loopCondition;

    steps.push({
      stepNumber: stepIndex++,
      lineIndex: Math.max(1, loopLineIndex),
      codeSnippet: loopSnippet.trim(),
      speaker: 'kavi',
      speakerTitle: 'Kavi (மாணவர்)',
      dialogue: `இந்த மடக்கு (Loop) எவ்வாறு மீண்டும் மீண்டும் இயங்குகிறது?`,
      tamilExplanation: `மடக்கின் நிபந்தனை சரி பார்க்கும் வரை நிரல் தொடர்ச்சியாக மீண்டும் மீண்டும் சுழன்று இயங்கும்.`,
      englishExplanation: `Loop evaluates condition sequentially until completion requirement is met.`,
      diagramType: 'loop-execution',
      diagramMeta: {
        title: `🔄 Loop Control Execution Flow`,
        loopInfo: { iteration: 1, condition: loopCondition, variableState: 'i = 0 (Condition True)' },
      },
    });
  }

  // STEP 6: Console Output Stream
  const outputText = printStatements.length > 0 ? printStatements.join('\n') : (language === 'java' ? 'Vanakkam CodeKathai!' : 'Program Completed');
  const printLineIndex = lines.findIndex((l) => l.includes('print')) + 1 || lines.length;
  const printSnippet = lines[printLineIndex - 1] || (language === 'java' ? `System.out.println("${outputText}");` : `printf("${outputText}\\n");`);

  steps.push({
    stepNumber: stepIndex++,
    lineIndex: Math.max(1, printLineIndex),
    codeSnippet: printSnippet.trim(),
    speaker: 'buddy',
    speakerTitle: 'Buddy (AI வழிகாட்டி)',
    dialogue: `வெற்றிகரமாக நிரல் முடிந்தது! கணினித் திரையில் கன்சோல் வெளியீடு (Output) அச்சிடப்படுகிறது: "${outputText}"!`,
    tamilExplanation: `கணினி கன்சோல் திரையில் இறுதி முடிவு அச்சிடப்பட்டது.`,
    englishExplanation: `Program output flushed to standard output console successfully.`,
    diagramType: 'console-io',
    diagramMeta: {
      title: `🖥️ Console Standard Output Stream`,
      consoleOutput: outputText,
    },
  });

  return {
    title: language === 'java' ? '☕ Java Visual Storybook' : '⚡ C Code Execution Storybook',
    tamilTitle: language === 'java' ? '☕ ஜாவா நிரல் கதை விளக்கம்' : '⚡ C நிரல் கதை விளக்கம்',
    summary: `${steps.length} படிநிலைகளில் உருவாக்கப்பட்டுள்ள நேரடி கதை விளக்கம்.`,
    language,
    totalSteps: steps.length,
    steps,
  };
}
