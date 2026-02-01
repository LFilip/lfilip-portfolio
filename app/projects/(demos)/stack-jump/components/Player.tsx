import { PLAYER_SIZE } from "../constants/game";

interface PlayerProps {
  x: number;
  y: number;
  isHolding: boolean;
  gameOver: boolean;
}

export function Player({ x, y, isHolding, gameOver }: PlayerProps) {
  const emoji = gameOver ? "😵" : isHolding ? "😤" : "🧍";

  return (
    <div
      className={`absolute text-2xl transition-transform ${isHolding ? "scale-110" : ""}`}
      style={{
        left: x,
        top: y,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      }}
    >
      {emoji}
    </div>
  );
}
