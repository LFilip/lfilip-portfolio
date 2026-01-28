'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  STANDARD: 'bg-emerald-500',
  SPECIAL: 'bg-yellow-500',
  REJECTED: 'bg-red-500',
};

const STACK_TEXT_COLORS: Record<Stack, string> = {
  STANDARD: 'text-emerald-400',
  SPECIAL: 'text-yellow-400',
  REJECTED: 'text-red-400',
};

const STACK_BG_COLORS: Record<Stack, string> = {
  STANDARD: 'bg-emerald-500/10 border-emerald-500/30',
  SPECIAL: 'bg-yellow-500/10 border-yellow-500/30',
  REJECTED: 'bg-red-500/10 border-red-500/30',
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
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/projects"
            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            &larr; Back to Projects
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-400">
              Demo
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Algorithm
            </span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-100 mb-4">
            Package Sorting System
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mb-6">
            A robotic arm dispatch controller that sorts packages into the correct
            stacks based on their physical dimensions and mass. Built as a solution
            to the Thoughtful Automation factory routing problem.
          </p>
          <div className="flex flex-wrap gap-2">
            {['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Problem Description */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">The Problem</h2>
          <p className="text-zinc-400 mb-6">
            In an automated factory, packages arrive on a conveyor belt and must be
            routed to different handling stacks based on their size and weight. The
            sorting algorithm determines whether each package can be handled automatically,
            requires special manual handling, or must be rejected entirely.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-emerald-500/10 border-emerald-500/30">
              <div className="text-emerald-400 font-semibold mb-2">STANDARD</div>
              <p className="text-sm text-zinc-400">
                Normal packages that can be handled automatically by the robotic arm.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-yellow-500/10 border-yellow-500/30">
              <div className="text-yellow-400 font-semibold mb-2">SPECIAL</div>
              <p className="text-sm text-zinc-400">
                Packages that are too heavy OR too bulky - requires manual handling.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-red-500/10 border-red-500/30">
              <div className="text-red-400 font-semibold mb-2">REJECTED</div>
              <p className="text-sm text-zinc-400">
                Packages that are both heavy AND bulky - cannot be safely processed.
              </p>
            </div>
          </div>
        </section>

        {/* Classification Rules */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Classification Rules</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
              <h3 className="text-zinc-100 font-medium mb-3">Bulky Package</h3>
              <p className="text-sm text-zinc-400 mb-3">A package is bulky if:</p>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">&#8226;</span>
                  Volume (W &times; H &times; L) &ge; 1,000,000 cm&sup3;
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">&#8226;</span>
                  Any dimension &ge; 150 cm
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
              <h3 className="text-zinc-100 font-medium mb-3">Heavy Package</h3>
              <p className="text-sm text-zinc-400 mb-3">A package is heavy if:</p>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">&#8226;</span>
                  Mass &ge; 20 kg
                </li>
              </ul>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-zinc-800 rounded-lg overflow-hidden">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left text-zinc-400 font-medium">Bulky</th>
                  <th className="px-4 py-3 text-left text-zinc-400 font-medium">Heavy</th>
                  <th className="px-4 py-3 text-left text-zinc-400 font-medium">Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr><td className="px-4 py-3 text-zinc-300">No</td><td className="px-4 py-3 text-zinc-300">No</td><td className="px-4 py-3 text-emerald-400 font-medium">STANDARD</td></tr>
                <tr><td className="px-4 py-3 text-zinc-300">Yes</td><td className="px-4 py-3 text-zinc-300">No</td><td className="px-4 py-3 text-yellow-400 font-medium">SPECIAL</td></tr>
                <tr><td className="px-4 py-3 text-zinc-300">No</td><td className="px-4 py-3 text-zinc-300">Yes</td><td className="px-4 py-3 text-yellow-400 font-medium">SPECIAL</td></tr>
                <tr><td className="px-4 py-3 text-zinc-300">Yes</td><td className="px-4 py-3 text-zinc-300">Yes</td><td className="px-4 py-3 text-red-400 font-medium">REJECTED</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Interactive Demo</h2>
          <p className="text-zinc-400 mb-6">
            Try it yourself - adjust the sliders to see how packages are classified in real-time.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-lg font-medium text-zinc-100 mb-4">
                Package Dimensions
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-zinc-400 mb-2">
                    <span>Width</span>
                    <span className="text-zinc-300 font-mono">{width} cm</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-zinc-400 mb-2">
                    <span>Height</span>
                    <span className="text-zinc-300 font-mono">{height} cm</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-zinc-400 mb-2">
                    <span>Length</span>
                    <span className="text-zinc-300 font-mono">{length} cm</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-zinc-400 mb-2">
                    <span>Mass</span>
                    <span className="text-zinc-300 font-mono">{mass} kg</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={mass}
                    onChange={(e) => setMass(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-5 p-3 bg-zinc-800 rounded-lg text-sm font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Volume:</span>
                  <span className="text-zinc-300">
                    {volume.toLocaleString()} cm&sup3;
                    {isBulky && <span className="ml-2 text-yellow-400">Bulky</span>}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400 mt-1">
                  <span>Mass:</span>
                  <span className="text-zinc-300">
                    {mass} kg
                    {isHeavy && <span className="ml-2 text-yellow-400">Heavy</span>}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-lg font-medium transition-colors"
              >
                Sort Package
              </button>
            </div>

            {/* Result Panel */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-lg font-medium text-zinc-100 mb-4">
                Classification Result
              </h3>

              <div
                className={`p-8 rounded-lg border text-center ${STACK_BG_COLORS[currentStack]}`}
              >
                <div
                  className={`text-4xl font-bold ${STACK_TEXT_COLORS[currentStack]}`}
                >
                  {currentStack}
                </div>
                <p className="text-zinc-400 mt-2 text-sm">
                  {currentStack === 'STANDARD' && 'Normal handling - automated'}
                  {currentStack === 'SPECIAL' && 'Requires manual handling'}
                  {currentStack === 'REJECTED' && 'Cannot be processed'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {(['STANDARD', 'SPECIAL', 'REJECTED'] as Stack[]).map((stack) => (
                  <div key={stack} className="text-center">
                    <div
                      className={`text-2xl font-bold font-mono ${STACK_TEXT_COLORS[stack]}`}
                    >
                      {stats[stack]}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {stack}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Packages Table */}
        {packages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">Recent Packages</h2>
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-zinc-500 border-b border-zinc-800">
                      <th className="px-4 py-3 font-medium">Dimensions (cm)</th>
                      <th className="px-4 py-3 font-medium">Volume</th>
                      <th className="px-4 py-3 font-medium">Mass</th>
                      <th className="px-4 py-3 font-medium">Stack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {packages.map((pkg) => (
                      <tr key={pkg.id}>
                        <td className="px-4 py-3 text-zinc-300 font-mono">
                          {pkg.width} &times; {pkg.height} &times; {pkg.length}
                        </td>
                        <td className="px-4 py-3 text-zinc-400 font-mono">
                          {(pkg.width * pkg.height * pkg.length).toLocaleString()} cm&sup3;
                        </td>
                        <td className="px-4 py-3 text-zinc-400 font-mono">
                          {pkg.mass} kg
                        </td>
                        <td className="px-4 py-3">
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
          </section>
        )}

        {/* Implementation */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Implementation</h2>
          <p className="text-zinc-400 mb-4">
            The sorting algorithm is a pure function with full test coverage. It takes
            package dimensions and mass as inputs and returns the appropriate stack classification.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono">
{`function sort(width, height, length, mass): Stack {
  const volume = width * height * length;
  const isBulky = volume >= 1_000_000
                  || width >= 150
                  || height >= 150
                  || length >= 150;
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) return 'REJECTED';
  if (isBulky || isHeavy) return 'SPECIAL';
  return 'STANDARD';
}`}
            </pre>
          </div>
          <p className="text-zinc-500 text-sm mt-4">
            View the full source and tests on{' '}
            <a
              href="https://github.com/LFilip/lfilip-portfolio/blob/main/app/projects/package-sorter/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              GitHub
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
