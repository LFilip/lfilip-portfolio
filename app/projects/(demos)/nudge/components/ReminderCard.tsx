"use client";

import type { Reminder } from "../types/reminder";
import { formatTime, getDayName, getRelativeTime } from "../data/mockData";

interface ReminderCardProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onDemo: (id: number) => void;
}

export function ReminderCard({ reminder, onEdit, onDelete, onToggle, onDemo }: ReminderCardProps) {
  const streakEmoji = reminder.streak >= 30 ? "🔥" : reminder.streak >= 7 ? "✨" : "";

  return (
    <div
      className={`
        bg-zinc-900 rounded-xl border transition-all
        ${reminder.active ? "border-zinc-800" : "border-zinc-800/50 opacity-60"}
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-zinc-100 font-medium truncate">{reminder.name}</h3>
            {!reminder.active && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-zinc-800 text-zinc-500">
                Paused
              </span>
            )}
          </div>
          {reminder.description && (
            <p className="text-zinc-500 text-sm mt-0.5 truncate">{reminder.description}</p>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => onToggle(reminder.id)}
          className={`
            relative w-10 h-6 rounded-full transition-colors
            ${reminder.active ? "bg-emerald-600" : "bg-zinc-700"}
          `}
          aria-label={reminder.active ? "Pause reminder" : "Activate reminder"}
        >
          <span
            className={`
              absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
              ${reminder.active ? "left-5" : "left-1"}
            `}
          />
        </button>
      </div>

      {/* Schedule info */}
      <div className="px-4 pb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formatTime(reminder.scheduleTime)}</span>
        </div>

        <div className="flex items-center gap-1 text-zinc-500">
          {reminder.scheduleDays.map((day) => (
            <span key={day} className="text-xs">
              {getDayName(day)}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-3 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">Streak:</span>
          <span className="text-emerald-400 font-medium">
            {reminder.streak} {streakEmoji}
          </span>
        </div>

        {reminder.lastConfirmed && (
          <div className="text-zinc-500">
            Last: {getRelativeTime(reminder.lastConfirmed)}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          onClick={() => onDemo(reminder.id)}
          disabled={!reminder.active}
          className={`
            flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${
              reminder.active
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }
          `}
        >
          Try Demo
        </button>

        <button
          onClick={() => onEdit(reminder)}
          className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
          aria-label="Edit reminder"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={() => onDelete(reminder.id)}
          className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors"
          aria-label="Delete reminder"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
