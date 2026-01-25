import { render, screen } from '@testing-library/react';
import { StatBar } from './StatBar';

describe('StatBar Component', () => {
  it('should render the label text', () => {
    render(<StatBar label="Hunger" value={75} color="yellow" />);

    expect(screen.getByText('Hunger')).toBeInTheDocument();
  });

  it('should render the value', () => {
    render(<StatBar label="Energy" value={42} color="orange" />);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should set progress bar width based on value', () => {
    const { container } = render(<StatBar label="Happiness" value={65} color="pink" />);

    // Find the inner progress bar (the one with the fill color)
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toHaveStyle({ width: '65%' });
  });

  it('should apply yellow color classes when color is yellow', () => {
    const { container } = render(<StatBar label="Hunger" value={50} color="yellow" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('bg-yellow-900/30');
    expect(wrapper.className).toContain('border-yellow-600/50');
  });

  it('should apply orange color classes when color is orange', () => {
    const { container } = render(<StatBar label="Energy" value={50} color="orange" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('bg-orange-900/30');
    expect(wrapper.className).toContain('border-orange-600/50');
  });

  it('should apply pink color classes when color is pink', () => {
    const { container } = render(<StatBar label="Happiness" value={50} color="pink" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('bg-pink-900/30');
    expect(wrapper.className).toContain('border-pink-600/50');
  });

  it('should handle 0% value', () => {
    const { container } = render(<StatBar label="Empty" value={0} color="yellow" />);

    expect(screen.getByText('0')).toBeInTheDocument();
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  it('should handle 100% value', () => {
    const { container } = render(<StatBar label="Full" value={100} color="yellow" />);

    expect(screen.getByText('100')).toBeInTheDocument();
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });
});
