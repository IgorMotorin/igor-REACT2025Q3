import { render, screen } from '@testing-library/react';
import MinSpinner from '../../component/MinSpinner';
import { describe, expect, it } from 'vitest';

describe('Loading Component Tests', () => {
  it('Renders loading indicator (spinner, skeleton, etc.)', () => {
    render(<MinSpinner></MinSpinner>);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent('Loading');
  });

  it('Shows/hides based on loading prop', () => {
    render(<MinSpinner></MinSpinner>);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent('Loading');
  });
});
