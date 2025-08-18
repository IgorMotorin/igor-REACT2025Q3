import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../../app/[locale]/ThemeProvider';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('StoreProvider test', () => {
  it('should', async () => {
    const child = <p>child</p>;
    render(
      <Provider store={store}>
        <ThemeProvider>{child}</ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('child')).toBeDefined();

    await waitFor(() =>
      expect(screen.getByText('child')).toHaveTextContent('child')
    );
  });
});
