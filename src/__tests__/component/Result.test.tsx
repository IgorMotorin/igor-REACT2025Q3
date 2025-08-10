import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGetBooksQuery } from '../../services/booksApi';

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
  import('../../services/booksApi.tsx'),
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
describe('Results/CardList Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(3);
    });

    it('Correctly displays item names and descriptions', async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent(/test item/i);
    });

    it('Handles missing or undefined data gracefully', async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('link');
      expect(input[1]).toBeInTheDocument();
      expect(input[1]).toHaveTextContent('');
    });
  });
});
