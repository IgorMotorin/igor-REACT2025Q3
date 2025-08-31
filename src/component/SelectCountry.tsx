import { useState } from 'react';
import * as React from 'react';
export type tCountry = { [country: string]: boolean };

const SelectCountry = ({
  country,
  setCountry,
}: {
  country: tCountry;
  setCountry: React.Dispatch<React.SetStateAction<tCountry>>;
}) => {
  const arr = Object.keys(country).sort();
  const [see, setSee] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="button"
        id="dropdownMenuButton1"
        aria-expanded="false"
        onClick={() => {
          setSee(!see);
        }}
      >
        Country
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
      <ul
        className={`absolute z-[1000] float-left pl-2 m-1 ${see ? '' : 'hidden'} overflow-y-scroll h-120 min-w-max list-none rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg dark:bg-surface-dark`}
        aria-labelledby="dropdownMenuButton1"
      >
        {arr.map((select) => (
          <li key={select}>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                id={select}
                checked={country[select]}
                type="checkbox"
                onChange={() => {
                  const obj = { ...country };
                  obj[select] = !obj[select];
                  setCountry(obj);
                }}
                className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-black ">{select}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectCountry;
