import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task 6. Next.js. Server Side Rendering',
  description: '  title: Task 6. Next.js. Server Side Rendering',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
