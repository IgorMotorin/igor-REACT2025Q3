'use client';

import { useContext, useEffect, useState } from 'react';
import MinSpinner from './MinSpinner';
import { ThemeContext } from '../store/Context';
import { useGetBookQuery } from '../services/booksApi';
import { errorHandler } from '../function/errorHandler';
import { useSearchParams } from 'next/navigation';
import { Link } from '../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Details() {
  const t = useTranslations('cards');
  const theme = useContext(ThemeContext);
  const searchParam = useSearchParams();
  const [on, setOn] = useState(false);
  const details = searchParam.get('details') || '';
  const page = searchParam.get('page') || '';
  const search = searchParam.get('search') || '';
  const { data, error, isError, isFetching, refetch } = useGetBookQuery(
    details,
    {
      skip: !details,
    }
  );

  useEffect(() => {
    if (!details) {
      setOn(false);
    } else {
      setOn(true);
    }
  }, [details]);

  const err = (
    <div className="text-1xl p-5 text-red-500">{errorHandler(error)}</div>
  );

  return (
    <div
      data-theme={theme}
      className={`${on ? '' : 'hidden'} fixed overflow-y-scroll top-1 right-1 z-11 m-1 p-3 h-11/12 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 shadow-lg dark:bg-cyan-950 dark:text-white`}
    >
      {isFetching ? (
        <MinSpinner></MinSpinner>
      ) : (
        <div className="">
          {isError ? (
            err
          ) : (
            <div className=" p-5 rounded-md w-80">
              <h1 className="font-bold text-xl mb-2">id:{data?.id}</h1>
              <h2 className="font-medium text-2xl mb-2">
                {data?.authors[0]?.name}
              </h2>
              <p className="text-xl mb-2">{data?.title.slice(0, 100)}</p>
              <p className="text-sm mb-2">{data?.summaries}</p>
            </div>
          )}

          <Link
            scroll={false}
            href={`?page=${page}&search=${search}`}
            className="mt-3 flex-inline w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {t('close')}
          </Link>
          <button
            onClick={() => {
              refetch();
            }}
            className="mt-3 flex-inline w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {t('cache')}
          </button>
        </div>
      )}
    </div>
  );
}
