"use client";

interface StatBarProps {
  label: string;
  value: number;
  color: 'yellow' | 'orange' | 'pink';
}

const colorClasses = {
  yellow: {
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-600/50',
    text: 'text-yellow-400',
    fill: 'bg-yellow-500',
  },
  orange: {
    bg: 'bg-orange-900/30',
    border: 'border-orange-600/50',
    text: 'text-orange-400',
    fill: 'bg-orange-500',
  },
  pink: {
    bg: 'bg-pink-900/30',
    border: 'border-pink-600/50',
    text: 'text-pink-400',
    fill: 'bg-pink-500',
  },
};

export const StatBar = ({ label, value, color }: StatBarProps) => {
  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-lg px-3 py-2`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-semibold ${colors.text}`}>{label}</span>
        <span className={`text-sm font-bold ${colors.text}`}>{value}</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.fill} transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
