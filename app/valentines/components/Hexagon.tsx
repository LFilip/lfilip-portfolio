import { HexContent } from "../data/memories";

export type ColorVariant = "purple" | "emerald" | "red" | "darkPurple" | "darkEmerald";

interface HexagonProps {
  content: HexContent;
  isRevealed: boolean;
  colorVariant: ColorVariant;
  onClick: () => void;
  index: number;
}

// Unclicked: darker/muted colors
const unclickedStyles: Record<ColorVariant, { fill: string; border: string; glow: string }> = {
  purple: {
    fill: "bg-purple-950/80",
    border: "border-purple-800/30",
    glow: "hover:shadow-purple-500/20",
  },
  darkPurple: {
    fill: "bg-purple-950/70",
    border: "border-purple-900/30",
    glow: "hover:shadow-purple-500/20",
  },
  emerald: {
    fill: "bg-emerald-950/80",
    border: "border-emerald-800/30",
    glow: "hover:shadow-emerald-500/20",
  },
  darkEmerald: {
    fill: "bg-emerald-950/70",
    border: "border-emerald-900/30",
    glow: "hover:shadow-emerald-500/20",
  },
  red: {
    fill: "bg-red-950/70",
    border: "border-red-900/30",
    glow: "hover:shadow-red-500/20",
  },
};

// Clicked/Revealed: brighter colors with golden/purple glow
const revealedStyles: Record<ColorVariant, { fill: string; border: string; glow: string }> = {
  purple: {
    fill: "bg-purple-900",
    border: "border-purple-500/70",
    glow: "shadow-purple-500/40 shadow-lg",
  },
  darkPurple: {
    fill: "bg-purple-900",
    border: "border-purple-500/70",
    glow: "shadow-purple-500/40 shadow-lg",
  },
  emerald: {
    fill: "bg-emerald-900",
    border: "border-emerald-500/70",
    glow: "shadow-emerald-500/40 shadow-lg",
  },
  darkEmerald: {
    fill: "bg-emerald-900",
    border: "border-emerald-500/70",
    glow: "shadow-emerald-500/40 shadow-lg",
  },
  red: {
    fill: "bg-red-900",
    border: "border-red-500/70",
    glow: "shadow-red-500/40 shadow-lg",
  },
};

export default function Hexagon({ content, isRevealed, colorVariant, onClick, index }: HexagonProps) {
  const colors = isRevealed ? revealedStyles[colorVariant] : unclickedStyles[colorVariant];

  const getEmoji = (): string => {
    switch (content.type) {
      case "heart":
        return "💜";
      case "emoji":
        return content.emoji;
      case "memory":
        return content.emoji;
      case "vows":
        return content.emoji;
      case "milestone":
        return content.emoji;
      case "video":
        return content.emoji;
      case "note":
        return content.emoji;
    }
  };

  const renderContent = () => {
    if (!isRevealed) {
      return (
        <span className="text-zinc-600 text-2xl md:text-xl animate-pulse">?</span>
      );
    }
    return <span className="text-3xl md:text-2xl">{getEmoji()}</span>;
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative w-24 h-28 md:w-20 md:h-[92px] flex items-center justify-center
        transition-all duration-300 cursor-pointer
        hover:scale-110 ${colors.glow} hover:shadow-lg
        ${!isRevealed ? "animate-subtle-pulse" : ""}
      `}
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        animationDelay: `${index * 50}ms`,
      }}
      aria-label={isRevealed ? getAriaLabel(content) : "Hidden hexagon, click to reveal"}
      data-testid={`hexagon-${index}`}
    >
      {/* Background fill */}
      <div
        className={`absolute inset-0 ${colors.fill} transition-colors duration-300`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />

      {/* Border effect */}
      <div
        className={`absolute inset-[2px] border-2 ${colors.border} transition-colors duration-300`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />

      {/* Revealed indicator - small checkmark in corner */}
      {isRevealed && (
        <div className="absolute top-1 right-2 z-20">
          <span className="text-xs text-purple-400/70">✓</span>
        </div>
      )}

      {/* Content with flip animation */}
      <div
        className={`relative z-10 transition-transform duration-500 ${
          isRevealed ? "scale-100" : "scale-90"
        }`}
        style={{
          transform: isRevealed ? "rotateY(0deg)" : "rotateY(180deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {renderContent()}
      </div>
    </button>
  );
}

function getAriaLabel(content: HexContent): string {
  switch (content.type) {
    case "heart":
      return "Heart";
    case "emoji":
      return `Emoji: ${content.emoji}`;
    case "memory":
      return `Memory: ${content.title}`;
    case "vows":
      return `Wedding Vows: ${content.title}`;
    case "milestone":
      return `Milestone: ${content.label}`;
    case "video":
      return `Video: ${content.title}`;
    case "note":
      return "Love Note";
  }
}
