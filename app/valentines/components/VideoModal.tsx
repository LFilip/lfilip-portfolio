import OrnateCorner from "./OrnateCorner";

interface VideoModalProps {
  videoId: string;
  title: string;
  emoji: string;
  onClose: () => void;
}

export default function VideoModal({ videoId, title, emoji, onClose }: VideoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

      {/* Modal content */}
      <div
        className="relative bg-zinc-900 border-2 border-purple-700/50 rounded-lg p-6 max-w-2xl w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 0 40px rgba(126, 34, 206, 0.3), 0 0 80px rgba(16, 185, 129, 0.1)",
        }}
      >
        {/* Ornate corners */}
        <OrnateCorner position="top-left" />
        <OrnateCorner position="top-right" />
        <OrnateCorner position="bottom-left" />
        <OrnateCorner position="bottom-right" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-purple-400 transition-colors z-10"
          aria-label="Close video"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="text-center">
            <span className="text-3xl">{emoji}</span>
            <h2
              id="video-title"
              className="text-xl font-serif text-purple-400 mt-2"
            >
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-700 to-transparent mx-auto mt-2" />
          </div>

          {/* YouTube embed */}
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
