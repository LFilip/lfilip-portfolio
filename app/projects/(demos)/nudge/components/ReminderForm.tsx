"use client";

import { useState, useEffect } from "react";
import type { Reminder } from "../types/reminder";
import { DaySelector } from "./DaySelector";
import { TimeInput } from "./TimeInput";

interface ReminderFormProps {
  reminder?: Reminder | null;
  onSave: (data: Omit<Reminder, "id" | "streak" | "lastConfirmed" | "createdAt">) => void;
  onCancel: () => void;
}

export function ReminderForm({ reminder, onSave, onCancel }: ReminderFormProps) {
  const [name, setName] = useState(reminder?.name || "");
  const [description, setDescription] = useState(reminder?.description || "");
  const [scheduleTime, setScheduleTime] = useState(reminder?.scheduleTime || "09:00");
  const [scheduleDays, setScheduleDays] = useState<number[]>(
    reminder?.scheduleDays || [1, 2, 3, 4, 5]
  );
  const [escalationMinutes, setEscalationMinutes] = useState(reminder?.escalationMinutes || 15);
  const [maxEscalations, setMaxEscalations] = useState(reminder?.maxEscalations || 3);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isEditing = !!reminder;
  const canSubmit = name.trim().length > 0 && scheduleDays.length > 0;

  useEffect(() => {
    if (reminder) {
      // Sync form state from props when editing an existing reminder
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(reminder.name);
      setDescription(reminder.description);
      setScheduleTime(reminder.scheduleTime);
      setScheduleDays(reminder.scheduleDays);
      setEscalationMinutes(reminder.escalationMinutes);
      setMaxEscalations(reminder.maxEscalations);
    }
  }, [reminder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      scheduleTime,
      scheduleDays,
      escalationMinutes,
      maxEscalations,
      active: reminder?.active ?? true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
          Reminder name *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Take medication"
          className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          autoFocus
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-1.5">
          Description (optional)
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Take with food"
          className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Time */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Time</label>
        <TimeInput value={scheduleTime} onChange={setScheduleTime} />
      </div>

      {/* Days */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Days</label>
        <DaySelector selectedDays={scheduleDays} onChange={setScheduleDays} />
        {scheduleDays.length === 0 && (
          <p className="text-red-400 text-xs mt-1">Select at least one day</p>
        )}
      </div>

      {/* Advanced settings toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Advanced settings
      </button>

      {/* Advanced settings */}
      {showAdvanced && (
        <div className="space-y-4 pl-4 border-l-2 border-zinc-800">
          {/* Escalation interval */}
          <div>
            <label
              htmlFor="escalation"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              Escalation interval (minutes)
            </label>
            <select
              id="escalation"
              value={escalationMinutes}
              onChange={(e) => setEscalationMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
            <p className="text-zinc-500 text-xs mt-1">
              Time between reminder escalations
            </p>
          </div>

          {/* Max escalations */}
          <div>
            <label htmlFor="maxEsc" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Maximum escalations
            </label>
            <select
              id="maxEsc"
              value={maxEscalations}
              onChange={(e) => setMaxEscalations(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value={1}>1 (2 total messages)</option>
              <option value={2}>2 (3 total messages)</option>
              <option value={3}>3 (4 total messages)</option>
            </select>
            <p className="text-zinc-500 text-xs mt-1">
              How many follow-up reminders before marking as expired
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className={`
            flex-1 px-4 py-2.5 rounded-lg font-medium transition-all
            ${
              canSubmit
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }
          `}
        >
          {isEditing ? "Save Changes" : "Create Reminder"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-lg font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
