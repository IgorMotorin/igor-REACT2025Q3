import { render, screen } from '@testing-library/react';
import Spinner from '../../component/Spinner';

describe('Loading Component Tests', () => {
  it('Renders loading indicator (spinner, skeleton, etc.)', () => {
    render(<Spinner run={true}></Spinner>);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent('Loading');
    expect(spinner).toHaveClass('visible');
  });

  it('Shows/hides based on loading prop', () => {
    render(<Spinner run={false}></Spinner>);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent('Loading');
    expect(spinner).toHaveClass('invisible');
  });
});
