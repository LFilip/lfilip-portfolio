import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';

// Mock PageTracker
jest.mock('../components/PageTracker', () => {
  return function MockPageTracker() {
    return null;
  };
});

describe('ProjectsPage', () => {
  it('should render the page heading', () => {
    render(<ProjectsPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
  });

  it('should render the page description', () => {
    render(<ProjectsPage />);

    expect(screen.getByText(/A collection of projects I have worked on/i)).toBeInTheDocument();
  });

  it('should render project cards', () => {
    render(<ProjectsPage />);

    // Check for at least one project
    expect(screen.getByText('LocalPet - Virtual Pet Game')).toBeInTheDocument();
  });

  it('should render multiple projects', () => {
    render(<ProjectsPage />);

    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
    expect(screen.getByText('Government Application Dashboard')).toBeInTheDocument();
  });
});
