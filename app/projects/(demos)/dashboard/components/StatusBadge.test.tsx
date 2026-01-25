import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge Component', () => {
  it('should render Good status', () => {
    render(<StatusBadge status="good" />);

    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('should render Warning status', () => {
    render(<StatusBadge status="warning" />);

    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('should render Critical status', () => {
    render(<StatusBadge status="critical" />);

    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('should apply emerald colors for good status', () => {
    const { container } = render(<StatusBadge status="good" />);

    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('text-emerald-400');
  });

  it('should apply amber colors for warning status', () => {
    const { container } = render(<StatusBadge status="warning" />);

    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('text-amber-400');
  });

  it('should apply red colors for critical status', () => {
    const { container } = render(<StatusBadge status="critical" />);

    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('text-red-400');
  });

  it('should render pulsing indicator dot', () => {
    const { container } = render(<StatusBadge status="good" />);

    const pulsingDot = container.querySelector('.animate-ping');
    expect(pulsingDot).toBeInTheDocument();
  });
});
