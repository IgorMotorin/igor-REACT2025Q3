'use client';
import Result from '../../component/Result';
import Pagination from '../../component/Pagination';
// import Search from '../../component/Search';
import Details from '../../component/Details';
import Popup from '../../component/Popup';

import dynamic from 'next/dynamic';
const Search = dynamic(() => import('../../component/Search'), {
  ssr: false,
});

export default function Cards() {
  return (
    <>
      <Search></Search>
      <Pagination></Pagination>
      <Result></Result>
      <Details></Details>
      <Popup></Popup>
    </>
  );
}
