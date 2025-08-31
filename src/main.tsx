import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './component/ErrorBoundary.tsx';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
