import { useState } from 'react';
import { X, Play, Video, Sparkles, Film, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoSrc?: string;
}

const availableVideos = [
  {
    id: '1',
    title: 'C Programming Introduction & Story (தமிழ்)',
    tamilTitle: 'சி புரோகிராமிங் கதை மற்றும் அடிப்படை கருத்துகள்',
    duration: '2:15',
    src: '/videos/lesson1.mp4',
  },
  {
    id: '2',
    title: 'C Programming Educational Concept (தமிழ்)',
    tamilTitle: 'Variables மற்றும் நினைவக பெட்டி உவமை பாடங்கள்',
    duration: '2:30',
    src: '/videos/lesson2.mp4',
  },
];

export default function VideoModal({
  isOpen,
  onClose,
  title = 'C Programming Video Lesson 🎬',
  videoSrc,
}: VideoModalProps) {
  const [activeVideo, setActiveVideo] = useState(availableVideos[0]);
  const currentSrc = videoSrc || activeVideo.src;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-4xl rounded-3xl bg-white dark:bg-ink-900 overflow-hidden shadow-2xl border border-bamboo-200 dark:border-bamboo-800 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-bamboo-100 dark:border-bamboo-800 px-6 py-4 bg-gradient-to-r from-bamboo-600 to-emerald-700 text-white">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 text-white">
              <Video className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="font-tamil text-xs text-bamboo-100">C Programming தமிழ் வீடியோ பாடம்</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* HTML5 Direct Video Player Container */}
          <div className="rounded-2xl overflow-hidden bg-black aspect-video relative shadow-lg border border-bamboo-800 flex items-center justify-center">
            <video
              key={currentSrc}
              controls
              autoPlay
              className="w-full h-full object-contain"
              src={currentSrc}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Active Video Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bamboo-50 dark:bg-ink-950 p-4 rounded-2xl border border-bamboo-100 dark:border-bamboo-800">
            <div>
              <span className="chip bg-bamboo-100 text-bamboo-800 text-[10px] font-bold dark:bg-bamboo-950 dark:text-bamboo-300">
                Playing Gemini MP4 Video 🎬
              </span>
              <h4 className="font-display text-base font-bold text-bamboo-950 dark:text-white mt-1">
                {activeVideo.title}
              </h4>
              <p className="font-tamil text-xs text-bamboo-700 dark:text-bamboo-300">
                {activeVideo.tamilTitle}
              </p>
            </div>
            <span className="text-xs font-bold text-ink-500 bg-white dark:bg-ink-900 px-3 py-1.5 rounded-xl border border-bamboo-100 dark:border-bamboo-800 self-start sm:self-auto">
              ⏱ Duration: {activeVideo.duration}
            </span>
          </div>

          {/* Video Playlist Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500">
              Select Gemini Video Lesson / வீடியோவைத் தேர்வு செய்க:
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {availableVideos.map((v) => {
                const isActive = v.id === activeVideo.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveVideo(v)}
                    className={`flex items-center justify-between text-left rounded-2xl border transition-all p-4 ${
                      isActive
                        ? 'border-bamboo-600 bg-bamboo-50/80 dark:bg-ink-800 dark:border-bamboo-500 ring-2 ring-bamboo-400'
                        : 'border-bamboo-100 dark:border-bamboo-800 bg-white dark:bg-ink-900 hover:border-bamboo-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid h-10 w-10 place-items-center rounded-xl font-bold text-sm ${isActive ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700 dark:bg-ink-800 dark:text-bamboo-300'}`}>
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      </span>
                      <div>
                        <p className="font-display text-xs font-bold text-bamboo-950 dark:text-white">
                          {v.title}
                        </p>
                        <p className="font-tamil text-[10px] text-ink-500">
                          {v.tamilTitle}
                        </p>
                      </div>
                    </div>
                    {isActive && <CheckCircle2 className="h-5 w-5 text-bamboo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
