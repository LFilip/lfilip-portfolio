"use client";

import { useEffect, useState, useCallback } from "react";
import type { DemoPhase, Reminder } from "../types/reminder";
import { useReminderStore } from "../stores/reminderStore";
import { SMSPreview } from "./SMSPreview";

interface EscalationDemoProps {
  reminder: Reminder;
  onClose: () => void;
}

export function EscalationDemo({ reminder, onClose }: EscalationDemoProps) {
  const {
    demoPhase,
    demoMessages,
    demoConfirmationCode,
    demoEscalationCount,
    startDemo,
    sendEscalation,
    confirmReminder,
    resetDemo,
  } = useReminderStore();

  const [timeRemaining, setTimeRemaining] = useState(reminder.escalationMinutes);
  const [isAutoMode, setIsAutoMode] = useState(false);

  // Start demo on mount
  useEffect(() => {
    startDemo(reminder.id);
    return () => resetDemo();
  }, [reminder.id, startDemo, resetDemo]);

  // Countdown timer
  useEffect(() => {
    if (demoPhase === "confirmed" || demoPhase === "expired" || demoPhase === "idle") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (isAutoMode) {
            sendEscalation();
          }
          return reminder.escalationMinutes;
        }
        return prev - 1;
      });
    }, isAutoMode ? 100 : 1000); // Speed up in auto mode

    return () => clearInterval(interval);
  }, [demoPhase, isAutoMode, reminder.escalationMinutes, sendEscalation]);

  const handleReply = useCallback(
    (code: string) => {
      if (code.toUpperCase() === "SNOOZE") {
        setTimeRemaining(10);
        return;
      }
      confirmReminder(code);
    },
    [confirmReminder]
  );

  const getPhaseLabel = (phase: DemoPhase): string => {
    switch (phase) {
      case "idle":
        return "Starting...";
      case "initial_sms":
        return "Initial Reminder Sent";
      case "waiting_response":
        return "Waiting for Response";
      case "escalation_1":
        return "1st Escalation Sent";
      case "escalation_2":
        return "2nd Escalation Sent";
      case "escalation_3":
        return "Final Warning Sent";
      case "confirmed":
        return "Confirmed!";
      case "expired":
        return "Expired";
      default:
        return "";
    }
  };

  const isDemoActive = demoPhase !== "confirmed" && demoPhase !== "expired" && demoPhase !== "idle";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Demo: {reminder.name}</h2>
            <p className="text-zinc-500 text-sm">See how SMS reminders and escalation work</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Close demo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-300">Escalation Timeline</h3>

              {/* Current phase */}
              <div
                className={`
                p-4 rounded-xl border-2 transition-all
                ${
                  demoPhase === "confirmed"
                    ? "bg-emerald-900/30 border-emerald-600"
                    : demoPhase === "expired"
                      ? "bg-red-900/30 border-red-600"
                      : "bg-zinc-800/50 border-emerald-600/50"
                }
              `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${demoPhase === "confirmed" ? "text-emerald-400" : demoPhase === "expired" ? "text-red-400" : "text-zinc-200"}`}
                  >
                    {getPhaseLabel(demoPhase)}
                  </span>
                  {isDemoActive && (
                    <span className="text-zinc-400 text-sm tabular-nums">
                      {timeRemaining}s
                    </span>
                  )}
                </div>

                {isDemoActive && (
                  <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000"
                      style={{
                        width: `${((reminder.escalationMinutes - timeRemaining) / reminder.escalationMinutes) * 100}%`,
                      }}
                    />
                  </div>
                )}

                <div className="mt-3 text-zinc-500 text-xs">
                  Escalation {demoEscalationCount} of {reminder.maxEscalations}
                </div>
              </div>

              {/* Timeline steps */}
              <div className="space-y-3">
                {[
                  { label: "Initial SMS", time: "T+0" },
                  { label: "1st Escalation", time: `T+${reminder.escalationMinutes}m` },
                  { label: "2nd Escalation", time: `T+${reminder.escalationMinutes * 2}m` },
                  { label: "Final Warning", time: `T+${reminder.escalationMinutes * 3}m` },
                  { label: "Expires", time: `T+${reminder.escalationMinutes * 4}m` },
                ].map((step, index) => {
                  const isCompleted = index <= demoEscalationCount;
                  const isCurrent = index === demoEscalationCount;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                        ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : "bg-zinc-800 text-zinc-500"
                        }
                        ${isCurrent ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-zinc-900" : ""}
                      `}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-sm ${isCompleted ? "text-zinc-200" : "text-zinc-500"}`}
                        >
                          {step.label}
                        </div>
                        <div className="text-zinc-600 text-xs">{step.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                {isDemoActive && (
                  <>
                    <button
                      onClick={sendEscalation}
                      className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm"
                    >
                      Skip to Next Escalation
                    </button>

                    <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAutoMode}
                        onChange={(e) => setIsAutoMode(e.target.checked)}
                        className="rounded border-zinc-600 bg-zinc-800 text-emerald-600 focus:ring-emerald-500"
                      />
                      Auto-advance (10x speed)
                    </label>
                  </>
                )}

                {(demoPhase === "confirmed" || demoPhase === "expired") && (
                  <button
                    onClick={() => startDemo(reminder.id)}
                    className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors text-sm font-medium"
                  >
                    Restart Demo
                  </button>
                )}
              </div>
            </div>

            {/* SMS Preview */}
            <div>
              <h3 className="text-sm font-medium text-zinc-300 mb-4">SMS Conversation</h3>
              <SMSPreview
                messages={demoMessages}
                confirmationCode={demoConfirmationCode}
                onReply={handleReply}
                disabled={demoPhase === "confirmed" || demoPhase === "expired"}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          <p className="text-zinc-500 text-xs text-center">
            Reply with the confirmation code or click the quick reply button to confirm
          </p>
        </div>
      </div>
    </div>
  );
}
