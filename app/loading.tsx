export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-950 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-10 w-64 bg-zinc-800 rounded-md animate-pulse mb-4" />
          <div className="h-5 w-96 bg-zinc-800/60 rounded-md animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-zinc-800/40 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-zinc-800/40 rounded animate-pulse" />
        </div>

        {/* Cards skeleton */}
        <div className="grid gap-6 mt-12 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
