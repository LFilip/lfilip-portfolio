# CLAUDE.md

This file provides guidance to Claude Code when working with this codebase.

## Project Overview

Portfolio website built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Testing**: Jest 30 + React Testing Library

## Common Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
app/                 # Next.js App Router pages and layouts
  page.tsx          # Home page
  layout.tsx        # Root layout with fonts and metadata
  globals.css       # Global styles and Tailwind directives
public/             # Static assets (images, SVGs)
```

## Key Patterns

- **Path aliases**: Use `@/*` for imports from project root
- **Styling**: Tailwind CSS utility classes with dark mode support
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Testing**: Tests use `*.test.tsx` naming convention in `app/` directory
