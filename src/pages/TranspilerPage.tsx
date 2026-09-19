import { useState } from 'react';
import { Sparkles, Play, Code2, Coffee, ArrowRightLeft, Layers, Cpu } from 'lucide-react';
import type { Page } from '@/components/Navbar';
import CCodeEditor from '@/components/CCodeEditor';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import { compileAndRunJavaProgram } from '@/lib/javaSimulator';

interface TranspilerPageProps {
  onNavigate: (page: Page) => void;
}

interface MatrixPreset {
  id: string;
  title: string;
  tamilTitle: string;
  cCode: string;
  javaCode: string;
  explanationTa: string;
  explanationEn: string;
  cInput?: string;
  javaInput?: string;
}

const MATRIX_PRESETS: MatrixPreset[] = [
  {
    id: 'struct-class',
    title: '1. C Struct ➔ Java Class & Object',
    tamilTitle: '1. C கட்டமைப்பு ➔ Java வகுப்பு மற்றும் பொருள்',
    cCode: `#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    int mark;\n};\n\nint main() {\n    struct Student s1 = {"Kavi", 95};\n    printf("Student Name: %s\\n", s1.name);\n    printf("Student Mark: %d\\n", s1.mark);\n    return 0;\n}`,
    javaCode: `class Student {\n    String name = "Kavi";\n    int mark = 95;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        System.out.println("Student Name: " + s1.name);\n        System.out.println("Student Mark: " + s1.mark);\n    }\n}`,
    explanationTa: 'C மொழியில் உள்ள `struct Student` என்ற தரவு வடிவம், Java-வில் `class Student` மற்றும் `new Student()` ஆப்ஜெக்ட்டாக உருமாறுகிறது.',
    explanationEn: 'C language `struct` memory blueprint converts into Java `class` definition and dynamic Heap object instantiation.',
  },
  {
    id: 'pointers-references',
    title: '2. C Pointers (*ptr) ➔ Java Heap References',
    tamilTitle: '2. C பாயிண்டர்கள் ➔ Java நினைவக குறிப்புகள்',
    cCode: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    int *ptr = &age;\n\n    printf("Original Value: %d\\n", age);\n    printf("Memory Address: %p\\n", (void*)ptr);\n    printf("Value via Pointer: %d\\n", *ptr);\n    return 0;\n}`,
    javaCode: `public class Main {\n    public static void main(String[] args) {\n        int age = 20;\n        // Java automatically handles reference pointers in Heap RAM!\n        System.out.println("Original Value: " + age);\n        System.out.println("Java Automatic Memory Reference Managed by JVM Heap!");\n    }\n}`,
    explanationTa: 'C மொழியில் நினைவக முகவரி `&age` மற்றும் பாயிண்டர் `*ptr` மூலம் நேரடியாக அணுகலாம். Java-வில் JVM Heap நினைவக முகவரிகளை தானாகவே பாதுகாப்பாக நிர்வகிக்கிறது.',
    explanationEn: 'C explicitly uses address-of `&` and dereference `*` operators. Java abstracts pointers into safe Garbage-Collected Heap references.',
  },
  {
    id: 'io-scanner',
    title: '3. C scanf() ➔ Java Scanner Class',
    tamilTitle: '3. C உள்ளீடு (scanf) ➔ Java Scanner எஞ்சின்',
    cCode: `#include <stdio.h>\n\nint main() {\n    int num = 25;\n    printf("Enter number: %d\\n", num);\n    if (num > 18) {\n        printf("Eligible to Vote!\\n");\n    }\n    return 0;\n}`,
    javaCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        int num = 25;\n        System.out.println("Enter number: " + num);\n        if (num > 18) {\n            System.out.println("Eligible to Vote!");\n        }\n    }\n}`,
    explanationTa: 'C மொழியில் உள்ளீடு பெற `scanf("%d", &num)` பயன்படுகிறது. Java மொழியில் `Scanner scanner = new Scanner(System.in)` மற்றும் `nextInt()` பயன்படுகிறது.',
    explanationEn: 'C relies on standard library `scanf()` stream parsing. Java uses object-oriented `Scanner` utility class.',
  },
  {
    id: 'functions-methods',
    title: '4. C Functions ➔ Java Class Methods',
    tamilTitle: '4. C சார்புகள் ➔ Java OOP முறைமைகள்',
    cCode: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(10, 20);\n    printf("Sum = %d\\n", result);\n    return 0;\n}`,
    javaCode: `public class Main {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        int result = add(10, 20);\n        System.out.println("Sum = " + result);\n    }\n}`,
    explanationTa: 'C மொழியில் தனித்த உலகளாவிய சார்புகள் (Global Functions) எழுதலாம். Java-வில் அனைத்து சார்புகளும் கண்டிப்பாக ஒரு Class-க்குள் `method` ஆக மட்டுமே இருக்க வேண்டும்.',
    explanationEn: 'C functions exist globally. Java methods must strictly belong inside a class container.',
  },
  {
    id: 'array-arraylist',
    title: '5. C Fixed Array ➔ Java ArrayList & Array',
    tamilTitle: '5. C மாறா அணி ➔ Java ArrayList & Arrays',
    cCode: `#include <stdio.h>\n\nint main() {\n    int marks[3] = {85, 90, 95};\n    int i;\n    for(i = 0; i < 3; i++) {\n        printf("Mark[%d] = %d\\n", i, marks[i]);\n    }\n    return 0;\n}`,
    javaCode: `import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> marks = new ArrayList<>();\n        marks.add(85);\n        marks.add(90);\n        marks.add(95);\n\n        for (int i = 0; i < marks.size(); i++) {\n            System.out.println("Mark[" + i + "] = " + marks.get(i));\n        }\n    }\n}`,
    explanationTa: 'C மொழியில் அணிகள் (Arrays) நிலையான அளவு கொண்டவை. Java-வில் `ArrayList` மூலம் dynamically நினைவக அளவை உயர்த்திக்கொள்ளலாம்.',
    explanationEn: 'C arrays are static contiguous memory blocks. Java ArrayList provides dynamic resizable collections on the Heap.',
  },
  {
    id: 'malloc-new',
    title: '6. C malloc() ➔ Java new Keyword & GC',
    tamilTitle: '6. C நினைவக ஒதுக்கீடு (malloc) ➔ Java new & GC',
    cCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int*) malloc(2 * sizeof(int));\n    if (arr != NULL) {\n        arr[0] = 100;\n        arr[1] = 200;\n        printf("Allocated: %d, %d\\n", arr[0], arr[1]);\n        free(arr);\n    }\n    return 0;\n}`,
    javaCode: `public class Main {\n    public static void main(String[] args) {\n        int[] arr = new int[2];\n        arr[0] = 100;\n        arr[1] = 200;\n        System.out.println("Allocated: " + arr[0] + ", " + arr[1]);\n        // JVM Garbage Collector automatically frees memory!\n    }\n}`,
    explanationTa: 'C மொழியில் `malloc()` மற்றும் `free()` மூலம் நாமே நினைவகத்தை ஒதுக்கி அழிக்க வேண்டும். Java-வில் `new` மூலம் உருவாக்கி, JVM Garbage Collector தானாகவே தூய்மை செய்கிறது.',
    explanationEn: 'C requires manual dynamic memory management (malloc/free). Java uses new keyword with automatic JVM Garbage Collection.',
  },
  {
    id: 'string-object',
    title: '7. C String (char[]) ➔ Java String Object',
    tamilTitle: '7. C எழுத்து அணி (char[]) ➔ Java String ஆப்ஜெக்ட்',
    cCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char greeting[20] = "Hello";\n    strcat(greeting, " World");\n    printf("Length: %lu\\n", strlen(greeting));\n    printf("Result: %s\\n", greeting);\n    return 0;\n}`,
    javaCode: `public class Main {\n    public static void main(String[] args) {\n        String greeting = "Hello";\n        greeting = greeting + " World";\n        System.out.println("Length: " + greeting.length());\n        System.out.println("Result: " + greeting);\n    }\n}`,
    explanationTa: 'C மொழியில் சரம் என்பது \\0 உடன் முடியும் `char` அணி ஆகும். Java-வில் `String` என்பது பல பயனுள்ள முறைமைகளை (Methods) கொண்ட ஒரு நிலையான (Immutable) ஆப்ஜெக்ட் ஆகும்.',
    explanationEn: 'C handles strings as null-terminated char arrays. Java treats strings as high-level immutable Objects with built-in utility methods.',
  },
  {
    id: 'define-final',
    title: '8. C #define Macro ➔ Java final Constant',
    tamilTitle: '8. C #define மாறிலி ➔ Java final மாறிலி',
    cCode: `#include <stdio.h>\n#define PI 3.14159\n#define MAX_USERS 100\n\nint main() {\n    printf("PI Value: %.2f\\n", PI);\n    printf("Max Users: %d\\n", MAX_USERS);\n    return 0;\n}`,
    javaCode: `public class Main {\n    public static final double PI = 3.14159;\n    public static final int MAX_USERS = 100;\n\n    public static void main(String[] args) {\n        System.out.println("PI Value: " + PI);\n        System.out.println("Max Users: " + MAX_USERS);\n    }\n}`,
    explanationTa: 'C மொழியில் `#define` மூலம் Preprocessor உரை மாற்றீடு நடைபெறுகிறது. Java-வில் `final` மற்றும் `static` விசைச்சொற்கள் மூலம் Type-Safe மாறிலிகள் உருவாக்கப்படுகின்றன.',
    explanationEn: 'C #define is a textual preprocessor replacement. Java uses type-safe static final constants verified by compiler type-checking.',
  },
];

export default function TranspilerPage({ onNavigate: _onNavigate }: TranspilerPageProps) {
  const [activePreset, setActivePreset] = useState<MatrixPreset>(MATRIX_PRESETS[0]);
  const [cCode, setCCode] = useState<string>(MATRIX_PRESETS[0].cCode);
  const [javaCode, setJavaCode] = useState<string>(MATRIX_PRESETS[0].javaCode);

  const [cOutput, setCOutput] = useState<string>('');
  const [cError, setCError] = useState<string | null>(null);
  const [isCRunning, setIsCRunning] = useState<boolean>(false);

  const [javaOutput, setJavaOutput] = useState<string>('');
  const [javaError, setJavaError] = useState<string | null>(null);
  const [isJavaRunning, setIsJavaRunning] = useState<boolean>(false);

  const handleSelectPreset = (preset: MatrixPreset) => {
    setActivePreset(preset);
    setCCode(preset.cCode);
    setJavaCode(preset.javaCode);
    setCOutput('');
    setCError(null);
    setJavaOutput('');
    setJavaError(null);
  };

  const handleRunDualCompilers = async () => {
    setIsCRunning(true);
    setIsJavaRunning(true);
    setCOutput('GCC Compiling C code...');
    setJavaOutput('OpenJDK Compiling Java code...');
    setCError(null);
    setJavaError(null);

    // Run both GCC and OpenJDK compiler engines concurrently!
    const [cResult, javaResult] = await Promise.all([
      compileAndRunCProgram(cCode, activePreset.cInput || '20'),
      compileAndRunJavaProgram(javaCode, activePreset.javaInput || '20'),
    ]);

    if (cResult.error) {
      setCError(cResult.error);
      setCOutput('');
    } else {
      setCOutput(cResult.output || 'GCC C Execution Finished Successfully.');
      setCError(null);
    }

    if (javaResult.error) {
      setJavaError(javaResult.error);
      setJavaOutput('');
    } else {
      setJavaOutput(javaResult.output || 'OpenJDK Java Execution Finished Successfully.');
      setJavaError(null);
    }

    setIsCRunning(false);
    setIsJavaRunning(false);
  };

  return (
    <div className="container-page py-6 sm:py-10 text-ink-950 dark:text-white">
      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-bamboo-200 dark:border-bamboo-800/80 pb-6">
        <div>
          <span className="eyebrow flex items-center gap-1.5 text-bamboo-700 dark:text-amber-400 font-bold">
            <Sparkles className="h-4 w-4" /> CodeKathai Flagship Dual Transpiler
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white flex flex-wrap items-center gap-3">
            <span>C ↔ Java Concept Transpiler Matrix</span>
            <span className="text-xs font-mono font-extrabold bg-gradient-to-r from-bamboo-600 to-emerald-600 text-white px-3 py-1 rounded-full shadow-soft">
              8 இருமொழி தலைப்புகள்
            </span>
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-300 mt-1">
            C மொழியில் கற்ற தத்துவங்கள் Java OOP மொழியில் எவ்வாறு செயல்படுகின்றன என்பதை நேரடி ஒப்பீட்டு வடிவில் கற்றுக்கொள்ளலாம்.
          </p>
        </div>

        {/* Dual Run Button */}
        <button
          onClick={handleRunDualCompilers}
          disabled={isCRunning || isJavaRunning}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-bamboo-600 via-emerald-600 to-teal-600 hover:from-bamboo-500 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm font-mono shadow-xl flex items-center justify-center gap-2.5 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Play className="h-4 w-4 fill-white text-white shrink-0" />
          <span>⚡ Run Dual Compilers Simultaneously (இயக்கு)</span>
        </button>
      </div>

      {/* Concept Matrix Presets */}
      <div className="mb-6 space-y-3">
        <label className="text-xs font-bold text-bamboo-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-bamboo-600 dark:text-amber-400" /> Choose Concept Mapping Preset (ஒப்பீட்டு தலைப்பைத் தேர்ந்தெடுக்கவும்):
        </label>
        <div className="flex flex-wrap gap-2.5">
          {MATRIX_PRESETS.map((p) => {
            const isSelected = p.id === activePreset.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border shadow-sm ${
                  isSelected
                    ? 'bg-bamboo-600 text-white border-bamboo-500 shadow-md ring-2 ring-bamboo-400/40 scale-[1.02]'
                    : 'bg-white text-ink-800 border-ink-200 hover:bg-bamboo-50 hover:text-bamboo-800 dark:bg-ink-900 dark:text-ink-200 dark:border-ink-700 dark:hover:bg-ink-800 dark:hover:text-white'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concept Explanation Card */}
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-ink-900 via-ink-950 to-emerald-950 border border-emerald-500/40 shadow-xl space-y-2 text-white">
        <h3 className="text-sm sm:text-base font-extrabold text-amber-300 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{activePreset.tamilTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-relaxed">
          💡 {activePreset.explanationTa}
        </p>
        <p className="text-xs text-gray-300 font-mono italic">
          🇬🇧 {activePreset.explanationEn}
        </p>
      </div>

      {/* Side-by-Side Dual Code Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: C Code Editor */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between px-3.5 py-2 bg-ink-900 rounded-xl border border-bamboo-800 text-xs font-bold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-emerald-400" /> ⚡ C Source Code (main.c)
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">GCC 13.2</span>
          </div>
          <CCodeEditor
            value={cCode}
            onChange={(val) => setCCode(val)}
            rows={14}
            language="c"
            filename="main.c"
          />
        </div>

        {/* Right: Java Code Editor */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between px-3.5 py-2 bg-ink-900 rounded-xl border border-bamboo-800 text-xs font-bold text-golden-300">
            <span className="flex items-center gap-1.5">
              <Coffee className="h-4 w-4 text-golden-400" /> ☕ Java OOP Code (Main.java)
            </span>
            <span className="text-[10px] bg-golden-500/20 text-golden-300 px-2 py-0.5 rounded font-mono">OpenJDK 21</span>
          </div>
          <CCodeEditor
            value={javaCode}
            onChange={(val) => setJavaCode(val)}
            rows={14}
            language="java"
            filename="Main.java"
          />
        </div>
      </div>

      {/* Side-by-Side Terminal Console Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left C Console */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5" /> GCC Compiler Console Output (main.c)
          </h4>
          <InteractiveTerminal
            output={cOutput}
            error={cError}
            isRunning={isCRunning}
            language="c"
          />
        </div>

        {/* Right Java Console */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-xs font-bold text-golden-600 dark:text-golden-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Coffee className="h-3.5 w-3.5 text-golden-500 dark:text-golden-400" /> OpenJDK Java Console Output (Main.java)
          </h4>
          <InteractiveTerminal
            output={javaOutput}
            error={javaError}
            isRunning={isJavaRunning}
            language="java"
          />
        </div>
      </div>
    </div>
  );
}
