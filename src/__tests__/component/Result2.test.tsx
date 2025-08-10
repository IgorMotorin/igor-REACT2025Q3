import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store.tsx';

vi.mock(import('../../services/booksApi.tsx'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetBooksQuery: () => ({
      data: {
        count: 1,
        results: [],
      },
      isError: false,
      isFetching: false,
    }),
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
