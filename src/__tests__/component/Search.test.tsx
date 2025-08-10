import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Search from '../../component/Search';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeContext } from '../../Context';

const onInput = vi.fn();
vi.mock<typeof import('../../store/checkSlice')>(
  import('../../store/checkSlice.tsx'),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      onInput: () => onInput,
    };
  }
);

vi.mock<typeof import('../../services/booksApi')>(
  import('../../services/booksApi.tsx'),
  async (
    importOriginal: () => Promise<typeof import('../../services/booksApi')>
  ): Promise<Partial<typeof import('../../services/booksApi')>> => {
    const actual = await importOriginal();
    return {
      ...actual,
      useGetBooksQuery: () => ({ data: { count: 40 }, refetch: () => {} }),
    };
  }
);

vi.mock(import('react-redux'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSelector: () => 'inputText',
  };
});
vi.mock(import('../../hooks/hooks.tsx'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocalStorage: () => ['inputText', () => {}],
  };
});
describe('component Search Renders', () => {
  it('should Renders search input', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('inputText');
  });

  it('should Renders search button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/search/i);
  });

  it('v2 - Displays previously saved search term from localStorage on mount', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('inputText');
  });

  it('Triggers search callback with correct parameters', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          {' '}
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('searchbox');

    const user = userEvent.setup();
    const test = 'ut';
    await user.click(input);
    await user.keyboard(test);

    expect(onInput).toHaveBeenCalledTimes(2);
  });
  it('Triggers search callback Button', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search></Search>
          </ThemeContext>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/search/i);

    const user = userEvent.setup();

    await user.click(button);
    await user.click(button);

    expect(onInput).toHaveBeenCalledTimes(4);
  });
});
