interface WaxSealProps {
  onClick: () => void;
}

export default function WaxSeal({ onClick }: WaxSealProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open envelope"
      className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse cursor-pointer border-2 border-purple-950"
      style={{
        boxShadow:
          "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.5)",
      }}
    >
      {/* Embossed heart icon */}
      <svg
        className="absolute inset-0 m-auto w-10 h-10 text-purple-950 opacity-80"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {/* Highlight effect */}
      <div
        className="absolute top-2 left-3 w-4 h-2 bg-white/20 rounded-full blur-sm"
        aria-hidden="true"
      />
    </button>
  );
}
