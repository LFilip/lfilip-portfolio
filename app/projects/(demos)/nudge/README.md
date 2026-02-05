# Nudge - SMS Reminder System

An SMS-based reminder system that helps you build consistent habits through gentle but persistent reminders. Think of it as a supportive friend who won't let you forget the important stuff.

## The Concept

Nudge solves a simple problem: **we forget things**. Especially recurring tasks that don't have external deadlines. Taking medication, watering plants, taking out the trash - these small habits slip through the cracks.

Traditional reminder apps beep once and give up. Nudge doesn't. It sends escalating SMS messages until you confirm you've done the task, or it gives up (with maximum guilt).

## Features

### Core Functionality
- **Create Reminders** - Set up recurring tasks with custom schedules
- **SMS Escalation** - Reminders get progressively more insistent if ignored
- **Confirmation Codes** - Reply with a code to mark tasks complete
- **Streak Tracking** - Build momentum with visible streaks

### The "Table of Many Nudges"

Messages escalate through increasingly dramatic tiers, like a D&D encounter table:

| Escalation | Vibe | Example |
|------------|------|---------|
| Initial | Chill bestie | "Hey! Time to Take medication" |
| 1st nudge | Playful | "Psst... you forgot to Take medication. I saw that." |
| 2nd nudge | Getting real | "Babe. Take medication. It's been a minute." |
| FINAL | Maximum chaos | "THE AUDACITY. Take medication?! You're really gonna ignore ME?!" |

The sassy message system picks randomly from each tier, so you never know exactly what guilt trip is coming.

## Demo Features

This interactive demo simulates the full Nudge experience:

- **Phone Mockup** - See messages as they'd appear on your phone
- **Accelerated Timeline** - Skip through escalations without waiting
- **Quick Replies** - Tap the confirmation code or SNOOZE
- **Persistent Data** - Reminders save to localStorage

## Project Structure

```
nudge/
├── page.tsx                 # Main demo page with tabs
├── types/
│   └── reminder.ts          # TypeScript interfaces
├── data/
│   ├── mockData.ts          # Sample reminders and utilities
│   └── sassyMessages.ts     # The Table of Many Nudges
├── stores/
│   └── reminderStore.ts     # Zustand store with all actions
└── components/
    ├── ReminderList.tsx     # Grid of reminder cards
    ├── ReminderCard.tsx     # Individual reminder display
    ├── ReminderForm.tsx     # Create/edit form
    ├── DaySelector.tsx      # Week day picker
    ├── TimeInput.tsx        # Time picker
    ├── SMSPreview.tsx       # Phone mockup with messages
    ├── EscalationDemo.tsx   # Full demo modal
    ├── HistoryTimeline.tsx  # Past reminder log
    └── StatsDisplay.tsx     # Compliance statistics
```

## Tech Stack

- **React 19** - UI components
- **TypeScript** - Type safety throughout
- **Next.js 16** - App Router
- **Zustand** - State management with persistence
- **Tailwind CSS** - Styling

## Running the Demo

```bash
# From the portfolio root
npm run dev

# Navigate to
http://localhost:3000/projects/nudge
```

## Testing

The project includes comprehensive tests for all components and the store:

```bash
# Run all Nudge tests
npm test -- --testPathPatterns="nudge"

# Test coverage includes:
# - sassyMessages.test.ts (message selection logic)
# - reminderStore.test.ts (all store actions)
# - DaySelector.test.tsx (day picker interactions)
# - ReminderCard.test.tsx (card display and actions)
# - ReminderForm.test.tsx (form validation and submission)
# - SMSPreview.test.tsx (message display and replies)
```

## Production Version

A full production Nudge system would include:

- **Twilio Integration** - Real SMS delivery with confirmation
- **BullMQ Scheduler** - Reliable background job processing
- **Timezone Support** - Schedule reminders in user's local time
- **Authentication** - Multi-user support
- **Emergency Contacts** - Escalate critical reminders to family/friends
- **SNOOZE Handling** - Delay reminders with a reply

## Why SMS?

Push notifications are easy to ignore. Emails get buried. But SMS messages feel personal and urgent. You actually read them. That's why Nudge uses SMS - it meets you where your attention already is.

## Design Philosophy

1. **Progressively Annoying** - Start friendly, get insistent
2. **Personality-Driven** - Messages feel like a friend, not a robot
3. **Streak Psychology** - Visible streaks motivate consistency
4. **Friction-Free** - Reply with a code, no app to open
