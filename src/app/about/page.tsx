'use client';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('../../routes/About'));
export default function Page() {
  return <About></About>;
}
