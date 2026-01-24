import { TimeRange } from '../types/metrics';

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
      {timeRanges.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            selected === value
              ? 'bg-emerald-400/10 text-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
