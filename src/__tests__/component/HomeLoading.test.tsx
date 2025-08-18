import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from '../../app/[locale]/loading';
import { ThemeContext } from '../../store/Context';

describe('About Component Tests', () => {
  it('Renders Error component', () => {
    render(
      <ThemeContext value="light">
        <Loading></Loading>
      </ThemeContext>
    );

    expect(screen.getByText('Loading')).toBeDefined();
    expect(screen.getByText('Loading')).toHaveTextContent('Loading');
  });
});
