import { Outlet } from 'react-router';
import Pagination from '../component/Pagination';
import Search from '../component/Search';
import type { MouseEventHandler } from 'react';

export default function Cards({
  onChange,
  onSearch,
  input,
  number,
  pagination,
  numPagination,
}: Readonly<{
  onChange: (e: { target: { value: string } }) => void;
  onSearch: MouseEventHandler<HTMLButtonElement>;
  input: string;
  number: number;
  pagination: number;
  numPagination: number;
}>) {
  return (
    <>
      <Search
        onChange={onChange}
        onSearch={onSearch}
        value={input}
        number={number}
      ></Search>
      <Pagination
        length={pagination}
        numPagination={numPagination}
      ></Pagination>
      <Outlet></Outlet>
    </>
  );
}
