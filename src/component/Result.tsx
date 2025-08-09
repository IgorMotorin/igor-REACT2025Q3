import { useContext } from 'react';
import Card from './Card';
import Details from './Details';
import ErrorScreen from './ErrorScreen';
import Spinner from './Spinner';
import { ThemeContext } from '../Context';
import { useSelector } from 'react-redux';
import { useGetBooksQuery } from '../services/booksApi';
import type { CheckState, type_books } from '../store/checkSlice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import Popup from './Popup';

export default function Result() {
  const theme = useContext(ThemeContext);
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
  const cards = data?.results || [];

  const errorHandler = (
    error: FetchBaseQueryError | SerializedError | undefined
  ) => {
    if (!error) return '';

    if ('status' in error) {
      const fetchError = error;
      const out = 'Ошибка запроса:' + fetchError.status;
      const data = typeof fetchError.data === 'string' && fetchError.data;

      return out + data;
    }
  };

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
              ></Card>
            );
          })
        ) : (
          <div className=" items-center p-5 rounded-md w-80">
            <h1 className="font-bold text-xl mb-2">No result...</h1>
          </div>
        )}
      </ul>
      <Details page={page}></Details>
      <Popup></Popup>
    </div>
  );
}
