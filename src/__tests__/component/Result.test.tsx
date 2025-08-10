import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

vi.mock(import('../../services/booksApi.tsx'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetBooksQuery: () => ({
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
    }),
  };
});
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
