import { useContext, useState } from 'react';
import ButtonErr from '../component/ButtonErr';
import { ThemeContext } from '../Context';

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
        Students must choose between Redux (with Redux Toolkit) or Zustand as
        their state management solution
      </p>
      <h2 className="mt-5 ">🎯 Task Goals</h2>
      <ul className="p-3">
        <li>
          1. Convert class components to functional components using React hooks
        </li>
        <li>Implement React Router for navigation and URL management</li>
        <li>Create custom hooks for shared logic</li>
        <li>Add pagination with URL synchronization</li>
      </ul>
      <ButtonErr onError={() => setButtonError(true)}></ButtonErr>
    </div>
  );
}
