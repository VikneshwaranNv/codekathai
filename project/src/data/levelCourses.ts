import type { Lesson, Module, CodePart } from '@/data/course';

const c = (text: string, tone: CodePart['tone'] = 'plain'): CodePart => ({ text, tone });

export interface LevelModule extends Module {
  level: 'intermediate' | 'advanced';
}

export interface LevelLesson extends Lesson {
  level: 'intermediate' | 'advanced';
}

/* ===================== INTERMEDIATE MODULES ===================== */

export const intermediateModules: LevelModule[] = [
  {
    id: 'variables',
    index: 1,
    title: 'Variables Deep Dive',
    tamilTitle: 'மாறிகள் ஆழமாக',
    icon: 'Box',
    description: 'Scope, lifetime, storage classes, and type casting — go beyond the basics.',
    progress: 0,
    level: 'intermediate',
    topics: [
      { id: 'scope', title: 'Variable Scope', tamilTitle: 'மாறி நோக்கு' },
      { id: 'storage-classes', title: 'Storage Classes', tamilTitle: 'சேமிப்பு வகுப்புகள்' },
      { id: 'type-casting', title: 'Type Casting', tamilTitle: 'வகை மாற்றம்' },
    ],
  },
  {
    id: 'loops',
    index: 2,
    title: 'Advanced Loops & Patterns',
    tamilTitle: 'மேம்பட்ட மடக்குகள்',
    icon: 'Repeat',
    description: 'Nested loops, pattern printing, break/continue, and loop optimization.',
    progress: 0,
    level: 'intermediate',
    topics: [
      { id: 'nested-loops', title: 'Nested Loops', tamilTitle: 'உள்ளமை மடக்குகள்' },
      { id: 'pattern-printing', title: 'Pattern Printing', tamilTitle: 'முறை அச்சிடல்' },
      { id: 'break-continue', title: 'Break & Continue', tamilTitle: 'நிறுத்தம் & தொடர்' },
    ],
  },
  {
    id: 'functions',
    index: 3,
    title: 'Functions Mastery',
    tamilTitle: 'சார்புகள் தேர்ச்சி',
    icon: 'Cog',
    description: 'Recursion, pass by value vs reference, function pointers, and modular design.',
    progress: 0,
    level: 'intermediate',
    topics: [
      { id: 'recursion', title: 'Recursion', tamilTitle: 'மீள்பாடு' },
      { id: 'pass-by-reference', title: 'Pass by Reference', tamilTitle: 'குறிப்பு மூலம் கடத்தல்' },
      { id: 'function-pointers', title: 'Function Pointers', tamilTitle: 'சார்பு சுட்டிகள்' },
    ],
  },
  {
    id: 'arrays',
    index: 4,
    title: 'Arrays & Strings',
    tamilTitle: 'வரிசைகள் & சரங்கள்',
    icon: 'Grid3x3',
    description: '2D arrays, string manipulation, searching, and sorting algorithms.',
    progress: 0,
    level: 'intermediate',
    topics: [
      { id: '2d-arrays', title: '2D Arrays', tamilTitle: 'இருபரிமாண வரிசைகள்' },
      { id: 'string-manipulation', title: 'String Manipulation', tamilTitle: 'சரம் கையாளல்' },
      { id: 'searching-sorting', title: 'Searching & Sorting', tamilTitle: 'தேடல் & வரிசையாக்கம்' },
    ],
  },
  {
    id: 'pointers',
    index: 5,
    title: 'Pointers & Memory',
    tamilTitle: 'சுட்டிகள் & நினைவகம்',
    icon: 'MapPin',
    description: 'Pointer arithmetic, dynamic memory, pointer to pointer, and memory safety.',
    progress: 0,
    level: 'intermediate',
    topics: [
      { id: 'pointer-arithmetic', title: 'Pointer Arithmetic', tamilTitle: 'சுட்டி கணிதம்' },
      { id: 'dynamic-memory', title: 'Dynamic Memory', tamilTitle: 'மாறும் நினைவகம்' },
      { id: 'pointer-safety', title: 'Pointer Safety', tamilTitle: 'சுட்டி பாதுகாப்பு' },
    ],
  },
];

/* ===================== INTERMEDIATE LESSONS ===================== */

export const intermediateLessons: LevelLesson[] = [
  {
    id: 'scope',
    moduleId: 'variables',
    level: 'intermediate',
    title: 'Variable Scope',
    tamilTitle: 'மாறி நோக்கு',
    duration: 12,
    xp: 80,
    concept:
      'Scope decides where a variable is visible in your program. Local variables exist only inside their function or block. Global variables are visible everywhere — but they are risky because any function can change them.',
    tamilExplanation:
      'Scope என்பது variable எங்க தெரியும் ன்னு decide பண்றது. Local variable அந்த function-க்குள்ள மட்டும் தெரியும். Global variable எல்லா இடத்துலயும் தெரியும் — ஆனா யார் வேணும்னாலும் மாத்தலாம், அதனால கவனமா இருக்கணும்.',
    realLife: {
      title: 'Office Access Cards',
      body:
        'In an office, a junior employee has access only to their floor (local scope). The CEO has access to every floor (global scope). But if the CEO leaves their master key on a desk, anyone can grab it — that is the danger of globals. Prefer local access whenever possible.',
    },
    contentSections: [
      {
        heading: 'Types of Scope',
        items: [
          'Local scope: declared inside a function or block — visible only there',
          'Global scope: declared outside all functions — visible everywhere',
          'Block scope: declared inside { } — visible only within that block',
        ],
      },
      {
        heading: 'Why Scope Matters',
        items: [
          'Local variables are safer — they cannot be changed by accident from another function',
          'Global variables are convenient but dangerous — bugs are hard to trace',
          'Smaller scope = fewer bugs, easier to understand code',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'), c(' ', 'plain'), c('globalCount', 'name'), c(' = ', 'punct'), c('0', 'value'), c(';', 'punct'),
        c('  // global\n', 'comment'),
        c('void', 'type'), c(' ', 'plain'), c('count', 'name'), c('() {\n  ', 'punct'),
        c('int', 'type'), c(' ', 'plain'), c('local', 'name'), c(' = ', 'punct'), c('1', 'value'), c(';', 'punct'),
        c('  // local\n', 'comment'),
        c('  ', 'plain'), c('globalCount', 'name'), c('++;', 'punct'), c('  // can see global\n', 'comment'),
        c('}', 'punct'),
      ],
      explanation: [
        { token: 'globalCount', meaning: 'Global — visible in every function, but risky' },
        { token: 'local', meaning: 'Local — visible only inside count(), safer' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'நான் ஒரு function-ல variable உருவாக்கினா, அத வேற function-ல பார்க்க முடியுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'முடியாது! அது local variable. அந்த function-க்குள்ள மட்டும் தான் தெரியும். இது ஒரு safety feature.',
        code: [c('void', 'type'), c(' foo() {\n  ', 'punct'), c('int', 'type'), c(' x', 'name'), c(' = ', 'punct'), c('5', 'value'), c(';\n}\n', 'punct'), c('// x is gone here', 'comment')],
        caption: 'x only lives inside foo()',
      },
      {
        id: 3,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'அப்போ எல்லா function-லயும் ஒரே variable வேணும்னா?',
      },
      {
        id: 4,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'Global variable வைக்கலாம் — function-க்கு வெளிய இருக்கணும். ஆனா கவனம்! யார் வேணும்னாலும் மாத்தலாம்:',
        code: [c('int', 'type'), c(' counter', 'name'), c(' = ', 'punct'), c('0', 'value'), c(';', 'punct'), c('  // global\n', 'comment'), c('void', 'type'), c(' inc() { counter++; }', 'punct')],
        caption: 'Global — visible everywhere, but risky',
      },
      {
        id: 5,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'generic',
        dialogue: 'அப்போ global பயன்படுத்தாம இருக்க முடியுமா?',
      },
      {
        id: 6,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'முடியும்! Function-க்கு parameter குடுத்து value கடத்தலாம். Local variable use பண்றது தான் best practice — bug வர வாய்ப்பு குறைவு!',
      },
    ],
    practice: {
      question: 'A variable declared inside a function is called?',
      options: ['Global variable', 'Local variable', 'Static variable', 'Constant'],
      answerIndex: 1,
      explanation: 'Variables declared inside a function are local — visible only within that function, which makes them safer.',
    },
    challenge: {
      title: 'Spot the scope',
      prompt: 'Declare a local variable called count inside main and set it to 10.',
      starter: 'int main() {\n  ___ count = ___;\n}',
      hint: 'Use int inside the function body',
      expected: 'int main() {\n  int count = 10;\n}',
    },
  },
  {
    id: 'nested-loops',
    moduleId: 'loops',
    level: 'intermediate',
    title: 'Nested Loops',
    tamilTitle: 'உள்ளமை மடக்குகள்',
    duration: 14,
    xp: 90,
    concept:
      'A nested loop is a loop inside another loop. The inner loop runs completely for every single iteration of the outer loop. This is how you build 2D patterns, process tables, and work with grids.',
    tamilExplanation:
      'Nested loop என்பது loop-க்குள் இன்னொரு loop. Outer loop ஒரு முறை ஓடும்போது, inner loop முழுசா ஓடும். இது தான் 2D patterns, tables, grids-க்கு அடிப்படை.',
    realLife: {
      title: 'Stadium Seating',
      body:
        'Think of a stadium with rows and seats. To find a person, you walk each row (outer loop) and check every seat in that row (inner loop). The outer loop moves row by row; the inner loop scans every seat in the current row before moving to the next row.',
    },
    contentSections: [
      {
        heading: 'How Nested Loops Work',
        items: [
          'The outer loop runs once per iteration',
          'For each outer iteration, the inner loop runs completely from start to end',
          'Total iterations = outer count × inner count',
          'If outer runs 5 times and inner runs 5 times, the inner body executes 25 times',
        ],
      },
      {
        heading: 'Common Use Cases',
        items: [
          'Printing 2D patterns (stars, numbers, pyramids)',
          'Iterating through 2D arrays (rows and columns)',
          'Matrix multiplication and table generation',
        ],
      },
    ],
    code: {
      parts: [
        c('for', 'keyword'), c(' (', 'punct'), c('int', 'type'), c(' ', 'plain'), c('i', 'name'), c(' = ', 'punct'), c('1', 'value'), c('; ', 'punct'), c('i', 'name'), c(' <= ', 'punct'), c('3', 'value'), c('; ', 'punct'), c('i', 'name'), c('++) {\n', 'punct'),
        c('  for', 'keyword'), c(' (', 'punct'), c('int', 'type'), c(' ', 'plain'), c('j', 'name'), c(' = ', 'punct'), c('1', 'value'), c('; ', 'punct'), c('j', 'name'), c(' <= ', 'punct'), c('3', 'value'), c('; ', 'punct'), c('j', 'name'), c('++)\n    ', 'punct'),
        c('printf', 'name'), c('(', 'punct'), c('"* "', 'value'), c(');\n', 'punct'),
        c('  ', 'plain'), c('printf', 'name'), c('(', 'punct'), c('"\\n"', 'value'), c(');\n', 'punct'),
        c('}', 'punct'),
      ],
      explanation: [
        { token: 'outer for (i)', meaning: 'Controls rows — runs 3 times' },
        { token: 'inner for (j)', meaning: 'Controls columns — runs 3 times per row' },
        { token: 'printf("* ")', meaning: 'Prints a star for each column' },
        { token: 'printf("\\n")', meaning: 'New line after each row' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'repeat',
        dialogue: 'Stadium-ல ரெண்டு மாடி இருக்கு. ஒவ்வொரு மாடியும் 50 வரிசை, ஒவ்வொரு வரிசையும் 20 இருக்கை. எப்படி தேடுவது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'repeat',
        dialogue: 'Nested loop! Outer loop ஒவ்வொரு வரிசையையும் பார்க்கும். Inner loop ஒவ்வொரு வரிசையில ஒவ்வொரு இருக்கையையும் பார்க்கும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது பாரு — 3x3 grid print ஆகுது:',
        code: [
          c('for', 'keyword'), c(' (int i = ', 'punct'), c('1', 'value'), c('; i <= ', 'punct'), c('3', 'value'), c('; i++) {\n', 'punct'),
          c('  for', 'keyword'), c(' (int j = ', 'punct'), c('1', 'value'), c('; j <= ', 'punct'), c('3', 'value'), c('; j++)\n', 'punct'),
          c('    printf', 'name'), c('("* "', 'value'), c(');\n', 'punct'),
          c('  printf', 'name'), c('("\\n"', 'value'), c(');\n}', 'punct'),
        ],
        caption: 'Outer = rows, inner = columns',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'repeat',
        dialogue: 'அப்போ 3x3 ன்னா 9 முறை inner loop ஓடுமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரியா புரிஞ்சது! Outer 3 முறை, ஒவ்வொரு முறையும் inner 3 முறை — மொத்தம் 9. இது தான் nested loop-ன சக்தி!',
      },
    ],
    practice: {
      question: 'If the outer loop runs 4 times and the inner loop runs 5 times, how many times does the inner body execute?',
      options: ['9', '20', '4', '5'],
      answerIndex: 1,
      explanation: 'Total = outer × inner = 4 × 5 = 20. The inner body runs 20 times total.',
    },
    challenge: {
      title: 'Print a 2x3 grid',
      prompt: 'Use nested loops to print a 2-row, 3-column grid of # symbols.',
      starter: 'for (int i = 0; i < ___; i++) {\n  for (int j = 0; j < ___; j++)\n    printf("#");\n  printf("\\n");\n}',
      hint: 'Outer loop runs 2 times (rows), inner loop runs 3 times (columns)',
      expected: 'for (int i = 0; i < 2; i++) {\n  for (int j = 0; j < 3; j++)\n    printf("#");\n  printf("\\n");\n}',
    },
  },
  {
    id: 'recursion',
    moduleId: 'functions',
    level: 'intermediate',
    title: 'Recursion',
    tamilTitle: 'மீள்பாடு',
    duration: 15,
    xp: 100,
    concept:
      'Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (when to stop) and a recursive case (when to call itself again). Without a base case, the function calls itself forever — causing a stack overflow.',
    tamilExplanation:
      'Recursion என்பது function தன்னைத்தானே call செய்வது. ஒவ்வொரு முறையும் சின்ன problem-ஆ மாறும். Base case (நிறுத்தும் இடம்) கட்டாயம் வேணும் — இல்லன்னா என்றென்றும் ஓடும், stack overflow ஆகும்.',
    realLife: {
      title: 'Russian Nesting Dolls',
      body:
        'Imagine opening a Russian nesting doll. You open the biggest one, find a smaller one inside, open that, find an even smaller one — until you reach the tiniest doll that does not open (base case). Recursion works the same way: each call opens a smaller version until you hit the smallest case that stops.',
    },
    contentSections: [
      {
        heading: 'The Two Parts of Recursion',
        items: [
          'Base case: the condition that stops the recursion (smallest version)',
          'Recursive case: the function calls itself with a smaller input',
          'Without a base case, recursion never stops — stack overflow crash',
        ],
      },
      {
        heading: 'Classic Example: Factorial',
        items: [
          '5! = 5 × 4! → 4! = 4 × 3! → ... → 1! = 1 (base case)',
          'Each call makes the problem smaller (n becomes n-1)',
          'When n reaches 1, the recursion stops and values bubble back up',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'), c(' ', 'plain'), c('factorial', 'name'), c('(', 'punct'), c('int', 'type'), c(' ', 'plain'), c('n', 'name'), c(') {\n', 'punct'),
        c('  if', 'keyword'), c(' (', 'punct'), c('n', 'name'), c(' <= ', 'punct'), c('1', 'value'), c(') ', 'punct'),
        c('return', 'keyword'), c(' ', 'plain'), c('1', 'value'), c(';', 'punct'), c('  // base case\n', 'comment'),
        c('  return', 'keyword'), c(' ', 'plain'), c('n', 'name'), c(' * ', 'punct'), c('factorial', 'name'), c('(n - ', 'punct'), c('1', 'value'), c(');', 'punct'), c('  // recursive\n', 'comment'),
        c('}', 'punct'),
      ],
      explanation: [
        { token: 'if (n <= 1) return 1', meaning: 'Base case — stop when n is 1 or 0' },
        { token: 'n * factorial(n-1)', meaning: 'Recursive case — multiply n by the factorial of n-1' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'Function தன்னைத்தானே call செய்ய முடியுமா? அது எப்படி வேலை செய்யும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'Russian nesting doll மாதிரி! ஒவ்வொன்னை திறந்தா சின்னது வரும். கடைசியில சின்னத்த திறக்க முடியாது — அது தான் base case!',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Factorial பாரு — 5! = 5 × 4!, 4! = 4 × 3!... கடைசியில 1! = 1:',
        code: [
          c('int', 'type'), c(' factorial(int n) {\n', 'punct'),
          c('  if', 'keyword'), c(' (n <= ', 'punct'), c('1', 'value'), c(') return ', 'punct'), c('1', 'value'), c(';\n', 'punct'),
          c('  return', 'keyword'), c(' n * factorial(n-', 'punct'), c('1', 'value'), c(');\n}', 'punct'),
        ],
        caption: 'Base case: n<=1 → return 1',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'Base case இல்லன்னா என்ன ஆகும்?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'surprised',
        visual: 'generic',
        dialogue: 'என்றென்றும் ஓடும்! function call மேலே function call — memory நிறையும், stack overflow ன்னு crash ஆகும். அதனால base case கட்டாயம்!',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! ஒவ்வொரு முறையும் problem-ஐ சின்னதா ஆக்கி, கடைசியில base case-ல நிறுத்தணும்!',
      },
    ],
    practice: {
      question: 'What happens if a recursive function has no base case?',
      options: ['It runs once and stops', 'It calls itself forever — stack overflow', 'It returns 0', 'It becomes a loop'],
      answerIndex: 1,
      explanation: 'Without a base case, the function calls itself endlessly, filling up the call stack until it overflows and crashes.',
    },
    challenge: {
      title: 'Write the base case',
      prompt: 'Add the base case to this recursive factorial function: stop when n is 0 or 1.',
      starter: 'int fact(int n) {\n  ___;\n  return n * fact(n - 1);\n}',
      hint: 'Use if (n <= 1) return 1',
      expected: 'int fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}',
    },
  },
  {
    id: '2d-arrays',
    moduleId: 'arrays',
    level: 'intermediate',
    title: '2D Arrays',
    tamilTitle: 'இருபரிமாண வரிசைகள்',
    duration: 13,
    xp: 90,
    concept:
      'A 2D array is an array of arrays — like a grid or table with rows and columns. You access elements using two indices: array[row][column]. It is how you represent matrices, game boards, and spreadsheets in code.',
    tamilExplanation:
      '2D array என்பது array-க்குள் array — grid அல்லது table மாதிரி. Row மற்றும் column இரண்டு index வேணும்: array[row][column]. Matrix, game board, spreadsheet எல்லாம் இது தான்.',
    realLife: {
      title: 'Chess Board',
      body:
        'A chess board has 8 rows and 8 columns. To find a piece, you say row 3, column 5. A 2D array works the same way — each cell has a row number and a column number. The first index is the row, the second is the column.',
    },
    contentSections: [
      {
        heading: 'Declaring 2D Arrays',
        items: [
          'int matrix[3][4] — 3 rows, 4 columns, 12 total elements',
          'Access: matrix[0][0] is the first element (row 0, column 0)',
          'Access: matrix[2][3] is the last element (row 2, column 3)',
          'Both indices start at 0',
        ],
      },
      {
        heading: 'Iterating with Nested Loops',
        items: [
          'Outer loop goes through rows',
          'Inner loop goes through columns',
          'matrix[i][j] accesses the cell at row i, column j',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'), c(' ', 'plain'), c('matrix', 'name'), c('[', 'punct'), c('3', 'value'), c('][', 'punct'), c('4', 'value'), c('];', 'punct'), c('  // 3x4 grid\n', 'comment'),
        c('matrix', 'name'), c('[', 'punct'), c('0', 'value'), c('][', 'punct'), c('0', 'value'), c('] = ', 'punct'), c('5', 'value'), c(';', 'punct'), c('  // row 0, col 0\n', 'comment'),
        c('for', 'keyword'), c(' (int i = ', 'punct'), c('0', 'value'), c('; i < ', 'punct'), c('3', 'value'), c('; i++)\n', 'punct'),
        c('  for', 'keyword'), c(' (int j = ', 'punct'), c('0', 'value'), c('; j < ', 'punct'), c('4', 'value'), c('; j++)\n', 'punct'),
        c('    printf', 'name'), c('("%d ", ', 'punct'), c('matrix', 'name'), c('[i][j]);', 'punct'),
      ],
      explanation: [
        { token: 'matrix[3][4]', meaning: '3 rows × 4 columns = 12 cells' },
        { token: 'matrix[0][0]', meaning: 'First cell — row 0, column 0' },
        { token: 'matrix[i][j]', meaning: 'Access cell at row i, column j' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lockers',
        dialogue: 'Chess board-ல piece எங்க இருக்குன்னு சொல்ல row மற்றும் column சொல்றோம் இல்லையா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'lockers',
        dialogue: 'ஆமாம்! 2D array-ம் அப்படி தான். Row மற்றும் column — இரண்டு index வேணும். matrix[2][3] ன்னா row 2, column 3.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: '3x4 grid பாரு:',
        code: [
          c('int', 'type'), c(' matrix[', 'punct'), c('3', 'value'), c('][', 'punct'), c('4', 'value'), c('];', 'punct'),
          c('  // 3 rows, 4 cols\n', 'comment'),
          c('matrix', 'name'), c('[', 'punct'), c('0', 'value'), c('][', 'punct'), c('0', 'value'), c('] = ', 'punct'), c('5', 'value'), c(';', 'punct'),
        ],
        caption: '3 rows × 4 columns = 12 cells',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'lockers',
        dialogue: 'எல்லா cell-ஐயும் எப்படி read பண்றது?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Nested loop! Outer loop row, inner loop column:',
        code: [
          c('for', 'keyword'), c(' (int i = ', 'punct'), c('0', 'value'), c('; i < ', 'punct'), c('3', 'value'), c('; i++)\n', 'punct'),
          c('  for', 'keyword'), c(' (int j = ', 'punct'), c('0', 'value'), c('; j < ', 'punct'), c('4', 'value'), c('; j++)\n', 'punct'),
          c('    printf', 'name'), c('("%d ", matrix[i][j]);', 'punct'),
        ],
        caption: 'Row by row, column by column',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'lockers',
        dialogue: 'சரி! 2D array ன்னா grid, இரண்டு index, nested loop-ல iterate பண்ணலாம்!',
      },
    ],
    practice: {
      question: 'In int grid[3][5], how many total elements are there?',
      options: ['3', '5', '8', '15'],
      answerIndex: 3,
      explanation: '3 rows × 5 columns = 15 total elements. The total is always rows × columns.',
    },
    challenge: {
      title: 'Access a cell',
      prompt: 'Set the cell at row 1, column 2 of a 3x3 array called grid to the value 7.',
      starter: '___[___][___] = 7;',
      hint: 'Use grid[1][2] — row 1, column 2',
      expected: 'grid[1][2] = 7;',
    },
  },
  {
    id: 'pointer-arithmetic',
    moduleId: 'pointers',
    level: 'intermediate',
    title: 'Pointer Arithmetic',
    tamilTitle: 'சுட்டி கணிதம்',
    duration: 14,
    xp: 95,
    concept:
      'Pointer arithmetic lets you move a pointer through memory by adding or subtracting integers. When you add 1 to a pointer, it moves by the size of the type it points to — not by 1 byte. This is how arrays and pointers are connected in C.',
    tamilExplanation:
      'Pointer arithmetic என்பது pointer-ஐ memory-ல நகர்த்துவது. pointer + 1 ன்னா 1 byte அல்ல — அந்த type-ன size அளவு தான் நகரும். int pointer + 1 ன்னா 4 bytes நகரும். இது தான் array-ம் pointer-ம் எப்படி இணைந்திருக்கிறது ன்னு காட்டும்.',
    realLife: {
      title: 'House Numbers on a Street',
      body:
        'Imagine houses on a street. Each house takes up the same plot size. If you are at house #5 and move "one house forward," you land at house #6 — not one meter forward. Pointer arithmetic works the same: adding 1 moves to the next element, jumping by the size of one element.',
    },
    contentSections: [
      {
        heading: 'How Pointer Arithmetic Works',
        items: [
          'ptr + 1 moves to the next element (not the next byte)',
          'For int* ptr, ptr + 1 moves 4 bytes (size of int)',
          'For char* ptr, ptr + 1 moves 1 byte (size of char)',
          'Subtracting works the same way: ptr - 1 moves back one element',
        ],
      },
      {
        heading: 'Pointers and Arrays',
        items: [
          'The name of an array is a pointer to its first element',
          'arr[i] is the same as *(arr + i)',
          'You can use pointer arithmetic instead of array indexing',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'), c(' ', 'plain'), c('arr', 'name'), c('[] = {', 'punct'), c('10', 'value'), c(', ', 'punct'), c('20', 'value'), c(', ', 'punct'), c('30', 'value'), c('};\n', 'punct'),
        c('int', 'type'), c(' *', 'plain'), c('ptr', 'name'), c(' = ', 'punct'), c('arr', 'name'), c(';', 'punct'), c('  // points to arr[0]\n', 'comment'),
        c('printf', 'name'), c('("%d", *(ptr + ', 'punct'), c('1', 'value'), c('));', 'punct'), c('  // prints 20\n', 'comment'),
      ],
      explanation: [
        { token: 'int *ptr = arr', meaning: 'ptr points to the first element of arr' },
        { token: '*(ptr + 1)', meaning: 'Move 1 element forward, then read the value — same as arr[1]' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'address',
        dialogue: 'Pointer + 1 ன்னா 1 byte நகருமா? அல்லது வேற?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'address',
        dialogue: '1 byte இல்லை! Type-ன size அளவு நகரும். int pointer + 1 ன்னா 4 bytes நகரும் — அடுத்த element-க்கு போகும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது பாரு — array-ம் pointer-ம் இணைந்தே வேலை செய்கிறது:',
        code: [
          c('int', 'type'), c(' arr[] = {', 'punct'), c('10', 'value'), c(', ', 'punct'), c('20', 'value'), c(', ', 'punct'), c('30', 'value'), c('};\n', 'punct'),
          c('int', 'type'), c(' *ptr = arr;', 'punct'),
          c('  // ptr → arr[0]\n', 'comment'),
          c('printf', 'name'), c('("%d", *(ptr+', 'punct'), c('1', 'value'), c('));', 'punct'),
          c('  // 20\n', 'comment'),
        ],
        caption: '*(ptr+1) = arr[1] = 20',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'address',
        dialogue: 'அப்போ arr[i] ன்னா *(arr + i) மாதிரியா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரியா புரிஞ்சது! C-ல array name என்பது first element-ன pointer. arr[i] ன்னா *(arr + i) — ரெண்டும் ஒன்னு தான்!',
      },
    ],
    practice: {
      question: 'If int *ptr points to an int array, what does ptr + 2 do?',
      options: ['Moves 2 bytes forward', 'Moves 2 elements forward (8 bytes for int)', 'Moves to the 2nd index', 'Does nothing'],
      answerIndex: 1,
      explanation: 'ptr + 2 moves 2 elements forward. Since int is 4 bytes, it moves 8 bytes — landing on the 3rd element (index 2).',
    },
    challenge: {
      title: 'Access via pointer',
      prompt: 'Using pointer arithmetic, print the 3rd element (index 2) of int arr[] via a pointer ptr.',
      starter: 'printf("%d", *(___ + ___));',
      hint: 'ptr + 2 moves to the 3rd element',
      expected: 'printf("%d", *(ptr + 2));',
    },
  },
];

/* ===================== ADVANCED MODULES ===================== */

export const advancedModules: LevelModule[] = [
  {
    id: 'linked-list',
    index: 1,
    title: 'Linked Lists',
    tamilTitle: 'இணைப்பு பட்டியல்கள்',
    icon: 'Link',
    description: 'Dynamic data structures — nodes, pointers, insertion, deletion, and traversal.',
    progress: 0,
    level: 'advanced',
    topics: [
      { id: 'll-concept', title: 'Linked List Concept', tamilTitle: 'இணைப்பு பட்டியல் கருத்து' },
      { id: 'll-operations', title: 'Insertion & Deletion', tamilTitle: 'செருகல் & நீக்கல்' },
      { id: 'll-reverse', title: 'Reversing a List', tamilTitle: 'பட்டியல் தலைகீழாக்கம்' },
    ],
  },
  {
    id: 'stack-queue',
    index: 2,
    title: 'Stacks & Queues',
    tamilTitle: 'அடுக்கு & வரிசை',
    icon: 'Layers',
    description: 'LIFO and FIFO structures — push, pop, enqueue, dequeue, and real-world applications.',
    progress: 0,
    level: 'advanced',
    topics: [
      { id: 'stack-concept', title: 'Stack (LIFO)', tamilTitle: 'அடுக்கு (LIFO)' },
      { id: 'queue-concept', title: 'Queue (FIFO)', tamilTitle: 'வரிசை (FIFO)' },
      { id: 'sq-applications', title: 'Applications', tamilTitle: 'பயன்பாடுகள்' },
    ],
  },
  {
    id: 'trees',
    index: 3,
    title: 'Trees & BST',
    tamilTitle: 'மரங்கள் & BST',
    icon: 'GitBranch',
    description: 'Hierarchical data — binary trees, BST operations, traversals, and balancing.',
    progress: 0,
    level: 'advanced',
    topics: [
      { id: 'tree-concept', title: 'Binary Trees', tamilTitle: 'இரும மரங்கள்' },
      { id: 'bst', title: 'Binary Search Tree', tamilTitle: 'இரும தேடல் மரம்' },
      { id: 'traversals', title: 'Tree Traversals', tamilTitle: 'மர பயணங்கள்' },
    ],
  },
  {
    id: 'graphs',
    index: 4,
    title: 'Graphs & BFS/DFS',
    tamilTitle: 'வரைபடங்கள்',
    icon: 'Share2',
    description: 'Networks of nodes — adjacency lists, BFS, DFS, and shortest paths.',
    progress: 0,
    level: 'advanced',
    topics: [
      { id: 'graph-concept', title: 'Graph Representation', tamilTitle: 'வரைபடம் குறிப்பு' },
      { id: 'bfs', title: 'Breadth-First Search', tamilTitle: 'BFS' },
      { id: 'dfs', title: 'Depth-First Search', tamilTitle: 'DFS' },
    ],
  },
  {
    id: 'dp',
    index: 5,
    title: 'Dynamic Programming',
    tamilTitle: 'இயங்கியல் நிரலாக்கம்',
    icon: 'Brain',
    description: 'Optimal substructure and overlapping subproblems — memoization and tabulation.',
    progress: 0,
    level: 'advanced',
    topics: [
      { id: 'dp-concept', title: 'DP Concept', tamilTitle: 'DP கருத்து' },
      { id: 'memoization', title: 'Memoization', tamilTitle: 'நினைவுபதுமை' },
      { id: 'tabulation', title: 'Tabulation', tamilTitle: 'அட்டவணையாக்கம்' },
    ],
  },
];

/* ===================== ADVANCED LESSONS ===================== */

export const advancedLessons: LevelLesson[] = [
  {
    id: 'll-concept',
    moduleId: 'linked-list',
    level: 'advanced',
    title: 'Linked List Concept',
    tamilTitle: 'இணைப்பு பட்டியல் கருத்து',
    duration: 16,
    xp: 120,
    concept:
      'A linked list is a dynamic data structure where each node contains data and a pointer to the next node. Unlike arrays, nodes are not stored contiguously — they are connected via pointers. This allows O(1) insertion and deletion at known positions, but O(n) random access.',
    tamilExplanation:
      'Linked list என்பது dynamic data structure. ஒவ்வொரு node-ம் data + next node-ன pointer வைத்திருக்கும். Array மாதிரி அடுத்தடுத்து store ஆகாது — pointer மூலம் இணைக்கப்படும். O(1)-ல insert/delete முடியும், ஆனா random access O(n).',
    realLife: {
      title: 'Treasure Hunt Clues',
      body:
        'In a treasure hunt, each clue leads you to the next location. You cannot skip to clue #5 directly — you must follow the chain from clue to clue. A linked list works the same: each node points to the next, and you must traverse sequentially to reach a specific node.',
    },
    contentSections: [
      {
        heading: 'Node Structure',
        items: [
          'Each node has two parts: data (the value) and next (pointer to the next node)',
          'The last node has next = NULL — it marks the end of the list',
          'A head pointer stores the address of the first node',
        ],
      },
      {
        heading: 'Arrays vs Linked Lists',
        items: [
          'Arrays: O(1) random access, O(n) insertion/deletion (shifting needed)',
          'Linked lists: O(n) random access, O(1) insertion/deletion (just change pointers)',
          'Linked lists can grow dynamically — no need to pre-allocate size',
        ],
      },
    ],
    code: {
      parts: [
        c('struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' {\n  ', 'punct'),
        c('int', 'type'), c(' ', 'plain'), c('data', 'name'), c(';', 'punct'), c('  // value\n', 'comment'),
        c('  struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' *', 'punct'), c('next', 'name'), c(';', 'punct'), c('  // pointer to next\n', 'comment'),
        c('};', 'punct'), c('\n', 'plain'),
        c('struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' *', 'punct'), c('head', 'name'), c(' = ', 'punct'), c('NULL', 'value'), c(';', 'punct'), c('  // start of list', 'comment'),
      ],
      explanation: [
        { token: 'int data', meaning: 'The value stored in this node' },
        { token: 'struct Node *next', meaning: 'Pointer to the next node — NULL means end of list' },
        { token: 'head', meaning: 'Points to the first node — the entry point of the list' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'Array-ல insert பண்ண நிறைய elements shift பண்ணணும். இதை avoid பண்ண முடியாதா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'Linked list use பண்ணலாம்! ஒவ்வொரு node-ம் data + next pointer வைச்சிருக்கும். Treasure hunt மாதிரி — ஒன்னோட அடுத்தது சொல்லும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Node structure பாரு:',
        code: [
          c('struct', 'keyword'), c(' Node {\n', 'punct'),
          c('  int', 'type'), c(' data;\n', 'punct'),
          c('  struct', 'keyword'), c(' Node *next;\n', 'punct'),
          c('};', 'punct'),
        ],
        caption: 'data + pointer to next node',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'அப்போ எந்த node-ல இருக்கோமோ அதோட அடுத்த node-க்கு மட்டும் தான் போக முடியுமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'ஆமாம்! Random access கிடையாது — head-ல இருந்து ஒவ்வொன்னா தான் போகணும். ஆனா insert/delete ரொம்ப easy — pointer மாத்தினா போதும்!',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! Array = fast access, slow insert. Linked list = slow access, fast insert. Use case-க்கு ஏத்த மாதிரி choose பண்ணணும்!',
      },
    ],
    practice: {
      question: 'What is the time complexity of accessing the nth element in a linked list?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      answerIndex: 2,
      explanation: 'Linked lists have no random access — you must traverse from the head, node by node, making it O(n).',
    },
    challenge: {
      title: 'Define a node',
      prompt: 'Define a struct Node that holds an integer data and a pointer to the next Node.',
      starter: 'struct Node {\n  int ___;\n  struct Node *___;\n};',
      hint: 'data for the value, next for the pointer',
      expected: 'struct Node {\n  int data;\n  struct Node *next;\n};',
    },
  },
  {
    id: 'stack-concept',
    moduleId: 'stack-queue',
    level: 'advanced',
    title: 'Stack (LIFO)',
    tamilTitle: 'அடுக்கு (LIFO)',
    duration: 14,
    xp: 110,
    concept:
      'A stack is a LIFO (Last In, First Out) data structure. The last element pushed is the first one popped. Think of a stack of plates — you add and remove from the top only. Stacks power function calls, undo operations, and expression evaluation.',
    tamilExplanation:
      'Stack என்பது LIFO — Last In First Out. கடைசியா push பண்றது தான் முதல்ல pop ஆகும். Plate stack மாதிரி — மேலே மட்டும் add/remove. Function calls, undo, expression evaluation எல்லாம் stack use பண்ணும்.',
    realLife: {
      title: 'Stack of Plates',
      body:
        'At a buffet, plates are stacked. You take the top plate first (pop), and when new plates come, they go on top (push). The last plate placed is the first one taken — LIFO. This is exactly how a stack works in programming.',
    },
    contentSections: [
      {
        heading: 'Stack Operations',
        items: [
          'push(value): add an element to the top',
          'pop(): remove and return the top element',
          'peek(): look at the top element without removing it',
          'isEmpty(): check if the stack is empty',
        ],
      },
      {
        heading: 'Real-World Applications',
        items: [
          'Function call stack — each call pushes a frame, return pops it',
          'Undo/Redo — each action is pushed, undo pops it',
          'Balanced parentheses — push opening, pop on closing',
          'Expression evaluation — convert infix to postfix',
        ],
      },
    ],
    code: {
      parts: [
        c('#define', 'keyword'), c(' ', 'plain'), c('MAX', 'name'), c(' ', 'plain'), c('100', 'value'), c('\n', 'punct'),
        c('int', 'type'), c(' ', 'plain'), c('stack', 'name'), c('[', 'punct'), c('MAX', 'name'), c('];', 'punct'), c('\n', 'punct'),
        c('int', 'type'), c(' ', 'plain'), c('top', 'name'), c(' = -', 'punct'), c('1', 'value'), c(';', 'punct'), c('  // empty\n', 'comment'),
        c('// push\n', 'comment'),
        c('stack', 'name'), c('[++', 'punct'), c('top', 'name'), c('] = ', 'punct'), c('42', 'value'), c(';', 'punct'), c('  // add to top\n', 'comment'),
        c('// pop\n', 'comment'),
        c('int', 'type'), c(' ', 'plain'), c('val', 'name'), c(' = ', 'punct'), c('stack', 'name'), c('[', 'punct'), c('top', 'name'), c('--];', 'punct'), c('  // remove top', 'comment'),
      ],
      explanation: [
        { token: 'top = -1', meaning: 'Stack starts empty — top index is -1' },
        { token: 'stack[++top] = 42', meaning: 'Push: increment top first, then store value' },
        { token: 'stack[top--]', meaning: 'Pop: read value first, then decrement top' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'Undo button எப்படி வேலை செய்கிறது? கடைசி action-ஐ தான் முதல்ல undo ஆகிறதே?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'Stack! LIFO — Last In First Out. ஒவ்வொரு action-உம் stack-ல push ஆகும். Undo ன்னா top-ஐ pop பண்றது — கடைசி action முதல்ல undo ஆகும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Plate stack மாதிரி — மேலே push, மேலே pop:',
        code: [
          c('stack', 'name'), c('[++', 'punct'), c('top', 'name'), c('] = ', 'punct'), c('42', 'value'), c(';', 'punct'), c('  // push\n', 'comment'),
          c('int', 'type'), c(' v = stack[', 'punct'), c('top', 'name'), c('--];', 'punct'), c('  // pop', 'comment'),
        ],
        caption: 'Push adds to top, pop removes from top',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'Function calls-உம் stack use பண்ணான்னு சொன்னியே?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'ஆமாம்! ஒவ்வொரு function call-உம் stack frame push ஆகும். return ன்னா pop ஆகும். அதனால தான் recursion stack overflow ஆகுது — stack நிறையும்!',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! Stack = LIFO = plates, undo, function calls. Push மேலே, pop மேலே!',
      },
    ],
    practice: {
      question: 'In a stack, which element is removed first when you pop?',
      options: ['The first element pushed', 'The last element pushed', 'A random element', 'The middle element'],
      answerIndex: 1,
      explanation: 'Stacks are LIFO — the last element pushed is the first one popped, like taking the top plate from a stack.',
    },
    challenge: {
      title: 'Push to stack',
      prompt: 'Push the value 99 onto a stack (increment top, then store).',
      starter: 'stack[++___] = ___;',
      hint: 'Increment top first, then assign the value',
      expected: 'stack[++top] = 99;',
    },
  },
  {
    id: 'tree-concept',
    moduleId: 'trees',
    level: 'advanced',
    title: 'Binary Trees',
    tamilTitle: 'இரும மரங்கள்',
    duration: 16,
    xp: 120,
    concept:
      'A binary tree is a hierarchical structure where each node has at most two children — left and right. The topmost node is the root. Binary trees enable O(log n) search when balanced (BST), and are the foundation of heaps, expression trees, and file systems.',
    tamilExplanation:
      'Binary tree என்பது hierarchical structure. ஒவ்வொரு node-ம் அதிகபட்சம் இரண்டு children — left மற்றும் right. மேலே இருப்பது root. Balanced BST-ல O(log n) search முடியும். Heap, expression tree, file system எல்லாம் இது தான் அடிப்படை.',
    realLife: {
      title: 'Family Tree',
      body:
        'A family tree shows parents and children. Each parent has at most two children in a binary tree. The topmost ancestor is the root. You can trace any person by going left or right at each level. This hierarchy is how binary trees organize data efficiently.',
    },
    contentSections: [
      {
        heading: 'Tree Terminology',
        items: [
          'Root: the topmost node (no parent)',
          'Leaf: a node with no children',
          'Left child / Right child: at most two children per node',
          'Height: the longest path from root to a leaf',
        ],
      },
      {
        heading: 'Why Binary Trees?',
        items: [
          'Balanced BST gives O(log n) search, insert, and delete',
          'Used in heaps (priority queues), expression parsing, and Huffman coding',
          'File systems use tree structures for directories',
        ],
      },
    ],
    code: {
      parts: [
        c('struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' {\n  ', 'punct'),
        c('int', 'type'), c(' ', 'plain'), c('data', 'name'), c(';', 'punct'), c('\n', 'punct'),
        c('  struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' *', 'punct'), c('left', 'name'), c(';', 'punct'), c('  // left child\n', 'comment'),
        c('  struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' *', 'punct'), c('right', 'name'), c(';', 'punct'), c('  // right child\n', 'comment'),
        c('};', 'punct'),
      ],
      explanation: [
        { token: 'int data', meaning: 'The value stored in this node' },
        { token: 'left', meaning: 'Pointer to the left child — smaller values in BST' },
        { token: 'right', meaning: 'Pointer to the right child — larger values in BST' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'Array-ம் linked list-ம் linear. ஆனா hierarchy மாதிரி data organize பண்ண எது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'Binary tree! ஒவ்வொரு node-ம் அதிகபட்சம் இரண்டு children — left, right. Family tree மாதிரி. மேலே root, கீழே leaves.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Node structure பாரு:',
        code: [
          c('struct', 'keyword'), c(' Node {\n', 'punct'),
          c('  int', 'type'), c(' data;\n', 'punct'),
          c('  struct', 'keyword'), c(' Node *left, *right;\n', 'punct'),
          c('};', 'punct'),
        ],
        caption: 'data + left child + right child',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'அப்போ balanced tree-ல search எவ்ள வேகமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'O(log n)! ஒவ்வொரு level-ல half elements ஒதுக்கப்படும் — binary search மாதிரி. ஆனா unbalanced ஆனா O(n) ஆகிடும். அதனா balancing முக்கியம்!',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! Tree = hierarchy, binary = இரண்டு children, balanced = O(log n) search. File system, heap, BST எல்லாம் tree use பண்ணுது!',
      },
    ],
    practice: {
      question: 'What is the maximum number of children a node can have in a binary tree?',
      options: ['1', '2', '3', 'Unlimited'],
      answerIndex: 1,
      explanation: 'In a binary tree, each node has at most two children — left and right. That is what "binary" means.',
    },
    challenge: {
      title: 'Define a tree node',
      prompt: 'Define a struct Node for a binary tree with int data and two child pointers.',
      starter: 'struct Node {\n  int data;\n  struct Node *___;\n  struct Node *___;\n};',
      hint: 'left and right are the standard names',
      expected: 'struct Node {\n  int data;\n  struct Node *left;\n  struct Node *right;\n};',
    },
  },
  {
    id: 'graph-concept',
    moduleId: 'graphs',
    level: 'advanced',
    title: 'Graph Representation',
    tamilTitle: 'வரைபடம் குறிப்பு',
    duration: 15,
    xp: 115,
    concept:
      'A graph is a set of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles, multiple paths between nodes, and no single root. Graphs model social networks, maps, and computer networks. The two common representations are adjacency matrix (2D array) and adjacency list (array of linked lists).',
    tamilExplanation:
      'Graph என்பது nodes (vertices) மற்றும் edges-ன தொகுப்பு. Tree மாதிரி இல்லை — cycle இருக்கலாம், பல path இருக்கலாம், root இல்லை. Social network, map, computer network எல்லாம் graph. Adjacency matrix மற்றும் adjacency list இரண்டும் common.',
    realLife: {
      title: 'Google Maps',
      body:
        'Google Maps uses a graph: intersections are vertices, roads are edges. To find the shortest route, it searches the graph. Social networks are graphs too — people are nodes, friendships are edges. Graphs are the most versatile data structure for modeling connections.',
    },
    contentSections: [
      {
        heading: 'Graph Representations',
        items: [
          'Adjacency Matrix: 2D array where matrix[i][j] = 1 if edge exists between i and j',
          'Adjacency List: array of linked lists — each node stores its neighbors',
          'Matrix: O(V²) space, O(1) edge lookup. List: O(V+E) space, faster for sparse graphs',
        ],
      },
      {
        heading: 'Graph Types',
        items: [
          'Directed: edges have direction (A→B does not mean B→A)',
          'Undirected: edges go both ways (A—B means A to B and B to A)',
          'Weighted: edges have costs (road distances, network latency)',
        ],
      },
    ],
    code: {
      parts: [
        c('// Adjacency Matrix\n', 'comment'),
        c('int', 'type'), c(' ', 'plain'), c('graph', 'name'), c('[', 'punct'), c('5', 'value'), c('][', 'punct'), c('5', 'value'), c('] = {', 'punct'), c('0', 'value'), c('};', 'punct'), c('\n', 'punct'),
        c('graph', 'name'), c('[', 'punct'), c('0', 'value'), c('][', 'punct'), c('1', 'value'), c('] = ', 'punct'), c('1', 'value'), c(';', 'punct'), c('  // edge 0→1\n', 'comment'),
        c('// Adjacency List\n', 'comment'),
        c('struct', 'keyword'), c(' ', 'plain'), c('Node', 'name'), c(' *', 'punct'), c('adj', 'name'), c('[', 'punct'), c('5', 'value'), c('];', 'punct'), c('  // array of lists', 'comment'),
      ],
      explanation: [
        { token: 'graph[0][1] = 1', meaning: 'There is an edge from vertex 0 to vertex 1' },
        { token: 'adj[5]', meaning: 'Each index holds a list of that vertex\'s neighbors' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'Google Maps எப்படி shortest route கண்டுபிடிக்கிறது? அதுக்கு என்ன data structure?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'Graph! Intersections = vertices, roads = edges. Tree மாதிரி இல்லை — cycle இருக்கலாம், பல path இருக்கலாம். Social network-உம் graph தான்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இரண்டு வழி represent பண்ணலாம். Matrix:',
        code: [
          c('int', 'type'), c(' graph[', 'punct'), c('5', 'value'), c('][', 'punct'), c('5', 'value'), c('] = {', 'punct'), c('0', 'value'), c('};\n', 'punct'),
          c('graph', 'name'), c('[', 'punct'), c('0', 'value'), c('][', 'punct'), c('1', 'value'), c('] = ', 'punct'), c('1', 'value'), c(';', 'punct'),
          c('  // edge 0→1', 'comment'),
        ],
        caption: 'Matrix: 1 = edge exists',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'Matrix தவிர வேறு வழி இருக்கா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'Adjacency list! ஒவ்வொரு node-ம் அதோட neighbors-ஐ list-ல வைக்கும். Sparse graph-க்கு list better — space குறைவு!',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! Graph = vertices + edges. Matrix = dense, list = sparse. Maps, social network, computer network எல்லாம் graph!',
      },
    ],
    practice: {
      question: 'In an adjacency matrix for a graph with V vertices, how much space is used?',
      options: ['O(V)', 'O(V + E)', 'O(V²)', 'O(E²)'],
      answerIndex: 2,
      explanation: 'An adjacency matrix is a V×V 2D array, so it always uses O(V²) space, regardless of the number of edges.',
    },
    challenge: {
      title: 'Mark an edge',
      prompt: 'Using an adjacency matrix called graph, mark an edge from vertex 2 to vertex 3.',
      starter: 'graph[___][___] = 1;',
      hint: 'Row = source vertex, column = destination vertex',
      expected: 'graph[2][3] = 1;',
    },
  },
  {
    id: 'dp-concept',
    moduleId: 'dp',
    level: 'advanced',
    title: 'Dynamic Programming Concept',
    tamilTitle: 'DP கருத்து',
    duration: 18,
    xp: 130,
    concept:
      'Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Two key properties: optimal substructure (optimal solution = optimal sub-solutions) and overlapping subproblems (same sub-problems repeat). DP turns exponential recursion into polynomial time.',
    tamilExplanation:
      'DP என்பது complex problem-ஐ சின்ன sub-problems-ஆ உடைத்து, result-ஐ store செய்து மறுபடி கணக்கிடாம் இருக்கிறது. இரண்டு key: optimal substructure மற்றும் overlapping subproblems. Exponential recursion-ஐ polynomial time-ஆ மாற்றும்!',
    realLife: {
      title: 'Saving Calculator Results',
      body:
        'Imagine calculating 5! by hand. You compute 1×2=2, 2×3=6, 6×4=24, 24×5=120. If someone then asks for 4!, you should not start over — you already computed it (24). DP does exactly this: solve each sub-problem once, store the answer, and reuse it when it comes up again.',
    },
    contentSections: [
      {
        heading: 'When to Use DP',
        items: [
          'Optimal substructure: the optimal solution contains optimal solutions to sub-problems',
          'Overlapping subproblems: the same sub-problems are solved repeatedly',
          'If subproblems do not overlap, plain recursion or divide-and-conquer is enough',
        ],
      },
      {
        heading: 'Two Approaches',
        items: [
          'Memoization (top-down): recursion + cache — store results as you compute them',
          'Tabulation (bottom-up): build a table from smallest to largest — no recursion',
          'Both give the same answer — memoization is easier to write, tabulation is often faster',
        ],
      },
    ],
    code: {
      parts: [
        c('// Memoization (top-down)\n', 'comment'),
        c('int', 'type'), c(' ', 'plain'), c('memo', 'name'), c('[', 'punct'), c('100', 'value'), c('] = {', 'punct'), c('0', 'value'), c('};', 'punct'), c('\n', 'punct'),
        c('int', 'type'), c(' ', 'plain'), c('fib', 'name'), c('(', 'punct'), c('int', 'type'), c(' ', 'plain'), c('n', 'name'), c(') {\n', 'punct'),
        c('  if', 'keyword'), c(' (n <= ', 'punct'), c('1', 'value'), c(') return n;\n', 'punct'),
        c('  if', 'keyword'), c(' (memo[n] != ', 'punct'), c('0', 'value'), c(') return memo[n];', 'punct'), c('  // already computed\n', 'comment'),
        c('  return', 'keyword'), c(' memo[n] = fib(n-', 'punct'), c('1', 'value'), c(') + fib(n-', 'punct'), c('2', 'value'), c(');\n', 'punct'),
        c('}', 'punct'),
      ],
      explanation: [
        { token: 'memo[n] != 0', meaning: 'If already computed, return cached result — no recomputation' },
        { token: 'memo[n] = fib(n-1) + fib(n-2)', meaning: 'Compute once, store, then return — exponential becomes O(n)' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'Recursion-ல fib(5) கணக்கிடும்போது fib(3) ரெண்டு முறை கணக்கிடப்படுது. இதை avoid பண்ண முடியாதா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue: 'DP! ஒவ்வொரு sub-problem-உம் ஒரு முறை தான் solve பண்ணணும். Result-ஐ store செய்து மறுபடி use பண்ணலாம். இது தான் memoization!',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Fibonacci with memoization பாரு:',
        code: [
          c('int', 'type'), c(' memo[', 'punct'), c('100', 'value'), c('] = {', 'punct'), c('0', 'value'), c('};\n', 'punct'),
          c('int', 'type'), c(' fib(int n) {\n', 'punct'),
          c('  if', 'keyword'), c(' (n <= ', 'punct'), c('1', 'value'), c(') return n;\n', 'punct'),
          c('  if', 'keyword'), c(' (memo[n]) return memo[n];\n', 'punct'),
          c('  return', 'keyword'), c(' memo[n] = fib(n-', 'punct'), c('1', 'value'), c(')+fib(n-', 'punct'), c('2', 'value'), c(');\n}', 'punct'),
        ],
        caption: 'Store result, reuse it — O(n) instead of O(2^n)',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'generic',
        dialogue: 'O(2^n) ஆன O(n) ஆமா? அப்படியா ரொம்ப வேகமா ஆகுது!',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'ஆமாம்! அது தான் DP-ன சக்தி. Overlapping subproblems-ஐ store செய்து, exponential-ஐ polynomial-ஆ மாற்றும். Interview-ல DP question வந்தா இது தான் key!',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! DP = overlapping subproblems + store results. Memoization top-down, tabulation bottom-up. Exponential → polynomial!',
      },
    ],
    practice: {
      question: 'What are the two key properties a problem must have for DP to apply?',
      options: [
        'Sorted input and binary search',
        'Optimal substructure and overlapping subproblems',
        'Recursion and iteration',
        'Graph structure and BFS',
      ],
      answerIndex: 1,
      explanation: 'DP requires optimal substructure (optimal solution built from optimal sub-solutions) and overlapping subproblems (same sub-problems repeat). Without both, DP does not help.',
    },
    challenge: {
      title: 'Add memoization',
      prompt: 'Add a memoization check to this recursive Fibonacci: return cached result if already computed.',
      starter: 'int fib(int n) {\n  if (n <= 1) return n;\n  ___;\n  return fib(n-1) + fib(n-2);\n}',
      hint: 'Check if memo[n] is non-zero, then return it',
      expected: 'int fib(int n) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return fib(n-1) + fib(n-2);\n}',
    },
  },
];

/* ===================== HELPER FUNCTIONS ===================== */

export function getModulesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Module[] {
  if (level === 'intermediate') return intermediateModules;
  if (level === 'advanced') return advancedModules;
  return [];
}

export function getLessonsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Lesson[] {
  if (level === 'intermediate') return intermediateLessons;
  if (level === 'advanced') return advancedLessons;
  return [];
}

export function findLevelLesson(
  lessonId: string,
  level: 'beginner' | 'intermediate' | 'advanced'
): LevelLesson | undefined {
  const pool = level === 'intermediate' ? intermediateLessons : level === 'advanced' ? advancedLessons : [];
  return pool.find((l) => l.id === lessonId);
}
