import Card from './Card';
import Details from './Details';
import ErrorScreen from './ErrorScreen';
import Spinner from './Spinner';

export default function Result({
  page = 1,
  cards = [],
  error = false,
  spinner = false,
  errorText = '',
}: Readonly<{
  page: number;
  cards: { title: string; id: number; authors: { name: string }[] }[];
  error: boolean;
  spinner: boolean;
  errorText: string;
}>) {
  return (
    <div className="flex ">
      <ErrorScreen run={error} text={errorText}></ErrorScreen>
      <Spinner run={spinner}></Spinner>
      <ul className="flex justify-center content-start flex-wrap">
        {cards.length > 0 ? (
          cards.map((itm, idx) => {
            return (
              <Card
                key={idx + 'a'}
                name={itm.authors[0]?.name}
                text={itm.title}
                id={itm.id}
                page={page}
              ></Card>
            );
          })
        ) : (
          // <Card
          //   key={'a1'}
          //   name={'no result'}
          //   text={'no result'}
          //   page={1}
          //   id={0}
          // ></Card>
          <div className=" items-center p-5 rounded-md w-80">
            <h1 className="font-bold text-xl mb-2">No result...</h1>
          </div>
        )}
      </ul>
      <Details page={page}></Details>
    </div>
  );
}
