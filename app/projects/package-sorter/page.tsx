'use client';

import { useState } from 'react';
import { sort, Stack } from '@/app/utils/packageSort';

interface Package {
  id: number;
  width: number;
  height: number;
  length: number;
  mass: number;
  stack: Stack;
}

const STACK_COLORS: Record<Stack, string> = {
  STANDARD: 'bg-green-500',
  SPECIAL: 'bg-yellow-500',
  REJECTED: 'bg-red-500',
};

const STACK_TEXT_COLORS: Record<Stack, string> = {
  STANDARD: 'text-green-600 dark:text-green-400',
  SPECIAL: 'text-yellow-600 dark:text-yellow-400',
  REJECTED: 'text-red-600 dark:text-red-400',
};

export default function PackageSorterPage() {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [length, setLength] = useState(50);
  const [mass, setMass] = useState(10);
  const [packages, setPackages] = useState<Package[]>([]);

  const currentStack = sort(width, height, length, mass);
  const volume = width * height * length;
  const isBulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;
  const isHeavy = mass >= 20;

  const stats = {
    STANDARD: packages.filter((p) => p.stack === 'STANDARD').length,
    SPECIAL: packages.filter((p) => p.stack === 'SPECIAL').length,
    REJECTED: packages.filter((p) => p.stack === 'REJECTED').length,
  };

  const handleSubmit = () => {
    const newPackage: Package = {
      id: Date.now(),
      width,
      height,
      length,
      mass,
      stack: currentStack,
    };
    setPackages((prev) => [newPackage, ...prev].slice(0, 10));
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Package Sorting System
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Robotic arm dispatch controller for Thoughtful Automation Factory
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Package Dimensions
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Width: {width} cm
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Height: {height} cm
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Length: {length} cm
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Mass: {mass} kg
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                Volume: {volume.toLocaleString()} cm³
                {isBulky && <span className="ml-2 text-yellow-600">● Bulky</span>}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Mass: {mass} kg
                {isHeavy && <span className="ml-2 text-yellow-600">● Heavy</span>}
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Sort Package
            </button>
          </div>

          {/* Result Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Classification Result
            </h2>

            <div
              className={`p-8 rounded-lg ${STACK_COLORS[currentStack]} bg-opacity-20 dark:bg-opacity-30 text-center`}
            >
              <div
                className={`text-4xl font-bold ${STACK_TEXT_COLORS[currentStack]}`}
              >
                {currentStack}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {currentStack === 'STANDARD' && 'Normal handling'}
                {currentStack === 'SPECIAL' && 'Requires manual handling'}
                {currentStack === 'REJECTED' && 'Cannot be processed'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {(['STANDARD', 'SPECIAL', 'REJECTED'] as Stack[]).map((stack) => (
                <div key={stack} className="text-center">
                  <div
                    className={`text-2xl font-bold ${STACK_TEXT_COLORS[stack]}`}
                  >
                    {stats[stack]}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stack}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Packages Table */}
        {packages.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Packages
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                    <th className="pb-2">Dimensions (cm)</th>
                    <th className="pb-2">Volume</th>
                    <th className="pb-2">Mass</th>
                    <th className="pb-2">Stack</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-b dark:border-gray-700 last:border-0"
                    >
                      <td className="py-2 text-gray-900 dark:text-white">
                        {pkg.width} × {pkg.height} × {pkg.length}
                      </td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {(pkg.width * pkg.height * pkg.length).toLocaleString()} cm³
                      </td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {pkg.mass} kg
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${STACK_COLORS[pkg.stack]} bg-opacity-20 ${STACK_TEXT_COLORS[pkg.stack]}`}
                        >
                          {pkg.stack}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
