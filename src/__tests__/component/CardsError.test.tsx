import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Error from '../../app/[locale]/cards/error';
import { ThemeContext } from '../../store/Context';

describe('About Component Tests', () => {
  it('Renders Error component', () => {
    const error = {
      name: 'name',
      message: 'message',
    };
    render(
      <ThemeContext value="light">
        <Error error={error} reset={() => {}}></Error>
      </ThemeContext>
    );

    expect(screen.getByText('Something went wrong...')).toBeDefined();
    expect(screen.getByText('Something went wrong...')).toHaveTextContent(
      'Something went wrong...'
    );
  });
});
