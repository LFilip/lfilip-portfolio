import type { Platform as PlatformType } from "../types/game";
import { PLATFORM_HEIGHT, GROUND_Y } from "../constants/game";

interface PlatformProps {
  platform: PlatformType;
  index: number;
  currentPlatform: number;
}

export function Platform({ platform, index, currentPlatform }: PlatformProps) {
  const colorClass =
    index === currentPlatform
      ? "bg-emerald-500"
      : index === currentPlatform + 1
        ? "bg-yellow-500"
        : "bg-zinc-600";

  return (
    <div
      className={`absolute transition-colors ${colorClass}`}
      style={{
        left: platform.x,
        top: GROUND_Y,
        width: platform.width,
        height: PLATFORM_HEIGHT,
        borderRadius: 4,
      }}
    />
  );
}
