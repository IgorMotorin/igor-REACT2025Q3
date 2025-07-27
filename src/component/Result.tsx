import Card from './Card';
import Details from './Details';

export default function Result({
  cards,
  page,
  details,
}: Readonly<{
  cards: { fact: string; text: string }[];
  page: number;
  details: number;
}>) {
  return (
    <div className="flex">
      <ul className="flex justify-center flex-wrap">
        {cards.length > 0 ? (
          cards.map((itm, idx) => {
            return (
              <Card
                key={idx + 'a'}
                name={itm.fact}
                text={itm.text}
                page={page}
                details={idx + 1}
              ></Card>
            );
          })
        ) : (
          <Card
            key={'a1'}
            name={'no result'}
            text={'no result'}
            page={1}
            details={0}
          ></Card>
        )}
      </ul>
      <Details
        name={cards[details - 1]?.fact}
        text={cards[details - 1]?.text}
        details={details}
        page={page}
      ></Details>
    </div>
  );
}
