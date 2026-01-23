export type Section = 'pet' | 'about';

export interface NavigationTab {
  id: Section;
  label: string;
  icon: string;
  description: string;
}
