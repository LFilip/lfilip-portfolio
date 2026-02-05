import { PLAYER_SIZE, GROUND_Y } from "../constants/game";

interface StackProps {
  isHolding: boolean;
  stackHeight: number;
  holdStartX: number;
}

export function Stack({ isHolding, stackHeight, holdStartX }: StackProps) {
  if (!isHolding || stackHeight <= 0) return null;

  return (
    <div
      className="absolute bg-red-500 opacity-80"
      style={{
        left: holdStartX + PLAYER_SIZE / 2 - 4,
        top: GROUND_Y - stackHeight,
        width: 8,
        height: stackHeight,
        borderRadius: 2,
      }}
    />
  );
}
