import type { Lesson } from '@/types';

export const intermediateLessons: Lesson[] = [
  /* ==================== 1. INTRO (INTERMEDIATE) ==================== */
  {
    id: 'intro-what-is-c',
    moduleId: 'intro',
    level: 'intermediate',
    title: 'C Compilation Pipeline (Preprocessing to Linking)',
    tamilTitle: 'C நிரல் மொழிபெயர்ப்பு நிலைகள் (Compilation Stages)',
    duration: 8,
    xp: 75,
    concept: 'C source code goes through Preprocessing (#include expansion), Compiling (Assembly code), Assembling (Object code), and Linking (Executable .exe).',
    tamilExplanation: 'C நிரல் Preprocessor -> Compiler -> Assembler -> Linker என 4 நிலைகளைக் கடந்துதான் .exe கோப்பாக மாறுகிறது.',
    englishTerms: [
      { term: 'Preprocessing', meaning: 'முன்-செயலாக்கம் (#include, #define)' },
      { term: 'Linker', meaning: 'இணைப்பி - libraries சேர்க்கும் கருவி' },
    ],
    realLife: {
      title: 'Building Assembly Line',
      body: 'ஒரு கார் தொழிற்சாலையில் பாகங்கள் பிரிக்கப்பட்டு, தயாரிக்கப்பட்டு, இணைக்கப்படுவது போல compilation நடக்கிறது.',
    },
    visualExplanation: {
      title: 'Compilation Flowchart',
      description: 'main.c -> main.i -> main.s -> main.o -> main.exe',
      diagramType: 'generic',
    },
    code: {
      snippet: '#include <stdio.h>\n#define MAX 100\n\nint main() {\n    printf("Max Limit: %d\\n", MAX);\n    return 0;\n}',
      parts: [
        { text: '#include <stdio.h>\n#define MAX 100\n', tone: 'keyword' },
        { text: 'int main() {\n    printf(', tone: 'plain' },
        { text: '"Max Limit: %d\\n", MAX', tone: 'value' },
        { text: ');\n    return 0;\n}', tone: 'plain' },
      ],
      explanation: [
        { token: '#define MAX 100', meaning: 'Preprocessor MAX-ஐ 100 என மாற்றும்' },
        { token: 'stdio.h', meaning: 'Standard I/O declarations' },
      ],
    },
    outputExplanation: 'Max Limit: 100 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Buddy, C நிரல் எவ்வாறு நேரடியாக கணினியால் இயங்குகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'GCC Compiler நிரலை Preprocessor, Assembly, Object files ஆக மாற்றி இறுதியில் Executable-ஆக மாற்றுகிறது!',
      },
    ],
    practice: {
      question: '#include மற்றும் #define அறிக்கைகளை செயலாக்கும் நிலை எது?',
      options: ['Linker', 'Preprocessor', 'Assembler', 'Loader'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Preprocessor நிலை Macros மற்றும் Header கோப்புகளை விரிவாக்குகிறது.',
    },
    challenge: {
      title: 'Define constant macro',
      prompt: '#define SPEED 80 என வரையறுக்கவும்.',
      starter: '',
      hint: '#define SPEED 80',
      expected: '#define SPEED 80',
    },
  },

  /* ==================== 2. VARIABLES (INTERMEDIATE) ==================== */
  {
    id: 'variables-what-is-var',
    moduleId: 'variables',
    level: 'intermediate',
    title: 'Variable Scope, Lifetime & Storage Classes',
    tamilTitle: 'மாறிகளின் வரம்பு மற்றும் ஆயுட்காலம் (Scope & Lifetime)',
    duration: 8,
    xp: 75,
    concept: 'Variables have Local/Global scope, and Storage Classes (auto, register, static, extern) dictate lifetime and initial values.',
    tamilExplanation: 'Variable-ன் எல்லை (Scope) மற்றும் ஆயுட்காலம் (Lifetime) அதனை எங்கே பயன்படுத்தலாம் என்பதை தீர்மானிக்கிறது.',
    englishTerms: [
      { term: 'Scope', meaning: 'மாறியின் பயன்பாட்டு எல்லை' },
      { term: 'Static Variable', meaning: 'நிலைமாறி - மதிப்பு அழியாத மாறி' },
    ],
    realLife: {
      title: 'House vs Public Park',
      body: 'உங்கள் வீட்டில் உள்ள பொருட்கள் உங்களுக்கு மட்டுமே (Local Scope), பூங்கா பொருட்கள் அனைவருக்கும் (Global Scope).',
    },
    visualExplanation: {
      title: 'Static Variable Memory Retention',
      description: 'Function முடிவடைந்தாலும் static variable மதிப்பு அழியாது.',
      diagramType: 'lunchbox',
    },
    code: {
      snippet: 'void counter() {\n    static int count = 0;\n    count++;\n    printf("%d ", count);\n}',
      parts: [
        { text: 'static int', tone: 'type' },
        { text: ' count = 0;', tone: 'plain' },
      ],
      explanation: [
        { token: 'static', meaning: 'நினைவகத்தில் மதிப்பைத் தக்கவைக்கும்' },
      ],
    },
    outputExplanation: 'Function-ஐ எத்தனை முறை அழைத்தாலும் count மதிப்பு 1, 2, 3 என அதிகரிக்கும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lunchbox',
        dialogue: 'Static variable சாதாரண variable-லிருந்து எவ்வாறு வேறுபடுகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'lunchbox',
        dialogue: 'Static variable function முடிந்த பிறகும் தனது மதிப்பை நினைவகத்தில் தக்க வைத்துக் கொள்ளும்!',
      },
    ],
    practice: {
      question: 'Function அழைப்புகளுக்கு இடையேயும் மதிப்பை அழியாமல் வைக்கும் Storage Class எது?',
      options: ['auto', 'register', 'static', 'extern'],
      answerIndex: 2,
      explanation: '🎉 மிகச் சிறப்பு! static storage class மதிப்பைத் தக்கவைக்கும்.',
    },
    challenge: {
      title: 'Declare static counter',
      prompt: 'static int total = 0; என எழுதவும்.',
      starter: '',
      hint: 'static int total = 0;',
      expected: 'static int total = 0;',
    },
  },

  /* ==================== 3. DATATYPES (INTERMEDIATE) ==================== */
  {
    id: 'datatypes-int',
    moduleId: 'datatypes',
    level: 'intermediate',
    title: 'Type Modifiers & Overflow Limits',
    tamilTitle: 'தரவு மாற்றிகள் மற்றும் நினைவக எல்லைகள் (Modifiers & Overflow)',
    duration: 8,
    xp: 75,
    concept: 'Signed, Unsigned, Short, and Long modify data byte sizes and ranges. Exceeding limits leads to Integer Overflow.',
    tamilExplanation: 'unsigned int நேர்மறை எண்களை மட்டுமே சேமிக்கும். வரம்பை மீறினால் Overflow ஏற்படும்.',
    englishTerms: [
      { term: 'Unsigned', meaning: 'நேர்மறை எண்கள் மட்டுமே (No Negative)' },
      { term: 'Overflow', meaning: 'வரம்பு மீறல்' },
    ],
    realLife: {
      title: 'Odometer Reset',
      body: 'பைக்கில் 99999km முடிந்தவுடன் மீண்டும் 00000km ஆவது போல Integer Overflow நிகழ்கிறது.',
    },
    visualExplanation: {
      title: 'Unsigned vs Signed Range',
      description: 'unsigned char: 0 to 255. signed char: -128 to 127.',
      diagramType: 'generic',
    },
    code: {
      snippet: 'unsigned int score = 4294967295U;\nprintf("Score: %u\\n", score);',
      parts: [
        { text: 'unsigned int', tone: 'type' },
        { text: ' score = 4294967295U;', tone: 'plain' },
      ],
      explanation: [
        { token: 'unsigned int', meaning: '0 முதல் 4.2 பில்லியன் வரை சேமிக்கும்' },
      ],
    },
    outputExplanation: 'Score: 4294967295 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Unsigned integer பயன்படுத்தினால் என்ன நன்மை?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'எதிர்மறை எண்கள் தேவையில்லை எனில், நேர்மறை எண்களின் வரம்பை இருமடங்கு அதிகரிக்கலாம்!',
      },
    ],
    practice: {
      question: 'unsigned int மாறியின் குறைந்தபட்ச மதிப்பு என்ன?',
      options: ['-32768', '-1', '0', '-2147483648'],
      answerIndex: 2,
      explanation: '🎉 அருமை! unsigned மாறிகள் எப்போதும் 0-லிருந்தே தொடங்குகின்றன.',
    },
    challenge: {
      title: 'Declare unsigned long',
      prompt: 'unsigned long limit = 100000UL; என எழுதவும்.',
      starter: '',
      hint: 'unsigned long limit = 100000UL;',
      expected: 'unsigned long limit = 100000UL;',
    },
  },

  /* ==================== 4. OPERATORS (INTERMEDIATE) ==================== */
  {
    id: 'operators-arithmetic',
    moduleId: 'operators',
    level: 'intermediate',
    title: 'Bitwise Operators & Operator Precedence',
    tamilTitle: 'பிட்-நிலை செயற்குறிகள் மற்றும் முன்னுரிமை (Bitwise Operators)',
    duration: 8,
    xp: 75,
    concept: 'Bitwise AND (&), OR (|), XOR (^), Shift Left (<<), Shift Right (>>) compute binary bits directly.',
    tamilExplanation: 'Bitwise செயற்குறிகள் எண்களின் 0s மற்றும் 1s பிட்களை நேரடியாகக் கணக்கிடுகின்றன.',
    englishTerms: [
      { term: 'Bitwise AND (&)', meaning: 'இரு பிட்களும் 1 என்றால் 1' },
      { term: 'Shift Left (<<)', meaning: '2-ஆல் பெருக்கல் (Multiply by 2)' },
    ],
    realLife: {
      title: 'Light Switch Panel',
      body: 'ஒவ்வொரு சுவிட்சும் ஒரு Bit (ON/OFF). Bitwise கணிப்புகள் பல சுவிட்சுகளை ஒரே நேரத்தில் கட்டுப்படுத்துகின்றன.',
    },
    visualExplanation: {
      title: 'Bit Shift Left (a << 1)',
      description: '5 (0101) << 1 = 10 (1010).',
      diagramType: 'generic',
    },
    code: {
      snippet: 'int a = 5; // 0101\nint b = a << 1; // 1010 = 10\nprintf("Result: %d\\n", b);',
      parts: [
        { text: 'int b = a << 1;', tone: 'plain' },
      ],
      explanation: [
        { token: 'a << 1', meaning: 'a-ன் மதிப்பை 2-ஆல் பெருக்குகிறது' },
      ],
    },
    outputExplanation: 'Result: 10 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Bitwise shift வேகமாக கணக்கிடுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'ஆம்! Shift Left (<< 1) என்பது சாதாரண பெருக்கலை விட கணினியில் மிக வேகமாக இயங்கும்!',
      },
    ],
    practice: {
      question: '5 << 1 என்ற கணிப்பின் முடிவு என்ன?',
      options: ['5', '10', '2.5', '20'],
      answerIndex: 1,
      explanation: '🎉 அருமை! இடதுபுற பிட் நகர்வு (5 << 1) மதிப்பை 2-ஆல் பெருக்கி 10 ஆக்குகிறது.',
    },
    challenge: {
      title: 'Write Bitwise Shift',
      prompt: 'int y = x << 2; என எழுதவும்.',
      starter: '',
      hint: 'int y = x << 2;',
      expected: 'int y = x << 2;',
    },
  },

  /* ==================== 5. IO (INTERMEDIATE) ==================== */
  {
    id: 'io-printf',
    moduleId: 'io',
    level: 'intermediate',
    title: 'Formatted Output Width & Return Values',
    tamilTitle: 'வடிவமைக்கப்பட்ட வெளியீடு மற்றும் return மதிப்பு',
    duration: 8,
    xp: 75,
    concept: 'printf returns the total number of characters printed. Width and precision specifiers (%8.2f) format output alignment.',
    tamilExplanation: 'printf சார்பு அச்சிடப்பட்ட மொத்த எழுத்துக்களின் எண்ணிக்கையை (count) திரும்பித் தரும்.',
    englishTerms: [
      { term: 'Precision', meaning: 'தசம புள்ளி துல்லியம்' },
      { term: 'Width', meaning: 'வெளியீட்டின் அகலம்' },
    ],
    realLife: {
      title: 'Bank Statement Table',
      body: 'வங்கி கணக்கு விவரங்களில் தொகைகள் நேர்த்தியாக ஒரே வரிசையில் அச்சிடப்படுவது போன்ற வடிவம்.',
    },
    visualExplanation: {
      title: 'Formatted Width %8.2f',
      description: '  123.45 (மொத்தம் 8 இடங்கள் ஒதுக்கப்படுகிறது)',
      diagramType: 'generic',
    },
    code: {
      snippet: 'float price = 99.50;\nint chars = printf("Price: %8.2f\\n", price);\nprintf("Printed %d chars\\n", chars);',
      parts: [
        { text: 'int chars = printf(...)', tone: 'plain' },
      ],
      explanation: [
        { token: '%8.2f', meaning: '8 இடங்கள் அகலம், 2 தசம புள்ளிகள்' },
      ],
    },
    outputExplanation: 'Price:    99.50 மற்றும் Printed 16 chars என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'printf ஒரு மதிப்பைத் திருப்பித் தருமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'ஆம்! அது திரையில் அச்சிட்ட மொத்த எழுத்துக்களின் எண்ணிக்கையைத் தரும்!',
      },
    ],
    practice: {
      question: 'printf() சார்பு எந்த மதிப்பைத் திருப்பித் தரும்?',
      options: ['0', 'அச்சிடப்பட்ட எழுத்துக்களின் எண்ணிக்கை', '1', 'Void'],
      answerIndex: 1,
      explanation: '🎉 மிகச் சிறப்பு! printf அச்சிடப்பட்ட மொத்த எழுத்துக்களின் எண்ணிக்கையைத் தரும்.',
    },
    challenge: {
      title: 'Format float precision',
      prompt: 'printf("%.2f", 3.14159); என எழுதவும்.',
      starter: '',
      hint: 'printf("%.2f", 3.14159);',
      expected: 'printf("%.2f", 3.14159);',
    },
  },

  /* ==================== 6. IFELSE (INTERMEDIATE) ==================== */
  {
    id: 'ifelse-if',
    moduleId: 'ifelse',
    level: 'intermediate',
    title: 'Ternary Operator (?:) & Switch Case',
    tamilTitle: 'முக்கணி செயற்குறி மற்றும் Switch Case',
    duration: 8,
    xp: 75,
    concept: 'Ternary operator condition ? true_val : false_val simplifies if-else. Switch case provides multi-way branching efficiently.',
    tamilExplanation: 'Ternary operator ஒரே வரியில் if-else எழுத உதவுகிறது. Switch case பல முடிவுகளை வேகமாகத் தேர்ந்தெடுக்கிறது.',
    englishTerms: [
      { term: 'Ternary Operator', meaning: 'முக்கணி செயற்குறி (?:)' },
      { term: 'Switch Case', meaning: 'தேர்வு கிளை அமைப்புகள்' },
    ],
    realLife: {
      title: 'Vending Machine Buttons',
      body: '1 அழுத்தினால் காபி, 2 அழுத்தினால் டீ வருவது போன்ற சுவிட்ச் அமைப்புகள்.',
    },
    visualExplanation: {
      title: 'Ternary Decision Flow',
      description: '(age >= 18) ? Eligible : Not Eligible',
      diagramType: 'traffic',
    },
    code: {
      snippet: 'int age = 20;\nchar* status = (age >= 18) ? "Adult" : "Minor";\nprintf("Status: %s\\n", status);',
      parts: [
        { text: '(age >= 18) ? "Adult" : "Minor"', tone: 'plain' },
      ],
      explanation: [
        { token: '?:', meaning: 'நிபந்தனை உண்மையாயின் Adult, இல்லையேல் Minor' },
      ],
    },
    outputExplanation: 'Status: Adult என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'signal',
        dialogue: 'if-else பதிலாக Ternary operator எப்போது பயன்படுத்தலாம்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'signal',
        dialogue: 'எளிய ஒற்றை வரி முடிவுகளுக்கு Ternary operator மிக நேர்த்தியானது!',
      },
    ],
    practice: {
      question: 'Ternary Operator குறியீடு எது?',
      options: ['if-else', '?:', '&&', '=='],
      answerIndex: 1,
      explanation: '🎉 அருமை! ?: என்பது Ternary Operator ஆகும்.',
    },
    challenge: {
      title: 'Write Ternary Check',
      prompt: 'int max = (a > b) ? a : b; என எழுதவும்.',
      starter: '',
      hint: 'int max = (a > b) ? a : b;',
      expected: 'int max = (a > b) ? a : b;',
    },
  },

  /* ==================== 7. LOOPS (INTERMEDIATE) ==================== */
  {
    id: 'loops-for',
    moduleId: 'loops',
    level: 'intermediate',
    title: 'Nested Loops & Break / Continue Control',
    tamilTitle: 'உள்-மடக்குகள் மற்றும் தவிர்/நிறுத்து கட்டளைகள்',
    duration: 8,
    xp: 75,
    concept: 'Nested loops iterate multi-dimensional structures. break exits loop immediately; continue skips to next iteration.',
    tamilExplanation: 'Nested loops அணிகள் (Matrix) செய்ய பயன்படுகிறது. break சுற்றை நிறுத்தும், continue ஒரு சுற்றைத் தவிர்க்கும்.',
    englishTerms: [
      { term: 'Nested Loop', meaning: 'மடக்குக்குள் மற்றொரு மடக்கு' },
      { term: 'Continue', meaning: 'அடுத்த சுற்றுக்குச் செல்' },
    ],
    realLife: {
      title: 'Clock Hands',
      body: 'நிமிட முள் 60 முறை சுற்றிய பின் மணி முள் 1 முறை நகர்வது போன்ற Nested Loop.',
    },
    visualExplanation: {
      title: 'Nested Loop Iteration Matrix',
      description: 'Outer loop i=1 -> Inner loop j=1, 2, 3.',
      diagramType: 'generic',
    },
    code: {
      snippet: 'for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 2; j++) {\n        printf("(%d,%d) ", i, j);\n    }\n}',
      parts: [
        { text: 'for (int i = 1; i <= 3; i++)', tone: 'type' },
      ],
      explanation: [
        { token: 'Nested Loop', meaning: 'வெளிப்பக்க மடக்கு 3 முறையும் உள்பக்க மடக்கு 2 முறையும் இயங்கும்' },
      ],
    },
    outputExplanation: '(1,1) (1,2) (2,1) (2,2) (3,1) (3,2) என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Continue கட்டளை என்ன செய்யும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'தற்போதைய சுற்றை மட்டும் தவிர்த்துவிட்டு அடுத்த சுற்றுக்கு உடனே சென்றுவிடும்!',
      },
    ],
    practice: {
      question: 'மடக்கை முழுமையாக நிறுத்தி வெளியேற உதவும் கட்டளை எது?',
      options: ['continue', 'break', 'return', 'exit'],
      answerIndex: 1,
      explanation: '🎉 அருமை! break கட்டளை சுற்றை முழுமையாக நிறுத்தும்.',
    },
    challenge: {
      title: 'Write break statement',
      prompt: 'if (i == 5) break; என எழுதவும்.',
      starter: '',
      hint: 'if (i == 5) break;',
      expected: 'if (i == 5) break;',
    },
  },

  /* ==================== 8. STACK (INTERMEDIATE) ==================== */
  {
    id: 'stack-push-pop',
    moduleId: 'stack',
    level: 'intermediate',
    title: 'Stack Array Implementation & Expression Evaluation',
    tamilTitle: 'அணிகள் வழி Stack செயல்படுத்தல் மற்றும் பிரயோகங்கள்',
    duration: 8,
    xp: 75,
    concept: 'Implementing Stack data structure using C arrays, handling top pointer, push, pop operations, and infix-to-postfix evaluation.',
    tamilExplanation: 'C மொழியில் Arrays பயன்படுத்தி Stack உருவாக்குவது மற்றும் Push, Pop வழிமுறைகள்.',
    englishTerms: [
      { term: 'LIFO', meaning: 'கடைசியில் நுழைந்தது முதலில் வெளியேறும்' },
      { term: 'Top Pointer', meaning: 'உச்சியைக் குறிக்கும் சுட்டி' },
    ],
    realLife: {
      title: 'Undo/Redo Feature in Editor',
      body: 'எழுத்து பிழைகளை திருத்த Undo (Ctrl+Z) அழுத்தும்போது Stack பயன்பாடு.',
    },
    visualExplanation: {
      title: 'Stack Array Structure',
      description: 'arr[top++] = val; val = arr[--top];',
      diagramType: 'stack',
    },
    code: {
      snippet: 'int stack[5];\nint top = -1;\n\nvoid push(int val) {\n    if (top < 4) stack[++top] = val;\n}\nint pop() {\n    return (top >= 0) ? stack[top--] : -1;\n}',
      parts: [
        { text: 'stack[++top] = val;', tone: 'plain' },
      ],
      explanation: [
        { token: 'top++', meaning: 'உச்சிச் சுட்டியை 1 அதிகரித்து பின் மதிப்பைச் சேமிக்கும்' },
      ],
    },
    outputExplanation: 'Stack-ல் மதிப்புகள் LIFO வரிசையில் சேமிக்கப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'stack',
        dialogue: 'Stack காலி (Empty) என்பதை எப்படி அறியலாம்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'stack',
        dialogue: 'top சுட்டி -1 ஆக இருந்தால் Stack முற்றிலும் காலியாக உள்ளது!',
      },
    ],
    practice: {
      question: 'Stack காலி நிலையை குறிக்கும் top மதிப்பு எது?',
      options: ['0', '1', '-1', '100'],
      answerIndex: 2,
      explanation: '🎉 அருமை! top == -1 என்பது Stack Empty நிலையைக் குறிக்கும்.',
    },
    challenge: {
      title: 'Write push expression',
      prompt: 'stack[++top] = value; என எழுதவும்.',
      starter: '',
      hint: 'stack[++top] = value;',
      expected: 'stack[++top] = value;',
    },
  },

  /* ==================== 9. QUEUE (INTERMEDIATE) ==================== */
  {
    id: 'queue-enqueue-dequeue',
    moduleId: 'queue',
    level: 'intermediate',
    title: 'Circular Queue Implementation & Boundary Handling',
    tamilTitle: 'வட்ட வரிசை (Circular Queue) மற்றும் நினைவக சிறப்பாக்கம்',
    duration: 8,
    xp: 75,
    concept: 'Circular Queue reuses memory by wrapping front and rear pointers using modulo arithmetic: (rear + 1) % MAX.',
    tamilExplanation: 'Circular Queue நினைவகத்தை வீணாக்காமல் சுழற்சி முறையில் Enqueue மற்றும் Dequeue செய்கிறது.',
    englishTerms: [
      { term: 'FIFO', meaning: 'முதலில் நுழைந்தது முதலில் வெளியேறும்' },
      { term: 'Circular Queue', meaning: 'சுழல் வரிசை அமைப்பு' },
    ],
    realLife: {
      title: 'Traffic Roundabout',
      body: 'சுற்றுச்சாலையில் வாகனங்கள் சுழற்சி முறையில் வந்து செல்வது போன்ற அமைப்பு.',
    },
    visualExplanation: {
      title: 'Circular Queue Ring Buffer',
      description: 'rear = (rear + 1) % SIZE',
      diagramType: 'queue',
    },
    code: {
      snippet: 'int queue[5];\nint front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if ((rear + 1) % 5 == front) return; // Full\n    if (front == -1) front = 0;\n    rear = (rear + 1) % 5;\n    queue[rear] = val;\n}',
      parts: [
        { text: 'rear = (rear + 1) % 5;', tone: 'plain' },
      ],
      explanation: [
        { token: '% 5', meaning: 'வரிசையின் முடிவை அடைந்தவுடன் மீண்டும் 0-க்குச் செல்லும்' },
      ],
    },
    outputExplanation: 'நினைவகம் சுழற்சி முறையில் பயன்படுத்தப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'queue',
        dialogue: 'சாதாரண Queue-வை விட Circular Queue ஏன் சிறந்தது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'queue',
        dialogue: 'காலியான முந்தைய இடங்களை மீண்டும் பயன்படுத்தி நினைவகத்தை மிச்சப்படுத்தும்!',
      },
    ],
    practice: {
      question: 'Circular Queue-ல் rear சுட்டியை நகர்த்த பயன்படும் சமன்பாடு எது?',
      options: ['rear++', 'rear = rear + 1', 'rear = (rear + 1) % SIZE', 'rear = front'],
      answerIndex: 2,
      explanation: '🎉 அருமை! (rear + 1) % SIZE சமன்பாடு சுழற்சியை சாத்தியமாக்குகிறது.',
    },
    challenge: {
      title: 'Write circular increment',
      prompt: 'rear = (rear + 1) % SIZE; என எழுதவும்.',
      starter: '',
      hint: 'rear = (rear + 1) % SIZE;',
      expected: 'rear = (rear + 1) % SIZE;',
    },
  },
];

/* ==================================================================== */
/* ==================== ADVANCED TRACK LESSONS ======================== */
/* ==================================================================== */

export const advancedLessons: Lesson[] = [
  /* ==================== 1. INTRO (ADVANCED) ==================== */
  {
    id: 'intro-what-is-c',
    moduleId: 'intro',
    level: 'advanced',
    title: 'C Memory Architecture (Text, BSS, Heap & Stack)',
    tamilTitle: 'C நினைவகக் கட்டமைப்பு (Heap, Stack, Data & Text Segments)',
    duration: 10,
    xp: 100,
    concept: 'A C process memory layout consists of Text Segment (instructions), Data Segment (initialized globals), BSS (uninitialized globals), Heap (dynamic allocation), and Stack (local variables).',
    tamilExplanation: 'C நிரல் இயங்கும் போது நினைவகம் 5 முக்கிய பகுதிகளாகப் பிரிக்கப்படுகிறது: Text, Data, BSS, Heap மற்றும் Stack.',
    englishTerms: [
      { term: 'BSS Segment', meaning: 'ஆரம்ப மதிப்பு இல்லாத உலகளாவிய மாறிகள்' },
      { term: 'Heap Segment', meaning: 'டைனமிக் நினைவக ஒதுக்கீட்டுப் பகுதி' },
    ],
    realLife: {
      title: 'Multi-Floor Building Architecture',
      body: 'கட்டிடத்தில் தரைத் தளம், அறைகள், சேமிப்புக் கிடங்கு தனித்தனியாக இருப்பது போல நினைவகப் பிரிவுகள் உள்ளன.',
    },
    visualExplanation: {
      title: 'Process Memory Map',
      description: 'High Address [Stack ↓] <---> [Heap ↑] [BSS] [Data] [Text] Low Address',
      diagramType: 'generic',
    },
    code: {
      snippet: '#include <stdio.h>\n#include <stdlib.h>\n\nint global_var = 10; // Data Segment\nint uninit_var; // BSS Segment\n\nint main() {\n    int local_var = 5; // Stack Segment\n    int *ptr = (int*)malloc(sizeof(int)); // Heap Segment\n    free(ptr);\n    return 0;\n}',
      parts: [
        { text: 'int *ptr = (int*)malloc(sizeof(int));', tone: 'type' },
      ],
      explanation: [
        { token: 'malloc', meaning: 'Heap நினைவகத்தில் இடத்தை ஒதுக்கும்' },
        { token: 'local_var', meaning: 'Stack பகுதியில் சேமிக்கப்படும்' },
      ],
    },
    outputExplanation: 'நினைவகம் 4 வெவ்வேறு பிரிவுகளில் பாதுகாப்பாக நிர்வகிக்கப்படுகிறது.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Heap மற்றும் Stack நினைவகத்திற்கு என்ன வித்தியாசம்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'Stack வேகமாக இயங்கும் தானியங்கி நினைவகம்; Heap என்பது developer நேரடியாகக் கட்டுப்படுத்தும் பெரிய நினைவகம்!',
      },
    ],
    practice: {
      question: 'malloc() மூலம் ஒதுக்கப்படும் நினைவகம் எந்தப் பிரிவில் சேமிக்கப்படும்?',
      options: ['Stack', 'BSS', 'Heap', 'Text'],
      answerIndex: 2,
      explanation: '🎉 அற்புதம்! malloc() எப்போதும் Heap நினைவகப் பகுதியையேப் பயன்படுத்தும்.',
    },
    challenge: {
      title: 'Write malloc allocation',
      prompt: 'int *p = (int*)malloc(sizeof(int)); என எழுதவும்.',
      starter: '',
      hint: 'int *p = (int*)malloc(sizeof(int));',
      expected: 'int *p = (int*)malloc(sizeof(int));',
    },
  },

  /* ==================== 2. VARIABLES (ADVANCED) ==================== */
  {
    id: 'variables-what-is-var',
    moduleId: 'variables',
    level: 'advanced',
    title: 'Pointers to Variables & Volatile Keyword',
    tamilTitle: 'சுட்டிகள் (Pointers) மற்றும் Volatile மாறிகள்',
    duration: 10,
    xp: 100,
    concept: 'Pointer variables store hexadecimal memory addresses. The volatile keyword prevents compiler optimization for hardware registers.',
    tamilExplanation: 'Pointer என்பது நினைவக முகவரியைச் சேமிக்கும் மாறி. Volatile என்பது Hardware மதிப்புகள் மாறும் போது Compiler உகப்பாக்கத்தைத் (Optimization) தடுக்கும்.',
    englishTerms: [
      { term: 'Pointer Variable', meaning: 'நினைவக முகவரியைச் சேமிக்கும் மாறி' },
      { term: 'Volatile Keyword', meaning: 'Compiler உகப்பாக்கத்தைத் தடுக்கும் சொல்' },
    ],
    realLife: {
      title: 'GPS Coordinates vs House',
      body: 'வீடு என்பது Variable; வீட்டின் அட்சரேகை/தீர்க்கரேகை GPS முகவரி என்பது Pointer.',
    },
    visualExplanation: {
      title: 'Pointer Reference (ptr -> &val)',
      description: 'int val = 100; int *ptr = &val;',
      diagramType: 'memory',
    },
    code: {
      snippet: 'int num = 50;\nint *ptr = &num;\nprintf("Address: %p, Value: %d\\n", (void*)ptr, *ptr);',
      parts: [
        { text: 'int *ptr = &num;', tone: 'type' },
      ],
      explanation: [
        { token: '&num', meaning: 'num மாறியின் நினைவக முகவரி (Address)' },
        { token: '*ptr', meaning: 'முகவரியில் உள்ள மதிப்பு (Dereference)' },
      ],
    },
    outputExplanation: 'Address: 0x7ffd... Value: 50 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'memory',
        dialogue: 'Volatile குறியீட்டுச் சொல் எப்போது பயன்படுகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'memory',
        dialogue: 'Hardware Sensor அல்லது Microcontroller பதிவேடுகளின் மதிப்புகள் தானாக மாறும் போது Compiler அதை மாற்றாமல் தடுக்க பயன்படுகிறது!',
      },
    ],
    practice: {
      question: 'ஒரு மாறியின் நினைவக முகவரியைப் பெற பயன்படும் குறியீடு எது?',
      options: ['*', '&', '%', '#'],
      answerIndex: 1,
      explanation: '🎉 அருமை! & (Address-of) குறியீடு முகவரியைத் தரும்.',
    },
    challenge: {
      title: 'Declare pointer variable',
      prompt: 'int *ptr = &val; என எழுதவும்.',
      starter: '',
      hint: 'int *ptr = &val;',
      expected: 'int *ptr = &val;',
    },
  },

  /* ==================== 3. DATATYPES (ADVANCED) ==================== */
  {
    id: 'datatypes-int',
    moduleId: 'datatypes',
    level: 'advanced',
    title: 'Struct Padding, Memory Alignment & #pragma pack',
    tamilTitle: 'நினைவக ஒழுங்கமைப்பு மற்றும் Struct Padding',
    duration: 10,
    xp: 100,
    concept: 'Compilers align data types to word boundaries (4/8 bytes) by adding Padding bytes. #pragma pack(1) disables padding for compact structures.',
    tamilExplanation: 'கணினியின் Processor வேகமாக படிக்க ஏதுவாக Struct உறுப்புகளுக்கு இடையே வெற்றிடங்களை (Padding Bytes) சேர்க்கும்.',
    englishTerms: [
      { term: 'Memory Alignment', meaning: 'நினைவக நேர்த்தியாக்கம்' },
      { term: 'Struct Padding', meaning: 'நினைவக இடைவெளி நிரப்புதல்' },
    ],
    realLife: {
      title: 'Egg Tray Packing',
      body: 'முட்டை தட்டில் 6 முட்டைகள் வைக்கும் கட்டத்தில் காலியிடங்கள் விடுவது போன்ற ஒழுங்கமைப்பு.',
    },
    visualExplanation: {
      title: 'Aligned vs Packed Struct Memory',
      description: 'struct Data { char c; int i; }; // Size is 8 bytes (3 padding bytes added)',
      diagramType: 'generic',
    },
    code: {
      snippet: '#pragma pack(1)\nstruct Student {\n    char grade;\n    int age;\n};\nprintf("Size: %lu bytes\\n", sizeof(struct Student));',
      parts: [
        { text: '#pragma pack(1)', tone: 'keyword' },
      ],
      explanation: [
        { token: '#pragma pack(1)', meaning: 'Padding இல்லாமல் 5 Bytes என சுருக்கும்' },
      ],
    },
    outputExplanation: 'Size: 5 bytes என சுருக்கமாக அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'char (1 byte) + int (4 bytes) சேர்த்தால் 5 வர வேண்டும், ஏன் 8 வருகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'Processor 4-byte எல்லைகளில் வேகமாகப் படிப்பதற்காக 3 Padding bytes-ஐ தானாகச் சேர்க்கிறது!',
      },
    ],
    practice: {
      question: 'Struct Padding-ஐத் தடுத்து நினைவகத்தைச் சுருக்க உதவும் directive எது?',
      options: ['#include', '#define', '#pragma pack(1)', '#undef'],
      answerIndex: 2,
      explanation: '🎉 அருமை! #pragma pack(1) நினைவகப் பயன்பாட்டைக் குறைக்கிறது.',
    },
    challenge: {
      title: 'Write pragma pack',
      prompt: '#pragma pack(1) என எழுதவும்.',
      starter: '',
      hint: '#pragma pack(1)',
      expected: '#pragma pack(1)',
    },
  },

  /* ==================== 4. OPERATORS (ADVANCED) ==================== */
  {
    id: 'operators-arithmetic',
    moduleId: 'operators',
    level: 'advanced',
    title: 'Advanced Bitwise Hacks (Masking, Toggling & Clearing Bits)',
    tamilTitle: 'உயர்ந்த பிட் கையாளுதல் (Bit Masking & Clearing)',
    duration: 10,
    xp: 100,
    concept: 'Bitwise Masking uses & ~ to clear bits, | to set bits, and ^ to toggle bits efficiently in low-level drivers.',
    tamilExplanation: 'Hardware drivers எழுத பிட்களை செட் செய்யவும் (Set), அழிக்கவும் (Clear) Masking பயன்படுகிறது.',
    englishTerms: [
      { term: 'Bit Masking', meaning: 'குறிப்பிட்ட பிட்களை மறைத்தல்/மாற்றுதல்' },
      { term: 'Toggle Bit', meaning: '0-ஐ 1 ஆகவும் 1-ஐ 0 ஆகவும் மாற்றுதல்' },
    ],
    realLife: {
      title: 'Stencil Painting',
      body: 'அச்சுத் தாளைக் கொண்டு குறிப்பிட்ட இடத்தில் மட்டும் வண்ணம் தீட்டுவது போல Bit Masking செயல்படுகிறது.',
    },
    visualExplanation: {
      title: 'Set 3rd Bit (val |= (1 << 3))',
      description: '00000000 | 00001000 = 00001000',
      diagramType: 'generic',
    },
    code: {
      snippet: 'int flags = 0;\nflags |= (1 << 3); // Set 3rd bit\nprintf("Flags: %d\\n", flags);',
      parts: [
        { text: 'flags |= (1 << 3);', tone: 'plain' },
      ],
      explanation: [
        { token: '1 << 3', meaning: '3-வது இடத்தில் உள்ள பிட்டை 1 ஆக்குகிறது' },
      ],
    },
    outputExplanation: 'Flags: 8 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Bit Masking எங்கே பயன்படுகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'Embedded Systems, Operating System Kernel மற்றும் Graphics Engine-களில் மிக வேகமாக இயங்க பயன்படுகிறது!',
      },
    ],
    practice: {
      question: 'ஒரு குறிப்பிட்ட பிட்டை 1 ஆக மாற்ற (Set Bit) எந்த செயற்குறி பயன்படுகிறது?',
      options: ['&', '|', '^', '~'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Bitwise OR (|) செயற்குறி பிட்டை 1 ஆக்கும்.',
    },
    challenge: {
      title: 'Write Set Bit expression',
      prompt: 'reg |= (1 << n); என எழுதவும்.',
      starter: '',
      hint: 'reg |= (1 << n);',
      expected: 'reg |= (1 << n);',
    },
  },

  /* ==================== 5. IO (ADVANCED) ==================== */
  {
    id: 'io-printf',
    moduleId: 'io',
    level: 'advanced',
    title: 'Custom Stream Buffering & Variadic Functions',
    tamilTitle: 'தனிப்பயன் Streams மற்றும் Variadic சார்புகள் (va_list)',
    duration: 10,
    xp: 100,
    concept: 'Variadic functions (stdarg.h) accept variable arguments (like printf). Stream buffering (setvbuf, fflush) manages output flushes.',
    tamilExplanation: 'printf போன்ற எத்தனை அளவுருக்கள் வேண்டுமானாலும் அனுப்பக்கூடிய Variadic சார்புகளை உருவாக்கும் முறை.',
    englishTerms: [
      { term: 'Variadic Function', meaning: 'மாறுபடும் அளவுருக்கள் கொண்ட சார்பு' },
      { term: 'Buffer Flush', meaning: 'நினைவகத்திலிருந்து வெளியீட்டை உடனே தள்ளுதல்' },
    ],
    realLife: {
      title: 'Custom Recipe Master',
      body: 'தேவைக்கேற்ப எத்தனை பொருட்கள் வேண்டுமானாலும் சேர்க்கும் சமையல் கலைஞர் போன்ற சார்பு.',
    },
    visualExplanation: {
      title: 'va_list Argument Extraction',
      description: 'va_start -> va_arg -> va_end',
      diagramType: 'generic',
    },
    code: {
      snippet: '#include <stdarg.h>\nvoid customLog(int count, ...) {\n    va_list args;\n    va_start(args, count);\n    for (int i=0; i<count; i++) printf("%d ", va_arg(args, int));\n    va_end(args);\n}',
      parts: [
        { text: 'va_list args;', tone: 'type' },
      ],
      explanation: [
        { token: 'va_list', meaning: 'அளவுருக்கள் பட்டியலை நிர்வகிக்கும் வகை' },
      ],
    },
    outputExplanation: 'அனுப்பப்பட்ட அனைத்து எண்களும் வரிசையாக அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'printf எவ்வாறு எத்தனை எண்கள் கொடுத்தாலும் ஏற்றுக்கொள்கிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'அது stdarg.h-ல் உள்ள Variadic Function (va_list) அமைப்பைப் பயன்படுத்துவதால் சாத்தியமாகிறது!',
      },
    ],
    practice: {
      question: 'Variadic சார்புகளை வரையறுக்க எந்த Header file தேவை?',
      options: ['stdio.h', 'stdlib.h', 'stdarg.h', 'string.h'],
      answerIndex: 2,
      explanation: '🎉 அருமை! stdarg.h கோப்பில் va_list, va_start வரையறுக்கப்பட்டுள்ளன.',
    },
    challenge: {
      title: 'Write va_start initialization',
      prompt: 'va_start(args, count); என எழுதவும்.',
      starter: '',
      hint: 'va_start(args, count);',
      expected: 'va_start(args, count);',
    },
  },

  /* ==================== 6. IFELSE (ADVANCED) ==================== */
  {
    id: 'ifelse-if',
    moduleId: 'ifelse',
    level: 'advanced',
    title: 'Branch Prediction & Jump Tables Optimization',
    tamilTitle: 'கணினியின் வேகமான கிளை கணிப்புகள் (Branch Prediction & Jump Tables)',
    duration: 10,
    xp: 100,
    concept: 'Compilers convert dense switch statements into Jump Tables (O(1) lookup). Branch Prediction predicts condition outcomes for CPU pipeline speed.',
    tamilExplanation: 'Compiler பெரிய Switch case-களை Jump Table ஆக மாற்றி O(1) வேகத்தில் இயக்கும்.',
    englishTerms: [
      { term: 'Branch Prediction', meaning: 'CPU-ன் கிளை கணிப்பு யூகம்' },
      { term: 'Jump Table', meaning: 'நேரடி தாவல் அட்டவணை' },
    ],
    realLife: {
      title: 'Elevator Direct Floor Button',
      body: 'ஒவ்வொரு மாடியாக நிற்காமல் நேரடியாக 10வது மாடிக்குச் செல்லும் மின்தூக்கி போன்ற Jump Table.',
    },
    visualExplanation: {
      title: 'Jump Table Indexing',
      description: 'switch(val) -> JumpTable[val]() -> O(1) Time',
      diagramType: 'traffic',
    },
    code: {
      snippet: 'int code = 2;\nswitch(code) {\n    case 1: printf("One\\n"); break;\n    case 2: printf("Two\\n"); break;\n    default: printf("Other\\n");\n}',
      parts: [
        { text: 'switch(code)', tone: 'keyword' },
      ],
      explanation: [
        { token: 'switch', meaning: 'Jump Table மூலம் நேரடியாக Case 2-க்குத் தாவும்' },
      ],
    },
    outputExplanation: 'Two என O(1) வேகத்தில் அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'signal',
        dialogue: 'if-else ladder-ஐ விட switch case ஏன் சில நேரங்களில் வேகமாக இயங்குகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'signal',
        dialogue: 'Switch case-ஐ Compiler Jump Table-ஆக மாற்றுவதால் அனைத்து நிபந்தனைகளையும் ஒவ்வொன்றாக சரிபார்க்கத் தேவையில்லை!',
      },
    ],
    practice: {
      question: 'Switch Case-ஐ Compiler எந்த அமைப்பாக மாற்றி வேகப்படுத்துகிறது?',
      options: ['Linked List', 'Jump Table', 'Stack Frame', 'Binary Tree'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Jump Table நேரடித் தாவல் மூலம் O(1) வேகத்தை அளிக்கிறது.',
    },
    challenge: {
      title: 'Write switch header',
      prompt: 'switch (option) என எழுதவும்.',
      starter: '',
      hint: 'switch (option)',
      expected: 'switch (option)',
    },
  },

  /* ==================== 7. LOOPS (ADVANCED) ==================== */
  {
    id: 'loops-for',
    moduleId: 'loops',
    level: 'advanced',
    title: 'Loop Unrolling & Cache Locality Optimizations',
    tamilTitle: 'மடக்கு வேகமாக்கம் (Loop Unrolling & Cache Performance)',
    duration: 10,
    xp: 100,
    concept: 'Loop Unrolling reduces branch overhead by executing multiple steps per loop iteration. Cache Locality optimizes sequential memory access.',
    tamilExplanation: 'Loop Unrolling என்பது மடக்கின் சுற்றுகளைக் குறைத்து CPU Branch Overhead-ஐத் தடுக்கும் தொழில் நுட்பமாகும்.',
    englishTerms: [
      { term: 'Loop Unrolling', meaning: 'மடக்கு விரிவாக்கம்' },
      { term: 'Cache Locality', meaning: 'வேக நினைவகத்தின் தொடர்ச்சி' },
    ],
    realLife: {
      title: 'Carrying 4 Boxes at Once',
      body: 'ஒவ்வொரு பெட்டியாக 4 முறை தூக்காமல், ஒரே நேரத்தில் 4 பெட்டிகளையும் தூக்கிச் செல்வது போன்ற விரிவாக்கம்.',
    },
    visualExplanation: {
      title: 'Unrolled Loop Iteration',
      description: 'for(i=0; i<N; i+=4) { arr[i]; arr[i+1]; arr[i+2]; arr[i+3]; }',
      diagramType: 'generic',
    },
    code: {
      snippet: 'int arr[4] = {1, 2, 3, 4};\n// Unrolled Loop\narr[0] += 5;\narr[1] += 5;\narr[2] += 5;\narr[3] += 5;',
      parts: [
        { text: 'arr[0] += 5;', tone: 'plain' },
      ],
      explanation: [
        { token: 'Unrolling', meaning: 'Loop நிபந்தனை சரிபார்ப்பு சுமை (Overhead) தவிர்க்கப்படுகிறது' },
      ],
    },
    outputExplanation: 'அணியின் மதிப்புகள் மிக வேகமாக மாற்றப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Loop Unrolling எவ்வாறு செயல்திறனை அதிகரிக்கும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'மடக்கு முடிவடையும் ஒவ்வொரு முறையும் நடக்கும் நிபந்தனைச் சோதனையைக் (Branch condition) குறைக்கும்!',
      },
    ],
    practice: {
      question: 'Loop Unrolling-ன் முதன்மை பயன் என்ன?',
      options: ['நினைவகம் அதிகரிக்கும்', 'Branch Overhead குறையும்', 'Code அளவு சுருங்கும்', 'Errors வராது'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Branch Overhead குறைந்து வேகம் அதிகரிக்கும்.',
    },
    challenge: {
      title: 'Write unrolled step',
      prompt: 'for (int i = 0; i < N; i += 2) என எழுதவும்.',
      starter: '',
      hint: 'for (int i = 0; i < N; i += 2)',
      expected: 'for (int i = 0; i < N; i += 2)',
    },
  },

  /* ==================== 8. STACK (ADVANCED) ==================== */
  {
    id: 'stack-push-pop',
    moduleId: 'stack',
    level: 'advanced',
    title: 'Linked List Dynamic Stack & Call Stack Frame (EBP/ESP)',
    tamilTitle: 'இணைக்கப்பட்ட பட்டியல் Stack மற்றும் Call Stack Frame',
    duration: 10,
    xp: 100,
    concept: 'Dynamic Stack using Linked List allows unlimited stack growth. CPU uses Stack Frames (ESP/EBP) for function arguments and return addresses.',
    tamilExplanation: 'Linked List பயன்படுத்தி எல்லையற்ற Dynamic Stack உருவாக்குதல் மற்றும் CPU Function Call Stack இயக்கம்.',
    englishTerms: [
      { term: 'Linked List Stack', meaning: 'வரம்பற்ற நினைவக Stack' },
      { term: 'Stack Frame', meaning: 'சார்பு அழைப்பு நினைவகப் பெட்டி' },
    ],
    realLife: {
      title: 'Chain of Bookmarks',
      body: 'புத்தகத்தில் பல பக்கங்களில் குறிப்புகள் வைத்து ஒன்றிலிருந்து ஒன்றுக்குச் செல்வது போன்ற அமைப்பு.',
    },
    visualExplanation: {
      title: 'Linked List Node Stack (top -> Node3 -> Node2 -> NULL)',
      description: 'struct Node { int data; struct Node *next; };',
      diagramType: 'stack',
    },
    code: {
      snippet: 'struct Node {\n    int data;\n    struct Node *next;\n} *top = NULL;\n\nvoid push(int val) {\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = top;\n    top = newNode;\n}',
      parts: [
        { text: 'newNode->next = top;', tone: 'type' },
      ],
      explanation: [
        { token: 'malloc', meaning: 'Dynamic ஆக நினைவகத்தைப் பெறும்' },
      ],
    },
    outputExplanation: 'நினைவகம் இருக்கும் வரை Stack எல்லையின்றி வளரும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'stack',
        dialogue: 'Array Stack-ஐ விட Linked List Stack ஏன் சிறந்தது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'stack',
        dialogue: 'Array Stack-ல் எல்லை (Fixed Size) உண்டு. Linked List Stack-ல் நினைவகம் உள்ளவரை Push செய்யலாம் (No Overflow)!',
      },
    ],
    practice: {
      question: 'Linked List Stack-ல் புதிய உறுப்பை Push செய்ய எங்கு நினைவகம் ஒதுக்கப்படுகிறது?',
      options: ['Stack', 'Heap', 'BSS', 'Text'],
      answerIndex: 1,
      explanation: '🎉 அற்புதம்! malloc() மூலம் Heap நினைவகத்தில் இடம் பெறுகிறது.',
    },
    challenge: {
      title: 'Write struct Node pointer',
      prompt: 'struct Node *next; என எழுதவும்.',
      starter: '',
      hint: 'struct Node *next;',
      expected: 'struct Node *next;',
    },
  },

  /* ==================== 9. QUEUE (ADVANCED) ==================== */
  {
    id: 'queue-enqueue-dequeue',
    moduleId: 'queue',
    level: 'advanced',
    title: 'Priority Queue & Double-Ended Queue (Deque)',
    tamilTitle: 'முன்னுரிமை வரிசை (Priority Queue) மற்றும் Deque',
    duration: 10,
    xp: 100,
    concept: 'Priority Queue serves elements based on priority level rather than arrival order. Deque allows insertion/deletion at both front and rear ends.',
    tamilExplanation: 'Priority Queue என்பது முக்கியத்துவத்தின் அடிப்படையில் சேவைகளை அளிக்கும். Deque இரு பக்கமும் சேர்க்க/நீக்க உதவும்.',
    englishTerms: [
      { term: 'Priority Queue', meaning: 'முன்னுரிமை வரிசை' },
      { term: 'Deque', meaning: 'இருமுனை வரிசை' },
    ],
    realLife: {
      title: 'Hospital Emergency Ward',
      body: 'மருத்துவமனையில் சாதாரண நோயாளிகளை விட அவசர சிகிச்சை நோயாளிக்கு (Emergency Case) முதல் முன்னுரிமை தருவது.',
    },
    visualExplanation: {
      title: 'Priority Queue Min-Heap / Max-Heap',
      description: 'Highest Priority Element Served First',
      diagramType: 'queue',
    },
    code: {
      snippet: 'struct Element {\n    int data;\n    int priority;\n};\n// Priority 1 > Priority 2 > Priority 3',
      parts: [
        { text: 'int priority;', tone: 'type' },
      ],
      explanation: [
        { token: 'priority', meaning: 'முன்னுரிமை எண் அடிப்படையில் Dequeue செய்யப்படும்' },
      ],
    },
    outputExplanation: 'அதிக முன்னுரிமை கொண்ட தரவு முதலில் வெளியேறும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'queue',
        dialogue: 'Priority Queue எங்கே பயன்படுகிறது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'queue',
        dialogue: 'Operating System Process Scheduling (Dijkstra Shortest Path) போன்ற இடங்களில் பயன்படுகிறது!',
      },
    ],
    practice: {
      question: 'முன்னுரிமை அடிப்படையில் தரவை செயலாக்கும் வரிசை எது?',
      options: ['Standard Queue', 'Circular Queue', 'Priority Queue', 'Stack'],
      answerIndex: 2,
      explanation: '🎉 அருமை! Priority Queue முன்னுரிமைக்கேற்ப செயலாக்கும்.',
    },
    challenge: {
      title: 'Write Priority struct field',
      prompt: 'int priority; என எழுதவும்.',
      starter: '',
      hint: 'int priority;',
      expected: 'int priority;',
    },
  },
];
