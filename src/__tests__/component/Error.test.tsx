import { render, screen } from '@testing-library/react';
import Error from '../../component/ErrorScreen';
import { describe, expect, it } from 'vitest';

describe('Error Component Tests', () => {
  it('Renders Error component', () => {
    render(<Error run={true} text={'errortext'}></Error>);

    const error = screen.getByText('errortext');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('errortext');
  });
});
