export default function Home() {
  return (
    <div>
      <h1 className="mt-5 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        🧠 Task Description
      </h1>

      <p className="p-3">
        In this task, you will refactor your class components to functional
        components with hooks and implement routing functionality. You ll add
        pagination, detailed views, and URL-based navigation.
      </p>
      <h2 className="mt-5">🎯 Task Goals</h2>
      <ul className="p-3">
        <li>
          Convert class components to functional components using React hooks
        </li>
        <li>Implement React Router for navigation and URL management</li>
        <li>Create custom hooks for shared logic</li>
        <li>Add pagination with URL synchronization</li>
      </ul>
    </div>
  );
}
