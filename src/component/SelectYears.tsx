import getYears from '../function/getYears.tsx';
import * as React from 'react';
import { memo, useMemo } from 'react';

export type tData = {
  [country: string]: {
    iso_code?: string;
    data: { year: number }[];
  };
};
const SelectYears = ({
  data,
  year,
  setYear,
}: {
  data: tData;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const years = useMemo(() => getYears(data), [data]);
  return (
    <div className=" relative flex items-center ">
      <label
        htmlFor="small"
        className="block font-medium text-gray-900 dark:text-white"
      ></label>
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        id="small"
        className="block w-full bg-none font-medium text-xs bg-white border-none rounded-md py-2 pl-3 pr-10  text-black focus:outline-none focus:ring-white focus:border-black sm:text-sm"
      >
        {years.map((select, idx) => (
          <option key={'opt' + idx} value={select}>
            {select}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectYears);
