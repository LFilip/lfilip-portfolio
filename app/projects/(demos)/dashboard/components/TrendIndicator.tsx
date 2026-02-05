import { TrendDirection } from '../types/metrics';

interface TrendIndicatorProps {
  value: number;
  direction: TrendDirection;
  label: string;
}

function ArrowIcon({ direction }: { direction: TrendDirection }) {
  if (direction === 'up') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
}

export function TrendIndicator({ value, direction, label }: TrendIndicatorProps) {
  const colorClasses: Record<TrendDirection, string> = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-zinc-400',
  };

  const displayValue = direction === 'neutral' ? 'No change' : `${value}%`;

  return (
    <div className={`flex items-center gap-1 text-sm ${colorClasses[direction]}`}>
      <ArrowIcon direction={direction} />
      <span className="font-medium">{displayValue}</span>
      <span className="text-zinc-500">{label}</span>
    </div>
  );
}
