import { Metric } from '../types/metrics';
import { TrendIndicator } from './TrendIndicator';
import { Sparkline } from './Sparkline';
import { StatusBadge } from './StatusBadge';

interface MetricCardProps {
  metric: Metric;
}

function formatValue(value: string | number, format?: Metric['format']): string {
  if (typeof value === 'string') return value;

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'percentage':
      return `${value}%`;
    case 'duration':
      return `${value}ms`;
    case 'number':
    default:
      return new Intl.NumberFormat('en-US').format(value);
  }
}

function MetricIcon({ icon }: { icon?: string }) {
  const iconClass = 'w-5 h-5 text-zinc-400';

  switch (icon) {
    case 'users':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'dollar':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'activity':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'target':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'eye':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
  }
}

export function MetricCard({ metric }: MetricCardProps) {
  const { title, value, format, trend, sparkline, status, icon } = metric;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MetricIcon icon={icon} />
          <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
        </div>
        {status && <StatusBadge status={status} />}
      </div>

      {/* Value */}
      <div className="mb-3">
        <span className="text-3xl font-bold text-zinc-100">
          {formatValue(value, format)}
        </span>
      </div>

      {/* Trend */}
      {trend && (
        <div className="mb-3">
          <TrendIndicator
            value={trend.value}
            direction={trend.direction}
            label={trend.label}
          />
        </div>
      )}

      {/* Sparkline */}
      {sparkline && (
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <Sparkline values={sparkline.values} width={200} height={40} />
        </div>
      )}
    </div>
  );
}
