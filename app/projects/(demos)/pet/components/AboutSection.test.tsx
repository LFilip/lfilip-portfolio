import { render, screen } from '@testing-library/react';
import { AboutSection } from './AboutSection';

describe('AboutSection Component', () => {
  it('should render the main heading', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { level: 2, name: /about this demo/i })).toBeInTheDocument();
  });

  it('should render the LocalPet section', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { level: 3, name: /localpet/i })).toBeInTheDocument();
    expect(screen.getByText(/virtual pet game built with react/i)).toBeInTheDocument();
  });

  it('should render the Features section', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { level: 3, name: /features/i })).toBeInTheDocument();
    expect(screen.getByText(/create and customize your virtual pet/i)).toBeInTheDocument();
    expect(screen.getByText(/feed, play, and pet your companion/i)).toBeInTheDocument();
  });

  it('should render all feature list items', () => {
    render(<AboutSection />);

    const features = [
      'Create and customize your virtual pet',
      'Feed, play, and pet your companion',
      'Watch stats change in real-time with a game loop',
      'State persists across browser sessions',
      'Responsive design for mobile and desktop',
    ];

    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('should render the Tech Stack section with all technologies', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { level: 3, name: /tech stack/i })).toBeInTheDocument();

    const techs = ['React 19', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Next.js'];
    techs.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('should render the How It Works section', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { level: 3, name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByText(/zustand for lightweight state management/i)).toBeInTheDocument();
  });
});
