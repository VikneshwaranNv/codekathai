import type { Module, Lesson } from '@/types';

export const javaModules: Module[] = [
  {
    id: 'intro' as any,
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
    id: 'variables' as any,
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
    id: 'structures' as any, // Using existing structures slot or classes
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
    id: 'functions' as any,
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
    id: 'strings' as any,
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
];

/**
 * Dynamic Educational Java Lessons Resolver with Tamil Storytelling
 */
export function getJavaLessonForLevel(topicId: string, level: string = 'beginner'): Lesson {
  const isInter = level === 'intermediate';
  const isAdv = level === 'advanced';

  return {
    id: topicId,
    moduleId: 'intro' as any,
    level: level as any,
    title: topicId.includes('scanner')
      ? 'Scanner User Input in Java'
      : topicId.includes('class')
      ? 'Classes & Objects in Java'
      : topicId.includes('string')
      ? 'Java Strings & Methods'
      : topicId.includes('method')
      ? 'Java Methods & Parameters'
      : 'Java Programming Concepts',
    tamilTitle: topicId.includes('scanner')
      ? 'Scanner பயனர் உள்ளீடு'
      : topicId.includes('class')
      ? 'வகுப்பு & பொருள்'
      : topicId.includes('string')
      ? 'Java சரங்கள்'
      : topicId.includes('method')
      ? 'Java முறைமைகள்'
      : 'Java பாடங்கள்',
    duration: 12,
    xp: isAdv ? 30 : isInter ? 20 : 10,
    concept: 'Java is an object-oriented, write-once-run-anywhere language powered by the JVM.',
    tamilExplanation: 'Java என்பது JVM மூலம் எந்த கணினியிலும் இயங்கும் சக்திவாய்ந்த பொருள்-சார்ந்த நிரலாக்க மொழியாகும்.',
    englishTerms: [
      { term: 'JVM', meaning: 'Java Virtual Machine' },
      { term: 'JDK', meaning: 'Java Development Kit' },
      { term: 'Class', meaning: 'Blueprint for creating objects' },
      { term: 'Object', meaning: 'Instance of a class containing state and behavior' },
    ],
    realLife: {
      title: 'Real-Life Analogy (நிஜ உலக உதாரணம்)',
      body: 'Think of a Class as a Car Design Blueprint, and an Object as the actual physical Car built from that blueprint!',
    },
    visualExplanation: {
      title: 'JVM Memory Heap & Stack Visualizer',
      description: 'Objects are stored in Heap memory while local variables sit in Stack frames.',
      diagramType: 'lockers',
    },
    code: {
      snippet: topicId.includes('scanner')
        ? `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter your age: ");\n        int age = scanner.nextInt();\n        System.out.println("Age is: " + age);\n    }\n}`
        : topicId.includes('class')
        ? `class Student {\n    String name = "Kavi";\n    int mark = 95;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        System.out.println(s.name + " scored " + s.mark);\n    }\n}`
        : `public class Main {\n    public static void main(String[] args) {\n        int age = 20;\n        String name = "Kavi";\n        System.out.println(name + " is " + age + " years old.");\n    }\n}`,
      parts: [],
      explanation: [],
    },
    outputExplanation: 'The main method executes inside the JVM sandbox and prints output to terminal.',
    story: [
      {
        id: 1,
        speaker: 'kavi',
        emotion: 'happy',
        visual: 'containers',
        dialogue: 'வணக்கம்! Java கற்றுக்கொள்ள நீங்கள் தயாரா? JVM பற்றி தெரிந்துகொள்வோம்!',
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
      explanation: 'System.out.println() is standard Java method to print text followed by a new line.',
    },
    challenge: {
      title: isAdv ? '🧠 HARD JAVA CHALLENGE' : isInter ? '🚀 MEDIUM JAVA CHALLENGE' : '🌱 EASY JAVA CHALLENGE',
      prompt: 'Write a Java program to initialize a variable age = 20 and print it using System.out.println().',
      starter: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
      hint: 'Use int age = 20; and System.out.println("Age: " + age);',
      expected: 'System.out.println',
    },
  };
}
