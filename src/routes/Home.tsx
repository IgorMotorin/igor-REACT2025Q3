import { useContext } from 'react';
import ButtonErr from '../component/ButtonErr';
import { ThemeContext } from '../Context';

export default function Home() {
  const theme = useContext(ThemeContext);

  return (
    <div className=" dark:bg-cyan-950 dark:text-white" data-theme={theme}>
      <h1 className="pt-5 self-center text-xl font-semibold whitespace-nowrap dark:bg-cyan-950 dark:text-white">
        🧠 Task Description
      </h1>

      <p className="p-3">
        This task is a continuation of the state management task. In this task,
        you will implement proper data fetching and caching mechanisms using
        modern querying libraries.
      </p>
      <h2 className="mt-5 ">🎯 Task Goals</h2>
      <div className="p-3">
        <p>
          1. API Integration:
          <p>
            1.1. Based on your state management choice from the previous task,
            implement one of the following:
          </p>
          <p>1.2. For Redux users: Implement RTK Query for making API calls </p>
          <p>
            1.3. For Zustand users: Implement TanStack Query (formerly React
            Query) for data fetching
          </p>
        </p>
        <p>
          2. Required Query Features:
          <p>2.1. Cache the results of API calls</p>
          <p>2.2. Display loading states while data is being fetched </p>
          <p>2.3. Handle error states appropriately </p>
          <p>
            2.4. Implement proper data invalidation and refetching
            strategies{' '}
          </p>
          <p>
            2.5. Add a manual cache invalidation control (e.g., a refresh
            button) that forces a new API call instead of using cached data{' '}
          </p>
          <p>
            All previous API calls from your application should be converted to
            use the chosen query solution
          </p>
        </p>
        <p>
          Specific Requirements: Data loading states should be visible to users
          (loading indicators) Error states should be properly handled and
          displayed to users The cached data should persist between page
          navigations
        </p>
      </div>
      <ButtonErr></ButtonErr>
    </div>
  );
}
