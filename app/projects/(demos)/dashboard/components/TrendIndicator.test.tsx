import { render, screen } from '@testing-library/react';
import { TrendIndicator } from './TrendIndicator';

describe('TrendIndicator Component', () => {
  it('should render percentage value for up trend', () => {
    render(<TrendIndicator value={12} direction="up" label="vs last week" />);

    expect(screen.getByText('12%')).toBeInTheDocument();
  });

  it('should render percentage value for down trend', () => {
    render(<TrendIndicator value={5} direction="down" label="vs last month" />);

    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('should render "No change" for neutral trend', () => {
    render(<TrendIndicator value={0} direction="neutral" label="vs yesterday" />);

    expect(screen.getByText('No change')).toBeInTheDocument();
  });

  it('should render the label', () => {
    render(<TrendIndicator value={10} direction="up" label="vs last quarter" />);

    expect(screen.getByText('vs last quarter')).toBeInTheDocument();
  });

  it('should apply emerald color for up trend', () => {
    const { container } = render(<TrendIndicator value={10} direction="up" label="test" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-emerald-400');
  });

  it('should apply red color for down trend', () => {
    const { container } = render(<TrendIndicator value={10} direction="down" label="test" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-red-400');
  });

  it('should apply zinc color for neutral trend', () => {
    const { container } = render(<TrendIndicator value={0} direction="neutral" label="test" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-zinc-400');
  });

  it('should render an arrow icon', () => {
    const { container } = render(<TrendIndicator value={10} direction="up" label="test" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
