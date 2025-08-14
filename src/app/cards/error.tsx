'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute p-10 w-full h-full bg-white opacity-90 z-10 visible">
      <div className="flex items-center justify-center">
        <span className="text-2xl mr-4">Something went wrong</span>
      </div>
      <button
        onClick={() => reset()}
        className="max-w-42 min-w-24 py-2 px-2 font-medium rounded-lg transition-colors focus:outline-none bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-600"
      >
        Reset
      </button>
    </div>
  );
}
