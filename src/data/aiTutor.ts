export interface AITutorResponse {
  type: 'line-by-line' | 'tamil-story' | 'similar-question' | 'hint' | 'error-explain';
  title: string;
  content: string;
}

export interface CodeLineExplanation {
  line: string;
  explanation: string;
  tamilExplanation: string;
}

export function explainLineByLine(code: string): CodeLineExplanation[] {
  const lines = code.split('\n').filter((l) => l.trim().length > 0);
  const explanations: Record<string, { en: string; ta: string }> = {
    '#include': { en: 'Includes the standard input/output library so we can use printf and scanf.', ta: 'printf, scanf பயன்படுத்த standard input/output library-ஐ சேர்க்கிறது.' },
    'int main': { en: 'The main function — every C program starts running here.', ta: 'main function — ஒவ்வொரு C program-ம் இங்கு தான் தொடங்கும்.' },
    'printf': { en: 'Prints text or values to the screen.', ta: 'திரையில் உரை அல்லது மதிப்புகளை அச்சிடுகிறது.' },
    'scanf': { en: 'Reads input from the keyboard.', ta: 'விசைப்பலகையிலிருந்து உள்ளீட்டை படிக்கிறது.' },
    'int ': { en: 'Declares an integer variable.', ta: 'ஒரு முழு எண் மாறியை அறிவிக்கிறது.' },
    'char ': { en: 'Declares a character variable or string.', ta: 'ஒரு எழுத்து அல்லது சரம் மாறியை அறிவிக்கிறது.' },
    'float ': { en: 'Declares a floating-point (decimal) variable.', ta: 'ஒரு தசைப்புள்ள (தசம) மாறியை அறிவிக்கிறது.' },
    'for': { en: 'A loop that repeats a block of code a certain number of times.', ta: 'ஒரு குறிப்பிட்ட எண்ணிக்கை முறை குறியீட்டை மீண்டும் செய்யும் மடக்கு.' },
    'while': { en: 'A loop that runs as long as a condition is true.', ta: 'ஒரு நிபந்தனை உண்மையாக இருக்கும் வரை ஓடும் மடக்கு.' },
    'if': { en: 'Checks a condition — if true, runs the block inside.', ta: 'ஒரு நிபந்தனையை சரிபார்க்கிறது — உண்மையென்றால், உள்ள குறியீட்டை இயக்குகிறது.' },
    'else': { en: 'Runs when the if condition is false.', ta: 'if நிபந்தனை பொய்யாக இருக்கும்போது இயக்குகிறது.' },
    'return': { en: 'Sends a value back and exits the function.', ta: 'ஒரு மதிப்பைத் திருப்பி அனுப்பி சார்பை விடுகிறது.' },
    'struct': { en: 'Defines a structure — a group of related variables.', ta: 'ஒரு structure-ஐ வரையறுக்கிறது — தொடர்புடைய மாறிகளின் குழு.' },
    'void': { en: 'Means no value — used when a function returns nothing.', ta: 'மதிப்பு இல்லை — சார்பு எதையும் திருப்பி அனுப்பாத போது பயன்படுத்தப்படுகிறது.' },
  };

  return lines.map((line) => {
    const trimmed = line.trim();
    let en = 'This line performs an operation in the program.';
    let ta = 'இந்த வரி நிரலில் ஒரு செயலைச் செய்கிறது.';

    for (const key of Object.keys(explanations)) {
      if (trimmed.includes(key)) {
        en = explanations[key].en;
        ta = explanations[key].ta;
        break;
      }
    }

    if (trimmed.startsWith('//')) {
      en = 'A comment — the computer ignores this. It is for humans to read.';
      ta = 'ஒரு கருத்து — computer இதை புறக்கணிக்கும். மனிதர்கள் படிக்க மட்டும்.';
    }

    return { line: trimmed, explanation: en, tamilExplanation: ta };
  });
}

export function explainAsTamilStory(code: string): string {
  const hasPrintf = code.includes('printf');
  const hasScanf = code.includes('scanf');
  const hasFor = code.includes('for');
  const hasIf = code.includes('if');
  const hasWhile = code.includes('while');

  let story = 'கதை ஒன்று சொல்கிறேன், கேளு. ';

  if (hasScanf) {
    story += 'Kavi வகுப்பில் ஆசிரியர் ஒரு கேள்வம் கேட்கிறார் — "உன் வயது என்ன?" Kavi அதற்கு பதில் சொல்கிறாள். அது தான் scanf — program உன்னிடம் உள்ளீடு கேட்கிறது. ';
  }
  if (hasPrintf) {
    story += 'பிறகு Kavi தன் பதிலை அனைவருக்கும் சொல்கிறாள். அது தான் printf — program திரையில் ஏதோ ஒன்றை காட்டுகிறது. ';
  }
  if (hasIf) {
    story += 'ஆசிரியர் சொல்கிறார் — "வயது 18-க்கு மேல் இருந்தால் மட்டுமே வாக்காளர் பட்டியலில் சேர்க்கலாம்." அது தான் if — ஒரு நிபந்தனை சரியா தானா பார்த்து முடிவு எடுக்கிறது. ';
  }
  if (hasFor) {
    story += 'Kavi ஒவ்வொரு மாணவராகச் சந்தித்து பெயர் கேட்கிறாள். மீண்டும் மீண்டும் அதே கேள்வம். அது தான் for loop — ஒரு வேலையை பல முறை செய்கிறது. ';
  }
  if (hasWhile) {
    story += 'Kavi வகுப்பு முடியும் வரை கதை சொல்கிறாள். முடியவில்லை என்றால் தொடர்கிறாள். அது தான் while loop — நிபந்தனை உண்மையா இருக்கும் வரை ஓடுகிறது. ';
  }

  story += 'இப்படி ஒவ்வொரு வரியும் ஒரு சிறு கதை. குறியீடு என்பது கதை சொல்லும் மொழி!';
  return story;
}

export function generateSimilarQuestion(category: string): { question: string; tamilQuestion: string; hint: string } {
  const questions: Record<string, { question: string; tamilQuestion: string; hint: string }> = {
    Variables: {
      question: 'Declare a variable called temperature of type int and assign it the value 35.',
      tamilQuestion: 'temperature என்ற பெயரில் int வகை மாறியை அறிவித்து 35 என மதிப்பு கொடுங்கள்.',
      hint: 'Use: int temperature = 35;',
    },
    Loops: {
      question: 'Write a for loop to print numbers from 1 to 10.',
      tamilQuestion: '1 முதல் 10 வரை எண்களை அச்சிட for loop எழுதுங்கள்.',
      hint: 'Use: for (int i = 1; i <= 10; i++) printf("%d ", i);',
    },
    Conditions: {
      question: 'Read a number and print "Positive" if it is greater than 0, else "Negative".',
      tamilQuestion: 'ஒரு எண்ணை படித்து, 0-க்கு மேல் என்றால் "Positive", இல்லையென்றால் "Negative" அச்சிடுங்கள்.',
      hint: 'Use if (n > 0) printf("Positive"); else printf("Negative");',
    },
    Arrays: {
      question: 'Read 5 integers into an array and print their sum.',
      tamilQuestion: '5 முழு எண்களை வரிசையில் படித்து அவற்றின் கூட்டலை அச்சிடுங்கள்.',
      hint: 'Loop through the array and add each element to a sum variable.',
    },
    Functions: {
      question: 'Write a function called add(int a, int b) that returns the sum of a and b.',
      tamilQuestion: 'add(int a, int b) என்ற சார்பு எழுதுங்கள், அது a மற்றும் b-ன் கூட்டலை திருப்பி அனுப்ப வேண்டும்.',
      hint: 'int add(int a, int b) { return a + b; }',
    },
  };

  return questions[category] ?? {
    question: 'Write a program that prints "Hello, Code Kathai!" to the screen.',
    tamilQuestion: '"Hello, Code Kathai!" என்று திரையில் அச்சிடும் நிரல் எழுதுங்கள்.',
    hint: 'Use printf("Hello, Code Kathai!");',
  };
}

export function explainError(error: string): { explanation: string; tamilExplanation: string; fix: string } {
  const errorMap: Record<string, { explanation: string; tamilExplanation: string; fix: string }> = {
    'expected ;': {
      explanation: 'A semicolon is missing at the end of a statement. Every statement in C must end with a semicolon.',
      tamilExplanation: 'ஒரு statement-ன் முடிவில் அரைப்புள்ளி (;) காணவில்லை. C-ல் ஒவ்வொரு statement-ம் அரைப்புள்ளியுடன் முடிவடைய வேண்டும்.',
      fix: 'Add a semicolon ; at the end of the line before the error.',
    },
    'undeclared': {
      explanation: 'You are using a variable that has not been declared. You must declare a variable before using it.',
      tamilExplanation: 'நீங்கள் declare செய்யாத ஒரு மாறியை பயன்படுத்துகிறீர்கள். ஒரு மாறியை பயன்படுத்தும் முன் declare செய்ய வேண்டும்.',
      fix: 'Declare the variable with its type before using it, e.g. int x;',
    },
    'expected )': {
      explanation: 'A closing parenthesis ) is missing. Every opening ( must have a matching closing ).',
      tamilExplanation: 'மூடு அடைப்புக்குறி ) காணவில்லை. ஒவ்வொரு திறப்பு ( க்கும் ஒரு மூடு ) இருக்க வேண்டும்.',
      fix: 'Add the missing closing parenthesis ).',
    },
    'expected }': {
      explanation: 'A closing brace } is missing. Every opening { must have a matching closing }.',
      tamilExplanation: 'மூடு அடைப்புக்குறி } காணவில்லை. ஒவ்வொரு திறப்பு { க்கும் ஒரு மூடு } இருக்க வேண்டும்.',
      fix: 'Add the missing closing brace }.',
    },
  };

  for (const key of Object.keys(errorMap)) {
    if (error.toLowerCase().includes(key)) {
      return errorMap[key];
    }
  }

  return {
    explanation: 'This is a compilation error. Check your syntax — look for missing punctuation, undeclared variables, or mismatched brackets.',
    tamilExplanation: 'இது ஒரு compilation பிழை. உங்கள் syntax-ஐ சரிபார்க்கவும் — விடுபட்ட நிறுத்தற்குறி, declare செய்யாத மாறிகள், அல்லது பொருந்தாத அடைப்புக்குறிகளைத் தேடுங்கள்.',
    fix: 'Review the line mentioned in the error and fix the syntax issue.',
  };
}
