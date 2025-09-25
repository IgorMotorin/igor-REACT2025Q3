import { render, screen } from '@testing-library/react';
import Error from '../../component/Error';

describe('Error Component Tests', () => {
  it('Renders Error component', () => {
    render(<Error run={true} text={'errortext'}></Error>);

    const error = screen.getByText('errortext');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('errortext');

    const div = document.querySelector('.absolute');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('visible');
  });
  it('Renders Error component', () => {
    render(<Error run={false} text={'errortext'}></Error>);

    const error = screen.getByText('errortext');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('errortext');

    const div = document.querySelector('.absolute');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('invisible');
  });
});
