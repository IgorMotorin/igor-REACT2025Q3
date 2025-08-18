import { describe, expect, it } from 'vitest';
import ButtonTheme from '../../component/ButtonTheme';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../src/store/store';

describe('group', () => {
  it('should', () => {
    render(
      <Provider store={store}>
        <ButtonTheme theme="light"></ButtonTheme>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
