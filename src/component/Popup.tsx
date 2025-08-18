'use client';

import { useDispatch, useSelector } from 'react-redux';
import { onCheck } from '../store/checkSlice';
import { type CheckState } from '../store/checkSlice';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function Popup() {
  const t = useTranslations('cards');
  const check = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.value
  );

  const allBooks = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.books
  );

  const dispatch = useDispatch();

  const arr = Object.entries(check || []);

  const toCSV = useCallback(() => {
    const arr = Object.entries(check || []);
    const arrBooks = Object.entries(allBooks || []);

    const csvString = [
      ['id:', 'Title:', 'Authors:'],
      ...arrBooks
        .filter((item) =>
          [...new Set(arr.join(',').split(','))].includes(String(item[0]))
        )
        .map((item) => [item[1].id, item[1].title, item[1].authors[0]?.name]),
    ]
      .map((row) => row.join(';'))
      .join('\n');

    const url = 'data:text/csv;charset=utf-8,' + csvString;
    return url;
  }, [check, allBooks]);

  return (
    <div
      className={`fixed ${arr.length > 0 ? '' : 'invisible'} bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg dark:bg-white bg-gray-800 p-2 drop-shadow-2xl`}
      id="gdpr"
    >
      <div className="flex flex-col items-center justify-between gap-6 text-sm">
        <div className="content-left pl-2 dark:text-black text-white">
          <div className="relative right-2 bottom-4 -mr-6 inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-2xs font-semibold leading-4 bg-blue-500 text-white">
            {arr.length}
          </div>

          <div className="flex justify-center rounded-lg">
            <ul className=" rounded-lg w-auto bg-gray-800 text-white dark:bg-white dark:text-gray-900 ">
              {arr.map((item, idx) => {
                const obj = allBooks[Number(item[0])];

                return (
                  <li
                    key={'s' + idx}
                    className="px-2 py-2 border-b border-gray-200 w-full items-center flex hover:bg-gray-700 dark:hover:bg-gray-100"
                  >
                    <input
                      id={'g' + idx}
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600 mr-2"
                      onChange={() => {
                        dispatch(onCheck({ id: item[0] }));
                      }}
                      checked={check[Number(item[0])]}
                    ></input>
                    <label
                      title="selected book"
                      className="inline-flex items-center mr-2"
                      htmlFor={'g' + idx}
                    >
                      {t('book')}
                    </label>

                    <p className="font-bold">id: {item[0]}</p>
                    <p>: {obj?.authors[0]?.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="content-right  justify-center gap-1 flex flex-wrap">
          <button
            disabled={arr.length == 0}
            onClick={() => {
              arr.forEach((item) => dispatch(onCheck({ id: item[0] })));
            }}
            className=" hover:opacity-80 disabled:opacity-30 active:cursor-pointer m-1 rounded-full dark:bg-gray-800 dark:text-white bg-gray-200 px-4 py-2 text-black"
          >
            {t('unselect')}
          </button>
          <a
            download={`${arr.length}-books.csv`}
            className="hover:opacity-80 disabled:opacity-30 active:cursor-pointer m-1 rounded-full dark:bg-gray-800 dark:text-white bg-gray-200 px-4 py-2 text-black"
            href={toCSV()}
          >
            {t('download')}
          </a>
        </div>
      </div>
    </div>
  );
}
