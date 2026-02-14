interface FloatingHeartsProps {
  active: boolean;
}

const EMOJIS = ["💜", "💕", "✨", "💖", "🤍", "💗", "🦇", "💜", "✨", "💕", "💖", "🤍", "💗", "✨", "💜", "💕", "💖", "🤍", "💗", "✨", "💜", "💕", "💖", "🤍", "💗"];

export default function FloatingHearts({ active }: FloatingHeartsProps) {
  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="floating-hearts"
    >
      {EMOJIS.map((emoji, i) => {
        const left = Math.round((i / EMOJIS.length) * 100 + ((i * 7) % 10) - 5);
        const duration = 3 + (i % 5);
        const delay = (i * 0.12) % 3;
        const size = 1.2 + (i % 4) * 0.4;

        return (
          <span
            key={i}
            className="absolute bottom-0 animate-float-up"
            style={{
              left: `${left}%`,
              fontSize: `${size}rem`,
              "--float-duration": `${duration}s`,
              "--float-delay": `${delay}s`,
            } as React.CSSProperties}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}
