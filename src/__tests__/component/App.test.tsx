import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Search: User Interaction Tests', () => {
  it('v1 - Displays previously saved search term from localStorage on mount', async () => {
    // Set up our spies
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    beforeEach(() => {
      // Start each test with a clean slate
      localStorage.clear();
      getItemSpy.mockClear();
      setItemSpy.mockClear();
    });

    getItemSpy.mockReturnValue('"dark"');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: 'Cards' });
    console.log(link);
    const user = userEvent.setup();
    await user.click(link);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('dark');
  });

  it('v1 - Shows empty input when no saved term exists', async () => {
    // Set up our spies
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    beforeEach(() => {
      // Start each test with a clean slate
      localStorage.clear();
      getItemSpy.mockClear();
      setItemSpy.mockClear();
    });

    getItemSpy.mockReturnValue('"\'\'"');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: 'Cards' });
    const user = userEvent.setup();
    await user.click(link);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("''");
  });

  it('should Updates input value when user types', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: 'Cards' });

    const input = screen.getByRole('searchbox');
    const user = userEvent.setup();
    await user.click(link);
    await user.click(input);
    await user.clear(input);
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

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    localStorage.setItem('appkey', 'userinputtext');
    const link = screen.getByRole('link', { name: 'Cards' });

    const user = userEvent.setup();
    await user.click(link);

    const input = screen.getByRole('searchbox');
    const button = screen.getAllByRole('button');

    await user.click(input);
    await user.clear(input);
    await user.keyboard('userinputtext');
    await user.click(button[0]);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('userinputtext');
    expect(button[0]).toBeInTheDocument();

    expect(setItemSpy).toHaveBeenCalledWith('appkey', 'userinputtext');

    getItemSpy.mockReturnValue('"userinputtext"');
    const ls = localStorage.getItem('appkey');
    expect(ls).toBe('"userinputtext"');
  });

  it('Trims whitespace from search input before saving', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: 'Cards' });

    const user = userEvent.setup();
    await user.click(link);
    const input = screen.getByRole('searchbox');
    const button = screen.getAllByRole('button');

    await user.click(input);
    await user.clear(input);
    await user.keyboard('user input text1');
    await user.click(button[0]);

    expect(input).toBeInTheDocument();

    expect(button[0]).toBeInTheDocument();
    expect(input).toHaveValue('user input text1');
  });
});
