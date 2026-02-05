"use client";

import type { ReminderLog, Reminder } from "../types/reminder";
import { getRelativeTime } from "../data/mockData";

interface HistoryTimelineProps {
  history: ReminderLog[];
  reminders: Reminder[];
}

export function HistoryTimeline({ history, reminders }: HistoryTimelineProps) {
  // Sort by scheduled time, most recent first
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime()
  );

  const getReminderName = (reminderId: number): string => {
    return reminders.find((r) => r.id === reminderId)?.name || "Unknown";
  };

  const getStatusColor = (status: ReminderLog["status"]): string => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-600";
      case "expired":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-zinc-600";
    }
  };

  const getStatusIcon = (status: ReminderLog["status"]): React.ReactNode => {
    switch (status) {
      case "confirmed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "expired":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (sortedHistory.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="text-4xl mb-3">📋</div>
        <h3 className="text-zinc-300 font-medium mb-1">No history yet</h3>
        <p className="text-zinc-500 text-sm">
          Try the demo to see how confirmations are tracked
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100">History</h2>

      <div className="space-y-3">
        {sortedHistory.map((log) => (
          <div
            key={log.id}
            className="flex gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800"
          >
            {/* Status indicator */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0
                ${getStatusColor(log.status)}
              `}
            >
              {getStatusIcon(log.status)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-zinc-100 font-medium">{getReminderName(log.reminderId)}</h3>
                  <p className="text-zinc-500 text-sm">
                    {new Date(log.scheduledFor).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    {" at "}
                    {new Date(log.scheduledFor).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="text-zinc-600 text-xs whitespace-nowrap">
                  {getRelativeTime(log.scheduledFor)}
                </span>
              </div>

              {/* Details */}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <span
                  className={`
                    px-2 py-0.5 rounded-full capitalize
                    ${
                      log.status === "confirmed"
                        ? "bg-emerald-900/50 text-emerald-400"
                        : log.status === "expired"
                          ? "bg-red-900/50 text-red-400"
                          : "bg-yellow-900/50 text-yellow-400"
                    }
                  `}
                >
                  {log.status}
                </span>

                {log.escalationCount > 0 && (
                  <span className="text-zinc-500">
                    {log.escalationCount} escalation{log.escalationCount > 1 ? "s" : ""}
                  </span>
                )}

                {log.confirmedAt && (
                  <span className="text-zinc-500">
                    Confirmed in{" "}
                    {Math.round(
                      (new Date(log.confirmedAt).getTime() - new Date(log.sentAt!).getTime()) /
                        60000
                    )}
                    m
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
