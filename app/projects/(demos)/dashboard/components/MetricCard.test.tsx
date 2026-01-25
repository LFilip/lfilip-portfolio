import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';
import { Metric } from '../types/metrics';

describe('MetricCard Component', () => {
  const baseMetric: Metric = {
    id: 'test-metric',
    title: 'Test Metric',
    value: 1234,
  };

  it('should render the metric title', () => {
    render(<MetricCard metric={baseMetric} />);

    expect(screen.getByText('Test Metric')).toBeInTheDocument();
  });

  it('should format number values with commas', () => {
    render(<MetricCard metric={{ ...baseMetric, value: 1234567 }} />);

    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });

  it('should format currency values', () => {
    render(<MetricCard metric={{ ...baseMetric, value: 5000, format: 'currency' }} />);

    expect(screen.getByText('$5,000')).toBeInTheDocument();
  });

  it('should format percentage values', () => {
    render(<MetricCard metric={{ ...baseMetric, value: 75, format: 'percentage' }} />);

    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should format duration values', () => {
    render(<MetricCard metric={{ ...baseMetric, value: 250, format: 'duration' }} />);

    expect(screen.getByText('250ms')).toBeInTheDocument();
  });

  it('should render string values as-is', () => {
    render(<MetricCard metric={{ ...baseMetric, value: 'Custom Text' }} />);

    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('should render status badge when status is provided', () => {
    render(<MetricCard metric={{ ...baseMetric, status: 'good' }} />);

    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('should not render status badge when status is not provided', () => {
    render(<MetricCard metric={baseMetric} />);

    expect(screen.queryByText('Good')).not.toBeInTheDocument();
    expect(screen.queryByText('Warning')).not.toBeInTheDocument();
    expect(screen.queryByText('Critical')).not.toBeInTheDocument();
  });

  it('should render trend indicator when trend is provided', () => {
    const metricWithTrend: Metric = {
      ...baseMetric,
      trend: { value: 12, direction: 'up', label: 'vs last week' },
    };

    render(<MetricCard metric={metricWithTrend} />);

    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('vs last week')).toBeInTheDocument();
  });

  it('should render sparkline when sparkline data is provided', () => {
    const metricWithSparkline: Metric = {
      ...baseMetric,
      sparkline: { values: [10, 20, 30, 40, 50] },
    };

    render(<MetricCard metric={metricWithSparkline} />);

    expect(screen.getByLabelText('Sparkline chart')).toBeInTheDocument();
  });

  it('should not render sparkline when sparkline data is not provided', () => {
    render(<MetricCard metric={baseMetric} />);

    expect(screen.queryByLabelText('Sparkline chart')).not.toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    const { container } = render(<MetricCard metric={{ ...baseMetric, icon: 'users' }} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render default icon when no icon is specified', () => {
    const { container } = render(<MetricCard metric={baseMetric} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render different icons based on icon prop', () => {
    const icons = ['users', 'dollar', 'activity', 'target', 'eye', 'clock'];

    icons.forEach((icon) => {
      const { container } = render(<MetricCard metric={{ ...baseMetric, icon }} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
