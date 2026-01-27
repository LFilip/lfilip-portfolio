import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-zinc-950 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-emerald-400 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
          Page not found
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-emerald-500 text-zinc-950 font-medium rounded-md hover:bg-emerald-400 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
