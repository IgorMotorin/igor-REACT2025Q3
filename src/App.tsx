import { useEffect, useState } from 'react';
import axios from 'axios';

import Table from './component/Table.tsx';
import getHeaders from './function/getHeaders.tsx';
import SelectHeaders from './component/SelectHeaders.tsx';
import SelectYears from './component/SelectYears.tsx';
import getAllCountry from './function/getAllCountry.tsx';
import SelectCountry from './component/SelectCountry.tsx';
import Search from './component/Search.tsx';
import Modal from './component/Modal.tsx';

const App = () => {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [headers, setHeaders] = useState(getHeaders(data));
  const [allCountry, setAllCountry] = useState(getAllCountry(data));
  const [country, setCountry] = useState(allCountry);
  const [year, setYear] = useState<number>(2023);
  const [isShowing, setIsShowing] = useState(false);

  const procent = (load * 100).toFixed(0);
  const fallback = (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg w-72  m-4 block p-4">
        <span className="mr-2 text-xs font-medium">Loading {procent}%</span>
        <div className="w-full h-4 bg-gray-400 rounded-full">
          <div
            style={{ width: `${procent}%` }}
            className="h-full text-center text-xs text-white bg-violet-500 rounded-full"
          >
            {procent}%
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json',
        {
          responseType: 'json',
          onDownloadProgress: function (progressEvent) {
            setLoad((prev) => {
              if (progressEvent.progress) {
                if (prev > progressEvent.progress) {
                  return prev;
                } else {
                  return progressEvent.progress || 0;
                }
              } else {
                return 0;
              }
            });
          },
        }
      )
      .then((response) => {
        const filtered = response.data;

        setData(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    setAllCountry(getAllCountry(data));
    setHeaders(getHeaders(data));
    setCountry(getAllCountry(data));
  }, [data]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={'flex items-center'}>
        <h2 className="text-2xl font-bold mb-4">Data on CO2</h2>

        <button
          className="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          type="button"
          id="dropdownMenuButton1"
          aria-expanded="false"
          onClick={() => setIsShowing(true)}
        >
          Column
          <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <SelectCountry
          country={country}
          setCountry={setCountry}
        ></SelectCountry>
        <Modal isShowing={isShowing} handleClose={() => setIsShowing(false)}>
          <SelectHeaders
            selects={headers}
            setSelects={setHeaders}
          ></SelectHeaders>
        </Modal>

        <SelectYears data={data} year={year} setYear={setYear}></SelectYears>
        <Search country={allCountry} setCountry={setCountry}></Search>
      </div>
      {loading ? (
        fallback
      ) : (
        <Table
          data={data}
          headers={headers}
          year={year}
          country={Object.keys(country).filter((itm) => country[itm])}
        ></Table>
      )}
    </div>
  );
};

export default App;
