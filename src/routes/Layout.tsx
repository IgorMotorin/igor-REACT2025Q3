import { useContext, useEffect } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router';
import { ThemeContext } from '../Context';
import { useDispatch } from 'react-redux';
import { onPage, onSearch } from '../store/checkSlice';

export default function Layout({
  setTheme,
}: Readonly<{
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}>) {
  const [search] = useSearchParams();

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);
  const classActLink =
    'block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white bg-purple-700';
  const classPendLink =
    'block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';

  useEffect(() => {
    const searchParam = search.get('search') || '';
    const pageParam = search.get('page') || '1';

    dispatch(onPage(pageParam));
    dispatch(onSearch(searchParam));
  }, [search, dispatch]);

  return (
    <>
      <nav
        className="bg-white border-gray-200 py-2.5 dark:bg-cyan-950 dark:text-white"
        data-theme={theme}
      >
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="/" className="flex items-center">
            <svg
              width="80px"
              height="80px"
              viewBox="0 0 1024 1024"
              className="h-6 w-10 mr-3 sm:h-9"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M209.11128 258.0742c20.523667-7.860128 148.469083 191.699787 299.121535 191.699787s267.681023-206.110021 283.837953-195.193177-65.501066 208.730064-54.147548 279.034542c20.523667 145.849041 118.338593 102.181663 127.072069 288.204691 3.49339 80.347974-74.671215 205.236674-364.185928 201.743283S158.893796 906.098081 158.893796 822.256716c0-151.089126 80.784648-131.002132 105.675053-289.951386 10.480171-66.374414-72.92452-262.440938-55.457569-274.23113z"
                fill="#434A54"
              />
              <path
                d="M660.195289 596.496375H566.310427V134.058849a43.667377 43.667377 0 0 0 40.610661-43.667378V43.667377a43.667377 43.667377 0 0 0-43.667377-43.667377H458.888679a43.667377 43.667377 0 0 0-43.667378 43.667377v48.470789a43.667377 43.667377 0 0 0 40.610661 43.667378v460.690831h-87.334754a20.960341 20.960341 0 0 0-20.960341 20.960341v229.690406a20.960341 20.960341 0 0 0 20.960341 20.960341h292.134754a20.960341 20.960341 0 0 0 22.270363-20.960341v-229.690406a20.960341 20.960341 0 0 0-22.707036-20.960341z"
                fill="#D46882"
              />
              <path
                d="M423.518103 653.70064l189.953092 0 0 67.684435-189.953092 0 0-67.684435Z"
                fill="#E6E9ED"
              />
              <path
                d="M423.518103 755.882303l189.953092 0 0 67.684435-189.953092 0 0-67.684435Z"
                fill="#E6E9ED"
              />
            </svg>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              API Querying in React
            </span>
          </a>
          <div className="flex items-center lg:order-2"></div>
          <div
            className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row gap-0.5 lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classActLink : classPendLink
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cards"
                  className={({ isActive }) =>
                    isActive ? classActLink : classPendLink
                  }
                >
                  Cards
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? classActLink : classPendLink
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <button
                  className="ml-3"
                  onClick={() =>
                    setTheme((prev: string) =>
                      prev === 'dark' ? 'light' : 'dark'
                    )
                  }
                >
                  {theme === 'dark' ? (
                    <svg
                      width="80px"
                      height="80px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-cyan-950 dark:text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M9.75 8.25v0.219c0 0.844-0.375 1.25-1.156 1.25s-1.125-0.406-1.125-1.25v-0.219c0-0.813 0.344-1.219 1.125-1.219s1.156 0.406 1.156 1.219zM12.063 9.25l0.156-0.188c0.469-0.688 1.031-0.781 1.625-0.344 0.625 0.438 0.719 1.031 0.25 1.719l-0.188 0.156c-0.469 0.688-1.031 0.781-1.625 0.313-0.625-0.438-0.688-0.969-0.219-1.656zM5 9.063l0.125 0.188c0.469 0.688 0.406 1.219-0.188 1.656-0.625 0.469-1.219 0.375-1.688-0.313l-0.125-0.156c-0.469-0.688-0.406-1.281 0.188-1.719 0.625-0.438 1.219-0.281 1.688 0.344zM8.594 11.125c2.656 0 4.844 2.188 4.844 4.875 0 2.656-2.188 4.813-4.844 4.813-2.688 0-4.844-2.156-4.844-4.813 0-2.688 2.156-4.875 4.844-4.875zM1.594 12.5l0.219 0.063c0.813 0.25 1.063 0.719 0.844 1.469-0.25 0.75-0.75 0.969-1.531 0.719l-0.219-0.063c-0.781-0.25-1.063-0.719-0.844-1.469 0.25-0.75 0.75-0.969 1.531-0.719zM15.375 12.563l0.219-0.063c0.813-0.25 1.313-0.031 1.531 0.719s-0.031 1.219-0.844 1.469l-0.188 0.063c-0.813 0.25-1.313 0.031-1.531-0.719-0.25-0.75 0.031-1.219 0.813-1.469zM8.594 18.688c1.469 0 2.688-1.219 2.688-2.688 0-1.5-1.219-2.719-2.688-2.719-1.5 0-2.719 1.219-2.719 2.719 0 1.469 1.219 2.688 2.719 2.688zM0.906 17.281l0.219-0.063c0.781-0.25 1.281-0.063 1.531 0.688 0.219 0.75-0.031 1.219-0.844 1.469l-0.219 0.063c-0.781 0.25-1.281 0.063-1.531-0.688-0.219-0.75 0.063-1.219 0.844-1.469zM16.094 17.219l0.188 0.063c0.813 0.25 1.063 0.719 0.844 1.469s-0.719 0.938-1.531 0.688l-0.219-0.063c-0.781-0.25-1.063-0.719-0.813-1.469 0.219-0.75 0.719-0.938 1.531-0.688zM3.125 21.563l0.125-0.188c0.469-0.688 1.063-0.75 1.688-0.313 0.594 0.438 0.656 0.969 0.188 1.656l-0.125 0.188c-0.469 0.688-1.063 0.75-1.688 0.313-0.594-0.438-0.656-0.969-0.188-1.656zM13.906 21.375l0.188 0.188c0.469 0.688 0.375 1.219-0.25 1.656-0.594 0.438-1.156 0.375-1.625-0.313l-0.156-0.188c-0.469-0.688-0.406-1.219 0.219-1.656 0.594-0.438 1.156-0.375 1.625 0.313zM9.75 23.469v0.25c0 0.844-0.375 1.25-1.156 1.25s-1.125-0.406-1.125-1.25v-0.25c0-0.844 0.344-1.25 1.125-1.25s1.156 0.406 1.156 1.25z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="80px"
                      height="80px"
                      viewBox="0 -10 58 58"
                      id="b"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-cyan-950 dark:text-white"
                    >
                      <path
                        fill="currentColor"
                        d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"
                      />
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main
        className="dark:bg-cyan-950 dark:text-white h-lvh"
        data-theme={theme}
      >
        <Outlet />
      </main>
    </>
  );
}
