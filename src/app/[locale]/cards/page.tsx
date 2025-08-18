import dynamic from 'next/dynamic';

const Cards = dynamic(() => import('./Cards'));

export default function Page() {
  return <Cards></Cards>;
}
