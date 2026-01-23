"use client";

export const AboutSection = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-zinc-100 mb-6">About This Demo</h2>

      <div className="space-y-6 text-zinc-300">
        <section>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">LocalPet</h3>
          <p>
            A virtual pet game built with React and Zustand for state management.
            Your pet&apos;s stats persist in localStorage, so they&apos;ll be waiting for you
            when you come back!
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">Features</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li>Create and customize your virtual pet</li>
            <li>Feed, play, and pet your companion</li>
            <li>Watch stats change in real-time with a game loop</li>
            <li>State persists across browser sessions</li>
            <li>Responsive design for mobile and desktop</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['React 19', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Next.js'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">How It Works</h3>
          <p className="text-zinc-400">
            The game uses Zustand for lightweight state management with localStorage
            persistence. A game loop runs every 10 seconds to gradually decrease your
            pet&apos;s stats, encouraging regular interaction. If you neglect your pet for
            too long, they&apos;ll get extra lonely!
          </p>
        </section>
      </div>
    </div>
  );
};
