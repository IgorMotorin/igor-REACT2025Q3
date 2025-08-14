'use client';

import dynamic from 'next/dynamic';

// import Pagination from '../../component/Pagination';
// import Search from '../../component/Search';
const Search = dynamic(() => import('../../component/Search'), { ssr: false });
const Pagination = dynamic(() => import('../../component/Pagination'), {
  ssr: false,
});

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Search></Search>
      <Pagination></Pagination>
      {children};
    </>
  );
}
