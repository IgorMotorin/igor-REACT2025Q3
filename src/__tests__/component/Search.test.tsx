import { render, screen } from '@testing-library/react';
import Search from '../../component/Search';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeContext } from '../../store/Context';
import { onInput } from '../../store/checkSlice';
import type { useSelector as OriginalUseSelector } from 'react-redux';
import type { useGetBooksQuery } from '../../services/booksApi';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

const onInputMock = vi.fn();

vi.mock<typeof import('../../store/checkSlice')>(
  import('../../store/checkSlice'),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      onInput: (() => onInputMock) as unknown as typeof onInput,
    };
  }
);

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
  async (
    importOriginal: () => Promise<typeof import('../../services/booksApi')>
  ): Promise<Partial<typeof import('../../services/booksApi')>> => {
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

vi.mock<typeof import('react-redux')>(
  import('react-redux'),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useSelector: (() => 'inputText') as unknown as typeof OriginalUseSelector,
    };
  }
);

vi.mock(import('../../hooks/hooks'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocalStorage: () => ['inputText', () => {}],
  };
});

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
describe('component Search Renders', () => {
  it('should Renders search input', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </NextIntlClientProvider>
    );

    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('inputText');
  });

  it('should Renders search button', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </NextIntlClientProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/search/i);
  });

  it('v2 - Displays previously saved search term from localStorage on mount', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </NextIntlClientProvider>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('inputText');
  });

  it('Triggers search callback with correct parameters', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </NextIntlClientProvider>
    );

    const input = screen.getByRole('searchbox');

    const user = userEvent.setup();
    const test = 'ut';
    await user.click(input);
    await user.keyboard(test);

    expect(onInputMock).toHaveBeenCalledTimes(2);
  });
  it('Triggers search callback Button', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </NextIntlClientProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/search/i);

    const user = userEvent.setup();

    await user.click(button);
    await user.click(button);

    expect(onInputMock).toHaveBeenCalledTimes(4);
  });
});
