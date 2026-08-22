export type ModuleId =
  | 'intro'
  | 'variables'
  | 'datatypes'
  | 'operators'
  | 'io'
  | 'ifelse'
  | 'loops'
  | 'functions'
  | 'arrays'
  | 'pointers'
  | 'linked-list'
  | 'stack-queue'
  | 'trees'
  | 'graphs'
  | 'dp';

export interface Topic {
  id: string;
  title: string;
  tamilTitle: string;
}

export interface Module {
  id: ModuleId;
  index: number;
  title: string;
  tamilTitle: string;
  icon: string;
  description: string;
  topics: Topic[];
  starred?: boolean;
  progress: number;
}

export interface CodePart {
  text: string;
  role?: string;
  tone?: 'keyword' | 'type' | 'name' | 'value' | 'punct' | 'comment' | 'plain';
}

export interface StoryScene {
  id: number;
  speaker: 'kavi' | 'buddy' | 'narrator';
  emotion: 'curious' | 'happy' | 'thinking' | 'explain' | 'surprised' | 'neutral';
  visual: 'lunchbox' | 'memory' | 'code' | 'containers' | 'calculator' | 'signal' | 'repeat' | 'machine' | 'lockers' | 'address' | 'generic';
  dialogue: string;
  code?: CodePart[];
  caption?: string;
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  title: string;
  tamilTitle: string;
  duration: number;
  xp: number;
  concept: string;
  tamilExplanation: string;
  realLife: {
    title: string;
    body: string;
  };
  code: {
    parts: CodePart[];
    explanation: { token: string; meaning: string }[];
  };
  story: StoryScene[];
  contentSections?: {
    heading: string;
    items: string[];
  }[];
  practice: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
  challenge: {
    title: string;
    prompt: string;
    starter: string;
    hint: string;
    expected: string;
  };
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const modules: Module[] = [
  {
    id: 'intro',
    index: 1,
    title: 'Introduction',
    tamilTitle: 'அறிமுகம்',
    icon: 'Sparkles',
    description: 'Meet the C language and write your very first program.',
    progress: 100,
    topics: [
      { id: 'what-is-c', title: 'What is C?', tamilTitle: 'C என்றால் என்ன?' },
      { id: 'history', title: 'History of C', tamilTitle: 'C வரலாறு' },
      { id: 'features', title: 'Features of C', tamilTitle: 'C அம்சங்கள்' },
      { id: 'applications', title: 'Applications of C', tamilTitle: 'C பயன்பாடுகள்' },
      { id: 'first-program', title: 'First C Program', tamilTitle: 'முதல் நிரல்' },
    ],
  },
  {
    id: 'variables',
    index: 2,
    title: 'Variables',
    tamilTitle: 'மாறிகள்',
    icon: 'Box',
    description: 'Boxes in memory that hold your data while the program runs.',
    starred: true,
    progress: 60,
    topics: [
      { id: 'what-is-var', title: 'What is a variable?', tamilTitle: 'மாறி என்றால் என்ன?' },
      { id: 'declaration', title: 'Variable declaration', tamilTitle: 'மாறி அறிவிப்பு' },
      { id: 'initialization', title: 'Variable initialization', tamilTitle: 'மாறி தொடக்கம்' },
      { id: 'naming-rules', title: 'Naming rules', tamilTitle: 'பெயரிடல் விதிகள்' },
      { id: 'memory-concept', title: 'Memory concept', tamilTitle: 'நினைவகம்' },
    ],
  },
  {
    id: 'datatypes',
    index: 3,
    title: 'Data Types',
    tamilTitle: 'தரவு வகைகள்',
    icon: 'Layers',
    description: 'Different containers for different kinds of values.',
    starred: true,
    progress: 20,
    topics: [
      { id: 'int', title: 'int', tamilTitle: 'int' },
      { id: 'float', title: 'float', tamilTitle: 'float' },
      { id: 'double', title: 'double', tamilTitle: 'double' },
      { id: 'char', title: 'char', tamilTitle: 'char' },
      { id: 'void', title: 'void', tamilTitle: 'void' },
    ],
  },
  {
    id: 'operators',
    index: 4,
    title: 'Operators',
    tamilTitle: 'செயல்பாடுகள்',
    icon: 'Calculator',
    description: 'The calculators and decision-makers of your program.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'arithmetic', title: 'Arithmetic operators', tamilTitle: 'கணித செயல்கள்' },
      { id: 'relational', title: 'Relational operators', tamilTitle: 'தொடர்பு செயல்கள்' },
      { id: 'logical', title: 'Logical operators', tamilTitle: 'தர்க்க செயல்கள்' },
      { id: 'assignment', title: 'Assignment operators', tamilTitle: 'பணி செயல்கள்' },
    ],
  },
  {
    id: 'io',
    index: 5,
    title: 'Input & Output',
    tamilTitle: 'உள்ளீடு & வெளியீடு',
    icon: 'ArrowLeftRight',
    description: 'How programs talk to you and listen back.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'printf', title: 'printf()', tamilTitle: 'printf()' },
      { id: 'scanf', title: 'scanf()', tamilTitle: 'scanf()' },
      { id: 'format-specifiers', title: 'Format specifiers', tamilTitle: 'வடிவ குறியீடுகள்' },
    ],
  },
  {
    id: 'ifelse',
    index: 6,
    title: 'If Else',
    tamilTitle: 'முடிவெடுப்பு',
    icon: 'GitBranch',
    description: 'Let your program make smart decisions.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'decision', title: 'Decision making', tamilTitle: 'முடிவெடுப்பு' },
      { id: 'if', title: 'if', tamilTitle: 'if' },
      { id: 'if-else', title: 'if else', tamilTitle: 'if else' },
      { id: 'nested-if', title: 'Nested if', tamilTitle: 'nested if' },
    ],
  },
  {
    id: 'loops',
    index: 7,
    title: 'Loops',
    tamilTitle: 'மடக்குகள்',
    icon: 'Repeat',
    description: 'Repeat work effortlessly until the job is done.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'for', title: 'for loop', tamilTitle: 'for loop' },
      { id: 'while', title: 'while loop', tamilTitle: 'while loop' },
      { id: 'do-while', title: 'do while loop', tamilTitle: 'do while loop' },
    ],
  },
  {
    id: 'functions',
    index: 8,
    title: 'Functions',
    tamilTitle: 'சார்புகள்',
    icon: 'Cog',
    description: 'Reusable machines: give input, get output.',
    progress: 0,
    topics: [
      { id: 'declaration', title: 'Function declaration', tamilTitle: 'சார்பு அறிவிப்பு' },
      { id: 'definition', title: 'Function definition', tamilTitle: 'சார்பு வரையறை' },
      { id: 'parameters', title: 'Parameters', tamilTitle: 'அளவுருக்கள்' },
      { id: 'return', title: 'Return values', tamilTitle: 'திரும்ப மதிப்பு' },
    ],
  },
  {
    id: 'arrays',
    index: 9,
    title: 'Arrays',
    tamilTitle: 'வரிசைகள்',
    icon: 'Grid3x3',
    description: 'A row of lockers to store many values together.',
    progress: 0,
    topics: [
      { id: 'concept', title: 'Array concept', tamilTitle: 'வரிசை கருத்து' },
      { id: 'indexing', title: 'Indexing', tamilTitle: 'குறியீடு' },
      { id: 'storing', title: 'Storing multiple values', tamilTitle: 'பல மதிப்புகள்' },
    ],
  },
  {
    id: 'pointers',
    index: 10,
    title: 'Pointers',
    tamilTitle: 'சுட்டிகள்',
    icon: 'MapPin',
    description: 'Addresses that point to where data really lives.',
    progress: 0,
    topics: [
      { id: 'address', title: 'Memory address', tamilTitle: 'நினைவக முகவரி' },
      { id: 'pointer-var', title: 'Pointer variables', tamilTitle: 'சுட்டி மாறிகள்' },
      { id: 'dereferencing', title: 'Dereferencing', tamilTitle: 'சுட்டி தொடர்பு' },
    ],
  },
];

const c = (text: string, tone: CodePart['tone'] = 'plain'): CodePart => ({ text, tone });

export const lessons: Lesson[] = [
  {
    id: 'what-is-c',
    moduleId: 'intro',
    title: 'Introduction to C Programming',
    tamilTitle: 'C நிரலாக்க அறிமுகம்',
    duration: 10,
    xp: 50,
    concept:
      'C is a fast, efficient, and portable programming language developed by Dennis Ritchie in 1972. It is the foundation of modern languages like C++, Java, and many others.',
    tamilExplanation:
      'C என்பது Dennis Ritchie 1972-ல உருவாக்கிய ஒரு fast, efficient programming language. C++, Java எல்லாத்துக்கும் இதுதான் foundation.',
    realLife: {
      title: 'The Foundation of a Building',
      body:
        'Think of a tall building. Before the walls and roof, you need a strong foundation. C is that foundation for modern programming — learn it well, and every other language becomes easier to build on top.',
    },
    contentSections: [
      {
        heading: 'What is C?',
        items: [
          'Developed by Dennis Ritchie (1972)',
          'Fast, efficient, and portable programming language',
          'Foundation of C++, Java, and many modern languages',
        ],
      },
      {
        heading: 'Where is C Used?',
        items: [
          'Operating Systems',
          'Embedded Systems',
          'Game Development',
          'Networking Software',
        ],
      },
      {
        heading: 'Why Learn C?',
        items: [
          'Strong programming foundation',
          'High performance',
          'Easy to learn other languages afterward',
        ],
      },
    ],
    code: {
      parts: [
        c('#include', 'keyword'),
        c(' ', 'plain'),
        c('<stdio.h>', 'value'),
        c('\n', 'plain'),
        c('int', 'type'),
        c(' ', 'plain'),
        c('main', 'name'),
        c('() {\n  ', 'punct'),
        c('printf', 'name'),
        c('(', 'punct'),
        c('"Hello, C!"', 'value'),
        c(');\n  ', 'punct'),
        c('return', 'keyword'),
        c(' ', 'plain'),
        c('0', 'value'),
        c(';\n}', 'punct'),
      ],
      explanation: [
        { token: '#include <stdio.h>', meaning: 'Includes the standard input/output library' },
        { token: 'int main()', meaning: 'The main function — where every C program starts' },
        { token: 'printf("Hello, C!")', meaning: 'Prints text to the screen' },
        { token: 'return 0', meaning: 'Tells the OS the program ended successfully' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'C programming என்றால் என்ன? யாரு இத உருவாக்குச்சு?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue:
          '1972-ல Dennis Ritchie ன்னு ஒருத்தர் C-வ உருவாக்குச்சான். இது ரொம்ப fast, efficient, portable!',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'C தான் C++, Java எல்லாத்தோடயும் foundation. இத கத்துக்கிட்டா மத்த எல்லாம் easy!',
        code: [
          c('#include', 'keyword'),
          c(' <stdio.h>\n', 'plain'),
          c('int', 'type'),
          c(' main() {\n  ', 'plain'),
          c('printf', 'name'),
          c('(', 'punct'),
          c('"Hello, C!"', 'value'),
          c(');\n  ', 'punct'),
          c('return', 'keyword'),
          c(' 0;\n}', 'plain'),
        ],
        caption: 'Your first C program',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'generic',
        dialogue:
          'வாவ்! Operating System, Game Development, Embedded Systems எல்லா இடத்துலயும் C உபயோகிக்குதா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue:
          'ஆமாம்! அதனால தான் C கத்துக்கிட்டா strong foundation கிடைக்கும். High performance குடுக்கும்!',
      },
    ],
    practice: {
      question: 'Who developed the C programming language?',
      options: ['James Gosling', 'Dennis Ritchie', 'Guido van Rossum', 'Bjarne Stroustrup'],
      answerIndex: 1,
      explanation: 'Dennis Ritchie developed C at Bell Labs in 1972.',
    },
    challenge: {
      title: 'Your first output',
      prompt: 'Write a printf statement that prints: Hello, C!',
      starter: 'printf("___");',
      hint: 'Use printf with the text "Hello, C!" inside double quotes',
      expected: 'printf("Hello, C!");',
    },
  },
  {
    id: 'what-is-var',
    moduleId: 'variables',
    title: 'What is a Variable?',
    tamilTitle: 'மாறி என்றால் என்ன?',
    duration: 8,
    xp: 50,
    concept:
      'A variable is a named container used to store data in the computer\u2019s memory. Each variable has a name, a type, and a value that can change while the program runs.',
    tamilExplanation:
      'Variable என்பது ஒரு box மாதிரி. அதற்கு ஒரு பெயர் இருக்கும், அதற்குள் நம்ம data-வை store செய்யலாம். Program ஓடும்போது இந்த value மாறலாம்.',
    realLife: {
      title: 'The Lunch Box',
      body:
        'Think of a lunch box. The name written on it (like "Kavi") is the variable name. The food inside is the value. You can take out old food and put new food in \u2014 the box stays, the contents change.',
    },
    code: {
      parts: [
        c('int', 'type'),
        c(' ', 'plain'),
        c('age', 'name'),
        c(' ', 'plain'),
        c('=', 'punct'),
        c(' ', 'plain'),
        c('20', 'value'),
        c(';', 'punct'),
      ],
      explanation: [
        { token: 'int', meaning: 'Data type \u2014 what kind of value fits in the box' },
        { token: 'age', meaning: 'Variable name \u2014 the label on the box' },
        { token: '=', meaning: 'Assignment \u2014 put this value into the box' },
        { token: '20', meaning: 'Stored value \u2014 the food inside the box' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lunchbox',
        dialogue:
          'இந்த lunch box-க்கு ஒரு பெயர் இருக்கு \u2014 "Kavi". அதுக்குள்ள நான் உணவை வைக்கலாம், மாத்தலாம்!',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'memory',
        dialogue:
          'Programming-லையும் இதே மாதிரி தான்! Variable என்பது data-வை store செய்யும் ஒரு box. அதற்கு பெயர் இருக்கும், உள்ளே value இருக்கும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'age என்ற variable-க்குள் 20 என்ற value store ஆகுது. பாரு:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';', 'punct'),
        ],
        caption: 'int \u2192 type, age \u2192 name, 20 \u2192 value',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'memory',
        dialogue:
          'அப்படியா! நான் age-ஐ 21 ஆ மாத்தினா, பழைய 20 போயிடுமா? புது value வருமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue:
          'ஆமாம்! Box ஒரே தான், உள்ள value மாறும். இது தான் variable-ன சக்தி!',
        code: [
          c('age', 'name'),
          c(' = ', 'punct'),
          c('21', 'value'),
          c(';', 'punct'),
          c('  // now 20 is gone', 'comment'),
        ],
      },
    ],
    practice: {
      question: 'Which of these is the variable name in: int age = 20; ?',
      options: ['int', 'age', '=', '20'],
      answerIndex: 1,
      explanation: 'age is the label on the box \u2014 the variable name. int is the type, 20 is the value.',
    },
    challenge: {
      title: 'Make your own box',
      prompt: 'Create a variable called score that stores the integer 100.',
      starter: '___ score = ___;',
      hint: 'Use the int type and assign 100 with =',
      expected: 'int score = 100;',
    },
  },
  {
    id: 'declaration',
    moduleId: 'variables',
    title: 'Variable Declaration',
    tamilTitle: 'மாறி அறிவிப்பு',
    duration: 8,
    xp: 50,
    concept:
      'Declaring a variable means telling the computer to create a new box in memory with a name and a type — but without putting any value inside yet.',
    tamilExplanation:
      'Variable declare செய்றது என்னன்னா, computer-க்கு ஒரு புது box வேணும்னு சொல்றது. அதற்கு ஒரு type யும் பெயரும் குடுக்கோம், ஆனா உள்ள இன்னும் value வைக்க மாட்டோம்.',
    realLife: {
      title: 'The Empty Lunch Box',
      body:
        'Imagine your mother gives you an empty lunch box and writes your name on it. The box exists, it has a name, but it is empty. That is declaration — you made the box, you will fill it later.',
    },
    contentSections: [
      {
        heading: 'What is Declaration?',
        items: [
          'Tells the computer to create a variable',
          'Gives the variable a type and a name',
          'No value is stored yet — the box is empty',
          'The computer reserves space in memory for it',
        ],
      },
      {
        heading: 'Why Declare First?',
        items: [
          'The computer needs to know what kind of data will go inside',
          'It reserves the right amount of memory space',
          'It prevents mistakes — you cannot use a box that does not exist',
        ],
      },
      {
        heading: 'Declaration vs Assignment',
        items: [
          'Declaration: int age; — creates the box, leaves it empty',
          'Assignment: age = 20; — fills the box with a value',
          'You can declare first and fill later, or do both together',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'),
        c(' ', 'plain'),
        c('age', 'name'),
        c(';', 'punct'),
        c('  // box created, still empty', 'comment'),
      ],
      explanation: [
        { token: 'int', meaning: 'Data type — what kind of value the box will hold' },
        { token: 'age', meaning: 'Variable name — the label on the box' },
        { token: ';', meaning: 'End of the statement — the box is now created' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lunchbox',
        dialogue: 'Amma எனக்கு ஒரு புது lunch box வாங்கிட்டா, ஆனா அதுக்குள்ள இன்னும் உணவு இல்லை!',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'memory',
        dialogue:
          'அது தான் declaration! Computer-க்கு ஒரு box வேணும்னு சொல்றோம், ஆனா உள்ள value வைக்க மாட்டோம். Box உண்டு, ஆனா empty!',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது பாரு — int age; னா age ன்னு ஒரு box உருவாகுது, ஆனா உள்ள எதுவும் இல்ல:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(';', 'punct'),
          c('  // empty box', 'comment'),
        ],
        caption: 'int → type, age → name, no value yet',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'lunchbox',
        dialogue: 'அப்போ அதுக்குள்ள தானா எதாவது இருக்குமா? அல்லது காலியா தான் இருக்குமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue:
          'காலியா தான் இருக்கும்! தானா எதுவும் வராது. நாம தான் பிறகு value வைக்கணும்:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(';', 'punct'),
          c('  // declare\n', 'comment'),
          c('age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';', 'punct'),
          c('  // fill it', 'comment'),
        ],
        caption: 'First declare, then fill',
      },
      {
        id: 6,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'lunchbox',
        dialogue: 'சரி! முதல்ல box உண்டா செய்யணும், அப்புறம் உள்ள உணவு வைக்கணும்!',
      },
    ],
    practice: {
      question: 'What happens when you write: int marks; ?',
      options: [
        'It creates a box called marks and fills it with 0',
        'It creates an empty box called marks that can hold integers',
        'It prints the value of marks',
        'It deletes the variable marks',
      ],
      answerIndex: 1,
      explanation:
        'Declaration creates the box with a name and type, but leaves it empty. No value is stored yet.',
    },
    challenge: {
      title: 'Declare your box',
      prompt: 'Declare (do not fill) a variable called temperature that can hold integers.',
      starter: '___ temperature___',
      hint: 'Use int as the type and end with ;',
      expected: 'int temperature;',
    },
  },
  {
    id: 'initialization',
    moduleId: 'variables',
    title: 'Variable Initialization',
    tamilTitle: 'மாறி தொடக்கம்',
    duration: 8,
    xp: 50,
    concept:
      'Initialization means giving a variable its first value. You can do it right when you declare the variable, or separately afterwards.',
    tamilExplanation:
      'Initialization என்னன்னா variable-க்கு முதல் value வைக்கிறது. Declare செய்ற நேரத்துலயே value வைக்கலாம், அல்லது பிறகு தனியா வைக்கலாம்.',
    realLife: {
      title: 'Filling the Lunch Box',
      body:
        'Your mother gives you an empty lunch box (declaration). Then she puts rice inside (initialization). Now the box is ready to use — it has a name AND food inside.',
    },
    contentSections: [
      {
        heading: 'What is Initialization?',
        items: [
          'Giving a variable its first value',
          'Can be done together with declaration',
          'Can also be done separately after declaration',
          'A variable without a value may cause errors when used',
        ],
      },
      {
        heading: 'Two Ways to Initialize',
        items: [
          'Together: int age = 20; — declare and fill in one line',
          'Separately: int age; then age = 20; — declare first, fill later',
          'Both do the same thing — the box gets its first value',
        ],
      },
      {
        heading: 'Why Initialize?',
        items: [
          'An empty box may contain garbage (random old data)',
          'Using a variable before initializing it can give wrong results',
          'Always give your variable a starting value to stay safe',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'),
        c(' ', 'plain'),
        c('age', 'name'),
        c(' = ', 'punct'),
        c('20', 'value'),
        c(';', 'punct'),
        c('  // declare + initialize', 'comment'),
      ],
      explanation: [
        { token: 'int', meaning: 'Data type — the kind of box' },
        { token: 'age', meaning: 'Variable name — the label' },
        { token: '=', meaning: 'Assignment — put this value inside' },
        { token: '20', meaning: 'The first value going into the box' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lunchbox',
        dialogue: 'Amma lunch box குடுத்தா, அதுக்குள்ள rice போத்து வைச்சா. அப்போ தான் box ready!',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'memory',
        dialogue:
          'அது தான் initialization! Variable-க்கு முதல் value வைக்கிறது. Box-க்கு பெயரும் இருக்கும், உள்ள value-ம் இருக்கும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'ரெண்டு வழி இருக்கு. ஒண்ணாவே செய்யலாம்:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';', 'punct'),
          c('  // one line', 'comment'),
        ],
        caption: 'Declare and initialize together',
      },
      {
        id: 4,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'இல்லன்னா, முதல்ல box உண்டா செய்து, பிறகு value வைக்கலாம்:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(';\n', 'punct'),
          c('age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';', 'punct'),
          c('  // fill later', 'comment'),
        ],
        caption: 'Declare first, initialize later',
      },
      {
        id: 5,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'memory',
        dialogue: 'அப்போ value வைக்காம உபயோகிச்சா என்ன ஆகும்?',
      },
      {
        id: 6,
        speaker: 'buddy',
        emotion: 'surprised',
        visual: 'code',
        dialogue:
          'ஆபத்து! Box-ல என்ன இருக்கோமோ அது வரும் — garbage value! அதனால எப்பவும் initialize பண்ணிட்டு பிறகு use பண்ணு:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(' = ', 'punct'),
          c('0', 'value'),
          c(';', 'punct'),
          c('  // safe start', 'comment'),
        ],
        caption: 'Always start with a value',
      },
      {
        id: 7,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'lunchbox',
        dialogue: 'சரி! முதல்ல box உண்டா செஞ்சு, உள்ள value வைச்சிட்டு தான் use பண்ணணும்!',
      },
    ],
    practice: {
      question: 'Which line initializes the variable score to 100?',
      options: ['int score;', 'score == 100;', 'int score = 100;', 'score + 100;'],
      answerIndex: 2,
      explanation:
        'int score = 100; both declares the variable and gives it its first value (100) in one line.',
    },
    challenge: {
      title: 'Fill the box',
      prompt: 'Declare and initialize a variable called price with the value 50.',
      starter: '___ price ___ 50;',
      hint: 'Use int as the type and = to assign the value',
      expected: 'int price = 50;',
    },
  },
  {
    id: 'naming-rules',
    moduleId: 'variables',
    title: 'Naming Rules',
    tamilTitle: 'பெயரிடல் விதிகள்',
    duration: 9,
    xp: 55,
    concept:
      'Variable names must follow rules: they can use letters, digits, and underscores, but cannot start with a digit, cannot contain spaces, and cannot be a C keyword.',
    tamilExplanation:
      'Variable பெயருக்கு விதி இருக்கு: letters, digits, underscore வரலாம், ஆனா digit-ஆ தொடங்க கூடாது, space கூடாது, C keyword போட கூடாது.',
    realLife: {
      title: 'Naming Your Pet',
      body:
        'You can name your pet anything — Tiger, Buddy, Max. But you cannot name it "123" or use a name with a space like "Big Cat". Variable names are the same — there are rules to follow.',
    },
    contentSections: [
      {
        heading: 'The Rules',
        items: [
          'Can contain letters (a-z, A-Z), digits (0-9), and underscores (_)',
          'Must NOT start with a digit — 2age is wrong, age2 is fine',
          'Must NOT contain spaces — use underscores instead (my_age)',
          'Must NOT be a C keyword — int, float, return, if are reserved',
          'C is case-sensitive — age and Age are different variables',
        ],
      },
      {
        heading: 'Good Names',
        items: [
          'age, score, total_marks, student_name',
          'Use meaningful names — count is better than x',
          'Use underscores for multi-word names: total_price',
        ],
      },
      {
        heading: 'Bad Names (Not Allowed)',
        items: [
          '2age — starts with a digit',
          'my age — contains a space',
          'int — this is a C keyword, reserved',
          'my-name — hyphens are not allowed',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'),
        c(' ', 'plain'),
        c('student_age', 'name'),
        c(' = ', 'punct'),
        c('12', 'value'),
        c(';', 'punct'),
        c('  // good name', 'comment'),
        c('\n', 'plain'),
        c('int', 'type'),
        c(' ', 'plain'),
        c('2age', 'name'),
        c(' = ', 'punct'),
        c('12', 'value'),
        c(';', 'punct'),
        c('  // WRONG!', 'comment'),
      ],
      explanation: [
        { token: 'student_age', meaning: 'Good name — letters and underscore, no digit at start' },
        { token: '2age', meaning: 'Bad name — starts with a digit, the computer will reject it' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'generic',
        dialogue: 'Variable-க்கு எதோடையும் பேர் வைக்கலாமா? என்ன வேணும்னா அது?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'generic',
        dialogue:
          'இல்லை! விதி இருக்கு. Letters, digits, underscore வரலாம். ஆனா digit-ஆ தொடங்க கூடாது!',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'நல்ல பேர் பாரு:',
        code: [
          c('int', 'type'),
          c(' student_age', 'name'),
          c(' = ', 'punct'),
          c('12', 'value'),
          c(';', 'punct'),
          c('  // good!', 'comment'),
        ],
        caption: 'Letters and underscore — perfect',
      },
      {
        id: 4,
        speaker: 'buddy',
        emotion: 'surprised',
        visual: 'code',
        dialogue: 'இது தப்பு:',
        code: [
          c('int', 'type'),
          c(' 2age', 'name'),
          c(' = ', 'punct'),
          c('12', 'value'),
          c(';', 'punct'),
          c('  // WRONG!', 'comment'),
        ],
        caption: 'Starts with digit — not allowed',
      },
      {
        id: 5,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'generic',
        dialogue: 'Space வைக்கலாமா? my age மாதிரி?',
      },
      {
        id: 6,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue:
          'இல்லை! Space கூடாது. அதற்கு பதில் underscore வைக்கணும்:',
        code: [
          c('int', 'type'),
          c(' my_age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';', 'punct'),
          c('  // use _', 'comment'),
        ],
        caption: 'my_age — correct, my age — wrong',
      },
      {
        id: 7,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'generic',
        dialogue: 'அப்போ int ன்னு variable பேர் வைக்கலாமா?',
      },
      {
        id: 8,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue:
          'முடியாது! int, float, return, if — இதெல்லாம் C keywords. இது computer-க்கு reserved. வேற பேர் வைக்கணும்!',
      },
      {
        id: 9,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'generic',
        dialogue: 'சரி! age, score, total_marks — இதெல்லாம் நல்ல பேர்கள்!',
      },
    ],
    practice: {
      question: 'Which of these is a VALID variable name?',
      options: ['2age', 'my age', 'student_name', 'int'],
      answerIndex: 2,
      explanation:
        'student_name uses letters and an underscore, does not start with a digit, has no spaces, and is not a keyword. All the others break a rule.',
    },
    challenge: {
      title: 'Pick the right name',
      prompt: 'Declare a variable for storing total marks. Use a valid, meaningful name.',
      starter: '___ total_marks ___;',
      hint: 'Use int as the type and a name with letters and underscore',
      expected: 'int total_marks;',
    },
  },
  {
    id: 'memory-concept',
    moduleId: 'variables',
    title: 'Memory Concept',
    tamilTitle: 'நினைவகம்',
    duration: 10,
    xp: 60,
    concept:
      'Every variable lives in the computer memory (RAM). Each variable gets its own small slot with a unique address, like a numbered locker. The type decides how big the slot is.',
    tamilExplanation:
      'ஒவ்வொரு variable-ம் computer memory (RAM)-ல store ஆகும். ஒவ்வொன்னுக்கும் ஒரு address இருக்கு, locker number மாதிரி. Type என்னன்னா அந்த slot-ன size எவ்ளவு ன்னு decide ஆகும்.',
    realLife: {
      title: 'The Locker Room',
      body:
        'Imagine a school with many lockers. Each locker has a number (address) and a size. You put your things inside a locker and remember its number. Variables work the same way — each one gets a slot in memory with an address.',
    },
    contentSections: [
      {
        heading: 'Where Variables Live',
        items: [
          'Variables are stored in the computer RAM (memory)',
          'Each variable gets its own slot with a unique address',
          'The address is like a locker number — the computer uses it to find your data',
          'You do not need to know the address — the variable name is enough',
        ],
      },
      {
        heading: 'Type Decides Size',
        items: [
          'int uses about 4 bytes — for whole numbers',
          'float uses about 4 bytes — for decimals',
          'char uses 1 byte — for single characters',
          'Bigger types take more memory slots',
        ],
      },
      {
        heading: 'Why It Matters',
        items: [
          'Memory is limited — using the right type saves space',
          'The computer finds your data fast using the address',
          'When the program ends, the memory is freed for other use',
        ],
      },
    ],
    code: {
      parts: [
        c('int', 'type'),
        c(' ', 'plain'),
        c('age', 'name'),
        c(' = ', 'punct'),
        c('20', 'value'),
        c(';', 'punct'),
        c('  // stored at some address', 'comment'),
        c('\n', 'plain'),
        c('char', 'type'),
        c(' ', 'plain'),
        c('grade', 'name'),
        c(' = ', 'punct'),
        c("'A'", 'value'),
        c(';', 'punct'),
        c('  // smaller slot', 'comment'),
      ],
      explanation: [
        { token: 'int age = 20', meaning: 'Takes a 4-byte slot in memory for a whole number' },
        { token: 'char grade = A', meaning: 'Takes just 1 byte — smaller because a character is small' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'lockers',
        dialogue: 'என்னோட school-ல நிறைய lockers இருக்கு. ஒவ்வொன்னுக்கும் number இருக்கு!',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'lockers',
        dialogue:
          'Computer memory-ம் அப்படி தான்! ஒவ்வொரு variable-க்கும் ஒரு slot கிடைக்கும், அதற்கு ஒரு address இருக்கும் — locker number மாதிரி.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது பாரு:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';', 'punct'),
          c('  // some address', 'comment'),
        ],
        caption: 'age gets a slot in memory',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'lockers',
        dialogue: 'அப்போ எல்லா variable-ம் ஒரே size locker-ல வைக்கப்படுமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'lockers',
        dialogue:
          'இல்லை! Type decide பண்ணும். int-க்கு 4 bytes வேணும், char-க்கு 1 byte போதும். சின்ன data-க்கு சின்ன locker, பெரிய data-க்கு பெரிய locker!',
      },
      {
        id: 6,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'ரெண்டும் ஒன்னா பாரு:',
        code: [
          c('int', 'type'),
          c(' age', 'name'),
          c(' = ', 'punct'),
          c('20', 'value'),
          c(';\n', 'punct'),
          c('char', 'type'),
          c(' grade', 'name'),
          c(' = ', 'punct'),
          c("'A'", 'value'),
          c(';', 'punct'),
        ],
        caption: 'int → 4 bytes, char → 1 byte',
      },
      {
        id: 7,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'lockers',
        dialogue: 'அப்போ நான் address ஞாபகம் வைச்சிருக்கணுமா? எப்படி கண்டுபிடிப்பது?',
      },
      {
        id: 8,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'generic',
        dialogue:
          'வேண்டாம்! Variable பேர் சொன்னா போதும் — computer தானா address கண்டுபிடிச்சு data குடுக்கும். பேர் மட்டும் ஞாபகம் வை!',
      },
      {
        id: 9,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'lockers',
        dialogue: 'சரி! age ன்னு சொன்னா, computer தானா அந்த locker-ல இருக்கிற value குடுக்கும்!',
      },
    ],
    practice: {
      question: 'Why does the type of a variable matter for memory?',
      options: [
        'It decides the color of the variable',
        'It decides how much memory space the variable needs',
        'It decides the address of the variable',
        'It does not matter at all',
      ],
      answerIndex: 1,
      explanation:
        'The type decides the size of the memory slot. int needs more space than char because it stores bigger numbers.',
    },
    challenge: {
      title: 'Store a grade',
      prompt: 'Create a char variable called grade and initialize it with the letter A.',
      starter: "___ grade = '___';",
      hint: "Use char as the type and put A inside single quotes",
      expected: "char grade = 'A';",
    },
  },
  {
    id: 'datatypes-int',
    moduleId: 'datatypes',
    title: 'The int Data Type',
    tamilTitle: 'int வகை',
    duration: 7,
    xp: 45,
    concept:
      'int stores whole numbers (integers) like 10, -5, or 0. It cannot hold decimals \u2014 use float or double for those.',
    tamilExplanation:
      'int என்பது whole numbers-ஐ store செய்யும் \u2014 10, -5, 0 மாதிரி. Decimal values வேண்டா என்றா அதற்கு float வேணும்.',
    realLife: {
      title: 'Integer Box',
      body:
        'Imagine a box that only accepts whole countable things \u2014 3 pens, 5 books, 0 coins. You cannot put "half a pen" inside. That\u2019s int: whole numbers only.',
    },
    code: {
      parts: [
        c('int', 'type'),
        c(' ', 'plain'),
        c('count', 'name'),
        c(' = ', 'punct'),
        c('5', 'value'),
        c(';', 'punct'),
      ],
      explanation: [
        { token: 'int', meaning: 'Whole-number container' },
        { token: 'count', meaning: 'Variable name' },
        { token: '5', meaning: 'A whole number value' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'containers',
        dialogue: 'இந்த box-ல நான் 5 பேனா வைக்கலாம். ஆனா 5.5 பேனா வைக்க முடியுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'containers',
        dialogue:
          'இல்லை! int box-ல whole numbers மட்டும் தான் \u2014 5, 10, 0. Decimal வேண்டா என்றா float box வேணும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது தான் int:',
        code: [c('int', 'type'), c(' count', 'name'), c(' = ', 'punct'), c('5', 'value'), c(';', 'punct')],
        caption: 'Whole numbers only',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'containers',
        dialogue: 'சரி! என்னோட age-ஐ int-ல வைக்கலாம் \u2014 20 என்பது whole number தானே!',
      },
    ],
    practice: {
      question: 'Which value can int NOT store?',
      options: ['0', '-7', '3.14', '100'],
      answerIndex: 2,
      explanation: 'int holds whole numbers only. 3.14 is a decimal \u2014 it needs float or double.',
    },
    challenge: {
      title: 'Count the books',
      prompt: 'Store the number of books (12) in a variable called books.',
      starter: '___ books = ___;',
      hint: 'Use int for whole numbers',
      expected: 'int books = 12;',
    },
  },
  {
    id: 'ifelse-decision',
    moduleId: 'ifelse',
    title: 'Decision Making',
    tamilTitle: 'முடிவெடுப்பு',
    duration: 9,
    xp: 60,
    concept:
      'if lets your program choose a path. If a condition is true, one block runs; otherwise (else) another block runs.',
    tamilExplanation:
      'if என்பது program-க்கு ஒரு வழி தெரிய வைக்கும். Condition true னா ஒரு வேலை, false னா வேறு வேலை (else).',
    realLife: {
      title: 'Traffic Signal',
      body:
        'A traffic signal makes a decision: if the light is GREEN, you go. else (red), you stop. The program does the same \u2014 checks a condition and picks an action.',
    },
    code: {
      parts: [
        c('if', 'keyword'),
        c(' (', 'punct'),
        c('signal', 'name'),
        c(' == ', 'punct'),
        c('"green"', 'value'),
        c(') {\n  ', 'punct'),
        c('go', 'name'),
        c('();\n', 'punct'),
        c('} ', 'punct'),
        c('else', 'keyword'),
        c(' {\n  ', 'punct'),
        c('stop', 'name'),
        c('();\n}', 'punct'),
      ],
      explanation: [
        { token: 'if', meaning: 'Starts a decision \u2014 check the condition' },
        { token: 'signal == "green"', meaning: 'The condition to test' },
        { token: 'else', meaning: 'Runs when the condition is false' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'curious',
        visual: 'signal',
        dialogue: 'Signal green னா நான் போகணும், red னா நிக்கணும். இது program-ல எப்படி?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'signal',
        dialogue:
          'if பாரு \u2014 condition true னா ஒரு வேலை, else னா இன்னொரு வேலை. Program-க்கு முடிவெடுக்க இது தான் வழி!',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது பாரு:',
        code: [
          c('if', 'keyword'),
          c(' (signal == ', 'punct'),
          c('"green"', 'value'),
          c(') go();\n', 'punct'),
          c('else', 'keyword'),
          c(' stop();', 'punct'),
        ],
        caption: 'green \u2192 go, else \u2192 stop',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'signal',
        dialogue: 'அப்போ ஒரே நேரத்துல ரெண்டும் நடக்காது? ஒன்னு நடக்குமா?',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue:
          'சரியா புரிஞ்சது! if அல்லது else \u2014 ரெண்டில் ஒன்னு மட்டும் தான் நடக்கும். இது தான் decision making!',
      },
    ],
    practice: {
      question: 'What does the else block do?',
      options: [
        'Always runs',
        'Runs when the if condition is false',
        'Runs before the if',
        'Stops the program',
      ],
      answerIndex: 1,
      explanation: 'else is the backup plan \u2014 it runs only when the if condition is false.',
    },
    challenge: {
      title: 'Pass or fail',
      prompt: 'If marks is 40 or more, print "Pass", else print "Fail".',
      starter: 'if (marks ___ 40) printf("Pass");\n___ printf("Fail");',
      hint: 'Use >= to compare and else for the other case',
      expected: 'if (marks >= 40) printf("Pass");\nelse printf("Fail");',
    },
  },
  {
    id: 'loops-for',
    moduleId: 'loops',
    title: 'The for Loop',
    tamilTitle: 'for loop',
    duration: 10,
    xp: 70,
    concept:
      'A for loop repeats a block of code a known number of times. It has three parts: start, condition, and step.',
    tamilExplanation:
      'for loop என்பது ஒரே வேலையை மீண்டும் மீண்டும் செய்யும். மூன்று பகுதி: தொடக்கம், நிபந்தனை, அடுத்த அடி.',
    realLife: {
      title: 'Practice Repetition',
      body:
        'When you practice a song 5 times, you set a counter (1), a goal (\u2264 5), and a step (+1 each time). The for loop does exactly this for code.',
    },
    code: {
      parts: [
        c('for', 'keyword'),
        c(' (', 'punct'),
        c('int', 'type'),
        c(' ', 'plain'),
        c('i', 'name'),
        c(' = ', 'punct'),
        c('0', 'value'),
        c('; ', 'punct'),
        c('i', 'name'),
        c(' < ', 'punct'),
        c('5', 'value'),
        c('; ', 'punct'),
        c('i', 'name'),
        c('++) {\n  ', 'punct'),
        c('printf', 'name'),
        c('(', 'punct'),
        c('"Hi"', 'value'),
        c(');\n}', 'punct'),
      ],
      explanation: [
        { token: 'int i = 0', meaning: 'Start \u2014 counter begins at 0' },
        { token: 'i < 5', meaning: 'Condition \u2014 keep going while true' },
        { token: 'i++', meaning: 'Step \u2014 add 1 each round' },
      ],
    },
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'thinking',
        visual: 'repeat',
        dialogue: 'ஒரே வேலைய 5 முறை செய்யணும். ஐந்து முறையும் தனித்தனியா எழுதணுமா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'repeat',
        dialogue:
          'வேணாம்! for loop பயன்படுத்து. ஒரே வேலைய மீண்டும் மீண்டும் செய்ய loop உதவும்.',
      },
      {
        id: 3,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'இது பாரு \u2014 5 முறை "Hi" print ஆகும்:',
        code: [
          c('for', 'keyword'),
          c(' (int i = ', 'punct'),
          c('0', 'value'),
          c('; i < ', 'punct'),
          c('5', 'value'),
          c('; i++)\n  printf(', 'punct'),
          c('"Hi"', 'value'),
          c(');', 'punct'),
        ],
        caption: 'start \u2192 0, while < 5, +1 each time',
      },
      {
        id: 4,
        speaker: 'kavi',
        emotion: 'surprised',
        visual: 'repeat',
        dialogue: 'வாவ்! 5 முறை எழுதாம ஒரே வரியில முடிஞ்சது!',
      },
      {
        id: 5,
        speaker: 'buddy',
        emotion: 'happy',
        visual: 'code',
        dialogue:
          'ஆமாம்! start, condition, step \u2014 மூன்றும் ஒரே வரியில. இது தான் for loop-ன சக்தி.',
      },
    ],
    practice: {
      question: 'In: for (int i = 0; i < 5; i++) \u2014 how many times does the loop run?',
      options: ['4', '5', '0', '6'],
      answerIndex: 1,
      explanation: 'i starts at 0 and runs while i < 5, so it runs for 0,1,2,3,4 \u2014 that\u2019s 5 times.',
    },
    challenge: {
      title: 'Count to ten',
      prompt: 'Print numbers from 1 to 10 using a for loop.',
      starter: 'for (int i = ___; i ___ 10; i++) printf("%d", i);',
      hint: 'Start at 1, use <= 10 so 10 is included',
      expected: 'for (int i = 1; i <= 10; i++) printf("%d", i);',
    },
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    moduleId: 'variables',
    question: 'Which keyword stores integer (whole number) values?',
    options: ['float', 'int', 'char', 'loop'],
    answerIndex: 1,
    explanation: 'int is the data type for whole numbers like 10, 0, or -5.',
  },
  {
    id: 'q2',
    moduleId: 'variables',
    question: 'In: int age = 20; \u2014 what is "age"?',
    options: ['Data type', 'Variable name', 'Stored value', 'Function'],
    answerIndex: 1,
    explanation: 'age is the name on the "box" \u2014 the variable name.',
  },
  {
    id: 'q3',
    moduleId: 'datatypes',
    question: 'Which data type should you use for a decimal value like 3.14?',
    options: ['int', 'char', 'float', 'void'],
    answerIndex: 2,
    explanation: 'float (or double) stores decimal numbers. int only stores whole numbers.',
  },
  {
    id: 'q4',
    moduleId: 'operators',
    question: 'What does the % operator do in C?',
    options: ['Division', 'Modulus (remainder)', 'Percentage', 'Power'],
    answerIndex: 1,
    explanation: '% gives the remainder of a division, e.g. 7 % 2 = 1.',
  },
  {
    id: 'q5',
    moduleId: 'io',
    question: 'Which function prints output to the screen?',
    options: ['scanf()', 'printf()', 'print()', 'output()'],
    answerIndex: 1,
    explanation: 'printf() writes formatted output to the screen.',
  },
  {
    id: 'q6',
    moduleId: 'ifelse',
    question: 'What runs when the if condition is FALSE?',
    options: ['The if block', 'Nothing ever', 'The else block', 'The program crashes'],
    answerIndex: 2,
    explanation: 'When the if condition is false, the else block runs (if present).',
  },
  {
    id: 'q7',
    moduleId: 'loops',
    question: 'for (int i = 0; i < 5; i++) \u2014 how many times does it run?',
    options: ['4', '5', '6', 'Infinite'],
    answerIndex: 1,
    explanation: 'i goes 0,1,2,3,4 \u2014 five values, so the loop runs 5 times.',
  },
  {
    id: 'q8',
    moduleId: 'functions',
    question: 'What does a function with a return type do?',
    options: [
      'It only prints',
      'It gives a value back to the caller',
      'It never ends',
      'It stores a variable',
    ],
    answerIndex: 1,
    explanation: 'A function with a return type sends a value back where it was called.',
  },
  {
    id: 'q9',
    moduleId: 'arrays',
    question: 'In C, array indexes start at...?',
    options: ['0', '1', '-1', 'Any number'],
    answerIndex: 0,
    explanation: 'C arrays are zero-indexed \u2014 the first element is at index 0.',
  },
  {
    id: 'q10',
    moduleId: 'pointers',
    question: 'What does the * operator do with a pointer?',
    options: [
      'Multiplies two pointers',
      'Gives the address of a variable',
      'Dereferences \u2014 reads the value at the address',
      'Deletes the pointer',
    ],
    answerIndex: 2,
    explanation: '* dereferences a pointer \u2014 it reads the value stored at that address.',
  },
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

export const badges: Badge[] = [
  { id: 'first-step', name: 'First Step', description: 'Completed your first lesson', icon: 'Footprints', earned: true, date: '2026-07-20' },
  { id: 'story-explorer', name: 'Story Explorer', description: 'Watched 3 visual stories', icon: 'BookOpen', earned: true, date: '2026-07-22' },
  { id: 'quiz-rookie', name: 'Quiz Rookie', description: 'Answered 10 quiz questions', icon: 'Brain', earned: true, date: '2026-07-23' },
  { id: 'streak-3', name: '3-Day Streak', description: 'Studied 3 days in a row', icon: 'Flame', earned: true, date: '2026-07-25' },
  { id: 'variable-master', name: 'Variable Master', description: 'Finish the Variables module', icon: 'Box', earned: false },
  { id: 'code-ninja', name: 'Code Ninja', description: 'Complete 5 mini challenges', icon: 'Sword', earned: false },
  { id: 'loop-lord', name: 'Loop Lord', description: 'Master all loops', icon: 'Repeat', earned: false },
  { id: 'c-champion', name: 'C Champion', description: 'Finish the entire C course', icon: 'Trophy', earned: false },
];

export const profile = {
  name: 'Kavi Sri',
  handle: '@kavi_codes',
  joined: 'July 2026',
  level: 4,
  xp: 1240,
  xpToNext: 1600,
  streak: 5,
  rank: 'Story Explorer',
  completedLessons: 7,
  totalLessons: 38,
  averageScore: 86,
};
