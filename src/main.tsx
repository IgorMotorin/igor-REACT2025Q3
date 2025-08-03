import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './component/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { store } from './store.tsx';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
