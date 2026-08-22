import type { Lesson, Module, CodePart, Level } from '@/types';

const c = (text: string, tone: CodePart['tone'] = 'plain'): CodePart => ({ text, tone });

export interface LevelModule {
  id: string;
  index: number;
  title: string;
  tamilTitle: string;
  icon: string;
  description: string;
  progress: number;
  level: Level;
  topics: { id: string; title: string; tamilTitle: string }[];
}

export interface LevelLesson {
  id: string;
  moduleId: string;
  level: Level;
  title: string;
  tamilTitle: string;
  duration: number;
  xp: number;
  concept: string;
  tamilExplanation: string;
  realLife: { title: string; body: string };
  code: { parts: CodePart[]; explanation: { token: string; meaning: string }[] };
  story: any[];
  practice: { question: string; options: string[]; answerIndex: number; explanation: string };
  challenge: { title: string; prompt: string; starter: string; hint: string; expected: string };
}

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
    ],
  },
];

export const intermediateLessons: LevelLesson[] = [
  {
    id: 'scope',
    moduleId: 'variables',
    level: 'intermediate',
    title: 'Variable Scope',
    tamilTitle: 'மாறி நோக்கு',
    duration: 7,
    xp: 75,
    concept: 'Local vs global variable scope in C.',
    tamilExplanation: 'Variable எங்கெல்லாம் வேலை செய்யும் என்பதை Scope தீர்மானிக்கிறது.',
    realLife: { title: 'Local Rules', body: 'ஒரு வகுப்பறை விதி அந்த வகுப்பறைக்கு மட்டும்.' },
    code: { parts: [c('int x = 10;')], explanation: [{ token: 'int x', meaning: 'Local variable' }] },
    story: [],
    practice: {
      question: 'Function-க்குள் உள்ளே அறிவிக்கப்பட்ட variable எவ்வாறு அழைக்கப்படும்?',
      options: ['Global', 'Local', 'Static', 'Extern'],
      answerIndex: 1,
      explanation: 'Local variable function-க்குள் மட்டுமே வேலை செய்யும்.',
    },
    challenge: {
      title: 'Local Scope',
      prompt: 'Declare local variable int a = 5;',
      starter: '',
      hint: 'int a = 5;',
      expected: 'int a = 5;',
    },
  },
];

export const advancedModules: LevelModule[] = [
  {
    id: 'pointers',
    index: 1,
    title: 'Pointers & Memory Architecture',
    tamilTitle: 'சுட்டிகள் மற்றும் நினைவக கட்டுமானம்',
    icon: 'Cpu',
    description: 'Memory mapping, stack frames, heap allocation, and address manipulation.',
    progress: 0,
    level: 'advanced',
    topics: [
      { id: 'pointers-adv', title: 'Pointer Memory Mapping', tamilTitle: 'நினைவக சுட்டி வரைபடம்' },
    ],
  },
];

export const advancedLessons: LevelLesson[] = [
  {
    id: 'pointers-adv',
    moduleId: 'pointers',
    level: 'advanced',
    title: 'Pointer Memory Mapping',
    tamilTitle: 'நினைவக சுட்டி வரைபடம்',
    duration: 10,
    xp: 100,
    concept: 'Memory stack frame pointer arithmetic.',
    tamilExplanation: 'RAM நினைவகத்தில் Pointer எவ்வாறு நேரடியாக முகவரியை அணுகுகிறது.',
    realLife: { title: 'RAM Memory Map', body: 'நினைவக முகவரி மேலாண்மை.' },
    code: { parts: [c('int *p;')], explanation: [{ token: 'int *p', meaning: 'Pointer to integer' }] },
    story: [],
    practice: {
      question: 'Pointer என்பது என்ன?',
      options: ['Value', 'Memory Address', 'Function', 'Type'],
      answerIndex: 1,
      explanation: 'Pointer என்பது நினைவக முகவரியை சேமிக்கும் மாறி.',
    },
    challenge: {
      title: 'Pointer Declaration',
      prompt: 'int *ptr; என அறிவிக்கவும்.',
      starter: '',
      hint: 'int *ptr;',
      expected: 'int *ptr;',
    },
  },
];
