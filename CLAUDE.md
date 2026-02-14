# CLAUDE.md

This file provides guidance to Claude Code when working with this codebase.

## Project Overview

Portfolio website built with Next.js 16, React 19, and TypeScript. Includes interactive demo projects showcasing various skills.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5
- **UI Components**: Headless UI (React)
- **Testing**: Jest 30 + React Testing Library

## Common Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (static export to out/)
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
app/
  page.tsx                    # Home page
  layout.tsx                  # Root layout with fonts and metadata
  globals.css                 # Global styles and Tailwind directives
  error.tsx                   # Error boundary
  loading.tsx                 # Loading state
  not-found.tsx               # 404 page
  components/                 # Shared components
    Accordion.tsx             # Expandable content sections
    ExperienceCard.tsx        # Work experience display
    Footer.tsx                # Site footer
    Header.tsx                # Site header
    Navbar.tsx                # Navigation bar
    ProgressIndicator.tsx     # Scroll progress indicator
    ProjectCard.tsx           # Project showcase card
    Section.tsx               # Page section wrapper
    SkillTag.tsx              # Skill badge/tag
  data/                       # Static data
    projects.ts               # Project definitions
    resume.ts                 # Resume/experience data
  hooks/
    useProgress.ts            # Scroll progress tracking hook
  utils/
    packageSort.ts            # Package sorting utility
  projects/                   # Projects listing page
    page.tsx                  # Projects index
    loading.tsx               # Projects loading state
    block-miner/              # Block Miner demo
      page.tsx
    package-sorter/           # Package Sorter demo
      page.tsx
    (demos)/                  # Route group for demo projects
      dashboard/              # Metrics dashboard demo
        components/           # MetricCard, Sparkline, StatusBadge, etc.
        data/mockMetrics.ts
        types/metrics.ts
        page.tsx
      nudge/                  # Reminder/notification demo
        components/           # ReminderCard, ReminderForm, SMSPreview, etc.
        data/                 # Mock data, sassy messages
        stores/reminderStore.ts
        types/reminder.ts
        page.tsx
      pet/                    # Virtual pet game demo
        components/           # Pet, StatBar, ActionButtons, etc.
        hooks/useGameLoop.ts
        stores/               # petStore.ts, navigationStore.ts (Zustand)
        types/                # pet.ts, navigation.ts
        page.tsx
      stack-jump/             # Platformer game demo
        components/           # GameCanvas, Player, Platform, etc.
        constants/game.ts
        hooks/useGameLoop.ts
        utils/platformGenerator.ts
        types/game.ts
        page.tsx
  valentines/                 # Valentine's card page
    components/               # Envelope, HexGrid, WaxSeal, etc.
    data/memories.ts
    page.tsx
public/                       # Static assets (SVGs)
```

## Key Patterns

- **Path aliases**: Use `@/*` for imports from project root
- **Styling**: Tailwind CSS utility classes with dark mode support
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Static export**: Site is statically exported (`output: "export"` in next.config.ts)
- **State management**: Zustand stores for complex client-side state (pet, nudge demos)
- **Route groups**: `(demos)` route group organizes demo projects without affecting URL paths
- **Testing**: Tests colocated with source files using `*.test.tsx` / `*.test.ts` convention
- **Demo structure**: Each demo is self-contained with its own components, types, data, hooks, and stores
