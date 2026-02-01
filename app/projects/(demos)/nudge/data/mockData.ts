import type { Reminder, ReminderLog } from "../types/reminder";

// Generate dates relative to today
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

export const mockReminders: Reminder[] = [
  {
    id: 1,
    name: "Take Adderall",
    description: "Morning meds - take with breakfast",
    scheduleTime: "09:00",
    scheduleDays: [1, 2, 3, 4, 5], // Weekdays
    escalationMinutes: 15,
    maxEscalations: 3,
    active: true,
    streak: 12,
    lastConfirmed: yesterday.toISOString(),
    createdAt: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    name: "Take out trash",
    description: "Put bins on curb before 7am",
    scheduleTime: "06:30",
    scheduleDays: [2], // Tuesday
    escalationMinutes: 10,
    maxEscalations: 2,
    active: true,
    streak: 4,
    lastConfirmed: twoDaysAgo.toISOString(),
    createdAt: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    name: "Water plants",
    description: "All indoor plants need water",
    scheduleTime: "18:00",
    scheduleDays: [0, 3, 6], // Sun, Wed, Sat
    escalationMinutes: 30,
    maxEscalations: 2,
    active: true,
    streak: 8,
    lastConfirmed: yesterday.toISOString(),
    createdAt: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    name: "Evening meditation",
    description: "10 minute mindfulness session",
    scheduleTime: "21:00",
    scheduleDays: [0, 1, 2, 3, 4, 5, 6], // Every day
    escalationMinutes: 15,
    maxEscalations: 1,
    active: false,
    streak: 0,
    lastConfirmed: null,
    createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockHistory: ReminderLog[] = [
  // Yesterday's successful confirmation
  {
    id: 1,
    reminderId: 1,
    scheduledFor: new Date(yesterday.setHours(9, 0, 0, 0)).toISOString(),
    sentAt: new Date(yesterday.setHours(9, 0, 5, 0)).toISOString(),
    confirmedAt: new Date(yesterday.setHours(9, 12, 0, 0)).toISOString(),
    confirmationCode: "7742",
    escalationCount: 0,
    status: "confirmed",
  },
  // Two days ago - confirmed after 1 escalation
  {
    id: 2,
    reminderId: 1,
    scheduledFor: new Date(twoDaysAgo.setHours(9, 0, 0, 0)).toISOString(),
    sentAt: new Date(twoDaysAgo.setHours(9, 0, 5, 0)).toISOString(),
    confirmedAt: new Date(twoDaysAgo.setHours(9, 22, 0, 0)).toISOString(),
    confirmationCode: "3891",
    escalationCount: 1,
    status: "confirmed",
  },
  // Three days ago - expired
  {
    id: 3,
    reminderId: 1,
    scheduledFor: new Date(threeDaysAgo.setHours(9, 0, 0, 0)).toISOString(),
    sentAt: new Date(threeDaysAgo.setHours(9, 0, 5, 0)).toISOString(),
    confirmedAt: null,
    confirmationCode: "5523",
    escalationCount: 3,
    status: "expired",
  },
  // Trash reminder - confirmed
  {
    id: 4,
    reminderId: 2,
    scheduledFor: new Date(twoDaysAgo.setHours(6, 30, 0, 0)).toISOString(),
    sentAt: new Date(twoDaysAgo.setHours(6, 30, 5, 0)).toISOString(),
    confirmedAt: new Date(twoDaysAgo.setHours(6, 35, 0, 0)).toISOString(),
    confirmationCode: "1234",
    escalationCount: 0,
    status: "confirmed",
  },
  // Water plants - confirmed
  {
    id: 5,
    reminderId: 3,
    scheduledFor: new Date(yesterday.setHours(18, 0, 0, 0)).toISOString(),
    sentAt: new Date(yesterday.setHours(18, 0, 5, 0)).toISOString(),
    confirmedAt: new Date(yesterday.setHours(18, 45, 0, 0)).toISOString(),
    confirmationCode: "9988",
    escalationCount: 1,
    status: "confirmed",
  },
];

// Helper to generate a random 4-digit code
export function generateConfirmationCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Get day name from number
export function getDayName(day: number, short: boolean = true): string {
  const days = short
    ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

// Format time for display
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Get relative time string
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
