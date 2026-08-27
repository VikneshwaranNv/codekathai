import type { Lesson } from '@/types';
import { intermediateLessons, advancedLessons } from './intermediateAdvancedLessons';
import { modules } from './course';

export const beginnerLessons: Lesson[] = [
  /* ==================== 1. INTRO ==================== */
  {
    id: 'intro-what-is-c',
    moduleId: 'intro',
    level: 'beginner',
    title: 'What is C & History',
    tamilTitle: 'C மொழி என்றால் என்ன?',
    duration: 5,
    xp: 50,
    concept: 'C is a general-purpose, procedural programming language developed in 1972 by Dennis Ritchie at Bell Labs.',
    tamilExplanation: 'C என்பது மென்பொருள்கள் எழுத பயன்படும் ஒரு சக்திவாய்ந்த கணினி மொழியாகும். 1972-ல் டென்னிஸ் ரிட்சி என்பவரால் உருவாக்கப்பட்டது.',
    englishTerms: [
      { term: 'Programming Language', meaning: 'நிரலாக்க மொழி' },
      { term: 'Compiler', meaning: 'நிரல் மொழிபெயர்ப்பி' },
    ],
    realLife: {
      title: 'Universal Language',
      body: 'உலகில் அனைவரும் புரிந்துகொள்ளும் ஆங்கிலம் போல, கணினிகளுக்கு இயங்குதளங்கள் (OS) எழுத C மொழி பயன்படுகிறது.',
    },
    visualExplanation: {
      title: 'Human to Computer Translation',
      description: 'C Code -> Compiler -> Binary Machine Code (0s & 1s).',
      diagramType: 'generic',
    },
    code: {
      snippet: '#include <stdio.h>\nint main() {\n    printf("Vanakkam!");\n    return 0;\n}',
      parts: [
        { text: '#include <stdio.h>\n', tone: 'keyword' },
        { text: 'int main() {\n    printf(', tone: 'plain' },
        { text: '"Vanakkam!"', tone: 'value' },
        { text: ');\n    return 0;\n}', tone: 'plain' },
      ],
      explanation: [
        { token: 'stdio.h', meaning: 'Standard Input Output Header file' },
        { token: 'main()', meaning: 'நிரல் தொடங்கும் இடம் (Entry point)' },
      ],
    },
    outputExplanation: 'திரையில் Vanakkam! என்று அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Buddy, C மொழியை ஏன் Mother of Languages என்று கூறுகிறார்கள்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'C++ Java, Python போன்ற பல மொழிகளுக்கு C மொழியே அடித்தளமாக இருந்தது!',
      },
    ],
    practice: {
      question: 'C மொழியை உருவாக்கியவர் யார்?',
      options: ['Dennis Ritchie', 'James Gosling', 'Guido van Rossum', 'Bjarne Stroustrup'],
      answerIndex: 0,
      explanation: '🎉 Super! Dennis Ritchie 1972-ல் C மொழியை உருவாக்கினார்.',
    },
    challenge: {
      title: 'Write First Statement',
      prompt: 'printf("Hello World"); என அச்சிடுங்கள்.',
      starter: '',
      hint: 'printf("Hello World");',
      expected: 'printf("Hello World");',
    },
  },

  /* ==================== 2. VARIABLES ==================== */
  {
    id: 'variables-what-is-var',
    moduleId: 'variables',
    level: 'beginner',
    title: 'What is a Variable?',
    tamilTitle: 'Variable என்றால் என்ன?',
    duration: 5,
    xp: 50,
    concept: 'A variable is a named storage container in computer memory used to hold data values.',
    tamilExplanation: 'Variable என்பது data-வை store பண்ணி வைக்கிற ஒரு box மாதிரி. அந்த box-க்கு ஒரு பெயர் வைப்போம்.',
    englishTerms: [
      { term: 'Variable', meaning: 'மாறி - தரவைச் சேமிக்கும் பெட்டி' },
      { term: 'Value', meaning: 'பெட்டியில் உள்ள மதிப்பு' },
    ],
    realLife: {
      title: 'School Lunch Box',
      body: 'Lunch box-ல் பெயர் எழுதப்பட்டு உணவு வைக்கப்படுவது போல, Variable-ல் பெயர் எழுதப்பட்டு data சேமிக்கப்படுகிறது.',
    },
    visualExplanation: {
      title: 'Memory Box Concept',
      description: 'Computer memory-யில் age என்ற பெயர் கொண்ட பெட்டி.',
      diagramType: 'lunchbox',
    },
    code: {
      snippet: 'int age = 20;',
      parts: [
        { text: 'int', tone: 'type' },
        { text: ' age = ', tone: 'plain' },
        { text: '20', tone: 'value' },
        { text: ';', tone: 'punct' },
      ],
      explanation: [{ token: 'age = 20', meaning: 'age மாறியினுள் 20 சேமிக்கப்படுகிறது' }],
    },
    outputExplanation: 'age என்ற Variable உருவாக்கப்பட்டு, அதில் 20 சேமிக்கப்படுகிறது.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lunchbox',
        dialogue: 'இந்த lunch box-க்கு ஒரு name இருக்கு. அதுக்குள்ள food வைக்கலாம் இல்லையா, Buddy?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'memory',
        dialogue: 'Super Kavi! Programming-ல Variable-ம் இதே மாதிரி தான்! Data-வை store பண்ணும் பெட்டி.',
      },
    ],
    practice: {
      question: 'Integer (முழு எண்) மதிப்பை சேமிக்க எந்த keyword பயன்படும்?',
      options: ['float', 'int', 'char', 'void'],
      answerIndex: 1,
      explanation: '🎉 Super! int என்பது Integer மதிப்பை சேமிக்கும் keyword.',
    },
    challenge: {
      title: 'Declare age variable',
      prompt: 'myAge என்ற integer variable 18 என அறிவிக்கவும்.',
      starter: '',
      hint: 'int myAge = 18;',
      expected: 'int myAge = 18;',
    },
  },
  /* ==================== 3. DATA TYPES ==================== */
  {
    id: 'datatypes-int',
    moduleId: 'datatypes',
    level: 'beginner',
    title: 'Integer (int) & Storage Jars',
    tamilTitle: 'முழு எண் (int) மற்றும் சேமிப்பு பாத்திரங்கள்',
    duration: 5,
    xp: 50,
    concept: 'Data types define the type and size of data that a variable can hold in C.',
    tamilExplanation: 'அரிசிக்கு ஒரு பாத்திரம், எண்ணெய்க்கு ஒரு பாத்திரம் போல எண்களுக்கும் எழுத்துக்களுக்கும் தனி Data Types உள்ளன.',
    englishTerms: [{ term: 'int', meaning: 'Integer (முழு எண்)' }],
    realLife: { title: 'Kitchen Jars', body: 'சமையலறை பாத்திரங்கள் உவமை.' },
    visualExplanation: {
      title: 'Storage Jars',
      description: 'int = 4 Bytes jar, char = 1 Byte jar.',
      diagramType: 'containers',
    },
    code: {
      snippet: 'int count = 50;',
      parts: [{ text: 'int count = 50;', tone: 'plain' }],
      explanation: [{ token: 'int', meaning: '4 Bytes நினைவகம் ஒதுக்கும்' }],
    },
    outputExplanation: '50 என்ற எண் count மாறியினுள் சேமிக்கப்படுகிறது.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'containers',
        dialogue: 'Buddy, int-ல 10.5 வைக்க முடியுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'containers',
        dialogue: 'இல்லை Kavi! தசம எண்களுக்கு float பயன்படுத்த வேண்டும்.',
      },
    ],
    practice: {
      question: 'int data type நினைவகத்தில் எத்தனை Bytes எடுக்கும்?',
      options: ['1 Byte', '4 Bytes', '8 Bytes', '0 Bytes'],
      answerIndex: 1,
      explanation: '🎉 சரி! int 4 Bytes எடுக்கும்.',
    },
    challenge: {
      title: 'Store count',
      prompt: 'int total = 100; என சேமிக்கவும்.',
      starter: '',
      hint: 'int total = 100;',
      expected: 'int total = 100;',
    },
  },

  /* ==================== 4. OPERATORS ==================== */
  {
    id: 'operators-arithmetic',
    moduleId: 'operators',
    level: 'beginner',
    title: 'Arithmetic Operators',
    tamilTitle: 'கணித செயற்குறிகள்',
    duration: 5,
    xp: 50,
    concept: 'Operators perform mathematical operations like +, -, *, /, %.',
    tamilExplanation: 'Calculator-ல் உள்ள கூட்டல், கழித்தல் கணக்கீடுகள்.',
    englishTerms: [{ term: 'Modulus (%)', meaning: 'வகுத்தல் மீதி' }],
    realLife: { title: 'Shopping Bill', body: 'விலைகளைக் கூட்டி தள்ளுபடி கழித்தல்.' },
    visualExplanation: {
      title: 'Calculator Flow',
      description: '10 % 3 = 1 கணக்கீடு.',
      diagramType: 'calculator',
    },
    code: {
      snippet: 'int rem = 10 % 3;',
      parts: [{ text: 'int rem = 10 % 3;', tone: 'plain' }],
      explanation: [{ token: '%', meaning: 'Modulus operator (மீதி 1)' }],
    },
    outputExplanation: 'rem மாறியின் மதிப்பு 1 ஆகும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'calculator',
        dialogue: 'Buddy, 10 % 3 போட்டா என்ன வரும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'calculator',
        dialogue: '% என்பது Modulus! 10-ஐ 3 ஆல் வகுத்தால் மீதி 1 வரும்!',
      },
    ],
    practice: {
      question: 'வகுத்தலின் மீதியைக் காண எந்த குறியீடு பயன்படும்?',
      options: ['/', '*', '%', '#'],
      answerIndex: 2,
      explanation: '🎉 Super! % operator மீதியைத் தரும்.',
    },
    challenge: {
      title: 'Modulus Challenge',
      prompt: 'int r = 7 % 2; என எழுதவும்.',
      starter: '',
      hint: 'int r = 7 % 2;',
      expected: 'int r = 7 % 2;',
    },
  },

  /* ==================== 5. INPUT & OUTPUT ==================== */
  {
    id: 'io-printf',
    moduleId: 'io',
    level: 'beginner',
    title: 'printf() Output Function',
    tamilTitle: 'printf() வெளியீடு சார்பு',
    duration: 5,
    xp: 50,
    concept: 'printf() displays text and formatted values on the computer screen.',
    tamilExplanation: 'திரையில் தகவலை அச்சிடும் கட்டளை printf().',
    englishTerms: [{ term: 'printf', meaning: 'திரையில் காட்டு' }],
    realLife: { title: 'ATM Display', body: 'ATM திரையில் செய்திகள் தோன்றுவது.' },
    visualExplanation: {
      title: 'Screen Display',
      description: 'printf() மூலம் செய்தி திரைக்கு செல்லுதல்.',
      diagramType: 'generic',
    },
    code: {
      snippet: 'printf("Vanakkam");',
      parts: [{ text: 'printf("Vanakkam");', tone: 'plain' }],
      explanation: [{ token: 'printf', meaning: 'அச்சிடும் சார்பு' }],
    },
    outputExplanation: 'திரையில் Vanakkam தோன்றும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Buddy, printf பயன்படுத்தி என் பெயரை காட்டலாமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'நிச்சயமாக! printf("Kavi"); என்று எழுதினால் திரையில் தோன்றும்.',
      },
    ],
    practice: {
      question: 'திரையில் தகவலை அச்சிட எந்த சார்பு பயன்படும்?',
      options: ['scanf()', 'printf()', 'input()', 'print()'],
      answerIndex: 1,
      explanation: '🎉 மிகச் சரி! printf() பயன்படும்.',
    },
    challenge: {
      title: 'Print Name',
      prompt: 'printf("Code Kathai"); என அச்சிடுங்கள்.',
      starter: '',
      hint: 'printf("Code Kathai");',
      expected: 'printf("Code Kathai");',
    },
  },

  /* ==================== 6. IF ELSE ==================== */
  {
    id: 'ifelse-if-statement',
    moduleId: 'ifelse',
    level: 'beginner',
    title: 'If Statement & Traffic Signal',
    tamilTitle: 'If கூற்று மற்றும் ட்ராஃபிக் சிக்னல்',
    duration: 5,
    xp: 50,
    concept: 'If statement allows decision making based on conditions.',
    tamilExplanation: 'சிகப்பு என்றால் நில், பச்சை என்றால் செல் என முடிவெடுத்தல்.',
    englishTerms: [{ term: 'If Else', meaning: 'நிபந்தனை முடிவுகள்' }],
    realLife: { title: 'Traffic Signal', body: 'Signal Color -> Action.' },
    visualExplanation: {
      title: 'Signal Flow',
      description: 'age >= 18 -> Eligible to vote.',
      diagramType: 'signal',
    },
    code: {
      snippet: 'if(age >= 18) {\n    printf("Vote");\n}',
      parts: [{ text: 'if(age >= 18) {\n    printf("Vote");\n}', tone: 'plain' }],
      explanation: [{ token: 'age >= 18', meaning: '18 அல்லது அதற்கு மேல் உள்ளதா எனச் சோதித்தல்' }],
    },
    outputExplanation: 'age 18-க்கு மேல் இருந்தால் Vote அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'signal',
        dialogue: 'Buddy, வாக்களிக்கும் தகுதியை If-ல எப்படி எழுதுவது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'if (age >= 18) { printf("Vote!"); } என்று எழுத வேண்டும்!',
      },
    ],
    practice: {
      question: 'நிபந்தனையைச் சோதிக்க பயன்படும் சொல் எது?',
      options: ['for', 'while', 'if', 'switch'],
      answerIndex: 2,
      explanation: '🎉 Super! if கூற்று பயன்படும்.',
    },
    challenge: {
      title: 'Check condition',
      prompt: 'if(mark >= 35) { printf("Pass"); } என எழுதவும்.',
      starter: '',
      hint: 'if(mark >= 35) { printf("Pass"); }',
      expected: 'if(mark >= 35) { printf("Pass"); }',
    },
  },

  /* ==================== 7. LOOPS ==================== */
  {
    id: 'loops-for-loop',
    moduleId: 'loops',
    level: 'beginner',
    title: 'For Loop & Repetition',
    tamilTitle: 'For மடக்கு மற்றும் தொடர் செயல்',
    duration: 5,
    xp: 50,
    concept: 'Loops repeat code multiple times until a condition becomes false.',
    tamilExplanation: 'ஒரு வேலையை திரும்பத் திரும்ப 5 முறை செய்ய Loop பயன்படும்.',
    englishTerms: [{ term: 'Loop', meaning: 'மடக்கு' }],
    realLife: { title: 'Running 5 Laps', body: 'மைதானத்தை 5 சுற்று ஓடுதல்.' },
    visualExplanation: {
      title: 'Loop Track',
      description: 'i = 1 லிருந்து i <= 5 வரை சுழலுதல்.',
      diagramType: 'repeat',
    },
    code: {
      snippet: 'for(int i=1; i<=5; i++) {\n    printf("%d\\n", i);\n}',
      parts: [{ text: 'for(int i=1; i<=5; i++) {\n    printf("%d\\n", i);\n}', tone: 'plain' }],
      explanation: [{ token: 'i++', meaning: 'i-ன் மதிப்பை 1 அதிகரிக்கும்' }],
    },
    outputExplanation: '1, 2, 3, 4, 5 என திரையில் தோன்றும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'repeat',
        dialogue: 'Buddy, 100 முறை அச்சிட Loop பயன்படுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'ஆம் Kavi! 2 வரியில் For Loop எழுதி 100 முறை செய்ய வைக்கலாம்!',
      },
    ],
    practice: {
      question: 'i++ என்பது என்ன செய்யும்?',
      options: ['i-ஐ 1 குறைக்கும்', 'i-ஐ 1 அதிகரிக்கும்', 'i-ஐ 0 ஆக்கும்', 'எதுவுமில்லை'],
      answerIndex: 1,
      explanation: '🎉 அருமை! i++ என்பது 1 அதிகரிக்கும்.',
    },
    challenge: {
      title: 'Write For Loop',
      prompt: 'for(int i=1; i<=3; i++) {} என எழுதவும்.',
      starter: '',
      hint: 'for(int i=1; i<=3; i++) {}',
      expected: 'for(int i=1; i<=3; i++) {}',
    },
  },

  /* ==================== 8. FUNCTIONS ==================== */
  {
    id: 'functions-declaration',
    moduleId: 'functions',
    level: 'beginner',
    title: 'Function Juicer Machine',
    tamilTitle: 'சார்பு - சாறு பிழியும் இயந்திரம்',
    duration: 6,
    xp: 60,
    concept: 'Functions are reusable blocks of code taking inputs and returning outputs.',
    tamilExplanation: 'Function என்பது Juice Machine மாதிரி! Input கொடுத்தால் Output தரும்.',
    englishTerms: [{ term: 'Return Value', meaning: 'திரும்ப அனுப்பும் மதிப்பு' }],
    realLife: { title: 'Juice Maker', body: 'ஆரஞ்சு -> சாறு.' },
    visualExplanation: {
      title: 'Machine Flowchart',
      description: 'Input -> [ Function ] -> Output.',
      diagramType: 'machine',
    },
    code: {
      snippet: 'int add(int a, int b) {\n    return a + b;\n}',
      parts: [{ text: 'int add(int a, int b) {\n    return a + b;\n}', tone: 'plain' }],
      explanation: [{ token: 'return', meaning: 'விடையை திரும்பத் தரும்' }],
    },
    outputExplanation: 'add(5, 3) 8 என்ற விடையைத் தரும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'machine',
        dialogue: 'Buddy, Function ஒரு மறுபயன்பாட்டு இயந்திரமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'machine',
        dialogue: 'ஆமாம்! ஒருமுறை எழுதிவிட்டு தேவைப்படும் போது அழைக்கலாம் (Call).',
      },
    ],
    practice: {
      question: 'Function தரும் விடையை அனுப்ப எந்த keyword பயன்படுகிறது?',
      options: ['get', 'give', 'return', 'output'],
      answerIndex: 2,
      explanation: '🎉 Super! return பயன்படும்.',
    },
    challenge: {
      title: 'Return statement',
      prompt: 'return a + b; என எழுதவும்.',
      starter: '',
      hint: 'return a + b;',
      expected: 'return a + b;',
    },
  },

  /* ==================== 9. ARRAYS ==================== */
  {
    id: 'arrays-concept',
    moduleId: 'arrays',
    level: 'beginner',
    title: 'Arrays as Locker Rows',
    tamilTitle: 'Array - லாக்கர் வரிசை உவமை',
    duration: 6,
    xp: 60,
    concept: 'Arrays store multiple items of the same type in contiguous memory.',
    tamilExplanation: 'ரயில் நிலையத்தில் ஒரே வரிசையில் 5 லாக்கர்கள் இருப்பது போன்றது.',
    englishTerms: [{ term: 'Index', meaning: 'வரிசை எண் (starts at 0)' }],
    realLife: { title: 'Bank Lockers', body: 'வரிசை எண்கள் 0, 1, 2... என இருத்தல்.' },
    visualExplanation: {
      title: 'Locker Row',
      description: 'marks[0], marks[1], marks[2].',
      diagramType: 'lockers',
    },
    code: {
      snippet: 'int marks[3] = {90, 85, 78};',
      parts: [{ text: 'int marks[3] = {90, 85, 78};', tone: 'plain' }],
      explanation: [{ token: 'marks[0]', meaning: 'முதல் மதிப்பு = 90' }],
    },
    outputExplanation: 'marks[0]-ல் 90 சேமிக்கப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lockers',
        dialogue: 'Buddy, Array-ல் முதல் பொருளின் Index என்ன?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'lockers',
        dialogue: 'C மொழியில் Index எப்போதும் 0 லிருந்து தொடங்கும்!',
      },
    ],
    practice: {
      question: 'Array-ல் முதல் உறுப்பின் Index எண் என்ன?',
      options: ['1', '0', '-1', '5'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Index எப்போதும் 0 ஆகும்.',
    },
    challenge: {
      title: 'Access Array',
      prompt: 'int x = marks[0]; என எழுதவும்.',
      starter: '',
      hint: 'int x = marks[0];',
      expected: 'int x = marks[0];',
    },
  },

  /* ==================== 10. STRINGS ==================== */
  {
    id: 'strings-concept',
    moduleId: 'strings',
    level: 'beginner',
    title: 'Character Arrays & Null Terminator',
    tamilTitle: 'சரங்கள் மற்றும் Null Terminator',
    duration: 6,
    xp: 60,
    concept: 'In C, strings are null-terminated (\\0) character arrays.',
    tamilExplanation: 'எழுத்துக்களின் மாலையின் முடிவில் Null Terminator (\\0) இருக்கும்.',
    englishTerms: [{ term: 'Null Terminator (\\0)', meaning: 'சரத்தின் முடிவு' }],
    realLife: { title: 'String of Pearls', body: 'முத்து மாலையின் முடிவில் வைக்கப்படும் முடிச்சு.' },
    visualExplanation: {
      title: 'String Array in Memory',
      description: "['T', 'a', 'm', 'i', 'l', '\\0']",
      diagramType: 'lockers',
    },
    code: {
      snippet: 'char name[] = "Tamil";',
      parts: [{ text: 'char name[] = "Tamil";', tone: 'plain' }],
      explanation: [{ token: '\\0', meaning: 'தானாகவே சேர்க்கப்படும் முடிவு குறியீடு' }],
    },
    outputExplanation: 'name ஒரு 6-character array ஆக சேமிக்கப்படும் (Null terminator சேர்த்து).',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Buddy, "Tamil" 5 எழுத்துகள் தானே, memory-ல ஏன் 6 bytes எடுக்குது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'ஏனெனில் முடிவைக் குறிக்க \\0 (Null Terminator) சேர்க்கப்படுகிறது!',
      },
    ],
    practice: {
      question: 'C மொழியில் String முடிவைக் குறிக்க எந்த குறியீடு பயன்படுகிறது?',
      options: ['\\n', '\\0', '\\t', '\\a'],
      answerIndex: 1,
      explanation: '🎉 Super! \\0 (Null Terminator) பயன்படும்.',
    },
    challenge: {
      title: 'Declare string',
      prompt: 'char word[] = "C"; என எழுதவும்.',
      starter: '',
      hint: 'char word[] = "C";',
      expected: 'char word[] = "C";',
    },
  },

  /* ==================== 11. POINTERS ==================== */
  {
    id: 'pointers-memory-address',
    moduleId: 'pointers',
    level: 'beginner',
    title: 'Pointers as House Addresses',
    tamilTitle: 'Pointers - வீட்டு முகவரி உவமை',
    duration: 7,
    xp: 70,
    concept: 'Pointers store the memory address of another variable.',
    tamilExplanation: 'Pointer என்பது வீட்டின் கதவு எண் (Memory Address) போன்றது.',
    englishTerms: [{ term: 'Pointer (*)', meaning: 'முகவரி சேமிக்கும் மாறி' }],
    realLife: { title: 'House Door Number', body: 'கதவு எண் நினைவக முகவரி உவமை.' },
    visualExplanation: {
      title: 'Pointer Address Map',
      description: 'ptr -> &num -> [ Value: 100 ].',
      diagramType: 'address',
    },
    code: {
      snippet: 'int num = 100;\nint *ptr = &num;',
      parts: [{ text: 'int num = 100;\nint *ptr = &num;', tone: 'plain' }],
      explanation: [{ token: '&num', meaning: 'num-ன் நினைவக முகவரி' }],
    },
    outputExplanation: 'ptr-ல் num-ன் முகவரி சேமிக்கப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'address',
        dialogue: 'Buddy, &num போட்டா என்ன கிடைக்கும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'address',
        dialogue: '&num என்பது num இருக்கும் RAM நினைவக முகவரியைத் தரும்!',
      },
    ],
    practice: {
      question: 'நினைவக முகவரியைப் பெற எந்த குறியீடு பயன்படும்?',
      options: ['*', '&', '%', '#'],
      answerIndex: 1,
      explanation: '🎉 Super! & (Address-of) operator பயன்படும்.',
    },
    challenge: {
      title: 'Store Address',
      prompt: 'int *p = &a; என எழுதவும்.',
      starter: 'int a = 5;\n',
      hint: 'int *p = &a;',
      expected: 'int a = 5;\nint *p = &a;',
    },
  },

  /* ==================== 12. STRUCTURES ==================== */
  {
    id: 'structures-concept',
    moduleId: 'structures',
    level: 'beginner',
    title: 'Struct as Student ID Card',
    tamilTitle: 'Struct - மாணவர் அடையாள அட்டை உவமை',
    duration: 7,
    xp: 70,
    concept: 'Structures allow grouping variables of different data types into a single unit.',
    tamilExplanation: 'ஒரு மாணவனின் பெயர் (char), வயது (int), மதிப்பெண் (float) மூன்றையும் ஒரே ID கார்டில் வைப்பது Struct.',
    englishTerms: [{ term: 'struct', meaning: 'வெவ்வேறு தரவுகளின் தொகுப்பு' }],
    realLife: { title: 'Student ID Card', body: 'Name, Age, Mark அனைத்தும் ஒரே கார்டில் இருத்தல்.' },
    visualExplanation: {
      title: 'Struct Memory Card',
      description: 'struct Student { char name[20]; int age; float marks; };',
      diagramType: 'generic',
    },
    code: {
      snippet: 'struct Student {\n    int roll;\n    float marks;\n};',
      parts: [{ text: 'struct Student {\n    int roll;\n    float marks;\n};', tone: 'plain' }],
      explanation: [{ token: 'struct', meaning: 'பயனர் உருவாக்கும் புதிய தரவு வகை' }],
    },
    outputExplanation: 'Student என்ற புதிய Structure உருவாக்கப்படுகிறது.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Buddy, வெவ்வேறு data types-ஐ ஒன்றாக சேர்க்க Struct பயன்படுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'ஆமாம் Kavi! struct மூலம் பல விவரங்களை ஒரே இடத்தில் தொகுக்கலாம்.',
      },
    ],
    practice: {
      question: 'வெவ்வேறு data types-ஐ ஒன்றாக குழுவாக்க பயன்படும் keyword எது?',
      options: ['array', 'struct', 'union', 'pointer'],
      answerIndex: 1,
      explanation: '🎉 அருமை! struct பயன்படும்.',
    },
    challenge: {
      title: 'Declare struct',
      prompt: 'struct Point { int x; int y; }; என எழுதவும்.',
      starter: '',
      hint: 'struct Point { int x; int y; };',
      expected: 'struct Point { int x; int y; };',
    },
  },

  /* ==================== 13. FILE HANDLING ==================== */
  {
    id: 'filehandling-open-close',
    moduleId: 'filehandling',
    level: 'beginner',
    title: 'File Handling & Storage',
    tamilTitle: 'கோப்பு கையாளல் மற்றும் சேமிப்பு',
    duration: 8,
    xp: 80,
    concept: 'File handling allows storing data permanently in hard disk files using fopen and fclose.',
    tamilExplanation: 'நிரல் முடிந்த பிறகும் தகவலை காகிதக் நோட்டில் (File) எழுதி வைப்பது போன்ற செயல்பாடு.',
    englishTerms: [{ term: 'FILE*', meaning: 'கோப்பு சுட்டி' }],
    realLife: { title: 'Notebook Record', body: 'நோட்டில் எழுதி வைத்தால் என்றும் அழியாது.' },
    visualExplanation: {
      title: 'RAM to Hard Disk File Flow',
      description: 'fopen("data.txt", "w") -> fprintf() -> fclose()',
      diagramType: 'generic',
    },
    code: {
      snippet: 'FILE *fp = fopen("notes.txt", "w");\nfprintf(fp, "Hello");\nfclose(fp);',
      parts: [{ text: 'FILE *fp = fopen("notes.txt", "w");\nfprintf(fp, "Hello");\nfclose(fp);', tone: 'plain' }],
      explanation: [{ token: 'fopen', meaning: 'கோப்பை திறக்கும் கட்டளை' }],
    },
    outputExplanation: 'notes.txt என்ற கோப்பில் Hello என எழுதப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'code',
        dialogue: 'Buddy, program முடிந்த பின்னரும் data அழியாமல் இருக்க என்ன செய்வது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'File handling பயன்படுத்தி Hard disk கோப்பில் சேமிக்க வேண்டும்!',
      },
    ],
    practice: {
      question: 'C மொழியில் கோப்பைத் திறக்க எந்த சார்பு பயன்படுகிறது?',
      options: ['open()', 'fopen()', 'file_open()', 'read()'],
      answerIndex: 1,
      explanation: '🎉 Super! fopen() பயன்படும்.',
    },
    challenge: {
      title: 'Close File',
      prompt: 'fclose(fp); என கோப்பை மூடவும்.',
      starter: '',
      hint: 'fclose(fp);',
      expected: 'fclose(fp);',
    },
  },

  /* ==================== 14. PROBLEM SOLVING ==================== */
  {
    id: 'problemsolving-logic',
    moduleId: 'problemsolving',
    level: 'beginner',
    title: 'Logic Building & Debugging',
    tamilTitle: 'தர்க்கம் உருவாக்குதல் மற்றும் பிழை திருத்துதல்',
    duration: 8,
    xp: 80,
    concept: 'Algorithmic thinking breaks complex problems into logical step-by-step solutions.',
    tamilExplanation: 'ஒரு பெரிய சிக்கலை சிறு சிறு படிகளாகப் பிரித்து தீர்வு காண்பது.',
    englishTerms: [{ term: 'Algorithm', meaning: 'படிநிலைத் தீர்வு' }],
    realLife: { title: 'Puzzle Solving', body: 'புதிரை சிறு துண்டுகளாகத் தீர்த்தல்.' },
    visualExplanation: {
      title: 'Problem Flowchart',
      description: 'Problem -> Step 1 -> Step 2 -> Solution.',
      diagramType: 'machine',
    },
    code: {
      snippet: '// Swap two numbers using temp\nint temp = a;\na = b;\nb = temp;',
      parts: [{ text: 'int temp = a;\na = b;\nb = temp;', tone: 'plain' }],
      explanation: [{ token: 'temp', meaning: 'தற்காலிக சேமிப்பு மாறி' }],
    },
    outputExplanation: 'a மற்றும் b-ன் மதிப்புகள் பரிமாறப்படும் (Swapped).',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'Buddy, இரண்டு டம்ளர் பானங்களை மாற்றுவது போல temp மாறி பயன்படுகிறதா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'ஆம்! 3வது டம்ளர் (temp) பயன்படுத்தி பானங்களை மாற்றுவது போன்ற தர்க்கம் தான் இது!',
      },
    ],
    practice: {
      question: 'நிரலில் உள்ள பிழைகளைக் கண்டுபிடித்து திருத்துவதை எவ்வாறு அழைப்போம்?',
      options: ['Compiling', 'Debugging', 'Executing', 'Running'],
      answerIndex: 1,
      explanation: '🎉 மிகச் சிறப்பு! அது Debugging ஆகும்.',
    },
    challenge: {
      title: 'Swap Variable Logic',
      prompt: 'int temp = a; எனத் தொடங்குங்கள்.',
      starter: '',
      hint: 'int temp = a;',
      expected: 'int temp = a;',
    },
  },

  /* ==================== STACK DATA STRUCTURE ==================== */
  {
    id: 'stack-concept',
    moduleId: 'stack',
    level: 'beginner',
    title: 'What is a Stack? (LIFO)',
    tamilTitle: 'Stack என்றால் என்ன? (LIFO தட்டுகள் அடுக்கு)',
    duration: 6,
    xp: 60,
    concept: 'A Stack is a linear data structure that operates on the LIFO (Last In, First Out) principle. Elements added last are retrieved first.',
    tamilExplanation: 'Stack என்பது சாப்பாட்டு தட்டுகள் அடுக்கை (Plate Stack) போன்ற ஒரு தரவு அமைப்பாகும். நாம் கடைசியாக வைத்த தட்டைத்தான் முதலில் எடுப்போம். இதையே கணினியில் LIFO (Last In First Out) என்கிறோம்.',
    englishTerms: [
      { term: 'Stack', meaning: 'நினைவக அடுக்கு' },
      { term: 'LIFO', meaning: 'கடைசியாக நுழைந்தது முதலில் வெளிவரும் (Last In First Out)' },
      { term: 'Top Pointer', meaning: 'அடுக்கின் மேல் பகுதி சுட்டி' },
    ],
    realLife: {
      title: 'Plate Stack in Cafeteria / உணவக தட்டுகள் அடுக்கு',
      body: 'உணவகத்தில் கழுவி அடுக்கி வைக்கப்பட்ட தட்டுகளில், கடைசியாக வைக்கப்பட்ட தட்டையே வாடிக்கையாளர் முதலில் எடுப்பார். அதேபோல கணினி நினைவகத்திலும் கடைசியாக சேமிக்கப்பட்ட தரவே முதலில் எடுக்கப்படும்.',
    },
    visualExplanation: {
      title: 'LIFO Plate Stack Model',
      description: 'Elements pushed to top: [Plate 3] -> [Plate 2] -> [Plate 1]. Top is at Plate 3.',
      diagramType: 'stack',
    },
    code: {
      snippet: '#include <stdio.h>\n\nint main() {\n    int stack[5];\n    int top = -1;\n    // Push 10 to Stack\n    top++;\n    stack[top] = 10;\n    printf("Top element: %d\\n", stack[top]);\n    return 0;\n}',
      parts: [
        { text: '#include <stdio.h>\n\n', tone: 'keyword' },
        { text: 'int main() {\n    int stack[5];\n    int top = -1;\n', tone: 'plain' },
        { text: '    // Push 10 to Stack\n', tone: 'comment' },
        { text: '    top++;\n    stack[top] = 10;\n', tone: 'value' },
        { text: '    printf(', tone: 'plain' },
        { text: '"Top element: %d\\n"', tone: 'value' },
        { text: ', stack[top]);\n    return 0;\n}', tone: 'plain' },
      ],
      explanation: [
        { token: 'stack[5]', meaning: '5 உறுப்புகளைச் சேமிக்கும் Array அடுக்கு' },
        { token: 'top = -1', meaning: 'Stack காலியாக உள்ளது என்பதைக் குறிக்கும் pointer' },
        { token: 'top++', meaning: 'அடுக்கின் உயரத்தை 1 அதிகரிக்கும்' },
      ],
    },
    outputExplanation: 'திரையில் Top element: 10 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'stack',
        dialogue: 'Buddy, உணவகத்தில் அடுக்கி வைத்துள்ள தட்டுகளைப் போல தரவை சேமிக்க முடியுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'stack',
        dialogue: 'நிச்சயமாக Kavi! அதற்கு பெயர் தான் Stack (அடுக்கு). இதில் கடைசியாக வைத்த தட்டைத்தான் முதலில் எடுக்க முடியும் (LIFO)!',
      },
      {
        id: 3,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'stack',
        dialogue: 'அடடே! Browser Back button மற்றும் Undo Ctrl+Z கூட இந்த Stack தத்துவத்தில் தான் வேலை செய்கிறதா?',
      },
      {
        id: 4,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'stack',
        dialogue: 'சரியாகப் புரிந்துகொண்டாய் Kavi! Undo செய்யும் போது கடைசியாக செய்த வேலையே முதலில் ரத்தாகும்!',
      },
    ],
    practice: {
      question: 'Stack எந்த கொள்கையின் அடிப்படையில் செயல்படுகிறது?',
      options: ['FIFO (First In First Out)', 'LIFO (Last In First Out)', 'Random Access', 'Sorted Order'],
      answerIndex: 1,
      explanation: '🎉 மிகச் சிறப்பு! Stack என்பது LIFO (Last In First Out - கடைசியாக வைத்தது முதலில் வரும்) கொள்கையில் இயங்கும்.',
    },
    challenge: {
      title: 'Initialize Stack Top',
      prompt: 'int top = -1; என Stack Top Pointer-ஐ உருவாக்கவும்.',
      starter: '',
      hint: 'int top = -1;',
      expected: 'int top = -1;',
    },
  },
  {
    id: 'stack-operations',
    moduleId: 'stack',
    level: 'beginner',
    title: 'Push & Pop Operations',
    tamilTitle: 'Push மற்றும் Pop செயல்பாடுகள்',
    duration: 8,
    xp: 80,
    concept: 'Push adds an item to the top of the stack. Pop removes and returns the top item from the stack.',
    tamilExplanation: 'Stack-ல் புதிய தரவை உள்ளே நுழைப்பதற்கு Push என்றும், மேலிருக்கும் தரவை வெளியே எடுப்பதற்கு Pop என்றும் பெயர்.',
    englishTerms: [
      { term: 'Push', meaning: 'அடுக்கின் மேல் தரவைச் சேர்த்தல்' },
      { term: 'Pop', meaning: 'அடுக்கின் மேலிருந்து தரவை நீக்குதல்' },
      { term: 'Overflow', meaning: 'அடுக்கு நிரம்பி வழிதல்' },
      { term: 'Underflow', meaning: 'காலியான அடுக்கிலிருந்து எடுக்க முயலுதல்' },
    ],
    realLife: {
      title: 'Bangle Stack / வளையல்கள் அடுக்கு',
      body: 'கையில் வளையல் அணியும் போது கடைசியாக போட்ட வளையலைத் தான் முதலில் கழற்ற முடியும் (Pop). புதிய வளையலை மேலேதான் மாட்ட முடியும் (Push).',
    },
    visualExplanation: {
      title: 'Push and Pop Animation Logic',
      description: 'Push(50) -> Top moves UP. Pop() -> Top moves DOWN.',
      diagramType: 'stack',
    },
    code: {
      snippet: '#include <stdio.h>\n\nint stack[5];\nint top = -1;\n\nvoid push(int val) {\n    top++;\n    stack[top] = val;\n}\n\nint pop() {\n    int val = stack[top];\n    top--;\n    return val;\n}\n\nint main() {\n    push(100);\n    push(200);\n    printf("Popped: %d\\n", pop());\n    return 0;\n}',
      parts: [
        { text: '#include <stdio.h>\n\nint stack[5];\nint top = -1;\n\n', tone: 'keyword' },
        { text: 'void push(int val) {\n    top++;\n    stack[top] = val;\n}\n\n', tone: 'plain' },
        { text: 'int pop() {\n    int val = stack[top];\n    top--;\n    return val;\n}\n\n', tone: 'value' },
        { text: 'int main() {\n    push(100);\n    push(200);\n    printf(', tone: 'plain' },
        { text: '"Popped: %d\\n"', tone: 'value' },
        { text: ', pop());\n    return 0;\n}', tone: 'plain' },
      ],
      explanation: [
        { token: 'push(100)', meaning: '100 என்ற மதிப்பை அடுக்கின் மேலே சேர்க்கும்' },
        { token: 'pop()', meaning: 'அடுக்கின் மேலே உள்ள 200-ஐ வெளியே எடுத்து நீக்கும்' },
      ],
    },
    outputExplanation: '200 கடைசியாக Push செய்யப்பட்டதால், Pop செய்யும் போது Popped: 200 என வரும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'stack',
        dialogue: 'Buddy, Stack-ல் தரவை சேர்க்கவும் நீக்கவும் என்ன சொற்கள் பயன்படும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'stack',
        dialogue: 'சேர்ப்பதற்கு Push! வெளியே எடுப்பதற்கு Pop! மேலே உள்ள மதிப்பை மட்டும் பார்க்க Peek!',
      },
    ],
    practice: {
      question: 'Stack-ல் புதிய தரவை மேலே சேர்ப்பதற்கு என்ன பெயர்?',
      options: ['Pop', 'Push', 'Enqueue', 'Dequeue'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Push என்பது Stack-ல் தரவைச் சேர்க்கும் செயலாகும்.',
    },
    challenge: {
      title: 'Call Push function',
      prompt: 'push(50); என எழுதி 50-ஐ Stack-ல் சேர்க்கவும்.',
      starter: '',
      hint: 'push(50);',
      expected: 'push(50);',
    },
  },

  /* ==================== QUEUE DATA STRUCTURE ==================== */
  {
    id: 'queue-concept',
    moduleId: 'queue',
    level: 'beginner',
    title: 'What is a Queue? (FIFO)',
    tamilTitle: 'Queue என்றால் என்ன? (FIFO டிக்கெட் வரிசை)',
    duration: 6,
    xp: 60,
    concept: 'A Queue is a linear data structure following FIFO (First In, First Out). The first element added is the first to be removed.',
    tamilExplanation: 'Queue என்பது சினிமா அல்லது பஸ் ஸ்டாண்ட் டிக்கெட் வரிசையைப் (Ticket Line) போன்றது. முதலில் வரிசையில் நின்றவரே முதலில் டிக்கெட் பெற்று வெளியேறுவார் (FIFO - First In First Out).',
    englishTerms: [
      { term: 'Queue', meaning: 'வரிசை அமைப்பு' },
      { term: 'FIFO', meaning: 'முதலில் நுழைந்தது முதலில் வெளிவரும் (First In First Out)' },
      { term: 'Front', meaning: 'வரிசையின் முன் பகுதி' },
      { term: 'Rear', meaning: 'வரிசையின் பின் பகுதி' },
    ],
    realLife: {
      title: 'Cinema Ticket Queue / சினிமா டிக்கெட் வரிசை',
      body: 'தியேட்டர் கவுண்டரில் வரிசையில் நிற்கும் போது, முதலில் நின்ற நபருக்கே முதலில் டிக்கெட் வழங்கப்படும். பின்புறம் புதிதாக வருபவர்கள் வரிசையின் இறுதியில் இணைவார்கள்.',
    },
    visualExplanation: {
      title: 'FIFO Queue Flowchart',
      description: '[Front Person] <-- [Person 2] <-- [Rear Person]. Front leaves first.',
      diagramType: 'queue',
    },
    code: {
      snippet: '#include <stdio.h>\n\nint main() {\n    int queue[5];\n    int front = 0, rear = 0;\n    // Add to Queue (Enqueue)\n    queue[rear] = 50;\n    rear++;\n    printf("First in queue: %d\\n", queue[front]);\n    return 0;\n}',
      parts: [
        { text: '#include <stdio.h>\n\n', tone: 'keyword' },
        { text: 'int main() {\n    int queue[5];\n    int front = 0, rear = 0;\n', tone: 'plain' },
        { text: '    // Add to Queue (Enqueue)\n', tone: 'comment' },
        { text: '    queue[rear] = 50;\n    rear++;\n', tone: 'value' },
        { text: '    printf(', tone: 'plain' },
        { text: '"First in queue: %d\\n"', tone: 'value' },
        { text: ', queue[front]);\n    return 0;\n}', tone: 'plain' },
      ],
      explanation: [
        { token: 'front', meaning: 'வரிசையின் முதலாவது நபரைச் சுட்டும் pointer' },
        { token: 'rear', meaning: 'வரிசையின் கடைசி இடத்தைச் சுட்டும் pointer' },
      ],
    },
    outputExplanation: 'திரையில் First in queue: 50 என அச்சிடப்படும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'queue',
        dialogue: 'Buddy, Stack-ல் கடைசியா வந்தவர் முதல்ல போனாரு.. அப்ப முதல்ல வந்தவர் முதல்ல போகும் அமைப்பு எது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'queue',
        dialogue: 'அதற்குப் பெயர் தான் Queue (வரிசை)! பேருந்து டிக்கெட் வரிசை போல முதலில் வந்தவருக்கு முதலில் சேவை (FIFO)!',
      },
      {
        id: 3,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'queue',
        dialogue: 'ஆஹா! Printer-ல் Print command கொடுக்கும் போது கூட முதலில் கொடுத்த பக்கமே முதலில் பிரிண்ட் ஆகிறதே!',
      },
      {
        id: 4,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'queue',
        dialogue: 'சரியாகக் கண்டுபிடித்தாய்! Printer Spooling மற்றும் CPU Task Scheduling-ல் Queue பயன்படும்!',
      },
    ],
    practice: {
      question: 'Queue எந்த கொள்கையின் அடிப்படையில் செயல்படுகிறது?',
      options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random Order', 'None'],
      answerIndex: 1,
      explanation: '🎉 அருமை! Queue என்பது FIFO (First In First Out - முதலில் வந்தவர் முதலில் வெளியேறுவர்) தத்துவத்தில் இயங்கும்.',
    },
    challenge: {
      title: 'Initialize Queue Pointers',
      prompt: 'int front = 0, rear = 0; என எழுதவும்.',
      starter: '',
      hint: 'int front = 0, rear = 0;',
      expected: 'int front = 0, rear = 0;',
    },
  },
  {
    id: 'queue-operations',
    moduleId: 'queue',
    level: 'beginner',
    title: 'Enqueue & Dequeue Operations',
    tamilTitle: 'Enqueue மற்றும் Dequeue செயல்பாடுகள்',
    duration: 8,
    xp: 80,
    concept: 'Enqueue adds an element to the rear of the queue. Dequeue removes an element from the front of the queue.',
    tamilExplanation: 'Queue-ன் பின்புறம் புதிய நபரை இணைப்பதற்கு Enqueue என்றும், முன்புறம் உள்ளவரை வெளியேற்றுவதற்கு Dequeue என்றும் பெயர்.',
    englishTerms: [
      { term: 'Enqueue', meaning: 'வரிசையின் இறுதியில் தரவைச் சேர்த்தல்' },
      { term: 'Dequeue', meaning: 'வரிசையின் தொடக்கத்திலிருந்து தரவை நீக்குதல்' },
      { term: 'Front Pointer', meaning: 'வரிசை முகப்பு சுட்டி' },
      { term: 'Rear Pointer', meaning: 'வரிசை பின் சுட்டி' },
    ],
    realLife: {
      title: 'Toll Gate Line / டோல்கேட் வாகன வரிசை',
      body: 'டோல்கேட்டிற்கு முதலில் வரும் கார் கட்டணம் செலுத்தி முதலில் வெளியேறும் (Dequeue). பின்னால் வரும் கார்கள் வரிசையில் இணையும் (Enqueue).',
    },
    visualExplanation: {
      title: 'Enqueue and Dequeue Movement',
      description: 'Enqueue(VAL) -> Rear moves right. Dequeue() -> Front moves right.',
      diagramType: 'queue',
    },
    code: {
      snippet: '#include <stdio.h>\n\nint queue[5];\nint front = 0, rear = 0;\n\nvoid enqueue(int val) {\n    queue[rear] = val;\n    rear++;\n}\n\nint dequeue() {\n    int val = queue[front];\n    front++;\n    return val;\n}\n\nint main() {\n    enqueue(10);\n    enqueue(20);\n    printf("Dequeued: %d\\n", dequeue());\n    return 0;\n}',
      parts: [
        { text: '#include <stdio.h>\n\nint queue[5];\nint front = 0, rear = 0;\n\n', tone: 'keyword' },
        { text: 'void enqueue(int val) {\n    queue[rear] = val;\n    rear++;\n}\n\n', tone: 'plain' },
        { text: 'int dequeue() {\n    int val = queue[front];\n    front++;\n    return val;\n}\n\n', tone: 'value' },
        { text: 'int main() {\n    enqueue(10);\n    enqueue(20);\n    printf(', tone: 'plain' },
        { text: '"Dequeued: %d\\n"', tone: 'value' },
        { text: ', dequeue());\n    return 0;\n}', tone: 'plain' },
      ],
      explanation: [
        { token: 'enqueue(10)', meaning: '10-ஐ வரிசையின் இறுதியில் சேர்க்கும்' },
        { token: 'dequeue()', meaning: 'முதலில் சேர்க்கப்பட்ட 10-ஐ வெளியேற்றும்' },
      ],
    },
    outputExplanation: '10 முதலில் Enqueue செய்யப்பட்டதால், Dequeue செய்யும் போது Dequeued: 10 என வரும்.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'queue',
        dialogue: 'Buddy, Queue-ல் தரவை சேர்க்கவும் எடுக்கவும் என்ன functions எழுத வேண்டும்?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'queue',
        dialogue: 'வரிசையின் பின்னால் சேர்க்க Enqueue(val)! முன்னால் இருப்பவரை வெளியேற்ற Dequeue()!',
      },
    ],
    practice: {
      question: 'Queue-ன் முன்புறத்திலிருந்து ஒரு உறுப்பை நீக்குவதற்கு என்ன பெயர்?',
      options: ['Push', 'Pop', 'Enqueue', 'Dequeue'],
      answerIndex: 3,
      explanation: '🎉 மிகச் சிறப்பு! Dequeue என்பது Queue-ன் முன்புறத்திலிருந்து உறுப்பை நீக்கும் செயல்பாடாகும்.',
    },
    challenge: {
      title: 'Call Enqueue function',
      prompt: 'enqueue(100); என எழுதி 100-ஐ Queue-ல் சேர்க்கவும்.',
      starter: '',
      hint: 'enqueue(100);',
      expected: 'enqueue(100);',
    },
  },
];

export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
];

export function getLessonForLevel(lessonId: string, level: 'beginner' | 'intermediate' | 'advanced'): Lesson {
  // 1. Exact match for (lessonId, level)
  const exactMatch = allLessons.find((l) => l.id === lessonId && l.level === level);
  if (exactMatch) return exactMatch;

  // 2. Match for (lessonId, 'beginner')
  const baseMatch = allLessons.find((l) => l.id === lessonId && l.level === 'beginner');

  // 3. Find topic info from course.ts modules if baseMatch not found
  let base: Lesson;
  if (baseMatch) {
    base = baseMatch;
  } else {
    // Look up topic in course.ts modules
    let foundTopic: { id: string; title: string; tamilTitle: string } | undefined;
    let foundModuleId = 'intro';

    for (const m of modules) {
      const t = m.topics.find((tp) => tp.id === lessonId);
      if (t) {
        foundTopic = t;
        foundModuleId = m.id;
        break;
      }
    }

    const topicTitle = foundTopic?.title ?? lessonId;
    const topicTamil = foundTopic?.tamilTitle ?? lessonId;

    base = {
      id: lessonId,
      moduleId: foundModuleId as any,
      level: 'beginner',
      title: topicTitle,
      tamilTitle: topicTamil,
      duration: 5,
      xp: 50,
      concept: `${topicTitle} covers fundamental rules and execution syntax in C programming.`,
      tamilExplanation: `${topicTamil} பற்றிய எளிய மற்றும் தெளிவான விளக்கம்.`,
      englishTerms: [{ term: topicTitle, meaning: topicTamil }],
      realLife: {
        title: `${topicTitle} Real Life Concept`,
        body: `தினசரி வாழ்க்கையில் ${topicTamil} எவ்வாறு பயன்படுகிறது என்பதற்கான எளிய உவமை.`,
      },
      visualExplanation: {
        title: `${topicTitle} Visual Diagram`,
        description: `Visual model for ${topicTitle}.`,
        diagramType: 'code',
      },
      code: {
        snippet: `#include <stdio.h>\n\nint main() {\n    // ${topicTitle}\n    printf("${topicTitle} Output\\n");\n    return 0;\n}`,
        parts: [
          { text: `#include <stdio.h>\n\nint main() {\n    printf("`, tone: 'plain' },
          { text: topicTitle, tone: 'value' },
          { text: `\\n");\n    return 0;\n}`, tone: 'plain' },
        ],
        explanation: [{ token: topicTitle, meaning: topicTamil }],
      },
      outputExplanation: `${topicTitle} Output என திரையில் அச்சிடப்படும்.`,
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: `Buddy, ${topicTamil} பற்றி எனக்கு விளக்குங்கள்!`,
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: `${topicTitle} என்பது C மொழியில் மிக முக்கியமான கருத்தாகும்!`,
        },
      ],
      practice: {
        question: `${topicTamil} தொடர்பான சரியான கூற்று எது?`,
        options: [topicTitle, 'Incorrect option A', 'Incorrect option B', 'Incorrect option C'],
        answerIndex: 0,
        explanation: `🎉 அருமை! ${topicTitle} சரியான தேர்வாகும்.`,
      },
      challenge: {
        title: `Declare ${topicTitle}`,
        prompt: `${topicTitle} தொடர்பான கட்டளையை எழுதவும்.`,
        starter: '',
        hint: `printf("${topicTitle}");`,
        expected: `printf("${topicTitle}");`,
      },
    };
  }

  // Level-specific dynamic upgrade
  if (level === 'beginner') {
    return {
      ...base,
      challenge: {
        ...base.challenge,
        title: base.challenge.title.startsWith('Easy Challenge')
          ? base.challenge.title
          : `Easy Challenge: ${base.challenge.title}`,
      },
    };
  }

  if (level === 'intermediate') {
    return {
      ...base,
      level: 'intermediate',
      title: base.title.includes('Intermediate') ? base.title : `${base.title} (Intermediate)`,
      xp: base.xp + 25,
      duration: base.duration + 3,
      concept: `[Intermediate Level Concept]: Deep dive into ${base.title}. ${base.concept}`,
      challenge: {
        title: `Medium Challenge: ${base.title} Intermediate Implementation`,
        prompt: `[Medium Level Challenge]: Write intermediate C syntax for ${base.title}.`,
        starter: base.challenge.starter,
        hint: base.challenge.hint,
        expected: base.challenge.expected,
      },
    };
  }

  // Advanced level fallback
  return {
    ...base,
    level: 'advanced',
    title: base.title.includes('Advanced') ? base.title : `${base.title} (Advanced)`,
    xp: base.xp + 50,
    duration: base.duration + 5,
    concept: `[Advanced Memory Concept]: Memory architecture and performance optimization for ${base.title}. ${base.concept}`,
    challenge: {
      title: `Hard Challenge: ${base.title} Advanced Memory Pointer Logic`,
      prompt: `[Hard Level Challenge]: Write advanced pointer/memory C code for ${base.title}.`,
      starter: base.challenge.starter,
      hint: base.challenge.hint,
      expected: base.challenge.expected,
    },
  };
}
