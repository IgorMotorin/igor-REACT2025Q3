import { describe, expect, it } from 'vitest';
import NotFound from '../../app/[locale]/not-found';
import { render, screen } from '@testing-library/react';

describe('group', () => {
  it('should', () => {
    render(<NotFound></NotFound>);

    expect(screen.getByText('404. Not found')).toBeInTheDocument();
  });
});
