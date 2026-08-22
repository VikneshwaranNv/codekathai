import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  Cpu,
  Code2,
  Trophy,
  RefreshCw,
  Zap,
  Terminal,
  Activity,
  Layers,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  BookOpen,
  Languages,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import ProgressBar from '@/components/ProgressBar';

interface IntermediateStoryPageProps {
  onNavigate: (page: Page) => void;
}

type Tab = 'dialogue' | 'tamil' | 'visual' | 'code' | 'challenge';

interface DialogueLine {
  speaker: 'kavi' | 'buddy';
  emotion: 'curious' | 'explain' | 'thinking' | 'happy' | 'surprised';
  tamilDialogue: string;
  englishCaption: string;
}

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  visualType: 'bug' | 'data' | 'scope' | 'fix';
  storyText: string;
  dialogues: DialogueLine[];
  tamilExplanation: string;
  realLifeAnalogy: {
    title: string;
    tamilBody: string;
    englishBody: string;
  };
  learningPoints: string[];
  codeSnippet: {
    filename: string;
    code: string;
    explanation: { token: string; tamilMeaning: string }[];
  };
  challenge: {
    question: string;
    tamilQuestion: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint: string;
  };
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Chapter 1 — The Bug Appears',
    subtitle: 'Production Crisis at Code Tech',
    badge: 'Bug Investigation',
    visualType: 'bug',
    storyText:
      'A production system at Code Tech has started producing incorrect checkout totals. Your senior dev has assigned you to investigate function inputs and outputs to trace where the math breaks.',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: 'Code Buddy! Checkout system-ல product price 100 ன்னா net price 80 வரணும். ஆனா தப்பா வருதே, ஏன்?',
        englishCaption: 'Code Buddy! For price 100, the net price should be 80 after discount, but it displays wrong totals. Why?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'Function-க்குள்ள input parameters சரியா வருதா, return value சரியா கணக்கிடப்படுதான்னு பார்க்கணும். Function தான் input வாங்கி output தரும் machine!',
        englishCaption: 'We must inspect if function parameters receive correct values and if return calculates net price. A function is like a machine!',
      },
      {
        speaker: 'kavi',
        emotion: 'thinking',
        tamilDialogue: 'அப்போ discount 20% ன்னா return செய்ற இடத்துல price - (price * 0.20) ன்னு எழுதணுமா?',
        englishCaption: 'So for a 20% discount, should we return price - (price * 0.20)?',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'சரியா புரிஞ்சது Kavi! Function எதை return செய்யுதோ, அதுதான் அழைத்த இடத்துக்கு செல்லும். அதுல தப்பு இருந்தா மொத்த system-ம் பாதிக்கும்!',
        englishCaption: 'Exactly Kavi! Whatever a function returns is passed back to caller. If return logic is wrong, the system output breaks!',
      },
    ],
    tamilExplanation:
      'Function என்பது ஒரு தனி இயந்திரம் (machine) போன்றது. அதற்கு Input Parameters கொடுத்து அனுப்பினால், உள்ளே கணக்கீடு செய்து Return Value மூலமாக விடையை வெளியே தரும். Discount கணக்கிடும்போது Original Price-ல் இருந்து Discount தொகையை கழித்து Return செய்ய வேண்டும்.',
    realLifeAnalogy: {
      title: 'Juice Machine Analogy · பழச்சாறு இயந்திரம்',
      tamilBody:
        'ஒரு பழச்சாறு ஜூஸ் மெஷினில் பழங்களை (Parameters) போட்டால், அது ஜூஸை (Return Value) தரும். பழங்களை போட்டுவிட்டு ஜூஸ் தராவிட்டால் அல்லது தவறான பானம் தந்தால் மெஷின் கோளாறு. C Function-லும் இதே கொள்கை தான்!',
      englishBody:
        'Putting fruit (parameters) into a juice machine gives fresh juice (return value). If it returns the wrong item, the function logic is flawed.',
    },
    learningPoints: [
      'Functions encapsulate input-to-output business logic',
      'Parameters pass inputs into the function body',
      'Return values pass calculated results back to the caller',
      'Debugging starts with input-output verification',
    ],
    codeSnippet: {
      filename: 'checkout.c',
      code: `double calculateDiscount(double price, double percentage) {
    // Return discounted price
    return price - (price * (percentage / 100.0));
}`,
      explanation: [
        { token: 'double price', tamilMeaning: 'பொருளின் அசல் விலை (Input)' },
        { token: 'double percentage', tamilMeaning: 'தள்ளுபடி சதவீதம் (%)' },
        { token: 'return price - ...', tamilMeaning: 'கழித்த பின் நிகர விலையை திருப்பியனுப்புதல்' },
      ],
    },
    challenge: {
      question:
        'The calculateDiscount(price, percentage) function receives price = 100.0 and percentage = 20.0. What expression should it return to give the net discounted price (80.0)?',
      tamilQuestion: 'price = 100.0 மற்றும் percentage = 20.0 என்றால், net price (80.0) பெற எந்த return பயன்படுத்த வேண்டும்?',
      options: [
        'price * percentage',
        'price - (price * (percentage / 100.0))',
        'percentage - price',
        'price + percentage',
      ],
      correctIndex: 1,
      explanation:
        'Correct! Subtraction of the calculated percentage value (100 - (100 * 0.20) = 80) yields the net price.',
      hint: 'Calculate the discount amount first (price * percentage / 100), then subtract it from the original price.',
    },
  },
  {
    id: 2,
    title: 'Chapter 2 — Following the Data',
    subtitle: 'Data Flow & Array Boundaries',
    badge: 'Data Processing',
    visualType: 'data',
    storyText:
      'Now that the single calculation works, batch orders are crashing because an iteration loop is reading past the end of the items array!',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: 'Array-ல 5 items இருக்கும்போது loop 5 முறை ஓடணும் தானே? ஏன் crash ஆகுது?',
        englishCaption: 'When an array has 5 items, the loop runs 5 times right? Why is it crashing?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'C-ல Array Index 0-ல ஆரம்பிக்கும்! 5 items ன்னா index 0, 1, 2, 3, 4 தான் செல்லும். i <= 5 ன்னு போட்டா index 5-ஐ பார்க்க முயன்று crash ஆகும்!',
        englishCaption: 'In C, Array indexing starts at 0! For 5 items, valid indices are 0 to 4. Using i <= 5 attempts to read index 5 and causes a crash!',
      },
      {
        speaker: 'kavi',
        emotion: 'thinking',
        tamilDialogue: 'அப்போ loop condition-ல i < 5 ன்னு போட்டா index 4 வரைக்கும் மட்டும் பாதுகாப்பா ஓடுமா?',
        englishCaption: 'So if we write i < 5 in loop condition, it safely stops after index 4?',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'அதேதான் Kavi! i < 5 னா மொத்தம் 5 முறை (0,1,2,3,4) ஓடும், memory overflow ஆகாது!',
        englishCaption: 'Spot on Kavi! i < 5 runs exactly 5 times (0,1,2,3,4) without memory buffer overflow!',
      },
    ],
    tamilExplanation:
      'Array என்பது ஒரே பெயரில் வரிசையாக தரவுகளை சேமிக்கும் இடமாகும். C மொழியில் Array Index எப்போதும் 0-ல் தொடங்கும். 5 உருப்படிகள் கொண்ட Array-ல் கடைசி Index 4 ஆகும். Loop அமைக்கும்போது i < 5 என்று பயன்படுத்துவதே பாதுகாப்பானது.',
    realLifeAnalogy: {
      title: 'Stadium Seating Row · இருக்கை வரிசை ஒப்பீடு',
      tamilBody:
        'ஒரு திரையரங்கில் 0 முதல் 4 வரை 5 இருக்கைகள் உள்ளன. நீங்கள் 5-வது இருக்கைக்கு சென்றால் அங்கு இருக்கையே இருக்காது (Out of Bounds crash). 0 முதல் 4 வரை மட்டும் அமர்வதே சரி.',
      englishBody:
        'In a theater with seats indexed 0 to 4, trying to sit in seat #5 causes an out-of-bounds error.',
    },
    learningPoints: [
      'Arrays are 0-indexed contiguous memory blocks',
      'An N-element array has valid indices from 0 to N-1',
      'Reading past N-1 causes buffer overflows and crashes',
      'Safely terminate loops using strictly-less-than (<) operators',
    ],
    codeSnippet: {
      filename: 'batch_processor.c',
      code: `int prices[5] = {10, 20, 30, 40, 50};
// Loop to process all 5 items safely (indices 0..4)
for (int i = 0; i < 5; i++) {
    processItem(prices[i]);
}`,
      explanation: [
        { token: 'int prices[5]', tamilMeaning: '5 முழு எண்களை சேமிக்கும் வரிசை' },
        { token: 'i = 0; i < 5', tamilMeaning: 'Index 0 முதல் 4 வரை பாதுகாப்பான சுழற்சி' },
        { token: 'prices[i]', tamilMeaning: 'i-வது இடத்தில் உள்ள விலையை படித்தல்' },
      ],
    },
    challenge: {
      question:
        'Which condition ensures that all 5 elements of prices[5] are processed without an out-of-bounds error?',
      tamilQuestion: 'prices[5] Array-ன் அனைத்து 5 எண்களையும் பாதுகாப்பாக படிக்க எந்த loop condition சரி?',
      options: [
        'i <= 5',
        'i < 5',
        'i == 5',
        'i <= 6',
      ],
      correctIndex: 1,
      explanation:
        'Correct! Array indices for size 5 are 0, 1, 2, 3, 4. So i < 5 stops when i reaches 5, preventing an illegal access.',
      hint: 'The array has indices 0 through 4. Using i <= 5 would try to access prices[5] which does not exist!',
    },
  },
  {
    id: 3,
    title: 'Chapter 3 — The Hidden Problem',
    subtitle: 'Variable Scope & Side Effects',
    badge: 'Scope Analysis',
    visualType: 'scope',
    storyText:
      'The data loops are stable, but concurrent user carts are overriding each other. A global variable named "totalTax" is being modified across nested function calls!',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: 'Global Variable பயன்பாட்டினால் என்ன பிரச்சனை வருது Buddy?',
        englishCaption: 'What problem arises from using Global Variables Buddy?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'Global Variable-ஐ எல்லா function-ம் மாற்ற முடியும். இதனால் ஒரு பயனர் கணக்கிடும் வரி தொகை இன்னொரு பயனரின் கணக்கை கெடுத்துவிடும் (Side Effect)!',
        englishCaption: 'Any function can modify Global Variables. This causes side-effects where one user calculation overwrites another!',
      },
      {
        speaker: 'kavi',
        emotion: 'thinking',
        tamilDialogue: 'அப்போ Local Variable பயன்படுத்தி function-க்குள்ளயே கணக்கிட்டு return பண்ணா பாதுகாப்பா இருக்குமா?',
        englishCaption: 'So keeping variables local inside functions and returning results makes it thread-safe?',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'ஆம் Kavi! Local Scope என்பது தனி அறை மாதிரி. உள்ளே நடப்பது வெளியே இருக்கும் மற்ற தரவுகளை பாதிக்காது!',
        englishCaption: 'Yes Kavi! Local Scope is like a private room. What happens inside stays isolated and safe!',
      },
    ],
    tamilExplanation:
      'Global Variable என்பது நிரல் முழுவதற்கும் பொதுவானது. அதை யார் வேண்டுமானாலும் மாற்றலாம் என்பதால் பிழைகள் (Bugs) ஏற்படும். Local Variable என்பது அந்த குறிப்பிட்ட Function-க்குள் மட்டுமே இயங்கும். அதனால் Local Scope பயன்படுத்துவது பாதுகாப்பானது.',
    realLifeAnalogy: {
      title: 'Office Access Card · அலுவலக அட்டை ஒப்பீடு',
      tamilBody:
        'ஒரு அலுவலகத்தில் மேலாளரின் மாஸ்டர் சாவியை பொது மேஜையில் வைத்தால் யார் வேண்டுமானாலும் எடுக்கலாம் (Global). அவரவர் அடையாள அட்டை வைத்திருந்தால் அவரவர் அறைக்கு மட்டும் செல்லலாம் (Local).',
      englishBody:
        'A master key on a public table (global) can be used by anyone, whereas individual access cards (local) maintain safety.',
    },
    learningPoints: [
      'Global variables are accessible and mutable everywhere',
      'Local variables exist only within their function scope',
      'Side effects occur when functions modify external state',
      'Prefer pure local variables and pass state explicitly',
    ],
    codeSnippet: {
      filename: 'tax_calculator.c',
      code: `// Safe Local Function without Global Side Effects
double computeCartTax(double itemPrice) {
    double taxRate = 0.05; // Local scope
    return itemPrice * taxRate; // Pure return value
}`,
      explanation: [
        { token: 'double taxRate', tamilMeaning: 'Function-க்குள் மட்டுமே இயங்கும் உள்ளூர் மாறி (Local)' },
        { token: 'return itemPrice * taxRate', tamilMeaning: 'வெளியே எந்த பாதிப்பும் இல்லாமல் விடையை அனுப்புதல்' },
      ],
    },
    challenge: {
      question:
        'How can you eliminate dangerous side-effects caused by modifying a global variable in computeCartTax?',
      tamilQuestion: 'Global Variable பயன்பாட்டினால் ஏற்படும் பக்கவிளைவை (Side-Effect) எவ்வாறு தவிர்க்கலாம்?',
      options: [
        'Make globalTax a local variable inside the function and return the calculated tax value',
        'Rename globalTax to tempTax and keep it global',
        'Delete the function and write everything in main()',
        'Multiply globalTax by 2',
      ],
      correctIndex: 0,
      explanation:
        'Correct! Using local variables and returning values keeps functions pure, predictable, and thread-safe.',
      hint: 'Avoid global mutable state by keeping variables local to the function and returning results.',
    },
  },
  {
    id: 4,
    title: 'Chapter 4 — Fix the System',
    subtitle: 'Modular Architecture & Refactoring',
    badge: 'System Restoration',
    visualType: 'fix',
    storyText:
      'You are ready to deploy the final patch! Your task is to apply modular design principles so that each function does one thing cleanly.',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'happy',
        tamilDialogue: 'Buddy! பெரிய 200 வரி code-ஐ சின்ன சின்ன function-ஆ பிரிச்சா என்ன நன்மைகள்?',
        englishCaption: 'Buddy! What are the benefits of breaking a large 200-line function into smaller functions?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'ஒவ்வொரு Function-க்கும் ஒரே ஒரு பொறுப்பு (Single Responsibility) இருக்கும். இதனால் code-ஐ படிக்கவும், test செய்யவும், bug-ஐ சரிசெய்யவும் எளிதாகும்!',
        englishCaption: 'Each function gets a single responsibility. This makes code readable, testable, and easy to debug!',
      },
      {
        speaker: 'kavi',
        emotion: 'surprised',
        tamilDialogue: 'அப்போ calculateNetPrice(), calculateTax(), calculateFinalTotal() ன்னு தனித்தனியா பிரிச்சு எழுதலாம்!',
        englishCaption: 'So we can divide logic into calculateNetPrice(), calculateTax(), and calculateFinalTotal()!',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'அற்புதமான முடிவு Kavi! System இப்போது முழுமையாக சீரமைக்கப்பட்டுவிட்டது. இனி Playground-க்கு செல்லலாம்!',
        englishCaption: 'Wonderful decision Kavi! The system is now fully restored and modular. Time for the Playground!',
      },
    ],
    tamilExplanation:
      'Modular Design என்பது பெரிய நிரலை சிறிய சுயாதீனமான பாகங்களாக (Functions) பிரிப்பதாகும். இதனால் ஒரு பாகத்தில் திருத்தம் செய்தால் மற்ற பாகங்கள் பாதிக்கப்படாது. Reusable Functions மூலமாக மீண்டும் மீண்டும் அதே குறியீட்டை எழுத தேவையில்லை.',
    realLifeAnalogy: {
      title: 'Building Blocks (Lego) · லெகோ கட்டைகள் ஒப்பீடு',
      tamilBody:
        'ஒரே பெரிய ஒற்றை கல்லால் கட்டடம் கட்டுவதை விட, தனித்தனி லெகோ கட்டைகளை இணைத்து கட்டுவது எளிது. ஏதேனும் ஒரு கட்டை உடைந்தால் அதை மட்டும் மாற்றலாம். Modular Programming-ம் இதே போன்றது.',
      englishBody:
        'Building with modular Lego blocks allows replacing single damaged pieces without tearing down the entire structure.',
    },
    learningPoints: [
      'Single Responsibility Principle: one function, one job',
      'Modular code is easier to test, debug, and maintain',
      'Clear function signatures improve team collaboration',
      'System stability is achieved through clean design',
    ],
    codeSnippet: {
      filename: 'system_core.c',
      code: `// Modular Architecture
double calculateNetPrice(double price, double discount) {
    return price - discount;
}
double calculateTax(double price, double rate) {
    return price * rate;
}
double calculateFinalTotal(double price, double discount, double taxRate) {
    double net = calculateNetPrice(price, discount);
    return net + calculateTax(net, taxRate);
}`,
      explanation: [
        { token: 'calculateNetPrice()', tamilMeaning: 'நிகர விலை கணக்கிடும் தனி சார்பு' },
        { token: 'calculateTax()', tamilMeaning: 'வரி கணக்கிடும் தனி சார்பு' },
        { token: 'calculateFinalTotal()', tamilMeaning: 'அனைத்தையும் ஒருங்கிணைக்கும் முதன்மை சார்பு' },
      ],
    },
    challenge: {
      question:
        'What is the primary advantage of breaking a monolithic 200-line function into smaller modular functions?',
      tamilQuestion: 'பெரிய 200 வரி சார்பை சிறிய modular சார்புகளாக பிரிப்பதன் முதன்மை நன்மை என்ன?',
      options: [
        'It makes the code run 1000x faster automatically',
        'Each function can be independently tested, reused, and debugged',
        'It allows variables to share the same name everywhere',
        'It removes the need for comments',
      ],
      correctIndex: 1,
      explanation:
        'Correct! Modular functions break complexity into isolated, testable chunks that can be reused across the application.',
      hint: 'Think about maintainability, testability, and code reusability across a large codebase.',
    },
  },
];

export default function IntermediateStoryPage({ onNavigate }: IntermediateStoryPageProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('dialogue');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [isMissionComplete, setIsMissionComplete] = useState(false);

  const chapter = chapters[currentStage];
  const isCorrect = selectedOption === chapter?.challenge.correctIndex;

  const handleOptionSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === chapter.challenge.correctIndex) {
      setScore((s) => s + 100);
      if (!completedChapters.includes(chapter.id)) {
        setCompletedChapters((prev) => [...prev, chapter.id]);
      }
    }
  };

  const handleNextChapter = () => {
    if (currentStage < chapters.length - 1) {
      setCurrentStage((s) => s + 1);
      setActiveTab('dialogue');
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsMissionComplete(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  if (isMissionComplete) {
    return (
      <div className="container-page py-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="animate-pop mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-golden-400 to-bamboo-600 text-white shadow-glow">
            <Trophy className="h-10 w-10" />
          </div>

          <span className="eyebrow">Mission Accomplished</span>
          <h1 className="font-display mt-2 text-3xl font-bold text-bamboo-950 dark:text-bamboo-50 sm:text-4xl">
            System Restored! · கணினி சீரமைக்கப்பட்டது!
          </h1>
          <p className="mt-3 text-lg text-ink-600 dark:text-ink-300 font-tamil">
            நீங்கள் வெற்றியுடன் Intermediate பாடங்களை தமிழ் விளக்கங்களுடன் கற்று தேர்ந்துவிட்டீர்கள்! இனி Playground-ல் C Code எழுதி பயிற்சி பெறலாம்!
          </p>

          {/* Mission Stats */}
          <div className="my-8 grid gap-4 sm:grid-cols-3">
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">Chapters Cleared</span>
              <p className="font-display mt-1 text-2xl font-bold text-bamboo-700">4 / 4</p>
            </div>
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">XP Earned</span>
              <p className="font-display mt-1 text-2xl font-bold text-golden-600">+{score} XP</p>
            </div>
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">Status</span>
              <p className="font-display mt-1 text-2xl font-bold text-green-600">System Stable</p>
            </div>
          </div>

          {/* Mastered Skills */}
          <div className="card mb-8 p-6 text-left">
            <h3 className="font-display mb-3 text-lg font-semibold text-bamboo-950 dark:text-bamboo-50">
              கற்றுக் கொண்ட திறன்கள் (Mastered Skills)
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                'Function Inputs & Return Values (சார்புகள்)',
                'Array Boundaries & Loop Safety (வரிசை எல்லைகள்)',
                'Scope Isolation & Pure Functions (உள்ளூர் மாறிகள்)',
                'Modular Architecture & Refactoring (கூறு நிலைகள்)',
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2 rounded-xl bg-bamboo-50 p-3 dark:bg-bamboo-950/50">
                  <CheckCircle2 className="h-4 w-4 text-bamboo-600 shrink-0" />
                  <span className="text-xs font-semibold text-bamboo-900 dark:text-bamboo-100 font-tamil">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={() => onNavigate('levels')} className="btn-ghost text-sm">
              <ArrowLeft className="h-4 w-4" /> Back to Paths
            </button>
            <button
              onClick={() => onNavigate('playground')}
              className="btn-gold animate-glow-pulse text-base px-8 py-3.5"
            >
              Enter Playground <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Header & Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => onNavigate('levels')} className="btn-ghost text-sm">
          <ArrowLeft className="h-4 w-4" /> Learning Paths
        </button>
        <div className="flex items-center gap-3">
          <span className="chip bg-golden-100 text-golden-700 dark:bg-golden-900/60 dark:text-golden-300">
            <Zap className="h-3.5 w-3.5" /> Intermediate Mission (தமிழ்)
          </span>
          <span className="chip bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-900/60 dark:text-bamboo-300">
            Stage {currentStage + 1} of {chapters.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-500">
          <span>Code Rescue: The Broken System</span>
          <span>{Math.round(((currentStage + 1) / chapters.length) * 100)}% Completed</span>
        </div>
        <ProgressBar value={((currentStage + 1) / chapters.length) * 100} size="md" />
      </div>

      {/* Main Visual Story Header */}
      <div className="card mb-6 overflow-hidden">
        <div className="bg-gradient-to-br from-bamboo-900 via-ink-950 to-ink-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="chip bg-golden-500/20 text-golden-300 border border-golden-400/30">
                  {chapter.badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-bamboo-300">
                  {chapter.subtitle}
                </span>
              </div>
              <h1 className="font-display mt-3 text-2xl font-bold sm:text-3xl text-white">
                {chapter.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-bamboo-100/90 sm:text-base">
                {chapter.storyText}
              </p>
            </div>

            {/* Visual Scene Illustration */}
            <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10">
              {chapter.visualType === 'bug' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-red-500/20 text-red-400 animate-pulse">
                    <ShieldAlert className="h-8 w-8" />
                  </div>
                  <span className="font-mono text-[11px] text-red-300">STATUS: BUG DETECTED</span>
                </div>
              )}
              {chapter.visualType === 'data' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-golden-500/20 text-golden-400">
                    <Activity className="h-8 w-8 animate-spin-slow" />
                  </div>
                  <span className="font-mono text-[11px] text-golden-300">DATA STREAM: ARRAY READ</span>
                </div>
              )}
              {chapter.visualType === 'scope' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-bamboo-500/20 text-bamboo-400">
                    <Layers className="h-8 w-8" />
                  </div>
                  <span className="font-mono text-[11px] text-bamboo-300">SCOPE: LOCAL VS GLOBAL</span>
                </div>
              )}
              {chapter.visualType === 'fix' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-green-500/20 text-green-400 animate-bounce-soft">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <span className="font-mono text-[11px] text-green-300">MODULAR FIX DEPLOYED</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation bar for Lesson Content */}
        <div className="flex gap-1 overflow-x-auto border-t border-bamboo-100 px-3 py-2 bg-bamboo-50/50 dark:bg-ink-950/50 no-scrollbar">
          {[
            { id: 'dialogue', label: 'Tamil Story Dialogue · தமிழ் உரையாடல்', icon: MessageSquare },
            { id: 'tamil', label: 'Tamil Concept · தமிழ் விளக்கம்', icon: Languages },
            { id: 'visual', label: 'Visual Diagram & Analogy', icon: Sparkles },
            { id: 'code', label: 'Code Breakdown', icon: Code2 },
            { id: 'challenge', label: 'Fix-It Challenge', icon: HelpCircle },
          ].map((t) => {
            const TIcon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as Tab)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  active ? 'bg-bamboo-600 text-white shadow-soft' : 'text-ink-700 hover:bg-bamboo-100 dark:text-ink-300'
                }`}
              >
                <TIcon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="animate-fade-in">
        {/* Tab 1: Tamil Story Dialogue */}
        {activeTab === 'dialogue' && (
          <div className="card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-bamboo-100 pb-4">
              <div>
                <p className="eyebrow">Tamil Visual Story Scene</p>
                <h3 className="font-display text-lg font-semibold text-bamboo-950 dark:text-bamboo-50">
                  கவி மற்றும் கோட் படியின் உரையாடல் (Kavi & Code Buddy)
                </h3>
              </div>
              <span className="chip bg-golden-100 text-golden-700">Conversational Tamil</span>
            </div>

            <div className="space-y-4 pt-2">
              {chapter.dialogues.map((d, i) => (
                <div
                  key={i}
                  className={`flex gap-4 p-4 rounded-2xl border transition-all ${
                    d.speaker === 'kavi'
                      ? 'bg-bamboo-50/70 border-bamboo-200 dark:bg-bamboo-950/40 dark:border-bamboo-800'
                      : 'bg-golden-50/70 border-golden-200 dark:bg-golden-950/40 dark:border-golden-800'
                  }`}
                >
                  <div className="shrink-0 text-center">
                    <CharacterAvatar character={d.speaker} emotion={d.emotion} size={64} />
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-ink-500">
                      {d.speaker === 'kavi' ? 'Kavi' : 'Code Buddy'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-tamil text-base font-semibold text-ink-900 dark:text-ink-100 leading-relaxed">
                      "{d.tamilDialogue}"
                    </p>
                    <p className="mt-1 text-xs text-ink-500 dark:text-ink-400 italic">
                      English: {d.englishCaption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button onClick={() => setActiveTab('tamil')} className="btn-primary text-xs">
                Next: Tamil Concept Explanation <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Tamil Explanation */}
        {activeTab === 'tamil' && (
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-golden-100 text-golden-700">
                <Languages className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">Tamil Concept</p>
                <h3 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  தமிழ் விளக்கம் (Spoken Tamil Explanation)
                </h3>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-golden-200 bg-golden-50/80 p-5 dark:bg-golden-950/40 dark:border-golden-900">
              <p className="font-tamil text-lg leading-relaxed font-semibold text-ink-900 dark:text-ink-100">
                {chapter.tamilExplanation}
              </p>
            </div>

            {/* Engineering Principles */}
            <div className="space-y-2">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-bamboo-700">
                Key Engineering Concepts
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {chapter.learningPoints.map((pt) => (
                  <div key={pt} className="flex items-center gap-2 rounded-xl bg-bamboo-50 p-3 dark:bg-bamboo-950/40">
                    <CheckCircle2 className="h-4 w-4 text-bamboo-600 shrink-0" />
                    <span className="text-xs font-semibold text-bamboo-900 dark:text-bamboo-100">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setActiveTab('visual')} className="btn-primary text-xs">
                Next: Visual Diagram & Analogy <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Visual Diagram & Real-life Analogy */}
        {activeTab === 'visual' && (
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">Real-World Analogy</p>
                <h3 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  {chapter.realLifeAnalogy.title}
                </h3>
              </div>
            </div>

            <div className="rounded-2xl bg-bamboo-50/70 p-6 dark:bg-bamboo-950/40 border border-bamboo-100 dark:border-bamboo-900">
              <p className="font-tamil text-base font-semibold leading-relaxed text-bamboo-950 dark:text-bamboo-100">
                {chapter.realLifeAnalogy.tamilBody}
              </p>
              <p className="mt-3 text-xs text-ink-500 dark:text-ink-400">
                English: {chapter.realLifeAnalogy.englishBody}
              </p>
            </div>

            {/* Visual Graphic Representation */}
            <div className="rounded-2xl bg-ink-950 p-6 text-white text-center">
              <p className="text-xs font-mono text-bamboo-300 uppercase tracking-widest mb-4">
                Architecture Diagram
              </p>
              {chapter.id === 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-bamboo-900/80 border border-bamboo-500">
                    Input: price (100.0), discount (20.0)
                  </div>
                  <ArrowRight className="h-5 w-5 text-golden-400" />
                  <div className="p-3 rounded-xl bg-golden-900/80 border border-golden-500 font-bold">
                    calculateDiscount() Logic
                  </div>
                  <ArrowRight className="h-5 w-5 text-golden-400" />
                  <div className="p-3 rounded-xl bg-green-900/80 border border-green-500">
                    Return Output: 80.0
                  </div>
                </div>
              )}
              {chapter.id === 2 && (
                <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-bamboo-900 border border-bamboo-400">
                      Index [{idx}] <br />
                      Valid Data
                    </div>
                  ))}
                  <div className="p-3 rounded-xl bg-red-900/80 border border-red-500 text-red-300 animate-pulse">
                    Index [5] <br />
                    OUT OF BOUNDS!
                  </div>
                </div>
              )}
              {chapter.id === 3 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-red-900/40 border border-red-500 text-left">
                    <p className="text-red-400 font-bold">Global Scope (Risky)</p>
                    <p>globalTax modified by any function</p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-900/40 border border-green-500 text-left">
                    <p className="text-green-400 font-bold">Local Scope (Safe)</p>
                    <p>double taxRate inside function only</p>
                  </div>
                </div>
              )}
              {chapter.id === 4 && (
                <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-bamboo-900/60 border border-bamboo-500">
                    calculateNetPrice()
                  </div>
                  <div className="p-3 rounded-xl bg-bamboo-900/60 border border-bamboo-500">
                    calculateTax()
                  </div>
                  <div className="p-3 rounded-xl bg-golden-900/60 border border-golden-500 font-bold">
                    calculateFinalTotal()
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setActiveTab('code')} className="btn-primary text-xs">
                Next: Code Breakdown <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Code Breakdown */}
        {activeTab === 'code' && (
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200">
                <Code2 className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">C Code Structure</p>
                <h3 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  C நிரல் விளக்கம் (Code Breakdown)
                </h3>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
              <div className="flex items-center gap-2 border-b border-ink-800 px-4 py-2 text-xs font-mono text-ink-400">
                <Terminal className="h-3.5 w-3.5 text-bamboo-400" />
                <span>{chapter.codeSnippet.filename}</span>
              </div>
              <pre className="p-4 font-mono text-sm leading-relaxed text-bamboo-300 overflow-x-auto">
                <code>{chapter.codeSnippet.code}</code>
              </pre>
            </div>

            {/* Token Meanings */}
            <div className="space-y-2">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-ink-500">
                Tokens & Tamil Meanings
              </h4>
              <div className="space-y-2">
                {chapter.codeSnippet.explanation.map((e) => (
                  <div key={e.token} className="flex items-center gap-3 rounded-xl bg-bamboo-50 p-3 dark:bg-bamboo-950/40">
                    <code className="rounded-md bg-ink-950 px-2 py-1 font-mono text-xs font-bold text-bamboo-300">
                      {e.token}
                    </code>
                    <p className="font-tamil text-sm font-semibold text-bamboo-950 dark:text-bamboo-100">
                      {e.tamilMeaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setActiveTab('challenge')} className="btn-gold text-xs">
                Next: Fix-It Challenge <HelpCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Fix-It Challenge */}
        {activeTab === 'challenge' && (
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-golden-100 text-golden-700 dark:bg-golden-900/60 dark:text-golden-300">
                <HelpCircle className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">Stage {chapter.id} Challenge</p>
                <h2 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  Solve the System Bug
                </h2>
              </div>
            </div>

            <div>
              <p className="text-base font-medium leading-relaxed text-ink-800 dark:text-ink-100">
                {chapter.challenge.question}
              </p>
              <p className="font-tamil mt-2 text-sm font-semibold text-golden-700 dark:text-golden-300">
                தமிழ் வினா: {chapter.challenge.tamilQuestion}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid gap-3">
              {chapter.challenge.options.map((optionText, idx) => {
                let style = 'border-bamboo-100 bg-white hover:border-bamboo-400 dark:border-bamboo-800 dark:bg-ink-900 dark:hover:border-bamboo-600';
                if (selectedOption === idx) {
                  style = 'border-bamboo-600 bg-bamboo-50/80 ring-2 ring-bamboo-500 dark:bg-bamboo-950/60 dark:border-bamboo-500';
                }
                if (isAnswerSubmitted) {
                  if (idx === chapter.challenge.correctIndex) {
                    style = 'border-green-600 bg-green-50 dark:bg-green-950/50 dark:border-green-500 ring-2 ring-green-500';
                  } else if (selectedOption === idx) {
                    style = 'border-red-500 bg-red-50 dark:bg-red-950/50 dark:border-red-500';
                  } else {
                    style = 'opacity-50 border-bamboo-100 dark:border-bamboo-900';
                  }
                }

                return (
                  <button
                    key={optionText}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswerSubmitted}
                    className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all ${style}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-bamboo-100 font-mono text-xs font-bold text-bamboo-800 dark:bg-bamboo-900 dark:text-bamboo-200">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-mono text-ink-900 dark:text-ink-100">{optionText}</span>
                    </span>

                    {isAnswerSubmitted && idx === chapter.challenge.correctIndex && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && selectedOption === idx && idx !== chapter.challenge.correctIndex && (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit & Retry Controls */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className={`btn-primary w-full text-sm sm:w-auto ${
                    selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Verify Solution
                </button>
              ) : (
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {isCorrect ? (
                    <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 dark:bg-green-950/60 dark:text-green-300">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>{chapter.challenge.explanation}</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 rounded-xl bg-golden-50 px-4 py-3 text-sm text-golden-800 dark:bg-golden-950/60 dark:text-golden-300">
                      <Lightbulb className="h-5 w-5 shrink-0 text-golden-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">Incorrect approach.</p>
                        <p className="mt-0.5 text-xs opacity-90">{chapter.challenge.hint}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!isCorrect && (
                      <button onClick={handleRetry} className="btn-ghost text-sm">
                        <RefreshCw className="h-4 w-4" /> Retry
                      </button>
                    )}
                    <button onClick={handleNextChapter} className="btn-primary text-sm whitespace-nowrap">
                      {currentStage < chapters.length - 1 ? (
                        <>
                          Next Chapter <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Complete Mission <Trophy className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
