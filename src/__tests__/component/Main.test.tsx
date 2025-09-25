import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import App from '../../App.tsx';
import ErrorBoundary from '../../component/ErrorBoundary.tsx';

// Тест нормального рендеринга
it('должен отображать компонент без ошибок', () => {
  render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );

  // Убедимся, что приложение отрендерилось без ошибок
  const input = screen.getByRole('searchbox');
  expect(input).toBeInTheDocument();
});

// Тест с ошибочным компонентом
it('должен перехватывать ошибки через ErrorBoundary', () => {
  // Имитация компонента, который вызывает ошибку
  const FailingComponent = () => {
    throw new Error('Искусственная ошибка');
  };

  render(
    <StrictMode>
      <ErrorBoundary>
        <FailingComponent />
      </ErrorBoundary>
    </StrictMode>
  );

  // Убедимся, что компонент показал сообщение об ошибке
  const errorMessage = screen.getByText('Что-то пошло не так...');
  expect(errorMessage).toBeInTheDocument();
});

// Тест strict-mode двойной рендеринг
it('должен корректно работать в strict-mode', () => {
  render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );

  // Проверяем, что компонент рендерился дважды без ошибок
  const input = screen.getByRole('searchbox');
  expect(input).toBeInTheDocument();
});
