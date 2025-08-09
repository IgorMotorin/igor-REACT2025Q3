import { useContext } from 'react';
import { useSearchParams } from 'react-router';
import { ThemeContext } from '../Context';
import { useGetBooksQuery } from '../services/booksApi';
import { useSelector } from 'react-redux';
import type { CheckState } from '../store/checkSlice';

export default function Pagination() {
  const theme = useContext(ThemeContext);
  const search = useSelector((state: CheckState) => state.checkReducer.search);
  const pageStr = useSelector((state: CheckState) => state.checkReducer.page);
  const { data } = useGetBooksQuery({
    page: pageStr,
    search: search,
  });
  const page = Number(pageStr);
  const length = data?.count || 0;

  const num = Math.ceil(length / 32) || 0;
  const arr = new Array(num > 10 ? 10 : num).fill('');
  const [, setSearch] = useSearchParams();
  const numPag = page % 10 ? page % 10 : 10;

  return (
    <ol
      className="flex justify-center text-xs font-medium space-x-1 pb-6 dark:bg-cyan-950 dark:text-white"
      data-theme={theme}
    >
      <li>
        <button
          onClick={() => {
            setSearch((prev) => {
              prev.set('page', String(page < 2 ? 1 : Number(page) - 1));
              const searchParam = prev.get('search');

              if (searchParam) {
                prev.set('search', searchParam);
              }

              return prev;
            });
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
                setSearch((prev) => {
                  const searchParam = prev.get('search');
                  prev.set(
                    'page',
                    String(Math.floor((page - 1) / 10) * 10 + idx + 1)
                  );
                  if (searchParam) {
                    prev.set('search', searchParam);
                  }

                  return prev;
                });
              }}
              className={
                idx + 1 == numPag
                  ? // idx + 1 == numPagination % 10 || idx + 1 == 10
                    'block w-8 h-8 text-center border rounded leading-8 text-white bg-blue-600 border-blue-600'
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
            setSearch((prev) => {
              prev.set('page', String(page > num - 1 ? num : Number(page) + 1));
              const searchParam = prev.get('search');

              if (searchParam) {
                prev.set('search', searchParam);
              }

              return prev;
            });
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
    </ol>
  );
}
