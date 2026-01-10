'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  yAxisLabel: string;
  xAxisLabel: string;
  data?: Array<{ x: number; y: number }>;
  trend?: 'up' | 'down' | 'neutral';
  unit?: string;
}

export default function ChartPlaceholder({
  title,
  yAxisLabel,
  xAxisLabel,
  data,
  trend = 'neutral',
  unit = '',
}: ChartPlaceholderProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up'
      ? 'text-green-600'
      : trend === 'down'
      ? 'text-red-600'
      : 'text-clinical-grey-600';

  // Generate mock data if not provided
  const chartData =
    data ||
    Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: 50 + Math.random() * 50,
    }));

  const maxY = Math.max(...chartData.map((d) => d.y));
  const minY = Math.min(...chartData.map((d) => d.y));

  return (
    <div className="rounded-lg border border-clinical-grey-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-clinical-grey-900">{title}</h3>
        <TrendIcon className={`h-5 w-5 ${trendColor}`} />
      </div>
      <div className="relative h-64 w-full">
        <svg className="h-full w-full" viewBox="0 0 600 256">
          {/* Y-axis */}
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="230"
            stroke="#d1d5db"
            strokeWidth="2"
          />
          {/* X-axis */}
          <line
            x1="50"
            y1="230"
            x2="580"
            y2="230"
            stroke="#d1d5db"
            strokeWidth="2"
          />
          {/* Y-axis label */}
          <text
            x="15"
            y="120"
            transform="rotate(-90 15 120)"
            className="text-xs"
            fill="#6b7280"
            textAnchor="middle"
          >
            {yAxisLabel} {unit && `(${unit})`}
          </text>
          {/* X-axis label */}
          <text
            x="315"
            y="250"
            className="text-xs"
            fill="#6b7280"
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          {/* Chart line */}
          <polyline
            points={chartData
              .map(
                (d, i) =>
                  `${50 + (i * 530) / (chartData.length - 1)},${
                    230 - ((d.y - minY) / (maxY - minY || 1)) * 200
                  }`
              )
              .join(' ')}
            fill="none"
            stroke="#007dff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data points */}
          {chartData.map((d, i) => (
            <circle
              key={i}
              cx={50 + (i * 530) / (chartData.length - 1)}
              cy={230 - ((d.y - minY) / (maxY - minY || 1)) * 200}
              r="3"
              fill="#007dff"
            />
          ))}
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-xs text-clinical-grey-500">
        <span>Min: {minY.toFixed(1)}{unit}</span>
        <span>Max: {maxY.toFixed(1)}{unit}</span>
        <span>Mean: {(chartData.reduce((a, b) => a + b.y, 0) / chartData.length).toFixed(1)}{unit}</span>
      </div>
    </div>
  );
}
