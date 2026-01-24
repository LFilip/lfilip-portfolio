"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
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
      </div>
    </div>
  );
}
