"use client";

import type { Reminder, ReminderLog } from "../types/reminder";

interface StatsDisplayProps {
  reminders: Reminder[];
  history: ReminderLog[];
}

export function StatsDisplay({ reminders, history }: StatsDisplayProps) {
  // Calculate stats
  const activeReminders = reminders.filter((r) => r.active);
  const totalStreak = reminders.reduce((sum, r) => sum + r.streak, 0);
  const bestStreak = Math.max(...reminders.map((r) => r.streak), 0);

  const confirmedCount = history.filter((h) => h.status === "confirmed").length;
  const expiredCount = history.filter((h) => h.status === "expired").length;
  const totalLogs = confirmedCount + expiredCount;
  const complianceRate = totalLogs > 0 ? Math.round((confirmedCount / totalLogs) * 100) : 100;

  // Get last 7 days of history for mini heatmap
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    date.setHours(0, 0, 0, 0);
    const dayStart = date.getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    const dayLogs = history.filter((h) => {
      const logTime = new Date(h.scheduledFor).getTime();
      return logTime >= dayStart && logTime < dayEnd;
    });

    const confirmed = dayLogs.filter((h) => h.status === "confirmed").length;
    const expired = dayLogs.filter((h) => h.status === "expired").length;

    return {
      date,
      confirmed,
      expired,
      total: confirmed + expired,
    };
  });

  const getStreakEmoji = (streak: number): string => {
    if (streak >= 30) return "🔥";
    if (streak >= 14) return "⭐";
    if (streak >= 7) return "✨";
    return "";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-zinc-100">Stats</h2>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Active reminders */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Active</div>
          <div className="text-2xl font-bold text-zinc-100">{activeReminders.length}</div>
          <div className="text-zinc-600 text-xs">reminders</div>
        </div>

        {/* Best streak */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Best Streak</div>
          <div className="text-2xl font-bold text-emerald-400">
            {bestStreak} {getStreakEmoji(bestStreak)}
          </div>
          <div className="text-zinc-600 text-xs">days</div>
        </div>

        {/* Compliance rate */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Compliance</div>
          <div
            className={`text-2xl font-bold ${complianceRate >= 80 ? "text-emerald-400" : complianceRate >= 50 ? "text-yellow-400" : "text-red-400"}`}
          >
            {complianceRate}%
          </div>
          <div className="text-zinc-600 text-xs">
            {confirmedCount}/{totalLogs} confirmed
          </div>
        </div>

        {/* Total confirmations */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Total</div>
          <div className="text-2xl font-bold text-zinc-100">{confirmedCount}</div>
          <div className="text-zinc-600 text-xs">confirmations</div>
        </div>
      </div>

      {/* 7-day activity */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <h3 className="text-sm font-medium text-zinc-300 mb-3">Last 7 Days</h3>
        <div className="flex gap-1.5">
          {last7Days.map((day, i) => {
            const intensity =
              day.total === 0
                ? 0
                : day.expired > day.confirmed
                  ? -1
                  : Math.min(day.confirmed, 4);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`
                    w-full aspect-square rounded-md transition-colors
                    ${
                      intensity === 0
                        ? "bg-zinc-800"
                        : intensity === -1
                          ? "bg-red-900/50"
                          : intensity === 1
                            ? "bg-emerald-900/50"
                            : intensity === 2
                              ? "bg-emerald-800"
                              : intensity === 3
                                ? "bg-emerald-700"
                                : "bg-emerald-600"
                    }
                  `}
                  title={`${day.date.toLocaleDateString()}: ${day.confirmed} confirmed, ${day.expired} expired`}
                />
                <span className="text-zinc-600 text-[10px]">
                  {day.date.toLocaleDateString(undefined, { weekday: "narrow" })}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-zinc-800" />
            <span>None</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-700" />
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-900/50" />
            <span>Missed</span>
          </div>
        </div>
      </div>

      {/* Per-reminder streaks */}
      {reminders.length > 0 && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Streaks by Reminder</h3>
          <div className="space-y-2">
            {reminders
              .filter((r) => r.active)
              .sort((a, b) => b.streak - a.streak)
              .map((reminder) => (
                <div key={reminder.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-zinc-200 truncate">{reminder.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min((reminder.streak / 30) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-emerald-400 font-medium text-sm w-8 text-right">
                      {reminder.streak}
                    </span>
                    <span className="w-4">{getStreakEmoji(reminder.streak)}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
