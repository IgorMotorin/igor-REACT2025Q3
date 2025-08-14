'use client';
import dynamic from 'next/dynamic';

const Result = dynamic(() => import('../../component/Result'), { ssr: false });
export default function Page() {
  return <Result></Result>;
}
