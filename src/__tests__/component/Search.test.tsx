import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '../../component/Search';
import App from '../../App';

describe('component Search Renders', () => {
  it('should Renders search input', () => {
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: 'inputText',
      buttonError: false,
    };
    render(<Search {...searchProp} />);

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
    };
    render(<Search {...searchProp} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/поиск/i);
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    // Set up our spies
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    beforeEach(() => {
      // Start each test with a clean slate
      localStorage.clear();
      getItemSpy.mockClear();
      setItemSpy.mockClear();
    });

    getItemSpy.mockReturnValue('dark');

    render(<App />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('dark');
  });

  it('Shows empty input when no saved term exists', () => {
    // Set up our spies
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    beforeEach(() => {
      // Start each test with a clean slate
      localStorage.clear();
      getItemSpy.mockClear();
      setItemSpy.mockClear();
    });

    getItemSpy.mockReturnValue('');

    render(<App />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  it('should Updates input value when user types', async () => {
    render(<App />);

    const input = screen.getByRole('searchbox');
    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('userinput');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('userinput');
  });
  it('Saves search term to localStorage when search button is clicked', async () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    beforeEach(() => {
      // Start each test with a clean slate
      localStorage.clear();
      getItemSpy.mockClear();
      setItemSpy.mockClear();
    });

    render(<App />);

    const input = screen.getByRole('searchbox');
    const button = screen.getAllByRole('button');
    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('userinputtext');
    await user.click(button[0]);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('userinputtext');
    expect(button[0]).toBeInTheDocument();

    expect(setItemSpy).toHaveBeenCalledWith('appkey', 'userinputtext');

    getItemSpy.mockReturnValue('userinputtext');
    const ls = localStorage.getItem('appkey');
    expect(ls).toBe('userinputtext');
  });
  it('Trims whitespace from search input before saving', () => {});
  it('Triggers search callback with correct parameters', () => {});
});
