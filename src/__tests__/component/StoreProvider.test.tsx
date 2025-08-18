import { describe, expect, it } from 'vitest';
import { StoreProvider } from '../../app/[locale]/StoreProvider';
import { render, screen, waitFor } from '@testing-library/react';

describe('StoreProvider test', () => {
  it('should', async () => {
    const child = <p>child</p>;
    render(<StoreProvider>{child}</StoreProvider>);

    expect(screen.getByText('child')).toBeDefined();

    await waitFor(() =>
      expect(screen.getByText('child')).toHaveTextContent('child')
    );
  });
});
