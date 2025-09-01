import { act, render, screen } from '@testing-library/react';
import ErrorBoundary from '../component/ErrorBoundary';

const TestComponent = ({ throwError }: { throwError: boolean }) => {
  if (throwError) {
    throw new Error('Test error');
  }
  return <div>Test Component</div>;
};

describe('ErrorBoundary component', () => {
  test('отображает дочерние компоненты при отсутствии ошибок', () => {
    render(
      <ErrorBoundary>
        <TestComponent throwError={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  test('обрабатывает ошибку и отображает экран ошибки', () => {
    act(() => {
      render(
        <ErrorBoundary>
          <TestComponent throwError={true} />
        </ErrorBoundary>
      );
    });

    expect(screen.getByText(/Что-то пошло не так.../i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
  });

  test('проверяет наличие кнопки обновления', () => {
    act(() => {
      render(
        <ErrorBoundary>
          <TestComponent throwError={true} />
        </ErrorBoundary>
      );
    });

    const button = screen.getByText('Обновить страницу');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-indigo-600');
  });

  test('проверяет корректность отображения информации об ошибке', () => {
    act(() => {
      render(
        <ErrorBoundary>
          <TestComponent throwError={true} />
        </ErrorBoundary>
      );
    });

    const errorDetails = screen.getByRole('group');
    expect(errorDetails).toHaveTextContent('Test error');
    expect(errorDetails).toHaveAttribute('style', 'white-space: pre-wrap;');
  });
});
