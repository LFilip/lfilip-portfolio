export interface Reminder {
  id: number;
  name: string;
  description: string;
  scheduleTime: string; // "HH:MM" format
  scheduleDays: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  escalationMinutes: number;
  maxEscalations: number;
  active: boolean;
  streak: number;
  lastConfirmed: string | null; // ISO date string
  createdAt: string; // ISO date string
}

export type ReminderLogStatus = "pending" | "confirmed" | "expired";

export interface ReminderLog {
  id: number;
  reminderId: number;
  scheduledFor: string; // ISO date string
  sentAt: string | null;
  confirmedAt: string | null;
  confirmationCode: string;
  escalationCount: number;
  status: ReminderLogStatus;
}

export interface SMSMessage {
  id: number;
  direction: "outgoing" | "incoming";
  content: string;
  timestamp: string;
}

export type DemoPhase =
  | "idle"
  | "initial_sms"
  | "waiting_response"
  | "escalation_1"
  | "escalation_2"
  | "escalation_3"
  | "confirmed"
  | "expired";
