export interface VisualTopic {
  id: string;
  title: string;
  tamilTitle: string;
  category: 'loops' | 'control-flow' | 'oop';
  categoryLabel: string;
  tag: string;
  badgeColor: string;
  imageUrl: string;
  imageAlt: string;
  concept: string;
  storyTitle: string;
  tamilStoryTitle: string;
  metaphor: string;
  tamilMetaphor: string;
  syntaxBreakdown: {
    label: string;
    tamilLabel: string;
    code: string;
    explanation: string;
  }[];
  whenToUse: string;
  tamilWhenToUse: string;
  codeSnippet: string;
  explanationPoints: string[];
  tamilPoints: string[];
}

export const VISUAL_TOPICS: VisualTopic[] = [
  {
    id: 'java-for-loop',
    title: 'Java For Loop',
    tamilTitle: 'விவசாயி செடிகளுக்கு நீர் ஊற்றும் உவமை',
    category: 'loops',
    categoryLabel: 'Loops & Iterations',
    tag: 'For Loop',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    imageUrl: '/visual-learning/java-for-loop.jpg',
    imageAlt: 'Java For Loop Real Life Example - Farmer watering 5 plants',
    concept: 'For Loop (Definite Iteration)',
    storyTitle: 'Farmer Waters 5 Plants, One by One',
    tamilStoryTitle: 'ஒரு விவசாயி 5 செடிகளுக்கு வரிசையாக நீர் பாய்ச்சுதல்',
    metaphor:
      'A farmer enters his field with a watering can to water 5 numbered saplings. He starts at plant 1, checks if plant number is <= 5, pours water, and moves to the next plant (i++). Because the exact count of repetitions is known in advance (5 plants), the for-loop is the optimal choice.',
    tamilMetaphor:
      'ஒரு விவசாயி தன் தோட்டத்தில் உள்ள 5 செடிகளுக்கு வரிசையாக தண்ணீர் ஊற்றுகிறார். செடி 1 முதல் தொடங்கி, 5-வது செடி வரை ஒவ்வொன்றாக தண்ணீர் பாய்ச்சி நகர்கிறார் (i++). எத்தனை முறை செய்ய வேண்டும் என்று முன்பே தெரிந்திருக்கும் போது For Loop மிகச் சிறந்தது.',
    syntaxBreakdown: [
      {
        label: 'start (ஆரம்பம்)',
        tamilLabel: 'தொடக்க மதிப்பு',
        code: 'int i = 1',
        explanation: 'Loop counter starts at plant 1',
      },
      {
        label: 'condition (நிபந்தனை)',
        tamilLabel: 'இயங்கு நிபந்தனை',
        code: 'i <= 5',
        explanation: 'Continue watering as long as i is <= 5',
      },
      {
        label: 'update (மாறுதல்)',
        tamilLabel: 'அடுத்த செடிக்கு நகர்தல்',
        code: 'i++',
        explanation: 'Move to the next plant after each watering',
      },
    ],
    whenToUse: 'Use when the number of repetitions is known beforehand.',
    tamilWhenToUse: 'எத்தனை முறை செயல் திரும்ப நிகழ வேண்டும் என்ற எண்ணிக்கை முன்பே தெரிந்திருக்கும் போது பயன்படுத்தவும்.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Water plant " + i);
        }
    }
}`,
    explanationPoints: [
      'Loop runs exactly 5 times (i = 1 to 5).',
      'System.out.println prints the current plant being watered.',
      'Once i reaches 6, the condition i <= 5 becomes false and loop ends.',
    ],
    tamilPoints: [
      'லூப் சரியாக 5 முறை இயங்கும் (i = 1 முதல் 5 வரை).',
      'ஒவ்வொரு முறையும் எந்த செடிக்கு தண்ணீர் ஊற்றப்படுகிறது என்று அச்சிடும்.',
      'i = 6 ஆக மாறும் போது நிபந்தனை முடிவடைந்து லூப் நிற்கும்.',
    ],
  },
  {
    id: 'java-while-loop',
    title: 'Java While Loop',
    tamilTitle: 'தொட்டி நிறையும் வரை தண்ணீர் இறைக்கும் உவமை',
    category: 'loops',
    categoryLabel: 'Loops & Iterations',
    tag: 'While Loop',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    imageUrl: '/visual-learning/java-while-loop.jpg',
    imageAlt: 'Java While Loop Real Life Example - Keep pumping water while tank not full',
    concept: 'While Loop (Condition-Controlled Iteration)',
    storyTitle: 'Keep Pumping Water While Tank is Not Full',
    tamilStoryTitle: 'தொட்டி நிறையும் வரை தண்ணீர் பம்ப் செய்தல்',
    metaphor:
      'A woman operates a hand pump to fill a water tank. She continually pumps as long as the water level is less than the capacity (waterLevel < 5). Each pump stroke adds water (waterLevel++). When the tank reaches full capacity (5), pumping stops immediately.',
    tamilMetaphor:
      'ஒரு பெண்மணி கை பம்ப் மூலம் தண்ணீர் தொட்டியை நிரப்புகிறார். தொட்டி நிறையும் வரை (waterLevel < 5) தொடர்ந்து பம்ப் செய்கிறார். ஒவ்வொரு முறை அடிக்கும் போதும் நீர் மட்டம் உயர்கிறது (waterLevel++). தொட்டி நிறைந்ததும் பம்ப் செய்வதை நிறுத்துகிறார்.',
    syntaxBreakdown: [
      {
        label: 'start (தொடக்க மதிப்பு)',
        tamilLabel: 'ஆரம்ப நிலை',
        code: 'int waterLevel = 0',
        explanation: 'Tank starts completely empty at level 0',
      },
      {
        label: 'condition (நிபந்தனை)',
        tamilLabel: 'தொடர்வதற்கான நிபந்தனை',
        code: 'while (waterLevel < 5)',
        explanation: 'Repeat pumping while the tank is not yet full',
      },
      {
        label: 'update (அதிகரிப்பு)',
        tamilLabel: 'மட்டம் உயருதல்',
        code: 'waterLevel++',
        explanation: 'Each pump stroke increases water level by 1',
      },
    ],
    whenToUse: 'Use when repeating depends on an external or dynamic condition rather than a fixed known count.',
    tamilWhenToUse: 'செயல் ஒரு குறிப்பிட்ட நிபந்தனை உண்மையாக இருக்கும் வரை தொடர்ந்து நடக்க வேண்டும் போது பயன்படுத்தவும்.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        int waterLevel = 0;
        while (waterLevel < 5) {
            System.out.println("Pump water");
            waterLevel++;
        }
        System.out.println("Tank is full! (Total: " + waterLevel + ")");
    }
}`,
    explanationPoints: [
      'Evaluates the condition BEFORE entering the loop body each time.',
      'If the water tank is already full at the start, it will not pump even once.',
      'Increments waterLevel on each cycle until waterLevel < 5 becomes false.',
    ],
    tamilPoints: [
      'ஒவ்வொரு முறையும் லூப் தொடங்கும் முன் நிபந்தனையைச் சோதிக்கும்.',
      'தொட்டி ஏற்கனவே நிறைந்திருந்தால் ஒரு முறை கூட பம்ப் செய்யாது.',
      'ஒவ்வொரு பம்ப் பிறகும் waterLevel 1 உயர்ந்து 5 ஆனதும் நிற்கும்.',
    ],
  },
  {
    id: 'java-do-while-loop',
    title: 'Java Do-While Loop',
    tamilTitle: 'முதலில் ஒரு வாளி தண்ணீர், பின் நிபந்தனை உவமை',
    category: 'loops',
    categoryLabel: 'Loops & Iterations',
    tag: 'Do-While Loop',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    imageUrl: '/visual-learning/java-do-while-loop.jpg',
    imageAlt: 'Java Do-While Loop Real Life Example - Take one bucket first, then check',
    concept: 'Do-While Loop (Exit-Controlled Loop)',
    storyTitle: 'Take One Bucket First, Then Check if More is Needed',
    tamilStoryTitle: 'முதலில் ஒரு வாளி எடுத்துவிட்டு பிறகு மேலும் தேவையா என பார்த்தல்',
    metaphor:
      'A villager draws water from a stone well using a rope bucket. He always draws the first bucket regardless. Only after lifting bucket 1 does he check if more water is needed (bucket <= 3). Because the task must happen at least once, do-while is the natural solution.',
    tamilMetaphor:
      'கிணற்றிலிருந்து தண்ணீர் எடுப்பவர் எப்போதும் முதலில் ஒரு வாளி தண்ணீரை எடுத்துவிடுவார் (do first). அதன் பிறகே மேலும் வாளிகள் தேவையா என நிபந்தனையைச் சோதிப்பார். செயல் குறைந்தபட்சம் ஒரு முறையாவது கட்டாயம் நடக்க வேண்டும் போது Do-While பயன்படுகிறது.',
    syntaxBreakdown: [
      {
        label: '1. do first (முதலில் செய்)',
        tamilLabel: 'முதலில் செயல்',
        code: 'do { ... }',
        explanation: 'Executes the block first without checking condition',
      },
      {
        label: '2. then check condition',
        tamilLabel: 'பின்னர் நிபந்தனை சோதனை',
        code: 'while (bucket <= 3);',
        explanation: 'Inspects if more buckets are needed',
      },
      {
        label: '3. runs at least once',
        tamilLabel: 'ஒரு முறையாவது இயங்கும்',
        code: 'Guaranteed 1 execution',
        explanation: 'Even if condition is initially false, it executes once',
      },
    ],
    whenToUse: 'Use when the work MUST happen at least one time before evaluating the exit condition (e.g. menus, user prompt).',
    tamilWhenToUse: 'நிபந்தனை சரியாக இருந்தாலும் இல்லாவிட்டாலும் செயல் குறைந்தபட்சம் ஒரு முறையாவது நடக்க வேண்டும் போது பயன்படுத்தவும்.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        int bucket = 1;
        do {
            System.out.println("Take bucket " + bucket);
            bucket++;
        } while (bucket <= 3);
        System.out.println("Finished drawing water!");
    }
}`,
    explanationPoints: [
      'The loop body always executes at least once.',
      'Condition is evaluated at the bottom of the loop.',
      'Crucial semicolon ; is required after while (condition);',
    ],
    tamilPoints: [
      'நிபந்தனை தவறாக இருந்தாலும் கூட முதல் முறை கட்டாயம் இயங்கும்.',
      'நிபந்தனை லூப்பின் கடைசியில் சோதிக்கப்படுகிறது.',
      'while(condition); முடிவில் கட்டாயம் semicolon (;) இட வேண்டும்.',
    ],
  },
  {
    id: 'java-switch-case',
    title: 'Java Switch Case',
    tamilTitle: 'ராமு டீ கடை மெனு தேர்வு உவமை',
    category: 'control-flow',
    categoryLabel: 'Control Flow',
    tag: 'Switch Case',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    imageUrl: '/visual-learning/java-switch-case.jpg',
    imageAlt: 'Java Switch Case Real Life Example - Ramu Tea Stall Menu Choice',
    concept: 'Switch Statement (Multi-way Branching)',
    storyTitle: 'Ramu Tea Stall Menu: One Choice From Many',
    tamilStoryTitle: 'ராமு டீ கடை: பல வகைகளில் இருந்து ஒரு விருப்பத்தை தேர்வு செய்தல்',
    metaphor:
      'At Ramu Tea Stall, the chalkboard menu lists options: 1 for Tea, 2 for Coffee, 3 for Milk, and default for Juice. When a customer orders option 2, Ramu directly serves Coffee! The break statement ensures he serves only Coffee and doesn\'t accidentally pour Tea or Milk too.',
    tamilMetaphor:
      'ராமு டீ கடையில் பலகை மெனுவில் 1. டீ, 2. காபி, 3. பால், மற்றவைக்கு ஜூஸ் என உள்ளது. வாடிக்கையாளர் எண் 2 சொன்னதும் உடனே காபி பரிமாறப்படுகிறது! `break` இருப்பதால் சரியானதை மட்டும் கொடுத்துவிட்டு அடுத்ததற்குச் செல்லாமல் நிற்கிறது.',
    syntaxBreakdown: [
      {
        label: '1. one value (ஒரு மதிப்பு)',
        tamilLabel: 'தேர்வு எண்',
        code: 'switch (choice)',
        explanation: 'Pass in the single variable to evaluate',
      },
      {
        label: '2. many cases (பல நிலைகள்)',
        tamilLabel: 'மெனு தேர்வுகள்',
        code: 'case 1: ... case 2: ...',
        explanation: 'Each possible matching option is listed',
      },
      {
        label: '3. choose matching & break',
        tamilLabel: 'பொருந்தும் செயல் & பிரேக்',
        code: 'break;',
        explanation: 'Executes the matching case and exits the switch',
      },
    ],
    whenToUse: 'Use when one single value or choice decides one specific action among multiple defined paths.',
    tamilWhenToUse: 'ஒரு மாறியின் மதிப்பை வைத்து பல தேர்வுகளில் இருந்து ஒன்றை மட்டும் தேர்வு செய்ய வேண்டிய போது பயன்படுத்தவும்.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        int choice = 2; // Customer chooses option 2 (Coffee)

        switch (choice) {
            case 1:
                System.out.println("Tea");
                break;
            case 2:
                System.out.println("Coffee");
                break;
            case 3:
                System.out.println("Milk");
                break;
            default:
                System.out.println("Juice");
        }
    }
}`,
    explanationPoints: [
      'Evaluates choice and jumps directly to matching case.',
      'The break keyword prevents fall-through into following cases.',
      'default runs when none of the specified cases match.',
    ],
    tamilPoints: [
      'choice மதிப்பை நேரடியாகப் பொருத்தி அந்த case-க்கு உடனடியாகத் தாவுகிறது.',
      'break கொடுப்பதால் அடுத்தடுத்த case-கள் தேவையின்றி இயங்காமல் தடுக்கப்படுகிறது.',
      'எந்த எண்ணும் பொருந்தவில்லை என்றால் default இயங்கும்.',
    ],
  },
  {
    id: 'java-class-object',
    title: 'Java Class & Object',
    tamilTitle: 'பசு வகை மற்றும் லக்ஷ்மி, பொன்னி பசுக்கள் உவமை',
    category: 'oop',
    categoryLabel: 'Object-Oriented (OOP)',
    tag: 'OOP Class & Object',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    imageUrl: '/visual-learning/java-class-object.jpg',
    imageAlt: 'Java Class and Object Real Life Example - Class Cow with Objects Lakshmi and Ponni',
    concept: 'Classes & Objects (OOP Fundamentals)',
    storyTitle: 'Class is the Design, Object is the Real Thing',
    tamilStoryTitle: 'வகுப்பு (Class) என்பது வரைபடம், பொருள் (Object) என்பது நிஜப் பசு',
    metaphor:
      'A chalkboard in the farm defines the Class "Cow" with properties (name, color, gives milk, 4 legs) and behaviors (sound). This is just a design/blueprint. The farmer actually owns real, breathing cows named "Lakshmi" and "Ponni". Each is an Object created from the Cow Class template!',
    tamilMetaphor:
      'பலகையில் எழுதப்பட்ட பசு பற்றிய விவரக்குறிப்பு (பெயர், நிறம், பால் தரும், 4 கால்கள்) என்பது Class (ப்ளூபிரிண்ட்). ஆனால் தோட்டத்தில் நிற்கும் "லக்ஷ்மி" மற்றும் "பொன்னி" என்பவை நிஜமான பசுக்கள் (Objects). வரைபடத்தை வைத்து உருவான நிஜப் பொருட்களே Objects ஆகும்!',
    syntaxBreakdown: [
      {
        label: 'class -> blueprint',
        tamilLabel: 'Class என்பது மாதிரி வரைபடம்',
        code: 'class Cow { String name; void sound() {...} }',
        explanation: 'Defines the blueprint, attributes, and methods',
      },
      {
        label: 'object -> real instance',
        tamilLabel: 'Object என்பது நிஜ உருவம்',
        code: 'Cow c1 = new Cow();',
        explanation: 'Allocates memory and instantiates a real object',
      },
      {
        label: 'properties -> belong to object',
        tamilLabel: 'பண்புகள் பொருளுக்கு உரியவை',
        code: 'c1.name = "Lakshmi";',
        explanation: 'Specific state assigned to that unique instance',
      },
    ],
    whenToUse: 'Use to model real-world concepts, bundle related state and behavior, and create clean, reusable structures.',
    tamilWhenToUse: 'நிஜ உலகில் உள்ள பொருட்களை மென்பொருளில் உருவகப்படுத்தி, தரவுகளையும் செயல்பாடுகளையும் ஒன்றாக இணைக்கப் பயன்படுத்தவும்.',
    codeSnippet: `class Cow {
    String name;

    void sound() {
        System.out.println(name + " says moo");
    }
}

public class Main {
    public static void main(String[] args) {
        // Create first object: Lakshmi
        Cow c1 = new Cow();
        c1.name = "Lakshmi";
        c1.sound();

        // Create second object: Ponni
        Cow c2 = new Cow();
        c2.name = "Ponni";
        c2.sound();
    }
}`,
    explanationPoints: [
      'class Cow is the blueprint defining what every cow has and does.',
      'new Cow() creates a distinct instance in memory.',
      'c1 and c2 have their own independent copies of variables.',
    ],
    tamilPoints: [
      'class Cow என்பது பசுக்களுக்கான வரைபடம் போன்றது.',
      'new Cow() மூலம் கணினி நினைவகத்தில் நிஜ உருவம் உருவாக்கப்படுகிறது.',
      'லக்ஷ்மி (c1) மற்றும் பொன்னி (c2) இரண்டும் தனித்தனி பண்புகளைக் கொண்டவை.',
    ],
  },
];
