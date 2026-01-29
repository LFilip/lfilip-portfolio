import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Loading Page', () => {
  it('should render loading skeleton', () => {
    render(<Loading />);

    // Check for skeleton elements with pulse animation
    const container = document.querySelector('.bg-zinc-950');
    expect(container).toBeInTheDocument();
  });

  it('should render header skeleton', () => {
    render(<Loading />);

    // Header skeleton elements
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render card skeletons', () => {
    render(<Loading />);

    // Grid with card skeletons
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('should have 4 card skeleton placeholders', () => {
    render(<Loading />);

    const cards = document.querySelectorAll('.h-48.bg-zinc-900');
    expect(cards).toHaveLength(4);
  });

  it('should have proper dark theme styling', () => {
    render(<Loading />);

    const container = document.querySelector('.bg-zinc-950');
    expect(container).toBeInTheDocument();
  });
});
