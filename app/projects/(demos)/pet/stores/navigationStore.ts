"use client";

import { create } from 'zustand';
import type { Section } from '../types/navigation';

interface NavigationState {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: 'pet',
  setActiveSection: (section) => set({ activeSection: section }),
}));
