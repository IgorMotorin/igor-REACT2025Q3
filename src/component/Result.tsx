import Card from './Card';

export default function Result({
  cards,
}: Readonly<{
  cards: { fact: string; text: string }[];
}>) {
  return (
    <ul className="flex justify-center flex-wrap">
      {cards.length > 0 ? (
        cards.map((itm, idx) => {
          return <Card key={idx + 'a'} name={itm.fact} text={itm.text}></Card>;
        })
      ) : (
        <Card key={'a1'} name={'no result'} text={'no result'}></Card>
      )}
    </ul>
  );
}
