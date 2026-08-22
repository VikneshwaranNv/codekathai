export interface PlaygroundProblem {
  id: string;
  title: string;
  tamilTitle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  tamilDescription: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  hints: string[];
  starterCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
  timeComplexity: string;
  spaceComplexity: string;
}

export const playgroundProblems: PlaygroundProblem[] = [
  {
    id: 'pg-sum-two',
    title: 'Sum of Two Numbers',
    tamilTitle: 'இரண்டு எண்களின் கூட்டல்',
    difficulty: 'easy',
    category: 'Programming Basics',
    description: 'Read two integers a and b, and print their sum.',
    tamilDescription: 'இரண்டு முழு எண்கள் a மற்றும் b-ஐ படித்து, அவற்றின் கூட்டலை அச்சிடுங்கள்.',
    examples: [
      { input: '3 5', output: '8', explanation: '3 + 5 = 8' },
      { input: '10 -2', output: '8', explanation: '10 + (-2) = 8' },
    ],
    constraints: ['-10^6 <= a, b <= 10^6'],
    hints: [
      'Use scanf to read two integers.',
      'Use %d format specifier for integers.',
      'Print the result with printf.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int a, b;\n  // Read a and b, print their sum\n  // Your code here\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int a, b;\n  scanf("%d %d", &a, &b);\n  printf("%d", a + b);\n  return 0;\n}',
    testCases: [
      { input: '3 5', expected: '8' },
      { input: '10 -2', expected: '8' },
      { input: '0 0', expected: '0' },
      { input: '100 200', expected: '300' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'pg-even-odd',
    title: 'Even or Odd',
    tamilTitle: 'இரட்டை அல்லது ஒற்றை',
    difficulty: 'easy',
    category: 'Conditions',
    description: 'Read an integer n and print "Even" if it is even, otherwise "Odd".',
    tamilDescription: 'ஒரு முழு எண் n-ஐ படித்து, இரட்டையென்றால் "Even", ஒற்றையென்றால் "Odd" அச்சிடுங்கள்.',
    examples: [
      { input: '4', output: 'Even', explanation: '4 % 2 == 0, so it is even.' },
      { input: '7', output: 'Odd', explanation: '7 % 2 == 1, so it is odd.' },
    ],
    constraints: ['-10^9 <= n <= 10^9'],
    hints: [
      'Use the modulo operator % to check divisibility by 2.',
      'If n % 2 == 0, the number is even.',
      'Otherwise, it is odd.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  // Print "Even" or "Odd"\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  if (n % 2 == 0)\n    printf("Even");\n  else\n    printf("Odd");\n  return 0;\n}',
    testCases: [
      { input: '4', expected: 'Even' },
      { input: '7', expected: 'Odd' },
      { input: '0', expected: 'Even' },
      { input: '-3', expected: 'Odd' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'pg-factorial',
    title: 'Factorial',
    tamilTitle: 'தொடர் பெருக்கல்',
    difficulty: 'medium',
    category: 'Loops',
    description: 'Read a non-negative integer n and print n! (n factorial).',
    tamilDescription: 'ஒரு எதிர்மற்ற முழு எண் n-ஐ படித்து n! (n தொடர் பெருக்கல்) அச்சிடுங்கள்.',
    examples: [
      { input: '5', output: '120', explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120' },
      { input: '0', output: '1', explanation: '0! = 1 by definition.' },
    ],
    constraints: ['0 <= n <= 20'],
    hints: [
      'Start with result = 1.',
      'Multiply result by each number from 1 to n.',
      'Use a for loop.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  // Compute and print n!\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  long long fact = 1;\n  for (int i = 1; i <= n; i++) {\n    fact *= i;\n  }\n  printf("%lld", fact);\n  return 0;\n}',
    testCases: [
      { input: '5', expected: '120' },
      { input: '0', expected: '1' },
      { input: '1', expected: '1' },
      { input: '10', expected: '3628800' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'pg-reverse-array',
    title: 'Reverse an Array',
    tamilTitle: 'வரிசையை தலைகீழாக்கு',
    difficulty: 'medium',
    category: 'Arrays',
    description: 'Read n integers, store them in an array, and print them in reverse order separated by spaces.',
    tamilDescription: 'n முழு எண்களை படித்து, அவற்றை வரிசையில் சேமித்து, தலைகீழ் வரிசையில் இடைவெளி விட்டு அச்சிடுங்கள்.',
    examples: [
      { input: '5\n1 2 3 4 5', output: '5 4 3 2 1', explanation: 'The array reversed.' },
      { input: '3\n10 20 30', output: '30 20 10', explanation: 'The array reversed.' },
    ],
    constraints: ['1 <= n <= 100', '-10^6 <= arr[i] <= 10^6'],
    hints: [
      'Read n, then read n integers into an array.',
      'Loop from index n-1 down to 0.',
      'Print each element separated by a space.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  int arr[100];\n  // Read, reverse, and print\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  int arr[100];\n  for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n  for (int i = n - 1; i >= 0; i--) {\n    printf("%d", arr[i]);\n    if (i > 0) printf(" ");\n  }\n  return 0;\n}',
    testCases: [
      { input: '5\n1 2 3 4 5', expected: '5 4 3 2 1' },
      { input: '3\n10 20 30', expected: '30 20 10' },
      { input: '1\n42', expected: '42' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'pg-prime-check',
    title: 'Prime Number Check',
    tamilTitle: 'பகா எண் சரிபார்ப்பு',
    difficulty: 'medium',
    category: 'Loops',
    description: 'Read an integer n and print "Prime" if n is a prime number, otherwise "Not Prime".',
    tamilDescription: 'ஒரு முழு எண் n-ஐ படித்து, n பகா எண்ணாக இருந்தால் "Prime", இல்லையென்றால் "Not Prime" அச்சிடுங்கள்.',
    examples: [
      { input: '7', output: 'Prime', explanation: '7 has no divisors other than 1 and itself.' },
      { input: '10', output: 'Not Prime', explanation: '10 = 2 * 5, so it is not prime.' },
    ],
    constraints: ['1 <= n <= 10^6'],
    hints: [
      'A prime number has no divisors other than 1 and itself.',
      'You only need to check divisors up to sqrt(n).',
      'Handle the edge case: 1 is not prime.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  // Print "Prime" or "Not Prime"\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  if (n < 2) {\n    printf("Not Prime");\n    return 0;\n  }\n  int isPrime = 1;\n  for (int i = 2; i * i <= n; i++) {\n    if (n % i == 0) {\n      isPrime = 0;\n      break;\n    }\n  }\n  printf(isPrime ? "Prime" : "Not Prime");\n  return 0;\n}',
    testCases: [
      { input: '7', expected: 'Prime' },
      { input: '10', expected: 'Not Prime' },
      { input: '2', expected: 'Prime' },
      { input: '1', expected: 'Not Prime' },
    ],
    timeComplexity: 'O(sqrt(n))',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'pg-linear-search',
    title: 'Linear Search',
    tamilTitle: 'நேரிய தேடல்',
    difficulty: 'easy',
    category: 'Searching',
    description: 'Read n integers into an array and a key. Print the index of the key (0-based) or -1 if not found.',
    tamilDescription: 'n முழு எண்களை வரிசையில் படித்து, ஒரு key-ஐ படித்து, key-ன் அட்டவணையை (0-அடிப்படையில்) அச்சிடுங்கள், கிடைக்கவில்லையென்றால் -1.',
    examples: [
      { input: '5\n10 20 30 40 50\n30', output: '2', explanation: '30 is at index 2 (0-based).' },
      { input: '4\n1 2 3 4\n5', output: '-1', explanation: '5 is not in the array.' },
    ],
    constraints: ['1 <= n <= 100', '-10^6 <= arr[i] <= 10^6'],
    hints: [
      'Loop through the array from index 0 to n-1.',
      'Compare each element with the key.',
      'If found, print the index and stop. If the loop ends, print -1.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  int arr[100];\n  // Read array, read key, search and print index or -1\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  int arr[100];\n  for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n  int key;\n  scanf("%d", &key);\n  int found = -1;\n  for (int i = 0; i < n; i++) {\n    if (arr[i] == key) {\n      found = i;\n      break;\n    }\n  }\n  printf("%d", found);\n  return 0;\n}',
    testCases: [
      { input: '5\n10 20 30 40 50\n30', expected: '2' },
      { input: '4\n1 2 3 4\n5', expected: '-1' },
      { input: '1\n7\n7', expected: '0' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'pg-bubble-sort',
    title: 'Bubble Sort',
    tamilTitle: 'குமிழி வரிசையாக்கம்',
    difficulty: 'medium',
    category: 'Sorting',
    description: 'Read n integers, sort them in ascending order using bubble sort, and print them space-separated.',
    tamilDescription: 'n முழு எண்களை படித்து, குமிழி வரிசையாக்கம் மூலம் ஏறுவரிசையில் வரிசைப்படுத்தி, இடைவெளி விட்டு அச்சிடுங்கள்.',
    examples: [
      { input: '5\n5 3 1 4 2', output: '1 2 3 4 5', explanation: 'Sorted in ascending order.' },
    ],
    constraints: ['1 <= n <= 100', '-10^6 <= arr[i] <= 10^6'],
    hints: [
      'Bubble sort compares adjacent pairs and swaps if out of order.',
      'Repeat n-1 passes.',
      'After each pass, the largest unsorted element bubbles to the end.',
    ],
    starterCode: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  int arr[100];\n  // Read, bubble sort, print\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n  int n;\n  scanf("%d", &n);\n  int arr[100];\n  for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n  for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        int t = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = t;\n      }\n    }\n  }\n  for (int i = 0; i < n; i++) {\n    printf("%d", arr[i]);\n    if (i < n - 1) printf(" ");\n  }\n  return 0;\n}',
    testCases: [
      { input: '5\n5 3 1 4 2', expected: '1 2 3 4 5' },
      { input: '3\n3 2 1', expected: '1 2 3' },
      { input: '1\n5', expected: '5' },
    ],
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'pg-palindrome-string',
    title: 'Palindrome String Check',
    tamilTitle: 'பாலின்ட்ரோம் சரம் சரிபார்ப்பு',
    difficulty: 'medium',
    category: 'Strings',
    description: 'Read a string and print "Palindrome" if it reads the same forwards and backwards, otherwise "Not Palindrome".',
    tamilDescription: 'ஒரு சரத்தை படித்து, முன்னும் பின்னும் ஒன்றாக இருந்தால் "Palindrome", இல்லையென்றால் "Not Palindrome" அச்சிடுங்கள்.',
    examples: [
      { input: 'madam', output: 'Palindrome', explanation: 'madam reads the same both ways.' },
      { input: 'hello', output: 'Not Palindrome', explanation: 'hello reversed is olleh, not the same.' },
    ],
    constraints: ['1 <= length <= 100', 'String contains lowercase letters only.'],
    hints: [
      'Find the length of the string using strlen.',
      'Compare characters from both ends moving inward.',
      'If any pair differs, it is not a palindrome.',
    ],
    starterCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char s[101];\n  scanf("%s", s);\n  // Check if palindrome\n\n  return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char s[101];\n  scanf("%s", s);\n  int len = strlen(s);\n  int isPalin = 1;\n  for (int i = 0; i < len / 2; i++) {\n    if (s[i] != s[len - 1 - i]) {\n      isPalin = 0;\n      break;\n    }\n  }\n  printf(isPalin ? "Palindrome" : "Not Palindrome");\n  return 0;\n}',
    testCases: [
      { input: 'madam', expected: 'Palindrome' },
      { input: 'hello', expected: 'Not Palindrome' },
      { input: 'racecar', expected: 'Palindrome' },
      { input: 'a', expected: 'Palindrome' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];

export function playgroundByDifficulty(diff: 'easy' | 'medium' | 'hard'): PlaygroundProblem[] {
  return playgroundProblems.filter((p) => p.difficulty === diff);
}
