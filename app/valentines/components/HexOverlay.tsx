interface HexOverlayProps {
  className?: string;
}

export default function HexOverlay({ className = "" }: HexOverlayProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full opacity-15 pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-testid="hex-overlay"
    >
      <defs>
        <pattern
          id="hexPattern"
          width="12"
          height="10.4"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          {/* Hexagon path - pointy top orientation */}
          <path
            d="M6 0 L12 3 L12 7.4 L6 10.4 L0 7.4 L0 3 Z"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="0.4"
          />
        </pattern>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(126, 34, 206)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(126, 34, 206)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexPattern)" />
    </svg>
  );
}
