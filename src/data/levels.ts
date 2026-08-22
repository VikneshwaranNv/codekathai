export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface LevelInfo {
  id: Level;
  title: string;
  tamilTitle: string;
  description: string;
  tamilDescription: string;
  icon: string;
  color: string;
  gradient: string;
  categories: string[];
}

export const levels: LevelInfo[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    tamilTitle: 'தொடக்க நிலை',
    description: 'Start from scratch — learn the fundamentals of C programming through Tamil stories.',
    tamilDescription: 'தொடக்கத்தில் இருந்து கற்றுக்கொள்ளுங்கள் — தமிழ் கதைகள் வழியாக C நிரலாக்க அடிப்படைகளைக் கற்றுக்கொள்ளுங்கள்.',
    icon: 'Sprout',
    color: 'bamboo',
    gradient: 'from-bamboo-500 to-bamboo-700',
    categories: [
      'Introduction', 'Variables', 'Data Types', 'Operators',
      'Input/Output', 'Conditions', 'Loops', 'Functions',
      'Arrays', 'Strings', 'Basic Pointers', 'Structures', 'Basic File Handling',
    ],
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    tamilTitle: 'நடுநிலை',
    description: 'Build logic and solve problems — nested loops, patterns, recursion, searching, sorting, and more.',
    tamilDescription: 'தர்க்கத்தை வளர்த்து பிரச்சினைகளைத் தீர்த்து — nested loops, patterns, recursion, searching, sorting மற்றும் பல.',
    icon: 'Flame',
    color: 'golden',
    gradient: 'from-golden-500 to-golden-700',
    categories: [
      'Nested Loops', 'Pattern Printing', 'Arrays', 'Strings',
      'Recursion', 'Searching', 'Sorting', 'Pointers',
      'Structures', 'File Handling', 'Debugging', 'Time Complexity',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    tamilTitle: 'மேம்பட்ட நிலை',
    description: 'Master software engineering and interview prep — data structures, algorithms, optimization, and competitive programming.',
    tamilDescription: 'மென்பொருள் பொறியியல் மற்றும் நேர்முகத் தேர்வு தயாரிப்பு — தரவு அமைப்புகள், வழிமுறைகள், உகந்ததாக்கல் மற்றும் போட்டி நிரலாக்கம்.',
    icon: 'Crown',
    color: 'rose',
    gradient: 'from-rose-500 to-rose-700',
    categories: [
      'Code Reading', 'Debugging', 'Optimization', 'Memory Management',
      'Linked Lists', 'Stack', 'Queue', 'Trees',
      'Graphs', 'Hashing', 'Dynamic Programming',
      'Competitive Programming', 'Advanced File Handling', 'Best Practices',
    ],
  },
];

export const allCategories = [
  'Programming Basics', 'Variables', 'Operators', 'Conditions', 'Loops',
  'Functions', 'Arrays', 'Strings', 'Pointers', 'Structures',
  'File Handling', 'Recursion', 'Searching', 'Sorting',
  'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs',
  'Hashing', 'Dynamic Programming', 'Projects', 'Interview Preparation',
];
