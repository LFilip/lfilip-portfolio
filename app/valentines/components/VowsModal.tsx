import OrnateCorner from "./OrnateCorner";

interface VowsModalProps {
  title: string;
  content: string;
  emoji: string;
  onClose: () => void;
}

export default function VowsModal({ title, content, emoji, onClose }: VowsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vows-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

      {/* Modal content */}
      <div
        className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-purple-600/60 rounded-lg p-8 md:p-10 max-w-lg w-full animate-fade-in cursor-pointer max-h-[85vh] overflow-y-auto"
        style={{
          boxShadow: "0 0 60px rgba(126, 34, 206, 0.4), 0 0 120px rgba(236, 72, 153, 0.15)",
        }}
      >
        {/* Ornate corners */}
        <OrnateCorner position="top-left" />
        <OrnateCorner position="top-right" />
        <OrnateCorner position="bottom-left" />
        <OrnateCorner position="bottom-right" />

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-purple-400 transition-colors z-10"
          aria-label="Close vows"
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
        <div className="relative z-10 text-center space-y-6">
          <div className="text-4xl mb-2">{emoji}</div>

          {/* Title with decorative elements */}
          <div className="space-y-3">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
            <h2
              id="vows-title"
              className="text-3xl font-serif text-purple-300 tracking-wide"
            >
              {title}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
          </div>

          {/* Vows content */}
          <div className="py-4">
            <p className="text-zinc-200 leading-loose text-lg font-light italic">
              &ldquo;{content}&rdquo;
            </p>
          </div>

          {/* Decorative bottom flourish */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <span className="text-purple-500/50">✦</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-600/50 to-transparent" />
            <span className="text-pink-400">💜</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-600/50 to-transparent" />
            <span className="text-purple-500/50">✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
