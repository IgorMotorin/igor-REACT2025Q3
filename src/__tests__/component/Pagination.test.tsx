import { render, screen } from '@testing-library/react';
import Pagination from '../../component/Pagination';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('Pagination Component Tests', () => {
  it('Renders Pagination', () => {
    const length = 32;
    const numPagination = 1;
    render(
      <BrowserRouter>
        <Pagination length={length} numPagination={numPagination}></Pagination>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button[1]).toBeInTheDocument();
    expect(button[1]).toHaveTextContent('1');
  });
  it('Renders Pagination', () => {
    const length = 32;
    const numPagination = 1;
    render(
      <BrowserRouter>
        <Pagination length={length} numPagination={numPagination}></Pagination>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(3);
  });
  it('Route test', async () => {
    const length = 32;
    const numPagination = 1;

    render(
      <BrowserRouter>
        <Pagination length={length} numPagination={numPagination}></Pagination>
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(3);

    const user = userEvent.setup();
    await user.click(button[1]);

    expect(window.location.search).toMatch('?page=1');
  });
});
