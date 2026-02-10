# lfilip.dev

Personal portfolio site for Louis Filip — full stack developer based in Madison, AL.

**Live at [louisfilip.com](https://louisfilip.com)**

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript 5
- **State:** Zustand
- **Testing:** Jest 30 + React Testing Library
- **Fonts:** Geist Sans & Geist Mono

## Features

- Dark developer aesthetic with emerald accents
- Responsive navigation with mobile hamburger menu
- Project exploration progress tracked via localStorage (circular ring indicator in navbar)
- Playable demos embedded directly in the site
- Skip-to-content link and ARIA roles for accessibility
- 580+ tests across the codebase

## Project Demos

| Project | Description |
|---------|-------------|
| **Block Miner** | Minecraft-style idle clicker game with upgrades and pixel art |
| **Stack Jump** | Timing-based platform game with hold-to-charge mechanics |
| **LocalPet** | Virtual pet with real-time stat loop and Zustand persistence |
| **Package Sorter** | Robotic arm dispatch controller with live classification |
| **Nudge** | SMS reminder system demo with escalating notification tiers |
| **Dashboard** | Analytics dashboard with sparklines and metric cards |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run lint           # ESLint
npm test               # Run tests
npm run test:watch     # Tests in watch mode
npm run test:coverage  # Tests with coverage report
```

## Project Structure

```
app/
  page.tsx                          # Home — resume, skills, education
  layout.tsx                        # Root layout (Navbar, Footer, fonts)
  components/                       # Shared components
  data/                             # Resume + project data
  hooks/                            # Custom hooks (useProgress, etc.)
  projects/
    page.tsx                        # Project gallery with category filters
    block-miner/                    # Block Miner game
    package-sorter/                 # Package Sorter demo
    (demos)/
      pet/                          # LocalPet virtual pet
      nudge/                        # Nudge SMS reminder demo
      stack-jump/                   # Stack Jump game
      dashboard/                    # Analytics dashboard
public/                             # Static assets
```

## License

Private repository. All rights reserved.
