'use client';

import './globals.css';
import { useState } from 'react';
// import { NavLink, useSearchParams } from 'react-router';
import { ThemeContext } from '../Context';
import { Provider } from 'react-redux';
// import { onPage, onSearch } from '../store/checkSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import Logo from './logo';
// import BtnTheme from './btnTheme';
import dynamic from 'next/dynamic';
import { store } from '../store/store';

const Logo = dynamic(() => import('./logo'));
const BtnTheme = dynamic(() => import('./btnTheme'));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [search] = useSearchParams();
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  // const dispatch = useDispatch();

  const classActLink =
    'block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white bg-purple-700';
  const classPendLink =
    'block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';

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
              <nav
                className="bg-white border-gray-200 py-2.5 dark:bg-cyan-950 dark:text-white"
                data-theme={theme}
              >
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                  <Logo href="/" text="API Querying in React"></Logo>
                  <div className="flex items-center lg:order-2"></div>
                  <div
                    className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
                    id="mobile-menu-2"
                  >
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row gap-0.5 lg:space-x-8 lg:mt-0">
                      <li>
                        <Link
                          href="/"
                          className={
                            pathname === '/' ? classActLink : classPendLink
                          }
                          aria-current="page"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/cards"
                          className={
                            pathname === '/cards' ? classActLink : classPendLink
                          }
                        >
                          Cards
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about"
                          className={
                            pathname === '/about' ? classActLink : classPendLink
                          }
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <BtnTheme theme={theme} setTheme={setTheme}></BtnTheme>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

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
