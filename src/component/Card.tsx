import { Link } from 'react-router';
import { ThemeContext } from './Context';
import { useContext } from 'react';

export default function Card({
  name = '',
  text = '',
  page,
  id,
}: Readonly<{
  name: string;
  text: string;
  page: number;
  id: number;
}>) {
  const theme = useContext(ThemeContext);
  return (
    <Link to={`?page=${page}&details=${id}`} data-theme={theme}>
      <li
        data-theme={theme}
        className="relative m-1  h-40 w-60 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg"
      >
        <div className="bg-white h-35 p-5 rounded-md  dark:bg-cyan-950 dark:text-white">
          <h1 className="font-bold text-xl mb-2">
            {name.length < 20 ? name : name.slice(0, 20) + ' ...'}
          </h1>
          <p>{text.length < 45 ? text : text.slice(0, 45) + ' ...'}</p>
        </div>
      </li>
    </Link>
  );
}
