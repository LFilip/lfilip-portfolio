"use client";

import { getDayName } from "../data/mockData";

interface DaySelectorProps {
  selectedDays: number[];
  onChange: (days: number[]) => void;
  disabled?: boolean;
}

export function DaySelector({ selectedDays, onChange, disabled }: DaySelectorProps) {
  const days = [0, 1, 2, 3, 4, 5, 6]; // Sunday through Saturday

  const toggleDay = (day: number) => {
    if (disabled) return;

    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      onChange([...selectedDays, day].sort());
    }
  };

  return (
    <div className="flex gap-1.5">
      {days.map((day) => {
        const isSelected = selectedDays.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            disabled={disabled}
            className={`
              w-9 h-9 rounded-lg text-xs font-medium transition-all
              ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            aria-label={`${getDayName(day, false)} ${isSelected ? "selected" : "not selected"}`}
            aria-pressed={isSelected}
          >
            {getDayName(day)}
          </button>
        );
      })}
    </div>
  );
}
