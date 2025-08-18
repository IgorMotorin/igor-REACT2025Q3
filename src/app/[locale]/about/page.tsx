import dynamic from 'next/dynamic';

const About = dynamic(() => import('./About'));
export default function Page() {
  return <About></About>;
}
