interface SparklineProps {
  values: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({
  values,
  color = 'stroke-emerald-400',
  height = 32,
  width = 100,
}: SparklineProps) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  // Add padding to prevent line from touching edges
  const padding = 2;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  // Generate SVG path points
  const points = values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((value - min) / range) * chartHeight;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Create gradient area path
  const areaPoints = [
    `${padding},${height - padding}`,
    ...points,
    `${width - padding},${height - padding}`,
  ];
  const areaD = `M ${areaPoints.join(' L ')} Z`;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      aria-label="Sparkline chart"
    >
      {/* Gradient fill */}
      <defs>
        <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#sparklineGradient)" />
      {/* Line */}
      <path
        d={pathD}
        fill="none"
        className={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={width - padding}
        cy={padding + chartHeight - ((values[values.length - 1] - min) / range) * chartHeight}
        r="3"
        className="fill-emerald-400"
      />
    </svg>
  );
}
