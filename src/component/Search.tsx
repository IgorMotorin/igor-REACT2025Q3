import { useCallback, useEffect, useState } from 'react';
import type { tCountry } from './SelectCountry.tsx';
import * as React from 'react';

export default function Search({
  country,
  setCountry,
}: {
  country: tCountry;
  setCountry: React.Dispatch<React.SetStateAction<tCountry>>;
}) {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(Object.entries(country).length);

  const handleSearch: React.MouseEventHandler<HTMLButtonElement> | undefined =
    useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (e) => {
        e.preventDefault();
        const inputParam = search.trim();
        const filterCountry = Object.fromEntries(
          Object.entries(country).filter(([key]) => {
            const regex = new RegExp(inputParam, 'i');
            return regex.test(key.toLowerCase());
          })
        );

        setCountry(filterCountry);
        setCount(Object.entries(filterCountry).length);
      },
      [search, country, setCountry]
    );

  useEffect(() => {
    setCount(Object.entries(country).length);
  }, [country]);

  return (
    <div className="flex flex-1 items-center justify-center dark:bg-cyan-950 dark:text-white">
      <div className="w-full max-w-lg">
        <form className=" sm:flex sm:items-center">
          <input
            id="q"
            name="q"
            className="inline w-full rounded-md border border-gray-300 bg-white dark:text-black py-1 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search..."
            type="search"
            autoFocus={false}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></input>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-1 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleSearch}
          >
            Search
          </button>

          <div className="relative right-4 bottom-5 -mr-6 inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-400 text-white">
            {count || 0}
          </div>
        </form>
      </div>
    </div>
  );
}
