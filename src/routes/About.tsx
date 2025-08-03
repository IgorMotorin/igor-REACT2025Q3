import { useContext } from 'react';
import { ThemeContext } from '../component/Context';

export default function About() {
  const theme = useContext(ThemeContext);
  return (
    <div className=" dark:bg-cyan-950 dark:text-white p-5" data-theme={theme}>
      <h1 className="mt-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        About
      </h1>

      <h2 className="text-xl m-6">Hi, my name is Igor!</h2>
      <h2 className="m-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        RS School. React.
      </h2>

      <p className="font-semibold mt-3">
        This course is aimed at the students of the RS School who have passed RS
        School Stage #2 and at the new students who have experience with:
      </p>
      <ul>
        <li>1. JavaScript</li>
        <li>2. TypeScript</li>
        <li>
          3. Git, GitHub (clone, add, commit, push, pull, merge, rebase, pull
          request flow)
        </li>
        <li>4. NPM, Webpack</li>
        <li>5. CSS3 / HTML5</li>
        <li>6. Chrome DevTools, Figma</li>
        <li>
          7. Understanding of how to interact with APIs (general understanding
          of REST and GraphQL)
        </li>
      </ul>
      <a
        href="https://github.com/rolling-scopes-school/tasks/blob/master/react/README.md"
        className="text-blue-800 m-3 mt-4"
      >
        Link:
        https://github.com/rolling-scopes-school/tasks/blob/master/react/README.md
      </a>
    </div>
  );
}
