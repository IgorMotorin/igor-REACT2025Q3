import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import MinSpinner from './MinSpinner';
import { BASE_URL } from '../routes/URL';
import { ThemeContext } from './Context';

export default function Details({ page }: Readonly<{ page: number }>) {
  const [search] = useSearchParams();
  const [books, setBooks] = useState({
    id: null,
    authors: [{ name: '' }],
    title: '',
    summaries: '',
  });
  const [spinner, setSpinner] = useState(false);
  const [on, setOn] = useState(false);
  const [error, setError] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const searchTerm = search.get('details') || '';
    if (!searchTerm) {
      setOn(false);
    } else {
      const url = BASE_URL + searchTerm + '/';
      setSpinner(true);
      setOn(true);
      fetch(url)
        .then((req) => {
          if (req.ok) {
            setSpinner(false);
            return req.json();
          } else {
            setSpinner(false);
            setError(true);
          }
        })
        .then((req) => {
          setBooks(req);
        })
        .catch((err) => {
          setSpinner(false);
          setError(true);

          console.log(err);
        });
    }
  }, [search]);
  return error ? (
    <div className="text-1xl p-2 text-red-500">Error connection!</div>
  ) : (
    <div
      data-theme={theme}
      className={`${on ? '' : 'hidden'} relative m-1 p-3 h-full  rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 shadow-lg dark:bg-cyan-950 dark:text-white`}
    >
      {spinner ? (
        <MinSpinner></MinSpinner>
      ) : (
        <div>
          <div className=" p-5 rounded-md w-80">
            <h1 className="font-bold text-xl mb-2">id:{books.id}</h1>
            <h2 className="font-medium text-2xl mb-2">
              {books.authors[0].name}
            </h2>
            <p className="text-xl mb-2">{books.title}</p>
            <p className="text-sm mb-2">{books.summaries}</p>
          </div>

          <Link
            to={`?page=${page}`}
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </Link>
        </div>
      )}
    </div>
  );
}
