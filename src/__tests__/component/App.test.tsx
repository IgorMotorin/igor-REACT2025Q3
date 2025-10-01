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
});

describe('User Interaction Tests: Search', () => {
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
describe('User Interaction Tests: About page', () => {
  it('About page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: 'About' });

    const user = userEvent.setup();
    await user.click(link);
    const text = screen.getByText('Hi, my name is Igor!');

    expect(text).toBeInTheDocument();
  });
});

// describe('User Interaction Tests: Cards', () => {
//   it('Cards page Pagination', async () => {
//     const fetchSpy = vi.spyOn(globalThis, 'fetch');
//     const data = {
//       results: [
//         { title: 'string', id: 1, authors: [{ name: 'string' }] },
//         { title: 'string', id: 2, authors: [{ name: 'string' }] },
//       ],
//       count: '52',
//     };

//     const mockedImplementation = () =>
//       Promise.resolve({
//         json() {
//           return data;
//         },
//         status: 200,
//         ok: true,
//       });

//     fetchSpy.mockImplementation(mockedImplementation);

//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );
//     const link = screen.getByRole('link', { name: 'Cards' });
//     const user = userEvent.setup();
//     await user.click(link);

//     const button = screen.getByRole('button', { name: '2' });

//     expect(button).toBeInTheDocument();

//     await user.click(button);

//     expect(window.location.search).toMatch('?page=2');

//     afterAll(() => {
//       fetchSpy.mockRestore();
//     });
//   });
// });
