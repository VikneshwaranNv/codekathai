import { CharacterAvatar } from './CharacterAvatar';

interface CharacterCardProps {
  character: 'kavi' | 'buddy';
}

const meta = {
  kavi: {
    name: 'Kavi',
    role: 'Beginner Student',
    color: 'bamboo',
    desc: 'A curious learner who asks the questions you would ask. She learns alongside you, one story at a time.',
    traits: ['Curious', 'Friendly', 'Asks why'],
  },
  buddy: {
    name: 'Code Buddy',
    role: 'AI Programming Guide',
    color: 'golden',
    desc: 'Your patient AI mentor. He turns tricky programming ideas into simple Tamil stories and real-life examples.',
    traits: ['Patient', 'Clear', 'Encouraging'],
  },
} as const;

export default function CharacterCard({ character }: CharacterCardProps) {
  const m = meta[character];
  const isBuddy = character === 'buddy';

  return (
    <div
      className={`card relative overflow-hidden p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
        isBuddy ? 'ring-1 ring-golden-200' : 'ring-1 ring-bamboo-200'
      }`}
    >
      <div className={`mx-auto mb-4 w-fit rounded-3xl bg-gradient-to-b ${isBuddy ? 'from-golden-100 to-golden-50' : 'from-bamboo-100 to-bamboo-50'} p-3`}>
        <CharacterAvatar character={character} emotion="happy" size={120} />
      </div>
      <h3 className="font-display text-xl font-semibold text-bamboo-950">{m.name}</h3>
      <p className={`text-xs font-bold uppercase tracking-wider ${isBuddy ? 'text-golden-600' : 'text-bamboo-600'}`}>
        {m.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{m.desc}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {m.traits.map((t) => (
          <span
            key={t}
            className={`chip ${isBuddy ? 'bg-golden-100 text-golden-700' : 'bg-bamboo-100 text-bamboo-700'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
