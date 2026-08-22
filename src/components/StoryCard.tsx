import { CharacterAvatar } from './CharacterAvatar';
import SceneVisual from './SceneVisual';
import CodeBlock from './CodeBlock';
import type { StoryScene } from '@/types';

interface StoryCardProps {
  scene: StoryScene;
  active?: boolean;
  index?: number;
}

const speakerMeta: Record<
  'kavi' | 'buddy' | 'narrator',
  { name: string; role: string; align: string; bubble: string; accent: string }
> = {
  kavi: { name: 'Kavi', role: 'Student', align: 'left', bubble: 'bg-white', accent: 'text-bamboo-700' },
  buddy: { name: 'Code Buddy', role: 'AI Guide', align: 'right', bubble: 'bg-golden-50', accent: 'text-golden-700' },
  narrator: { name: 'Narrator', role: 'Story', align: 'center', bubble: 'bg-bamboo-50', accent: 'text-bamboo-700' },
};

export default function StoryCard({ scene, active = true, index = 0 }: StoryCardProps) {
  const meta = speakerMeta[scene.speaker] || speakerMeta.narrator;
  const isKavi = scene.speaker === 'kavi';
  const isBuddy = scene.speaker === 'buddy';
  const isNarrator = scene.speaker === 'narrator';

  return (
    <div
      className={`relative transition-all duration-500 ${
        active ? 'opacity-100' : 'opacity-50 scale-[0.98]'
      }`}
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row ${
          isBuddy ? 'sm:flex-row-reverse' : ''
        } ${isNarrator ? 'justify-center' : ''}`}
      >
        {/* Character */}
        {!isNarrator && (
          <div className={`flex shrink-0 flex-col items-center ${isBuddy ? 'sm:items-end' : 'sm:items-start'}`}>
            <div className={`rounded-3xl bg-gradient-to-b ${isKavi ? 'from-bamboo-100 to-bamboo-50' : 'from-golden-100 to-golden-50'} p-2`}>
              <CharacterAvatar character={scene.speaker as 'kavi' | 'buddy'} emotion={scene.emotion} size={96} />
            </div>
            <p className={`mt-1 text-xs font-bold ${meta.accent}`}>{meta.name}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-ink-400">{meta.role}</p>
          </div>
        )}

        {/* Bubble + visual */}
        <div className={`flex-1 ${isNarrator ? 'max-w-2xl' : ''}`}>
          <div className={`card overflow-hidden p-4 ${active ? 'animate-fade-up' : ''}`}>
            {/* Speech bubble */}
            <div className={`rounded-2xl ${meta.bubble} px-4 py-3`}>
              <p className="font-tamil text-[15px] leading-relaxed text-ink-800">
                {scene.dialogue}
              </p>
            </div>

            {/* Visual */}
            {(scene.visual !== 'code' || scene.code) && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid place-items-center rounded-2xl bg-bamboo-50/60 p-3 min-h-[140px]">
                  <SceneVisual visual={scene.visual} />
                </div>
                {scene.code && (
                  <CodeBlock parts={scene.code} animate={active} />
                )}
                {!scene.code && scene.caption && (
                  <div className="grid place-items-center rounded-2xl bg-golden-50 p-3 text-center">
                    <p className="font-mono text-xs text-golden-700">{scene.caption}</p>
                  </div>
                )}
              </div>
            )}

            {scene.caption && scene.code && (
              <p className="mt-3 text-center font-mono text-xs text-bamboo-600">{scene.caption}</p>
            )}
          </div>
          <p className="mt-1.5 text-center text-[10px] font-medium text-ink-300">
            Scene {index + 1}
          </p>
        </div>
      </div>
    </div>
  );
}
