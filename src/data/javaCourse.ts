import type { Module, Lesson, ModuleId, Level } from '@/types';

export const javaModules: Module[] = [
  {
    id: 'intro' as ModuleId,
    index: 1,
    title: '1. Java அறிமுகம் (Introduction to Java)',
    tamilTitle: 'Java அறிமுகம்',
    icon: 'Coffee',
    description: 'What is Java, Why Java, JVM, JDK, JRE, main(), and System.out.println().',
    tamilDescription: 'Java மொழியின் வரலாறு, JVM கட்டமைப்பு மற்றும் உங்கள் முதல் Java நிரல்.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-what-is-java', title: 'What is Java & Why Java?', tamilTitle: 'Java என்றால் என்ன?' },
      { id: 'java-jvm-jdk-jre', title: 'JVM, JDK & JRE Architecture', tamilTitle: 'JVM, JDK மற்றும் JRE கட்டமைப்பு' },
      { id: 'java-first-program', title: 'First Java Program & main()', tamilTitle: 'முதல் Java நிரல் & main()' },
      { id: 'java-system-out', title: 'System.out.println() Output', tamilTitle: 'System.out.println() வெளியீடு' },
    ],
  },
  {
    id: 'variables' as ModuleId,
    index: 2,
    title: '2. மாறிகள் & தரவு வகைகள் (Variables & Data Types)',
    tamilTitle: 'மாறிகள் & தரவு வகைகள்',
    icon: 'Box',
    description: 'int, double, float, boolean, char, String, Operators & Scanner User Input.',
    tamilDescription: 'தரவு சேமிப்பு பெட்டிகள், Scanner உள்ளீடு மற்றும் கணித இயக்கிகள்.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-variables-intro', title: 'Java Variables & Declaration', tamilTitle: 'மாறிகள் அறிவிப்பு' },
      { id: 'java-primitives', title: 'Primitive Types (int, double, boolean)', tamilTitle: 'அடிப்படை தரவு வகைகள்' },
      { id: 'java-scanner-input', title: 'Scanner User Input', tamilTitle: 'Scanner பயனர் உள்ளீடு' },
      { id: 'java-operators', title: 'Java Operators & Math', tamilTitle: 'கணித இயக்கிகள்' },
    ],
  },
  {
    id: 'structures' as ModuleId,
    index: 3,
    title: '3. வகுப்பு & பொருள் (Classes & Objects)',
    tamilTitle: 'வகுப்பு & பொருள்',
    icon: 'Layers',
    description: 'Classes, Objects, Fields, Constructors, new keyword & Memory Heap.',
    tamilDescription: 'வகுப்பு புளூபிரிண்ட், பொருள் உருவாக்கம் மற்றும் new முக்கியச்சொல்.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-class-object', title: 'What is a Class & Object?', tamilTitle: 'Class & Object என்றால் என்ன?' },
      { id: 'java-new-keyword', title: 'Memory Allocation & new Keyword', tamilTitle: 'new முக்கியச்சொல் & நினைவகம்' },
      { id: 'java-constructors', title: 'Java Constructors', tamilTitle: 'ஆக்கிகள் (Constructors)' },
      { id: 'java-fields-methods', title: 'Object Instance Fields', tamilTitle: 'பொருள் பண்புகள்' },
    ],
  },
  {
    id: 'functions' as ModuleId,
    index: 4,
    title: '4. முறைமைகள் (Methods)',
    tamilTitle: 'முறைமைகள் (Methods)',
    icon: 'Cpu',
    description: 'Creating Methods, Parameters, Return Values, void, and Method Overloading.',
    tamilDescription: 'மறுபயன்பாட்டு முறைமைகள், அளபுருக்கள் மற்றும் திருப்பித் தரும் மதிப்புகள்.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-creating-methods', title: 'Creating Java Methods', tamilTitle: 'Method உருவாக்குதல்' },
      { id: 'java-method-params', title: 'Parameters & Return Values', tamilTitle: 'அளபுருக்கள் & திருப்பும் மதிப்பு' },
      { id: 'java-method-overloading', title: 'Method Overloading', tamilTitle: 'Method மேலெழுதுதல்' },
    ],
  },
  {
    id: 'strings' as ModuleId,
    index: 5,
    title: '5. சரங்கள் (Strings)',
    tamilTitle: 'சரங்கள் (Strings)',
    icon: 'Type',
    description: 'String creation, length(), charAt(), equals(), substring() & Concatenation.',
    tamilDescription: 'எழுத்துச் சரங்கள், நீளம் அறியும் முறைகள் மற்றும் ஒப்பீடு.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-string-intro', title: 'String Creation & Immutability', tamilTitle: 'String உருவாக்கம்' },
      { id: 'java-string-methods', title: 'length(), charAt() & substring()', tamilTitle: 'String முறைமைகள்' },
      { id: 'java-string-equals', title: 'equals() vs == Comparison', tamilTitle: 'String ஒப்பீடு' },
    ],
  },
  {
    id: 'inheritance' as ModuleId,
    index: 6,
    title: '6. மரபுரிமை (Inheritance in Java)',
    tamilTitle: 'மரபுரிமை (Inheritance)',
    icon: 'GitFork',
    description: 'extends keyword, super class, sub class, Single, Multilevel & Hierarchical Inheritance with real-life Father-Son & Animal examples.',
    tamilDescription: 'தந்தை-மகன் மற்றும் மிருகங்கள் உதாரணங்களுடன் மரபுரிமை கோட்பாடுகள்.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-inheritance-intro', title: 'What is Inheritance & extends Keyword', tamilTitle: 'மரபுரிமை அறிமுகம்' },
      { id: 'java-single-inheritance', title: '1. Single Inheritance (Father ➔ Son)', tamilTitle: '1. ஒற்றை மரபுரிமை (தந்தை ➔ மகன்)' },
      { id: 'java-multilevel-inheritance', title: '2. Multilevel Inheritance (Grandfather ➔ Father ➔ Son)', tamilTitle: '2. பலபடி நிலை மரபுரிமை (தாத்தா ➔ தந்தை ➔ மகன்)' },
      { id: 'java-hierarchical-inheritance', title: '3. Hierarchical Inheritance (Father ➔ Son & Daughter)', tamilTitle: '3. கிளை மரபுரிமை (தந்தை ➔ மகன் & மகள்)' },
      { id: 'java-multiple-inheritance', title: '4. Multiple Inheritance via Interface (Father & Mother ➔ Child)', tamilTitle: '4. பல வழி மரபுரிமை (தந்தை & தாய் ➔ சேய்)' },
      { id: 'java-hybrid-inheritance', title: '5. Hybrid Inheritance (Grandfather ➔ Father & Mother ➔ Child)', tamilTitle: '5. கலப்பு மரபுரிமை (தாத்தா ➔ தந்தை & தாய் ➔ சேய்)' },
      { id: 'java-super-keyword', title: 'super Keyword & Method Overriding', tamilTitle: 'super முக்கியச்சொல்' },
    ],
  },
  {
    id: 'oop_advanced' as ModuleId,
    index: 7,
    title: '7. OOP உயர் கோட்பாடுகள் (Polymorphism & Abstraction)',
    tamilTitle: 'OOP உயர் கோட்பாடுகள்',
    icon: 'Shield',
    description: 'Encapsulation, Private Fields, Getters/Setters, Abstract Classes & Interfaces.',
    tamilDescription: 'உறைபொதியாக்கம், அருவ வகுப்புகள் மற்றும் இடைமுகங்கள்.',
    starred: true,
    progress: 0,
    topics: [
      { id: 'java-encapsulation', title: 'Encapsulation & Private Fields', tamilTitle: 'உறைபொதியாக்கம் (Encapsulation)' },
      { id: 'java-abstract-class', title: 'Abstract Classes & Abstract Methods', tamilTitle: 'அருவ வகுப்பு (Abstract Class)' },
      { id: 'java-interface', title: 'Interfaces & Multiple Inheritance', tamilTitle: 'இடைமுகம் (Interface)' },
    ],
  },
];

/**
 * Topic ID to Module ID Mapping Table
 */
const topicModuleMap: Record<string, ModuleId> = {
  'java-what-is-java': 'intro',
  'java-jvm-jdk-jre': 'intro',
  'java-first-program': 'intro',
  'java-system-out': 'intro',
  'java-variables-intro': 'variables',
  'java-primitives': 'variables',
  'java-scanner-input': 'variables',
  'java-operators': 'variables',
  'java-class-object': 'structures',
  'java-new-keyword': 'structures',
  'java-constructors': 'structures',
  'java-fields-methods': 'structures',
  'java-creating-methods': 'functions',
  'java-method-params': 'functions',
  'java-method-overloading': 'functions',
  'java-string-intro': 'strings',
  'java-string-methods': 'strings',
  'java-string-equals': 'strings',
  'java-inheritance-intro': 'inheritance',
  'java-single-inheritance': 'inheritance',
  'java-multilevel-inheritance': 'inheritance',
  'java-hierarchical-inheritance': 'inheritance',
  'java-multiple-inheritance': 'inheritance',
  'java-hybrid-inheritance': 'inheritance',
  'java-super-keyword': 'inheritance',
  'java-encapsulation': 'oop_advanced',
  'java-abstract-class': 'oop_advanced',
  'java-interface': 'oop_advanced',
};

/**
 * Dynamic Educational Java Lessons Resolver with Detailed Content & Proper Module Allocation
 */
export function getJavaLessonForLevel(topicId: string, level: Level = 'beginner'): Lesson {
  const modId = topicModuleMap[topicId] || 'intro';
  const isInter = level === 'intermediate';
  const isAdv = level === 'advanced';

  // 1. JAVA WHAT IS JAVA
  if (topicId === 'java-what-is-java') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'What is Java & Why Java?',
      tamilTitle: 'Java என்றால் என்ன?',
      duration: 8,
      xp: isAdv ? 40 : isInter ? 25 : 15,
      concept: 'Java is a high-level, class-based, object-oriented programming language designed by James Gosling in 1995. Its core principle is WORA (Write Once, Run Anywhere).',
      tamilExplanation: 'Java என்பது 1995-ல் ஜேம்ஸ் காஸ்லிங் என்பவரால் உருவாக்கப்பட்ட சக்திவாய்ந்த பொருள்-சார்ந்த கணினி மொழியாகும். இதன் முக்கிய சிறப்பு: ஒருமுறை எழுதினால் எந்த கணினியிலும் இயங்கும் (WORA).',
      englishTerms: [
        { term: 'WORA', meaning: 'Write Once, Run Anywhere (ஒருமுறை எழுது, எங்கும் இயக்கு)' },
        { term: 'OOP', meaning: 'Object-Oriented Programming (பொருள்-சார்ந்த நிரலாக்கம்)' },
      ],
      realLife: {
        title: 'Universal Power Plug (உலகளாவிய மின் பிளக்)',
        body: 'உலகில் எந்த நாட்டிற்கும் எடுத்துச் செல்லக்கூடிய Universal Adapter போல, Java bytecode எந்த இயங்குதளத்திலும் (Windows, Mac, Linux) இயங்கும்!',
      },
      visualExplanation: {
        title: 'Java Platform Independence',
        description: 'Java Code (.java) -> Compiler (javac) -> Bytecode (.class) -> JVM -> OS Hardware.',
        diagramType: 'wora',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java is Platform Independent!");\n    }\n}`,
        parts: [
          { text: 'public class ', tone: 'keyword' },
          { text: 'Main {\n    ', tone: 'plain' },
          { text: 'public static void main', tone: 'keyword' },
          { text: '(String[] args) {\n        ', tone: 'plain' },
          { text: 'System.out.println', tone: 'name' },
          { text: '(', tone: 'plain' },
          { text: '"Java is Platform Independent!"', tone: 'value' },
          { text: ');\n    }\n}', tone: 'plain' },
        ],
        explanation: [
          { token: 'public class Main', meaning: 'Main என்ற பெயருடைய வகுப்பின் அறிவிப்பு' },
          { token: 'main()', meaning: 'Java நிரலின் முதன்மை நுழைவுப் புள்ளி' },
        ],
      },
      outputExplanation: 'திரையில் Java is Platform Independent! என அச்சிடப்படும்.',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Buddy, C மொழிக்கும் Java மொழிக்கும் என்ன வித்தியாசம்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'C மொழியில் ஒவ்வொரு OS-க்கும் தனித்தனியாக Compile செய்ய வேண்டும். ஆனால் Java-வில் Bytecode உருவானதும் JVM மூலம் எந்த OS-லும் இயங்கும்!',
        },
      ],
      practice: {
        question: 'What is the acronym WORA in Java?',
        options: ['Write Once, Run Anywhere', 'Work Online, Run Always', 'Win Once, Read All', 'Write Output, Read Application'],
        answerIndex: 0,
        explanation: '🎉 Correct! WORA stands for Write Once, Run Anywhere.',
      },
      challenge: {
        title: 'Print Welcome Message',
        prompt: 'System.out.println("Welcome to Java!"); என அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}`,
        hint: 'System.out.println("Welcome to Java!");',
        expected: 'System.out.println("Welcome to Java!");',
      },
    };
  }

  // 2. JAVA JVM JDK JRE
  if (topicId === 'java-jvm-jdk-jre') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'JVM, JDK & JRE Architecture',
      tamilTitle: 'JVM, JDK மற்றும் JRE கட்டமைப்பு',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'JDK is the development kit containing compiler (javac) & dev tools. JRE provides libraries to run code. JVM (Java Virtual Machine) executes bytecode.',
      tamilExplanation: 'JDK என்பது நிரல் எழுதத் தேவையான கருவிகளின் தொகுப்பு. JRE என்பது நிரலை இயக்கத் தேவையான நூலகங்கள். JVM என்பது Bytecode-ஐ இயந்திர மொழியாக மாற்றும் மெய்நிகர் எஞ்சின்.',
      englishTerms: [
        { term: 'JDK', meaning: 'Java Development Kit (தொகுப்பாளர் + கருவிகள்)' },
        { term: 'JRE', meaning: 'Java Runtime Environment (நூலகங்கள் + JVM)' },
        { term: 'JVM', meaning: 'Java Virtual Machine (Bytecode எஞ்சின்)' },
      ],
      realLife: {
        title: '3-Layer Kitchen (3 அடுக்கு சமையலறை)',
        body: 'JDK என்பது சமையலறை உபகரணங்கள் (கத்தி, அடுப்பு). JRE என்பது சமையல் பொருட்கள். JVM என்பது உணவைச் சமைக்கும் சமையல்காரர்!',
      },
      visualExplanation: {
        title: 'JDK > JRE > JVM Nested Architecture',
        description: 'JDK contains JRE + Development Tools (javac). JRE contains JVM + Class Libraries.',
        diagramType: 'jvm',
      },
      code: {
        snippet: `// Compiled with javac Main.java -> Main.class\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("JVM Architecture in Action!");\n    }\n}`,
        parts: [
          { text: 'public class ', tone: 'keyword' },
          { text: 'Main {\n    public static void main(String[] args) {\n        System.out.println(', tone: 'plain' },
          { text: '"JVM Architecture in Action!"', tone: 'value' },
          { text: ');\n    }\n}', tone: 'plain' },
        ],
        explanation: [
          { token: 'javac', meaning: 'Java Compiler converting .java to .class bytecode' },
          { token: 'java', meaning: 'JVM launcher executing .class bytecode' },
        ],
      },
      outputExplanation: 'JVM bytecode-ஐ இயக்கி JVM Architecture in Action! என அச்சிடும்.',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'lockers',
          dialogue: 'JVM எப்படி Bytecode-ஐ இயக்குகிறது Buddy?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'JVM-ல் உள்ள JIT (Just-In-Time) Compiler Bytecode-ஐ நேரடியாக Processor இயக்கும் Machine Code-ஆக வேகமாக மாற்றும்!',
        },
      ],
      practice: {
        question: 'Which tool compiles Java code into Bytecode (.class)?',
        options: ['javac', 'jvm', 'jre', 'g++'],
        answerIndex: 0,
        explanation: '🎉 Correct! `javac` (Java Compiler) converts .java source code to .class bytecode.',
      },
      challenge: {
        title: 'JVM Print Challenge',
        prompt: 'System.out.println("Inside JVM"); என அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
        hint: 'System.out.println("Inside JVM");',
        expected: 'Inside JVM',
      },
    };
  }

  // 3. JAVA FIRST PROGRAM
  if (topicId === 'java-first-program') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'First Java Program & main()',
      tamilTitle: 'முதல் Java நிரல் & main()',
      duration: 8,
      xp: isAdv ? 35 : isInter ? 20 : 15,
      concept: 'Every Java application must have a class and a public static void main(String[] args) method which serves as the entry point.',
      tamilExplanation: 'Java-வில் அனைத்து நிரல்களும் ஒரு Class-க்குள் இருக்க வேண்டும். public static void main(String[] args) என்பது JVM நிரலைத் தொடங்கும் நுழைவுப் புள்ளியாகும்.',
      englishTerms: [
        { term: 'public', meaning: 'எங்கிருந்தும் அணுகக்கூடியது' },
        { term: 'static', meaning: 'பொருள் உருவாக்காமல் நேரடியாக அழைக்கலாம்' },
        { term: 'void', meaning: 'எந்த மதிப்பையும் திருப்பியனுப்பாது' },
      ],
      realLife: {
        title: 'Main Door of House (வீட்டின் முதன்மை வாசல்)',
        body: 'ஒரு வீட்டிற்குள் நுழைய முதன்மை வாசல் தேவைப்படுவது போல, Java நிரலுக்குள் நுழைய main() முறைமை அவசியம்!',
      },
      visualExplanation: {
        title: 'Java Main Entry Point Execution',
        description: 'JVM -> Main Class -> main() Method -> Code Execution.',
        diagramType: 'method-stack',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello CodeKathai!");\n    }\n}`,
        parts: [
          { text: 'public class ', tone: 'keyword' },
          { text: 'Main {\n    ', tone: 'plain' },
          { text: 'public static void ', tone: 'keyword' },
          { text: 'main(String[] args) {\n        ', tone: 'plain' },
          { text: 'System.out.println("Hello CodeKathai!");\n    }\n}', tone: 'value' },
        ],
        explanation: [
          { token: 'String[] args', meaning: 'கட்டளை வரி அளபுருக்கள் (Command line arguments)' },
        ],
      },
      outputExplanation: 'திரையில் Hello CodeKathai! என்று வரும்.',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'main() முறைமையில் static ஏன் போடுகிறோம்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'static போட்டால் JVM பொருள் (Object) உருவாக்காமலேயே நேரடியாக main() முறைமையை அழைக்க முடியும்!',
        },
      ],
      practice: {
        question: 'What is the return type of main() method in Java?',
        options: ['void', 'int', 'String', 'boolean'],
        answerIndex: 0,
        explanation: '🎉 Correct! In Java, main() returns void.',
      },
      challenge: {
        title: 'Main Method Print',
        prompt: 'Hello Java என அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        \n    }\n}`,
        hint: 'System.out.println("Hello Java");',
        expected: 'Hello Java',
      },
    };
  }

  // 4. JAVA SYSTEM OUT
  if (topicId === 'java-system-out') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'System.out.println() Output',
      tamilTitle: 'System.out.println() வெளியீடு',
      duration: 6,
      xp: isAdv ? 30 : isInter ? 20 : 10,
      concept: 'System is a built-in class, out is a PrintStream static object, and println() prints text with a newline character.',
      tamilExplanation: 'System என்பது Java வகுப்பு, out என்பது வெளியீட்டு ஸ்ட்ரீம் பொருள், println() என்பது புதிய வரியுடன் தகவலை அச்சிடும் முறைமை.',
      englishTerms: [
        { term: 'System', meaning: 'Java கணினி பயன்பாட்டு வகுப்பு' },
        { term: 'out', meaning: 'நிலையான வெளியீட்டு ஸ்ட்ரீம் (Standard Output Stream)' },
        { term: 'println', meaning: 'புதிய வரியுடன் அச்சிடுதல்' },
      ],
      realLife: {
        title: 'Printer Machine (அச்சு இயந்திரம்)',
        body: 'ஒரு காகிதத்தில் அச்சிட்டு அடுத்த வரிக்கான பொத்தானை அழுத்துவது போல println() செயல்படுகிறது!',
      },
      visualExplanation: {
        title: 'System.out.println Stream Pipeline',
        description: 'Java Code -> PrintStream Buffer -> Console Screen.',
        diagramType: 'scanner-input',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.print("Line 1 ");\n        System.out.println("Line 2");\n        System.out.println("Line 3");\n    }\n}`,
        parts: [
          { text: 'System.out.print(', tone: 'name' },
          { text: '"Line 1 "', tone: 'value' },
          { text: ');\nSystem.out.println(', tone: 'name' },
          { text: '"Line 2"', tone: 'value' },
          { text: ');\n', tone: 'plain' },
        ],
        explanation: [
          { token: 'print()', meaning: 'அடுத்த வரிக்கான இடைவெளி தராது' },
          { token: 'println()', meaning: 'அச்சிட்ட பின் புதிய வரிக்கு நகரும்' },
        ],
      },
      outputExplanation: 'Line 1 Line 2\nLine 3',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'print() மற்றும் println() இடையே என்ன வித்தியாசம்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'print() அதே வரியில் அச்சிடும், println() அச்சிட்ட பிறகு தானாக அடுத்த வரிக்கான Enter அடிக்கும்!',
        },
      ],
      practice: {
        question: 'Which method prints output without adding a new line at the end?',
        options: ['System.out.print()', 'System.out.println()', 'System.out.newLine()', 'printf()'],
        answerIndex: 0,
        explanation: '🎉 Correct! print() does not append a newline.',
      },
      challenge: {
        title: 'Two Line Output',
        prompt: 'முதல் வரியில் Tamil என்றும் இரண்டாம் வரியில் Java என்றும் அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
        hint: 'System.out.println("Tamil");\nSystem.out.println("Java");',
        expected: 'Tamil',
      },
    };
  }

  // 5. JAVA VARIABLES INTRO (Module: variables)
  if (topicId === 'java-variables-intro') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Java Variables & Declaration',
      tamilTitle: 'மாறிகள் அறிவிப்பு',
      duration: 8,
      xp: isAdv ? 35 : isInter ? 20 : 15,
      concept: 'Variables store data in RAM memory. In Java, every variable must be declared with a strict data type before use.',
      tamilExplanation: 'Variable என்பது தரவை நினைவகத்தில் (RAM) சேமிக்கும் பெட்டி. Java-வில் ஒவ்வொரு மாறിക്കും தரவு வகையை (Data Type) கட்டாயம் குறிப்பிட வேண்டும்.',
      englishTerms: [
        { term: 'Declaration', meaning: 'மாறியை உருவாக்குதல் (int age;)' },
        { term: 'Initialization', meaning: 'மதிப்பை அளித்தல் (age = 20;)' },
      ],
      realLife: {
        title: 'Labeled Storage Box (பெயரிடப்பட்ட பெட்டி)',
        body: 'சர்க்கரை பெட்டியில் சர்க்கரையை மட்டும் வைப்பது போல, int மாறியில் முழு எண்களை மட்டுமே வைக்க முடியும்!',
      },
      visualExplanation: {
        title: 'RAM Memory Slot Reservation',
        description: 'int age = 20 reserves 4 bytes in RAM Stack with identifier "age".',
        diagramType: 'heap-stack',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        int age = 20;\n        System.out.println("Age is: " + age);\n    }\n}`,
        parts: [
          { text: 'int ', tone: 'keyword' },
          { text: 'age = ', tone: 'plain' },
          { text: '20;\n', tone: 'value' },
          { text: 'System.out.println("Age is: " + age);', tone: 'plain' },
        ],
        explanation: [
          { token: 'int', meaning: '4 பைட்டுகள் முழுஎண் தரவு வகை' },
        ],
      },
      outputExplanation: 'Age is: 20',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'lunchbox',
          dialogue: 'Buddy, Java-வில் மாறிகளின் பெயரை எப்படி வைக்க வேண்டும்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'Java-வில் camelCase முறையைப் பின்பற்ற வேண்டும் (எ.கா: studentAge, totalMarks)!',
        },
      ],
      practice: {
        question: 'Which of the following is a valid variable declaration in Java?',
        options: ['int x = 10;', 'x := 10;', 'var integer x = 10;', 'integer x = 10;'],
        answerIndex: 0,
        explanation: '🎉 Correct! `int x = 10;` is valid Java declaration.',
      },
      challenge: {
        title: 'Declare Variable',
        prompt: 'int mark = 95; என அறிவித்து அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
        hint: 'int mark = 95;\nSystem.out.println(mark);',
        expected: '95',
      },
    };
  }

  // 6. JAVA PRIMITIVES (Module: variables)
  if (topicId === 'java-primitives') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Primitive Types (int, double, boolean)',
      tamilTitle: 'அடிப்படை தரவு வகைகள்',
      duration: 10,
      xp: isAdv ? 40 : isInter ? 25 : 15,
      concept: 'Java has 8 primitive data types: byte, short, int, long, float, double, boolean, and char with fixed memory sizes.',
      tamilExplanation: 'Java-வில் 8 அடிப்படை தரவு வகைகள் உள்ளன. int (4 bytes), double (8 bytes), boolean (1 bit - true/false), char (2 bytes).',
      englishTerms: [
        { term: 'int', meaning: 'முழுஎண்கள் (-2^31 முதல் 2^31-1 வரை)' },
        { term: 'double', meaning: 'தசம எண்கள் (64-bit Floating point)' },
        { term: 'boolean', meaning: 'உண்மை / பொய் (true / false)' },
      ],
      realLife: {
        title: 'Coin vs Currency Note vs Card',
        body: 'சிறிய தொகைக்கு நாணயம், பெரிய தொகைக்கு நோட்டு போல, தரவின் அளவுக்கு ஏற்ப byte, int, long பயன்படும்!',
      },
      visualExplanation: {
        title: 'Primitive Memory Sizing',
        description: 'byte(1B) < short(2B) < int(4B) < long(8B). double is 8 Bytes.',
        diagramType: 'memory',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        int count = 50;\n        double price = 99.99;\n        boolean isPassed = true;\n        char grade = 'A';\n        System.out.println("Price: " + price + ", Passed: " + isPassed);\n    }\n}`,
        parts: [
          { text: 'double ', tone: 'keyword' },
          { text: 'price = 99.99;\n', tone: 'value' },
          { text: 'boolean ', tone: 'keyword' },
          { text: 'isPassed = true;\n', tone: 'value' },
        ],
        explanation: [
          { token: 'double', meaning: 'துல்லியமான தசம எண்கள்' },
          { token: 'boolean', meaning: 'நிபந்தனை முடிவுகள் (true/false)' },
        ],
      },
      outputExplanation: 'Price: 99.99, Passed: true',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'char மாறியில் ஒற்றை மேற்கோள் (\'\') பயன்படுத்த வேண்டுமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஆம்! char-க்கு ஒற்றை மேற்கோள் (\'A\'), String-க்கு இரட்டை மேற்கோள் ("Hello") கட்டாயம்!',
        },
      ],
      practice: {
        question: 'What is the size of double in Java?',
        options: ['8 bytes', '4 bytes', '2 bytes', '16 bytes'],
        answerIndex: 0,
        explanation: '🎉 Correct! double is 8 bytes (64 bits).',
      },
      challenge: {
        title: 'Double Variable Challenge',
        prompt: 'double gpa = 8.75; என அறிவித்து அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        \n    }\n}`,
        hint: 'double gpa = 8.75;\nSystem.out.println(gpa);',
        expected: '8.75',
      },
    };
  }

  // 7. JAVA SCANNER INPUT (Module: variables)
  if (topicId === 'java-scanner-input') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Scanner User Input',
      tamilTitle: 'Scanner பயனர் உள்ளீடு',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'java.util.Scanner class is used to get user input from System.in. scanner.nextInt() reads integer, nextLine() reads String.',
      tamilExplanation: 'Scanner வகுப்பு மூலம் பயனரிடமிருந்து உள்ளீட்டைப் பெறலாம். scanner.nextInt() எண்களையும், scanner.nextLine() வரிகளையும் படிக்கும்.',
      englishTerms: [
        { term: 'import', meaning: 'மற்ற தொகுப்புகளில் உள்ள வகுப்புகளை சேர்த்தல்' },
        { term: 'System.in', meaning: 'விசைப்பலகை உள்ளீட்டு ஸ்ட்ரீம்' },
        { term: 'nextInt()', meaning: 'முழுஎண் உள்ளீட்டைப் படித்தல்' },
      ],
      realLife: {
        title: 'Form Input Box (படிவ உள்ளீடு)',
        body: 'வலைத்தளத்தில் பெயர் மற்றும் வயதை தட்டச்சு செய்வது போல Scanner முனையத்தில் பயனர் தட்டச்சு செய்வதைப் படிக்கும்!',
      },
      visualExplanation: {
        title: 'Scanner System.in Buffer Stream',
        description: 'Keyboard Input -> System.in Stream -> Scanner -> Java Variable.',
        diagramType: 'scanner-input',
      },
      code: {
        snippet: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter number: ");\n        int n = scanner.nextInt();\n        System.out.println("You entered: " + n);\n    }\n}`,
        parts: [
          { text: 'import java.util.Scanner;\n\n', tone: 'keyword' },
          { text: 'Scanner scanner = new Scanner(System.in);\n', tone: 'plain' },
          { text: 'int n = scanner.nextInt();', tone: 'name' },
        ],
        explanation: [
          { token: 'new Scanner(System.in)', meaning: 'Scanner பொருள் உருவாக்குதல்' },
          { token: 'scanner.nextInt()', meaning: 'முழுஎண்ணைப் பெறுதல்' },
        ],
      },
      outputExplanation: 'பயனர் உள்ளீடு 9 தந்தால் "You entered: 9" என அச்சிடப்படும்.',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Scanner பயன்படுத்துவதற்கு முன்பு import java.util.Scanner; எழுத வேண்டுமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஆம்! Scanner வகுப்பு java.util தொகுப்பில் உள்ளதால் அதை import செய்ய வேண்டும்!',
        },
      ],
      practice: {
        question: 'Which method in Scanner reads a full line of text String?',
        options: ['nextLine()', 'nextInt()', 'nextDouble()', 'readString()'],
        answerIndex: 0,
        explanation: '🎉 Correct! `nextLine()` reads full string line.',
      },
      challenge: {
        title: 'Read Integer Input',
        prompt: 'Scanner மூலம் ஒரு முழுஎண்ணைப் பெற்று அச்சிடுங்கள்.',
        starter: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // Read int n\n    }\n}`,
        hint: 'int n = scanner.nextInt();\nSystem.out.println(n);',
        expected: 'nextInt',
      },
    };
  }

  // 8. JAVA OPERATORS (Module: variables)
  if (topicId === 'java-operators') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Java Operators & Math',
      tamilTitle: 'கணித இயக்கிகள்',
      duration: 8,
      xp: isAdv ? 35 : isInter ? 25 : 15,
      concept: 'Java supports Arithmetic (+, -, *, /, %), Relational (==, !=, >, <), Logical (&&, ||, !), and Increment/Decrement (++, --) operators.',
      tamilExplanation: 'கணித இயக்கிகள் (+, -, *, /, %), ஒப்பீட்டு இயக்கிகள் (>, <, ==) மற்றும் தருக்க இயக்கிகள் (&&, ||) கணக்கீடுகளைச் செய்ய பயன்படுகின்றன.',
      englishTerms: [
        { term: 'Modulus (%)', meaning: 'மீதியைத் தரும் இயக்கி (10 % 3 = 1)' },
        { term: 'Increment (++)', meaning: 'மதிப்பை 1 கூட்டுதல்' },
      ],
      realLife: {
        title: 'Calculator Buttons (கணிப்பான் பொத்தான்கள்)',
        body: 'கணிப்பானில் + - * பொத்தான்கள் கணக்கிடுவது போல Java-வில் இயக்கிகள் செயல்படுகின்றன!',
      },
      visualExplanation: {
        title: 'Operator Precedence & Evaluation',
        description: 'Parentheses () -> Multiplication/Division (*, /) -> Addition/Subtraction (+, -).',
        diagramType: 'method-stack',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        int a = 15, b = 4;\n        System.out.println("Sum: " + (a + b));\n        System.out.println("Remainder: " + (a % b));\n    }\n}`,
        parts: [
          { text: 'int a = 15, b = 4;\n', tone: 'plain' },
          { text: 'a % b', tone: 'value' },
        ],
        explanation: [
          { token: 'a % b', meaning: '15-ஐ 4-ஆல் வகுத்தால் மீதி 3 வரும்' },
        ],
      },
      outputExplanation: 'Sum: 19\nRemainder: 3',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: '10 / 4 செய்தால் 2.5 வராதா Buddy?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'Java-வில் இரு int எண்களை வகுத்தால் தசமம் விடுபட்டு 2 மட்டுமே வரும்! 2.5 வர (double)10 / 4 என எழுத வேண்டும்.',
        },
      ],
      practice: {
        question: 'What is the value of 17 % 5 in Java?',
        options: ['2', '3', '3.4', '0'],
        answerIndex: 0,
        explanation: '🎉 Correct! 17 divided by 5 leaves a remainder of 2.',
      },
      challenge: {
        title: 'Modulus Output',
        prompt: 'System.out.println(25 % 4); என அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        \n    }\n}`,
        hint: 'System.out.println(25 % 4);',
        expected: '1',
      },
    };
  }

  // 9. JAVA CLASS OBJECT (Module: structures -> Classes & Objects)
  if (topicId === 'java-class-object') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'What is a Class & Object?',
      tamilTitle: 'Class & Object என்றால் என்ன?',
      duration: 12,
      xp: isAdv ? 50 : isInter ? 35 : 20,
      concept: 'A Class is a blueprint/template defining state (fields) and behavior (methods). An Object is an instance of a class instantiated in memory.',
      tamilExplanation: 'Class என்பது பொருள் செய்வதற்கான புளூபிரிண்ட் (வரைபடம்). Object என்பது அந்த வரைபடத்திலிருந்து உருவாக்கப்பட்ட உண்மையான பொருள் ஆகும்.',
      englishTerms: [
        { term: 'Class', meaning: 'வரைபடம் / புளூபிரிண்ட்' },
        { term: 'Object', meaning: 'உண்மையான பொருள் (Instance)' },
        { term: 'Field', meaning: 'பொருளின் தரவு பண்பு' },
      ],
      realLife: {
        title: 'House Blueprint vs Real House (வீட்டு வரைபடம்)',
        body: 'வரைபடம் (Class) ஒன்றே ஒன்றுதான். ஆனால் அதைக் கொண்டு பல வீடுகளை (Objects) கட்டலாம்!',
      },
      visualExplanation: {
        title: 'Class Blueprint to Multiple Heap Objects',
        description: 'Student Class -> student1 Object (Name: Kavi) & student2 Object (Name: Arul).',
        diagramType: 'class-object',
      },
      code: {
        snippet: `class Student {\n    String name = "Kavi";\n    int mark = 95;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        System.out.println(s.name + " got " + s.mark);\n    }\n}`,
        parts: [
          { text: 'class Student {\n', tone: 'keyword' },
          { text: '    String name = "Kavi";\n    int mark = 95;\n}\n', tone: 'plain' },
          { text: 'Student s = new Student();', tone: 'name' },
        ],
        explanation: [
          { token: 'new Student()', meaning: 'Student வகுப்பிற்கு பொருள் உருவாக்குதல்' },
        ],
      },
      outputExplanation: 'Kavi got 95',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'class-object',
          dialogue: 'ஒரு Class-லிருந்து எத்தனை Objects உருவாக்கலாம்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'எத்தனை வேண்டுமானாலும் உருவாக்கலாம்! ஒவ்வொன்றும் நினைவகத்தில் தனித்தனி இடத்தைப் பெறும்!',
        },
      ],
      practice: {
        question: 'Which of the following describes a Java Object?',
        options: ['An instance of a Class', 'A primitive data type', 'A compiler function', 'A loop control'],
        answerIndex: 0,
        explanation: '🎉 Correct! An object is a runtime instance of a Class.',
      },
      challenge: {
        title: 'Create Object',
        prompt: 'Student s = new Student(); உருவாக்கி s.name அச்சிடுங்கள்.',
        starter: `class Student {\n    String name = "Kavi";\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create object\n    }\n}`,
        hint: 'Student s = new Student();\nSystem.out.println(s.name);',
        expected: 'Kavi',
      },
    };
  }

  // 10. JAVA NEW KEYWORD (Module: structures)
  if (topicId === 'java-new-keyword') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Memory Allocation & new Keyword',
      tamilTitle: 'new முக்கியச்சொல் & நினைவகம்',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'The `new` keyword dynamically allocates memory on the JVM Heap for an object and calls its constructor to initialize fields.',
      tamilExplanation: '`new` முக்கியச்சொல் JVM-ன் Heap நினைவகத்தில் பொருளுக்கான புதிய இடத்தை உருவாக்கி அதன் பண்புகளைத் தொடங்கும்.',
      englishTerms: [
        { term: 'new', meaning: 'Heap நினைவகத்தில் புதிய பொருளை உருவாக்குபவர்' },
        { term: 'Heap Memory', meaning: 'பொருள்கள் சேமிக்கப்படும் நினைவகம்' },
        { term: 'Stack Memory', meaning: 'சுட்டெண் (Reference) சேமிக்கப்படும் பகுதி' },
      ],
      realLife: {
        title: 'Hotel Room Booking (ஹோட்டல் அறை பதிவு)',
        body: 'ஹோட்டலில் புதிய அறை பதிவு செய்து சாவி பெறுவது போல `new` Heap-ல் இடம் ஒதுக்கி Reference சாவி தரும்!',
      },
      visualExplanation: {
        title: 'Stack Reference Pointer to Heap Memory Object',
        description: 'Stack Frame (s -> 0x400) points to Heap Object (Student instance).',
        diagramType: 'heap-stack',
      },
      code: {
        snippet: `class Car {\n    String model = "Tesla";\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c1 = new Car();\n        Car c2 = new Car();\n        System.out.println(c1.model);\n    }\n}`,
        parts: [
          { text: 'Car c1 = ', tone: 'plain' },
          { text: 'new ', tone: 'keyword' },
          { text: 'Car();', tone: 'name' },
        ],
        explanation: [
          { token: 'c1', meaning: 'Stack நினைவகத்தில் உள்ள சுட்டெண் மாறி' },
          { token: 'new Car()', meaning: 'Heap நினைவகத்தில் உருவாக்கப்பட்ட பொருள்' },
        ],
      },
      outputExplanation: 'Tesla',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'address',
          dialogue: 'c1 மற்றும் c2 இரண்டும் ஒரே பொருளா Buddy?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'இல்லை! new இருமுறை அழைக்கப்பட்டதால் Heap-ல் இரு வேறு பொருட்கள் உருவாக்கப்பட்டுள்ளன!',
        },
      ],
      practice: {
        question: 'Where are objects created with `new` stored in Java memory?',
        options: ['Heap Memory', 'Stack Memory', 'Code Segment', 'Cache Memory'],
        answerIndex: 0,
        explanation: '🎉 Correct! All Java objects created with `new` are stored in Heap Memory.',
      },
      challenge: {
        title: 'Instantiate Object',
        prompt: 'new முக்கியச்சொல் மூலம் Car பொருள் உருவாக்குங்கள்.',
        starter: `class Car {\n    int speed = 100;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Your code\n    }\n}`,
        hint: 'Car c = new Car();\nSystem.out.println(c.speed);',
        expected: '100',
      },
    };
  }

  // 11. JAVA CONSTRUCTORS (Module: structures)
  if (topicId === 'java-constructors') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Java Constructors',
      tamilTitle: 'ஆக்கிகள் (Constructors)',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'A Constructor is a special block of code called automatically when an object is created. It has the same name as its class and no return type.',
      tamilExplanation: 'Constructor என்பது பொருள் உருவாக்கப்படும்போது தானாக இயங்கும் சிறப்பு முறைமையாகும். இதன் பெயர் Class பெயராகவே இருக்கும், திருப்பு வகை கிடையாது.',
      englishTerms: [
        { term: 'Default Constructor', meaning: 'அளபுருக்கள் இல்லாத இயல்பு ஆக்கி' },
        { term: 'Parameterized Constructor', meaning: 'அளபுருக்கள் கொண்ட ஆக்கி' },
      ],
      realLife: {
        title: 'Factory Assembly Line (தொழிற்சாலை உற்பத்தி)',
        body: 'ஒரு பொம்மை உருவானவுடனேயே அதற்கு நிறமும் பெயரும் பூசப்படுவது போல Constructor இயங்கும்!',
      },
      visualExplanation: {
        title: 'Constructor Automatic Triggering on Instantiation',
        description: 'new Student("Kavi", 95) -> Constructor executes -> Instance initialized.',
        diagramType: 'class-object',
      },
      code: {
        snippet: `class Student {\n    String name;\n    Student(String n) {\n        name = n;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student("Kavi");\n        System.out.println("Name: " + s.name);\n    }\n}`,
        parts: [
          { text: 'Student(String n) {\n', tone: 'keyword' },
          { text: '    name = n;\n}', tone: 'plain' },
        ],
        explanation: [
          { token: 'Student(String n)', meaning: 'Parameterized Constructor' },
        ],
      },
      outputExplanation: 'Name: Kavi',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Constructor-க்கு void போடலாமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'கூடாது! void போட்டால் அது சாதாரண முறைமையாகிவிடும், Constructor ஆகாது!',
        },
      ],
      practice: {
        question: 'Which is true about a Java Constructor?',
        options: ['It has the exact same name as the Class', 'It returns void', 'It is called manually like a method', 'It must be private'],
        answerIndex: 0,
        explanation: '🎉 Correct! Constructor must share the exact name of its class.',
      },
      challenge: {
        title: 'Constructor Initialization',
        prompt: 'Constructor மூலம் பெயருக்கு மதிப்பு அளித்து அச்சிடுங்கள்.',
        starter: `class User {\n    String name;\n    User(String n) {\n        name = n;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User("Code");\n        System.out.println(u.name);\n    }\n}`,
        hint: 'User u = new User("Code");',
        expected: 'Code',
      },
    };
  }

  // 12. JAVA FIELDS METHODS (Module: structures)
  if (topicId === 'java-fields-methods') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Object Instance Fields',
      tamilTitle: 'பொருள் பண்புகள்',
      duration: 8,
      xp: isAdv ? 35 : isInter ? 25 : 15,
      concept: 'Instance fields belong to individual objects. Dot operator (.) is used to access or modify an object field.',
      tamilExplanation: 'Instance variables என்பது ஒவ்வொரு பொருளுக்கும் தனித்தனியாக இருக்கும் தரவு பண்புகள். புள்ளி (.) இயக்கி மூலம் இவற்றை அணுகலாம்.',
      englishTerms: [
        { term: 'Dot Operator (.)', meaning: 'பொருளின் உறுப்புகளை அணுகும் புள்ளி இயக்கி' },
        { term: 'State', meaning: 'பொருளின் தற்போதைய தரவு நிலை' },
      ],
      realLife: {
        title: 'ID Cards of Students (மாணவர் அடையாள அட்டை)',
        body: 'ஒவ்வொரு மாணவரிடமும் அடையாள அட்டை (Class) இருந்தாலும் பெயர் மற்றும் வரிசை எண் (Fields) மாறுபடும்!',
      },
      visualExplanation: {
        title: 'Dot Operator Field Lookup',
        description: 's1.name = "Kavi", s2.name = "Arul". Distinct Heap Slots.',
        diagramType: 'class-object',
      },
      code: {
        snippet: `class Dog {\n    String breed = "Labrador";\n    int age = 3;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        System.out.println(d.breed + " is " + d.age + " yrs old.");\n    }\n}`,
        parts: [
          { text: 'd.breed', tone: 'value' },
          { text: ' + " is " + ', tone: 'plain' },
          { text: 'd.age', tone: 'value' },
        ],
        explanation: [
          { token: 'd.breed', meaning: 'd பொருளின் breed பண்பைப் படித்தல்' },
        ],
      },
      outputExplanation: 'Labrador is 3 yrs old.',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'd.breed = "German Shepherd"; என மாற்றலாமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'கண்டிப்பாக! d பொருளின் breed மதிப்பை எப்போது வேண்டுமானாலும் மாற்றலாம்!',
        },
      ],
      practice: {
        question: 'Which operator is used to access fields of an object in Java?',
        options: ['. (Dot)', '-> (Arrow)', ':: (Scope)', ': (Colon)'],
        answerIndex: 0,
        explanation: '🎉 Correct! The dot (.) operator accesses instance variables and methods.',
      },
      challenge: {
        title: 'Access Instance Field',
        prompt: 'Dog d = new Dog(); உருவாக்கி d.age அச்சிடுங்கள்.',
        starter: `class Dog {\n    int age = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Your code\n    }\n}`,
        hint: 'Dog d = new Dog();\nSystem.out.println(d.age);',
        expected: '4',
      },
    };
  }

  // 13. JAVA CREATING METHODS (Module: functions -> Methods)
  if (topicId === 'java-creating-methods') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Creating Java Methods',
      tamilTitle: 'Method உருவாக்குதல்',
      duration: 10,
      xp: isAdv ? 40 : isInter ? 25 : 15,
      concept: 'A Method is a block of code performing a specific task, executed only when called. It helps code reusability.',
      tamilExplanation: 'Method என்பது குறிப்பிட்ட பணியைச் செய்யும் நிரல் தொகுதி. தேவைப்படும் போது பலமுறை அழைத்து மறுபயன்பாடு செய்யலாம்.',
      englishTerms: [
        { term: 'Method', meaning: 'செயல்முறை தொகுதி' },
        { term: 'Return Type', meaning: 'திருப்பித் தரும் தரவு வகை (void/int/String)' },
      ],
      realLife: {
        title: 'Washing Machine Button (சலவை இயந்திர பொத்தான்)',
        body: 'பொத்தானை அழுத்தினால் சலவை செய்வது போல method-ஐ அழைத்தால் குறிப்பிட்ட வேலை நடக்கும்!',
      },
      visualExplanation: {
        title: 'Method Execution Stack Push & Pop',
        description: 'main() calls greet() -> greet() frame pushed to Stack -> returns -> popped.',
        diagramType: 'method-stack',
      },
      code: {
        snippet: `public class Main {\n    static void greet() {\n        System.out.println("Vanakkam Java!");\n    }\n\n    public static void main(String[] args) {\n        greet();\n    }\n}`,
        parts: [
          { text: 'static void ', tone: 'keyword' },
          { text: 'greet() {\n        System.out.println("Vanakkam Java!");\n    }\n', tone: 'plain' },
          { text: 'greet();', tone: 'name' },
        ],
        explanation: [
          { token: 'greet()', meaning: 'greet முறைமையை அழைத்தல்' },
        ],
      },
      outputExplanation: 'Vanakkam Java!',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Method பயன்படுத்துவதால் என்ன நன்மை?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஒரே நிரலை மீண்டும் மீண்டும் எழுதாமல், ஒருமுறை எழுதிவிட்டு பலமுறை அழைக்கலாம் (Code Reusability)!',
        },
      ],
      practice: {
        question: 'Which keyword indicates that a method does NOT return any value?',
        options: ['void', 'null', 'empty', 'static'],
        answerIndex: 0,
        explanation: '🎉 Correct! `void` specifies that a method returns no value.',
      },
      challenge: {
        title: 'Call Method Challenge',
        prompt: 'greet() முறைமையை அழைத்து "Hello Method" என அச்சிடுங்கள்.',
        starter: `public class Main {\n    static void greet() {\n        System.out.println("Hello Method");\n    }\n    public static void main(String[] args) {\n        // Call greet()\n    }\n}`,
        hint: 'greet();',
        expected: 'greet();',
      },
    };
  }

  // 14. JAVA METHOD PARAMS (Module: functions)
  if (topicId === 'java-method-params') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Parameters & Return Values',
      tamilTitle: 'அளபுருக்கள் & திருப்பும் மதிப்பு',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'Parameters pass values into a method. The return statement sends calculated results back to the caller.',
      tamilExplanation: 'Parameters என்பது முறைமைக்கு அனுப்படும் தரவுகள். return கூற்று கணக்கிடப்பட்ட முடிவை மீண்டும் அனுப்பும்.',
      englishTerms: [
        { term: 'Parameter', meaning: 'முறைமை பெறும் உள்ளீட்டு மாறி' },
        { term: 'Return', meaning: 'முடிவை திருப்பி அனுப்புதல்' },
      ],
      realLife: {
        title: 'Juicer Machine (சாறு பிழியும் எஞ்சின்)',
        body: 'ஆப்பிளை (Parameter) கொடுத்தால் பழச்சாற்றை (Return Value) தருவது போல Method இயங்கும்!',
      },
      visualExplanation: {
        title: 'Data Flow Into and Out of Method',
        description: 'add(5, 10) -> computes 15 -> returns 15 to main().',
        diagramType: 'method-stack',
      },
      code: {
        snippet: `public class Main {\n    static int add(int x, int y) {\n        return x + y;\n    }\n\n    public static void main(String[] args) {\n        int sum = add(10, 20);\n        System.out.println("Sum: " + sum);\n    }\n}`,
        parts: [
          { text: 'static int ', tone: 'keyword' },
          { text: 'add(int x, int y) {\n        ', tone: 'plain' },
          { text: 'return x + y;\n    }', tone: 'value' },
        ],
        explanation: [
          { token: 'return x + y', meaning: 'கூட்டல் தொகையை திருப்பி அனுப்புகிறது' },
        ],
      },
      outputExplanation: 'Sum: 30',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'return செய்த மதிப்பை நேரடியாக அச்சிடலாமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஆம்! System.out.println(add(10, 20)); என்றும் நேரடியாக எழுதலாம்!',
        },
      ],
      practice: {
        question: 'What is the return type of a method declaring `static int calculate()`?',
        options: ['int', 'void', 'double', 'String'],
        answerIndex: 0,
        explanation: '🎉 Correct! The return type is int.',
      },
      challenge: {
        title: 'Return Square Value',
        prompt: 'square(5) அழைத்து 25 என்பதை அச்சிடுங்கள்.',
        starter: `public class Main {\n    static int square(int n) {\n        return n * n;\n    }\n    public static void main(String[] args) {\n        System.out.println(square(5));\n    }\n}`,
        hint: 'System.out.println(square(5));',
        expected: '25',
      },
    };
  }

  // 15. JAVA METHOD OVERLOADING (Module: functions)
  if (topicId === 'java-method-overloading') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Method Overloading',
      tamilTitle: 'Method மேலெழுதுதல்',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'Method Overloading allows multiple methods in the same class to share the same name with different parameter types or counts.',
      tamilExplanation: 'ஒரே வகுப்பில் ஒரே பெயருடைய ஆனால் வேறுபட்ட அளபுருக்கள் கொண்ட பல முறைமைகளை உருவாக்குவது Method Overloading ஆகும்.',
      englishTerms: [
        { term: 'Overloading', meaning: 'ஒரே பெயரில் பல முறைமைகள்' },
        { term: 'Compile-time Polymorphism', meaning: 'தொகுப்பு நேர பலஉருவாக்கம்' },
      ],
      realLife: {
        title: 'Payment App Options (கட்டண பயன்பாடு)',
        body: 'GPay-ல் QR Code படித்து பணம் செலுத்தலாம், அல்லது போன் எண் வழியேயும் செலுத்தலாம். பெயர் ஒன்றுதான், வழிமுறை வேறு!',
      },
      visualExplanation: {
        title: 'Compiler Method Matching Pipeline',
        description: 'add(5, 10) matches add(int, int). add(2.5, 3.5) matches add(double, double).',
        diagramType: 'method-stack',
      },
      code: {
        snippet: `public class Main {\n    static int add(int a, int b) {\n        return a + b;\n    }\n    static double add(double a, double b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(add(5, 10));\n        System.out.println(add(2.5, 3.5));\n    }\n}`,
        parts: [
          { text: 'static int add(int a, int b)\n', tone: 'keyword' },
          { text: 'static double add(double a, double b)', tone: 'keyword' },
        ],
        explanation: [
          { token: 'add(int, int)', meaning: 'முழுஎண்களுக்கான add முறைமை' },
          { token: 'add(double, double)', meaning: 'தசம எண்களுக்கான add முறைமை' },
        ],
      },
      outputExplanation: '15\n6.0',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Return type மட்டும் மாறினால் Overloading ஆகுமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஆகாது! அளபுருக்களின் எண்ணிக்கை அல்லது தரவு வகை கட்டாயம் மாற வேண்டும்!',
        },
      ],
      practice: {
        question: 'Method Overloading is determined during which phase?',
        options: ['Compile-time', 'Runtime', 'Loading time', 'Deployment time'],
        answerIndex: 0,
        explanation: '🎉 Correct! Method Overloading is compile-time polymorphism.',
      },
      challenge: {
        title: 'Overloaded Method Call',
        prompt: 'add(10, 20) அச்சிடுங்கள்.',
        starter: `public class Main {\n    static int add(int a, int b) { return a + b; }\n    public static void main(String[] args) {\n        System.out.println(add(10, 20));\n    }\n}`,
        hint: 'System.out.println(add(10, 20));',
        expected: '30',
      },
    };
  }

  // 16. JAVA STRING INTRO (Module: strings)
  if (topicId === 'java-string-intro') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'String Creation & Immutability',
      tamilTitle: 'String உருவாக்கம்',
      duration: 10,
      xp: isAdv ? 40 : isInter ? 25 : 15,
      concept: 'Strings in Java are objects representing a sequence of characters. Strings are immutable—once created in String Pool, they cannot be changed.',
      tamilExplanation: 'String என்பது எழுத்துக்களின் வரிசையைக் குறிக்கும் பொருள். Java-வில் String உருவாக்கப்பட்டுவிட்டால் அதை நேரடியாக மாற்ற முடியாது (Immutable).',
      englishTerms: [
        { term: 'Immutable', meaning: 'மாற்ற முடியாத நினைவக பொருள்' },
        { term: 'String Constant Pool', meaning: 'சரங்கள் சேமிக்கப்படும் சிறப்புப் பகுதி' },
      ],
      realLife: {
        title: 'Printed Book Page (அச்சடிக்கப்பட்ட பக்கங்கள்)',
        body: 'புத்தகத்தில் அச்சடிக்கப்பட்ட எழுத்துக்களை திருத்த முடியாது, புதிய பக்கத்தைத்தான் எழுத வேண்டும். அதுபோல String செயல்படும்!',
      },
      visualExplanation: {
        title: 'String Pool Heap Memory Architecture',
        description: 's1 = "Java", s2 = "Java". Both point to same String Pool literal memory address.',
        diagramType: 'string-pool',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        String str = "CodeKathai";\n        System.out.println("Hello " + str);\n    }\n}`,
        parts: [
          { text: 'String ', tone: 'keyword' },
          { text: 'str = ', tone: 'plain' },
          { text: '"CodeKathai";', tone: 'value' },
        ],
        explanation: [
          { token: 'String', meaning: 'Java சரம் வகுப்பு' },
        ],
      },
      outputExplanation: 'Hello CodeKathai',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'address',
          dialogue: 'String-ல் புதிய எழுத்தைச் சேர்த்தால் என்ன ஆகும்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'பழைய String மாறாது, நினைவகத்தில் புதிய String உருவாக்கப்படும்!',
        },
      ],
      practice: {
        question: 'Why are Strings in Java immutable?',
        options: ['For security, caching in String Pool & thread safety', 'Because they are primitive types', 'Because Java does not support characters', 'To save compiler time'],
        answerIndex: 0,
        explanation: '🎉 Correct! Immutability enables security, performance, and String Pool caching.',
      },
      challenge: {
        title: 'String Concatenation',
        prompt: 'String s = "Java" + " " + "Rulez"; அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        // Your code\n    }\n}`,
        hint: 'String s = "Java" + " " + "Rulez";\nSystem.out.println(s);',
        expected: 'Java Rulez',
      },
    };
  }

  // 17. JAVA STRING METHODS (Module: strings)
  if (topicId === 'java-string-methods') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'length(), charAt() & substring()',
      tamilTitle: 'String முறைமைகள்',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'String class provides built-in methods: length() gets total characters, charAt(index) gets character at position, substring(start, end) extracts portion.',
      tamilExplanation: 'String வகுப்பில் பல பயனுள்ள முறைமைகள் உள்ளன: length() நீளத்தை அறிய, charAt(index) குறிப்பிட்ட இடத்தில் உள்ள எழுத்தைப் பெற, substring() பகுதியை மட்டும் பிரிக்க.',
      englishTerms: [
        { term: 'length()', meaning: 'சரத்தின் மொத்த எழுத்து எண்ணிக்கை' },
        { term: 'charAt()', meaning: 'சுட்டெண் இடத்தில் உள்ள எழுத்து' },
        { term: 'substring()', meaning: 'துண்டு சரம் பிரித்தல்' },
      ],
      realLife: {
        title: 'Measuring Tape & Scissors (அளவு நாடா & கத்தரிக்கோல்)',
        body: 'துணியின் நீளத்தை அளப்பது length(), குறிப்பிட்ட இடத்தை வெட்டியெடுப்பது substring()!',
      },
      visualExplanation: {
        title: 'String Character Array Indexing',
        description: 's = "JAVA" -> Index 0:\'J\', Index 1:\'A\', Index 2:\'V\', Index 3:\'A\'. Length = 4.',
        diagramType: 'string-pool',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        String text = "Java";\n        System.out.println("Length: " + text.length());\n        System.out.println("First Char: " + text.charAt(0));\n    }\n}`,
        parts: [
          { text: 'text.length()', tone: 'name' },
          { text: '\ntext.charAt(0)', tone: 'name' },
        ],
        explanation: [
          { token: 'length()', meaning: '4 என்பதைத் தரும்' },
          { token: 'charAt(0)', meaning: '\'J\' என்ற எழுத்தைத் தரும்' },
        ],
      },
      outputExplanation: 'Length: 4\nFirst Char: J',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'charAt(10) என தவறான சுட்டெண் கொடுத்தால் என்ன ஆகும்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'StringIndexOutOfBoundsException எனும் பிழை எழும்பும்!',
        },
      ],
      practice: {
        question: 'What is the return value of "Hello".length()?',
        options: ['5', '4', '6', '0'],
        answerIndex: 0,
        explanation: '🎉 Correct! "Hello" contains 5 characters.',
      },
      challenge: {
        title: 'Print String Length',
        prompt: '"Tamil".length() அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        String lang = "Tamil";\n        System.out.println(lang.length());\n    }\n}`,
        hint: 'System.out.println(lang.length());',
        expected: '5',
      },
    };
  }

  // 18. JAVA STRING EQUALS (Module: strings)
  if (topicId === 'java-string-equals') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'equals() vs == Comparison',
      tamilTitle: 'String ஒப்பீடு',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: '`==` compares memory reference addresses. `.equals()` compares actual character contents of the two String objects.',
      tamilExplanation: '`==` என்பது நினைவக முகவரிகளை ஒப்பீடும். `.equals()` என்பது சரத்தின் உண்மையான எழுத்துக்களை ஒப்பீடும்.',
      englishTerms: [
        { term: '== Operator', meaning: 'நினைவக முகவரி ஒப்பீடு (Address Match)' },
        { term: '.equals() Method', meaning: 'எழுத்து உள்ளடக்கம் ஒப்பீடு (Content Match)' },
      ],
      realLife: {
        title: 'Two Identical Keys (ஒரே போன்ற இரு சாவிகள்)',
        body: 'இரு சாவிகள் ஒரே மாதிரி பார்க்க இருந்தாலும் அவை வெவ்வேறு பொருட்களா (==) அல்லது ஒரே பூட்டைத் திறக்கிறதா (equals) என்பது போல!',
      },
      visualExplanation: {
        title: '== vs equals() Memory Allocation Diagram',
        description: 's1 == s2 checks address pointers. s1.equals(s2) checks string characters inside Heap.',
        diagramType: 'string-pool',
      },
      code: {
        snippet: `public class Main {\n    public static void main(String[] args) {\n        String s1 = "Java";\n        String s2 = new String("Java");\n        System.out.println("== : " + (s1 == s2));\n        System.out.println("equals : " + s1.equals(s2));\n    }\n}`,
        parts: [
          { text: 's1 == s2', tone: 'value' },
          { text: '\ns1.equals(s2)', tone: 'value' },
        ],
        explanation: [
          { token: 's1 == s2', meaning: 'false (வேறு நினைவக முகவரிகள்)' },
          { token: 's1.equals(s2)', meaning: 'true (ஒரே எழுத்துக்கள்)' },
        ],
      },
      outputExplanation: '== : false\nequals : true',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'address',
          dialogue: 'Java-வில் Strings-ஐ ஒப்பிட எதைப் பயன்படுத்த வேண்டும்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'எப்போதும் .equals() முறைமையைத்தான் பயன்படுத்த வேண்டும்! == பயன்படுத்தினால் பிழை வரலாம்!',
        },
      ],
      practice: {
        question: 'Which method should be used to compare text contents of two Java Strings?',
        options: ['.equals()', '==', 'compareToAddress()', 'isSame()'],
        answerIndex: 0,
        explanation: '🎉 Correct! `.equals()` checks string content value.',
      },
      challenge: {
        title: 'String Equals Challenge',
        prompt: 's1.equals(s2) அச்சிடுங்கள்.',
        starter: `public class Main {\n    public static void main(String[] args) {\n        String s1 = "Code";\n        String s2 = "Code";\n        System.out.println(s1.equals(s2));\n    }\n}`,
        hint: 'System.out.println(s1.equals(s2));',
        expected: 'true',
      },
    };
  }

  // 19. JAVA INHERITANCE INTRO
  if (topicId === 'java-inheritance-intro') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'What is Inheritance & extends Keyword',
      tamilTitle: 'மரபுரிமை என்றால் என்ன? extends சொல்',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'Inheritance allows a Child class (Subclass) to inherit fields and methods from a Parent class (Superclass) using the extends keyword.',
      tamilExplanation: 'மரபுரிமை (Inheritance) என்பது ஒரு தாய் வகுப்பின் (Parent Class) பண்புகளையும் முறைமைகளையும் சேய் வகுப்பு (Child Class) `extends` சொல் மூலம் பெறுவதாகும்.',
      englishTerms: [
        { term: 'Inheritance', meaning: 'மரபுரிமை / வாரிசுத்தன்மை' },
        { term: 'extends', meaning: 'தாய் வகுப்பிலிருந்து பண்புகளை நீட்டிக்கும் சொல்' },
        { term: 'Superclass', meaning: 'தாய் வகுப்பு (Parent Class)' },
        { term: 'Subclass', meaning: 'சேய் வகுப்பு (Child Class)' },
      ],
      realLife: {
        title: 'Father & Son Ancestral House (தந்தை ➔ மகன்)',
        body: 'தந்தையிடம் உள்ள வீடு மற்றும் குடும்பப் பெயர் (surname) மகனுக்குத் தானாகவே சொந்தமாவது போல, Parent Class பண்புகள் Child Class-க்குக் கிடைக்கும்!',
      },
      visualExplanation: {
        title: 'Parent Class (Father) to Child Class (Son) Inheritance',
        description: 'Father class defines house() and surname. Son class extends Father and inherits both.',
        diagramType: 'inheritance-family',
      },
      code: {
        snippet: `class Father {\n    String surname = "Sharma";\n    void house() {\n        System.out.println("Living in Family House");\n    }\n}\n\nclass Son extends Father {\n    void bike() {\n        System.out.println("Riding Sports Bike");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        s.house();\n        System.out.println("Surname: " + s.surname);\n        s.bike();\n    }\n}`,
        parts: [
          { text: 'class Son ', tone: 'keyword' },
          { text: 'extends ', tone: 'keyword' },
          { text: 'Father {\n', tone: 'plain' },
          { text: 's.house();', tone: 'name' },
        ],
        explanation: [
          { token: 'extends Father', meaning: 'Father வகுப்பிலிருந்து பண்புகளைப் பெறுகிறது' },
          { token: 's.house()', meaning: 'Father வகுப்பின் house() முறைமையை அழைக்கலாம்' },
        ],
      },
      outputExplanation: 'Living in Family House\nSurname: Sharma\nRiding Sports Bike',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Child Class-ல் Parent Class முறைமையை மீண்டும் எழுத வேண்டுமா Buddy?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'தேவையே இல்லை! extends போட்டவுடன் Parent Class முறைமைகள் தானாகவே Child Class-க்கு வந்துவிடும்!',
        },
      ],
      practice: {
        question: 'Which Java keyword is used to inherit from a class?',
        options: ['extends', 'implements', 'inherits', 'super'],
        answerIndex: 0,
        explanation: '🎉 Correct! `extends` keyword is used for class inheritance.',
      },
      challenge: {
        title: 'Single Inheritance Output',
        prompt: 'Son s = new Son(); உருவாக்கி s.house(); அச்சிடுங்கள்.',
        starter: `class Father {\n    void house() {\n        System.out.println("Family House");\n    }\n}\n\nclass Son extends Father {}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Your code\n    }\n}`,
        hint: 'Son s = new Son();\ns.house();',
        expected: 'Family House',
      },
    };
  }

  // 20. JAVA SINGLE INHERITANCE
  if (topicId === 'java-single-inheritance') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Single Inheritance (Father ➔ Son)',
      tamilTitle: '1. ஒற்றை மரபுரிமை (Single Inheritance)',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'Single Inheritance occurs when exactly one subclass derives directly from one superclass (Father -> Son).',
      tamilExplanation: 'ஒற்றை மரபுரிமை (Single Inheritance) என்பதில் ஒரே ஒரு தாய் வகுப்பிலிருந்து (Father) ஒரே ஒரு சேய் வகுப்பு (Son) பண்புகளை நேரடியாகப் பெறுகிறது.',
      englishTerms: [
        { term: 'Single Inheritance', meaning: 'ஒரே ஒரு தாய் ➔ ஒரே சேய் தொடர்பு (1-to-1 extension)' },
        { term: 'extends', meaning: 'தாய் வகுப்பைப் பின் தொடரும் சொல்' },
      ],
      realLife: {
        title: 'Father & Son Family Real-Life Analogy (தந்தை ➔ மகன்)',
        body: 'தந்தைக்கு உள்ள குடும்ப வீடும், நிலமும் மகனுக்குத் தானாகவே சொந்தமாவது போன்ற நேரியல் 1-to-1 குடும்ப வாரிசுத்தன்மை!',
      },
      visualExplanation: {
        title: '1. Single Inheritance Family Mapping',
        description: 'Father class defines house() and surname. Son class extends Father and inherits both.',
        diagramType: 'single-inheritance',
      },
      code: {
        snippet: `class Father {\n    String surname = "Rao";\n    void house() {\n        System.out.println("Family House");\n    }\n}\n\nclass Son extends Father {\n    void driveCar() {\n        System.out.println("Driving Car");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        s.house();\n        System.out.println("Surname: " + s.surname);\n        s.driveCar();\n    }\n}`,
        parts: [
          { text: 'class Son extends Father', tone: 'keyword' },
          { text: '\ns.house();', tone: 'name' },
        ],
        explanation: [
          { token: 'extends Father', meaning: 'Father வகுப்பிலிருந்து house() மற்றும் surname மாறிகளை மகனுக்கு வழங்குகிறது' },
        ],
      },
      outputExplanation: 'Family House\nSurname: Rao\nDriving Car',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'Single Inheritance-ல் எத்தனை Parent Class இருக்க முடியும்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஒரே ஒரு Parent Class மட்டுமே இருக்க முடியும்! தந்தை ➔ மகன் தொடர்பு நேரடி 1-to-1 மரபுரிமை!',
        },
      ],
      practice: {
        question: 'In Java Single Inheritance, how many parent classes can a child class extend?',
        options: ['Exactly 1 class', 'Multiple classes', 'Zero classes', 'Unlimited classes'],
        answerIndex: 0,
        explanation: '🎉 Correct! Java permits extending only 1 class directly.',
      },
      challenge: {
        title: 'Single Inheritance Output',
        prompt: 'Son s = new Son(); s.house(); அச்சிடுங்கள்.',
        starter: `class Father {\n    void house() { System.out.println("Family House"); }\n}\nclass Son extends Father {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        s.house();\n    }\n}`,
        hint: 's.house();',
        expected: 'Family House',
      },
    };
  }

  // 21. JAVA MULTILEVEL INHERITANCE
  if (topicId === 'java-multilevel-inheritance') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Multilevel Inheritance (Grandfather ➔ Father ➔ Son)',
      tamilTitle: '2. பலபடி நிலை மரபுரிமை (Multilevel Inheritance)',
      duration: 10,
      xp: isAdv ? 50 : isInter ? 35 : 20,
      concept: 'Multilevel Inheritance forms a chain where a subclass extends another subclass (Grandfather -> Father -> Son).',
      tamilExplanation: 'பலபடி நிலை மரபுரிமை (Multilevel Inheritance) என்பது ஒரு குடும்ப சங்கிலித் தொடர் போன்றது (தாத்தா ➔ தந்தை ➔ பேரன்). பேரனுக்கு தாத்தா மற்றும் தந்தை இருவரின் பண்புகளும் கிடைக்கும்.',
      englishTerms: [
        { term: 'Multilevel Chain', meaning: 'தாத்தா ➔ தந்தை ➔ பேரன் சங்கிலி மரபுரிமை' },
        { term: 'Transitive Inheritance', meaning: 'பண்புகள் சங்கிலி வழியாக அடுத்தடுத்த தலைமுறைக்கு பரவுதல்' },
      ],
      realLife: {
        title: 'Grandfather ➔ Father ➔ Son Family Chain (தாத்தா ➔ தந்தை ➔ பேரன்)',
        body: 'தாத்தாவின் 50 ஏக்கர் நிலம் தந்தைக்கு வருகிறது, தந்தையின் பங்களா வீடும் நிலமும் பேரனுக்குச் சேரும் 3-tier குடும்ப சங்கிலி!',
      },
      visualExplanation: {
        title: '2. Multilevel Inheritance 3-Tier Ladder',
        description: 'Grandfather (land) -> Father (house) -> Son (car). Son has access to land, house & car.',
        diagramType: 'multilevel-inheritance',
      },
      code: {
        snippet: `class Grandfather {\n    void land() {\n        System.out.println("50 Acres Land");\n    }\n}\nclass Father extends Grandfather {\n    void house() {\n        System.out.println("Family Villa");\n    }\n}\nclass Son extends Father {\n    void car() {\n        System.out.println("Electric Car");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        s.land();\n        s.house();\n        s.car();\n    }\n}`,
        parts: [
          { text: 'class Father extends Grandfather', tone: 'keyword' },
          { text: '\nclass Son extends Father', tone: 'keyword' },
        ],
        explanation: [
          { token: 's.land()', meaning: 'Grandfather வகுப்பின் land() முறைமை சங்கிலி வழியாக Son-க்கு கிடைக்கிறது' },
        ],
      },
      outputExplanation: '50 Acres Land\nFamily Villa\nElectric Car',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Son பொருளால் Grandfather முறைமையை நேரடியாக அழைக்க முடியுமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'நிச்சயமாக! Multilevel சங்கிலியில் கீழே உள்ள சேய் பொருளுக்கு மேலே உள்ள தாத்தா மற்றும் தந்தையின் அனைத்து பண்புகளும் கிடைக்கும்!',
        },
      ],
      practice: {
        question: 'Which sequence correctly represents Multilevel Inheritance?',
        options: ['Class A -> Class B -> Class C', 'Class A -> Class B and Class A -> Class C', 'Class A and Class B -> Class C', 'Class A -> Class A'],
        answerIndex: 0,
        explanation: '🎉 Correct! A -> B -> C forms a Multilevel inheritance chain.',
      },
      challenge: {
        title: 'Multilevel Call',
        prompt: 'Son s = new Son(); s.land(); அச்சிடுங்கள்.',
        starter: `class Grandfather { void land() { System.out.println("Ancestral Land"); } }\nclass Father extends Grandfather {}\nclass Son extends Father {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        s.land();\n    }\n}`,
        hint: 's.land();',
        expected: 'Ancestral Land',
      },
    };
  }

  // 22. JAVA HIERARCHICAL INHERITANCE
  if (topicId === 'java-hierarchical-inheritance') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Hierarchical Inheritance (Father ➔ Son & Daughter)',
      tamilTitle: '3. கிளை மரபுரிமை (Hierarchical Inheritance)',
      duration: 10,
      xp: isAdv ? 50 : isInter ? 35 : 20,
      concept: 'Hierarchical Inheritance occurs when multiple child classes inherit from a single common parent class (Father -> Son & Daughter).',
      tamilExplanation: 'கிளை மரபுரிமை (Hierarchical Inheritance) என்பதில் ஒரே ஒரு பொதுத் தந்தை வகுப்பிலிருந்து (Father) மகன் (Son) மற்றும் மகள் (Daughter) இருவரும் கிளைகளாகப் பிரிந்து பண்புகளைப் பெறுவர்.',
      englishTerms: [
        { term: 'Hierarchical Tree', meaning: 'ஒரே தாய் ➔ பல சேய் கிளை மரபுரிமை' },
        { term: 'Common Base Class', meaning: 'அனைத்து சேய்களுக்கும் பொதுவான தாய் வகுப்பு' },
      ],
      realLife: {
        title: 'Father with Son & Daughter Family Tree (தந்தை ➔ மகன் & மகள்)',
        body: 'தந்தை (Father) ஒரே குடும்பப் பெயரை மகனுக்கும் (Son - Software Engineer) மகளுக்கும் (Daughter - Doctor) வழங்குவது போன்ற கிளை அமைப்பு!',
      },
      visualExplanation: {
        title: '3. Hierarchical Family Branching Diagram',
        description: 'Father (familyTitle, land) branches into Son (Engineer) and Daughter (Doctor).',
        diagramType: 'hierarchical-inheritance',
      },
      code: {
        snippet: `class Father {\n    void familyTitle() {\n        System.out.println("Family Title: Rao");\n    }\n}\nclass Son extends Father {\n    void skill() {\n        System.out.println("Son Skill: Software Engineer");\n    }\n}\nclass Daughter extends Father {\n    void skill() {\n        System.out.println("Daughter Skill: Medical Doctor");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        Daughter d = new Daughter();\n        s.familyTitle();\n        s.skill();\n        d.familyTitle();\n        d.skill();\n    }\n}`,
        parts: [
          { text: 'class Son extends Father', tone: 'keyword' },
          { text: '\nclass Daughter extends Father', tone: 'keyword' },
        ],
        explanation: [
          { token: 's.familyTitle() & d.familyTitle()', meaning: 'Son மற்றும் Daughter இருவரும் Father-ன் familyTitle முறைமையைப் பகிர்ந்து கொள்கின்றனர்' },
        ],
      },
      outputExplanation: 'Family Title: Rao\nSon Skill: Software Engineer\nFamily Title: Rao\nDaughter Skill: Medical Doctor',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'Son பொருளால் Daughter-ன் skill() முறைமையை அழைக்க முடியுமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'முடியாது! Son மற்றும் Daughter இரண்டும் தனித்தனி கிளை வகுப்புகள்! அவை தந்தை வகுப்பின் பண்புகளை மட்டுமே பொதுவில் பகிரும்!',
        },
      ],
      practice: {
        question: 'In Hierarchical Inheritance, how many parent classes exist for multiple child classes?',
        options: ['Exactly 1 parent class', 'Multiple parent classes', 'No parent class', 'Two parent classes'],
        answerIndex: 0,
        explanation: '🎉 Correct! Multiple child classes extend ONE common parent class.',
      },
      challenge: {
        title: 'Hierarchical Call',
        prompt: 'Son s = new Son(); s.familyTitle(); அச்சிடுங்கள்.',
        starter: `class Father { void familyTitle() { System.out.println("Family Title: Rao"); } }\nclass Son extends Father {}\nclass Daughter extends Father {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Son s = new Son();\n        s.familyTitle();\n    }\n}`,
        hint: 's.familyTitle();',
        expected: 'Family Title: Rao',
      },
    };
  }

  // 22B. JAVA MULTIPLE INHERITANCE VIA INTERFACE
  if (topicId === 'java-multiple-inheritance') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Multiple Inheritance via Interface (Father & Mother ➔ Child)',
      tamilTitle: '4. பல வழி மரபுரிமை (Multiple Inheritance via Interface)',
      duration: 12,
      xp: isAdv ? 55 : isInter ? 40 : 25,
      concept: 'Java does NOT support Multiple Inheritance with classes to prevent the Diamond Problem. However, Java supports Multiple Inheritance using Interfaces!',
      tamilExplanation: 'Java-வில் வகுப்புகள் (Classes) மூலம் ஒரே நேரத்தில் இரண்டு தாயைப் பின்பற்ற முடியாது (Diamond Problem தவிர்க்க). ஆனால் இடைமுகங்கள் (Interfaces) மற்றும் `implements` மூலம் பல வழி மரபுரிமையைப் பெறலாம்!',
      englishTerms: [
        { term: 'Multiple Inheritance', meaning: 'இரண்டு அல்லது அதற்கு மேற்பட்ட தாய் நிலைகளிலிருந்து பண்புகள் பெறுதல்' },
        { term: 'Interface Contract', meaning: 'வகுப்பு நிறைவேற்ற வேண்டிய முறைமைகளின் ஒப்பந்தம்' },
        { term: 'implements', meaning: 'இடைமுகங்களை வகுப்பில் செயல்படுத்துவதற்கான சொல்' },
      ],
      realLife: {
        title: 'Father & Mother Traits in Child (தந்தை & தாய் ➔ குழந்தை)',
        body: 'குழந்தை (Child) தந்தையிடமிருந்து கார் ஓட்டும் திறனையும் (Driveable), தாயிடமிருந்து சமையல் திறனையும் (Cookable) ஒரே நேரத்தில் கற்றுக்கொள்வது போன்ற பல வழி குடும்ப மரபுரிமை!',
      },
      visualExplanation: {
        title: '4. Multiple Inheritance via Interface Diagram',
        description: 'Father interface (drive) + Mother interface (cook) -> Child implements both.',
        diagramType: 'multiple-inheritance',
      },
      code: {
        snippet: `interface FatherSkills {\n    void driveCar();\n}\n\ninterface MotherSkills {\n    void cookFood();\n}\n\nclass Child implements FatherSkills, MotherSkills {\n    public void driveCar() {\n        System.out.println("Child Driving Sports Car");\n    }\n    public void cookFood() {\n        System.out.println("Child Cooking Delicious Biryani");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.driveCar();\n        c.cookFood();\n    }\n}`,
        parts: [
          { text: 'class Child implements ', tone: 'keyword' },
          { text: 'FatherSkills, MotherSkills', tone: 'name' },
        ],
        explanation: [
          { token: 'implements FatherSkills, MotherSkills', meaning: 'Child வகுப்பு இரு இடைமுகங்களின் ஒப்பந்தங்களையும் ஒரே நேரத்தில் நிறைவேற்றுகிறது' },
        ],
      },
      outputExplanation: 'Child Driving Sports Car\nChild Cooking Delicious Biryani',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'Buddy, class Child extends Father, Mother என எழுதக் கூடாதா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'கூடாது! Java-வில் வகுப்புகளுக்கு இடையே Multiple Inheritance கிடையாது (Diamond Problem ஏற்படும்)! பதிலாக interface பயன்படுத்தி implements Father, Mother என எழுத வேண்டும்!',
        },
      ],
      practice: {
        question: 'How does Java achieve Multiple Inheritance?',
        options: ['Using Interfaces with `implements`', 'Using `extends ClassA, ClassB`', 'Java does not support multiple inheritance at all', 'Using static constructors'],
        answerIndex: 0,
        explanation: '🎉 Correct! Java achieves Multiple Inheritance using Interfaces.',
      },
      challenge: {
        title: 'Multiple Inheritance Challenge',
        prompt: 'Child c = new Child(); c.driveCar(); c.cookFood(); அச்சிடுங்கள்.',
        starter: `interface Father { void driveCar(); }\ninterface Mother { void cookFood(); }\nclass Child implements Father, Mother {\n    public void driveCar() { System.out.println("Drive"); }\n    public void cookFood() { System.out.println("Cook"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.driveCar();\n        c.cookFood();\n    }\n}`,
        hint: 'c.driveCar(); c.cookFood();',
        expected: 'Drive\nCook',
      },
    };
  }

  // 22C. JAVA HYBRID INHERITANCE
  if (topicId === 'java-hybrid-inheritance') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Hybrid Inheritance (Grandfather ➔ Father & Mother ➔ Child)',
      tamilTitle: '5. கலப்பு மரபுரிமை (Hybrid Inheritance)',
      duration: 12,
      xp: isAdv ? 60 : isInter ? 45 : 30,
      concept: 'Hybrid Inheritance is a combination of two or more types of inheritance (e.g., Multilevel Class Inheritance + Multiple Interface Inheritance).',
      tamilExplanation: 'கலப்பு மரபுரிமை (Hybrid Inheritance) என்பது இரண்டு அல்லது அதற்கு மேற்பட்ட மரபுரிமைகளின் கலவையாகும் (உதாரணமாக: தாத்தா ➔ தந்தை என்ற சங்கிலியும், தாய் இடைமுகமும் இணைந்தது).',
      englishTerms: [
        { term: 'Hybrid Inheritance', meaning: 'பலபடி நிலை + இடைமுக பல வழி மரபுரிமையின் கலவை' },
        { term: 'Combo Architecture', meaning: 'வகுப்பு நீட்டிப்பும் இடைமுக அமலாக்கமும் இணைந்த கட்டமைப்பு' },
      ],
      realLife: {
        title: 'Grandfather ➔ Father + Mother ➔ Child Combo Family Tree (கலப்பு குடும்ப மரபுரிமை)',
        body: 'பேரன் (Child), தந்தையிடமிருந்து (Father extends Grandfather) குடும்பச் சொத்தையும், தாயிடமிருந்து (Mother interface) கலைத் திறனையும் (Artistic) ஒரே நேரத்தில் பெறுகிறான்!',
      },
      visualExplanation: {
        title: '5. Hybrid Inheritance Family Combo Diagram',
        description: 'Grandfather -> Father (class) + Mother (interface) -> Child extends Father implements Mother.',
        diagramType: 'hybrid-inheritance',
      },
      code: {
        snippet: `class Grandfather {\n    void land() { System.out.println("Ancestral 100 Acres"); }\n}\n\nclass Father extends Grandfather {\n    void house() { System.out.println("Ancestral Mansion"); }\n}\n\ninterface MotherSkills {\n    void paintArt();\n}\n\nclass Child extends Father implements MotherSkills {\n    public void paintArt() {\n        System.out.println("Child Painting Modern Art");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.land();\n        c.house();\n        c.paintArt();\n    }\n}`,
        parts: [
          { text: 'class Child extends Father implements MotherSkills', tone: 'keyword' },
        ],
        explanation: [
          { token: 'extends Father implements MotherSkills', meaning: 'Child வகுப்பு Father வழியாக தாத்தாவின் சொத்துக்களையும், MotherSkills வழியாக ஓவியத் திறனையும் பெறுகிறது' },
        ],
      },
      outputExplanation: 'Ancestral 100 Acres\nAncestral Mansion\nChild Painting Modern Art',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'வாழ்த்துகள்! ஒரே நேரத்தில் extends மற்றும் implements இரண்டையும் பயன்படுத்த முடியுமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'ஆம்! class Child extends Father implements MotherSkills என எழுதுவதுதான் Hybrid Inheritance-ன் மிகச்சிறந்த வடிவம்!',
        },
      ],
      practice: {
        question: 'What is Hybrid Inheritance in Java?',
        options: ['A combination of two or more inheritance types', 'Only single class inheritance', 'Only abstract methods', 'A loop construct'],
        answerIndex: 0,
        explanation: '🎉 Correct! Hybrid Inheritance combines multiple inheritance types using class extension and interfaces.',
      },
      challenge: {
        title: 'Hybrid Inheritance Challenge',
        prompt: 'Child c = new Child(); c.land(); c.paintArt(); அச்சிடுங்கள்.',
        starter: `class Grandfather { void land() { System.out.println("Land"); } }\nclass Father extends Grandfather {}\ninterface Mother { void paintArt(); }\nclass Child extends Father implements Mother {\n    public void paintArt() { System.out.println("Art"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.land();\n        c.paintArt();\n    }\n}`,
        hint: 'c.land(); c.paintArt();',
        expected: 'Land\nArt',
      },
    };
  }

  // 23. JAVA SUPER KEYWORD
  if (topicId === 'java-super-keyword') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'super Keyword & Method Overriding',
      tamilTitle: 'super முக்கியச்சொல் & மேலெழுதுதல்',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'The `super` keyword is used to refer to immediate parent class objects, methods, or constructors.',
      tamilExplanation: '`super` முக்கியச்சொல் தாய் வகுப்பின் (Parent Class) முறைமைகள், மாறிகள் அல்லது ஆக்கிகளை (Constructors) சேய் வகுப்பிற்குள் இருந்து நேரடியாக அழைக்கப் பயன்படுகிறது.',
      englishTerms: [
        { term: 'super', meaning: 'தாய் வகுப்பைக் குறிக்கும் சிறப்புச் சொல்' },
        { term: 'Method Overriding', meaning: 'தாய் வகுப்பு முறைமையை சேய் வகுப்பில் திருத்தி எழுதுதல்' },
      ],
      realLife: {
        title: 'Calling Father from Son Room',
        body: 'சேய் தன் சொந்த குரலில் பேசினாலும் தந்தையின் பாரம்பரிய குரலை super.greet() மூலம் ஒலிப்பது போன்றது!',
      },
      visualExplanation: {
        title: 'super Keyword Pointer to Superclass Frame',
        description: 'Child calls super.greet() to invoke Parent implementation before running its own code.',
        diagramType: 'inheritance-family',
      },
      code: {
        snippet: `class Parent {\n    void greet() { System.out.println("Parent Greet"); }\n}\nclass Child extends Parent {\n    void greet() {\n        super.greet();\n        System.out.println("Child Greet");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.greet();\n    }\n}`,
        parts: [
          { text: 'super.greet();', tone: 'keyword' },
        ],
        explanation: [
          { token: 'super.greet()', meaning: 'Parent வகுப்பின் greet() முறைமையை அழைக்கிறது' },
        ],
      },
      outputExplanation: 'Parent Greet\nChild Greet',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'super.greet() போடவில்லை என்றால் என்ன ஆகும்?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'Child வகுப்பின் greet() மட்டுமே இயங்கும்! Parent வகுப்பின் greet() மறைக்கப்படும் (Overridden)!',
        },
      ],
      practice: {
        question: 'What is the purpose of the `super` keyword in Java?',
        options: ['To refer to immediate parent class instance', 'To create a static variable', 'To terminate a loop', 'To make a class private'],
        answerIndex: 0,
        explanation: '🎉 Correct! `super` refers to parent class methods/fields/constructors.',
      },
      challenge: {
        title: 'Super Call Challenge',
        prompt: 'super.greet(); மூலம் Parent Greet அச்சிடுங்கள்.',
        starter: `class Parent { void greet() { System.out.println("Parent Greet"); } }\nclass Child extends Parent {\n    void greet() {\n        super.greet();\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.greet();\n    }\n}`,
        hint: 'c.greet();',
        expected: 'Parent Greet',
      },
    };
  }

  // 24. JAVA ENCAPSULATION
  if (topicId === 'java-encapsulation') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Encapsulation & Private Fields',
      tamilTitle: 'உறைபொதியாக்கம் (Encapsulation)',
      duration: 10,
      xp: isAdv ? 45 : isInter ? 30 : 20,
      concept: 'Encapsulation is wrapping data (variables) and code (methods) together into a single unit, keeping fields private with public getters and setters.',
      tamilExplanation: 'உறைபொதியாக்கம் (Encapsulation) என்பது தரவுகளைப் பாதுகாக்க மாறிகளை `private` ஆக்கி, அவற்றைப் படிக்க/மாற்ற `public` getter & setter முறைமைகளைப் பயன்படுத்துவதாகும்.',
      englishTerms: [
        { term: 'Encapsulation', meaning: 'தரவுப் பாதுகாப்பு உறைபொதியாக்கம்' },
        { term: 'private', meaning: 'வகுப்பிற்குள் மட்டுமே அணுகக்கூடியது' },
        { term: 'getter / setter', meaning: 'மதிப்பை படிக்கவும் எழுதவும் உதவும் பொது முறைமைகள்' },
      ],
      realLife: {
        title: 'Medicine Capsule & Bank ATM Locker',
        body: 'மருந்து கேப்சூலுக்குள் பொடி பாதுகாப்பாகிருப்பது போல, private variables பாதுகாக்கப்படுகிறது!',
      },
      visualExplanation: {
        title: 'Encapsulation Private Lock & Public Getter API',
        description: 'private balance field locked inside. getBalance() provides public read access.',
        diagramType: 'encapsulation',
      },
      code: {
        snippet: `class BankAccount {\n    private double balance = 1000.0;\n\n    public double getBalance() {\n        return balance;\n    }\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.deposit(500);\n        System.out.println("Balance: " + acc.getBalance());\n    }\n}`,
        parts: [
          { text: 'private double ', tone: 'keyword' },
          { text: 'balance = 1000.0;\n', tone: 'plain' },
          { text: 'public double getBalance()', tone: 'name' },
        ],
        explanation: [
          { token: 'private double balance', meaning: 'வகுப்பிற்கு வெளியே நேரடியாக அணுக முடியாது' },
        ],
      },
      outputExplanation: 'Balance: 1500.0',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'acc.balance = -5000; என நேரடியாக மாற்ற முடியாதா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'முடியாது! balance என்பது private என்பதால் தொகுப்பி (Compiler) பிழை காட்டும்! deposit() வழியாக மட்டுமே மாற்றி தவறான தொகையைத் தடுக்க முடியும்!',
        },
      ],
      practice: {
        question: 'How do you achieve Encapsulation in Java?',
        options: ['Declare variables as private & provide public getters/setters', 'Make all fields public', 'Delete all methods', 'Use global variables'],
        answerIndex: 0,
        explanation: '🎉 Correct! Private variables + public getters/setters = Encapsulation.',
      },
      challenge: {
        title: 'Get Balance Output',
        prompt: 'acc.getBalance() அழைத்து அச்சிடுங்கள்.',
        starter: `class Account {\n    private int bal = 100;\n    public int getBal() { return bal; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Account a = new Account();\n        System.out.println(a.getBal());\n    }\n}`,
        hint: 'System.out.println(a.getBal());',
        expected: '100',
      },
    };
  }

  // 25. JAVA ABSTRACT CLASS
  if (topicId === 'java-abstract-class') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Abstract Classes & Abstract Methods',
      tamilTitle: 'அருவ வகுப்பு (Abstract Class)',
      duration: 10,
      xp: isAdv ? 50 : isInter ? 35 : 20,
      concept: 'An Abstract Class cannot be instantiated. It can contain abstract methods (methods without a body) that must be implemented by subclasses.',
      tamilExplanation: 'அருவ வகுப்பு (Abstract Class) என்பது நேரடியாக பொருள் உருவாக்க முடியாத வகுப்பு. இதில் உடல் இல்லாத `abstract` முறைமைகள் இருக்கும், சேய் வகுப்புகள் அவற்றை கட்டாயம் செயல்படுத்த வேண்டும்.',
      englishTerms: [
        { term: 'abstract', meaning: 'உடல் இல்லாத / அருவமான முறைமை' },
      ],
      realLife: {
        title: 'TV Remote Power Button Standard',
        body: 'பவர் பொத்தான் இருக்க வேண்டும் என்ற விதிமுறை (Abstract Class) ஒன்றுதான், ஆனால் சோனி, சாம்சங் டிவிகள் (Subclasses) அதைத் தங்கள் வழியில் செயல்படுத்தும்!',
      },
      visualExplanation: {
        title: 'Abstract Shape Class to Concrete Circle Class',
        description: 'Shape (abstract draw()) -> Circle implements draw().',
        diagramType: 'class-object',
      },
      code: {
        snippet: `abstract class Shape {\n    abstract void draw();\n}\n\nclass Circle extends Shape {\n    void draw() {\n        System.out.println("Drawing a Circle");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        s.draw();\n    }\n}`,
        parts: [
          { text: 'abstract class Shape', tone: 'keyword' },
          { text: '\nabstract void draw();', tone: 'keyword' },
        ],
        explanation: [
          { token: 'abstract void draw()', meaning: 'உடல் இல்லாத முறைமை, Circle வகுப்பு இதை நிரப்பும்' },
        ],
      },
      outputExplanation: 'Drawing a Circle',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'curious',
          visual: 'code',
          dialogue: 'new Shape() என நேரடியாக பொருள் உருவாக்கலாமா?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'கூடாது! Abstract Class அரைகுறையானது என்பதால் அதற்கு நேரடியாக பொருள் உருவாக்க முடியாது!',
        },
      ],
      practice: {
        question: 'Can you instantiate an abstract class directly with `new`?',
        options: ['No', 'Yes', 'Only inside main()', 'Only if it has no variables'],
        answerIndex: 0,
        explanation: '🎉 Correct! Abstract classes cannot be instantiated directly.',
      },
      challenge: {
        title: 'Abstract Method Output',
        prompt: 's.draw(); அழைத்து "Drawing a Circle" அச்சிடுங்கள்.',
        starter: `abstract class Shape { abstract void draw(); }\nclass Circle extends Shape { void draw() { System.out.println("Drawing a Circle"); } }\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        s.draw();\n    }\n}`,
        hint: 's.draw();',
        expected: 'Drawing a Circle',
      },
    };
  }

  // 26. JAVA INTERFACE
  if (topicId === 'java-interface') {
    return {
      id: topicId,
      moduleId: modId,
      level,
      title: 'Interfaces & Multiple Inheritance',
      tamilTitle: 'இடைமுகம் (Interface)',
      duration: 10,
      xp: isAdv ? 50 : isInter ? 35 : 20,
      concept: 'An Interface is a 100% abstract contract. In Java, a class can implement multiple interfaces, allowing Multiple Inheritance simulation.',
      tamilExplanation: 'இடைமுகம் (Interface) என்பது முழுமையான 100% அருவக் ஒப்பந்தமாகும். Java-வில் ஒரு வகுப்பு பல இடைமுகங்களை `implements` செய்து பன்முக மரபுரிமையை (Multiple Inheritance) சாத்தியமாக்கும்.',
      englishTerms: [
        { term: 'Interface', meaning: 'இடைமுகம் / 100% ஒப்பந்தம்' },
        { term: 'implements', meaning: 'இடைமுகத்தை செயல்படுத்தும் முக்கியச்சொல்' },
        { term: 'Multiple Inheritance', meaning: 'பன்முக மரபுரிமை' },
      ],
      realLife: {
        title: 'SmartPhone = Camera + Phone Interfaces',
        body: 'ஸ்மார்ட்போன் என்பது கேமரா (Camera) மற்றும் போன் (Phone) ஆகிய இரு வெவ்வேறு கருவிகளின் திறன்களையும் ஒன்றாக இணைத்துச் செயல்படுவது!',
      },
      visualExplanation: {
        title: 'SmartPhone implements Camera & Phone Interfaces',
        description: 'Camera interface + Phone interface -> SmartPhone class implements both.',
        diagramType: 'interface-inheritance',
      },
      code: {
        snippet: `interface Camera {\n    void takePhoto();\n}\ninterface Phone {\n    void makeCall();\n}\n\nclass SmartPhone implements Camera, Phone {\n    public void takePhoto() { System.out.println("Photo taken!"); }\n    public void makeCall() { System.out.println("Calling..."); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SmartPhone sp = new SmartPhone();\n        sp.makeCall();\n        sp.takePhoto();\n    }\n}`,
        parts: [
          { text: 'interface Camera', tone: 'keyword' },
          { text: '\nimplements Camera, Phone', tone: 'keyword' },
        ],
        explanation: [
          { token: 'implements Camera, Phone', meaning: 'இரு இடைமுகங்களையும் ஒரே நேரத்தில் செயல்படுத்துகிறது' },
        ],
      },
      outputExplanation: 'Calling...\nPhoto taken!',
      story: [
        {
          id: 1,
          speaker: 'kavi',
          emotion: 'happy',
          visual: 'code',
          dialogue: 'Java-வில் `class A extends B, C` என ஏன் எழுத முடியாது?',
        },
        {
          id: 2,
          speaker: 'buddy',
          emotion: 'explain',
          visual: 'code',
          dialogue: 'Class மூலம் பன்முக மரபுரிமை செய்தால் Diamond Problem பிழை வரும்! அதனால் தான் Interface பயன்படுத்தி `implements Camera, Phone` என எழுதுகிறோம்!',
        },
      ],
      practice: {
        question: 'Which keyword is used by a class to implement an interface in Java?',
        options: ['implements', 'extends', 'interface', 'uses'],
        answerIndex: 0,
        explanation: '🎉 Correct! `implements` keyword is used to implement an interface.',
      },
      challenge: {
        title: 'Interface Call Output',
        prompt: 'sp.takePhoto(); அச்சிடுங்கள்.',
        starter: `interface Camera { void takePhoto(); }\nclass SmartPhone implements Camera {\n    public void takePhoto() { System.out.println("Photo taken!"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SmartPhone sp = new SmartPhone();\n        sp.takePhoto();\n    }\n}`,
        hint: 'sp.takePhoto();',
        expected: 'Photo taken!',
      },
    };
  }

  // DEFAULT FALLBACK FOR ANY OTHER TOPIC ID
  return {
    id: topicId,
    moduleId: modId,
    level,
    title: 'Java Programming Concepts',
    tamilTitle: 'Java பாடங்கள்',
    duration: 10,
    xp: isAdv ? 30 : isInter ? 20 : 10,
    concept: 'Java is an object-oriented, write-once-run-anywhere language powered by the JVM.',
    tamilExplanation: 'Java என்பது JVM மூலம் எந்த கணினியிலும் இயங்கும் சக்திவாய்ந்த பொருள்-சார்ந்த நிரலாக்க மொழியாகும்.',
    englishTerms: [
      { term: 'JVM', meaning: 'Java Virtual Machine' },
      { term: 'JDK', meaning: 'Java Development Kit' },
    ],
    realLife: {
      title: 'Real-Life Analogy',
      body: 'Think of Java as a universal recipe that can be cooked in any kitchen equipped with JVM!',
    },
    visualExplanation: {
      title: 'JVM Memory Visualizer',
      description: 'Objects are stored in Heap memory while local variables sit in Stack frames.',
      diagramType: 'lockers',
    },
    code: {
      snippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}`,
      parts: [
        { text: 'public class ', tone: 'keyword' },
        { text: 'Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}', tone: 'plain' },
      ],
      explanation: [],
    },
    outputExplanation: 'Prints Hello Java! to console.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'code',
        dialogue: 'வணக்கம்! Java கற்றுக்கொள்ள நீங்கள் தயாரா?',
      },
      {
        id: 2,
        speaker: 'buddy',
        emotion: 'explain',
        visual: 'code',
        dialogue: 'System.out.println() மூலம் நாம் எளிதாக வெளியீட்டை அச்சிடலாம்!',
      },
    ],
    practice: {
      question: 'What is the correct way to print a line in Java?',
      options: ['printf()', 'System.out.println()', 'console.log()', 'cout <<'],
      answerIndex: 1,
      explanation: 'System.out.println() is standard Java method to print text.',
    },
    challenge: {
      title: 'Easy Java Challenge',
      prompt: 'System.out.println("Hello World"); என அச்சிடுங்கள்.',
      starter: `public class Main {\n    public static void main(String[] args) {\n        \n    }\n}`,
      hint: 'System.out.println("Hello World");',
      expected: 'Hello World',
    },
  };
}
