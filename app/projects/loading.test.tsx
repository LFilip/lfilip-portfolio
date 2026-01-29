import { render } from '@testing-library/react';
import ProjectsLoading from './loading';

describe('Projects Loading Page', () => {
  it('should render loading skeleton', () => {
    render(<ProjectsLoading />);

    const container = document.querySelector('.bg-zinc-950');
    expect(container).toBeInTheDocument();
  });

  it('should render header skeleton', () => {
    render(<ProjectsLoading />);

    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render filter button skeletons', () => {
    render(<ProjectsLoading />);

    // Filter buttons are rounded-full
    const filterSkeletons = document.querySelectorAll('.rounded-full.animate-pulse');
    expect(filterSkeletons.length).toBeGreaterThanOrEqual(3);
  });

  it('should render project card skeletons', () => {
    render(<ProjectsLoading />);

    // Project cards with image placeholders
    const cardContainers = document.querySelectorAll('.bg-zinc-900.border.border-zinc-800.rounded-xl');
    expect(cardContainers).toHaveLength(4);
  });

  it('should render image placeholder in each card', () => {
    render(<ProjectsLoading />);

    // Image placeholder height
    const imagePlaceholders = document.querySelectorAll('.h-40.bg-zinc-800');
    expect(imagePlaceholders).toHaveLength(4);
  });

  it('should have responsive grid layout', () => {
    render(<ProjectsLoading />);

    const grid = document.querySelector('.grid.gap-6');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('md:grid-cols-2');
  });

  it('should have proper dark theme styling', () => {
    render(<ProjectsLoading />);

    const mainContainer = document.querySelector('.min-h-\\[calc\\(100vh-3\\.5rem\\)\\]');
    expect(mainContainer).toBeInTheDocument();
  });
});
