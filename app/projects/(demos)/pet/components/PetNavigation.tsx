"use client";

import { useNavigationStore } from '../stores/navigationStore';
import type { NavigationTab } from '../types/navigation';

const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: 'pet',
    label: 'Pet Game',
    icon: '🎮',
    description: 'Play with your virtual pet'
  },
  {
    id: 'about',
    label: 'About',
    icon: '📖',
    description: 'About this demo'
  },
];

export const PetNavigation = () => {
  const activeSection = useNavigationStore((state) => state.activeSection);
  const setActiveSection = useNavigationStore((state) => state.setActiveSection);

  return (
    <nav className="mb-6">
      {/* Mobile: Horizontal tabs */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
        {NAVIGATION_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm
              whitespace-nowrap transition-all duration-200
              ${activeSection === tab.id
                ? 'bg-emerald-600 text-white shadow-lg scale-105'
                : 'bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:border-zinc-600 hover:shadow-md'
              }
            `}
            aria-label={tab.description}
            aria-current={activeSection === tab.id ? 'page' : undefined}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop: Vertical tabs (rendered in PetSidebar area) - hidden on mobile */}
      <div className="hidden md:flex flex-col gap-2">
        {NAVIGATION_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
              transition-all duration-200
              ${activeSection === tab.id
                ? 'bg-emerald-600 text-white shadow-lg scale-105'
                : 'bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:border-zinc-600 hover:shadow-md hover:scale-102'
              }
            `}
            aria-label={tab.description}
            aria-current={activeSection === tab.id ? 'page' : undefined}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
