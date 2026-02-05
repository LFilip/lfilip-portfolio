"use client";

import type { Reminder } from "../types/reminder";
import { ReminderCard } from "./ReminderCard";

interface ReminderListProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onDemo: (id: number) => void;
  onAdd: () => void;
}

export function ReminderList({
  reminders,
  onEdit,
  onDelete,
  onToggle,
  onDemo,
  onAdd,
}: ReminderListProps) {
  // Sort: active first, then by name
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">
          Your Reminders
          <span className="ml-2 text-sm font-normal text-zinc-500">
            ({reminders.filter((r) => r.active).length} active)
          </span>
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      {/* Empty state */}
      {reminders.length === 0 && (
        <div className="text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="text-zinc-300 font-medium mb-1">No reminders yet</h3>
          <p className="text-zinc-500 text-sm mb-4">
            Create your first reminder to get started
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Reminder
          </button>
        </div>
      )}

      {/* Reminder cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sortedReminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
            onDemo={onDemo}
          />
        ))}
      </div>
    </div>
  );
}
