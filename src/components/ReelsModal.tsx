import { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Upload,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Heart,
  MessageCircle,
  Gauge,
  Send,
} from 'lucide-react';

export interface ReelComment {
  id: string;
  userName: string;
  text: string;
  timeAgo: string;
}

export interface ReelVideo {
  id: string;
  title: string;
  tamilHeading: string;
  teachesDescription: string;
  src: string;
  duration?: string;
  topicTag: string;
  likes: number;
  isLiked?: boolean;
  comments: ReelComment[];
}

interface ReelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 4 Curated Gemini MP4 Videos (Starting clean with 0 Likes & 0 Comments)
const defaultReels: ReelVideo[] = [
  {
    id: 'reel-1',
    title: 'Lesson 1: C Programming & Story Concept',
    tamilHeading: 'பாடம் 1: C நிரலாக்க அறிமுகம் & கதை உவமை',
    teachesDescription: 'C programming அடிப்படை மற்றும் கவி - Code Buddy கதாபாத்திரங்கள் வழியாக நிரலாக்க சிந்தனையை கற்பிக்கிறது.',
    src: '/videos/lesson1.mp4',
    topicTag: '🌱 Beginner Intro',
    likes: 0,
    isLiked: false,
    comments: [],
  },
  {
    id: 'reel-2',
    title: 'Lesson 2: Variables & Memory Box Storage',
    tamilHeading: 'பாடம் 2: Variables மற்றும் நினைவக பெட்டிகள்',
    teachesDescription: 'நினைவகத்தில் தரவுகளை எவ்வாறு சேமிப்பது (int, float, char) என்பதை எளிய உவமையுடன் கற்பிக்கிறது.',
    src: '/videos/lesson2.mp4',
    topicTag: '📦 Memory & Variables',
    likes: 0,
    isLiked: false,
    comments: [],
  },
  {
    id: 'reel-3',
    title: 'Lesson 3: Cinematic C Coding Story - Part 1',
    tamilHeading: 'பாடம் 3: சி சினிமாட்டிக் கதை காட்சியமைப்பு - பகுதி 1',
    teachesDescription: 'C மொழி நிரலாக்கக் கருத்துகளைக் சினிமாட்டிக் அனிமேஷன் மற்றும் ஒலி விளைவுகளுடன் கற்பிக்கிறது.',
    src: '/videos/lesson3.mp4',
    topicTag: '🎬 Cinematic Story 1',
    likes: 0,
    isLiked: false,
    comments: [],
  },
  {
    id: 'reel-4',
    title: 'Lesson 4: Cinematic C Coding Story - Part 2',
    tamilHeading: 'பாடம் 4: சி சினிமாட்டிக் கதை காட்சியமைப்பு - பகுதி 2',
    teachesDescription: 'C மொழி நிரலாக்கத் தர்க்கம், சுழற்சிகள் மற்றும் நிபந்தனைகளைக் காட்சிப்பூர்வமாக கற்பிக்கிறது.',
    src: '/videos/lesson4.mp4',
    topicTag: '✨ Cinematic Story 2',
    likes: 0,
    isLiked: false,
    comments: [],
  },
];

const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

export default function ReelsModal({ isOpen, onClose }: ReelsModalProps) {
  const [reels, setReels] = useState<ReelVideo[]>(defaultReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentReel = reels[currentIndex] || reels[0];

  // Auto-play immediately when modal opens or index changes!
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackSpeed;
      setIsPlaying(true);

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            // Ignore AbortError when interrupted by new video load
            if (err?.name === 'AbortError' || err?.message?.includes('interrupted')) {
              return;
            }
            // If browser requires user interaction for sound, mute and auto-play
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          });
      }
    }
  }, [isOpen, currentIndex, currentReel?.src]);

  if (!isOpen) return null;

  const handleNext = () => {
    setShowComments(false);
    setShowSpeedMenu(false);
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setShowComments(false);
    setShowSpeedMenu(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleVideoEnded = () => {
    handleNext();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgressPercent(p);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  // Toggle Like Handler
  const handleToggleLike = () => {
    setReels((prev) =>
      prev.map((r, i) => {
        if (i === currentIndex) {
          const newIsLiked = !r.isLiked;
          return {
            ...r,
            isLiked: newIsLiked,
            likes: newIsLiked ? r.likes + 1 : Math.max(0, r.likes - 1),
          };
        }
        return r;
      })
    );
  };

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;

    const newComment: ReelComment = {
      id: 'c-' + Date.now(),
      userName: 'You (Learner)',
      text: newCommentInput.trim(),
      timeAgo: 'Just now',
    };

    setReels((prev) =>
      prev.map((r, i) => {
        if (i === currentIndex) {
          return {
            ...r,
            comments: [newComment, ...r.comments],
          };
        }
        return r;
      })
    );

    setNewCommentInput('');
  };

  // Upload Video File Handler (Starts with 0 Likes and 0 Comments)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const blobUrl = URL.createObjectURL(file);
    const customTitle = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');

    const newReel: ReelVideo = {
      id: 'custom-' + Date.now(),
      title: `Uploaded Video: ${customTitle}`,
      tamilHeading: `புதிய Gemini வீடியோ: ${customTitle}`,
      teachesDescription: 'பயனரால் பதிவேற்றப்பட்ட Gemini C Programming வீடியோ பாடம்.',
      src: blobUrl,
      topicTag: '✨ Custom Upload',
      likes: 0,
      isLiked: false,
      comments: [],
    };

    setReels((prev) => [newReel, ...prev]);
    setCurrentIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-2 sm:p-4 animate-fade-in font-sans">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Reels Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[88vh] max-h-[720px] rounded-3xl overflow-hidden shadow-2xl bg-black border border-bamboo-800 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent text-white">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-bamboo-600 text-white font-bold text-xs shadow-md">
              🎬
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-none">Learning Through Reels</p>
              <p className="text-[10px] text-bamboo-300 font-bold uppercase tracking-wider">
                Video {currentIndex + 1} of {reels.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Selector Button */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all"
                title="Playback Speed"
              >
                <Gauge className="h-3.5 w-3.5" /> {playbackSpeed}x
              </button>

              {/* Speed Menu Popup */}
              {showSpeedMenu && (
                <div className="absolute right-0 top-full mt-2 w-28 rounded-2xl bg-ink-900 border border-bamboo-700 p-1.5 shadow-2xl z-40 text-xs font-bold space-y-1 animate-fade-in">
                  {speedOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl transition-all ${
                        s === playbackSpeed
                          ? 'bg-bamboo-600 text-white font-extrabold'
                          : 'text-ink-300 hover:bg-ink-800 hover:text-white'
                      }`}
                    >
                      {s}x {s === 1.0 && '(Normal)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Video Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-bamboo-600 text-white hover:bg-bamboo-700 text-xs font-bold border border-bamboo-500 transition-all"
              title="Upload Gemini MP4 Video"
            >
              <Upload className="h-3.5 w-3.5" /> Upload
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-all"
              aria-label="Close reels"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Central Video Player & Touch Click Area */}
        <div
          onClick={togglePlayPause}
          className="relative flex-1 bg-black flex items-center justify-center cursor-pointer overflow-hidden group"
        >
          <video
            ref={videoRef}
            src={currentReel?.src}
            autoPlay
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            muted={isMuted}
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Pause Overlay Indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 grid place-items-center bg-black/40 animate-fade-in">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-bamboo-600/90 text-white shadow-2xl scale-110">
                <Play className="h-8 w-8 fill-current ml-1" />
              </span>
            </div>
          )}

          {/* Right Floating Reels Action Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4 text-white"
          >
            {/* Like Button & Counter (Starts at 0) */}
            <button
              onClick={handleToggleLike}
              className="flex flex-col items-center gap-1 group"
              title="Like Video"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-full transition-all border ${
                currentReel.isLiked
                  ? 'bg-rose-600 text-white border-rose-500 scale-110 shadow-lg shadow-rose-600/40'
                  : 'bg-black/60 text-white border-white/20 hover:bg-black/90'
              }`}>
                <Heart className={`h-5 w-5 ${currentReel.isLiked ? 'fill-current' : ''}`} />
              </span>
              <span className="text-[11px] font-bold text-white shadow-sm">{currentReel.likes}</span>
            </button>

            {/* Comment Button & Counter (Starts at 0) */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex flex-col items-center gap-1 group"
              title="View Comments"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white border border-white/20 hover:bg-bamboo-600 transition-all">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-bold text-white shadow-sm">{currentReel.comments.length}</span>
            </button>

            {/* Explicit Play / Pause Toggle Button */}
            <button
              onClick={togglePlayPause}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/90 transition-all"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
            </button>

            {/* Mute / Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/90 transition-all"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5 text-emerald-400" />}
            </button>

            {/* Previous Video Button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-bamboo-600 disabled:opacity-30 border border-white/20 transition-all"
              title="Previous Video"
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            {/* Next Video Button */}
            <button
              onClick={handleNext}
              className="grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-bamboo-600 border border-white/20 transition-all animate-pulse"
              title="Next Video (Auto-scrolls on finish)"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Gradient Overlay: Heading & What Video Teaches */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-5 bg-gradient-to-t from-black via-black/85 to-transparent text-white space-y-2 pointer-events-none pr-16">
            
            {/* Topic Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-bamboo-600/90 text-[10px] font-bold text-white border border-bamboo-400/40 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-golden-300" /> {currentReel?.topicTag}
            </span>

            {/* Heading: What the Video Teaches */}
            <div>
              <h3 className="font-display text-base font-bold text-white leading-snug drop-shadow-md">
                {currentReel?.title}
              </h3>
              <p className="font-tamil text-xs font-bold text-bamboo-300 mt-0.5">
                {currentReel?.tamilHeading}
              </p>
            </div>

            {/* Teaches Description Box */}
            <div className="rounded-2xl bg-white/10 p-2.5 backdrop-blur-md border border-white/15 text-[11px] text-bamboo-100/90 leading-relaxed font-tamil">
              <p className="font-bold text-golden-300 text-[10px] mb-0.5 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> என்ன கற்பிக்கிறது (What it teaches):
              </p>
              <p className="line-clamp-2">{currentReel?.teachesDescription}</p>
            </div>

            {/* Video Progress Bar */}
            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden pt-1">
              <div
                className="h-full bg-gradient-to-r from-bamboo-400 to-emerald-400 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

          </div>
        </div>

        {/* Comments Section Drawer Overlay */}
        {showComments && (
          <div className="absolute inset-x-0 bottom-0 z-40 h-[65%] rounded-t-3xl bg-ink-900 border-t border-bamboo-700 p-4 flex flex-col justify-between shadow-2xl animate-slide-up">
            
            {/* Comments Header */}
            <div className="flex items-center justify-between border-b border-bamboo-800 pb-3">
              <div className="flex items-center gap-2 text-white">
                <MessageCircle className="h-4 w-4 text-bamboo-400" />
                <h4 className="font-display text-sm font-bold">Comments ({currentReel.comments.length})</h4>
              </div>
              <button
                onClick={() => setShowComments(false)}
                className="text-ink-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {currentReel.comments.length === 0 ? (
                <div className="text-center text-xs text-ink-400 font-tamil py-8 space-y-1">
                  <p className="font-bold text-bamboo-300 text-sm">இன்னும் கருத்துகள் இல்லை (0 Comments)</p>
                  <p>முதல் கருத்தை கீழே பதிவிடுங்கள்! 💬</p>
                </div>
              ) : (
                currentReel.comments.map((c) => (
                  <div key={c.id} className="rounded-2xl bg-ink-950 p-3 border border-bamboo-900/60 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-bamboo-300">{c.userName}</span>
                      <span className="text-[10px] text-ink-500">{c.timeAgo}</span>
                    </div>
                    <p className="text-xs text-white font-tamil">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-bamboo-800 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment / கருத்து பதிவிடுக..."
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                className="flex-1 rounded-xl border border-bamboo-800 bg-ink-950 px-3 py-2 text-xs font-semibold text-white focus:border-bamboo-600 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-primary py-2 px-3 text-xs font-bold bg-bamboo-600 text-white rounded-xl flex items-center gap-1"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
