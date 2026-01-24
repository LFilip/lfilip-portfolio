import { Metric, TimeRange } from '../types/metrics';

const baseMetrics: Metric[] = [
  {
    id: 'total-users',
    title: 'Total Users',
    value: 24847,
    format: 'number',
    trend: {
      value: 12.5,
      direction: 'up',
      label: 'vs last month',
    },
    sparkline: {
      values: [18, 22, 19, 25, 28, 24, 30, 35, 32, 38, 42, 45],
    },
    icon: 'users',
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: 128450,
    format: 'currency',
    trend: {
      value: 8.2,
      direction: 'up',
      label: 'vs last month',
    },
    sparkline: {
      values: [85, 92, 88, 95, 102, 98, 110, 115, 108, 120, 125, 128],
    },
    icon: 'dollar',
  },
  {
    id: 'active-sessions',
    title: 'Active Sessions',
    value: 1432,
    format: 'number',
    trend: {
      value: 3.1,
      direction: 'down',
      label: 'vs last hour',
    },
    sparkline: {
      values: [1200, 1350, 1280, 1400, 1520, 1480, 1550, 1620, 1580, 1500, 1450, 1432],
    },
    icon: 'activity',
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 3.24,
    format: 'percentage',
    trend: {
      value: 0.5,
      direction: 'up',
      label: 'vs last week',
    },
    status: 'good',
    icon: 'target',
  },
  {
    id: 'page-views',
    title: 'Page Views',
    value: 89234,
    format: 'number',
    trend: {
      value: 0,
      direction: 'neutral',
      label: 'vs yesterday',
    },
    sparkline: {
      values: [75, 82, 78, 88, 92, 85, 90, 95, 88, 92, 87, 89],
    },
    icon: 'eye',
  },
  {
    id: 'response-time',
    title: 'Avg Response Time',
    value: 142,
    format: 'duration',
    trend: {
      value: 8,
      direction: 'down',
      label: 'vs last hour',
    },
    status: 'good',
    icon: 'clock',
  },
];

// Generate different values based on time range
export function getMetricsForTimeRange(timeRange: TimeRange): Metric[] {
  const multipliers: Record<TimeRange, number> = {
    today: 0.1,
    week: 0.5,
    month: 1,
    year: 12,
  };

  const multiplier = multipliers[timeRange];

  return baseMetrics.map((metric) => {
    if (metric.format === 'percentage' || metric.format === 'duration') {
      // Keep percentages and durations similar across time ranges
      return metric;
    }

    const baseValue = typeof metric.value === 'number' ? metric.value : parseFloat(metric.value);
    const adjustedValue = Math.round(baseValue * multiplier);

    return {
      ...metric,
      value: adjustedValue,
    };
  });
}

export const mockMetrics = baseMetrics;
