import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import type { useGetBooksQuery } from '../../services/booksApi';
import { describe, expect, it, vi } from 'vitest';

type UseGetBooksQueryReturn = {
  data: {
    count: number;
    results: [];
  };
  isError: boolean;
  isFetching: boolean;
};

vi.mock<typeof import('../../services/booksApi')>(
  import('../../services/booksApi'),
  async (
    importOriginal: () => Promise<typeof import('../../services/booksApi')>
  ): Promise<Partial<typeof import('../../services/booksApi')>> => {
    const actual = await importOriginal();
    return {
      ...actual,
      useGetBooksQuery: ((): UseGetBooksQueryReturn => ({
        data: {
          count: 1,
          results: [],
        },
        isError: false,
        isFetching: false,
      })) as typeof useGetBooksQuery,
    };
  }
);
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});
describe('Results/CardList Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Displays "no results" message when data array is empty', async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findByText('No result...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveTextContent('No result...');
    });
  });
});
