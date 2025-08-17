'use client';

import { useContext, useEffect, useMemo } from 'react';
import Card from './Card';
import ErrorScreen from './ErrorScreen';
import Spinner from './Spinner';
import { ThemeContext } from '../store/Context';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBooksQuery } from '../services/booksApi';
import { onBooks, type CheckState, type type_books } from '../store/checkSlice';
import { errorHandler } from '../function/errorHandler';

export default function Result() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const search = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.search
  );
  const pageStr = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.page
  );

  const page = Number(pageStr);
  const { data, error, isError, isFetching } = useGetBooksQuery({
    page: pageStr,
    search: search,
  });
  const cards = useMemo(() => data?.results || [], [data]);

  useEffect(() => {
    interface IObj {
      [key: string]: { id: string; title: string; authors: [{ name: string }] };
    }
    const obj: IObj = {};
    cards.forEach((itm) => {
      obj[itm.id] = itm;
    });
    dispatch(onBooks(obj));
  }, [cards, dispatch]);

  return (
    <div data-theme={theme} className="flex dark:bg-cyan-950 dark:text-white">
      <ErrorScreen run={isError} text={errorHandler(error) || ''}></ErrorScreen>
      <Spinner run={isFetching}></Spinner>
      <ul
        className="flex justify-center content-start flex-wrap dark:bg-cyan-950 dark:text-white"
        data-theme={theme}
      >
        {cards.length > 0 ? (
          cards.map((itm: type_books, idx) => {
            return (
              <Card
                key={idx + 'a'}
                name={itm.authors[0]?.name}
                text={itm.title}
                id={Number(itm.id)}
                page={page}
                search={search}
              ></Card>
            );
          })
        ) : (
          <div className=" items-center p-5 rounded-md w-80">
            <h1 className="font-bold text-xl mb-2">No result...</h1>
          </div>
        )}
      </ul>
    </div>
  );
}
