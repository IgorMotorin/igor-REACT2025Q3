import './globals.css';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import Nav from '../component/Nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <head>
          <title>Task 6. Next.js. Server Side Rendering</title>
          <meta
            name="description"
            content="Task 6. Next.js. Server Side Rendering"
          />
        </head>
        <div id="root">
          <StoreProvider>
            <ThemeProvider>
              <Nav></Nav>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
