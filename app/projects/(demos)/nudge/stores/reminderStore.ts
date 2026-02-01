"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reminder, ReminderLog, SMSMessage, DemoPhase } from "../types/reminder";
import { mockReminders, mockHistory, generateConfirmationCode } from "../data/mockData";
import { getRandomMessage, formatSassyMessage } from "../data/sassyMessages";

interface ReminderStore {
  // Data
  reminders: Reminder[];
  history: ReminderLog[];

  // Demo state
  demoPhase: DemoPhase;
  demoReminderId: number | null;
  demoLogId: number | null;
  demoMessages: SMSMessage[];
  demoConfirmationCode: string;
  demoEscalationCount: number;

  // CRUD Actions
  addReminder: (reminder: Omit<Reminder, "id" | "streak" | "lastConfirmed" | "createdAt">) => void;
  updateReminder: (id: number, data: Partial<Reminder>) => void;
  deleteReminder: (id: number) => void;
  toggleActive: (id: number) => void;

  // Demo Actions
  startDemo: (reminderId: number) => void;
  sendEscalation: () => void;
  confirmReminder: (code: string) => boolean;
  expireReminder: () => void;
  resetDemo: () => void;
  addDemoMessage: (message: Omit<SMSMessage, "id">) => void;

  // Persistence
  resetToMockData: () => void;
  isHydrated: boolean;
  setHydrated: () => void;
}

// Get next available ID
const getNextId = (items: { id: number }[]): number => {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
};

// Generate SMS message for reminder using sassy messages
const generateReminderSMS = (reminder: Reminder, code: string, escalation: number): string => {
  const sassyMessage = getRandomMessage(escalation);
  const formattedMessage = formatSassyMessage(sassyMessage, reminder.name);

  return `${formattedMessage}\n\nReply "${code}" to confirm, or "SNOOZE" for 10 min.`;
};

export const useReminderStore = create<ReminderStore>()(
  persist(
    (set, get) => ({
      // Initial state
      reminders: [],
      history: [],
      isHydrated: false,

      // Demo state
      demoPhase: "idle",
      demoReminderId: null,
      demoLogId: null,
      demoMessages: [],
      demoConfirmationCode: "",
      demoEscalationCount: 0,

      setHydrated: () => set({ isHydrated: true }),

      // Add a new reminder
      addReminder: (reminderData) =>
        set((state) => {
          const newReminder: Reminder = {
            ...reminderData,
            id: getNextId(state.reminders),
            streak: 0,
            lastConfirmed: null,
            createdAt: new Date().toISOString(),
          };
          return { reminders: [...state.reminders, newReminder] };
        }),

      // Update existing reminder
      updateReminder: (id, data) =>
        set((state) => ({
          reminders: state.reminders.map((r) => (r.id === id ? { ...r, ...data } : r)),
        })),

      // Delete reminder
      deleteReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
          history: state.history.filter((h) => h.reminderId !== id),
        })),

      // Toggle active state
      toggleActive: (id) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, active: !r.active, streak: r.active ? 0 : r.streak } : r
          ),
        })),

      // Start demo mode for a reminder
      startDemo: (reminderId) => {
        const state = get();
        const reminder = state.reminders.find((r) => r.id === reminderId);
        if (!reminder) return;

        const code = generateConfirmationCode();
        const logId = getNextId(state.history);
        const now = new Date().toISOString();

        // Create a new log entry
        const newLog: ReminderLog = {
          id: logId,
          reminderId,
          scheduledFor: now,
          sentAt: now,
          confirmedAt: null,
          confirmationCode: code,
          escalationCount: 0,
          status: "pending",
        };

        // Create initial SMS
        const sms: SMSMessage = {
          id: 1,
          direction: "outgoing",
          content: generateReminderSMS(reminder, code, 0),
          timestamp: now,
        };

        set({
          demoPhase: "initial_sms",
          demoReminderId: reminderId,
          demoLogId: logId,
          demoMessages: [sms],
          demoConfirmationCode: code,
          demoEscalationCount: 0,
          history: [...state.history, newLog],
        });
      },

      // Send escalation message
      sendEscalation: () => {
        const state = get();
        const reminder = state.reminders.find((r) => r.id === state.demoReminderId);
        if (!reminder || state.demoPhase === "expired" || state.demoPhase === "confirmed") return;

        const newEscalation = state.demoEscalationCount + 1;

        if (newEscalation > reminder.maxEscalations) {
          // Expire the reminder
          get().expireReminder();
          return;
        }

        const phaseMap: Record<number, DemoPhase> = {
          1: "escalation_1",
          2: "escalation_2",
          3: "escalation_3",
        };

        const now = new Date().toISOString();
        const sms: SMSMessage = {
          id: state.demoMessages.length + 1,
          direction: "outgoing",
          content: generateReminderSMS(reminder, state.demoConfirmationCode, newEscalation),
          timestamp: now,
        };

        // Update the log
        const updatedHistory = state.history.map((log) =>
          log.id === state.demoLogId ? { ...log, escalationCount: newEscalation } : log
        );

        set({
          demoPhase: phaseMap[newEscalation] || "escalation_3",
          demoEscalationCount: newEscalation,
          demoMessages: [...state.demoMessages, sms],
          history: updatedHistory,
        });
      },

      // Confirm the reminder
      confirmReminder: (code) => {
        const state = get();
        if (code.toUpperCase() !== state.demoConfirmationCode && code.toUpperCase() !== "DONE") {
          // Add wrong code message
          const now = new Date().toISOString();
          const userMsg: SMSMessage = {
            id: state.demoMessages.length + 1,
            direction: "incoming",
            content: code,
            timestamp: now,
          };
          const errorMsg: SMSMessage = {
            id: state.demoMessages.length + 2,
            direction: "outgoing",
            content: `Invalid code. Reply "${state.demoConfirmationCode}" to confirm.`,
            timestamp: now,
          };
          set({ demoMessages: [...state.demoMessages, userMsg, errorMsg] });
          return false;
        }

        const now = new Date().toISOString();

        // Add user reply
        const userMsg: SMSMessage = {
          id: state.demoMessages.length + 1,
          direction: "incoming",
          content: code,
          timestamp: now,
        };

        // Add confirmation
        const confirmMsg: SMSMessage = {
          id: state.demoMessages.length + 2,
          direction: "outgoing",
          content: "Confirmed! Keep up the great work. Your streak is now updated.",
          timestamp: now,
        };

        // Update log and reminder
        const updatedHistory = state.history.map((log) =>
          log.id === state.demoLogId ? { ...log, confirmedAt: now, status: "confirmed" as const } : log
        );

        const updatedReminders = state.reminders.map((r) =>
          r.id === state.demoReminderId ? { ...r, streak: r.streak + 1, lastConfirmed: now } : r
        );

        set({
          demoPhase: "confirmed",
          demoMessages: [...state.demoMessages, userMsg, confirmMsg],
          history: updatedHistory,
          reminders: updatedReminders,
        });

        return true;
      },

      // Expire the reminder
      expireReminder: () => {
        const state = get();
        const now = new Date().toISOString();

        const expiredMsg: SMSMessage = {
          id: state.demoMessages.length + 1,
          direction: "outgoing",
          content: "Reminder expired. Your streak has been reset. Try again next time!",
          timestamp: now,
        };

        // Update log
        const updatedHistory = state.history.map((log) =>
          log.id === state.demoLogId ? { ...log, status: "expired" as const } : log
        );

        // Reset streak
        const updatedReminders = state.reminders.map((r) =>
          r.id === state.demoReminderId ? { ...r, streak: 0 } : r
        );

        set({
          demoPhase: "expired",
          demoMessages: [...state.demoMessages, expiredMsg],
          history: updatedHistory,
          reminders: updatedReminders,
        });
      },

      // Reset demo
      resetDemo: () =>
        set({
          demoPhase: "idle",
          demoReminderId: null,
          demoLogId: null,
          demoMessages: [],
          demoConfirmationCode: "",
          demoEscalationCount: 0,
        }),

      // Add message to demo
      addDemoMessage: (message) =>
        set((state) => ({
          demoMessages: [...state.demoMessages, { ...message, id: state.demoMessages.length + 1 }],
        })),

      // Reset to mock data
      resetToMockData: () =>
        set({
          reminders: mockReminders,
          history: mockHistory,
          demoPhase: "idle",
          demoReminderId: null,
          demoLogId: null,
          demoMessages: [],
          demoConfirmationCode: "",
          demoEscalationCount: 0,
        }),
    }),
    {
      name: "nudge-reminder-storage",
      onRehydrateStorage: () => (state) => {
        // Initialize with mock data if empty
        if (state && state.reminders.length === 0) {
          state.reminders = mockReminders;
          state.history = mockHistory;
        }
        state?.setHydrated();
      },
    }
  )
);
