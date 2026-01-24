export type TrendDirection = 'up' | 'down' | 'neutral';

export type StatusLevel = 'good' | 'warning' | 'critical';

export interface TrendData {
  value: number;
  direction: TrendDirection;
  label: string;
}

export interface SparklineData {
  values: number[];
}

export interface Metric {
  id: string;
  title: string;
  value: string | number;
  format?: 'number' | 'currency' | 'percentage' | 'duration';
  trend?: TrendData;
  sparkline?: SparklineData;
  status?: StatusLevel;
  icon?: string;
}

export type TimeRange = 'today' | 'week' | 'month' | 'year';
