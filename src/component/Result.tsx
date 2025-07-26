import { Outlet } from 'react-router';
import Card from './Card';
import Pagination from './Pagination';

export default function Result({
  cards,
}: Readonly<{
  cards: { fact: string; text: string }[];
}>) {
  return (
    <>
      <Pagination length={cards.length}></Pagination>
      <ul className="flex justify-center flex-wrap">
        {cards.length > 0 ? (
          cards.map((itm, idx) => {
            return (
              <Card key={idx + 'a'} name={itm.fact} text={itm.text}></Card>
            );
          })
        ) : (
          <Card key={'a1'} name={'no result'} text={'no result'}></Card>
        )}
      </ul>
      <Outlet></Outlet>
    </>
  );
}
