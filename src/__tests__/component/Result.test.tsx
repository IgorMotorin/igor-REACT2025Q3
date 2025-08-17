import { render, screen } from '@testing-library/react';
import Result from '../../component/Result';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGetBooksQuery } from '../../services/booksApi';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

type Author = { name: string };
type Book = { id: number; title: string; authors: Author[] };

type UseGetBooksQueryReturn = {
  data: {
    count: number;
    results: Book[];
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
          results: [
            { id: 1, title: 'test item', authors: [{ name: 'test item' }] },
            { title: '', id: 2, authors: [{ name: '' }] },
            { title: '', id: 3, authors: [{ name: '' }] },
          ],
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
    it('Renders correct number of items when data is provided', async () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <Provider store={store}>
            <Result />
          </Provider>
        </NextIntlClientProvider>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(3);
    });

    it('Correctly displays item names and descriptions', async () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <Provider store={store}>
            <Result />
          </Provider>
        </NextIntlClientProvider>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent(/test item/i);
    });

    it('Handles missing or undefined data gracefully', async () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <Provider store={store}>
            <Result />
          </Provider>
        </NextIntlClientProvider>
      );

      const input = await screen.findAllByRole('link');
      expect(input[1]).toBeInTheDocument();
      expect(input[1]).toHaveTextContent('');
    });
  });
});
