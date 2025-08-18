'use client';

import { useCallback, useContext } from 'react';
import { ThemeContext } from '../store/Context';
import { useGetBooksQuery } from '../services/booksApi';
import { useSelector } from 'react-redux';
import type { CheckState } from '../store/checkSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Pagination() {
  const t = useTranslations('cards');
  const theme = useContext(ThemeContext);
  const search = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.search
  );
  const pageStr = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.page
  );
  const { data, refetch } = useGetBooksQuery({
    page: pageStr,
    search: search,
  });
  const page = Number(pageStr);
  const length = data?.count || 0;

  const num = Math.ceil(length / 32) || 0;
  const arr = new Array(num > 10 ? 10 : num).fill('');
  const numPag = page % 10 ? page % 10 : 10;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParam = searchParams.get('search') || '';

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }, []);

  const dec = (page: number) => {
    return String(page < 2 ? 1 : Number(page) - 1);
  };

  const inc = (page: number) => {
    return String(page > num - 1 ? num : Number(page) + 1);
  };
  const cur = (page: number, idx: number) => {
    return String(Math.floor((page - 1) / 10) * 10 + idx + 1);
  };

  return (
    <ol
      className="flex justify-center text-xs font-medium space-x-1 pb-6 dark:bg-cyan-950 dark:text-white"
      data-theme={theme}
    >
      <li>
        <button
          onClick={() => {
            router.push(
              pathname +
                '?' +
                createQueryString('search', searchParam) +
                '&' +
                createQueryString('page', dec(page))
            );
          }}
          disabled={page < 2}
          className={`inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded ${page < 2 ? '' : 'hover:bg-blue-200  active:text-white active:bg-blue-600 active:border-blue-600'} `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      {arr.map((item, idx) => {
        return (
          <li key={'f' + item + idx}>
            <button
              onClick={() => {
                router.push(
                  pathname +
                    '?' +
                    createQueryString('search', searchParam) +
                    '&' +
                    createQueryString('page', cur(page, idx))
                );
              }}
              className={
                idx + 1 == numPag
                  ? 'block w-8 h-8 text-center border rounded leading-8 text-white bg-blue-600 border-blue-600'
                  : 'block w-8 h-8 text-center border border-gray-100 rounded leading-8 hover:bg-blue-200'
              }
            >
              {' '}
              {Math.floor((page - 1) / 10) * 10 + idx + 1}{' '}
            </button>
          </li>
        );
      })}

      <li>
        <button
          onClick={() => {
            router.push(
              pathname +
                '?' +
                createQueryString('search', searchParam) +
                '&' +
                createQueryString('page', inc(page))
            );
          }}
          disabled={page > num - 1}
          className={`inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded ${page > num - 1 ? '' : 'hover:bg-blue-200 active:text-white active:bg-blue-600 active:border-blue-600'} `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            refetch();
          }}
          className={`inline-flex p-1 items-center justify-center w-auto h-8 border border-gray-100 rounded hover:bg-blue-200 active:text-white active:bg-blue-600 active:border-blue-600`}
        >
          {t('cache')}
        </button>
      </li>
    </ol>
  );
}
