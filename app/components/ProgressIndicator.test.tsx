import { render, screen } from '@testing-library/react';
import ProgressIndicator from './ProgressIndicator';

// Mock the useProgress hook
jest.mock('../hooks/useProgress', () => ({
  useProgress: () => ({
    visitedPages: ['about'],
    totalPages: 2,
    progress: 50,
    markVisited: jest.fn(),
    isHydrated: true,
  }),
  TRACKED_PAGES: {
    about: { path: '/', label: 'About' },
    projects: { path: '/projects', label: 'Projects' },
  },
}));

describe('ProgressIndicator Component', () => {
  it('should render progress count', () => {
    render(<ProgressIndicator />);

    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('should render indicator dots for each tracked page', () => {
    const { container } = render(<ProgressIndicator />);

    const dots = container.querySelectorAll('.rounded-full.w-2.h-2');
    expect(dots).toHaveLength(2);
  });

  it('should highlight visited page dots', () => {
    const { container } = render(<ProgressIndicator />);

    const emeraldDots = container.querySelectorAll('.bg-emerald-400');
    expect(emeraldDots.length).toBeGreaterThanOrEqual(1);
  });

  it('should render progress bar', () => {
    const { container } = render(<ProgressIndicator />);

    const progressBar = container.querySelector('[style*="width: 50%"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should show page labels as titles on dots', () => {
    const { container } = render(<ProgressIndicator />);

    const aboutDot = container.querySelector('[title="About"]');
    const projectsDot = container.querySelector('[title="Projects"]');

    expect(aboutDot).toBeInTheDocument();
    expect(projectsDot).toBeInTheDocument();
  });
});

describe('ProgressIndicator with no visited pages', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should show 0 progress when no pages visited', () => {
    jest.doMock('../hooks/useProgress', () => ({
      useProgress: () => ({
        visitedPages: [],
        totalPages: 2,
        progress: 0,
        markVisited: jest.fn(),
        isHydrated: true,
      }),
      TRACKED_PAGES: {
        about: { path: '/', label: 'About' },
        projects: { path: '/projects', label: 'Projects' },
      },
    }));

    // Re-require after mock
    const { default: ProgressIndicatorFresh } = require('./ProgressIndicator');
    render(<ProgressIndicatorFresh />);

    expect(screen.getByText('0/2')).toBeInTheDocument();
  });
});
