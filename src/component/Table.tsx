import TableHeader from './TableHeader.tsx';
import TableData from './TableData.tsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { tData } from './SelectYears.tsx';

const Table = ({
  data,
  headers,
  year,
  country,
}: {
  data: tData;
  headers: { [p: string]: boolean };
  year: number;
  country: string[];
}) => {
  const arr = useMemo(
    () => Object.keys(headers).filter((item) => headers[item]),
    [headers]
  );

  const [sortFlag, setSortFlag] = useState(false);
  const [arrCountry, setArrCountry] = useState(country);
  const [sortBy, setSortBy] = useState('');

  const tableDataFunction = useCallback(
    (itm: string, item: string, index: number) => {
      const tmp = data[item].data.filter((el) => el.year == year);

      return <TableData key={itm + index} tmp={tmp} itm={itm}></TableData>;
    },
    [data, year]
  );

  const CountryDataFunction = useCallback(
    (item: string, index: number) => (
      <tr key={'tr' + index}>
        <td className="border px-4 py-2">{item}</td>
        <td className="border px-4 py-2">{data[item]?.iso_code || 'N/A'}</td>
        {arr.map((itm, index) => tableDataFunction(itm, item, index))}
      </tr>
    ),
    [arr, data, tableDataFunction]
  );

  useEffect(() => {
    setArrCountry(country);
    setArrCountry((prev) =>
      [...prev].sort((a, b) => {
        if (sortBy === 'country') {
          if (sortFlag) {
            return b.localeCompare(a);
          } else {
            return a.localeCompare(b);
          }
        }

        if (sortBy === 'iso_code') {
          const aWord = data[a][sortBy] || '';
          const bWord = data[b][sortBy] || '';

          if (sortFlag) {
            return bWord.localeCompare(aWord);
          } else {
            return aWord.localeCompare(bWord);
          }
        } else {
          return 0;
        }
      })
    );
  }, [sortFlag, sortBy, data, country]);

  return (
    <table id="example" className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2  hover:bg-gray-100">
            <button
              className=" text-nowrap hover:cursor-pointer"
              type="button"
              id="sortCountry"
              aria-expanded="false"
              onClick={() => {
                setSortFlag((prev) => !prev);
                setSortBy('country');
              }}
            >
              Country
              <span
                className={`absolute ${sortBy === 'country' && sortFlag ? 'rotate-180' : 'rotate-0'} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 "
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </th>
          <th className="px-4 py-2  hover:bg-gray-100">
            <button
              className="text-nowrap hover:cursor-pointer"
              type="button"
              id="iso_code"
              aria-expanded="false"
              onClick={() => {
                setSortFlag((prev) => !prev);
                setSortBy('iso_code');
              }}
            >
              ISO
              <span
                className={`absolute ${sortBy === 'iso_code' && sortFlag ? 'rotate-180' : 'rotate-0'} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 "
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </th>
          {arr.map((item, index) => (
            <TableHeader key={index} item={item}></TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {arrCountry.map((item, index) => CountryDataFunction(item, index))}
      </tbody>
    </table>
  );
};

export default Table;
