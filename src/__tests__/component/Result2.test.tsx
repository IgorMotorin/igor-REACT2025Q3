import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store.tsx';

type UseGetBooksQueryReturn = {
  data: {
    count: number;
    results: [];
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
      useGetBooksQuery: (): UseGetBooksQueryReturn => ({
        data: {
          count: 1,
          results: [],
        },
        isError: false,
        isFetching: false,
      }),
    };
  }
);
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
