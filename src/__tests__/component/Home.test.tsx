import { render, screen } from '@testing-library/react';
import Home from '../../routes/Home';

describe('Loading Component Tests', () => {
  it('Renders Home component', () => {
    render(<Home></Home>);

    const home = screen.getByText('🧠 Task Description');
    expect(home).toBeInTheDocument();
    expect(home).toHaveTextContent('🧠 Task Description');
  });
  it('Renders Home component', async () => {
    render(<Home></Home>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
