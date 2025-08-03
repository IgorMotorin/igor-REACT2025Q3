import { Link } from 'react-router';
import { ThemeContext } from './Context';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { on } from '../checkSlice';

export default function Card({
  name = '',
  text = '',
  page = 1,
  id,
  arr = 0,
  inputSearch = 'key',
}: Readonly<{
  name: string;
  text: string;
  page: number;
  id: number;
  arr: number;
  inputSearch: string;
}>) {
  const theme = useContext(ThemeContext);
  const check = useSelector((state) => state.check.value[page][arr].flag);
  const dispatch = useDispatch();
  return (
    <li
      data-theme={theme}
      className="relative m-1  h-44 w-60 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg hover:opacity-80"
    >
      <div className="bg-white h-35 p-5 rounded-md  dark:bg-cyan-950 dark:text-white">
        <Link to={`?page=${page}&details=${id}`} data-theme={theme}>
          <h1 className="font-bold text-xl mb-2">
            {name.length < 20 ? name : name.slice(0, 20) + ' ...'}
          </h1>

          <p>{text.length < 45 ? text : text.slice(0, 45) + ' ...'}</p>
        </Link>
      </div>

      <label
        className="inline-flex items-center ml-2 pt-1"
        htmlFor={String(arr)}
      >
        <input
          id={String(arr)}
          type="checkbox"
          className="w-4 h-4 accent-indigo-700"
          onChange={() =>
            dispatch(on({ page: page, book: arr, search: inputSearch }))
          }
          checked={check}
        ></input>
        <span className="ml-2">checkbox</span>
      </label>
    </li>
  );
}
