import { useContext, useState } from 'react';
import ButtonErr from '../component/ButtonErr';
import { ThemeContext } from '../component/Context';

export default function Home() {
  const [buttonError, setButtonError] = useState(false);
  const theme = useContext(ThemeContext);
  if (buttonError) {
    throw new Error('I crashed!');
  }
  return (
    <div className=" dark:bg-cyan-950 dark:text-white" data-theme={theme}>
      <h1 className="pt-5 self-center text-xl font-semibold whitespace-nowrap dark:bg-cyan-950 dark:text-white">
        🧠 Task Description
      </h1>

      <p className="p-3">
        In this task, you will refactor your class components to functional
        components with hooks and implement routing functionality. You ll add
        pagination, detailed views, and URL-based navigation.
      </p>
      <h2 className="mt-5 ">🎯 Task Goals</h2>
      <ul className="p-3">
        <li>
          Convert class components to functional components using React hooks
        </li>
        <li>Implement React Router for navigation and URL management</li>
        <li>Create custom hooks for shared logic</li>
        <li>Add pagination with URL synchronization</li>
      </ul>
      <ButtonErr onError={() => setButtonError(true)}></ButtonErr>
    </div>
  );
}
