import ButtonErr from '../../component/ButtonErr.tsx';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ButtonErr', () => {
  it('renders correctly', async () => {
    const fn = vi.fn();

    render(<ButtonErr onError={fn}></ButtonErr>);

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Активировать ошибку');

    await userEvent.click(btn);

    expect(fn).toHaveBeenCalled();
  });
});
