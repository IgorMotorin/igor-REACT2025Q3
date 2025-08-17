import { render, screen } from '@testing-library/react';
import Pagination from '../../component/Pagination';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGetBooksQuery } from '../../services/booksApi';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

type UseGetBooksQueryReturn = {
  data: {
    count: number;
  };
  isError?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

vi.mock<typeof import('../../services/booksApi')>(
  import('../../services/booksApi'),
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

const push = vi.fn();
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: push,
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe('Pagination Component Tests', () => {
  it('Renders Pagination', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </NextIntlClientProvider>
    );

    const button = screen.getAllByRole('button');
    expect(button[1]).toBeInTheDocument();
    expect(button[1]).toHaveTextContent('1');
  });
  it('Renders Pagination', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </NextIntlClientProvider>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(5);
  });
  it('Route test', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </NextIntlClientProvider>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(5);

    const user = userEvent.setup();
    await user.click(button[1]);

    expect(push).toBeCalled();
  });
  it('Route test', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Pagination></Pagination>
        </Provider>
      </NextIntlClientProvider>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(5);

    const user = userEvent.setup();
    await user.click(button[2]);

    expect(push).toBeCalled();
  });
});
