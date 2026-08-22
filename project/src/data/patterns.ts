export interface PatternProblem {
  id: string;
  title: string;
  tamilTitle: string;
  category: 'number' | 'star' | 'alphabet' | 'pyramid' | 'hollow' | 'pascal' | 'diamond' | 'butterfly';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  tamilDescription: string;
  example: string;
  hints: string[];
  solution: string;
  explanation: string;
}

export const patternProblems: PatternProblem[] = [
  {
    id: 'pat-star-right-triangle',
    title: 'Right Triangle (Stars)',
    tamilTitle: 'வலது முக்கோணம் (நட்சத்திரம்)',
    category: 'star',
    difficulty: 'easy',
    description: 'Print a right-angled triangle of stars with n rows.',
    tamilDescription: 'n வரிசைகளுடன் நட்சத்திர வலது முக்கோணம் அச்சிடுங்கள்.',
    example: '*\n**\n***\n****\n*****',
    hints: [
      'Outer loop: rows 1 to n.',
      'Inner loop: print i stars in row i.',
      'Print newline after each row.',
    ],
    solution: 'for (int i = 1; i <= n; i++) {\n  for (int j = 1; j <= i; j++) printf("*");\n  printf("\\n");\n}',
    explanation: 'Row i prints i stars. The outer loop controls rows, the inner loop controls the count of stars.',
  },
  {
    id: 'pat-number-triangle',
    title: 'Number Triangle',
    tamilTitle: 'எண் முக்கோணம்',
    category: 'number',
    difficulty: 'easy',
    description: 'Print a triangle where row i contains the number i repeated i times.',
    tamilDescription: 'வரிசை i-ல் எண் i-ஐ i முறை அச்சிடும் முக்கோணம்.',
    example: '1\n22\n333\n4444\n55555',
    hints: [
      'Outer loop: rows 1 to n.',
      'Inner loop: print the row number i, i times.',
    ],
    solution: 'for (int i = 1; i <= n; i++) {\n  for (int j = 1; j <= i; j++) printf("%d", i);\n  printf("\\n");\n}',
    explanation: 'Each row prints the row number repeated as many times as the row number.',
  },
  {
    id: 'pat-alphabet-triangle',
    title: 'Alphabet Triangle',
    tamilTitle: 'எழுத்து முக்கோணம்',
    category: 'alphabet',
    difficulty: 'medium',
    description: 'Print a triangle of alphabets where row i shows letters from A to A+i-1.',
    tamilDescription: 'வரிசை i-ல் A முதல் A+i-1 வரை எழுத்துக்களை அச்சிடும் முக்கோணம்.',
    example: 'A\nAB\nABC\nABCD\nABCDE',
    hints: [
      'Use a char variable starting at A.',
      'Inner loop prints characters from A to A+i-1.',
      'Use %c to print a character.',
    ],
    solution: 'for (int i = 1; i <= n; i++) {\n  for (int j = 0; j < i; j++) {\n    printf("%c", \'A\' + j);\n  }\n  printf("\\n");\n}',
    explanation: 'We use the ASCII property that A + j gives the j-th letter. Row i prints i letters starting from A.',
  },
  {
    id: 'pat-pyramid',
    title: 'Full Pyramid',
    tamilTitle: 'முழு பிரமிடு',
    category: 'pyramid',
    difficulty: 'medium',
    description: 'Print a centered pyramid of stars with n rows.',
    tamilDescription: 'n வரிசைகளுடன் மையப்படுத்தப்பட்ட நட்சத்திர பிரமிடு.',
    example: '    *\n   ***\n  *****\n *******\n*********',
    hints: [
      'Row i: print (n-i) spaces, then (2*i-1) stars.',
      'The star count follows odd numbers: 1, 3, 5, 7, 9.',
    ],
    solution: 'for (int i = 1; i <= n; i++) {\n  for (int j = 1; j <= n - i; j++) printf(" ");\n  for (int j = 1; j <= 2 * i - 1; j++) printf("*");\n  printf("\\n");\n}',
    explanation: 'Each row has (n-i) leading spaces and (2i-1) stars, creating a centered pyramid.',
  },
  {
    id: 'pat-hollow-square',
    title: 'Hollow Square',
    tamilTitle: 'குழி சதுரம்',
    category: 'hollow',
    difficulty: 'medium',
    description: 'Print a hollow square of stars with n rows and columns — only the border is filled.',
    tamilDescription: 'n வரிசை மற்றும் நெடுவரிசையுடன் குழி சதுரம் — விளிம்பு மட்டும் நட்சத்திரம்.',
    example: '*****\n*   *\n*   *\n*   *\n*****',
    hints: [
      'Print stars on the first and last row.',
      'For middle rows, print star only at the first and last column.',
      'Use condition: i==1 || i==n || j==1 || j==n.',
    ],
    solution: 'for (int i = 1; i <= n; i++) {\n  for (int j = 1; j <= n; j++) {\n    if (i == 1 || i == n || j == 1 || j == n) printf("*");\n    else printf(" ");\n  }\n  printf("\\n");\n}',
    explanation: 'We print a star only when on the border (first/last row or column), otherwise a space.',
  },
  {
    id: 'pat-pascal',
    title: "Pascal's Triangle",
    tamilTitle: 'பாஸ்கல் முக்கோணம்',
    category: 'pascal',
    difficulty: 'hard',
    description: "Print Pascal's Triangle with n rows using the binomial coefficient formula.",
    tamilDescription: 'இருபடி குணகம் சூத்திரத்தைப் பயன்படுத்தி n வரிசைகளுடன் பாஸ்கல் முக்கோணம் அச்சிடுங்கள்.',
    example: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1',
    hints: [
      'Each number is nCr = n! / (r! * (n-r)!).',
      'You can compute each value iteratively: C(n, r+1) = C(n, r) * (n-r) / (r+1).',
      'Start each row with 1.',
    ],
    solution: 'for (int i = 0; i < n; i++) {\n  long val = 1;\n  for (int j = 0; j <= i; j++) {\n    printf("%ld ", val);\n    val = val * (i - j) / (j + 1);\n  }\n  printf("\\n");\n}',
    explanation: 'Each value in a row is computed from the previous one using the relation C(n,r+1) = C(n,r) * (n-r) / (r+1).',
  },
  {
    id: 'pat-diamond',
    title: 'Diamond Pattern',
    tamilTitle: 'வைர முறை',
    category: 'diamond',
    difficulty: 'hard',
    description: 'Print a diamond of stars with n rows in the upper half.',
    tamilDescription: 'மேல் பாதியில் n வரிசைகளுடன் வைர முறை அச்சிடுங்கள்.',
    example: '  *\n ***\n*****\n ***\n  *',
    hints: [
      'Split into two parts: upper pyramid and lower inverted pyramid.',
      'Upper: rows 1 to n. Lower: rows n-1 to 1.',
      'Use the same space/star formula as a pyramid.',
    ],
    solution: 'int mid = (n + 1) / 2;\nfor (int i = 1; i <= mid; i++) {\n  for (int j = 1; j <= mid - i; j++) printf(" ");\n  for (int j = 1; j <= 2 * i - 1; j++) printf("*");\n  printf("\\n");\n}\nfor (int i = mid - 1; i >= 1; i--) {\n  for (int j = 1; j <= mid - i; j++) printf(" ");\n  for (int j = 1; j <= 2 * i - 1; j++) printf("*");\n  printf("\\n");\n}',
    explanation: 'The diamond is a pyramid followed by an inverted pyramid. The middle row is the widest.',
  },
  {
    id: 'pat-butterfly',
    title: 'Butterfly Pattern',
    tamilTitle: 'பட்டாம்பூச்சி முறை',
    category: 'butterfly',
    difficulty: 'hard',
    description: 'Print a butterfly of stars with n rows in each wing.',
    tamilDescription: 'ஒவ்வொரு சிறகிலும் n வரிசைகளுடன் பட்டாம்பூச்சி முறை அச்சிடுங்கள்.',
    example: '*        *\n**      **\n***    ***\n****  ****\n**********\n****  ****\n***    ***\n**      **\n*        *',
    hints: [
      'Upper half: row i prints i stars, then 2*(n-i) spaces, then i stars.',
      'Lower half: mirror of the upper half.',
      'Total width is 2*n.',
    ],
    solution: 'for (int i = 1; i <= n; i++) {\n  for (int j = 1; j <= i; j++) printf("*");\n  for (int j = 1; j <= 2 * (n - i); j++) printf(" ");\n  for (int j = 1; j <= i; j++) printf("*");\n  printf("\\n");\n}\nfor (int i = n; i >= 1; i--) {\n  for (int j = 1; j <= i; j++) printf("*");\n  for (int j = 1; j <= 2 * (n - i); j++) printf(" ");\n  for (int j = 1; j <= i; j++) printf("*");\n  printf("\\n");\n}',
    explanation: 'Each wing row has stars on both sides with spaces shrinking/growing in the middle. The lower half mirrors the upper.',
  },
];

export const patternCategories: { id: PatternProblem['category']; label: string; tamilLabel: string }[] = [
  { id: 'star', label: 'Star Patterns', tamilLabel: 'நட்சத்திர முறைகள்' },
  { id: 'number', label: 'Number Patterns', tamilLabel: 'எண் முறைகள்' },
  { id: 'alphabet', label: 'Alphabet Patterns', tamilLabel: 'எழுத்து முறைகள்' },
  { id: 'pyramid', label: 'Pyramid', tamilLabel: 'பிரமிடு' },
  { id: 'hollow', label: 'Hollow', tamilLabel: 'குழி' },
  { id: 'pascal', label: "Pascal's Triangle", tamilLabel: 'பாஸ்கல் முக்கோணம்' },
  { id: 'diamond', label: 'Diamond', tamilLabel: 'வைரம்' },
  { id: 'butterfly', label: 'Butterfly', tamilLabel: 'பட்டாம்பூச்சி' },
];
