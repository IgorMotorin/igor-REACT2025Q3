import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from '../../component/ErrorBoundary';
const ThrowingComponent = () => {
  throw new Error('Test Error');
};

const ChildComponent = () => <div>Это нормальный контент</div>;

describe('Error Boundary Tests', () => {
  it('нормально рендерится при отсутствии ошибок', () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    const normalContent = screen.getByText('Это нормальный контент');
    expect(normalContent).toBeInTheDocument();
  });

  it('Catches and handles JavaScript errors in child components', () => {
    expect(() =>
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      )
    ).not.toThrow();
    expect(() => render(<ThrowingComponent />)).toThrow();
  });

  it('Displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const message = screen.getByText('Что-то пошло не так...');
    expect(message).toBeInTheDocument();
  });

  it('Logs error to console', async () => {
    vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('обновляет страницу при клике на кнопку', () => {
    const reloadMock = vi.fn();

    vi.stubGlobal('location', {
      reload: reloadMock,
    });

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByText('Обновить страницу');
    fireEvent.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
