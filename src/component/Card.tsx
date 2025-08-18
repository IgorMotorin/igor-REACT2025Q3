'use client';

import { ThemeContext } from '../store/Context';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onCheck } from '../store/checkSlice';
import { type CheckState } from '../store/checkSlice';
import { Link } from '../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Card({
  name = '',
  text = '',
  page = 1,
  id = 0,
  search = '',
}: Readonly<{
  name: string;
  text: string;
  page: number;
  id: number;
  search: string;
}>) {
  const t = useTranslations('cards');
  const theme = useContext(ThemeContext);
  const check = !useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.value[id]
  );
  const dispatch = useDispatch();
  return (
    <li
      data-theme={theme}
      className={`relative m-1  h-44 w-60 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300  p-0.5 shadow-lg hover:opacity-80 ${
        !check ? 'from-pink-600 to-blue-600' : ''
      }`}
    >
      <Link
        scroll={false}
        href={`?page=${page}&search=${search}&details=${id}`}
        data-theme={theme}
      >
        <div className="bg-white h-35 p-5 rounded-md dark:bg-cyan-950 dark:text-white">
          <h1 className="font-bold text-xl mb-2">
            {name.length < 20 ? name : name.slice(0, 20) + ' ...'}
          </h1>

          <p>{text.length < 45 ? text : text.slice(0, 45) + ' ...'}</p>
        </div>
      </Link>
      <label
        className="inline-flex items-center ml-2 pt-1"
        htmlFor={String(id)}
      >
        <input
          id={String(id)}
          type="checkbox"
          className="w-4 h-4 accent-blue-600"
          onChange={() => dispatch(onCheck({ id: id }))}
          checked={!check}
        ></input>
        <span className="ml-2">{t('cart')}</span>
      </label>
    </li>
  );
}
