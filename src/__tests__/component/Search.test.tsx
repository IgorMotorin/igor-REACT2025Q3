import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Search from '../../component/Search';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeContext } from '../../Context';

describe('component Search Renders', () => {
  it('should Renders search input', () => {
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: 'inputText',
      buttonError: false,
      number: 1,
    };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search {...searchProp} />
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('inputText');
  });

  it('should Renders search button', () => {
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: 'inputText',
      buttonError: false,
      number: 1,
    };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search {...searchProp} />
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/search/i);
  });

  it('v2 - Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('appkey', 'local');
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: localStorage.getItem('appkey') || '',
      buttonError: false,
      number: 1,
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search {...searchProp} />
        </Provider>
      </BrowserRouter>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('local');
  });
  it('v2 - Shows empty input when no saved term exists', () => {
    localStorage.clear();

    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: localStorage.getItem('appkey') || '',
      buttonError: false,
      number: 1,
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search {...searchProp} />
        </Provider>
      </BrowserRouter>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
  it('Triggers search callback with correct parameters', async () => {
    const searchProp = {
      onChange: vi.fn(),
      onSearch: () => {},
      value: '',
      number: 1,
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          {' '}
          <ThemeContext value="light">
            <Search {...searchProp}></Search>
          </ThemeContext>
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('searchbox');

    const user = userEvent.setup();
    const test = 'ut';
    await user.click(input);
    await user.keyboard(test);

    expect(searchProp.onChange).toHaveBeenCalledTimes(test.length);
  });
  it('Triggers search callback Button', async () => {
    const searchProp = {
      onChange: () => {},
      onSearch: vi.fn(),
      value: '',
      buttonError: false,
      number: 1,
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext value="light">
            <Search {...searchProp}></Search>
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

    expect(searchProp.onSearch).toHaveBeenCalledTimes(2);
  });
});
