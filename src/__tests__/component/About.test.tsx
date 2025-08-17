import { render, screen } from '@testing-library/react';
import About from '../../routes/_About';

describe('About Component Tests', () => {
  it('Renders About component', () => {
    render(<About></About>);

    const error = screen.getByText('About');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('About');
  });
});
