export type Difficulty = 'easy' | 'medium' | 'hard';
export type ProblemType = 'mcq' | 'output-prediction' | 'debugging' | 'scenario' | 'interview' | 'pattern';

export interface PracticeProblem {
  id: string;
  title: string;
  tamilTitle: string;
  difficulty: Difficulty;
  type: ProblemType;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prompt: string;
  tamilPrompt: string;
  code?: string;
  options?: string[];
  answerIndex?: number;
  buggyCode?: string;
  fixedCode?: string;
  expectedOutput?: string;
  hints: string[];
  solution: string;
  explanation: string;
}

export const practiceProblems: PracticeProblem[] = [
  {
    id: 'mcq-var-1',
    title: 'Which is a valid variable name?',
    tamilTitle: 'சரியான மாறி பெயர் எது?',
    difficulty: 'easy',
    type: 'mcq',
    category: 'Variables',
    level: 'beginner',
    prompt: 'Which of the following is a valid C variable name?',
    tamilPrompt: 'கீழ்க்கண்டவற்றில் சரியான C மாறி பெயர் எது?',
    options: ['2count', 'my age', 'student_name', 'int'],
    answerIndex: 2,
    hints: [
      'Variable names cannot start with a digit.',
      'Variable names cannot contain spaces.',
      'Variable names cannot be C keywords like int.',
    ],
    solution: 'student_name',
    explanation: 'student_name uses only letters and underscore, does not start with a digit, has no spaces, and is not a keyword.',
  },
  {
    id: 'output-printf-1',
    title: 'Predict the output',
    tamilTitle: 'வெளியீட்டை கணிக்கவும்',
    difficulty: 'easy',
    type: 'output-prediction',
    category: 'Input/Output',
    level: 'beginner',
    prompt: 'What will this code print?',
    tamilPrompt: 'இந்த குறியீடு என்ன அச்சிடும்?',
    code: 'int x = 5;\nint y = 3;\nprintf("%d", x + y);',
    options: ['5', '3', '8', '53'],
    answerIndex: 2,
    hints: [
      'Look at the format specifier — %d prints an integer.',
      'x + y = 5 + 3 = 8.',
    ],
    solution: '8',
    explanation: 'x is 5, y is 3, and %d prints their sum: 8.',
  },
  {
    id: 'debug-printf-1',
    title: 'Find the bug',
    tamilTitle: 'பிழையைக் கண்டறி',
    difficulty: 'easy',
    type: 'debugging',
    category: 'Input/Output',
    level: 'beginner',
    prompt: 'This code should print "Hello" but it has a bug. Fix it.',
    tamilPrompt: 'இந்த குறியீடு "Hello" அச்சிட வேண்டும் ஆனால் பிழை உள்ளது. அதை சரிசெய்யவும்.',
    buggyCode: 'printf("Hello);',
    fixedCode: 'printf("Hello");',
    expectedOutput: 'Hello',
    hints: [
      'Check the string — is the closing quote present?',
      'The format string must be fully enclosed in double quotes.',
    ],
    solution: 'printf("Hello");',
    explanation: 'The closing double quote was missing. The correct statement is printf("Hello");',
  },
  {
    id: 'pattern-star-1',
    title: 'Print a right triangle of stars',
    tamilTitle: 'நட்சத்திர வலது முக்கோணம்',
    difficulty: 'medium',
    type: 'pattern',
    category: 'Pattern Printing',
    level: 'intermediate',
    prompt: 'Write a program to print a right triangle of stars with 5 rows.',
    tamilPrompt: '5 வரிசைகளுடன் நட்சத்திர வலது முக்கோணத்தை அச்சிடும் நிரலை எழுதுங்கள்.',
    expectedOutput: '*\n**\n***\n****\n*****',
    hints: [
      'Use a nested for loop — outer loop for rows, inner loop for stars.',
      'In row i, print i stars.',
      'After each row, print a newline.',
    ],
    solution: '#include <stdio.h>\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n      printf("*");\n    }\n    printf("\\n");\n  }\n  return 0;\n}',
    explanation: 'The outer loop runs 5 times (rows). The inner loop prints i stars per row. After each row, a newline is printed.',
  },
  {
    id: 'scenario-student-1',
    title: 'Student Management — Add a student',
    tamilTitle: 'மாணவர் மேலாண்மை — மாணவர் சேர்க்க',
    difficulty: 'medium',
    type: 'scenario',
    category: 'Structures',
    level: 'intermediate',
    prompt: 'Create a struct Student with name (string) and marks (int). Read one student and print their details.',
    tamilPrompt: 'ஒரு struct Student உருவாக்குங்கள் — name (string) மற்றும் marks (int). ஒரு மாணவரைப் படித்து அவரின் விவரங்களை அச்சிடுங்கள்.',
    expectedOutput: 'Name: Kavi\nMarks: 95',
    hints: [
      'Define a struct with a char array for name and an int for marks.',
      'Use scanf to read the values.',
      'Use printf to display them.',
    ],
    solution: '#include <stdio.h>\nstruct Student {\n  char name[50];\n  int marks;\n};\nint main() {\n  struct Student s;\n  scanf("%s %d", s.name, &s.marks);\n  printf("Name: %s\\nMarks: %d", s.name, s.marks);\n  return 0;\n}',
    explanation: 'A struct groups related data. We read name and marks, then print them together as one student record.',
  },
  {
    id: 'interview-recursion-1',
    title: 'Factorial using recursion',
    tamilTitle: 'மீள்பாடு மூலம் தொடர் பெருக்கல்',
    difficulty: 'medium',
    type: 'interview',
    category: 'Recursion',
    level: 'intermediate',
    prompt: 'Write a recursive function to compute the factorial of n. Read n from input and print n!.',
    tamilPrompt: 'n-ன் தொடர் பெருக்கலைக் கணக்கிட ஒரு மீள்பாட்டு சார்பு எழுதுங்கள். n-ஐ உள்ளீட்டில் படித்து n! அச்சிடுங்கள்.',
    expectedOutput: '120',
    hints: [
      'Factorial: n! = n * (n-1)!, with 0! = 1 as the base case.',
      'The function calls itself with n-1 until n reaches 0.',
      'Return 1 when n == 0.',
    ],
    solution: '#include <stdio.h>\nint fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}\nint main() {\n  int n = 5;\n  printf("%d", fact(n));\n  return 0;\n}',
    explanation: 'fact(n) calls fact(n-1) until n reaches 1. Each call multiplies n by the result of the smaller call, building up the factorial.',
  },
  {
    id: 'mcq-pointer-1',
    title: 'What does the * operator do?',
    tamilTitle: '* செயலி என்ன செய்கிறது?',
    difficulty: 'hard',
    type: 'mcq',
    category: 'Pointers',
    level: 'advanced',
    prompt: 'In C, what does the * operator do when used with a pointer variable?',
    tamilPrompt: 'C-ல், சுட்டி மாறியுடன் * செயலி பயன்படுத்தப்படும்போது என்ன செய்கிறது?',
    options: [
      'Returns the address of the variable',
      'Dereferences the pointer — returns the value at the address',
      'Multiplies two pointers',
      'Declares a new pointer',
    ],
    answerIndex: 1,
    hints: [
      '& gets the address, * gets the value at an address.',
      'Dereferencing means accessing the value the pointer points to.',
    ],
    solution: 'Dereferences the pointer — returns the value at the address',
    explanation: 'The * operator dereferences a pointer, giving access to the value stored at the memory address the pointer holds.',
  },
  {
    id: 'scenario-atm-1',
    title: 'ATM — Check balance and withdraw',
    tamilTitle: 'ATM — இருப்பு சரிபார்த்து திரும்பப் பெறு',
    difficulty: 'hard',
    type: 'scenario',
    category: 'Conditions',
    level: 'intermediate',
    prompt: 'Simulate an ATM: store a balance of 10000. Read a withdrawal amount. If sufficient, deduct and print new balance; otherwise print "Insufficient funds".',
    tamilPrompt: 'ஒரு ATM-ஐ சிமுலேட் செய்யுங்கள்: இருப்பு 10000. திரும்பப் பெறும் தொகையைப் படித்து, போதுமானால் கழித்து புதிய இருப்பை அச்சிடுங்கள்; இல்லையென்றால் "Insufficient funds" அச்சிடுங்கள்.',
    expectedOutput: 'Balance: 7000',
    hints: [
      'Use an if-else to check if the withdrawal amount is less than or equal to the balance.',
      'If yes, subtract and print the new balance.',
      'If no, print an error message.',
    ],
    solution: '#include <stdio.h>\nint main() {\n  int balance = 10000;\n  int withdraw = 3000;\n  if (withdraw <= balance) {\n    balance -= withdraw;\n    printf("Balance: %d", balance);\n  } else {\n    printf("Insufficient funds");\n  }\n  return 0;\n}',
    explanation: 'The if checks whether the withdrawal is affordable. If so, the balance is reduced and printed; otherwise an error is shown.',
  },
  {
    id: 'pattern-pyramid-1',
    title: 'Print a pyramid of stars',
    tamilTitle: 'நட்சத்திர பிரமிடு',
    difficulty: 'medium',
    type: 'pattern',
    category: 'Pattern Printing',
    level: 'intermediate',
    prompt: 'Print a pyramid of stars with 5 rows.',
    tamilPrompt: '5 வரிசைகளுடன் நட்சத்திர பிரமிடு அச்சிடுங்கள்.',
    expectedOutput: '    *\n   ***\n  *****\n *******\n*********',
    hints: [
      'For row i (1 to n), print (n-i) spaces, then (2*i-1) stars.',
      'The number of stars follows the odd numbers: 1, 3, 5, 7, 9.',
      'Print a newline after each row.',
    ],
    solution: '#include <stdio.h>\nint main() {\n  int n = 5;\n  for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n - i; j++) printf(" ");\n    for (int j = 1; j <= 2 * i - 1; j++) printf("*");\n    printf("\\n");\n  }\n  return 0;\n}',
    explanation: 'Each row has leading spaces (n-i) followed by stars (2i-1). This creates the pyramid shape.',
  },
  {
    id: 'debug-loop-1',
    title: 'Infinite loop bug',
    tamilTitle: 'முடிவற்ற மடக்கு பிழை',
    difficulty: 'medium',
    type: 'debugging',
    category: 'Loops',
    level: 'beginner',
    prompt: 'This loop should print 1 to 5 but runs forever. Fix it.',
    tamilPrompt: 'இந்த மடக்கு 1 முதல் 5 வரை அச்சிட வேண்டும் ஆனால் என்றென்றும் ஓடுகிறது. சரிசெய்யவும்.',
    buggyCode: 'for (int i = 1; i <= 5; i--) {\n  printf("%d ", i);\n}',
    fixedCode: 'for (int i = 1; i <= 5; i++) {\n  printf("%d ", i);\n}',
    expectedOutput: '1 2 3 4 5',
    hints: [
      'Look at how i changes each iteration.',
      'i-- makes i smaller, so the condition i <= 5 is always true.',
      'It should be i++ to count up.',
    ],
    solution: 'for (int i = 1; i <= 5; i++)',
    explanation: 'The loop used i-- which decreases i, so i <= 5 is always true. Changing to i++ makes it count from 1 to 5.',
  },
  {
    id: 'mcq-array-1',
    title: 'Array index starts at?',
    tamilTitle: 'வரிசை அட்டவணை எங்கிருந்து தொடங்குகிறது?',
    difficulty: 'easy',
    type: 'mcq',
    category: 'Arrays',
    level: 'beginner',
    prompt: 'In C, what is the index of the first element in an array?',
    tamilPrompt: 'C-ல், ஒரு வரிசையின் முதல் உறுப்பின் அட்டவணை என்ன?',
    options: ['1', '0', '-1', 'Depends on the array size'],
    answerIndex: 1,
    hints: [
      'C arrays are zero-indexed.',
      'The first element is at index 0.',
    ],
    solution: '0',
    explanation: 'C arrays are zero-indexed — the first element is at index 0, and the last is at size-1.',
  },
  {
    id: 'interview-linkedlist-1',
    title: 'Reverse a linked list',
    tamilTitle: 'இணைப்பு பட்டியலை தலைகீழாக்கு',
    difficulty: 'hard',
    type: 'interview',
    category: 'Linked List',
    level: 'advanced',
    prompt: 'Write a function to reverse a singly linked list iteratively.',
    tamilPrompt: 'ஒரு singly linked list-ஐ iteratively தலைகீழாக்கும் சார்பு எழுதுங்கள்.',
    hints: [
      'Use three pointers: prev (NULL), current (head), next.',
      'In each step, save current->next, point current->next to prev, then advance.',
      'At the end, prev is the new head.',
    ],
    solution: 'struct Node* reverse(struct Node* head) {\n  struct Node* prev = NULL;\n  struct Node* curr = head;\n  struct Node* next;\n  while (curr) {\n    next = curr->next;\n    curr->next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}',
    explanation: 'We iterate through the list, reversing each pointer. prev becomes the new head when the loop ends.',
  },
];

export function problemsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): PracticeProblem[] {
  return practiceProblems.filter((p) => p.level === level);
}

export function problemsByType(type: ProblemType): PracticeProblem[] {
  return practiceProblems.filter((p) => p.type === type);
}

export function problemsByCategory(category: string): PracticeProblem[] {
  return practiceProblems.filter((p) => p.category === category);
}
