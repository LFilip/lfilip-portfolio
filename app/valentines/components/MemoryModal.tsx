import OrnateCorner from "./OrnateCorner";

interface MemoryModalProps {
  title: string;
  description: string;
  emoji: string;
  onClose: () => void;
}

export default function MemoryModal({ title, description, emoji, onClose }: MemoryModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal content - clicking anywhere closes */}
      <div
        className="relative bg-zinc-900 border-2 border-purple-700/50 rounded-lg p-8 max-w-md w-full animate-fade-in cursor-pointer"
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
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-purple-400 transition-colors z-10"
          aria-label="Close memory"
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
        <div className="relative z-10 text-center space-y-4">
          <div className="text-3xl mb-2">{emoji}</div>
          <h2
            id="memory-title"
            className="text-2xl font-serif text-purple-400"
          >
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-700 to-transparent mx-auto" />
          <p className="text-zinc-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
