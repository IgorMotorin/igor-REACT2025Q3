import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../component/ErrorBoundary';

describe('Error Boundary Tests', () => {
  it('Catches and handles JavaScript errors in child components', () => {
    const ThrowingComponent = () => {
      throw new Error('Test Error');
    };

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
    const ThrowingComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const message = screen.getByText('Что-то пошло не так...');
    expect(message).toBeInTheDocument();
  });

  it('Logs error to console', async () => {
    const spy = vi.spyOn(console, 'log');

    afterAll(() => {
      spy.mockReset();
    });

    const ThrowingComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
