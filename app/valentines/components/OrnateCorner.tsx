interface OrnateCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const rotationMap = {
  "top-left": "rotate-0",
  "top-right": "rotate-90",
  "bottom-right": "rotate-180",
  "bottom-left": "-rotate-90",
};

const positionMap = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export default function OrnateCorner({ position }: OrnateCornerProps) {
  return (
    <svg
      className={`absolute w-16 h-16 text-purple-800 ${rotationMap[position]} ${positionMap[position]}`}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      data-testid={`ornate-corner-${position}`}
    >
      {/* Victorian flourish corner design */}
      <path d="M0 0 Q50 0 50 50 Q50 30 30 30 Q30 50 0 50 Z" opacity="0.8" />
      <path d="M5 5 Q40 5 40 40 Q40 25 25 25 Q25 40 5 40 Z" opacity="0.6" />
      <circle cx="15" cy="15" r="3" opacity="0.7" />
      <circle cx="8" cy="8" r="2" opacity="0.5" />
      {/* Decorative swirl */}
      <path
        d="M45 5 Q55 15 45 25 Q35 35 25 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M5 45 Q15 55 25 45 Q35 35 25 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}
