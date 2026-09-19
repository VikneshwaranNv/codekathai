export type KathaiDiagramType =
  | 'inheritance-family'
  | 'single-inheritance'
  | 'multilevel-inheritance'
  | 'hierarchical-inheritance'
  | 'multiple-inheritance'
  | 'hybrid-inheritance'
  | 'variables'
  | 'memory-heap'
  | 'class-object'
  | 'loop-execution'
  | 'console-io'
  | 'generic';

export interface KathaiVariableItem {
  name: string;
  value: string;
  type: string;
}

export interface KathaiClassItem {
  name: string;
  parent?: string;
  interfaces?: string[];
  fields?: string[];
  methods?: string[];
}

export interface KathaiObjectItem {
  name: string;
  className: string;
  address?: string;
  fields?: Record<string, string>;
}

export interface KathaiDiagramMeta {
  title?: string;
  subtitle?: string;
  variables?: KathaiVariableItem[];
  classes?: KathaiClassItem[];
  objects?: KathaiObjectItem[];
  loopInfo?: { iteration: number; condition: string; variableState: string };
  consoleOutput?: string;
}

export interface KathaiStoryStep {
  stepNumber: number;
  lineIndex: number;
  codeSnippet: string;
  speaker: 'kavi' | 'buddy' | 'narrator';
  speakerTitle: string;
  dialogue: string;
  tamilExplanation: string;
  englishExplanation: string;
  diagramType: KathaiDiagramType;
  diagramMeta?: KathaiDiagramMeta;
}

export interface KathaiStory {
  title: string;
  tamilTitle: string;
  summary: string;
  language: 'c' | 'java';
  totalSteps: number;
  steps: KathaiStoryStep[];
}
