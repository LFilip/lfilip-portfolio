"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Accordion } from '@/app/components/Accordion';
import { MetricCard } from './components/MetricCard';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import { getMetricsForTimeRange } from './data/mockMetrics';
import { TimeRange } from './types/metrics';

export default function DashboardDemoPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const metrics = getMetricsForTimeRange(timeRange);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Back link */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Link
            href="/projects"
            className="text-zinc-400 hover:text-emerald-400 text-sm transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">Analytics Dashboard</h1>
              <p className="text-zinc-400 mt-1">
                Overview of key metrics and performance indicators
              </p>
            </div>
            <div className="flex items-center gap-3">
              <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-emerald-400 hover:border-zinc-700 transition-colors disabled:opacity-50"
                aria-label="Refresh data"
              >
                <svg
                  className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${
            isRefreshing ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            This is a demo dashboard with mock data. Values update based on the selected time range.
          </p>
        </div>

        {/* About Section - Accordions */}
        <div className="mt-12 max-w-2xl mx-auto space-y-3">
          <Accordion title="Dashboard Features">
            <div className="text-sm text-zinc-400 space-y-3">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  <span><strong className="text-zinc-300">Time Range Selector</strong> - Switch between week, month, and year views</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  <span><strong className="text-zinc-300">Metric Cards</strong> - Display key stats with trend indicators and sparklines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  <span><strong className="text-zinc-300">Refresh Animation</strong> - Loading state with smooth opacity transition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">&#8226;</span>
                  <span><strong className="text-zinc-300">Responsive Grid</strong> - Adapts from 1 to 3 columns based on screen size</span>
                </li>
              </ul>
            </div>
          </Accordion>

          <Accordion title="Component Breakdown">
            <div className="space-y-4 text-sm">
              <div className="grid gap-3">
                <div className="bg-zinc-900 rounded p-3">
                  <div className="text-zinc-300 font-medium">MetricCard</div>
                  <div className="text-zinc-500 text-xs mt-1">Displays value, trend percentage, status badge, and sparkline chart</div>
                </div>
                <div className="bg-zinc-900 rounded p-3">
                  <div className="text-zinc-300 font-medium">Sparkline</div>
                  <div className="text-zinc-500 text-xs mt-1">SVG-based mini chart showing data trends over time</div>
                </div>
                <div className="bg-zinc-900 rounded p-3">
                  <div className="text-zinc-300 font-medium">TrendIndicator</div>
                  <div className="text-zinc-500 text-xs mt-1">Shows percentage change with up/down arrow and color coding</div>
                </div>
                <div className="bg-zinc-900 rounded p-3">
                  <div className="text-zinc-300 font-medium">StatusBadge</div>
                  <div className="text-zinc-500 text-xs mt-1">Colored badge indicating healthy, warning, or critical status</div>
                </div>
                <div className="bg-zinc-900 rounded p-3">
                  <div className="text-zinc-300 font-medium">TimeRangeSelector</div>
                  <div className="text-zinc-500 text-xs mt-1">Toggle between different time periods</div>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="About this Project">
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">
                A data visualization dashboard demonstrating reusable chart components,
                responsive layouts, and clean data presentation patterns.
              </p>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'SVG Charts'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Features Demonstrated</h4>
                <ul className="text-zinc-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Composable metric card components
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    SVG sparkline charts without external libraries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Mock data generation for different time ranges
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Accessible color-coded status indicators
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
