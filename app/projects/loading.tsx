export default function ProjectsLoading() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-950 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-10 w-48 bg-zinc-800 rounded-md animate-pulse mb-4" />
          <div className="h-5 w-80 bg-zinc-800/60 rounded-md animate-pulse" />
        </div>

        {/* Filter skeleton */}
        <div className="flex gap-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-9 w-24 bg-zinc-800/50 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Project cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-zinc-800 animate-pulse" />
              {/* Content */}
              <div className="p-5">
                <div className="h-6 w-3/4 bg-zinc-800 rounded animate-pulse mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-zinc-800/40 rounded animate-pulse" />
                </div>
                {/* Tags */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-zinc-800/50 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-zinc-800/50 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
