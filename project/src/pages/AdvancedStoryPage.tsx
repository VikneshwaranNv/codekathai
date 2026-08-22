import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Server,
  Database,
  Cpu,
  Zap,
  CheckCircle2,
  XCircle,
  Trophy,
  ShieldCheck,
  Activity,
  HardDrive,
  GitPullRequest,
  Sparkles,
  HelpCircle,
  Lightbulb,
  RefreshCw,
  Terminal,
  MessageSquare,
  Languages,
  Code2,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import ProgressBar from '@/components/ProgressBar';

interface AdvancedStoryPageProps {
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
  visualType: 'failure' | 'dataflood' | 'memoryleak' | 'race' | 'optimization';
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
    title: 'Chapter 1 — System Failure',
    subtitle: 'Core Infrastructure Outage',
    badge: 'Architecture Analysis',
    visualType: 'failure',
    storyText:
      'An enterprise AI processing node is experiencing sudden CPU spikes and thread starvation under peak workload. As the Lead Systems Engineer, your mission is to diagnose the root architectural bottleneck.',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'thinking',
        tamilDialogue: 'Code Buddy! AI Server CPU திடீர்னு 100% ஆச்சு, request வரலை. Code-ஐ உடனே மாற்றி எழுதவா?',
        englishCaption: 'Code Buddy! AI Server CPU spiked to 100%, requests hanging. Should I rewrite code immediately?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'அவசரப்பட்டு Code-ஐ மாற்றக்கூடாது Kavi! முதல்ல Telemetry / Profiling கருவிகள் மூலம் எந்த Function அதிக CPU / Memory எடுக்குதுன்னு கணக்கிடணும்!',
        englishCaption: 'Don’t panic rewrite code Kavi! First use Telemetry / Profiling tools to measure CPU/Memory execution hotspots!',
      },
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: 'அப்போ நேரடி தரவுகள் (Empirical Data) இல்லாமல் யூகம் பண்ணி செய்யக்கூடாது!',
        englishCaption: 'So we should never guess without empirical profiling data!',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'சரியான அணுகுமுறை Kavi! Profiling செய்து Bottleneck-ஐ கண்டுபிடிப்பதே முதன்மை படி!',
        englishCaption: 'Right approach Kavi! Identifying the bottleneck via telemetry is always step 1!',
      },
    ],
    tamilExplanation:
      'ஒரு பெரிய மென்பொருள் அமைப்பு மந்தமாக இயங்கும்போது யூகத்தின் அடிப்படையில் குறியீட்டை மாற்றுவது ஆபத்தானது. Telemetry / Profiling கருவிகள் மூலம் எந்த சார்பு (Function) அதிக நேரம் எடுக்கிறது, எங்கு நினைவகம் வீணாகிறது என்று கண்டறிய வேண்டும்.',
    realLifeAnalogy: {
      title: 'Doctor Medical Test · மருத்துவ பரிசோதனை ஒப்பீடு',
      tamilBody:
        'நோயாளிக்கு காய்ச்சல் அடித்தால் மருத்துவர் உடனே அறுவை சிகிச்சை செய்ய மாட்டார். இரத்த பரிசோதனை (Profiling) செய்து உண்மையான காரணத்தை கண்டறிந்து சிகிச்சை அளிப்பார்.',
      englishBody:
        'A doctor runs lab tests (profiling) to find root causes before performing surgery.',
    },
    learningPoints: [
      'System Telemetry & Performance Profiling',
      'Identifying CPU vs Memory Bottlenecks',
      'Algorithmic Complexity Impact on Scale',
      'System Architecture Diagnostics',
    ],
    codeSnippet: {
      filename: 'telemetry_probe.c',
      code: `// System Telemetry Diagnostics Probe
void auditSystemHealth() {
    startProfilingClock();
    executeCorePipeline();
    logExecutionMetrics(); // Profile execution time & memory
}`,
      explanation: [
        { token: 'startProfilingClock()', tamilMeaning: 'இயக்க நேரத்தை துல்லியமாக கணக்கிட தொடங்குதல்' },
        { token: 'logExecutionMetrics()', tamilMeaning: 'CPU / நினைவக அளவீடுகளை பதிவு செய்தல்' },
      ],
    },
    challenge: {
      question:
        'Which approach is most effective first when diagnosing a production system experiencing sudden degradation?',
      tamilQuestion: 'உற்பத்தி கணினி மந்தமாக இயங்கும்போது முதலில் எதை செய்ய வேண்டும்?',
      options: [
        'Profile function execution times and memory allocations using telemetry tools',
        'Immediately rewrite the entire codebase in a different language',
        'Double the hardware capacity without investigating the bottleneck',
        'Disable security checks to make code run faster',
      ],
      correctIndex: 0,
      explanation:
        'Correct! Profiling gives empirical data on latency and resource consumption before attempting architectural changes.',
      hint: 'Always gather empirical profiling telemetry before attempting optimization.',
    },
  },
  {
    id: 2,
    title: 'Chapter 2 — The Data Flood',
    subtitle: 'High-Throughput Complexity (O(1) vs O(N))',
    badge: 'Algorithm Efficiency',
    visualType: 'dataflood',
    storyText:
      'A stream of 1,000,000 real-time request keys is clogging worker threads. The existing implementation uses an O(N) array scan for every lookup, creating a severe bottleneck.',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: '10 லட்சம் தரவுகள் வரும்போது Array-ல ஒவ்வொரு முறையும் தேடினா ஏன் ரொம்ப நேரம் ஆகுது?',
        englishCaption: 'When 1,000,000 records arrive, why is searching an Array for each request taking so long?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'Array Linear Search O(N) நேரம் எடுக்கும். 10 லட்சம் தரவை தேட 10 லட்சம் ஒப்பீடுகள் தேவை! ஆனா Hash Map பயன்படுத்தினா O(1) நேரத்தில் உடனே விடை கிடைக்கும்!',
        englishCaption: 'Array Linear Search takes O(N) time (1M operations). Hash Maps compute index directly in O(1) constant time!',
      },
      {
        speaker: 'kavi',
        emotion: 'surprised',
        tamilDialogue: 'O(1) ன்னா எத்தனை தரவுகள் இருந்தாலும் ஒரே ஒரு கணக்கீட்டுல விடை கிடைக்குமா?',
        englishCaption: 'Does O(1) mean even with millions of records, it finds data in a single hash computation?',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'ஆமாம் Kavi! Hash Function விசையை (Key) நேரடியாக நினைவக முகவரியாக மாற்றி O(1) வேகத்தில் தரும்!',
        englishCaption: 'Yes Kavi! The Hash Function transforms keys into direct bucket addresses in O(1) time!',
      },
    ],
    tamilExplanation:
      'Array-ல் தரவுகளை ஒவ்வொன்றாக தேடுவது O(N) நேரமாகும். 1,000,000 உருப்படிகள் இருந்தால் 1,000,000 ஒப்பீடுகள் ஆகும். ஆனால் Hash Map தரவுகளை Hash Function மூலமாக நேரடி முகவரியாக மாற்றி O(1) சராசரி நேரத்தில் தேடி தரும்.',
    realLifeAnalogy: {
      title: 'Dictionary vs Book Scanning · அகராதி தேடல் ஒப்பீடு',
      tamilBody:
        'ஒரு புத்தகத்தில் உள்ள அனைத்து பக்கங்களையும் வரிசையாக படிப்பது Array Search (O(N)). அகராதியில் (Dictionary) முதல் எழுத்தை வைத்து நேரடியாக உரிய பக்கத்தை எடுப்பது Hash Map Search (O(1)).',
      englishBody:
        'Reading every book page sequentially is O(N), whereas jumping directly to an alphabet tab in a dictionary is O(1).',
    },
    learningPoints: [
      'Big-O Time & Space Complexity',
      'O(N) Linear Search vs O(1) Hash Map Lookups',
      'Collision Resolution Strategies',
      'Memory Trade-offs for Execution Speed',
    ],
    codeSnippet: {
      filename: 'hash_index.c',
      code: `typedef struct {
    char key[64];
    void* payload;
} HashEntry;

HashEntry* findKey(HashTable* table, const char* key) {
    unsigned int hash = hashFunction(key) % table->size;
    return table->buckets[hash]; // O(1) Constant Time Lookup
}`,
      explanation: [
        { token: 'hashFunction(key)', tamilMeaning: 'விசையை நேரடி நினைவக குறியீடாக மாற்றுதல்' },
        { token: 'table->buckets[hash]', tamilMeaning: 'O(1) நேரத்தில் தரவை நேரடியாக எடுத்தல்' },
      ],
    },
    challenge: {
      question:
        'Which data structure provides O(1) average-time complexity for key-based lookups during high-frequency data streams?',
      tamilQuestion: 'அதிகளவில் தரவுகள் வரும்போது O(1) வேகத்தில் தேடித்தர எந்த Data Structure ஏற்றது?',
      options: [
        'Unsorted Array',
        'Hash Map / Hash Table',
        'Singly Linked List',
        'Queue',
      ],
      correctIndex: 1,
      explanation:
        'Correct! Hash tables convert keys into array indices using a hash function, achieving O(1) constant-time access on average.',
      hint: 'Consider which data structure uses direct index mapping via a hash function.',
    },
  },
  {
    id: 3,
    title: 'Chapter 3 — The Memory Leak',
    subtitle: 'Dynamic Memory & Pointer Hygiene',
    badge: 'Resource Management',
    visualType: 'memoryleak',
    storyText:
      'Server RAM is ramping up continuously towards 100% until the kernel OOM killer terminates the process. Heap allocations made with malloc() are not being freed after execution.',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'thinking',
        tamilDialogue: 'malloc() மூலம் நினைவகம் ஒதுக்கிவிட்டு வேலை முடிந்ததும் free() செய்யாவிட்டால் என்ன ஆகும்?',
        englishCaption: 'What happens if we allocate memory with malloc() but forget to free() it after work?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'Heap Memory காலியாகாது. தொடர்ந்து RAM நிறைந்து Memory Leak ஏற்பட்டு Server Crash ஆகும்!',
        englishCaption: 'Heap Memory stays occupied. RAM fills up continuously causing a Memory Leak and Server Crash!',
      },
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: 'C மொழியில் Garbage Collector கிடையாதா? நாமே free() செய்ய வேண்டுமா?',
        englishCaption: 'Doesn’t C have an automatic Garbage Collector? Must we call free() manually?',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'ஆம் Kavi! C மொழியில் Manual Memory Management! malloc() செய்தால் கட்டாயம் free() செய்ய வேண்டும்!',
        englishCaption: 'Yes Kavi! C uses manual memory management! Every malloc() MUST have a matching free()!',
      },
    ],
    tamilExplanation:
      'C மொழியில் malloc() மூலம் Dynamic Heap Memory ஒதுக்கப்படுகிறது. தானியங்கி Garbage Collection இதில் இல்லை. வேலை முடிந்த பிறகு free(ptr) என்று கொடுத்து நினைவகத்தை விடுவிக்காவிட்டால் Memory Leak ஏற்பட்டு கணினி முடங்கும்.',
    realLifeAnalogy: {
      title: 'Hotel Room Booking · விடுதி அறை ஒப்பீடு',
      tamilBody:
        'விடுதியில் அறை எடுத்து தங்கிவிட்டு வெளியேறும்போது சாவியை தராவிட்டால் (free செய்யாவிட்டால்) புதிய விருந்தினர்கள் தங்க அறை இருக்காது. விடுதியும் நிரம்பிவிடும்.',
      englishBody:
        'Not checking out of a hotel room (forgetting free) leaves rooms unavailable for new guests.',
    },
    learningPoints: [
      'Stack vs Heap Memory Allocation',
      'Explicit Resource Lifetime Management with free()',
      'Dangling Pointers & Double Free Vulnerabilities',
      'Valgrind & Heap Profiling Techniques',
    ],
    codeSnippet: {
      filename: 'memory_manager.c',
      code: `void processRequest(int size) {
    int* buffer = (int*)malloc(size * sizeof(int));
    // Data processing...
    
    // Explicit Memory Cleanup
    free(buffer);
    buffer = NULL;
}`,
      explanation: [
        { token: 'malloc(...)', tamilMeaning: 'Dynamic Heap Memory ஒதுக்குதல்' },
        { token: 'free(buffer)', tamilMeaning: 'நினைவகத்தை விடுவித்து Heap-க்கு திருப்புதல்' },
        { token: 'buffer = NULL', tamilMeaning: 'தவறான சுட்டியை (Dangling Pointer) தடுத்தல்' },
      ],
    },
    challenge: {
      question:
        'What must be called after dynamically allocating memory with malloc() in C once the buffer is no longer needed?',
      tamilQuestion: 'C மொழியில் malloc() மூலம் ஒதுக்கிய நினைவகம் தேவைப்படாதபோது எதை அழைக்க வேண்டும்?',
      options: [
        'Nothing, C handles heap garbage collection automatically',
        'free(buffer) to release the heap allocation back to the OS',
        'delete_all()',
        'Re-assign buffer = NULL without releasing memory',
      ],
      correctIndex: 1,
      explanation:
        'Correct! In C, dynamically allocated heap memory must be explicitly freed using free() to prevent memory leaks.',
      hint: 'Manual memory management in C requires releasing heap blocks using free().',
    },
  },
  {
    id: 4,
    title: 'Chapter 4 — The Race',
    subtitle: 'Concurrency & Race Conditions',
    badge: 'Thread Safety',
    visualType: 'race',
    storyText:
      'Multi-core worker threads are incrementing global metrics simultaneously. Without atomic updates or locks, thread context switches cause data corruption and lost updates.',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'curious',
        tamilDialogue: 'இரண்டு Worker Threads ஒரே நேரத்தில் ஒரே மாறியை (Variable) மாற்ற முயன்றால் என்ன ஆகும்?',
        englishCaption: 'What happens when two Worker Threads try to modify the same variable simultaneously?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'Race Condition ஏற்படும்! தரவுகள் சிதைந்துபோகும் (Data Corruption). இதை தடுக்க Mutex Lock பூட்டு பயன்படுத்த வேண்டும்!',
        englishCaption: 'Race Condition occurs! Data becomes corrupted. We must use Mutex Locks to synchronize access!',
      },
      {
        speaker: 'kavi',
        emotion: 'thinking',
        tamilDialogue: 'Mutex Lock போட்டா ஒரு நேரத்தில் ஒரு Thread மட்டும் தான் அந்த Variable-ஐ மாற்ற முடியுமா?',
        englishCaption: 'With a Mutex Lock, only one thread can modify the variable at a time?',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'ஆம் Kavi! Mutex Lock என்பது கதவை பூட்டுவது மாதிரி. ஒரு Thread உள்ளே இருக்கும்போது மற்றவை காத்திருக்கும் (Thread Safety)!',
        englishCaption: 'Yes Kavi! Mutex Lock is like locking the door. While one thread is inside, others wait safely!',
      },
    ],
    tamilExplanation:
      'பல Threads ஒரே நேரத்தில் ஒரு மாறியை மாற்ற முயலும்போது Race Condition ஏற்படுகிறது. Mutex (Mutual Exclusion) பூட்டை பயன்படுத்துவதன் மூலம் Critical Section-க்குள் ஒரு நேரத்தில் ஒரு Thread மட்டுமே இயங்க அனுமதிக்கப்படும்.',
    realLifeAnalogy: {
      title: 'Single Trial Room · ஆடை சோதனை அறை ஒப்பீடு',
      tamilBody:
        'துணிக்கடையில் ஒரு சோதனை அறை (Trial Room) இருந்தால் ஒருவர் உள்ளே செல்லும்போது கதவை பூட்டிக்கொள்வார் (Lock). அவர் வரும்வரை மற்றவர் காத்திருப்பார். இதுதான் Mutex Lock!',
      englishBody:
        'Locking the door of a single trial room ensures only one person uses it at a time (Mutex Lock).',
    },
    learningPoints: [
      'Concurrent Multithreading & Critical Sections',
      'Race Conditions & Non-deterministic Behavior',
      'Mutexes, Semaphores, and Atomic Operations',
      'Deadlock Prevention Strategies',
    ],
    codeSnippet: {
      filename: 'concurrency_core.c',
      code: `pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void incrementCounter() {
    pthread_mutex_lock(&lock);
    globalCounter++; // Thread-safe Critical Section
    pthread_mutex_unlock(&lock);
}`,
      explanation: [
        { token: 'pthread_mutex_lock()', tamilMeaning: 'தொடங்குவதற்கு முன் முடக்க பூட்டு போடுதல்' },
        { token: 'globalCounter++', tamilMeaning: 'பாதுகாப்பான தரவு மாற்றம்' },
        { token: 'pthread_mutex_unlock()', tamilMeaning: 'மற்ற Threads-க்காக பூட்டை திறத்தல்' },
      ],
    },
    challenge: {
      question:
        'How do you prevent race conditions when multiple concurrent threads read and write a shared global resource?',
      tamilQuestion: 'பல Threads ஒரே நேரத்தில் இயங்கும்போது Race Condition-ஐ தவிர்க்க என்ன செய்ய வேண்டும்?',
      options: [
        'Enclose the critical section within a Mutex lock / unlock sequence',
        'Increase CPU clock speed so threads complete faster',
        'Ignore thread safety and let the CPU resolve it',
        'Use local variables only and disable multithreading entirely',
      ],
      correctIndex: 0,
      explanation:
        'Correct! Mutexes ensure mutual exclusion so only one thread can execute inside the critical section at any given time.',
      hint: 'Mutual exclusion (Mutex) guarantees single-thread access to critical state.',
    },
  },
  {
    id: 5,
    title: 'Chapter 5 — Final System Optimization',
    subtitle: 'Zero-Copy Architecture & Pipeline Optimization',
    badge: 'System Mastermind',
    visualType: 'optimization',
    storyText:
      'You are assembling the final high-throughput pipeline. By combining O(1) hash indexing, strict memory hygiene, mutex synchronization, and zero-copy packet buffers, the system achieves 10x throughput!',
    dialogues: [
      {
        speaker: 'kavi',
        emotion: 'happy',
        tamilDialogue: 'Code Buddy! Zero-Copy Memory Architecture என்றால் என்ன?',
        englishCaption: 'Code Buddy! What is Zero-Copy Memory Architecture?',
      },
      {
        speaker: 'buddy',
        emotion: 'explain',
        tamilDialogue: 'நினைவகத்தில் உள்ள தரவை மீண்டும் மீண்டும் நகலெடுக்காமல் (memcpy தவிர்க்கப்பட்டு) நேரடி முகவரியை கடத்துவதுதான் Zero-Copy!',
        englishCaption: 'Zero-Copy passes direct memory references without wasting CPU cycles copying data buffers!',
      },
      {
        speaker: 'kavi',
        emotion: 'surprised',
        tamilDialogue: 'அப்போ CPU சுமை குறைந்து 10 மடங்கு வேகம் அதிகரிக்கும்!',
        englishCaption: 'So CPU overhead drops dramatically and throughput increases 10x!',
      },
      {
        speaker: 'buddy',
        emotion: 'happy',
        tamilDialogue: 'அற்புதமான சாதனை Kavi! Advanced Infrastructure பிரச்சனை வெற்றிகரமாக தீர்க்கப்பட்டது! இனி Advanced Playground-க்கு செல்லலாம்!',
        englishCaption: 'Awesome achievement Kavi! Advanced Infrastructure mission complete! Off to the Advanced Playground!',
      },
    ],
    tamilExplanation:
      'Zero-Copy நுட்பம் என்பது தரவுகளை ஒரு நினைவக அமைப்பிலிருந்து இன்னொன்றுக்கு நகலெடுப்பதை (Data Buffer Copying) தவிர்க்கும் முறையாகும். நேரடி Pointer References மூலமாக CPU சுமை குறைக்கப்பட்டு வேகம் 10 மடங்கு அதிகரிக்கும்.',
    realLifeAnalogy: {
      title: 'Direct Hand-off vs Copying · நேரடி கைமாற்றல் ஒப்பீடு',
      tamilBody:
        'ஒரு கடிதத்தை மீண்டும் மீண்டும் நகல் (Photocopy) எடுத்து அனுப்பாமல், அசல் கடிதத்தை அப்படியே அடுத்தவரிடம் நேரடி கைமாற்றம் செய்வது போன்றதுதான் Zero-Copy Architecture!',
      englishBody:
        'Directly handing over an original document instead of making multiple photocopies avoids unnecessary overhead.',
    },
    learningPoints: [
      'Zero-Copy Buffer Passing between I/O and Heap',
      'Cache Locality & Memory Alignment Optimization',
      'Micro-benchmarking High-Scale Architectures',
      'End-to-End System Reliability',
    ],
    codeSnippet: {
      filename: 'pipeline_optimized.c',
      code: `// Zero-Copy Pipeline Reference Passing
void processPacketBuffer(const uint8_t* ringBuffer, size_t length) {
    // Direct pointer reference dispatch without memcpy
    dispatchToEngine(ringBuffer, length);
}`,
      explanation: [
        { token: 'const uint8_t* ringBuffer', tamilMeaning: 'நேரடி நினைவக முகவரி கடத்தல் (Zero-Copy)' },
        { token: 'dispatchToEngine()', tamilMeaning: 'நகலெடுக்காமல் நேரடியாக எஞ்சினுக்கு அனுப்புதல்' },
      ],
    },
    challenge: {
      question:
        'What is the primary benefit of Zero-Copy memory architecture in high-performance networking pipelines?',
      tamilQuestion: 'Zero-Copy Memory Architecture-ன் முதன்மை நன்மை என்ன?',
      options: [
        'It eliminates CPU cycles wasted on copying data between redundant memory buffers',
        'It encrypts all network packets automatically',
        'It reduces source code line length',
        'It disables pointer validation',
      ],
      correctIndex: 0,
      explanation:
        'Correct! Zero-copy passes direct memory references, avoiding costly CPU buffer copying overhead.',
      hint: 'Focus on eliminating unnecessary memory buffer duplications.',
    },
  },
];

export default function AdvancedStoryPage({ onNavigate }: AdvancedStoryPageProps) {
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
      setScore((s) => s + 120);
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
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-pop mx-auto mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-golden-400 via-rose-500 to-bamboo-600 text-white shadow-glow">
            <Trophy className="h-12 w-12" />
          </div>

          <span className="eyebrow">Advanced Engineering Cleared</span>
          <h1 className="font-display mt-2 text-3xl font-bold text-bamboo-950 dark:text-bamboo-50 sm:text-5xl">
            Mission Complete · பணி நிறைவடைந்தது!
          </h1>
          <p className="mt-3 text-lg text-ink-600 dark:text-ink-300 font-tamil">
            நீங்கள் Advanced Systems Engineering கொள்கைகளை தமிழ் விளக்கங்களுடன் வெற்றிகரமாக கற்று தேர்ந்துவிட்டீர்கள்! இனி Advanced Playground-ல் C Code எழுதி பயிற்சி பெறலாம்!
          </p>

          {/* Mission Statistics Dashboard */}
          <div className="my-8 grid gap-4 sm:grid-cols-4">
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">Chapters Cleared</span>
              <p className="font-display mt-1 text-2xl font-bold text-bamboo-700">5 / 5</p>
            </div>
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">Total XP Earned</span>
              <p className="font-display mt-1 text-2xl font-bold text-golden-600">+{score} XP</p>
            </div>
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">System Health</span>
              <p className="font-display mt-1 text-2xl font-bold text-green-600">100% Optimal</p>
            </div>
            <div className="card p-5 text-center">
              <span className="text-xs font-semibold uppercase text-ink-400">Throughput</span>
              <p className="font-display mt-1 text-2xl font-bold text-bamboo-600">10x Scale</p>
            </div>
          </div>

          {/* Mastered Engineering Skills */}
          <div className="card mb-8 p-6 text-left">
            <h3 className="font-display mb-4 text-lg font-semibold text-bamboo-950 dark:text-bamboo-50">
              கற்றுக் கொண்ட உயர்மட்ட பொறியியல் கொள்கைகள்
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Telemetry & Profiling (செயல்திறன் சோதனை)',
                'O(1) Hash Map Architecture (வேகமான தேடல்)',
                'Explicit free() Hygiene (நினைவக பாதுகாப்பு)',
                'Mutex Thread Safety (பூட்டு பாதுகாப்பு)',
                'Zero-Copy Buffers (நேரடி கடத்தல்)',
                'High-Scale Optimization (உயர் செயல்திறன்)',
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2 rounded-xl bg-bamboo-50 p-3 dark:bg-bamboo-950/50">
                  <ShieldCheck className="h-4 w-4 text-bamboo-600 shrink-0" />
                  <span className="text-xs font-bold text-bamboo-900 dark:text-bamboo-100 font-tamil">{skill}</span>
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
              Enter Advanced Playground <ArrowRight className="h-5 w-5" />
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
          <span className="chip bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            <Zap className="h-3.5 w-3.5 text-rose-600" /> Advanced Mission (தமிழ்)
          </span>
          <span className="chip bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-900/60 dark:text-bamboo-300">
            Stage {currentStage + 1} of {chapters.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-500">
          <span>Code Kathai: The AI Infrastructure Mission</span>
          <span>{Math.round(((currentStage + 1) / chapters.length) * 100)}% Completed</span>
        </div>
        <ProgressBar value={((currentStage + 1) / chapters.length) * 100} size="md" />
      </div>

      {/* Main Visual Story Header */}
      <div className="card mb-6 overflow-hidden">
        <div className="bg-gradient-to-br from-ink-950 via-bamboo-950 to-ink-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="chip bg-golden-500/20 text-golden-300 border border-golden-400/30">
                  {chapter.badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
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
              {chapter.visualType === 'failure' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-rose-500/20 text-rose-400 animate-pulse">
                    <Server className="h-8 w-8" />
                  </div>
                  <span className="font-mono text-[11px] text-rose-300">SYSTEM: OUTAGE</span>
                </div>
              )}
              {chapter.visualType === 'dataflood' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-golden-500/20 text-golden-400">
                    <Database className="h-8 w-8 animate-bounce-soft" />
                  </div>
                  <span className="font-mono text-[11px] text-golden-300">DATA STREAM: 1M REQ/S</span>
                </div>
              )}
              {chapter.visualType === 'memoryleak' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-amber-500/20 text-amber-400 animate-pulse">
                    <HardDrive className="h-8 w-8" />
                  </div>
                  <span className="font-mono text-[11px] text-amber-300">HEAP: 99% RAM USED</span>
                </div>
              )}
              {chapter.visualType === 'race' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-purple-500/20 text-purple-400">
                    <GitPullRequest className="h-8 w-8 animate-spin-slow" />
                  </div>
                  <span className="font-mono text-[11px] text-purple-300">THREADS: CONFLICT</span>
                </div>
              )}
              {chapter.visualType === 'optimization' && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-green-500/20 text-green-400 animate-bounce-soft">
                    <Cpu className="h-8 w-8" />
                  </div>
                  <span className="font-mono text-[11px] text-green-300">PIPELINE: 10X SPEED</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation bar for Lesson Content */}
        <div className="flex gap-1 overflow-x-auto border-t border-bamboo-100 px-3 py-2 bg-bamboo-50/50 dark:bg-ink-950/50 no-scrollbar">
          {[
            { id: 'dialogue', label: 'Tamil Story Dialogue · தமிழ் உரையாடல்', icon: MessageSquare },
            { id: 'tamil', label: 'Tamil Technical Concept · தமிழ் விளக்கம்', icon: Languages },
            { id: 'visual', label: 'System Diagram & Analogy', icon: Sparkles },
            { id: 'code', label: 'Code Breakdown', icon: Code2 },
            { id: 'challenge', label: 'Engineering Challenge', icon: HelpCircle },
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
                <p className="eyebrow">Tamil Technical Story Scene</p>
                <h3 className="font-display text-lg font-semibold text-bamboo-950 dark:text-bamboo-50">
                  கவி மற்றும் கோட் படியின் உயர்மட்ட உரையாடல் (Advanced Systems Dialogue)
                </h3>
              </div>
              <span className="chip bg-rose-100 text-rose-700">Conversational Tamil</span>
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
                Next: Tamil Technical Explanation <ArrowRight className="h-3.5 w-3.5" />
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
                <p className="eyebrow">Tamil Technical Concept</p>
                <h3 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  தமிழ் தொழில்நுட்ப விளக்கம் (Spoken Tamil Technical Explanation)
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
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-rose-700">
                Advanced Systems Principles
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {chapter.learningPoints.map((pt) => (
                  <div key={pt} className="flex items-center gap-2 rounded-xl bg-bamboo-50 p-3 dark:bg-bamboo-950/40">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
                    <span className="text-xs font-semibold text-bamboo-900 dark:text-bamboo-100">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setActiveTab('visual')} className="btn-primary text-xs">
                Next: System Diagram & Analogy <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Visual Diagram & Real-life Analogy */}
        {activeTab === 'visual' && (
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-100 text-rose-700">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">Systems Analogy</p>
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
              <p className="text-xs font-mono text-rose-300 uppercase tracking-widest mb-4">
                Advanced Architecture Diagram
              </p>
              {chapter.id === 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-red-900/80 border border-red-500">
                    High CPU Latency
                  </div>
                  <ArrowRight className="h-5 w-5 text-rose-400" />
                  <div className="p-3 rounded-xl bg-golden-900/80 border border-golden-500 font-bold">
                    Telemetry Profiler
                  </div>
                  <ArrowRight className="h-5 w-5 text-rose-400" />
                  <div className="p-3 rounded-xl bg-green-900/80 border border-green-500">
                    Hotspot Function Isolated
                  </div>
                </div>
              )}
              {chapter.id === 2 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-red-900/60 border border-red-500">
                    O(N) Array Scan (1M Ops)
                  </div>
                  <span className="text-golden-400 font-bold">VS</span>
                  <div className="p-3 rounded-xl bg-green-900/80 border border-green-500 font-bold">
                    O(1) Hash Map Bucket (1 Op)
                  </div>
                </div>
              )}
              {chapter.id === 3 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-amber-900/60 border border-amber-500">
                    malloc() Allocated Heap
                  </div>
                  <ArrowRight className="h-5 w-5 text-golden-400" />
                  <div className="p-3 rounded-xl bg-green-900/80 border border-green-500 font-bold">
                    free(buffer) Released to Heap
                  </div>
                </div>
              )}
              {chapter.id === 4 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-purple-900/60 border border-purple-500">
                    Thread 1 & Thread 2
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-400" />
                  <div className="p-3 rounded-xl bg-golden-900/80 border border-golden-500 font-bold">
                    pthread_mutex_lock()
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-400" />
                  <div className="p-3 rounded-xl bg-green-900/80 border border-green-500">
                    Thread-Safe Update
                  </div>
                </div>
              )}
              {chapter.id === 5 && (
                <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-bamboo-900/60 border border-bamboo-500">
                    O(1) Hash Table Indexing
                  </div>
                  <div className="p-3 rounded-xl bg-bamboo-900/60 border border-bamboo-500">
                    Mutex Lock Concurrency
                  </div>
                  <div className="p-3 rounded-xl bg-green-900/80 border border-green-500 font-bold">
                    Zero-Copy Buffer Pipeline (10x Speed)
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
                <p className="eyebrow">C Infrastructure Code</p>
                <h3 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  C நிரல் விளக்கம் (Code Breakdown)
                </h3>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
              <div className="flex items-center gap-2 border-b border-ink-800 px-4 py-2 text-xs font-mono text-ink-400">
                <Terminal className="h-3.5 w-3.5 text-rose-400" />
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
                Next: Engineering Challenge <HelpCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Engineering Challenge */}
        {activeTab === 'challenge' && (
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                <HelpCircle className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">Advanced Engineering Challenge {chapter.id}</p>
                <h2 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                  Infrastructure Decision Problem
                </h2>
              </div>
            </div>

            <div>
              <p className="text-base font-medium leading-relaxed text-ink-800 dark:text-ink-100">
                {chapter.challenge.question}
              </p>
              <p className="font-tamil mt-2 text-sm font-semibold text-rose-700 dark:text-rose-300">
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
                  Verify Infrastructure Decision
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
                        <p className="font-semibold">Sub-optimal decision.</p>
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
                          Complete Infrastructure Mission <Trophy className="h-4 w-4" />
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
