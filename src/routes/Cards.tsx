import { Outlet } from 'react-router';
import Pagination from '../component/Pagination';
import Search from '../component/Search';

export default function Cards() {
  return (
    <>
      <Search></Search>
      <Pagination></Pagination>
      <Outlet></Outlet>
    </>
  );
}
