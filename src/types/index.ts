export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
export type Level = typeof LEVELS[number];

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
  | 'strings'
  | 'pointers'
  | 'structures'
  | 'filehandling'
  | 'problemsolving'
  | 'stack'
  | 'queue';

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
  tamilDescription: string;
  topics: Topic[];
  progress: number;
  starred?: boolean;
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
  visual:
    | 'lunchbox'
    | 'memory'
    | 'code'
    | 'containers'
    | 'calculator'
    | 'signal'
    | 'repeat'
    | 'machine'
    | 'lockers'
    | 'address'
    | 'stack'
    | 'queue'
    | 'generic';
  dialogue: string;
  code?: CodePart[];
  caption?: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  level: Level;
  title: string;
  tamilTitle: string;
  duration: number;
  xp: number;
  concept: string;
  tamilExplanation: string;
  englishTerms: { term: string; meaning: string }[];
  realLife: {
    title: string;
    body: string;
  };
  visualExplanation: {
    title: string;
    description: string;
    diagramType: string;
  };
  code: {
    snippet: string;
    parts: CodePart[];
    explanation: { token: string; meaning: string }[];
  };
  outputExplanation: string;
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

export interface PatternProblem {
  id: string;
  title: string;
  tamilTitle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  concept: string;
  tamilConcept: string;
  expectedOutput: string;
  starterCode: string;
  hints: string[];
  solutionCode: string;
  xp: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  xp: number;
  streak: number;
  completedLessons: string[];
  solvedPractice?: string[];
  completedPatterns?: string[];
  playgroundRunsCount?: number;
  aiVisualsCount?: number;
  badges: string[];
  currentLevel: Level;
  createdAt: string;
}
