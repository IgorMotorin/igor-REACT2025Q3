import { Link } from 'react-router';

export default function Details({
  name = '',
  text = '',
  details = 0,
  page = 1,
}: Readonly<{
  name: string;
  text: string;
  details: number;
  page: number;
}>) {
  return (
    <div
      className={`${details === 0 ? 'hidden' : ''} m-1 w-260 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg`}
    >
      <div className=" p-5 rounded-md">
        <h1 className="font-bold text-2xl mb-2">Панель сведений:</h1>
        <h2 className="font-medium text-xl mb-2">{name}</h2>
        <p>{text}</p>
      </div>

      <Link
        to={`?page=${page}`}
        className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Close
      </Link>
    </div>
  );
}
