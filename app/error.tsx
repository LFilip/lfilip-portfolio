"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-zinc-950 px-6">
      <div className="text-center">
        <div className="text-6xl mb-4">:(</div>
        <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
          Something went wrong
        </h1>
        <p className="text-zinc-400 mb-6 max-w-md">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-emerald-500 text-zinc-950 font-medium rounded-md hover:bg-emerald-400 transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-zinc-700 text-zinc-300 rounded-md hover:border-zinc-500 transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
