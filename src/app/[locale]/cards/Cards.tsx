'use client';
import Result from '../../../component/Result';
import Pagination from '../../../component/Pagination';
import dynamic from 'next/dynamic';

const Search = dynamic(() => import('../../../component/Search'), {
  ssr: false,
});

const Popup = dynamic(() => import('../../../component/Popup'));
const Details = dynamic(() => import('../../../component/Details'));

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
