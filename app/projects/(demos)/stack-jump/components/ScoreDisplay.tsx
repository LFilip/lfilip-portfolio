interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export function ScoreDisplay({ score, highScore }: ScoreDisplayProps) {
  return (
    <div className="flex gap-6 mb-4 text-sm">
      <div className="text-zinc-400">
        Score: <span className="text-emerald-400 font-bold">{score}</span>
      </div>
      <div className="text-zinc-400">
        Best: <span className="text-yellow-400 font-bold">{highScore}</span>
      </div>
    </div>
  );
}
