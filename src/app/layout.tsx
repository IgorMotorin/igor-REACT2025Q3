'use client';

import './globals.css';
import { useState } from 'react';
// import { NavLink, useSearchParams } from 'react-router';
import { ThemeContext } from '../Context';
import { Provider } from 'react-redux';
// import { onPage, onSearch } from '../store/checkSlice';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import Logo from './logo';
// import BtnTheme from './btnTheme';
// import dynamic from 'next/dynamic';
import { store } from '../store/store';
import Nav from './nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [search] = useSearchParams();
  const [theme, setTheme] = useState('light');
  // const pathname = usePathname();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const searchParam = search.get('search') || '';
  //   const pageParam = search.get('page') || '1';

  //   dispatch(onPage(pageParam));
  //   dispatch(onSearch(searchParam));
  // }, [search, dispatch]);

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
          <Provider store={store}>
            <ThemeContext value={theme}>
              <Nav theme={theme} setTheme={setTheme}></Nav>
              <main
                className="dark:bg-cyan-950 dark:text-white h-lvh"
                data-theme={theme}
              >
                {children}
              </main>
            </ThemeContext>
          </Provider>
        </div>
      </body>
    </html>
  );
}
