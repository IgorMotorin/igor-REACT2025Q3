'use client';

import { useContext, useEffect } from 'react';
import { ThemeContext } from '../store/Context';

export default function ErrorComponent({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      data-theme={theme}
      className="absolute p-10 w-full h-full bg-white z-10 visible  dark:bg-cyan-950 dark:text-white"
    >
      <div className="flex items-center justify-center">
        <span className="text-2xl mr-4">Something went wrong...</span>
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
