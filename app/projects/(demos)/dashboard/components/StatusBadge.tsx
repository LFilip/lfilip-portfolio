import { StatusLevel } from '../types/metrics';

interface StatusBadgeProps {
  status: StatusLevel;
}

const statusConfig: Record<StatusLevel, { label: string; className: string }> = {
  good: {
    label: 'Good',
    className: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  },
  warning: {
    label: 'Warning',
    className: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  },
  critical: {
    label: 'Critical',
    className: 'bg-red-400/10 text-red-400 border-red-400/20',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status === 'good'
              ? 'bg-emerald-400'
              : status === 'warning'
              ? 'bg-amber-400'
              : 'bg-red-400'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status === 'good'
              ? 'bg-emerald-400'
              : status === 'warning'
              ? 'bg-amber-400'
              : 'bg-red-400'
          }`}
        />
      </span>
      {config.label}
    </span>
  );
}
