interface ControlButtonProps {
  isHolding: boolean;
  gameOver: boolean;
  onStartHold: () => void;
  onReleaseHold: () => void;
  onReset: () => void;
}

export function ControlButton({
  isHolding,
  gameOver,
  onStartHold,
  onReleaseHold,
  onReset,
}: ControlButtonProps) {
  return (
    <button
      onMouseDown={onStartHold}
      onMouseUp={onReleaseHold}
      onMouseLeave={onReleaseHold}
      onTouchStart={(e) => {
        e.preventDefault();
        if (gameOver) {
          onReset();
        } else {
          onStartHold();
        }
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onReleaseHold();
      }}
      disabled={gameOver}
      className={`mt-6 px-8 py-4 rounded-xl text-lg font-bold transition-all select-none ${
        isHolding
          ? "bg-amber-500 text-amber-950 scale-95"
          : "bg-emerald-600 hover:bg-emerald-500 text-white"
      } ${gameOver ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isHolding ? "Building Stack..." : "Hold to Stack!"}
    </button>
  );
}
