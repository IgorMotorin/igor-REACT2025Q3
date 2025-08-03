import { useContext } from 'react';
import Card from './Card';
import Details from './Details';
import ErrorScreen from './ErrorScreen';
import Spinner from './Spinner';
import { ThemeContext } from './Context';

export default function Result({
  page = 1,
  cards = [],
  error = false,
  spinner = false,
  errorText = '',
  inputSearch = 'key',
}: Readonly<{
  page: number;
  cards: { title: string; id: number; authors: { name: string }[] }[];
  error: boolean;
  spinner: boolean;
  errorText: string;
  inputSearch: string;
}>) {
  const theme = useContext(ThemeContext);
  return (
    <div data-theme={theme} className="flex dark:bg-cyan-950 dark:text-white">
      <ErrorScreen run={error} text={errorText}></ErrorScreen>
      <Spinner run={spinner}></Spinner>
      <ul
        className="flex justify-center content-start flex-wrap dark:bg-cyan-950 dark:text-white"
        data-theme={theme}
      >
        {cards.length > 0 ? (
          cards.map((itm, idx) => {
            return (
              <Card
                key={idx + 'a'}
                name={itm.authors[0]?.name}
                text={itm.title}
                id={itm.id}
                page={page}
                arr={idx}
                inputSearch={inputSearch}
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
    </div>
  );
}
