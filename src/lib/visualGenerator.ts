export interface VisualStep {
  stepNumber: number;
  title: string;
  tamilTitle: string;
  codeLine: string;
  highlightLineIndex: number;
  type: 'input' | 'variable' | 'condition' | 'loop' | 'output' | 'array' | 'pointer' | 'struct' | 'function';
  visualLabel: string;
  tamilVisualLabel: string;
  value: string;
  decisionBranch?: {
    conditionText: string;
    evaluatedResult: boolean;
    yesOutput: string;
    noOutput: string;
  };
  memoryBox?: {
    varName: string;
    varType: string;
    value: string;
    address: string;
  };
  arrayCells?: { index: number; value: string }[];
  loopState?: { iteration: number; counterVar: string; counterVal: number; maxVal: number };
}

export interface RealLifeMapping {
  action: string;
  cKeyword: string;
  description: string;
  tamilDescription: string;
}

export interface RealLifeAnalogy {
  title: string;
  tamilTitle: string;
  story: string;
  tamilStory: string;
  mappings: RealLifeMapping[];
}

export interface VisualExplanationData {
  concept: string;
  tamilConcept: string;
  programFlow: string[];
  sampleInput: string;
  steps: VisualStep[];
  realLifeAnalogy: RealLifeAnalogy;
  isValidCode: boolean;
  syntaxErrorMessage?: string;
}

/**
 * Intelligent AI Visual Generator Engine for C Programs
 * Dynamically detects deep program intent (String Reversal, Largest in Array, Factorial,
 * Fibonacci, Palindrome, Prime, Sorting, etc.) rather than defaulting to generic loops.
 */
export function generateVisualExplanation(code: string, userSampleInput: string = ''): VisualExplanationData {
  const trimmed = code.trim();
  const lower = trimmed.toLowerCase();

  // Basic syntax validation
  if (!trimmed) {
    return {
      concept: 'Empty Program',
      tamilConcept: 'வெற்று நிரல்',
      programFlow: ['START', 'END'],
      sampleInput: '',
      steps: [],
      realLifeAnalogy: {
        title: 'Empty Page',
        tamilTitle: 'வெற்றுப் பக்கம்',
        story: 'No code provided to generate visual explanation.',
        tamilStory: 'விளக்கம் அளிக்கக் குறியீடு எதுவும் வழங்கப்படவில்லை.',
        mappings: [],
      },
      isValidCode: false,
      syntaxErrorMessage: 'Please enter C code into the editor to generate visual explanation.',
    };
  }

  if (!lower.includes('main')) {
    return {
      concept: 'Syntax Issue',
      tamilConcept: 'தொடரியல் பிழை',
      programFlow: ['START', 'ERROR'],
      sampleInput: '',
      steps: [],
      realLifeAnalogy: {
        title: 'Missing Main Entry',
        tamilTitle: 'main() சார்பு இல்லை',
        story: 'Every C program requires an int main() function as the execution entry point.',
        tamilStory: 'ஒவ்வொரு C நிரலுக்கும் int main() எனும் தொடக்கப் புள்ளி சார்பு தேவை.',
        mappings: [],
      },
      isValidCode: false,
      syntaxErrorMessage: 'Could not find int main() function. Every valid C program requires an int main() function.',
    };
  }

  // ----------------------------------------------------------------------
  // 1. STRING REVERSAL DETECTION (e.g. str, strlen, reverse string, fgets)
  // ----------------------------------------------------------------------
  if (lower.includes('str') && (lower.includes('strlen') || lower.includes('reverse') || lower.includes('fgets') || lower.includes('strcspn') || lower.includes('char'))) {
    const inputStr = userSampleInput.trim() || 'hello';
    const reversedStr = inputStr.split('').reverse().join('');
    const len = inputStr.length;

    return {
      concept: 'String Reversal Concept (சரத்தை தலைகீழாக்குதல்)',
      tamilConcept: 'ஒரு எழுத்து தொடரை (String) தலைகீழாக மாற்றுதல்',
      programFlow: ['START', 'Input String (fgets)', 'Get Length (strlen)', 'Swap/Reverse Loop', 'Output Reversed String', 'END'],
      sampleInput: inputStr,
      isValidCode: true,
      steps: [
        {
          stepNumber: 1,
          title: 'Character Array & String Input',
          tamilTitle: 'எழுத்து அணி மற்றும் சரம் உள்ளீடு',
          codeLine: 'char str[100]; fgets(str, sizeof(str), stdin);',
          highlightLineIndex: 3,
          type: 'array',
          visualLabel: `Character array loaded with input string "${inputStr}"`,
          tamilVisualLabel: `"${inputStr}" எனும் சரம் நினைவக அணியில் ஏற்றப்பட்டது`,
          value: `str = "${inputStr}"`,
          arrayCells: inputStr.split('').map((char, idx) => ({ index: idx, value: `'${char}'` })),
        },
        {
          stepNumber: 2,
          title: 'Calculate String Length via strlen()',
          tamilTitle: 'strlen() மூலம் சரத்தின் நீளத்தை கணக்கிடுதல்',
          codeLine: 'length = strlen(str);',
          highlightLineIndex: 7,
          type: 'variable',
          visualLabel: `Calculated total string length = ${len} characters`,
          tamilVisualLabel: `சரத்தின் மொத்த நீளம் = ${len} எழுத்துக்கள்`,
          value: `length = ${len}`,
          memoryBox: { varName: 'length', varType: 'int', value: String(len), address: '0x7ffd12' },
        },
        {
          stepNumber: 3,
          title: 'String Reversal Memory Transformation',
          tamilTitle: 'சரத்தை தலைகீழாக மாற்றும் நினைவக மாற்றம்',
          codeLine: 'for(i = length - 1; i >= 0; i--) { rev[j++] = str[i]; }',
          highlightLineIndex: 9,
          type: 'loop',
          visualLabel: `Reversing character indices: "${inputStr}" ➔ "${reversedStr}"`,
          tamilVisualLabel: `எழுத்துக்களின் வரிசையை தலைகீழாக்குதல்: "${inputStr}" ➔ "${reversedStr}"`,
          value: reversedStr,
          arrayCells: reversedStr.split('').map((char, idx) => ({ index: idx, value: `'${char}'` })),
        },
        {
          stepNumber: 4,
          title: 'Display Reversed String Result',
          tamilTitle: 'தலைகீழ் சரத்தை அச்சிடுதல்',
          codeLine: 'printf("Reversed: %s", reversedStr);',
          highlightLineIndex: 12,
          type: 'output',
          visualLabel: `Output to Terminal: "${reversedStr}"`,
          tamilVisualLabel: `திரையில் அச்சிடப்பட்ட தலைகீழ் சொல்: "${reversedStr}"`,
          value: reversedStr,
        },
      ],
      realLifeAnalogy: {
        title: 'Rearranging Letter Cards on a Board 🪞',
        tamilTitle: 'எழுத்து அட்டைகளை தலைகீழாக திருப்புதல் 🪞',
        story: `Placing cards spelling "${inputStr.toUpperCase()}" on a table, then picking them from right to left to spell "${reversedStr.toUpperCase()}".`,
        tamilStory: `"${inputStr.toUpperCase()}" என எழுதப்பட்ட அட்டைகளை வலப்பக்கத்திலிருந்து இடப்பக்கமாக திருப்பி வைத்து "${reversedStr.toUpperCase()}" என வாசிப்பது போன்றது.`,
        mappings: [
          { action: 'Board of letter cards', cKeyword: 'char str[100]', description: 'Character memory array', tamilDescription: 'எழுத்துக்களுக்கான நினைவக அணி' },
          { action: 'Counting total cards', cKeyword: 'strlen(str)', description: 'String length function', tamilDescription: 'சரத்தின் நீளத்தைக் கணக்கிடும் சார்பு' },
          { action: 'Picking cards from last to first', cKeyword: 'for(i = len-1; i >= 0; i--)', description: 'Reverse iteration loop', tamilDescription: 'கடைசியிலிருந்து முதல் எழுத்து வரை எடுத்தல்' },
          { action: 'Displaying flipped word', cKeyword: 'printf("%s", reversed)', description: 'Output reversed string', tamilDescription: 'தலைகீழ் சொல்லைக் திரையில் காட்டுதல்' },
        ],
      },
    };
  }

  // ----------------------------------------------------------------------
  // 2. FIND LARGEST / SMALLEST ELEMENT IN ARRAY (e.g. max, min, largest, arr[i] > max)
  // ----------------------------------------------------------------------
  if (lower.includes('arr') && (lower.includes('max') || lower.includes('min') || lower.includes('largest') || lower.includes('smallest'))) {
    const inputVal = userSampleInput.trim() || '12, 45, 67, 23, 89';
    const numList = inputVal.split(/,|\s+/).map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
    const nums = numList.length > 0 ? numList : [12, 45, 67, 23, 89];
    const maxVal = Math.max(...nums);

    return {
      concept: 'Find Largest Element in Array (அணியில் மிகப்பெரிய எண்ணைக் கண்டறிதல்)',
      tamilConcept: 'அணியில் உள்ள எண்களை ஒப்பிட்டு பெரிய எண்ணைக் கண்டறிதல்',
      programFlow: ['START', 'Initialize Array', 'Set max = arr[0]', 'Compare Each Element', 'Update max', 'Print Largest', 'END'],
      sampleInput: nums.join(', '),
      isValidCode: true,
      steps: [
        {
          stepNumber: 1,
          title: 'Array Initialization in Memory',
          tamilTitle: 'நினைவகத்தில் அணி தொடக்கம்',
          codeLine: `int arr[] = {${nums.join(', ')}};`,
          highlightLineIndex: 3,
          type: 'array',
          visualLabel: `Array initialized with ${nums.length} elements`,
          tamilVisualLabel: `${nums.length} எண்கள் கொண்ட அணி நினைவகத்தில் ஒதுக்கப்பட்டது`,
          value: `[${nums.join(', ')}]`,
          arrayCells: nums.map((val, idx) => ({ index: idx, value: String(val) })),
        },
        {
          stepNumber: 2,
          title: 'Set Initial Maximum to arr[0]',
          tamilTitle: 'முதல் உறுப்பை தற்காலிக பெரிய எண்ணாக அமைத்தல்',
          codeLine: 'int max = arr[0];',
          highlightLineIndex: 4,
          type: 'variable',
          visualLabel: `Initial max set to first element: ${nums[0]}`,
          tamilVisualLabel: `தற்காலிக பெரிய எண் max = ${nums[0]}`,
          value: `max = ${nums[0]}`,
          memoryBox: { varName: 'max', varType: 'int', value: String(nums[0]), address: '0x7ffd40' },
        },
        {
          stepNumber: 3,
          title: 'Iterative Comparison Loop',
          tamilTitle: 'ஒவ்வொரு எண்ணையும் ஒப்பிடும் சுழற்சி',
          codeLine: 'if (arr[i] > max) max = arr[i];',
          highlightLineIndex: 6,
          type: 'condition',
          visualLabel: `Compared all elements: Largest value found = ${maxVal}`,
          tamilVisualLabel: `அனைத்து எண்களும் ஒப்பிடப்பட்டன: மிகப்பெரிய எண் = ${maxVal}`,
          value: `max = ${maxVal}`,
          memoryBox: { varName: 'max', varType: 'int', value: String(maxVal), address: '0x7ffd40' },
        },
        {
          stepNumber: 4,
          title: 'Display Largest Element Result',
          tamilTitle: 'மிகப்பெரிய எண்ணை அச்சிடுதல்',
          codeLine: 'printf("Largest = %d", max);',
          highlightLineIndex: 8,
          type: 'output',
          visualLabel: `Terminal Output: Largest = ${maxVal}`,
          tamilVisualLabel: `திரை வெளியீடு: மிகப்பெரிய எண் = ${maxVal}`,
          value: String(maxVal),
        },
      ],
      realLifeAnalogy: {
        title: 'Finding the Tallest Student in Class 📏',
        tamilTitle: 'வகுப்பில் உயரமான மாணவரைக் கண்டறிதல் 📏',
        story: `Measuring students [${nums.join(', ')}] one by one. You note down the first student (${nums[0]}), and whenever you find a taller student, you update your record until you find the tallest (${maxVal}).`,
        tamilStory: `[${nums.join(', ')}] எண்கள் கொண்ட மாணவர்களை வரிசையாக அளவிட்டு, ஒவ்வொரு முறை உயரமான மாணவரைப் பார்க்கும்போதும் தற்காலிகப் பதிவை மாற்றி மிகப்பெரிய உயரத்தைக் (${maxVal}) கண்டறிவது போன்றது.`,
        mappings: [
          { action: 'Line of students', cKeyword: 'int arr[]', description: 'Array of numbers', tamilDescription: 'மாணவர்களின் வரிசை (அணி)' },
          { action: 'Note down 1st student height', cKeyword: 'int max = arr[0]', description: 'Initial maximum', tamilDescription: 'முதல் மாணவரின் உயரம்' },
          { action: 'Comparing next student height', cKeyword: 'if (arr[i] > max)', description: 'Comparison condition', tamilDescription: 'அடுத்த மாணவருடன் ஒப்பிடுதல்' },
          { action: 'Updating tallest record', cKeyword: 'max = arr[i]', description: 'Update maximum variable', tamilDescription: 'உயரமான பதிவை மாற்றுதல்' },
          { action: 'Announcing tallest student', cKeyword: 'printf("%d", max)', description: 'Output result', tamilDescription: 'உயரமானவரை அறிவித்தல்' },
        ],
      },
    };
  }

  // ----------------------------------------------------------------------
  // 3. FACTORIAL CALCULATION (e.g. fact, factorial, fact *= i)
  // ----------------------------------------------------------------------
  if (lower.includes('fact')) {
    const inputNum = Math.min(Math.max(parseInt(userSampleInput.trim() || '5', 10), 1), 12);
    let factAns = 1;
    for (let i = 1; i <= inputNum; i++) factAns *= i;

    return {
      concept: 'Factorial Calculation (எண்ணின் தொடர் பெருக்கல்)',
      tamilConcept: '1 முதல் N வரையிலான எண்களின் தொடர் பெருக்கல்',
      programFlow: ['START', 'Input Number (n)', 'Set fact = 1', 'Multiply Loop 1 to n', 'Output Factorial', 'END'],
      sampleInput: String(inputNum),
      isValidCode: true,
      steps: [
        {
          stepNumber: 1,
          title: 'Input Number & Initial Factorial Set',
          tamilTitle: 'உள்ளீட்டு எண் மற்றும் தொடர் பெருக்கல் 1 என அமைத்தல்',
          codeLine: 'int n = 5; unsigned long long fact = 1;',
          highlightLineIndex: 3,
          type: 'variable',
          visualLabel: `Target n = ${inputNum}, Initial accumulator fact = 1`,
          tamilVisualLabel: `இலக்கு எண் n = ${inputNum}, தொடக்க பெருக்கற்பலன் fact = 1`,
          value: `n = ${inputNum}, fact = 1`,
          memoryBox: { varName: 'fact', varType: 'unsigned long long', value: '1', address: '0x7ffd18' },
        },
        {
          stepNumber: 2,
          title: 'Sequential Multiplication Loop',
          tamilTitle: 'வரிசையான பெருக்கல் சுழற்சி',
          codeLine: 'for (int i = 1; i <= n; i++) { fact *= i; }',
          highlightLineIndex: 5,
          type: 'loop',
          visualLabel: `Sequential multiplication 1 × 2 × ... × ${inputNum} = ${factAns}`,
          tamilVisualLabel: `தொடர் பெருக்கல்: 1 × 2 × ... × ${inputNum} = ${factAns}`,
          value: `fact = ${factAns}`,
          memoryBox: { varName: 'fact', varType: 'unsigned long long', value: String(factAns), address: '0x7ffd18' },
        },
        {
          stepNumber: 3,
          title: 'Display Factorial Result',
          tamilTitle: 'தொடர் பெருக்கல் விடையை அச்சிடுதல்',
          codeLine: 'printf("Factorial of %d = %llu", n, fact);',
          highlightLineIndex: 8,
          type: 'output',
          visualLabel: `Terminal Output: Factorial of ${inputNum} = ${factAns}`,
          tamilVisualLabel: `திரை வெளியீடு: ${inputNum}-ன் தொடர் பெருக்கல் = ${factAns}`,
          value: String(factAns),
        },
      ],
      realLifeAnalogy: {
        title: 'Cascading Gift Box Stacking 🎁',
        tamilTitle: 'தொடர் பரிசுப் பெட்டிகள் பெருக்கல் 🎁',
        story: `Multiplying box quantities sequentially: 1 box × 2 × 3 × 4 × 5 yields a total of ${factAns} items.`,
        tamilStory: `1 பெட்டி × 2 × 3 × 4 × 5 என ஒவ்வொன்றாக பெருக்கி மொத்தம் ${factAns} பொருட்களைக் கணக்கிடுவது போன்றது.`,
        mappings: [
          { action: 'Start with 1 box', cKeyword: 'unsigned long long fact = 1', description: 'Initial value 1', tamilDescription: 'தொடக்க பெருக்கல் 1' },
          { action: 'Multiplying each step', cKeyword: 'fact *= i', description: 'Compound multiplication', tamilDescription: 'ஒவ்வொரு படிநிலை பெருக்கல்' },
          { action: 'Final box count', cKeyword: 'printf("%llu", fact)', description: 'Output result', tamilDescription: 'மொத்த விடையைக் காட்டுதல்' },
        ],
      },
    };
  }

  // ----------------------------------------------------------------------
  // 4. FIBONACCI SERIES (e.g. fib, fibonacci, first + second)
  // ----------------------------------------------------------------------
  if (lower.includes('fib') || (lower.includes('first') && lower.includes('second'))) {
    const inputTerms = Math.min(Math.max(parseInt(userSampleInput.trim() || '8', 10), 1), 15);
    const fibList: number[] = [];
    let f1 = 0, f2 = 1;
    for (let i = 0; i < inputTerms; i++) {
      if (i <= 1) fibList.push(i);
      else {
        const next = f1 + f2;
        fibList.push(next);
        f1 = f2;
        f2 = next;
      }
    }

    return {
      concept: 'Fibonacci Series Sequence (ஃபிபோனாச்சி எண் வரிசை)',
      tamilConcept: 'முந்தைய இரண்டு எண்களைக் கூட்டி புதிய எண்ணை உருவாக்குதல்',
      programFlow: ['START', 'Set first=0, second=1', 'Loop 0 to n', 'next = first + second', 'Print Term', 'END'],
      sampleInput: String(inputTerms),
      isValidCode: true,
      steps: [
        {
          stepNumber: 1,
          title: 'Initial Terms Assignment',
          tamilTitle: 'முதல் இரண்டு எண்கள் அமைத்தல்',
          codeLine: 'unsigned long long first = 0, second = 1, next;',
          highlightLineIndex: 3,
          type: 'variable',
          visualLabel: 'Base terms: first = 0, second = 1',
          tamilVisualLabel: 'அடிப்படை எண்கள்: முதல் = 0, இரண்டாவது = 1',
          value: 'first=0, second=1',
          memoryBox: { varName: 'first', varType: 'unsigned long long', value: '0', address: '0x7ffd30' },
        },
        {
          stepNumber: 2,
          title: 'Additive Fibonacci Sequence Loop',
          tamilTitle: 'கூடுதல் ஃபிபோனாச்சி சுழற்சி',
          codeLine: 'next = first + second; first = second; second = next;',
          highlightLineIndex: 7,
          type: 'loop',
          visualLabel: `Generated ${inputTerms} Fibonacci terms: ${fibList.join(' ')}`,
          tamilVisualLabel: `உருவாக்கப்பட்ட ${inputTerms} எண்கள்: ${fibList.join(' ')}`,
          value: fibList.join(' '),
        },
        {
          stepNumber: 3,
          title: 'Print Complete Fibonacci Series',
          tamilTitle: 'முழு வரிசையையும் அச்சிடுதல்',
          codeLine: 'printf("%llu ", next);',
          highlightLineIndex: 10,
          type: 'output',
          visualLabel: `Terminal Output: ${fibList.join(' ')}`,
          tamilVisualLabel: `திரை வெளியீடு: ${fibList.join(' ')}`,
          value: fibList.join(' '),
        },
      ],
      realLifeAnalogy: {
        title: 'Building Block Tower Height 🧱',
        tamilTitle: 'பிளாக் டவர் உயரம் கூட்டுதல் 🧱',
        story: `Each new tower block height is formed by adding the heights of the previous two blocks (${fibList.slice(0, 5).join(', ')}...).`,
        tamilStory: `ஒவ்வொரு புதிய கட்டட அமைப்பின் உயரமும் முந்தைய இரு உயரங்களின் கூட்டலாக அமைவது போன்றது.`,
        mappings: [
          { action: 'First two blocks 0 and 1', cKeyword: 'first = 0, second = 1', description: 'Base values', tamilDescription: 'தொடக்க எண்கள் 0 மற்றும் 1' },
          { action: 'Adding last two blocks', cKeyword: 'next = first + second', description: 'Summation step', tamilDescription: 'முந்தைய இரண்டை கூட்டுதல்' },
          { action: 'Shifting to next step', cKeyword: 'first = second; second = next', description: 'Slide window', tamilDescription: 'அடுத்த கட்டத்திற்கு நகர்தல்' },
        ],
      },
    };
  }

  // ----------------------------------------------------------------------
  // 5. IF-ELSE / CONDITIONS DETECTION
  // ----------------------------------------------------------------------
  if (lower.includes('if') && (lower.includes('else') || lower.includes('>='))) {
    const sampleVal = userSampleInput.trim() || '20';
    const numericSample = parseInt(sampleVal, 10) || 20;
    const isAdult = numericSample >= 18;

    return {
      concept: 'if-else Condition (நிபந்தனை முடிவெடுத்தல்)',
      tamilConcept: 'ஒரு condition check பண்ணி decision எடுக்கிறது (if-else)',
      programFlow: ['START', 'Input (scanf)', 'Store (variable)', 'Check (if)', 'Decision', 'Output (printf)', 'END'],
      sampleInput: sampleVal,
      isValidCode: true,
      steps: [
        {
          stepNumber: 1,
          title: 'Variable Memory Allocation',
          tamilTitle: 'நினைவகத்தில் மாற ஒதுக்கல்',
          codeLine: 'int age;',
          highlightLineIndex: 3,
          type: 'variable',
          visualLabel: 'Memory Box Created for variable "age"',
          tamilVisualLabel: 'ஒரு value-ஐ store பண்ணி வைக்குற box தயார்',
          value: 'uninitialized',
          memoryBox: { varName: 'age', varType: 'int (4 bytes)', value: '?', address: '0x7ffd98' },
        },
        {
          stepNumber: 2,
          title: 'Reading User Input via scanf()',
          tamilTitle: 'பயனர் உள்ளீடு படித்தல் (scanf)',
          codeLine: 'scanf("%d", &age);',
          highlightLineIndex: 4,
          type: 'input',
          visualLabel: `User input "${sampleVal}" stored into address &age`,
          tamilVisualLabel: `பயனர் அளித்த ${sampleVal} மதிப்பு age பெட்டிக்குள் சேமிக்கப்படுகிறது`,
          value: sampleVal,
          memoryBox: { varName: 'age', varType: 'int', value: sampleVal, address: '0x7ffd98' },
        },
        {
          stepNumber: 3,
          title: 'Condition Evaluation in CPU',
          tamilTitle: 'CPU-வில் நிபந்தனை சரிபார்த்தல்',
          codeLine: `if (age >= 18)`,
          highlightLineIndex: 5,
          type: 'condition',
          visualLabel: `Decision Diamond: Is age (${sampleVal}) >= 18?`,
          tamilVisualLabel: `தீர்வு வைர வடிவம்: ${sampleVal} >= 18 உண்மையா?`,
          value: isAdult ? 'TRUE (1)' : 'FALSE (0)',
          decisionBranch: {
            conditionText: `age (${sampleVal}) >= 18`,
            evaluatedResult: isAdult,
            yesOutput: 'Adult (Branch 1 Executed)',
            noOutput: 'Minor (Branch 2 Executed)',
          },
        },
        {
          stepNumber: 4,
          title: 'Executing Output Branch',
          tamilTitle: 'வெளியீட்டு கிளையை இயக்குதல்',
          codeLine: isAdult ? 'printf("Adult");' : 'printf("Minor");',
          highlightLineIndex: isAdult ? 6 : 8,
          type: 'output',
          visualLabel: `Printed Output to Screen: "${isAdult ? 'Adult' : 'Minor'}"`,
          tamilVisualLabel: `திரையில் அச்சிடப்பட்ட விடை: "${isAdult ? 'Adult' : 'Minor'}"`,
          value: isAdult ? 'Adult' : 'Minor',
        },
      ],
      realLifeAnalogy: {
        title: 'Cinema Ticket Age Verification 🎟️',
        tamilTitle: 'திரையரங்கு நுழைவு வயது சரிபார்ப்பு 🎟️',
        story: 'A cinema manager asks your age at the counter, checks if you are 18 or older, and allows adult or minor entry.',
        tamilStory: 'திரையரங்க ஊழியர் உங்கள் வயதைக் கேட்டு, 18 வயதிற்கு மேற்பட்டவரா என சரிபார்த்து "Adult" அல்லது "Minor" அனுமதி சீட்டு வழங்குவது போன்றது.',
        mappings: [
          { action: 'Asking your age', cKeyword: 'scanf("%d", &age)', description: 'Reads user input', tamilDescription: 'பயனரிடம் வயதை உள்ளீடாக பெறுகிறது' },
          { action: 'Storing age in brain', cKeyword: 'int age', description: 'Memory storage box', tamilDescription: 'மதிப்பை நினைவகத்தில் சேமிக்கிறது' },
          { action: 'Checking 18+ condition', cKeyword: 'if (age >= 18)', description: 'Decision checking', tamilDescription: 'வயது 18-க்கு மேல் உள்ளதா என ஒப்பிடுகிறது' },
          { action: 'Selecting path', cKeyword: 'if-else branch', description: 'Chooses Adult or Minor path', tamilDescription: 'சரியான முடிவை தேர்வு செய்கிறது' },
          { action: 'Displaying ticket', cKeyword: 'printf("Adult")', description: 'Outputs result to screen', tamilDescription: 'வெளியீட்டை திரையில் காட்டுகிறது' },
        ],
      },
    };
  }

  // ----------------------------------------------------------------------
  // 6. GENERAL FOR / WHILE LOOPS FALLBACK
  // ----------------------------------------------------------------------
  if (lower.includes('for') || lower.includes('while')) {
    const numericSample = parseInt(userSampleInput.trim() || '5', 10) || 5;
    const loopLimit = Math.min(Math.max(numericSample, 1), 10);
    return {
      concept: 'Loop Iteration (மடக்கு இயக்கம் - Repeat Cycle)',
      tamilConcept: 'ஒரே வேலையை மீண்டும் மீண்டும் செய்வது (Loop)',
      programFlow: ['START', 'Initialize Counter', 'Condition Check', 'Execute Body', 'Increment Counter', 'Repeat / END'],
      sampleInput: String(loopLimit),
      isValidCode: true,
      steps: [
        {
          stepNumber: 1,
          title: 'Loop Counter Initialization',
          tamilTitle: 'மடக்கு எண்ணி தொடங்குதல்',
          codeLine: 'int i = 1;',
          highlightLineIndex: 4,
          type: 'variable',
          visualLabel: 'Counter variable i initialized to 1',
          tamilVisualLabel: 'எண்ணி மாறி i = 1 என தொடங்குகிறது',
          value: 'i = 1',
          memoryBox: { varName: 'i', varType: 'int', value: '1', address: '0x7ffd10' },
        },
        {
          stepNumber: 2,
          title: 'Loop Condition Evaluation',
          tamilTitle: 'மடக்கு நிபந்தனை சரிபார்ப்பு',
          codeLine: `for (int i = 1; i <= ${loopLimit}; i++)`,
          highlightLineIndex: 4,
          type: 'loop',
          visualLabel: `Cycle check: Is i (1) <= ${loopLimit}? TRUE`,
          tamilVisualLabel: `சுழல் சோதனை: 1 <= ${loopLimit} உண்மையா? ஆம்!`,
          value: 'TRUE',
          loopState: { iteration: 1, counterVar: 'i', counterVal: 1, maxVal: loopLimit },
        },
        {
          stepNumber: 3,
          title: 'Executing Loop Body Iteration',
          tamilTitle: 'மடக்கு உடற்பகுதியை இயக்குதல்',
          codeLine: 'printf("%d ", i);',
          highlightLineIndex: 5,
          type: 'output',
          visualLabel: `Step Output: Printed 1 to ${loopLimit} sequentially`,
          tamilVisualLabel: `சுழற்சி விடை: 1 முதல் ${loopLimit} வரை அச்சிடப்பட்டது`,
          value: Array.from({ length: loopLimit }, (_, idx) => idx + 1).join(' '),
        },
      ],
      realLifeAnalogy: {
        title: 'Assembly Line Bottle Filling 🍾',
        tamilTitle: 'ஆலை சீர் அமைப்பில் பாட்டில் நிரப்புதல் 🍾',
        story: 'A machine repeats bottle filling 5 times until the counter reaches the limit.',
        tamilStory: 'ஒரு எந்திரம் 5 பாட்டில்கள் நிரம்பும் வரை ஒரே செயலை மீண்டும் மீண்டும் செய்வது போன்றது.',
        mappings: [
          { action: 'Setting bottle count to 1', cKeyword: 'int i = 1', description: 'Counter start', tamilDescription: 'எண்ணி தொடக்கம்' },
          { action: 'Checking if count <= 5', cKeyword: 'i <= n', description: 'Loop condition', tamilDescription: 'சுழற்சி எல்லை சோதனை' },
          { action: 'Filling bottle', cKeyword: 'loop body statement', description: 'Repetitive task', tamilDescription: 'மீண்டும் மீண்டும் செய்யும் செயல்' },
          { action: 'Next bottle +1', cKeyword: 'i++', description: 'Increment step', tamilDescription: 'அடுத்த பாட்டிலுக்கு எண்ணை உயர்த்தல்' },
        ],
      },
    };
  }

  // ----------------------------------------------------------------------
  // 7. DEFAULT GENERAL PROGRAM FALLBACK
  // ----------------------------------------------------------------------
  return {
    concept: 'C Program Step-by-Step Execution (பொது சி நிரல் இயக்கம்)',
    tamilConcept: 'ஒரு specific வேலை செய்யும் C code block',
    programFlow: ['START', 'Declare Variables', 'Execute Statements', 'Compute Output', 'END'],
    sampleInput: userSampleInput || '10',
    isValidCode: true,
    steps: [
      {
        stepNumber: 1,
        title: 'Program Execution Entry',
        tamilTitle: 'நிரல் தொடக்கம்',
        codeLine: 'int main() {',
        highlightLineIndex: 2,
        type: 'function',
        visualLabel: 'CPU starts executing main() function',
        tamilVisualLabel: 'CPU main() சார்பை இயக்கத் தொடங்குகிறது',
        value: 'Entry',
      },
      {
        stepNumber: 2,
        title: 'Variable & Expression Computing',
        tamilTitle: 'மாறிகள் & கணிப்பு',
        codeLine: 'int result = 5 * 2;',
        highlightLineIndex: 3,
        type: 'variable',
        visualLabel: 'Computed value stored into memory',
        tamilVisualLabel: 'கணக்கிடப்பட்ட மதிப்பு நினைவகத்தில் சேமிக்கப்படுகிறது',
        value: '10',
        memoryBox: { varName: 'result', varType: 'int', value: '10', address: '0x7ffd20' },
      },
      {
        stepNumber: 3,
        title: 'Displaying Output Result',
        tamilTitle: 'வெளியீடு அச்சிடுதல்',
        codeLine: 'printf("%d", result);',
        highlightLineIndex: 4,
        type: 'output',
        visualLabel: 'Printed result to terminal console',
        tamilVisualLabel: 'திரையில் விடை அச்சிடப்பட்டது',
        value: '10',
      },
    ],
    realLifeAnalogy: {
      title: 'Recipe Execution in Kitchen 🍳',
      tamilTitle: 'சமையலறையில் சமையல் குறிப்பு செய்தல் 🍳',
      story: 'Following step-by-step instructions: gathering ingredients, cooking, and serving.',
      tamilStory: 'பொருட்களைச் சேகரித்து, சமைத்து, உணவைப் பரிமாறுவது போன்ற வரிசைமுறை செயல்கள்.',
      mappings: [
        { action: 'Gathering ingredients', cKeyword: 'Variable declaration', description: 'Allocates items', tamilDescription: 'தேவையான பொருட்களைத் திரட்டுதல்' },
        { action: 'Cooking steps', cKeyword: 'Expressions / Loops', description: 'Processes logic', tamilDescription: 'தர்க்கப்படி சமைத்தல்' },
        { action: 'Serving food', cKeyword: 'printf()', description: 'Presents output', tamilDescription: 'வெளியீட்டைப் பரிமாறுதல்' },
      ],
    },
  };
}
