'use client';

import ErrorComponent from '../../../component/ErrorComponent';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return <ErrorComponent error={error} reset={reset}></ErrorComponent>;
}
