"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Accordion } from "@/app/components/Accordion";
import { useReminderStore } from "./stores/reminderStore";
import { ReminderList } from "./components/ReminderList";
import { ReminderForm } from "./components/ReminderForm";
import { HistoryTimeline } from "./components/HistoryTimeline";
import { StatsDisplay } from "./components/StatsDisplay";
import { EscalationDemo } from "./components/EscalationDemo";
import type { Reminder } from "./types/reminder";

type Tab = "reminders" | "history" | "stats";

export default function NudgeDemoPage() {
  const {
    reminders,
    history,
    isHydrated,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleActive,
    resetToMockData,
  } = useReminderStore();

  const [activeTab, setActiveTab] = useState<Tab>("reminders");
  const [showForm, setShowForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [demoReminder, setDemoReminder] = useState<Reminder | null>(null);

  // Initialize with mock data if empty
  useEffect(() => {
    if (isHydrated && reminders.length === 0) {
      resetToMockData();
    }
  }, [isHydrated, reminders.length, resetToMockData]);

  const handleAdd = useCallback(() => {
    setEditingReminder(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((reminder: Reminder) => {
    setEditingReminder(reminder);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm("Are you sure you want to delete this reminder?")) {
        deleteReminder(id);
      }
    },
    [deleteReminder]
  );

  const handleSave = useCallback(
    (data: Omit<Reminder, "id" | "streak" | "lastConfirmed" | "createdAt">) => {
      if (editingReminder) {
        updateReminder(editingReminder.id, data);
      } else {
        addReminder(data);
      }
      setShowForm(false);
      setEditingReminder(null);
    },
    [editingReminder, addReminder, updateReminder]
  );

  const handleDemo = useCallback(
    (id: number) => {
      const reminder = reminders.find((r) => r.id === id);
      if (reminder) {
        setDemoReminder(reminder);
      }
    },
    [reminders]
  );

  // Loading state
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Back link */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <Link
            href="/projects"
            className="text-zinc-400 hover:text-emerald-400 text-sm transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">Nudge</h1>
              <p className="text-zinc-500 mt-1">SMS Reminder System Demo</p>
            </div>
            <button
              onClick={resetToMockData}
              className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-zinc-800 sticky top-0 bg-zinc-950 z-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex gap-1">
            {(["reminders", "history", "stats"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px
                  ${
                    activeTab === tab
                      ? "text-emerald-400 border-emerald-400"
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-md p-6">
              <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                {editingReminder ? "Edit Reminder" : "New Reminder"}
              </h2>
              <ReminderForm
                reminder={editingReminder}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingReminder(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Demo Modal */}
        {demoReminder && (
          <EscalationDemo
            reminder={demoReminder}
            onClose={() => setDemoReminder(null)}
          />
        )}

        {/* Tab content */}
        {activeTab === "reminders" && (
          <ReminderList
            reminders={reminders}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={toggleActive}
            onDemo={handleDemo}
            onAdd={handleAdd}
          />
        )}

        {activeTab === "history" && (
          <HistoryTimeline history={history} reminders={reminders} />
        )}

        {activeTab === "stats" && (
          <StatsDisplay reminders={reminders} history={history} />
        )}
      </main>

      {/* About Section */}
      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-3">
          <Accordion title="How It Works">
            <div className="text-sm text-zinc-400 space-y-3">
              <p>
                Nudge is an SMS-based reminder system designed to help you build consistent habits
                through gentle but persistent reminders.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">1.</span>
                  Create a reminder with a name, time, and days of the week
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">2.</span>
                  At the scheduled time, Nudge sends you an SMS with a confirmation code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">3.</span>
                  Reply with the code to confirm you&apos;ve completed the task
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">4.</span>
                  If you don&apos;t reply, Nudge sends escalating reminders
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">5.</span>
                  Track your streak and build consistent habits!
                </li>
              </ul>
            </div>
          </Accordion>

          <Accordion title="About the Demo">
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">
                This is an interactive demo of the Nudge concept. The full system uses Twilio for
                SMS messaging and a backend scheduler for reliable delivery.
              </p>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">What&apos;s Simulated</h4>
                <ul className="text-zinc-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    SMS messages shown in a phone mockup instead of real texts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Escalation timing can be accelerated for demo purposes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Data persists in localStorage instead of a database
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React 19",
                    "TypeScript",
                    "Next.js",
                    "Zustand",
                    "Tailwind CSS",
                    "localStorage",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="Production Features">
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">
                The full production version of Nudge includes additional features:
              </p>

              <ul className="text-zinc-400 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  Real SMS via Twilio with delivery confirmation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  Reliable background job scheduling with BullMQ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  Timezone-aware scheduling
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  Multi-user support with authentication
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  Emergency contact escalation for critical reminders
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  SNOOZE replies for temporary delays
                </li>
              </ul>
            </div>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
