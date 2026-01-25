import { render, screen } from '@testing-library/react';
import { Sparkline } from './Sparkline';

describe('Sparkline Component', () => {
  it('should return null when values has less than 2 points', () => {
    const { container } = render(<Sparkline values={[42]} />);

    expect(container.firstChild).toBeNull();
  });

  it('should return null when values is empty', () => {
    const { container } = render(<Sparkline values={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('should render SVG when values has 2 or more points', () => {
    render(<Sparkline values={[10, 20, 30]} />);

    expect(screen.getByLabelText('Sparkline chart')).toBeInTheDocument();
  });

  it('should render with default dimensions', () => {
    render(<Sparkline values={[10, 20, 30]} />);

    const svg = screen.getByLabelText('Sparkline chart');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('should render with custom dimensions', () => {
    render(<Sparkline values={[10, 20, 30]} width={200} height={50} />);

    const svg = screen.getByLabelText('Sparkline chart');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '50');
  });

  it('should render a path element for the line', () => {
    const { container } = render(<Sparkline values={[10, 20, 30]} />);

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });

  it('should render an end dot circle', () => {
    const { container } = render(<Sparkline values={[10, 20, 30]} />);

    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
  });

  it('should render gradient definition', () => {
    const { container } = render(<Sparkline values={[10, 20, 30]} />);

    const gradient = container.querySelector('linearGradient');
    expect(gradient).toBeInTheDocument();
    expect(gradient).toHaveAttribute('id', 'sparklineGradient');
  });

  it('should handle identical values (flat line)', () => {
    const { container } = render(<Sparkline values={[50, 50, 50, 50]} />);

    expect(screen.getByLabelText('Sparkline chart')).toBeInTheDocument();
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });

  it('should apply custom color class', () => {
    const { container } = render(<Sparkline values={[10, 20]} color="stroke-red-500" />);

    const linePath = container.querySelector('path.stroke-red-500');
    expect(linePath).toBeInTheDocument();
  });
});
