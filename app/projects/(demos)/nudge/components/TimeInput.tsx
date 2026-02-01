"use client";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TimeInput({ value, onChange, disabled }: TimeInputProps) {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        w-full px-3 py-2 rounded-lg
        bg-zinc-800 border border-zinc-700
        text-zinc-100 text-sm
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        [&::-webkit-calendar-picker-indicator]:filter
        [&::-webkit-calendar-picker-indicator]:invert
      `}
      aria-label="Select time"
    />
  );
}
