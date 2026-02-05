interface GameOverlayProps {
  score: number;
  onRetry: () => void;
}

export function GameOverlay({ score, onRetry }: GameOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
      <div className="text-4xl mb-2">💥</div>
      <div className="text-xl text-red-400 font-bold mb-2">Game Over!</div>
      <div className="text-zinc-400 mb-4">Score: {score}</div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
