import { render, screen } from '@testing-library/react';
import Pagination from '../../component/Pagination.tsx';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGetBooksQuery } from '../../services/booksApi';

type UseGetBooksQueryReturn = {
  data: {
    count: number;
  };
  isError?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

vi.mock<typeof import('../../services/booksApi')>(
  import('../../services/booksApi.tsx'),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useGetBooksQuery: ((): UseGetBooksQueryReturn => ({
        data: { count: 40 },
        refetch: () => {},
      })) as typeof useGetBooksQuery,
    };
  }
);

describe('Pagination Component Tests', () => {
  it('Renders Pagination', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button[1]).toBeInTheDocument();
    expect(button[1]).toHaveTextContent('1');
  });
  it('Renders Pagination', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(5);
  });
  it('Route test', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(5);

    const user = userEvent.setup();
    await user.click(button[1]);

    expect(window.location.search).toMatch('?page=1');
  });
  it('Route test', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(5);

    const user = userEvent.setup();
    await user.click(button[2]);

    expect(window.location.search).toMatch('?page=2');
  });
});
