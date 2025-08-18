'use client';

import { useCallback, useContext, useEffect } from 'react';
import { ThemeContext } from '../store/Context';
import {
  onInput,
  onPage,
  onSearch,
  type CheckState,
} from '../store/checkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBooksQuery } from '../services/booksApi';
import { useLocalStorage } from '../hooks/hooks';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Search() {
  const t = useTranslations('cards');
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const input = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.input
  );
  const search = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.search
  );
  const page = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.page
  );

  const { data } = useGetBooksQuery({
    page: page,
    search: search,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }, []);

  const [key, setKey] = useLocalStorage('appKey', '');

  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    const pageParam = searchParams.get('page') || '1';
    dispatch(onPage(pageParam));
    dispatch(onSearch(searchParam));
  }, [searchParams, dispatch]);

  return (
    <div
      className="flex flex-1 items-center justify-center p-6 dark:bg-cyan-950 dark:text-white"
      data-theme={theme}
    >
      <div className="w-full max-w-lg">
        <form className="mt-5 sm:flex sm:items-center">
          <input
            id="q"
            name="q"
            className="inline w-full rounded-md border border-gray-300 bg-white dark:text-black py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder={t('search') + '...'}
            type="search"
            autoFocus={false}
            onChange={(e) => {
              dispatch(onInput(e.target.value.toLowerCase()));
              setKey(e.target.value.toLowerCase().trim());
            }}
            value={input || key}
          ></input>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={(e) => {
              e.preventDefault();
              const inputParam = input.trim();
              dispatch(onInput(inputParam));
              setKey(inputParam);
              router.push(
                pathname +
                  '?' +
                  createQueryString('search', inputParam) +
                  '&' +
                  createQueryString('page', '1')
              );
            }}
          >
            {t('search')}
          </button>

          <div className="relative right-4 bottom-5 -mr-6 inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-400 text-white">
            {data?.count || 0}
          </div>
        </form>
      </div>
    </div>
  );
}
